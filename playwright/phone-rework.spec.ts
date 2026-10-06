import { expect, test, type Locator, type Page } from "@playwright/test";

import { touchTap } from "./helpers/touch";

import { waitForHydration } from "./helpers/hydration";

/**
 * Tooltip, Toaster, Modal and Page on a phone: the parts jsdom cannot show.
 *
 * A tap is a finger sent through the DevTools protocol, so the browser makes
 * of it what it makes of a real one: pointer events of type "touch", then
 * focus, then the click. Safe-area insets are set through the same protocol;
 * without it they are zero, as on a desktop. Where a thing sits is measured,
 * and the desktop numbers are the ones measured before this work was done.
 *
 * The fixture is /phone-lab, a page for these tests only.
 */

const PHONE = { width: 375, height: 740 };
const NARROW = { width: 320, height: 568 };
const LANDSCAPE = { width: 667, height: 375 };
const DESKTOP = { width: 1280, height: 800 };

interface Insets {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

async function gotoLab(page: Page) {
    await page.goto("/phone-lab", { waitUntil: "domcontentloaded" });
    await expect(
        page.getByTestId("phone-lab-hydrated"),
        "The lab must hydrate before anything is pressed",
    ).toBeAttached({ timeout: 30_000 });
}

/** A notch and a home indicator: what `env(safe-area-inset-*)` reports. */
async function setSafeArea(page: Page, insets: Insets) {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets });
    await cdp.detach();
}

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

