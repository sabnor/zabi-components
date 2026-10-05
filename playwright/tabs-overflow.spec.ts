import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Tabs that do not fit their row.
 *
 * The tablist neither wrapped nor scrolled: in the 160px card of the docs page
 * at 320px its third tab ended 94px outside the card. The list now scrolls
 * sideways, fades the edge that has more beyond it, and keeps the selected and
 * the focused tab in view. `fullWidth` shares the row between two or three
 * tabs. The lab page (/chaos-lab/tabs) has one list of each kind.
 */

const LAB = "/chaos-lab/tabs";

async function gotoLab(page: Page) {
    await page.goto(LAB, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
}

const section = (page: Page, id: string) => page.getByTestId(`lab-${id}`);
const scroller = (page: Page, id: string) => section(page, id).locator(".tabs-list");
const tab = (page: Page, id: string, name: string) =>
    section(page, id).getByRole("tab", { name, exact: true });

/** How the list is scrolled and which edges fade. */
const state = (list: Locator) =>
    list.evaluate((element) => ({
        hidden: element.scrollWidth - element.clientWidth,
        scrollLeft: element.scrollLeft,
        fadeLeft: element.hasAttribute("data-fade-left"),
        fadeRight: element.hasAttribute("data-fade-right"),
        mask: getComputedStyle(element).maskImage,
    }));

/** Whether `item` is wholly inside what the list shows, inside the fade. */
async function inView(list: Locator, item: Locator, inset = 0) {
    const [outer, inner] = await Promise.all([list.boundingBox(), item.boundingBox()]);
    return (
        inner!.x >= outer!.x + inset - 0.5 && inner!.x + inner!.width <= outer!.x + outer!.width - inset + 0.5
    );
}

const pageOverflow = (page: Page) =>
    page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

test.describe("Tabs on the docs page at 320px", () => {
    test.use({ viewport: { width: 320, height: 640 }, hasTouch: true, isMobile: true });

    test("finding 16: the list scrolls inside its card instead of running out of it", async ({ page }) => {
        await page.goto("/components/Tabs", { waitUntil: "domcontentloaded" });
        const list = page.locator("main .min-h-\\[100px\\]").getByRole("tablist").first();
        await expect(list).toBeVisible();
        const tabs = list.getByRole("tab");
        await expect(tabs).toHaveCount(3);

        // No tab is drawn outside the tablist's own box: what does not fit is clipped and scrollable.
        const measured = await list.evaluate((element) => {
            const box = element.getBoundingClientRect();
            const inner = element.querySelector<HTMLElement>(".tabs-list");
            return {
                width: box.width,
                scrollable: inner ? inner.scrollWidth > inner.clientWidth : false,
                overflowX: inner ? getComputedStyle(inner).overflowX : "none",
            };
        });
        expect(measured.width).toBeLessThan(200);
        expect(measured.scrollable).toBe(true);
        expect(measured.overflowX).toBe("auto");

        // The last tab can be reached, and is then inside the card.
        await expect(async () => {
            await tabs.nth(0).focus();
            await page.keyboard.press("End");
            await expect(tabs.nth(2)).toBeFocused({ timeout: 1_000 });
        }).toPass({ timeout: 30_000 });
        await expect
            .poll(async () => {
                const outer = (await list.boundingBox())!;
                const last = (await tabs.nth(2).boundingBox())!;
                return last.x + last.width <= outer.x + outer.width + 4.5 && last.x >= outer.x - 4.5;
            })
            .toBe(true);
    });
});

for (const width of [375, 320]) {
    test.describe(`Tabs at ${width}px`, () => {
        test.use({ viewport: { width, height: 667 }, hasTouch: true, isMobile: true });

        test("a list that does not fit scrolls sideways with no scrollbar, and the page does not", async ({
            page,
        }) => {
            await gotoLab(page);
            const list = scroller(page, "overflow");
            const style = await list.evaluate((element) => {
                const computed = getComputedStyle(element);
                return {
                    overflowX: computed.overflowX,
                    scrollbar: computed.scrollbarWidth,
                    height: element.offsetHeight - element.clientHeight,
                };
            });
            expect(style.overflowX).toBe("auto");
            expect(style.scrollbar).toBe("none");
            // No scrollbar takes height from the row.
            expect(style.height).toBe(0);
            expect((await state(list)).hidden).toBeGreaterThan(100);
            expect(await pageOverflow(page)).toBe(0);
        });

        test("only an edge with more tabs beyond it fades", async ({ page }) => {
            await gotoLab(page);
            const list = scroller(page, "overflow");
            const start = await state(list);
            expect(start.scrollLeft).toBe(0);
            expect([start.fadeLeft, start.fadeRight]).toEqual([false, true]);
            expect(start.mask).toContain("linear-gradient");

            await list.evaluate((element) => element.scrollTo({ left: 60, behavior: "instant" }));
            await expect.poll(async () => (await state(list)).fadeLeft).toBe(true);
            expect((await state(list)).fadeRight).toBe(true);

            await list.evaluate((element) =>
                element.scrollTo({ left: element.scrollWidth, behavior: "instant" }),
            );
            await expect.poll(async () => (await state(list)).fadeRight).toBe(false);
            expect((await state(list)).fadeLeft).toBe(true);
        });

        test("a list that fits has no fade, no mask and nothing to scroll", async ({ page }) => {
            await gotoLab(page);
            const fits = await state(scroller(page, "fits"));
            expect(fits.hidden).toBeLessThanOrEqual(0);
            expect([fits.fadeLeft, fits.fadeRight]).toEqual([false, false]);
            expect(fits.mask).toBe("none");
        });

        test("the selected tab is in view when the list mounts, and the page is not scrolled to it", async ({
            page,
        }) => {
            await gotoLab(page);
            const list = scroller(page, "starts-at-end");
            const selected = tab(page, "starts-at-end", "Settings");
            await expect(selected).toHaveAttribute("aria-selected", "true");
            expect(await inView(list, selected)).toBe(true);
            expect((await state(list)).scrollLeft).toBeGreaterThan(100);
            expect(await page.evaluate(() => window.scrollY)).toBe(0);
        });

        test("arrow keys move and select as before, skip a disabled tab, and keep the focused tab in view", async ({
            page,
        }) => {
            await gotoLab(page);
            // Instant scrolling, so each step can be measured as soon as it is made.
            await page.emulateMedia({ reducedMotion: "reduce" });
            const list = scroller(page, "overflow");
            await tab(page, "overflow", "Overview").focus();

            const order = ["Schedule", "Teams", "Standings", "Venues", "Archive", "Settings"];
            for (const name of order) {
                await page.keyboard.press("ArrowRight");
                await expect(tab(page, "overflow", name)).toBeFocused();
                await expect(tab(page, "overflow", name)).toHaveAttribute("aria-selected", "true");
                expect(await inView(list, tab(page, "overflow", name)), name).toBe(true);
            }
            await expect(page.getByTestId("lab-overflow-panel")).toHaveText("settings");

            // Wraps to the first, which is scrolled back into view.
            await page.keyboard.press("ArrowRight");
            await expect(tab(page, "overflow", "Overview")).toBeFocused();
            expect(await inView(list, tab(page, "overflow", "Overview"))).toBe(true);
            expect((await state(list)).scrollLeft).toBe(0);

            await page.keyboard.press("End");
            await expect(tab(page, "overflow", "Settings")).toBeFocused();
            expect(await inView(list, tab(page, "overflow", "Settings"))).toBe(true);
            await page.keyboard.press("Home");
            await expect(tab(page, "overflow", "Overview")).toBeFocused();
            await page.keyboard.press("ArrowLeft");
            await expect(tab(page, "overflow", "Settings")).toBeFocused();

            // The tablist is still one Tab stop, and the scrolling box is not one.
            await page.keyboard.press("Tab");
            expect(
                await section(page, "overflow")
                    .getByRole("tablist")
                    .evaluate((element) => element.contains(document.activeElement)),
            ).toBe(false);
        });

        test("pressing the selected tab changes nothing", async ({ page }) => {
            await gotoLab(page);
            const selected = tab(page, "overflow", "Overview");
            await selected.tap();
            await selected.tap();
            await expect(selected).toHaveAttribute("aria-selected", "true");
            await expect(page.getByTestId("lab-overflow-panel")).toHaveText("overview");
            await expect(section(page, "overflow").getByRole("tab", { selected: true })).toHaveCount(1);
        });

        test("a tap on a tab cut off by the edge selects it and brings it into view", async ({ page }) => {
            await gotoLab(page);
            await page.emulateMedia({ reducedMotion: "reduce" });
            const list = scroller(page, "overflow");
            const names = (await section(page, "overflow").getByRole("tab").allTextContents()).map(
                (text) => text.trim(),
            );
            // A tab that straddles the edge: partly shown, partly cut off.
            const straddler = async () => {
                const outer = (await list.boundingBox())!;
                const edge = outer.x + outer.width;
                for (const name of names) {
                    const item = (await tab(page, "overflow", name).boundingBox())!;
                    if (item.x < edge - 16 && item.x + item.width > edge + 4) return { name, item };
                }
                return null;
            };
            let found = await straddler();
            if (!found) {
                // The edge fell between two tabs: move the list a little so one straddles it.
                await list.evaluate((element) => element.scrollBy({ left: 30, behavior: "instant" }));
                found = await straddler();
            }
            expect(found).not.toBeNull();
            const cut = found!.name;
            const box = found!.item;
            await page.touchscreen.tap(box.x + 8, box.y + box.height / 2);
            await expect(tab(page, "overflow", cut)).toHaveAttribute("aria-selected", "true");
            await expect.poll(() => inView(list, tab(page, "overflow", cut))).toBe(true);
        });

        test("fullWidth: the tabs share the row equally and nothing scrolls", async ({ page }) => {
            await gotoLab(page);
            const list = scroller(page, "shared");
            const widths = await section(page, "shared")
                .getByRole("tab")
                .evaluateAll((tabs) => tabs.map((element) => element.getBoundingClientRect().width));
            expect(widths).toHaveLength(3);
            expect(widths[1]).toBeCloseTo(widths[0], 0);
            expect(widths[2]).toBeCloseTo(widths[0], 0);
            const row = (await section(page, "shared").getByRole("tablist").boundingBox())!;
            expect(widths[0] * 3).toBeCloseTo(row.width, 0);
            expect((await state(list)).hidden).toBeLessThanOrEqual(0);
            expect((await state(list)).mask).toBe("none");

            // Without it, the same three tabs are as wide as their labels.
            const natural = await section(page, "fits")
                .getByRole("tab")
                .evaluateAll((tabs) => tabs.map((element) => element.getBoundingClientRect().width));
            expect(Math.max(...natural)).toBeLessThan(widths[0]);

            await tab(page, "shared", "Map").tap();
            await expect(page.getByTestId("lab-shared-panel")).toHaveText("map");
        });

        test("right to left: the list starts at the right, and the fade is on the left", async ({ page }) => {
            await gotoLab(page);
            const list = scroller(page, "rtl");
            const first = (await tab(page, "rtl", "Overview").boundingBox())!;
            const second = (await tab(page, "rtl", "Schedule").boundingBox())!;
            expect(first.x).toBeGreaterThan(second.x);
            const start = await state(list);
            expect([start.fadeLeft, start.fadeRight]).toEqual([true, false]);

            await page.emulateMedia({ reducedMotion: "reduce" });
            await tab(page, "rtl", "Overview").focus();
            await page.keyboard.press("End");
            await expect(tab(page, "rtl", "Settings")).toBeFocused();
            expect(await inView(list, tab(page, "rtl", "Settings"))).toBe(true);
            await expect.poll(async () => (await state(list)).fadeRight).toBe(true);
            expect((await state(list)).fadeLeft).toBe(false);
        });

        test("the focus ring is not clipped, and the line under the tabs stays where it was", async ({
            page,
        }) => {
            await gotoLab(page);
            const geometry = await section(page, "overflow")
                .getByRole("tablist")
                .evaluate((list) => {
                    const inner = list.querySelector<HTMLElement>(".tabs-list")!;
                    const first = inner.querySelector<HTMLElement>('[role="tab"]')!;
                    const outer = list.getBoundingClientRect();
                    const box = inner.getBoundingClientRect();
                    const item = first.getBoundingClientRect();
                    const style = getComputedStyle(list);
                    return {
                        // Room around the tabs inside the clipping box, on each side.
                        above: item.top - box.top,
                        below: box.bottom - item.bottom,
                        before: item.left - box.left,
                        // The tab's foot against the 1px line under the list.
                        gap: outer.bottom - parseFloat(style.borderBottomWidth) - item.bottom,
                        line: style.borderBottomWidth,
                        // The first tab starts where the row starts.
                        indent: item.left - outer.left,
                    };
                });
            // The ring is 4px outside the tab.
            expect(geometry.above).toBeGreaterThanOrEqual(4);
            expect(geometry.below).toBeGreaterThanOrEqual(4);
            expect(geometry.before).toBeGreaterThanOrEqual(4);
            expect(geometry.gap).toBeCloseTo(0, 0);
            expect(geometry.line).toBe("1px");
            expect(geometry.indent).toBeCloseTo(0, 0);
        });

        test("forced colours: no fade, so a label at the edge is cut off whole and readable", async ({
            page,
        }) => {
            await page.emulateMedia({ forcedColors: "active" });
            await gotoLab(page);
            const forced = await state(scroller(page, "overflow"));
            expect(forced.fadeRight).toBe(true);
            expect(forced.mask).toBe("none");
        });

        test("without reduced motion a key press scrolls smoothly; with it, at once", async ({ page }) => {
            await gotoLab(page);
            const list = scroller(page, "overflow");
            // Record where the list is on every frame after End is pressed on the first tab.
            const frames = async () => {
                await tab(page, "overflow", "Overview").tap();
                await list.evaluate((element) => element.scrollTo({ left: 0, behavior: "instant" }));
                await page.evaluate(() => {
                    const element = document.querySelector<HTMLElement>(
                        '[data-testid="lab-overflow"] .tabs-list',
                    )!;
                    const seen: number[] = [];
                    (window as unknown as { __seen: number[] }).__seen = seen;
                    const watch = () => {
                        seen.push(Math.round(element.scrollLeft));
                        if (seen.length < 90) requestAnimationFrame(watch);
                    };
                    requestAnimationFrame(watch);
                });
                await page.keyboard.press("End");
                await expect(tab(page, "overflow", "Settings")).toBeFocused();
                await expect.poll(async () => (await state(list)).fadeRight).toBe(false);
                await page.waitForTimeout(300);
                const seen = await page.evaluate(
                    () => (window as unknown as { __seen: number[] }).__seen,
                );
                // Positions strictly between the start and the end: frames of an animation.
                const end = Math.max(...seen);
                return seen.filter((left) => left > 2 && left < end - 2).length;
            };
            expect(await frames()).toBeGreaterThan(2);

            await page.emulateMedia({ reducedMotion: "reduce" });
            expect(await frames()).toBe(0);
        });
    });
}

test.describe("Tabs on a desktop screen", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("eight tabs fit: no scroll, no fade, and tabs the size they were", async ({ page }) => {
        await gotoLab(page);
        for (const id of ["fits", "overflow", "pills"]) {
            const list = await state(scroller(page, id));
            expect(list.hidden, id).toBeLessThanOrEqual(0);
            expect([list.fadeLeft, list.fadeRight], id).toEqual([false, false]);
            expect(list.mask, id).toBe("none");
        }
        const first = (await tab(page, "fits", "List").boundingBox())!;
        const row = (await section(page, "fits").getByRole("tablist").boundingBox())!;
        // 38px tall, flush with the start of the row, the row 39px with its line.
        expect(first.height).toBe(38);
        expect(first.x).toBeCloseTo(row.x, 0);
        expect(row.height).toBe(39);
        expect(await pageOverflow(page)).toBe(0);
    });
});
