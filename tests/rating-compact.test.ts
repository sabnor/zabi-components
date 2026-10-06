import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import Rating from "../src/components/atoms/Rating.svelte";

afterEach(cleanup);

const comma = (v: number) => v.toFixed(1).replace(".", ",");
const root = () => document.querySelector<HTMLElement>(".rating")!;

describe("Rating compact", () => {
    it("is one star, the printed number and one name from the real value and max", () => {
        render(Rating, { props: { compact: true, value: 4, max: 5, formatValue: comma } });
        expect(screen.getByRole("img", { name: "4,0 of 5 stars" })).toBeTruthy();
        expect(document.querySelectorAll(".rating-glyph")).toHaveLength(1);
        expect(document.querySelector("[data-rating-value]")?.textContent?.trim()).toBe("4,0");
        expect(document.querySelector(".rating-glyph")?.getAttribute("aria-hidden")).toBe("true");
        expect(screen.queryAllByRole("radio")).toHaveLength(0);
    });

    it("uses the default format and the label", () => {
        render(Rating, { props: { compact: true, value: 3.54, max: 10, label: "Pub" } });
        expect(screen.getByRole("img", { name: "Pub, 3.5 of 10 stars" })).toBeTruthy();
        expect(root().textContent).toContain("Pub");
        expect(root().textContent).toContain("3.5");
    });

    it("keeps the label as the name only with hideLabel, and takes aria-label", () => {
        render(Rating, { props: { compact: true, value: 2, label: "Pub", hideLabel: true } });
        expect(screen.getByRole("img", { name: "Pub, 2 of 5 stars" })).toBeTruthy();
        expect(root().textContent).not.toContain("Pub");
        cleanup();
        render(Rating, { props: { compact: true, value: 2, "aria-label": "Visits" } });
        expect(screen.getByRole("img", { name: "Visits, 2 of 5 stars" })).toBeTruthy();
    });

    it("shows no rating for null, with an empty star", () => {
        render(Rating, { props: { compact: true, value: null } });
        expect(screen.getByRole("img", { name: "No rating" })).toBeTruthy();
        expect(root().textContent).toContain("No rating");
        const glyph = document.querySelector<HTMLElement>(".rating-glyph")!;
        expect(glyph.style.getPropertyValue("--zabi-rating-fill")).toBe("0");
    });

    it("ignores showValue, clearable, name and onchange, and warns once in dev", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const onchange = vi.fn();
        render(Rating, {
            props: { compact: true, value: 4, showValue: false, clearable: true, name: "x", onchange },
        });
        expect(document.querySelector("[data-rating-value]")).toBeTruthy();
        expect(document.querySelector("[data-rating-clear]")).toBeNull();
        expect(document.querySelector("input")).toBeNull();
        expect(onchange).not.toHaveBeenCalled();
        expect(warn.mock.calls.filter((c) => String(c[0]).includes("compact"))).toHaveLength(1);
        warn.mockRestore();
    });

    it("sets the size on the root", () => {
        for (const size of ["sm", "md", "lg", "xl", "display"] as const) {
            render(Rating, { props: { compact: true, value: 4, size } });
            expect(root().dataset.size).toBe(size);
            const value = document.querySelector("[data-rating-value]")!;
            expect(value.classList.contains("font-display")).toBe(size === "display");
            expect(value.classList.contains("font-bold")).toBe(size === "display");
            cleanup();
        }
    });
});

describe("Rating sizes and empty state", () => {
    it("xl is an input with 44px+ targets; display reads as xl in a row of stars", () => {
        render(Rating, { props: { size: "xl", empty: "soft", value: 2 } });
        expect(screen.getAllByRole("radio")).toHaveLength(5);
        expect(root().dataset.size).toBe("xl");
        expect(root().dataset.empty).toBe("soft");
        cleanup();
        render(Rating, { props: { size: "display", readonly: true, value: 2 } });
        expect(root().dataset.size).toBe("xl");
    });

    it("sets data-empty only for soft", () => {
        render(Rating, { props: { value: 2 } });
        expect(root().hasAttribute("data-empty")).toBe(false);
        cleanup();
        render(Rating, { props: { value: 3.5, readonly: true, empty: "soft" } });
        expect(root().dataset.empty).toBe("soft");
        cleanup();
        render(Rating, { props: { compact: true, value: null, empty: "soft" } });
        expect(root().dataset.empty).toBe("soft");
    });
});
