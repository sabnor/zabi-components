import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * The second round of QA findings on toasts, overlays and tooltips: a toast
 * stack that covered the close button of the overlay under it, sat behind the
 * keyboard, or lay over the Save of a SlideUp; a grip that a mouse could not
 * press; two tooltips open at once; side arrows that pointed away.
 *
 * No keyboard can be raised here. Where a test says "keyboard", the `height`
 * of `window.visualViewport` is overridden with a smaller value and its
 * `resize` event dispatched, which is what a browser reports when a keyboard
 * covers the page without shrinking it. The fixture is /phone-lab.
 */

const PHONE = { width: 375, height: 740 };
const NARROW = { width: 320, height: 568 };
const LANDSCAPE = { width: 667, height: 375 };
const DESKTOP = { width: 1280, height: 800 };

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

/** True when a press at the centre of `locator` lands on it. */
const hitAtCentre = (locator: Locator) =>
    locator.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        return hit === el || el.contains(hit);
    });

const stack = (page: Page) => page.locator("[data-zabi-toaster]");
const toasts = (page: Page) => stack(page).locator("[data-toast-id]");
const dialog = (page: Page, name: string) => page.getByRole("dialog", { name });

/** Pressed from the page's side: a toast may lie over the button by now. */
async function pushToasts(page: Page, count: number) {
    for (let pushed = 0; pushed < count; pushed += 1) {
        await page.getByTestId("toast-push").evaluate((el) => (el as HTMLElement).click());
    }
    await expect(toasts(page)).toHaveCount(count);
    await expect(toasts(page).last()).toHaveCSS("opacity", "1");
}

async function settled(panel: Locator) {
    await expect(panel).toBeVisible();
    await expect.poll(() => panel.evaluate((el) => el.getAnimations().length)).toBe(0);
}

const intersects = (a: { x: number; y: number; width: number; height: number }, b: typeof a) =>
    a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;

/** Every overlay of the lab: what opens it, its name, and the button its footer ends with, if it has one. */
const OVERLAYS = [
    { opener: "modal-form-open", title: "New quiz round", action: "Save round" },
    { opener: "modal-plain-open", title: "Confirm changes", action: "Confirm" },
    { opener: "modal-mobile-open", title: "Edit team", action: "Save" },
    { opener: "sheet-open", title: "Filters", action: "Apply" },
    { opener: "drawer-open", title: "Team", action: "Save" },
    { opener: "slide-open", title: "Rename team", action: null },
    { opener: "slide-form-open", title: "Edit note", action: "Save note" },
] as const;

