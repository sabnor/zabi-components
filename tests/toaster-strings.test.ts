import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import Toast from "../src/components/atoms/Toast.svelte";
import Alert from "../src/components/molecules/Alert.svelte";
import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store";
import { DEFAULT_TOASTER_STRINGS, type ToasterStrings } from "../src/components/util/toaster";

/**
 * What a toast says, and in whose words. An app pushes a message in its own
 * language; the toaster used to put an English heading over it, hide the
 * message until "Expand details" was pressed, and count down in English under
 * it. These hold the toast to showing what it was given, and every word the
 * library adds by itself to being replaceable.
 */

const LIVE_REGION = '[role="status"], [role="alert"], [aria-live]';

beforeAll(() => {
    // jsdom has no Web Animations API; a toast's transition needs a minimal stub.
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
});

const toast = () => document.querySelector<HTMLElement>("[data-toast-id]")!;
/** True when the element is in the page for the eye too: nothing above it is visually hidden. */
const seen = (element: Element) => element.closest(".sr-only") === null;

async function shown() {
    await waitFor(() => expect(toast()).not.toBeNull());
    return toast();
}

describe("what a toast shows", () => {
    it("a message alone is the visible text: no default heading over it, nothing to expand", async () => {
        render(Toaster);
        pushToast({ message: "Utkastet är sparat.", type: "success", duration: 0 });
        const card = await shown();

        const line = within(card).getByText("Utkastet är sparat.");
        expect(seen(line), "Visible, not for screen readers only").toBe(true);
        expect(card.textContent).not.toContain("Changes saved");
        expect(card.querySelector("h4"), "A sentence, not a heading").toBeNull();
        expect(card.getAttribute("aria-label")).toBe("Utkastet är sparat.");
        expect(within(card).queryByRole("button", { name: "Expand details" })).toBeNull();
        expect(within(card).getAllByRole("button").map((button) => button.getAttribute("aria-label"))).toEqual([
            "Dismiss notification",
        ]);
        // It is what is announced.
        expect(within(card).getByRole("status").textContent?.trim()).toBe("Utkastet är sparat.");
    });

    it("a title and a message: the title is the heading and the message the visible line under it", async () => {
        render(Toaster);
        pushToast({ title: "Sparat", message: "Utkastet finns kvar till i morgon.", type: "success", duration: 0 });
        const card = await shown();

        expect(card.querySelector("h4")?.textContent?.trim()).toBe("Sparat");
        const line = within(card).getByText("Utkastet finns kvar till i morgon.");
        expect(seen(line)).toBe(true);
        expect(line.tagName).toBe("P");
        expect(card.getAttribute("aria-label")).toBe("Sparat");
        expect(within(card).getByRole("status").contains(line)).toBe(true);
        expect(within(card).queryByRole("button", { name: "Expand details" })).toBeNull();
    });

    it("a message that repeats the title is shown once", async () => {
        render(Toaster);
        pushToast({ title: "Sparat", message: "Sparat", duration: 0 });
        const card = await shown();
        expect(within(card).getAllByText("Sparat")).toHaveLength(1);
    });

    it.each([
        ["success", "Changes saved"],
        ["error", "Something went wrong"],
        ["warning", "Please review"],
        ["info", "Notice"],
    ] as const)("with neither, a %s toast says the default for its type", async (type, title) => {
        render(Toaster);
        pushToast({ message: "", type, duration: 0 });
        const card = await shown();
        expect(card.querySelector("h4")?.textContent?.trim()).toBe(title);
        expect(card.getAttribute("aria-label")).toBe(title);
    });

    it("an error is an alert, the rest are status", async () => {
        render(Toaster);
        pushToast({ message: "Det gick inte att spara.", type: "error", duration: 0 });
        const card = await shown();
        expect(within(card).getByRole("alert").textContent).toContain("Det gick inte att spara.");
    });

    it("details are the part that opens: only a toast with `detail` has the control", async () => {
        render(Toaster);
        pushToast({
            message: "Det gick inte att spara.",
            detail: "Servern svarade inte inom tio sekunder.",
            type: "error",
            duration: 0,
        });
        const card = await shown();
        expect(within(card).getByText("Det gick inte att spara.")).toBeTruthy();
        expect(card.textContent).not.toContain("Servern svarade inte");

        const expand = within(card).getByRole("button", { name: "Expand details" });
        expect(expand.getAttribute("aria-expanded")).toBe("false");
        await fireEvent.click(expand);
        expect(within(card).getByText("Servern svarade inte inom tio sekunder.")).toBeTruthy();
        expect(within(card).getByRole("button", { name: "Collapse details" }).getAttribute("aria-expanded")).toBe(
            "true",
        );
        await fireEvent.click(within(card).getByRole("button", { name: "Okay" }));
        await waitFor(() => expect(card.textContent).not.toContain("Servern svarade inte"));
    });
});

