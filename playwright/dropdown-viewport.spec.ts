import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Dropdown near an edge of the screen.
 *
 * The menu was placed by a fixed class for its `placement`, wherever the
 * trigger was: under a trigger at the right edge of a phone it hung out of the
 * screen and widened the document. It now goes where it fits. jsdom has no
 * layout, so where the menu ends up is measured here; the arithmetic is unit
 * tested in tests/fit-in-viewport.test.ts.
 */

const LAB = "/chaos-lab/dropdown";
const MARGIN = 8;

async function gotoLab(page: Page) {
    await page.goto(LAB, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
}

const host = (page: Page, id: string) => page.getByTestId(`lab-${id}`);
const trigger = (page: Page, id: string) => host(page, id).getByRole("button").first();
/** The popup: the positioned box around the menu. */
const menuPanel = (page: Page, id: string) =>
    host(page, id).getByRole("menu").locator("xpath=..");

async function open(page: Page, id: string): Promise<Locator> {
    await trigger(page, id).scrollIntoViewIfNeeded();
    await trigger(page, id).click();
    await expect(menuPanel(page, id)).toBeVisible();
    return menuPanel(page, id);
}

async function box(locator: Locator) {
    return locator.evaluate((element) => {
        const { left, right, top, bottom, width, height } = element.getBoundingClientRect();
        return { left, right, top, bottom, width, height };
    });
}

const viewport = (page: Page) =>
    page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));

async function expectInside(page: Page, panel: Locator) {
    const rect = await box(panel);
    const screen = await viewport(page);
    expect(rect.left).toBeGreaterThanOrEqual(MARGIN - 0.5);
    expect(rect.right).toBeLessThanOrEqual(screen.width - MARGIN + 0.5);
    expect(rect.top).toBeGreaterThanOrEqual(MARGIN - 0.5);
    expect(rect.bottom).toBeLessThanOrEqual(screen.height - MARGIN + 0.5);
    // And it did not widen the page to get there.
    expect(screen.overflow).toBe(0);
}

for (const width of [375, 320]) {
    test.describe(`Dropdown at ${width}px`, () => {
        test.use({ viewport: { width, height: 667 }, hasTouch: true, isMobile: true });

        test("finding 10: a menu that would leave the screen at the end opens from the other edge", async ({
            page,
        }) => {
            await gotoLab(page);
            const panel = await open(page, "start-at-end");
            await expectInside(page, panel);
            await expect(panel).toHaveAttribute("data-resolved-placement", "bottom-end");
            // The prop is still the side that was asked for.
            await expect(host(page, "start-at-end").locator("[data-placement]")).toHaveAttribute(
                "data-placement",
                "bottom-start",
            );
            // Flush with the trigger's end edge, as `bottom-end` always is.
            const rect = await box(panel);
            const button = await box(trigger(page, "start-at-end"));
            expect(rect.right).toBeCloseTo(button.right, 0);
            expect(rect.top).toBeCloseTo(button.bottom + 8, 0);
        });

        test("finding 10: and one that would leave it at the start, likewise", async ({ page }) => {
            await gotoLab(page);
            const panel = await open(page, "end-at-start");
            await expectInside(page, panel);
            await expect(panel).toHaveAttribute("data-resolved-placement", "bottom-start");
        });

        test("a menu that fits is exactly where its placement puts it, with no inline style", async ({
            page,
        }) => {
            await gotoLab(page);
            for (const [id, placement] of [
                ["start-fits", "bottom-start"],
                ["end-fits", "bottom-end"],
            ] as const) {
                const panel = await open(page, id);
                await expect(panel).toHaveAttribute("data-resolved-placement", placement);
                expect((await panel.getAttribute("style")) ?? "").toBe("");
                const rect = await box(panel);
                const button = await box(trigger(page, id));
                expect(rect.top).toBeCloseTo(button.bottom + 8, 0);
                if (placement === "bottom-start") expect(rect.left).toBeCloseTo(button.left, 0);
                else expect(rect.right).toBeCloseTo(button.right, 0);
                await page.keyboard.press("Escape");
                await expect(panel).toHaveCount(0);
            }
        });

        test("a menu taller than the room it has scrolls inside itself", async ({ page }) => {
            await gotoLab(page);
            const panel = await open(page, "long");
            await expectInside(page, panel);
            // The list inside the menu is what scrolls, not the panel with the round corners.
            const scroll = await panel.locator("[data-dropdown-scroller]").evaluate((element) => ({
                scrolls: element.scrollHeight > element.clientHeight,
                overflowY: getComputedStyle(element).overflowY,
            }));
            expect(scroll.scrolls).toBe(true);
            expect(scroll.overflowY).toBe("auto");
            expect(await panel.evaluate((element) => getComputedStyle(element).overflowY)).toBe("visible");

            // The keyboard still reaches every item, and the focused one is brought into view.
            await page.keyboard.press("End");
            const last = panel.getByRole("menuitem", { name: "Team 24" });
            await expect(last).toBeFocused();
            const item = await box(last);
            const rect = await box(panel);
            expect(item.bottom).toBeLessThanOrEqual(rect.bottom + 0.5);
            expect(item.top).toBeGreaterThanOrEqual(rect.top - 0.5);
        });

        test("a menu with no room below opens above its trigger", async ({ page }) => {
            await gotoLab(page);
            await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
            const panel = await open(page, "bottom");
            await expectInside(page, panel);
            await expect(panel).toHaveAttribute("data-resolved-placement", "top-end");
            const rect = await box(panel);
            const button = await box(trigger(page, "bottom"));
            expect(rect.bottom).toBeCloseTo(button.top - 8, 0);
        });

        test("right to left: the start edge is the right one, and the menu stays inside there too", async ({
            page,
        }) => {
            await gotoLab(page);
            // Mid-screen, so there is room below whatever else is on the lab page.
            await trigger(page, "rtl-fits").evaluate((element) =>
                element.scrollIntoView({ block: "center", behavior: "instant" }),
            );
            const fits = await open(page, "rtl-fits");
            await expect(fits).toHaveAttribute("data-resolved-placement", "bottom-start");
            const rect = await box(fits);
            const button = await box(trigger(page, "rtl-fits"));
            expect(rect.right).toBeCloseTo(button.right, 0);
            await page.keyboard.press("Escape");

            const panel = await open(page, "rtl-at-end");
            await expectInside(page, panel);
            await expect(panel).toHaveAttribute("data-resolved-placement", "bottom-end");
        });

        test("arrow keys keep their order and Escape returns focus, also for a menu that was moved", async ({
            page,
        }) => {
            await gotoLab(page);
            await trigger(page, "start-at-end").focus();
            await page.keyboard.press("ArrowDown");
            const panel = menuPanel(page, "start-at-end");
            await expect(panel).toBeVisible();
            const items = panel.getByRole("menuitem");
            await expect(items.nth(0)).toBeFocused();
            await page.keyboard.press("ArrowDown");
            await expect(items.nth(1)).toBeFocused();
            await page.keyboard.press("ArrowUp");
            await page.keyboard.press("ArrowUp");
            await expect(items.nth(3)).toBeFocused();
            await page.keyboard.press("Escape");
            await expect(panel).toHaveCount(0);
            await expect(trigger(page, "start-at-end")).toBeFocused();
        });
    });
}

