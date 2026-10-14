import { afterEach, describe, expect, it, vi } from "vitest";

import {
    measureScrollEdge,
    resolveScrolledUnder,
    watchScrollEdge,
} from "../src/components/util/scroll-edge";

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

/** jsdom has no layout: say how tall the content and the box are, and where it is scrolled. */
function scroller(state: { top: number; content: number; box: number }) {
    const el = document.createElement("div");
    Object.defineProperty(el, "scrollTop", { get: () => state.top, configurable: true });
    Object.defineProperty(el, "scrollHeight", { get: () => state.content, configurable: true });
    Object.defineProperty(el, "clientHeight", { get: () => state.box, configurable: true });
    return el;
}

describe("measureScrollEdge", () => {
    it("is flush at the start and under the bottom bar while there is more below", () => {
        expect(measureScrollEdge(0, 500)).toEqual({ top: false, bottom: true });
    });

    it("is under the top bar once scrolled, and flush at the end", () => {
        expect(measureScrollEdge(200, 500)).toEqual({ top: true, bottom: true });
        expect(measureScrollEdge(500, 500)).toEqual({ top: true, bottom: false });
    });

    it("tolerates 1px at the end, but not 2px", () => {
        expect(measureScrollEdge(499.5, 500).bottom).toBe(false);
        expect(measureScrollEdge(499, 500).bottom).toBe(false);
        expect(measureScrollEdge(498, 500).bottom).toBe(true);
    });

    it("is clamped against rubber-banding past either end", () => {
        expect(measureScrollEdge(-40, 500)).toEqual({ top: false, bottom: true });
        expect(measureScrollEdge(540, 500)).toEqual({ top: true, bottom: false });
    });

    it("has nothing under a bar when nothing scrolls", () => {
        expect(measureScrollEdge(0, 0)).toEqual({ top: false, bottom: false });
        expect(measureScrollEdge(0, -3)).toEqual({ top: false, bottom: false });
    });
});

describe("resolveScrolledUnder", () => {
    it("always and never override, auto follows", () => {
        expect(resolveScrolledUnder("always", false)).toBe(true);
        expect(resolveScrolledUnder("never", true)).toBe(false);
        expect(resolveScrolledUnder("auto", true)).toBe(true);
        expect(resolveScrolledUnder(undefined, false)).toBe(false);
    });
});

describe("watchScrollEdge", () => {
    it("measures once on start and again on scroll, reporting only changes", () => {
        const state = { top: 0, content: 1000, box: 400 };
        const el = scroller(state);
        const seen: unknown[] = [];
        const stop = watchScrollEdge(el, (edge) => seen.push(edge));
        expect(seen).toEqual([{ top: false, bottom: true }]);

        el.dispatchEvent(new Event("scroll"));
        expect(seen).toHaveLength(1);

        state.top = 100;
        el.dispatchEvent(new Event("scroll"));
        state.top = 600;
        el.dispatchEvent(new Event("scroll"));
        expect(seen).toEqual([
            { top: false, bottom: true },
            { top: true, bottom: true },
            { top: true, bottom: false },
        ]);
        stop();
    });

    it("listens passively and removes the listener on cleanup", () => {
        const el = scroller({ top: 0, content: 1000, box: 400 });
        const add = vi.spyOn(el, "addEventListener");
        const remove = vi.spyOn(el, "removeEventListener");
        const stop = watchScrollEdge(el, () => {});
        expect(add).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
        stop();
        expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    });

    it("measures again when the container or its content changes size", () => {
        const callbacks: (() => void)[] = [];
        const disconnect = vi.fn();
        vi.stubGlobal(
            "ResizeObserver",
            class {
                constructor(callback: () => void) {
                    callbacks.push(callback);
                }
                observe() {}
                disconnect = disconnect;
            },
        );
        const state = { top: 0, content: 300, box: 400 };
        const el = scroller(state);
        const seen: unknown[] = [];
        const stop = watchScrollEdge(el, (edge) => seen.push(edge));
        expect(seen).toEqual([{ top: false, bottom: false }]);
        state.content = 900;
        callbacks[0]();
        expect(seen[1]).toEqual({ top: false, bottom: true });
        stop();
        expect(disconnect).toHaveBeenCalled();
    });

    it("watches the window when given none", () => {
        Object.defineProperty(window, "scrollY", { value: 50, configurable: true });
        vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(5000);
        const seen: unknown[] = [];
        const stop = watchScrollEdge(null, (edge) => seen.push(edge));
        expect(seen[0]).toMatchObject({ top: true });
        stop();
        Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    });
});
