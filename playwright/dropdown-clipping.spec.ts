import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * A menu inside something that clips.
 *
 * Keeping a menu inside the viewport is not enough when it opens inside a box
 * that scrolls: the box cuts off whatever reaches past its edge. In a short
 * Modal, and in a 160px scrolling box, a Dropdown showed none of its four
 * items. The nearest clipping ancestor now decides which side the menu opens
 * on, and when it fits on neither side the menu is positioned against the
 * viewport (`position: fixed`), which a scrolling ancestor does not clip. It
 * stays where it is in the DOM, so the keyboard, focus and the dialog's focus
 * trap are as they were.
 *
 * What "visible" means here: the centre of each item is hit-tested, so an item
 * that is cut off or covered does not count.
 */

const LAB = "/chaos-lab/dropdown";

async function gotoLab(page: Page) {
    await page.goto(LAB, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
}

const host = (page: Page, id: string) => page.getByTestId(`lab-${id}`);
const trigger = (page: Page, id: string) => host(page, id).getByRole("button").first();
const popup = (page: Page, id: string) => host(page, id).getByRole("menu").locator("xpath=..");

/** How many of `items` can be seen and pressed: their centre lands on them. */
const visibleCount = (items: Locator) =>
    items.evaluateAll((elements) =>
        elements.filter((element) => {
            const box = element.getBoundingClientRect();
            if (box.width === 0 || box.height === 0) return false;
            const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
            return !!hit && (hit === element || element.contains(hit));
        }).length,
    );

const rect = (locator: Locator) =>
    locator.evaluate((element) => {
        const { left, right, top, bottom, width, height } = element.getBoundingClientRect();
        return { left, right, top, bottom, width, height };
    });

test.describe("Dropdown inside a clipping ancestor", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("in a 160px scrolling box, every item of the menu can be seen and pressed", async ({ page }) => {
        await gotoLab(page);
        await trigger(page, "in-scroller").scrollIntoViewIfNeeded();
        const scrollable = () => page.getByTestId("lab-scroller").evaluate((element) => element.scrollHeight);
        const before = await scrollable();
        await trigger(page, "in-scroller").click();
        const items = host(page, "in-scroller").getByRole("menuitem");
        await expect(items).toHaveCount(4);
        expect(await visibleCount(items)).toBe(4);

        // It left the box to do so, and is still attached to its trigger.
        const panel = await rect(popup(page, "in-scroller"));
        const box = await rect(page.getByTestId("lab-scroller"));
        const button = await rect(trigger(page, "in-scroller"));
        expect(panel.bottom).toBeGreaterThan(box.bottom);
        expect(panel.left).toBeCloseTo(button.left, 0);
        expect(panel.top).toBeCloseTo(button.bottom + 8, 0);
        expect(await popup(page, "in-scroller").evaluate((element) => getComputedStyle(element).position)).toBe(
            "fixed",
        );
        // The box did not grow a scrollbar for it.
        expect(await scrollable()).toBe(before);
    });

    test("a trigger scrolled out of the box takes its menu with it", async ({ page }) => {
        // A menu left floating over the page with nothing to show what it belongs to
        // would be worse than one that is cut off together with its trigger.
        await gotoLab(page);
        await trigger(page, "in-scroller").scrollIntoViewIfNeeded();
        await trigger(page, "in-scroller").click();
        const items = host(page, "in-scroller").getByRole("menuitem");
        await expect(items).toHaveCount(4);
        await page.getByTestId("lab-scroller").evaluate((element) => element.scrollBy(0, 200));
        await expect
            .poll(() => popup(page, "in-scroller").evaluate((element) => getComputedStyle(element).position))
            .toBe("absolute");
        // Cut where the box ends, like the trigger above it.
        expect(await visibleCount(items)).toBeLessThan(4);
        // Back in view, it is whole again.
        await page.getByTestId("lab-scroller").evaluate((element) => element.scrollTo(0, 0));
        await expect.poll(() => visibleCount(items)).toBe(4);
    });

    test("it follows its trigger when the box scrolls, and the keyboard and focus are as they were", async ({
        page,
    }) => {
        await gotoLab(page);
        await trigger(page, "in-scroller").scrollIntoViewIfNeeded();
        await trigger(page, "in-scroller").focus();
        await page.keyboard.press("ArrowDown");
        const items = host(page, "in-scroller").getByRole("menuitem");
        await expect(items.nth(0)).toBeFocused();
        await page.keyboard.press("ArrowDown");
        await expect(items.nth(1)).toBeFocused();
        await page.keyboard.press("End");
        await expect(items.nth(3)).toBeFocused();

        await page.getByTestId("lab-scroller").evaluate((element) => element.scrollBy(0, 20));
        await expect
            .poll(async () => {
                const panel = await rect(popup(page, "in-scroller"));
                const button = await rect(trigger(page, "in-scroller"));
                return Math.round(panel.top - button.bottom);
            })
            .toBe(8);

        await page.keyboard.press("Escape");
        await expect(popup(page, "in-scroller")).toHaveCount(0);
        await expect(trigger(page, "in-scroller")).toBeFocused();
    });

    test("in a short Modal, every item can be seen, and the dialog still holds focus", async ({ page }) => {
        await gotoLab(page);
        await page.getByTestId("lab-open-modal").click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        await page.waitForTimeout(400);
        const open = dialog.getByRole("button", { name: "In a dialog" });
        await open.click();
        const items = dialog.getByRole("menuitem");
        await expect(items).toHaveCount(4);
        expect(await visibleCount(items)).toBe(4);

        // The menu reaches past the dialog's edge and is not cut there.
        const panel = await rect(dialog.getByRole("menu").locator("xpath=.."));
        const box = await rect(dialog);
        expect(panel.bottom).toBeGreaterThan(box.bottom);

        // Still the dialog's own content: Tab stays inside, Escape closes the menu first.
        await page.keyboard.press("ArrowDown");
        await expect(items.first()).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(dialog.getByRole("menu")).toHaveCount(0);
        await expect(open).toBeFocused();
        await expect(dialog).toBeVisible();
    });

    test("Select's list in a scrolling box: its options can be seen and chosen", async ({ page }) => {
        await gotoLab(page);
        const box = page.getByTestId("lab-select-scroller");
        await box.scrollIntoViewIfNeeded();
        await box.locator('button[aria-haspopup="listbox"]').click();
        const options = box.getByRole("option");
        await expect(options).toHaveCount(6);
        expect(await visibleCount(options)).toBe(6);
        await options.nth(2).click();
        await expect(box.locator('button[aria-haspopup="listbox"]')).toContainText("Team 3");
    });

    test("NavigationMenu's panel in a box that scrolls sideways is not cut off", async ({ page }) => {
        await gotoLab(page);
        const box = page.getByTestId("lab-nav-scroller");
        await box.scrollIntoViewIfNeeded();
        await box.locator("[data-navigation-menu-trigger]").click();
        const links = box.locator("[data-navigation-menu-content] a");
        await expect(links).toHaveCount(3);
        expect(await visibleCount(links)).toBe(3);
        // Escape still closes it and returns focus to its trigger.
        await links.first().focus();
        await page.keyboard.press("Escape");
        await expect(box.locator("[data-navigation-menu-content]")).toHaveCount(0);
        await expect(box.locator("[data-navigation-menu-trigger]")).toBeFocused();
    });

    test("where it cannot leave the box, it opens on the side with more room", async ({ page }) => {
        // A transformed ancestor is the containing block of a fixed element: no way out.
        await gotoLab(page);
        await trigger(page, "in-transformed").scrollIntoViewIfNeeded();
        await trigger(page, "in-transformed").click();
        const panel = popup(page, "in-transformed");
        await expect(panel).toBeVisible();
        expect(await panel.evaluate((element) => getComputedStyle(element).position)).toBe("absolute");
        // Below the trigger there are about 30px, above it about 80: it opens upwards.
        await expect(panel).toHaveAttribute("data-resolved-placement", "top-start");
        // Its size is still limited by the screen only, never by the box.
        expect(await panel.evaluate((element) => element.style.maxHeight)).toBe("");
    });

    test("a menu with room where it is stays as it was: absolute, on its side, no inline style", async ({
        page,
    }) => {
        await gotoLab(page);
        await trigger(page, "start-fits").click();
        const panel = popup(page, "start-fits");
        await expect(panel).toHaveAttribute("data-resolved-placement", "bottom-start");
        expect(await panel.evaluate((element) => getComputedStyle(element).position)).toBe("absolute");
        expect((await panel.getAttribute("style")) ?? "").toBe("");
    });
});

test.describe("Dropdown inside a clipping ancestor, on a phone", () => {
    test.use({ viewport: { width: 375, height: 667 }, hasTouch: true, isMobile: true });

    test("the scrolling box does not hide the menu, and the menu stays on screen", async ({ page }) => {
        await gotoLab(page);
        await trigger(page, "in-scroller").scrollIntoViewIfNeeded();
        await trigger(page, "in-scroller").tap();
        const items = host(page, "in-scroller").getByRole("menuitem");
        await expect(items).toHaveCount(4);
        expect(await visibleCount(items)).toBe(4);
        const panel = await rect(popup(page, "in-scroller"));
        expect(panel.left).toBeGreaterThanOrEqual(7.5);
        expect(panel.right).toBeLessThanOrEqual(375 - 7.5);
        expect(
            await page.evaluate(
                () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
            ),
        ).toBe(0);
    });
});
