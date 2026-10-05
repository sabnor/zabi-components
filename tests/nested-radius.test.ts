import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import List from "../src/components/atoms/List.svelte";
import ListItem from "../src/components/atoms/ListItem.svelte";
import Alert from "../src/components/molecules/Alert.svelte";
import SidebarFooter from "../src/components/molecules/SidebarFooter.svelte";
import DropdownOptionsHarness from "./fixtures/DropdownOptionsHarness.svelte";
import MediaGridHarness from "./fixtures/MediaGridHarness.svelte";
import ModalHarness from "./fixtures/ModalHarness.svelte";

/**
 * Nested corners: an element close to the corner of a rounded container takes
 * a radius computed from the container's, `outer - gap`, so the two curves are
 * concentric. jsdom has no layout, so what is pinned here is that each such
 * element carries the computed radius and not a role radius of its own; the
 * geometry is measured on every docs page in playwright/nested-radius.spec.ts.
 */

afterEach(cleanup);

const classes = (element: Element) => element.className.split(/\s+/);

describe("nested corner radii", () => {
    it("Alert: the close button's radius is the alert's less its 0.5rem inset and 1px border", () => {
        render(Alert, { props: { title: "Saved", closable: true } });
        const close = screen.getByRole("button", { name: "Dismiss alert" });
        expect(classes(close)).toContain("rounded-[calc(var(--radius-container)-0.5rem-1px)]");
        expect(classes(close)).not.toContain("rounded-control");
        // The inset the radius is computed from.
        expect(classes(close)).toEqual(expect.arrayContaining(["right-2", "top-2"]));
        expect(classes(close.parentElement!)).toEqual(expect.arrayContaining(["rounded-container", "border"]));
    });

    it("SidebarFooter: the avatar's radius is the profile button's less its 0.5rem padding", () => {
        render(SidebarFooter, { props: { profileName: "Ada Lovelace", profileEmail: "ada@example.com" } });
        const button = screen.getByRole("button", { name: /account panel/i });
        expect(classes(button)).toEqual(expect.arrayContaining(["rounded-container", "px-2", "py-2"]));
        const avatar = button.querySelector('[aria-hidden="true"]')!;
        expect(classes(avatar)).toContain("rounded-[calc(var(--radius-container)-0.5rem)]");
        expect(classes(avatar)).not.toContain("rounded-container");
    });

    it("MediaGrid: the check and the video badge take their radius from the tile", async () => {
        const user = userEvent.setup();
        render(MediaGridHarness);
        const tiles = [...document.querySelectorAll<HTMLButtonElement>("[data-media-grid-item]")];
        await user.click(tiles[0]);
        const check = document.querySelector("[data-media-grid-check]")!;
        // 0.25rem inside a selected tile's 2px border.
        expect(classes(check)).toContain("rounded-[calc(var(--radius-container)-0.25rem-2px)]");
        expect(classes(check)).not.toContain("rounded-pill");
        expect(classes(check)).toEqual(expect.arrayContaining(["start-1", "top-1"]));
        expect(classes(check.parentElement!)).toEqual(expect.arrayContaining(["rounded-container", "border-2"]));

        const video = document.querySelector("[data-media-grid-video]");
        if (video) {
            expect(classes(video)).toContain("rounded-[calc(var(--radius-container)-0.25rem-1px)]");
            expect(classes(video)).not.toContain("rounded-control");
        }

        // A repeat press never clears the single selection.
        await user.click(tiles[0]);
        expect(tiles[0].getAttribute("aria-pressed")).toBe("true");
    });

    it("Dropdown: the menu takes the overlay radius, and its items stay at the control radius", async () => {
        const user = userEvent.setup();
        render(DropdownOptionsHarness);
        await user.click(screen.getAllByRole("button")[0]);
        const popup = screen.getByRole("menu").parentElement!;
        expect(classes(popup)).toContain("rounded-overlay");
        expect(classes(popup)).not.toContain("rounded-control");
        expect(classes(screen.getAllByRole("menuitem")[0])).toContain("rounded-control");
    });

    it("Modal: the Card inside the panel is 1px inside its corner, and square where the panel is", async () => {
        const user = userEvent.setup();
        render(ModalHarness);
        await user.click(screen.getByTestId("open-modal"));
        const panel = await screen.findByRole("dialog");
        expect(classes(panel)).toEqual(expect.arrayContaining(["rounded-t-overlay", "md:rounded-overlay", "border"]));
        const card = panel.firstElementChild!;
        expect(classes(card)).toEqual(
            expect.arrayContaining([
                "rounded-t-[calc(var(--radius-overlay)-1px)]",
                "rounded-b-none",
                "md:rounded-[calc(var(--radius-overlay)-1px)]",
            ]),
        );
        // Card's own `rounded-container` is still in the list: the per-side
        // classes above come later in the stylesheet and win, which the
        // Playwright spec measures (15px in the 16px panel).
    });

    it("ListItem: a row takes the radius a list group hands down, and the container radius otherwise", () => {
        render(ListItem, { props: { item: { id: "inbox", label: "Inbox" } } });
        const row = screen.getByText("Inbox").closest("[class*='focus-ring']")!;
        expect(row.className).toContain("rounded-[var(--zabi-list-row-radius,var(--radius-container))]");
    });

    it("List: takes the same radius as its rows and does not clip them, so a row's focus ring is whole", () => {
        render(List, { props: { items: [{ id: "inbox", label: "Inbox" }] } });
        const list = screen.getByText("Inbox").closest("ul")!;
        expect(classes(list)).toContain("rounded-[var(--zabi-list-row-radius,var(--radius-container))]");
        // The rows fill the list edge to edge: clipping here cuts the ring drawn around a focused row.
        expect(classes(list)).not.toContain("overflow-hidden");
    });
});
