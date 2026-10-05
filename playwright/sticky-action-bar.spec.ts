import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * StickyActionBar in a real browser: the parts jsdom cannot show.
 *
 * Sticky positioning needs layout, and so does everything the bar is for:
 * staying in view while the form scrolls, letting the last field scroll clear
 * of it, and riding above the on-screen keyboard.
 *
 * No keyboard can be raised here. Where a test says "keyboard", the visual
 * viewport is made to report what a phone reports with one up: the `height`
 * of `window.visualViewport` is overridden with a smaller value and its
 * `resize` event is dispatched. The layout viewport is left alone, which is
 * the case the bar exists for (iOS Safari, Chrome on Android). Nothing is
 * actually drawn over the page.
 */

const PHONE = { width: 375, height: 740 };
/** What is left of a 740px screen above a typical keyboard. */
const ABOVE_KEYBOARD = 420;

const fullScreen = (page: Page) => page.getByTestId("sticky-action-bar-demo-full-screen");
const shell = (page: Page) => fullScreen(page).getByTestId("sticky-action-bar-demo-shell");
const scroller = (page: Page) => shell(page).locator("[data-app-shell-scroller]");
const bar = (page: Page) => shell(page).getByRole("group", { name: "Visit" });

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

/** The page is usable before it hydrates; a click that lands early opens nothing. */
async function openFormScreen(page: Page) {
    await page.goto("/components/StickyActionBar", { waitUntil: "domcontentloaded" });
    await expect(async () => {
        await page.getByRole("button", { name: "Open full screen" }).click({ timeout: 1_000 });
        await expect(fullScreen(page)).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
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

test.describe("StickyActionBar on a form screen", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: PHONE });

    test.beforeEach(async ({ page }) => {
        await openFormScreen(page);
    });

    test("is the bottom of the screen, full width, with 44px buttons 8px apart", async ({ page }) => {
        const rect = await box(bar(page));
        expect(Math.round(rect.x)).toBe(0);
        expect(Math.round(rect.width)).toBe(PHONE.width);
        expect(Math.round(rect.y + rect.height)).toBe(PHONE.height);
        expect(await bar(page).evaluate((el) => getComputedStyle(el).position)).toBe("sticky");

        const draft = await box(bar(page).getByRole("button", { name: "Save draft" }));
        const save = await box(bar(page).getByRole("button", { name: "Save visit" }));
        for (const button of [draft, save]) {
            expect(button.height).toBeGreaterThanOrEqual(44);
            expect(button.width).toBeGreaterThanOrEqual(44);
        }
        expect(Math.round(save.x - (draft.x + draft.width))).toBe(8);
        expect(save.x + save.width).toBeLessThanOrEqual(PHONE.width);
    });

    test("stays in view while the form scrolls, and never takes focus", async ({ page }) => {
        // A shorter screen, so the form is taller than it.
        await page.setViewportSize({ width: PHONE.width, height: 480 });
        expect(
            await scroller(page).evaluate((el) => el.scrollHeight > el.clientHeight),
            "The form must scroll, or this proves nothing",
        ).toBe(true);
        const before = await box(bar(page));
        await scroller(page).evaluate((el) => (el.scrollTop = 120));
        expect((await box(bar(page))).y).toBe(before.y);
        await scroller(page).evaluate((el) => (el.scrollTop = el.scrollHeight));
        expect((await box(bar(page))).y).toBe(before.y);

        // At the end the last field is wholly above the bar.
        const notes = await box(shell(page).getByLabel("Notes"));
        expect(notes.y + notes.height).toBeLessThanOrEqual(before.y);
        expect(
            await page.evaluate(() => Boolean(document.activeElement?.closest('[role="group"]'))),
        ).toBe(false);
    });

    test("a field that takes focus is brought into view above the bar, not under it", async ({
        page,
    }) => {
        await page.setViewportSize({ width: PHONE.width, height: 480 });
        const rect = await box(bar(page));
        expect(
            await scroller(page).evaluate((el) => el.style.scrollPaddingBottom),
            "The bar reserves its own height at the bottom of the scrolling area",
        ).toBe(`${Math.ceil(rect.height)}px`);

        await scroller(page).evaluate((el) => (el.scrollTop = 0));
        await shell(page).getByLabel("Notes").focus();
        const notes = await box(shell(page).getByLabel("Notes"));
        expect(notes.y + notes.height).toBeLessThanOrEqual(rect.y);
        await expect(shell(page).getByLabel("Notes")).toBeFocused();
    });

    test("keyboard (emulated visual viewport): the bar rises to sit just above it", async ({
        page,
    }) => {
        const rest = await box(bar(page));
        expect(await bar(page).getAttribute("data-keyboard-open")).toBeNull();

        await setVisualViewportHeight(page, ABOVE_KEYBOARD);
        await expect(bar(page)).toHaveAttribute("data-keyboard-open", "true");
        const lifted = await box(bar(page));
        expect(
            Math.round(lifted.y + lifted.height),
            "The bar ends where the visible part of the screen ends",
        ).toBe(ABOVE_KEYBOARD);
        expect(lifted.y).toBeGreaterThanOrEqual(0);
        expect(Math.round(lifted.height)).toBe(Math.round(rest.height));
        // Both buttons are in the visible part.
        for (const name of ["Save draft", "Save visit"]) {
            const button = await box(bar(page).getByRole("button", { name }));
            expect(button.y + button.height).toBeLessThanOrEqual(ABOVE_KEYBOARD);
        }

        // The room reserved for focus grows by the keyboard, so a field that
        // takes focus now lands above the lifted bar.
        expect(await scroller(page).evaluate((el) => el.style.scrollPaddingBottom)).toBe(
            `${Math.ceil(rest.height) + (PHONE.height - ABOVE_KEYBOARD)}px`,
        );
        await scroller(page).evaluate((el) => (el.scrollTop = 0));
        await shell(page).getByLabel("Players").focus();
        const field = await box(shell(page).getByLabel("Players"));
        expect(field.y + field.height).toBeLessThanOrEqual(lifted.y);

        // Keyboard away: back to the bottom of the screen.
        await setVisualViewportHeight(page, null);
        await expect(bar(page)).not.toHaveAttribute("data-keyboard-open", "true");
        expect(Math.round((await box(bar(page))).y)).toBe(Math.round(rest.y));
    });

    test("safe area: clear of the home indicator at rest, and not padded for it over the keyboard", async ({
        page,
    }) => {
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { bottom: 34 } });
        const padding = () =>
            bar(page).evaluate((el) => parseFloat(getComputedStyle(el).paddingBottom));
        await expect.poll(padding).toBe(34);
        const save = await box(bar(page).getByRole("button", { name: "Save visit" }));
        expect(PHONE.height - (save.y + save.height)).toBeGreaterThanOrEqual(34);

        await setVisualViewportHeight(page, ABOVE_KEYBOARD);
        await expect.poll(padding).toBe(12);
    });

    test("pinch zoom is not a keyboard: a zoomed visual viewport lifts nothing", async ({ page }) => {
        await page.evaluate(() => {
            const viewport = window.visualViewport!;
            Object.defineProperty(viewport, "scale", { configurable: true, get: () => 2 });
            Object.defineProperty(viewport, "height", { configurable: true, get: () => 370 });
            viewport.dispatchEvent(new Event("resize"));
        });
        await page.waitForTimeout(100);
        expect(await bar(page).getAttribute("data-keyboard-open")).toBeNull();
        expect(Math.round((await box(bar(page))).y + (await box(bar(page))).height)).toBe(
            PHONE.height,
        );
    });

});

