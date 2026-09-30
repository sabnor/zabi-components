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

    // DEFECT (QA3-D-1): closing the menu removes the focused item and
    // nothing takes focus, so it falls to <body> (after Escape, and after an
    // item is chosen). The menu-button pattern returns focus to the trigger;
    // a Select loses the user's place in the form the same way.
    it.skip("returns focus to the trigger on Escape from an item", async () => {
        const { user } = await openByKeyboard();
        await user.keyboard("{ArrowDown}{Escape}");
        await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());

        expect(document.activeElement).toBe(trigger());
    });

    // DEFECT (QA3-D-2): with custom `children` there is no `aria-labelledby`,
    // so the name is computed from the whole button, description included,
    // and `aria-describedby` then reads the description a second time. The
    // content wrapper should be the label when there is a description.
    it.skip("does not put the description in the name of an item with custom children", () => {
        const children = createRawSnippet(() => ({
            render: () => `<span><strong>Share</strong> settings</span>`,
        }));
        render(DropdownItem, { props: { description: "Shared with 3 people", children } });

        expect(screen.getByRole("menuitem", { name: "Share settings" })).toBeTruthy();
    });
});
