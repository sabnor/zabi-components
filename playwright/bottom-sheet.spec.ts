import { expect, test, type Locator, type Page } from "@playwright/test";

import { touchDrag } from "./helpers/touch";

/**
 * BottomSheet and SlideUp under a finger: the parts jsdom cannot show.
 *
 * A sheet is its geometry and its gestures. Only a browser lays it out at
 * half and full height, scrolls its content with a touch, and has to decide
 * whether that touch belongs to the content or to the sheet. The drags here
 * are real touch input, sent through the DevTools protocol, so the browser's
 * own scrolling takes part.
 */

const PHONE = { width: 375, height: 740 };
/** Half of the phone screen: taller than the 18rem floor. */
const HALF = 370;

const sheet = (page: Page) => page.getByRole("dialog", { name: "Choose a team" });
const content = (page: Page) => sheet(page).locator("[data-bottom-sheet-content]");
const grip = (page: Page) => sheet(page).locator("[data-sheet-grip]");
const opener = (page: Page) => page.getByTestId("bottom-sheet-demo-open");
const state = (page: Page) => page.getByTestId("bottom-sheet-demo-state");

/** The page is usable before it hydrates; a click that lands early is lost. */
async function openWith(trigger: Locator, target: Locator): Promise<void> {
    await expect(async () => {
        if ((await target.count()) === 0) await trigger.click();
        await expect(target).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
}

/** Geometry is only meaningful once the slide and the height change have finished. */
async function settled(panel: Locator): Promise<void> {
    await expect.poll(() => panel.evaluate((el) => el.getAnimations().length)).toBe(0);
}

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

async function centre(locator: Locator) {
    const rect = await box(locator);
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

const height = async (page: Page) => Math.round((await box(sheet(page))).height);

async function open(page: Page) {
    await page.goto("/components/BottomSheet", { waitUntil: "domcontentloaded" });
    await openWith(opener(page), sheet(page));
    await settled(sheet(page));
}

test.describe("BottomSheet — touch", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: PHONE });

    test.beforeEach(async ({ page }) => {
        await open(page);
    });

    test("opens at half height on the bottom edge, full width, as a named modal dialog", async ({
        page,
    }) => {
        const rect = await box(sheet(page));
        expect(Math.round(rect.x)).toBe(0);
        expect(Math.round(rect.width)).toBe(PHONE.width);
        expect(Math.round(rect.height)).toBe(HALF);
        expect(Math.round(rect.y + rect.height)).toBe(PHONE.height);
        await expect(sheet(page)).toHaveAttribute("aria-modal", "true");
        await expect(sheet(page)).toHaveAttribute("data-snap", "half");
        await expect(sheet(page)).toHaveAccessibleDescription(
            "The grip drags the sheet, or press it to change its height.",
        );
        // Portalled: the overlay is a direct child of <body>.
        expect(
            await sheet(page).evaluate((el) => el.parentElement?.parentElement === document.body),
        ).toBe(true);
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
        // Focus is inside, on the first control: the grip.
        await expect(sheet(page).getByRole("button", { name: "Expand" })).toBeFocused();
    });

    test("drag: the grip takes the sheet from half to full and back", async ({ page }) => {
        const start = await centre(grip(page));
        await touchDrag(page, start, { x: start.x, y: start.y - 300 });
        await expect(sheet(page)).toHaveAttribute("data-snap", "full");
        await settled(sheet(page));
        expect(await height(page)).toBe(PHONE.height);
        expect(Math.round((await box(sheet(page))).y)).toBe(0);
        await expect(state(page)).toContainText("Snap: full.");
        // The grip now says what it will do next, and the close button is in reach.
        await expect(sheet(page).getByRole("button", { name: "Collapse" })).toBeVisible();
        const close = await box(sheet(page).getByRole("button", { name: "Close" }));
        expect(close.y).toBeGreaterThanOrEqual(0);

        const top = await centre(grip(page));
        await touchDrag(page, top, { x: top.x, y: top.y + 320 });
        await expect(sheet(page)).toHaveAttribute("data-snap", "half");
        await settled(sheet(page));
        expect(await height(page)).toBe(HALF);
        await expect(state(page)).toContainText("Snap: half.");
    });

    test("drag: the sheet follows the finger while it is down", async ({ page }) => {
        const start = await centre(grip(page));
        const cdp = await page.context().newCDPSession(page);
        const point = (y: number) => [{ x: Math.round(start.x), y: Math.round(y), id: 1 }];
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: point(start.y) });
        for (let step = 1; step <= 10; step += 1) {
            await cdp.send("Input.dispatchTouchEvent", {
                type: "touchMove",
                touchPoints: point(start.y - step * 15),
            });
            await page.waitForTimeout(16);
        }
        // 150px up, less the few px it takes to tell a drag from a press.
        await expect(sheet(page)).toHaveAttribute("data-dragging", "true");
        const dragged = await height(page);
        expect(dragged).toBeGreaterThan(HALF + 130);
        expect(dragged).toBeLessThanOrEqual(HALF + 150);
        expect(
            await sheet(page).evaluate((el) => getComputedStyle(el).transitionDuration),
            "No easing while it follows the finger",
        ).toBe("0s");
        await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        await expect(sheet(page)).not.toHaveAttribute("data-dragging", "true");
    });

    test("drag: a short pull down springs back to half", async ({ page }) => {
        const start = await centre(grip(page));
        await touchDrag(page, start, { x: start.x, y: start.y + 90 });
        await settled(sheet(page));
        await expect(sheet(page)).toBeVisible();
        expect(await height(page)).toBe(HALF);
        expect(Math.round((await box(sheet(page))).y)).toBe(PHONE.height - HALF);
        await expect(state(page)).toContainText("Last close: none yet.");
    });

    test("swipe: dragging the grip down past half closes, and focus returns to the opener", async ({
        page,
    }) => {
        const start = await centre(grip(page));
        await touchDrag(page, start, { x: start.x, y: start.y + 260 });
        await expect(sheet(page)).toHaveCount(0);
        await expect(state(page)).toContainText("Last close: swipe.");
        await expect(opener(page)).toBeFocused();
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
    });

    test("swipe: a flick down closes over a distance that would not", async ({ page }) => {
        const start = await centre(grip(page));
        // 120px is a third of the way: released slowly it would spring back.
        await touchDrag(page, start, { x: start.x, y: start.y + 120 }, { duration: 0, hold: 0, steps: 3 });
        await expect(sheet(page)).toHaveCount(0);
        await expect(state(page)).toContainText("Last close: swipe.");
    });

    test("flick up from half goes to full without travelling the distance", async ({ page }) => {
        const start = await centre(grip(page));
        await touchDrag(page, start, { x: start.x, y: start.y - 120 }, { duration: 0, hold: 0, steps: 3 });
        await expect(sheet(page)).toHaveAttribute("data-snap", "full");
    });

    test("content: a swipe on the list scrolls the list and leaves the sheet where it is", async ({
        page,
    }) => {
        expect(
            await content(page).evaluate((el) => el.scrollHeight > el.clientHeight),
            "The list must scroll, or this proves nothing",
        ).toBe(true);
        const middle = await centre(content(page));

        // Up: the list scrolls.
        await touchDrag(page, middle, { x: middle.x, y: middle.y - 120 });
        await expect.poll(() => content(page).evaluate((el) => el.scrollTop)).toBeGreaterThan(60);
        await expect(sheet(page)).toHaveAttribute("data-snap", "half");
        expect(await height(page)).toBe(HALF);
        expect(Math.round((await box(sheet(page))).y)).toBe(PHONE.height - HALF);

        // Down while the list is scrolled: the list scrolls back, the sheet stays.
        const scrolled = await content(page).evaluate((el) => el.scrollTop);
        await touchDrag(page, middle, { x: middle.x, y: middle.y + 50 });
        await expect
            .poll(() => content(page).evaluate((el) => el.scrollTop))
            .toBeLessThan(scrolled);
        await expect(sheet(page)).toBeVisible();
        expect(await height(page)).toBe(HALF);
        expect(Math.round((await box(sheet(page))).y)).toBe(PHONE.height - HALF);
        await expect(state(page)).toContainText("Last close: none yet.");
    });

    test("content: from the top of the list, a swipe down moves the sheet and closes it", async ({
        page,
    }) => {
        expect(await content(page).evaluate((el) => el.scrollTop)).toBe(0);
        const middle = await centre(content(page));
        await touchDrag(page, middle, { x: middle.x, y: middle.y + 260 });
        await expect(sheet(page)).toHaveCount(0);
        await expect(state(page)).toContainText("Last close: swipe.");
        expect(await page.evaluate(() => window.scrollY), "The page behind did not move").toBe(0);
    });

    test("tap: the grip is a button that changes the height, and items in the list still take taps", async ({
        page,
    }) => {
        await sheet(page).getByRole("button", { name: "Expand" }).tap();
        await expect(sheet(page)).toHaveAttribute("data-snap", "full");
        await sheet(page).getByRole("button", { name: "Collapse" }).tap();
        await expect(sheet(page)).toHaveAttribute("data-snap", "half");

        await sheet(page).getByRole("button", { name: "Team 3", exact: true }).tap();
        await expect(state(page)).toContainText("Chosen: Team 3.");
        await expect(sheet(page)).toBeVisible();
    });

    test("backdrop: a tap outside closes it", async ({ page }) => {
        await page.touchscreen.tap(PHONE.width / 2, 120);
        await expect(sheet(page)).toHaveCount(0);
        await expect(state(page)).toContainText("Last close: backdrop.");
    });

    test("targets: grip, close and the footer button are at least 44px", async ({ page }) => {
        for (const control of [
            sheet(page).getByRole("button", { name: "Expand" }),
            sheet(page).getByRole("button", { name: "Close" }),
            sheet(page).getByRole("button", { name: "Done" }),
        ]) {
            const rect = await box(control);
            expect(rect.width).toBeGreaterThanOrEqual(44);
            expect(rect.height).toBeGreaterThanOrEqual(44);
        }
        // The grip and the close button do not overlap.
        const gripBox = await box(sheet(page).getByRole("button", { name: "Expand" }));
        const closeBox = await box(sheet(page).getByRole("button", { name: "Close" }));
        expect(closeBox.x - (gripBox.x + gripBox.width)).toBeGreaterThanOrEqual(8);
    });

    test("radius: the close button is its own radius short of the panel's, 8px in from the edge", async ({
        page,
    }) => {
        const radius = (locator: Locator, corner: string) =>
            locator.evaluate(
                (el, name) => parseFloat(getComputedStyle(el).getPropertyValue(name)),
                corner,
            );
        const close = sheet(page).getByRole("button", { name: "Close" });
        const panel = await box(sheet(page));
        const button = await box(close);
        const gap = Math.round(panel.x + panel.width - (button.x + button.width));
        expect(gap).toBe(8);
        expect(await radius(sheet(page), "border-top-right-radius")).toBe(
            (await radius(close, "border-top-right-radius")) + gap,
        );
        // The grip is flush with the top edge, so it has the panel's radius.
        expect(await radius(grip(page), "border-top-left-radius")).toBe(
            await radius(sheet(page), "border-top-left-radius"),
        );
    });

    test("safe areas: full height stops at the status bar and the footer clears the home indicator", async ({
        page,
    }) => {
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { top: 47, bottom: 34 } });
        await sheet(page).getByRole("button", { name: "Expand" }).tap();
        await expect(sheet(page)).toHaveAttribute("data-snap", "full");
        await settled(sheet(page));
        const rect = await box(sheet(page));
        expect(Math.round(rect.y), "Below the status bar").toBe(47);
        expect(Math.round(rect.y + rect.height)).toBe(PHONE.height);
        const done = await box(sheet(page).getByRole("button", { name: "Done" }));
        expect(PHONE.height - (done.y + done.height)).toBeGreaterThanOrEqual(34);
        const close = await box(sheet(page).getByRole("button", { name: "Close" }));
        expect(close.y, "The close button is under the status bar, in reach").toBeGreaterThanOrEqual(47);
    });

    test("safe areas: in landscape the title and the close button clear the notch on either side", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 667, height: 375 });
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setSafeAreaInsetsOverride", {
            insets: { top: 0, bottom: 21, left: 47, right: 47 },
        });
        await settled(sheet(page));
        const title = await box(sheet(page).getByRole("heading", { name: "Choose a team" }));
        expect(title.x, "The title starts past the left inset").toBeGreaterThanOrEqual(47);
        const close = await box(sheet(page).getByRole("button", { name: "Close" }));
        expect(close.x + close.width, "The close button ends before the right inset").toBeLessThanOrEqual(
            667 - 47,
        );
        const list = await box(content(page));
        expect(list.x).toBeGreaterThanOrEqual(47);
        expect(list.x + list.width).toBeLessThanOrEqual(667 - 47);
    });

    test("fits a 320px screen without sideways scroll", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 568 });
        await settled(sheet(page));
        const rect = await box(sheet(page));
        expect(Math.round(rect.width)).toBe(320);
        // Half of 568 is under the 18rem floor: the floor holds.
        expect(Math.round(rect.height)).toBe(288);
        for (const region of [sheet(page), content(page)]) {
            expect(await region.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        }
        expect(
            await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        ).toBe(true);
    });
});

