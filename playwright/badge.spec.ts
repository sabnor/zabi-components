import { expect, test, type Locator, type Page } from "@playwright/test";

import { gotoHydrated } from "./helpers/hydration";

/**
 * Badge: a label that does not fit wraps, and a label that fits is unchanged.
 *
 * A badge used to be a fixed height with `whitespace-nowrap`. At 360px and
 * 200% text, "Väntar på bekräftelse från gruppen" beside a flexible name was
 * 413px wide and the page 101px wider than the screen. Now the height is a
 * minimum and the label wraps. A one-line badge must be exactly what it was:
 * 20, 24 and 28px tall with fully round ends.
 *
 * The lab page is /chaos-lab/badge.
 */

const LAB = "/chaos-lab/badge";

async function box(locator: Locator) {
    return locator.evaluate((element) => {
        const { x, y, width, height } = element.getBoundingClientRect();
        return { x, y, width, height, right: x + width, bottom: y + height };
    });
}

const radius = (locator: Locator) =>
    locator.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderTopLeftRadius));

/** How far the page is wider than the screen. */
const sideways = (page: Page) =>
    page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

/** The lines the badge's own text is on, and whether any of it is outside the badge. */
async function textIn(badge: Locator) {
    return badge.evaluate((element) => {
        const own = element.getBoundingClientRect();
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const tops = new Set<number>();
        let outside = 0;
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            if (!node.textContent?.trim()) continue;
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const rect of range.getClientRects()) {
                tops.add(Math.round(rect.top));
                outside = Math.max(outside, own.left - rect.left, rect.right - own.right, own.top - rect.top, rect.bottom - own.bottom);
            }
        }
        return { lines: tops.size, outside };
    });
}

test.describe("Badge on one line, at the usual text size", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("is 20, 24 and 28px tall, with fully round ends, with and without an icon", async ({ page }) => {
        await gotoHydrated(page, LAB);
        for (const [size, height] of [
            ["sm", 20],
            ["md", 24],
            ["lg", 28],
        ] as const) {
            for (const kind of ["", "-icon", "-solid"]) {
                const badge = page.getByTestId(`badge-${size}${kind}`);
                const at = await box(badge);
                expect(at.height, `${size}${kind}`).toBe(height);
                // Half the height: a full round end, as the pill radius gave.
                expect(await radius(badge), `${size}${kind}`).toBe(height / 2);
                expect((await textIn(badge)).lines, `${size}${kind}`).toBe(1);
            }
        }
    });

    test("the padding, the gap and the type are what they were", async ({ page }) => {
        await gotoHydrated(page, LAB);
        const style = (id: string) =>
            page.getByTestId(id).evaluate((element) => {
                const computed = getComputedStyle(element);
                return [computed.paddingLeft, computed.paddingRight, computed.columnGap, computed.fontSize, computed.lineHeight, computed.borderTopWidth];
            });
        expect(await style("badge-sm-icon")).toEqual(["8px", "8px", "4px", "12px", "16px", "1px"]);
        expect(await style("badge-md-icon")).toEqual(["8px", "8px", "4px", "12px", "16px", "1px"]);
        expect(await style("badge-lg-icon")).toEqual(["12px", "12px", "8px", "14px", "20px", "1px"]);
        // And the vertical padding leaves one line exactly at the minimum height.
        const vertical = (id: string) =>
            page.getByTestId(id).evaluate((element) => [getComputedStyle(element).paddingTop, getComputedStyle(element).paddingBottom]);
        expect(await vertical("badge-sm")).toEqual(["1px", "1px"]);
        expect(await vertical("badge-md")).toEqual(["3px", "3px"]);
        expect(await vertical("badge-lg")).toEqual(["3px", "3px"]);
    });

    test("a long label that has the room stays on one line", async ({ page }) => {
        await gotoHydrated(page, LAB);
        const badge = page.getByTestId("long-md");
        expect((await box(badge)).height).toBe(24);
        expect((await textIn(badge)).lines).toBe(1);
    });
});

test.describe("Badge on a 360px phone with the text at 200%", () => {
    test.use({ viewport: { width: 360, height: 780 }, hasTouch: true, isMobile: true });

    test.beforeEach(async ({ page }) => {
        await gotoHydrated(page, LAB);
        await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
    });

    test("a long label beside a flexible name wraps: the page is no wider than the screen", async ({ page }) => {
        expect(await sideways(page)).toBeLessThanOrEqual(0);
        for (const size of ["sm", "md", "lg"]) {
            const badge = page.getByTestId(`long-${size}`);
            const row = await box(page.getByTestId(`row-${size}`));
            const at = await box(badge);
            expect(at.right, size).toBeLessThanOrEqual(row.right + 0.5);
            expect(at.x, size).toBeGreaterThanOrEqual(row.x - 0.5);
            const text = await textIn(badge);
            expect(text.lines, size).toBeGreaterThanOrEqual(2);
            expect(text.outside, size).toBeLessThanOrEqual(0.5);
        }
    });

    test("what it was before did not: the same label with a fixed height and no wrapping reaches past its row", async ({
        page,
    }) => {
        const row = await box(page.getByTestId("row-before"));
        const old = await box(page.getByTestId("long-before"));
        expect(old.width).toBeGreaterThan(row.width);
        expect(old.right - row.right).toBeGreaterThan(40);
        // And at this text size it was one line in a box as tall as the line, no more.
        expect((await textIn(page.getByTestId("long-before"))).lines).toBe(1);
    });

    test("a wrapped badge is a rounded rectangle: the corner of one line, not a lozenge", async ({ page }) => {
        const badge = page.getByTestId("long-md");
        const at = await box(badge);
        const corner = await radius(badge);
        // One line at this text size is 48px tall; the corner is half of that.
        expect(corner).toBe(24);
        expect(at.height).toBeGreaterThan(corner * 2);
        // The icon stays whole and centred beside the lines.
        const icon = await box(badge.locator("svg"));
        expect(Math.abs(icon.y + icon.height / 2 - (at.y + at.height / 2))).toBeLessThanOrEqual(1);
        expect(icon.width).toBeGreaterThan(0);
    });

    test("alone in a block it is never wider than the block, and a word longer than the line breaks", async ({ page }) => {
        for (const [id, parent] of [
            ["long-alone", "alone"],
            ["long-word", "narrow"],
        ]) {
            const outer = await box(page.getByTestId(parent));
            const at = await box(page.getByTestId(id));
            expect(at.width, id).toBeLessThanOrEqual(outer.width + 0.5);
            expect((await textIn(page.getByTestId(id))).outside, id).toBeLessThanOrEqual(0.5);
        }
        expect(await sideways(page)).toBeLessThanOrEqual(0);
    });
});