async function tap(page: Page, locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
    const rect = await box(locator);
    await touchTap(page, { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
}

const sidewaysScroll = (page: Page) =>
    page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

/** The tooltip a trigger is described by, once it is. */
async function tooltipOf(page: Page, trigger: Locator) {
    await expect(trigger).toHaveAttribute("aria-describedby", /.+/);
    const id = await trigger.getAttribute("aria-describedby");
    return page.locator(`[id="${id}"]`);
}

const padding = (locator: Locator) =>
    locator.evaluate((el) => {
        const style = getComputedStyle(el);
        return [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].join(" ");
    });

for (const viewport of [PHONE, NARROW]) {
    test.describe(`Tooltip on touch, ${viewport.width}px`, () => {
        test.use({ viewport, hasTouch: true, isMobile: true });

        test.beforeEach(async ({ page }) => {
            await gotoLab(page);
        });

        test("a tap opens it, the button still acts, and it goes again by itself", async ({ page }) => {
            const button = page.getByTestId("tip-button");
            await expect(page.getByTestId("tip-count")).toHaveText("Added 0");
            await tap(page, button);

            await expect(page.getByTestId("tip-count"), "The tap is still the button's click").toHaveText(
                "Added 1",
            );
            const tooltip = await tooltipOf(page, button);
            await expect(tooltip).toHaveRole("tooltip");
            await expect(tooltip).toHaveText("Adds a question to the round");
            await expect(tooltip).toBeVisible();

            // This one is given 2.5s (`touchDuration`); nothing has to be pressed for it to go.
            await expect(button).not.toHaveAttribute("aria-describedby", /.+/, { timeout: 5_000 });
            await expect(tooltip).toBeHidden();
            await expect(page.getByTestId("tip-count")).toHaveText("Added 1");
        });

        test("with no duration it stays, and a second tap closes it", async ({ page }) => {
            const info = page.getByTestId("tip-info");
            await tap(page, info);
            const tooltip = await tooltipOf(page, info);
            await expect(tooltip).toBeVisible();
            await page.waitForTimeout(3_000);
            await expect(tooltip, "touchDuration={0}: no timer").toBeVisible();

            await tap(page, info);
            await expect(tooltip).toBeHidden();
            await expect(info).not.toHaveAttribute("aria-describedby", /.+/);

            await tap(page, info);
            await expect(tooltip, "A third tap opens it again").toBeVisible();
        });

        test("a tap elsewhere, Escape, scrolling and focus leaving each close it", async ({ page }) => {
            const info = page.getByTestId("tip-info");

            await tap(page, info);
            const tooltip = await tooltipOf(page, info);
            await expect(tooltip).toBeVisible();
            await tap(page, page.getByRole("heading", { name: "Phone lab" }));
            await expect(tooltip, "A tap outside").toBeHidden();

            await tap(page, info);
            await expect(tooltip).toBeVisible();
            await page.keyboard.press("Escape");
            await expect(tooltip, "Escape").toBeHidden();

            await tap(page, info);
            await expect(tooltip).toBeVisible();
            await page.evaluate(() => window.scrollBy(0, 40));
            await expect(tooltip, "Scrolling").toBeHidden();

            await tap(page, info);
            await expect(tooltip).toBeVisible();
            await page.keyboard.press("Tab");
            await expect(info).not.toBeFocused();
            await expect(tooltip, "Focus leaving").toBeHidden();
        });

        test("the bubble stays inside the screen, clear of its trigger, and widens nothing", async ({
            page,
        }) => {
            // Closed tooltips take no room either: nothing scrolls sideways before a tap.
            expect(await sidewaysScroll(page)).toBe(0);

            for (const id of ["tip-left", "tip-right", "tip-side", "tip-button"]) {
                const trigger = page.getByTestId(id);
                await tap(page, trigger);
                const tooltip = await tooltipOf(page, trigger);
                await expect(tooltip).toBeVisible();
                // The 200ms fade also scales the bubble; measure it at rest.
                await expect(tooltip).toHaveCSS("opacity", "1");
                await page.waitForTimeout(250);

                const bubble = await box(tooltip);
                const target = await box(trigger);
                expect(bubble.x, `${id}: left edge on screen`).toBeGreaterThanOrEqual(0);
                expect(bubble.x + bubble.width, `${id}: right edge on screen`).toBeLessThanOrEqual(
                    viewport.width,
                );
                expect(bubble.y, `${id}: top edge on screen`).toBeGreaterThanOrEqual(0);
                const above = bubble.y + bubble.height <= target.y;
                const below = bubble.y >= target.y + target.height;
                expect(above || below, `${id}: above or below its trigger, not over it`).toBe(true);
                expect(await sidewaysScroll(page), `${id}: no sideways scroll`).toBe(0);

                await tap(page, page.getByRole("heading", { name: "Phone lab" }));
                await expect(tooltip).toBeHidden();
            }
        });

        test("right to left: centred on its trigger, and still inside the screen", async ({ page }) => {
            await page.evaluate(() => (document.documentElement.dir = "rtl"));
            expect(await sidewaysScroll(page)).toBe(0);

            const button = page.getByTestId("tip-button");
            await tap(page, button);
            const tooltip = await tooltipOf(page, button);
            await expect(tooltip).toHaveCSS("opacity", "1");
            await page.waitForTimeout(250);
            const bubble = await box(tooltip);
            const target = await box(button);
            expect(
                Math.abs(bubble.x + bubble.width / 2 - (target.x + target.width / 2)),
                "Centred over the button",
            ).toBeLessThanOrEqual(1);
            await tap(page, page.getByRole("heading", { name: "Phone lab" }));

            for (const id of ["tip-left", "tip-right", "tip-side"]) {
                const trigger = page.getByTestId(id);
                await tap(page, trigger);
                const edge = await tooltipOf(page, trigger);
                await expect(edge).toHaveCSS("opacity", "1");
                await page.waitForTimeout(250);
                const rect = await box(edge);
                expect(rect.x, `${id}: left edge on screen`).toBeGreaterThanOrEqual(0);
                expect(rect.x + rect.width, `${id}: right edge on screen`).toBeLessThanOrEqual(
                    viewport.width,
                );
                expect(await sidewaysScroll(page), `${id}: no sideways scroll`).toBe(0);
                await tap(page, page.getByRole("heading", { name: "Phone lab" }));
                await expect(edge).toBeHidden();
            }
        });

        test("with no room above, it opens below", async ({ page }) => {
            // The site's own bar sticks to the top and would take the tap.
            await page.getByRole("navigation", { name: "Main navigation" }).evaluate((el) => {
                (el.closest("header") ?? el).style.display = "none";
            });
            const trigger = page.getByTestId("tip-left");
            const at = await box(trigger);
            await page.evaluate((y) => window.scrollBy(0, y), at.y - 6);
            await expect.poll(async () => Math.round((await box(trigger)).y)).toBe(6);

            await tap(page, trigger);
            const tooltip = await tooltipOf(page, trigger);
            await expect(tooltip).toBeVisible();
            await expect(tooltip).toHaveAttribute("data-placement", "bottom");
            await page.waitForTimeout(250);
            const bubble = await box(tooltip);
            const target = await box(trigger);
            expect(bubble.y).toBeGreaterThanOrEqual(target.y + target.height);
            expect(bubble.x).toBeGreaterThanOrEqual(0);
        });
    });
}

test.describe("Tooltip with a mouse and a keyboard", () => {
    test.use({ viewport: DESKTOP });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
    });

    test("hover opens it, a click does not toggle it, leaving closes it", async ({ page }) => {
        const button = page.getByTestId("tip-button");
        await button.hover();
        const tooltip = await tooltipOf(page, button);
        await expect(tooltip).toBeVisible();
        await expect(tooltip).toHaveAttribute("data-placement", "top");

        await button.click();
        await expect(page.getByTestId("tip-count")).toHaveText("Added 1");
        await expect(tooltip, "A mouse click is not a tap").toBeVisible();
        // No timer for a mouse: it stays for as long as the pointer does.
        await page.waitForTimeout(3_000);
        await expect(tooltip).toBeVisible();

        await page.mouse.move(5, 5);
        await page.getByRole("heading", { name: "Phone lab" }).focus();
        await expect(tooltip).toBeHidden();
    });

    test("focus opens it and Escape closes it, with focus kept", async ({ page }) => {
        const info = page.getByTestId("tip-info");
        await info.focus();
        const tooltip = await tooltipOf(page, info);
        await expect(tooltip).toBeVisible();
        await page.waitForTimeout(3_000);
        await expect(tooltip, "No timer for the keyboard").toBeVisible();
        await page.keyboard.press("Escape");
        await expect(tooltip).toBeHidden();
        await expect(info).toBeFocused();
    });
});

const toasterRegion = (page: Page) => page.locator("[data-zabi-toaster]");
const firstToast = (page: Page) => toasterRegion(page).locator("[data-toast-id]").first();

