import { expect, test, type Locator, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * AppShell, AppBar and BottomTabBar on a phone-sized screen: the parts jsdom
 * cannot show.
 *
 * The layout is the feature: a shell exactly as tall as the screen, a middle
 * that scrolls, bars that stay, targets big enough for a thumb, and nothing
 * scrolling sideways at 320px. None of that exists without a stylesheet and
 * layout. Nor does a bar that follows the scrolling of its container.
 *
 * The demo opens the shell over the whole page, so here it fills the viewport
 * the way it does in an app.
 */

const PHONE = { width: 375, height: 740 };
const NARROW = { width: 320, height: 568 };

const fullScreen = (page: Page) => page.getByTestId("app-shell-demo-full-screen");
const shell = (page: Page) => fullScreen(page).getByTestId("app-shell-demo");
const scroller = (page: Page) => shell(page).locator("[data-app-shell-scroller]");
// A banner in an app. On this page the demo sits inside the site's own main,
// where a header is not a landmark, so it is found by its element.
const bar = (page: Page) => shell(page).locator("header");
const tabs = (page: Page) => shell(page).getByRole("navigation", { name: "Main" });
const tab = (page: Page, name: string) => tabs(page).getByRole("link", { name });
/** By its whole name: "Me" is also the end of "Home". */
const tabNamed = (page: Page, name: string) =>
    tabs(page).getByRole("link", { name, exact: true });
const floating = (page: Page) => shell(page).getByRole("button", { name: "New quiz" });

/** The page is usable before it hydrates; a click that lands early opens nothing. */
async function openShell(page: Page) {
    await page.goto("/components/AppShell", { waitUntil: "domcontentloaded" });
    await waitForHydration(page);
    await page.getByRole("button", { name: "Open full screen" }).click();
    await expect(fullScreen(page)).toBeVisible();
}

async function box(locator: Locator) {
    const rect = await locator.boundingBox();
    expect(rect, "The element must be laid out").not.toBeNull();
    return rect!;
}

/** Scrolls the middle of the shell the way a finger or a wheel does: in steps. */
async function scrollBy(page: Page, distance: number) {
    const step = distance > 0 ? 40 : -40;
    for (let moved = 0; Math.abs(moved) < Math.abs(distance); moved += step) {
        await scroller(page).evaluate((el, by) => el.scrollBy(0, by), step);
        await page.waitForTimeout(16);
    }
}

const collapsed = (page: Page) => bar(page).getAttribute("data-collapsed");

test.describe("AppShell on a phone", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
        await openShell(page);
    });

    test("is as tall as the screen: the bars stay and only the middle scrolls", async ({
        page,
    }) => {
        const host = await box(shell(page));
        expect(host.x).toBe(0);
        expect(host.y).toBe(0);
        expect(host.width).toBe(PHONE.width);
        expect(host.height).toBe(PHONE.height);

        const header = await box(bar(page));
        const footer = await box(tabs(page));
        expect(header.y, "The top bar is at the top").toBe(0);
        expect(footer.y + footer.height, "The tab bar ends at the bottom").toBe(PHONE.height);

        expect(
            await scroller(page).evaluate((el) => el.scrollHeight > el.clientHeight),
            "The content must scroll, or this proves nothing",
        ).toBe(true);
        expect(
            await scroller(page).evaluate((el) => getComputedStyle(el).overflowY),
        ).toBe("auto");

        // To the end: the last row clears the tab bar, and the bars have not moved.
        await scroller(page).evaluate((el) => (el.scrollTop = el.scrollHeight));
        const last = await box(shell(page).getByText("Round 24"));
        expect(last.y + last.height).toBeLessThanOrEqual(footer.y);
        expect((await box(tabs(page))).y).toBe(footer.y);
        expect(await shell(page).evaluate((el) => el.scrollTop), "The shell itself never scrolls").toBe(0);
    });

    test("regions: one header, one content element, one navigation, in that order", async ({
        page,
    }) => {
        await expect(bar(page)).toHaveCount(1);
        await expect(shell(page).locator("[data-app-shell-content]")).toHaveCount(1);
        await expect(shell(page).getByRole("navigation")).toHaveCount(1);
        await expect(bar(page).getByRole("heading", { name: "Quiz" })).toBeVisible();

        const order = await shell(page).evaluate((el) =>
            [...el.querySelectorAll("header, [data-app-shell-content], nav")].map(
                (node) => node.tagName,
            ),
        );
        // A div here: the demo passes contentElement="div", because...
        expect(order).toEqual(["HEADER", "DIV", "NAV"]);
    });

    test("the demo page has exactly one main: the site's own", async ({ page }) => {
        // ...the page the demo sits in already has one. In the frame and full screen.
        await expect(page.locator("main")).toHaveCount(1);
        await expect(shell(page).locator("main")).toHaveCount(0);
        await bar(page).getByRole("button", { name: "Close full screen" }).click();
        await expect(fullScreen(page)).toHaveCount(0);
        await expect(page.locator("main")).toHaveCount(1);
        await expect(page.getByTestId("app-shell-demo").locator("main")).toHaveCount(0);
    });

    test("does not scroll sideways at 320px, and every tab fits", async ({ page }) => {
        await page.setViewportSize(NARROW);

        expect((await box(shell(page))).width).toBe(NARROW.width);
        for (const region of [shell(page), scroller(page), bar(page), tabs(page)]) {
            expect(
                await region.evaluate((el) => el.scrollWidth <= el.clientWidth),
                "Nothing overflows sideways",
            ).toBe(true);
        }

        const links = await tabs(page).getByRole("link").all();
        expect(links).toHaveLength(5);
        for (const link of links) {
            const rect = await box(link);
            expect(rect.x).toBeGreaterThanOrEqual(0);
            expect(rect.x + rect.width).toBeLessThanOrEqual(NARROW.width);
            // The label is whole: not cut off inside its tab.
            expect(await link.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        }

        // The title and both actions still fit beside the back control.
        const actions = await bar(page).getByRole("button").all();
        for (const action of actions) {
            const rect = await box(action);
            expect(rect.x + rect.width).toBeLessThanOrEqual(NARROW.width);
        }
    });

    test("still fits at 320px with the text enlarged to 200%", async ({ page }) => {
        await page.setViewportSize(NARROW);
        // What a text-size setting does: every rem doubles, the screen does not.
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));

        for (const region of [shell(page), scroller(page), bar(page), tabs(page)]) {
            expect(await region.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        }
        const footer = await box(tabs(page));
        expect(footer.y + footer.height, "The tab bar is still on screen").toBe(NARROW.height);
        for (const link of await tabs(page).getByRole("link").all()) {
            const rect = await box(link);
            expect(rect.x).toBeGreaterThanOrEqual(0);
            expect(rect.x + rect.width).toBeLessThanOrEqual(NARROW.width);
            expect(
                await link.evaluate((el) => el.scrollWidth <= el.clientWidth),
                "Nothing of a tab reaches outside it",
            ).toBe(true);
        }
        // The bars are chrome: they keep their height, and the page gets the room.
        expect(footer.height).toBe(65);
        expect((await box(bar(page))).height).toBe(57);
        await expect(bar(page).getByRole("heading", { name: "Quiz" })).toBeVisible();
        // Some of the content is still visible between the bars.
        const header = await box(bar(page));
        expect(footer.y - (header.y + header.height)).toBeGreaterThan(100);
    });

    for (const viewport of [PHONE, NARROW]) {
        test(`tab targets are at least 44px with 8px between them at ${viewport.width}px`, async ({
            page,
        }) => {
            await page.setViewportSize(viewport);
            const rects = [];
            for (const link of await tabs(page).getByRole("link").all()) {
                rects.push(await box(link));
            }
            expect(rects).toHaveLength(5);
            for (const rect of rects) {
                expect(rect.width).toBeGreaterThanOrEqual(44);
                expect(rect.height).toBeGreaterThanOrEqual(44);
            }
            for (let index = 1; index < rects.length; index += 1) {
                const gap = rects[index].x - (rects[index - 1].x + rects[index - 1].width);
                expect(gap).toBeGreaterThanOrEqual(8);
            }

            // The same for the controls in the top bar.
            const controls = [];
            for (const control of await bar(page).getByRole("button").all()) {
                controls.push(await box(control));
            }
            expect(controls).toHaveLength(3);
            for (const rect of controls) {
                expect(rect.width).toBeGreaterThanOrEqual(44);
                expect(rect.height).toBeGreaterThanOrEqual(44);
            }
            for (let index = 1; index < controls.length; index += 1) {
                const gap =
                    controls[index].x - (controls[index - 1].x + controls[index - 1].width);
                expect(gap).toBeGreaterThanOrEqual(8);
            }
        });
    }

    test("aria-current marks one tab, moves with the page, and is never cleared", async ({
        page,
    }) => {
        const current = tabs(page).locator('a[aria-current="page"]');
        await expect(current).toHaveCount(1);
        await expect(current).toHaveText("Quiz");

        await tab(page, "Teams").click();
        await expect(current).toHaveCount(1);
        await expect(current).toHaveText("Teams");
        await expect(bar(page).getByRole("heading", { name: "Teams" })).toBeVisible();

        // Pressing the active tab again is a link press like any other.
        await tab(page, "Teams").click();
        await expect(current).toHaveCount(1);
        await expect(current).toHaveText("Teams");

        // The keyboard reaches the tabs and Enter follows one.
        await tab(page, "Teams").focus();
        await page.keyboard.press("Tab");
        await expect(tab(page, "Inbox, 3 new")).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(current).toHaveCount(1);
        await expect(current).toHaveAttribute("href", "/inbox");
    });

    test("the count is part of the tab's name, and the active tab differs by more than colour", async ({
        page,
    }) => {
        await expect(tab(page, "Inbox, 3 new")).toBeVisible();
        await expect(tabs(page).getByRole("link", { name: "Inbox", exact: true })).toHaveCount(0);

        const weight = (name: string) =>
            tab(page, name).evaluate((el) => Number(getComputedStyle(el).fontWeight));
        const pill = (name: string) =>
            tab(page, name)
                .locator("span")
                .first()
                .evaluate((el) => getComputedStyle(el).backgroundColor);
        expect(await weight("Quiz")).toBeGreaterThan(await weight("Home"));
        expect(await pill("Home")).toBe("rgba(0, 0, 0, 0)");
        expect(await pill("Quiz")).not.toBe("rgba(0, 0, 0, 0)");
    });

    test("radius: the tab's corners follow the active pill inside it, 4px out on every side", async ({
        page,
    }) => {
        const link = tab(page, "Quiz");
        const pill = link.locator("span").first();
        const outer = await box(link);
        const inner = await box(pill);
        // The pill is 32px high, so 16px at its ends.
        expect(Math.round(inner.height)).toBe(32);
        expect(Math.round(inner.y - outer.y), "4px above the pill").toBe(4);
        expect(Math.round(inner.x - outer.x), "at least 4px beside it").toBeGreaterThanOrEqual(4);
        expect(await link.evaluate((el) => getComputedStyle(el).borderTopLeftRadius)).toBe("20px");
        // And 4px under the label, so the box is the same all round.
        const label = await box(link.locator("span").last());
        expect(Math.round(outer.y + outer.height - (label.y + label.height))).toBe(4);
    });

    test("a focused tab shows a focus ring", async ({ page }) => {
        await bar(page).getByRole("button", { name: "Share" }).focus();
        // Past the floating button, to the first tab.
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await expect(tab(page, "Home")).toBeFocused();
        expect(
            await tab(page, "Home").evaluate((el) => getComputedStyle(el).boxShadow),
        ).not.toBe("none");
    });

    test("the custom properties are the real heights of the bars", async ({ page }) => {
        const header = await box(bar(page));
        const footer = await box(tabs(page));
        await expect
            .poll(() =>
                shell(page).evaluate((el) => [
                    el.style.getPropertyValue("--app-shell-top-inset"),
                    el.style.getPropertyValue("--app-shell-bottom-inset"),
                ]),
            )
            .toEqual([`${header.height}px`, `${footer.height}px`]);

        // The same two on <html>, for what is rendered outside the shell.
        expect(
            await page.evaluate(() => [
                document.documentElement.style.getPropertyValue("--app-shell-top-inset"),
                document.documentElement.style.getPropertyValue("--app-shell-bottom-inset"),
            ]),
        ).toEqual([`${header.height}px`, `${footer.height}px`]);

        // What they are for: the floating button sits 16px above the tab bar...
        const button = await box(floating(page));
        expect(footer.y - (button.y + button.height)).toBe(16);
        // ...and stays there while the content scrolls under it.
        await scroller(page).evaluate((el) => (el.scrollTop = 600));
        expect((await box(floating(page))).y).toBe(button.y);
    });

    test("the bars and the properties stay as they are when the text is enlarged", async ({ page }) => {
        // They used to grow with the text, and the properties followed them.
        // The bars are sized in px now, so there is nothing to follow.
        const before = await box(tabs(page));
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        await page.waitForTimeout(300);
        expect((await box(tabs(page))).height).toBe(before.height);
        const footer = await box(tabs(page));
        await expect
            .poll(() =>
                shell(page).evaluate((el) => el.style.getPropertyValue("--app-shell-bottom-inset")),
            )
            .toBe(`${footer.height}px`);
        // The button's margin is in px: it does not grow with the text.
        const button = await box(floating(page));
        expect(footer.y - (button.y + button.height)).toBe(16);
        await expect
            .poll(() =>
                page.evaluate(() =>
                    document.documentElement.style.getPropertyValue("--app-shell-bottom-inset"),
                ),
            )
            .toBe(`${footer.height}px`);
    });

    test("the properties leave <html> with the shell", async ({ page }) => {
        const onRoot = () =>
            page.evaluate(() =>
                document.documentElement.style.getPropertyValue("--app-shell-bottom-inset"),
            );
        await expect.poll(onRoot).toMatch(/px$/);
        // Back to the framed example and away from the page: no shell is left.
        await bar(page).getByRole("button", { name: "Close full screen" }).click();
        await page.getByRole("link", { name: "Components", exact: true }).last().click();
        await expect(page).not.toHaveURL(/AppShell/);
        await expect.poll(onRoot).toBe("");
    });
});

