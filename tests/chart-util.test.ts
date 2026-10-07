import { describe, expect, it } from "vitest";

import {
    chartColor,
    chartFormatter,
    chartMarker,
    chartScale,
    labelEvery,
    linePath,
    niceStep,
    pieSlices,
    slicePath,
} from "../src/components/util/chart";

describe("chart colours", () => {
    it("gives a series the property of its place, falling back to a theme token, and starts again after six", () => {
        expect(chartColor(undefined, 0)).toBe("var(--zabi-chart-1, var(--color-action-primary))");
        expect(chartColor(undefined, 5)).toBe("var(--zabi-chart-6, var(--color-info))");
        expect(chartColor(undefined, 6)).toBe(chartColor(undefined, 0));
    });

    it("maps a named colour to its token and passes any other CSS colour through", () => {
        expect(chartColor("success", 0)).toBe("var(--color-success)");
        expect(chartColor("primary", 3)).toBe("var(--color-action-primary)");
        expect(chartColor("#c2410c", 0)).toBe("#c2410c");
        expect(chartColor("var(--color-quiz-gold)", 2)).toBe("var(--color-quiz-gold)");
    });

    it("gives the first four series four different markers", () => {
        expect(new Set([0, 1, 2, 3].map(chartMarker)).size).toBe(4);
        expect(chartMarker(4)).toBe(chartMarker(0));
    });
});

describe("chartFormatter", () => {
    it("reads percent as already a percentage", () => {
        const text = chartFormatter("percent", "en")(72);
        expect(text).toMatch(/^72\s?%$/);
    });

    it("writes a plain number for the locale, and takes a function as it is", () => {
        expect(chartFormatter("number", "en")(1234.5)).toBe("1,234.5");
        expect(chartFormatter(undefined, "en")(3)).toBe("3");
        expect(chartFormatter((value) => `${value} p`)(4)).toBe("4 p");
    });

    it("does not throw on a locale that is not one", () => {
        expect(() => chartFormatter("number", "not a locale")(1)).not.toThrow();
    });
});

describe("chartScale", () => {
    it("steps by 1, 2 or 5 times a power of ten", () => {
        expect(niceStep(100)).toBe(20);
        expect(niceStep(10)).toBe(2);
        expect(niceStep(7)).toBe(2);
        expect(niceStep(0.4)).toBe(0.1);
        expect(niceStep(0)).toBe(1);
    });

    it("rounds an open end outward to a tick", () => {
        const scale = chartScale([62, 68, 71, 66, 78]);
        expect(scale.min).toBe(60);
        expect(scale.max).toBe(80);
        expect(scale.ticks).toEqual([60, 65, 70, 75, 80]);
    });

    it("keeps a given min and max exactly", () => {
        const scale = chartScale([62, 78], { min: 0, max: 100 });
        expect(scale).toEqual({ min: 0, max: 100, ticks: [0, 20, 40, 60, 80, 100] });
        const odd = chartScale([3, 9], { min: 1, max: 9.5 });
        expect([odd.min, odd.max]).toEqual([1, 9.5]);
        expect(odd.ticks.every((tick) => tick >= 1 && tick <= 9.5)).toBe(true);
    });

    it("keeps zero on the axis when asked, below and above", () => {
        expect(chartScale([4, 9], { zero: true }).min).toBe(0);
        const mixed = chartScale([3, -4, 5], { zero: true });
        expect(mixed.min).toBeLessThanOrEqual(-4);
        expect(mixed.ticks).toContain(0);
    });

    it("has a real span for no data, one value and equal values, and ignores what is not a number", () => {
        for (const values of [[], [5], [5, 5, 5], [null, undefined, Number.NaN]]) {
            const scale = chartScale(values as number[]);
            expect(scale.max).toBeGreaterThan(scale.min);
            expect(scale.ticks.length).toBeGreaterThan(1);
        }
        expect(chartScale([1, null, 9, Number.NaN]).max).toBe(10);
    });

    it("has ticks without floating-point tails", () => {
        expect(chartScale([0.1, 0.3]).ticks).toEqual([0.1, 0.15, 0.2, 0.25, 0.3]);
    });
});

describe("labelEvery", () => {
    it("shows every label that fits and thins them out when they do not", () => {
        expect(labelEvery(["a", "b", "c"], 300)).toBe(1);
        expect(labelEvery(Array.from({ length: 30 }, (_, index) => `${index + 1} okt`), 300)).toBeGreaterThan(1);
        expect(labelEvery([], 300)).toBe(1);
    });
});

describe("linePath", () => {
    it("draws through the points and lifts the pen at a gap", () => {
        expect(linePath([{ x: 0, y: 10 }, { x: 5, y: 20 }, null, { x: 15, y: 5 }, { x: 20, y: 0 }])).toBe(
            "M0 10L5 20M15 5L20 0",
        );
        expect(linePath([])).toBe("");
    });
});

describe("pie slices", () => {
    it("shares a whole turn in the order given, starting at twelve o'clock", () => {
        const slices = pieSlices([
            { label: "a", value: 1 },
            { label: "b", value: 1 },
            { label: "c", value: 2 },
        ]);
        expect(slices.map((slice) => slice.share)).toEqual([0.25, 0.25, 0.5]);
        expect(slices[0].start).toBe(0);
        expect(slices[2].end).toBeCloseTo(Math.PI * 2);
        expect(slices[1].start).toBe(slices[0].end);
    });

    it("gives no room to zero, a negative or what is not a number, and survives an empty total", () => {
        const slices = pieSlices([
            { label: "a", value: 4 },
            { label: "b", value: -3 },
            { label: "c", value: Number.NaN },
        ]);
        expect(slices.map((slice) => slice.share)).toEqual([1, 0, 0]);
        expect(pieSlices([{ label: "a", value: 0 }])[0].share).toBe(0);
        expect(pieSlices([])).toEqual([]);
    });

    it("draws a quarter from the centre, a ring slice without it, and a whole turn as two halves", () => {
        expect(slicePath(50, 50, 50, 0, 0, Math.PI / 2)).toBe("M50 0A50 50 0 0 1 100 50L50 50Z");
        expect(slicePath(50, 50, 50, 30, 0, Math.PI / 2)).toBe("M50 0A50 50 0 0 1 100 50L80 50A30 30 0 0 0 50 20Z");
        const whole = slicePath(50, 50, 50, 0, 0, Math.PI * 2);
        expect(whole.match(/A/g)).toHaveLength(2);
        expect(whole).not.toContain("NaN");
        expect(slicePath(50, 50, 50, 30, 0, Math.PI * 2).match(/A/g)).toHaveLength(4);
        expect(slicePath(50, 50, 50, 0, 1, 1)).toBe("");
    });
});
