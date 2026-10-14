import { expect, test, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * The brand menu in the site's header must open inside the viewport.
 *
 * From 1024px up (`collapseAt="lg"` on the site's TopNavbar) the control sits
 * at the right edge of the bar. With the Dropdown's default placement its menu
 * opened to the right and ran past the viewport, so the whole document gained
 * a horizontal scrollbar while the menu was open. Below 1024px the links open
 * in a sheet since 9.0, and there the control is a group of radios with no
 * menu of its own: it must fit the sheet instead.
 */

const trigger = (page: Page) =>
    page.getByRole("button", { name: /Brand accent/ }).filter({ visible: true }).first();
const menu = (page: Page) =>
    page.getByRole("menu", { name: "Brand accent" }).filter({ visible: true }).first();

/** The page is usable before it hydrates; a click that lands early is lost. */
async function openMenu(page: Page): Promise<void> {
    await waitForHydration(page);
    if ((await menu(page).count()) === 0) await trigger(page).click();
    await expect(menu(page)).toBeVisible();
}

/** Below the header's breakpoint the control is inside the phone menu. */
async function revealTrigger(page: Page): Promise<void> {
    await waitForHydration(page);
    if ((await trigger(page).count()) === 0) {
        await page.getByRole("button", { name: "Open menu" }).click();
    }
    await expect(trigger(page)).toBeVisible();
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

for (const width of [375, 768, 1023]) {
    test(`below 1024px the brand choice is radios in the menu sheet, inside the viewport at ${width}px`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto("/docs", { waitUntil: "domcontentloaded" });
        await waitForHydration(page);
        await page.getByRole("button", { name: "Open menu" }).click();
        const group = page.getByRole("dialog").getByRole("group", { name: "Brand accent" });
        await expect(group).toBeVisible();
        expect(await group.getByRole("radio").count()).toBeGreaterThan(1);
        const box = (await group.boundingBox())!;
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
}

for (const width of [1024, 1280]) {
    test(`the brand menu stays inside the viewport at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto("/docs", { waitUntil: "domcontentloaded" });
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

        await revealTrigger(page);
        await openMenu(page);
        await expectMenuInsideViewport(page, width);
    });
}
