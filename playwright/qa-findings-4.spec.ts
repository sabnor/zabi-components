import { expect, test, type Locator, type Page } from "@playwright/test";

import { gotoHydrated } from "./helpers/hydration";

/**
 * Findings from the QA pass on the phone work, one describe per finding.
 * Each test fails without its fix.
 *
 * - Select: the chosen option was marked with the same ring keyboard focus
 *   draws, and nothing else.
 * - Select: every option was a Tab stop, so the search field was a Shift+Tab
 *   per option away, and a typed letter did nothing.
 * - BottomTabBar: with the labels hidden, nothing but text colour told the
 *   active tab from the others, and not at 3:1.
 *
 * The AppBar's title on a narrow bar is in playwright/app-bar-title.spec.ts.
 */

const MENUS = "/chaos-lab/touch-menus";
const BARS = "/chaos-lab/bars";

const host = (page: Page, id: string) => page.getByTestId(`lab-${id}`);
const selectTrigger = (scope: Page | Locator) => scope.locator('button[aria-haspopup="listbox"]');

/** Any CSS colour as sRGB bytes with alpha: the browser may hand back `oklch()` or `color()`. */
const TO_RGBA = `(colour) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = colour;
    context.fillRect(0, 0, 1, 1);
    return [...context.getImageData(0, 0, 1, 1).data];
}`;

