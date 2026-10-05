import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store";
import {
    registerOverlayFooter,
    registerOverlayHeader,
    topOverlayFooter,
    topOverlayHeader,
} from "../src/components/util/overlay";
import { attachSheetDrag, FLICK_VELOCITY } from "../src/components/util/sheet-drag";
import { claimOpenTooltip, releaseOpenTooltip } from "../src/components/util/tooltip";
import { insideTriangle } from "../src/components/util/viewport-fit";
import BottomSheetHarness from "./fixtures/BottomSheetHarness.svelte";
import OverlayToastHarness from "./fixtures/OverlayToastHarness.svelte";
import SlideUpFooterHarness from "./fixtures/SlideUpFooterHarness.svelte";
import TwoTooltipsHarness from "./fixtures/TwoTooltipsHarness.svelte";

/**
 * The second round of QA findings, as far as jsdom can show them: which parts
 * of an overlay the toast stack is told about, when a sheet's grip takes the
 * pointer for itself, how a flick is timed, that one tooltip closes another,
 * and what a SlideUp with a footer is made of. Where things end up on a
 * screen is measured in playwright/qf-overlays2.spec.ts.
 */

const classesOf = (element: Element | null) => (element?.getAttribute("class") ?? "").split(/\s+/);

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
    vi.restoreAllMocks();
});

describe("overlay headers and footers", () => {
    function panelWith(...parts: string[]) {
        const panel = document.body.appendChild(document.createElement("div"));
        panel.setAttribute("role", "dialog");
        const made = Object.fromEntries(
            parts.map((part) => [part, panel.appendChild(document.createElement("div"))]),
        );
        return { panel, ...made } as { panel: HTMLElement } & Record<string, HTMLElement>;
    }

    it("the header and the footer on top are those of the same overlay: the one opened last", () => {
        const under = panelWith("header", "footer");
        const over = panelWith("header");
        const stop = [
            registerOverlayHeader(under.header),
            registerOverlayFooter(under.footer),
        ];
        expect(topOverlayHeader()).toBe(under.header);
        expect(topOverlayFooter()).toBe(under.footer);

        // An overlay without a footer opens over it: the footer below is behind
        // it, and is not what the stack minds.
        const stopOver = registerOverlayHeader(over.header);
        expect(topOverlayHeader()).toBe(over.header);
        expect(topOverlayFooter()).toBeNull();

        stopOver();
        expect(topOverlayHeader()).toBe(under.header);
        expect(topOverlayFooter()).toBe(under.footer);
        stop.forEach((leave) => leave());
        expect(topOverlayHeader()).toBeNull();
        expect(topOverlayFooter()).toBeNull();
        under.panel.remove();
        over.panel.remove();
    });

    it.each(["modal", "sheet", "drawer"] as const)("a %s registers the header that holds Close", async (kind) => {
        const user = userEvent.setup();
        render(OverlayToastHarness, { kind });
        await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy());
        const header = topOverlayHeader();
        expect(header).not.toBeNull();
        expect(header!.contains(screen.getByRole("button", { name: "Close" }))).toBe(true);
        expect(header!.contains(screen.getByTestId("field"))).toBe(false);
        await user.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(topOverlayHeader()).toBeNull();
    });
});

describe("SlideUp footer", () => {
    const panel = () => screen.getByRole("dialog");

    it("with a footer: the content is the box that scrolls, and the footer is registered", async () => {
        render(SlideUpFooterHarness);
        await waitFor(() => expect(panel()).toBeTruthy());
        const content = panel().querySelector("[data-slide-up-content]")!;
        const footer = panel().querySelector<HTMLElement>("[data-slide-up-footer]")!;
        expect(content.contains(screen.getByTestId("field"))).toBe(true);
        expect(classesOf(content)).toEqual(expect.arrayContaining(["min-h-0", "flex-1", "overflow-y-auto"]));
        expect(footer.contains(screen.getByTestId("save"))).toBe(true);
        expect(classesOf(footer)).toEqual(expect.arrayContaining(["shrink-0", "border-t"]));
        expect(footer.getAttribute("class")).toContain("safe-area-inset-bottom");
        // The panel no longer scrolls as a whole.
        expect(classesOf(panel())).toContain("overflow-y-hidden");
        expect(classesOf(panel())).not.toContain("overflow-y-auto");
        expect(topOverlayFooter()).toBe(footer);
        expect(topOverlayHeader()!.contains(screen.getByRole("button", { name: "Close" }))).toBe(true);
    });

    it("without one it is what it was: one box that scrolls, nothing registered as a footer", async () => {
        render(SlideUpFooterHarness, { withFooter: false });
        await waitFor(() => expect(panel()).toBeTruthy());
        expect(panel().querySelector("[data-slide-up-content]")).toBeNull();
        expect(panel().querySelector("[data-slide-up-footer]")).toBeNull();
        expect(classesOf(panel())).toContain("overflow-y-auto");
        expect(classesOf(panel())).not.toContain("overflow-y-hidden");
        expect(topOverlayFooter()).toBeNull();
        const body = screen.getByTestId("field").closest("div")!;
        expect(body.getAttribute("class")).toContain("pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]");
    });

    it("the footer is in the Tab cycle, after the content", async () => {
        const user = userEvent.setup();
        render(SlideUpFooterHarness);
        await waitFor(() => expect(panel().contains(document.activeElement)).toBe(true));
        screen.getByTestId("field").focus();
        await user.keyboard("{Tab}");
        expect(document.activeElement).toBe(screen.getByTestId("save"));
        await user.keyboard("{Tab}");
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Close" }));
    });
});

