import { expect, test, type Locator, type Page } from "@playwright/test";

import { touchDrag, touchPinch, touchTap } from "./helpers/touch";

/**
 * PhotoGrid and PhotoViewer under a finger: the parts jsdom cannot show.
 *
 * The viewer is its gestures. Only a browser delivers two fingers, decides
 * whether a touch scrolls the page or belongs to the viewer, lays a photo out
 * to fit a screen, and paints what is black and what shows through. The
 * touches here are real touch input, sent through the DevTools protocol.
 *
 * The photos are drawn as SVG in data URLs: nothing is fetched.
 */

const PHONE = { width: 375, height: 740 };

const demo = (page: Page) => page.getByTestId("photo-viewer-demo");
const viewer = (page: Page) => page.getByRole("dialog", { name: "Photo viewer" });
const stage = (page: Page) => viewer(page).locator("[data-photo-viewer-stage]");
const photoBox = (page: Page) => viewer(page).locator("[data-photo-viewer-current] [data-photo-viewer-box]");
const status = (page: Page) => viewer(page).locator("[data-photo-viewer-status]");
const counter = (page: Page) => viewer(page).locator("[data-photo-viewer-counter]");
const note = (page: Page) => page.getByTestId("photo-viewer-demo-note");
const tile = (page: Page, name: string) => demo(page).getByRole("button", { name, exact: true });
const control = (page: Page, name: string) => viewer(page).getByRole("button", { name, exact: true });

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

/** The slide between two photos, and a zoom, are eased: geometry is meaningful once they have finished. */
async function settled(page: Page) {
    await expect
        .poll(() =>
            viewer(page).evaluate((el) =>
                [...el.querySelectorAll(".photo-slide, .photo-box")].reduce(
                    (running, part) => running + part.getAnimations().length,
                    0,
                ),
            ),
        )
        .toBe(0);
}

