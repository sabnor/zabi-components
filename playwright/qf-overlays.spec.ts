import { expect, test, type Locator, type Page } from "@playwright/test";

import { touchDrag, touchTap } from "./helpers/touch";

/**
 * What QA found in the phone rework of Tooltip, Toaster and the modal
 * overlays, each as the thing a person would run into: a tooltip that cannot
 * be pointed at, a toast lying over Save with no way to it from the keyboard,
 * a footer behind the on-screen keyboard, a focused row under the floating
 * button.
 *
 * No keyboard can be raised here. Where a test says "keyboard", the `height`
 * of `window.visualViewport` is overridden with a smaller value and its
 * `resize` event dispatched, which is what a browser reports when a keyboard
 * covers the page without shrinking it. Taps are fingers sent through the
 * DevTools protocol. The fixture is /phone-lab.
 */

const PHONE = { width: 375, height: 740 };
const NARROW = { width: 320, height: 568 };
const LANDSCAPE = { width: 667, height: 375 };
const DESKTOP = { width: 1280, height: 800 };
/** What is left of a 740px screen above a typical keyboard. */
const ABOVE_KEYBOARD = 420;

async function gotoLab(page: Page) {
    await page.goto("/phone-lab", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("phone-lab-hydrated")).toBeAttached({ timeout: 30_000 });
}

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

const bottomOf = async (locator: Locator) => {
    const rect = await box(locator);
    return Math.round(rect.y + rect.height);
};

async function tap(page: Page, locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
    const rect = await box(locator);
    await touchTap(page, { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
}

/** See the note at the top: the visual viewport reports a keyboard; none is shown. */
async function setVisualViewportHeight(page: Page, height: number | null) {
    await page.evaluate((value) => {
        const viewport = window.visualViewport!;
        if (value === null) {
            delete (viewport as unknown as Record<string, unknown>).height;
        } else {
            Object.defineProperty(viewport, "height", { configurable: true, get: () => value });
        }
        viewport.dispatchEvent(new Event("resize"));
    }, height);
}

/**
 * The same, for a browser that has also panned the screen to show the field:
 * `offsetTop` is how far, and what can be seen is that much further down.
 */
async function setVisualViewport(page: Page, height: number, offsetTop: number) {
    await page.evaluate(
        ([viewportHeight, top]) => {
            const viewport = window.visualViewport!;
            for (const [name, value] of [
                ["height", viewportHeight],
                ["offsetTop", top],
                ["pageTop", top],
            ] as const) {
                Object.defineProperty(viewport, name, { configurable: true, get: () => value });
            }
            viewport.dispatchEvent(new Event("resize"));
            viewport.dispatchEvent(new Event("scroll"));
        },
        [height, offsetTop],
    );
}

async function clearVisualViewport(page: Page) {
    await page.evaluate(() => {
        const viewport = window.visualViewport as unknown as Record<string, unknown> & EventTarget;
        delete viewport.height;
        delete viewport.offsetTop;
        delete viewport.pageTop;
        viewport.dispatchEvent(new Event("resize"));
        viewport.dispatchEvent(new Event("scroll"));
    });
}

async function tooltipOf(page: Page, trigger: Locator) {
    await expect(trigger).toHaveAttribute("aria-describedby", /.+/);
    const id = await trigger.getAttribute("aria-describedby");
    return page.locator(`[id="${id}"]`);
}

/** The element a press at the centre of `locator` would land on, as a test id or tag. */
const hitAtCentre = (locator: Locator) =>
    locator.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        return hit === el || el.contains(hit);
    });

const stack = (page: Page) => page.locator("[data-zabi-toaster]");
const toasts = (page: Page) => stack(page).locator("[data-toast-id]");
const dialog = (page: Page, name: string) => page.getByRole("dialog", { name });