describe("the toast stack and --toaster-bottom-offset", () => {
    it("the offset is added to what is under the page, and competes with an overlay's inset", () => {
        const { container } = render(Toaster);
        const region = container.querySelector("[data-zabi-toaster]")!;
        const bottom = classesOf(region).find((name) => name.startsWith("bottom-"))!;
        // max(page things + offset, overlay or keyboard) + edge: never offset on top of the overlay's inset.
        expect(bottom).toContain(
            "max(max(var(--app-shell-bottom-inset,0px),env(safe-area-inset-bottom,0px))_+_var(--toaster-bottom-offset,0px),var(--toaster-overlay-inset,0px))",
        );
        expect(bottom).not.toContain("var(--toaster-overlay-inset,0px))_+_var(--toaster-bottom-offset,0px)");
    });

    it("is at rest in a page with no keyboard and no overlay", async () => {
        const { container } = render(Toaster);
        pushToast({ message: "Saved", duration: 0 });
        await waitFor(() => expect(container.querySelector("[data-toast-id]")).not.toBeNull());
        const region = container.querySelector<HTMLElement>("[data-zabi-toaster]")!;
        expect(region.style.getPropertyValue("--toaster-overlay-inset")).toBe("");
        expect(region.style.top).toBe("");
    });
});

describe("a sheet's grip and the pointer", () => {
    const grip = () => screen.getByRole("button", { name: "Expand" });

    it("a press on the grip is not captured, so its click is the grip's own", async () => {
        const capture = vi.fn();
        Element.prototype.setPointerCapture = capture;
        render(BottomSheetHarness, { initialOpen: true });
        await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy());

        await fireEvent.pointerDown(grip(), { pointerId: 1, button: 0, pointerType: "mouse", clientY: 400 });
        expect(capture, "Nothing is taken on the way down").not.toHaveBeenCalled();
        await fireEvent.pointerUp(grip(), { pointerId: 1, pointerType: "mouse", clientY: 400 });
        expect(capture).not.toHaveBeenCalled();
        await fireEvent.click(grip());
        expect(screen.getByRole("dialog").getAttribute("data-snap")).toBe("full");
    });

    it.each(["mouse", "touch", "pen"])("a %s drag is captured once it has moved past the slop", async (pointerType) => {
        const capture = vi.fn();
        Element.prototype.setPointerCapture = capture;
        render(BottomSheetHarness, { initialOpen: true });
        await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy());
        const sheet = screen.getByRole("dialog");

        await fireEvent.pointerDown(grip(), { pointerId: 1, button: 0, pointerType, clientY: 400 });
        await fireEvent.pointerMove(grip(), { pointerId: 1, pointerType, clientY: 403 });
        expect(capture, "3px is still a press").not.toHaveBeenCalled();
        expect(sheet.hasAttribute("data-dragging")).toBe(false);

        await fireEvent.pointerMove(grip(), { pointerId: 1, pointerType, clientY: 420 });
        expect(capture).toHaveBeenCalledWith(1);
        expect(sheet.getAttribute("data-dragging")).toBe("true");
        // A mouse that has left the handle is still followed: its moves are heard on the window.
        await fireEvent.pointerMove(document.body, { pointerId: 1, pointerType, clientY: 440 });
        expect(sheet.getAttribute("data-dragging")).toBe("true");
        await fireEvent.pointerUp(document.body, { pointerId: 1, pointerType, clientY: 440 });
        // Released: the drag is over (in a test DOM, with no heights, the sheet may have closed on it).
        await waitFor(() => expect(document.querySelector('[data-dragging="true"]')).toBeNull());
    });
});

