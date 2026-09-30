import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * MediaGrid in a real browser: the parts jsdom cannot show.
 *
 * jsdom has no layout, so it cannot tell how many columns the grid has, that
 * the arrow keys follow them, that a tile is square or that nothing overflows
 * a phone or a Modal. It loads no images, so it cannot show the fallback for a
 * broken one. And only a browser really drops focus on `<body>` when a dialog
 * closes over a button that no longer exists.
 */

const library = (page: Page) => page.getByTestId("media-demo-library");
const item = (scope: Locator | Page, name: string) =>
    scope.getByRole("button", { name, exact: true });
const tiles = (scope: Locator) => scope.locator("[data-media-grid-item]");

/** The page is usable before it hydrates; a click that lands early is lost. */
async function gotoHydrated(page: Page) {
    await page.goto("/components/MediaGrid", { waitUntil: "domcontentloaded" });
    const probe = item(library(page), "office.jpg");
    await expect(async () => {
        if ((await probe.getAttribute("aria-pressed")) !== "true") await probe.click();
        await expect(probe).toHaveAttribute("aria-pressed", "true", { timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
    // Back to the demo's starting selection.
    await item(library(page), "team.png").click();
    await expect(page.getByTestId("media-demo-selected")).toHaveText("team.png");
}

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    if (!rect) throw new Error("Element has no box; is it visible?");
    return rect;
}

test.describe("MediaGrid — layout, keyboard and focus", () => {
    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page);
    });

    test("layout: square tiles in as many columns as fit, with no overflow at phone width", async ({
        page,
    }) => {
        const grid = library(page);
        const first = await box(tiles(grid).nth(0));
        const second = await box(tiles(grid).nth(1));
        expect(Math.abs(first.width - first.height)).toBeLessThan(1);
        expect(first.width).toBeGreaterThanOrEqual(96);
        expect(second.y, "The first two tiles share a row").toBe(first.y);
        expect(second.x).toBeGreaterThan(first.x);

        await page.setViewportSize({ width: 360, height: 740 });
        const narrowFirst = await box(tiles(grid).nth(0));
        const narrowSecond = await box(tiles(grid).nth(1));
        expect(Math.abs(narrowFirst.width - narrowFirst.height)).toBeLessThan(1);
        expect(narrowSecond.y, "A phone still fits two columns").toBe(narrowFirst.y);
        expect(
            await grid.evaluate((el) => el.scrollWidth <= el.clientWidth),
            "The grid must not overflow sideways",
        ).toBe(true);
        expect(
            await page.evaluate(
                () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
            "The page must not scroll sideways",
        ).toBe(true);
    });

    test("selection: the selected tile has a check mark and a thicker border, and one item at a time", async ({
        page,
    }) => {
        const grid = library(page);
        const team = item(grid, "team.png");
        const hero = item(grid, "hero.jpg");

        await expect(team).toHaveAttribute("aria-pressed", "true");
        await expect(team.locator("[data-media-grid-check]")).toBeVisible();
        expect(await team.evaluate((el) => getComputedStyle(el).borderTopWidth)).toBe("2px");
        expect(await hero.evaluate((el) => getComputedStyle(el).borderTopWidth)).toBe("1px");
        await expect(hero.locator("[data-media-grid-check]")).toHaveCount(0);

        await hero.click();
        await expect(hero).toHaveAttribute("aria-pressed", "true");
        await expect(team).toHaveAttribute("aria-pressed", "false");
        await expect(page.getByTestId("media-demo-selected")).toHaveText("hero.jpg");
    });

    test("keyboard: one Tab stop, and the arrows follow the columns on screen", async ({
        page,
    }) => {
        const grid = library(page);
        const team = item(grid, "team.png");

        // Tab comes in on the selected item; its delete button is next, then out.
        await team.focus();
        await expect(tiles(grid).and(page.locator('[tabindex="0"]'))).toHaveCount(1);
        await page.keyboard.press("Tab");
        await expect(item(grid, "Delete team.png")).toBeFocused();
        await page.keyboard.press("Tab");
        expect(
            await grid.evaluate((el) => el.contains(document.activeElement)),
            "A second Tab leaves the grid",
        ).toBe(false);

        await team.focus();
        const start = await box(team);
        await page.keyboard.press("ArrowDown");
        const below = page.locator("[data-media-grid-item]:focus");
        await expect(below).toHaveCount(1);
        const landed = await box(below);
        expect(landed.x, "Arrow Down stays in the column").toBe(start.x);
        expect(landed.y).toBeGreaterThan(start.y);

        await page.keyboard.press("ArrowUp");
        await expect(team).toBeFocused();
        await page.keyboard.press("ArrowLeft");
        await expect(item(grid, "hero.jpg")).toBeFocused();
        await page.keyboard.press("End");
        const rowEnd = await box(page.locator("[data-media-grid-item]:focus"));
        // Measured again: moving focus may have scrolled the page.
        const rowNow = await box(item(grid, "hero.jpg"));
        expect(rowEnd.y, "End stays in the row").toBe(rowNow.y);
        expect(rowEnd.x).toBeGreaterThan(rowNow.x);
        await page.keyboard.press("Control+End");
        await expect(item(grid, "missing.jpg")).toBeFocused();
        await page.keyboard.press("Control+Home");
        await expect(item(grid, "hero.jpg")).toBeFocused();

        // The columns are read at each key press, so a narrower grid is followed too.
        await page.setViewportSize({ width: 360, height: 740 });
        const narrowStart = await box(item(grid, "hero.jpg"));
        await page.keyboard.press("ArrowDown");
        const narrowLanded = await box(page.locator("[data-media-grid-item]:focus"));
        expect(narrowLanded.x).toBe(narrowStart.x);
        expect(narrowLanded.y).toBeGreaterThan(narrowStart.y);

        await expect(
            page.getByTestId("media-demo-selected"),
            "Moving focus does not select",
        ).toHaveText("team.png");
    });

    test("media: a broken image shows the fallback, and a video is a still with a badge", async ({
        page,
    }) => {
        const grid = library(page);
        const missing = item(grid, "missing.jpg");
        await missing.scrollIntoViewIfNeeded();
        await expect(missing.locator("[data-media-grid-fallback]")).toBeVisible();
        await expect(missing.locator("img")).toHaveCount(0);

        const video = item(grid, "launch.mp4, video");
        await expect(video.locator("[data-media-grid-video]")).toBeVisible();
        await expect(video.locator("video")).toHaveCount(0);
        expect(
            await video.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth),
            "The poster is what loads, not the video",
        ).toBeGreaterThan(0);
    });

    test("accessibility tree: toggle buttons in a named list, a video named as one", async ({
        page,
    }) => {
        const client = await page.context().newCDPSession(page);
        await client.send("Accessibility.enable");
        const { nodes } = await client.send("Accessibility.getFullAXTree");
        const exposed = nodes.filter((node) => !node.ignored);
        const pressedOf = (name: string) =>
            exposed
                .find((node) => node.role?.value === "button" && node.name?.value === name)
                ?.properties?.find((property) => property.name === "pressed")?.value.value;

        expect(
            exposed.some(
                (node) => node.role?.value === "list" && node.name?.value === "Media library",
            ),
        ).toBe(true);
        expect(pressedOf("team.png")).toBe("true");
        expect(pressedOf("hero.jpg")).toBe("false");
        expect(pressedOf("launch.mp4, video")).toBe("false");
        expect(
            exposed.some(
                (node) => node.role?.value === "button" && node.name?.value === "Delete hero.jpg",
            ),
        ).toBe(true);
    });

    test("delete: visible without hover, asks first, and focus lands on the neighbour when the dialog closes", async ({
        page,
    }) => {
        const grid = library(page);
        const remove = item(grid, "Delete hero.jpg");

        // No pointer anywhere near it, and it is there.
        await page.mouse.move(0, 0);
        await expect(remove).toBeVisible();
        expect(await remove.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
        const size = await box(remove);
        expect(Math.min(size.width, size.height)).toBeGreaterThanOrEqual(24);
        await expect(
            item(grid, "Delete logo.svg"),
            "An item in use has no delete button",
        ).toHaveCount(0);

        await remove.click();
        const dialog = page.getByRole("alertdialog");
        await expect(dialog).toBeVisible();
        await expect(
            page.getByTestId("media-demo-selected"),
            "Delete does not select the item",
        ).toHaveText("team.png");
        await expect(item(grid, "hero.jpg"), "Nothing is removed yet").toHaveCount(1);

        await dialog.getByRole("button", { name: "Delete" }).click();
        await expect(dialog).toBeHidden();
        await expect(item(grid, "hero.jpg")).toHaveCount(0);
        await expect(
            item(grid, "team.png"),
            "Focus goes to the item that took its place, not to <body>",
        ).toBeFocused();
    });

    test("delete: the Delete key asks too, and Cancel returns to where the user was", async ({
        page,
    }) => {
        const grid = library(page);
        await item(grid, "office.jpg").focus();
        await page.keyboard.press("Delete");
        const dialog = page.getByRole("alertdialog");
        await expect(dialog).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(dialog).toBeHidden();
        await expect(item(grid, "office.jpg")).toBeFocused();
        await expect(item(grid, "office.jpg")).toHaveCount(1);
    });

    test("states: placeholders with a status while loading, and an empty state", async ({
        page,
    }) => {
        const grid = page.getByTestId("media-demo-multiple");
        await grid.scrollIntoViewIfNeeded();
        await expect(grid.locator("[data-media-grid-skeleton]")).toHaveCount(0);

        await page.getByTestId("media-demo-toggle-loading").click();
        await expect(grid.locator("[data-media-grid-skeleton]")).toHaveCount(4);
        await expect(grid.getByRole("status")).toHaveText("Loading media");
        await expect(tiles(grid), "Loaded items stay").toHaveCount(6);
        const tile = await box(tiles(grid).nth(0));
        const skeleton = await box(grid.locator("[data-media-grid-skeleton]").nth(0));
        expect(Math.abs(skeleton.width - tile.width)).toBeLessThan(1);
        expect(Math.abs(skeleton.height - tile.height)).toBeLessThan(1);

        await page.getByTestId("media-demo-toggle-loading").click();
        await page.getByTestId("media-demo-toggle-empty").click();
        await expect(grid.getByRole("heading", { name: "No media yet" })).toBeVisible();
        await expect(tiles(grid)).toHaveCount(0);
    });

    test("in a Modal: fits at phone width, arrows move between items, and a choice closes it", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 360, height: 640 });
        const opener = page.getByTestId("media-demo-open-picker");
        await opener.scrollIntoViewIfNeeded();
        await opener.click();
        const dialog = page.getByRole("dialog", { name: "Media library" });
        await expect(dialog).toBeVisible();

        const first = item(dialog, "hero.jpg");
        await expect(first).toBeVisible();
        // The dialog scales in; measure once it has settled.
        await page.evaluate(() =>
            Promise.all(document.getAnimations().map((animation) => animation.finished)),
        );
        expect(
            await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
            "The grid must not make the dialog scroll sideways",
        ).toBe(true);
        const a = await box(tiles(dialog).nth(0));
        const b = await box(tiles(dialog).nth(1));
        expect(b.y, "Two columns fit in the dialog on a phone").toBe(a.y);

        await first.focus();
        await page.keyboard.press("ArrowRight");
        await expect(item(dialog, "team.png")).toBeFocused();
        await page.keyboard.press("ArrowDown");
        const landed = await box(dialog.locator("[data-media-grid-item]:focus"));
        expect(landed.x).toBe(b.x);
        expect(landed.y).toBeGreaterThan(b.y);

        await page.keyboard.press("Enter");
        await expect(dialog).toBeHidden();
        await expect(page.getByTestId("media-demo-picked")).not.toHaveText("nothing");
        await expect(opener, "Focus returns to the button that opened the picker").toBeFocused();
    });
});