test.describe("Dropdown on a short, wide screen", () => {
    test.use({ viewport: { width: 568, height: 320 }, hasTouch: true, isMobile: true });

    test("a long menu is limited to the room there is and scrolls", async ({ page }) => {
        await gotoLab(page);
        const panel = await open(page, "long");
        await expectInside(page, panel);
        expect(
            await panel
                .locator("[data-dropdown-scroller]")
                .evaluate((element) => element.scrollHeight > element.clientHeight),
        ).toBe(true);
    });
});

/**
 * A menu limited in height used to scroll as a whole: the panel itself had
 * `overflow: auto`, so its scrollbar was drawn in the panel's square box, on
 * and outside the 16px corners, and over the focus ring of the first and the
 * last item. The list inside the panel scrolls now, and that box is clear of
 * the corners and has room for a ring.
 */
for (const size of [
    { width: 1280, height: 420 },
    { width: 320, height: 568 },
]) {
    test.describe(`A menu limited in height, ${size.width} by ${size.height}`, () => {
        test.use({ viewport: size });

        test("the box that scrolls is inside the panel's corners, with room for a focus ring", async ({
            page,
        }) => {
            await gotoLab(page);
            const panel = await open(page, "long");
            const scroller = panel.locator("[data-dropdown-scroller]");
            expect(await scroller.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);

            for (const key of ["End", "Home"]) {
                await page.keyboard.press(key);
                const geometry = await panel.evaluate((element) => {
                    const list = element.querySelector<HTMLElement>("[data-dropdown-scroller]")!;
                    const item = document.activeElement as HTMLElement;
                    const style = getComputedStyle(item);
                    const side = (box: DOMRect) => ({
                        left: box.left,
                        right: box.right,
                        top: box.top,
                        bottom: box.bottom,
                    });
                    return {
                        panel: side(element.getBoundingClientRect()),
                        list: side(list.getBoundingClientRect()),
                        item: side(item.getBoundingClientRect()),
                        focused: item.getAttribute("role"),
                        radius: parseFloat(getComputedStyle(element).borderTopRightRadius),
                        // How far the ring reaches past the item's own box.
                        ring: parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset),
                    };
                });
                expect(geometry.focused, key).toBe("menuitem");
                expect(geometry.radius, key).toBe(16);

                // A scrollbar is drawn at the right edge of the box that scrolls. Where that
                // box begins and ends, the panel's curve has to have come in less than the box has.
                const inset = geometry.panel.right - geometry.list.right;
                for (const fromCorner of [
                    geometry.list.top - geometry.panel.top,
                    geometry.panel.bottom - geometry.list.bottom,
                ]) {
                    const short = Math.max(0, geometry.radius - fromCorner);
                    const curve = geometry.radius - Math.sqrt(geometry.radius ** 2 - short ** 2);
                    expect(inset, `${key}: scroll box ${inset}px in, curve ${curve}px in`).toBeGreaterThan(curve);
                }

                // The focused item's ring is inside the box that scrolls, on every side it is near.
                expect(geometry.item.right + geometry.ring, key).toBeLessThanOrEqual(geometry.list.right + 0.5);
                expect(geometry.item.left - geometry.ring, key).toBeGreaterThanOrEqual(geometry.list.left - 0.5);
                expect(geometry.item.bottom + geometry.ring, key).toBeLessThanOrEqual(geometry.list.bottom + 0.5);
                expect(geometry.item.top - geometry.ring, key).toBeGreaterThanOrEqual(geometry.list.top - 0.5);
            }
        });
    });
}

