import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import CollapsibleGroupHarness from "./fixtures/CollapsibleGroupHarness.svelte";
import CollapsibleHarness from "./fixtures/CollapsibleHarness.svelte";

/**
 * QA review of 6fed7ec. Gaps the package's own tests left open. The three
 * tests marked QA-C-n failed against that commit and were skipped until the
 * defects were fixed; each comment says what used to happen. The server half
 * of QA-C-1 is in `collapsible-ssr.test.ts`: a server render needs its own
 * file and environment.
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

    // QA-C-1: in a single-open group every panel that started open used to
    // be rendered open, and an effect closed all but the first after mount.
    // On the server that was the HTML the visitor got until hydration
    // collapsed it, and on the client each extra panel reported
    // `onopenchange(false)` for a change nobody made. The group now settles
    // which panel is open while the members initialise.
    it("does not report a change while settling panels that start open", async () => {
        const onopenchange = vi.fn();
        render(CollapsibleGroupHarness, {
            props: { initial: ["members", "billing"], onopenchange },
        });
        await waitFor(() => expect(state()).toBe("members"));
        expect(onopenchange).not.toHaveBeenCalled();
    });

    // QA-C-2: `disabled` is documented as "the panel keeps its current
    // state", but a disabled panel that was open used to be closed when a
    // sibling opened, and its trigger then could not reopen it. The group now
    // leaves disabled members alone.
    it("keeps a disabled open panel open when a sibling opens", async () => {
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
    // QA-C-3: when the panel closed while focus was inside it (the parent
    // sets `open = false` from a Save button in the panel, or a group closes
    // it), the focused control was hidden and focus fell to <body>. Focus now
    // moves to the panel's trigger.
    it("moves focus to the trigger", async () => {
        render(CollapsibleHarness, { props: { initialOpen: true } });
        screen.getByTestId("note").focus();

        // A programmatic close: the click does not move focus itself.
        await fireEvent.click(screen.getByRole("button", { name: "Outside toggle" }));
        await waitFor(() => expect(state()).toBe("closed"));

        expect(document.activeElement).toBe(trigger("Billing"));
    });
});