/** The page is usable before it hydrates; a press that lands early opens nothing. */
async function openAt(page: Page, name: string, path = "/components/PhotoViewer") {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(async () => {
        if ((await viewer(page).count()) === 0) await tile(page, name).click({ timeout: 1_000 });
        await expect(viewer(page)).toBeVisible({ timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
    await settled(page);
}

/** How large the photo is drawn, as a multiple of its fitted size. */
const scale = (page: Page) =>
    photoBox(page).evaluate((el) => el.getBoundingClientRect().width / (el as HTMLElement).offsetWidth);

const centre = { x: PHONE.width / 2, y: PHONE.height / 2 };

/**
 * Two taps of a finger close together, until they count as a double tap: the
 * photo ends up zoomed in when `zoomsIn`, and fitted when not.
 *
 * Whether two taps arrive within the 300ms that makes them a double tap
 * depends on how busy the machine driving them is. Two that came too far
 * apart are two single taps, which change nothing, so they are made again.
 * (The timing itself is tested with a clock in tests/photo-viewer.test.ts.)
 */
async function doubleTap(page: Page, point: { x: number; y: number }, zoomsIn: boolean) {
    await expect(async () => {
        // Clear of the pair before, which may have been two single taps.
        await page.waitForTimeout(400);
        const cdp = await page.context().newCDPSession(page);
        const at = [{ x: Math.round(point.x), y: Math.round(point.y), id: 1 }];
        for (let tap = 0; tap < 2; tap += 1) {
            await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at });
            await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        }
        await cdp.detach();
        if (zoomsIn) await expect(viewer(page)).toHaveAttribute("data-zoomed", "true", { timeout: 1_000 });
        else await expect(viewer(page)).not.toHaveAttribute("data-zoomed", "true", { timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
    await settled(page);
}
/** Opaque black, however the browser writes a colour it computed from another. */
const BLACK = /^(rgb\(0, 0, 0\)|color\(srgb 0 0 0\))$/;

test.describe("PhotoGrid", () => {
    const grid = (page: Page) => page.getByTestId("photo-grid-demo");
    const tiles = (page: Page) => grid(page).locator("[data-photo-key]");

    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
        await page.goto("/components/PhotoGrid", { waitUntil: "domcontentloaded" });
        // Hydrated once the thumbnails are marked as loaded. They load lazily:
        // only once the grid is on screen.
        await grid(page).scrollIntoViewIfNeeded();
        await expect(grid(page).locator("[data-photo-grid-skeleton]")).toHaveCount(0, { timeout: 30_000 });
    });

    /** On a wide page, the example at the width a phone gives it. */
    async function atWidth(page: Page, width: number) {
        await page.setViewportSize({ width: 1100, height: 900 });
        await grid(page).evaluate((el, px) => ((el as HTMLElement).style.width = `${px}px`), width);
        await grid(page).scrollIntoViewIfNeeded();
    }

    test("square tiles in three columns on a phone, 4px apart, with the add tile first and the rest counted", async ({
        page,
    }) => {
        await atWidth(page, 343);
        const add = grid(page).getByRole("button", { name: "Add photo" });
        await expect(add).toBeVisible();
        await expect(tiles(page)).toHaveCount(8);

        const first = await box(add);
        const second = await box(tiles(page).nth(0));
        const third = await box(tiles(page).nth(1));
        const below = await box(tiles(page).nth(2));
        for (const rect of [first, second]) {
            expect(Math.abs(rect.width - rect.height), "Square").toBeLessThanOrEqual(0.5);
            expect(rect.width).toBeGreaterThanOrEqual(44);
        }
        // Three columns: (343 - 2 * 4) / 3.
        expect(second.width).toBeCloseTo(111.67, 1);
        expect(Math.round(second.x - (first.x + first.width))).toBe(4);
        expect(third.y, "The third tile is still on the first row").toBe(first.y);
        expect(Math.round(below.x)).toBe(Math.round(first.x));
        expect(Math.round(below.y - (first.y + first.height))).toBe(4);

        // The thumbnail fills its square, cropped.
        const image = tiles(page).nth(0).locator("img");
        expect(await image.evaluate((el) => getComputedStyle(el).objectFit)).toBe("cover");
        // It fades in once it has loaded: the settled value, not one on the way there.
        await expect(image).toHaveCSS("opacity", "1");
        expect(await image.getAttribute("loading")).toBe("lazy");

        const last = tiles(page).nth(7);
        await expect(last).toHaveAccessibleName(/, 6 more photos$/);
        await expect(last.locator("[data-photo-grid-more]")).toHaveText("+6");
        expect(await grid(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    });

    test("columns follow the width of the grid: 3, then 4 from 480px, then 5 from 768px", async ({ page }) => {
        const perRow = async () => {
            const tops = await grid(page)
                .locator("[data-photo-grid-item]")
                .evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().top)));
            return tops.filter((top) => top === tops[0]).length;
        };
        await atWidth(page, 479);
        expect(await perRow()).toBe(3);
        await atWidth(page, 480);
        expect(await perRow()).toBe(4);
        await atWidth(page, 768);
        expect(await perRow()).toBe(5);
        // By the grid's width, not the text size.
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        expect(await perRow()).toBe(5);
    });

    test("the count tile opens the viewer at its own photo, and focus comes back to it", async ({ page }) => {
        const last = tiles(page).nth(7);
        await expect(async () => {
            if ((await viewer(page).count()) === 0) await last.click({ timeout: 1_000 });
            await expect(viewer(page)).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        await expect(counter(page)).toHaveText("8 / 14");
        // On to a photo the grid does not show: focus has only the opener to go back to.
        await page.keyboard.press("End");
        await expect(counter(page)).toHaveText("14 / 14");
        await page.keyboard.press("Escape");
        await expect(viewer(page)).toHaveCount(0);
        await expect(last).toBeFocused();
    });

    test("one Tab stop, and the arrow keys move by tile and by row", async ({ page }) => {
        await atWidth(page, 343);
        const items = grid(page).locator("[data-photo-grid-item]");
        expect(await grid(page).locator('[data-photo-grid-item][tabindex="0"]').count()).toBe(1);
        await items.nth(0).focus();
        await page.keyboard.press("ArrowRight");
        await expect(items.nth(1)).toBeFocused();
        await page.keyboard.press("ArrowDown");
        await expect(items.nth(4)).toBeFocused();
        await page.keyboard.press("End");
        await expect(items.nth(5)).toBeFocused();
        await page.keyboard.press("Control+End");
        await expect(items.nth(8)).toBeFocused();
        // A hint appears while the keyboard is in the grid.
        await expect(grid(page).locator("[data-photo-grid-hint]")).toBeVisible();
        // One Tab leaves.
        await page.keyboard.press("Tab");
        expect(await page.evaluate(() => Boolean(document.activeElement?.closest("[data-photo-grid]")))).toBe(false);
    });

    test("multiple: taps tick and untick; the corner button opens; both are 44px targets that do not overlap", async ({
        page,
    }) => {
        const multiple = page.getByTestId("photo-grid-demo-multiple");
        const chosen = page.getByTestId("photo-grid-demo-chosen");
        await page.setViewportSize({ width: 1100, height: 900 });
        // A 320px phone less its margins.
        await multiple.evaluate((el) => ((el as HTMLElement).style.width = "288px"));
        await multiple.scrollIntoViewIfNeeded();
        const bar = multiple.getByRole("button", { name: "The bar at The Crown", exact: true });
        const open = multiple.getByRole("button", { name: "Open The bar at The Crown" });

        await expect(async () => {
            await bar.click({ position: { x: 20, y: 20 }, timeout: 1_000 });
            await expect(bar).toHaveAttribute("aria-pressed", "true", { timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        await expect(chosen).toHaveText("1 selected.");
        await expect(bar.locator("[data-photo-grid-check]")).toBeVisible();
        await bar.click({ position: { x: 20, y: 20 } });
        await expect(bar).toHaveAttribute("aria-pressed", "false");
        await expect(chosen).toHaveText("0 selected.");

        // The tile's own centre, and 21px around it, are the tile's.
        const outer = await box(bar);
        const middle = { x: outer.x + outer.width / 2, y: outer.y + outer.height / 2 };
        for (const [dx, dy] of [[0, 0], [21, 0], [-21, 0], [0, 21], [0, -21]]) {
            const hit = await page.evaluate(
                ([x, y]) => document.elementFromPoint(x, y)?.closest("button")?.getAttribute("aria-label"),
                [middle.x + dx, middle.y + dy],
            );
            expect(hit).toBe("The bar at The Crown");
        }
        await open.click();
        await expect(viewer(page)).toBeVisible();
        await expect(counter(page)).toHaveText("3 / 9");
        await expect(chosen, "Opening does not select").toHaveText("0 selected.");
    });

    test("single: one photo is selected, and pressing it again leaves it selected", async ({ page }) => {
        const single = page.getByTestId("photo-grid-demo-single");
        const cover = page.getByTestId("photo-grid-demo-cover");
        await single.scrollIntoViewIfNeeded();
        const trophy = single.getByRole("button", { name: "Trophy on the shelf" });
        await expect(async () => {
            await trophy.click({ timeout: 1_000 });
            await expect(trophy).toHaveAttribute("aria-pressed", "true", { timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        await expect(cover).toHaveText("Cover: Trophy on the shelf.");
        await trophy.click();
        await trophy.click();
        await expect(trophy).toHaveAttribute("aria-pressed", "true");
        await expect(cover).toHaveText("Cover: Trophy on the shelf.");
        await expect(single.locator('[aria-pressed="true"]')).toHaveCount(1);
        // Three columns, as asked for, whatever the width.
        const tops = await single
            .locator("[data-photo-key]")
            .evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().top)));
        expect(tops.filter((top) => top === tops[0])).toHaveLength(3);
    });

    test("radius: the check mark and the open button are the tile's radius less the 4px they are inset by", async ({
        page,
    }) => {
        const multiple = page.getByTestId("photo-grid-demo-multiple");
        await multiple.scrollIntoViewIfNeeded();
        const bar = multiple.getByRole("button", { name: "The bar at The Crown", exact: true });
        await expect(async () => {
            if ((await bar.getAttribute("aria-pressed")) !== "true") await bar.click({ position: { x: 20, y: 20 }, timeout: 1_000 });
            await expect(bar.locator("[data-photo-grid-check]")).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        const radius = (locator: Locator) =>
            locator.evaluate((el) => parseFloat(getComputedStyle(el).borderTopLeftRadius));
        const outer = await box(bar);
        const check = bar.locator("[data-photo-grid-check]");
        const open = multiple.getByRole("button", { name: "Open The bar at The Crown" });
        // 4px in from the tile's own edge, selected or not: the edge is drawn inside the tile.
        const mark = await box(check);
        expect(Math.round(mark.x - outer.x)).toBe(4);
        expect(Math.round(mark.y - outer.y)).toBe(4);
        expect(await bar.evaluate((el) => getComputedStyle(el).outlineWidth), "A thicker edge when selected").toBe("2px");
        const corner = await box(open);
        expect(Math.round(outer.x + outer.width - (corner.x + corner.width))).toBe(4);
        expect(Math.round(outer.y + outer.height - (corner.y + corner.height))).toBe(4);
        expect(await radius(bar)).toBe(12);
        expect(await radius(check)).toBe(8);
        expect(await radius(open)).toBe(8);
    });

    test("forced colours and dark theme: the add tile keeps its edge, the count its plate", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const add = grid(page).getByRole("button", { name: "Add photo" });
        expect(await add.evaluate((el) => getComputedStyle(el).borderTopStyle)).toBe("dashed");
        expect(await add.evaluate((el) => getComputedStyle(el).borderTopWidth)).toBe("1px");
        await page.emulateMedia({ forcedColors: "none" });
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        const plate = tiles(page).nth(7).locator("[data-photo-grid-more] span");
        const colours = await plate.evaluate((el) => {
            const style = getComputedStyle(el);
            return { fill: style.backgroundColor, text: style.color };
        });
        expect(colours.fill).not.toContain("rgba(0, 0, 0, 0)");
        expect(colours.fill).not.toBe(colours.text);
    });
});

test.describe("PhotoViewer — touch", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: PHONE });

    test.beforeEach(async ({ page }) => {
        await openAt(page, "Score sheet after round three");
    });

    test("fills the screen on black, fits the photo, and starts on Close", async ({ page }) => {
        const dialog = await box(viewer(page));
        expect(dialog).toEqual({ x: 0, y: 0, width: PHONE.width, height: PHONE.height });
        await expect(viewer(page)).toHaveAttribute("aria-modal", "true");
        expect(await viewer(page).evaluate((el) => el.parentElement?.parentElement === document.body)).toBe(true);
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

        // Photo 2 is 1200 by 1600: fitted to the width, 375 by 500, in the middle.
        const photo = await box(photoBox(page));
        expect(Math.round(photo.width)).toBe(375);
        expect(Math.round(photo.height)).toBe(500);
        expect(Math.round(photo.y)).toBe(120);
        await expect(viewer(page).getByRole("img", { name: "Score sheet after round three" })).toBeVisible();
        await expect(counter(page)).toHaveText("2 / 14");
        await expect(status(page)).toHaveText("Score sheet after round three, 2 of 14");
        await expect(control(page, "Close")).toBeFocused();

        // Opaque: nothing of the page behind shows through.
        const backdrop = await viewer(page)
            .locator("xpath=..")
            .locator(".photo-backdrop")
            .evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(backdrop).toMatch(BLACK);
        // The full image has replaced the blurred thumbnail.
        await expect(viewer(page).locator("[data-photo-viewer-current] [data-photo-viewer-thumb]")).toHaveCount(0);
    });

    test("swipe left shows the next photo, swipe right the previous one", async ({ page }) => {
        await touchDrag(page, { x: 300, y: 370 }, { x: 80, y: 372 });
        await expect(counter(page)).toHaveText("3 / 14");
        await expect(status(page)).toHaveText("The bar at The Crown, 3 of 14");
        await settled(page);
        // The new photo is in the middle, at its own proportions (1600 by 1600).
        const photo = await box(photoBox(page));
        expect(Math.round(photo.x)).toBe(0);
        expect(Math.round(photo.width)).toBe(375);
        expect(Math.round(photo.height)).toBe(375);

        await touchDrag(page, { x: 80, y: 370 }, { x: 300, y: 372 });
        await touchDrag(page, { x: 80, y: 370 }, { x: 300, y: 372 });
        await expect(counter(page)).toHaveText("1 / 14");
    });

    test("the neighbour peeks in while the finger drags, and a short pull goes back", async ({ page }) => {
        const cdp = await page.context().newCDPSession(page);
        const at = (x: number) => [{ x, y: 370, id: 1 }];
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at(300) });
        for (const x of [290, 270, 240, 220, 200]) {
            await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: at(x) });
            await page.waitForTimeout(30);
        }
        // About 90px left of where the drag was recognised.
        const dragged = await box(photoBox(page));
        expect(dragged.x).toBeLessThan(-70);
        expect(dragged.x).toBeGreaterThan(-100);
        // The next photo has come in from the right, 16px after this one.
        const next = await viewer(page)
            .locator('.photo-slide:not([data-photo-viewer-current]) [data-photo-viewer-image][src*="%3E3%3C"]')
            .boundingBox();
        expect(next).not.toBeNull();
        expect(next!.x).toBeLessThan(PHONE.width);
        expect(Math.round(next!.x - (dragged.x + dragged.width))).toBe(16);

        await page.waitForTimeout(300);
        await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        await settled(page);
        await expect(counter(page)).toHaveText("2 / 14");
        expect(Math.round((await box(photoBox(page))).x)).toBe(0);
    });

    test("a flick turns the page over a distance that a slow swipe would not", async ({ page }) => {
        await touchDrag(page, { x: 300, y: 370 }, { x: 250, y: 370 }, { duration: 500, hold: 300 });
        await settled(page);
        await expect(counter(page)).toHaveText("2 / 14");
        // How fast a flick arrives depends on how busy the machine driving it
        // is. One that came through too slowly springs back and changes
        // nothing, so it is simply made again. (The speed itself is tested
        // with a clock in tests/photo-viewer.test.ts.)
        await expect(async () => {
            await settled(page);
            await touchDrag(page, { x: 300, y: 370 }, { x: 240, y: 370 }, { duration: 0, hold: 0, steps: 2 });
            await expect(counter(page)).toHaveText("3 / 14", { timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
    });

    test("pinch zooms about the point between the fingers, up to four times", async ({ page }) => {
        // Two fingers 80px apart about the centre, spread to 200px: 2.5 times.
        await touchPinch(
            page,
            [{ x: centre.x - 40, y: centre.y }, { x: centre.x + 40, y: centre.y }],
            [{ x: centre.x - 100, y: centre.y }, { x: centre.x + 100, y: centre.y }],
        );
        await settled(page);
        await expect(viewer(page)).toHaveAttribute("data-zoomed", "true");
        expect(await scale(page)).toBeCloseTo(2.5, 1);
        // About the centre: the photo is still centred.
        const zoomed = await box(photoBox(page));
        expect(Math.abs(zoomed.x + zoomed.width / 2 - centre.x)).toBeLessThanOrEqual(2);
        expect(Math.abs(zoomed.y + zoomed.height / 2 - centre.y)).toBeLessThanOrEqual(2);
        await expect(counter(page), "A pinch does not turn the page").toHaveText("2 / 14");

        // Fingers that reach the sides stay off the previous and next buttons,
        // which sit at the middle of each side: these are 120px above it.
        const high = centre.y - 120;
        await touchPinch(
            page,
            [{ x: centre.x - 30, y: high }, { x: centre.x + 30, y: high }],
            [{ x: centre.x - 170, y: high }, { x: centre.x + 170, y: high }],
        );
        await settled(page);
        expect(await scale(page), "Never more than four times").toBeCloseTo(4, 1);

        // And back in: fitted again.
        await touchPinch(
            page,
            [{ x: centre.x - 170, y: high }, { x: centre.x + 170, y: high }],
            [{ x: centre.x - 20, y: high }, { x: centre.x + 20, y: high }],
        );
        await settled(page);
        expect(await scale(page)).toBeCloseTo(1, 2);
        await expect(viewer(page)).not.toHaveAttribute("data-zoomed", "true");
    });

    test("two fingers on the controls do not zoom the page under the viewer", async ({ page }) => {
        const pageScale = () => page.evaluate(() => Math.round(window.visualViewport!.scale * 100) / 100);
        const count = await box(counter(page));
        const close = await box(control(page, "Close"));
        const y = count.y + count.height / 2;
        // Both fingers on the plates at the top, spread apart: not a touch the stage sees.
        await touchPinch(
            page,
            [{ x: count.x + count.width - 10, y }, { x: close.x + 10, y }],
            [{ x: count.x + 5, y }, { x: close.x + close.width - 5, y }],
        );
        expect(await pageScale(), "the page is not zoomed").toBe(1);
        await expect(viewer(page)).not.toHaveAttribute("data-zoomed", "true");
        await expect(counter(page)).toHaveText("2 / 14");

        // A tap there is still a tap.
        await control(page, "Close").tap();
        await expect(viewer(page)).toHaveCount(0);
        // And the page itself can be zoomed again once the viewer is gone.
        await touchPinch(
            page,
            [{ x: centre.x - 40, y: centre.y }, { x: centre.x + 40, y: centre.y }],
            [{ x: centre.x - 120, y: centre.y }, { x: centre.x + 120, y: centre.y }],
        );
        expect(await pageScale()).toBeGreaterThan(1);
    });

    test("pinch away from the centre keeps the point under the fingers where it was", async ({ page }) => {
        // About a point 100px right of the centre and 100px above it.
        const point = { x: centre.x + 100, y: centre.y - 100 };
        const before = await box(photoBox(page));
        // Where that point is in the photo, as a part of its width and height.
        const part = { x: (point.x - before.x) / before.width, y: (point.y - before.y) / before.height };
        await touchPinch(
            page,
            [{ x: point.x - 40, y: point.y }, { x: point.x + 40, y: point.y }],
            [{ x: point.x - 80, y: point.y }, { x: point.x + 80, y: point.y }],
        );
        await settled(page);
        expect(await scale(page)).toBeCloseTo(2, 1);
        const after = await box(photoBox(page));
        expect(Math.abs(after.x + part.x * after.width - point.x)).toBeLessThanOrEqual(3);
        expect(Math.abs(after.y + part.y * after.height - point.y)).toBeLessThanOrEqual(3);
    });

    test("double tap zooms in about the tap, and a second double tap zooms back out", async ({ page }) => {
        const point = { x: centre.x + 60, y: centre.y + 40 };
        const before = await box(photoBox(page));
        const part = { x: (point.x - before.x) / before.width, y: (point.y - before.y) / before.height };
        await doubleTap(page, point, true);
        expect(await scale(page)).toBeCloseTo(2.5, 2);
        // About the tap: the point of the photo that was under the finger still is.
        const zoomed = await box(photoBox(page));
        expect(Math.abs(zoomed.x + part.x * zoomed.width - point.x)).toBeLessThanOrEqual(2);
        expect(Math.abs(zoomed.y + part.y * zoomed.height - point.y)).toBeLessThanOrEqual(2);

        await doubleTap(page, centre, false);
        expect(await scale(page)).toBeCloseTo(1, 2);
    });

    test("one tap does nothing: not on the photo, and not on the black beside it", async ({ page }) => {
        await touchTap(page, centre);
        await page.waitForTimeout(500);
        // Above the photo, between the counter and the close button.
        await touchTap(page, { x: centre.x, y: 80 });
        await page.waitForTimeout(500);
        await expect(viewer(page)).toBeVisible();
        expect(await scale(page)).toBeCloseTo(1, 2);
        await expect(counter(page)).toHaveText("2 / 14");
    });

    test("zoomed: a drag pans, held to the photo's edges; it does not turn the page or close", async ({ page }) => {
        await doubleTap(page, centre, true);
        const zoomed = await box(photoBox(page));
        // 2.5 times 375 by 500: 937.5 by 1250.
        expect(Math.round(zoomed.width)).toBe(938);

        await touchDrag(page, { x: 300, y: 370 }, { x: 150, y: 370 });
        const panned = await box(photoBox(page));
        expect(Math.round(panned.x - zoomed.x)).toBeLessThan(-130);
        await expect(counter(page), "A sideways drag pans while zoomed").toHaveText("2 / 14");

        // As far left as it goes, and then further: the right edge stops at the edge of the screen.
        // (Above the middle of the sides, where the previous and next buttons are.)
        for (let pull = 0; pull < 4; pull += 1) await touchDrag(page, { x: 340, y: 250 }, { x: 30, y: 250 }, { duration: 150, hold: 50 });
        const atEdge = await box(photoBox(page));
        expect(Math.round(atEdge.x + atEdge.width)).toBe(PHONE.width);
        // The other way: the left edge stops at 0.
        for (let pull = 0; pull < 6; pull += 1) await touchDrag(page, { x: 30, y: 250 }, { x: 340, y: 250 }, { duration: 150, hold: 50 });
        expect(Math.round((await box(photoBox(page))).x)).toBe(0);

        // Down, a long way: it pans to the top edge and stays open.
        for (let pull = 0; pull < 4; pull += 1) await touchDrag(page, { x: 187, y: 200 }, { x: 187, y: 600 }, { duration: 150, hold: 50 });
        await expect(viewer(page)).toBeVisible();
        expect(Math.round((await box(photoBox(page))).y)).toBe(0);
        await expect(counter(page)).toHaveText("2 / 14");
    });

    test("swipe down closes, says so, and focus is back on the tile", async ({ page }) => {
        await touchDrag(page, { x: 187, y: 300 }, { x: 190, y: 560 });
        await expect(viewer(page)).toHaveCount(0);
        await expect(note(page)).toContainText("Last close: swipe.");
        await expect(tile(page, "Score sheet after round three")).toBeFocused();
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
    });

    test("a short pull down follows the finger, thins the black, and comes back", async ({ page }) => {
        const cdp = await page.context().newCDPSession(page);
        const at = (y: number) => [{ x: 187, y, id: 1 }];
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at(300) });
        for (const y of [315, 340, 370, 400]) {
            await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: at(y) });
            await page.waitForTimeout(30);
        }
        const pulled = await box(photoBox(page));
        expect(pulled.y).toBeGreaterThan(120 + 60);
        const opacity = await viewer(page)
            .locator("xpath=..")
            .locator(".photo-backdrop")
            .evaluate((el) => Number(getComputedStyle(el).opacity));
        expect(opacity).toBeLessThan(1);
        expect(opacity).toBeGreaterThan(0.3);
        await page.waitForTimeout(300);
        await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        await settled(page);
        await expect(viewer(page)).toBeVisible();
        expect(Math.round((await box(photoBox(page))).y)).toBe(120);
    });

    test("a swipe up does nothing, and the page behind does not scroll under any of it", async ({ page }) => {
        const scrolled = () =>
            page.evaluate(() => {
                let top = window.scrollY;
                for (const node of document.querySelectorAll("*")) top += node.scrollTop;
                return top;
            });
        const before = await scrolled();
        await touchDrag(page, { x: 187, y: 600 }, { x: 190, y: 150 });
        await settled(page);
        await expect(viewer(page)).toBeVisible();
        await expect(counter(page)).toHaveText("2 / 14");
        expect(Math.round((await box(photoBox(page))).y)).toBe(120);
        expect(await scrolled()).toBe(before);
    });

    test("after moving to another photo, focus returns to that photo's tile", async ({ page }) => {
        await touchDrag(page, { x: 300, y: 370 }, { x: 80, y: 370 });
        await touchDrag(page, { x: 300, y: 370 }, { x: 80, y: 370 });
        await expect(counter(page)).toHaveText("4 / 14");
        await control(page, "Close").tap();
        await expect(viewer(page)).toHaveCount(0);
        await expect(tile(page, "Trophy on the shelf")).toBeFocused();
        await expect(note(page)).toContainText("Last close: close-button.");
    });

    test("every control is at least 44px, with 8px between neighbours, and none lies over another", async ({
        page,
    }) => {
        const names = ["Close", "Previous photo", "Next photo", "Share", "Set as cover", "More actions"];
        const rects = [];
        for (const name of names) {
            const rect = await box(control(page, name));
            expect(rect.width, name).toBeGreaterThanOrEqual(44);
            expect(rect.height, name).toBeGreaterThanOrEqual(44);
            expect(rect.x).toBeGreaterThanOrEqual(0);
            expect(rect.x + rect.width).toBeLessThanOrEqual(PHONE.width);
            rects.push(rect);
        }
        const [, , , share, cover, more] = rects;
        expect(Math.round(cover.x - (share.x + share.width))).toBe(8);
        expect(Math.round(more.x - (cover.x + cover.width))).toBe(8);
        for (let a = 0; a < rects.length; a += 1) {
            for (let b = a + 1; b < rects.length; b += 1) {
                const apart =
                    rects[a].x + rects[a].width <= rects[b].x ||
                    rects[b].x + rects[b].width <= rects[a].x ||
                    rects[a].y + rects[a].height <= rects[b].y ||
                    rects[b].y + rects[b].height <= rects[a].y;
                expect(apart, `${names[a]} and ${names[b]}`).toBe(true);
            }
        }
    });

    test("safe areas: every control is clear of the notch, the corners and the home indicator", async ({
        page,
    }) => {
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setSafeAreaInsetsOverride", {
            insets: { top: 47, bottom: 34, left: 20, right: 30 },
        });
        await expect.poll(async () => (await box(control(page, "Close"))).y).toBeGreaterThanOrEqual(47);
        const inside = async (locator: Locator, name: string) => {
            const rect = await box(locator);
            expect(rect.y, `${name} top`).toBeGreaterThanOrEqual(47);
            expect(rect.y + rect.height, `${name} bottom`).toBeLessThanOrEqual(PHONE.height - 34);
            // The larger of the two side insets, on both sides: the notch may be on either.
            expect(rect.x, `${name} left`).toBeGreaterThanOrEqual(30);
            expect(rect.x + rect.width, `${name} right`).toBeLessThanOrEqual(PHONE.width - 30);
        };
        for (const name of ["Close", "Previous photo", "Next photo", "Share", "Set as cover", "More actions"]) {
            await inside(control(page, name), name);
        }
        await inside(counter(page), "counter");
    });

    test("actions: Delete asks first, and the viewer moves to the photo that takes its place", async ({ page }) => {
        await control(page, "More actions").tap();
        const menu = viewer(page).getByRole("menu", { name: "More actions" });
        await expect(menu).toBeVisible();
        // Opened upwards from the bottom of the screen, and wholly on it.
        const panel = await box(menu);
        expect(panel.y).toBeGreaterThanOrEqual(0);
        expect(panel.y + panel.height).toBeLessThanOrEqual(PHONE.height);
        expect(panel.x).toBeGreaterThanOrEqual(0);
        expect(panel.x + panel.width).toBeLessThanOrEqual(PHONE.width);
        const trigger = await box(control(page, "More actions"));
        expect(panel.y + panel.height).toBeLessThanOrEqual(trigger.y + 1);

        await menu.getByRole("menuitem", { name: "Delete" }).tap();
        const confirm = page.getByRole("alertdialog", { name: "Delete this photo?" });
        await expect(confirm).toBeVisible();
        // The question is on top of the viewer, which is still there.
        await expect(viewer(page)).toBeVisible();
        // (Polled: the question slides in.)
        await expect
            .poll(() =>
                confirm.evaluate((el) => {
                    const rect = el.getBoundingClientRect();
                    const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + 10);
                    return Boolean(hit && el.contains(hit));
                }),
            )
            .toBe(true);
        await confirm.getByRole("button", { name: "Delete" }).tap();
        await expect(confirm).toHaveCount(0);
        await expect(viewer(page)).toBeVisible();
        await expect(counter(page)).toHaveText("2 / 13");
        await expect(status(page)).toHaveText("The bar at The Crown, 2 of 13");
        await expect(note(page)).toContainText('Deleted "Score sheet after round three".');
        // Focus is still inside the viewer, not dropped on the page.
        await expect
            .poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]'))))
            .toBe(true);
    });

    test("after the photo it was opened from is deleted, closing gives focus to the tile of the photo showing", async ({
        page,
    }) => {
        await control(page, "More actions").tap();
        await viewer(page).getByRole("menuitem", { name: "Delete" }).tap();
        const confirm = page.getByRole("alertdialog", { name: "Delete this photo?" });
        await expect(async () => {
            // (The question slides in: a tap that lands early misses it.)
            if ((await confirm.count()) > 0) await confirm.getByRole("button", { name: "Delete" }).tap({ timeout: 1_000 });
            await expect(confirm).toHaveCount(0, { timeout: 1_000 });
        }).toPass({ timeout: 20_000 });
        await expect(counter(page)).toHaveText("2 / 13");
        // The tile it was opened from is gone from the grid.
        await expect(tile(page, "Score sheet after round three")).toHaveCount(0);
        await control(page, "Close").tap();
        await expect(viewer(page)).toHaveCount(0);
        await expect(tile(page, "The bar at The Crown")).toBeFocused();
    });

    test("an action in the bar is called with the photo showing, and the viewer stays open", async ({ page }) => {
        await touchDrag(page, { x: 300, y: 370 }, { x: 80, y: 370 });
        await expect(counter(page)).toHaveText("3 / 14");
        await control(page, "Set as cover").tap();
        await expect(note(page)).toContainText('"The bar at The Crown" is the cover.');
        await expect(viewer(page)).toBeVisible();
    });
});

