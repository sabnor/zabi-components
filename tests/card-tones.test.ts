import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Badge from "../src/components/atoms/Badge.svelte";
import Button from "../src/components/atoms/Button.svelte";
import Card from "../src/components/atoms/Card.svelte";
import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Rating from "../src/components/atoms/Rating.svelte";
import { toneSurface } from "../src/components/util/tone-surface.js";
import ToneHarness from "./fixtures/ToneHarness.svelte";

afterEach(() => cleanup());

const classesOf = (element: Element) => (element.getAttribute("class") ?? "").split(/\s+/);
const css = readFileSync(join(process.cwd(), "src/app.css"), "utf8");

describe("Card tone", () => {
    it("neutral is what the card painted before: same classes, no style", () => {
        const { container } = render(Card, { children: undefined });
        const card = container.firstElementChild!;
        expect(card.getAttribute("class")).toBe(
            "rounded-container transition-all duration-150 bg-card border border-border shadow-none w-full p-6",
        );
        expect(card.getAttribute("style")).toBeNull();
        expect(card.getAttribute("role")).toBeNull();
    });

    it("neutral variants keep their classes", () => {
        const a = render(Card, { variant: "elevated" });
        const b = render(Card, { variant: "flat" });
        const elevated = a.container.firstElementChild!;
        const flat = b.container.firstElementChild!;
        expect(classesOf(elevated)).toEqual(expect.arrayContaining(["bg-card-elevated", "shadow-lg"]));
        expect(classesOf(flat)).toEqual(expect.arrayContaining(["bg-card-flat", "border-none"]));
    });

    it.each([
        ["tint", ["bg-card-tint"], []],
        ["brand", ["bg-action-primary", "on-brand"], []],
        ["accent", ["bg-accent", "on-accent"], []],
    ] as const)("%s has its fill and no border or shadow", (tone, wanted) => {
        render(ToneHarness, { scenario: "tone", tone });
        const classes = classesOf(screen.getByTestId("card"));
        expect(classes).toEqual(expect.arrayContaining([...wanted, "shadow-none", "p-6", "rounded-container"]));
        expect(classes.some((name) => name === "border" || name.startsWith("border-"))).toBe(false);
        expect(classes).not.toContain("bg-card");
    });

    it("elevated keeps its shadow on a tone", () => {
        const { container } = render(Card, { tone: "brand", variant: "elevated" });
        const classes = classesOf(container.firstElementChild!);
        expect(classes).toContain("shadow-lg");
        expect(classes).not.toContain("shadow-none");
    });

    it("a custom fill wins over tone: on-fill, the colour and the label colour in the style", () => {
        render(ToneHarness, { scenario: "tone", tone: "brand", fill: "var(--group-colour)", onFill: "#fff" });
        const card = screen.getByTestId("card");
        expect(classesOf(card)).toContain("on-fill");
        expect(classesOf(card)).not.toContain("bg-action-primary");
        const style = card.getAttribute("style")!;
        expect(style).toContain("--zabi-fill: var(--group-colour)");
        expect(style).toContain("--zabi-on-fill: #fff");
    });

    it("a fill without onFill leaves the label colour unset", () => {
        expect(toneSurface({ fill: "#123" }).style).not.toContain("--zabi-on-fill");
        expect(toneSurface({}).classes).toBe("");
    });

    it("a caller's own style is kept beside the fill", () => {
        const { container } = render(Card, { fill: "#123", onFill: "#fff", style: "margin: 0" });
        const style = container.firstElementChild!.getAttribute("style")!;
        expect(style).toContain("--zabi-fill: #123");
        expect(style).toContain("margin: 0");
    });

    it("an interactive tinted card hovers with a veil of its own text colour, not a fill", () => {
        render(Card, { tone: "accent", onclick: () => {}, ariaLabel: "x" });
        const classes = classesOf(screen.getByRole("button"));
        expect(classes).toEqual(expect.arrayContaining(["relative", "after:bg-current", "after:rounded-[inherit]", "motion-reduce:after:transition-none"]));
        expect(classes).not.toContain("hover:bg-card-hover");
    });

    it("a neutral Card inside a filled one is a surface the stylesheet gives the theme's colours back on", () => {
        render(ToneHarness, { scenario: "nested", tone: "brand" });
        expect(classesOf(screen.getByTestId("inner"))).toContain("bg-card");
        // `.bg-card` is in the list of surfaces inside .on-brand, .on-accent and .on-fill.
        expect(css).toMatch(/:where\(\.on-brand, \.on-accent, \.on-fill\)\s*:where\(\s*\.bg-card,/);
    });
});

describe("what sits inside a brand, accent or custom block", () => {
    it("Heading and Text read the re-pointed roles (their classes are the role tokens)", () => {
        render(ToneHarness, { scenario: "tone", tone: "brand" });
        expect(classesOf(screen.getByRole("heading", { name: "Rubrik" }))).toContain("text-headline");
        expect(classesOf(screen.getByText("Brödtext"))).toContain("text-body");
    });

    it("the roles are re-pointed in all three scopes", () => {
        for (const scope of [".on-brand", ".on-accent", ".on-fill"]) {
            const body = css.match(new RegExp(`\\n\\s*${scope.replace(".", "\\.")}\\s*\\{([^}]*)\\}`))![1];
            for (const role of ["--color-headline", "--color-body", "--color-link", "--color-action-outline-border", "--color-focus-ring"]) {
                expect(body).toContain(role);
            }
        }
    });

    it("an outline, ghost, text and link Button take their label and edge from those roles", () => {
        render(Button, { variant: "outline", text: "o" });
        render(Button, { variant: "ghost", text: "g" });
        render(Button, { variant: "text", text: "t" });
        render(Button, { variant: "link", text: "l" });
        expect(classesOf(screen.getByRole("button", { name: "o" }))).toEqual(expect.arrayContaining(["text-headline", "border-action-outline"]));
        expect(classesOf(screen.getByRole("button", { name: "g" }))).toContain("text-headline");
        expect(classesOf(screen.getByRole("button", { name: "t" }))).toContain("text-link");
        expect(classesOf(screen.getByRole("button", { name: "l" }))).toContain("text-link");
    });

    it("a primary Button and a solid brand Badge are the block's colour, so the scope inverts them", () => {
        render(Button, { text: "p" });
        render(Badge, { variant: "brand", emphasis: "solid", text: "b" });
        expect(classesOf(screen.getByRole("button", { name: "p" }))).toContain("bg-action-primary");
        expect(classesOf(screen.getByText("b"))).toContain("bg-action-primary");
        // brand block: the family of the block is inverted, the label colour is the fill.
        expect(css).toMatch(/:where\(\.bg-action-primary\):where\(\.on-brand \*, \.on-accent \*, \.on-fill \*\)\s*\{[^}]*--color-action-primary: var\(--zabi-inv-primary\)/);
        expect(css).toMatch(/:where\(\.on-brand\)\s*\{[^}]*--zabi-inv-primary: var\(--color-on-brand\)[^}]*--zabi-inv-primary-text: var\(--color-action-primary\)/);
        expect(css).toMatch(/:where\(\.on-fill\)\s*\{[^}]*--zabi-inv-primary: var\(--zabi-on-fill, currentColor\)/);
    });

    it("the accent family is inverted in an accent block, and a surface inside gives it all back", () => {
        expect(css).toMatch(/:where\(\.on-accent\)\s*\{[^}]*--zabi-inv-accent: var\(--color-on-accent\)/);
        const surfaceBody = css.match(/--color-action-outline-border-hover: var\(--zabi-theme-action-outline-border-hover\);\n([^}]*)\}/)![1];
        for (const key of ["--zabi-inv-primary: var(--color-action-primary)", "--zabi-inv-accent: var(--color-accent)", "--zabi-inv-star: initial"]) {
            expect(surfaceBody).toContain(key);
        }
    });

    it("a filled Rating star is the label colour in a block (its outline was already), readonly or input", () => {
        render(Rating, { value: 3, readonly: true, label: "Betyg" });
        render(Rating, { value: 2, label: "Ge betyg" });
        expect(document.querySelectorAll(".rating")).toHaveLength(2);
        expect(css).toMatch(/:where\(\.rating\):where\(\.on-brand \*, \.on-accent \*, \.on-fill \*\)\s*\{\s*--zabi-rating-on: var\(--zabi-inv-star\)/);
        expect(css).toMatch(/:where\(\.on-brand\)\s*\{[^}]*--zabi-inv-star: var\(--color-on-brand\)/);
        expect(css).toMatch(/:where\(\.on-accent\)\s*\{[^}]*--zabi-inv-star: var\(--color-on-accent\)/);
    });

    it("a Checkbox has no fill of its own at rest: its label and edge are the re-pointed roles", () => {
        render(Checkbox, { label: "Ja" });
        expect(screen.getByRole("checkbox", { name: "Ja" })).toBeTruthy();
    });
});