test.describe("AppBar collapse on scroll, inside AppShell", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
        await openShell(page);
    });

    test("slides away on the way down and returns on the way up; the tab bar stays", async ({
        page,
    }) => {
        expect(await collapsed(page)).toBe("false");
        const footer = await box(tabs(page));

        await scrollBy(page, 400);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");
        await expect
            .poll(async () => {
                const rect = await box(bar(page));
                return rect.y + rect.height;
            }, { message: "The bar has left the screen" })
            .toBeLessThanOrEqual(0);
        expect((await box(tabs(page))).y, "The tab bar does not move").toBe(footer.y);
        // The content did not jump: the bar moved over it, not out of the flow.
        expect(await scroller(page).evaluate((el) => el.scrollTop)).toBe(400);

        await scrollBy(page, -80);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "false");
        await expect.poll(async () => (await box(bar(page))).y).toBe(0);
    });

    test("is always showing at the top", async ({ page }) => {
        await scrollBy(page, 400);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");
        await scroller(page).evaluate((el) => (el.scrollTop = 0));
        await expect(bar(page)).toHaveAttribute("data-collapsed", "false");
    });

    test("taps go through the place the bar left", async ({ page }) => {
        await scrollBy(page, 400);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");
        await expect.poll(async () => (await box(bar(page))).y).toBeLessThan(-50);
        const hit = await page.evaluate(() => {
            const element = document.elementFromPoint(100, 20);
            return {
                inMain: Boolean(element?.closest("[data-app-shell-content]")),
                inHeader: Boolean(element?.closest("[data-app-shell-header]")),
            };
        });
        expect(hit).toEqual({ inMain: true, inHeader: false });
    });

    test("a click on an action does not hold the bar; the next key press brings it back", async ({
        page,
    }) => {
        const search = bar(page).getByRole("button", { name: "Search" });
        await search.click();
        await expect(search).toBeFocused();

        // Focus is in the bar, but the mouse put it there: the bar hides as usual.
        await scrollBy(page, 400);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");
        await expect(search, "Focus stays where the click left it").toBeFocused();

        // A key: the keyboard is in use now, so the bar comes back and stays.
        await page.keyboard.press("Shift");
        await expect(bar(page)).toHaveAttribute("data-collapsed", "false");
        await expect.poll(async () => (await box(bar(page))).y).toBe(0);
        await scrollBy(page, 200);
        expect(await collapsed(page)).toBe("false");
        await expect(search).toBeFocused();
    });

    test("never hides while keyboard focus is inside it, and comes back when focus arrives", async ({
        page,
    }) => {
        // Focus in the bar: scrolling down leaves it where it is.
        await bar(page).getByRole("button", { name: "Search" }).focus();
        await scrollBy(page, 400);
        expect(await collapsed(page)).toBe("false");
        expect((await box(bar(page))).y).toBe(0);

        // Focus elsewhere: now it goes.
        await tab(page, "Home").focus();
        await scrollBy(page, 200);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");

        // Shift+Tab from the first tab goes back through the floating button
        // into the bar, which is still in the tab order while it is away.
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Shift+Tab");
        await expect(bar(page).getByRole("button", { name: "Share" })).toBeFocused();
        await expect(bar(page)).toHaveAttribute("data-collapsed", "false");
        await expect.poll(async () => (await box(bar(page))).y).toBe(0);
    });

    test("animates the move, except under reduced motion", async ({ page }) => {
        const transition = () =>
            bar(page).evaluate((el) => {
                const style = getComputedStyle(el);
                return { property: style.transitionProperty, duration: style.transitionDuration };
            });
        expect((await transition()).property).toContain("transform");
        expect((await transition()).duration).toBe("0.2s");

        await page.emulateMedia({ reducedMotion: "reduce" });
        expect((await transition()).property).toBe("none");

        // It still collapses, at once.
        await scrollBy(page, 400);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");
        const rect = await box(bar(page));
        expect(rect.y + rect.height).toBeLessThanOrEqual(0);
    });
});