for (const viewport of [PHONE, NARROW]) {
    test.describe(`Toaster on a phone, ${viewport.width}px`, () => {
        test.use({ viewport, hasTouch: true, isMobile: true });

        test.beforeEach(async ({ page }) => {
            await gotoLab(page);
        });

        test("spans the width with 16px on each side, 16px from the bottom", async ({ page }) => {
            await page.getByTestId("toast-push").click();
            await expect(firstToast(page)).toBeVisible();
            await expect(firstToast(page)).toHaveCSS("opacity", "1");
            const toast = await box(firstToast(page));
            expect(Math.round(toast.x)).toBe(16);
            expect(Math.round(toast.width)).toBe(viewport.width - 32);
            await expect
                .poll(async () => {
                    const rect = await box(firstToast(page));
                    return Math.round(viewport.height - (rect.y + rect.height));
                })
                .toBe(16);
            expect(await sidewaysScroll(page)).toBe(0);
        });

        test("keeps clear of the home indicator", async ({ page }) => {
            await setSafeArea(page, { bottom: 34 });
            await page.getByTestId("toast-push").click();
            await expect(firstToast(page)).toBeVisible();
            await expect
                .poll(async () => {
                    const rect = await box(firstToast(page));
                    return Math.round(viewport.height - (rect.y + rect.height));
                })
                .toBe(34 + 16);
        });

        test("sits above the tab bar of an AppShell, with and without a home indicator", async ({
            page,
        }) => {
            await page.getByTestId("shell-open").click();
            const bar = page.getByTestId("shell").getByRole("navigation", { name: "Main" });
            await expect(bar).toBeVisible();
            await page.getByTestId("shell-toast-push").click();
            await expect(firstToast(page)).toBeVisible();

            for (const bottom of [0, 34]) {
                await setSafeArea(page, { bottom });
                await expect
                    .poll(async () => {
                        const tabs = await box(bar);
                        const toast = await box(firstToast(page));
                        return Math.round(tabs.y - (toast.y + toast.height));
                    }, `16px above the bar with a ${bottom}px inset`)
                    .toBe(16);
                const tabs = await box(bar);
                expect(Math.round(tabs.y + tabs.height), "The bar reaches the bottom").toBe(
                    viewport.height,
                );
                // The bar is not covered: a tab is what a tap on it lands on.
                const hit = await page.evaluate(
                    ({ x, y }) => document.elementFromPoint(x, y)?.closest("nav")?.getAttribute("aria-label"),
                    { x: tabs.x + tabs.width / 2, y: tabs.y + 20 },
                );
                expect(hit).toBe("Main");
            }
        });

        test("clears a tab bar that stands alone, by --toaster-bottom-offset", async ({ page }) => {
            await setSafeArea(page, { bottom: 34 });
            await page.getByTestId("bar-toggle").click();
            const bar = page.getByTestId("standalone-bar");
            await expect(bar).toBeVisible();
            await page.getByTestId("toast-push").click();
            await expect(firstToast(page)).toBeVisible();
            await expect
                .poll(async () => {
                    const tabs = await box(bar);
                    const toast = await box(firstToast(page));
                    return Math.round(tabs.y - (toast.y + toast.height));
                })
                .toBe(16);
        });
    });
}

test.describe("Toaster and Toast at the other edges", () => {
    test("enlarged text at 320px: a toast is as wide as the screen allows, not wider", async ({
        browser,
    }) => {
        // Not `isMobile`: that zooms a page out when its text outgrows it.
        const context = await browser.newContext({ viewport: NARROW, hasTouch: true });
        const page = await context.newPage();
        await gotoLab(page);
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        await page.getByTestId("toast-push").click();
        await expect(firstToast(page)).toBeVisible();
        const toast = await box(firstToast(page));
        expect(Math.round(toast.x)).toBe(16);
        expect(Math.round(toast.x + toast.width)).toBe(NARROW.width - 16);

        // The toast shows its message now and lies over this button at this size: pressed from the page's side.
        await page.getByTestId("top-toast-toggle").evaluate((el) => (el as HTMLElement).click());
        const top = await box(page.getByRole("alert").filter({ hasText: "The round starts" }));
        expect(top.x).toBeGreaterThanOrEqual(0);
        expect(top.x + top.width).toBeLessThanOrEqual(NARROW.width);
        await context.close();
    });

    test("held sideways: the stack and a top toast keep clear of the notch", async ({ browser }) => {
        const context = await browser.newContext({ viewport: LANDSCAPE, hasTouch: true, isMobile: true });
        const page = await context.newPage();
        await gotoLab(page);
        await setSafeArea(page, { left: 47, right: 47, bottom: 21 });
        await page.getByTestId("toast-push").click();
        await expect(firstToast(page)).toBeVisible();
        const region = await box(toasterRegion(page));
        expect(Math.round(LANDSCAPE.width - (region.x + region.width))).toBe(47 + 16);
        expect(Math.round(LANDSCAPE.height - (region.y + region.height))).toBe(21 + 16);

        await page.getByTestId("top-toast-toggle").click();
        const top = await box(page.getByRole("alert").filter({ hasText: "The round starts" }));
        expect(Math.round(LANDSCAPE.width - (top.x + top.width))).toBe(47 + 16);
        await context.close();
    });

    test("under a status bar, a top toast starts below it", async ({ browser }) => {
        const context = await browser.newContext({ viewport: PHONE, hasTouch: true, isMobile: true });
        const page = await context.newPage();
        await gotoLab(page);
        await setSafeArea(page, { top: 47 });
        await page.getByTestId("top-toast-toggle").click();
        const top = await box(page.getByRole("alert").filter({ hasText: "The round starts" }));
        expect(Math.round(top.y)).toBe(47 + 16);
        expect(Math.round(top.x)).toBe(16);
        await context.close();
    });
});

const dialog = (page: Page, name: string) => page.getByTestId(`modal-${name}`);
const closeButton = (page: Page, name: string) => dialog(page, name).getByRole("button", { name: "Close" });

async function openModal(page: Page, name: string) {
    await page.getByTestId(`modal-${name}-open`).click();
    await expect(dialog(page, name)).toBeVisible();
    // The slide-up has finished: the panel is where it stays.
    await expect
        .poll(async () => Math.round((await box(dialog(page, name))).y + (await box(dialog(page, name))).height))
        .toBe(page.viewportSize()!.height);
}

