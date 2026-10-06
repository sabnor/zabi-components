import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Select from "../src/components/atoms/Select.svelte";
import { TOAST_REGION_SELECTOR } from "../src/components/util/focus-utils";
import DropdownOptionsHarness from "./fixtures/DropdownOptionsHarness.svelte";

/**
 * What Select's trigger says about itself, and what a press on a toast does
 * to an open list.
 *
 * The trigger was a plain button. A button cannot be invalid or required to
 * assistive technology (`aria-invalid` and `aria-required` are not its), so a
 * Select with an error was announced exactly like one without. It is a
 * select-only combobox now: the same element and keys, with
 * `role="combobox"`.
 *
 * A toast is drawn over everything, and a press on it (to dismiss it, say)
 * was a press "outside" an open list: the list closed.
 */

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    document.body.style.overflow = "";
    document.querySelectorAll("[data-test-toast-region]").forEach((element) => element.remove());
});

const options = [
    { value: "a", label: "Alpha" },
    { value: "b", label: "Beta" },
];

const trigger = () => screen.getByRole("combobox", { name: /Team/ });

/** Stands in for the Toaster's region, with a toast's button in it. */
function toastButton(): HTMLElement {
    const attribute = /\[([a-z-]+)\]/.exec(TOAST_REGION_SELECTOR)![1];
    const region = document.createElement("div");
    region.setAttribute(attribute, "");
    region.setAttribute("data-test-toast-region", "");
    region.innerHTML = '<div data-toast-id="t1"><button type="button">Dismiss</button></div>';
    document.body.append(region);
    return region.querySelector("button")!;
}

describe("Select: the trigger is a select-only combobox", () => {
    it("has the combobox role on the button, with what ties it to its list", async () => {
        const user = userEvent.setup();
        render(Select, { label: "Team", options, presentation: "popover" });
        expect(trigger().tagName).toBe("BUTTON");
        expect(trigger().getAttribute("aria-haspopup")).toBe("listbox");
        expect(trigger().getAttribute("aria-expanded")).toBe("false");
        expect(trigger().getAttribute("aria-controls")).toBeTruthy();
        // No longer found as a button.
        expect(screen.queryByRole("button", { name: /Team/ })).toBeNull();

        await user.click(trigger());
        const list = await screen.findByRole("listbox");
        expect(trigger().getAttribute("aria-expanded")).toBe("true");
        expect(list.id).toBe(trigger().getAttribute("aria-controls"));
    });

    it("names the pop-over list by the label, or by Select options without one", async () => {
        const user = userEvent.setup();
        const { unmount } = render(Select, { label: "Team", options, presentation: "popover" });
        await user.click(trigger());
        expect((await screen.findByRole("listbox")).getAttribute("aria-label")).toBe("Team");
        unmount();
        cleanup();

        render(Select, { options, presentation: "popover", "aria-label": "Plain" });
        await user.click(screen.getByRole("combobox"));
        expect((await screen.findByRole("listbox")).getAttribute("aria-label")).toBe("Plain");
        cleanup();

        render(Select, { options, presentation: "popover" });
        await user.click(screen.getByRole("combobox"));
        expect((await screen.findByRole("listbox")).getAttribute("aria-label")).toBe("Select options");
    });

    it("says nothing about validity, requirement or work when there is none", () => {
        render(Select, { label: "Team", options });
        for (const name of ["aria-invalid", "aria-required", "aria-busy"]) {
            expect(trigger().hasAttribute(name), name).toBe(false);
        }
    });

    it("is invalid with an error, and described by it", () => {
        render(Select, { label: "Team", options, error: "Choose a team", hint: "One per person" });
        expect(trigger().getAttribute("aria-invalid")).toBe("true");
        const described = trigger().getAttribute("aria-describedby")!.split(" ");
        expect(described).toHaveLength(2);
        expect(document.getElementById(described[0])!.textContent).toContain("One per person");
        expect(document.getElementById(described[1])!.textContent).toContain("Choose a team");
        expect(screen.getByRole("alert").textContent).toContain("Choose a team");
    });

    it("is invalid in the error variant too, and not in the others", async () => {
        const { rerender } = render(Select, { label: "Team", options, variant: "error", message: "Wrong" });
        expect(trigger().getAttribute("aria-invalid")).toBe("true");
        await rerender({ label: "Team", options, variant: "warning", message: "Careful" });
        expect(trigger().hasAttribute("aria-invalid")).toBe(false);
    });

    it("is required when required, and becomes invalid when the browser finds it empty", async () => {
        const { container } = render(Select, { label: "Team", name: "team", options, required: true });
        expect(trigger().getAttribute("aria-required")).toBe("true");
        expect(trigger().hasAttribute("aria-invalid")).toBe(false);
        const native = container.querySelector("select")!;
        Object.defineProperty(native, "validationMessage", { value: "Välj ett alternativ i listan." });
        native.dispatchEvent(new Event("invalid", { cancelable: true }));
        await waitFor(() => expect(trigger().getAttribute("aria-invalid")).toBe("true"));
        expect(trigger().getAttribute("aria-describedby")).toContain(screen.getByRole("alert").id);
    });

    it("is busy while it is loading", () => {
        render(Select, { label: "Team", options, isLoading: true });
        expect(trigger().getAttribute("aria-busy")).toBe("true");
    });

    it("the keys are the ones it had: Enter opens, the arrows move, Escape closes and returns focus", async () => {
        const user = userEvent.setup();
        render(Select, { label: "Team", options, searchable: false, presentation: "popover" });
        trigger().focus();
        await user.keyboard("{Enter}");
        const items = await screen.findAllByRole("option");
        await waitFor(() => expect(document.activeElement).toBe(items[0]));
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(items[1]);
        await user.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
        await waitFor(() => expect(document.activeElement).toBe(trigger()));
    });

    it('presentation="native" is untouched: a native select with its own aria-invalid and required', () => {
        const { container } = render(Select, {
            label: "Team",
            options,
            presentation: "native",
            required: true,
            error: "Choose a team",
        });
        const native = container.querySelector("select")!;
        expect(screen.getByLabelText("Team")).toBe(native);
        expect(native.hasAttribute("role")).toBe(false);
        expect(native.required).toBe(true);
        expect(native.getAttribute("aria-invalid")).toBe("true");
        expect(container.querySelector('[role="combobox"]')).toBeNull();
    });

    it("under prefers-reduced-motion the chevron has no transition", () => {
        render(Select, { label: "Team", options });
        expect(trigger().querySelector("svg")!.getAttribute("class")).toContain("motion-reduce:transition-none");
    });
});

