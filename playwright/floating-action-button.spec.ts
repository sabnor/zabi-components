import { expect, test, type Locator, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * FloatingActionButton in a real browser: the parts jsdom cannot show.
 *
 * Where it floats is the component: above the tab bar and not on it, a fixed
 * distance from the edges whatever the text size, on the other side in a
 * right-to-left page, and still there while the content scrolls under it.
 */

const PHONE = { width: 375, height: 740 };

const shellOf = (page: Page, example: number) => page.getByTestId(`fab-demo-shell-${example}`);
const round = (page: Page) => shellOf(page, 0).getByRole("button", { name: "New quiz" });
const extended = (page: Page) => shellOf(page, 1).getByRole("button", { name: "Write a question" });
const tabsOf = (page: Page, example: number) =>
    shellOf(page, example).getByRole("navigation", { name: "Main" });

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

/** The page is usable before it hydrates; a click that lands early counts nothing. */
async function gotoHydrated(page: Page) {
    await page.goto("/components/FloatingActionButton", { waitUntil: "domcontentloaded" });
    await shellOf(page, 0).scrollIntoViewIfNeeded();
    await waitForHydration(page);
    await round(page).click();
    await expect(page.getByTestId("fab-demo-count-0")).not.toHaveText("Pressed 0 times.");
}

test.describe("FloatingActionButton in an AppShell", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: PHONE });

    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page);
    });

    test("is 56px round, 16px above the tab bar and 16px from the edge", async ({ page }) => {
        const button = await box(round(page));
        expect(Math.round(button.width)).toBe(56);
        expect(Math.round(button.height)).toBe(56);
        expect(await round(page).evaluate((el) => getComputedStyle(el).borderRadius)).toMatch(
            /^(9999px|3\.35544e\+07px|50%)/,
        );

        const shell = await box(shellOf(page, 0));
        const tabs = await box(tabsOf(page, 0));
        expect(Math.round(tabs.y - (button.y + button.height)), "Above the tab bar, not on it").toBe(16);
        expect(Math.round(shell.x + shell.width - (button.x + button.width))).toBe(16);
    });

    test("stays put while the content scrolls, and the last row can scroll clear of it", async ({
        page,
    }) => {
        const before = await box(round(page));
        const scroller = shellOf(page, 0).locator("[data-app-shell-scroller]");
        await scroller.evaluate((el) => (el.scrollTop = el.scrollHeight));
        const after = await box(round(page));
        expect(after.y).toBe(before.y);
        expect(after.x).toBe(before.x);

        const last = await box(shellOf(page, 0).getByText("Round 12"));
        expect(last.y + last.height, "The last row ends above the button").toBeLessThanOrEqual(
            after.y,
        );
    });

    test("takes a tap, and is the last thing before the tabs in the tab order", async ({ page }) => {
        const count = page.getByTestId("fab-demo-count-0");
        const text = await count.textContent();
        await round(page).tap();
        await expect(count).not.toHaveText(text!);

        await round(page).focus();
        await page.keyboard.press("Tab");
        await expect(tabsOf(page, 0).getByRole("link", { name: "Home" })).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        await expect(round(page)).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(count).not.toHaveText((await count.textContent()) === text ? "" : text!);
    });

    test("extended: shows its label, centred, the same distance above the tab bar", async ({
        page,
    }) => {
        await shellOf(page, 1).scrollIntoViewIfNeeded();
        await expect(extended(page)).toHaveText("Write a question");
        // The text names it: no aria-label on top.
        expect(await extended(page).getAttribute("aria-label")).toBeNull();
        const button = await box(extended(page));
        const shell = await box(shellOf(page, 1));
        const tabs = await box(tabsOf(page, 1));
        expect(Math.round(button.height)).toBe(56);
        expect(button.width).toBeGreaterThan(120);
        expect(Math.round(tabs.y - (button.y + button.height))).toBe(16);
        expect(
            Math.abs(button.x + button.width / 2 - (shell.x + shell.width / 2)),
            "Centred in the shell",
        ).toBeLessThanOrEqual(1);
    });

    test("pressed: the fill changes and the button gives a little", async ({ page }) => {
        const idle = await round(page).evaluate((el) => getComputedStyle(el).backgroundColor);
        const target = await box(round(page));
        await page.mouse.move(target.x + 28, target.y + 28);
        await page.mouse.down();
        await expect
            .poll(() => round(page).evaluate((el) => getComputedStyle(el).backgroundColor))
            .not.toBe(idle);
        await expect.poll(() => round(page).evaluate((el) => getComputedStyle(el).scale)).toBe("0.96");
        await page.mouse.up();
    });
});

