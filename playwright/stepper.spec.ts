import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * Stepper in a browser: the parts jsdom cannot show.
 *
 * Which layout shows is a container query, and jsdom has neither layout nor
 * queries. So the switch, the two drawings, the 44px targets, enlarged text,
 * right-to-left, forced colours, reduced motion and the measured contrast of
 * every marker state are all here.
 */

const MIN_TARGET = 44;
/** `layout="auto"` is full from 30rem of the Stepper's own width: 480px at the default text size. */
const THRESHOLD = 480;

const basic = (page: Page) => page.getByTestId("stepper-demo-basic");
const basicFrame = (page: Page) => page.getByTestId("stepper-demo-basic-frame");
const basicValue = (page: Page) => page.getByTestId("stepper-demo-basic-value");
const interactive = (page: Page) => page.getByTestId("stepper-demo-interactive");
const interactiveValue = (page: Page) => page.getByTestId("stepper-demo-interactive-value");
const steps = (host: Locator) => host.locator(".stepper-step");
const markers = (host: Locator) => host.locator(".stepper-marker");
const labels = (host: Locator) => host.locator(".stepper-label");
const summary = (host: Locator) => host.locator("[data-stepper-summary]");
const status = (host: Locator) => host.locator("[data-stepper-status]");

/** The page is usable before it hydrates; a press that lands early changes nothing. */
async function gotoHydrated(page: Page) {
    await page.goto("/components/Stepper", { waitUntil: "domcontentloaded" });
    await expect(async () => {
        // Back and forth, so the example ends where it started: at the second step.
        const before = await basicValue(page).textContent();
        const button = page.getByTestId(before === "1" ? "stepper-demo-basic-back" : "stepper-demo-basic-next");
        await button.click();
        await expect(basicValue(page)).not.toHaveText(before!, { timeout: 1_000 });
    }).toPass({ timeout: 30_000 });
    if ((await basicValue(page).textContent()) !== "1") {
        await page.getByTestId("stepper-demo-basic-next").click();
    }
    await expect(basicValue(page)).toHaveText("1");
    // The announcement of those presses is taken away after three seconds; no test below waits on it.
}

async function boxes(locator: Locator) {
    return locator.evaluateAll((elements) =>
        elements.map((element) => {
            const { x, y, width, height } = element.getBoundingClientRect();
            return { x, y, width, height };
        }),
    );
}

/**
 * Lays an example out as an app would: across the screen with a 16px gutter
 * each side, or in a box of a given width. The docs page puts each example in
 * a card that is narrower than a phone at phone widths.
 */
async function inABox(element: Locator, width: string = "100vw") {
    await element.evaluate((node, boxWidth) => {
        const frame = document.createElement("div");
        frame.setAttribute("data-test-box", "");
        frame.style.cssText = `position:absolute;top:0;left:0;z-index:99999;box-sizing:border-box;width:${boxWidth};padding:16px;background:var(--color-card)`;
        frame.append(node);
        document.body.append(frame);
        window.scrollTo(0, 0);
    }, width);
}

const isCompact = async (host: Locator) => (await summary(host).evaluate((node) => getComputedStyle(node).display)) !== "none";

/** Nothing wider than the screen, and nothing wider than the Stepper inside it. */
async function expectNoSidewaysScroll(page: Page, host: Locator) {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, "the page does not scroll sideways").toBeLessThanOrEqual(0);
    await expectNothingOutside(host);
}

async function expectNothingOutside(host: Locator) {
    const inside = await host.evaluate((nav) => {
        const edge = nav.getBoundingClientRect();
        let worst = 0;
        for (const element of nav.querySelectorAll<HTMLElement>(".stepper-marker, .stepper-label, .stepper-summary p, .stepper-connector")) {
            const box = element.getBoundingClientRect();
            if (box.width === 0) continue;
            worst = Math.max(worst, edge.left - box.left, box.right - edge.right);
        }
        return worst;
    });
    expect(inside, "nothing reaches outside the Stepper").toBeLessThanOrEqual(0.5);
}

