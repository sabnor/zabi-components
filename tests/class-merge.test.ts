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

    it("keeps utilities that do not conflict", () => {
        expect(cn("flex items-center", "gap-2")).toBe("flex items-center gap-2");
    });

    it("drops falsy entries", () => {
        expect(cn("px-2", false, null, undefined, "")).toBe("px-2");
    });
});

describe("call-site class overrides", () => {
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
