import { createRawSnippet } from "svelte";
import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import PickerField from "../src/components/atoms/PickerField.svelte";
import Select from "../src/components/atoms/Select.svelte";
import PickerFieldHarness from "./fixtures/PickerFieldHarness.svelte";

afterEach(cleanup);

const snippet = (html: string) => createRawSnippet(() => ({ render: () => html }));
const classes = (element: Element) => element.className.split(/\s+/);

describe("PickerField as a button", () => {
    it("is one button named by its label and its value, with aria-haspopup dialog", () => {
        render(PickerField, { props: { label: "Pub", value: "The Bishops Arms" } });
        const button = screen.getByRole("button", { name: "Pub The Bishops Arms" });
        expect(button.tagName).toBe("BUTTON");
        expect(button.getAttribute("type")).toBe("button");
        expect(button.getAttribute("aria-haspopup")).toBe("dialog");
        expect(button.hasAttribute("aria-expanded")).toBe(false);
        expect(button.hasAttribute("aria-controls")).toBe(false);
    });

    it("is named by the label and the placeholder while it has no value", () => {
        render(PickerField, { props: { label: "Pub", placeholder: "Choose a pub" } });
        const button = screen.getByRole("button", { name: "Pub Choose a pub" });
        expect(classes(button.querySelector("span[id$='-value']")!)).toContain("text-input-placeholder");
    });

    it("shows the value in the body colour, truncated on one line", () => {
        render(PickerField, { props: { label: "Pub", value: "Bishops", placeholder: "Choose" } });
        const text = screen.getByText("Bishops");
        expect(classes(text)).not.toContain("text-input-placeholder");
        expect(classes(text)).toEqual(expect.arrayContaining(["min-w-0", "truncate"]));
    });

    it("takes haspopup, expanded and controls", () => {
        render(PickerField, { props: { label: "Pub", haspopup: "listbox", expanded: true, controls: "sheet-1" } });
        const button = screen.getByRole("button");
        expect(button.getAttribute("aria-haspopup")).toBe("listbox");
        expect(button.getAttribute("aria-expanded")).toBe("true");
        expect(button.getAttribute("aria-controls")).toBe("sheet-1");
        cleanup();
        render(PickerField, { props: { label: "Pub", expanded: false } });
        expect(screen.getByRole("button").getAttribute("aria-expanded")).toBe("false");
    });

    it("describes the field by its hint and its error, and has no aria-invalid", () => {
        render(PickerField, { props: { label: "Pub", hint: "Where you drank", error: "Choose a pub", "aria-describedby": "extra" } });
        const button = screen.getByRole("button");
        const ids = button.getAttribute("aria-describedby")!.split(" ");
        expect(ids[0]).toBe("extra");
        expect(document.getElementById(ids[1])!.textContent).toBe("Where you drank");
        expect(document.getElementById(ids[2])!.textContent).toContain("Choose a pub");
        expect(document.getElementById(ids[2])!.getAttribute("role")).toBe("alert");
        expect(button.hasAttribute("aria-invalid")).toBe(false);
        expect(classes(button)).toContain("border-error");
    });

    it("has no describedby without hint or message", () => {
        render(PickerField, { props: { label: "Pub" } });
        expect(screen.getByRole("button").hasAttribute("aria-describedby")).toBe(false);
    });

    it("renders a hidden input only with a name, holding formValue", () => {
        const { container } = render(PickerField, { props: { label: "Pub", value: "Bishops" } });
        expect(container.querySelector("input")).toBeNull();
        cleanup();
        const second = render(PickerField, { props: { label: "Pub", value: "Bishops", name: "pub", formValue: "42" } });
        const hidden = second.container.querySelector("input")!;
        expect(hidden.type).toBe("hidden");
        expect(hidden.name).toBe("pub");
        expect(hidden.value).toBe("42");
    });

    it("renders leading content and replaces the value text with children", () => {
        render(PickerField, {
            props: { label: "Pub", value: "Bishops", leading: snippet("<i data-testid='icon'></i>"), children: snippet("<b>Rich</b>") },
        });
        expect(screen.getByTestId("icon")).toBeTruthy();
        expect(screen.getByText("Rich")).toBeTruthy();
        expect(screen.queryByText("Bishops")).toBeNull();
    });

    it("calls onclick, and does not when disabled", async () => {
        const onclick = vi.fn();
        render(PickerField, { props: { label: "Pub", onclick } });
        await userEvent.click(screen.getByRole("button"));
        expect(onclick).toHaveBeenCalledTimes(1);
        cleanup();
        const again = vi.fn();
        render(PickerField, { props: { label: "Pub", onclick: again, disabled: true } });
        const button = screen.getByRole("button") as HTMLButtonElement;
        expect(button.disabled).toBe(true);
        await userEvent.click(button);
        expect(again).not.toHaveBeenCalled();
    });

    it("is operated with the keyboard", async () => {
        const onclick = vi.fn();
        render(PickerField, { props: { label: "Pub", onclick } });
        await userEvent.tab();
        expect(document.activeElement).toBe(screen.getByRole("button"));
        await userEvent.keyboard("{Enter}");
        await userEvent.keyboard(" ");
        expect(onclick).toHaveBeenCalledTimes(2);
    });

    it("exposes its element, so the app can return focus to it", async () => {
        render(PickerFieldHarness, { props: { scenario: "bound" } });
        await userEvent.click(screen.getByRole("button", { name: "Return focus" }));
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Pub Bishops" }));
    });

    it("is 44px on a coarse pointer and has a focus ring, as Select's trigger", () => {
        render(PickerField, { props: { label: "Pub", size: "md" } });
        const button = screen.getByRole("button");
        expect(classes(button)).toEqual(expect.arrayContaining(["focus-ring", "pointer-coarse:min-h-11", "min-h-10", "bg-input", "active:bg-input-active", "rounded-control"]));
    });
});