describe("a press on a toast is not a press outside", () => {
    it("leaves an open Select pop-over open", async () => {
        const user = userEvent.setup();
        render(Select, { label: "Team", options, presentation: "popover" });
        await user.click(trigger());
        await screen.findByRole("listbox");
        const dismiss = toastButton();
        // Both of what closes a list from outside: the pointer going down, and the click.
        await fireEvent.mouseDown(dismiss);
        await fireEvent.click(dismiss);
        expect(screen.getByRole("listbox")).toBeTruthy();
        expect(trigger().getAttribute("aria-expanded")).toBe("true");
        // A press that really is outside still closes it.
        await fireEvent.mouseDown(document.body);
        await fireEvent.click(document.body);
        await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
    });

    it("leaves an open Select sheet open", async () => {
        const user = userEvent.setup();
        render(Select, { label: "Team", options, presentation: "sheet" });
        await user.click(trigger());
        await screen.findByRole("dialog", { name: "Team" });
        const dismiss = toastButton();
        await fireEvent.mouseDown(dismiss);
        await fireEvent.click(dismiss);
        expect(screen.getByRole("dialog", { name: "Team" })).toBeTruthy();
        expect(screen.getByRole("listbox")).toBeTruthy();
    });

    it("leaves an open Dropdown open", async () => {
        const user = userEvent.setup();
        render(DropdownOptionsHarness);
        await user.click(screen.getByRole("button", { name: "Actions" }));
        await screen.findByRole("menu");
        const dismiss = toastButton();
        await fireEvent.mouseDown(dismiss);
        await fireEvent.click(dismiss);
        expect(screen.getByRole("menu")).toBeTruthy();
        await fireEvent.mouseDown(document.body);
        await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    });
});
