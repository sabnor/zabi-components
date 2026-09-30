import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import CollapsibleGroupHarness from "./fixtures/CollapsibleGroupHarness.svelte";
import CollapsibleHarness from "./fixtures/CollapsibleHarness.svelte";

/**
 * QA review of 6fed7ec. Gaps the package's own tests leave open. The tests
 * marked DEFECT fail against the components as committed and are skipped so
 * the suite stays green; each names what has to change before it is enabled.
 * The server half of QA-C-1 is in the QA-2 report: a server render needs its
 * own file and environment.
 */

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const state = () => screen.getByTestId("state").textContent?.trim();
const trigger = (name: string | RegExp) => screen.getByRole("button", { name });

describe("CollapsibleGroup (QA): keys it must leave alone", () => {
    it("does not take arrow keys from anything but its own header buttons", async () => {
        render(CollapsibleGroupHarness, { props: { initial: ["general"] } });
        const group = screen.getByTestId("group");
        // A control a consumer might put in a header or a panel.
        const input = document.createElement("input");
        screen.getByText("General settings").append(input);

        // fireEvent returns true when nothing called preventDefault().
        for (const key of ["ArrowDown", "ArrowUp", "Home", "End"]) {
            expect(await fireEvent.keyDown(input, { key })).toBe(true);
            expect(await fireEvent.keyDown(screen.getByText("General settings"), { key })).toBe(true);
        }
        expect(group.contains(document.activeElement)).toBe(false);
    });

    it("leaves Tab, and arrows with a modifier, to the browser on a header button", async () => {
        render(CollapsibleGroupHarness);
        const general = trigger("General");
        general.focus();

        expect(await fireEvent.keyDown(general, { key: "Tab" })).toBe(true);
        for (const modifier of ["altKey", "ctrlKey", "metaKey", "shiftKey"]) {
            expect(await fireEvent.keyDown(general, { key: "ArrowDown", [modifier]: true })).toBe(true);
        }
        expect(document.activeElement).toBe(general);
        // The plain key is the group's.
        expect(await fireEvent.keyDown(general, { key: "ArrowDown" })).toBe(false);
    });
});

describe("CollapsibleGroup (QA): reporting", () => {
    it("reports a panel the group closed, once, after the one the user opened", async () => {
        const user = userEvent.setup();
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, { props: { initial: ["general"], onopenchange } });

        await user.click(trigger("Members"));
        await waitFor(() => expect(state()).toBe("members"));
        expect(onopenchange.mock.calls).toEqual([
            ["members", true],
            ["general", false],
        ]);
    });

    // DEFECT (QA-C-1): in a single-open group every panel that starts open
    // is rendered open, and an effect closes all but the first after mount.
    // On the server that is the HTML the visitor gets (all open, all
    // regions) until hydration collapses it, and on the client each extra
    // panel reports `onopenchange(false)` for a change nobody made. The
    // group should settle which panel is open while the members initialise.
    it.skip("does not report a change while settling panels that start open", async () => {
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, {
            props: { initial: ["members", "billing"], onopenchange },
        });
        await waitFor(() => expect(state()).toBe("members"));
        expect(onopenchange).not.toHaveBeenCalled();
    });

    // DEFECT (QA-C-2): `disabled` is documented as "the panel keeps its
    // current state", but a disabled panel that is open is closed when a
    // sibling opens, and its trigger then cannot reopen it. Either the group
    // leaves disabled members alone or the prop's description changes.
    it.skip("keeps a disabled open panel open when a sibling opens", async () => {
        const user = userEvent.setup();
        render(CollapsibleGroupHarness, {
            props: { initial: ["members"], disableMembers: true },
        });

        await user.click(trigger("General"));
        await waitFor(() => expect(state()).toContain("general"));
        expect(state()).toContain("members");
    });
});

describe("Collapsible (QA): focus when the panel closes under it", () => {
    // DEFECT (QA-C-3): when the panel closes while focus is inside it (the
    // parent sets `open = false` from a Save button in the panel, or a group
    // closes it), the focused control is hidden and focus falls to <body>.
    // Focus should move to the panel's trigger.
    it.skip("moves focus to the trigger", async () => {
        render(CollapsibleHarness, { props: { initialOpen: true } });
        screen.getByTestId("note").focus();

        // A programmatic close: the click does not move focus itself.
        await fireEvent.click(screen.getByRole("button", { name: "Outside toggle" }));
        await waitFor(() => expect(state()).toBe("closed"));

        expect(document.activeElement).toBe(trigger("Billing"));
    });
});
