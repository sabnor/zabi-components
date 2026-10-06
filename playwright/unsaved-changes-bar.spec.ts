import { expect, test, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * UnsavedChangesBar in a real browser: the parts jsdom cannot show.
 *
 * Sticky positioning needs layout, so only a browser can show that the bar
 * stays in view while the form scrolls and that the last field can still be
 * scrolled clear of it on a phone. And only a real browser drops focus when
 * the focused button is disabled or removed.
 */

const scroller = (page: Page) => page.getByTestId("unsaved-demo-scroller");
const bar = (page: Page) => page.getByTestId("unsaved-demo-bar");
const nameField = (page: Page) => scroller(page).getByLabel("Name");
const bio = (page: Page) => scroller(page).getByLabel("Bio");

/** The page is usable before it hydrates; typing that lands early changes nothing. */
/**
 * Holds the page's clock from here on; `page.clock.runFor` moves it.
 *
 * The demo's save takes 800ms. A test that looks at the bar while it is
 * saving had those 800ms to get there, and on a busy machine did not: the
 * save was over, and Save was enabled again or gone with the bar. With the
 * clock held the save is over when the test has looked.
 */
async function holdClock(page: Page): Promise<void> {
    await page.clock.install();
    await page.clock.pauseAt(Date.now() + 60_000);
}

async function gotoHydrated(page: Page) {
    await page.goto("/components/UnsavedChangesBar", { waitUntil: "domcontentloaded" });
    await waitForHydration(page);
    await nameField(page).fill("Ada L");
    await expect(bar(page).getByRole("button", { name: "Save" })).toBeVisible();
    await nameField(page).fill("Ada Lovelace");
    await expect(bar(page).getByRole("button", { name: "Save" })).toHaveCount(0);
}

test.describe("UnsavedChangesBar — sticky layout and focus", () => {
    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page);
    });

    test("appears without taking focus, as a named region with a status", async ({ page }) => {
        await expect(page.getByRole("region", { name: "Unsaved changes" })).toHaveCount(0);
        await nameField(page).focus();
        await page.keyboard.type("!");

        const region = page.getByRole("region", { name: "Unsaved changes" });
        await expect(region).toBeVisible();
        await expect(region.getByRole("status")).toHaveText("You have unsaved changes");
        await expect(nameField(page), "Typing continues in the field").toBeFocused();
        expect(
            await bar(page).evaluate((el) => getComputedStyle(el).position),
            "Sticky, so it keeps its place in the flow",
        ).toBe("sticky");
    });

    test("phone: the bar stays in view while the form scrolls, and the last field clears it", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 360, height: 740 });
        await scroller(page).scrollIntoViewIfNeeded();
        await nameField(page).fill("Ada L");
        await expect(bar(page)).toBeVisible();

        const inView = async () => {
            const [outer, inner] = await Promise.all([
                scroller(page).boundingBox(),
                bar(page).boundingBox(),
            ]);
            return (
                inner!.y >= outer!.y - 1 &&
                inner!.y + inner!.height <= outer!.y + outer!.height + 1
            );
        };

        // Scrolled to the top: the bar is stuck to the bottom edge, over the form.
        await scroller(page).evaluate((el) => (el.scrollTop = 0));
        expect(await inView(), "Stuck in view at the top of the form").toBe(true);
        expect(
            await scroller(page).evaluate((el) => el.scrollHeight > el.clientHeight),
            "The form must scroll, or this proves nothing",
        ).toBe(true);
        expect(
            await scroller(page).evaluate((el) => el.scrollWidth <= el.clientWidth),
            "The bar must not make the form scroll sideways",
        ).toBe(true);

        // Focus the last field, then scroll to the end: it sits wholly above the bar.
        await bio(page).focus();
        await scroller(page).evaluate((el) => (el.scrollTop = el.scrollHeight));
        expect(await inView()).toBe(true);
        const field = (await bio(page).boundingBox())!;
        const stuck = (await bar(page).boundingBox())!;
        expect(
            field.y + field.height,
            "The last field can be scrolled clear of the bar",
        ).toBeLessThanOrEqual(stuck.y);
        await expect(bio(page)).toBeFocused();

        // Both buttons fit on a phone and meet the touch target size.
        for (const name of ["Save", "Discard"]) {
            const button = (await bar(page).getByRole("button", { name }).boundingBox())!;
            expect(button.height).toBeGreaterThanOrEqual(40);
            expect(button.x + button.width).toBeLessThanOrEqual(360);
        }
    });

    test("saving: focus is held on the bar while the buttons are disabled, then returns to the field", async ({
        page,
    }) => {
        await nameField(page).focus();
        await page.keyboard.type("!");
        await page.keyboard.press("Tab");
        // Email, Company, City, Bio, then the bar's Discard and Save.
        const save = bar(page).getByRole("button", { name: "Save" });
        await save.focus();
        await holdClock(page);
        await page.keyboard.press("Enter");

        await expect(save).toBeDisabled();
        await expect(save).toHaveAttribute("aria-busy", "true");
        await expect(bar(page).getByRole("button", { name: "Discard" })).toBeDisabled();
        await expect(
            bar(page),
            "The bar holds focus while it saves, instead of <body>",
        ).toBeFocused();
        await page.clock.runFor(800);

        await expect(page.getByTestId("unsaved-demo-outcome")).toHaveText(
            "Saved Ada Lovelace!.",
        );
        await expect(save).toHaveCount(0);
        expect(
            await page.evaluate(() => document.activeElement === document.body),
            "Focus must not fall to <body> when the bar goes",
        ).toBe(false);
    });

    test("discard: the bar goes and focus returns to the field it came from", async ({ page }) => {
        await nameField(page).click();
        await page.keyboard.type("!");
        // A click moves focus from the field straight to the button.
        await bar(page).getByRole("button", { name: "Discard" }).click();

        await expect(bar(page).getByRole("button", { name: "Save" })).toHaveCount(0);
        await expect(nameField(page)).toHaveValue("Ada Lovelace");
        await expect(nameField(page)).toBeFocused();
    });

    test("a failed save keeps the bar, reports the error and gives focus back to the save button", async ({
        page,
    }) => {
        const title = page.getByLabel("Page title");
        await title.scrollIntoViewIfNeeded();
        await title.fill("Spring launch 2");
        const region = page.getByRole("region", { name: "Unsaved changes" });
        await expect(region).toBeVisible();
        expect(await region.getAttribute("data-position")).toBe("top");

        const publish = region.getByRole("button", { name: "Publish" });
        await publish.focus();
        await holdClock(page);
        await page.keyboard.press("Enter");
        await expect(publish).toBeDisabled();
        await expect(page.getByText("The page is locked by another editor.")).toHaveCount(0);
        await page.clock.runFor(800);
        await expect(page.getByText("The page is locked by another editor.")).toBeVisible();
        await expect(region).toBeVisible();
        await expect(publish).toBeEnabled();
        await expect(publish).toBeFocused();
    });
});
