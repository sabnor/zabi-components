import { cleanup, render, screen } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";

import Progress from "../src/components/atoms/Progress.svelte";
import { PROGRESS_STRINGS, canSegment, filledSegments } from "../src/components/util/progress";

afterEach(cleanup);

const segments = () => Array.from(screen.getByRole("progressbar").children) as HTMLElement[];
const isFilled = (el: HTMLElement) => el.className.includes("bg-progress-fill");

describe("Progress helpers", () => {
    it("segments only a whole max from 2 to 24", () => {
        for (const max of [2, 5, 19, 24]) expect(canSegment(max)).toBe(true);
        for (const max of [1, 0, 25, 2.5, NaN, Infinity, -4]) expect(canSegment(max)).toBe(false);
    });

    it("rounds the filled count down and holds it within 0..max", () => {
        expect(filledSegments(3.9, 5)).toBe(3);
        expect(filledSegments(-2, 5)).toBe(0);
        expect(filledSegments(9, 5)).toBe(5);
        expect(filledSegments(NaN, 5)).toBe(0);
    });
});

describe("Progress segmented", () => {
    it("draws max segments, value of them filled, as one progressbar", () => {
        render(Progress, { value: 4, max: 19, segmented: true, label: "Rundan" });
        const bar = screen.getByRole("progressbar", { name: "Rundan" });
        expect(segments()).toHaveLength(19);
        expect(segments().filter(isFilled)).toHaveLength(4);
        expect(segments().slice(0, 4).every(isFilled)).toBe(true);
        expect(bar.getAttribute("aria-valuenow")).toBe("4");
        expect(bar.getAttribute("aria-valuemin")).toBe("0");
        expect(bar.getAttribute("aria-valuemax")).toBe("19");
        expect(bar.getAttribute("aria-valuetext")).toBe("4 of 19");
        expect(segments().every((el) => el.getAttribute("aria-hidden") === "true")).toBe(true);
        expect(document.querySelectorAll('[role="progressbar"]')).toHaveLength(1);
    });

    it("styles empty segments as the track with its edge, and uses 4px or 2px gaps", () => {
        render(Progress, { value: 1, max: 5, segmented: true });
        const empty = segments()[4];
        expect(empty.className).toContain("bg-progress-track");
        expect(empty.className).toContain("border-progress-track-border");
        expect(empty.className).toContain("rounded-full");
        expect(screen.getByRole("progressbar").className).toContain("gap-1");
        cleanup();
        render(Progress, { value: 1, max: 13, segmented: true });
        expect(screen.getByRole("progressbar").className).toContain("gap-[2px]");
    });

    it("rounds a fractional value down and clamps", () => {
        const { rerender } = render(Progress, { value: 2.9, max: 5, segmented: true });
        expect(segments().filter(isFilled)).toHaveLength(2);
        rerender({ value: 99 });
        expect(segments().filter(isFilled)).toHaveLength(5);
        rerender({ value: -1 });
        expect(segments().filter(isFilled)).toHaveLength(0);
    });

    it("shows the count instead of the percent beside the label", () => {
        render(Progress, { value: 4, max: 19, segmented: true, label: "Rundan" });
        expect(screen.getByText("4 of 19")).toBeTruthy();
        expect(screen.queryByText(/%/)).toBeNull();
    });

    it("keeps the percent in the continuous form", () => {
        render(Progress, { value: 40, label: "x" });
        expect(screen.getByText("40%")).toBeTruthy();
        expect(screen.getByRole("progressbar").hasAttribute("aria-valuetext")).toBe(false);
    });

    it("takes its words from strings", () => {
        render(Progress, {
            value: 4,
            max: 19,
            segmented: true,
            label: "Rundan",
            strings: { valueText: (v, m) => `${v} av ${m}` },
        });
        expect(screen.getByRole("progressbar").getAttribute("aria-valuetext")).toBe("4 av 19");
        expect(screen.getByText("4 av 19")).toBeTruthy();
    });

    it.each([1, 25, 2.5, 100])("falls back to the continuous bar for max=%s", (max) => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        render(Progress, { value: 1, max, segmented: true });
        const bar = screen.getByRole("progressbar");
        expect(bar.children).toHaveLength(1);
        expect((bar.firstElementChild as HTMLElement).style.width).not.toBe("");
        expect(bar.hasAttribute("aria-valuetext")).toBe(false);
        expect(warn.mock.calls.some((call) => String(call[0]).startsWith("[zabi-components] Progress:"))).toBe(true);
        warn.mockRestore();
    });

    it("is not segmented unless asked", () => {
        render(Progress, { value: 3, max: 5 });
        expect(screen.getByRole("progressbar").children).toHaveLength(1);
    });

    it("has an extra large size of 16px", () => {
        render(Progress, { value: 10, size: "xl" });
        expect(screen.getByRole("progressbar").className).toContain("h-4");
    });

    it("keeps forced-colours treatment on filled and empty segments", () => {
        render(Progress, { value: 1, max: 3, segmented: true });
        expect(segments()[0].className).toContain("forced-colors:bg-[Highlight]");
        expect(segments()[2].className).toContain("forced-colors:border-[CanvasText]");
    });
});

describe("Progress strings", () => {
    it("says 4 of 19 by default", () => {
        expect(PROGRESS_STRINGS.valueText(4, 19)).toBe("4 of 19");
    });
});

describe("Stepper upcoming marker", () => {
    // jsdom does not apply component styles, so the rule is read from the source.
    const source = readFileSync("src/components/molecules/Stepper.svelte", "utf8");
    const rule = source.match(/\.stepper-step\[data-state="upcoming"\] \.stepper-marker \{[^}]*\}/)![0];

    it("reads the two custom properties, falling back to the progress track tokens", () => {
        expect(rule).toContain("var(--zabi-stepper-upcoming-fill, var(--color-progress-track))");
        expect(rule).toContain("var(--zabi-stepper-upcoming-edge, var(--color-progress-track-border))");
        expect(rule).not.toContain("--color-control-border");
    });
});
