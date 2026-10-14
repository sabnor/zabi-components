import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { tick } from "svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store";

/**
 * The toast on a phone (Z-097 to Z-103): held by a pointer that moves onto it
 * and not by one it comes up under, dragged away by a touch, limited to what
 * fits, pushed without a close button, put in the page after it is mounted,
 * and set above what is docked at the bottom.
 */

beforeAll(() => {
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

const cards = () => [...document.querySelectorAll<HTMLElement>("[data-toast-id]")];
const card = () => cards()[0]!;

async function shown() {
    await waitFor(() => expect(cards().length).toBeGreaterThan(0));
    await waitFor(() => expect(card().querySelector("h4, p")?.textContent?.trim()).not.toBe(""));
    return card();
}

let clock = 1000;

/** A pointer event as a browser sends it; jsdom's own `PointerEvent` is not relied on. */
function pointer(
    target: Element,
    type: string,
    pointerType: "touch" | "mouse" | "pen",
    init: { x?: number; y?: number; move?: number } = {},
) {
    const event = new MouseEvent(type, {
        bubbles: !/enter$|leave$/.test(type),
        cancelable: true,
        clientX: init.x ?? 0,
        clientY: init.y ?? 0,
    });
    Object.defineProperty(event, "pointerType", { value: pointerType });
    Object.defineProperty(event, "pointerId", { value: 1 });
    Object.defineProperty(event, "isPrimary", { value: true });
    Object.defineProperty(event, "movementX", { value: init.move ?? 0 });
    // Events a hundred milliseconds apart: a drag in the same instant is a flick.
    Object.defineProperty(event, "timeStamp", { value: (clock += 100) });
    target.dispatchEvent(event);
}

describe("a toast that comes up under a pointer at rest (Z-098)", () => {
    it("is not held by the enter a browser sends, nor by a move of no distance", async () => {
        render(Toaster);
        pushToast({ message: "Saved", duration: "short" });
        const el = await shown();
        pointer(el, "pointerenter", "mouse");
        pointer(el, "pointermove", "mouse", { move: 0 });
        await tick();
        expect(el.getAttribute("data-paused")).toBe("false");
    });

    it("is held once the pointer moves over it, and let go when it leaves", async () => {
        render(Toaster);
        pushToast({ message: "Saved", duration: "short" });
        const el = await shown();
        pointer(el, "pointerenter", "mouse");
        pointer(el, "pointermove", "mouse", { move: 4 });
        await waitFor(() => expect(el.getAttribute("data-paused")).toBe("true"));
        pointer(el, "pointerleave", "mouse");
        await waitFor(() => expect(el.getAttribute("data-paused")).toBe("false"));
    });
});

describe("swiping a toast away (Z-099)", () => {
    async function swipe(el: Element, to: { x: number; y: number }) {
        pointer(el, "pointerdown", "touch", { x: 0, y: 0 });
        pointer(el, "pointermove", "touch", { x: to.x / 2, y: to.y / 2 });
        pointer(el, "pointermove", "touch", { x: to.x, y: to.y });
        pointer(el, "pointerup", "touch", { x: to.x, y: to.y });
        await tick();
    }

    it("a long drag sideways dismisses it, either way, and the close button is still there", async () => {
        render(Toaster);
        pushToast({ message: "Saved", duration: 0 });
        const el = await shown();
        expect(screen.getByRole("button", { name: "Dismiss notification" })).toBeTruthy();
        await swipe(el, { x: -200, y: 0 });
        await waitFor(() => expect(cards()).toHaveLength(0), { timeout: 1500 });
    });

    it("a short drag settles back", async () => {
        render(Toaster);
        pushToast({ message: "Saved", duration: 0 });
        const el = await shown();
        vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(300);
        await swipe(el, { x: 8, y: 1 });
        await new Promise((r) => setTimeout(r, 300));
        expect(cards()).toHaveLength(1);
        expect(el.style.transform).toBe("");
    });

    it("down dismisses a snackbar and does nothing in the stack, where a page scrolls", async () => {
        render(Toaster, { mode: "snackbar" });
        pushToast({ message: "Saved", duration: 0 });
        const el = await shown();
        await swipe(el, { x: 0, y: 200 });
        await waitFor(() => expect(cards()).toHaveLength(0), { timeout: 1500 });

        cleanup();
        toastStore.clear();
        render(Toaster);
        pushToast({ message: "Saved", duration: 0 });
        const again = await shown();
        await swipe(again, { x: 0, y: 200 });
        await new Promise((r) => setTimeout(r, 300));
        expect(cards()).toHaveLength(1);
    });

    it("swipeToDismiss={false} turns it off, a mouse does not drag, and a drag that starts on a button is the button's", async () => {
        render(Toaster, { swipeToDismiss: false });
        pushToast({ message: "Saved", duration: 0 });
        const el = await shown();
        await swipe(el, { x: -200, y: 0 });
        await new Promise((r) => setTimeout(r, 300));
        expect(cards()).toHaveLength(1);
        cleanup();
        toastStore.clear();
        render(Toaster);
        pushToast({ message: "Saved", duration: 0 });
        const next = await shown();
        pointer(next, "pointerdown", "mouse", { x: 0 });
        pointer(next, "pointermove", "mouse", { x: -200, move: 5 });
        pointer(next, "pointerup", "mouse", { x: -200 });
        await swipe(screen.getByRole("button", { name: "Dismiss notification" }), { x: -200, y: 0 });
        await new Promise((r) => setTimeout(r, 300));
        expect(cards()).toHaveLength(1);
    });
});

describe("how many show (Z-100)", () => {
    it("max drops the oldest timed toast, and never one that has to stay", async () => {
        render(Toaster, { max: 2 });
        pushToast({ message: "Offline", type: "error" });
        pushToast({ message: "One", duration: 0 });
        pushToast({ message: "Two", duration: "short" });
        pushToast({ message: "Three", duration: "short" });
        await waitFor(() => expect(cards()).toHaveLength(3));
        // The error stays; of the rest, the oldest ("One" is persistent, so it stays too).
        const ids = () => cards().map((c) => c.getAttribute("aria-label"));
        expect(ids()).toEqual(["Offline", "One", "Three"]);
    });

    it("the snackbar shows one at a time: a new toast replaces the one showing", async () => {
        render(Toaster, { mode: "snackbar" });
        pushToast({ message: "First", duration: "short" });
        await shown();
        pushToast({ message: "Second", duration: "short" });
        await waitFor(() => expect(cards()).toHaveLength(1));
        expect(card().getAttribute("aria-label")).toBe("Second");
    });

    it("mode=auto is the stack from 640px up and the snackbar below", async () => {
        const listeners = new Set<() => void>();
        const query = { matches: true, addEventListener: (_: string, f: () => void) => listeners.add(f), removeEventListener: (_: string, f: () => void) => listeners.delete(f) };
        vi.spyOn(window, "matchMedia").mockImplementation(() => query as unknown as MediaQueryList);
        render(Toaster, { mode: "auto" });
        pushToast({ message: "A", duration: "short" });
        pushToast({ message: "B", duration: "short" });
        await waitFor(() => expect(cards()).toHaveLength(1));
        query.matches = false;
        listeners.forEach((f) => f());
        pushToast({ message: "C", duration: "short" });
        pushToast({ message: "D", duration: "short" });
        await waitFor(() => expect(cards().length).toBeGreaterThan(1));
    });

    it("a push with the id of a toast that is showing replaces it in place, with its time started again", async () => {
        render(Toaster);
        pushToast({ id: "saved", message: "Saving", duration: 4000 });
        pushToast({ id: "other", message: "Other", duration: 0 });
        await shown();
        pushToast({ id: "saved", message: "Saved", duration: 4000 });
        await waitFor(() => expect(card().getAttribute("aria-label")).toBe("Saved"));
        expect(cards().map((c) => c.dataset.toastId)).toEqual(["saved", "other"]);
        expect(toastStore).toBeTruthy();
    });
});

describe("a toast without a close button (Z-101)", () => {
    it("closable: false on a short timed toast has no control and lets a tap through", async () => {
        render(Toaster, { mode: "snackbar" });
        pushToast({ message: "Saved", duration: "short", closable: false });
        const el = await shown();
        expect(el.querySelectorAll("button")).toHaveLength(0);
        expect(el.className).toContain("pointer-events-none");
        expect(el.className).not.toContain("pointer-events-auto");
    });

    it.each([
        ["an error", { type: "error" as const }],
        ["a toast that stays", { duration: "persistent" as const }],
        ["a toast with an action", { action: { label: "Undo", onclick() {} } }],
        ["a toast with details", { detail: "More" }],
    ])("is ignored for %s: the button is shown", async (_name, extra) => {
        render(Toaster);
        pushToast({ message: "Saved", closable: false, ...extra });
        await shown();
        expect(screen.getByRole("button", { name: "Dismiss notification" })).toBeTruthy();
    });

    it("is ignored under showCountdown, which has a button of its own", async () => {
        render(Toaster, { showCountdown: true });
        pushToast({ message: "Saved", duration: "short", closable: false });
        await shown();
        expect(screen.getByRole("button", { name: "Dismiss notification" })).toBeTruthy();
    });

    it("the snackbar is one row with its action beside the text, and a toast with a close button keeps it", async () => {
        render(Toaster, { mode: "snackbar" });
        pushToast({ message: "Archived", action: { label: "Undo", onclick() {} } });
        const el = await shown();
        expect(el.className).toContain("rounded-container");
        const action = el.querySelector("[data-toast-action]")!;
        expect(action.closest(".mt-3")).toBeNull();
        expect(screen.getByRole("button", { name: "Dismiss notification" })).toBeTruthy();
    });
});

describe("what a screen reader is given (Z-102)", () => {
    it("the live element is in the page empty, and its words are put in after the toast is mounted", async () => {
        render(Toaster);
        pushToast({ message: "Saved", type: "success", duration: 0 });
        await waitFor(() => expect(cards()).toHaveLength(1));
        const live = card().querySelector('[role="status"]')!;
        expect(live.getAttribute("aria-atomic")).toBe("true");
        expect(live.textContent?.trim()).toBe("");
        await waitFor(() => expect(live.textContent).toContain("Saved"));
    });

    it("an error is an alert, filled the same way", async () => {
        render(Toaster);
        pushToast({ message: "Failed", type: "error" });
        await waitFor(() => expect(cards()).toHaveLength(1));
        const live = card().querySelector('[role="alert"]')!;
        expect(live.textContent?.trim()).toBe("");
        await waitFor(() => expect(live.textContent).toContain("Failed"));
    });
});

describe("above what is docked at the bottom (Z-097, Z-103)", () => {
    function stubLayout(parts: { toaster: [number, number]; bar?: [number, number] }) {
        Object.defineProperty(document.documentElement, "clientHeight", { value: 812, configurable: true });
        const box = (top: number, bottom: number) =>
            ({ left: 0, right: 375, top, bottom, width: 375, height: bottom - top, x: 0, y: top, toJSON() {} }) as DOMRect;
        vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
            if (this.hasAttribute("data-zabi-toaster")) return box(...parts.toaster);
            if (this.hasAttribute("data-bar-edge") || this.hasAttribute("data-toast-clear") || this.matches("[data-primary]"))
                return box(...(parts.bar ?? [0, 0]));
            return box(0, 0);
        });
    }

    it("sits above a bar that lies under it", async () => {
        const bar = document.createElement("div");
        bar.setAttribute("data-bar-edge", "bottom");
        document.body.append(bar);
        stubLayout({ toaster: [704, 796], bar: [740, 812] });
        render(Toaster);
        pushToast({ message: "Saved", duration: 0 });
        await shown();
        const region = document.querySelector<HTMLElement>("[data-zabi-toaster]")!;
        await waitFor(() => expect(region.style.getPropertyValue("--toaster-overlay-inset")).toBe("72px"));
        bar.remove();
    });

    it("keeps off an element named in avoid, and ignores one the stack is not on", async () => {
        const button = document.createElement("button");
        button.setAttribute("data-primary", "");
        document.body.append(button);
        stubLayout({ toaster: [704, 796], bar: [756, 812] });
        render(Toaster, { avoid: "[data-primary]" });
        pushToast({ message: "Saved", duration: 0 });
        await shown();
        const region = document.querySelector<HTMLElement>("[data-zabi-toaster]")!;
        await waitFor(() => expect(region.style.getPropertyValue("--toaster-overlay-inset")).toBe("56px"));
        button.remove();
    });

    it("a selector that does not parse is not a reason to lose the toast", async () => {
        render(Toaster, { avoid: "[[" });
        pushToast({ message: "Saved", duration: 0 });
        await shown();
        expect(cards()).toHaveLength(1);
    });
});

describe("a click after a drag", () => {
    it("does not reach a control the drag ended on", async () => {
        render(Toaster);
        pushToast({ message: "Saved", duration: 0 });
        const el = await shown();
        const onclick = vi.fn();
        el.addEventListener("click", onclick);
        pointer(el, "pointerdown", "touch", { x: 0 });
        pointer(el, "pointermove", "touch", { x: 30 });
        pointer(el, "pointermove", "touch", { x: 60 });
        pointer(el, "pointerup", "touch", { x: 60 });
        await fireEvent.click(el);
        expect(onclick).not.toHaveBeenCalled();
    });
});
