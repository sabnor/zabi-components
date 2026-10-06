import { expect, test, type Locator, type Page } from "@playwright/test";

import { gotoHydrated } from "./helpers/hydration";

/**
 * A control that turns `loading` while it has focus keeps it.
 *
 * Loading used to set `disabled` on a button and take the `href` off a link.
 * Either makes the element unfocusable, and the browser then puts focus on
 * `<body>`: after a save by keyboard the next Tab started from the top of the
 * page. jsdom does not do that, so only a browser shows it.
 *
 * The lab is /chaos-lab/loading-focus: every control there loads for a second
 * when pressed. The page's clock is held, so "while it is loading" lasts as
 * long as the test needs.
 */

const VARIANTS = ["primary", "secondary", "outline", "ghost", "link", "danger", "accent"];

async function open(page: Page): Promise<void> {
    await gotoHydrated(page, "/chaos-lab/loading-focus");
    await page.clock.install();
    await page.clock.pauseAt(Date.now() + 60_000);
}

/**
 * Colours ease over 150ms, in real time whatever the page's clock says: wait
 * for them to arrive before reading one. By their own promises: the clock
 * that is held here is also the one that would call back a frame or a timer.
 */
const settled = (page: Page) =>
    page.evaluate(async () => {
        const easing = document.getAnimations().filter((animation) => animation instanceof CSSTransition);
        await Promise.all(easing.map((animation) => animation.finished.catch(() => undefined)));
    });

const presses = async (page: Page) =>
    JSON.parse((await page.getByTestId("presses").textContent()) ?? "{}") as Record<string, number>;

/** Focus the control, press it with the keyboard, and check what it is while it loads. */
async function pressAndCheck(page: Page, control: Locator, id: string, key = "Enter"): Promise<void> {
    await control.focus();
    await page.keyboard.press(key);
    await expect(control).toHaveAttribute("aria-busy", "true");
    await expect(control).toHaveAttribute("aria-disabled", "true");
    await expect(control, "Loading must not take focus from the control").toBeFocused();
    expect(await page.evaluate(() => document.activeElement === document.body)).toBe(false);
    expect((await presses(page))[id]).toBe(1);

    // Pressed again while it loads: nothing.
    await page.keyboard.press("Enter");
    await page.keyboard.press("Space");
    await control.click({ force: true });
    expect((await presses(page))[id], "A press while loading does nothing").toBe(1);

    // Still a Tab stop: Shift+Tab and Tab come back to it.
    await page.keyboard.press("Shift+Tab");
    await expect(control).not.toBeFocused();
    await page.keyboard.press("Tab");
    await expect(control, "A loading control stays in the Tab order").toBeFocused();

    await page.clock.runFor(1000);
    await expect(control).not.toHaveAttribute("aria-busy", "true");
    await expect(control).not.toHaveAttribute("aria-disabled", "true");
    await expect(control, "And focus is still there when it has loaded").toBeFocused();
}