test.describe("PhotoViewer — keyboard and mouse", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
        await openAt(page, "Score sheet after round three");
    });

    test("focus trap: Tab and Shift+Tab stay inside and wrap", async ({ page }) => {
        await expect(control(page, "Close")).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        await expect(control(page, "More actions")).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(control(page, "Close")).toBeFocused();
        for (let step = 0; step < 20; step += 1) {
            await page.keyboard.press("Tab");
            expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
        }
    });

    test("arrows, Page Up and Down, Home and End change photo; the ends hold", async ({ page }) => {
        await page.keyboard.press("ArrowRight");
        await expect(counter(page)).toHaveText("3 / 14");
        await page.keyboard.press("ArrowLeft");
        await page.keyboard.press("ArrowLeft");
        await expect(counter(page)).toHaveText("1 / 14");
        await expect(control(page, "Previous photo")).toHaveAttribute("aria-disabled", "true");
        await page.keyboard.press("ArrowLeft");
        await expect(counter(page)).toHaveText("1 / 14");
        await page.keyboard.press("PageDown");
        await expect(counter(page)).toHaveText("2 / 14");
        await page.keyboard.press("End");
        await expect(counter(page)).toHaveText("14 / 14");
        await expect(control(page, "Next photo")).toHaveAttribute("aria-disabled", "true");
        await page.keyboard.press("Home");
        await expect(counter(page)).toHaveText("1 / 14");
    });

    test("+ and − zoom, the arrows then pan, and Page Down still changes photo", async ({ page }) => {
        await page.keyboard.press("+");
        await page.keyboard.press("+");
        await settled(page);
        expect(await scale(page)).toBeCloseTo(2.25, 2);
        const before = await box(photoBox(page));
        await page.keyboard.press("ArrowRight");
        await settled(page);
        // Right shows what is to the right: the photo moves left.
        expect(Math.round((await box(photoBox(page))).x - before.x)).toBe(-64);
        await expect(counter(page), "The arrows pan while zoomed").toHaveText("2 / 14");
        await page.keyboard.press("ArrowDown");
        await settled(page);
        expect(Math.round((await box(photoBox(page))).y - before.y)).toBe(-64);
        await page.keyboard.press("-");
        await settled(page);
        expect(await scale(page)).toBeCloseTo(1.5, 2);
        await page.keyboard.press("0");
        await settled(page);
        expect(await scale(page)).toBeCloseTo(1, 2);

        await page.keyboard.press("+");
        await page.keyboard.press("PageDown");
        await expect(counter(page)).toHaveText("3 / 14");
        await settled(page);
        expect(await scale(page), "The zoom resets with the photo").toBeCloseTo(1, 2);
    });

    test("Escape leaves the zoom first, then closes and returns focus", async ({ page }) => {
        await page.keyboard.press("+");
        await settled(page);
        await page.keyboard.press("Escape");
        await expect(viewer(page)).toBeVisible();
        await settled(page);
        expect(await scale(page)).toBeCloseTo(1, 2);
        await page.keyboard.press("Escape");
        await expect(viewer(page)).toHaveCount(0);
        await expect(note(page)).toContainText("Last close: escape.");
        await expect(tile(page, "Score sheet after round three")).toBeFocused();
    });

    test("in the menu, the keys are the menu's: Escape closes it and not the viewer", async ({ page }) => {
        await control(page, "More actions").focus();
        await page.keyboard.press("Enter");
        const menu = viewer(page).getByRole("menu", { name: "More actions" });
        await expect(menu).toBeVisible();
        await page.keyboard.press("ArrowDown");
        await expect(counter(page)).toHaveText("2 / 14");
        await page.keyboard.press("Escape");
        await expect(menu).toHaveCount(0);
        await expect(viewer(page)).toBeVisible();
    });

    test("mouse: the buttons, a double click, a drag to pan, and Ctrl with the wheel", async ({ page }) => {
        await control(page, "Next photo").click();
        await expect(counter(page)).toHaveText("3 / 14");
        await settled(page);

        await page.mouse.dblclick(centre.x, centre.y);
        await settled(page);
        expect(await scale(page)).toBeCloseTo(2.5, 2);
        const before = await box(photoBox(page));
        await page.mouse.move(250, 370);
        await page.mouse.down();
        await page.mouse.move(150, 370, { steps: 6 });
        await page.mouse.up();
        expect((await box(photoBox(page))).x - before.x).toBeLessThan(-80);
        await expect(counter(page)).toHaveText("3 / 14");

        await page.mouse.dblclick(centre.x, centre.y);
        await settled(page);
        expect(await scale(page)).toBeCloseTo(1, 2);

        await page.mouse.move(centre.x, centre.y);
        await page.keyboard.down("Control");
        for (let notch = 0; notch < 5; notch += 1) await page.mouse.wheel(0, -100);
        await page.keyboard.up("Control");
        await expect.poll(() => scale(page)).toBeGreaterThan(1.4);
        // A plain wheel does not zoom.
        const zoomed = await scale(page);
        await page.mouse.wheel(0, -100);
        expect(await scale(page)).toBeCloseTo(zoomed, 2);
    });

    test("a focused control shows a focus ring on its plate", async ({ page }) => {
        await page.keyboard.press("Tab");
        await expect(control(page, "Previous photo")).toBeFocused();
        expect(
            await control(page, "Previous photo").evaluate((el) => getComputedStyle(el).boxShadow),
        ).toContain("0px 0px 0px 4px");
    });
});