for (const [name, viewport, aboveKeyboard] of [
    ["375px", PHONE, 420],
    ["320px", NARROW, 300],
    ["667x375", LANDSCAPE, 200],
] as const) {
    for (const keyboard of [false, true]) {
        test.describe(`Toasts over an open overlay, ${name}${keyboard ? ", keyboard up" : ""}`, () => {
            test.use({ viewport, hasTouch: true, isMobile: true });

            for (const overlay of OVERLAYS) {
                test(`${overlay.title}: its close button takes a press, and so does its footer`, async ({
                    page,
                }) => {
                    await gotoLab(page);
                    await pushToasts(page, 4);
                    await page.getByTestId(overlay.opener).evaluate((el) => (el as HTMLElement).click());
                    const panel = dialog(page, overlay.title);
                    await settled(panel);
                    if (keyboard) {
                        await setVisualViewportHeight(page, aboveKeyboard);
                        await expect.poll(() => bottomOf(panel)).toBeLessThanOrEqual(aboveKeyboard);
                    }
                    const visibleBottom = keyboard ? aboveKeyboard : viewport.height;

                    const close = panel.getByRole("button", { name: "Close" });
                    await expect
                        .poll(() => hitAtCentre(close), "A press at the centre of Close lands on Close")
                        .toBe(true);
                    const closeBox = await box(close);
                    for (const toast of await toasts(page).all()) {
                        const rect = await toast.boundingBox();
                        // A toast scrolled out of a capped stack is clipped by it.
                        if (!rect) continue;
                        const area = await box(stack(page));
                        const shown = {
                            x: rect.x,
                            width: rect.width,
                            y: Math.max(rect.y, area.y),
                            height: Math.min(rect.y + rect.height, area.y + area.height) - Math.max(rect.y, area.y),
                        };
                        if (shown.height <= 0) continue;
                        expect(intersects(shown, closeBox), "No toast lies over Close").toBe(false);
                    }

                    if (overlay.action) {
                        const action = panel.getByRole("button", { name: overlay.action, exact: true });
                        const at = await box(action);
                        // A full-screen modal too cramped to pin its footer scrolls as a whole:
                        // the button is then below what can be seen, and not under a toast.
                        if (at.y + at.height <= visibleBottom) {
                            expect(await hitAtCentre(action), `Nothing lies over ${overlay.action}`).toBe(true);
                        }
                    }

                    // The stack is on screen, above the keyboard, and whatever does not fit can be scrolled to.
                    const area = await box(stack(page));
                    expect(area.y).toBeGreaterThanOrEqual(0);
                    expect(Math.round(area.y + area.height)).toBeLessThanOrEqual(visibleBottom);
                    const fits = await stack(page).evaluate((el) => el.scrollHeight <= el.clientHeight + 1);
                    if (!fits) await expect(stack(page)).toHaveCSS("overflow-y", "auto");
                });
            }
        });
    }
}

test.describe("Toasts, the keyboard and what is under them", () => {
    test.use({ viewport: PHONE, hasTouch: true, isMobile: true });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
    });

    test("a toast raised while the keyboard is up sits above the keyboard", async ({ page }) => {
        await setVisualViewportHeight(page, 420);
        await pushToasts(page, 1);
        await expect.poll(() => bottomOf(toasts(page).first()), "16px above the keyboard").toBe(420 - 16);
        // And one that was there before the keyboard came follows it up, and back down.
        await setVisualViewportHeight(page, null);
        await expect.poll(() => bottomOf(toasts(page).first())).toBe(PHONE.height - 16);
        await setVisualViewportHeight(page, 420);
        await expect.poll(() => bottomOf(toasts(page).first())).toBe(420 - 16);
    });

    test("a keyboard that shrinks the page lifts nothing a second time", async ({ page }) => {
        await pushToasts(page, 1);
        // The layout viewport itself is shorter: the visual one is no shorter than it.
        await page.setViewportSize({ width: PHONE.width, height: 420 });
        await expect.poll(() => bottomOf(toasts(page).first())).toBe(420 - 16);
        expect(await stack(page).evaluate((el) => el.style.getPropertyValue("--toaster-overlay-inset"))).toBe("");
    });

    test("SlideUp with a footer: the content scrolls, the footer stays, the toast is off it", async ({
        page,
    }) => {
        await pushToasts(page, 1);
        await page.getByTestId("slide-form-open").evaluate((el) => (el as HTMLElement).click());
        const panel = dialog(page, "Edit note");
        await settled(panel);
        const save = page.getByTestId("slide-form-save");
        const footer = panel.locator("[data-slide-up-footer]");
        const content = panel.locator("[data-slide-up-content]");

        await expect
            .poll(async () => Math.round((await box(footer)).y - (await bottomOf(toasts(page).first()))))
            .toBeGreaterThanOrEqual(0);
        expect(await hitAtCentre(save), "Nothing lies over Save note").toBe(true);

        expect(
            await content.evaluate((el) => el.scrollHeight > el.clientHeight),
            "The form is longer than the sheet, or this proves nothing",
        ).toBe(true);
        const before = await box(footer);
        const closeBefore = await box(panel.getByRole("button", { name: "Close" }));
        await content.evaluate((el) => (el.scrollTop = el.scrollHeight));
        expect(await box(footer)).toEqual(before);
        expect(await box(panel.getByRole("button", { name: "Close" }))).toEqual(closeBefore);
        expect(await panel.evaluate((el) => el.scrollTop), "The panel itself does not scroll").toBe(0);
        expect(Math.round(before.y + before.height)).toBe(PHONE.height);

        // Over the keyboard the footer is still the end of the sheet.
        await setVisualViewportHeight(page, 420);
        await expect.poll(() => bottomOf(footer)).toBe(420);
        expect(await hitAtCentre(save)).toBe(true);
    });

    test("SlideUp without a footer is the one box it was", async ({ page }) => {
        await page.getByTestId("slide-open").click();
        const panel = dialog(page, "Rename team");
        await settled(panel);
        await expect(panel).toHaveCSS("overflow-y", "auto");
        await expect(panel.locator("[data-slide-up-footer]")).toHaveCount(0);
        await expect(panel.locator("[data-slide-up-content]")).toHaveCount(0);
        expect(await bottomOf(panel)).toBe(PHONE.height);
    });

    test("--toaster-bottom-offset is for the page: over an overlay's footer it adds nothing", async ({
        page,
    }) => {
        // A tab bar of the page, and the 65px the lab gives the stack to clear it.
        await page.getByTestId("bar-toggle").click();
        const bar = page.getByTestId("standalone-bar");
        await expect(bar).toBeVisible();
        await pushToasts(page, 1);
        await expect
            .poll(async () => Math.round((await box(bar)).y - (await bottomOf(toasts(page).first()))))
            .toBe(16);

        await page.getByTestId("modal-form-open").evaluate((el) => (el as HTMLElement).click());
        const panel = dialog(page, "New quiz round");
        await settled(panel);
        const footer = panel.locator("footer");
        await expect
            .poll(
                async () => Math.round((await box(footer)).y - (await bottomOf(toasts(page).first()))),
                "16px above the footer, not 16px and the offset",
            )
            .toBe(16);
    });
});

