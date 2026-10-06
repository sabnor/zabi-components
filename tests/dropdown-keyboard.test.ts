import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import DropdownOptionsHarness from "./fixtures/DropdownOptionsHarness.svelte";
import DropdownRadioHarness from "./fixtures/DropdownRadioHarness.svelte";

afterEach(cleanup);

describe("Dropdown keyboard access", () => {
    /**
     * The site's accent switcher builds its menu from `menuitemradio`, which
     * the item query used to miss: arrows did nothing, opening by keyboard
     * focused nothing, and Tab closed the menu, so the options could not be
     * reached by keyboard at all.
     */
    it("moves through menuitemradio options with the arrow keys", async () => {
        const user = userEvent.setup();
        render(DropdownRadioHarness);

        await user.tab();
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Iris" }));

        await user.keyboard("{Enter}");
        const options = await screen.findAllByRole("menuitemradio");
        expect(options).toHaveLength(3);

        // Opening by keyboard focuses the first item on the next tick.
        await waitFor(() =>
            expect(document.activeElement).toBe(options[0]),
        );

        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(options[1]);

        await user.keyboard("{End}");
        expect(document.activeElement).toBe(options[2]);

        await user.keyboard("{Home}");
        expect(document.activeElement).toBe(options[0]);
    });

    it("exposes each option's checked state", async () => {
        const user = userEvent.setup();
        render(DropdownRadioHarness);

        await user.click(screen.getByRole("button", { name: "Iris" }));
        const options = await screen.findAllByRole("menuitemradio");

        expect(options.map((option) => option.textContent?.trim())).toEqual([
            "Iris",
            "Pine",
            "Citron",
        ]);
        expect(
            options.map((option) => option.getAttribute("aria-checked")),
        ).toEqual(["true", "false", "false"]);
    });
});

describe.each([
    ["options", false],
    ["DropdownItem children", true],
] as const)("Dropdown items from %s", (_, custom) => {
    async function open(props: Record<string, unknown> = {}) {
        const user = userEvent.setup();
        render(DropdownOptionsHarness, { custom, ...props });
        await user.tab();
        await user.keyboard("{Enter}");
        const items = await screen.findAllByRole("menuitem");
        await waitFor(() => expect(document.activeElement).toBe(items[0]));
        return { user, items };
    }

    it("names each item by its label and describes it by its description", async () => {
        const { items } = await open();

        expect(items.map((item) => item.getAttribute("aria-labelledby") ?? "")
            .map((id) => (id ? document.getElementById(id)?.textContent?.trim() : null)),
        ).toEqual([null, "Archive", "Rename", null]);
        expect(screen.getByRole("menuitem", { name: "Edit" })).toBe(items[0]);
        expect(screen.getByRole("menuitem", { name: "Archive" })).toBe(items[1]);
        expect(screen.getByRole("menuitem", { name: "Delete" })).toBe(items[3]);

        const described = (item: HTMLElement) =>
            document.getElementById(item.getAttribute("aria-describedby") ?? "")
                ?.textContent?.trim();
        expect(described(items[1])).toBe("Only an owner can archive.");
        expect(described(items[2])).toBe("Change the display name.");
        expect(items[0].hasAttribute("aria-describedby")).toBe(false);
        // Visible, inside the item.
        expect(items[1].textContent).toContain("Only an owner can archive.");
    });

    it("renders the icon as decoration", async () => {
        const { items } = await open();

        const icon = items[0].querySelector("svg");
        expect(icon).toBeTruthy();
        expect(icon!.closest('[aria-hidden="true"]')).toBeTruthy();
        expect(items[2].querySelector("svg")).toBeNull();
    });

    it("gives the danger item the danger colour and focus ring", async () => {
        const { items } = await open();

        const danger = items[3].className.split(/\s+/);
        // The -text step: the plain error colour is 3.8:1 on the thick material.
        expect(danger).toContain("text-error-text");
        expect(danger).toContain("hover:bg-action-danger-subtle");
        expect(danger).toContain("focus-ring--danger");
        expect(danger).not.toContain("text-body");
        expect(items[0].className.split(/\s+/)).toContain("text-body");
    });

    it("keeps a disabled item in the arrow-key order, with its reason undimmed", async () => {
        const { user, items } = await open();
        const archive = items[1];

        expect(archive.getAttribute("aria-disabled")).toBe("true");
        expect((archive as HTMLButtonElement).disabled).toBe(false);
        const reason = document.getElementById(archive.getAttribute("aria-describedby")!)!;
        expect(reason.closest(".opacity-50")).toBeNull();

        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(archive);
        // A natively disabled button held the arrow keys here: focus could
        // never move on to the items after it.
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(items[2]);
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(items[3]);
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(items[0]);
        await user.keyboard("{ArrowUp}");
        expect(document.activeElement).toBe(items[3]);
        await user.keyboard("{Home}");
        expect(document.activeElement).toBe(items[0]);
        await user.keyboard("{End}");
        expect(document.activeElement).toBe(items[3]);
    });

    it("does not choose a disabled item by click or keyboard", async () => {
        const onOptionClick = vi.fn();
        const { user, items } = await open({ onOptionClick });

        await user.click(items[1]);
        items[1].focus();
        await user.keyboard("{Enter}");
        await user.keyboard(" ");
        expect(onOptionClick).not.toHaveBeenCalled();

        await user.click(items[3]);
        expect(onOptionClick).toHaveBeenCalledTimes(1);
        expect(onOptionClick).toHaveBeenCalledWith("delete");
    });

    it("closes on Escape from an item", async () => {
        const { user } = await open();
        await user.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    });
});

describe("Dropdown items in a listbox", () => {
    it.each([false, true])("render as options (DropdownItem children: %s)", async (custom) => {
        const user = userEvent.setup();
        render(DropdownOptionsHarness, { menuRole: "listbox", custom });
        await user.click(screen.getByRole("button", { name: "Actions" }));

        expect(screen.getByRole("listbox", { name: "Project actions" })).toBeTruthy();
        const options = await screen.findAllByRole("option");
        expect(options).toHaveLength(4);
        expect(screen.queryByRole("menuitem")).toBeNull();
        expect(options[1].getAttribute("aria-disabled")).toBe("true");
    });

    it("marks the selected option, and only that one", async () => {
        const user = userEvent.setup();
        render(DropdownOptionsHarness, { menuRole: "listbox" });
        await user.click(screen.getByRole("button", { name: "Actions" }));

        const options = await screen.findAllByRole("option");
        // Every option says whether it is the chosen one.
        expect(options.map((option) => option.getAttribute("aria-selected"))).toEqual([
            "false",
            "false",
            "true",
            "false",
        ]);
        // And the chosen one has a check, which the others do not.
        expect(options.map((option) => option.querySelectorAll("svg.lucide-check").length)).toEqual([0, 0, 1, 0]);
        expect(options.map((option) => option.getAttribute("data-value"))).toEqual([
            "edit",
            "archive",
            "rename",
            "delete",
        ]);
    });

    it("does not add aria-selected to menu items", async () => {
        const user = userEvent.setup();
        render(DropdownOptionsHarness);
        await user.click(screen.getByRole("button", { name: "Actions" }));

        const items = await screen.findAllByRole("menuitem");
        expect(items.every((item) => !item.hasAttribute("aria-selected"))).toBe(true);
    });
});
