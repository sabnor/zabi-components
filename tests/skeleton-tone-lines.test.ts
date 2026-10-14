import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Skeleton from "../src/components/atoms/Skeleton.svelte";

afterEach(cleanup);

const classesOf = (element: Element) => (element.getAttribute("class") ?? "").split(/\s+/);

describe("Skeleton tone (Z-095)", () => {
    it("the default tone is the neutral fill, as before", () => {
        render(Skeleton);
        const classes = classesOf(screen.getByRole("status"));
        expect(classes).toContain("bg-neutral-subtle");
        expect(classes).not.toContain("bg-skeleton-on-color");
    });

    it('tone="on-color" takes the on-colour fill and drops the neutral one', () => {
        render(Skeleton, { props: { tone: "on-color", variant: "block" } });
        const classes = classesOf(screen.getByRole("status"));
        expect(classes).toContain("bg-skeleton-on-color");
        expect(classes).not.toContain("bg-neutral-subtle");
        expect(classes).toContain("animate-pulse");
        expect(classes).toContain("motion-reduce:animate-none");
    });

    it("the fill is the surface's label colour at a low strength, and the blocks do not restore it", () => {
        const css = readFileSync("src/app.css", "utf8");
        expect(css).toMatch(/\.bg-skeleton-on-color\s*\{[^}]*color-mix\(in srgb, currentColor 24%, transparent\)/);
        // The lists that put the theme's text back on a surface inside a block name the surfaces; this fill must keep the block's.
        const lists = css.match(/:where\(\.on-brand, \.on-accent, \.on-fill\)\s*:where\([^)]*\)/g) ?? [];
        expect(lists.length).toBeGreaterThan(0);
        for (const list of lists) expect(list).not.toContain("bg-skeleton-on-color");
    });
});

describe("Skeleton lines (Z-095)", () => {
    it("lines={3} is one status with three bars, the last shorter", () => {
        const { container } = render(Skeleton, { props: { lines: 3 } });
        expect(screen.getAllByRole("status")).toHaveLength(1);
        const bars = container.querySelectorAll("[data-skeleton-line]");
        expect(bars).toHaveLength(3);
        expect(classesOf(bars[0])).toContain("w-full");
        expect(classesOf(bars[1])).toContain("w-full");
        expect(classesOf(bars[2])).toContain("w-3/5");
        expect(classesOf(bars[2])).not.toContain("w-full");
        for (const bar of bars) expect(classesOf(bar)).toContain("animate-pulse");
    });

    it("one line is full width; the count is clamped to 1..20", () => {
        const one = render(Skeleton, { props: { lines: 1 } });
        const bars = one.container.querySelectorAll("[data-skeleton-line]");
        expect(bars).toHaveLength(1);
        expect(classesOf(bars[0])).toContain("w-full");
        cleanup();
        const many = render(Skeleton, { props: { lines: 99 } });
        expect(many.container.querySelectorAll("[data-skeleton-line]")).toHaveLength(20);
        cleanup();
        const none = render(Skeleton, { props: { lines: 0 } });
        expect(none.container.querySelectorAll("[data-skeleton-line]")).toHaveLength(0);
    });

    it("width and class apply to the paragraph, height to each line, tone to the lines", () => {
        const { container } = render(Skeleton, {
            props: { lines: 2, width: "50%", height: 8, class: "mt-4", tone: "on-color" },
        });
        const wrapper = container.firstElementChild as HTMLElement;
        expect(wrapper.style.width).toBe("50%");
        expect(classesOf(wrapper)).toContain("mt-4");
        const bars = container.querySelectorAll<HTMLElement>("[data-skeleton-line]");
        for (const bar of bars) {
            expect(bar.style.height).toBe("8px");
            expect(classesOf(bar)).toContain("bg-skeleton-on-color");
        }
    });

    it("lines is for the text variant only", () => {
        const { container } = render(Skeleton, { props: { variant: "block", lines: 3 } });
        expect(container.querySelectorAll("[data-skeleton-line]")).toHaveLength(0);
    });

    it("lines can be decorative", () => {
        const { container } = render(Skeleton, { props: { lines: 2, decorative: true } });
        expect(screen.queryByRole("status")).toBeNull();
        expect(container.firstElementChild!.getAttribute("aria-hidden")).toBe("true");
    });
});
