import { createRawSnippet } from "svelte";
import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Chip from "../src/components/atoms/Chip.svelte";
import ChipHarness from "./fixtures/ChipHarness.svelte";

afterEach(cleanup);

const label = (text: string) => createRawSnippet(() => ({ render: () => `<span>${text}</span>` }));
const classes = (element: Element) => element.className.split(/\s+/);
const state = () => JSON.parse(screen.getByTestId("state").textContent!);

describe("Chip as a link", () => {
    it("is an <a href>, with aria-current only while selected", () => {
        render(Chip, { props: { href: "/pubs?f=open", selected: true, children: label("Open") } });
        const link = screen.getByRole("link", { name: "Open" });
        expect(link.tagName).toBe("A");
        expect(link.getAttribute("href")).toBe("/pubs?f=open");
        expect(link.getAttribute("aria-current")).toBe("true");
        cleanup();
        render(Chip, { props: { href: "/pubs", children: label("All") } });
        expect(screen.getByRole("link", { name: "All" }).hasAttribute("aria-current")).toBe(false);
    });

    it("says what kind of current it is", () => {
        render(Chip, { props: { href: "/a", selected: true, current: "page", children: label("A") } });
        expect(screen.getByRole("link").getAttribute("aria-current")).toBe("page");
    });

    it("when disabled has no href, says so, and does nothing when pressed", async () => {
        const onclick = vi.fn();
        render(Chip, { props: { href: "/a", disabled: true, onclick, children: label("A") } });
        const link = screen.getByRole("link", { name: "A" });
        expect(link.hasAttribute("href")).toBe(false);
        expect(link.getAttribute("aria-disabled")).toBe("true");
        await userEvent.click(link);
        expect(onclick).not.toHaveBeenCalled();
    });

    it("has no check mark by default, and shows one on request", () => {
        render(Chip, { props: { href: "/a", selected: true, children: label("A") } });
        expect(screen.getByRole("link").querySelector("svg")).toBeNull();
        cleanup();
        render(Chip, { props: { href: "/a", selected: true, checkmark: true, children: label("A") } });
        expect(screen.getByRole("link").querySelector("svg")).not.toBeNull();
    });
});

describe("Chip as a toggle button", () => {
    it("is a type=button with aria-pressed, and a press flips it and reports", async () => {
        const onchange = vi.fn();
        render(Chip, { props: { onchange, children: label("Open now") } });
        const button = screen.getByRole("button", { name: "Open now" });
        expect(button.getAttribute("type")).toBe("button");
        expect(button.getAttribute("aria-pressed")).toBe("false");
        await userEvent.click(button);
        expect(button.getAttribute("aria-pressed")).toBe("true");
        expect(onchange).toHaveBeenLastCalledWith(true);
        // Checkbox-like: pressing again turns it off.
        await userEvent.click(button);
        expect(button.getAttribute("aria-pressed")).toBe("false");
        expect(onchange).toHaveBeenLastCalledWith(false);
    });

    it("follows a bound value, both ways", async () => {
        render(ChipHarness);
        await userEvent.click(screen.getByRole("button", { name: "Open now" }));
        expect(state().pressed).toBe(true);
        await userEvent.click(screen.getByRole("button", { name: "Clear all" }));
        expect(screen.getByRole("button", { name: "Open now" }).getAttribute("aria-pressed")).toBe("false");
    });

    it("is operated with Tab, then Space or Enter", async () => {
        const onchange = vi.fn();
        render(Chip, { props: { onchange, children: label("Open now") } });
        await userEvent.tab();
        expect(document.activeElement).toBe(screen.getByRole("button"));
        await userEvent.keyboard(" ");
        await userEvent.keyboard("{Enter}");
        expect(onchange.mock.calls).toEqual([[true], [false]]);
    });

    it("shows the check mark only while selected, and a disabled one does nothing", async () => {
        const onchange = vi.fn();
        render(Chip, { props: { selected: true, disabled: true, onchange, children: label("A") } });
        const button = screen.getByRole("button", { name: "A" }) as HTMLButtonElement;
        expect(button.querySelector("svg")!.getAttribute("class")).not.toContain("hidden");
        expect(button.disabled).toBe(true);
        await userEvent.click(button);
        expect(onchange).not.toHaveBeenCalled();
    });
});