function contrast(a: number[], b: number[]): number {
    const luminance = (rgb: number[]) => {
        const [r, g, blue] = rgb.slice(0, 3).map((value) => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * blue;
    };
    const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (light + 0.05) / (dark + 0.05);
}

const round = (value: number) => Math.round(value * 100) / 100;

async function setTheme(page: Page, dark: boolean) {
    await page.evaluate((dark) => {
        document.documentElement.classList.toggle("dark", dark);
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    }, dark);
}

/** What marks an option, read in the page: its check, its fill, its edge and its ring. */
function describeOptions(list: Locator) {
    return list.evaluate((element, toRgba) => {
        const rgba = new Function(`return ${toRgba}`)() as (colour: string) => number[];
        // The first opaque fill behind the options.
        let behind = [0, 0, 0, 0];
        for (let node: Element | null = element; node; node = node.parentElement) {
            const fill = rgba(getComputedStyle(node).backgroundColor);
            if (fill[3] === 255) {
                behind = fill;
                break;
            }
        }
        return [...element.querySelectorAll<HTMLElement>('[role="option"]')].map((option) => {
            const style = getComputedStyle(option);
            const check = option.querySelector<SVGElement>("svg");
            const checkStyle = check ? getComputedStyle(check) : null;
            const fill = rgba(style.backgroundColor);
            return {
                name: option.textContent!.trim(),
                selected: option.getAttribute("aria-selected"),
                tabIndex: option.tabIndex,
                focused: document.activeElement === option,
                check: !!check && checkStyle!.visibility !== "hidden" && checkStyle!.display !== "none" && check.getBoundingClientRect().width > 0,
                checkColour: check ? rgba(checkStyle!.color) : null,
                checkAtEnd: check
                    ? check.getBoundingClientRect().left >
                      option.getBoundingClientRect().left + option.getBoundingClientRect().width / 2
                    : false,
                fill,
                surface: fill[3] === 255 ? fill : behind,
                behind,
                border: style.borderTopWidth !== "0px" ? rgba(style.borderTopColor) : [0, 0, 0, 0],
                // The focus ring is a box-shadow; an outline only counts when one is drawn.
                ring: `${style.boxShadow}|${style.outlineStyle === "none" ? "none" : `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`}`,
                weight: style.fontWeight,
                height: option.getBoundingClientRect().height,
            };
        });
    }, TO_RGBA);
}

for (const where of [
    { name: "in the sheet, on a phone", use: { viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true }, sheet: true },
    { name: "in the pop-over, on a desktop", use: { viewport: { width: 1280, height: 900 } }, sheet: false },
]) {
    test.describe(`Select options ${where.name}`, () => {
        test.use(where.use);

        const listOf = (page: Page, label: string, id: string) =>
            where.sheet
                ? page.getByRole("dialog", { name: label, exact: true }).getByRole("listbox")
                : host(page, id).getByRole("listbox");
        const searchOf = (page: Page, label: string, id: string) =>
            (where.sheet ? page.getByRole("dialog", { name: label, exact: true }) : host(page, id)).getByRole(
                "textbox",
                { name: "Search options" },
            );

        async function open(page: Page, id: string, label: string) {
            await gotoHydrated(page, MENUS);
            await selectTrigger(host(page, id)).focus();
            await page.keyboard.press("Enter");
            const list = listOf(page, label, id);
            await expect(list).toBeVisible();
            // The sheet slides in; focus moves once it is in place.
            await page.waitForTimeout(400);
            return list;
        }

        for (const dark of [false, true]) {
            test(`the chosen option has a mark of its own, not the focus ring and not colour alone (${dark ? "dark" : "light"})`, async ({
                page,
            }) => {
                await gotoHydrated(page, MENUS);
                await setTheme(page, dark);
                await selectTrigger(host(page, "select-long")).focus();
                await page.keyboard.press("Enter");
                const list = listOf(page, "Pub", "select-long");
                await expect(list).toBeVisible();
                await page.waitForTimeout(400);
                // Focus somewhere else in the list, so the chosen one is seen without it.
                await page.keyboard.press("Home");
                const options = await describeOptions(list);
                const chosen = options.find((option) => option.name === "Glenfiddich Warehouse")!;
                const focused = options.find((option) => option.focused)!;
                const plain = options.find((option) => option.name === "Carmen")!;
                expect(focused.name).toBe("Akkurat");

                // Every option says whether it is chosen.
                expect(options.map((option) => option.selected)).toEqual(
                    options.map((option) => (option.name === "Glenfiddich Warehouse" ? "true" : "false")),
                );
                // A check, at the end of the row, on the chosen one only.
                expect(options.filter((option) => option.check).map((option) => option.name)).toEqual([
                    "Glenfiddich Warehouse",
                ]);
                expect(chosen.checkAtEnd).toBe(true);
                const checkContrast = contrast(chosen.checkColour!, chosen.surface);
                console.log(
                    `MEASURED ${where.sheet ? "sheet" : "pop-over"} ${dark ? "dark" : "light"}: check ${round(checkContrast)}:1 on its row; chosen fill vs list ${round(contrast(chosen.surface, chosen.behind))}:1`,
                );
                expect(checkContrast).toBeGreaterThanOrEqual(3);
                // It is not drawn as the focused one is: no edge in the action colour around it.
                expect(chosen.border[3] === 0 || chosen.border.join() === plain.border.join()).toBe(true);
                expect(chosen.ring).toBe(plain.ring);
                expect(focused.ring).not.toBe(plain.ring);
                // And it has a fill the others do not.
                expect(chosen.fill.join()).not.toBe(plain.fill.join());
            });
        }

        test("the chosen option keeps a mark in forced colours", async ({ page }) => {
            await page.emulateMedia({ forcedColors: "active" });
            const list = await open(page, "select-long", "Pub");
            await page.keyboard.press("Home");
            const options = await describeOptions(list);
            expect(options.filter((option) => option.check).map((option) => option.name)).toEqual([
                "Glenfiddich Warehouse",
            ]);
        });

        test("the list is one Tab stop: Shift+Tab from an option goes to the search field in one step", async ({
            page,
        }) => {
            const list = await open(page, "select-long", "Pub");
            const options = await describeOptions(list);
            expect(options.filter((option) => option.tabIndex === 0).map((option) => option.name)).toEqual([
                where.sheet ? "Glenfiddich Warehouse" : "Akkurat",
            ]);
            expect(options.filter((option) => option.focused)).toHaveLength(1);

            await page.keyboard.press("Shift+Tab");
            await expect(searchOf(page, "Pub", "select-long")).toBeFocused();

            // And one Tab back into the list, to the option it was on.
            await page.keyboard.press("Tab");
            const back = await describeOptions(list);
            expect(back.find((option) => option.focused)?.name).toBe(where.sheet ? "Glenfiddich Warehouse" : "Akkurat");
        });

        test("the arrow keys move the one Tab stop with the focus, a disabled option included", async ({ page }) => {
            const list = await open(page, "select-long", "Pub");
            await page.keyboard.press("Home");
            await page.keyboard.press("ArrowDown");
            await page.keyboard.press("ArrowDown");
            await page.keyboard.press("ArrowDown");
            let options = await describeOptions(list);
            // Dovas is disabled: reached, not skipped.
            expect(options.find((option) => option.focused)?.name).toBe("Dovas");
            expect(options.filter((option) => option.tabIndex === 0).map((option) => option.name)).toEqual(["Dovas"]);
            await page.keyboard.press("End");
            options = await describeOptions(list);
            expect(options.find((option) => option.focused)?.name).toBe("Monks Porter House");
            expect(options.filter((option) => option.tabIndex === 0)).toHaveLength(1);
        });

        test("searchable: a letter typed on an option goes to the search field and filters", async ({ page }) => {
            const list = await open(page, "select-long", "Pub");
            await page.keyboard.press("Home");
            await page.keyboard.type("kv");
            const search = searchOf(page, "Pub", "select-long");
            await expect(search).toBeFocused();
            await expect(search).toHaveValue("kv");
            await expect(list.getByRole("option")).toHaveCount(1);
            await expect(list.getByRole("option", { name: "Kvarnen" })).toBeVisible();
            // Down from the field into what is left, and Enter chooses it.
            await page.keyboard.press("ArrowDown");
            await expect(list.getByRole("option", { name: "Kvarnen" })).toBeFocused();
            await page.keyboard.press("Enter");
            await expect(selectTrigger(host(page, "select-long"))).toContainText("Kvarnen");
        });

        test("not searchable: letters typed on the list move to the option that starts with them", async ({
            page,
        }) => {
            const list = await open(page, "select-short", "Storlek");
            await page.keyboard.type("m");
            await expect(list.getByRole("option", { name: "Mellan" })).toBeFocused();
            // Typed quickly, the letters are one word; after a pause, a new one.
            await page.waitForTimeout(800);
            await page.keyboard.type("st");
            await expect(list.getByRole("option", { name: "Stor" })).toBeFocused();
            await page.waitForTimeout(800);
            await page.keyboard.type("l");
            await expect(list.getByRole("option", { name: "Liten" })).toBeFocused();
            // Nothing was chosen by typing.
            await expect(list).toBeVisible();
            await expect(page.getByTestId("lab-values")).toHaveText("7|");
        });
    });
}

test.describe("BottomTabBar: which tab is active, without reading", () => {
    for (const size of [
        { name: "labels shown, 375px", width: 375, labels: true },
        { name: "icons only, 240px", width: 240, labels: false },
    ]) {
        for (const dark of [false, true]) {
            test.describe(`${size.name}, ${dark ? "dark" : "light"}`, () => {
                test.use({ viewport: { width: size.width, height: 640 }, hasTouch: true, isMobile: true });

                test("the active tab has a mark at 3:1 against the bar that the others do not have", async ({
                    page,
                }) => {
                    await gotoHydrated(page, BARS);
                    await setTheme(page, dark);
                    await page.waitForTimeout(250);
                    const measured = await page.getByTestId("lab-tabs-five").evaluate((element, toRgba) => {
                        const rgba = new Function(`return ${toRgba}`)() as (colour: string) => number[];
                        const nav = element.querySelector("nav")!;
                        const bar = rgba(getComputedStyle(nav).backgroundColor);
                        return {
                            bar,
                            tabs: [...nav.querySelectorAll("a")].map((link) => {
                                const pill = link.querySelector<HTMLElement>(":scope > span")!;
                                const style = getComputedStyle(pill);
                                const label = link.querySelector<HTMLElement>(".tabbar-label")!;
                                return {
                                    active: link.getAttribute("aria-current") === "page",
                                    pill: rgba(style.backgroundColor),
                                    outline: style.outlineStyle !== "none" ? rgba(style.outlineColor) : [0, 0, 0, 0],
                                    outlineWidth: parseFloat(style.outlineWidth),
                                    outlineInside: parseFloat(style.outlineOffset) < 0,
                                    labelShown: label.getBoundingClientRect().width > 2,
                                    pillBox: [pill.getBoundingClientRect().width, pill.getBoundingClientRect().height],
                                    tabWidth: link.getBoundingClientRect().width,
                                };
                            }),
                        };
                    }, TO_RGBA);
                    const active = measured.tabs.find((tab) => tab.active)!;
                    const others = measured.tabs.filter((tab) => !tab.active);
                    expect(active.labelShown).toBe(size.labels);

                    const pillContrast = active.pill[3] === 255 ? contrast(active.pill, measured.bar) : 1;
                    const outlineContrast =
                        active.outline[3] === 255 && active.outlineWidth >= 2 ? contrast(active.outline, measured.bar) : 1;
                    console.log(
                        `MEASURED BottomTabBar ${size.name} ${dark ? "dark" : "light"}: pill fill ${round(pillContrast)}:1, pill outline ${round(outlineContrast)}:1 against the bar`,
                    );
                    // The outline is the mark that does not need colour vision or text: 2px, at 3:1 or better.
                    expect(outlineContrast).toBeGreaterThanOrEqual(3);
                    expect(active.outlineWidth).toBeGreaterThanOrEqual(2);
                    // Inside the pill, so it is not cut off by the tab or the bar.
                    expect(active.outlineInside).toBe(true);
                    expect(active.pillBox[1]).toBe(32);
                    // The other tabs have none.
                    for (const tab of others) expect(tab.outline[3] === 255 && tab.outlineWidth > 0).toBe(false);
                });
            });
        }
    }
});
