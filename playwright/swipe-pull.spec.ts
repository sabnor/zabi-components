import { expect, test } from "@playwright/test";
import { gotoHydrated } from "./helpers/hydration";
import { touchDrag } from "./helpers/touch";

/**
 * The two gestures that cannot be made in a test DOM: a sideways swipe on a
 * SwipeableListItem and a pull on a PullToRefresh, with a finger through the
 * DevTools protocol. What a keyboard does is in tests/swipe-pull.test.ts.
 */

test.use({ viewport: { width: 375, height: 800 }, hasTouch: true });

test("a swipe towards the start shows a row's actions, a swipe back hides them, and a vertical move opens nothing", async ({
    page,
}) => {
    await gotoHydrated(page, "/components/SwipeableListItem");
    const rows = page.locator("[data-swipeable-list-item]");
    const first = rows.nth(0);
    await first.scrollIntoViewIfNeeded();
    const box = (await first.boundingBox())!;
    const y = box.y + box.height / 2;

    // Up and down over the row is the browser's, to scroll with: the row leaves it alone and stays shut.
    expect(await first.locator("> div").evaluate((el) => getComputedStyle(el).touchAction)).toBe("pan-y");
    await touchDrag(page, { x: box.x + 100, y }, { x: box.x + 104, y: y - 120 });
    await expect(first).toHaveAttribute("data-open", "false");

    const now = (await first.boundingBox())!;
    const line = now.y + now.height / 2;
    await touchDrag(page, { x: now.x + 220, y: line }, { x: now.x + 60, y: line });
    await expect(first).toHaveAttribute("data-open", "true");
    const remove = first.getByRole("button", { name: "Delete" });
    await expect(remove).toBeVisible();
    // The actions are inside the row, at its end.
    await expect
        .poll(async () => {
            const button = (await remove.boundingBox())!;
            const outer = (await first.boundingBox())!;
            return Math.round(button.x + button.width) <= Math.round(outer.x + outer.width) + 1;
        })
        .toBe(true);

    // Opening another row closes this one.
    const second = rows.nth(1);
    const next = (await second.boundingBox())!;
    await touchDrag(
        page,
        { x: next.x + 220, y: next.y + next.height / 2 },
        { x: next.x + 60, y: next.y + next.height / 2 },
    );
    await expect(second).toHaveAttribute("data-open", "true");
    await expect(first).toHaveAttribute("data-open", "false");

    // And back towards the end closes it.
    await touchDrag(
        page,
        { x: next.x + 60, y: next.y + next.height / 2 },
        { x: next.x + 220, y: next.y + next.height / 2 },
    );
    await expect(second).toHaveAttribute("data-open", "false");
});

test("a pull from the top refreshes the list; a short pull and a pull from further down do not", async ({ page }) => {
    await gotoHydrated(page, "/components/PullToRefresh");
    const scroller = page.getByTestId("pull-scroller");
    await scroller.scrollIntoViewIfNeeded();
    const region = scroller.locator("[data-pull-to-refresh]");
    const loads = page.getByTestId("pull-loads");
    const box = (await scroller.boundingBox())!;
    const x = box.x + box.width / 2;

    // 60px of finger is 30px of indicator: short of the 64px threshold.
    await touchDrag(page, { x, y: box.y + 40 }, { x, y: box.y + 100 });
    await expect(region).toHaveAttribute("data-refreshing", "false");
    await expect(loads).toHaveText("Reloaded 0 times.");

    // Far enough.
    await touchDrag(page, { x, y: box.y + 30 }, { x, y: box.y + 230 });
    await expect(region).toHaveAttribute("aria-busy", "true");
    await expect(region.locator("[data-pull-status]")).toHaveText("Refreshing");
    await expect(loads).toHaveText("Reloaded 1 times.");
    await expect(region.locator("[data-pull-status]")).toHaveText("Updated");
    await expect(region).not.toHaveAttribute("aria-busy", "true");

    // Scrolled down, the same move scrolls the list back and refreshes nothing.
    await scroller.evaluate((el) => (el.scrollTop = 150));
    await touchDrag(page, { x, y: box.y + 30 }, { x, y: box.y + 230 });
    await expect(region).toHaveAttribute("data-refreshing", "false");
    await expect(loads).toHaveText("Reloaded 1 times.");
});
