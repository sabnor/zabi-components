import { expect, test } from "@playwright/test";

import { gotoHydrated } from "./helpers/hydration";

/**
 * The category rows of the component catalog are links, so they have to go
 * somewhere a browser understands. They were `href="category:molecules"`: an
 * address in a scheme that does not exist, which only worked because a click
 * handler caught it. Opened in a new tab, copied, or pressed before the page
 * had hydrated, it led nowhere.
 */

test.describe("the catalog's category links", () => {
    test("every link in the catalog has an address on this site", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await gotoHydrated(page, "/components/Button");
        const catalog = page.getByRole("navigation", { name: "Component catalog" });
        const addresses = await catalog.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
        expect(addresses.length).toBeGreaterThan(10);
        for (const address of addresses) expect(address).toMatch(/^\/components\/[A-Za-z]+(\?catalog=all)?(#[a-z-]+)?$/);
    });

    test("a category leads to its first component, and is marked as where you are", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await gotoHydrated(page, "/components/Button");
        const catalog = page.getByRole("navigation", { name: "Component catalog" });
        const atoms = catalog.getByRole("link", { name: /^Atoms/ });
        const molecules = catalog.getByRole("link", { name: /^Molecules/ });
        await expect(atoms).toHaveAttribute("aria-current", "location");
        await expect(molecules).not.toHaveAttribute("aria-current", /.+/);
        // The page itself is one row, the category another: one of each.
        await expect(catalog.locator('a[aria-current="page"]')).toHaveCount(1);
        await expect(catalog.locator('a[aria-current="location"]')).toHaveCount(1);

        const target = await molecules.getAttribute("href");
        await molecules.click();
        await expect(page).toHaveURL(new RegExp(`${target!.split("#")[0]}`));
        await expect(molecules).toHaveAttribute("aria-current", "location");
        await expect(atoms).not.toHaveAttribute("aria-current", /.+/);
        await expect(catalog.locator('a[aria-current="page"]')).toHaveCount(1);
        await expect(page.locator("main h1").first()).not.toHaveText("Button");

        // All: every component, and the address says so.
        await catalog.getByRole("link", { name: /^All/ }).click();
        await expect(page).toHaveURL(/\?catalog=all/);
        await expect(catalog.getByRole("link", { name: /^All/ })).toHaveAttribute("aria-current", "location");
    });

    test("the address works by itself: opened directly, it is that category", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await gotoHydrated(page, "/components/Button");
        const catalog = page.getByRole("navigation", { name: "Component catalog" });
        const target = await catalog.getByRole("link", { name: /^Organisms/ }).getAttribute("href");
        await gotoHydrated(page, target!);
        await expect(catalog.getByRole("link", { name: /^Organisms/ })).toHaveAttribute("aria-current", "location");
    });
});