/** WCAG contrast of every pair asked for, computed in the page from what is drawn. */
async function contrasts(host: Locator) {
    return host.evaluate((nav) => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const context = canvas.getContext("2d", { willReadFrequently: true })!;
        const luminance = (colour: string) => {
            context.clearRect(0, 0, 1, 1);
            context.fillStyle = colour;
            context.fillRect(0, 0, 1, 1);
            const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((channel) => {
                const value = channel / 255;
                return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
            });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const ratio = (one: string, other: string) => {
            const [light, dark] = [luminance(one), luminance(other)].sort((a, b) => b - a);
            return (light + 0.05) / (dark + 0.05);
        };
        const probe = document.createElement("div");
        document.body.append(probe);
        const token = (variable: string) => {
            probe.style.color = `var(${variable})`;
            return getComputedStyle(probe).color;
        };
        const style = (state: string, part: string) =>
            getComputedStyle(nav.querySelector(`.stepper-step[data-state="${state}"] ${part}`)!);

        const drawn = {
            "completed marker fill": style("completed", ".stepper-marker").backgroundColor,
            "current marker fill": style("current", ".stepper-marker").backgroundColor,
            "current marker ring": style("current", ".stepper-marker").borderTopColor,
            "upcoming marker edge": style("upcoming", ".stepper-marker").borderTopColor,
            "connector, done": style("completed", ".stepper-connector").borderTopColor,
            "connector, to do": style("current", ".stepper-connector").borderTopColor,
        };
        const text = {
            "completed label": style("completed", ".stepper-label").color,
            "current label": style("current", ".stepper-label").color,
            "upcoming label": style("upcoming", ".stepper-label").color,
            "upcoming number": style("upcoming", ".stepper-marker").color,
            "compact line": getComputedStyle(nav.querySelector(".stepper-summary")!).color,
        };
        const result: { name: string; ratio: number; least: number }[] = [];
        for (const surface of ["--color-page", "--color-card", "--color-surface-inset"]) {
            const behind = token(surface);
            for (const [name, colour] of Object.entries(drawn)) {
                result.push({ name: `${name} on ${surface}`, ratio: ratio(colour, behind), least: 3 });
            }
            for (const [name, colour] of Object.entries(text)) {
                result.push({ name: `${name} on ${surface}`, ratio: ratio(colour, behind), least: 4.5 });
            }
        }
        // What is written inside a filled marker, against the fill.
        result.push({
            name: "check on the completed fill",
            ratio: ratio(style("completed", ".stepper-marker").color, drawn["completed marker fill"]),
            least: 3,
        });
        result.push({
            name: "number on the current fill",
            ratio: ratio(style("current", ".stepper-marker").color, drawn["current marker fill"]),
            least: 4.5,
        });
        probe.remove();
        return result;
    });
}

