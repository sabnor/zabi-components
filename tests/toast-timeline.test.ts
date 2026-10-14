import { cleanup, render, waitFor } from "@testing-library/svelte";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store";

/**
 * The time bar under a toast (Z-106) and the region's clip (Z-105). A confirmation
 * in the snackbar that has nothing to press has no bar by default; everything
 * else keeps it; a Toaster prop and a toast's own setting decide the rest.
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
});

const cards = () => [...document.querySelectorAll<HTMLElement>("[data-toast-id]")];
const bar = () => document.querySelector("[data-toast-timeline]");

/** Waits until the toast is up and its timer has started (the sentence for a screen reader is there). */
async function running() {
    await waitFor(() => expect(cards()).toHaveLength(1));
    await waitFor(() => expect(document.querySelector("[data-toast-countdown]")).toBeTruthy());
}

describe("the time bar (Z-106)", () => {
    it("the stack draws it, as before, even under a confirmation with nothing to press", async () => {
        render(Toaster);
        pushToast({ message: "Saved", duration: "short", closable: false });
        await running();
        expect(bar()).toBeTruthy();
    });

    it("the snackbar leaves it out under a confirmation with nothing to press, and keeps the sentence", async () => {
        render(Toaster, { mode: "snackbar" });
        pushToast({ message: "Saved", duration: "short", closable: false });
        await running();
        expect(bar()).toBeNull();
        expect(document.querySelector("[data-toast-countdown]")?.textContent).toMatch(/\d/);
    });

    it("the snackbar keeps it where there is something to press", async () => {
        render(Toaster, { mode: "snackbar" });
        pushToast({ message: "Saved", duration: "short" });
        await running();
        expect(bar()).toBeTruthy();
    });

    it("Toaster timeLine={false} leaves it out everywhere, timeLine={true} draws it on a bare snackbar toast", async () => {
        const off = render(Toaster, { timeLine: false });
        pushToast({ message: "Saved", duration: "short" });
        await running();
        expect(bar()).toBeNull();
        off.unmount();
        toastStore.clear();

        render(Toaster, { mode: "snackbar", timeLine: true });
        pushToast({ message: "Saved", duration: "short", closable: false });
        await running();
        expect(bar()).toBeTruthy();
    });

    it("a toast's own timeLine wins over the Toaster's", async () => {
        render(Toaster, { timeLine: true });
        pushToast({ message: "Saved", duration: "short", timeLine: false });
        await running();
        expect(bar()).toBeNull();
    });
});

describe("the region's clip is a class written out whole (Z-105)", () => {
    const CLIP = "[clip-path:inset(-100vh_-100vw_0_-100vw)]";

    it("snackbar carries the plain class, auto the max-sm one, stack neither", () => {
        const region = (mode?: "stack" | "snackbar" | "auto") => {
            const view = render(Toaster, mode ? { mode } : {});
            const el = view.container.querySelector<HTMLElement>("[data-zabi-toaster]")!;
            const classes = [...el.classList];
            view.unmount();
            return classes;
        };
        expect(region("snackbar")).toContain(CLIP);
        expect(region("auto")).toContain(`max-sm:${CLIP}`);
        expect(region("auto")).not.toContain(CLIP);
        const stack = region();
        expect(stack).not.toContain(CLIP);
        expect(stack).not.toContain(`max-sm:${CLIP}`);
    });
});
