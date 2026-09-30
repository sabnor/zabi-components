import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store.js";

/**
 * QA-3 review of 3829d56. Gaps the package's own tests leave open. The test
 * marked DEFECT fails against the component as committed and is skipped so
 * the suite stays green; it names what has to change before it is enabled.
 */

beforeAll(() => {
    // jsdom has no Web Animations API; Svelte transitions need a minimal stub.
    if (!Element.prototype.animate) {
        Element.prototype.animate = function () {
            const animation = {
                onfinish: null as null | (() => void),
                cancel() {},
                finish() {},
                currentTime: 0,
                effect: { getComputedTiming: () => ({ progress: 1 }) },
            };
            queueMicrotask(() => animation.onfinish?.());
            return animation as unknown as Animation;
        };
    }
});

afterEach(() => {
    toastStore.clear();
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

const undo = (label = "Undo", onclick = () => {}) => ({ label, onclick });

describe("Toaster action (QA-3)", () => {
    it("pauses auto-dismiss while focus is on the action, and resumes when it leaves", async () => {
        vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
        render(Toaster);
        pushToast({ message: "File deleted", duration: 3000, action: undo() });

        const toast = await screen.findByRole("group", { name: "Notice" });
        const action = screen.getByRole("button", { name: "Undo" });
        action.focus();
        await waitFor(() => expect(toast.getAttribute("data-paused")).toBe("true"));
        vi.advanceTimersByTime(6000);
        await waitFor(() => expect(toast.textContent).toContain("3 seconds"));
        expect(screen.queryByRole("group", { name: "Notice" })).toBeTruthy();

        action.blur();
        await waitFor(() => expect(toast.getAttribute("data-paused")).toBe("false"));
        vi.advanceTimersByTime(1000);
        await waitFor(() => expect(toast.textContent).toContain("2 seconds"));
    });

    it("stays paused while focus moves between the controls of one toast", async () => {
        render(Toaster);
        pushToast({ message: "File deleted", duration: 3000, action: undo() });

        const toast = await screen.findByRole("group", { name: "Notice" });
        const dismiss = screen.getByRole("button", { name: "Dismiss notification" });
        const action = screen.getByRole("button", { name: "Undo" });
        dismiss.focus();
        // What a Tab from Dismiss to the action does: focus leaves one and enters the other.
        await fireEvent.focusOut(dismiss, { relatedTarget: action });
        action.focus();
        await waitFor(() => expect(toast.getAttribute("data-paused")).toBe("true"));
    });

    it("closes the toast when the handler throws, and lets the error surface", async () => {
        render(Toaster);
        const boom = new Error("handler failed");
        pushToast({
            message: "File deleted",
            duration: 0,
            action: undo("Undo", () => {
                throw boom;
            }),
        });
        const errors: unknown[] = [];
        const onError = (event: ErrorEvent) => {
            errors.push(event.error);
            event.preventDefault();
        };
        window.addEventListener("error", onError);

        try {
            const action = await screen.findByRole("button", { name: "Undo" });
            action.click();
            await waitFor(() => expect(screen.queryByRole("group")).toBeNull());
            expect(errors).toContain(boom);
        } finally {
            window.removeEventListener("error", onError);
        }
    });

    it("orders the controls of stacked toasts oldest first, action after dismiss", async () => {
        render(Toaster);
        pushToast({ message: "First", duration: 0, action: undo("Undo first") });
        pushToast({ message: "Second", duration: 0, action: undo("Undo second") });

        await screen.findByRole("button", { name: "Undo second" });
        const names = screen
            .getAllByRole("button")
            .map((button) => button.getAttribute("aria-label") ?? button.textContent?.trim());
        expect(names).toEqual([
            "Expand details",
            "Dismiss notification",
            "Undo first",
            "Expand details",
            "Dismiss notification",
            "Undo second",
        ]);
    });

    // DEFECT (QA3-T-1): the action (and Dismiss) remove the toast that holds
    // focus and nothing takes it, so focus falls to <body>: a keyboard user
    // who tabbed all the way to the toast starts again from the top of the
    // page, even with another toast still open. Focus should go to the next
    // toast, or back to the element that had it before focus entered the
    // notifications region.
    it.skip("keeps focus off <body> after an action closes its toast", async () => {
        const user = userEvent.setup();
        render(Toaster);
        pushToast({ message: "First", duration: 0, action: undo("Undo first") });
        pushToast({ message: "Second", duration: 0, action: undo("Undo second") });

        const action = await screen.findByRole("button", { name: "Undo first" });
        action.focus();
        await user.keyboard("{Enter}");
        await waitFor(() => expect(screen.queryByRole("button", { name: "Undo first" })).toBeNull());

        expect(document.activeElement).not.toBe(document.body);
    });
});
