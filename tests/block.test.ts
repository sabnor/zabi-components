import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Block from "../src/components/atoms/Block.svelte";
import { Block as BlockFromIndex } from "../src/components/atoms/index.js";
import ToneHarness from "./fixtures/ToneHarness.svelte";

afterEach(() => cleanup());

const classesOf = (element: Element) => (element.getAttribute("class") ?? "").split(/\s+/);

describe("Block", () => {
    it("is exported from the atoms index", () => {
        expect(BlockFromIndex).toBe(Block);
    });

    it("is a full-width, square, flat div on the card surface by default", () => {
        const { container } = render(Block);
        const el = container.firstElementChild!;
        const classes = classesOf(el);
        expect(classes).toEqual(expect.arrayContaining(["w-full", "rounded-none", "border-none", "shadow-none", "bg-card", "px-4", "py-6"]));
        expect(el.getAttribute("style")).toBeNull();
    });

    it.each([
        ["none", [], ["px-4", "py-4", "py-6", "px-6", "py-8"]],
        ["sm", ["px-4", "py-4"], ["py-6"]],
        ["md", ["px-4", "py-6"], ["py-4"]],
        ["lg", ["px-6", "py-8"], ["px-4"]],
    ] as const)("padding %s", (padding, has, hasNot) => {
        const { container } = render(Block, { padding });
        const classes = classesOf(container.firstElementChild!);
        for (const name of has) expect(classes).toContain(name);
        for (const name of hasNot) expect(classes).not.toContain(name);
    });

    it.each([
        ["tint", ["bg-card-tint"]],
        ["brand", ["bg-action-primary", "on-brand"]],
        ["accent", ["bg-accent", "on-accent"]],
    ] as const)("tone %s", (tone, wanted) => {
        render(ToneHarness, { scenario: "block", tone });
        const classes = classesOf(screen.getByTestId("block"));
        expect(classes).toEqual(expect.arrayContaining([...wanted, "w-full", "rounded-none"]));
        expect(classes).not.toContain("bg-card");
    });

    it("a custom fill is on-fill with the colours in the style", () => {
        render(ToneHarness, { scenario: "block", fill: "#123456", onFill: "#fff" });
        const el = screen.getByTestId("block");
        expect(classesOf(el)).toContain("on-fill");
        expect(el.getAttribute("style")).toContain("--zabi-fill: #123456");
        expect(el.getAttribute("style")).toContain("--zabi-on-fill: #fff");
    });

    it("renders the element asked for, with rest props, and keeps class", () => {
        render(ToneHarness, { scenario: "block-section" });
        const section = screen.getByRole("region", { name: "Sektion" });
        expect(section.tagName).toBe("SECTION");
        expect(section.id).toBe("s1");
        expect(section.getAttribute("data-x")).toBe("1");
        expect(screen.getByTestId("block2").tagName).toBe("FOOTER");
        render(Block, { as: "article", class: "-mx-4" });
        const article = document.querySelector("article")!;
        expect(classesOf(article)).toContain("-mx-4");
    });

    it("is not interactive: no role, no tabindex", () => {
        const { container } = render(Block, { tone: "brand" });
        const el = container.firstElementChild!;
        expect(el.getAttribute("role")).toBeNull();
        expect(el.getAttribute("tabindex")).toBeNull();
    });
});
