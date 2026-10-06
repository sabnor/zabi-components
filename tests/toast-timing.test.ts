import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import { tick } from "svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store";

/**
 * How long a toast stays, and what holds it.
 *
 * An app says how long in words: short, medium, long, or persistent. When it
 * says nothing, the toaster decides from what the toast is: an error and a
 * toast with an action stay until dismissed, a long text gets the long time,
 * a longer one stays too, everything else gets the medium one. What the app
 * says always wins. Short is 3 seconds, medium 7, long 14.
 *
 * A finger on a toast holds its timer for as long as it is there. It used to
 * do nothing while held and to stop the timer for good once lifted, because
 * the only thing listened for was the `mouseenter` a browser makes up after a
 * tap.
 */

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

const fakeTheTimer = () => vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });

const toast = () => document.querySelector<HTMLElement>("[data-toast-id]")!;
async function shown() {
    await waitFor(() => expect(toast()).not.toBeNull());
    return toast();
}

/** The seconds the toast says it has left, or null when it has no timer. */
function secondsLeft(card: HTMLElement): number | null {
    const sentence = card.querySelector("[data-toast-countdown]")?.textContent;
    if (!sentence) return null;
    return Number(/(\d+) seconds?/.exec(sentence)?.[1]);
}

/** One second of the timer, with the rendering that follows it. */
async function pass(seconds: number) {
    for (let second = 0; second < seconds; second += 1) {
        vi.advanceTimersByTime(1000);
        await Promise.resolve();
    }
}

const chars = (count: number) => "a".repeat(count);

/**
 * A pointer event as a browser sends it. jsdom's own `PointerEvent` is not
 * relied on: the type of pointer is what matters here, and it is set by hand.
 * `enter` and `leave` do not bubble, as in a browser.
 */
function pointer(target: Element, type: string, pointerType: "touch" | "mouse" | "pen") {
    const event = new MouseEvent(type, { bubbles: !/enter$|leave$/.test(type), cancelable: true });
    Object.defineProperty(event, "pointerType", { value: pointerType });
    target.dispatchEvent(event);
}

/** What a browser sends for a finger put down on an element... */
function fingerDown(target: Element) {
    pointer(target, "pointerover", "touch");
    pointer(target, "pointerenter", "touch");
    pointer(target, "pointerdown", "touch");
}

/** ...and for lifting it: the pointer goes, then the mouse events made up for the tap. */
function fingerUp(target: Element) {
    pointer(target, "pointerup", "touch");
    pointer(target, "pointerout", "touch");
    pointer(target, "pointerleave", "touch");
    target.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    target.dispatchEvent(new MouseEvent("mouseenter"));
    target.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
    target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    target.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
}

/**
 * A tap. The finger goes down in one task and comes up in a later one, as on
 * a screen: what the toast does about the first is done before the second.
 */
async function tap(target: Element) {
    fingerDown(target);
    await tick();
    fingerUp(target);
    await tick();
}

describe("the length of a toast, when the app says nothing", () => {
    it.each([
        ["a short message", { message: "Draft saved." }, 7],
        ["a success", { message: "Draft saved.", type: "success" }, 7],
        ["a warning", { message: "The disk is nearly full.", type: "warning" }, 7],
        ["120 characters, which is not yet long", { message: chars(120) }, 7],
        ["121 characters", { message: chars(121) }, 14],
        ["a title and a message of 121 together", { title: chars(21), message: chars(100) }, 14],
        ["a title and a message of 120 together", { title: chars(20), message: chars(100) }, 7],
        ["240 characters, the most that still closes by itself", { message: chars(240) }, 14],
        ["a title and a message of 240 together", { title: chars(40), message: chars(200) }, 14],
        ["a long detail behind its button, which is not visible text", { message: "Could not sync.", detail: chars(300) }, 7],
    ] as const)("%s: %s", async (_name, options, seconds) => {
        render(Toaster);
        pushToast({ ...options });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).toBe(seconds));
    });

    it("an error stays until it is dismissed", async () => {
        render(Toaster);
        pushToast({ message: "Could not save the draft.", type: "error" });
        const card = await shown();
        await Promise.resolve();
        expect(secondsLeft(card)).toBeNull();
    });

    it.each([
        ["241 characters", { message: chars(241) }],
        ["a title and a message of 241 together", { title: chars(41), message: chars(200) }],
    ] as const)("%s stays until it is dismissed: long is too short to read it in", async (_name, options) => {
        render(Toaster);
        pushToast({ ...options });
        const card = await shown();
        await Promise.resolve();
        expect(secondsLeft(card)).toBeNull();
    });

    it("a toast with an action stays until it is dismissed, as before", async () => {
        render(Toaster);
        pushToast({ message: "Round archived.", action: { label: "Undo", onclick: () => {} } });
        const card = await shown();
        await Promise.resolve();
        expect(secondsLeft(card)).toBeNull();
    });

    it("closes by itself when the time is up", async () => {
        fakeTheTimer();
        render(Toaster);
        pushToast({ message: "Draft saved." });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).toBe(7));
        await pass(6);
        await waitFor(() => expect(secondsLeft(card)).toBe(1));
        expect(toastStore_length()).toBe(1);
        await pass(1);
        await waitFor(() => expect(toastStore_length()).toBe(0));
    });
});