test.describe("Stepper on a desktop, 1280px", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page);
    });

    for (const dark of [false, true]) {
        test(`full layout, ${dark ? "dark" : "light"}: markers in a row with their labels, joined by lines, and no compact line`, async ({
            page,
        }) => {
            await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
            const host = basic(page);
            expect(await isCompact(host)).toBe(false);
            await expect(summary(host)).toBeHidden();

            const marks = await boxes(markers(host));
            expect(marks).toHaveLength(3);
            for (const mark of marks) {
                expect(Math.round(mark.width)).toBe(32);
                expect(Math.round(mark.height)).toBe(32);
                expect(Math.round(mark.y)).toBe(Math.round(marks[0].y));
            }
            expect(marks[0].x).toBeLessThan(marks[1].x);
            expect(marks[1].x).toBeLessThan(marks[2].x);

            await expect(labels(host)).toHaveText(["Details", "Ratings", "Result + notes"]);
            const texts = await boxes(labels(host));
            texts.forEach((text, index) => {
                // Beside its marker, 8px after it, on one line.
                expect(Math.round(text.x - (marks[index].x + marks[index].width))).toBe(8);
                expect(text.height).toBeLessThanOrEqual(21);
            });

            const lines = await boxes(host.locator(".stepper-connector"));
            expect(lines).toHaveLength(2);
            lines.forEach((line, index) => {
                expect(line.width).toBeGreaterThanOrEqual(16);
                // Through the middle of the markers.
                expect(Math.abs(line.y + 1 - (marks[index].y + marks[index].height / 2))).toBeLessThanOrEqual(0.5);
            });
            const lineStyles = await host
                .locator(".stepper-connector")
                .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).borderTopStyle));
            expect(lineStyles, "solid up to the current step, dashed after it").toEqual(["solid", "dashed"]);

            // The current marker stands in a ring: its fill stops short of its edge.
            const clips = await markers(host).evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).backgroundClip));
            expect(clips).toEqual(["border-box", "content-box", "border-box"]);
            await expect(markers(host).nth(0).locator("svg")).toBeVisible();
            await expect(markers(host).nth(1)).toHaveText("2");
            await expect(markers(host).nth(2)).toHaveText("3");
            const weights = await labels(host).evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).fontWeight));
            expect(weights).toEqual(["400", "600", "400"]);
        });

        test(`contrast, ${dark ? "dark" : "light"}: every marker, line and text against page, card and inset surfaces`, async ({
            page,
        }) => {
            await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
            // Transitions would be read half way.
            await page.emulateMedia({ reducedMotion: "reduce" });
            const measured = await contrasts(basic(page));
            expect(measured.length).toBe(35);
            for (const { name, ratio, least } of measured) {
                expect(ratio, `${name}: ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(least);
            }
        });
    }

    test("auto follows the Stepper's own width, not the screen: compact under 480px, full from there", async ({
        page,
    }) => {
        const host = basic(page);
        const frame = basicFrame(page);

        await frame.evaluate((node, width) => (node.style.width = `${width}px`), THRESHOLD - 1);
        expect(await isCompact(host)).toBe(true);
        await expect(summary(host)).toBeVisible();
        await expect(summary(host)).toHaveText("Step 2 of 3 — Ratings");
        // The labels are not shown, and the markers have become the bar.
        for (const label of await boxes(labels(host))) expect(label.width).toBeLessThanOrEqual(1);
        const segments = await boxes(markers(host));
        for (const segment of segments) {
            expect(segment.height).toBe(8);
            expect(segment.width).toBeGreaterThan(100);
        }

        await frame.evaluate((node, width) => (node.style.width = `${width}px`), THRESHOLD);
        expect(await isCompact(host)).toBe(false);
        await expect(summary(host)).toBeHidden();
        // Three medium labels fit at the threshold, each on one line.
        for (const label of await boxes(labels(host))) expect(label.height).toBeLessThanOrEqual(21);
        await expectNoSidewaysScroll(page, host);
    });

    test("where nothing gives it a width it is not 0px wide: a flex row, a card header, a centred column, a grid", async ({
        page,
    }) => {
        // A size container has no width of its own. Without one to ask for,
        // each of these parents made the Stepper 0px wide: nothing to see.
        const host = basic(page);
        const frame = basicFrame(page);
        const layouts: Record<string, string> = {
            "a flex row": "display:flex",
            "a centred column": "display:flex;flex-direction:column;align-items:center",
            "a grid that does not stretch": "display:grid;justify-items:start",
            "a box as wide as its content": "width:fit-content",
        };
        for (const [name, css] of Object.entries(layouts)) {
            await frame.evaluate((node, style) => (node.style.cssText = style), css);
            const [box] = await boxes(host);
            expect(box.width, name).toBe(THRESHOLD);
            expect(await isCompact(host), name).toBe(false);
            for (const marker of await boxes(markers(host))) expect(marker.width, name).toBe(32);
        }

        // Beside a title, as in a card header: what the title leaves, full or compact by that.
        await frame.evaluate((node) => {
            node.style.cssText = "display:flex;align-items:center;gap:16px;width:343px";
            const title = document.createElement("h2");
            title.textContent = "Log visit";
            title.style.whiteSpace = "nowrap";
            node.prepend(title);
        });
        const [beside] = await boxes(host);
        expect(beside.width).toBeGreaterThan(200);
        expect(beside.width).toBeLessThan(343);
        expect(await isCompact(host)).toBe(true);
        await expect(summary(host)).toBeVisible();
        await expectNothingOutside(host);

        // And it still gives way: no wider than a narrow flex row.
        await frame.evaluate((node) => {
            node.querySelector("h2")!.remove();
            node.style.cssText = "display:flex;width:300px";
        });
        expect((await boxes(host))[0].width).toBe(300);
    });

    test("layout forces one drawing at any width", async ({ page }) => {
        const full = page.getByTestId("stepper-demo-full");
        const compact = page.getByTestId("stepper-demo-compact");
        expect(await isCompact(compact)).toBe(true);
        expect(await isCompact(full)).toBe(false);
        await full.evaluate((node) => (node.style.width = "240px"));
        expect(await isCompact(full)).toBe(false);
        // Too narrow for one line each: the labels wrap, and nothing is pushed out.
        const marks = await boxes(markers(full));
        const edge = (await boxes(full))[0];
        expect(marks[2].x + marks[2].width).toBeLessThanOrEqual(edge.x + edge.width + 0.5);
    });

    test("both layouts give assistive technology the same list, once", async ({ page }) => {
        const host = basic(page);
        const frame = basicFrame(page);
        const expected = `
            - navigation "Progress":
              - list:
                - listitem: "Step 1 of 3: Details, completed"
                - listitem: "Step 2 of 3: Ratings, current"
                - listitem: "Step 3 of 3: Result + notes, upcoming"
              - status
        `;
        await expect(host).toMatchAriaSnapshot(expected);
        await expect(host.getByRole("listitem").nth(1)).toHaveAttribute("aria-current", "step");

        await frame.evaluate((node) => (node.style.width = "300px"));
        expect(await isCompact(host)).toBe(true);
        await expect(host).toMatchAriaSnapshot(expected);
        await expect(host.getByRole("listitem").nth(1)).toHaveAttribute("aria-current", "step");
    });

    test("a change of step is said once, politely, and focus stays where it was", async ({ page }) => {
        const host = basic(page);
        // The presses that woke the page up were announced; that is over after three seconds.
        await expect(status(host)).toHaveText("", { timeout: 10_000 });
        const next = page.getByTestId("stepper-demo-basic-next");
        await next.focus();
        await page.keyboard.press("Enter");
        await expect(status(host)).toHaveText("Step 3 of 3: Result + notes");
        await expect(status(host)).toHaveAttribute("role", "status");
        await expect(basicValue(page)).toHaveText("2");
        // Next is disabled at the last step, so the browser lets go of it; the Stepper took nothing.
        expect(await host.evaluate((nav) => nav.contains(document.activeElement))).toBe(false);
        await expect(status(host)).toHaveText("", { timeout: 10_000 });
    });

    test("the three-step form: Next moves focus to the step's heading, which is the form's own doing", async ({
        page,
    }) => {
        const stepper = page.getByTestId("stepper-demo-form-stepper");
        const heading = page.getByTestId("stepper-demo-form-heading");
        await expect(steps(stepper).nth(0)).toHaveAttribute("aria-current", "step");
        await page.getByTestId("stepper-demo-form-next").click();
        await expect(heading).toHaveText("Ratings");
        await expect(heading).toBeFocused();
        await expect(steps(stepper).nth(1)).toHaveAttribute("aria-current", "step");
        await expect(status(stepper)).toHaveText("Step 2 of 3: Ratings");
        await page.getByTestId("stepper-demo-form-back").click();
        await expect(heading).toHaveText("Details");
        await expect(heading).toBeFocused();
    });

    test("interactive with a mouse and the keyboard: completed steps are buttons in order, with a pressed state", async ({
        page,
    }) => {
        const host = interactive(page);
        const buttons = host.getByRole("button");
        await expect(buttons).toHaveCount(2);
        await expect(buttons.nth(0)).toHaveAccessibleName("Step 1 of 3: Details, completed");
        await expect(buttons.nth(1)).toHaveAccessibleName("Step 2 of 3: Ratings, completed");

        // Pressed: another fill, on a marker that dips.
        await page.emulateMedia({ reducedMotion: "reduce" });
        const fill = () => markers(host).nth(0).evaluate((node) => getComputedStyle(node).backgroundColor);
        const rest = await fill();
        await host.scrollIntoViewIfNeeded();
        const mark = (await boxes(markers(host).nth(0)))[0];
        await page.mouse.move(mark.x + mark.width / 2, mark.y + mark.height / 2);
        const hovered = await fill();
        expect(hovered).not.toBe(rest);
        await page.mouse.down();
        const pressed = await fill();
        expect(pressed).not.toBe(rest);
        expect(pressed).not.toBe(hovered);
        // Let go somewhere else: no press.
        await page.mouse.move(0, 0);
        await page.mouse.up();
        await expect(interactiveValue(page)).toHaveText("2");

        // Keyboard: DOM order, a visible ring, Enter goes back and focus stays on the step.
        await page.getByTestId("stepper-demo-interactive-reset").focus();
        await page.keyboard.press("Shift+Tab");
        await expect(buttons.nth(1)).toBeFocused();
        const ring = await buttons.nth(1).evaluate((node) => getComputedStyle(node).boxShadow);
        expect(ring).not.toBe("none");
        await page.keyboard.press("Shift+Tab");
        await expect(buttons.nth(0)).toBeFocused();
        await page.keyboard.press("Tab");
        await page.keyboard.press("Enter");
        await expect(interactiveValue(page)).toHaveText("1");
        await expect(page.getByTestId("stepper-demo-interactive-event")).toHaveText("Ratings");
        await expect(buttons).toHaveCount(1);
        const focused = steps(host).nth(1).locator(".stepper-body");
        await expect(focused).toBeFocused();
        expect(await focused.evaluate((node) => node.tagName)).toBe("SPAN");
        // The step that took focus is not a Tab stop: Tab goes on, out of the Stepper.
        await page.keyboard.press("Tab");
        await expect(page.getByTestId("stepper-demo-interactive-reset")).toBeFocused();
    });

    test("right to left: the first step is on the right, and the lines follow", async ({ page }) => {
        const host = basic(page);
        await host.evaluate((nav) => nav.setAttribute("dir", "rtl"));
        const marks = await boxes(markers(host));
        expect(marks[0].x).toBeGreaterThan(marks[1].x);
        expect(marks[1].x).toBeGreaterThan(marks[2].x);
        const texts = await boxes(labels(host));
        texts.forEach((text, index) => {
            // The label is before its marker on the screen, 8px from it.
            expect(Math.round(marks[index].x - (text.x + text.width))).toBe(8);
        });
        const lines = await boxes(host.locator(".stepper-connector"));
        // The solid line still joins the first two steps.
        expect(lines[0].x).toBeGreaterThan(marks[1].x);
        expect(lines[0].x + lines[0].width).toBeLessThan(marks[0].x);
        const lineStyles = await host
            .locator(".stepper-connector")
            .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).borderTopStyle));
        expect(lineStyles).toEqual(["solid", "dashed"]);
        await expectNoSidewaysScroll(page, host);
    });

    test("forced colours: filled, ringed and outlined markers, and solid and dashed lines", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
        for (const host of [basic(page), page.getByTestId("stepper-demo-compact")]) {
            const drawn = await markers(host).evaluateAll((nodes) =>
                nodes.map((node) => {
                    const style = getComputedStyle(node);
                    return {
                        fill: style.backgroundColor,
                        edge: style.borderTopColor,
                        ink: style.color,
                        edgeWidth: style.borderTopWidth,
                    };
                }),
            );
            const [completed, current, upcoming] = drawn;
            // Filled against outlined.
            expect(completed.fill).toBe(current.fill);
            expect(upcoming.fill).not.toBe(completed.fill);
            expect(upcoming.edge).not.toBe(upcoming.fill);
            expect(Number.parseFloat(upcoming.edgeWidth)).toBeGreaterThanOrEqual(1);
            // The check and the number are in the colour that goes with the fill.
            expect(completed.ink).not.toBe(completed.fill);
            expect(upcoming.ink).not.toBe(upcoming.fill);
        }
        // Completed against current, in the full layout: a check against a number in a ring.
        const host = basic(page);
        await expect(markers(host).nth(0).locator("svg")).toBeVisible();
        await expect(markers(host).nth(1)).toHaveText("2");
        const clips = await markers(host).evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).backgroundClip));
        expect(clips).toEqual(["border-box", "content-box", "border-box"]);
        const lineStyles = await host
            .locator(".stepper-connector")
            .evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).borderTopStyle));
        expect(lineStyles).toEqual(["solid", "dashed"]);
    });

    test("reduced motion: nothing eases", async ({ page }) => {
        const durations = () =>
            basic(page).evaluate((nav) =>
                [".stepper-marker", ".stepper-connector"].map(
                    (part) => getComputedStyle(nav.querySelector(part)!).transitionDuration,
                ),
            );
        for (const duration of await durations()) expect(duration).toContain("0.15s");
        await page.emulateMedia({ reducedMotion: "reduce" });
        for (const duration of await durations()) expect(duration).toBe("0s");
    });

    test("sizes: markers of 24, 32 and 40px, text of 12, 14 and 16px", async ({ page }) => {
        for (const [id, marker, font] of [
            ["stepper-demo-sm", 24, "12px"],
            ["stepper-demo-full", 32, "14px"],
            ["stepper-demo-lg", 40, "16px"],
        ] as const) {
            const host = page.getByTestId(id);
            await host.evaluate((nav) => nav.setAttribute("data-layout", "full"));
            const mark = (await boxes(markers(host)))[0];
            expect(Math.round(mark.width), id).toBe(marker);
            expect(Math.round(mark.height), id).toBe(marker);
            expect(await labels(host).first().evaluate((node) => getComputedStyle(node).fontSize), id).toBe(font);
        }
    });
});

for (const width of [375, 320]) {
    test.describe(`Stepper on a phone, ${width}px, touch`, () => {
        test.use({ viewport: { width, height: 700 }, hasTouch: true, isMobile: true });

        test.beforeEach(async ({ page }) => {
            await gotoHydrated(page);
        });

        for (const dark of [false, true]) {
            test(`compact layout, ${dark ? "dark" : "light"}: a bar of three segments and one line of text`, async ({
                page,
            }) => {
                await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
                await page.emulateMedia({ reducedMotion: "reduce" });
                const host = basic(page);
                await inABox(basicFrame(page));
                expect(await isCompact(host)).toBe(true);
                await expect(summary(host)).toBeVisible();
                await expect(summary(host)).toHaveText("Step 2 of 3 — Ratings");
                await expect(summary(host)).toHaveAttribute("aria-hidden", "true");

                const edge = (await boxes(host))[0];
                expect(Math.round(edge.width)).toBe(width - 32);
                const segments = await boxes(markers(host));
                expect(segments).toHaveLength(3);
                segments.forEach((segment, index) => {
                    expect(segment.height).toBe(8);
                    expect(Math.abs(segment.width - (edge.width - 8) / 3)).toBeLessThanOrEqual(0.5);
                    if (index > 0) {
                        const before = segments[index - 1];
                        expect(Math.round(segment.x - (before.x + before.width))).toBe(4);
                    }
                });
                // The bar is above the line of text, 8px from it.
                const line = (await boxes(summary(host)))[0];
                expect(Math.round(line.y - (segments[0].y + segments[0].height))).toBe(8);
                // One line.
                expect(line.height).toBeLessThanOrEqual(21);

                // Filled up to the current step, an outline after it.
                const fills = await markers(host).evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).backgroundColor));
                expect(fills[0]).toBe(fills[1]);
                expect(fills[2]).toBe("rgba(0, 0, 0, 0)");
                // No check or number in a segment.
                await expect(markers(host).nth(0).locator("svg")).toBeHidden();
                await expect(markers(host).nth(1).locator(".stepper-number")).toBeHidden();

                const measured = await contrasts(host);
                for (const { name, ratio, least } of measured) {
                    expect(ratio, `${name}: ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(least);
                }
                await expectNoSidewaysScroll(page, host);
            });
        }

        test("the line follows the step", async ({ page }) => {
            const host = basic(page);
            await inABox(basicFrame(page));
            await page.getByTestId("stepper-demo-basic-next").tap();
            await expect(summary(host)).toHaveText("Step 3 of 3 — Result + notes");
            await expect(status(host)).toHaveText("Step 3 of 3: Result + notes");
            await page.getByTestId("stepper-demo-basic-back").tap();
            await page.getByTestId("stepper-demo-basic-back").tap();
            await expect(summary(host)).toHaveText("Step 1 of 3 — Details");
            const fills = await markers(host).evaluateAll((nodes) => nodes.map((node) => node.parentElement!.parentElement!.getAttribute("data-state")));
            expect(fills).toEqual(["current", "upcoming", "upcoming"]);
        });

        test("a description: the current step's is under the line", async ({ page }) => {
            const host = page.getByTestId("stepper-demo-described");
            await inABox(host);
            expect(await isCompact(host)).toBe(true);
            await expect(summary(host).locator("p")).toHaveText(["Step 2 of 3 — Ratings", "Quiz, food and mood"]);
            await expectNoSidewaysScroll(page, host);
        });

        test("interactive, compact: every completed segment is a 44px target, and a tap goes back", async ({
            page,
        }) => {
            expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
            const host = interactive(page);
            await inABox(host);
            expect(await isCompact(host)).toBe(true);
            const buttons = host.getByRole("button");
            await expect(buttons).toHaveCount(2);
            const targets = await boxes(buttons);
            for (const target of targets) {
                expect(target.width).toBeGreaterThanOrEqual(MIN_TARGET);
                expect(target.height).toBeGreaterThanOrEqual(MIN_TARGET);
            }
            // Side by side without overlapping, so a tap has one answer.
            expect(targets[0].x + targets[0].width).toBeLessThanOrEqual(targets[1].x);
            // The segments stay in one row, the pressable ones and the plain one.
            const segments = await boxes(markers(host));
            for (const segment of segments) expect(Math.round(segment.y)).toBe(Math.round(segments[0].y));

            await buttons.nth(0).tap();
            await expect(interactiveValue(page)).toHaveText("0");
            await expect(summary(host)).toHaveText("Step 1 of 3 — Details");
            await expect(buttons).toHaveCount(0);
            await expect(page.getByTestId("stepper-demo-interactive-event")).toHaveText("Details");
        });

        test("interactive, compact, more steps than fit at 44px: the segments share the bar and do not overlap", async ({
            page,
        }) => {
            const host = interactive(page);
            await inABox(host);
            // The examples have three steps. The bar is CSS alone, so nine more
            // completed steps are made by copying the first one.
            await host.evaluate((nav) => {
                const first = nav.querySelector(".stepper-step")!;
                for (let extra = 0; extra < 7; extra += 1) first.after(first.cloneNode(true));
            });
            const buttons = host.getByRole("button");
            await expect(buttons).toHaveCount(9);
            const targets = await boxes(buttons);
            const segments = await boxes(markers(host));
            expect(segments).toHaveLength(10);
            // Ten segments and nine 4px gaps in the width of the bar.
            const share = (width - 32 - 9 * 4) / 10;
            expect(share).toBeLessThan(MIN_TARGET);
            for (const [index, segment] of segments.entries()) {
                expect(Math.abs(segment.width - share)).toBeLessThanOrEqual(0.5);
                if (index > 0) {
                    const before = segments[index - 1];
                    expect(segment.x - (before.x + before.width), "a gap between segments").toBeGreaterThanOrEqual(3.5);
                }
            }
            for (const [index, target] of targets.entries()) {
                // Narrower than 44px here, and still 44px tall.
                expect(target.height).toBeGreaterThanOrEqual(MIN_TARGET);
                if (index > 0) {
                    const before = targets[index - 1];
                    expect(before.x + before.width, "a tap has one answer").toBeLessThanOrEqual(target.x + 0.5);
                }
            }
            await expectNoSidewaysScroll(page, host);
        });

        test("interactive, full: a completed step is a target of 44px or more", async ({ page }) => {
            const host = interactive(page);
            await host.evaluate((nav) => nav.setAttribute("data-layout", "full"));
            await inABox(host);
            const targets = await boxes(host.getByRole("button"));
            expect(targets).toHaveLength(2);
            for (const target of targets) {
                expect(target.width).toBeGreaterThanOrEqual(MIN_TARGET);
                expect(target.height).toBeGreaterThanOrEqual(MIN_TARGET);
            }
            await expectNoSidewaysScroll(page, host);
        });

        test("with the text enlarged to 200%: nothing is cut off and nothing scrolls sideways", async ({ page }) => {
            const host = basic(page);
            await inABox(basicFrame(page));
            await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
            expect(await isCompact(host)).toBe(true);
            await expect(summary(host)).toHaveText("Step 2 of 3 — Ratings");
            const line = summary(host).locator("p").first();
            expect(await line.evaluate((node) => getComputedStyle(node).fontSize)).toBe("28px");
            // The line may wrap; it is never clipped.
            const fits = await line.evaluate((node) => node.scrollWidth <= node.clientWidth + 1);
            expect(fits).toBe(true);
            await expectNoSidewaysScroll(page, host);

            // Forced to full with long labels at 200%: they wrap inside the Stepper.
            const full = page.getByTestId("stepper-demo-full");
            await inABox(full);
            expect(await isCompact(full)).toBe(false);
            await expectNoSidewaysScroll(page, full);
        });

        test("right to left: the first segment is on the right", async ({ page }) => {
            const host = basic(page);
            await inABox(basicFrame(page));
            await host.evaluate((nav) => nav.setAttribute("dir", "rtl"));
            const segments = await boxes(markers(host));
            expect(segments[0].x).toBeGreaterThan(segments[1].x);
            expect(segments[1].x).toBeGreaterThan(segments[2].x);
            const edge = (await boxes(host))[0];
            const line = (await boxes(summary(host).locator("p").first()))[0];
            expect(Math.round(line.x + line.width)).toBe(Math.round(edge.x + edge.width));
            await expectNoSidewaysScroll(page, host);
        });
    });
}

test.describe("Stepper with enlarged text on a desktop", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("the threshold is in rem: at 200% the Stepper is compact up to 960px of its own width", async ({ page }) => {
        await gotoHydrated(page);
        const host = basic(page);
        await inABox(basicFrame(page), "700px");
        expect(await isCompact(host)).toBe(false);
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
        expect(await isCompact(host)).toBe(true);
        await page.locator("[data-test-box]").evaluate((node) => (node.style.width = "1000px"));
        expect(await isCompact(host)).toBe(false);
        for (const label of await boxes(labels(host))) expect(label.height).toBeLessThanOrEqual(41);
        // The docs page around the box is itself wider than the screen at 200%, so only the Stepper is measured.
        await expectNothingOutside(host);
    });
});
