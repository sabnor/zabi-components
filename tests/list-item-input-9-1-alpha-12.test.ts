import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Input from "../src/components/atoms/Input.svelte";
import ListItem from "../src/components/atoms/ListItem.svelte";

afterEach(cleanup);

const art = { id: "a", label: "Track", avatar: "/a.jpg", avatarAlt: "" };

describe("ListItem leadingShape", () => {
    it("is a circle by default", () => {
        const { container } = render(ListItem, { props: { item: art } });
        expect(container.querySelector("img")!.parentElement!.className).toContain("rounded-full");
    });
    it("square is not rounded and not cropped", () => {
        const { container } = render(ListItem, { props: { item: art, leadingShape: "square" } });
        const img = container.querySelector("img")!;
        expect(img.parentElement!.className).toContain("rounded-none");
        expect(img.parentElement!.className).not.toContain("rounded-full");
        expect(img.className).toContain("object-contain");
    });
    it("rounded uses the control radius", () => {
        const { container } = render(ListItem, { props: { item: art, leadingShape: "rounded" } });
        expect(container.querySelector("img")!.parentElement!.className).toContain("rounded-control");
    });
});

describe("ListItem pressed", () => {
    it("sets aria-pressed with a non-colour mark", async () => {
        const { container } = render(ListItem, { props: { item: art, onclick: () => {}, pressed: true } });
        const b = screen.getByRole("button", { name: "Track" });
        expect(b.getAttribute("aria-pressed")).toBe("true");
        expect(container.querySelector("[data-pressed-mark]")).not.toBeNull();
    });
    it("has no aria-pressed when not given, and none on a link", () => {
        render(ListItem, { props: { item: art, onclick: () => {} } });
        expect(screen.getByRole("button").hasAttribute("aria-pressed")).toBe(false);
        cleanup();
        render(ListItem, { props: { item: { ...art, href: "/x" }, pressed: true } });
        expect(screen.getByRole("link").hasAttribute("aria-pressed")).toBe(false);
    });
});

describe("ListItem descriptionLive", () => {
    it("makes the description a polite live region", () => {
        render(ListItem, { props: { item: { ...art, description: "Playing" }, descriptionLive: true } });
        expect(screen.getByText("Playing").getAttribute("aria-live")).toBe("polite");
    });
    it("is not live by default", () => {
        render(ListItem, { props: { item: { ...art, description: "Playing" } } });
        expect(screen.getByText("Playing").hasAttribute("aria-live")).toBe(false);
    });
});

describe("Input", () => {
    it("drops the colour transition under reduced motion", () => {
        render(Input, { props: { "aria-label": "x" } });
        expect(screen.getByRole("textbox").className).toContain("motion-reduce:transition-none");
    });
    it("reveal button has a 44px hit area at every size", async () => {
        for (const size of ["sm", "md", "lg"] as const) {
            const { container } = render(Input, { props: { type: "password", size, "aria-label": "pw" } });
            const btn = container.querySelector("[data-input-reveal]")!;
            expect(btn.className).toContain("before:min-h-11");
            expect(btn.className).toContain("before:min-w-11");
            cleanup();
        }
    });
});
