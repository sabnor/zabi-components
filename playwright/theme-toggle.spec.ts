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
        // Something stored, so that the dev site's start-up script, which follows
        // the system by the class when nothing is, stays out of it. Not a mode:
        // the button restores a stored mode when it mounts, and "light" would
        // take the page off "auto".
        await page.addInitScript(() => localStorage.setItem("theme", "unset"));
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

/**
 * `modes="three"`: system, light, dark. An app whose default is
 * `data-theme="auto"` needs a way back to "follow the phone", which the
 * two-way button does not have. The demo on the docs page stores its choice
 * under a key of its own, "zabi-docs-theme-demo".
 */
const DEMO_KEY = "zabi-docs-theme-demo";

test.describe('ThemeToggle with modes="three"', () => {
    test.use({ colorScheme: "light" });

    // The docs page shows the example twice (the preview and the examples list).
    const three = (page: Page) => page.getByTestId("theme-toggle-three").first().getByRole("button");
    const icon = (page: Page) =>
        three(page)
            .locator("svg")
            .evaluateAll((icons) =>
                icons
                    .filter((svg) => getComputedStyle(svg).display !== "none")
                    .map((svg) => /lucide-(monitor|sun|moon)/.exec(svg.getAttribute("class") ?? "")?.[1]),
            );

    test("steps system, light, dark, system: the attribute, the name, the icon and the page each time", async ({ page }) => {
        await withRootAttributes(page, 'data-theme="auto"');
        await page.goto("/components/ThemeToggle", { waitUntil: "domcontentloaded" });
        const toggle = three(page);
        await expect(toggle).toHaveAccessibleName("Theme: system. Switch to light");
        expect(await icon(page)).toEqual(["monitor"]);
        const onSystem = await root(page);
        expect(onSystem).toMatchObject({ class: false, attribute: "auto" });

        await toggle.click();
        await expect(toggle).toHaveAccessibleName("Theme: light. Switch to dark");
        expect(await icon(page)).toEqual(["sun"]);
        const light = await root(page);
        expect(light).toMatchObject({ class: false, attribute: "light" });
        // A light system: "system" and "light" are the same page.
        expect(light.page).toBe(onSystem.page);

        await toggle.click();
        await expect(toggle).toHaveAccessibleName("Theme: dark. Switch to system");
        expect(await icon(page)).toEqual(["moon"]);
        const dark = await root(page);
        expect(dark).toMatchObject({ class: false, attribute: "dark" });
        expect(dark.page).not.toBe(light.page);
        // The theme's own rule, with no inline style left over from the site's start-up script.
        expect(
            await page.evaluate(() => [document.documentElement.style.colorScheme, getComputedStyle(document.documentElement).colorScheme]),
        ).toEqual(["", "dark"]);

        await toggle.click();
        await expect(toggle).toHaveAccessibleName("Theme: system. Switch to light");
        expect(await root(page)).toEqual(onSystem);
        expect(await page.evaluate((key) => localStorage.getItem(key), DEMO_KEY)).toBe("auto");
        // It is a step, not an on/off switch.
        await expect(toggle).not.toHaveAttribute("aria-pressed", /.*/);
    });

    test("on system, the page follows the operating system and the button stays on system", async ({ page }) => {
        await withRootAttributes(page, 'data-theme="auto"');
        await page.goto("/components/ThemeToggle", { waitUntil: "domcontentloaded" });
        const toggle = three(page);
        await expect(toggle).toHaveAccessibleName("Theme: system. Switch to light");
        const light = await root(page);

        await page.emulateMedia({ colorScheme: "dark" });
        await expect.poll(async () => (await root(page)).page).not.toBe(light.page);
        expect(await root(page)).toMatchObject({ class: false, attribute: "auto" });
        await expect(toggle).toHaveAccessibleName("Theme: system. Switch to light");
        expect(await icon(page)).toEqual(["monitor"]);
        // The two-way button beside it reads the result.
        await expect(
            page.locator(PREVIEWS).getByRole("button", { name: /Switch to (dark|light) mode/ }).first(),
        ).toHaveAccessibleName("Switch to light mode");
    });

    test("the stored mode is applied again after a reload, and before first paint with themeInitScript", async ({ page }) => {
        await withRootAttributes(page, 'data-theme="auto"');
        await page.goto("/components/ThemeToggle", { waitUntil: "domcontentloaded" });
        const toggle = three(page);
        await expect(toggle).toHaveAccessibleName("Theme: system. Switch to light");
        await toggle.click();
        await toggle.click();
        await expect(toggle).toHaveAccessibleName("Theme: dark. Switch to system");

        // The markup says "auto" again; the button restores the choice when it mounts.
        await page.reload({ waitUntil: "domcontentloaded" });
        await expect(three(page)).toHaveAccessibleName("Theme: dark. Switch to system");
        expect(await root(page)).toMatchObject({ class: false, attribute: "dark" });

        // With the head script the attribute is right before any component runs.
        const { themeInitScript } = await import("../src/components/util/theme-mode");
        await page.unroute("**/components/ThemeToggle");
        await page.route("**/components/ThemeToggle", async (route) => {
            const response = await route.fetch();
            const html = (await response.text())
                .replace('<html lang="en">', '<html lang="en" data-theme="auto">')
                .replace("<head>", `<head><script>${themeInitScript(DEMO_KEY)}</script><script>window.__themeAtHead = document.documentElement.getAttribute("data-theme");</script>`);
            await route.fulfill({ response, body: html });
        });
        await page.reload({ waitUntil: "domcontentloaded" });
        expect(await page.evaluate(() => (window as unknown as { __themeAtHead: string }).__themeAtHead)).toBe("dark");
        await expect(three(page)).toHaveAccessibleName("Theme: dark. Switch to system");
    });

    test("on a page switched by the dark class it reads dark, then takes the page over to data-theme", async ({ page }) => {
        await page.goto("/components/ThemeToggle", { waitUntil: "domcontentloaded" });
        const two = page.locator(PREVIEWS).getByRole("button", { name: /Switch to (dark|light) mode/ }).first();
        await two.click();
        await expect(two).toHaveAccessibleName("Switch to light mode");
        const toggle = three(page);
        await expect(toggle).toHaveAccessibleName("Theme: dark. Switch to system");
        expect(await root(page)).toMatchObject({ class: true, attribute: null });

        await toggle.click();
        await expect(toggle).toHaveAccessibleName("Theme: system. Switch to light");
        expect(await root(page)).toMatchObject({ class: false, attribute: "auto" });
        // The two-way button follows, and from here writes the attribute as well.
        await expect(two).toHaveAccessibleName("Switch to dark mode");
        await two.click();
        expect(await root(page)).toMatchObject({ class: false, attribute: "dark" });
        await expect(toggle).toHaveAccessibleName("Theme: dark. Switch to system");
    });
});

