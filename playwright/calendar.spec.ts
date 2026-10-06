import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Calendar in a real browser: the parts jsdom cannot show.
 *
 * The grid is its geometry: seven columns that share whatever width there
 * is, days that take a touch edge to edge, a number and dots that both fit.
 * And only a browser moves focus across a month that is replaced under it.
 *
 * The clock is fixed at Monday 5 October 2026, so "today" is a known day.
 *
 * The docs card the example sits in is narrower than a phone at phone width.
 * Where a test needs the calendar at the width it has on a phone, the page is
 * wide and the example is set to that width: 343px for a 375px screen with
 * 16px margins, 288px for a 320px one.
 */

const ON_375 = 343;
const ON_320 = 288;

const demo = (page: Page) => page.getByTestId("calendar-demo");
const grid = (page: Page) => demo(page).getByRole("grid");
const day = (page: Page, date: string) => demo(page).locator(`[data-date="${date}"]`);
const title = (page: Page) => demo(page).locator("[aria-live]").first();
const list = (page: Page) => page.getByTestId("calendar-demo-events");
const next = (page: Page) => demo(page).getByRole("button", { name: "Go to next month" });
const previous = (page: Page) => demo(page).getByRole("button", { name: "Go to previous month" });

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

/** The page is usable before it hydrates; a press that lands early selects nothing. */
async function open(page: Page) {
    await page.clock.setFixedTime(new Date(2026, 9, 5, 12, 0));
    await page.goto("/components/Calendar", { waitUntil: "domcontentloaded" });
    // Hydrated once today is marked: the server does not mark it.
    await expect(day(page, "2026-10-05")).toHaveAttribute("aria-current", "date", { timeout: 30_000 });
}

/** The example at the width a phone gives it, on a page wide enough to hold it. */
async function atWidth(page: Page, width: number) {
    await page.setViewportSize({ width: 1000, height: 900 });
    await demo(page).evaluate((el, px) => {
        (el as HTMLElement).style.width = `${px}px`;
        (el as HTMLElement).style.minWidth = "0";
    }, width);
    await demo(page).scrollIntoViewIfNeeded();
}

test.describe("Calendar — touch", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 375, height: 740 } });

    test.beforeEach(async ({ page }) => {
        await open(page);
    });

    test("tap selects a day and the page lists its events; a repeat tap changes nothing", async ({
        page,
    }) => {
        await expect(list(page)).toContainText("Quiz at The Crown");
        await expect(list(page)).toContainText("Music quiz");

        await day(page, "2026-10-10").tap();
        await expect(day(page, "2026-10-10")).toHaveAttribute("data-selected", "");
        await expect(list(page)).toContainText("Saturday 10 October", { ignoreCase: true });
        await expect(list(page)).toContainText("Team meetup");
        await expect(demo(page).locator("[data-selected]")).toHaveCount(1);

        // Again, and again: still selected, the list still there.
        await day(page, "2026-10-10").tap();
        await day(page, "2026-10-10").tap();
        await expect(day(page, "2026-10-10")).toHaveAttribute("data-selected", "");
        await expect(day(page, "2026-10-10").locator("xpath=..")).toHaveAttribute("aria-selected", "true");
        await expect(list(page)).toContainText("Team meetup");

        await day(page, "2026-10-12").tap();
        await expect(list(page)).toContainText("No quizzes on this day.");
        await expect(demo(page).locator("[data-selected]")).toHaveCount(1);
    });

    test("the month buttons change the month, announce it, and keep the selection", async ({ page }) => {
        await expect(title(page)).toHaveText("October 2026");
        await expect(grid(page)).toHaveAccessibleName("October 2026");
        await next(page).tap();
        await expect(title(page)).toHaveText("November 2026");
        await expect(grid(page)).toHaveAccessibleName("November 2026");
        await expect(demo(page).locator("[data-date]")).toHaveCount(30);
        await expect(day(page, "2026-11-03").locator(".dot")).toHaveCount(1);
        // The selected day is in October: still selected, and its events still listed.
        await expect(list(page)).toContainText("Quiz at The Crown");

        await previous(page).tap();
        await expect(title(page)).toHaveText("October 2026");
        await expect(day(page, "2026-10-06")).toHaveAttribute("data-selected", "");
    });

    test("every day and both buttons take a touch across 44px, with the days edge to edge", async ({
        page,
    }) => {
        for (const button of [previous(page), next(page)]) {
            const rect = await box(button);
            expect(rect.width).toBeGreaterThanOrEqual(44);
            expect(rect.height).toBeGreaterThanOrEqual(44);
        }
        const first = await box(day(page, "2026-10-05"));
        const beside = await box(day(page, "2026-10-06"));
        const below = await box(day(page, "2026-10-12"));
        expect(first.width).toBeGreaterThanOrEqual(44);
        expect(first.height).toBeGreaterThanOrEqual(44);
        expect(Math.abs(first.x + first.width - beside.x), "No gap beside").toBeLessThanOrEqual(0.5);
        expect(Math.abs(first.y + first.height - below.y), "No gap below").toBeLessThanOrEqual(0.5);
    });

    test("names: the full date, what is true of it, and its events", async ({ page }) => {
        await expect(day(page, "2026-10-05")).toHaveAccessibleName("Monday, 5 October 2026, this is today");
        await expect(day(page, "2026-10-06")).toHaveAccessibleName(
            "Tuesday, 6 October 2026, picked, 2 on the list: Quiz at The Crown, Music quiz",
        );
        await expect(day(page, "2026-10-17")).toHaveAccessibleName(
            "Saturday, 17 October 2026, 4 on the list: Quarter-final, Semi-final, Final, After-party",
        );
        // Four events, three dots.
        await expect(day(page, "2026-10-17").locator(".dot")).toHaveCount(3);
        await expect(demo(page).getByRole("columnheader")).toHaveCount(7);
        await expect(demo(page).getByRole("gridcell")).toHaveCount(35);
    });
});

