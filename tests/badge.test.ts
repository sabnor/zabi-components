import { readFileSync } from "node:fs";
import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Badge from "../src/components/atoms/Badge.svelte";

/**
 * Badge's box, as far as class names can say it. What the classes amount to
 * (20, 24 and 28px for one line, a long label wrapping inside a 360px screen
 * at 200% text) is measured in playwright/badge.spec.ts.
 */

afterEach(cleanup);

const classes = (text: string) => screen.getByText(text).className.split(/\s+/);

describe("Badge", () => {
    it.each([
        ["sm", "min-h-5", "py-px", "rounded-[0.625rem]"],
        ["md", "min-h-6", "py-[3px]", "rounded-[0.75rem]"],
        ["lg", "min-h-7", "py-[3px]", "rounded-[0.875rem]"],
    ] as const)("%s: a minimum height, the padding that makes one line that tall, and half of it as the corner", (size, height, padding, corner) => {
        render(Badge, { props: { text: "Bekräftad", size } });
        const own = classes("Bekräftad");
        expect(own).toEqual(expect.arrayContaining([height, padding, corner]));
        // Not a fixed height any more, and not the pill radius: a wrapped badge would be a lozenge.
        expect(own.some((name) => /^h-\d/.test(name))).toBe(false);
        expect(own).not.toContain("rounded-pill");
    });

    it("wraps: no nowrap, never wider than what it is in, and a long word breaks", () => {
        render(Badge, { props: { text: "Väntar på bekräftelse från gruppen" } });
        const own = classes("Väntar på bekräftelse från gruppen");
        expect(own).not.toContain("whitespace-nowrap");
        expect(own).toEqual(expect.arrayContaining(["[max-inline-size:100%]", "min-w-0", "[overflow-wrap:anywhere]"]));
        expect(own).toContain("items-center");
    });

    it("keeps its icon whole beside a wrapped label", () => {
        render(Badge, { props: { text: "Klar", variant: "success", showIcon: true } });
        const icon = screen.getByText("Klar").querySelector("svg")!;
        expect(icon.getAttribute("class")).toContain("shrink-0");
        expect(icon.getAttribute("aria-hidden")).toBe("true");
    });

    it("a corner from the call site still wins", () => {
        render(Badge, { props: { text: "9", class: "rounded-control" } });
        const own = classes("9");
        expect(own).toContain("rounded-control");
        expect(own.some((name) => name.startsWith("rounded-["))).toBe(false);
    });

    it("renders nothing without a label, and passes other attributes on", () => {
        render(Badge, { props: { text: "" } });
        expect(document.querySelector("span")).toBeNull();
        cleanup();
        render(Badge, { props: { text: "Ny", "data-testid": "new", id: "new" } });
        expect(screen.getByTestId("new").id).toBe("new");
    });

    it("a subtle badge has no visible edge by default, but keeps its border box", () => {
        render(Badge, { props: { text: "Bokat", variant: "info" } });
        const own = classes("Bokat");
        expect(own).toContain("border");
        expect(own).toContain("border-transparent");
        expect(own).not.toContain("border-info-border");
    });

    it.each(["success", "warning", "error", "info", "energetic", "accent", "brand", "default"] as const)(
        "bordered puts the %s family edge back, and a solid badge never has one",
        (variant) => {
            const edge = variant === "brand" ? "border-action-primary-border" : `border-${variant === "default" ? "neutral" : variant}-border`;
            render(Badge, { props: { text: "S", variant, bordered: true } });
            render(Badge, { props: { text: "F", variant, emphasis: "solid", bordered: true } });
            expect(classes("S")).toContain(edge);
            expect(classes("S")).not.toContain("border-transparent");
            expect(classes("F")).toContain("border-transparent");
            expect(classes("F")).not.toContain(edge);
        },
    );

    it('variant="brand": the brand tint with the link text, or the primary fill with its label', () => {
        render(Badge, { props: { text: "Medlem", variant: "brand", showIcon: true } });
        render(Badge, { props: { text: "Solid", variant: "brand", emphasis: "solid" } });
        expect(classes("Medlem")).toEqual(expect.arrayContaining(["bg-action-primary-subtle", "text-(color:--color-link)"]));
        expect(classes("Solid")).toEqual(expect.arrayContaining(["bg-action-primary", "text-action-primary"]));
        expect(screen.getByText("Medlem").querySelector("svg")).not.toBeNull();
    });
});

describe("Badge, neutral subtle: its own properties (Z-081)", () => {
    const css = readFileSync("src/app.css", "utf8");

    it.each(["neutral", "default"] as const)("%s subtle reads the badge classes, not the shared neutral ones", (variant) => {
        render(Badge, { props: { text: "Bokat", variant } });
        const own = classes("Bokat");
        expect(own).toEqual(expect.arrayContaining(["bg-badge-neutral", "text-badge-neutral"]));
        expect(own).not.toContain("bg-neutral-subtle");
        expect(own).not.toContain("text-neutral-text");
    });

    it("the classes put the badge properties in front of the neutral tokens", () => {
        expect(css).toMatch(/\.bg-badge-neutral \{\s*background-color: var\(--zabi-badge-neutral-fill, var\(--color-neutral-subtle\)\);/);
        expect(css).toMatch(/\.text-badge-neutral \{\s*color: var\(--zabi-badge-neutral-text, var\(--color-neutral-text\)\);/);
        // Declared nowhere, so any ancestor can set them.
        expect(css).not.toMatch(/--zabi-badge-neutral-(fill|text)\s*:/);
    });

    it("both rules live in @layer utilities, so a colour block's restore and a call-site utility behave as before", () => {
        const layer = css.match(/@layer utilities \{\s*\.bg-badge-neutral[\s\S]*?\n\}/)?.[0] ?? "";
        expect(layer).toContain(".text-badge-neutral");
    });

    it("the fill class is in both colour-block lists beside bg-neutral-subtle", () => {
        expect(css.match(/\.bg-neutral-subtle, \.bg-badge-neutral,/g)).toHaveLength(2);
    });

    it("every other variant and emphasis is as it was", () => {
        render(Badge, { props: { text: "A", variant: "success" } });
        render(Badge, { props: { text: "B", variant: "neutral", emphasis: "solid" } });
        expect(classes("A")).toEqual(expect.arrayContaining(["bg-success-subtle", "text-success-text"]));
        expect(classes("B")).toEqual(expect.arrayContaining(["bg-neutral", "text-card"]));
        expect(classes("B")).not.toContain("bg-badge-neutral");
    });

    it("a call-site fill replaces the badge's", () => {
        render(Badge, { props: { text: "C", class: "bg-card" } });
        expect(classes("C")).toContain("bg-card");
        expect(classes("C")).not.toContain("bg-badge-neutral");
    });
});
