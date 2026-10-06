import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import UnsavedChangesBarHarness from "./fixtures/UnsavedChangesBarHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const bar = () => screen.getByTestId("bar");
const field = () => screen.getByTestId("name") as HTMLInputElement;
const save = () => screen.getByRole("button", { name: "Save" }) as HTMLButtonElement;
const discard = () => screen.getByRole("button", { name: "Discard" }) as HTMLButtonElement;
const status = () => screen.getByRole("status");

/** A save that is pending until the test ends it. */
function pendingSave() {
    let finish!: () => void;
    const until = new Promise<void>((resolve) => (finish = resolve));
    return { until, finish };
}

describe("UnsavedChangesBar visibility and semantics", () => {
    it("is an empty, unnamed host until the form is dirty", () => {
        render(UnsavedChangesBarHarness);
        expect(screen.queryByRole("region")).toBeNull();
        expect(screen.queryByRole("button", { name: "Save" })).toBeNull();
        // The live region is already there, and silent.
        expect(status().textContent?.trim()).toBe("");
        expect(bar().contains(status())).toBe(true);
        expect(bar().className).not.toContain("sticky");
    });

    it("appears as a named region with the message and both buttons", async () => {
        const user = userEvent.setup();
        render(UnsavedChangesBarHarness);
        await user.type(field(), " L");

        const region = screen.getByRole("region", { name: "Unsaved changes" });
        expect(region).toBe(bar());
        expect(status().textContent?.trim()).toBe("You have unsaved changes");
        expect(save()).toBeTruthy();
        expect(discard()).toBeTruthy();
    });

    it("announces through the same status element that was there before, and only the message", async () => {
        const user = userEvent.setup();
        render(UnsavedChangesBarHarness);
        const before = status();
        await user.type(field(), "x");
        // Same node: a live region inserted together with its text is not read.
        expect(status()).toBe(before);
        expect(before.textContent?.trim()).toBe("You have unsaved changes");
        // The buttons are outside it, so they are not part of the announcement.
        expect(before.contains(save())).toBe(false);
        expect(bar().getAttribute("role")).toBe("region");
        expect(screen.getAllByRole("status")).toHaveLength(1);
    });

    it("does not take focus when it appears", async () => {
        const user = userEvent.setup();
        render(UnsavedChangesBarHarness);
        field().focus();
        await user.type(field(), "x");
        expect(document.activeElement).toBe(field());
    });

    it("sticks to the bottom by default and to the top on request", () => {
        const { unmount } = render(UnsavedChangesBarHarness, { props: { initialDirty: true } });
        expect(bar().className).toContain("sticky");
        expect(bar().className).toContain("safe-area-inset-bottom");
        expect(bar().className).not.toContain("fixed");
        expect(bar().getAttribute("data-position")).toBe("bottom");
        unmount();

        render(UnsavedChangesBarHarness, { props: { initialDirty: true, position: "top" } });
        expect(bar().className).toContain("top-2");
        expect(bar().className).not.toContain("safe-area-inset-bottom");
    });

    it("takes its text from props and extra buttons from the actions snippet", () => {
        render(UnsavedChangesBarHarness, {
            props: {
                initialDirty: true,
                message: "Osparade ändringar",
                saveLabel: "Spara",
                discardLabel: "Ångra",
                withActions: true,
            },
        });
        expect(status().textContent?.trim()).toBe("Osparade ändringar");
        expect(screen.getByRole("button", { name: "Spara" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Ångra" })).toBeTruthy();
        const buttons = Array.from(bar().querySelectorAll("button"));
        expect(buttons.map((button) => button.textContent?.trim())).toEqual([
            "Preview",
            "Ångra",
            "Spara",
        ]);
    });
});

describe("UnsavedChangesBar actions", () => {
    it("calls onsave and ondiscard", async () => {
        const user = userEvent.setup();
        const onsaved = vi.fn();
        const ondiscarded = vi.fn();
        render(UnsavedChangesBarHarness, {
            props: { initialDirty: true, mode: "none", onsaved, ondiscarded },
        });
        await user.click(save());
        expect(onsaved).toHaveBeenCalledTimes(1);
        // The bar does not hide itself.
        expect(screen.getByRole("region")).toBeTruthy();

        await user.click(discard());
        expect(ondiscarded).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole("region")).toBeNull();
        expect(field().value).toBe("");
    });

    it("shows the saving state while the saving prop is set", () => {
        render(UnsavedChangesBarHarness, { props: { initialDirty: true, saving: true } });
        // Save is loading: unavailable, but not `disabled`, so it can hold focus.
        expect(save().getAttribute("aria-disabled")).toBe("true");
        expect(save().disabled).toBe(false);
        expect(save().getAttribute("aria-busy")).toBe("true");
        expect(discard().disabled).toBe(true);
        expect(bar().getAttribute("aria-busy")).toBe("true");
    });

    it("enters the saving state for a promise and leaves when it resolves", async () => {
        const user = userEvent.setup();
        const onsaved = vi.fn();
        // The save is over when this test says so. It used to be over after
        // 30ms, which a busy machine could spend inside `user.click`: the bar
        // was gone, and "Save" could not be found.
        const { until, finish } = pendingSave();
        render(UnsavedChangesBarHarness, {
            props: { initialDirty: true, mode: "async", until, onsaved },
        });

        await user.click(save());
        expect(save().getAttribute("aria-busy")).toBe("true");
        expect(save().getAttribute("aria-disabled")).toBe("true");
        expect(discard().disabled).toBe(true);

        // A second activation while saving does nothing.
        await fireEvent.click(save());
        expect(onsaved).toHaveBeenCalledTimes(1);

        finish();
        await waitFor(() => expect(screen.queryByRole("region")).toBeNull());
        expect(status().textContent?.trim()).toBe("");
    });

    it("stays, leaves the saving state and reports when the promise rejects", async () => {
        const user = userEvent.setup();
        const onerror = vi.fn();
        const { until, finish } = pendingSave();
        render(UnsavedChangesBarHarness, {
            props: { initialDirty: true, mode: "reject", until, onerror },
        });

        await user.click(save());
        expect(save().getAttribute("aria-disabled")).toBe("true");
        finish();
        await waitFor(() => expect(onerror).toHaveBeenCalledTimes(1));
        expect((onerror.mock.calls[0][0] as Error).message).toBe("The server said no.");
        expect(screen.getByRole("region")).toBeTruthy();
        expect(save().hasAttribute("aria-disabled")).toBe(false);
        expect(save().hasAttribute("aria-busy")).toBe(false);
        expect(discard().disabled).toBe(false);
    });

    it("hands a rejection to the global error handler when there is no onerror", async () => {
        const user = userEvent.setup();
        const reported = vi.fn();
        vi.stubGlobal("reportError", reported);
        render(UnsavedChangesBarHarness, { props: { initialDirty: true, mode: "reject" } });

        await user.click(save());
        await waitFor(() => expect(reported).toHaveBeenCalledTimes(1));
        expect((reported.mock.calls[0][0] as Error).message).toBe("The server said no.");
        vi.unstubAllGlobals();
    });
});

describe("UnsavedChangesBar focus", () => {
    it("returns focus to the field it came from when Save hides the bar", async () => {
        const user = userEvent.setup();
        render(UnsavedChangesBarHarness);
        await user.click(field());
        await user.type(field(), "x");
        await user.click(save());

        expect(screen.queryByRole("region")).toBeNull();
        await waitFor(() => expect(document.activeElement).toBe(field()));
    });

    it("does the same after Discard, by keyboard", async () => {
        const user = userEvent.setup();
        render(UnsavedChangesBarHarness);
        await user.click(field());
        await user.type(field(), "x");
        await user.tab();
        expect(document.activeElement).toBe(discard());
        await user.keyboard("{Enter}");

        expect(screen.queryByRole("region")).toBeNull();
        await waitFor(() => expect(document.activeElement).toBe(field()));
    });

    it("keeps focus on the host when there is nowhere to return to", async () => {
        render(UnsavedChangesBarHarness, { props: { initialDirty: true } });
        // Focus arrives in the bar from nowhere (a script, or a fresh page).
        save().focus();
        await fireEvent.click(save());

        expect(screen.queryByRole("region")).toBeNull();
        await waitFor(() => expect(document.activeElement).toBe(bar()));
        expect(document.activeElement).not.toBe(document.body);
    });

    it("holds focus on the bar while saving and returns it to the field afterwards", async () => {
        const user = userEvent.setup();
        const { until, finish } = pendingSave();
        render(UnsavedChangesBarHarness, { props: { mode: "async", until } });
        await user.click(field());
        await user.type(field(), "x");
        await user.click(save());

        // Save is unavailable now; focus must not have fallen to <body>.
        await waitFor(() => expect(document.activeElement).toBe(bar()));
        finish();
        await waitFor(() => expect(screen.queryByRole("region")).toBeNull());
        await waitFor(() => expect(document.activeElement).toBe(field()));
    });

    it("returns focus to Save when a save fails", async () => {
        const user = userEvent.setup();
        const onerror = vi.fn();
        const { until, finish } = pendingSave();
        render(UnsavedChangesBarHarness, { props: { mode: "reject", until, onerror } });
        await user.click(field());
        await user.type(field(), "x");
        await user.click(save());

        await waitFor(() => expect(document.activeElement).toBe(bar()));
        finish();
        await waitFor(() => expect(onerror).toHaveBeenCalled());
        await waitFor(() => expect(document.activeElement).toBe(save()));
    });

    it("returns focus to the field when dirty clears only after the save resolved", async () => {
        const user = userEvent.setup();
        render(UnsavedChangesBarHarness, { props: { mode: "late" } });
        await user.click(field());
        await user.type(field(), "x");
        await user.click(save());

        await waitFor(() => expect(screen.queryByRole("region")).toBeNull());
        await waitFor(() => expect(document.activeElement).toBe(field()));
    });

    it("leaves focus alone when the bar hides while focus is elsewhere", async () => {
        const user = userEvent.setup();
        render(UnsavedChangesBarHarness);
        await user.click(field());
        await user.type(field(), "x");
        expect(screen.getByRole("region")).toBeTruthy();
        // Typing the saved value back clears dirty with focus in the field.
        await user.keyboard("{Backspace}");
        expect(screen.queryByRole("region")).toBeNull();
        expect(document.activeElement).toBe(field());
    });
});
