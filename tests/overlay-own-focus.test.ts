import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import OverlayOwnFocusHarness from "./fixtures/OverlayOwnFocusHarness.svelte";

/**
 * Modal, Drawer, SlideUp and BottomSheet move focus into themselves a moment
 * after they open (a 0ms timer, so the panel is in the DOM). Content that had
 * already taken focus by then (a search field that focuses on mount) lost it
 * to the first control, usually the close button. The move is now skipped
 * when focus is already on something inside the panel. `initialFocus` is the
 * consumer saying where focus goes, so it still decides.
 */

const KINDS = ["modal", "drawer", "slide-up", "bottom-sheet"] as const;

/** Past the overlay's 0ms timer. */
const settle = () => new Promise((resolve) => setTimeout(resolve, 30));

afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
});

describe.each(KINDS)("%s: focus taken by its own content as it opens", (kind) => {
    it("stays where the content put it", async () => {
        render(OverlayOwnFocusHarness, { kind });
        await screen.findByRole("dialog");
        expect(document.activeElement).toBe(screen.getByTestId("search"));
        await settle();
        expect(document.activeElement).toBe(screen.getByTestId("search"));
    });

    it("initialFocus still decides", async () => {
        render(OverlayOwnFocusHarness, { kind, initialFocus: '[data-testid="last"]' });
        await screen.findByRole("dialog");
        await settle();
        expect(document.activeElement).toBe(screen.getByTestId("last"));
    });

    it("an initialFocus that matches nothing leaves it alone as well", async () => {
        render(OverlayOwnFocusHarness, { kind, initialFocus: "#not-there" });
        await screen.findByRole("dialog");
        await settle();
        expect(document.activeElement).toBe(screen.getByTestId("search"));
    });

    it("with focus still outside, it goes to the first control as before", async () => {
        render(OverlayOwnFocusHarness, { kind, ownFocus: false });
        const dialog = await screen.findByRole("dialog");
        await settle();
        expect(dialog.contains(document.activeElement)).toBe(true);
        expect(document.activeElement).not.toBe(screen.getByTestId("search"));
        expect(document.activeElement).not.toBe(dialog);
    });
});