describe("how fast a flick was", () => {
    /** A handle that is dragged by events with the given times, handled at the given clock. */
    function flick(steps: { y: number; stamp: number; clock: number }[]) {
        const handle = document.body.appendChild(document.createElement("div"));
        let clock = 0;
        vi.spyOn(performance, "now").mockImplementation(() => clock);
        let velocity = Number.NaN;
        const stop = attachSheetDrag(
            { handleZone: handle },
            { onMove() {}, onEnd: (_distance, speed) => (velocity = speed) },
        );
        const send = (type: string, step: (typeof steps)[number]) => {
            clock = step.clock;
            const event = new Event(type, { bubbles: true });
            Object.defineProperties(event, {
                pointerId: { value: 1 },
                pointerType: { value: "touch" },
                button: { value: 0 },
                clientY: { value: step.y },
                timeStamp: { value: step.stamp },
            });
            handle.dispatchEvent(event);
        };
        send("pointerdown", steps[0]);
        for (const step of steps.slice(1)) send("pointermove", step);
        send("pointerup", steps[steps.length - 1]);
        stop();
        handle.remove();
        return velocity;
    }

    it("is read from when the events happened, not from when a busy page handled them", () => {
        // 120px in 24ms by the events: a flick. The page was busy: each was handled 150ms after the last.
        const velocity = flick([
            { y: 400, stamp: 1000, clock: 5000 },
            { y: 440, stamp: 1008, clock: 5150 },
            { y: 480, stamp: 1016, clock: 5300 },
            { y: 520, stamp: 1024, clock: 5450 },
        ]);
        expect(velocity).toBeGreaterThan(FLICK_VELOCITY);
        expect(velocity).toBeCloseTo(40 / 8, 1);
    });

    it("a slow drag is slow however promptly it was handled", () => {
        const velocity = flick([
            { y: 400, stamp: 1000, clock: 5000 },
            { y: 440, stamp: 1200, clock: 5001 },
            { y: 480, stamp: 1400, clock: 5002 },
            { y: 520, stamp: 1600, clock: 5003 },
        ]);
        expect(velocity).toBeLessThan(FLICK_VELOCITY);
    });

    it("events that all carry one stamp are timed by the clock", () => {
        const velocity = flick([
            { y: 400, stamp: 1000, clock: 5000 },
            { y: 440, stamp: 1000, clock: 5008 },
            { y: 480, stamp: 1000, clock: 5016 },
            { y: 520, stamp: 1000, clock: 5024 },
        ]);
        expect(velocity).toBeGreaterThan(FLICK_VELOCITY);
    });
});

describe("one tooltip at a time", () => {
    const bubbleOf = (testId: string) =>
        screen.getByTestId(testId).closest(".tooltip-container")!.querySelector('[role="tooltip"]')!;
    const isOpen = (testId: string) => bubbleOf(testId).getAttribute("data-visible") === "true";
    const hover = async (testId: string) => {
        const wrapper = screen.getByTestId(testId).closest(".tooltip-container")!;
        wrapper.dispatchEvent(Object.assign(new Event("pointerenter"), { pointerType: "mouse" }));
        wrapper.dispatchEvent(new MouseEvent("mouseenter"));
        await Promise.resolve();
    };

    it("the mouse rests on one trigger, focus moves to another: only the second is open", async () => {
        render(TwoTooltipsHarness);
        await hover("first");
        expect(isOpen("first")).toBe(true);
        screen.getByTestId("second").focus();
        await waitFor(() => expect(isOpen("second")).toBe(true));
        expect(isOpen("first")).toBe(false);
        await waitFor(() => expect(screen.getByTestId("first").hasAttribute("aria-describedby")).toBe(false));
        expect(screen.getByTestId("second").getAttribute("aria-describedby")).toBe(bubbleOf("second").id);
    });

    it("and back again: opening the first closes the second", async () => {
        render(TwoTooltipsHarness);
        screen.getByTestId("second").focus();
        await waitFor(() => expect(isOpen("second")).toBe(true));
        await hover("first");
        expect(isOpen("first")).toBe(true);
        expect(isOpen("second")).toBe(false);
    });

    it("a tooltip that goes while open leaves nothing behind to close", () => {
        const first = vi.fn();
        const second = vi.fn();
        claimOpenTooltip(first);
        releaseOpenTooltip(first);
        claimOpenTooltip(second);
        expect(first).not.toHaveBeenCalled();
        // Claiming again is not closing oneself.
        claimOpenTooltip(second);
        expect(second).not.toHaveBeenCalled();
        claimOpenTooltip(first);
        expect(second).toHaveBeenCalledTimes(1);
        releaseOpenTooltip(first);
    });
});

describe("insideTriangle", () => {
    const a = { x: 0, y: 0 };
    const b = { x: 100, y: 0 };
    const c = { x: 50, y: 80 };

    it("is true inside and on the edges, whichever way round the corners are given", () => {
        expect(insideTriangle({ x: 50, y: 20 }, a, b, c)).toBe(true);
        expect(insideTriangle({ x: 50, y: 20 }, c, b, a)).toBe(true);
        expect(insideTriangle({ x: 50, y: 0 }, a, b, c)).toBe(true);
        expect(insideTriangle(c, a, b, c)).toBe(true);
    });

    it("is false outside", () => {
        expect(insideTriangle({ x: 50, y: -1 }, a, b, c)).toBe(false);
        expect(insideTriangle({ x: 5, y: 60 }, a, b, c)).toBe(false);
        expect(insideTriangle({ x: 120, y: 10 }, a, b, c)).toBe(false);
    });
});