test.describe("Tooltip with a mouse: it can be pointed at", () => {
    test.use({ viewport: DESKTOP });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
    });

    test("moving from the trigger onto the bubble keeps it open; leaving closes it", async ({ page }) => {
        const trigger = page.getByTestId("tip-left");
        await trigger.hover();
        const tooltip = await tooltipOf(page, trigger);
        await expect(tooltip).toHaveCSS("opacity", "1");
        await expect(tooltip).toHaveCSS("pointer-events", "auto");

        const from = await box(trigger);
        const to = await box(tooltip);
        const start = { x: from.x + from.width / 2, y: from.y + 2 };
        const end = { x: to.x + to.width / 2, y: to.y + to.height / 2 };
        // Slowly across the gap: 20 steps, each one a chance for it to close.
        for (let step = 1; step <= 20; step += 1) {
            await page.mouse.move(
                start.x + ((end.x - start.x) * step) / 20,
                start.y + ((end.y - start.y) * step) / 20,
            );
            await expect(tooltip, `Open at step ${step} of the way`).toHaveAttribute("data-visible", "true");
        }
        // Resting on the bubble: it stays for as long as the pointer does.
        await page.waitForTimeout(600);
        await expect(tooltip).toBeVisible();
        expect(await hitAtCentre(tooltip), "The pointer is on the bubble itself").toBe(true);

        await page.mouse.move(end.x, end.y + 200);
        await expect(tooltip).toBeHidden();
        await expect(tooltip).toHaveCSS("pointer-events", "none");
    });

    for (const direction of ["ltr", "rtl"] as const) {
        test(`fixed and at the side, ${direction}: the way across to the bubble is covered`, async ({ page }) => {
            await page.evaluate((dir) => (document.documentElement.dir = dir), direction);
            const trigger = page.getByTestId("tip-fixed-side");
            await trigger.scrollIntoViewIfNeeded();
            await trigger.hover();
            const tooltip = await tooltipOf(page, trigger);
            await expect(tooltip).toHaveCSS("opacity", "1");
            await expect.poll(() => tooltip.evaluate((el) => el.getAnimations().length)).toBe(0);

            const from = await box(trigger);
            const to = await box(tooltip);
            const beside = to.x >= from.x + from.width || to.x + to.width <= from.x;
            expect(beside, "The bubble is beside the trigger, not over it").toBe(true);
            const y = from.y + from.height / 2;
            const start = from.x + from.width / 2;
            const end = to.x + to.width / 2;
            // Every pixel of the way: the gap is 8 of them.
            const steps = Math.ceil(Math.abs(end - start));
            for (let step = 1; step <= steps; step += 1) {
                await page.mouse.move(start + ((end - start) * step) / steps, y);
            }
            await page.waitForTimeout(300);
            await expect(tooltip, "Still open with the pointer on it").toHaveAttribute("data-visible", "true");
            expect(await hitAtCentre(tooltip)).toBe(true);

            await page.mouse.move(end, y + 200);
            await expect(tooltip).toBeHidden();
        });
    }

    test("Escape dismisses it from the bubble without moving focus, and it is then out of the way", async ({
        page,
    }) => {
        const field = page.getByTestId("tip-info");
        await field.focus();
        await page.keyboard.press("Escape");
        const trigger = page.getByTestId("tip-left");
        await trigger.hover();
        const tooltip = await tooltipOf(page, trigger);
        await expect(tooltip).toHaveCSS("opacity", "1");
        const bubble = await box(tooltip);
        await page.mouse.move(bubble.x + bubble.width / 2, bubble.y + bubble.height / 2, { steps: 8 });
        await expect(tooltip).toBeVisible();

        await page.keyboard.press("Escape");
        await expect(tooltip).toBeHidden();
        await expect(field, "Focus is where it was").toBeFocused();
        // Closed, the bubble takes no press: what is under the pointer does.
        const hit = await page.evaluate(
            ({ x, y }) => document.elementFromPoint(x, y)?.closest('[role="tooltip"]') === null,
            { x: bubble.x + bubble.width / 2, y: bubble.y + bubble.height / 2 },
        );
        expect(hit).toBe(true);
    });

    test("a disabled button is described by its tooltip; an aria-disabled one also from the keyboard", async ({
        page,
    }) => {
        const disabled = page.getByTestId("tip-disabled");
        await expect(disabled).toBeDisabled();
        // No actionability check: Playwright will not hover a disabled control by itself.
        const at = await box(disabled);
        await page.mouse.move(at.x + at.width / 2, at.y + at.height / 2, { steps: 4 });
        const tooltip = page.getByRole("tooltip", { name: "Add a question first" }).first();
        await expect(tooltip).toBeVisible();
        await expect(disabled).toHaveAttribute("aria-describedby", (await tooltip.getAttribute("id"))!);
        await page.mouse.move(5, 5);
        await expect(disabled).not.toHaveAttribute("aria-describedby", /.+/);

        // The keyboard never reaches a disabled button; it reaches this one.
        const unavailable = page.getByTestId("tip-aria-disabled");
        await unavailable.focus();
        await expect(unavailable).toBeFocused();
        const second = await tooltipOf(page, unavailable);
        await expect(second).toBeVisible();
        await expect(second).toHaveText("Add a question first");
    });
});