describe("PickerField as a link", () => {
    it("is an <a href> with its role native and no popup attributes", () => {
        render(PickerField, { props: { label: "Pub", placeholder: "Choose", href: "/pubs/choose", expanded: true, controls: "x" } });
        const link = screen.getByRole("link", { name: "Pub Choose" });
        expect(link.tagName).toBe("A");
        expect(link.getAttribute("href")).toBe("/pubs/choose");
        expect(link.hasAttribute("role")).toBe(false);
        expect(link.hasAttribute("aria-haspopup")).toBe(false);
        expect(link.hasAttribute("aria-expanded")).toBe(false);
    });

    it("lets onclick prevent the navigation", async () => {
        const onclick = vi.fn((event: MouseEvent) => event.preventDefault());
        render(PickerField, { props: { label: "Pub", href: "/pubs/choose", onclick } });
        const link = screen.getByRole("link");
        expect(await fireEvent.click(link)).toBe(false);
        expect(onclick).toHaveBeenCalled();
    });

    it("a disabled link has no href, is aria-disabled and swallows the press", async () => {
        const onclick = vi.fn();
        render(PickerField, { props: { label: "Pub", href: "/pubs/choose", disabled: true, onclick } });
        const link = screen.getByRole("link");
        expect(link.hasAttribute("href")).toBe(false);
        expect(link.getAttribute("aria-disabled")).toBe("true");
        await userEvent.click(link);
        expect(onclick).not.toHaveBeenCalled();
    });
});

describe("Select's trigger is unchanged by the shared field classes", () => {
    it("keeps the surface, size and edge classes it always had", () => {
        render(Select, { props: { label: "Team", options: [{ value: "a", label: "Alpha" }], value: "a" } });
        const trigger = screen.getByRole("combobox", { name: /Team/ });
        expect(classes(trigger)).toEqual(
            expect.arrayContaining([
                "focus-ring", "w-full", "min-w-0", "cursor-pointer", "rounded-control", "border", "bg-input", "text-body",
                "hover:bg-input-hover", "active:bg-input-active", "focus-visible:bg-input-focus", "disabled:bg-input-disabled",
                "disabled:text-action-disabled-text", "flex", "items-center", "justify-between", "gap-2",
                "min-h-10", "px-3", "py-2", "max-sm:py-1", "pointer-coarse:min-h-11", "text-sm", "max-sm:text-base",
                "border-input-border", "enabled:hover:border-input-border-hover",
            ]),
        );
    });
});
