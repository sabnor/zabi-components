import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Select from "../src/components/atoms/Select.svelte";
import { opensAsSheet, SHEET_MEDIA_QUERY } from "../src/components/util/dropdown";
import DropdownOptionsHarness from "./fixtures/DropdownOptionsHarness.svelte";

/**
 * `presentation`: the menu under its trigger, or in a BottomSheet. The roles,
 * names, items and keys are the same in both; the geometry and the touch
 * behaviour are measured in playwright/touch-menus.spec.ts.
 */

/** What `matchMedia` answers for the phone query; everything else is false. */
function device(phone: boolean) {
    const matchMedia = vi.fn((query: string) => ({
        matches: phone && query === SHEET_MEDIA_QUERY,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        onchange: null,
        dispatchEvent: () => false,
    }));
    vi.stubGlobal("matchMedia", matchMedia);
    return matchMedia;
}

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    document.body.style.overflow = "";
});

const trigger = () => screen.getByRole("button", { name: "Actions" });

describe("opensAsSheet", () => {
    it("popover never, sheet always, auto on a touch screen narrower than 640px", () => {
        device(false);
        expect(opensAsSheet("popover")).toBe(false);
        expect(opensAsSheet("sheet")).toBe(true);
        expect(opensAsSheet("auto")).toBe(false);
        const asked = device(true);
        expect(opensAsSheet("popover")).toBe(false);
        expect(opensAsSheet("auto")).toBe(true);
        expect(asked).toHaveBeenCalledWith("(pointer: coarse) and (max-width: 639.98px)");
    });

    it("is never a sheet for auto where there is no matchMedia", () => {
        vi.stubGlobal("matchMedia", undefined);
        expect(opensAsSheet("auto")).toBe(false);
        expect(opensAsSheet("sheet")).toBe(true);
    });
});

