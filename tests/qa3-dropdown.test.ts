import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import DropdownItem from "../src/components/molecules/DropdownItem.svelte";
import DropdownOptionsHarness from "./fixtures/DropdownOptionsHarness.svelte";

/**
 * QA-3 review of c75ed4a. Gaps the package's own tests leave open. The tests
 * marked DEFECT fail against the components as committed and are skipped so
 * the suite stays green; each names what has to change before it is enabled.
 */

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const trigger = () => screen.getByRole("button", { name: "Actions" });

async function openByKeyboard(props: Record<string, unknown> = {}) {
    const user = userEvent.setup();
    const onOptionClick = vi.fn();
    render(DropdownOptionsHarness, { onOptionClick, ...props });
    trigger().focus();
    await user.keyboard("{Enter}");
    const role = props.menuRole === "listbox" ? "option" : "menuitem";
    const items = await screen.findAllByRole(role);
    await waitFor(() => expect(document.activeElement).toBe(items[0]));
    return { user, items, onOptionClick };
}

describe("Dropdown items (QA-3)", () => {
    it.each(["menu", "listbox"] as const)(
        "walks every item of a %s with the arrow keys, disabled ones included, and wraps",
        async (menuRole) => {
            const { user, items } = await openByKeyboard({ menuRole });
            const seen: Element[] = [];
            for (let step = 0; step < items.length; step += 1) {
                await user.keyboard("{ArrowDown}");
                seen.push(document.activeElement as Element);
            }
            expect(seen).toEqual([items[1], items[2], items[3], items[0]]);
            expect(items[1].getAttribute("aria-disabled")).toBe("true");
            // Focusable, so its reason can be read: never natively disabled.
            expect((items[1] as HTMLButtonElement).disabled).toBe(false);
        },
    );

    it("refuses Enter and Space on a disabled item and keeps the menu open", async () => {
        const { user, onOptionClick } = await openByKeyboard();
        await user.keyboard("{ArrowDown}{Enter}{ }");

        expect(onOptionClick).not.toHaveBeenCalled();
        expect(screen.queryByRole("menu")).toBeTruthy();
        expect(trigger().getAttribute("aria-expanded")).toBe("true");
    });

    it("names an item with a label and a description by the label alone", async () => {
        const { items } = await openByKeyboard();
        expect(screen.getByRole("menuitem", { name: "Rename" })).toBe(items[2]);
        const description = document.getElementById(
            items[2].getAttribute("aria-describedby") ?? "",
        );
        expect(description?.textContent?.trim()).toBe("Change the display name.");
    });

    // Was DEFECT QA3-D-1: closing the menu removed the focused item and
    // nothing took focus, so it fell to <body> (after Escape, and after an
    // item was chosen). The menu-button pattern returns focus to the trigger;
    // a Select lost the user's place in the form the same way.
    it("returns focus to the trigger on Escape from an item", async () => {
        const { user } = await openByKeyboard();
        await user.keyboard("{ArrowDown}{Escape}");
        await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());

        expect(document.activeElement).toBe(trigger());
    });

    // Was DEFECT QA3-D-2: with custom `children` there was no
    // `aria-labelledby`, so the name was computed from the whole button,
    // description included, and `aria-describedby` then read the description
    // a second time. The content wrapper is the label when there is a description.
    it("does not put the description in the name of an item with custom children", () => {
        const children = createRawSnippet(() => ({
            render: () => `<span><strong>Share</strong> settings</span>`,
        }));
        render(DropdownItem, { props: { description: "Shared with 3 people", children } });

        expect(screen.getByRole("menuitem", { name: "Share settings" })).toBeTruthy();
    });

    it("leaves an item with custom children and no description to name itself", () => {
        const children = createRawSnippet(() => ({
            render: () => `<span>Share settings</span>`,
        }));
        render(DropdownItem, { props: { children } });
        const item = screen.getByRole("menuitem", { name: "Share settings" });
        expect(item.hasAttribute("aria-labelledby")).toBe(false);
        expect(item.hasAttribute("aria-describedby")).toBe(false);
    });

    it.each(["menu", "listbox"] as const)(
        "returns focus to the trigger when an item of a %s is chosen with Enter or the mouse",
        async (menuRole) => {
            const { user, items, onOptionClick } = await openByKeyboard({
                menuRole,
                closeOnChoose: true,
            });
            await user.keyboard("{Enter}");
            expect(onOptionClick).toHaveBeenCalledWith("edit");
            await waitFor(() => expect(items[0].isConnected).toBe(false));
            expect(document.activeElement).toBe(trigger());

            await user.click(trigger());
            const role = menuRole === "listbox" ? "option" : "menuitem";
            await user.click((await screen.findAllByRole(role))[2]);
            expect(onOptionClick).toHaveBeenLastCalledWith("rename");
            expect(document.activeElement).toBe(trigger());
        },
    );

    it("does not take focus from an element the choose handler focused", async () => {
        const { user, items } = await openByKeyboard({
            closeOnChoose: true,
            focusElsewhereOnChoose: true,
        });
        await user.keyboard("{Enter}");
        await waitFor(() => expect(items[0].isConnected).toBe(false));
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Elsewhere" }));
    });

    it("does not pull focus to the trigger when the menu closes while focus is outside it", async () => {
        const user = userEvent.setup();
        render(DropdownOptionsHarness);
        await user.click(trigger());
        await screen.findAllByRole("menuitem");
        const elsewhere = screen.getByRole("button", { name: "Elsewhere" });

        // A click outside closes the menu; focus belongs to what was clicked.
        await user.click(elsewhere);
        await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
        expect(document.activeElement).toBe(elsewhere);
    });

    it("aligns item text to the start edge, and places the popup on it", async () => {
        const { items } = await openByKeyboard();
        const classes = items[0].className.split(/\s+/);
        expect(classes).toContain("text-start");
        expect(classes).not.toContain("text-left");
        const popup = screen.getByRole("menu").parentElement!.className.split(/\s+/);
        expect(popup).toContain("start-0");
        expect(popup).not.toContain("left-0");
    });
});