function toastStore_length(): number {
    let length = 0;
    toastStore.subscribe((list) => (length = list.length))();
    return length;
}

describe("the length of a toast, when the app says it", () => {
    it.each([
        ["short", 3],
        ["medium", 7],
        ["long", 14],
    ] as const)('duration: "%s" is %s seconds', async (duration, seconds) => {
        render(Toaster);
        pushToast({ message: "Draft saved.", duration });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).toBe(seconds));
    });

    it('"persistent" stays until it is dismissed, and so does 0', async () => {
        render(Toaster);
        pushToast({ message: "One", duration: "persistent" });
        pushToast({ message: "Two", duration: 0 });
        await waitFor(() => expect(document.querySelectorAll("[data-toast-id]")).toHaveLength(2));
        await Promise.resolve();
        for (const card of document.querySelectorAll<HTMLElement>("[data-toast-id]")) {
            expect(secondsLeft(card)).toBeNull();
        }
    });

    it("a number is still milliseconds", async () => {
        render(Toaster);
        pushToast({ message: "Draft saved.", duration: 3000 });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).toBe(3));
    });

    it("wins over what the toast is: short on an error, on a toast with an action, on a long text", async () => {
        render(Toaster);
        pushToast({ message: "Could not save.", type: "error", duration: "short" });
        pushToast({ message: "Archived.", duration: "short", action: { label: "Undo", onclick: () => {} } });
        pushToast({ message: chars(300), duration: "short" });
        await waitFor(() => expect(document.querySelectorAll("[data-toast-id]")).toHaveLength(3));
        for (const card of document.querySelectorAll<HTMLElement>("[data-toast-id]")) {
            await waitFor(() => expect(secondsLeft(card)).toBe(3));
        }
    });

    it("a long text given medium keeps medium: nothing is scaled", async () => {
        render(Toaster);
        pushToast({ message: chars(200), duration: "medium" });
        pushToast({ message: chars(300), duration: "medium" });
        await waitFor(() => expect(document.querySelectorAll("[data-toast-id]")).toHaveLength(2));
        for (const card of document.querySelectorAll<HTMLElement>("[data-toast-id]")) {
            await waitFor(() => expect(secondsLeft(card)).toBe(7));
        }
    });
});