/** True when the control takes a touch across 44 by 44px: the centre and four points 21px from it. */
function takesTouch(locator: Locator) {
    return locator.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        return [
            [0, 0],
            [-21, 0],
            [21, 0],
            [0, -21],
            [0, 21],
        ].every(([dx, dy]) => {
            const hit = document.elementFromPoint(x + dx, y + dy);
            return hit === el || el.contains(hit);
        });
    });
}

test.describe("Full-screen Modal on a phone", () => {
    test.use({ viewport: PHONE, hasTouch: true, isMobile: true });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
        await setSafeArea(page, { top: 47, bottom: 34 });
    });

    test("fills the screen, square, with the header and footer inside the safe areas", async ({
        page,
    }) => {
        await openModal(page, "form");
        const panel = await box(dialog(page, "form"));
        expect(panel).toEqual({ x: 0, y: 0, width: PHONE.width, height: PHONE.height });
        await expect(dialog(page, "form")).toHaveCSS("border-radius", "0px");
        await expect(dialog(page, "form")).toHaveCSS("border-top-width", "0px");

        const close = await box(closeButton(page, "form"));
        expect(close.y, "Below the status bar").toBeGreaterThanOrEqual(47);
        expect(close.x + close.width).toBeLessThanOrEqual(PHONE.width - 16);
        expect(await takesTouch(closeButton(page, "form")), "A 44px target").toBe(true);
        const title = await box(dialog(page, "form").getByRole("heading", { name: "New quiz round" }));
        expect(title.y).toBeGreaterThanOrEqual(47);

        const save = await box(page.getByTestId("modal-form-save"));
        expect(save.y + save.height, "Above the home indicator").toBeLessThanOrEqual(
            PHONE.height - 34,
        );
        expect(save.height).toBeGreaterThanOrEqual(44);
        expect(await sidewaysScroll(page)).toBe(0);
    });

    test("only the content scrolls: the close button and the footer stay", async ({ page }) => {
        await openModal(page, "form");
        const content = dialog(page, "form").locator("[data-modal-content]");
        expect(
            await content.evaluate((el) => el.scrollHeight > el.clientHeight),
            "The form must be longer than the screen, or this proves nothing",
        ).toBe(true);
        const closeBefore = await box(closeButton(page, "form"));
        const saveBefore = await box(page.getByTestId("modal-form-save"));

        await content.evaluate((el) => (el.scrollTop = el.scrollHeight));
        expect(await box(closeButton(page, "form"))).toEqual(closeBefore);
        expect(await box(page.getByTestId("modal-form-save"))).toEqual(saveBefore);
        expect(await dialog(page, "form").evaluate((el) => el.scrollTop)).toBe(0);

        // The last field has scrolled clear of the footer.
        const last = await box(dialog(page, "form").getByLabel("Question 14"));
        expect(last.y + last.height).toBeLessThanOrEqual(saveBefore.y);
    });

    test("keeps focus in, closes on Escape and gives focus back", async ({ page }) => {
        await openModal(page, "form");
        await expect(closeButton(page, "form")).toBeFocused();
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

        // Backwards from the first control is the last one; forwards from there is the first again.
        await page.keyboard.press("Shift+Tab");
        await expect(page.getByTestId("modal-form-save")).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(closeButton(page, "form")).toBeFocused();
        for (let presses = 0; presses < 20; presses += 1) {
            await page.keyboard.press("Tab");
            expect(
                await dialog(page, "form").evaluate((el) => el.contains(document.activeElement)),
                "Focus stays in the dialog",
            ).toBe(true);
        }

        await page.keyboard.press("Escape");
        await expect(dialog(page, "form")).toBeHidden();
        await expect(page.getByTestId("modal-last-close")).toHaveText("Last close: escape");
        await expect(page.getByTestId("modal-form-open")).toBeFocused();
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
    });

    test("the close button takes a tap", async ({ page }) => {
        await openModal(page, "form");
        await tap(page, closeButton(page, "form"));
        await expect(dialog(page, "form")).toBeHidden();
        await expect(page.getByTestId("modal-last-close")).toHaveText("Last close: close-button");
    });

    test("content with nothing to focus is a Tab stop, so the keyboard can scroll it", async ({
        page,
    }) => {
        await openModal(page, "text");
        const content = dialog(page, "text").locator("[data-modal-content]");
        await expect(content).toHaveAttribute("tabindex", "0");
        await page.keyboard.press("Tab");
        await expect(content).toBeFocused();
        await expect(content).toHaveCSS("outline-style", "solid");
        // The end of the text clears the home indicator.
        expect(await content.evaluate((el) => getComputedStyle(el).paddingBottom)).toBe("42px");
        await page.keyboard.press("Tab");
        await expect(closeButton(page, "text")).toBeFocused();
    });

    test('"mobile" is full screen here', async ({ page }) => {
        await openModal(page, "mobile");
        expect(await box(dialog(page, "mobile"))).toEqual({
            x: 0,
            y: 0,
            width: PHONE.width,
            height: PHONE.height,
        });
        await expect(dialog(page, "mobile")).toHaveCSS("border-radius", "0px");
    });

    test("a modal without fullScreen is the sheet it was", async ({ page }) => {
        await setSafeArea(page, {});
        await page.getByTestId("modal-plain-open").click();
        await expect(dialog(page, "plain")).toBeVisible();
        await expect
            .poll(async () => {
                const panel = await box(dialog(page, "plain"));
                return Math.round(panel.y + panel.height);
            })
            .toBe(PHONE.height);
        const panel = await box(dialog(page, "plain"));
        expect(panel.x).toBe(0);
        expect(panel.width).toBe(PHONE.width);
        expect(panel.height).toBeLessThan(PHONE.height / 2);
        await expect(dialog(page, "plain")).toHaveCSS("border-top-left-radius", "16px");
        await expect(dialog(page, "plain")).toHaveCSS("max-height", `${PHONE.height * 0.9}px`);
    });
});