test.describe("Tooltip on touch: a tap, not a touch", () => {
    test.use({ viewport: PHONE, hasTouch: true, isMobile: true });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
    });

    test("a drag that starts on a trigger does not flash the tooltip", async ({ page }) => {
        const trigger = page.getByTestId("tip-side");
        await trigger.scrollIntoViewIfNeeded();
        // Every tooltip that becomes visible from here on is counted.
        await page.evaluate(() => {
            const seen = { count: 0 };
            (window as unknown as { tooltipsSeen: typeof seen }).tooltipsSeen = seen;
            new MutationObserver((records) => {
                for (const record of records) {
                    if ((record.target as Element).getAttribute("data-visible") === "true") seen.count += 1;
                }
            }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-visible"] });
        });
        const before = await page.evaluate(() => window.scrollY);
        const at = await box(trigger);
        await touchDrag(
            page,
            { x: at.x + at.width / 2, y: at.y + at.height / 2 },
            { x: at.x + at.width / 2, y: at.y + at.height / 2 - 160 },
        );
        await expect.poll(() => page.evaluate(() => window.scrollY), "The page scrolled").toBeGreaterThan(
            before + 50,
        );
        expect(
            await page.evaluate(() => (window as unknown as { tooltipsSeen: { count: number } }).tooltipsSeen.count),
            "No tooltip opened during the drag",
        ).toBe(0);
        await expect(trigger).not.toHaveAttribute("aria-describedby", /.+/);

        // A tap on the same trigger still opens it.
        await tap(page, trigger);
        await expect(await tooltipOf(page, trigger)).toBeVisible();
    });

    test("by default it stays until it is dismissed, while its trigger keeps focus", async ({ page }) => {
        const trigger = page.getByTestId("tip-left");
        await tap(page, trigger);
        const tooltip = await tooltipOf(page, trigger);
        await expect(tooltip).toBeVisible();
        await expect(trigger).toBeFocused();
        await page.waitForTimeout(3_500);
        await expect(tooltip, "No timer by default").toBeVisible();
        await expect(trigger).toBeFocused();
        await tap(page, page.getByRole("heading", { name: "Phone lab" }));
        await expect(tooltip).toBeHidden();
    });

    test("a disabled button's tooltip is tied to it after a tap", async ({ page }) => {
        const button = page.getByTestId("tip-disabled");
        await tap(page, button);
        const tooltip = page.getByRole("tooltip", { name: "Add a question first" }).first();
        await expect(tooltip).toBeVisible();
        await expect(button).toHaveAttribute("aria-describedby", (await tooltip.getAttribute("id"))!);
    });

    test("a tap on the open bubble leaves it open; a tap elsewhere closes it", async ({ page }) => {
        const trigger = page.getByTestId("tip-left");
        await tap(page, trigger);
        const tooltip = await tooltipOf(page, trigger);
        await expect(tooltip).toHaveCSS("opacity", "1");
        await tap(page, tooltip);
        await page.waitForTimeout(400);
        await expect(tooltip).toBeVisible();
        await tap(page, page.getByRole("heading", { name: "Phone lab" }));
        await expect(tooltip).toBeHidden();
    });
});

test.describe("A toast and an open overlay, on a phone", () => {
    test.use({ viewport: PHONE, hasTouch: true, isMobile: true });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
        await page.getByTestId("toast-push").click();
        await expect(toasts(page).first()).toBeVisible();
        await expect.poll(() => bottomOf(toasts(page).first()), "At rest: 16px from the bottom").toBe(
            PHONE.height - 16,
        );
    });

    test("full-screen Modal: the toast sits above the footer, and Save takes the tap", async ({ page }) => {
        await page.getByTestId("modal-form-open").click();
        const panel = dialog(page, "New quiz round");
        await expect(panel).toBeVisible();
        const footer = panel.locator("footer");
        const save = page.getByTestId("modal-form-save");

        await expect
            .poll(async () => Math.round((await box(footer)).y - (await bottomOf(toasts(page).first()))))
            .toBe(16);
        expect(await hitAtCentre(save), "Nothing lies over Save").toBe(true);
        await tap(page, save);
        await expect(panel).toBeHidden();
        // The overlay is gone: back to where it rests.
        await expect.poll(() => bottomOf(toasts(page).first())).toBe(PHONE.height - 16);
    });

    for (const [name, opener, title, action] of [
        ["a Modal at the bottom of a phone", "modal-plain-open", "Confirm changes", "Confirm"],
        ["a BottomSheet", "sheet-open", "Filters", "Apply"],
        ["a Drawer", "drawer-open", "Team", "Save"],
        ['a Modal that is full screen on a phone ("mobile")', "modal-mobile-open", "Edit team", "Save"],
    ] as const) {
        test(`${name}: the toast is off its footer`, async ({ page }) => {
            await page.getByTestId(opener).click();
            const panel = dialog(page, title);
            await expect(panel).toBeVisible();
            await expect.poll(() => panel.evaluate((el) => el.getAnimations().length)).toBe(0);
            const button = panel.getByRole("button", { name: action, exact: true });
            await expect
                .poll(async () => (await bottomOf(toasts(page).first())) <= Math.round((await box(button)).y))
                .toBe(true);
            expect(await hitAtCentre(button), `Nothing lies over ${action}`).toBe(true);
            // Still on screen, below the top.
            expect((await box(toasts(page).first())).y).toBeGreaterThanOrEqual(0);
        });
    }

    test("the keyboard reaches a toast from the modal, dismisses it, and is back in the modal", async ({
        page,
    }) => {
        await page.getByTestId("modal-form-open").click();
        const panel = dialog(page, "New quiz round");
        await expect(panel.getByRole("button", { name: "Close" })).toBeFocused();

        // Backwards from the first control: the last one of the trap, which is the toast's.
        await page.keyboard.press("Shift+Tab");
        const dismiss = toasts(page).first().getByRole("button", { name: "Dismiss notification" });
        await expect(dismiss).toBeFocused();
        // Forwards from there: round to the modal. Never onto the page behind.
        await page.keyboard.press("Tab");
        await expect(panel.getByRole("button", { name: "Close" })).toBeFocused();

        let reached = false;
        for (let presses = 0; presses < 40; presses += 1) {
            await page.keyboard.press("Tab");
            const where = await page.evaluate(() => {
                const active = document.activeElement;
                if (active?.closest("[data-zabi-toaster]")) return "toast";
                if (active?.closest('[role="dialog"]')) return "dialog";
                return "page";
            });
            expect(where, "Focus never leaves the modal and its toasts").not.toBe("page");
            if (where === "toast") {
                reached = true;
                break;
            }
        }
        expect(reached, "Tab reaches the toast").toBe(true);

        await dismiss.focus();
        await page.keyboard.press("Enter");
        await expect(toasts(page)).toHaveCount(0);
        await expect
            .poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]'))))
            .toBe(true);
        await expect(panel).toBeVisible();
    });

    test("focusToasts() works from inside a modal, and Escape there comes back without closing it", async ({
        page,
    }) => {
        await page.getByTestId("modal-form-open").click();
        const panel = dialog(page, "New quiz round");
        // The modal has taken focus: what follows is not undone by its opening.
        await expect(panel.getByRole("button", { name: "Close" })).toBeFocused();
        const toToasts = page.getByTestId("modal-toast-focus");
        await toToasts.focus();
        await page.keyboard.press("Enter");
        await expect
            .poll(() => page.evaluate(() => Boolean(document.activeElement?.closest("[data-zabi-toaster]"))))
            .toBe(true);
        await page.keyboard.press("Escape");
        await expect(toToasts).toBeFocused();
        await expect(panel).toBeVisible();
        await expect(toasts(page)).toHaveCount(1);
    });

    test("a toast raised while the modal is open is in a live region nothing hides", async ({ page }) => {
        await page.getByTestId("modal-form-open").click();
        await expect(dialog(page, "New quiz round")).toBeVisible();
        await page.getByTestId("modal-toast-push").click();
        await expect(toasts(page)).toHaveCount(2);
        const hidden = await stack(page).evaluate((region) => {
            for (let node: Element | null = region; node; node = node.parentElement) {
                if (node.getAttribute("aria-hidden") === "true" || node.hasAttribute("inert")) return true;
            }
            return false;
        });
        expect(hidden).toBe(false);
        await expect(toasts(page).last().getByRole("status")).toContainText("Saved");
        // Both are above the footer.
        const footer = await box(dialog(page, "New quiz round").locator("footer"));
        expect(await bottomOf(toasts(page).last())).toBeLessThanOrEqual(Math.round(footer.y));
    });
});

