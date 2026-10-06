import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Progress from "../src/components/atoms/Progress.svelte";

afterEach(cleanup);

describe("Progress colours", () => {
    it("uses the progress roles for the track and the fill, not a ramp step", () => {
        render(Progress, { value: 4, max: 19 });
        const track = screen.getByRole("progressbar");
        const fill = track.firstElementChild as HTMLElement;
        expect(track.className).toContain("bg-progress-track");
        expect(track.className).toContain("border-input-border");
        expect(track.className).not.toMatch(/\bbg-input\b/);
        expect(fill.className).toContain("bg-progress-fill");
        expect(fill.className).not.toMatch(/brand-\d/);
        expect(fill.style.width).toBe(`${(4 / 19) * 100}%`);
    });
});

describe("Progress behaviour", () => {
    it("puts rest props on the wrapper only and keeps the bar's own id", () => {
        const { container } = render(Progress, { id: "pp", value: 50, label: "x" });
        expect(container.querySelectorAll("#pp")).toHaveLength(1);
        const bar = screen.getByRole("progressbar");
        expect(bar.id).not.toBe("pp");
        expect(bar.getAttribute("aria-labelledby")).toBe(`${bar.id}-label`);
        expect(screen.getByRole("progressbar", { name: "x" })).toBe(bar);
    });

    it("clamps aria-valuenow to 0..max", () => {
        const { rerender } = render(Progress, { value: 150 });
        expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("100");
        rerender({ value: -5 });
        expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("0");
    });

    it.each([0, -3, NaN, Infinity])("treats max=%s as the default 100", (max) => {
        render(Progress, { value: 25, max });
        const bar = screen.getByRole("progressbar");
        expect(bar.getAttribute("aria-valuemax")).toBe("100");
        expect((bar.firstElementChild as HTMLElement).style.width).toBe("25%");
    });

    it("passes aria-label and aria-labelledby to the progressbar", () => {
        render(Progress, { value: 10, "aria-label": "Upload" });
        expect(screen.getByRole("progressbar", { name: "Upload" })).toBeTruthy();
        cleanup();
        const { container } = render(Progress, { value: 10, "aria-labelledby": "other" });
        const bar = screen.getByRole("progressbar");
        expect(bar.getAttribute("aria-labelledby")).toBe("other");
        expect(container.firstElementChild?.hasAttribute("aria-labelledby")).toBe(false);
    });
});
