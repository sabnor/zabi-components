import { expect, test, type Locator, type Page } from "@playwright/test";
import { gotoChaosLab } from "./helpers/chaos-lab";

/**
 * SortableList in a real browser: the parts jsdom cannot show.
 *
 * jsdom has no layout, no pointer capture, no touch scrolling and does not
 * drop focus when a node moves, so the unit tests stub geometry and cannot
 * prove that a real pointer reorders rows of unequal height, that focus
 * survives the DOM move, or that a touch on the handle leaves the page still.
 */

const order = (page: Page) => page.getByTestId("chaos-sortable-order");
const handle = (page: Page, title: string) =>
    page.getByRole("button", { name: `Reorder ${title}` });
const status = (page: Page) =>
    page.getByTestId("chaos-sortable").getByRole("status");

async function centre(locator: Locator): Promise<{ x: number; y: number }> {
    const box = await locator.boundingBox();
    if (!box) throw new Error("Element has no box; is it visible?");
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

test.describe("SortableList — real pointer, focus and motion", () => {
    test.beforeEach(async ({ page }) => {
        await gotoChaosLab(page);
        await handle(page, "Hero").scrollIntoViewIfNeeded();
        await expect(order(page)).toHaveText("hero,gallery,pricing,faq");
    });

    test("mouse: dragging the handle past two rows of unequal height reorders on release", async ({
        page,
    }) => {
        const from = await centre(handle(page, "Hero"));
        const target = await page
            .getByTestId("chaos-sortable-card-pricing")
            .boundingBox();
        expect(target).toBeTruthy();

        await page.mouse.move(from.x, from.y);
        await page.mouse.down();
        // Bring the dragged row's bottom edge past the centre of "Pricing".
        await page.mouse.move(from.x, target!.y + target!.height, { steps: 12 });

        await expect(
            page.getByRole("listitem").filter({ has: handle(page, "Hero") }),
            "The dragged row is marked while the pointer is down",
        ).toHaveAttribute("data-dragging", "");
        await expect(
            order(page),
            "Nothing is committed until the pointer is released",
        ).toHaveText("hero,gallery,pricing,faq");

        await page.mouse.up();
        await expect(order(page)).toHaveText("gallery,pricing,hero,faq");
        await expect(page.getByTestId("chaos-sortable-last-move")).toHaveText(
            "hero:0>2",
        );
        await expect(status(page)).toHaveText("Hero, moved to position 3 of 4");
        await expect(
            handle(page, "Hero"),
            "Focus stays on the moved item's handle",
        ).toBeFocused();
        await expect(page.locator("[data-dragging]")).toHaveCount(0);
    });

    test("mouse: Escape during a drag restores the order and the release is ignored", async ({
        page,
    }) => {
        const from = await centre(handle(page, "FAQ"));
        const target = await centre(page.getByTestId("chaos-sortable-card-hero"));

        await page.mouse.move(from.x, from.y);
        await page.mouse.down();
        await page.mouse.move(from.x, target.y - 20, { steps: 12 });
        await expect(page.locator("[data-dragging]")).toHaveCount(1);

        await page.keyboard.press("Escape");
        await expect(page.locator("[data-dragging]")).toHaveCount(0);
        await expect(status(page)).toHaveText(
            "FAQ, move cancelled, still at position 4 of 4",
        );

        await page.mouse.up();
        await expect(order(page)).toHaveText("hero,gallery,pricing,faq");
        await expect(page.getByTestId("chaos-sortable-last-move")).toHaveText("");
    });

    test("mouse: a parent that replaces the list mid-drag cancels the drag instead of moving another item", async ({
        page,
    }) => {
        const from = await centre(handle(page, "Hero"));
        const target = await page
            .getByTestId("chaos-sortable-card-gallery")
            .boundingBox();

        await page.mouse.move(from.x, from.y);
        await page.mouse.down();
        await page.mouse.move(from.x, target!.y + target!.height, { steps: 8 });
        await expect(page.locator("[data-dragging]")).toHaveCount(1);

        // The pointer is busy, so the "parent" acts through the DOM.
        await page.evaluate(() =>
            document
                .querySelector<HTMLElement>('[data-testid="chaos-sortable-reverse"]')!
                .click(),
        );
        await expect(order(page)).toHaveText("faq,pricing,gallery,hero");
        await expect(
            page.locator("[data-dragging]"),
            "The drag ends as soon as the order changes under it",
        ).toHaveCount(0);
        await expect(status(page)).toHaveText(
            "Hero, move cancelled, still at position 4 of 4",
        );

        await page.mouse.up();
        await expect(order(page)).toHaveText("faq,pricing,gallery,hero");
        await expect(
            page.getByTestId("chaos-sortable-last-move"),
            "Releasing must not move whichever item now sits at the old index",
        ).toHaveText("");
    });

    test("accessibility tree: the handle keeps its description from a hidden element, which is not read on its own", async ({
        page,
    }) => {
        const description =
            "Arrow keys move this item. Home and End move it to the start or the end.";
        await expect(handle(page, "Hero")).toHaveAccessibleDescription(description);

        // Chromium's own computation, not Playwright's.
        const client = await page.context().newCDPSession(page);
        await client.send("Accessibility.enable");
        const { nodes } = await client.send("Accessibility.getFullAXTree");
        const exposed = nodes.filter((node) => !node.ignored);
        const grip = exposed.find(
            (node) =>
                node.role?.value === "button" && node.name?.value === "Reorder Hero",
        );
        expect(grip, "The handle is a named button in the tree").toBeTruthy();
        expect(grip!.description?.value).toBe(description);
        expect(
            exposed.filter((node) => node.name?.value === description),
            "The description must not also appear as loose text after the list",
        ).toHaveLength(0);
    });

    test("keyboard: arrows, Home and End move the item, keep focus and do not scroll the page", async ({
        page,
    }) => {
        const grip = handle(page, "Gallery");
        await grip.focus();
        const scrollBefore = await page.evaluate(() => window.scrollY);

        await page.keyboard.press("ArrowDown");
        await expect(order(page)).toHaveText("hero,pricing,gallery,faq");
        await expect(
            grip,
            "A moved DOM node loses focus in a browser; the list must put it back",
        ).toBeFocused();
        await expect(status(page)).toHaveText(
            "Gallery, moved to position 3 of 4",
        );

        await page.keyboard.press("ArrowUp");
        await page.keyboard.press("ArrowUp");
        await expect(order(page)).toHaveText("gallery,hero,pricing,faq");
        await expect(grip).toBeFocused();

        await page.keyboard.press("End");
        await expect(order(page)).toHaveText("hero,pricing,faq,gallery");
        await expect(grip).toBeFocused();

        await page.keyboard.press("Home");
        await expect(order(page)).toHaveText("gallery,hero,pricing,faq");
        await expect(grip).toBeFocused();

        // Already first: the key says so instead of doing nothing silently.
        await page.keyboard.press("ArrowUp");
        await expect(status(page)).toHaveText("Gallery, already first");
        await expect(order(page)).toHaveText("gallery,hero,pricing,faq");

        expect(
            await page.evaluate(() => window.scrollY),
            "Arrow, Home and End on the handle must not scroll the page",
        ).toBe(scrollBefore);
    });

    test("move buttons: focus moves to the other button when one reaches an end", async ({
        page,
    }) => {
        const up = page.getByRole("button", { name: "Move Gallery up" });
        await up.click();
        await expect(order(page)).toHaveText("gallery,hero,pricing,faq");
        await expect(up).toBeDisabled();
        await expect(
            page.getByRole("button", { name: "Move Gallery down" }),
        ).toBeFocused();
    });

    test("motion: a move animates, and does not under prefers-reduced-motion", async ({
        page,
    }) => {
        const running = () =>
            page.evaluate(
                () =>
                    document
                        .querySelector('[data-testid="chaos-sortable"]')!
                        .getAnimations({ subtree: true })
                        .filter((animation) => animation.effect?.target?.nodeName === "LI")
                        .length,
            );

        await handle(page, "Hero").focus();
        await page.keyboard.press("ArrowDown");
        await expect(order(page)).toHaveText("gallery,hero,pricing,faq");
        expect(
            await running(),
            "Without the preference, the two rows that swapped slide into place",
        ).toBeGreaterThan(0);

        // Let the first move's animations finish, so any that remain are new.
        await expect.poll(running).toBe(0);

        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.keyboard.press("ArrowUp");
        await expect(order(page)).toHaveText("hero,gallery,pricing,faq");
        expect(await running()).toBe(0);
    });

    test("auto-scroll: holding a drag at the viewport edge scrolls the page", async ({
        page,
    }) => {
        // A short viewport with the last row near its bottom edge, so there
        // is page above the list to scroll into.
        await page.setViewportSize({ width: 1280, height: 400 });
        await page.evaluate(() => {
            const grip = document.querySelector('[aria-label="Reorder FAQ"]')!;
            window.scrollBy(0, grip.getBoundingClientRect().top - 300);
        });
        const from = await centre(handle(page, "FAQ"));
        const scrollBefore = await page.evaluate(() => window.scrollY);
        expect(scrollBefore).toBeGreaterThan(0);

        await page.mouse.move(from.x, from.y);
        await page.mouse.down();
        await page.mouse.move(from.x, 10, { steps: 8 });
        await expect
            .poll(() => page.evaluate(() => window.scrollY), {
                message: "The page should scroll while the pointer rests at the top edge",
            })
            .toBeLessThan(scrollBefore - 100);

        await page.keyboard.press("Escape");
        await page.mouse.up();
        await expect(order(page)).toHaveText("hero,gallery,pricing,faq");
    });
});

test.describe("SortableList — touch", () => {
    test.use({ hasTouch: true });

    test("touch: dragging the handle reorders and does not scroll the page", async ({
        page,
    }) => {
        await gotoChaosLab(page);
        await handle(page, "Hero").scrollIntoViewIfNeeded();
        expect(
            await page.evaluate(
                () =>
                    document.documentElement.scrollHeight > window.innerHeight,
            ),
            "The page must be scrollable, or this test proves nothing",
        ).toBe(true);

        const from = await centre(handle(page, "Hero"));
        const target = await page
            .getByTestId("chaos-sortable-card-gallery")
            .boundingBox();
        const endY = target!.y + target!.height;
        const scrollBefore = await page.evaluate(() => window.scrollY);

        // Real touch input through the browser's input pipeline, so Chrome
        // decides for itself whether the gesture scrolls.
        const client = await page.context().newCDPSession(page);
        const point = (y: number) => [{ x: from.x, y, id: 1 }];
        await client.send("Input.dispatchTouchEvent", {
            type: "touchStart",
            touchPoints: point(from.y),
        });
        const steps = 10;
        for (let step = 1; step <= steps; step += 1) {
            await client.send("Input.dispatchTouchEvent", {
                type: "touchMove",
                touchPoints: point(from.y + ((endY - from.y) * step) / steps),
            });
        }
        await expect(page.locator("[data-dragging]")).toHaveCount(1);
        await client.send("Input.dispatchTouchEvent", {
            type: "touchEnd",
            touchPoints: [],
        });

        await expect(order(page)).toHaveText("gallery,hero,pricing,faq");
        expect(
            await page.evaluate(() => window.scrollY),
            "touch-action: none on the handle keeps the page from scrolling",
        ).toBe(scrollBefore);
    });

    test("touch: the same swipe on a row's content scrolls the page and reorders nothing", async ({
        page,
    }) => {
        await gotoChaosLab(page);
        await handle(page, "Hero").scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.getByTestId("chaos-sortable-card-faq").scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollBy(0, -80));
        const from = await centre(page.getByTestId("chaos-sortable-card-faq"));
        const scrollBefore = await page.evaluate(() => window.scrollY);

        const client = await page.context().newCDPSession(page);
        const point = (y: number) => [{ x: from.x, y, id: 1 }];
        await client.send("Input.dispatchTouchEvent", {
            type: "touchStart",
            touchPoints: point(from.y),
        });
        for (let step = 1; step <= 10; step += 1) {
            await client.send("Input.dispatchTouchEvent", {
                type: "touchMove",
                touchPoints: point(from.y + step * 8),
            });
        }
        await client.send("Input.dispatchTouchEvent", {
            type: "touchEnd",
            touchPoints: [],
        });

        await expect
            .poll(() => page.evaluate(() => window.scrollY), {
                message: "Only the handle is a drag surface; the row itself must still scroll",
            })
            .toBeLessThan(scrollBefore);
        await expect(order(page)).toHaveText("hero,gallery,pricing,faq");
    });
});