test.describe("A toast and an open overlay, at the other sizes", () => {
    test("little room (sideways, keyboard up): the stack keeps between the header and the footer, and scrolls", async ({
        browser,
    }) => {
        const context = await browser.newContext({ viewport: LANDSCAPE, hasTouch: true, isMobile: true });
        const page = await context.newPage();
        await gotoLab(page);
        // Two toasts: more than fits in the little room there will be.
        await page.getByTestId("toast-push").click();
        await page.getByTestId("toast-push").click();
        await expect(toasts(page)).toHaveCount(2);
        await page.getByTestId("sheet-open").click();
        const sheet = dialog(page, "Filters");
        await expect(sheet).toBeVisible();
        await expect.poll(() => sheet.evaluate((el) => el.getAnimations().length)).toBe(0);
        const apply = page.getByTestId("sheet-apply");
        const close = sheet.getByRole("button", { name: "Close" });
        const within = async () => {
            const area = await box(stack(page));
            const top = await box(close);
            const end = await box(apply);
            return area.y >= top.y + top.height && Math.round(area.y + area.height) <= Math.round(end.y);
        };
        await expect.poll(within, "Below Close and above Apply").toBe(true);

        // A keyboard that leaves 200px: about 70px between the header and the footer.
        await setVisualViewportHeight(page, 200);
        await expect.poll(() => bottomOf(sheet)).toBe(200);
        await expect.poll(within, "Still below Close and above Apply").toBe(true);
        expect(await hitAtCentre(close), "Close takes a press").toBe(true);
        expect(await hitAtCentre(apply), "Nothing lies over Apply").toBe(true);
        // What does not fit is scrolled to: the newest toast is the one in view.
        await expect(stack(page)).toHaveCSS("overflow-y", "auto");
        expect(await stack(page).evaluate((el) => el.scrollTop)).toBeGreaterThan(0);

        await setVisualViewportHeight(page, null);
        await expect.poll(within).toBe(true);
        await context.close();
    });

    test("on a desktop a centred modal's footer is nowhere near the stack: nothing moves", async ({
        browser,
    }) => {
        const context = await browser.newContext({ viewport: DESKTOP });
        const page = await context.newPage();
        await gotoLab(page);
        await page.getByTestId("toast-push").click();
        await expect(toasts(page).first()).toBeVisible();
        await expect(toasts(page).first()).toHaveCSS("opacity", "1");
        const rest = async () => {
            const region = await box(stack(page));
            return {
                x: region.x,
                width: region.width,
                right: DESKTOP.width - (region.x + region.width),
                bottom: DESKTOP.height - (region.y + region.height),
            };
        };
        await expect.poll(rest).toEqual({ x: 880, width: 384, right: 16, bottom: 16 });
        await page.getByTestId("modal-plain-open").click();
        await expect(dialog(page, "Confirm changes")).toBeVisible();
        await page.waitForTimeout(300);
        expect(await rest()).toEqual({ x: 880, width: 384, right: 16, bottom: 16 });
        await context.close();
    });

    test("on a desktop a full-screen modal's footer is under the stack: the stack moves above it", async ({
        browser,
    }) => {
        const context = await browser.newContext({ viewport: DESKTOP });
        const page = await context.newPage();
        await gotoLab(page);
        await page.getByTestId("toast-push").click();
        await expect(toasts(page).first()).toBeVisible();
        await page.getByTestId("modal-form-open").click();
        const footer = dialog(page, "New quiz round").locator("footer");
        await expect
            .poll(async () => (await bottomOf(toasts(page).first())) <= Math.round((await box(footer)).y))
            .toBe(true);
        expect(await hitAtCentre(page.getByTestId("modal-form-save"))).toBe(true);
        await context.close();
    });
});