test.describe("The grip of a sheet, with a mouse", () => {
    test.use({ viewport: DESKTOP });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
    });

    test("BottomSheet: a click on the grip steps the sheet, both ways", async ({ page }) => {
        await page.getByTestId("sheet-open").click();
        const sheet = dialog(page, "Filters");
        await settled(sheet);
        await expect(sheet).toHaveAttribute("data-snap", "half");
        const half = Math.round((await box(sheet)).height);

        await sheet.getByRole("button", { name: "Expand" }).click();
        await expect(sheet).toHaveAttribute("data-snap", "full");
        await expect.poll(async () => Math.round((await box(sheet)).height)).toBeGreaterThan(half);

        await sheet.getByRole("button", { name: "Collapse" }).click();
        await expect(sheet).toHaveAttribute("data-snap", "half");
        await expect.poll(async () => Math.round((await box(sheet)).height)).toBe(half);
    });

    test("BottomSheet: a drag on the grip moves the sheet, and is not a click", async ({ page }) => {
        await page.getByTestId("sheet-open").click();
        const sheet = dialog(page, "Filters");
        await settled(sheet);
        const grip = await box(sheet.locator("[data-sheet-grip]"));
        const x = grip.x + grip.width / 2;
        const y = grip.y + grip.height / 2;

        // Up, slowly, most of the way to the top: it settles at full.
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x, y - 150, { steps: 12 });
        await expect(sheet, "Following the pointer").toHaveAttribute("data-dragging", "true");
        await page.mouse.move(x, 40, { steps: 12 });
        await page.waitForTimeout(250);
        await page.mouse.up();
        await expect(sheet).toHaveAttribute("data-snap", "full");
        await expect(sheet).not.toHaveAttribute("data-dragging", "true");

        // Down past the lowest snap point: it closes.
        const top = await box(sheet.locator("[data-sheet-grip]"));
        await page.mouse.move(top.x + top.width / 2, top.y + top.height / 2);
        await page.mouse.down();
        await page.mouse.move(top.x + top.width / 2, DESKTOP.height - 40, { steps: 20 });
        await page.waitForTimeout(250);
        await page.mouse.up();
        await expect(sheet).toBeHidden();
    });

    test("SlideUp with swipeToClose: a drag on its grip closes it, and Close still takes a click", async ({
        page,
    }) => {
        await page.getByTestId("slide-swipe-open").click();
        const sheet = dialog(page, "Swipe me");
        await settled(sheet);
        const grip = await box(sheet.locator("[data-sheet-grip]"));
        const x = grip.x + grip.width / 2;
        const y = grip.y + grip.height / 2;

        // A short drag springs back.
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x, y + 20, { steps: 6 });
        await page.waitForTimeout(250);
        await page.mouse.up();
        await expect(sheet).toBeVisible();

        await sheet.getByRole("button", { name: "Close" }).click();
        await expect(sheet).toBeHidden();

        await page.getByTestId("slide-swipe-open").click();
        await settled(sheet);
        const again = await box(sheet.locator("[data-sheet-grip]"));
        await page.mouse.move(again.x + again.width / 2, again.y + again.height / 2);
        await page.mouse.down();
        await page.mouse.move(again.x + again.width / 2, again.y + 120, { steps: 12 });
        await page.waitForTimeout(250);
        await page.mouse.up();
        await expect(sheet).toBeHidden();
    });
});

