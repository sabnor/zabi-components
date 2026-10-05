import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { fitPanel, measureFit, unfitted } from "../src/components/util/fit-in-viewport";
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
        expect(fit).toEqual(unfitted("bottom", "start"));
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
        expect(fits).toEqual(unfitted("bottom", "start"));
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
