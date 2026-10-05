import { expect, test, type Page } from "@playwright/test";

/**
 * ThemeToggle on a page that is switched with `data-theme`.
 *
 * The theme can be switched on `<html>` by the `dark` class or by
 * `data-theme="light" | "dark" | "auto"`. ThemeToggle knew only the class. The
 * unit tests (tests/theme-toggle.test.ts) cover what it reads and writes; this
 * covers what needs a stylesheet: that the page really changes, and that the
 * icon shown before the button mounts is chosen by CSS under all three dark
 * selectors.
 */

const PREVIEWS = "main .min-h-\\[100px\\]";

/** Serves the page with `attributes` on `<html>`, as an app that sets them on the server would. */
async function withRootAttributes(page: Page, attributes: string) {
    await page.route("**/components/ThemeToggle", async (route) => {
        const response = await route.fetch();
        const html = await response.text();
        expect(html).toContain('<html lang="en">');
        await route.fulfill({ response, body: html.replace('<html lang="en">', `<html lang="en" ${attributes}>`) });
    });
}

const root = (page: Page) =>
    page.evaluate(() => ({
        class: document.documentElement.classList.contains("dark"),
        attribute: document.documentElement.getAttribute("data-theme"),
        page: getComputedStyle(document.documentElement).getPropertyValue("--color-surface-base").trim(),
    }));

test.describe("ThemeToggle and data-theme", () => {
    // A light system and nothing stored, so the dev site's own start-up script adds no class.
    test.use({ colorScheme: "light" });

    test('on a data-theme="dark" page it reads dark and switches the attribute, not the class', async ({ page }) => {
        await withRootAttributes(page, 'data-theme="dark"');
        await page.goto("/components/ThemeToggle", { waitUntil: "domcontentloaded" });
        const toggle = page.locator(PREVIEWS).getByRole("button", { name: /Switch to (dark|light) mode/ }).first();
        await expect(toggle).toHaveAccessibleName("Switch to light mode");
        await expect(toggle).toHaveAttribute("aria-pressed", "true");
        const dark = await root(page);
        expect(dark).toMatchObject({ class: false, attribute: "dark" });

        await toggle.click();
        await expect(toggle).toHaveAccessibleName("Switch to dark mode");
        const light = await root(page);
        expect(light).toMatchObject({ class: false, attribute: "light" });
        expect(light.page).not.toBe(dark.page);

        await toggle.click();
        expect(await root(page)).toEqual(dark);
    });

    test('on data-theme="auto" it shows what the system shows, and a press makes it explicit', async ({ page }) => {
        await withRootAttributes(page, 'data-theme="auto"');
        await page.emulateMedia({ colorScheme: "dark" });
        // Stored, so that the dev site's start-up script, which follows the system by the class, stays out of it.
        await page.addInitScript(() => localStorage.setItem("theme", "light"));
        await page.goto("/components/ThemeToggle", { waitUntil: "domcontentloaded" });
        const toggle = page.locator(PREVIEWS).getByRole("button", { name: /Switch to (dark|light) mode/ }).first();
        await expect(toggle).toHaveAccessibleName("Switch to light mode");
        const dark = await root(page);
        expect(dark).toMatchObject({ class: false, attribute: "auto" });

        // The system changes: the page follows in CSS and the button follows the page.
        await page.emulateMedia({ colorScheme: "light" });
        await expect(toggle).toHaveAccessibleName("Switch to dark mode");
        expect(await root(page)).toMatchObject({ class: false, attribute: "auto" });
        await page.emulateMedia({ colorScheme: "dark" });
        await expect(toggle).toHaveAccessibleName("Switch to light mode");

        await toggle.click();
        const light = await root(page);
        expect(light).toMatchObject({ class: false, attribute: "light" });
        expect(light.page).not.toBe(dark.page);
    });

    test("on a page without data-theme it toggles the class, as it always has", async ({ page }) => {
        await page.goto("/components/ThemeToggle", { waitUntil: "domcontentloaded" });
        const toggle = page.locator(PREVIEWS).getByRole("button", { name: /Switch to (dark|light) mode/ }).first();
        await expect(toggle).toHaveAccessibleName("Switch to dark mode");
        const light = await root(page);
        expect(light).toMatchObject({ class: false, attribute: null });

        await toggle.click();
        const dark = await root(page);
        expect(dark).toMatchObject({ class: true, attribute: null });
        expect(dark.page).not.toBe(light.page);
        expect(await page.evaluate(() => document.documentElement.style.colorScheme)).toBe("dark");

        await toggle.click();
        expect(await root(page)).toEqual(light);
    });
});

test.describe("ThemeToggle before it mounts", () => {
    // No script: the markup the server sent, where both icons are present and CSS shows one.
    test.use({ javaScriptEnabled: false, colorScheme: "light" });

    const cases: { name: string; attributes: string; system: "light" | "dark"; dark: boolean }[] = [
        { name: "no class and no attribute", attributes: "", system: "dark", dark: false },
        { name: 'class="dark"', attributes: 'class="dark"', system: "light", dark: true },
        { name: 'data-theme="dark"', attributes: 'data-theme="dark"', system: "light", dark: true },
        { name: 'data-theme="light"', attributes: 'data-theme="light"', system: "dark", dark: false },
        { name: 'data-theme="auto" on a dark system', attributes: 'data-theme="auto"', system: "dark", dark: true },
        { name: 'data-theme="auto" on a light system', attributes: 'data-theme="auto"', system: "light", dark: false },
    ];

    for (const { name, attributes, system, dark } of cases) {
        test(`${name}: the ${dark ? "moon" : "sun"} is the icon shown`, async ({ page }) => {
            await page.emulateMedia({ colorScheme: system });
            if (attributes) await withRootAttributes(page, attributes);
            await page.goto("/components/ThemeToggle", { waitUntil: "domcontentloaded" });
            const toggle = page.locator(PREVIEWS).getByRole("button", { name: "Theme toggle" }).first();
            await expect(toggle).toBeVisible();
            await expect(toggle.locator("svg")).toHaveCount(2);
            const shown = await toggle.locator("svg").evaluateAll((icons) =>
                icons
                    .filter((icon) => getComputedStyle(icon).display !== "none")
                    .map((icon) => (icon.getAttribute("class")?.includes("lucide-moon") ? "moon" : "sun")),
            );
            expect(shown).toEqual([dark ? "moon" : "sun"]);
        });
    }
});