describe("defaultDuration on the Toaster", () => {
    it("is what a toast without a duration gets, in place of medium", async () => {
        render(Toaster, { defaultDuration: "short" });
        pushToast({ message: "Draft saved." });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).toBe(3));
    });

    it("takes a number of milliseconds too", async () => {
        render(Toaster, { defaultDuration: 30000 });
        pushToast({ message: "Draft saved." });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).toBe(30));
    });

    it("leaves an error and a toast with an action until they are dismissed", async () => {
        render(Toaster, { defaultDuration: "short" });
        pushToast({ message: "Could not save.", type: "error" });
        pushToast({ message: "Archived.", action: { label: "Undo", onclick: () => {} } });
        await waitFor(() => expect(document.querySelectorAll("[data-toast-id]")).toHaveLength(2));
        await Promise.resolve();
        for (const card of document.querySelectorAll<HTMLElement>("[data-toast-id]")) {
            expect(secondsLeft(card)).toBeNull();
        }
    });

    it("does not shorten a long text: that still gets long, or the default when the default is longer", async () => {
        const { unmount } = render(Toaster, { defaultDuration: "short" });
        pushToast({ message: chars(200) });
        await waitFor(() => expect(secondsLeft(toast())).toBe(14));
        toastStore.clear();
        unmount();

        render(Toaster, { defaultDuration: 30000 });
        pushToast({ message: chars(200) });
        await waitFor(() => expect(toast()).not.toBeNull());
        await waitFor(() => expect(secondsLeft(toast())).toBe(30));
    });

    it.each(["short", "long", 30000] as const)(
        "does not time a text of more than 240 characters: with %s it still stays",
        async (defaultDuration) => {
            render(Toaster, { defaultDuration });
            pushToast({ message: chars(241) });
            const card = await shown();
            await Promise.resolve();
            expect(secondsLeft(card)).toBeNull();
        },
    );

    it('"persistent" keeps every toast until it is dismissed, a long one too', async () => {
        render(Toaster, { defaultDuration: "persistent" });
        pushToast({ message: "Draft saved." });
        pushToast({ message: chars(200) });
        await waitFor(() => expect(document.querySelectorAll("[data-toast-id]")).toHaveLength(2));
        await Promise.resolve();
        for (const card of document.querySelectorAll<HTMLElement>("[data-toast-id]")) {
            expect(secondsLeft(card)).toBeNull();
        }
    });

    it("does not replace what the app said for one toast", async () => {
        render(Toaster, { defaultDuration: "short" });
        pushToast({ message: "Draft saved.", duration: "long" });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).toBe(14));
    });
});

describe("a finger on a toast", () => {
    async function timed(duration: number | string = 14000) {
        fakeTheTimer();
        const onpausechange = vi.fn();
        render(Toaster, { onpausechange });
        pushToast({ message: "The export could not be finished.", type: "warning", duration: duration as number });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).not.toBeNull());
        const said = () => onpausechange.mock.calls.map(([detail]) => (detail.paused ? "paused" : "running")).join(",");
        return { card, said };
    }

    it("holds the timer for as long as it is down, and lets it run when it lifts", async () => {
        const { card, said } = await timed();
        await pass(1);
        await waitFor(() => expect(secondsLeft(card)).toBe(13));

        const text = within(card).getByText("The export could not be finished.");
        fingerDown(text);
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("true"));
        await pass(3);
        expect(secondsLeft(card), "Held: nothing counted").toBe(13);
        expect(card.getAttribute("data-paused")).toBe("true");

        fingerUp(text);
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("false"));
        await pass(3);
        await waitFor(() => expect(secondsLeft(card)).toBe(10));
        expect(card.getAttribute("data-paused"), "The mouse events after a tap hold nothing").toBe("false");
        expect(said(), "Each change once").toBe("paused,running");
    });

    it("a tap neither pauses for good nor dismisses", async () => {
        const { card, said } = await timed();
        const text = within(card).getByText("The export could not be finished.");
        await tap(text);
        await waitFor(() => expect(said()).toBe("paused,running"));
        expect(card.getAttribute("data-paused")).toBe("false");
        await pass(2);
        await waitFor(() => expect(secondsLeft(card)).toBe(12));
        expect(card.isConnected).toBe(true);
        expect(said()).toBe("paused,running");
    });

    it("lifted in the last seconds, leaves at least three: a short toast starts again", async () => {
        const { card } = await timed("short");
        await pass(2);
        await waitFor(() => expect(secondsLeft(card)).toBe(1));
        const text = within(card).getByText("The export could not be finished.");
        fingerDown(text);
        await pass(4);
        expect(secondsLeft(card)).toBe(1);
        fingerUp(text);
        await waitFor(() => expect(secondsLeft(card)).toBe(3));
        await pass(2);
        await waitFor(() => expect(secondsLeft(card)).toBe(1));
        expect(card.isConnected).toBe(true);
    });

    it("lifted with more than three seconds left, takes nothing and adds nothing", async () => {
        const { card } = await timed();
        const text = within(card).getByText("The export could not be finished.");
        await tap(text);
        await Promise.resolve();
        expect(secondsLeft(card)).toBe(14);
    });

    it("a touch the browser takes for itself (a scroll) lets the timer run again", async () => {
        const { card, said } = await timed();
        fingerDown(card);
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("true"));
        pointer(card, "pointercancel", "touch");
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("false"));
        expect(said()).toBe("paused,running");
    });

    it("does not make a persistent toast count", async () => {
        render(Toaster);
        pushToast({ message: "Could not save.", type: "error" });
        const card = await shown();
        await tap(card);
        await Promise.resolve();
        expect(secondsLeft(card)).toBeNull();
    });
});

