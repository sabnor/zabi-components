import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
    fitPanel,
    measureFit,
    pickSide,
    shiftIntoViewport,
    unfitted,
} from "../src/components/util/fit-in-viewport";
import DropdownOptionsHarness from "./fixtures/DropdownOptionsHarness.svelte";

/**
 * Where a popup goes when the side it was asked for does not fit. The
 * arithmetic is pure; the component test below gives jsdom the layout it does
 * not have, and playwright/dropdown-viewport.spec.ts measures the real thing.
 */

const phone = { width: 375, height: 667 };
const box = (left: number, top: number, width = 100, height = 40) => ({
    left,
    top,
    right: left + width,
    bottom: top + height,
});

describe("fitPanel", () => {
    it("keeps the side asked for when the panel fits there", () => {
        const fit = fitPanel({
            anchor: box(20, 100),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
        });
        expect(fit).toMatchObject({ block: "bottom", inline: "start", inlineOffset: 0, maxWidth: null, maxHeight: null, visible: true });
        // And it says where that is: under the anchor, 8px down, from its left edge.
        expect([fit.left, fit.top]).toEqual([20, 148]);
    });

    it("opens from the other edge when the panel would leave the screen", () => {
        // A trigger at the right edge of a phone, asked to open to the right.
        const fit = fitPanel({
            anchor: box(260, 100),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
        });
        expect(fit.inline).toBe("end");
        expect(fit.inlineOffset).toBe(0);
        expect(fit.maxWidth).toBeNull();

        const mirrored = fitPanel({
            anchor: box(15, 100),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "end",
        });
        expect(mirrored.inline).toBe("start");
        expect(mirrored.inlineOffset).toBe(0);
    });

    it("slides back inside when neither edge has room", () => {
        // 300px wide under a trigger in the middle: 138 + 300 > 367, and 238 - 300 < 8.
        const fit = fitPanel({
            anchor: box(138, 100),
            panel: { width: 300, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
        });
        expect(fit.inline).toBe("start");
        // From x 138 back to 67, so its right edge is at 367: 8px from the edge.
        expect(fit.inlineOffset).toBe(-71);
        expect(fit.maxWidth).toBeNull();
    });

    it("narrows a panel wider than the screen to the screen less the margin on each side", () => {
        const fit = fitPanel({
            anchor: box(100, 100),
            panel: { width: 600, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
        });
        expect(fit.maxWidth).toBe(359);
        // Its left edge ends up on the margin.
        expect(100 + fit.inlineOffset).toBe(8);
    });

    it("flips above when there is no room below, and limits the height when neither side has it", () => {
        const above = fitPanel({
            anchor: box(20, 600),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
        });
        expect(above.block).toBe("top");
        expect(above.maxHeight).toBeNull();

        // Taller than either side: the larger one, limited to the room it has.
        const tall = fitPanel({
            anchor: box(20, 200),
            panel: { width: 200, height: 900 },
            viewport: phone,
            block: "top",
            inline: "start",
        });
        expect(tall.block).toBe("bottom");
        // 667 - 240 (anchor bottom) - 8 (gap) - 8 (margin).
        expect(tall.maxHeight).toBe(411);
    });

    it("stays on the side asked for when both have room, even if the other has more", () => {
        const fit = fitPanel({
            anchor: box(20, 400),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
        });
        expect(fit.block).toBe("bottom");
    });

    it("can be told not to flip above", () => {
        const fit = fitPanel({
            anchor: box(20, 600),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            flipBlock: false,
        });
        expect(fit.block).toBe("bottom");
        expect(fit.maxHeight).toBe(11);
    });

    it("can be told to stay on its edge and slide instead", () => {
        const fit = fitPanel({
            anchor: box(182, 100, 80),
            panel: { width: 200, height: 100 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            flipInline: false,
        });
        expect(fit.inline).toBe("start");
        // 182 + 200 = 382: back by 15 to end at 367.
        expect(fit.inlineOffset).toBe(-15);
    });

    it("treats the right edge as the start in a right-to-left layout", () => {
        // Asked to open from the start (right) edge of a trigger near the left edge.
        const fit = fitPanel({
            anchor: box(15, 100),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            rtl: true,
        });
        expect(fit.inline).toBe("end");

        const fits = fitPanel({
            anchor: box(260, 100),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            rtl: true,
        });
        expect(fits).toMatchObject({ block: "bottom", inline: "start", inlineOffset: 0, maxWidth: null, maxHeight: null, visible: true });
        // From the anchor's right edge leftwards: 360 - 200.
        expect(fits.left).toBe(160);
    });

    it("honours the margin and the gap", () => {
        const fit = fitPanel({
            anchor: box(170, 100),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            margin: 16,
        });
        // 170 + 200 = 370 > 359: flipped, and 270 - 200 = 70 is inside.
        expect(fit.inline).toBe("end");
    });
});

describe("fitPanel inside a clipping ancestor", () => {
    // A 160px-tall box that scrolls, with the anchor near its bottom.
    const clip = { left: 10, top: 300, right: 266, bottom: 460 };

    it("is unchanged when the panel fits inside it on the side asked for", () => {
        const fit = fitPanel({
            anchor: box(20, 310),
            panel: { width: 200, height: 90 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            clip,
        });
        expect(fit).toMatchObject({ block: "bottom", inline: "start", inlineOffset: 0, visible: true });
    });

    it("lets the box decide the side: no room below inside it, so it opens above", () => {
        // On the screen there are 250px below the anchor; inside the box there are 30.
        const fit = fitPanel({
            anchor: box(20, 390),
            panel: { width: 200, height: 70 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            clip,
        });
        expect(fit.block).toBe("top");
        expect(fit.visible).toBe(true);
        // Without the box it would have stayed below.
        expect(
            fitPanel({
                anchor: box(20, 390),
                panel: { width: 200, height: 70 },
                viewport: phone,
                block: "bottom",
                inline: "start",
            }).block,
        ).toBe("bottom");
    });

    it("never limits the size by the box, and says when the panel cannot be seen whole", () => {
        // 160px of panel in a box with 30px below the anchor and 82 above.
        const fit = fitPanel({
            anchor: box(20, 390),
            panel: { width: 200, height: 160 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            clip,
        });
        // The roomier side of the box.
        expect(fit.block).toBe("top");
        // The screen has room for 160px above the anchor, so there is no limit.
        expect(fit.maxHeight).toBeNull();
        expect(fit.visible).toBe(false);
    });

    it("lets the box decide the inline edge, and slides inside it when the panel is narrow enough", () => {
        // 200px from x 100 would end at 300, past the box's right edge at 266.
        const flipped = fitPanel({
            anchor: box(100, 310, 160),
            panel: { width: 200, height: 60 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            clip,
        });
        // From the anchor's right edge (260) leftwards: 60, inside the box.
        expect(flipped.inline).toBe("end");
        expect(flipped.left).toBe(60);
        expect(flipped.visible).toBe(true);

        // Neither edge: slid back to end at the box's edge.
        const slid = fitPanel({
            anchor: box(120, 310, 60),
            panel: { width: 240, height: 60 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            clip,
        });
        expect(slid.inline).toBe("start");
        expect(slid.left).toBe(26);
        expect(slid.visible).toBe(true);
    });

    it("slides inside the screen only when the panel is wider than the box", () => {
        const fit = fitPanel({
            anchor: box(20, 310),
            panel: { width: 300, height: 60 },
            viewport: phone,
            block: "bottom",
            inline: "start",
            clip,
        });
        // 20 + 300 = 320 fits a 375px screen: not moved, and not narrowed to the 256px box.
        expect(fit.left).toBe(20);
        expect(fit.maxWidth).toBeNull();
        expect(fit.visible).toBe(false);
    });
});

describe("measureFit", () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("changes nothing when there is no layout to measure", () => {
        const anchor = document.createElement("div");
        const panel = document.createElement("div");
        document.body.append(anchor, panel);
        expect(measureFit(anchor, panel, { block: "top", inline: "end" })).toEqual(
            unfitted("top", "end"),
        );
        anchor.remove();
        panel.remove();
    });

    it("measures the panel without its own limit, and puts the limit and the scroll position back", () => {
        const anchor = document.createElement("div");
        const panel = document.createElement("div");
        document.body.append(anchor, panel);
        panel.style.maxHeight = "120px";
        panel.scrollTop = 0;
        const seen: string[] = [];
        vi.spyOn(panel, "getBoundingClientRect").mockImplementation(() => {
            seen.push(panel.style.maxHeight);
            return { left: 0, top: 0, right: 200, bottom: 900, width: 200, height: 900 } as DOMRect;
        });
        vi.spyOn(anchor, "getBoundingClientRect").mockReturnValue({
            left: 20, top: 100, right: 120, bottom: 140, width: 100, height: 40,
        } as DOMRect);

        const fit = measureFit(anchor, panel, { block: "bottom", inline: "start" });
        expect(seen).toEqual(["none"]);
        expect(panel.style.maxHeight).toBe("120px");
        expect(fit.maxHeight).not.toBeNull();
        anchor.remove();
        panel.remove();
    });
});

describe("measureFit for a panel wider than the screen", () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("uses the height the panel has once it is narrowed, and leaves its own width limits as they were", () => {
        const anchor = document.createElement("div");
        const panel = document.createElement("div");
        document.body.append(anchor, panel);
        Object.defineProperty(document.documentElement, "clientWidth", { configurable: true, get: () => 320 });
        Object.defineProperty(document.documentElement, "clientHeight", { configurable: true, get: () => 568 });
        panel.style.minWidth = "10px";
        // 384px wide and 230px tall as it is; narrowed to the 304px there is, its text wraps to 500px.
        vi.spyOn(panel, "getBoundingClientRect").mockImplementation(() => {
            const narrowed = panel.style.maxWidth === "304px" && panel.style.minWidth === "304px";
            return (narrowed
                ? { left: 0, top: 0, right: 304, bottom: 500, width: 304, height: 500 }
                : { left: 0, top: 0, right: 384, bottom: 230, width: 384, height: 230 }) as DOMRect;
        });
        // 239px of room below the trigger, 233px above: 230px would fit below, 500px does not.
        vi.spyOn(anchor, "getBoundingClientRect").mockReturnValue({
            left: 200, top: 249, right: 300, bottom: 313, width: 100, height: 64,
        } as DOMRect);

        const fit = measureFit(anchor, panel, { block: "bottom", inline: "start" });
        expect(fit.maxWidth).toBe(304);
        expect(fit.block).toBe("bottom");
        expect(fit.maxHeight).toBe(568 - 313 - 8 - 8);
        expect(panel.style.minWidth).toBe("10px");
        expect(panel.style.maxWidth).toBe("");
        Reflect.deleteProperty(document.documentElement, "clientWidth");
        Reflect.deleteProperty(document.documentElement, "clientHeight");
        anchor.remove();
        panel.remove();
    });
});

describe("Dropdown near the edge of the screen", () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    /** jsdom has no layout: give the trigger and the menu the boxes a 375px phone would. */
    function layOut(triggerLeft: number) {
        Object.defineProperty(document.documentElement, "clientWidth", {
            configurable: true,
            get: () => 375,
        });
        Object.defineProperty(document.documentElement, "clientHeight", {
            configurable: true,
            get: () => 667,
        });
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
            this: HTMLElement,
        ) {
            if (this.hasAttribute("data-resolved-placement")) {
                return { left: triggerLeft, top: 148, right: triggerLeft + 220, bottom: 348, width: 220, height: 200 } as DOMRect;
            }
            // The Dropdown's own box: as wide as its trigger.
            return { left: triggerLeft, top: 100, right: triggerLeft + 100, bottom: 140, width: 100, height: 40 } as DOMRect;
        });
    }

    const popup = () => document.querySelector<HTMLElement>("[data-resolved-placement]")!;

    it("reproduces the overflow: asked for bottom-start at the right edge, it opens from the end instead", async () => {
        // 260 + 220 = 480: 105px past a 375px screen with the fixed class map.
        layOut(260);
        const user = userEvent.setup();
        render(DropdownOptionsHarness);
        await user.click(screen.getByRole("button", { name: /actions|open|menu/i }));

        await waitFor(() => expect(popup()).toBeTruthy());
        await waitFor(() =>
            expect(popup().getAttribute("data-resolved-placement")).toBe("bottom-end"),
        );
        expect(popup().className).toContain("end-0");
        expect(popup().className).not.toContain("start-0");
        // The prop is still what was asked for.
        expect(popup().parentElement!.getAttribute("data-placement")).toBe("bottom-start");
    });

    it("leaves a menu that fits where its placement puts it, with no inline style", async () => {
        layOut(20);
        const user = userEvent.setup();
        render(DropdownOptionsHarness);
        await user.click(screen.getByRole("button", { name: /actions|open|menu/i }));

        await waitFor(() => expect(popup()).toBeTruthy());
        expect(popup().getAttribute("data-resolved-placement")).toBe("bottom-start");
        expect(popup().className).toContain("start-0");
        expect(popup().getAttribute("style") ?? "").toBe("");
    });
});

describe("pickSide and shiftIntoViewport", () => {
    const viewport = { width: 320, height: 568 };
    const size = { width: 200, height: 40 };
    const at = (left: number, top: number, width = 40, height = 40) => ({
        left,
        top,
        right: left + width,
        bottom: top + height,
    });

    it("keeps the preferred side when there is room", () => {
        expect(pickSide("top", at(140, 300), size, viewport)).toBe("top");
        expect(pickSide("bottom", at(140, 300), size, viewport)).toBe("bottom");
    });

    it("takes the opposite side when only that has room", () => {
        // 10px above: a 40px box with its 8px gap and 8px margin does not fit.
        expect(pickSide("top", at(140, 10), size, viewport)).toBe("bottom");
        expect(pickSide("bottom", at(140, 520), size, viewport)).toBe("top");
        expect(pickSide("left", at(10, 300), size, viewport)).toBe("right");
    });

    it("with room on neither side, takes the one with more", () => {
        const tall = { width: 200, height: 400 };
        expect(pickSide("top", at(140, 100), tall, viewport)).toBe("bottom");
        expect(pickSide("top", at(140, 400), tall, viewport)).toBe("top");
        // On a 320px screen a 200px box fits on neither side of a centred trigger.
        expect(pickSide("left", at(140, 300), size, viewport)).toBe("left");
    });

    it("counts the gap and the margin", () => {
        // 56px above: exactly the 40px box, 8px gap and 8px margin.
        expect(pickSide("top", at(140, 56), size, viewport)).toBe("top");
        expect(pickSide("top", at(140, 55), size, viewport)).toBe("bottom");
        expect(pickSide("top", at(140, 55), size, viewport, { gap: 0, margin: 0 })).toBe("top");
    });

    it("moves a box back on screen, by no more than it takes", () => {
        expect(shiftIntoViewport({ left: 60, right: 260, top: 100, bottom: 140 }, viewport)).toEqual({
            x: 0,
            y: 0,
        });
        expect(shiftIntoViewport({ left: -84, right: 116, top: 100, bottom: 140 }, viewport)).toEqual({
            x: 92,
            y: 0,
        });
        expect(shiftIntoViewport({ left: 204, right: 404, top: 100, bottom: 140 }, viewport)).toEqual({
            x: -92,
            y: 0,
        });
        expect(shiftIntoViewport({ left: 60, right: 260, top: -20, bottom: 20 }, viewport).y).toBe(28);
        expect(shiftIntoViewport({ left: 60, right: 260, top: 540, bottom: 580 }, viewport, 0).y).toBe(-12);
    });

    it("starts a box wider than the screen at the start edge", () => {
        expect(shiftIntoViewport({ left: -40, right: 360, top: 100, bottom: 140 }, viewport).x).toBe(48);
    });
    it("an ancestor that clips counts as well as the screen", () => {
        // 300px above on screen, but the box the trigger is in starts 20px above it.
        const clip = { left: 0, right: 320, top: 280, bottom: 568 };
        expect(pickSide("top", at(140, 300), size, viewport)).toBe("top");
        expect(pickSide("top", at(140, 300), size, viewport, { clip })).toBe("bottom");
    });

    it("fitPanel opens on the side pickSide gives", () => {
        for (const top of [10, 100, 300, 400, 520]) {
            for (const height of [40, 400]) {
                for (const block of ["top", "bottom"] as const) {
                    const anchor = at(140, top);
                    const panel = { width: 200, height };
                    const fit = fitPanel({ anchor, panel, viewport, block, inline: "start" });
                    expect(fit.block).toBe(pickSide(block, anchor, panel, viewport));
                }
            }
        }
    });
});