test.describe("Dropdown at 320px with text at 200%", () => {
    test.use({ viewport: { width: 320, height: 568 } });

    for (const id of ["start-at-end", "end-at-start", "long", "rtl-at-end"]) {
        test(`${id}: the menu is narrowed to the screen, whatever its minimum width`, async ({ page }) => {
            await gotoLab(page);
            // The menu's minimum width is 12rem: 384px now, on a 320px screen.
            await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
            // The lab's own rows are wider than the screen at this size; the menu must add nothing.
            const before = (await viewport(page)).overflow;
            const panel = await open(page, id);
            const rect = await box(panel);
            const screen = await viewport(page);
            expect(rect.left).toBeGreaterThanOrEqual(MARGIN - 0.5);
            expect(rect.right).toBeLessThanOrEqual(screen.width - MARGIN + 0.5);
            expect(rect.top).toBeGreaterThanOrEqual(MARGIN - 0.5);
            expect(rect.bottom).toBeLessThanOrEqual(screen.height - MARGIN + 0.5);
            expect(rect.width).toBeCloseTo(screen.width - MARGIN * 2, 0);
            expect(screen.overflow).toBeLessThanOrEqual(before);
            // Every item can still be reached: the menu scrolls inside itself.
            await panel.getByRole("menuitem").last().scrollIntoViewIfNeeded();
            const last = await box(panel.getByRole("menuitem").last());
            expect(last.bottom).toBeLessThanOrEqual(rect.bottom + 0.5);
        });
    }
});

test.describe("Dropdown on a desktop screen", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("placement is unchanged where the menu fits", async ({ page }) => {
        await gotoLab(page);
        const panel = await open(page, "start-fits");
        await expect(panel).toHaveAttribute("data-resolved-placement", "bottom-start");
        expect((await panel.getAttribute("style")) ?? "").toBe("");
        const rect = await box(panel);
        const button = await box(trigger(page, "start-fits"));
        expect(rect.left).toBeCloseTo(button.left, 0);
        expect(rect.top).toBeCloseTo(button.bottom + 8, 0);
    });

    test("the menu is not seen on the wrong side first", async ({ page }) => {
        await gotoLab(page);
        // Record every position the menu is painted at, from the frame it appears.
        await page.evaluate(() => {
            const seen: number[] = [];
            (window as unknown as { __rights: number[] }).__rights = seen;
            const watch = () => {
                const panel = document.querySelector(
                    '[data-testid="lab-start-at-end"] [role="menu"]',
                )?.parentElement;
                if (panel) seen.push(Math.round(panel.getBoundingClientRect().right));
                requestAnimationFrame(watch);
            };
            requestAnimationFrame(watch);
        });
        await open(page, "start-at-end");
        await page.waitForTimeout(400);
        const rights = await page.evaluate(
            () => (window as unknown as { __rights: number[] }).__rights,
        );
        const limit = (await viewport(page)).width - MARGIN;
        expect(rights.length).toBeGreaterThan(3);
        // Never past the edge, and never moving: no slide from the wrong place.
        expect(Math.max(...rights)).toBeLessThanOrEqual(limit);
        expect(new Set(rights).size).toBe(1);
    });

    test("an open menu follows the screen when it gets narrower", async ({ page }) => {
        await gotoLab(page);
        const panel = await open(page, "start-at-end");
        await expectInside(page, panel);
        await page.setViewportSize({ width: 320, height: 640 });
        await expect(async () => {
            await expectInside(page, panel);
        }).toPass({ timeout: 5_000 });
    });
});