test.describe("Full-screen Modal at the other sizes", () => {
    test("320px with the text at 200%: header, close and footer all on screen", async ({ browser }) => {
        const context = await browser.newContext({ viewport: NARROW, hasTouch: true });
        const page = await context.newPage();
        await gotoLab(page);
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        await openModal(page, "form");

        const panel = await box(dialog(page, "form"));
        expect(panel).toEqual({ x: 0, y: 0, width: NARROW.width, height: NARROW.height });
        const close = await box(closeButton(page, "form"));
        expect(close.x).toBeGreaterThanOrEqual(0);
        expect(close.x + close.width).toBeLessThanOrEqual(NARROW.width);
        expect(close.y).toBeGreaterThanOrEqual(0);
        expect(close.width, "The button keeps its size beside a long title").toBe(close.height);
        // The header is chrome and does not grow with the text (playwright/overlay-chrome.spec.ts):
        // the button is drawn at 32px, as at 100%, where it was 64px here. The touch it takes is
        // still 44 by 44px: the hit area around it, measured and then pressed at its corners.
        expect(close.width).toBe(32);
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
        const hitArea = await closeButton(page, "form").evaluate((el) => {
            const style = getComputedStyle(el, "::before");
            return { width: parseFloat(style.width), height: parseFloat(style.height), position: style.position };
        });
        expect(hitArea.position).toBe("absolute");
        expect(hitArea.width).toBeGreaterThanOrEqual(44);
        expect(hitArea.height).toBeGreaterThanOrEqual(44);
        for (const [dx, dy] of [
            [-21, -21],
            [21, -21],
            [-21, 21],
            [21, 21],
        ]) {
            const hit = await page.evaluate(
                ([x, y]) => document.elementFromPoint(x, y)?.closest("button")?.getAttribute("aria-label"),
                [close.x + close.width / 2 + dx, close.y + close.height / 2 + dy],
            );
            expect(hit, `A touch ${dx},${dy} from the centre of the button lands on it`).toBe(
                await closeButton(page, "form").getAttribute("aria-label"),
            );
        }

        for (const part of [dialog(page, "form"), dialog(page, "form").locator("[data-modal-content]")]) {
            expect(
                await part.evaluate((el) => el.scrollWidth <= el.clientWidth),
                "Nothing scrolls sideways",
            ).toBe(true);
        }
        // A three-line title and two rows of buttons leave the form too
        // little room at this size, so it keeps 120px and the panel scrolls:
        // the footer is reached by scrolling, not lost.
        expect(
            await dialog(page, "form")
                .locator("[data-modal-content]")
                .evaluate((el) => el.clientHeight),
        ).toBeGreaterThanOrEqual(120);
        for (const button of await dialog(page, "form").locator("footer button").all()) {
            await button.scrollIntoViewIfNeeded();
            const rect = await box(button);
            expect(rect.x).toBeGreaterThanOrEqual(0);
            expect(rect.x + rect.width).toBeLessThanOrEqual(NARROW.width);
            expect(rect.y).toBeGreaterThanOrEqual(0);
            expect(rect.y + rect.height).toBeLessThanOrEqual(NARROW.height);
            expect(rect.height).toBeGreaterThanOrEqual(44);
        }

        await page.keyboard.press("Escape");
        await expect(dialog(page, "form")).toBeHidden();
        await expect(page.getByTestId("modal-form-open")).toBeFocused();
        await context.close();
    });

    test("held sideways with a notch on each side: everything is between them", async ({ browser }) => {
        const context = await browser.newContext({ viewport: LANDSCAPE, hasTouch: true, isMobile: true });
        const page = await context.newPage();
        await gotoLab(page);
        await setSafeArea(page, { left: 47, right: 47, bottom: 21 });

        for (const name of ["form", "mobile"]) {
            await openModal(page, name);
            expect(await box(dialog(page, name)), `${name}: fills the screen`).toEqual({
                x: 0,
                y: 0,
                width: LANDSCAPE.width,
                height: LANDSCAPE.height,
            });
            const inside = [
                dialog(page, name).locator("h2"),
                closeButton(page, name),
                ...(await dialog(page, name).locator("footer button").all()),
                dialog(page, name).getByRole("textbox").first(),
            ];
            for (const part of inside) {
                const rect = await box(part);
                expect(rect.x, `${name}: clear of the left notch`).toBeGreaterThanOrEqual(47);
                expect(rect.x + rect.width, `${name}: clear of the right notch`).toBeLessThanOrEqual(
                    LANDSCAPE.width - 47,
                );
                expect(rect.y + rect.height, `${name}: above the home indicator`).toBeLessThanOrEqual(
                    LANDSCAPE.height - 21,
                );
            }
            expect(await takesTouch(closeButton(page, name))).toBe(true);
            await page.keyboard.press("Escape");
            await expect(dialog(page, name)).toBeHidden();
            await expect(page.getByTestId(`modal-${name}-open`)).toBeFocused();
        }
        await context.close();
    });
});