test.describe("Calendar — sizes on a phone", () => {
    test.beforeEach(async ({ page }) => {
        await open(page);
    });

    for (const [screen, width] of [
        [375, ON_375],
        [320, ON_320],
    ] as const) {
        test(`on a ${screen}px screen (${width}px wide): seven equal days, 44px tall, never under 40px wide`, async ({
            page,
        }) => {
            await atWidth(page, width);
            expect(Math.round((await box(grid(page))).width)).toBe(width);
            expect(await demo(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);

            const week = [];
            for (const date of ["2026-10-05", "2026-10-06", "2026-10-07", "2026-10-08", "2026-10-09", "2026-10-10", "2026-10-11"]) {
                week.push(await box(day(page, date)));
            }
            for (const rect of week) {
                expect(rect.width).toBeCloseTo(width / 7, 0);
                expect(rect.width).toBeGreaterThanOrEqual(40);
                expect(Math.round(rect.height)).toBe(44);
            }
            // Edge to edge: each day starts where the one before ends, and the
            // row spans the grid.
            for (let index = 1; index < week.length; index += 1) {
                expect(Math.abs(week[index].x - (week[index - 1].x + week[index - 1].width))).toBeLessThanOrEqual(0.5);
            }
            const table = await box(grid(page));
            expect(Math.abs(week[0].x - table.x)).toBeLessThanOrEqual(0.5);
            expect(Math.abs(week[6].x + week[6].width - (table.x + table.width))).toBeLessThanOrEqual(0.5);

            // The whole of a day takes the press: its very corner selects it.
            const corner = week[3];
            await page.mouse.click(corner.x + 1, corner.y + 1);
            await expect(day(page, "2026-10-08")).toHaveAttribute("data-selected", "");
        });
    }

    test("radius: the day is a square cell, its face is rounded 2px inside it, and the dots sit inside that", async ({
        page,
    }) => {
        await atWidth(page, ON_375);
        const button = day(page, "2026-10-06");
        const face = button.locator(".face");
        const outer = await box(button);
        const inner = await box(face);
        expect(Math.round(inner.x - outer.x)).toBe(2);
        expect(Math.round(inner.y - outer.y)).toBe(2);
        const radius = (locator: Locator) =>
            locator.evaluate((el) => parseFloat(getComputedStyle(el).borderTopLeftRadius));
        // Square outside, so the corners of a cell take a press too.
        expect(await radius(button)).toBe(0);
        expect(await radius(face)).toBe(8);

        // A 4px dot, 2px at its ends, 5px above the bottom of the face: 7px, within the 8px radius.
        const dot = await box(button.locator(".dot").first());
        expect(Math.round(dot.height)).toBe(4);
        const gap = Math.round(inner.y + inner.height - (dot.y + dot.height));
        expect(gap).toBe(5);
        expect(dot.height / 2 + gap).toBeLessThanOrEqual(await radius(face));
    });

    test("with the text enlarged to 200% on a 320px screen: the number and the dots both fit", async ({
        page,
    }) => {
        await atWidth(page, ON_320);
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        expect(await demo(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        expect(Math.round((await box(grid(page))).width)).toBe(ON_320);

        const button = day(page, "2026-10-17");
        const rect = await box(button);
        expect(rect.width).toBeGreaterThanOrEqual(40);
        expect(rect.height, "Taller, to hold the larger number above the dots").toBeGreaterThan(44);
        const number = await box(button.locator(".face > span").first());
        const dots = await box(button.locator(".dots"));
        expect(number.y + number.height, "The dots are under the number, not on it").toBeLessThanOrEqual(
            dots.y + 0.5,
        );
        expect(number.x).toBeGreaterThanOrEqual(rect.x);
        expect(number.x + number.width).toBeLessThanOrEqual(rect.x + rect.width);
        // The month title and both buttons still fit on their row.
        const forward = await box(next(page));
        const table = await box(grid(page));
        expect(forward.x + forward.width).toBeLessThanOrEqual(table.x + table.width + 0.5);
    });

    test("weekday names: three letters at the usual text size, one where the enlarged text would run into the next column", async ({
        page,
    }) => {
        await atWidth(page, ON_320);
        const headers = grid(page).getByRole("columnheader");
        const shown = () =>
            headers.evaluateAll((cells) =>
                cells.map((cell) => {
                    const visible = [...cell.querySelectorAll<HTMLElement>("[aria-hidden] > span")].filter(
                        (el) => getComputedStyle(el).display !== "none",
                    );
                    const rect = cell.getBoundingClientRect();
                    const text = visible[0]?.getBoundingClientRect();
                    return {
                        text: visible.map((el) => el.textContent).join("|"),
                        inside: !!text && text.left >= rect.left - 0.5 && text.right <= rect.right + 0.5,
                    };
                }),
            );
        expect((await shown()).map((cell) => cell.text)).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
        expect((await shown()).every((cell) => cell.inside)).toBe(true);

        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        expect((await shown()).map((cell) => cell.text)).toEqual(["M", "T", "W", "T", "F", "S", "S"]);
        expect((await shown()).every((cell) => cell.inside), "No name reaches into the next column").toBe(true);
        // What is read out does not change with what is shown.
        await expect(headers.first()).toHaveAccessibleName("Monday");
        await expect(headers.nth(3)).toHaveAccessibleName("Thursday");
    });
});

test.describe("Calendar — keyboard", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 740 });
        await open(page);
    });

    test("one Tab stop in the grid; arrows move by day and week; Enter selects", async ({ page }) => {
        await next(page).focus();
        await page.keyboard.press("Tab");
        await expect(day(page, "2026-10-06"), "The selected day is the Tab stop").toBeFocused();
        expect(await demo(page).locator('[data-date][tabindex="0"]').count()).toBe(1);

        await page.keyboard.press("ArrowRight");
        await expect(day(page, "2026-10-07")).toBeFocused();
        await page.keyboard.press("ArrowDown");
        await expect(day(page, "2026-10-14")).toBeFocused();
        await page.keyboard.press("Home");
        await expect(day(page, "2026-10-12")).toBeFocused();
        await page.keyboard.press("End");
        await expect(day(page, "2026-10-18")).toBeFocused();
        // Moving is not selecting.
        await expect(day(page, "2026-10-06")).toHaveAttribute("data-selected", "");

        await page.keyboard.press("ArrowLeft");
        await page.keyboard.press("Enter");
        await expect(day(page, "2026-10-17")).toHaveAttribute("data-selected", "");
        await expect(list(page)).toContainText("Quarter-final");
        // Again with Space: nothing is cleared.
        await page.keyboard.press("Space");
        await expect(day(page, "2026-10-17")).toHaveAttribute("data-selected", "");

        // One Tab leaves the grid.
        await page.keyboard.press("Tab");
        expect(
            await page.evaluate(() => Boolean(document.activeElement?.closest('[role="grid"]'))),
        ).toBe(false);
        await page.keyboard.press("Shift+Tab");
        await expect(day(page, "2026-10-17"), "And comes back to where it was").toBeFocused();
    });

    test("moving past the edge of the month changes the month and keeps focus on the right day", async ({
        page,
    }) => {
        await day(page, "2026-10-31").focus();
        await page.keyboard.press("ArrowRight");
        await expect(title(page)).toHaveText("November 2026");
        await expect(day(page, "2026-11-01")).toBeFocused();

        await page.keyboard.press("ArrowLeft");
        await expect(title(page)).toHaveText("October 2026");
        await expect(day(page, "2026-10-31")).toBeFocused();

        await page.keyboard.press("ArrowDown");
        await expect(day(page, "2026-11-07")).toBeFocused();

        await page.keyboard.press("PageUp");
        await expect(day(page, "2026-10-07")).toBeFocused();
        await page.keyboard.press("PageDown");
        await page.keyboard.press("PageDown");
        await expect(title(page)).toHaveText("December 2026");
        await expect(day(page, "2026-12-07")).toBeFocused();

        await page.keyboard.press("Shift+PageDown");
        await expect(title(page)).toHaveText("December 2027");
        await expect(day(page, "2027-12-07")).toBeFocused();
        await page.keyboard.press("Shift+PageUp");
        await expect(day(page, "2026-12-07")).toBeFocused();
    });

    test("the arrow keys do not scroll the page", async ({ page }) => {
        await day(page, "2026-10-06").focus();
        const scrolled = () =>
            page.evaluate(() => {
                let top = window.scrollY;
                for (let node = document.activeElement?.parentElement; node; node = node.parentElement) {
                    top += node.scrollTop;
                }
                return top;
            });
        const before = await scrolled();
        for (const key of ["ArrowDown", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "End", "Home"]) {
            await page.keyboard.press(key);
        }
        await expect(day(page, "2026-10-12")).toBeFocused();
        expect(await scrolled()).toBe(before);
    });

    test("a focused day shows a focus ring, also on the selected day", async ({ page }) => {
        await next(page).focus();
        await page.keyboard.press("Tab");
        await expect(day(page, "2026-10-06")).toBeFocused();
        // Around the face, the shape that is seen; the button itself is the square cell.
        const ring = (date: string) =>
            day(page, date)
                .locator(".face")
                .evaluate((el) => getComputedStyle(el).boxShadow);
        expect(await ring("2026-10-06")).toContain("0px 0px 0px 4px");
        expect(await ring("2026-10-08")).toBe("none");
        await page.keyboard.press("ArrowRight");
        expect(await ring("2026-10-07")).toContain("0px 0px 0px 4px");
        expect(await ring("2026-10-06")).toBe("none");
        // A press with the mouse shows no ring.
        await day(page, "2026-10-20").click();
        expect(await ring("2026-10-20")).toBe("none");
    });
});