test.describe("BottomSheet — keyboard, motion and display modes", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
        await open(page);
    });

    test("focus trap: Tab and Shift+Tab stay inside, and Escape closes and restores focus", async ({
        page,
    }) => {
        const inside = () =>
            page.evaluate(() =>
                Boolean(document.activeElement?.closest('[role="dialog"]')),
            );
        await expect(sheet(page).getByRole("button", { name: "Expand" })).toBeFocused();
        // Wrapping backwards from the first control goes to the last: the footer button.
        await page.keyboard.press("Shift+Tab");
        await expect(sheet(page).getByRole("button", { name: "Done" })).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(sheet(page).getByRole("button", { name: "Expand" })).toBeFocused();
        for (let step = 0; step < 40; step += 1) {
            await page.keyboard.press("Tab");
            expect(await inside()).toBe(true);
        }

        await page.keyboard.press("Escape");
        await expect(sheet(page)).toHaveCount(0);
        await expect(state(page)).toContainText("Last close: escape.");
        await expect(opener(page)).toBeFocused();
    });

    test("keyboard: the grip moves the sheet between its snap points", async ({ page }) => {
        const expand = sheet(page).getByRole("button", { name: "Expand" });
        await expect(expand).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(sheet(page)).toHaveAttribute("data-snap", "full");
        await settled(sheet(page));
        expect(await height(page)).toBe(PHONE.height);
        // The same button, renamed, and still focused.
        const collapse = sheet(page).getByRole("button", { name: "Collapse" });
        await expect(collapse).toBeFocused();
        await page.keyboard.press("Space");
        await expect(sheet(page)).toHaveAttribute("data-snap", "half");
        await settled(sheet(page));
        expect(await height(page)).toBe(HALF);
    });

    test("mouse: the grip drags too, and the release is not a press of the grip", async ({ page }) => {
        const start = await centre(grip(page));
        await page.mouse.move(start.x, start.y);
        await page.mouse.down();
        await page.mouse.move(start.x, start.y - 150, { steps: 10 });
        await page.mouse.move(start.x, start.y - 300, { steps: 10 });
        await page.waitForTimeout(150);
        await page.mouse.up();
        // Dragged to full. Had the release also counted as a click, it would be back at half.
        await expect(sheet(page)).toHaveAttribute("data-snap", "full");
        await settled(sheet(page));
        expect(await height(page)).toBe(PHONE.height);
    });

    test("motion: the height change is eased, and is not under reduced motion", async ({ page }) => {
        const transition = () =>
            sheet(page).evaluate((el) => {
                const style = getComputedStyle(el);
                return { property: style.transitionProperty, duration: style.transitionDuration };
            });
        expect((await transition()).property).toContain("height");
        expect((await transition()).duration).toBe("0.2s");

        await page.emulateMedia({ reducedMotion: "reduce" });
        expect((await transition()).property).toBe("none");
        await page.keyboard.press("Enter");
        await expect(sheet(page)).toHaveAttribute("data-snap", "full");
        // At once: no animation to wait for.
        expect(await sheet(page).evaluate((el) => el.getAnimations().length)).toBe(0);
        expect(await height(page)).toBe(PHONE.height);

        // And it opens without sliding.
        await page.keyboard.press("Escape");
        await opener(page).click();
        await expect(sheet(page)).toBeVisible();
        expect(await sheet(page).evaluate((el) => el.getAnimations().length)).toBe(0);
    });

    test("contrast: the grip's mark stands 3:1 off the sheet in light and in dark", async ({
        page,
    }) => {
        // The mark is all there is to see of the grip button (WCAG 1.4.11).
        const ratio = () =>
            sheet(page).evaluate((panel) => {
                const canvas = document.createElement("canvas");
                canvas.width = canvas.height = 1;
                const context = canvas.getContext("2d", { willReadFrequently: true })!;
                const luminance = (colour: string) => {
                    context.clearRect(0, 0, 1, 1);
                    context.fillStyle = colour;
                    context.fillRect(0, 0, 1, 1);
                    const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].map((value) => {
                        const channel = value / 255;
                        return channel <= 0.03928
                            ? channel / 12.92
                            : ((channel + 0.055) / 1.055) ** 2.4;
                    });
                    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
                };
                const mark = panel.querySelector("[data-sheet-grip] > span")!;
                const a = luminance(getComputedStyle(mark).backgroundColor);
                const b = luminance(getComputedStyle(panel).backgroundColor);
                return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            });
        expect(await ratio(), "light").toBeGreaterThanOrEqual(3);
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await settled(sheet(page));
        expect(await ratio(), "dark").toBeGreaterThanOrEqual(3);
    });

    test("forced colours: the grip is still drawn", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const mark = grip(page).locator("span");
        const colours = await mark.evaluate((el) => {
            const probe = document.createElement("span");
            probe.style.color = "CanvasText";
            document.body.append(probe);
            const text = getComputedStyle(probe).color;
            probe.remove();
            return { background: getComputedStyle(el).backgroundColor, text };
        });
        expect(colours.background).toBe(colours.text);
        const rect = await box(mark);
        expect(rect.width).toBeGreaterThan(20);
        expect(rect.height).toBeGreaterThanOrEqual(4);
    });

    test("right to left: the close button moves to the left, and nothing overflows", async ({
        page,
    }) => {
        await page.evaluate(() => (document.documentElement.dir = "rtl"));
        const close = await box(sheet(page).getByRole("button", { name: "Close" }));
        const title = await box(sheet(page).getByRole("heading", { name: "Choose a team" }));
        expect(close.x + close.width).toBeLessThanOrEqual(title.x);
        expect(close.x).toBeGreaterThanOrEqual(0);
        expect(await sheet(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    });

    test("wide screen: centred, 40rem wide, still on the bottom edge", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await settled(sheet(page));
        const rect = await box(sheet(page));
        expect(Math.round(rect.width)).toBe(640);
        expect(Math.round(rect.x)).toBe((1280 - 640) / 2);
        expect(Math.round(rect.y + rect.height)).toBe(800);
        expect(Math.round(rect.height)).toBe(400);
    });

    test("still usable at 320px with the text enlarged to 200%", async ({ page }) => {
        // Not under mobile emulation: there the page behind, which is wider than
        // the screen at this text size, makes the browser lay out a wider screen.
        await page.setViewportSize({ width: 320, height: 568 });
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        await settled(sheet(page));
        const rect = await box(sheet(page));
        expect(rect.y, "Never taller than the screen").toBeGreaterThanOrEqual(0);
        expect(Math.round(rect.y + rect.height)).toBe(568);
        expect(await sheet(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        for (const name of ["Close", "Done"]) {
            const control = await box(sheet(page).getByRole("button", { name }));
            expect(control.x).toBeGreaterThanOrEqual(0);
            expect(control.x + control.width).toBeLessThanOrEqual(320);
            expect(control.y).toBeGreaterThanOrEqual(0);
            expect(control.y + control.height).toBeLessThanOrEqual(568);
        }
    });

    test("one snap point: the grip is not a button, focus starts in the field, and it still closes", async ({
        page,
    }) => {
        await page.keyboard.press("Escape");
        const form = page.getByRole("dialog", { name: "Rename team" });
        await openWith(page.getByTestId("bottom-sheet-demo-form-open"), form);
        await settled(form);
        await expect(form.getByLabel("Team name")).toBeFocused();
        await expect(form.getByRole("button", { name: "Expand" })).toHaveCount(0);
        await expect(form.getByRole("button", { name: "Collapse" })).toHaveCount(0);
        await expect(form.locator("[data-sheet-grip]")).toHaveCount(1);
        await expect(form.getByRole("button", { name: "Cancel" })).toHaveCount(2);

        // Dragging the grip up goes nowhere: half is all there is.
        const start = await centre(form.locator("[data-sheet-grip]"));
        await page.mouse.move(start.x, start.y);
        await page.mouse.down();
        await page.mouse.move(start.x, start.y - 200, { steps: 10 });
        await page.waitForTimeout(150);
        await page.mouse.up();
        await settled(form);
        expect(Math.round((await box(form)).height)).toBe(HALF);
        await expect(form).toHaveAttribute("data-snap", "half");
    });
});

test.describe("SlideUp — safe area and swipe to close", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: PHONE });

    const notes = (page: Page) => page.getByRole("dialog", { name: "Release notes" });
    const notesOpener = (page: Page) => page.getByTestId("slide-up-demo-swipe-open");
    const closes = (page: Page) => page.getByTestId("slide-up-demo-swipe-closes");

    test.beforeEach(async ({ page }) => {
        await page.goto("/components/SlideUp", { waitUntil: "domcontentloaded" });
    });

    test("without swipeToClose there is no grip, and the content clears the home indicator", async ({
        page,
    }) => {
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: 34 } });
        const plain = page.getByRole("dialog", { name: "Slide Up Panel" });
        await openWith(page.getByRole("button", { name: "Open Slide Up" }), plain);
        await settled(plain);
        await expect(plain.locator("[data-sheet-grip]")).toHaveCount(0);
        const padding = await plain
            .locator("> div")
            .last()
            .evaluate((el) => parseFloat(getComputedStyle(el).paddingBottom));
        expect(padding).toBe(24 + 34);
        const button = await box(plain.getByRole("button", { name: "Close", exact: true }).last());
        expect(PHONE.height - (button.y + button.height)).toBeGreaterThanOrEqual(34);
    });

    test("swipe: dragging the grip down closes it, reports it and returns focus", async ({ page }) => {
        await openWith(notesOpener(page), notes(page));
        await settled(notes(page));
        const start = await centre(notes(page).locator("[data-sheet-grip]"));
        await touchDrag(page, start, { x: start.x, y: start.y + 320 });
        await expect(notes(page)).toHaveCount(0);
        await expect(closes(page)).toHaveText("Closed 1 times.");
        await expect(notesOpener(page)).toBeFocused();
    });

    test("swipe: a short pull springs back, and the sheet stays open", async ({ page }) => {
        await openWith(notesOpener(page), notes(page));
        await settled(notes(page));
        const rest = await box(notes(page));
        const start = await centre(notes(page).locator("[data-sheet-grip]"));
        await touchDrag(page, start, { x: start.x, y: start.y + 60 });
        await settled(notes(page));
        await expect(notes(page)).toBeVisible();
        expect(Math.round((await box(notes(page))).y)).toBe(Math.round(rest.y));
        await expect(closes(page)).toHaveText("Closed 0 times.");
    });

    test("content: a swipe scrolls the notes; from their top, a swipe down closes", async ({ page }) => {
        await openWith(notesOpener(page), notes(page));
        await settled(notes(page));
        expect(
            await notes(page).evaluate((el) => el.scrollHeight > el.clientHeight),
            "The notes must scroll, or this proves nothing",
        ).toBe(true);
        const rest = await box(notes(page));
        const middle = { x: rest.x + rest.width / 2, y: rest.y + rest.height / 2 };

        await touchDrag(page, middle, { x: middle.x, y: middle.y - 150 });
        await expect.poll(() => notes(page).evaluate((el) => el.scrollTop)).toBeGreaterThan(80);
        expect(Math.round((await box(notes(page))).y)).toBe(Math.round(rest.y));

        const scrolled = await notes(page).evaluate((el) => el.scrollTop);
        await touchDrag(page, middle, { x: middle.x, y: middle.y + 60 });
        await expect.poll(() => notes(page).evaluate((el) => el.scrollTop)).toBeLessThan(scrolled);
        await expect(notes(page)).toBeVisible();
        await expect(closes(page)).toHaveText("Closed 0 times.");

        await notes(page).evaluate((el) => (el.scrollTop = 0));
        await touchDrag(page, middle, { x: middle.x, y: middle.y + 320 });
        await expect(notes(page)).toHaveCount(0);
        await expect(closes(page)).toHaveText("Closed 1 times.");
    });

    test("the grip is decorative, drawn in forced colours, and the close button is still there", async ({
        page,
    }) => {
        await openWith(notesOpener(page), notes(page));
        const mark = notes(page).locator("[data-sheet-grip]");
        await expect(mark).toHaveAttribute("aria-hidden", "true");
        await expect(notes(page).getByRole("button", { name: "Close" })).toBeVisible();
        await page.emulateMedia({ forcedColors: "active" });
        expect(
            await mark.locator("span").evaluate((el) => getComputedStyle(el).backgroundColor),
        ).not.toBe("rgba(0, 0, 0, 0)");
    });
});