test.describe("Modal on a desktop", () => {
    test.use({ viewport: DESKTOP });

    test("default props: the size and place measured before fullScreen existed", async ({ page }) => {
        await page.goto("/components/Modal", { waitUntil: "domcontentloaded" });
        const panel = page.getByRole("dialog", { name: "Confirm changes" });
        await waitForHydration(page);
        await page.getByRole("button", { name: "Open modal" }).first().click();
        await expect(panel).toBeVisible();

        expect(await box(panel)).toEqual({ x: 416, y: 311, width: 448, height: 178 });
        expect(await box(panel.getByRole("button", { name: "Close" }))).toEqual({
            x: 807,
            y: 336,
            width: 32,
            height: 32,
        });
        expect((await box(panel.getByRole("heading", { name: "Confirm changes" }))).x).toBe(441);
        await expect(panel).toHaveCSS("border-radius", "16px");
        // 90dvh is 90vh where no browser bar comes and goes.
        await expect(panel).toHaveCSS("max-height", "720px");
        await expect(panel).not.toHaveAttribute("data-full-screen", /.*/);
    });

    test('"mobile" is the usual dialog here; true fills the window', async ({ page }) => {
        await gotoLab(page);

        await page.getByTestId("modal-plain-open").click();
        await expect(dialog(page, "plain")).toBeVisible();
        const plain = await box(dialog(page, "plain"));
        const plainFooter = await box(dialog(page, "plain").locator("footer"));
        const plainClose = await box(closeButton(page, "plain"));
        await page.keyboard.press("Escape");

        await page.getByTestId("modal-mobile-open").click();
        await expect(dialog(page, "mobile")).toBeVisible();
        const mobile = await box(dialog(page, "mobile"));
        expect(mobile.width).toBe(448);
        expect(mobile.x).toBe(plain.x);
        expect(Math.round(mobile.y + mobile.height / 2), "Centred").toBe(DESKTOP.height / 2);
        await expect(dialog(page, "mobile")).toHaveCSS("border-radius", "16px");
        await expect(dialog(page, "mobile")).toHaveCSS("max-height", "720px");
        // The same header, gutters and footer as a modal without the prop.
        const mobileClose = await box(closeButton(page, "mobile"));
        expect(mobileClose.x).toBe(plainClose.x);
        expect(mobileClose.y - mobile.y).toBe(plainClose.y - plain.y);
        const field = await box(dialog(page, "mobile").getByRole("textbox").first());
        expect(field.x - mobile.x, "24px gutter and the 1px border").toBe(25);
        expect((await box(dialog(page, "mobile").locator("footer"))).height).toBe(plainFooter.height);
        await page.keyboard.press("Escape");

        await page.getByTestId("modal-form-open").click();
        await expect(dialog(page, "form")).toBeVisible();
        expect(await box(dialog(page, "form"))).toEqual({
            x: 0,
            y: 0,
            width: DESKTOP.width,
            height: DESKTOP.height,
        });
        await expect(dialog(page, "form")).toHaveCSS("border-radius", "0px");
    });
});

const pageOf = (page: Page, id: string) => page.getByTestId(id).locator("> div");

test.describe("Page and the safe areas", () => {
    test("pads by the insets, and by nothing where there are none", async ({ browser }) => {
        const context = await browser.newContext({ viewport: LANDSCAPE, hasTouch: true, isMobile: true });
        const page = await context.newPage();
        await gotoLab(page);

        expect(await padding(pageOf(page, "page-default")), "No insets: no padding").toBe(
            "0px 0px 0px 0px",
        );
        await setSafeArea(page, { left: 47, right: 47, bottom: 21 });
        await expect.poll(() => padding(pageOf(page, "page-default"))).toBe("0px 47px 21px 47px");
        expect(await padding(pageOf(page, "page-off")), "safeArea={false}").toBe("0px 0px 0px 0px");
        expect(await sidewaysScroll(page)).toBe(0);

        // In an AppShell the shell has done it: the page adds nothing on top.
        await page.getByTestId("shell-open").click();
        await expect(page.getByTestId("shell")).toBeVisible();
        expect(await padding(pageOf(page, "page-in-shell"))).toBe("0px 0px 0px 0px");
        const text = await box(page.getByTestId("shell-toast-push"));
        expect(text.x, "The shell keeps it clear of the notch, once").toBe(47 + 16);
        await context.close();
    });

    test("upright: the bottom inset only", async ({ browser }) => {
        const context = await browser.newContext({ viewport: PHONE, hasTouch: true, isMobile: true });
        const page = await context.newPage();
        await gotoLab(page);
        await setSafeArea(page, { top: 47, bottom: 34 });
        await expect.poll(() => padding(pageOf(page, "page-default"))).toBe("0px 0px 34px 0px");
        await context.close();
    });

    test("on a desktop: where it was, with no padding", async ({ page }) => {
        await page.setViewportSize(DESKTOP);
        await page.goto("/components/Page", { waitUntil: "domcontentloaded" });
        // The docs page is itself a Page; the first one on it.
        const docs = page.locator("div.mx-auto.w-full.space-y-10").first();
        await expect(docs).toBeVisible();
        const rect = await box(docs);
        expect({ x: rect.x, y: rect.y, width: rect.width }).toEqual({ x: 325, y: 97, width: 896 });
        expect(await padding(docs)).toBe("0px 0px 0px 0px");
    });
});