test.describe("PhotoViewer — display modes", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
        await openAt(page, "Score sheet after round three");
    });

    test("the controls sit on opaque plates with an edge, in both themes", async ({ page }) => {
        const plate = (name: string) =>
            control(page, name).evaluate((el) => {
                const style = getComputedStyle(el);
                return { fill: style.backgroundColor, edge: `${style.borderTopWidth} ${style.borderTopStyle}`, text: style.color };
            });
        const opaque = (colour: string) => /^rgb\(/.test(colour) || /^color\(srgb [\d. ]+\)$/.test(colour);
        await page.mouse.move(centre.x, centre.y);
        for (const theme of ["light", "dark"]) {
            await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), theme === "dark");
            await page.waitForTimeout(250);
            for (const name of ["Close", "Next photo", "Share", "More actions"]) {
                const seen = await plate(name);
                expect(opaque(seen.fill), `${theme} ${name}: ${seen.fill}`).toBe(true);
                expect(seen.edge).toBe("1px solid");
                expect(seen.fill).not.toBe(seen.text);
            }
            const counterFill = await counter(page).evaluate((el) => getComputedStyle(el).backgroundColor);
            expect(opaque(counterFill)).toBe(true);
        }
        // Black behind the photo whatever the theme.
        const backdrop = () =>
            viewer(page)
                .locator("xpath=..")
                .locator(".photo-backdrop")
                .evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(await backdrop()).toMatch(BLACK);
        await page.evaluate(() => document.documentElement.classList.remove("dark"));
        expect(await backdrop()).toMatch(BLACK);
    });

    test("right to left: next is on the left, Left goes to the next photo, and so does a swipe right", async ({
        page,
    }) => {
        await page.keyboard.press("Escape");
        await page.evaluate(() => (document.documentElement.dir = "rtl"));
        await tile(page, "Score sheet after round three").click();
        await expect(viewer(page)).toBeVisible();
        await settled(page);
        const next = await box(control(page, "Next photo"));
        const previous = await box(control(page, "Previous photo"));
        expect(next.x, "Next is on the left").toBeLessThan(previous.x);
        const close = await box(control(page, "Close"));
        expect(close.x, "Close is at the end: the left").toBeLessThan(PHONE.width / 2);

        await page.keyboard.press("ArrowLeft");
        await expect(counter(page)).toHaveText("3 / 14");
        await page.keyboard.press("ArrowRight");
        await expect(counter(page)).toHaveText("2 / 14");
        await settled(page);

        await page.mouse.move(80, 370);
        await page.mouse.down();
        await page.mouse.move(300, 372, { steps: 10 });
        await page.waitForTimeout(250);
        await page.mouse.up();
        await expect(counter(page)).toHaveText("3 / 14");
        await settled(page);
        expect(Math.round((await box(photoBox(page))).x)).toBe(0);
        expect(await viewer(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    });

    test("forced colours: the plates keep their edges and the page's own background is the dark", async ({
        page,
    }) => {
        await page.emulateMedia({ forcedColors: "active" });
        for (const name of ["Close", "Next photo", "Share"]) {
            const edge = await control(page, name).evaluate((el) => {
                const style = getComputedStyle(el);
                return `${style.borderTopWidth} ${style.borderTopStyle}`;
            });
            expect(edge).toBe("1px solid");
        }
        const colours = await page.evaluate(() => {
            const probe = document.createElement("span");
            probe.style.backgroundColor = "Canvas";
            document.body.append(probe);
            const canvas = getComputedStyle(probe).backgroundColor;
            probe.remove();
            const backdrop = getComputedStyle(document.querySelector(".photo-backdrop")!).backgroundColor;
            return { canvas, backdrop };
        });
        expect(colours.backdrop).toBe(colours.canvas);
    });

    test("reduced motion: the photo changes and zooms without easing", async ({ page }) => {
        const durations = () =>
            viewer(page).evaluate((el) => ({
                slide: getComputedStyle(el.querySelector(".photo-slide")!).transitionDuration,
                box: getComputedStyle(el.querySelector(".photo-box")!).transitionDuration,
            }));
        await page.keyboard.press("ArrowRight");
        // With motion, the step is eased.
        await expect(counter(page)).toHaveText("3 / 14");
        await settled(page);
        await page.emulateMedia({ reducedMotion: "reduce" });
        expect(await durations()).toEqual({ slide: "0s", box: "0s" });
        await page.keyboard.press("ArrowRight");
        await expect(counter(page)).toHaveText("4 / 14");
        // At once: in the middle, with nothing running.
        await expect.poll(async () => Math.round((await box(photoBox(page))).x)).toBe(0);
        await page.keyboard.press("+");
        await expect.poll(() => scale(page)).toBeCloseTo(1.5, 2);
    });

    test("fits a 320px screen without sideways scroll, with every control on it", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 568 });
        await settled(page);
        expect(await viewer(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        // 1200 by 1600 fitted to 320 by 568: 320 by 426.67.
        const photo = await box(photoBox(page));
        expect(Math.round(photo.width)).toBe(320);
        expect(Math.round(photo.height)).toBe(427);
        for (const name of ["Close", "Previous photo", "Next photo", "Share", "Set as cover", "More actions"]) {
            const rect = await box(control(page, name));
            expect(rect.width).toBeGreaterThanOrEqual(44);
            expect(rect.height).toBeGreaterThanOrEqual(44);
            expect(rect.x, name).toBeGreaterThanOrEqual(0);
            expect(rect.x + rect.width, name).toBeLessThanOrEqual(320);
            expect(rect.y + rect.height, name).toBeLessThanOrEqual(568);
        }
    });

    test("at 320px with the text enlarged to 200%, the actions wrap and stay on the screen", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 568 });
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        await settled(page);
        expect(await viewer(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        for (const name of ["Close", "Previous photo", "Next photo", "Share", "Set as cover", "More actions"]) {
            const rect = await box(control(page, name));
            expect(rect.x, name).toBeGreaterThanOrEqual(0);
            expect(rect.x + rect.width, name).toBeLessThanOrEqual(320);
            expect(rect.y, name).toBeGreaterThanOrEqual(0);
            expect(rect.y + rect.height, name).toBeLessThanOrEqual(568);
        }
        // Close and the first action can still be pressed: nothing lies over them.
        for (const name of ["Close", "Share"]) {
            const rect = await box(control(page, name));
            const hit = await page.evaluate(
                ([x, y]) => document.elementFromPoint(x, y)?.closest("button")?.textContent?.trim() || document.elementFromPoint(x, y)?.closest("button")?.getAttribute("aria-label"),
                [rect.x + rect.width / 2, rect.y + rect.height / 2],
            );
            expect(hit).toBe(name);
        }
    });

    test("landscape, 667 by 375: the photo is fitted to the height and the controls are all on screen", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 667, height: 375 });
        await settled(page);
        const dialog = await box(viewer(page));
        expect(dialog.width).toBe(667);
        expect(dialog.height).toBe(375);
        // 1200 by 1600 fitted to the height: 281.25 by 375, centred.
        const photo = await box(photoBox(page));
        expect(Math.round(photo.height)).toBe(375);
        expect(Math.round(photo.width)).toBe(281);
        expect(Math.abs(photo.x + photo.width / 2 - 667 / 2)).toBeLessThanOrEqual(1);
        for (const name of ["Close", "Previous photo", "Next photo", "Share", "Set as cover", "More actions"]) {
            const rect = await box(control(page, name));
            expect(rect.x, name).toBeGreaterThanOrEqual(0);
            expect(rect.x + rect.width, name).toBeLessThanOrEqual(667);
            expect(rect.y, name).toBeGreaterThanOrEqual(0);
            expect(rect.y + rect.height, name).toBeLessThanOrEqual(375);
        }
        expect(await viewer(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        // A landscape photo then fills the width instead.
        await page.keyboard.press("End");
        await page.keyboard.press("Home");
        await settled(page);
        const first = await box(photoBox(page));
        // 1600 by 1200 in 667 by 375: fitted to the height, 500 by 375.
        expect(Math.round(first.height)).toBe(375);
        expect(Math.round(first.width)).toBe(500);
    });
});