test.describe("Tooltip with a mouse and a keyboard together", () => {
    test.use({ viewport: DESKTOP });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
    });

    const open = (page: Page) => page.locator('[role="tooltip"][data-visible="true"]');

    test("one at a time: focus moving to another trigger closes the one the mouse rests on", async ({
        page,
    }) => {
        const first = page.getByTestId("tip-left");
        const second = page.getByTestId("tip-info");
        await first.hover();
        await expect(open(page)).toHaveCount(1);
        await expect(first).toHaveAttribute("aria-describedby", /.+/);

        // The mouse does not move; the keyboard goes elsewhere.
        await second.focus();
        await expect(second).toHaveAttribute("aria-describedby", /.+/);
        await expect(open(page)).toHaveCount(1);
        await expect(open(page)).toHaveText("One point for each right answer");
        await expect(first).not.toHaveAttribute("aria-describedby", /.+/);
    });

    test("a diagonal way from a small trigger to the far end of its bubble keeps it open", async ({
        page,
    }) => {
        const trigger = page.getByTestId("tip-left");
        await trigger.hover();
        await expect(trigger).toHaveAttribute("aria-describedby", /.+/);
        const tooltip = page.locator(`[id="${await trigger.getAttribute("aria-describedby")}"]`);
        await expect(tooltip).toHaveCSS("opacity", "1");
        const from = await box(trigger);
        const to = await box(tooltip);
        expect(to.width, "A bubble much wider than its trigger, or this proves nothing").toBeGreaterThan(
            from.width * 4,
        );

        // From the lower part of the trigger to the far end of the bubble: a
        // shallow line that leaves the trigger through its side, not its top.
        const start = { x: from.x + from.width / 2, y: from.y + from.height - 6 };
        const end = { x: to.x + 6, y: to.y + to.height - 6 };
        await page.mouse.move(start.x, start.y);
        let outside = 0;
        for (let step = 1; step <= 30; step += 1) {
            const x = start.x + ((end.x - start.x) * step) / 30;
            const y = start.y + ((end.y - start.y) * step) / 30;
            await page.mouse.move(x, y);
            const on = await page.evaluate(
                ({ px, py }) => Boolean(document.elementFromPoint(px, py)?.closest(".tooltip-container")),
                { px: x, py: y },
            );
            if (!on) outside += 1;
            await expect(tooltip, `Open at step ${step}`).toHaveAttribute("data-visible", "true");
        }
        expect(outside, "The way did leave the tooltip, or this proves nothing").toBeGreaterThan(0);
        await page.waitForTimeout(500);
        await expect(tooltip, "It arrived: the tooltip stays").toBeVisible();

        // Straying off to the side closes it at once; so does stopping short for long.
        await page.mouse.move(end.x, end.y + 300, { steps: 4 });
        await expect(tooltip).toBeHidden();
    });

    test("a pointer that leaves and goes elsewhere closes it without waiting", async ({ page }) => {
        const trigger = page.getByTestId("tip-left");
        await trigger.hover();
        const tooltip = page.locator(`[id="${await trigger.getAttribute("aria-describedby")}"]`);
        await expect(tooltip).toHaveCSS("opacity", "1");
        const from = await box(trigger);
        // Downwards, away from a bubble that is above.
        await page.mouse.move(from.x + from.width / 2, from.y + from.height + 30, { steps: 3 });
        await page.mouse.move(from.x + from.width / 2, from.y + from.height + 60, { steps: 3 });
        await expect(tooltip).toHaveAttribute("data-visible", "false", { timeout: 250 });
    });
});

