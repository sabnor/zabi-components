import { expect, test, type Page } from "@playwright/test";

/**
 * The AppBar's title always has room.
 *
 * The bar became one row with a title that takes what is left. With the app's
 * group chip in `leading`, 336px wide in a 360px bar at enlarged text, what
 * was left was nothing: the `h1` was 0px wide, the screen had no name to see
 * and a test found a hidden heading. And a long title, the only place a pub's
 * name is shown, was cut to "79 poäng, …" with no way to read the rest.
 *
 * The title never has less than 72px. Where the back control, `leading` and
 * the actions leave it less, it takes a second row of its own, as wide as the
 * bar, and they stay together on the first. `titleLines={2}` lets it run to
 * two lines before it is cut.
 */

const LAB = "/chaos-lab/app-bar";

async function gotoLab(page: Page, query: string, percent = 100) {
    await page.goto(`${LAB}?${query}`, { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("lab-hydrated")).toBeAttached({ timeout: 30_000 });
    if (percent !== 100) {
        await page.evaluate((percent) => (document.documentElement.style.fontSize = `${percent}%`), percent);
    }
    // The bar measures itself when its size changes: let that settle.
    await page.waitForTimeout(250);
}

function measure(page: Page) {
    return page.getByTestId("lab-appbar").evaluate((host) => {
        const header = host.querySelector("header")!;
        const heading = header.querySelector<HTMLElement>("h1")!;
        const box = (node: Element) => {
            const { left, right, top, bottom, width, height } = node.getBoundingClientRect();
            return { left, right, top, bottom, width, height };
        };
        const style = getComputedStyle(heading);
        const named = (label: string) => {
            const node = header.querySelector(`[aria-label="${label}"]`);
            return node ? box(node) : null;
        };
        const chip = header.querySelector('[data-testid="lab-chip"]');
        const row = heading.parentElement!;
        return {
            header: box(header),
            heading: box(heading),
            lines: Math.round(box(heading).height / parseFloat(style.lineHeight)),
            fontSize: parseFloat(style.fontSize),
            cut: heading.scrollWidth > heading.clientWidth + 1 || heading.scrollHeight > heading.clientHeight + 1,
            back: named("Back"),
            chip: chip ? box(chip) : null,
            first: named("Favorit"),
            second: named("Dela"),
            // What the children of the row are, in document order: nothing was put around `leading`.
            order: [...row.children].map((child) =>
                child === heading
                    ? "title"
                    : child.getAttribute("aria-label") === "Back"
                      ? "back"
                      : child === chip
                        ? "leading"
                        : child.getAttribute("data-appbar-part") === "actions"
                          ? "actions"
                          : child.tagName.toLowerCase(),
            ),
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            viewport: document.documentElement.clientWidth,
        };
    });
}

const round = (value: number) => Math.round(value * 10) / 10;

test.describe("AppBar at 360px", () => {
    test.use({ viewport: { width: 360, height: 740 }, hasTouch: true, isMobile: true });

    test("a short title with no leading is the one 57px row it was", async ({ page }) => {
        await gotoLab(page, "");
        const bar = await measure(page);
        console.log(`MEASURED 360px, short title, no leading: bar ${bar.header.height}px, title ${round(bar.heading.width)}px`);
        expect(bar.header.height).toBe(57);
        expect(bar.lines).toBe(1);
        expect(bar.cut).toBe(false);
        // Back, the title, then the actions, on one row.
        expect(bar.back!.right).toBeLessThanOrEqual(bar.heading.left);
        expect(bar.heading.right).toBeLessThanOrEqual(bar.first!.left);
        expect(bar.second!.right).toBeLessThanOrEqual(360);
        expect(Math.abs((bar.heading.top + bar.heading.bottom) / 2 - (bar.back!.top + bar.back!.bottom) / 2)).toBeLessThan(1);
        expect(bar.order).toEqual(["back", "title", "actions"]);
    });

    test("a 250px chip leaves the title 86px: still one row", async ({ page }) => {
        await gotoLab(page, "leading=250&back=0&actions=0");
        const bar = await measure(page);
        console.log(`MEASURED 360px, 250px leading: bar ${bar.header.height}px, title ${round(bar.heading.width)}px`);
        expect(bar.header.height).toBe(57);
        expect(bar.heading.width).toBeGreaterThanOrEqual(72);
        expect(bar.chip!.width).toBe(250);
        expect(bar.chip!.right).toBeLessThanOrEqual(bar.heading.left);
    });

    test("a 336px chip leaves it nothing: the title takes a second row, as wide as the bar", async ({ page }) => {
        // The app's case: the group chip at 200% text.
        await gotoLab(page, "leading=336&back=0&actions=0", 200);
        const bar = await measure(page);
        console.log(
            `MEASURED 360px at 200%, 336px leading: bar ${bar.header.height}px, h1 box [${[bar.heading.left, bar.heading.top, bar.heading.width, bar.heading.height].map(round).join(", ")}], title ${bar.fontSize}px`,
        );
        expect(bar.heading.width).toBeGreaterThanOrEqual(360 - 32);
        expect(bar.heading.top).toBeGreaterThanOrEqual(bar.chip!.bottom);
        expect(bar.lines).toBe(1);
        expect(bar.cut).toBe(false);
        expect(bar.fontSize).toBeCloseTo(23.4, 1);
        // Two rows, and the heading is inside the bar.
        expect(bar.header.height).toBeGreaterThan(57);
        expect(bar.header.height).toBeLessThanOrEqual(57 + 48);
        expect(bar.heading.bottom).toBeLessThanOrEqual(bar.header.bottom);
        // The chip is what the app rendered, where it was: a child of the row, at its own width.
        expect(bar.chip!.width).toBe(336);
        expect(bar.order).toEqual(["leading", "title", "actions"]);
        expect(bar.overflow).toBe(0);
        await expect(page.getByRole("heading", { level: 1, name: "Logga besök" })).toBeVisible();
    });

    test("back, leading and the actions stay together on the first row when the title moves down", async ({
        page,
    }) => {
        await gotoLab(page, "leading=160");
        const bar = await measure(page);
        // 48 + 160 + 104 and the gaps leave the title about 8px.
        expect(bar.heading.top).toBeGreaterThanOrEqual(bar.back!.bottom - 0.5);
        expect(bar.heading.width).toBeGreaterThanOrEqual(360 - 32);
        const middle = (box: { top: number; bottom: number }) => (box.top + box.bottom) / 2;
        for (const part of [bar.chip!, bar.first!, bar.second!]) {
            expect(Math.abs(middle(part) - middle(bar.back!))).toBeLessThan(1);
        }
        // In the order they have on one row, the actions at the end.
        expect(bar.back!.right).toBeLessThanOrEqual(bar.chip!.left);
        expect(bar.chip!.right).toBeLessThanOrEqual(bar.first!.left);
        expect(bar.second!.right).toBeCloseTo(360 - 8, 0);
        // Reading order is unchanged: back, leading, title, actions.
        expect(bar.order).toEqual(["back", "leading", "title", "actions"]);
        await page.getByRole("link", { name: "Back" }).focus();
        const tabOrder = ["Back"];
        for (let press = 0; press < 2; press += 1) {
            await page.keyboard.press("Tab");
            tabOrder.push(await page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? ""));
        }
        expect(tabOrder).toEqual(["Back", "Favorit", "Dela"]);
    });

    test("a leading wider than the bar does not widen the page", async ({ page }) => {
        await gotoLab(page, "leading=500");
        const bar = await measure(page);
        expect(bar.overflow).toBe(0);
        expect(bar.viewport).toBe(360);
        // The controls are still on screen, and the title has its row.
        expect(bar.second!.right).toBeLessThanOrEqual(360);
        expect(bar.back!.left).toBeGreaterThanOrEqual(0);
        expect(bar.heading.width).toBeGreaterThanOrEqual(72);
    });

    test("a long title is one line with an ellipsis, and whole for a screen reader", async ({ page }) => {
        await gotoLab(page, `title=${encodeURIComponent("79 poäng, The Bishops Arms på Vasagatan")}&leading=120`);
        const bar = await measure(page);
        expect(bar.lines).toBe(1);
        expect(bar.cut).toBe(true);
        // The accessibility tree has all of it.
        await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
            "79 poäng, The Bishops Arms på Vasagatan",
        );
        const snapshot = await page.getByTestId("lab-appbar").ariaSnapshot();
        expect(snapshot).toContain("79 poäng, The Bishops Arms på Vasagatan");
        await expect(page.getByRole("heading", { level: 1 })).not.toHaveAttribute("title", /.*/);
    });

    test("titleLines 2: a long title runs to two lines before it is cut, and the bar grows only then", async ({
        page,
    }) => {
        const long = "79 poäng, The Bishops Arms";
        await gotoLab(page, `title=${encodeURIComponent(long)}&lines=2`);
        const bar = await measure(page);
        console.log(`MEASURED 360px, titleLines 2, long title: bar ${bar.header.height}px, ${bar.lines} lines`);
        expect(bar.lines).toBe(2);
        expect(bar.cut).toBe(false);
        // Two 24px lines are the height of the controls beside them: the bar is as good as unchanged.
        expect(bar.header.height).toBeGreaterThanOrEqual(57);
        expect(bar.header.height).toBeLessThan(58);
        // Still beside the controls: it had the room.
        expect(bar.heading.left).toBeGreaterThanOrEqual(bar.back!.right);
        expect(bar.heading.right).toBeLessThanOrEqual(bar.first!.left);

        // A short one with the same prop is the 57px bar.
        await gotoLab(page, "lines=2");
        const short = await measure(page);
        expect(short.lines).toBe(1);
        expect(short.header.height).toBe(57);

        // And one too long for two lines is cut at the second.
        await gotoLab(page, `title=${encodeURIComponent(`${long} ${long} ${long}`)}&lines=2`);
        const longest = await measure(page);
        expect(longest.lines).toBe(2);
        expect(longest.cut).toBe(true);
    });

    test("in an AppShell the top inset follows the bar's real height", async ({ page }) => {
        await gotoLab(page, "shell=1");
        const inset = () =>
            page.evaluate(() => document.documentElement.style.getPropertyValue("--app-shell-top-inset"));
        await expect.poll(inset).toBe("57px");
        await gotoLab(page, "shell=1&leading=336&back=0&actions=0");
        const bar = await measure(page);
        expect(bar.header.height).toBeGreaterThan(57);
        await expect.poll(inset).toBe(`${bar.header.height}px`);
    });
});

