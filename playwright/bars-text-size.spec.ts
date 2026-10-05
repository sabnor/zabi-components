import { expect, test, type Page } from "@playwright/test";

/**
 * AppBar and BottomTabBar when text grows and screens narrow.
 *
 * At 375px with the root font at 200% the two bars took 402 of 812px: the
 * AppBar wrapped to 225px, the tab bar was 177px with "Ka-len-der" over three
 * lines and its badge over the icon. At 180px (a 360px phone zoomed to 200%)
 * the five tabs overlapped each other and ran off the screen.
 *
 * The bars are chrome. Their sizes are in px, the title and the labels grow
 * only a little with the text, and what does not fit is cut with an ellipsis
 * on one line, or left to the icons. The full names stay in the page for
 * assistive technology.
 */

const LAB = "/chaos-lab/bars";

async function gotoLab(page: Page, query = "", percent = 100) {
    await page.goto(LAB + query, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
    if (percent !== 100) {
        await page.evaluate((percent) => (document.documentElement.style.fontSize = `${percent}%`), percent);
    }
    await page.waitForTimeout(100);
}

/** Everything the assertions need from the five-tab bar. Runs in the page. */
function measureTabs(page: Page, testId = "lab-tabs-five") {
    return page.getByTestId(testId).evaluate((host) => {
        const nav = host.querySelector("nav")!;
        const side = (box: DOMRect) => ({
            left: box.left,
            right: box.right,
            top: box.top,
            bottom: box.bottom,
            width: box.width,
            height: box.height,
        });
        const tabs = [...nav.querySelectorAll("a")].map((link) => {
            const label = link.querySelector<HTMLElement>(".tabbar-label")!;
            const labelBox = label.getBoundingClientRect();
            const style = getComputedStyle(label);
            const icon = link.querySelector("svg")!;
            const badge = link.querySelector<HTMLElement>(".tabbar-badge");
            return {
                name: link.getAttribute("aria-label") ?? link.textContent!.trim().replace(/\s+/g, " "),
                text: label.textContent!.trim(),
                box: side(link.getBoundingClientRect()),
                label: side(labelBox),
                labelShown: labelBox.width > 2 && labelBox.height > 2,
                fontSize: parseFloat(style.fontSize),
                lines: Math.round(labelBox.height / parseFloat(style.lineHeight)),
                cut: label.scrollWidth > label.clientWidth + 1,
                whiteSpace: style.whiteSpace,
                hyphens: style.hyphens,
                icon: side(icon.getBoundingClientRect()),
                badge: badge ? side(badge.getBoundingClientRect()) : null,
            };
        });
        return {
            nav: side(nav.getBoundingClientRect()),
            tabs,
            pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            navOverflow: nav.scrollWidth - nav.clientWidth,
        };
    });
}

function measureAppBar(page: Page) {
    return page.getByTestId("lab-appbar").evaluate((host) => {
        const header = host.querySelector("header")!;
        const heading = header.querySelector<HTMLElement>("h1")!;
        const side = (box: DOMRect) => ({
            left: box.left,
            right: box.right,
            top: box.top,
            bottom: box.bottom,
            width: box.width,
            height: box.height,
        });
        const style = getComputedStyle(heading);
        const controls = [...header.querySelectorAll<HTMLElement>("a, button")].map((control) => ({
            name: control.getAttribute("aria-label"),
            box: side(control.getBoundingClientRect()),
            icon: side(control.querySelector("svg")!.getBoundingClientRect()),
        }));
        return {
            header: side(header.getBoundingClientRect()),
            heading: side(heading.getBoundingClientRect()),
            text: heading.textContent!.trim(),
            fontSize: parseFloat(style.fontSize),
            lines: Math.round(heading.getBoundingClientRect().height / parseFloat(style.lineHeight)),
            cut: heading.scrollWidth > heading.clientWidth + 1,
            controls,
            pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
    });
}

const round = (value: number) => Math.round(value * 10) / 10;

for (const size of [
    { width: 375, height: 812 },
    { width: 320, height: 568 },
]) {
    for (const percent of [100, 200]) {
        test.describe(`${size.width}px, text at ${percent}%`, () => {
            test.use({ viewport: size, hasTouch: true, isMobile: true });

            test("AppBar: one row of 57px, the title on one line, 48px controls with 24px icons", async ({
                page,
            }) => {
                await gotoLab(page, "", percent);
                const bar = await measureAppBar(page);
                console.log(
                    `MEASURED AppBar ${size.width}px ${percent}%: height ${round(bar.header.height)}, title ${round(bar.fontSize)}px, cut ${bar.cut}`,
                );
                expect(bar.header.height).toBe(57);
                expect(bar.lines).toBe(1);
                expect(bar.text).toBe("Logga besök");
                // "Logga besök" is whole beside a back control and two actions.
                expect(bar.cut).toBe(false);
                expect(bar.fontSize).toBeLessThanOrEqual(23.4 + 0.01);
                expect(bar.fontSize).toBeCloseTo(percent === 100 ? 18 : 23.4, 1);

                expect(bar.controls.map((control) => control.name)).toEqual(["Back", "Favorit", "Dela"]);
                for (const control of bar.controls) {
                    expect(control.box.width, control.name!).toBe(48);
                    expect(control.box.height, control.name!).toBe(48);
                    expect(control.icon.width, control.name!).toBeLessThanOrEqual(24);
                    // All on the one row, inside the bar and the screen.
                    expect(control.box.top).toBeGreaterThanOrEqual(bar.header.top);
                    expect(control.box.bottom).toBeLessThanOrEqual(bar.header.bottom);
                    expect(control.box.left).toBeGreaterThanOrEqual(0);
                    expect(control.box.right).toBeLessThanOrEqual(size.width);
                }
                // Back, then the title, then the actions, with nothing on top of anything.
                const [back, first, second] = bar.controls;
                expect(back.box.right).toBeLessThanOrEqual(bar.heading.left);
                expect(bar.heading.right).toBeLessThanOrEqual(first.box.left);
                expect(first.box.right).toBeLessThanOrEqual(second.box.left);
                expect(bar.pageOverflow).toBe(0);
            });

            test("AppBar: a title too long for the row is cut with an ellipsis and keeps its full text", async ({
                page,
            }) => {
                await gotoLab(page, "?title=long", percent);
                const bar = await measureAppBar(page);
                expect(bar.header.height).toBe(57);
                expect(bar.lines).toBe(1);
                expect(bar.cut).toBe(true);
                await expect(page.getByRole("heading", { level: 1 })).toHaveText(
                    "Logga ett besök på Glenfiddich Warehouse",
                );
                expect(
                    await page
                        .getByRole("heading", { level: 1 })
                        .evaluate((heading) => getComputedStyle(heading).textOverflow),
                ).toBe("ellipsis");
                // The controls did not move for it.
                expect(bar.controls.map((control) => control.box.width)).toEqual([48, 48, 48]);
                expect(bar.pageOverflow).toBe(0);
            });

            test("BottomTabBar: one row of 65px, labels on one line and never broken inside a word", async ({
                page,
            }) => {
                await gotoLab(page, "", percent);
                const bar = await measureTabs(page);
                console.log(
                    `MEASURED BottomTabBar ${size.width}px ${percent}%: height ${round(bar.nav.height)}, tabs ${bar.tabs.map((tab) => round(tab.box.width)).join("/")}, label ${round(bar.tabs[0].fontSize)}px, cut ${bar.tabs.filter((tab) => tab.cut).map((tab) => tab.text).join(",") || "none"}`,
                );
                expect(bar.nav.height).toBe(65);
                expect(bar.nav.bottom).toBe(size.height);
                expect(bar.tabs).toHaveLength(5);
                for (const tab of bar.tabs) {
                    expect(tab.labelShown, tab.text).toBe(true);
                    expect(tab.lines, tab.text).toBe(1);
                    expect(tab.whiteSpace, tab.text).toBe("nowrap");
                    expect(tab.hyphens, tab.text).not.toBe("auto");
                    // No larger than 1.3 times its 12px, whatever the text size.
                    expect(tab.fontSize).toBeLessThanOrEqual(15.6 + 0.01);
                    expect(tab.fontSize).toBeGreaterThanOrEqual(11);
                    expect(tab.box.width, tab.text).toBeGreaterThanOrEqual(52 - 0.1);
                    // These five words fit their tabs: none is cut.
                    expect(tab.cut, tab.text).toBe(false);
                    expect(tab.label.left).toBeGreaterThanOrEqual(tab.box.left);
                    expect(tab.label.right).toBeLessThanOrEqual(tab.box.right + 0.5);
                }
                // The tabs are side by side, in order, 8px apart, inside the bar.
                for (let index = 1; index < bar.tabs.length; index += 1) {
                    expect(bar.tabs[index].box.left - bar.tabs[index - 1].box.right).toBeCloseTo(8, 1);
                }
                expect(bar.tabs[0].box.left).toBeGreaterThanOrEqual(0);
                expect(bar.tabs[4].box.right).toBeLessThanOrEqual(size.width + 0.1);
                expect(bar.pageOverflow).toBe(0);
                expect(bar.navOverflow).toBe(0);
            });

            test("BottomTabBar: the badge keeps to the icon's corner, and the count is in the link's name", async ({
                page,
            }) => {
                await gotoLab(page, "?badge=120", percent);
                const bar = await measureTabs(page);
                const tab = bar.tabs[1];
                expect(tab.name).toBe("Kalender, 120 new");
                const badge = tab.badge!;
                // It covers the icon's upper end corner by 8px each way, and no more.
                expect(tab.icon.right - badge.left).toBeCloseTo(8, 0);
                expect(badge.bottom - tab.icon.top).toBeCloseTo(8, 0);
                expect(badge.height).toBe(18);
                // Inside the bar.
                expect(badge.top).toBeGreaterThanOrEqual(bar.nav.top);
                expect(bar.pageOverflow).toBe(0);
            });

            test("the two bars together leave the screen to the page", async ({ page }) => {
                await gotoLab(page, "", percent);
                const top = await measureAppBar(page);
                const bottom = await measureTabs(page);
                expect(top.header.height + bottom.nav.height).toBe(122);
            });
        });
    }
}

test.describe("BottomTabBar with room: three tabs", () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

    test("the labels follow the text size, up to 1.3 times their 12px", async ({ page }) => {
        await gotoLab(page);
        expect((await measureTabs(page, "lab-tabs-three")).tabs.map((tab) => tab.fontSize)).toEqual([12, 12, 12]);
        await page.evaluate(() => (document.documentElement.style.fontSize = "120%"));
        expect((await measureTabs(page, "lab-tabs-three")).tabs[0].fontSize).toBeCloseTo(14.4, 1);
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        const bar = await measureTabs(page, "lab-tabs-three");
        expect(bar.tabs[0].fontSize).toBeCloseTo(15.6, 1);
        expect(bar.nav.height).toBe(65);
        expect(bar.tabs.every((tab) => tab.lines === 1 && !tab.cut)).toBe(true);
    });
});

for (const width of [260, 240, 180]) {
    test.describe(`BottomTabBar at ${width}px wide`, () => {
        test.use({ viewport: { width, height: 640 }, hasTouch: true, isMobile: true });

        test("five tabs never overlap or leave the screen; without room for a word, icons only", async ({
            page,
        }) => {
            await gotoLab(page, "?badge=3");
            const bar = await measureTabs(page);
            console.log(
                `MEASURED BottomTabBar ${width}px: height ${round(bar.nav.height)}, tabs ${bar.tabs.map((tab) => `${round(tab.box.left)}-${round(tab.box.right)}`).join(" ")}, labels ${bar.tabs[0].labelShown ? "shown" : "icons only"}`,
            );
            expect(bar.nav.height).toBe(65);
            expect(bar.pageOverflow).toBe(0);
            expect(bar.navOverflow).toBe(0);
            for (let index = 1; index < bar.tabs.length; index += 1) {
                expect(bar.tabs[index].box.left).toBeGreaterThanOrEqual(bar.tabs[index - 1].box.right - 0.1);
            }
            expect(bar.tabs[0].box.left).toBeGreaterThanOrEqual(0);
            expect(bar.tabs[4].box.right).toBeLessThanOrEqual(width + 0.1);

            const each = bar.tabs[0].box.width;
            if (width === 260) {
                // Exactly 52px each, edge to edge: the last width with labels.
                expect(each).toBeCloseTo(52, 0);
                expect(bar.tabs.every((tab) => tab.labelShown && tab.lines === 1)).toBe(true);
            } else {
                // 48px each at 240, a full target. 36px at 180: five 44px tabs do not fit there.
                expect(each).toBeCloseTo(width / 5, 0);
                expect(bar.tabs.some((tab) => tab.labelShown)).toBe(false);
                // Every icon is whole, inside its own tab.
                for (const tab of bar.tabs) {
                    expect(tab.icon.width).toBe(24);
                    expect(tab.icon.left).toBeGreaterThanOrEqual(tab.box.left);
                    expect(tab.icon.right).toBeLessThanOrEqual(tab.box.right);
                }
            }
            // The names are the full labels either way.
            const nav = page.getByRole("navigation", { name: "Huvudmeny" });
            await expect(nav.getByRole("link", { name: "Hem", exact: true })).toHaveAttribute("aria-current", "page");
            await expect(nav.getByRole("link", { name: "Statistik", exact: true })).toBeVisible();
            await expect(nav.getByRole("link", { name: "Kalender, 3 new" })).toBeVisible();
        });

        test("a tap in the middle of each tab reaches that tab", async ({ page }) => {
            await gotoLab(page);
            const hits = await page.getByTestId("lab-tabs-five").evaluate((host) =>
                [...host.querySelectorAll("a")].map((link) => {
                    const box = link.getBoundingClientRect();
                    const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
                    return !!hit && (hit === link || link.contains(hit));
                }),
            );
            expect(hits).toEqual([true, true, true, true, true]);
        });
    });
}

test.describe("BottomTabBar at 180px with text at 200%", () => {
    test.use({ viewport: { width: 180, height: 640 }, hasTouch: true, isMobile: true });

    test("is the same bar: 65px, five 36px tabs, icons only", async ({ page }) => {
        await gotoLab(page, "", 200);
        const bar = await measureTabs(page);
        expect(bar.nav.height).toBe(65);
        expect(bar.tabs.map((tab) => Math.round(tab.box.width))).toEqual([36, 36, 36, 36, 36]);
        expect(bar.tabs[4].box.right).toBeLessThanOrEqual(180.1);
        expect(bar.pageOverflow).toBe(0);
    });
});

test.describe("AppBar at 180px wide", () => {
    test.use({ viewport: { width: 180, height: 640 }, hasTouch: true, isMobile: true });

    test("is still one row with its three controls on screen; the title has what is left", async ({ page }) => {
        await gotoLab(page, "", 200);
        const bar = await measureAppBar(page);
        console.log(
            `MEASURED AppBar 180px 200%: height ${round(bar.header.height)}, controls ${bar.controls.map((control) => `${round(control.box.left)}-${round(control.box.right)}`).join(" ")}, title ${round(bar.heading.width)}px wide`,
        );
        expect(bar.header.height).toBe(57);
        expect(bar.pageOverflow).toBe(0);
        for (const control of bar.controls) {
            expect(control.box.left).toBeGreaterThanOrEqual(0);
            expect(control.box.right).toBeLessThanOrEqual(180.1);
        }
    });
});