test.describe("AppBar and BottomTabBar on their own", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
    });

    test("BottomTabBar marks the section of the page it is on when no tab is passed", async ({
        page,
    }) => {
        await page.goto("/components/BottomTabBar", { waitUntil: "domcontentloaded" });
        const site = page.getByRole("navigation", { name: "Site sections" });
        // The server cannot know the page; the mark arrives when the bar runs.
        const current = site.locator('a[aria-current="page"]');
        await expect(current).toHaveCount(1, { timeout: 30_000 });
        await expect(current).toHaveText("Components");
        await expect(current).toHaveAttribute("href", "/components");
    });

    test("BottomTabBar shows a capped count and reads out the real one", async ({ page }) => {
        await page.goto("/components/BottomTabBar", { waitUntil: "domcontentloaded" });
        const app = page.getByRole("navigation", { name: "Quiz app" });
        await expect(app.getByRole("link", { name: "Me, 120 unread" })).toBeVisible();
        await expect(app.getByRole("link", { name: "Me, 120 unread" })).toContainText("99+");
        await expect(app.getByRole("link", { name: "Inbox, 3 unread" })).toBeVisible();
    });

    test("AppBar follows a scrolling box of its own, and its back link is a 44px target", async ({
        page,
    }) => {
        await page.goto("/components/AppBar", { waitUntil: "domcontentloaded" });
        const frame = page.getByTestId("app-bar-demo-scroller");
        const header = page.getByTestId("app-bar-demo-collapsing");
        await frame.scrollIntoViewIfNeeded();

        const back = await box(header.getByRole("link", { name: "Back" }));
        expect(back.width).toBeGreaterThanOrEqual(44);
        expect(back.height).toBeGreaterThanOrEqual(44);

        // Hydrated when scrolling moves it.
        await waitForHydration(page);
        await frame.evaluate((el) => (el.scrollTop = 0));
        for (let step = 0; step < 8; step += 1) {
            await frame.evaluate((el) => el.scrollBy(0, 40));
            await page.waitForTimeout(16);
        }
        await expect(header).toHaveAttribute("data-collapsed", "true");

        const outer = await box(frame);
        await expect
            .poll(async () => {
                const rect = await box(header);
                return rect.y + rect.height;
            })
            .toBeLessThanOrEqual(outer.y + 1);

        await frame.evaluate((el) => el.scrollBy(0, -60));
        await expect(header).toHaveAttribute("data-collapsed", "false");
    });
});

