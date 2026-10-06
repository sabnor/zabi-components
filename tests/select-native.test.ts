import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Select from "../src/components/atoms/Select.svelte";

/**
 * Select's native `<select>`: the form control behind the trigger, and the
 * whole control with `presentation="native"`. What it is before the component
 * mounts is in tests/select-ssr.test.ts, and what a browser does with it
 * (geometry, a form sent without scripts, a choice made before hydration) in
 * playwright/select-form.spec.ts.
 */

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    document.body.style.overflow = "";
});

const options = [
    { value: "a", label: "Alpha" },
    { value: "b", label: "Beta", disabled: true },
    { value: 3, label: "Three" },
];

const nativeOf = (container: HTMLElement) => container.querySelector("select")!;
const triggerOf = (container: HTMLElement) =>
    container.querySelector<HTMLButtonElement>('button[aria-haspopup="listbox"]')!;

describe("Select: the native select behind the trigger", () => {
    it("is the form control, hidden from assistive technology, the keyboard and the pointer", () => {
        const { container } = render(Select, { label: "Team", name: "team", options, value: "a" });
        const native = nativeOf(container);
        expect(native.name).toBe("team");
        expect(native.value).toBe("a");
        expect(native.getAttribute("aria-hidden")).toBe("true");
        expect(native.tabIndex).toBe(-1);
        expect(native.className).toContain("pointer-events-none");
        expect(native.className).toContain("invisible");
        // The label and the id are the trigger's.
        expect(screen.getByLabelText("Team")).toBe(triggerOf(container));
        expect(native.id).not.toBe(triggerOf(container).id);
        expect(container.querySelector('input[type="hidden"]')).toBeNull();
    });

    it("has the options, a disabled one disabled, and an empty first option only while nothing is chosen", async () => {
        const { container, rerender } = render(Select, { label: "Team", options, placeholder: "Pick" });
        let native = nativeOf(container);
        expect([...native.options].map((option) => [option.value, option.text.trim(), option.disabled])).toEqual([
            ["", "Pick", false],
            ["a", "Alpha", false],
            ["b", "Beta", true],
            ["3", "Three", false],
        ]);
        expect(native.value).toBe("");
        await rerender({ label: "Team", options, value: 3 });
        native = nativeOf(container);
        expect([...native.options].map((option) => option.value)).toEqual(["a", "b", "3"]);
        expect(native.value).toBe("3");
    });

    it("follows a choice made in the list", async () => {
        const user = userEvent.setup();
        const { container } = render(Select, { label: "Team", name: "team", options, presentation: "popover" });
        await user.click(triggerOf(container));
        await user.click(await screen.findByRole("option", { name: "Three" }));
        await waitFor(() => expect(nativeOf(container).value).toBe("3"));
    });

    it("has no name without `name`, and is not disabled when the Select is: its value is still sent", () => {
        const { container } = render(Select, { label: "Team", options, value: "a", disabled: true });
        expect(nativeOf(container).hasAttribute("name")).toBe(false);
        expect(nativeOf(container).disabled).toBe(false);
        expect(triggerOf(container).disabled).toBe(true);
    });

    it("required: found invalid by the browser, the message goes under the field and focus to the trigger", async () => {
        const { container } = render(Select, { label: "Team", name: "team", options, required: true });
        const native = nativeOf(container);
        expect(native.required).toBe(true);
        Object.defineProperty(native, "validationMessage", { value: "Välj ett alternativ i listan." });
        const invalid = new Event("invalid", { cancelable: true });
        native.dispatchEvent(invalid);
        // The browser's own bubble, on a control nobody sees, is not shown.
        expect(invalid.defaultPrevented).toBe(true);
        const alert = await screen.findByRole("alert");
        expect(alert.textContent).toContain("Välj ett alternativ i listan.");
        expect(document.activeElement).toBe(triggerOf(container));
        expect(triggerOf(container).getAttribute("aria-describedby")).toContain(alert.id);

        // A choice answers it.
        const user = userEvent.setup();
        await user.click(triggerOf(container));
        await user.click(await screen.findByRole("option", { name: "Alpha" }));
        await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
    });

    it("required is not asked of a disabled Select", () => {
        const { container } = render(Select, { label: "Team", options, required: true, disabled: true });
        expect(nativeOf(container).required).toBe(false);
    });

    it("a change of the native select itself (a form restored by the browser) becomes the value, typed as the option's", async () => {
        const onchange = vi.fn();
        const { container } = render(Select, { label: "Team", options, value: "a", onchange });
        const native = nativeOf(container);
        native.value = "3";
        await fireEvent.change(native);
        await waitFor(() => expect(triggerOf(container).textContent).toContain("Three"));
        expect(onchange).toHaveBeenCalledTimes(1);
        expect((onchange.mock.calls[0][0] as { target: { value: unknown } }).target.value).toBe(3);
    });
});