test.describe("PhotoViewer — captions", () => {
    // A finger scrolls the unfolded caption.
    test.use({ hasTouch: true });

    test("a long caption is two lines with More, which unfolds it on a plate that scrolls", async ({ page }) => {
        await page.setViewportSize(PHONE);
        await page.goto("/components/PhotoViewer", { waitUntil: "domcontentloaded" });
        const captions = page.getByTestId("photo-viewer-demo-captions");
        const dialog = page.getByRole("dialog", { name: "Photos with captions" });
        await captions.scrollIntoViewIfNeeded();
        await expect(async () => {
            if ((await dialog.count()) === 0) {
                await captions.getByRole("button", { name: "Score sheet after round three" }).click({ timeout: 1_000 });
            }
            await expect(dialog).toBeVisible({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });

        const caption = dialog.locator("[data-photo-viewer-caption]");
        const text = caption.locator("p");
        await expect(text).toContainText("The team has played every Tuesday");
        const more = dialog.getByRole("button", { name: "More" });
        await expect(more).toHaveAttribute("aria-expanded", "false");
        const folded = await box(text);
        // Two lines of 20px.
        expect(Math.round(folded.height)).toBe(40);
        expect((await box(more)).height).toBeGreaterThanOrEqual(44);

        await more.click();
        const less = dialog.getByRole("button", { name: "Less" });
        await expect(less).toHaveAttribute("aria-expanded", "true");
        await expect(less).toBeFocused();
        const unfolded = await box(text);
        expect(unfolded.height).toBeGreaterThan(folded.height);
        expect(unfolded.height, "Never more than 40% of the screen").toBeLessThanOrEqual(PHONE.height * 0.4 + 1);
        const plate = await box(caption);
        expect(plate.y + plate.height).toBeLessThanOrEqual(PHONE.height);
        expect(plate.x).toBeGreaterThanOrEqual(0);
        expect(plate.x + plate.width).toBeLessThanOrEqual(PHONE.width);

        // Unfolded, it is the one thing in the viewer that scrolls under a finger.
        const scrolled = () => text.evaluate((el) => el.scrollTop);
        if ((await text.evaluate((el) => el.scrollHeight - el.clientHeight)) > 20) {
            expect(await scrolled()).toBe(0);
            await touchDrag(
                page,
                { x: unfolded.x + 80, y: unfolded.y + unfolded.height - 16 },
                { x: unfolded.x + 80, y: unfolded.y + 16 },
            );
            expect(await scrolled()).toBeGreaterThan(20);
            await expect(dialog).toBeVisible();
        }

        // A short caption has no button, and a photo without one has no plate.
        // A key changes the photo here, and the caption is folded again: no Less either.
        await page.keyboard.press("ArrowLeft");
        await expect(dialog.locator("[data-photo-viewer-caption]")).toContainText("round 1");
        await expect(dialog.getByRole("button", { name: "More" })).toHaveCount(0);
        await expect(dialog.getByRole("button", { name: "Less" })).toHaveCount(0);
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        await expect(dialog.locator("[data-photo-viewer-caption]")).toHaveCount(0);
        // No actions here either: nothing at the bottom at all.
        await expect(dialog.locator("[data-photo-viewer-actions]")).toHaveCount(0);
    });
});
