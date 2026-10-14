import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import TopNavbarBrandHarness from "./fixtures/TopNavbarBrandHarness.svelte";
import { brand } from "../src/lib/marketing/brand-state.svelte";

/**
 * The docs site's BrandSwitcher in the bar's `actions`, written without an
 * argument as src/routes/+layout.svelte does: it finds out by itself that it
 * is in the phone sheet.
 */

afterEach(() => {
    cleanup();
    brand.accent = "iris";
});

const menuButton = () => screen.getByRole("button", { name: /^(Open|Close) menu$/ });

describe("BrandSwitcher in the TopNavbar sheet", () => {
    it("is a labelled group of large rows in the sheet, one per accent, and the small menu button in the bar", async () => {
        const user = userEvent.setup();
        render(TopNavbarBrandHarness);
        // The bar's copy: the button that opens a menu.
        expect(screen.getAllByRole("button", { name: /Brand accent/ })).toHaveLength(1);
        expect(screen.queryByRole("radiogroup", { name: "Brand accent" })).toBeNull();

        await user.click(menuButton());
        const dialog = await screen.findByRole("dialog");
        const group = within(dialog).getByRole("group", { name: "Brand accent" });
        const radios = within(group).getAllByRole("radio") as HTMLInputElement[];
        expect(radios.map((radio) => radio.value)).toEqual(["iris", "pine", "citron", "amber"]);
        expect(radios.find((radio) => radio.checked)!.value).toBe("iris");
        // A row is at least 44px tall by its class, and the whole row is the label.
        expect(radios[0].closest("label")!.className.split(/\s+/)).toContain("min-h-11");
        // No second menu button in the sheet.
        expect(within(dialog).queryByRole("button", { name: /Brand accent/ })).toBeNull();
    });

    it("changes the accent from a row, keeps the sheet open, and never clears on a second press", async () => {
        const user = userEvent.setup();
        render(TopNavbarBrandHarness);
        await user.click(menuButton());
        const dialog = await screen.findByRole("dialog");
        const pine = within(dialog).getByRole("radio", { name: "Pine" }) as HTMLInputElement;
        await user.click(pine);
        await waitFor(() => expect(brand.accent).toBe("pine"));
        expect(pine.checked).toBe(true);
        expect(screen.queryByRole("dialog")).not.toBeNull();

        await user.click(pine);
        expect(brand.accent).toBe("pine");
        expect(pine.checked).toBe(true);
    });

    it('is the small control in the inline menu, which stays a bar', async () => {
        const user = userEvent.setup();
        render(TopNavbarBrandHarness, { props: { menu: "inline" } });
        await user.click(menuButton());
        expect(screen.queryByRole("radiogroup")).toBeNull();
        expect(screen.queryByRole("group", { name: "Brand accent" })).toBeNull();
        expect(screen.getAllByRole("button", { name: /Brand accent/ })).toHaveLength(2);
    });
});
