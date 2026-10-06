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
