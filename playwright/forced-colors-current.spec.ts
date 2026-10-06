import { expect, test, type Locator, type Page } from "@playwright/test";

import { gotoHydrated } from "./helpers/hydration";

/**
 * Where you are, in forced colours.
 *
 * The current item of a navigation list is marked with a tinted fill, a label
 * in the action colour and, in the sidebar, a 3px bar that is itself a fill.
 * Forced colours take every one of those away: fills become the canvas and
 * every link gets the system's link colour. The current page and the current
 * category in the catalog looked like every other link.
 *
 * So the current item also carries an outline there, which is a shape and
 * which forced colours draw (BottomTabBar's active pill and a pressed
 * IconButton do the same). Read here as the computed outline of the item
 * against that of its neighbours.
 */

test.use({ forcedColors: "active" });

/** The outline an element is drawn with, or null when it has none. */
const outline = (item: Locator) =>
    item.evaluate((element) => {
        const style = getComputedStyle(element);
        const width = parseFloat(style.outlineWidth);
        return style.outlineStyle === "none" || !(width > 0) ? null : `${style.outlineStyle} ${width}px ${style.outlineOffset}`;
    });

async function expectMarked(page: Page, current: Locator, others: Locator, what: string): Promise<void> {
    expect(await page.evaluate(() => matchMedia("(forced-colors: active)").matches)).toBe(true);
    await expect(current.first(), `${what}: there is a current item`).toBeVisible();
    for (const item of await current.all()) {
        if (!(await item.isVisible())) continue;
        expect(await outline(item), `${what}: the current item is outlined`).toBe("solid 2px -2px");
    }
    const neighbour = others.first();
    await expect(neighbour).toBeVisible();
    expect(await outline(neighbour), `${what}: and only the current one`).toBeNull();
}

test.describe("the current item keeps a mark in forced colours", () => {
    test("the catalog: the current page and the current category", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await gotoHydrated(page, "/components/Button");
        const catalog = page.getByRole("navigation", { name: "Component catalog" });
        await expectMarked(page, catalog.locator('a[aria-current="page"]'), catalog.locator("a:not([aria-current])"), "page");
        await expectMarked(
            page,
            catalog.locator('a[aria-current="location"]'),
            catalog.locator("a:not([aria-current])"),
            "category",
        );
    });

    test("the catalog as a drawer on a phone", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 740 });
        await gotoHydrated(page, "/components/Button");
        await page.getByRole("button", { name: "Browse components" }).click();
        const catalog = page.getByRole("navigation", { name: "Component catalog" });
        await expect(catalog.locator('a[aria-current="page"]').first()).toBeVisible();
        await expect
            .poll(() => catalog.evaluate((element) => element.getAnimations({ subtree: true }).length === 0))
            .toBe(true);
        await expectMarked(page, catalog.locator('a[aria-current="page"]'), catalog.locator("a:not([aria-current])"), "page");
    });

    test("SidebarNavigation, expanded and as a rail", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await gotoHydrated(page, "/components/SidebarNavigation");
        const previews = page.locator("main .min-h-\\[100px\\]");
        await expectMarked(page, previews.locator("a[aria-current]"), previews.locator("nav a:not([aria-current])"), "sidebar");
    });

    test("SidebarPanel: the selected item", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await gotoHydrated(page, "/components/SidebarPanel");
        const previews = page.locator("main .min-h-\\[100px\\]");
        await expectMarked(
            page,
            previews.locator('[aria-selected="true"]'),
            previews.locator('[aria-selected="false"]'),
            "panel",
        );
    });

    test("the site header: the page you are on", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await gotoHydrated(page, "/docs");
        const header = page.getByRole("navigation", { name: "Main navigation" });
        await expectMarked(page, header.locator('a[aria-current="page"]'), header.locator("a:not([aria-current])"), "header");
    });
});