test.describe("MediaGrid — keyboard hint and right-to-left", () => {
    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page);
    });

    test("hint: shown only while the grid has keyboard focus, and it describes the item Tab lands on", async ({
        page,
    }) => {
        const grid = library(page);
        const hint = grid.locator("[data-media-grid-hint]");
        await expect(hint).toBeHidden();

        // A pointer user never sees it.
        await item(grid, "office.jpg").click();
        await expect(hint).toBeHidden();
        await item(grid, "team.png").click();

        // What Chromium gives assistive technology for the Tab stop, hint hidden.
        await page.locator("body").click({ position: { x: 1, y: 1 } });
        const client = await page.context().newCDPSession(page);
        await client.send("Accessibility.enable");
        const descriptions = async () => {
            const { nodes } = await client.send("Accessibility.getFullAXTree");
            return nodes
                .filter(
                    (node) =>
                        !node.ignored &&
                        node.role?.value === "button" &&
                        node.description?.value ===
                            "Use the arrow keys to move between items.",
                )
                .map((node) => node.name?.value)
                // The page's other demo grids have a Tab stop of their own.
                .filter((name) => name === "team.png" || name === "office.jpg");
        };
        expect(await descriptions()).toEqual(["team.png"]);

        await item(grid, "team.png").focus();
        await page.keyboard.press("ArrowRight");
        await expect(item(grid, "office.jpg")).toBeFocused();
        await expect(hint).toBeVisible();
        await expect(hint).toHaveText("Use the arrow keys to move between items.");
        expect(
            await descriptions(),
            "The item arrowed to has no description to read again",
        ).toEqual(["team.png"]);

        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await expect(hint, "Gone again when keyboard focus leaves the grid").toBeHidden();
    });

    test("right-to-left: the delete button and the badges move to the other corner", async ({
        page,
    }) => {
        const grid = library(page);
        const tile = item(grid, "team.png");
        const remove = item(grid, "Delete team.png");
        const before = { tile: await box(tile), remove: await box(remove) };
        expect(
            before.tile.x + before.tile.width - (before.remove.x + before.remove.width),
            "Left-to-right: 4px inside the right edge",
        ).toBeCloseTo(4, 0);

        await grid.evaluate((el) => el.setAttribute("dir", "rtl"));
        const after = { tile: await box(tile), remove: await box(remove) };
        expect(
            after.remove.x - after.tile.x,
            "Right-to-left: 4px inside the left edge",
        ).toBeCloseTo(4, 0);
        const check = await box(tile.locator("[data-media-grid-check]"));
        expect(
            after.tile.x + after.tile.width - (check.x + check.width),
            "The check mark takes the right corner instead",
        ).toBeLessThan(8);
    });
});