test.describe("AppShell: notch, writing direction, enlarged text and focus", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(PHONE);
        await openShell(page);
    });

    test("under a status bar the collapsed bar leaves an empty strip, not its controls", async ({
        page,
    }) => {
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setSafeAreaInsetsOverride", {
            insets: { top: 47, bottom: 34 },
        });
        // The bars grow by the insets, and say so.
        await expect.poll(async () => (await box(bar(page))).height).toBe(57 + 47);
        const footer = await box(tabs(page));
        expect(footer.y + footer.height).toBe(PHONE.height);
        const lastTab = await box(tabNamed(page, "Me"));
        expect(
            PHONE.height - (lastTab.y + lastTab.height),
            "The tabs are clear of the home indicator",
        ).toBeGreaterThanOrEqual(34);
        const back = bar(page).getByRole("button", { name: "Close full screen" });
        expect((await box(back)).y, "The controls are below the status bar").toBeGreaterThanOrEqual(47);

        await scrollBy(page, 400);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");
        // What stays is as tall as the status bar...
        await expect
            .poll(async () => {
                const rect = await box(bar(page));
                return rect.y + rect.height;
            })
            .toBe(47);
        // ...and shows none of the controls, which are behind it by then.
        const row = bar(page).locator("> div");
        await expect.poll(() => row.evaluate((el) => getComputedStyle(el).opacity)).toBe("0");
        expect(await row.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe("none");

        // Still in the tab order; focus brings the bar and its controls back.
        await tabNamed(page, "Home").focus();
        await page.keyboard.press("Shift+Tab");
        await page.keyboard.press("Shift+Tab");
        await expect(bar(page).getByRole("button", { name: "Share" })).toBeFocused();
        await expect(bar(page)).toHaveAttribute("data-collapsed", "false");
        await expect.poll(() => row.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
        await expect.poll(async () => (await box(bar(page))).y).toBe(0);
    });

    test("mirrors from right to left: back arrow, order and badge", async ({ page }) => {
        await page.evaluate(() => (document.documentElement.dir = "rtl"));

        const back = await box(bar(page).getByRole("button", { name: "Close full screen" }));
        const title = await box(bar(page).getByRole("heading", { name: "Quiz" }));
        const share = await box(bar(page).getByRole("button", { name: "Share" }));
        expect(back.x, "Back is at the start: the right").toBeGreaterThan(title.x);
        expect(share.x, "The actions are at the end: the left").toBeLessThan(title.x);
        expect(
            await bar(page)
                .getByRole("button", { name: "Close full screen" })
                .locator("svg")
                .evaluate((el) => getComputedStyle(el).rotate),
            "The arrow points the way back",
        ).toBe("180deg");

        const home = await box(tabNamed(page, "Home"));
        const me = await box(tabNamed(page, "Me"));
        expect(home.x).toBeGreaterThan(me.x);

        // The count sits on the trailing side of its icon: the left here.
        const inbox = tab(page, "Inbox, 3 new");
        const icon = await box(inbox.locator("svg"));
        const badge = await box(inbox.getByText("3", { exact: true }));
        expect(badge.x + badge.width / 2).toBeLessThan(icon.x + icon.width / 2);

        for (const region of [shell(page), scroller(page), bar(page), tabs(page)]) {
            expect(await region.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
        }
    });

    test("at 320px and 200% a label is one line, never broken in a word, and the bars leave the screen to the content", async ({
        page,
    }) => {
        await page.setViewportSize(NARROW);
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));

        // The gaps do not grow with the text, so the labels get the room.
        const rects = [];
        for (const link of await tabs(page).getByRole("link").all()) rects.push(await box(link));
        for (let index = 1; index < rects.length; index += 1) {
            const gap = rects[index].x - (rects[index - 1].x + rects[index - 1].width);
            expect(gap).toBeGreaterThanOrEqual(8);
            expect(gap).toBeLessThan(10);
        }
        for (const name of ["Home", "Quiz", "Teams", "Inbox, 3 new", "Me"]) {
            const lines = await tabNamed(page, name)
                .locator("> span")
                .last()
                .evaluate(
                    (el) =>
                        el.getBoundingClientRect().height /
                        parseFloat(getComputedStyle(el).lineHeight),
                );
            expect(Math.round(lines), `${name} is on one line`).toBe(1);
        }
        // 65px of tab bar and 57px of top bar on a 568px screen, as at 100%.
        expect((await box(tabs(page))).height).toBe(65);
        expect((await box(bar(page))).height).toBe(57);
        // With the top bar away, as it is once the page scrolls.
        await scrollBy(page, 400);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");
        const footer = await box(tabs(page));
        expect(footer.y).toBeGreaterThan(NARROW.height / 2);
    });

    test("the active tab keeps a shape in forced-colors mode", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const outline = (name: string) =>
            tabNamed(page, name)
                .locator("> span")
                .first()
                .evaluate((el) => {
                    const style = getComputedStyle(el);
                    return {
                        style: style.outlineStyle,
                        width: style.outlineWidth,
                        color: style.outlineColor,
                    };
                });
        const active = await outline("Quiz");
        expect(active.style).toBe("solid");
        expect(active.width).toBe("2px");
        expect(active.color, "The system paints the transparent outline").not.toBe(
            "rgba(0, 0, 0, 0)",
        );
        expect((await outline("Home")).style).toBe("none");
    });

    test("a focused control in the content is never under either bar", async ({ page }) => {
        // The demo's rows hold nothing to focus: give each one a button.
        await shell(page)
            .locator("[data-app-shell-content] li")
            .evaluateAll((rows) => {
                rows.forEach((row, index) => {
                    const button = document.createElement("button");
                    button.type = "button";
                    button.textContent = `Open ${index + 1}`;
                    button.style.cssText = "display:block;min-height:44px";
                    row.append(button);
                });
            });
        const clear = async () => {
            const focused = await box(page.locator(":focus"));
            const header = await box(bar(page));
            const footer = await box(tabs(page));
            expect(focused.y, "Not under the top bar").toBeGreaterThanOrEqual(
                Math.max(0, header.y + header.height),
            );
            expect(focused.y + focused.height, "Not under the tab bar").toBeLessThanOrEqual(
                footer.y,
            );
        };

        await bar(page).getByRole("button", { name: "Share" }).focus();
        for (let step = 0; step < 12; step += 1) {
            await page.keyboard.press("Tab");
            await expect(page.locator(":focus")).toHaveText(`Open ${step + 1}`);
            await clear();
        }
        // Back up: the bar returns as the page scrolls up, over where focus lands
        // unless the scroll padding keeps it clear.
        for (let step = 11; step >= 1; step -= 1) {
            await page.keyboard.press("Shift+Tab");
            await expect(page.locator(":focus")).toHaveText(`Open ${step}`);
            // Let the bar finish sliding back in.
            await page.waitForTimeout(250);
            await clear();
        }
    });
});

