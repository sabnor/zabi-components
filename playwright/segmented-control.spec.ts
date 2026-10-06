import { expect, test, type Locator, type Page } from "@playwright/test";

import { waitForHydration } from "./helpers/hydration";

/**
 * SegmentedControl on a phone: the parts jsdom cannot show.
 *
 * jsdom has no layout, so the 44px segments, the equal widths and the reflow
 * at 320px are measured here, in a 375px touch viewport, and the keys are
 * pressed in a real browser, where a native radio has behaviour of its own.
 */

test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

const MIN_TARGET = 44;

const view = (page: Page) => page.getByTestId("segmented-demo-view");
const answer = (page: Page) => page.getByTestId("segmented-demo-answer");
const period = (page: Page) => page.getByTestId("segmented-demo-period");
const viewValue = (page: Page) => page.getByTestId("segmented-demo-view-value");
const answerValue = (page: Page) => page.getByTestId("segmented-demo-answer-value");
/** The label around a segment's radio input: what a finger hits. */
const segment = (host: Locator, label: string) =>
    host.locator(".segment").filter({ hasText: label });

/** The page is usable before it hydrates; a tap that lands early checks the radio but not the bound value. */
async function gotoHydrated(page: Page) {
    await page.goto("/components/SegmentedControl", { waitUntil: "domcontentloaded" });
    await waitForHydration(page);
    await segment(view(page), "Month").tap();
    await segment(view(page), "List").tap();
    await segment(view(page), "Month").tap();
    await expect(viewValue(page)).toHaveText("month");
    await segment(view(page), "List").tap();
    await expect(viewValue(page)).toHaveText("list");
}

async function boxes(locator: Locator) {
    return locator.evaluateAll((elements) =>
        elements.map((element) => {
            const { x, y, width, height } = element.getBoundingClientRect();
            return { x, y, width, height };
        }),
    );
}

/** Colour a token resolves to on this page, as `getComputedStyle` reports colours. */
async function token(page: Page, name: string): Promise<string> {
    return page.evaluate((variable) => {
        const probe = document.createElement("div");
        probe.style.color = `var(${variable})`;
        document.body.append(probe);
        const colour = getComputedStyle(probe).color;
        probe.remove();
        return colour;
    }, name);
}

/**
 * Lays a demo out as an app on a phone would: the full screen width with a
 * 16px gutter each side. The docs page puts each demo in a card that is far
 * narrower than that at 320px.
 */
async function asOnAPhone(hosts: Locator) {
    await hosts.evaluateAll((elements) => {
        const frame = document.createElement("div");
        frame.style.cssText =
            "position:absolute;top:0;left:0;z-index:99999;box-sizing:border-box;width:100vw;padding:16px;background:var(--color-card)";
        for (const element of elements) frame.append(element.parentElement!);
        document.body.append(frame);
        window.scrollTo(0, 0);
    });
}