describe("the time a toast has left", () => {
    it("by default there is no sentence and no stop button to see, and the time is there for a screen reader", async () => {
        render(Toaster);
        pushToast({ message: "Sparat", duration: 5000 });
        const card = await shown();

        const countdown = await waitFor(() => {
            const found = card.querySelector("[data-toast-countdown]");
            expect(found).not.toBeNull();
            return found!;
        });
        expect(countdown.textContent?.trim()).toBe("This message will close in 5 seconds.");
        expect(seen(countdown), "For a screen reader only").toBe(false);
        // Found when the toast is read; not spoken again every second.
        expect(countdown.closest(LIVE_REGION)).toBeNull();
        expect(countdown.hasAttribute("aria-live")).toBe(false);
        expect(within(card).queryByRole("button", { name: "Click to stop" })).toBeNull();
        expect(within(card).getAllByRole("button")).toHaveLength(1);
        // The bar is still there for the eye, and says nothing.
        expect(card.querySelector('[aria-hidden="true"].absolute')).not.toBeNull();
    });

    it("showCountdown brings the sentence and the stop button back", async () => {
        render(Toaster, { showCountdown: true });
        pushToast({ message: "Sparat", duration: 5000 });
        const card = await shown();
        const countdown = await waitFor(() => {
            const found = card.querySelector("[data-toast-countdown]");
            expect(found).not.toBeNull();
            return found!;
        });
        expect(seen(countdown)).toBe(true);
        expect(countdown.textContent).toContain("This message will close in 5 seconds.");
        expect(countdown.closest(LIVE_REGION)).toBeNull();
        await fireEvent.click(within(card).getByRole("button", { name: "Click to stop" }));
        await waitFor(() => expect(card.querySelector("[data-toast-countdown]")).toBeNull());
        expect(toast(), "Stopped, the toast stays").not.toBeNull();
    });

    it("still closes by itself, and waits while it is hovered", async () => {
        vi.useFakeTimers();
        render(Toaster);
        pushToast({ message: "Sparat", duration: 3000 });
        await vi.advanceTimersByTimeAsync(50);
        const card = toast();
        card.dispatchEvent(new MouseEvent("mouseenter"));
        await vi.advanceTimersByTimeAsync(10_000);
        expect(toast(), "Held by the pointer").not.toBeNull();
        expect(card.querySelector("[data-toast-countdown]")?.textContent).toContain("Paused");
        card.dispatchEvent(new MouseEvent("mouseleave"));
        await vi.advanceTimersByTimeAsync(4_000);
        expect(document.querySelector("[data-toast-id]")).toBeNull();
    });
});

describe("the pause state", () => {
    it("is `data-paused` on the toast and is reported through onpausechange, with the toast's id", async () => {
        const onpausechange = vi.fn();
        render(Toaster, { onpausechange });
        const id = pushToast({ message: "Sparat", duration: 5000 });
        const card = await shown();
        expect(card.getAttribute("data-paused")).toBe("false");
        expect(onpausechange, "Nothing is reported until it changes").not.toHaveBeenCalled();

        card.dispatchEvent(new MouseEvent("mouseenter"));
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("true"));
        expect(onpausechange).toHaveBeenLastCalledWith({ id, paused: true });

        card.dispatchEvent(new MouseEvent("mouseleave"));
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("false"));
        expect(onpausechange).toHaveBeenLastCalledWith({ id, paused: false });

        within(card).getByRole("button", { name: "Dismiss notification" }).focus();
        await waitFor(() => expect(onpausechange).toHaveBeenLastCalledWith({ id, paused: true }));
        expect(onpausechange).toHaveBeenCalledTimes(3);
    });
});

/** Every word replaced by something no default contains. */
const SENTINEL: ToasterStrings = {
    regionLabel: "¤region",
    successTitle: "¤success",
    errorTitle: "¤error",
    warningTitle: "¤warning",
    infoTitle: "¤info",
    closesIn: (seconds) => `¤closes ${seconds}`,
    pausedClosesIn: (seconds) => `¤paused ${seconds}`,
    stop: "¤stop",
    okay: "¤okay",
    expand: "¤expand",
    collapse: "¤collapse",
    dismiss: "¤dismiss",
    actionAvailable: (label) => `¤has ${label}`,
};

/** Every English word or sentence the library would say by itself. */
const ENGLISH = [
    ...Object.values(DEFAULT_TOASTER_STRINGS).map((value) =>
        typeof value === "function" ? (value as (input: never) => string)("¤" as never).replace("¤", "").trim() : value,
    ),
    "Close notification",
    "Dismiss alert",
    "seconds",
    "available",
    "Paused",
];

