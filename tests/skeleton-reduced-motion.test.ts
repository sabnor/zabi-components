import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Skeleton from "../src/components/atoms/Skeleton.svelte";

afterEach(cleanup);

describe("Skeleton under reduced motion (Z-093)", () => {
    it("pulses, and stops under prefers-reduced-motion", () => {
        render(Skeleton);
        const classes = screen.getByRole("status").className.split(/\s+/);
        expect(classes).toContain("animate-pulse");
        expect(classes).toContain("motion-reduce:animate-none");
    });

    it("a class of the caller can bring the pulse back", () => {
        render(Skeleton, { props: { class: "motion-reduce:animate-pulse" } });
        const classes = screen.getByRole("status").className.split(/\s+/);
        expect(classes).toContain("motion-reduce:animate-pulse");
        expect(classes).not.toContain("motion-reduce:animate-none");
    });
});
