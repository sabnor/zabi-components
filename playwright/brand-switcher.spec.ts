import { expect, test, type Page } from "@playwright/test";

/**
 * The brand menu in the site's header must open inside the viewport.
 *
 * From 1024px up (`collapseAt="lg"` on the site's TopNavbar) the control sits
 * at the right edge of the bar. With the Dropdown's default placement its menu
 * opened to the right and ran past the viewport, so the whole document gained
 * a horizontal scrollbar while the menu was open. Below 1024px the same
 * control is rendered at the left edge of the phone menu, where the opposite
 * placement would be cut off instead.
 */

const trigger = (page: Page) =>
    page.getByRole("button", { name: /Brand accent/ }).filter({ visible: true }).first();
const menu = (page: Page) =>
    page.getByRole("menu", { name: "Brand accent" }).filter({ visible: true }).first();

/** The page is usable before it hydrates; a click that lands early is lost. */
async function openMenu(page: Page): Promise<void> {
    await expect(async () => {
        if ((await menu(page).count()) === 0) await trigger(page).click();
        await expect(menu(page)).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
}

/** Below the header's breakpoint the control is inside the phone menu. */
async function revealTrigger(page: Page): Promise<void> {
    await expect(async () => {
        if ((await trigger(page).count()) === 0) {
            await page.getByRole("button", { name: "Open menu" }).click();
        }
        await expect(trigger(page)).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
}

async function expectMenuInsideViewport(page: Page, width: number): Promise<void> {
    // The panel is the menu's positioned parent; it fades in over 200ms but is
    // laid out at its final place at once.
    const box = await menu(page).evaluate((el) => {
        const rect = (el.parentElement ?? el).getBoundingClientRect();
        return { left: rect.left, right: rect.right };
    });
    expect(box.left, "menu left edge").toBeGreaterThanOrEqual(0);
    expect(box.right, "menu right edge").toBeLessThanOrEqual(width);
    expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        "document width with the menu open",
    ).toBeLessThanOrEqual(width);
}

for (const width of [375, 768, 1023, 1024, 1280]) {
    test(`the brand menu stays inside the viewport at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto("/docs", { waitUntil: "domcontentloaded" });
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

        await revealTrigger(page);
        await openMenu(page);
        await expectMenuInsideViewport(page, width);
    });
}
