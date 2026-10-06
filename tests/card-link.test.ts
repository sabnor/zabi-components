import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Card from "../src/components/atoms/Card.svelte";
import ToneHarness from "./fixtures/ToneHarness.svelte";

afterEach(() => cleanup());

const classesOf = (element: Element) => (element.getAttribute("class") ?? "").split(/\s+/);

describe("Card with href", () => {
    it("is one <a href> holding its content, and nothing interactive is added", () => {
        render(ToneHarness, { scenario: "link" });
        const link = screen.getByRole("link", { name: /Puben/ });
        expect(link.tagName).toBe("A");
        expect(link.getAttribute("href")).toBe("/pubs/1");
        expect(link.querySelectorAll("a, button, input, [tabindex], [role=button]")).toHaveLength(0);
        expect(document.querySelectorAll("a")).toHaveLength(1);
        expect(link.textContent).toContain("Öppet till 23");
        expect(link.getAttribute("role")).toBeNull();
        expect(link.getAttribute("tabindex")).toBeNull();
    });

    it("is a block link with the body colour, the ring, the state classes and 44px", () => {
        render(ToneHarness, { scenario: "link" });
        const classes = classesOf(screen.getByTestId("card"));
        for (const name of ["block", "no-underline", "text-body", "focus-ring", "min-h-11", "rounded-container", "hover:bg-card-hover", "active:bg-card-active"]) {
            expect(classes).toContain(name);
        }
        expect(classes).toContain("cursor-pointer");
    });

    it("is reached by Tab and Enter follows it (the click runs)", async () => {
        const onclick = vi.fn((e: MouseEvent) => e.preventDefault());
        render(ToneHarness, { scenario: "link", onclick });
        const user = userEvent.setup();
        await user.tab();
        expect(document.activeElement).toBe(screen.getByRole("link"));
        await user.keyboard("{Enter}");
        expect(onclick).toHaveBeenCalledTimes(1);
    });

    it("keeps aria-label, target and rel", () => {
        render(ToneHarness, { scenario: "link-label" });
        const link = screen.getByRole("link", { name: "Öppna puben" });
        expect(link.getAttribute("target")).toBe("_blank");
        expect(link.getAttribute("rel")).toBe("noopener");
    });

    it("with href and onclick it is a link and onclick runs on activation", async () => {
        const onclick = vi.fn((e: MouseEvent) => e.preventDefault());
        render(Card, { href: "/x", onclick, ariaLabel: "x" });
        const link = screen.getByRole("link");
        await fireEvent.click(link);
        expect(onclick).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole("button")).toBeNull();
    });

    it("a tinted link card has the state layer and still the body colour", () => {
        render(ToneHarness, { scenario: "link", tone: "tint" });
        const classes = classesOf(screen.getByTestId("card"));
        expect(classes).toContain("text-body");
        expect(classes).toContain("relative");
        expect(classes).toContain("after:bg-current");
        expect(classes).toContain("hover:after:opacity-8");
        expect(classes).toContain("active:after:opacity-12");
        expect(classes).not.toContain("hover:bg-card-hover");
    });

    it("a brand link card leaves the text colour to its scope", () => {
        render(ToneHarness, { scenario: "link", tone: "brand" });
        const classes = classesOf(screen.getByTestId("card"));
        expect(classes).not.toContain("text-body");
        expect(classes).toEqual(expect.arrayContaining(["bg-action-primary", "on-brand", "focus-ring"]));
    });

    it("the neutral onclick card is unchanged: a button with hover and pressed fills", () => {
        render(Card, { onclick: () => {}, ariaLabel: "Kort" });
        const card = screen.getByRole("button", { name: "Kort" });
        expect(card.tagName).toBe("DIV");
        expect(card.getAttribute("tabindex")).toBe("0");
        expect(classesOf(card)).toEqual(expect.arrayContaining(["hover:bg-card-hover", "active:bg-card-active", "focus-ring"]));
        expect(classesOf(card)).not.toContain("min-h-11");
    });
});