describe("the other pointers", () => {
    async function timed() {
        fakeTheTimer();
        const onpausechange = vi.fn();
        render(Toaster, { onpausechange });
        pushToast({ message: "Draft saved.", duration: 14000 });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).toBe(14));
        const said = () => onpausechange.mock.calls.map(([detail]) => (detail.paused ? "paused" : "running")).join(",");
        return { card, said };
    }

    it("a mouse holds the timer while it is over the toast; pressing and releasing changes nothing", async () => {
        const { card, said } = await timed();
        pointer(card, "pointerenter", "mouse");
        card.dispatchEvent(new MouseEvent("mouseenter"));
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("true"));
        pointer(card, "pointerdown", "mouse");
        pointer(card, "pointerup", "mouse");
        await pass(2);
        expect(card.getAttribute("data-paused"), "Still over it").toBe("true");
        expect(secondsLeft(card)).toBe(14);

        pointer(card, "pointerleave", "mouse");
        card.dispatchEvent(new MouseEvent("mouseleave"));
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("false"));
        expect(said()).toBe("paused,running");
    });

    it("a mouse on a touch laptop still hovers after a finger has been on the toast", async () => {
        const { card, said } = await timed();
        await tap(card);
        await waitFor(() => expect(said()).toBe("paused,running"));

        pointer(card, "pointerenter", "mouse");
        card.dispatchEvent(new MouseEvent("mouseenter"));
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("true"));
        pointer(card, "pointerleave", "mouse");
        card.dispatchEvent(new MouseEvent("mouseleave"));
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("false"));
        expect(said()).toBe("paused,running,paused,running");
    });

    it("a stylus holds the timer while it is over or on the toast, and lets go when it leaves", async () => {
        const { card, said } = await timed();
        // In range above the screen, then down, then up, still in range.
        pointer(card, "pointerenter", "pen");
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("true"));
        pointer(card, "pointerdown", "pen");
        pointer(card, "pointerup", "pen");
        await pass(2);
        expect(card.getAttribute("data-paused")).toBe("true");
        expect(secondsLeft(card)).toBe(14);
        pointer(card, "pointerleave", "pen");
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("false"));
        expect(said()).toBe("paused,running");
    });

    it("keyboard focus holds it as before, and a finger lifted meanwhile does not let it go", async () => {
        const { card, said } = await timed();
        within(card).getByRole("button", { name: "Dismiss notification" }).focus();
        await waitFor(() => expect(card.getAttribute("data-paused")).toBe("true"));
        await tap(card);
        await pass(2);
        expect(card.getAttribute("data-paused")).toBe("true");
        expect(secondsLeft(card)).toBe(14);
        expect(said()).toBe("paused");
    });
});