test.describe("Toaster on a desktop", () => {
    test.use({ viewport: DESKTOP });

    test("in the corner it was in, the size it was", async ({ page }) => {
        await page.goto("/components/Toaster", { waitUntil: "domcontentloaded" });
        // One press, once the page can hear it. Pressing again until a toast
        // shows pushed two when the first press was heard and its toast took
        // more than a second to appear: the first toast in the region is then
        // the upper one, 130px from the bottom, until both time out. The
        // site's ThemeToggle only names its action once it has mounted, which
        // is after the page has hydrated.
        await expect(
            page.getByRole("button", { name: "Dark mode", exact: true }).first(),
            "The page must hydrate before the button is pressed",
        ).toBeAttached({ timeout: 30_000 });
        await page.getByRole("button", { name: "Push sample toast" }).first().click();
        await expect(firstToast(page)).toBeVisible();
        await expect(toasterRegion(page).first().locator("[data-toast-id]")).toHaveCount(1);
        await expect(firstToast(page)).toHaveCSS("opacity", "1");

        // Measured before the phone work: 16px from the bottom and the right, 24rem wide.
        await expect
            .poll(async () => {
                const region = await box(toasterRegion(page).first());
                return {
                    x: region.x,
                    width: region.width,
                    right: DESKTOP.width - (region.x + region.width),
                    bottom: DESKTOP.height - (region.y + region.height),
                };
            })
            .toEqual({ x: 880, width: 384, right: 16, bottom: 16 });
        await expect
            .poll(async () => {
                const toast = await box(firstToast(page));
                return {
                    x: toast.x,
                    width: toast.width,
                    bottom: DESKTOP.height - (toast.y + toast.height),
                };
            })
            .toEqual({ x: 896, width: 352, bottom: 32 });
    });

    test("a top Toast is 16px from the top and the right", async ({ page }) => {
        await gotoLab(page);
        await page.getByTestId("top-toast-toggle").click();
        const top = await box(page.getByRole("alert").filter({ hasText: "The round starts" }));
        expect(top.y).toBe(16);
        expect(Math.round(DESKTOP.width - (top.x + top.width))).toBe(16);
    });
});

test.describe("A disabled checkbox or radio", () => {
    test.use({ viewport: DESKTOP });

    test("does not dip when pressed or light up under the mouse; an enabled one does", async ({
        page,
    }) => {
        await gotoLab(page);
        const row = (name: string) => page.getByTestId("selection-disabled").locator("label", { hasText: name });
        const shell = (name: string) => row(name).locator(".group\\/control");
        const look = (name: string) =>
            shell(name).evaluate((el) => {
                const style = getComputedStyle(el);
                return { scale: style.scale, border: style.borderTopColor, fill: style.backgroundColor };
            });

        for (const name of ["Disabled box", "Disabled ticked box", "Disabled radio"]) {
            const idle = await look(name);
            const at = await box(row(name));
            await page.mouse.move(at.x + 12, at.y + at.height / 2);
            await page.mouse.down();
            await page.waitForTimeout(300);
            expect(await look(name), `${name}: pressed`).toEqual(idle);
            await page.mouse.up();
            await page.mouse.move(0, 0);
        }

        const idle = await look("Enabled box");
        const at = await box(row("Enabled box"));
        await page.mouse.move(at.x + 12, at.y + at.height / 2);
        await expect.poll(async () => (await look("Enabled box")).border, "Hover").not.toBe(idle.border);
        await page.mouse.down();
        await expect.poll(async () => (await look("Enabled box")).scale, "Pressed").toBe("0.95");
        await page.mouse.up();
    });
});

/** The site's own bar sticks to the top and would cover a trigger scrolled up to it. */
async function hideSiteBar(page: Page) {
    await page.getByRole("navigation", { name: "Main navigation" }).evaluate((el) => {
        (el.closest("header") ?? el).style.display = "none";
    });
}

/** Puts `locator` `offset` px below the top of the screen, at once: the page scrolls smoothly otherwise. */
async function scrollToTopEdge(locator: Locator, offset = 6) {
    await locator.evaluate((el, by) => {
        window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - by, behavior: "instant" });
    }, offset);
    await expect.poll(async () => Math.round((await box(locator)).y)).toBe(offset);
}

const overlaps = (a: { x: number; y: number; width: number; height: number }, b: typeof a) =>
    !(a.y + a.height <= b.y || a.y >= b.y + b.height || a.x + a.width <= b.x || a.x >= b.x + b.width);