for (const width of [180, 240]) {
    test.describe(`AppBar at ${width}px, a back control and two actions`, () => {
        test.use({ viewport: { width, height: 640 }, hasTouch: true, isMobile: true });

        test("the title, which had under 72px, has a row of its own", async ({ page }) => {
            await gotoLab(page, "");
            const bar = await measure(page);
            console.log(
                `MEASURED ${width}px: bar ${bar.header.height}px, title ${round(bar.heading.width)}px wide at y ${round(bar.heading.top)}, cut ${bar.cut}`,
            );
            expect(bar.heading.width).toBeGreaterThanOrEqual(width - 32);
            expect(bar.lines).toBe(1);
            expect(bar.cut).toBe(false);
            for (const control of [bar.back!, bar.first!, bar.second!]) {
                expect(control.width).toBe(48);
                expect(control.bottom).toBeLessThanOrEqual(bar.heading.top + 0.5);
                expect(control.left).toBeGreaterThanOrEqual(0);
                expect(control.right).toBeLessThanOrEqual(width + 0.1);
            }
            expect(bar.header.height).toBeGreaterThan(57);
            expect(bar.header.height).toBeLessThanOrEqual(57 + 40);
            expect(bar.overflow).toBe(0);
        });
    });
}

for (const width of [280, 320, 375]) {
    test.describe(`AppBar at ${width}px, a back control and two actions`, () => {
        test.use({ viewport: { width, height: 640 }, hasTouch: true, isMobile: true });

        test("with 72px or more for the title it is one 57px row, at 100% and 200%", async ({ page }) => {
            for (const percent of [100, 200]) {
                await gotoLab(page, "", percent);
                const bar = await measure(page);
                expect(bar.header.height, `${percent}%`).toBe(57);
                expect(bar.heading.width, `${percent}%`).toBeGreaterThanOrEqual(72);
                expect(bar.heading.left).toBeGreaterThanOrEqual(bar.back!.right);
                expect(bar.heading.right).toBeLessThanOrEqual(bar.first!.left);
            }
        });
    });
}

test.describe("AppBar without scripts", () => {
    test.use({ viewport: { width: 360, height: 740 }, javaScriptEnabled: false });

    test("the server's markup already keeps the title at 72px or more", async ({ page }) => {
        // The lab reads its case from the address in the browser, so without scripts it renders nothing:
        // the bars lab has a bar in its HTML.
        await page.goto("/chaos-lab/bars", { waitUntil: "domcontentloaded" });
        const title = await page.getByRole("heading", { level: 1 }).boundingBox();
        expect(title!.width).toBeGreaterThanOrEqual(72);
    });
});