test.describe("FloatingActionButton — display modes", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
        await gotoHydrated(page);
    });

    test("right to left: bottom-end is on the left", async ({ page }) => {
        await page.evaluate(() => (document.documentElement.dir = "rtl"));
        const button = await box(round(page));
        const shell = await box(shellOf(page, 0));
        expect(Math.round(button.x - shell.x)).toBe(16);
        const tabs = await box(tabsOf(page, 0));
        expect(Math.round(tabs.y - (button.y + button.height))).toBe(16);
    });

    test("enlarged text: the margins stay 16px, and the extended label wraps inside the screen", async ({
        page,
    }) => {
        // The frames on this page are narrower than a phone at phone width.
        // On a wide page, each is set to exactly 320px: a 320px shell.
        await page.setViewportSize({ width: 1000, height: 800 });
        for (const example of [0, 1]) {
            await shellOf(page, example).evaluate((el) => {
                el.parentElement!.style.width = "320px";
            });
        }
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        expect(Math.round((await box(shellOf(page, 1))).width)).toBe(318);
        await shellOf(page, 0).scrollIntoViewIfNeeded();
        const tabs = await box(tabsOf(page, 0));
        const button = await box(round(page));
        expect(Math.round(tabs.y - (button.y + button.height))).toBe(16);
        // The round button is 56px whatever the text size, and so is its icon.
        expect(Math.round(button.width)).toBe(56);
        expect(Math.round(button.height)).toBe(56);
        const icon = await box(round(page).locator("svg"));
        expect(Math.round(icon.width)).toBe(24);

        await shellOf(page, 1).scrollIntoViewIfNeeded();
        const shell = await box(shellOf(page, 1));
        const wide = await box(extended(page));
        expect(wide.x).toBeGreaterThanOrEqual(shell.x + 16);
        expect(wide.x + wide.width).toBeLessThanOrEqual(shell.x + shell.width - 16);
        expect(wide.height, "The label is on more than one line").toBeGreaterThan(112);
        expect(await extended(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        expect(
            await shellOf(page, 1).evaluate((el) => el.scrollWidth <= el.clientWidth),
            "Nothing scrolls sideways",
        ).toBe(true);
    });

    test("forced colours: the button has an outline of its own", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const border = await round(page).evaluate((el) => {
            const style = getComputedStyle(el);
            return { width: style.borderTopWidth, style: style.borderTopStyle, colour: style.borderTopColor };
        });
        expect(border.width).toBe("1px");
        expect(border.style).toBe("solid");
        expect(border.colour).not.toBe("rgba(0, 0, 0, 0)");
    });

    test("focus: a ring is drawn on keyboard focus", async ({ page }) => {
        await tabsOf(page, 0).getByRole("link", { name: "Home" }).focus();
        await page.keyboard.press("Shift+Tab");
        await expect(round(page)).toBeFocused();
        // The ring itself, not the empty placeholders every Tailwind shadow
        // carries (`rgba(0, 0, 0, 0) 0px 0px 0px 0px`): 2px of the offset
        // colour, then the ring colour out to 4px, with the elevation kept.
        const ring = await round(page).evaluate((el) => {
            const probe = document.createElement("span");
            probe.style.color = "var(--zabi-focus-ring-color)";
            el.appendChild(probe);
            const colour = getComputedStyle(probe).color;
            probe.remove();
            return { colour, shadow: getComputedStyle(el).boxShadow };
        });
        expect(ring.colour).not.toBe("rgba(0, 0, 0, 0)");
        expect(ring.shadow).toContain("0px 0px 0px 2px");
        expect(ring.shadow).toContain(`${ring.colour} 0px 0px 0px 4px`);
        expect(ring.shadow, "The button keeps its elevation while focused").toContain("15px -3px");

        // Not there without keyboard focus.
        await page.keyboard.press("Shift+Tab");
        await expect(round(page)).not.toBeFocused();
        expect(
            await round(page).evaluate((el) => getComputedStyle(el).boxShadow),
        ).not.toContain("0px 0px 0px 4px");
    });

    test("focus: the extended link has the same ring", async ({ page }) => {
        await tabsOf(page, 1).getByRole("link", { name: "Home" }).focus();
        await page.keyboard.press("Shift+Tab");
        await expect(extended(page)).toBeFocused();
        expect(await extended(page).evaluate((el) => getComputedStyle(el).boxShadow)).toMatch(
            /0px 0px 0px 2px, .+ 0px 0px 0px 4px/,
        );
    });

    test("dark theme: primary fill with its own text colour", async ({ page }) => {
        const colours = () =>
            round(page).evaluate((el) => {
                const style = getComputedStyle(el);
                const root = getComputedStyle(document.documentElement);
                const resolve = (name: string) => {
                    const probe = document.createElement("span");
                    probe.style.color = `var(${name})`;
                    document.body.append(probe);
                    const value = getComputedStyle(probe).color;
                    probe.remove();
                    return value;
                };
                void root;
                return {
                    fill: style.backgroundColor,
                    text: style.color,
                    primary: resolve("--color-action-primary"),
                    onPrimary: resolve("--color-action-primary-text"),
                };
            });
        // Off the button, and past the fade back from its hover fill.
        await page.mouse.move(0, 0);
        await expect.poll(async () => (await colours()).fill === (await colours()).primary).toBe(true);
        const light = await colours();
        expect(light.fill).toBe(light.primary);
        expect(light.text).toBe(light.onPrimary);

        await page.evaluate(() => document.documentElement.classList.add("dark"));
        // Past the fade from one fill to the other.
        await expect
            .poll(async () => {
                const now = await colours();
                return now.fill !== light.fill && now.fill === now.primary;
            })
            .toBe(true);
        const dark = await colours();
        expect(dark.fill).toBe(dark.primary);
        expect(dark.text).toBe(dark.onPrimary);
    });
});