test.describe("Toasts at 320px with the text at 200%", () => {
    test("the title has room: the buttons go under it; four toasts stay on screen and can all be reached", async ({
        browser,
    }) => {
        // Not `isMobile`: that zooms a page out when its text outgrows it.
        const context = await browser.newContext({ viewport: NARROW, hasTouch: true });
        const page = await context.newPage();
        await gotoLab(page);
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        await page.getByTestId("toast-push").click();
        const first = toasts(page).first();
        await expect(first).toBeVisible();
        await expect(first).toHaveCSS("opacity", "1");

        const title = await box(first.locator("h4"));
        const dismiss = await box(first.getByRole("button", { name: "Dismiss notification" }));
        expect(title.width, "The title has a line's worth of width").toBeGreaterThanOrEqual(150);
        expect(dismiss.y, "The buttons are on a line of their own, under it").toBeGreaterThanOrEqual(
            title.y + title.height - 1,
        );
        expect(dismiss.x + dismiss.width).toBeLessThanOrEqual(NARROW.width - 16);
        expect(dismiss.height).toBeGreaterThanOrEqual(44);

        // The first toast lies over the button by now: pressed from the keyboard's side.
        for (let more = 0; more < 3; more += 1) {
            await page.getByTestId("toast-push").evaluate((el) => (el as HTMLElement).click());
        }
        await expect(toasts(page)).toHaveCount(4);
        const region = await box(stack(page));
        expect(region.y, "The stack ends at the top of the screen, not above it").toBeGreaterThanOrEqual(0);
        expect(region.y + region.height).toBeLessThanOrEqual(NARROW.height);
        expect(
            await stack(page).evaluate((el) => el.scrollHeight > el.clientHeight),
            "Four do not fit: the stack scrolls",
        ).toBe(true);
        await expect(stack(page)).toHaveCSS("overflow-y", "auto");

        // The newest is the one in view; the oldest is reached by scrolling, or by the keyboard.
        // (Measured once it has arrived: a toast flies in from 18px below.)
        await expect(toasts(page).last()).toHaveCSS("opacity", "1");
        await expect.poll(() => toasts(page).last().evaluate((el) => el.getAnimations().length)).toBe(0);
        const last = await box(toasts(page).last());
        expect(last.y + last.height).toBeLessThanOrEqual(NARROW.height);
        expect(last.y).toBeGreaterThanOrEqual(0);
        await toasts(page).first().getByRole("button", { name: "Dismiss notification" }).focus();
        const oldest = await box(toasts(page).first().getByRole("button", { name: "Dismiss notification" }));
        expect(oldest.y, "Focus brought the oldest toast into view").toBeGreaterThanOrEqual(0);
        expect(oldest.y + oldest.height).toBeLessThanOrEqual(NARROW.height);

        // A wheel over a toast scrolls the stack, though the stack itself lets presses through.
        await stack(page).evaluate((el) => (el.scrollTop = el.scrollHeight));
        const from = await stack(page).evaluate((el) => el.scrollTop);
        const over = await box(toasts(page).last());
        await page.mouse.move(over.x + over.width / 2, over.y + over.height / 2);
        await page.mouse.wheel(0, -200);
        await expect.poll(() => stack(page).evaluate((el) => el.scrollTop)).toBeLessThan(from);
        await context.close();
    });

    test("a finger on a toast scrolls the stack, not the page under it", async ({ browser }) => {
        const context = await browser.newContext({ viewport: NARROW, hasTouch: true });
        const page = await context.newPage();
        await gotoLab(page);
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        for (let count = 0; count < 4; count += 1) {
            await page.getByTestId("toast-push").evaluate((el) => (el as HTMLElement).click());
        }
        await expect(toasts(page)).toHaveCount(4);
        await expect(stack(page)).toHaveCSS("overflow-y", "auto");
        await expect.poll(() => toasts(page).last().evaluate((el) => el.getAnimations().length)).toBe(0);
        // The stack takes no presses itself; its toasts do.
        await expect(stack(page)).toHaveCSS("pointer-events", "none");

        const scrollTop = () => stack(page).evaluate((el) => Math.round(el.scrollTop));
        const end = await stack(page).evaluate((el) => el.scrollHeight - el.clientHeight);
        await expect.poll(scrollTop, "The newest toast is the one shown").toBe(end);
        const pageAt = await page.evaluate(() => window.scrollY);

        // Down the screen with a finger that starts on the newest toast: towards the older ones.
        const newest = await box(toasts(page).last());
        const from = { x: newest.x + 40, y: newest.y + 40 };
        await touchDrag(page, from, { x: from.x, y: from.y + 220 });
        await expect.poll(scrollTop).toBeLessThan(end - 100);
        expect(await page.evaluate(() => window.scrollY), "The page stayed where it was").toBe(pageAt);

        // All the way: the oldest toast is whole, at the top of the stack.
        for (let more = 0; more < 8; more += 1) {
            await touchDrag(page, { x: 60, y: 150 }, { x: 60, y: 500 }, { duration: 150, hold: 50 });
        }
        await expect.poll(scrollTop).toBe(0);
        const oldest = await box(toasts(page).first());
        expect(oldest.y, "The oldest toast is on screen from its top edge").toBeGreaterThanOrEqual(0);
        expect(await hitAtCentre(toasts(page).first().getByRole("button", { name: "Dismiss notification" }))).toBe(
            true,
        );
        await context.close();
    });

    test("at 320px with ordinary text the buttons stay beside the title", async ({ browser }) => {
        const context = await browser.newContext({ viewport: NARROW, hasTouch: true, isMobile: true });
        const page = await context.newPage();
        await gotoLab(page);
        await page.getByTestId("toast-push").click();
        const first = toasts(page).first();
        await expect(first).toHaveCSS("opacity", "1");
        const title = await box(first.locator("h4"));
        const dismiss = await box(first.getByRole("button", { name: "Dismiss notification" }));
        expect(dismiss.y, "On the title's line").toBeLessThan(title.y + title.height);
        expect(dismiss.x).toBeGreaterThanOrEqual(title.x + title.width);
        await context.close();
    });
});