test.describe("Tooltip: what a tap meets around it", () => {
    test.use({ viewport: PHONE, hasTouch: true, isMobile: true });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
    });

    test("closed, it is parked: not seen, not read out, not in the way of a tap", async ({ page }) => {
        const bubbles = page.getByRole("tooltip", { includeHidden: true });
        expect(await bubbles.count()).toBeGreaterThan(5);
        for (const bubble of await bubbles.all()) {
            await expect(bubble).toHaveAttribute("data-parked", "true");
            await expect(bubble).toHaveAttribute("aria-hidden", "true");
            await expect(bubble).toHaveCSS("visibility", "hidden");
            await expect(bubble).toHaveCSS("pointer-events", "none");
            await expect(bubble).toHaveCSS("position", "fixed");
        }
        await expect(page.getByRole("tooltip"), "None is in the accessibility tree").toHaveCount(0);
        // They are parked in the top corner; what is there still takes the tap.
        const hit = await page.evaluate(() => document.elementFromPoint(6, 6)?.closest('[role="tooltip"]'));
        expect(hit).toBeNull();
    });

    test("on a disabled button a tap still opens it", async ({ page }) => {
        const button = page.getByTestId("tip-disabled");
        await expect(button).toBeDisabled();
        await tap(page, button);
        const tooltip = page.getByRole("tooltip", { name: "Add a question first" });
        await expect(tooltip).toBeVisible();
        const bubble = await box(tooltip);
        expect(overlaps(bubble, await box(button)), "Clear of the button").toBe(false);
    });

    test("on a link the tap follows the link, and the tooltip does not stay behind", async ({ page }) => {
        const link = page.getByTestId("tip-link");
        await tap(page, link);
        await expect(page).toHaveURL(/#lab-toaster$/);
        await expect(link).not.toHaveAttribute("aria-describedby", /.+/);
        await expect(page.getByRole("tooltip")).toHaveCount(0);
    });

    test("tapping a second trigger closes the first tooltip", async ({ page }) => {
        const info = page.getByTestId("tip-info");
        const side = page.getByTestId("tip-side");
        await tap(page, info);
        const first = await tooltipOf(page, info);
        await expect(first).toBeVisible();

        await tap(page, side);
        const second = await tooltipOf(page, side);
        await expect(second).toBeVisible();
        await expect(first, "Only one at a time").toBeHidden();
        await expect(info).not.toHaveAttribute("aria-describedby", /.+/);
    });

    test("scrolling a box it is in closes it", async ({ page }) => {
        const trigger = page.getByTestId("tip-scroll");
        await tap(page, trigger);
        const tooltip = await tooltipOf(page, trigger);
        await expect(tooltip).toBeVisible();
        await page.getByTestId("tip-scroller").evaluate((el) => (el.scrollTop = 30));
        await expect(tooltip).toBeHidden();
    });

    test("placed against the viewport, it is still clear of its trigger", async ({ page }) => {
        const trigger = page.getByTestId("tip-fixed");
        await tap(page, trigger);
        const tooltip = await tooltipOf(page, trigger);
        await expect(tooltip).toHaveCSS("opacity", "1");
        await page.waitForTimeout(250);
        await expect(tooltip).toHaveCSS("position", "fixed");
        const bubble = await box(tooltip);
        const target = await box(trigger);
        expect(overlaps(bubble, target), "Not lying over the trigger").toBe(false);
        expect(Math.round(target.y - (bubble.y + bubble.height)), "8px above it").toBe(8);
        expect(
            Math.abs(bubble.x + bubble.width / 2 - (target.x + target.width / 2)),
            "Centred on it",
        ).toBeLessThanOrEqual(1);
    });

    test("in forced colours the bubble has an edge", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const info = page.getByTestId("tip-info");
        await tap(page, info);
        const tooltip = await tooltipOf(page, info);
        await expect(tooltip).toBeVisible();
        await expect(tooltip).toHaveCSS("outline-style", "solid");
        await expect(tooltip).toHaveCSS("outline-width", "1px");
    });
});

test.describe("Tooltip with a mouse: the edges of a desktop window", () => {
    test.use({ viewport: DESKTOP });

    test.beforeEach(async ({ page }) => {
        await gotoLab(page);
        await hideSiteBar(page);
    });

    test("scrolling under the pointer does not close it", async ({ page }) => {
        const button = page.getByTestId("tip-button");
        await button.hover();
        const tooltip = await tooltipOf(page, button);
        await expect(tooltip).toBeVisible();
        // A few px: the button is still under the pointer afterwards.
        await page.mouse.wheel(0, 4);
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(4);
        await page.waitForTimeout(300);
        await expect(tooltip, "Scrolling closes a tooltip opened by a tap, not by a mouse").toBeVisible();
    });

    for (const id of ["tip-button", "tip-fixed"]) {
        test(`${id}: with no room above it opens below, clear of its trigger`, async ({ page }) => {
            const trigger = page.getByTestId(id);
            await scrollToTopEdge(trigger);
            await trigger.hover();
            const tooltip = await tooltipOf(page, trigger);
            await expect(tooltip).toHaveCSS("opacity", "1");
            await expect(tooltip).toHaveAttribute("data-placement", "bottom");
            await page.waitForTimeout(250);
            const bubble = await box(tooltip);
            const target = await box(trigger);
            expect(Math.round(bubble.y - (target.y + target.height)), "8px below it").toBe(8);
            expect(bubble.y, "On screen").toBeGreaterThanOrEqual(0);
        });
    }

    test("placed against the viewport, above: 8px clear of its trigger", async ({ page }) => {
        const trigger = page.getByTestId("tip-fixed");
        await trigger.hover();
        const tooltip = await tooltipOf(page, trigger);
        await expect(tooltip).toHaveCSS("opacity", "1");
        await expect(tooltip).toHaveAttribute("data-placement", "top");
        await page.waitForTimeout(250);
        const bubble = await box(tooltip);
        const target = await box(trigger);
        expect(Math.round(target.y - (bubble.y + bubble.height))).toBe(8);
    });
});

test.describe("A toast with an action, on a phone", () => {
    test.use({ viewport: PHONE, hasTouch: true, isMobile: true });

    test("its buttons are 44px targets, and a tap on the action does it", async ({ page }) => {
        await gotoLab(page);
        await tap(page, page.getByTestId("toast-action-push"));
        const toast = firstToast(page);
        await expect(toast).toBeVisible();
        // The stack slides in; a tap sent while it moves can miss.
        await page.waitForTimeout(400);
        for (const button of await toast.getByRole("button").all()) {
            const rect = await box(button);
            expect(rect.width, "44px wide at least").toBeGreaterThanOrEqual(44);
            expect(rect.height, "44px tall at least").toBeGreaterThanOrEqual(44);
        }
        await expect(toast.getByRole("status")).toContainText("Answer removed");

        await tap(page, toast.getByRole("button", { name: "Undo" }));
        await expect(page.getByTestId("toast-undone")).toHaveText("Undone 1");
        await expect(toast).toBeHidden();
    });
});