test.describe("MediaGrid — coarse pointer", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 800 } });

    test("touch: the delete button takes taps in a 44px area, drawn at 28px, and the tile keeps the rest", async ({
        page,
    }) => {
        await gotoHydrated(page);
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
        const grid = library(page);
        const tile = item(grid, "office.jpg");
        const remove = item(grid, "Delete office.jpg");
        await tile.scrollIntoViewIfNeeded();
        const drawn = await box(remove);
        expect(drawn.width).toBe(28);
        expect(drawn.height).toBe(28);

        // Which element a tap at each point of the tile would reach.
        const report = await tile.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            let toDelete = 0;
            let toTile = 0;
            for (let x = Math.ceil(rect.left); x < rect.right; x += 1) {
                for (let y = Math.ceil(rect.top); y < rect.bottom; y += 1) {
                    const hit = document.elementFromPoint(x, y);
                    if (hit?.closest("[data-media-grid-delete]")) toDelete += 1;
                    else if (hit?.closest("[data-media-grid-item]") === el) toTile += 1;
                }
            }
            return { width: rect.width, toDelete, toTile };
        });
        console.log("MEDIAGRID-HIT", JSON.stringify(report));
        // 44px square, of which 4px hangs over the tile's edge on two sides.
        expect(report.toDelete).toBeGreaterThanOrEqual(39 * 39);
        expect(report.toDelete).toBeLessThanOrEqual(41 * 41);
        expect(
            report.toTile / (report.toTile + report.toDelete),
            "Most of the tile still selects",
        ).toBeGreaterThan(0.8);

        // A near miss, 6px outside the drawn button, asks to delete instead of selecting.
        await page.touchscreen.tap(drawn.x - 6, drawn.y + drawn.height + 6);
        const dialog = page.getByRole("alertdialog");
        await expect(dialog).toBeVisible();
        await expect(page.getByTestId("media-demo-selected")).toHaveText("team.png");
        await dialog.getByRole("button", { name: "Cancel" }).tap();
        await expect(dialog).toBeHidden();

        // The neighbouring tile is out of its reach.
        const neighbour = await page.evaluate(
            ([x, y]) =>
                document
                    .elementFromPoint(x, y)
                    ?.closest("[data-media-grid-item]")
                    ?.getAttribute("aria-label"),
            [drawn.x + drawn.width + 4 + 8 + 2, drawn.y + 10],
        );
        expect(neighbour).not.toBe("office.jpg");
    });
});

test.describe("MediaGrid — touch", () => {
    test.use({ hasTouch: true });

    test("touch: delete is there to tap, and tapping it does not select", async ({ page }) => {
        await gotoHydrated(page);
        const grid = library(page);
        const remove = item(grid, "Delete office.jpg");
        await expect(remove).toBeVisible();

        await remove.tap();
        const dialog = page.getByRole("alertdialog");
        await expect(dialog).toBeVisible();
        await expect(page.getByTestId("media-demo-selected")).toHaveText("team.png");
        await dialog.getByRole("button", { name: "Cancel" }).tap();
        await expect(dialog).toBeHidden();

        await item(grid, "office.jpg").tap();
        await expect(page.getByTestId("media-demo-selected")).toHaveText("office.jpg");
    });
});