test.describe("AppBar collapse on scroll — touch", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: PHONE });

    test.beforeEach(async ({ page }) => {
        await openShell(page);
    });

    test("touch: a tap on an action leaves the bar free to hide, again and again", async ({
        page,
    }) => {
        const search = bar(page).getByRole("button", { name: "Search" });
        await search.tap();
        // The tap leaves focus on the button, and nothing on a phone moves it away.
        await expect(search).toBeFocused();

        await scrollBy(page, 400);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");
        await expect
            .poll(async () => {
                const rect = await box(bar(page));
                return rect.y + rect.height;
            })
            .toBeLessThanOrEqual(0);

        // Back up, tap the other action, and it hides once more.
        await scrollBy(page, -80);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "false");
        await expect.poll(async () => (await box(bar(page))).y).toBe(0);
        const share = bar(page).getByRole("button", { name: "Share" });
        await share.tap();
        await expect(share).toBeFocused();
        await scrollBy(page, 200);
        await expect(bar(page)).toHaveAttribute("data-collapsed", "true");
    });

    test("touch: a keyboard attached to the phone still holds the bar", async ({ page }) => {
        await bar(page).getByRole("button", { name: "Search" }).tap();
        await page.keyboard.press("Tab");
        await expect(bar(page).getByRole("button", { name: "Share" })).toBeFocused();
        await scrollBy(page, 400);
        expect(await collapsed(page)).toBe("false");
        expect((await box(bar(page))).y).toBe(0);
    });
});