for (const direction of ["ltr", "rtl"] as const) {
    for (const strategy of ["plain", "fixed"] as const) {
        for (const placement of ["left", "right"] as const) {
            test(`Tooltip at the side: ${strategy}, ${placement}, ${direction}`, async ({ page }) => {
                await page.setViewportSize(DESKTOP);
                await gotoLab(page);
                await page.evaluate((dir) => (document.documentElement.dir = dir), direction);
                const trigger = page.getByTestId(`tip-${strategy}-${placement}`);
                await trigger.hover();
                await expect(trigger).toHaveAttribute("aria-describedby", /.+/);
                const tooltip = page.locator(`[id="${await trigger.getAttribute("aria-describedby")}"]`);
                await expect(tooltip).toHaveCSS("opacity", "1");
                await expect.poll(() => tooltip.evaluate((el) => el.getAnimations().length)).toBe(0);

                // `left` and `right` are the start and end side, except for the
                // fixed strategy, which is placed by `left` and `top`.
                const mirrored = direction === "rtl" && strategy === "plain";
                const side = mirrored ? (placement === "left" ? "right" : "left") : placement;

                const bubble = await box(tooltip);
                const target = await box(trigger);
                if (side === "left") {
                    expect(Math.round(target.x - (bubble.x + bubble.width)), "8px to the left of it").toBe(8);
                } else {
                    expect(Math.round(bubble.x - (target.x + target.width)), "8px to the right of it").toBe(8);
                }
                expect(
                    Math.abs(bubble.y + bubble.height / 2 - (target.y + target.height / 2)),
                    "Level with it",
                ).toBeLessThanOrEqual(1);

                // The arrow: on the edge of the bubble that faces the trigger, pointing at it.
                const arrow = await tooltip.evaluate((el) => {
                    const style = getComputedStyle(el, "::before");
                    return {
                        left: parseFloat(style.left),
                        right: parseFloat(style.right),
                        size: parseFloat(style.width),
                        shape: style.clipPath,
                        shown: style.display !== "none",
                    };
                });
                expect(arrow.shown).toBe(true);
                if (side === "left") {
                    expect(Math.round(arrow.left), "Past the bubble's right edge").toBe(Math.round(bubble.width));
                    expect(arrow.shape, "Pointing right, at the trigger").toMatch(/100% 50%/);
                } else {
                    expect(Math.round(arrow.right), "Past the bubble's left edge").toBe(Math.round(bubble.width));
                    expect(arrow.shape, "Pointing left, at the trigger").toMatch(/(^|[ (,])0(px|%)? 50%/);
                }
            });
        }
    }
}