test.describe('ThemeToggle with modes="three" before it mounts', () => {
    test.use({ javaScriptEnabled: false, colorScheme: "light" });

    const cases: { name: string; attributes: string; system: "light" | "dark"; shown: string }[] = [
        { name: 'data-theme="auto" on a light system', attributes: 'data-theme="auto"', system: "light", shown: "monitor" },
        { name: 'data-theme="auto" on a dark system', attributes: 'data-theme="auto"', system: "dark", shown: "monitor" },
        { name: 'data-theme="light"', attributes: 'data-theme="light"', system: "dark", shown: "sun" },
        { name: 'data-theme="dark"', attributes: 'data-theme="dark"', system: "light", shown: "moon" },
        { name: "no class and no attribute", attributes: "", system: "dark", shown: "sun" },
        { name: 'class="dark"', attributes: 'class="dark"', system: "light", shown: "moon" },
    ];

    for (const { name, attributes, system, shown } of cases) {
        test(`${name}: the ${shown} is the icon shown`, async ({ page }) => {
            await page.emulateMedia({ colorScheme: system });
            if (attributes) await withRootAttributes(page, attributes);
            await page.goto("/components/ThemeToggle", { waitUntil: "domcontentloaded" });
            const toggle = page.getByTestId("theme-toggle-three").first().getByRole("button");
            await expect(toggle).toBeVisible();
            await expect(toggle).toHaveAccessibleName("Theme toggle");
            await expect(toggle.locator("svg")).toHaveCount(3);
            const visible = await toggle.locator("svg").evaluateAll((icons) =>
                icons
                    .filter((svg) => getComputedStyle(svg).display !== "none")
                    .map((svg) => /lucide-(monitor|sun|moon)/.exec(svg.getAttribute("class") ?? "")?.[1]),
            );
            expect(visible).toEqual([shown]);
        });
    }
});