test.describe("loading keeps focus", () => {
    for (const variant of VARIANTS) {
        test(`Button ${variant}: stays focused, a Tab stop and unpressable while it loads`, async ({ page }) => {
            await open(page);
            await pressAndCheck(page, page.getByTestId(`button-${variant}`), variant);
        });
    }

    test("Button with the Space key", async ({ page }) => {
        await open(page);
        await pressAndCheck(page, page.getByTestId("button-primary"), "primary", "Space");
    });

    test("IconButton: stays focused, a Tab stop and unpressable while it loads", async ({ page }) => {
        await open(page);
        await pressAndCheck(page, page.getByTestId("icon-button"), "icon");
    });

    test("a link button: no address while it loads, and focus stays on it", async ({ page }) => {
        await open(page);
        const link = page.getByTestId("link-button");
        await expect(link).toHaveAttribute("href", "/docs");
        await pressAndCheck(page, link, "link1");
        await expect(link).toHaveAttribute("href", "/docs");
        await expect(page).toHaveURL(/\/chaos-lab\/loading-focus$/);
    });

    test("an icon link: no address while it loads, and focus stays on it", async ({ page }) => {
        await open(page);
        const link = page.getByTestId("icon-link");
        await pressAndCheck(page, link, "iconLink");
        await expect(link).toHaveAttribute("href", "/theming");
    });

    test("a link has no address while it loads: nothing to follow by any means", async ({ page }) => {
        await open(page);
        const link = page.getByTestId("link-button");
        await link.focus();
        await page.keyboard.press("Enter");
        await expect(link).toHaveAttribute("aria-busy", "true");
        expect(await link.getAttribute("href")).toBeNull();
        await expect(link).toHaveAttribute("role", "link");
        await expect(link).toHaveAttribute("tabindex", "0");
    });

    test("a loading submit button does not submit: not by a press, and not by Enter in a field", async ({ page }) => {
        await open(page);
        const submit = page.getByTestId("submit");
        await submit.focus();
        await page.keyboard.press("Enter");
        await expect(page.getByTestId("submits")).toHaveText("1");
        await expect(submit).toHaveAttribute("aria-busy", "true");
        await expect(submit).toBeFocused();

        await page.keyboard.press("Enter");
        await page.getByTestId("name").focus();
        await page.keyboard.press("Enter");
        await expect(page.getByTestId("submits"), "One submit, however often it is asked for while loading").toHaveText("1");

        await page.clock.runFor(1000);
        await expect(submit).not.toHaveAttribute("aria-busy", "true");
        await page.keyboard.press("Enter");
        await expect(page.getByTestId("submits")).toHaveText("2");
    });

    test("while loading every variant wears the disabled pair, also under the pointer and pressed", async ({ page }) => {
        await open(page);
        const look = (control: Locator) =>
            control.evaluate((element) => {
                const style = getComputedStyle(element);
                return `${style.backgroundColor} ${style.color} ${style.cursor} ${style.textDecorationLine}`;
            });
        const box = async (control: Locator) => {
            const rect = (await control.boundingBox())!;
            return { width: Math.round(rect.width * 10) / 10, height: Math.round(rect.height * 10) / 10 };
        };
        let pair: string | undefined;
        for (const variant of VARIANTS) {
            const button = page.getByTestId(`button-${variant}`);
            const resting = await box(button);
            await button.focus();
            await page.keyboard.press("Enter");
            await expect(button).toHaveAttribute("aria-busy", "true");
            await settled(page);
            const loading = await look(button);
            pair ??= loading;
            expect(loading, `${variant}: the same disabled pair as every other variant`).toBe(pair);
            expect(loading).toContain("not-allowed");
            expect(loading, "No underline on a loading link variant").toContain("none");

            await button.hover();
            await settled(page);
            expect(await look(button), `${variant}: unchanged under the pointer`).toBe(loading);
            await page.mouse.down();
            await settled(page);
            expect(await look(button), `${variant}: unchanged while pressed`).toBe(loading);
            expect(
                await button.evaluate((element) => getComputedStyle(element).scale),
                `${variant}: no pressed dip`,
            ).toBe("none");
            await page.mouse.up();
            await page.mouse.move(1, 1);

            // The spinner takes room beside the label, so it is wider; nothing else moves.
            const busy = await box(button);
            expect(busy.height, `${variant}: the same height`).toBe(resting.height);
        }
    });

    test("it shows a focus ring while it loads", async ({ page }) => {
        await open(page);
        const button = page.getByTestId("button-primary");
        await page.keyboard.press("Tab");
        await button.focus();
        await page.keyboard.press("Enter");
        await expect(button).toHaveAttribute("aria-busy", "true");
        await settled(page);
        const shadow = await button.evaluate((element) => getComputedStyle(element).boxShadow);
        expect(shadow, "A focused control has to show where focus is").toMatch(/0px 0px 0px 4px/);
    });
});
