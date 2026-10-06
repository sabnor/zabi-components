import { cleanup, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import MobileFormHarness from "./fixtures/MobileFormHarness.svelte";
import { readKeyboardInset, watchKeyboardInset } from "../src/components/util/keyboard-inset";

/**
 * A visual viewport for jsdom, which has none. `height` is what is left
 * above the keyboard; the layout viewport is 800px tall throughout.
 */
function installVisualViewport(initial: { height: number; offsetTop?: number; scale?: number }) {
    const target = new EventTarget();
    const viewport = Object.assign(target, {
        height: initial.height,
        offsetTop: initial.offsetTop ?? 0,
        scale: initial.scale ?? 1,
    });
    vi.stubGlobal("visualViewport", viewport);
    Object.defineProperty(document.documentElement, "clientHeight", {
        configurable: true,
        value: 800,
    });
    return {
        set(next: Partial<{ height: number; offsetTop: number; scale: number }>, event = "resize") {
            Object.assign(viewport, next);
            viewport.dispatchEvent(new Event(event));
        },
        viewport,
    };
}

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.documentElement.style.scrollPaddingBottom = "";
});

const bar = () => screen.getByTestId("bar");
const scroller = () => screen.getByTestId("scroller");

/**
 * jsdom applies no stylesheet and has no layout: say how tall the bar is, and
 * where its scrolling box is on the 800px screen (top and bottom edge).
 */
function barHeight(height: number, box: { top: number; bottom: number } = { top: 0, bottom: 800 }) {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
        this: HTMLElement,
    ) {
        const id = this.getAttribute("data-testid");
        if (id === "scroller") {
            return {
                height: box.bottom - box.top,
                width: 0,
                top: box.top,
                left: 0,
                right: 0,
                bottom: box.bottom,
                x: 0,
                y: box.top,
            } as DOMRect;
        }
        const own = id === "bar" ? height : 0;
        return { height: own, width: 0, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0 } as DOMRect;
    });
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockImplementation(function (
        this: HTMLElement,
    ) {
        if (this.getAttribute("data-testid") === "scroller") return box.bottom - box.top;
        return this === document.documentElement ? 800 : 0;
    });
}

describe("StickyActionBar semantics", () => {
    it("is a plain box holding its buttons, sticky at the bottom", () => {
        render(MobileFormHarness, { props: { piece: "bar" } });
        expect(bar().hasAttribute("role")).toBe(false);
        expect(bar().hasAttribute("aria-label")).toBe(false);
        expect(within(bar()).getByRole("button", { name: "Save visit" })).toBeTruthy();
        expect(bar().className).toMatch(/(^|\s)sticky(\s|$)/);
        expect(bar().className).toContain("bottom-0");
        expect(bar().className).not.toMatch(/(^|\s)fixed(\s|$)/);
        // To the bottom of a column taller than its fields.
        expect(bar().className).toContain("mt-auto");
    });

    it("is a named group with a label", () => {
        render(MobileFormHarness, { props: { piece: "bar", label: "Visit" } });
        expect(screen.getByRole("group", { name: "Visit" })).toBe(bar());
    });

    it("keeps clear of the home indicator and the sides, with 8px between its buttons", () => {
        render(MobileFormHarness, { props: { piece: "bar" } });
        expect(bar().className).toContain("pb-[max(0.75rem,env(safe-area-inset-bottom))]");
        expect(bar().className).toContain("pl-[max(1rem,env(safe-area-inset-left))]");
        expect(bar().className).toContain("pr-[max(1rem,env(safe-area-inset-right))]");
        expect(bar().className).toContain("gap-[8px]");
        expect(bar().className).toContain("flex-wrap");
    });

    it("merges class and keeps a style passed to it", () => {
        render(MobileFormHarness, {
            props: { piece: "bar", barClass: "justify-between", barStyle: "--gap: 4px;" },
        });
        expect(bar().className).toContain("justify-between");
        expect(bar().className).not.toContain("justify-end");
        expect(bar().getAttribute("style")).toContain("--gap: 4px;");
    });

    it("never takes focus, and its buttons are reached in document order", async () => {
        const user = userEvent.setup();
        const onsave = vi.fn();
        render(MobileFormHarness, { props: { piece: "bar", onsave } });
        expect(document.activeElement).toBe(document.body);
        expect(bar().hasAttribute("tabindex")).toBe(false);
        await user.tab();
        expect(document.activeElement).toBe(screen.getByTestId("field"));
        await user.tab();
        expect(document.activeElement).toBe(within(bar()).getByRole("button", { name: "Save visit" }));
        await user.keyboard("{Enter}");
        expect(onsave).toHaveBeenCalledTimes(1);
    });
});

