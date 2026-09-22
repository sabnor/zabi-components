import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

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