test.describe("Toast atom: its close button on a touch screen", () => {
    test.use({ viewport: PHONE, hasTouch: true, isMobile: true });

    for (const direction of ["ltr", "rtl"] as const) {
        test(`takes a touch across the whole 44px, to the pixel (${direction})`, async ({ page }) => {
            await gotoLab(page);
            await page.evaluate((dir) => (document.documentElement.dir = dir), direction);
            await page.getByTestId("top-toast-toggle").click();
            const close = page.getByRole("button", { name: "Close notification" });
            await expect(close).toBeVisible();
            const misses = await close.evaluate((el) => {
                const rect = el.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                const out: string[] = [];
                // Just inside each edge of a 44px square around the centre.
                for (const [dx, dy] of [
                    [0, 0],
                    [-21.5, 0],
                    [21.5, 0],
                    [0, -21.5],
                    [0, 21.5],
                    [21.5, 21.5],
                    [21.5, -21.5],
                    [-21.5, 21.5],
                    [-21.5, -21.5],
                ]) {
                    const hit = document.elementFromPoint(x + dx, y + dy);
                    if (hit !== el && !el.contains(hit)) out.push(`${dx},${dy}`);
                }
                return out;
            });
            expect(misses).toEqual([]);
        });
    }
});

test.describe("Overlays and the on-screen keyboard (emulated visual viewport)", () => {
    test.use({ viewport: PHONE, hasTouch: true, isMobile: true });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
    });

    test("full-screen Modal: the footer rides above the keyboard and the focused field stays in view", async ({
        page,
    }) => {
        await page.getByTestId("modal-form-open").click();
        const panel = dialog(page, "New quiz round");
        await expect(panel).toBeVisible();
        const save = page.getByTestId("modal-form-save");
        await expect.poll(() => bottomOf(panel)).toBe(PHONE.height);
        const restGap = PHONE.height - (await bottomOf(save));

        const field = panel.getByLabel("Question 14");
        await field.focus();
        await setVisualViewportHeight(page, ABOVE_KEYBOARD);
        await expect.poll(() => bottomOf(panel), "The panel ends at the keyboard").toBe(ABOVE_KEYBOARD);
        expect((await box(panel)).y, "And still starts at the top").toBe(0);
        expect(ABOVE_KEYBOARD - (await bottomOf(save)), "Save is as far above it as it was above the edge").toBe(
            restGap,
        );
        const footer = await box(panel.locator("footer"));
        const focused = await box(field);
        expect(focused.y + focused.height, "The field is above the footer").toBeLessThanOrEqual(footer.y);
        expect(focused.y).toBeGreaterThanOrEqual((await box(panel.locator("header"))).y);
        expect(await hitAtCentre(field)).toBe(true);

        await setVisualViewportHeight(page, null);
        await expect.poll(() => bottomOf(panel)).toBe(PHONE.height);
    });

    test("a Modal at the bottom of a phone: all of it is above the keyboard", async ({ page }) => {
        await page.getByTestId("modal-plain-open").click();
        const panel = dialog(page, "Confirm changes");
        await expect(panel).toBeVisible();
        await expect.poll(() => bottomOf(panel)).toBe(PHONE.height);
        await setVisualViewportHeight(page, ABOVE_KEYBOARD);
        await expect.poll(() => bottomOf(panel)).toBe(ABOVE_KEYBOARD);
        expect(await bottomOf(panel.getByRole("button", { name: "Confirm" }))).toBeLessThanOrEqual(ABOVE_KEYBOARD);
        expect((await box(panel)).y).toBeGreaterThanOrEqual(0);

        // A keyboard that leaves less than the modal is tall: it shrinks to fit and scrolls.
        await setVisualViewportHeight(page, 120);
        await expect.poll(() => bottomOf(panel)).toBe(120);
        expect((await box(panel)).y).toBeGreaterThanOrEqual(0);
    });

    test("BottomSheet: its bottom edge follows the keyboard, half is half of what is left, the footer shows", async ({
        page,
    }) => {
        await page.getByTestId("sheet-open").click();
        const sheet = dialog(page, "Filters");
        await expect(sheet).toBeVisible();
        await expect.poll(() => sheet.evaluate((el) => el.getAnimations().length)).toBe(0);
        await expect.poll(() => bottomOf(sheet)).toBe(PHONE.height);
        expect(Math.round((await box(sheet)).height), "Half of 740").toBe(370);

        const field = sheet.getByLabel("Quizmaster");
        await field.focus();
        await setVisualViewportHeight(page, ABOVE_KEYBOARD);
        await expect.poll(() => bottomOf(sheet)).toBe(ABOVE_KEYBOARD);
        // Half of 420 is under the 18rem floor: 288px, all of it above the keyboard.
        await expect.poll(async () => Math.round((await box(sheet)).height)).toBe(288);
        const apply = page.getByTestId("sheet-apply");
        expect(await bottomOf(apply), "The footer is above the keyboard").toBeLessThanOrEqual(ABOVE_KEYBOARD);
        expect(await hitAtCentre(apply)).toBe(true);
        const focused = await box(field);
        expect(focused.y + focused.height, "The focused field is above the footer").toBeLessThanOrEqual(
            (await box(apply)).y,
        );
        expect(focused.y).toBeGreaterThanOrEqual((await box(sheet)).y);

        // Expanded: full is down from the top to the keyboard.
        await sheet.getByRole("button", { name: "Expand" }).tap();
        await expect.poll(async () => Math.round((await box(sheet)).height)).toBe(ABOVE_KEYBOARD);
        expect(await bottomOf(sheet)).toBe(ABOVE_KEYBOARD);

        await setVisualViewportHeight(page, null);
        await expect.poll(() => bottomOf(sheet)).toBe(PHONE.height);
        await expect.poll(async () => Math.round((await box(sheet)).height)).toBe(PHONE.height);
    });

    test("SlideUp and Drawer: what they end with is above the keyboard too", async ({ page }) => {
        await page.getByTestId("slide-open").click();
        const slide = dialog(page, "Rename team");
        await expect(slide).toBeVisible();
        await expect.poll(() => bottomOf(slide)).toBe(PHONE.height);
        await setVisualViewportHeight(page, ABOVE_KEYBOARD);
        await expect.poll(() => bottomOf(slide)).toBe(ABOVE_KEYBOARD);
        expect(await bottomOf(page.getByTestId("slide-save"))).toBeLessThanOrEqual(ABOVE_KEYBOARD);
        await setVisualViewportHeight(page, null);
        await expect.poll(() => bottomOf(slide)).toBe(PHONE.height);
        await page.keyboard.press("Escape");
        await expect(slide).toBeHidden();

        await page.getByTestId("drawer-open").click();
        const drawer = dialog(page, "Team");
        await expect(drawer).toBeVisible();
        await expect.poll(() => drawer.evaluate((el) => el.getAnimations().length)).toBe(0);
        await expect.poll(() => bottomOf(drawer)).toBe(PHONE.height);
        await setVisualViewportHeight(page, ABOVE_KEYBOARD);
        await expect.poll(() => bottomOf(drawer)).toBe(ABOVE_KEYBOARD);
        expect(await bottomOf(page.getByTestId("drawer-save"))).toBeLessThanOrEqual(ABOVE_KEYBOARD);
        expect(await hitAtCentre(page.getByTestId("drawer-save"))).toBe(true);
    });

    test("where the browser has panned the screen, the overlay keeps to what can be seen", async ({ page }) => {
        await page.getByTestId("modal-form-open").click();
        const panel = dialog(page, "New quiz round");
        await expect(panel).toBeVisible();
        await expect.poll(() => bottomOf(panel)).toBe(PHONE.height);
        const root = panel.locator("xpath=..");
        const close = panel.getByRole("button", { name: "Close" });
        const save = page.getByTestId("modal-form-save");
        const keyboard = PHONE.height - ABOVE_KEYBOARD;
        await expect(root).toHaveCSS("box-shadow", "none");

        // Panned 60px: what can be seen is 60 to 480 of the page.
        await setVisualViewport(page, ABOVE_KEYBOARD, 60);
        await expect.poll(() => bottomOf(panel)).toBe(60 + ABOVE_KEYBOARD);
        expect(Math.round((await box(panel)).y), "The panel starts where the screen does").toBe(60);
        expect((await box(close)).y, "The close button is on screen").toBeGreaterThanOrEqual(60);
        expect(await bottomOf(save), "And so is Save").toBeLessThanOrEqual(60 + ABOVE_KEYBOARD);
        // The root is the backdrop: its dimming goes on over what it has left.
        await expect(root).not.toHaveCSS("box-shadow", "none");

        // Panned all the way: the keyboard covers nothing of the page, and
        // its top 320px are above the screen. The panel is not up there.
        await setVisualViewport(page, ABOVE_KEYBOARD, keyboard);
        await expect.poll(async () => Math.round((await box(panel)).y)).toBe(keyboard);
        expect(await bottomOf(panel)).toBe(PHONE.height);
        expect((await box(close)).y).toBeGreaterThanOrEqual(keyboard);
        expect(await bottomOf(save)).toBeLessThanOrEqual(PHONE.height);

        await clearVisualViewport(page);
        await expect.poll(() => bottomOf(panel)).toBe(PHONE.height);
        expect(Math.round((await box(panel)).y)).toBe(0);
        await expect(root).toHaveCSS("box-shadow", "none");
        expect(await root.evaluate((el) => (el as HTMLElement).style.top)).toBe("");
        await expect(root).not.toHaveAttribute("data-keyboard-open", /.*/);
    });

    test("without a keyboard nothing is moved: no inline position on any overlay", async ({ page }) => {
        for (const [opener, title] of [
            ["modal-form-open", "New quiz round"],
            ["sheet-open", "Filters"],
            ["slide-open", "Rename team"],
            ["drawer-open", "Team"],
        ] as const) {
            await page.getByTestId(opener).click();
            const panel = dialog(page, title);
            await expect(panel).toBeVisible();
            const root = panel.locator("xpath=..");
            expect(await root.evaluate((el) => (el as HTMLElement).style.bottom)).toBe("");
            await expect(root).not.toHaveAttribute("data-keyboard-open", /.*/);
            await page.keyboard.press("Escape");
            await expect(panel).toBeHidden();
        }
    });
});

