import { expect, test, type Locator, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * NavigationMenu at phone widths, on its docs page.
 *
 * Two findings of the menu review: the list of triggers ran out of its
 * container instead of wrapping, and a panel opened from its trigger's left
 * edge whatever was left of the screen, so the second trigger's panel reached
 * 7px past a 375px viewport.
 */

const PREVIEWS = "main .min-h-\\[100px\\]";
const MARGIN = 8;

async function gotoPage(page: Page) {
    await page.goto("/components/NavigationMenu", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();
}

const lists = (page: Page) => page.locator(PREVIEWS).locator("[data-navigation-menu-list]");
const trigger = (page: Page, name: string) =>
    page.locator(PREVIEWS).locator("[data-navigation-menu-trigger]", { hasText: name }).first();

/** The page is usable before it hydrates, and a second click would close the panel again. */
async function openPanel(page: Page, name: string): Promise<Locator> {
    const button = trigger(page, name);
    await button.scrollIntoViewIfNeeded();
    const panel = button.locator("xpath=..").locator("[data-navigation-menu-content]");
    await waitForHydration(page);
    if ((await button.getAttribute("aria-expanded")) !== "true") await button.click();
    await expect(panel).toBeVisible();
    return panel;
}

const rect = (locator: Locator) =>
    locator.evaluate((element) => {
        const { left, right, top, bottom, width } = element.getBoundingClientRect();
        return { left, right, top, bottom, width };
    });

for (const width of [375, 320]) {
    test.describe(`NavigationMenu at ${width}px`, () => {
        test.use({ viewport: { width, height: 667 }, hasTouch: true, isMobile: true });

        test("finding 13: the list wraps onto further rows and stays inside its container", async ({
            page,
        }) => {
            await gotoPage(page);
            const measured = await lists(page).evaluateAll((elements) =>
                elements.map((list) => {
                    const box = list.getBoundingClientRect();
                    const items = [...list.children].map((item) => item.getBoundingClientRect());
                    return {
                        overflow: list.scrollWidth - list.clientWidth,
                        outside: items.filter(
                            (item) => item.right > box.right + 0.5 || item.left < box.left - 0.5,
                        ).length,
                        rows: new Set(items.map((item) => Math.round(item.top))).size,
                        items: items.length,
                    };
                }),
            );
            expect(measured.length).toBeGreaterThanOrEqual(2);
            for (const list of measured) {
                expect(list.overflow).toBeLessThanOrEqual(0);
                expect(list.outside).toBe(0);
            }
            // At these widths at least one of them needs a second row.
            expect(measured.some((list) => list.rows > 1)).toBe(true);
            expect(
                await page.evaluate(
                    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
                ),
            ).toBe(0);
        });

        test("finding 14: a panel is kept inside the screen, 8px from each side", async ({ page }) => {
            await gotoPage(page);
            for (const name of ["Home", "Components", "Status"]) {
                const panel = await openPanel(page, name);
                const box = await rect(panel);
                const screen = await page.evaluate(() => document.documentElement.clientWidth);
                expect(box.left, name).toBeGreaterThanOrEqual(MARGIN - 0.5);
                expect(box.right, name).toBeLessThanOrEqual(screen - MARGIN + 0.5);
                expect(box.width, name).toBeLessThanOrEqual(screen - MARGIN * 2 + 0.5);
                // Still directly under its trigger.
                const button = await rect(trigger(page, name));
                expect(box.top, name).toBeCloseTo(button.bottom + 8, 0);
                // The trigger toggles its panel.
                await trigger(page, name).click();
                await expect(panel).toHaveCount(0);
            }
            expect(
                await page.evaluate(
                    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
                ),
            ).toBe(0);
        });

        test("Escape in a panel that was moved still closes it and returns focus to its trigger", async ({
            page,
        }) => {
            await gotoPage(page);
            const panel = await openPanel(page, "Components");
            await panel.getByRole("link").first().focus();
            await page.keyboard.press("Escape");
            await expect(panel).toHaveCount(0);
            await expect(trigger(page, "Components")).toBeFocused();
        });
    });
}

test.describe("NavigationMenu on a desktop screen", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("a list that fits is one row, and a panel opens from its trigger's left edge as before", async ({
        page,
    }) => {
        await gotoPage(page);
        const rows = await lists(page).evaluateAll((elements) =>
            elements.map(
                (list) =>
                    new Set([...list.children].map((item) => Math.round(item.getBoundingClientRect().top)))
                        .size,
            ),
        );
        for (const count of rows) expect(count).toBe(1);

        const panel = await openPanel(page, "Components");
        const box = await rect(panel);
        const item = await rect(trigger(page, "Components").locator("xpath=.."));
        expect(box.left).toBeCloseTo(item.left, 0);
        expect(box.top).toBeCloseTo(item.bottom + 8, 0);
        // No inline position or width limit when it fits.
        expect((await panel.getAttribute("style")) ?? "").toBe("");
    });
});
