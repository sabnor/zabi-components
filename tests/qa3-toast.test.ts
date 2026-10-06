import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import Toaster from "../src/components/molecules/Toaster.svelte";
import {
    focusToasts,
    pushToast,
    toastStore,
} from "../src/components/molecules/toast-store.js";

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

const toastOf = (element: Element | null) =>
    element?.closest("[data-toast-id]")?.getAttribute("aria-label");

function outsideButton(name: string) {
    const button = document.createElement("button");
    button.textContent = name;
    document.body.prepend(button);
    return button;
}

describe("Toaster action (QA-3)", () => {
    it("pauses auto-dismiss while focus is on the action, and resumes when it leaves", async () => {
        vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
        render(Toaster);
        pushToast({ message: "File deleted", duration: 3000, action: undo() });

        const toast = await screen.findByRole("group", { name: "File deleted" });
        const action = screen.getByRole("button", { name: "Undo" });
        action.focus();
        await waitFor(() => expect(toast.getAttribute("data-paused")).toBe("true"));
        vi.advanceTimersByTime(6000);
        await waitFor(() => expect(toast.textContent).toContain("3 seconds"));
        expect(screen.queryByRole("group", { name: "File deleted" })).toBeTruthy();

        action.blur();
        await waitFor(() => expect(toast.getAttribute("data-paused")).toBe("false"));
        vi.advanceTimersByTime(1000);
        await waitFor(() => expect(toast.textContent).toContain("2 seconds"));
    });

    it("stays paused while focus moves between the controls of one toast", async () => {
        render(Toaster);
        pushToast({ message: "File deleted", duration: 3000, action: undo() });

        const toast = await screen.findByRole("group", { name: "File deleted" });
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
            "Dismiss notification",
            "Undo first",
            "Dismiss notification",
            "Undo second",
        ]);
    });

    // Was DEFECT QA3-T-1: the action (and Dismiss) removed the toast that held
    // focus and nothing took it, so focus fell to <body>: a keyboard user who
    // tabbed all the way to the toast started again from the top of the page,
    // even with another toast still open. Focus goes to the next toast, or
    // back to the element that had it before focus entered the region.
    it("keeps focus off <body> after an action closes its toast", async () => {
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

    it("moves focus to the next toast when the focused one is dismissed", async () => {
        const user = userEvent.setup();
        render(Toaster);
        pushToast({ title: "First", message: "1", duration: 0 });
        pushToast({ title: "Second", message: "2", duration: 0 });
        pushToast({ title: "Third", message: "3", duration: 0 });
        const dismiss = (await screen.findAllByRole("button", { name: "Dismiss notification" }))[1];

        dismiss.focus();
        await user.keyboard("{Enter}");
        await waitFor(() => expect(screen.queryByRole("group", { name: "Second" })).toBeNull());
        expect(toastOf(document.activeElement)).toBe("Third");
    });

    it("moves focus to the toast before it when the last one is dismissed", async () => {
        const user = userEvent.setup();
        render(Toaster);
        pushToast({ title: "First", message: "1", duration: 0 });
        pushToast({ title: "Second", message: "2", duration: 0 });
        const dismiss = (await screen.findAllByRole("button", { name: "Dismiss notification" }))[1];

        dismiss.focus();
        await user.keyboard("{Enter}");
        await waitFor(() => expect(screen.queryByRole("group", { name: "Second" })).toBeNull());
        expect(toastOf(document.activeElement)).toBe("First");
    });

    it("returns focus to where it came from when the only toast is dismissed", async () => {
        const user = userEvent.setup();
        const opener = outsideButton("Archive");
        try {
            render(Toaster);
            pushToast({ message: "Archived", duration: 0, action: undo() });
            const action = await screen.findByRole("button", { name: "Undo" });

            opener.focus();
            action.focus();
            await user.keyboard("{Enter}");
            await waitFor(() => expect(screen.queryByRole("group")).toBeNull());
            expect(document.activeElement).toBe(opener);
        } finally {
            opener.remove();
        }
    });

    it("leaves focus alone when a toast other than the focused one goes", async () => {
        render(Toaster);
        const first = pushToast({ title: "First", message: "1", duration: 0 });
        pushToast({ title: "Second", message: "2", duration: 0 });
        const dismiss = (await screen.findAllByRole("button", { name: "Dismiss notification" }))[1];

        dismiss.focus();
        toastStore.dismiss(first);
        await waitFor(() => expect(screen.queryByRole("group", { name: "First" })).toBeNull());
        expect(document.activeElement).toBe(dismiss);
    });

    it("does not take focus when a toast goes while focus is outside the region", async () => {
        const opener = outsideButton("Archive");
        try {
            render(Toaster);
            const id = pushToast({ message: "Archived", duration: 0 });
            await screen.findByRole("group");
            opener.focus();
            toastStore.dismiss(id);
            await waitFor(() => expect(screen.queryByRole("group")).toBeNull());
            expect(document.activeElement).toBe(opener);
        } finally {
            opener.remove();
        }
    });
});

