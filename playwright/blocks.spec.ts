import fs from "node:fs";

import { expect, test, type Page } from "@playwright/test";

import { gotoHydrated } from "./helpers/hydration";

/**
 * Controls inside a brand block (`bg-action-primary on-brand`) and an accent
 * block (`bg-accent on-accent`).
 *
 * The page's text roles are chosen for the page and for cards. On a brand
 * fill a Checkbox's label was 2.15:1 in light and 1.52:1 in dark, an outline
 * Button's label 3.65:1 and 2.05:1, and a focused danger Button showed no
 * ring at all (1.06:1). Inside a block those roles are now the block's label
 * colour; on a card inside the block they are the page's again.
 *
 * Everything is measured as it is painted: the computed colour of the text,
 * composited over the backgrounds actually behind it. The lab is
 * /chaos-lab/blocks. The numbers are written to test-results/blocks.json
 * when BLOCKS_REPORT is set, for THEMING.md.
 */

interface Reading {
    where: string;
    part: string;
    /** Contrast of the part's text against what is behind it. */
    text: number;
    /** Contrast of its border against what is behind the element, where it has one. */
    edge: number | null;
    /** Contrast of its focus ring against what is behind the element. */
    ring: number | null;
    colour: string;
    behind: string;
}

async function measure(page: Page): Promise<Reading[]> {
    return page.evaluate(async () => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const context = canvas.getContext("2d", { willReadFrequently: true })!;
        const rgba = (colour: string): [number, number, number, number] => {
            context.clearRect(0, 0, 1, 1);
            context.fillStyle = colour;
            context.fillRect(0, 0, 1, 1);
            const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
            // Un-premultiply is not needed: one pixel on a cleared canvas keeps its own alpha.
            return [r, g, b, a / 255];
        };
        const over = (top: [number, number, number, number], under: [number, number, number]): [number, number, number] =>
            [0, 1, 2].map((i) => top[i] * top[3] + under[i] * (1 - top[3])) as [number, number, number];
        /** What is painted behind `element`: every background from the root down to it, or to its parent. */
        const behind = (element: Element, includeSelf: boolean): [number, number, number] => {
            const chain: Element[] = [];
            for (let at: Element | null = includeSelf ? element : element.parentElement; at; at = at.parentElement) chain.unshift(at);
            let colour: [number, number, number] = [255, 255, 255];
            for (const item of chain) colour = over(rgba(getComputedStyle(item).backgroundColor), colour);
            return colour;
        };
        const luminance = (c: [number, number, number]) => {
            const [r, g, b] = c.map((v) => {
                const s = v / 255;
                return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const contrast = (a: [number, number, number], b: [number, number, number]) => {
            const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
            return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
        };
        const hex = (c: [number, number, number]) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
        const settle = async () => {
            const easing = document.getAnimations().filter((animation) => animation instanceof CSSTransition);
            while (easing.some((animation) => animation.playState === "running" || animation.pending)) {
                await new Promise(requestAnimationFrame);
            }
        };

        const readings = [];
        for (const group of document.querySelectorAll<HTMLElement>("[data-testid^='controls-'], [data-testid^='own-surface-in-']")) {
            const where = group.dataset.testid!.replace(/^controls-/, "");
            for (const host of group.querySelectorAll<HTMLElement>("[data-part]")) {
                if (host.closest("[data-testid^='controls-'], [data-testid^='own-surface-in-']") !== group) continue;
                const part = host.dataset.part!;
                // The element that carries the words: the parent of the first text in the part.
                const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
                let words: Node | null = walker.nextNode();
                while (words && !words.textContent?.trim()) words = walker.nextNode();
                const label = words?.parentElement ?? host;
                const style = getComputedStyle(label);
                const background = behind(label, true);
                const text = over(rgba(style.color), background);
                // The edge and the ring belong to the control: a button, or the thing a label names.
                const control = host.matches("button, a") ? host : null;
                let edge: number | null = null;
                let ring: number | null = null;
                if (control) {
                    const outside = behind(control, false);
                    const own = getComputedStyle(control);
                    if (parseFloat(own.borderTopWidth) > 0 && rgba(own.borderTopColor)[3] > 0) {
                        edge = contrast(over(rgba(own.borderTopColor), outside), outside);
                    }
                    control.focus({ preventScroll: true });
                    await settle();
                    const shadow = getComputedStyle(control).boxShadow.match(/((?:rgba?|color|oklab|oklch)\([^)]+\)) 0px 0px 0px 4px/)?.[1];
                    if (shadow) ring = contrast(over(rgba(shadow), outside), outside);
                    control.blur();
                }
                readings.push({ where, part, text: contrast(text, background), edge, ring, colour: hex(text), behind: hex(background) });
            }
        }
        return readings;
    });
}

for (const mode of ["light", "dark"] as const) {
    test.describe(`controls in a block, ${mode}`, () => {
        let readings: Reading[] = [];

        test.beforeEach(async ({ page }) => {
            await page.addInitScript((theme) => localStorage.setItem("theme", theme), mode);
            await gotoHydrated(page, "/chaos-lab/blocks");
            await expect
                .poll(() => page.evaluate(() => document.documentElement.classList.contains("dark")))
                .toBe(mode === "dark");
            // Keyboard focus, so the rings are drawn when the controls are focused.
            await page.keyboard.press("Shift");
            readings = await measure(page);
            if (process.env.BLOCKS_REPORT) {
                fs.mkdirSync("test-results", { recursive: true });
                fs.writeFileSync(`test-results/blocks-${mode}.json`, JSON.stringify(readings, null, 1));
            }
        });

        const of = (where: string, part: string) => {
            const found = readings.find((reading) => reading.where === where && reading.part === part);
            if (!found) throw new Error(`no reading for ${part} in ${where}`);
            return found;
        };

        // What a control writes with when it has no fill of its own.
        const TEXT = [
            "heading", "text", "body", "description", "caption", "link",
            "checkbox", "checkbox-checked", "radio", "toggle", "input", "select", "rating",
            "button-outline", "button-ghost", "button-link", "button-secondary", "icon-ghost", "icon-outline",
        ];
        const RINGED = ["button-outline", "button-ghost", "button-link", "button-secondary", "button-danger", "icon-ghost", "icon-outline"];

        for (const block of ["brand", "accent"]) {
            test(`directly on the ${block} block: every label, edge and ring is legible`, async () => {
                for (const part of TEXT) {
                    const reading = of(`${block}-direct`, part);
                    expect(reading.text, `${part}: ${reading.colour} on ${reading.behind}`).toBeGreaterThanOrEqual(4.5);
                }
                for (const part of ["button-outline", "icon-outline"]) {
                    expect(of(`${block}-direct`, part).edge, `${part}: its border against the block`).toBeGreaterThanOrEqual(3);
                }
                for (const part of RINGED) {
                    expect(of(`${block}-direct`, part).ring, `${part}: its focus ring against the block`).toBeGreaterThanOrEqual(3);
                }
            });

            test(`on a card inside the ${block} block: the page's colours again`, async () => {
                for (const part of [...TEXT, "button-danger", "button-primary", "button-accent"]) {
                    const reading = of(`${block}-card`, part);
                    expect(reading.text, `${part}: ${reading.colour} on ${reading.behind}`).toBeGreaterThanOrEqual(4.5);
                }
                for (const part of [...RINGED, "button-primary"]) {
                    expect(of(`${block}-card`, part).ring, `${part}: its focus ring against the card`).toBeGreaterThanOrEqual(3);
                }
                // The same colours as outside any block: nothing of the block reaches the card.
                const card = of(`${block}-card`, "body");
                const own = of(`own-surface-in-${block}`, "body");
                expect(own.text, "A background of the app's own, marked on-surface").toBeGreaterThanOrEqual(4.5);
                expect(card.colour).toBe(own.colour);
            });

            test(`in a block inside the card in the ${block} block: a block again`, async () => {
                for (const part of TEXT) {
                    const reading = of(`${block}-inner`, part);
                    expect(reading.text, `${part}: ${reading.colour} on ${reading.behind}`).toBeGreaterThanOrEqual(4.5);
                }
                for (const part of RINGED) {
                    expect(of(`${block}-inner`, part).ring, `${part}: its focus ring`).toBeGreaterThanOrEqual(3);
                }
            });
        }
    });
}