test.describe("Calendar — display modes", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 740 });
        await open(page);
    });

    test("today is marked by a ring and a heavier number, not by colour alone", async ({ page }) => {
        const mark = (date: string) =>
            day(page, date)
                .locator(".face")
                .evaluate((el) => {
                    const style = getComputedStyle(el);
                    return {
                        outline: `${style.outlineStyle} ${style.outlineWidth}`,
                        weight: Number(style.fontWeight),
                    };
                });
        expect(await mark("2026-10-05")).toEqual({ outline: "solid 2px", weight: 700 });
        expect((await mark("2026-10-07")).outline).toContain("none");
        expect((await mark("2026-10-07")).weight).toBe(400);
        await expect(demo(page).locator('[aria-current="date"]')).toHaveCount(1);

        // Selected as well: the ring moves inside the fill, in the fill's text colour.
        await day(page, "2026-10-05").click();
        const both = await day(page, "2026-10-05")
            .locator(".face")
            .evaluate((el) => {
                const style = getComputedStyle(el);
                return { outline: style.outlineColor, text: style.color, offset: style.outlineOffset };
            });
        expect(both.outline).toBe(both.text);
        expect(both.offset).toBe("-4px");
    });

    test("right to left: the week runs from the right, and left goes to the next day", async ({ page }) => {
        await page.evaluate(() => (document.documentElement.dir = "rtl"));
        const monday = await box(day(page, "2026-10-05"));
        const tuesday = await box(day(page, "2026-10-06"));
        expect(tuesday.x, "Tuesday is to the left of Monday").toBeLessThan(monday.x);
        const back = await box(previous(page));
        const forward = await box(next(page));
        expect(forward.x, "Next is on the left").toBeLessThan(back.x);
        // The chevrons are mirrored with it.
        expect(
            await next(page).locator("svg").evaluate((el) => getComputedStyle(el).rotate),
        ).toBe("180deg");

        await day(page, "2026-10-06").focus();
        await page.keyboard.press("ArrowLeft");
        await expect(day(page, "2026-10-07")).toBeFocused();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        await expect(day(page, "2026-10-05")).toBeFocused();
        expect(await demo(page).evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    });

    test("forced colours: the selected day, today and the dots are all still drawn", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const system = await page.evaluate(() => {
            const probe = document.createElement("span");
            document.body.append(probe);
            const read = (name: string) => {
                probe.style.color = name;
                return getComputedStyle(probe).color;
            };
            const out = { highlight: "", highlightText: read("HighlightText"), text: read("CanvasText") };
            probe.style.backgroundColor = "Highlight";
            out.highlight = getComputedStyle(probe).backgroundColor;
            probe.remove();
            return out;
        });
        const face = (date: string) =>
            day(page, date)
                .locator(".face")
                .evaluate((el) => {
                    const style = getComputedStyle(el);
                    return { fill: style.backgroundColor, text: style.color, outline: `${style.outlineStyle} ${style.outlineColor}` };
                });
        // Past the fade from the theme's fill to the system's.
        await expect.poll(async () => (await face("2026-10-06")).fill).toBe(system.highlight);
        const selected = await face("2026-10-06");
        expect(selected.text).toBe(system.highlightText);
        expect((await face("2026-10-05")).outline).toBe(`solid ${system.text}`);
        const dot = (date: string) =>
            day(page, date)
                .locator(".dot")
                .first()
                .evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(await dot("2026-10-10")).toBe(system.text);
        expect(await dot("2026-10-06"), "On the selected day, in its text colour").toBe(
            system.highlightText,
        );
    });

    test("forced colours: the selected day keeps the system fill under the pointer, and an unavailable day is greyed", async ({
        page,
    }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const system = await page.evaluate(() => {
            const probe = document.createElement("span");
            document.body.append(probe);
            probe.style.color = "GrayText";
            probe.style.backgroundColor = "Highlight";
            const style = getComputedStyle(probe);
            const out = { highlight: style.backgroundColor, grey: style.color };
            probe.style.color = "ButtonText";
            const button = getComputedStyle(probe).color;
            probe.remove();
            return { ...out, button };
        });
        expect(system.grey, "The two system colours must differ for this to show anything").not.toBe(system.button);

        const fill = () =>
            day(page, "2026-10-06")
                .locator(".face")
                .evaluate((el) => getComputedStyle(el).backgroundColor);
        await expect.poll(fill).toBe(system.highlight);
        await day(page, "2026-10-06").hover();
        // Longer than the fade: a fill that changed would have arrived.
        await page.waitForTimeout(300);
        expect(await fill(), "Not the theme's hover colour").toBe(system.highlight);

        const limits = page.getByTestId("calendar-demo-limits");
        const colour = (date: string) =>
            limits.locator(`[data-date="${date}"]`).evaluate((el) => getComputedStyle(el).color);
        expect(await colour("2026-10-12"), "A closed Monday").toBe(system.grey);
        expect(await colour("2026-10-13"), "A day that can be booked").not.toBe(system.grey);
    });

    test("dark theme: the selected day takes the primary fill and its text colour, the dots their tones", async ({
        page,
    }) => {
        const read = () =>
            page.evaluate(() => {
                const probe = document.createElement("span");
                document.body.append(probe);
                const token = (name: string) => {
                    probe.style.color = `var(${name})`;
                    return getComputedStyle(probe).color;
                };
                const face = document.querySelector('[data-testid="calendar-demo"] [data-date="2026-10-06"] .face')!;
                const success = document.querySelector('[data-testid="calendar-demo"] [data-date="2026-10-10"] .dot')!;
                const out = {
                    fill: getComputedStyle(face).backgroundColor,
                    text: getComputedStyle(face).color,
                    primary: token("--color-action-primary"),
                    onPrimary: token("--color-action-primary-text"),
                    dot: getComputedStyle(success).backgroundColor,
                    success: token("--color-success"),
                };
                probe.remove();
                return out;
            });
        await page.mouse.move(0, 0);
        const settled = async () => {
            await expect.poll(async () => (await read()).fill === (await read()).primary).toBe(true);
            return read();
        };
        const light = await settled();
        expect(light.text).toBe(light.onPrimary);
        expect(light.dot).toBe(light.success);

        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await expect.poll(async () => (await read()).primary).not.toBe(light.primary);
        const dark = await settled();
        expect(dark.text).toBe(dark.onPrimary);
        expect(dark.dot).toBe(dark.success);
    });

    test("reduced motion: the fill does not fade", async ({ page }) => {
        const duration = () =>
            day(page, "2026-10-07")
                .locator(".face")
                .evaluate((el) => getComputedStyle(el).transitionDuration);
        expect(await duration()).toBe("0.15s");
        await page.emulateMedia({ reducedMotion: "reduce" });
        expect(await duration()).toBe("0s");
    });

    test("limits: days outside them and closed days are unavailable, and the month before cannot be reached", async ({
        page,
    }) => {
        const limits = page.getByTestId("calendar-demo-limits");
        const state = page.getByTestId("calendar-demo-limits-state");
        const at = (date: string) => limits.locator(`[data-date="${date}"]`);
        // Weeks from Sunday here.
        await expect(limits.getByRole("columnheader").first()).toContainText("Sunday");
        await expect(at("2026-10-04")).toHaveAttribute("aria-disabled", "true");
        await expect(at("2026-10-12"), "A Monday: closed").toHaveAttribute("aria-disabled", "true");
        await expect(at("2026-10-12")).toHaveAccessibleName("Monday, 12 October 2026, unavailable");
        // Struck through as well as grey: not by colour alone.
        // Read from the number, which is what the line is drawn through. Set
        // on the button it computes the same there and draws nothing: the
        // number is in a face that is positioned out of the flow.
        const struck = (date: string) =>
            at(date).evaluate((el) => {
                const number = el.querySelector(".face > span")!;
                const positioned = getComputedStyle(number.parentElement!).position;
                return `${getComputedStyle(number).textDecorationLine}, in a face that is ${positioned}`;
            });
        expect(await struck("2026-10-12")).toBe("line-through, in a face that is absolute");
        expect(await struck("2026-10-13")).toBe("none, in a face that is absolute");
        expect(await at("2026-10-13").evaluate((el) => getComputedStyle(el).textDecorationLine)).toBe("none");
        // `force`: Playwright will not press what says it is unavailable; a finger will.
        await at("2026-10-12").click({ force: true });
        await expect(state).toContainText("Booked: nothing.");

        await at("2026-10-13").click();
        await expect(state).toContainText("Booked: 2026-10-13. Last select: 2026-10-13.");

        const back = limits.getByRole("button", { name: "Previous month" });
        await expect(back).toHaveAttribute("aria-disabled", "true");
        await back.click({ force: true });
        await expect(limits.getByRole("grid")).toHaveAccessibleName("October 2026");
        // Focus is not dropped by a button that has nowhere to go.
        await expect(back).toBeFocused();

        const forward = limits.getByRole("button", { name: "Next month" });
        await forward.click();
        await expect(limits.getByRole("grid")).toHaveAccessibleName("November 2026");
        await expect(forward).toHaveAttribute("aria-disabled", "true");
        await expect(at("2026-11-21")).toHaveAttribute("aria-disabled", "true");

        // The keyboard stops at the last day that may be chosen.
        await at("2026-11-19").focus();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("PageDown");
        await expect(at("2026-11-20")).toBeFocused();
    });
});