test.describe("FloatingActionButton and the row that has focus", () => {
    for (const extended of [false, true]) {
        test(`${extended ? "extended" : "round"}: tabbing down full-width rows never leaves one under it`, async ({
            page,
        }) => {
            await page.setViewportSize(PHONE);
            await gotoLab(page);
            await page.getByTestId(extended ? "rows-open-extended" : "rows-open").click();
            const shell = page.getByTestId("rows-shell");
            await expect(shell).toBeVisible();
            const fab = page.getByTestId("rows-fab");
            const scroller = shell.locator("[data-app-shell-scroller]");
            const button = await box(fab);

            // What the button takes from the bottom of the scrolling area is reserved there.
            const area = await box(scroller);
            await expect
                .poll(() => scroller.evaluate((el) => parseFloat(el.style.scrollPaddingBottom)))
                .toBe(Math.ceil(area.y + area.height - button.y));

            const rows = shell.locator("[data-row]");
            await rows.first().focus();
            let worst = 0;
            for (let index = 1; index < 30; index += 1) {
                await page.keyboard.press("Tab");
                await expect(rows.nth(index)).toBeFocused();
                const row = await box(rows.nth(index));
                const under = Math.max(0, row.y + row.height - button.y);
                worst = Math.max(worst, under / row.height);
            }
            expect(worst, "The share of a focused row that lay under the button").toBe(0);
            expect((await box(fab)).y, "The button did not move").toBe(button.y);
        });
    }

    test("it gives the room back when it goes", async ({ page }) => {
        await page.setViewportSize(PHONE);
        await gotoLab(page);
        expect(await page.evaluate(() => document.documentElement.style.scrollPaddingBottom)).toBe("");
        await page.getByTestId("fab-toggle").click();
        await expect(page.getByTestId("lab-fab")).toBeVisible();
        // Fixed to the screen here: 56px of button and 16px under it.
        await expect
            .poll(() => page.evaluate(() => document.documentElement.style.scrollPaddingBottom))
            .toBe("72px");
        await page.getByTestId("fab-toggle").evaluate((el) => (el as HTMLElement).click());
        await expect(page.getByTestId("lab-fab")).toBeHidden();
        expect(await page.evaluate(() => document.documentElement.style.scrollPaddingBottom)).toBe("");
    });
});
