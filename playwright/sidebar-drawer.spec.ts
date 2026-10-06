import { expect, test, type Page } from "@playwright/test";

/**
 * A sidebar on a small screen.
 *
 * SidebarShell is 266px wide and had no small-screen mode, so the docs site
 * built its own off-canvas wrapper and backdrop around the catalog sidebar,
 * as every consumer had to. With `mobile="drawer"` the rail is there from the
 * `lg` breakpoint (1024px) up, and below it the same sidebar opens in a
 * Drawer from the start edge. The catalog layout
 * (src/routes/components/+layout.svelte) uses it, and is what is measured.
 */

async function openCatalog(page: Page) {
    await page.goto("/components/Button", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
}

const rail = (page: Page) => page.locator('nav[aria-label="Component catalog"]:not([data-sidebar-drawer])');
const menuButton = (page: Page) => page.getByTestId("catalog-menu-button");
const drawer = (page: Page) => page.getByRole("dialog", { name: "Components" });

const overflow = (page: Page) =>
    page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

/** Opens the drawer: the page is usable before it hydrates, so the first click may come too early. */
async function openDrawer(page: Page) {
    await expect(async () => {
        if (!(await drawer(page).isVisible())) await menuButton(page).click();
        await expect(drawer(page)).toBeVisible({ timeout: 1_500 });
    }).toPass({ timeout: 30_000 });
    // It slides in over 200ms.
    await page.waitForTimeout(350);
}

for (const width of [375, 768, 1023]) {
    test.describe(`catalog sidebar below lg, ${width}px`, () => {
        test.use({ viewport: { width, height: 800 }, hasTouch: width < 768, isMobile: width < 768 });

        test("no rail: the page has the full width, and a button opens the catalog", async ({ page }) => {
            await openCatalog(page);
            await expect(rail(page)).toBeHidden();
            await expect(menuButton(page)).toBeVisible();
            await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
            await expect(menuButton(page)).toHaveAttribute("aria-haspopup", "dialog");
            await expect(drawer(page)).toHaveCount(0);
            // The content column starts at the screen's edge.
            const content = await page.locator("main h1").first().evaluate((heading) => {
                const scroller = heading.closest(".overflow-y-auto")!;
                return scroller.getBoundingClientRect().left;
            });
            expect(content).toBe(0);
            expect(await overflow(page)).toBe(0);
            const button = await menuButton(page).boundingBox();
            expect(button!.width).toBeGreaterThanOrEqual(44);
            expect(button!.height).toBeGreaterThanOrEqual(44);
        });

        test("the catalog opens in a drawer from the start edge, inside the screen, with its search and links", async ({
            page,
        }) => {
            await openCatalog(page);
            await openDrawer(page);
            await expect(menuButton(page)).toHaveAttribute("aria-expanded", "true");
            const panel = (await drawer(page).boundingBox())!;
            expect(panel.x).toBe(0);
            expect(panel.width).toBeLessThanOrEqual(Math.min(width, 320));
            expect(panel.height).toBe(800);
            await expect(drawer(page)).toHaveAttribute("data-side", "start");

            const nav = drawer(page).getByRole("navigation", { name: "Component catalog" });
            await expect(nav).toBeVisible();
            await expect(nav.getByRole("link", { name: "Button", exact: true })).toBeVisible();
            await expect(nav.locator('input[type="search"]')).toBeVisible();
            // Nothing in it reaches outside the panel.
            const widest = await nav.evaluate((element) =>
                Math.max(...[...element.querySelectorAll("a, button, input")].map((item) => item.getBoundingClientRect().right)),
            );
            expect(widest).toBeLessThanOrEqual(panel.x + panel.width);
            expect(await overflow(page)).toBe(0);
            // The sidebar is in the page once: the rail is not shown beside its own drawer.
            await expect(rail(page)).toBeHidden();
        });

        test("focus stays in the drawer; Escape and the backdrop close it and focus returns to the button", async ({
            page,
        }) => {
            await openCatalog(page);
            await openDrawer(page);
            for (let press = 0; press < 6; press += 1) {
                await page.keyboard.press("Tab");
                expect(await drawer(page).evaluate((element) => element.contains(document.activeElement))).toBe(true);
            }
            await page.keyboard.press("Escape");
            await expect(drawer(page)).toHaveCount(0);
            await expect(menuButton(page)).toBeFocused();
            await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");

            await openDrawer(page);
            await page.mouse.click(width - 10, 400);
            await expect(drawer(page)).toHaveCount(0);
        });

        test("choosing a component goes there and closes the drawer", async ({ page }) => {
            await openCatalog(page);
            await openDrawer(page);
            await drawer(page).getByRole("link", { name: "Badge", exact: true }).click();
            await expect(page).toHaveURL(/\/components\/Badge/);
            await expect(drawer(page)).toHaveCount(0);
            await expect(page.locator("main h1").first()).toHaveText("Badge");
            // And it opens again from the new page.
            await openDrawer(page);
            await expect(drawer(page).getByRole("link", { name: "Badge", exact: true })).toHaveAttribute(
                "aria-current",
                "page",
            );
        });

        test("choosing a category (a link the site handles itself) closes it as well", async ({ page }) => {
            await openCatalog(page);
            await openDrawer(page);
            await drawer(page).getByRole("link", { name: /Molecules/ }).first().click();
            await expect(drawer(page)).toHaveCount(0);
            await expect(page).not.toHaveURL(/\/components\/Button/);
        });
    });
}

for (const width of [1024, 1280]) {
    test.describe(`catalog sidebar from lg up, ${width}px`, () => {
        test.use({ viewport: { width, height: 800 } });

        test("the rail is beside the page, 266px wide, and there is no button and no drawer", async ({ page }) => {
            await openCatalog(page);
            await expect(rail(page)).toBeVisible();
            const box = (await rail(page).boundingBox())!;
            expect(box.x).toBe(0);
            expect(box.width).toBe(266);
            await expect(menuButton(page)).toBeHidden();
            await expect(drawer(page)).toHaveCount(0);
            const content = await page.locator("main h1").first().evaluate((heading) => {
                return heading.closest(".overflow-y-auto")!.getBoundingClientRect().left;
            });
            expect(content).toBe(266);
            expect(await overflow(page)).toBe(0);
            await rail(page).getByRole("link", { name: "Badge", exact: true }).click();
            await expect(page).toHaveURL(/\/components\/Badge/);
            await expect(rail(page)).toBeVisible();
        });
    });
}

test.describe("catalog drawer when the window grows", () => {
    test.use({ viewport: { width: 900, height: 800 } });

    test("an open drawer closes at lg, where the rail takes over", async ({ page }) => {
        await openCatalog(page);
        await openDrawer(page);
        await page.setViewportSize({ width: 1100, height: 800 });
        await expect(drawer(page)).toHaveCount(0);
        await expect(rail(page)).toBeVisible();
        // Scrolling is not left locked behind it.
        expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
    });
});