test.describe("SegmentedControl: touch, keyboard and small screens", () => {
    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page);
    });

    test("touch: every segment is at least 44px tall and wide, at every size", async ({ page }) => {
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);

        const all = await boxes(page.locator(".segment"));
        expect(all.length).toBeGreaterThanOrEqual(20);
        for (const box of all) {
            expect(box.height).toBeGreaterThanOrEqual(MIN_TARGET);
            expect(box.width).toBeGreaterThanOrEqual(MIN_TARGET);
        }
        for (const size of ["sm", "md", "lg"]) {
            const sized = await boxes(page.locator(`.segmented[data-size="${size}"] .segment`));
            expect(sized.length, `segments at ${size}`).toBeGreaterThanOrEqual(2);
        }
    });

    test("layout: segments share the row equally, and only when fullWidth", async ({ page }) => {
        const row = await boxes(answer(page).locator(".segment"));
        expect(row).toHaveLength(3);
        expect(row[1].width).toBeCloseTo(row[0].width, 0);
        expect(row[2].width).toBeCloseTo(row[0].width, 0);
        expect(new Set(row.map((box) => Math.round(box.y))).size).toBe(1);
        const host = (await answer(page).boundingBox())!;
        const parent = (await answer(page).locator("xpath=..").boundingBox())!;
        expect(host.width).toBeCloseTo(parent.width, 0);

        const compact = page.locator(".segmented:not([data-full-width])").first();
        const compactBox = (await compact.boundingBox())!;
        const compactParent = (await compact.locator("xpath=..").boundingBox())!;
        expect(compactBox.width).toBeLessThan(compactParent.width - 40);
    });

    test("touch: a tap selects, and a second tap on the selected segment changes nothing", async ({
        page,
    }) => {
        await expect(answerValue(page)).toHaveText("none");
        await expect(answer(page).getByRole("radio", { checked: true })).toHaveCount(0);

        await segment(answer(page), "Maybe").tap();
        await expect(answerValue(page)).toHaveText("maybe");
        await expect(answer(page).getByRole("radio", { name: "Maybe" })).toBeChecked();

        await segment(answer(page), "Maybe").tap();
        await segment(answer(page), "Maybe").tap();
        await expect(answerValue(page)).toHaveText("maybe");
        await expect(answer(page).getByRole("radio", { name: "Maybe" })).toBeChecked();
        await expect(answer(page).getByRole("radio", { checked: true })).toHaveCount(1);

        await segment(answer(page), "Can't").tap();
        await expect(answerValue(page)).toHaveText("no");
    });

    test("rendering: the selected segment carries the primary action fill and its text colour", async ({
        page,
    }) => {
        const face = (label: string) =>
            segment(view(page), label)
                .locator(".segment-face")
                .evaluate((element) => {
                    const style = getComputedStyle(element);
                    return { background: style.backgroundColor, colour: style.color };
                });
        // Let the colour transition end before reading it.
        await page.emulateMedia({ reducedMotion: "reduce" });
        const selected = await face("List");
        expect(selected.background).toBe(await token(page, "--color-action-primary"));
        expect(selected.colour).toBe(await token(page, "--color-action-primary-text"));

        const idle = await face("Month");
        expect(idle.background).not.toBe(selected.background);
        expect(idle.colour).toBe(await token(page, "--color-body"));
    });

    test("keyboard: the group is one Tab stop, the arrows move and select, and it reads as a named radio group", async ({
        page,
    }) => {
        const radio = (label: string) => answer(page).getByRole("radio", { name: label });

        // Nothing selected: the first segment takes Tab, and Space selects it.
        await radio("Going").focus();
        await page.keyboard.press("Space");
        await expect(answerValue(page)).toHaveText("going");

        await page.keyboard.press("ArrowRight");
        await expect(answerValue(page)).toHaveText("maybe");
        await expect(radio("Maybe")).toBeFocused();
        await page.keyboard.press("ArrowDown");
        await expect(answerValue(page)).toHaveText("no");
        await page.keyboard.press("ArrowRight");
        await expect(answerValue(page)).toHaveText("going");
        await page.keyboard.press("ArrowLeft");
        await expect(answerValue(page)).toHaveText("no");
        await page.keyboard.press("ArrowUp");
        await expect(answerValue(page)).toHaveText("maybe");
        await page.keyboard.press("Home");
        await expect(answerValue(page)).toHaveText("going");
        await page.keyboard.press("End");
        await expect(answerValue(page)).toHaveText("no");

        // Space on the selected segment: no change.
        await page.keyboard.press("Space");
        await expect(answerValue(page)).toHaveText("no");
        await expect(radio("Can't")).toBeChecked();

        await page.keyboard.press("Tab");
        expect(
            await answer(page).evaluate((host) => host.contains(document.activeElement)),
        ).toBe(false);
        await page.keyboard.press("Shift+Tab");
        await expect(radio("Can't")).toBeFocused();

        // What Chromium hands to assistive technology.
        const client = await page.context().newCDPSession(page);
        await client.send("Accessibility.enable");
        const { nodes } = await client.send("Accessibility.getFullAXTree");
        const group = nodes.find(
            (node) =>
                node.role?.value === "radiogroup" &&
                node.name?.value === "Are you coming on Thursday?",
        );
        expect(group, "A radio group named by the visible question").toBeTruthy();
        expect(nodes.some((node) => node.role?.value === "tablist")).toBe(false);
        const named = nodes.find(
            (node) => node.role?.value === "radiogroup" && node.name?.value === "View",
        );
        expect(named, "A radio group named by label").toBeTruthy();
    });

    test("keyboard: the arrows move from the segment that has focus, not from the selected one", async ({
        page,
    }) => {
        // "List" is selected. A screen reader's cursor can put focus on "Month" without selecting it.
        await expect(viewValue(page)).toHaveText("list");
        await view(page).getByRole("radio", { name: "Month" }).focus();
        await page.keyboard.press("ArrowLeft");
        await expect(viewValue(page)).toHaveText("list");
        await expect(view(page).getByRole("radio", { name: "List" })).toBeFocused();
        await expect(view(page).getByRole("radio", { name: "List" })).toBeChecked();

        await view(page).getByRole("radio", { name: "Month" }).focus();
        await page.keyboard.press("ArrowRight");
        await expect(viewValue(page)).toHaveText("list");
    });

    test("keyboard: Left and Right swap in a right-to-left layout", async ({ page }) => {
        await answer(page).evaluate((host) => host.setAttribute("dir", "rtl"));
        const row = await boxes(answer(page).locator(".segment"));
        expect(row[0].x).toBeGreaterThan(row[2].x);

        await answer(page).getByRole("radio", { name: "Going" }).focus();
        await page.keyboard.press("ArrowLeft");
        await expect(answerValue(page)).toHaveText("going");
        await page.keyboard.press("ArrowLeft");
        await expect(answerValue(page)).toHaveText("maybe");
        await page.keyboard.press("ArrowRight");
        await expect(answerValue(page)).toHaveText("going");
    });

    test("focus: keyboard focus draws the ring on the segment", async ({ page }) => {
        const shadow = (label: string) =>
            segment(view(page), label)
                .locator(".segment-face")
                .evaluate((element) => getComputedStyle(element).boxShadow);
        expect(await shadow("Month")).toBe("none");
        await view(page).getByRole("radio", { name: "List" }).focus();
        await page.keyboard.press("ArrowRight");
        expect(await shadow("Month")).toContain(await token(page, "--color-focus-ring"));
    });

    test("forced colours: the selected segment keeps a fill of its own, and focus is an outline", async ({
        page,
    }) => {
        await page.emulateMedia({ forcedColors: "active" });
        const face = (label: string) =>
            segment(view(page), label)
                .locator(".segment-face")
                .evaluate((element) => {
                    const computed = getComputedStyle(element);
                    return {
                        background: computed.backgroundColor,
                        colour: computed.color,
                        shadow: computed.boxShadow,
                        outline: computed.outlineStyle,
                    };
                });
        // Forced colours paint every background with the canvas colour unless the element opts out.
        await expect(async () => {
            const [selected, other] = [await face("List"), await face("Month")];
            expect(selected.background).not.toBe(other.background);
            expect(selected.colour).not.toBe(other.colour);
            expect(selected.colour).not.toBe(selected.background);
        }).toPass({ timeout: 5_000 });
        expect((await face("List")).outline).toBe("none");

        await view(page).getByRole("radio", { name: "List" }).focus();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowLeft");
        await expect(viewValue(page)).toHaveText("list");
        const focused = await face("List");
        expect(focused.outline).toBe("solid");
        expect(focused.shadow).toBe("none");
    });

    test("motion: the fill does not animate under prefers-reduced-motion", async ({ page }) => {
        const duration = () =>
            view(page)
                .locator(".segment-face")
                .first()
                .evaluate((element) => getComputedStyle(element).transitionDuration);
        expect(await duration()).toContain("0.15s");
        await page.emulateMedia({ reducedMotion: "reduce" });
        expect(await duration()).toBe("0s");
    });

    test("320px: four options share one row with every label whole, and nothing scrolls sideways", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 320, height: 640 });
        const measure = () =>
            page.evaluate(() => ({
                page: document.documentElement.scrollWidth - document.documentElement.clientWidth,
                hosts: [...document.querySelectorAll<HTMLElement>(".segmented")].map((host) => {
                    const parent = host.parentElement!.getBoundingClientRect();
                    const box = host.getBoundingClientRect();
                    return {
                        inside: box.left >= parent.left - 0.5 && box.right <= parent.right + 0.5,
                        scroll: host.scrollWidth - host.clientWidth,
                        // A label that is cut off scrolls inside its own box.
                        clipped: [...host.querySelectorAll<HTMLElement>(".segment-label")].filter(
                            (label) =>
                                label.scrollWidth > label.clientWidth + 1 ||
                                label.getBoundingClientRect().right >
                                    label.closest(".segment")!.getBoundingClientRect().right + 0.5,
                        ).length,
                    };
                }),
            }));

        const narrow = await measure();
        expect(narrow.page).toBe(0);
        expect(narrow.hosts.length).toBeGreaterThanOrEqual(8);
        for (const host of narrow.hosts) {
            expect(host.inside).toBe(true);
            expect(host.scroll).toBeLessThanOrEqual(0);
            expect(host.clipped).toBe(0);
        }

        // With a phone's gutters, four options share one row.
        await asOnAPhone(period(page));
        const row = await boxes(period(page).locator(".segment"));
        expect(row).toHaveLength(4);
        expect(new Set(row.map((box) => Math.round(box.y))).size).toBe(1);
        for (const box of row) {
            expect(box.height).toBeGreaterThanOrEqual(MIN_TARGET);
            expect(box.width).toBeGreaterThanOrEqual(MIN_TARGET);
        }
        // Short labels stay on one line; "This year" may take two.
        const lines = await period(page)
            .locator(".segment-label")
            .evaluateAll((labels) =>
                labels.map((label) =>
                    Math.round(
                        label.getBoundingClientRect().height /
                            parseFloat(getComputedStyle(label).lineHeight),
                    ),
                ),
            );
        expect(lines.slice(0, 3)).toEqual([1, 1, 1]);
        expect(lines[3]).toBeLessThanOrEqual(2);

        // Text at 200%: the segments fold into rows instead of squeezing the labels.
        await asOnAPhone(page.locator(".segmented"));
        await page.evaluate(() => {
            document.documentElement.style.fontSize = "200%";
        });
        const zoomed = await measure();
        for (const host of zoomed.hosts) {
            expect(host.inside).toBe(true);
            expect(host.scroll).toBeLessThanOrEqual(0);
            expect(host.clipped).toBe(0);
        }
        const folded = await boxes(period(page).locator(".segment"));
        expect(new Set(folded.map((box) => Math.round(box.y))).size).toBe(2);
        const zoomedLines = await period(page)
            .locator(".segment-label")
            .evaluateAll((labels) =>
                labels.map((label) =>
                    Math.round(
                        label.getBoundingClientRect().height /
                            parseFloat(getComputedStyle(label).lineHeight),
                    ),
                ),
            );
        expect(zoomedLines.slice(0, 3)).toEqual([1, 1, 1]);
    });
});