test.describe("StickyActionBar — in a form of its own, and display modes", () => {
    const frame = (page: Page) => page.getByTestId("sticky-action-bar-demo-scroller");
    const plain = (page: Page) => page.getByTestId("sticky-action-bar-demo");

    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
        await page.goto("/components/StickyActionBar", { waitUntil: "domcontentloaded" });
        // The site's fonts are `font-display: swap`. When they arrive, a line
        // of text above the example re-wraps and everything below it moves up
        // 24px. A position read before that and one read after it differ by
        // those 24px, whatever the bar does: wait until the fonts are in. The
        // first read of a box is what makes the browser ask for them.
        await frame(page).boundingBox();
        await page.waitForFunction(
            () =>
                document.fonts.status === "loaded" &&
                [...document.fonts].some((face) => face.status === "loaded" || face.status === "error"),
        );
        await frame(page).scrollIntoViewIfNeeded();
    });

    test("sticks to the bottom of its scrolling ancestor and is a plain box without a label", async ({
        page,
    }) => {
        const outer = await box(frame(page));
        const inner = await box(plain(page));
        expect(Math.round(inner.y + inner.height)).toBe(Math.round(outer.y + outer.height) - 1);
        expect(await plain(page).getAttribute("role")).toBeNull();
        await frame(page).evaluate((el) => (el.scrollTop = el.scrollHeight));
        expect(Math.round((await box(plain(page))).y)).toBe(Math.round(inner.y));
        // And against its own box, read in one go: still one border above the bottom of it.
        expect(
            await frame(page).evaluate((el) => {
                const bar = el.querySelector('[data-testid="sticky-action-bar-demo"]')!;
                return Math.round(el.getBoundingClientRect().bottom - bar.getBoundingClientRect().bottom);
            }),
        ).toBe(1);
        const notes = await box(frame(page).getByLabel("Notes"));
        expect(notes.y + notes.height).toBeLessThanOrEqual(inner.y);
    });

    test("submitting from the bar saves", async ({ page }) => {
        await expect(async () => {
            await plain(page).getByRole("button", { name: "Save visit" }).click();
            await expect(page.getByTestId("sticky-action-bar-demo-outcome")).toHaveText(
                "Saved the visit to The Crown.",
                { timeout: 1_000 },
            );
        }).toPass({ timeout: 30_000 });
    });

    test("fits a 320px screen without sideways scroll, also with the text enlarged to 200%", async ({
        page,
    }) => {
        // Full screen: the framed examples are narrower than any phone.
        await page.setViewportSize({ width: 320, height: 568 });
        await expect(async () => {
            await page.getByRole("button", { name: "Open full screen" }).click({ timeout: 1_000 });
            await expect(fullScreen(page)).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        const check = async () => {
            for (const region of [shell(page), scroller(page), bar(page)]) {
                expect(await region.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
            }
            for (const name of ["Save draft", "Save visit"]) {
                const button = await box(bar(page).getByRole("button", { name }));
                expect(button.x).toBeGreaterThanOrEqual(0);
                expect(button.x + button.width).toBeLessThanOrEqual(320);
            }
        };
        await check();
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        // The two buttons no longer fit side by side: they wrap, they are not cut.
        await check();
    });

    test("right to left: the actions are at the left end, in the same order from the start", async ({
        page,
    }) => {
        await expect(async () => {
            await page.getByRole("button", { name: "Open full screen" }).click({ timeout: 1_000 });
            await expect(fullScreen(page)).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        await page.evaluate(() => (document.documentElement.dir = "rtl"));
        const draft = await box(bar(page).getByRole("button", { name: "Save draft" }));
        const save = await box(bar(page).getByRole("button", { name: "Save visit" }));
        expect(save.x + save.width, "The main action is at the end: the left").toBeLessThan(draft.x);
        expect(Math.round(draft.x - (save.x + save.width))).toBe(8);
        expect(save.x).toBeGreaterThanOrEqual(0);
    });

    test("forced colours: the bar keeps its edge", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const edge = await plain(page).evaluate((el) => {
            const style = getComputedStyle(el);
            return { width: style.borderTopWidth, style: style.borderTopStyle };
        });
        expect(edge).toEqual({ width: "1px", style: "solid" });
    });
});

test.describe("StickyActionBar — the keyboard, and where the bar's own box ends", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: PHONE });

    const tolerance = 1;

    test("a box in the page: the bar rises by the part of the box the keyboard covers, and never leaves it", async ({
        page,
    }) => {
        await page.goto("/components/StickyActionBar", { waitUntil: "domcontentloaded" });
        const frame = page.getByTestId("sticky-action-bar-demo-scroller");
        const plain = page.getByTestId("sticky-action-bar-demo");
        // Hydrated when the bar has reserved its room.
        await expect
            .poll(() => frame.evaluate((el) => el.style.scrollPaddingBottom), { timeout: 30_000 })
            .toMatch(/px$/);
        // The whole box on screen, with room above and under it.
        await frame.evaluate((el) => el.scrollIntoView({ block: "center" }));
        const outer = await box(frame);
        const rest = await box(plain);
        expect(outer.y + outer.height).toBeLessThanOrEqual(PHONE.height);

        // The keyboard comes up to 100px above the bottom of the box.
        const keyboardTop = Math.round(outer.y + outer.height) - 100;
        await setVisualViewportHeight(page, keyboardTop);
        await expect(plain).toHaveAttribute("data-keyboard-open", "true");
        await expect
            .poll(async () => Math.abs((await box(plain)).y + (await box(plain)).height - keyboardTop))
            .toBeLessThanOrEqual(tolerance);
        expect((await box(plain)).y, "Still inside its box").toBeGreaterThanOrEqual(outer.y);

        // The page scrolls with the keyboard up: the bar stays on the keyboard's edge.
        // (Whatever scrolls the page here: the window, or a box of the site's layout.)
        await frame.evaluate((el) => {
            for (let node = el.parentElement; node; node = node.parentElement) {
                const before = node.scrollTop;
                node.scrollTop = before + 60;
                if (node.scrollTop !== before) return;
            }
            window.scrollBy(0, 60);
        });
        const moved = await box(frame);
        expect(Math.round(moved.y)).toBe(Math.round(outer.y) - 60);
        await expect
            .poll(async () => Math.abs((await box(plain)).y + (await box(plain)).height - keyboardTop))
            .toBeLessThanOrEqual(tolerance);

        // The keyboard covers the whole box: the bar stops at the top of it.
        await setVisualViewportHeight(page, Math.round(moved.y) - 40);
        await expect
            .poll(async () => Math.round((await box(plain)).y - moved.y))
            .toBeLessThanOrEqual(2);
        const clamped = await box(plain);
        expect(clamped.y, "Not above its box").toBeGreaterThanOrEqual(moved.y);
        expect(clamped.y + clamped.height, "Not below it").toBeLessThanOrEqual(
            moved.y + moved.height,
        );

        // The keyboard ends below the box: the bar is where it rests.
        await setVisualViewportHeight(page, Math.round(moved.y + moved.height) + 20);
        await expect(plain).toHaveAttribute("data-keyboard-open", "true");
        await expect
            .poll(async () => Math.round((await box(plain)).y - moved.y))
            .toBe(Math.round(rest.y - outer.y));
        expect(await plain.evaluate((el) => el.style.bottom)).toBe("");
    });

    test("in a BottomSheet: the bar stays inside the sheet's content", async ({ page }) => {
        await page.goto("/components/StickyActionBar", { waitUntil: "domcontentloaded" });
        const sheet = page.getByRole("dialog", { name: "Add a visit" });
        await expect(async () => {
            if ((await sheet.count()) === 0) {
                await page.getByTestId("sticky-action-bar-demo-sheet-open").click();
            }
            await expect(sheet).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        await expect.poll(() => sheet.evaluate((el) => el.getAnimations().length)).toBe(0);
        const content = sheet.locator("[data-bottom-sheet-content]");
        const inSheet = page.getByTestId("sticky-action-bar-demo-in-sheet");

        const panel = await box(sheet);
        const area = await box(content);
        const rest = await box(inSheet);
        expect(Math.round(panel.y + panel.height)).toBe(PHONE.height);
        // The content has 16px of padding at its end; the bar sticks inside it.
        expect(Math.round(rest.y + rest.height), "At rest: the bottom of the content").toBe(
            PHONE.height - 16,
        );
        expect(Math.round(rest.x)).toBe(0);
        expect(Math.round(rest.width)).toBe(PHONE.width);

        // A keyboard over the lower 140px of the screen. The sheet itself now
        // moves up to stand on the keyboard, and its content with it: the bar
        // is where it rests in that content, 16px above the keyboard, and is
        // not raised a second time on top of the sheet's own move.
        for (const keyboardTop of [PHONE.height - 140, ABOVE_KEYBOARD]) {
            await setVisualViewportHeight(page, keyboardTop);
            await expect
                .poll(async () => Math.round((await box(sheet)).y + (await box(sheet)).height), "The sheet")
                .toBe(keyboardTop);
            await expect
                .poll(async () => Math.round((await box(inSheet)).y + (await box(inSheet)).height), "The bar")
                .toBe(keyboardTop - 16);
            expect(await inSheet.evaluate((el) => el.style.bottom), "No lift of its own").toBe("");
            const now = await box(content);
            const raised = await box(inSheet);
            expect(raised.y).toBeGreaterThanOrEqual(now.y - tolerance);
            expect(raised.y + raised.height).toBeLessThanOrEqual(now.y + now.height + tolerance);
            await expect(inSheet.getByRole("button", { name: "Save visit" })).toBeVisible();
        }
        // The keyboard goes: the sheet and the bar are back where they were.
        await setVisualViewportHeight(page, null);
        await expect
            .poll(async () => Math.round((await box(inSheet)).y + (await box(inSheet)).height))
            .toBe(PHONE.height - 16);
        expect((await box(content)).y).toBe(area.y);
    });

    test("in an AppShell with a tab bar: the bar lands on the keyboard, not a tab bar's height above it", async ({
        page,
    }) => {
        await page.goto("/components/StickyActionBar", { waitUntil: "domcontentloaded" });
        await expect(async () => {
            await page.getByRole("button", { name: "Open with a tab bar" }).click({ timeout: 1_000 });
            await expect(fullScreen(page)).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        const tabs = shell(page).getByRole("navigation", { name: "Main" });
        const footer = await box(tabs);
        const rest = await box(bar(page));
        expect(Math.round(footer.y + footer.height)).toBe(PHONE.height);
        expect(Math.round(rest.y + rest.height), "At rest: directly above the tab bar").toBe(
            Math.round(footer.y),
        );

        await setVisualViewportHeight(page, ABOVE_KEYBOARD);
        await expect
            .poll(async () => Math.round((await box(bar(page))).y + (await box(bar(page))).height))
            .toBe(ABOVE_KEYBOARD);
        // Raised by the keyboard's height less the tab bar under it.
        expect(await bar(page).evaluate((el) => el.style.bottom)).toBe(
            `${PHONE.height - ABOVE_KEYBOARD - Math.round(footer.height)}px`,
        );
    });
});
