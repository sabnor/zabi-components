import { cleanup, render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it } from "vitest";

import Button from "../src/components/atoms/Button.svelte";

afterEach(cleanup);

const background = createRawSnippet(() => ({
    render: () => `<svg data-testid="texture" width="10" height="10"></svg>`,
}));
const layerOf = () => screen.queryByTestId("texture")?.parentElement ?? null;

describe("Button background", () => {
    it("changes nothing without it", () => {
        render(Button, { text: "Go" });
        const classes = screen.getByRole("button", { name: "Go" }).className;
        expect(classes).not.toMatch(/\bisolate\b|overflow-hidden/);
        expect(classes.split(/\s+/)).toContain("bg-action-primary");
        expect(screen.getByRole("button").querySelector("[aria-hidden]")).toBeNull();
    });

    it("with it, draws a hidden layer behind the label and keeps the name", () => {
        render(Button, { text: "Go", background });
        const button = screen.getByRole("button", { name: "Go" });
        expect(button.className.split(/\s+/)).toEqual(
            expect.arrayContaining(["relative", "isolate", "overflow-hidden", "bg-control-gradient", "bg-action-primary"]),
        );
        const layer = layerOf()!;
        expect(layer.getAttribute("aria-hidden")).toBe("true");
        expect(layer.className.split(/\s+/)).toEqual(expect.arrayContaining(["absolute", "inset-0", "-z-10", "pointer-events-none"]));
        expect(layer.parentElement).toBe(button);
        expect(button.firstElementChild).toBe(layer);
    });

    it("works on a link", () => {
        render(Button, { text: "Go", href: "/x", background });
        const link = screen.getByRole("link", { name: "Go" });
        expect(link.className.split(/\s+/)).toContain("isolate");
        expect(layerOf()!.parentElement).toBe(link);
    });

    it("is not drawn while disabled or loading", () => {
        render(Button, { text: "Go", background, disabled: true });
        expect(layerOf()).toBeNull();
        expect(screen.getByRole("button").className).not.toContain("isolate");
        cleanup();
        render(Button, { text: "Go", background, loading: true });
        expect(layerOf()).toBeNull();
        cleanup();
        render(Button, { text: "Go", href: "/x", background, loading: true });
        expect(layerOf()).toBeNull();
    });

    it("takes classes on the layer box, its direct child", () => {
        render(Button, { text: "Go", background, backgroundClass: "mix-blend-overlay" });
        const layer = layerOf()!;
        expect(layer.className.split(/\s+/)).toEqual(expect.arrayContaining(["mix-blend-overlay", "absolute", "-z-10"]));
        expect(layer.parentElement).toBe(screen.getByRole("button"));
    });

    it("stays while loading with backgroundWhileLoading, never while disabled", () => {
        render(Button, { text: "Go", background, loading: true, backgroundWhileLoading: true });
        expect(layerOf()).not.toBeNull();
        expect(screen.getByRole("button").className).toContain("isolate");
        cleanup();
        render(Button, { text: "Go", background, disabled: true, backgroundWhileLoading: true });
        expect(layerOf()).toBeNull();
    });

    it("is ignored on the inline link", () => {
        render(Button, { text: "Go", href: "/x", variant: "link", background });
        expect(layerOf()).toBeNull();
    });
});