describe("Dropdown presentation", () => {
    it("is a pop-over by default, on a phone too", async () => {
        device(true);
        const user = userEvent.setup();
        render(DropdownOptionsHarness);
        await user.click(trigger());
        expect(await screen.findByRole("menu", { name: "Project actions" })).toBeTruthy();
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("sheet: the same menu, in a dialog named by sheetTitle, with focus on the chosen item", async () => {
        device(false);
        const user = userEvent.setup();
        render(DropdownOptionsHarness, {
            presentation: "sheet",
            sheetTitle: "Project",
            menuRole: "listbox",
        });
        await user.click(trigger());
        const dialog = await screen.findByRole("dialog", { name: "Project" });
        const list = screen.getByRole("listbox", { name: "Project actions" });
        expect(dialog.contains(list)).toBe(true);
        expect(list.id).toBe(trigger().getAttribute("aria-controls"));
        expect(trigger().getAttribute("aria-expanded")).toBe("true");
        const options = screen.getAllByRole("option");
        expect(options.map((option) => option.textContent?.trim().split(/\s{2,}/)[0])).toHaveLength(4);
        // The chosen one (`selectedValue="rename"`), not the sheet's grip.
        await waitFor(() => expect(document.activeElement).toBe(options[2]));
        expect(options[2].getAttribute("aria-selected")).toBe("true");
    });

    it("sheet without sheetTitle is named by ariaLabel, and starts on the first item of a menu", async () => {
        device(false);
        const user = userEvent.setup();
        render(DropdownOptionsHarness, { presentation: "sheet" });
        await user.click(trigger());
        await screen.findByRole("dialog", { name: "Project actions" });
        const items = screen.getAllByRole("menuitem");
        await waitFor(() => expect(document.activeElement).toBe(items[0]));
    });

    it("sheet: arrows wrap through the items, a disabled one is reached and not done, choosing closes and returns focus", async () => {
        device(false);
        const user = userEvent.setup();
        const chosen = vi.fn();
        render(DropdownOptionsHarness, {
            presentation: "sheet",
            closeOnChoose: true,
            onOptionClick: chosen,
        });
        await user.click(trigger());
        await screen.findByRole("dialog");
        const items = screen.getAllByRole("menuitem");
        await waitFor(() => expect(document.activeElement).toBe(items[0]));
        await user.keyboard("{ArrowUp}");
        expect(document.activeElement).toBe(items[3]);
        await user.keyboard("{ArrowDown}{ArrowDown}");
        expect(document.activeElement).toBe(items[1]);
        expect(items[1].getAttribute("aria-disabled")).toBe("true");
        await user.keyboard("{Enter}");
        expect(chosen).not.toHaveBeenCalled();
        await user.keyboard("{End}{Enter}");
        expect(chosen).toHaveBeenCalledWith("delete");
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        await waitFor(() => expect(document.activeElement).toBe(trigger()));
    });

    it("sheet: Escape closes it and focus is back on the trigger; a press inside does not close it", async () => {
        device(false);
        const user = userEvent.setup();
        render(DropdownOptionsHarness, { presentation: "sheet" });
        await user.click(trigger());
        const dialog = await screen.findByRole("dialog");
        await user.click(screen.getByRole("heading", { name: "Project actions" }));
        expect(screen.getByRole("dialog")).toBe(dialog);
        await user.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        await waitFor(() => expect(document.activeElement).toBe(trigger()));
        expect(trigger().getAttribute("aria-expanded")).toBe("false");
    });

    it("auto: a sheet on a phone, the pop-over elsewhere, decided when it opens", async () => {
        device(false);
        const user = userEvent.setup();
        render(DropdownOptionsHarness, { presentation: "auto", closeOnChoose: true });
        await user.click(trigger());
        await screen.findByRole("menu");
        expect(screen.queryByRole("dialog")).toBeNull();
        await user.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());

        device(true);
        await user.click(trigger());
        expect(await screen.findByRole("dialog", { name: "Project actions" })).toBeTruthy();
    });

    it("custom children are the sheet's items as well", async () => {
        device(false);
        const user = userEvent.setup();
        render(DropdownOptionsHarness, { presentation: "sheet", custom: true });
        await user.click(trigger());
        const dialog = await screen.findByRole("dialog");
        expect(dialog.querySelectorAll('[role="menuitem"]')).toHaveLength(4);
    });
});

describe("Select presentation", () => {
    const options = [
        { value: "a", label: "Alpha" },
        { value: "b", label: "Beta", disabled: true },
        { value: "c", label: "Gamma" },
    ];
    const field = () => screen.getByRole("button", { name: /Team/ });

    it("auto by default: a sheet named by the label on a phone, with the list and its search field", async () => {
        device(true);
        const user = userEvent.setup();
        render(Select, { label: "Team", name: "team", options, value: "c" });
        await user.click(field());
        const dialog = await screen.findByRole("dialog", { name: "Team" });
        expect(dialog.querySelector('[role="listbox"]')).toBeTruthy();
        expect(dialog.querySelector('input[aria-label="Search options"]')).toBeTruthy();
        const chosen = screen.getByRole("option", { name: "Gamma" });
        expect(chosen.getAttribute("aria-selected")).toBe("true");
        await waitFor(() => expect(document.activeElement).toBe(chosen));
    });

    it("on a phone: choosing sets the value and the form control, closes, and focus returns to the field", async () => {
        device(true);
        const user = userEvent.setup();
        const { container } = render(Select, { label: "Team", name: "team", options, value: "c" });
        await user.click(field());
        await screen.findByRole("dialog");
        // A disabled option does nothing.
        await user.click(screen.getByRole("option", { name: "Beta" }));
        expect(screen.getByRole("dialog")).toBeTruthy();
        await user.click(screen.getByRole("option", { name: "Alpha" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(container.querySelector<HTMLSelectElement>('select[name="team"]')?.value).toBe("a");
        await waitFor(() => expect(document.activeElement).toBe(field()));
    });

    it("on a phone: the chosen option again closes the sheet and keeps the value", async () => {
        device(true);
        const user = userEvent.setup();
        const { container } = render(Select, { label: "Team", name: "team", options, value: "c" });
        await user.click(field());
        await screen.findByRole("dialog");
        await user.click(screen.getByRole("option", { name: "Gamma" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(container.querySelector<HTMLSelectElement>('select[name="team"]')?.value).toBe("c");
    });

    it("without a phone, and with presentation popover on one, the list is under the field", async () => {
        device(false);
        const user = userEvent.setup();
        const first = render(Select, { label: "Team", options });
        await user.click(field());
        expect(await screen.findByRole("listbox")).toBeTruthy();
        expect(screen.queryByRole("dialog")).toBeNull();
        first.unmount();

        device(true);
        render(Select, { label: "Team", options, presentation: "popover" });
        await user.click(field());
        expect(await screen.findByRole("listbox")).toBeTruthy();
        expect(screen.queryByRole("dialog")).toBeNull();
    });
});
