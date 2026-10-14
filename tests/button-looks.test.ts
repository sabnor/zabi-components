import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Button from "../src/components/atoms/Button.svelte";
import FloatingActionButton from "../src/components/atoms/FloatingActionButton.svelte";
import IconButton from "../src/components/atoms/IconButton.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";

afterEach(cleanup);

const classesOf = (element: Element) => element.className.split(/\s+/);
const button = (name = "Go") => screen.getByRole("button", { name });

describe("Button looks (9.0)", () => {
    it("primary and danger wear the control veil, accent its own", () => {
        render(Button, { text: "Go" });
        expect(classesOf(button())).toContain("bg-control-gradient");
        cleanup();
        render(Button, { text: "Go", variant: "danger" });
        expect(classesOf(button())).toContain("bg-control-gradient");
        cleanup();
        render(Button, { text: "Go", variant: "accent" });
        expect(classesOf(button())).toContain("bg-control-gradient-accent");
    });

    it("has no veil when disabled or loading, nor on the flat variants", () => {
        render(Button, { text: "Go", disabled: true });
        expect(classesOf(button())).not.toContain("bg-control-gradient");
        cleanup();
        render(Button, { text: "Go", loading: true });
        expect(classesOf(button())).not.toContain("bg-control-gradient");
        cleanup();
        for (const variant of ["tonal", "text", "outline", "secondary", "ghost"] as const) {
            render(Button, { text: "Go", variant });
            expect(classesOf(button())).not.toContain("bg-control-gradient");
            cleanup();
        }
    });

    it("tonal is the tonal fill and label, flat", () => {
        render(Button, { text: "Go", variant: "tonal" });
        const classes = classesOf(button());
        expect(classes).toContain("bg-action-tonal");
        expect(classes).toContain("text-action-tonal");
    });

    it("text is a boxed action in the link colour: no underline, strong label, 44px target", () => {
        render(Button, { text: "Go", variant: "text" });
        const classes = classesOf(button());
        expect(classes).toContain("text-link");
        expect(classes).toContain("font-button-strong");
        expect(classes).not.toContain("font-button");
        expect(classes).not.toContain("underline");
        expect(classes).toContain("min-h-10");
        expect(classes).toContain("pointer-coarse:min-h-11");
        expect(classes).toContain("px-2");
        expect(classes).toContain("hover:bg-surface-hover");
    });

    it("text with href is still a boxed action, not an inline link", () => {
        render(Button, { text: "Go", variant: "text", href: "#x" });
        const classes = classesOf(screen.getByRole("link", { name: "Go" }));
        expect(classes).not.toContain("underline");
        expect(classes).toContain("min-h-10");
    });

    it("link is still underlined, and inline as a real link", () => {
        render(Button, { text: "Go", variant: "link" });
        expect(classesOf(button())).toContain("underline");
        cleanup();
        render(Button, { text: "Go", variant: "link", href: "#x" });
        const classes = classesOf(screen.getByRole("link", { name: "Go" }));
        expect(classes).toContain("underline");
        expect(classes).toContain("font-button");
        expect(classes).toContain("rounded-button");
    });

    it("outline has the guarded edge", () => {
        render(Button, { text: "Go", variant: "outline" });
        const classes = classesOf(button());
        expect(classes).toContain("border-action-outline");
        expect(classes).toContain("hover:border-action-outline-hover");
        expect(classes).not.toContain("border-border");
    });

    it("xl is 56px", () => {
        render(Button, { text: "Go", size: "xl" });
        const classes = classesOf(button());
        expect(classes).toContain("min-h-14");
        expect(classes).toContain("text-base");
    });

    it("reads the button corner and weight roles", () => {
        render(Button, { text: "Go" });
        const classes = classesOf(button());
        expect(classes).toContain("rounded-button");
        expect(classes).toContain("font-button");
        expect(classes).not.toContain("rounded-control");
        expect(classes).not.toContain("font-medium");
    });
});

describe("IconButton looks (9.0)", () => {
    it("solid variants wear the veil, but not when disabled or toggled on", () => {
        render(IconButton, { label: "Go" });
        expect(classesOf(button()).includes("bg-control-gradient")).toBe(true);
        cleanup();
        render(IconButton, { label: "Go", disabled: true });
        expect(classesOf(button())).not.toContain("bg-control-gradient");
        cleanup();
        render(IconButton, { label: "Go", pressed: true });
        expect(classesOf(button())).not.toContain("bg-control-gradient");
    });

    it("outline has the guarded edge, tonal has the tonal pair", () => {
        render(IconButton, { label: "Go", variant: "outline" });
        expect(classesOf(button())).toContain("border-action-outline");
        cleanup();
        render(IconButton, { label: "Go", variant: "tonal" });
        expect(classesOf(button())).toContain("bg-action-tonal");
        expect(classesOf(button())).toContain("text-action-tonal");
    });
});

describe("FloatingActionButton looks (9.0)", () => {
    it("has the veil and keeps its shadow", () => {
        render(FloatingActionButton, { label: "Go" });
        const classes = classesOf(button());
        expect(classes).toContain("bg-control-gradient");
        expect(classes).toContain("shadow-lg");
    });
});

describe("Toggle looks (9.0)", () => {
    it("off uses the toggle track and its edge; on uses the veil and no edge", () => {
        render(Toggle, { label: "Go" });
        let classes = classesOf(screen.getByRole("switch"));
        expect(classes).toContain("bg-toggle-track");
        expect(classes).toContain("ring-toggle-track");
        cleanup();
        render(Toggle, { label: "Go", checked: true });
        classes = classesOf(screen.getByRole("switch"));
        expect(classes).toContain("bg-control-gradient");
        expect(classes).toContain("bg-action-primary");
        expect(classes).not.toContain("ring-toggle-track");
    });

    it("disabled off has the resting colour and edge, no stateful class or veil", () => {
        render(Toggle, { label: "Go", disabled: true });
        const classes = classesOf(screen.getByRole("switch"));
        expect(classes).not.toContain("bg-toggle-track");
        expect(classes).toContain("bg-(--color-toggle-track)");
        expect(classes).toContain("ring-toggle-track");
        cleanup();
        render(Toggle, { label: "Go", disabled: true, checked: true });
        expect(classesOf(screen.getByRole("switch"))).not.toContain("bg-control-gradient");
    });
});