/** All the text and every accessible name under `root`, as one string. */
function everythingSaid(root: ParentNode): string {
    const names = [...root.querySelectorAll("*")].flatMap((element) =>
        ["aria-label", "title", "alt", "placeholder", "aria-description", "aria-roledescription"].map(
            (attribute) => element.getAttribute(attribute) ?? "",
        ),
    );
    return [root.textContent ?? "", ...names].join(" | ");
}

describe("no English an app cannot replace", () => {
    it("guards the guard: with no strings, the defaults are what is said", async () => {
        render(Toaster, { showCountdown: true });
        pushToast({ message: "", type: "success", duration: 5000, detail: "x", action: { label: "Ångra", onclick() {} } });
        const card = await shown();
        await waitFor(() => expect(card.querySelector("[data-toast-countdown]")).not.toBeNull());
        const said = everythingSaid(document.body);
        for (const word of ["Notifications", "Changes saved", "Dismiss notification", "Expand details", "Click to stop", "available"]) {
            expect(said, word).toContain(word);
        }
    });

    it.each([false, true])("Toaster with strings (showCountdown: %s): every toast, opened and paused", async (showCountdown) => {
        render(Toaster, { strings: SENTINEL, showCountdown });
        for (const type of ["success", "error", "warning", "info"] as const) {
            pushToast({ message: "", type, duration: 9000, detail: "detalj", action: { label: "Ångra", onclick() {} } });
        }
        pushToast({ message: "Utkastet är sparat.", type: "success" });
        pushToast({ title: "Sparat", message: "Allt är sparat.", type: "info", duration: 0 });
        await waitFor(() => expect(document.querySelectorAll("[data-toast-id]")).toHaveLength(6));
        await waitFor(() => expect(document.querySelectorAll("[data-toast-countdown]").length).toBeGreaterThan(0));
        for (const expand of screen.getAllByRole("button", { name: "¤expand" })) await fireEvent.click(expand);
        // One of them paused, so that sentence is said too.
        document.querySelector("[data-toast-id]")!.dispatchEvent(new MouseEvent("mouseenter"));
        await waitFor(() => expect(document.body.textContent).toContain("¤paused"));

        const said = everythingSaid(document.body);
        for (const word of ENGLISH) expect(said, `"${word}" is still said`).not.toContain(word);
        // And each of the app's words is in use.
        for (const word of ["¤region", "¤success", "¤error", "¤warning", "¤info", "¤closes", "¤paused", "¤okay", "¤collapse", "¤dismiss", "¤has Ångra"]) {
            expect(said, word).toContain(word);
        }
        if (showCountdown) expect(said).toContain("¤stop");
        expect(screen.getByRole("region", { name: "¤region" })).toBeTruthy();
    });

    it("aria-label on the Toaster names the region, and wins over strings.regionLabel", () => {
        render(Toaster, { "aria-label": "Aviseringar", strings: { regionLabel: "¤region" } });
        expect(screen.getByRole("region", { name: "Aviseringar" })).toBeTruthy();
        expect(screen.queryByRole("region", { name: "¤region" })).toBeNull();
    });

    it("strings can be given in part: the rest stay as they are", async () => {
        render(Toaster, { strings: { dismiss: "Stäng aviseringen" } });
        pushToast({ message: "Sparat", duration: 0 });
        const card = await shown();
        expect(within(card).getByRole("button", { name: "Stäng aviseringen" })).toBeTruthy();
        expect(screen.getByRole("region", { name: "Notifications" })).toBeTruthy();
    });

    it("Toast: closeLabel names the close button", () => {
        const { unmount } = render(Toast, { message: "Rundan börjar.", closeLabel: "¤close" });
        expect(screen.getByRole("button", { name: "¤close" })).toBeTruthy();
        for (const word of ENGLISH) expect(everythingSaid(document.body), word).not.toContain(word);
        unmount();
        render(Toast, { message: "Rundan börjar." });
        expect(screen.getByRole("button", { name: "Close notification" }), "The default is kept").toBeTruthy();
    });

    it("Alert: closeLabel names the dismiss button", () => {
        const { unmount } = render(Alert, { title: "Obs", message: "Rundan är slut.", closable: true, closeLabel: "¤close" });
        expect(screen.getByRole("button", { name: "¤close" })).toBeTruthy();
        for (const word of ENGLISH) expect(everythingSaid(document.body), word).not.toContain(word);
        unmount();
        render(Alert, { title: "Obs", message: "Rundan är slut.", closable: true });
        expect(screen.getByRole("button", { name: "Dismiss alert" }), "The default is kept").toBeTruthy();
    });
});