describe("a toast of three seconds", () => {
    it("says so in the sentence a screen reader finds, and in the one shown with showCountdown", async () => {
        const { unmount } = render(Toaster);
        pushToast({ message: "Saved", duration: "short" });
        const hidden = (await shown()).querySelector("[data-toast-countdown]")!;
        await waitFor(() => expect(hidden.textContent?.trim()).toBe("This message will close in 3 seconds."));
        expect(hidden.closest(".sr-only")).not.toBeNull();
        toastStore.clear();
        unmount();

        render(Toaster, { showCountdown: true });
        pushToast({ message: "Saved", duration: "short" });
        await waitFor(() => expect(toast()).not.toBeNull());
        const sentence = toast().querySelector("[data-toast-countdown]")!;
        await waitFor(() => expect(sentence.textContent).toContain("This message will close in 3 seconds."));
        expect(sentence.closest(".sr-only"), "Visible").toBeNull();
        expect(within(toast()).getByRole("button", { name: "Click to stop" })).toBeTruthy();
    });

    it("is announced with its text in place from the start, and is gone after three seconds", async () => {
        fakeTheTimer();
        render(Toaster);
        pushToast({ message: "Saved", type: "success", duration: "short" });
        const card = await shown();
        // The live region is inserted with its text: nothing arrives later that a reader would miss.
        const live = card.querySelector('[role="status"]')!;
        expect(live.getAttribute("aria-atomic")).toBe("true");
        expect(live.textContent?.trim()).toBe("Saved");
        await waitFor(() => expect(secondsLeft(card)).toBe(3));
        await pass(2);
        await waitFor(() => expect(secondsLeft(card)).toBe(1));
        expect(toastStore_length()).toBe(1);
        await pass(1);
        await waitFor(() => expect(toastStore_length()).toBe(0));
        await waitFor(() => expect(document.querySelector("[data-toast-id]")).toBeNull());
    });

    it("counts by itself while another toast is held: each toast has its own timer", async () => {
        fakeTheTimer();
        render(Toaster);
        pushToast({ message: "The export could not be finished.", type: "warning", duration: "long" });
        const first = await shown();
        await waitFor(() => expect(secondsLeft(first)).toBe(14));
        fingerDown(first);
        await waitFor(() => expect(first.getAttribute("data-paused")).toBe("true"));

        pushToast({ message: "Saved", duration: "short" });
        await waitFor(() => expect(document.querySelectorAll("[data-toast-id]")).toHaveLength(2));
        const second = document.querySelectorAll<HTMLElement>("[data-toast-id]")[1];
        await waitFor(() => expect(secondsLeft(second)).toBe(3));
        expect(second.getAttribute("data-paused")).toBe("false");

        await pass(3);
        await waitFor(() => expect(toastStore_length()).toBe(1));
        expect(first.isConnected).toBe(true);
        expect(first.getAttribute("data-paused")).toBe("true");
        expect(secondsLeft(first), "Still held, nothing counted").toBe(14);
    });

    it("held in its last second and let go, has its three seconds again", async () => {
        fakeTheTimer();
        render(Toaster);
        pushToast({ message: "Saved", duration: "short" });
        const card = await shown();
        await waitFor(() => expect(secondsLeft(card)).toBe(3));
        await pass(2);
        await waitFor(() => expect(secondsLeft(card)).toBe(1));
        await tap(card);
        await waitFor(() => expect(secondsLeft(card)).toBe(3));
    });
});

describe("what QA found in a toast", () => {
    it("names the details with aria-controls only while they are in the page", async () => {
        render(Toaster);
        pushToast({ message: "Could not save.", detail: "The server did not answer.", duration: 0 });
        const card = await shown();
        const expand = within(card).getByRole("button", { name: "Expand details" });
        expect(expand.getAttribute("aria-expanded")).toBe("false");
        expect(expand.hasAttribute("aria-controls"), "Nothing to point at yet").toBe(false);

        expand.click();
        await waitFor(() => expect(expand.getAttribute("aria-expanded")).toBe("true"));
        const id = expand.getAttribute("aria-controls");
        expect(id).toBeTruthy();
        expect(document.getElementById(id!)?.textContent).toContain("The server did not answer.");
    });

    it("draws the status icon at 20px whatever the text size, as the padding beside it is px", async () => {
        render(Toaster);
        for (const type of ["success", "error", "warning", "info"] as const) pushToast({ message: type, type, duration: 0 });
        await waitFor(() => expect(document.querySelectorAll("[data-toast-id]")).toHaveLength(4));
        for (const card of document.querySelectorAll("[data-toast-id]")) {
            const icon = card.querySelector('[role="status"] svg, [role="alert"] svg')!;
            const classes = (icon.getAttribute("class") ?? "").split(/\s+/);
            expect(classes).toContain("size-[20px]");
            expect(classes).not.toContain("size-5");
        }
    });

    it("indents the action by the same px as the icon and its gap", async () => {
        render(Toaster);
        pushToast({ message: "Archived.", action: { label: "Undo", onclick: () => {} } });
        const card = await shown();
        const row = card.querySelector("[data-toast-action]")!.parentElement!;
        expect(row.className.split(/\s+/)).toContain("pl-[32px]");
    });

    it("still names the group by its first line, and screen.getByRole finds it", async () => {
        render(Toaster);
        pushToast({ title: "Saved", message: "Your answers were saved.", duration: 0 });
        expect(await screen.findByRole("group", { name: "Saved" })).toBeTruthy();
    });
});
