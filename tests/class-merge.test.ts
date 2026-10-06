import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import { cn } from "../src/components/util/cn.js";
import Card from "../src/components/atoms/Card.svelte";
import Badge from "../src/components/atoms/Badge.svelte";

afterEach(cleanup);

describe("cn", () => {
    it("lets the last conflicting utility win", () => {
        expect(cn("px-2", "px-4")).toBe("px-4");
        expect(cn("bg-card", "bg-surface-overlay")).toBe("bg-surface-overlay");
        expect(cn("shadow-sm", "shadow-lg")).toBe("shadow-lg");
    });

    it("resolves the role-based radii, which tailwind-merge cannot know about", () => {
        // The bug this exists for: `control` and `container` are role names, not
        // scale values, so stock tailwind-merge keeps both and stylesheet order
        // decides. A sidebar search field asked for rounded-container and
        // rendered at 8px.
        expect(cn("rounded-control", "rounded-container")).toBe("rounded-container");
        expect(cn("rounded-container", "rounded-control")).toBe("rounded-control");
        expect(cn("rounded-pill", "rounded-overlay")).toBe("rounded-overlay");
    });

    it("resolves per-corner radii too, not just the base group", () => {
        expect(cn("rounded-t-overlay", "rounded-t-control")).toBe("rounded-t-control");
        expect(cn("rounded-bl-pill", "rounded-bl-control")).toBe("rounded-bl-control");
    });

    it("knows the button corner, the label weights and the control veils", () => {
        expect(cn("rounded-button", "rounded-full")).toBe("rounded-full");
        expect(cn("rounded-button", "rounded-container")).toBe("rounded-container");
        expect(cn("font-button", "font-bold")).toBe("font-bold");
        expect(cn("font-medium", "font-button-strong")).toBe("font-button-strong");
        // A veil is an image: it neither removes the fill beside it nor is removed by it.
        expect(cn("bg-control-gradient", "bg-action-primary")).toBe("bg-control-gradient bg-action-primary");
        expect(cn("bg-action-primary", "bg-control-gradient")).toBe("bg-action-primary bg-control-gradient");
        expect(cn("bg-control-gradient", "bg-none")).toBe("bg-none");
    });

    it("resolves the named spacing steps, for padding, margin and gap", () => {
        // Z-064: `p-xs p-sm` kept both, and the stylesheet order picked 4px.
        expect(cn("p-xs", "p-sm")).toBe("p-sm");
        expect(cn("p-sm", "p-xs")).toBe("p-xs");
        expect(cn("p-6", "p-sm")).toBe("p-sm");
        expect(cn("p-2xl", "p-4")).toBe("p-4");
        expect(cn("px-md", "px-lg")).toBe("px-lg");
        expect(cn("p-md", "px-lg")).toBe("p-md px-lg");
        expect(cn("px-lg", "p-md")).toBe("p-md");
        expect(cn("m-xs", "m-xl")).toBe("m-xl");
        expect(cn("-mt-sm", "mt-md")).toBe("mt-md");
        expect(cn("gap-sm", "gap-lg")).toBe("gap-lg");
        expect(cn("gap-x-xs", "gap-x-2")).toBe("gap-x-2");
        expect(cn("space-y-sm", "space-y-md")).toBe("space-y-md");
        // A named step in another group is untouched: font size, container width, radius, shadow.
        expect(cn("p-sm", "text-sm", "max-w-sm", "rounded-sm", "shadow-sm")).toBe("p-sm text-sm max-w-sm rounded-sm shadow-sm");
        expect(cn("text-xs", "text-headline")).toBe("text-xs text-headline");
        expect(cn("text-sm", "text-lg")).toBe("text-lg");
    });

    it("keeps utilities that do not conflict", () => {
        expect(cn("flex items-center", "gap-2")).toBe("flex items-center gap-2");
    });

    it("drops falsy entries", () => {
        expect(cn("px-2", false, null, undefined, "")).toBe("px-2");
    });
});

describe("call-site class overrides", () => {
    it("Card: the default variant is a bordered card without a shadow, like outlined", () => {
        const classes = (variant?: "outlined" | "elevated") => {
            const { container } = render(Card, { props: { ariaLabel: "card", variant } });
            return (container.firstElementChild as HTMLElement).className;
        };
        expect(classes()).toContain("border-border");
        expect(classes()).toContain("shadow-none");
        expect(classes()).not.toContain("shadow-sm");
        expect(classes("outlined")).toContain("border-border");
        expect(classes("elevated")).toContain("shadow-lg");
    });

    it("Card: a call-site radius replaces the component's own", () => {
        const { container } = render(Card, {
            props: { ariaLabel: "card", class: "rounded-pill" },
        });
        const card = container.querySelector('[aria-label="card"]') ?? container.firstElementChild;
        expect(card?.className).toContain("rounded-pill");
        expect(card?.className).not.toContain("rounded-container");
    });

    it("Badge: a call-site radius replaces the pill default", () => {
        render(Badge, { props: { text: "9", class: "rounded-control" } });
        const badge = screen.getByText("9");
        expect(badge.className).toContain("rounded-control");
        expect(badge.className).not.toContain("rounded-pill");
    });
});
