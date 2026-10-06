import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * The "More actions" menu of a PhotoViewer with five actions: two are
 * buttons, three are in a Dropdown inside the full-screen dialog, which clips
 * what leaves it. The menu has to open wholly on the screen and unclipped,
 * take the arrow keys, and close on Escape without closing the viewer.
 *
 * The fixture is the viewer on /phone-lab.
 */

async function gotoLab(page: Page) {
    await page.goto("/phone-lab", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("phone-lab-hydrated")).toBeAttached({ timeout: 30_000 });
}

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

const viewer = (page: Page) => page.getByRole("dialog", { name: "Photo viewer" });
const more = (page: Page) => viewer(page).getByRole("button", { name: "More actions", exact: true });
const menu = (page: Page) => viewer(page).getByRole("menu", { name: "More actions" });

for (const viewport of [
    { width: 375, height: 740 },
    { width: 1280, height: 800 },
]) {
    test.describe(`PhotoViewer with five actions, ${viewport.width}x${viewport.height}`, () => {
        test.use({ viewport });

        test.beforeEach(async ({ page }) => {
            await gotoLab(page);
            await page.getByTestId("viewer-open").click();
            await expect(viewer(page)).toBeVisible();
            await expect.poll(() => viewer(page).evaluate((el) => el.getAnimations().length)).toBe(0);
        });

        test("two actions are buttons, the other three are in the menu", async ({ page }) => {
            await expect(viewer(page).getByRole("button", { name: "Share", exact: true })).toBeVisible();
            await expect(viewer(page).getByRole("button", { name: "Set as cover", exact: true })).toBeVisible();
            await more(page).click();
            await expect(menu(page).getByRole("menuitem")).toHaveText(["Download", "Move", "Delete"]);
        });

        test("the menu opens wholly on the screen, and none of it is clipped", async ({ page }) => {
            await more(page).click();
            await expect(menu(page)).toBeVisible();
            await expect.poll(() => menu(page).evaluate((el) => el.getAnimations().length)).toBe(0);
            const panel = await box(menu(page));
            expect(panel.x).toBeGreaterThanOrEqual(0);
            expect(panel.y).toBeGreaterThanOrEqual(0);
            expect(panel.x + panel.width).toBeLessThanOrEqual(viewport.width);
            expect(panel.y + panel.height).toBeLessThanOrEqual(viewport.height);
            // Clear of its own button.
            const trigger = await box(more(page));
            const apart =
                panel.y + panel.height <= trigger.y + 1 ||
                panel.y >= trigger.y + trigger.height - 1 ||
                panel.x + panel.width <= trigger.x + 1 ||
                panel.x >= trigger.x + trigger.width - 1;
            expect(apart, "The menu does not lie over its button").toBe(true);

            // Unclipped: a press 4px inside each corner lands in the menu.
            const corners = await menu(page).evaluate((el) => {
                const rect = el.getBoundingClientRect();
                return [
                    [rect.left + 4, rect.top + 4],
                    [rect.right - 4, rect.top + 4],
                    [rect.left + 4, rect.bottom - 4],
                    [rect.right - 4, rect.bottom - 4],
                ].map(([x, y]) => {
                    const hit = document.elementFromPoint(x, y);
                    return hit === el || el.contains(hit);
                });
            });
            expect(corners, "Top left, top right, bottom left, bottom right").toEqual([true, true, true, true]);
        });

        test("arrow keys move in the menu; Escape closes the menu, then the viewer", async ({ page }) => {
            await more(page).focus();
            await page.keyboard.press("Enter");
            await expect(menu(page)).toBeVisible();
            const items = menu(page).getByRole("menuitem");
            await expect(items.nth(0)).toBeFocused();
            await page.keyboard.press("ArrowDown");
            await expect(items.nth(1)).toBeFocused();
            await page.keyboard.press("ArrowDown");
            await expect(items.nth(2)).toBeFocused();
            await page.keyboard.press("ArrowUp");
            await expect(items.nth(1)).toBeFocused();
            await page.keyboard.press("End");
            await expect(items.nth(2)).toBeFocused();
            await page.keyboard.press("Home");
            await expect(items.nth(0)).toBeFocused();

            await page.keyboard.press("Escape");
            await expect(menu(page)).toHaveCount(0);
            await expect(viewer(page), "Only the menu closed").toBeVisible();
            await expect(more(page), "Focus is back on its button").toBeFocused();

            await page.keyboard.press("Escape");
            await expect(viewer(page)).toHaveCount(0);
            await expect(page.getByTestId("viewer-open")).toBeFocused();
        });

        test("an item of the menu acts, and the viewer stays", async ({ page }) => {
            await more(page).click();
            await menu(page).getByRole("menuitem", { name: "Move" }).click();
            await expect(page.getByTestId("viewer-note")).toHaveText("Viewer: Move");
            await expect(menu(page)).toHaveCount(0);
            await expect(viewer(page)).toBeVisible();
        });
    });
}