describe("StickyActionBar and the focused field", () => {
    it("reserves its height at the bottom of its scrolling ancestor, and gives it back", async () => {
        barHeight(72.4);
        const { unmount } = render(MobileFormHarness, { props: { piece: "bar" } });
        await waitFor(() => expect(scroller().style.scrollPaddingBottom).toBe("73px"));
        const box = scroller();
        unmount();
        expect(box.style.scrollPaddingBottom, "What was there before is put back").toBe("4px");
    });

    it("reserves it on the page when nothing around it scrolls", async () => {
        barHeight(60);
        const { unmount } = render(MobileFormHarness, { props: { piece: "bar", inScroller: false } });
        await waitFor(() =>
            expect(document.documentElement.style.scrollPaddingBottom).toBe("60px"),
        );
        unmount();
        expect(document.documentElement.style.scrollPaddingBottom).toBe("");
    });
});

describe("StickyActionBar and the keyboard", () => {
    it("does nothing where there is no visual viewport to ask", () => {
        vi.stubGlobal("visualViewport", undefined);
        render(MobileFormHarness, { props: { piece: "bar" } });
        expect(bar().hasAttribute("data-keyboard-open")).toBe(false);
        expect(bar().getAttribute("style") ?? "").not.toContain("bottom");
    });

    it("does nothing while the visual viewport is as tall as the layout", () => {
        installVisualViewport({ height: 800 });
        render(MobileFormHarness, { props: { piece: "bar" } });
        expect(bar().hasAttribute("data-keyboard-open")).toBe(false);
    });

    it("in a box that ends at the bottom of the screen: rises by the keyboard's height, and comes back down", async () => {
        barHeight(72);
        const keyboard = installVisualViewport({ height: 800 });
        render(MobileFormHarness, { props: { piece: "bar" } });
        await waitFor(() => expect(scroller().style.scrollPaddingBottom).toBe("72px"));

        keyboard.set({ height: 480 });
        await waitFor(() => expect(bar().getAttribute("data-keyboard-open")).toBe("true"));
        // It sticks 320px above the bottom, and makes that much room to scroll.
        expect(bar().style.bottom).toBe("320px");
        expect(bar().style.marginBottom).toBe("320px");
        // The home indicator is under the keyboard: no padding for it now.
        expect(bar().className).not.toContain("safe-area-inset-bottom");
        expect(bar().className).toContain("pb-3");
        // And a focused field is scrolled clear of both.
        await waitFor(() => expect(scroller().style.scrollPaddingBottom).toBe("392px"));

        keyboard.set({ height: 800 });
        await waitFor(() => expect(bar().hasAttribute("data-keyboard-open")).toBe(false));
        expect(bar().style.bottom).toBe("");
        expect(bar().style.marginBottom).toBe("");
        expect(bar().className).toContain("safe-area-inset-bottom");
        await waitFor(() => expect(scroller().style.scrollPaddingBottom).toBe("72px"));
    });

    it("on the page itself: rises by the keyboard's height", async () => {
        barHeight(60);
        const keyboard = installVisualViewport({ height: 800 });
        render(MobileFormHarness, { props: { piece: "bar", inScroller: false } });
        keyboard.set({ height: 500 });
        await waitFor(() => expect(bar().style.bottom).toBe("300px"));
        await waitFor(() =>
            expect(document.documentElement.style.scrollPaddingBottom).toBe("360px"),
        );
    });

    it("in a box that ends above the bottom of the screen: rises only by the part the keyboard covers", async () => {
        // A box from 100 to 735: above a 65px tab bar, say.
        barHeight(72, { top: 100, bottom: 735 });
        const keyboard = installVisualViewport({ height: 800 });
        render(MobileFormHarness, { props: { piece: "bar" } });
        keyboard.set({ height: 480 });
        // The keyboard starts at 480: 255px of the box are under it, not 320.
        await waitFor(() => expect(bar().style.bottom).toBe("255px"));
        expect(bar().style.marginBottom).toBe("255px");
        await waitFor(() => expect(scroller().style.scrollPaddingBottom).toBe("327px"));
    });

    it("in a box that ends above the keyboard: does not move", async () => {
        barHeight(72, { top: 50, bottom: 400 });
        const keyboard = installVisualViewport({ height: 800 });
        render(MobileFormHarness, { props: { piece: "bar" } });
        keyboard.set({ height: 480 });
        await waitFor(() => expect(bar().getAttribute("data-keyboard-open")).toBe("true"));
        expect(bar().style.bottom).toBe("");
        expect(bar().style.marginBottom).toBe("");
        expect(scroller().style.scrollPaddingBottom).toBe("72px");
    });

    it("never leaves its box: one wholly under the keyboard keeps the bar at its own top", async () => {
        // A box from 580 to 900, below the fold of the 800px screen.
        barHeight(72, { top: 580, bottom: 900 });
        const keyboard = installVisualViewport({ height: 800 });
        render(MobileFormHarness, { props: { piece: "bar" } });
        keyboard.set({ height: 420 });
        // 480px of it are under the keyboard, but it is only 320px tall.
        await waitFor(() => expect(bar().style.bottom).toBe("248px"));
    });

    it("follows the box when the page scrolls while the keyboard is up", async () => {
        const box = { top: 300, bottom: 700 };
        barHeight(72, box);
        const keyboard = installVisualViewport({ height: 800 });
        render(MobileFormHarness, { props: { piece: "bar" } });
        keyboard.set({ height: 500 });
        await waitFor(() => expect(bar().style.bottom).toBe("200px"));

        // The page scrolls 150px: the box is now 150px higher on the screen.
        box.top = 150;
        box.bottom = 550;
        document.dispatchEvent(new Event("scroll"));
        await waitFor(() => expect(bar().style.bottom).toBe("50px"));
    });

    it("counts the part of the page the browser has scrolled out above the keyboard", async () => {
        barHeight(72);
        const keyboard = installVisualViewport({ height: 800 });
        render(MobileFormHarness, { props: { piece: "bar" } });
        // iOS pans the visual viewport down the page to show a focused field.
        keyboard.set({ height: 480, offsetTop: 120 }, "scroll");
        await waitFor(() => expect(bar().style.bottom).toBe("200px"));
    });

    it("stops listening when it is removed", () => {
        const keyboard = installVisualViewport({ height: 800 });
        const remove = vi.spyOn(keyboard.viewport, "removeEventListener");
        const { unmount } = render(MobileFormHarness, { props: { piece: "bar" } });
        unmount();
        expect(remove).toHaveBeenCalledWith("resize", expect.any(Function));
        expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    });
});

