import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Dropdown and Select in a real browser: where focus goes when the menu
 * closes. jsdom keeps `document.activeElement` on a removed node's ancestor
 * differently from a browser, so this is checked here as well as in the unit
 * tests.
 */

/** The page is usable before it hydrates; a key or click that lands early is lost. */
async function openWith(page: Page, trigger: Locator, popup: Locator): Promise<void> {
    await expect(async () => {
        if ((await popup.count()) === 0) {
            await trigger.focus();
            await page.keyboard.press("Enter");
        }
        await expect(popup).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
}

test.describe("Dropdown — focus when the menu closes", () => {
    const trigger = (page: Page) =>
        page.getByRole("button", { name: "Project actions" }).first();
    const menu = (page: Page) => page.getByRole("menu", { name: "Project actions" }).first();

    test.beforeEach(async ({ page }) => {
        await page.goto("/components/Dropdown", { waitUntil: "domcontentloaded" });
    });

    test("Escape from an item returns focus to the trigger", async ({ page }) => {
        await openWith(page, trigger(page), menu(page));
        await expect(menu(page).getByRole("menuitem", { name: "Edit" })).toBeFocused();
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Escape");
        await expect(menu(page)).toHaveCount(0);
        await expect(trigger(page)).toBeFocused();
    });

    test("choosing an item with Enter returns focus to the trigger", async ({ page }) => {
        await openWith(page, trigger(page), menu(page));
        await expect(menu(page).getByRole("menuitem", { name: "Edit" })).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(menu(page)).toHaveCount(0);
        await expect(trigger(page)).toBeFocused();
    });

    // Choosing with the mouse is covered on the Select below and in the unit
    // tests: this showcase page renders the demo once per example with one
    // shared open state, so a mousedown in one copy closes them all first.

    test("a click elsewhere closes the menu and leaves focus where the click put it", async ({
        page,
    }) => {
        await openWith(page, trigger(page), menu(page));
        await page.getByRole("heading", { level: 1 }).first().click();
        await expect(menu(page)).toHaveCount(0);
        await expect(trigger(page)).not.toBeFocused();
    });
});

test.describe("Select — focus when the list closes", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/components/Select", { waitUntil: "domcontentloaded" });
    });

    test("choosing an option, and Escape, return focus to the select", async ({ page }) => {
        const trigger = page.locator('button[aria-haspopup="listbox"]').first();
        const list = page.getByRole("listbox").first();
        await openWith(page, trigger, list);

        await list.getByRole("option").first().click();
        await expect(list).toHaveCount(0);
        await expect(trigger).toBeFocused();

        await openWith(page, trigger, list);
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Escape");
        await expect(list).toHaveCount(0);
        await expect(trigger).toBeFocused();
    });
});
