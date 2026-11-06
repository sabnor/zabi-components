// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Heading from "../src/components/atoms/Heading.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const classesOf = (props: Record<string, unknown>) =>
    /class="([^"]*)"/.exec(renderOnServer(Heading, { props: { text: "x", ...props } }).body)![1].split(/\s+/);

describe("Heading fluid", () => {
    it("leaves display output unchanged without fluid", () => {
        const plain = renderOnServer(Heading, { props: { level: 1, variant: "display", text: "x" } }).body;
        const off = renderOnServer(Heading, { props: { level: 1, variant: "display", fluid: false, text: "x" } }).body;
        expect(off).toBe(plain);
        expect(plain).not.toContain("clamp");
    });

    it.each([
        [1, "text-[clamp(3rem,2.55rem_+_1.875vw,3.75rem)]", "text-5xl", "leading-[1.0]"],
        [2, "text-[clamp(2.25rem,1.8rem_+_1.875vw,3rem)]", "text-4xl", "leading-[1.05]"],
        [3, "text-[clamp(1.875rem,1.65rem_+_0.9375vw,2.25rem)]", "text-3xl", "leading-[1.1]"],
    ] as const)("level %i is one clamp and keeps its leading", (level, clamp, step, leading) => {
        const names = classesOf({ level, variant: "display", fluid: true });
        expect(names).toContain(clamp);
        expect(names).toContain(leading);
        expect(names).not.toContain(step);
        expect(names.some((n) => n.startsWith("sm:text-"))).toBe(false);
    });

    it.each([4, 5, 6] as const)("level %i has one step and is unchanged", (level) => {
        expect(classesOf({ level, variant: "display", fluid: true })).toEqual(classesOf({ level, variant: "display" }));
    });

    it("is ignored with the heading variant", () => {
        expect(classesOf({ level: 1, fluid: true })).toEqual(classesOf({ level: 1 }));
    });
});

describe("Heading weight token", () => {
    it.each([
        [1, "700"],
        [2, "700"],
        [3, "600"],
        [6, "600"],
    ] as const)("level %i reads --zabi-heading-font-weight with %s as the fallback", (level, weight) => {
        expect(classesOf({ level })).toContain(
            `font-[weight:var(--zabi-heading-font-weight,${weight})]`,
        );
    });

    it("leaves the display variant on its own weight token", () => {
        expect(classesOf({ level: 1, variant: "display" }).join(" ")).not.toContain("--zabi-heading-font-weight");
    });
});
