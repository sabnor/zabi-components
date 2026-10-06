// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Heading from "../src/components/atoms/Heading.svelte";
import Stat from "../src/components/atoms/Stat.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const cls = (body: string) => /class="([^"]*)"/.exec(body)![1].split(/\s+/);

describe("Heading variant display (server render)", () => {
    it("leaves the default output byte for byte as before", () => {
        const plain = renderOnServer(Heading, { props: { level: 1, text: "Hej" } }).body;
        const explicit = renderOnServer(Heading, { props: { level: 1, text: "Hej", variant: "heading" } }).body;
        expect(explicit).toBe(plain);
        expect(plain).toContain('<h1 class="text-headline text-4xl leading-10 tracking-[-0.02em] font-bold">');
        expect(plain).not.toContain("font-display");
    });

    it.each([
        [1, ["text-5xl", "sm:text-6xl", "leading-[1.0]"]],
        [2, ["text-4xl", "sm:text-5xl", "leading-[1.05]"]],
        [3, ["text-3xl", "sm:text-4xl", "leading-[1.1]"]],
        [4, ["text-3xl", "leading-[1.2]"]],
        [5, ["text-2xl", "leading-[1.2]"]],
        [6, ["text-xl", "leading-[1.2]"]],
    ] as const)("level %i has the display steps and the display voice", (level, expected) => {
        const body = renderOnServer(Heading, { props: { level, variant: "display", text: "x" } }).body;
        expect(body).toContain(`<h${level} `);
        const names = cls(body);
        expect(names).toEqual(expect.arrayContaining([...expected, "font-display", "text-balance", "text-headline"]));
        expect(names.some((n) => n.includes("--zabi-display-weight"))).toBe(true);
        expect(names.some((n) => n.includes("--zabi-display-tracking"))).toBe(true);
    });

    it("size picks the steps and level keeps the tag", () => {
        const body = renderOnServer(Heading, { props: { level: 2, size: 5, variant: "display", text: "x" } }).body;
        expect(body).toContain("<h2 ");
        expect(cls(body)).toEqual(expect.arrayContaining(["text-2xl", "leading-[1.2]"]));
    });

    it("a call-site class wins over the variant's", () => {
        const body = renderOnServer(Heading, {
            props: { level: 1, variant: "display", text: "x", class: "text-3xl font-bold leading-tight" },
        }).body;
        const names = cls(body);
        expect(names).toContain("text-3xl");
        expect(names).not.toContain("text-5xl");
        expect(names).toContain("font-bold");
        expect(names.some((n) => n.includes("--zabi-display-weight"))).toBe(false);
        expect(names).not.toContain("leading-[1.0]");
    });
});

describe("Stat (server render)", () => {
    it("renders the three texts in order", () => {
        const { body } = renderOnServer(Stat, {
            props: { value: "4", unit: "av 19", label: "pubar besökta", size: "lg" },
        });
        expect(body.indexOf(">4<")).toBeGreaterThan(-1);
        expect(body.indexOf(">4<")).toBeLessThan(body.indexOf(">av 19<"));
        expect(body.indexOf(">av 19<")).toBeLessThan(body.indexOf(">pubar besökta<"));
    });

    it("puts the label first when above", () => {
        const { body } = renderOnServer(Stat, { props: { value: "5", label: "besök", labelPosition: "above" } });
        expect(body.indexOf(">besök<")).toBeLessThan(body.indexOf(">5<"));
    });
});