describe("Chip as a checkbox", () => {
    it("is a real checkbox in a label, named by its text, with name, value, required and form", () => {
        render(Chip, { props: { type: "checkbox", name: "extra", value: "cheese", required: true, form: "f", children: label("Cheese") } });
        const box = screen.getByRole("checkbox", { name: "Cheese" }) as HTMLInputElement;
        expect(box.name).toBe("extra");
        expect(box.value).toBe("cheese");
        expect(box.required).toBe(true);
        expect(box.getAttribute("form")).toBe("f");
        expect(box.closest("label")).not.toBeNull();
    });

    it("toggles on and off, reports each, and is reached with Tab and ticked with Space", async () => {
        const onchange = vi.fn();
        render(Chip, { props: { type: "checkbox", value: "a", onchange, children: label("A") } });
        await userEvent.tab();
        const box = screen.getByRole("checkbox") as HTMLInputElement;
        expect(document.activeElement).toBe(box);
        await userEvent.keyboard(" ");
        expect(box.checked).toBe(true);
        await userEvent.click(box);
        expect(box.checked).toBe(false);
        expect(onchange.mock.calls).toEqual([[true], [false]]);
    });

    it("submits in a form without the component's help", () => {
        render(ChipHarness, { props: { agreed: true } });
        const data = new FormData(screen.getByTestId("form") as HTMLFormElement);
        expect(data.get("terms")).toBe("yes");
    });

    it("a disabled one cannot be ticked", async () => {
        render(Chip, { props: { type: "checkbox", disabled: true, children: label("A") } });
        const box = screen.getByRole("checkbox") as HTMLInputElement;
        expect(box.disabled).toBe(true);
        await userEvent.click(box);
        expect(box.checked).toBe(false);
    });
});

describe("Chip as a radio", () => {
    it("is a real radio, and a repeat press on the chosen one changes nothing", async () => {
        const onchange = vi.fn();
        render(Chip, { props: { type: "radio", name: "size", value: "s", onchange, children: label("Small") } });
        const radio = screen.getByRole("radio", { name: "Small" }) as HTMLInputElement;
        await userEvent.click(radio);
        expect(radio.checked).toBe(true);
        await userEvent.click(radio);
        expect(radio.checked).toBe(true);
        expect(onchange).toHaveBeenCalledTimes(1);
    });

    it("has no check mark by default", () => {
        render(Chip, { props: { type: "radio", name: "size", value: "s", selected: true, children: label("Small") } });
        expect(screen.getByRole("radio").closest("label")!.querySelector("svg")).toBeNull();
    });
});

describe("Chip's look", () => {
    it("the selected look of a button is the tonal chip tokens and a semibold label, and nothing solid", () => {
        render(Chip, { props: { selected: true, children: label("A") } });
        const own = classes(screen.getByRole("button"));
        expect(own).toEqual(expect.arrayContaining(["bg-chip-selected", "text-chip-selected-text", "font-semibold", "hover:bg-chip-selected-hover", "active:bg-chip-selected-active"]));
        expect(own).not.toContain("bg-chip");
        expect(own.some((name) => name.startsWith("ring") || name.startsWith("border") || name.startsWith("dark:"))).toBe(false);
        expect(own.some((name) => name.includes("forced-colors:outline"))).toBe(true);
    });

    it("at rest it is the quiet chip fill with a medium label", () => {
        render(Chip, { props: { children: label("A") } });
        expect(classes(screen.getByRole("button"))).toEqual(expect.arrayContaining(["bg-chip", "text-chip-text", "font-medium", "hover:bg-chip-hover"]));
    });

    it("the input forms take their look from the native :checked, not from state", () => {
        render(Chip, { props: { type: "checkbox", children: label("A") } });
        const own = classes(screen.getByRole("checkbox").closest("label")!);
        expect(own).toEqual(expect.arrayContaining(["has-[:checked]:bg-chip-selected", "has-[:checked]:text-chip-selected-text", "not-has-[:checked]:bg-chip", "has-[:focus-visible]:outline-2"]));
        expect(own).not.toContain("bg-chip");
    });

    it.each([
        ["sm", "h-7", "px-[10px]"],
        ["md", "h-8", "px-3"],
        ["lg", "h-10", "px-4"],
    ] as const)("%s is %s tall with %s, and the label never wraps", (size, height, padding) => {
        render(Chip, { props: { size, children: label("A") } });
        const own = classes(screen.getByRole("button"));
        expect(own).toEqual(expect.arrayContaining([height, padding, "text-sm", "rounded-pill", "whitespace-nowrap", "shrink-0"]));
    });

    it("keeps its box and reaches 44px on a coarse pointer through a hit layer", () => {
        render(Chip, { props: { children: label("A") } });
        const own = classes(screen.getByRole("button"));
        expect(own).toContain("pointer-coarse:before:min-h-11");
        expect(own).not.toContain("pointer-coarse:min-h-11");
    });

    it("is half transparent and out of reach when disabled", () => {
        render(Chip, { props: { disabled: true, children: label("A") } });
        expect(classes(screen.getByRole("button"))).toEqual(expect.arrayContaining(["opacity-50", "pointer-events-none"]));
    });

    it("puts the leading content before the label, and class on the chip", () => {
        render(Chip, { props: { class: "max-w-24", leading: label("*"), children: label("Label") } });
        const button = screen.getByRole("button");
        expect(button.className).toContain("max-w-24");
        expect(button.textContent!.replace(/\s+/g, "")).toBe("*Label");
    });

    it("passes other attributes to the control: the input for an input form", () => {
        render(Chip, { props: { type: "checkbox", "data-x": "1", "aria-describedby": "d", children: label("A") } as never });
        expect(screen.getByRole("checkbox").getAttribute("data-x")).toBe("1");
        expect(screen.getByRole("checkbox").closest("label")!.hasAttribute("data-x")).toBe(false);
    });
});