describe('Select presentation="native"', () => {
    it("is the native select alone, with the field's id, label, messages and attributes", () => {
        const { container } = render(Select, {
            label: "Team",
            name: "team",
            options,
            value: "a",
            presentation: "native",
            hint: "One per person",
            error: "Taken",
            "data-testid": "team-field",
        });
        expect(triggerOf(container)).toBeNull();
        const native = screen.getByLabelText("Team") as HTMLSelectElement;
        expect(native.tagName).toBe("SELECT");
        expect(native.getAttribute("aria-hidden")).toBeNull();
        expect(native.hasAttribute("tabindex")).toBe(false);
        expect(native.getAttribute("data-testid")).toBe("team-field");
        expect(native.getAttribute("aria-invalid")).toBe("true");
        const described = native.getAttribute("aria-describedby")!.split(" ");
        expect(described).toHaveLength(2);
        for (const id of described) expect(document.getElementById(id)).not.toBeNull();
        expect(native.className).toContain("appearance-none");
        expect(native.className).toContain("h-10");
        expect(native.className).toContain("rounded-control");
    });

    it("a choice is bound and reported; disabled and required are the element's own", async () => {
        const onchange = vi.fn();
        const user = userEvent.setup();
        const { container, rerender } = render(Select, {
            label: "Team",
            options,
            presentation: "native",
            required: true,
            onchange,
        });
        const native = nativeOf(container);
        expect(native.required).toBe(true);
        await user.selectOptions(native, "3");
        expect(onchange).toHaveBeenCalledTimes(1);
        expect((onchange.mock.calls[0][0] as { target: { value: unknown } }).target.value).toBe(3);
        expect(screen.queryByRole("listbox")).toBeNull();
        expect(screen.queryByRole("dialog")).toBeNull();

        await rerender({ label: "Team", options, presentation: "native", disabled: true });
        expect(nativeOf(container).disabled).toBe(true);
    });
});

describe("Select strings", () => {
    it("strings replace the defaults, and the older single-text props win over them", async () => {
        const user = userEvent.setup();
        const { container } = render(Select, {
            label: "Lag",
            options,
            presentation: "popover",
            strings: { placeholder: "Välj", searchPlaceholder: "Sök", listLabel: "Alternativ", noResults: "Inget" },
            searchPlaceholder: "Sök lag",
        });
        expect(triggerOf(container).textContent).toContain("Välj");
        await user.click(triggerOf(container));
        expect(await screen.findByRole("listbox", { name: "Alternativ" })).toBeTruthy();
        const search = screen.getByRole("textbox", { name: "Sök lag" });
        await user.type(search, "zzz");
        expect(await screen.findByText("Inget")).toBeTruthy();
    });

    it("without either it says what it always said", async () => {
        const user = userEvent.setup();
        const { container } = render(Select, { label: "Team", options, presentation: "popover" });
        expect(triggerOf(container).textContent).toContain("Select an option");
        await user.click(triggerOf(container));
        expect(await screen.findByRole("listbox", { name: "Select options" })).toBeTruthy();
        expect(screen.getByRole("textbox", { name: "Search options" })).toBeTruthy();
    });
});

describe("Select width", () => {
    it("fills its container: the host of the list is a block, and the label wraps instead of being cut", () => {
        const { container } = render(Select, { label: "Team", options, value: "a" });
        const host = triggerOf(container).parentElement!;
        expect(host.className).toContain("w-full");
        expect(host.className).toContain("min-w-0");
        expect(host.className).not.toContain("inline-block");
        const label = triggerOf(container).querySelector("span")!;
        expect(label.className).not.toContain("truncate");
        expect(label.className).toContain("min-w-0");
        // A minimum height, so a second line makes it taller.
        expect(triggerOf(container).className).toContain("min-h-10");
        expect(triggerOf(container).className).not.toMatch(/(?:^|\s)h-10(?:\s|$)/);
    });
});
