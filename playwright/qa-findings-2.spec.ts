import { expect, test, type Locator, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * A second round of QA findings, one `describe` per finding. Each is something
 * jsdom cannot see: where an element is in a right-to-left layout, what a
 * press paints, how a row of tabs lays out at 320px, what `env()` resolves to.
 */

const PREVIEWS = "main .min-h-\\[100px\\]";

async function openPage(page: Page, name: string) {
    await page.goto(`/components/${name}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
}

async function gotoLab(page: Page, path: string) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
}

const rect = (locator: Locator) =>
    locator.evaluate((element) => {
        const { left, right, top, bottom, width, height } = element.getBoundingClientRect();
        return { left, right, top, bottom, width, height };
    });

/** Colour a token resolves to on this page, as `getComputedStyle` reports colours. */
const token = (page: Page, name: string, property: "color" | "backgroundColor" = "color") =>
    page.evaluate(
        ([variable, property]) => {
            const probe = document.createElement("div");
            probe.style[property as "color"] = `var(${variable})`;
            document.body.append(probe);
            const colour = getComputedStyle(probe)[property as "color"];
            probe.remove();
            return colour;
        },
        [name, property],
    );

test.describe("Alert: the close button mirrors in a right-to-left layout", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("it is at the end edge, and the text keeps clear of it on that side", async ({ page }) => {
        await openPage(page, "Alert");
        const close = page.locator(PREVIEWS).getByRole("button", { name: "Dismiss alert" }).first();
        const alert = close.locator("xpath=..");
        const text = alert.locator("> div").first();

        const ltr = { alert: await rect(alert), close: await rect(close) };
        expect(ltr.alert.right - ltr.close.right).toBeCloseTo(9, 0);
        expect(await text.evaluate((element) => getComputedStyle(element).paddingRight)).toBe("32px");

        await alert.evaluate((element) => element.setAttribute("dir", "rtl"));
        const rtl = { alert: await rect(alert), close: await rect(close) };
        // Mirrored: 9px from the left edge now, as it was from the right.
        expect(rtl.close.left - rtl.alert.left).toBeCloseTo(9, 0);
        expect(rtl.alert.right - rtl.close.right).toBeGreaterThan(100);
        expect(await text.evaluate((element) => getComputedStyle(element).paddingLeft)).toBe("32px");
        expect(await text.evaluate((element) => getComputedStyle(element).paddingRight)).toBe("0px");
        // The title does not run under the button.
        const title = await rect(alert.locator("h4").first());
        expect(title.left).toBeGreaterThanOrEqual(rtl.close.right);
    });
});

test.describe("MediaGrid: the remove button shows a press", () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

    for (const dark of [false, true]) {
        test(`an opaque fill one step on and the error text colour, in the ${dark ? "dark" : "light"} theme`, async ({
            page,
        }) => {
            await openPage(page, "MediaGrid");
            await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), dark);
            // Colour transitions would have the reading chase the animation.
            await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
            const button = page.locator(PREVIEWS).locator("[data-media-grid-delete]").first();
            await button.scrollIntoViewIfNeeded();
            const look = () =>
                button.evaluate((element) => {
                    const style = getComputedStyle(element);
                    return { background: style.backgroundColor, colour: style.color };
                });
            const rest = await look();
            expect(rest.background).toBe(await token(page, "--color-surface-overlay", "backgroundColor"));

            // No hover to lean on in this context: the press alone has to show.
            expect(await page.evaluate(() => matchMedia("(hover: none)").matches)).toBe(true);
            const box = (await button.boundingBox())!;
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            try {
                await expect
                    .poll(async () => (await look()).background)
                    .toBe(await token(page, "--color-surface-overlay-hover", "backgroundColor"));
                const pressed = await look();
                expect(pressed.colour).toBe(await token(page, "--color-error-text"));
                expect(pressed.background).not.toBe(rest.background);
                // Opaque, so the image under the plate does not show through.
                expect(pressed.background).not.toMatch(/rgba\([^)]*,\s*0?\.\d+\)|\/\s*0?\.\d+\)/);
            } finally {
                // Off the button before letting go, so the press deletes nothing.
                await page.mouse.move(2, 2);
                await page.mouse.up();
            }
            expect(await look()).toEqual(rest);
        });
    }
});

test.describe("Tabs fullWidth outside two or three tabs", () => {
    /** Lines each tab's label takes, and the words in it. */
    const labels = (section: Locator) =>
        section.getByRole("tab").evaluateAll((tabs) =>
            tabs.map((tab) => {
                // The label's own line boxes: a tab is as tall as the tallest in its row.
                const range = document.createRange();
                range.selectNodeContents(tab);
                const tops = new Set([...range.getClientRects()].map((box) => Math.round(box.top)));
                return {
                    text: tab.textContent!.trim(),
                    lines: tops.size,
                    words: tab.textContent!.trim().split(/\s+/).length,
                    clipped: tab.scrollWidth > tab.clientWidth + 1,
                };
            }),
        );
    const scrolling = (section: Locator) =>
        section.locator(".tabs-list").evaluate((list) => ({
            hidden: list.scrollWidth - list.clientWidth,
            overflowX: getComputedStyle(list).overflowX,
        }));
    const pageOverflow = (page: Page) =>
        page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

    test.describe("at 320px", () => {
        test.use({ viewport: { width: 320, height: 640 }, hasTouch: true, isMobile: true });

        test("five tabs keep every word whole and the row scrolls", async ({ page }) => {
            await gotoLab(page, "/chaos-lab/tabs");
            const section = page.getByTestId("lab-shared-five");
            for (const label of await labels(section)) {
                // One word, one line: "Overview" is not "Ove / rvie / w".
                expect(label.lines, label.text).toBeLessThanOrEqual(label.words);
                expect(label.clipped, label.text).toBe(false);
            }
            const list = await scrolling(section);
            expect(list.hidden).toBeGreaterThan(0);
            expect(list.overflowX).toBe("auto");
            expect(await pageOverflow(page)).toBe(0);
            // The last tab can be reached.
            await page.emulateMedia({ reducedMotion: "reduce" });
            await section.getByRole("tab").first().focus();
            await page.keyboard.press("End");
            const last = section.getByRole("tab").last();
            await expect(last).toBeFocused();
            const outer = await rect(section.locator(".tabs-list"));
            const box = await rect(last);
            expect(box.right).toBeLessThanOrEqual(outer.right + 0.5);
        });

        test("three tabs still share the row equally, and two with a long label wrap between words", async ({
            page,
        }) => {
            await gotoLab(page, "/chaos-lab/tabs");
            const three = await page
                .getByTestId("lab-shared")
                .getByRole("tab")
                .evaluateAll((tabs) => tabs.map((tab) => tab.getBoundingClientRect().width));
            expect(three[1]).toBeCloseTo(three[0], 0);
            expect(three[2]).toBeCloseTo(three[0], 0);
            expect((await scrolling(page.getByTestId("lab-shared"))).hidden).toBeLessThanOrEqual(0);

            const two = page.getByTestId("lab-shared-two");
            for (const label of await labels(two)) {
                expect(label.lines, label.text).toBeLessThanOrEqual(label.words);
                expect(label.clipped, label.text).toBe(false);
            }
            expect((await scrolling(two)).hidden).toBeLessThanOrEqual(0);
        });

        test("with text at 200%, words stay whole and nothing widens the page", async ({ page }) => {
            await gotoLab(page, "/chaos-lab/tabs");
            await page.evaluate(() => {
                document.documentElement.style.fontSize = "200%";
            });
            for (const id of ["lab-shared-two", "lab-shared-five", "lab-shared"]) {
                const section = page.getByTestId(id);
                for (const label of await labels(section)) {
                    expect(label.lines, `${id}: ${label.text}`).toBeLessThanOrEqual(label.words);
                    expect(label.clipped, `${id}: ${label.text}`).toBe(false);
                }
                // The tablist itself does not grow past its section: what does not fit scrolls.
                const widths = await section.evaluate((element) => {
                    const list = element.querySelector('[role="tablist"]')!;
                    return { section: element.clientWidth, list: list.getBoundingClientRect().width };
                });
                expect(widths.list, id).toBeLessThanOrEqual(widths.section + 0.5);
            }
            // Five tabs were 64px too wide for the page here.
            expect((await scrolling(page.getByTestId("lab-shared-five"))).hidden).toBeGreaterThan(0);
        });
    });
});

test.describe("SortableList: 8px between the move buttons on a touch screen", () => {
    const gaps = (page: Page) =>
        page
            .locator(PREVIEWS)
            .locator("[data-sortable-move='up']")
            .evaluateAll((ups) =>
                ups.map((up) => {
                    const down = up.parentElement!.querySelector("[data-sortable-move='down']")!;
                    const a = up.getBoundingClientRect();
                    const b = down.getBoundingClientRect();
                    return { gap: Math.round(Math.abs(b.left - a.right) * 10) / 10, width: a.width };
                }),
            );

    test.describe("coarse pointer, 320px", () => {
        test.use({ viewport: { width: 320, height: 700 }, hasTouch: true, isMobile: true });

        test("the two 44px targets are 8px apart, and a row still fits", async ({ page }) => {
            await openPage(page, "SortableList");
            // Full width with a 16px gutter, as an app has it: the docs card is 160px wide at 320px.
            await page.locator(PREVIEWS).first().evaluate((preview) => {
                const frame = document.createElement("div");
                frame.style.cssText =
                    "position:absolute;top:0;left:0;z-index:99999;box-sizing:border-box;width:100vw;padding:16px;background:var(--color-card)";
                frame.append(preview);
                document.body.append(frame);
                window.scrollTo(0, 0);
            });
            const measured = await gaps(page);
            expect(measured.length).toBeGreaterThan(3);
            for (const pair of measured) {
                expect(pair.width).toBe(44);
                expect(pair.gap).toBe(8);
            }
            // Handle, content and both buttons stay on one line inside the list.
            const rows = await page
                .locator("body > div")
                .last()
                .locator("[data-sortable-handle]")
                .evaluateAll((handles) =>
                    handles.map((handle) => {
                        const row = handle.closest("li")!;
                        const list = row.parentElement!.getBoundingClientRect();
                        const buttons = [...row.querySelectorAll("button")].map((button) => button.getBoundingClientRect());
                        return {
                            inside: buttons.every((box) => box.left >= list.left - 0.5 && box.right <= list.right + 0.5),
                            oneLine: new Set(buttons.map((box) => Math.round(box.top))).size === 1,
                        };
                    }),
                );
            for (const row of rows) {
                expect(row.inside).toBe(true);
                expect(row.oneLine).toBe(true);
            }
            expect(
                await page.evaluate(
                    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
                ),
            ).toBe(0);
        });
    });

    test.describe("fine pointer", () => {
        test.use({ viewport: { width: 1280, height: 800 } });

        test("the buttons are side by side at 32px, as they were", async ({ page }) => {
            await openPage(page, "SortableList");
            for (const pair of await gaps(page)) {
                expect(pair.width).toBe(32);
                expect(pair.gap).toBe(0);
            }
        });
    });
});

test.describe("Select: the list's default height follows the visible viewport", () => {
    // A touch screen 640px wide or more: narrower than that the list opens in a
    // sheet (playwright/touch-menus.spec.ts), which has no height limit of its own.
    test.use({ viewport: { width: 700, height: 667 }, hasTouch: true, isMobile: true });

    test("the default limit is 60dvh", async ({ page }) => {
        // Every Select on the docs page sets its own limit; the lab has one with the default.
        await gotoLab(page, "/chaos-lab/dropdown");
        const trigger = page.getByTestId("lab-select-default").locator('button[aria-haspopup="listbox"]');
        const list = page.getByTestId("lab-select-default").getByRole("listbox");
        await waitForHydration(page);
        if (!(await list.isVisible())) await trigger.click();
        await expect(list).toBeVisible();
        const scroller = list.locator(".overflow-y-auto").first();
        // What the component asked for, and what it comes to here: 60% of a 667px screen.
        expect(await scroller.evaluate((element) => element.style.maxHeight)).toBe("60dvh");
        expect(
            parseFloat(await scroller.evaluate((element) => getComputedStyle(element).maxHeight)),
        ).toBeCloseTo(667 * 0.6, 0);
    });
});

test.describe("Modal: the close button beside a title that wraps", () => {
    test.use({ viewport: { width: 375, height: 667 }, hasTouch: true, isMobile: true });

    test("it keeps its 32px beside the title, inside the panel", async ({ page }) => {
        await openPage(page, "Modal");
        const opener = page.locator(PREVIEWS).getByRole("button", { name: "Open modal" }).first();
        const dialog = page.getByRole("dialog").last();
        await waitForHydration(page);
        if (!(await dialog.isVisible())) await opener.click();
        await expect(dialog).toBeVisible();
        await page.waitForTimeout(400);

        const title = dialog.locator("h2").first();
        await title.evaluate((element) => {
            element.textContent =
                "Confirm the changes to every team's schedule for the autumn season before they are published";
        });
        const heading = await rect(title);
        const close = dialog.getByRole("button", { name: /close/i }).first();
        const button = await rect(close);
        // The title really wraps.
        expect(heading.height).toBeGreaterThan(50);
        expect(button.width).toBe(32);
        expect(button.height).toBe(32);
        // Beside the title, inside the panel, not squeezed by it.
        const panel = await rect(dialog);
        expect(button.right).toBeLessThanOrEqual(panel.right);
        expect(button.left).toBeGreaterThanOrEqual(heading.right - 0.5);
        expect(button.top).toBeGreaterThanOrEqual(heading.top - 0.5);
        expect(button.bottom).toBeLessThanOrEqual(heading.bottom + 0.5);
    });
});

test.describe("TopNavbar: the phone menu under a status bar", () => {
    test.use({ viewport: { width: 568, height: 320 }, hasTouch: true, isMobile: true });

    test("the top safe-area inset comes off the menu's height limit", async ({ page }) => {
        await page.goto("/chaos-lab/top-navbar", { waitUntil: "domcontentloaded" });
        await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
        const menuButton = page.getByRole("button", { name: /^(Open|Close) menu$/ });
        await menuButton.click();
        const panel = page.locator("[id^='topnavbar-menu']");
        await expect(panel).toBeVisible();
        const limit = () => panel.evaluate((element) => parseFloat(getComputedStyle(element).maxHeight));

        // 320 - 64 (bar) - 1 (border).
        expect(await limit()).toBeCloseTo(255, 0);

        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setSafeAreaInsetsOverride", { insets: { top: 47 } });
        await expect.poll(limit).toBeCloseTo(208, 0);
        // Still its own scroller, now inside what is left.
        await expect(panel).toHaveAttribute("data-scrolls", "");
        expect((await rect(panel)).height).toBeLessThanOrEqual(208.5);
    });
});