describe("Toaster action reachability (QA-3)", () => {
    // Was QA-3 finding 3: nothing pauses the timer while a keyboard user tabs
    // towards the toast, so with the default (14s then) the action was gone first.
    it("does not auto-dismiss a toast with an action and no duration", async () => {
        vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
        render(Toaster);
        pushToast({ message: "File deleted", action: undo() });

        const toast = await screen.findByRole("group");
        expect(toast.querySelector("[data-toast-countdown]")).toBeNull();
        vi.advanceTimersByTime(60_000);
        expect(screen.getByRole("button", { name: "Undo" })).toBeTruthy();
    });

    it("still honours an explicit duration on a toast with an action", async () => {
        vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
        render(Toaster);
        pushToast({ message: "File deleted", duration: 2000, action: undo() });

        const toast = await screen.findByRole("group");
        await waitFor(() => expect(toast.textContent).toContain("2 seconds"));
        vi.advanceTimersByTime(2000);
        await waitFor(() => expect(screen.queryByRole("group")).toBeNull());
    });

    // The default was 14s until toasts got named lengths; it is "medium", 7s (tests/toast-timing.test.ts).
    it("keeps the 7s default for a toast without an action", async () => {
        render(Toaster);
        pushToast({ message: "Saved" });
        const toast = await screen.findByRole("group");
        await waitFor(() => expect(toast.textContent).toContain("7 seconds"));
    });

    it("is a named region, and focusToasts() moves focus to the newest toast's action", async () => {
        const opener = outsideButton("Archive");
        try {
            render(Toaster);
            expect(focusToasts()).toBe(false);

            pushToast({ title: "First", message: "1", duration: 0 });
            pushToast({ title: "Second", message: "2", action: undo() });
            await screen.findByRole("button", { name: "Undo" });
            expect(screen.getByRole("region", { name: "Notifications" })).toBeTruthy();

            opener.focus();
            expect(focusToasts()).toBe(true);
            expect(document.activeElement).toBe(screen.getByRole("button", { name: "Undo" }));
        } finally {
            opener.remove();
        }
    });

    it("focusToasts() lands on a control of a toast that has no action", async () => {
        render(Toaster);
        pushToast({ title: "Only", message: "1", duration: 0 });
        await screen.findByRole("group", { name: "Only" });

        expect(focusToasts()).toBe(true);
        expect(toastOf(document.activeElement)).toBe("Only");
    });
});

describe("Toaster motion (QA-3)", () => {
    it("does not fly in or out under prefers-reduced-motion", async () => {
        const animate = vi.spyOn(Element.prototype, "animate");
        vi.stubGlobal(
            "matchMedia",
            (query: string) =>
                ({
                    matches: query.includes("prefers-reduced-motion"),
                    media: query,
                    addEventListener() {},
                    removeEventListener() {},
                }) as unknown as MediaQueryList,
        );
        try {
            render(Toaster);
            const id = pushToast({ message: "Saved", duration: 0 });
            await screen.findByRole("group");
            toastStore.dismiss(id);
            await waitFor(() => expect(screen.queryByRole("group")).toBeNull());
            const moving = animate.mock.calls.filter(
                ([, options]) => Number((options as KeyframeAnimationOptions)?.duration) > 0,
            );
            expect(moving).toEqual([]);
        } finally {
            vi.unstubAllGlobals();
        }
    });
});