describe("StickyActionBar and other things at the bottom of the same box", () => {
    it("gives the box its own scroll padding back whichever of two bars leaves first", async () => {
        barHeight(72);
        const first = render(MobileFormHarness, { props: { piece: "bar", inScroller: false } });
        await waitFor(() =>
            expect(document.documentElement.style.scrollPaddingBottom).toBe("72px"),
        );
        const second = render(MobileFormHarness, { props: { piece: "bar", inScroller: false } });
        // In mount order: the one that saw the page's own value goes first.
        first.unmount();
        expect(document.documentElement.style.scrollPaddingBottom).toBe("72px");
        second.unmount();
        expect(
            document.documentElement.style.scrollPaddingBottom,
            "Nothing stale is left behind",
        ).toBe("");
    });
});

describe("keyboard inset", () => {
    it("is the part of the layout viewport the visual viewport does not show", () => {
        const keyboard = installVisualViewport({ height: 800 });
        expect(readKeyboardInset()).toBe(0);
        keyboard.set({ height: 500 });
        expect(readKeyboardInset()).toBe(300);
        keyboard.set({ height: 500, offsetTop: 100 });
        expect(readKeyboardInset()).toBe(200);
    });

    it("is 0 for pinch zoom, for a pixel of rounding and for a taller visual viewport", () => {
        const keyboard = installVisualViewport({ height: 400, scale: 2 });
        expect(readKeyboardInset()).toBe(0);
        keyboard.set({ height: 799.4, scale: 1 });
        expect(readKeyboardInset()).toBe(0);
        keyboard.set({ height: 900 });
        expect(readKeyboardInset()).toBe(0);
    });

    it("reports once at the start and then only changes", () => {
        const keyboard = installVisualViewport({ height: 800 });
        const seen: number[] = [];
        const stop = watchKeyboardInset((inset) => seen.push(inset));
        keyboard.set({ height: 800 });
        keyboard.set({ height: 500 });
        keyboard.set({ height: 500 });
        stop();
        keyboard.set({ height: 300 });
        expect(seen).toEqual([0, 300]);
    });
});
