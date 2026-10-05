import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import FloatingActionButton from "../src/components/atoms/FloatingActionButton.svelte";
import Toast from "../src/components/atoms/Toast.svelte";
import Toaster from "../src/components/molecules/Toaster.svelte";
import { focusToasts, pushToast, toastStore } from "../src/components/molecules/toast-store";
import {
    followKeyboard,
    registerOverlayFooter,
    topOverlayFooter,
    watchOverlayFooters,
} from "../src/components/util/overlay";
import OverlayToastHarness from "./fixtures/OverlayToastHarness.svelte";
import TooltipTouchHarness from "./fixtures/TooltipTouchHarness.svelte";

/**
 * What QA found in the phone rework, as far as jsdom can show it: when a
 * tooltip opens and what it is tied to, that a toast is inside the focus trap
 * of an open overlay, and the helpers that move an overlay over a keyboard
 * and a toast off a footer. Where things end up on a screen is measured in
 * playwright/qf-overlays.spec.ts.
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

describe("Tooltip: a tap, not a touch", () => {
    const trigger = () => screen.getByTestId("trigger");
    const bubble = () => screen.getByRole("tooltip", { hidden: true });
    const isOpen = () => bubble().getAttribute("data-visible") === "true";
    const down = (x = 20, y = 20) =>
        fireEvent.pointerDown(trigger(), { pointerId: 1, pointerType: "touch", clientX: x, clientY: y });
    const up = (x = 20, y = 20) =>
        fireEvent.pointerUp(trigger(), { pointerId: 1, pointerType: "touch", clientX: x, clientY: y });

    it("opens when the finger comes up, not when it goes down", async () => {
        render(TooltipTouchHarness);
        await down();
        expect(isOpen(), "Nothing yet: it may be the start of a scroll").toBe(false);
        await up();
        expect(isOpen()).toBe(true);
    });

    it("a drag that starts on the trigger opens nothing", async () => {
        render(TooltipTouchHarness);
        // The finger moved 40px before it came up.
        await down(20, 20);
        await up(20, 60);
        expect(isOpen()).toBe(false);

        // The browser took the touch to scroll: no pointerup follows on the trigger.
        await down();
        await fireEvent.pointerCancel(trigger(), { pointerId: 1, pointerType: "touch" });
        await up();
        expect(isOpen()).toBe(false);

        // A few pixels of wobble is still a tap.
        await down(20, 20);
        await up(24, 23);
        expect(isOpen()).toBe(true);
    });

    it("a drag does not close an open tooltip either; the scroll it causes does", async () => {
        render(TooltipTouchHarness);
        await down();
        await up();
        expect(isOpen()).toBe(true);
        await down(20, 20);
        await up(20, 80);
        expect(isOpen()).toBe(true);
        await fireEvent.scroll(window);
        expect(isOpen()).toBe(false);
    });

    it("stays by default: no timer takes it away while its trigger has focus", async () => {
        vi.useFakeTimers();
        render(TooltipTouchHarness);
        await down();
        await up();
        trigger().focus();
        await vi.advanceTimersByTimeAsync(60_000);
        expect(isOpen()).toBe(true);
        expect(document.activeElement).toBe(trigger());
    });

    it("a touch on the bubble neither toggles it nor counts as a tap elsewhere", async () => {
        vi.useFakeTimers();
        render(TooltipTouchHarness);
        await down();
        await up();
        expect(isOpen()).toBe(true);
        const at = { pointerId: 2, pointerType: "touch", clientX: 5, clientY: 5 };
        await fireEvent.pointerDown(bubble(), at);
        await fireEvent.pointerUp(bubble(), at);
        // The press takes focus off the trigger; the tooltip is still being read.
        await fireEvent.focusOut(trigger());
        await vi.advanceTimersByTimeAsync(300);
        expect(isOpen()).toBe(true);
        await fireEvent.pointerDown(screen.getByTestId("outside"), { pointerId: 3, pointerType: "touch" });
        expect(isOpen()).toBe(false);
    });
});

describe("Tooltip: what it is tied to", () => {
    const trigger = () => screen.getByTestId("trigger");
    const bubble = () => screen.getByRole("tooltip", { hidden: true });
    const wrapper = () => trigger().closest(".tooltip-container")!;
    const hover = async () => {
        wrapper().dispatchEvent(Object.assign(new Event("pointerenter"), { pointerType: "mouse" }));
        wrapper().dispatchEvent(new MouseEvent("mouseenter"));
        await Promise.resolve();
    };

    it("describes a disabled button while it is open", async () => {
        render(TooltipTouchHarness, { triggerDisabled: true });
        expect((trigger() as HTMLButtonElement).disabled).toBe(true);
        await hover();
        expect(bubble().getAttribute("data-visible")).toBe("true");
        await waitFor(() => expect(trigger().getAttribute("aria-describedby")).toBe(bubble().id));

        wrapper().dispatchEvent(new MouseEvent("mouseleave"));
        await waitFor(() => expect(trigger().hasAttribute("aria-describedby")).toBe(false));
    });

    it("an aria-disabled button takes focus, so the keyboard opens its tooltip too", async () => {
        render(TooltipTouchHarness, { triggerAriaDisabled: true });
        trigger().focus();
        expect(document.activeElement).toBe(trigger());
        await waitFor(() => expect(trigger().getAttribute("aria-describedby")).toBe(bubble().id));
        expect(bubble().getAttribute("role")).toBe("tooltip");
    });

    it("stays while the pointer is on it, even when a press takes focus off the trigger", async () => {
        vi.useFakeTimers();
        render(TooltipTouchHarness);
        trigger().focus();
        await hover();
        expect(bubble().getAttribute("data-visible")).toBe("true");
        // A press on the bubble: focus leaves the trigger, the pointer has not left the tooltip.
        screen.getByTestId("trigger").blur();
        await vi.advanceTimersByTimeAsync(300);
        expect(bubble().getAttribute("data-visible")).toBe("true");
        wrapper().dispatchEvent(new MouseEvent("mouseleave"));
        await Promise.resolve();
        expect(bubble().getAttribute("data-visible")).toBe("false");
    });

    it("Escape closes a hovered tooltip without moving focus", async () => {
        render(TooltipTouchHarness);
        screen.getByTestId("outside").focus();
        await hover();
        await fireEvent.keyDown(window, { key: "Escape" });
        expect(bubble().getAttribute("data-visible")).toBe("false");
        expect(document.activeElement).toBe(screen.getByTestId("outside"));
    });
});

describe.each(["modal", "sheet", "drawer", "slide"] as const)(
    "a toast with a %s open",
    (kind) => {
        const dialog = () => screen.getByRole("dialog");
        const toastButton = (name: string) => screen.getByRole("button", { name });
        const active = () => document.activeElement;

        async function open() {
            const user = userEvent.setup();
            render(OverlayToastHarness, { kind });
            pushToast({ message: "Saved", title: "Saved", type: "success", duration: 0 });
            await waitFor(() => expect(toastButton("Dismiss notification")).toBeTruthy());
            await waitFor(() => expect(dialog().contains(active())).toBe(true));
            return user;
        }

        it("is in the Tab cycle: after the overlay's last control, and before its first", async () => {
            const user = await open();
            screen.getByTestId("save").focus();
            await user.keyboard("{Tab}");
            expect(active(), "Into the toast, not onto the page between").toBe(
                toastButton("Expand details"),
            );
            await user.keyboard("{Tab}");
            expect(active()).toBe(toastButton("Dismiss notification"));
            await user.keyboard("{Tab}");
            expect(dialog().contains(active()), "Round to the overlay's first control").toBe(true);

            await user.keyboard("{Shift>}{Tab}{/Shift}");
            expect(active(), "Backwards from the first: the last toast control").toBe(
                toastButton("Dismiss notification"),
            );
            await user.keyboard("{Shift>}{Tab}{/Shift}");
            await user.keyboard("{Shift>}{Tab}{/Shift}");
            expect(active()).toBe(screen.getByTestId("save"));
            expect(screen.getByTestId("between")).not.toBe(active());
        });

        it("can be dismissed from the keyboard, and focus goes back into the overlay", async () => {
            const user = await open();
            screen.getByTestId("field").focus();
            expect(focusToasts()).toBe(true);
            expect(active()?.closest("[data-zabi-toaster]")).not.toBeNull();
            (active() as HTMLElement).closest("[data-toast-id]")!
                .querySelector<HTMLElement>('[aria-label="Dismiss notification"]')!
                .focus();
            await user.keyboard("{Enter}");
            await waitFor(() => expect(screen.queryByRole("button", { name: "Dismiss notification" })).toBeNull());
            await waitFor(() => expect(active()).toBe(screen.getByTestId("field")));
            expect(screen.getByRole("dialog")).toBeTruthy();
        });

        it("Escape in the toast returns focus and leaves the overlay open", async () => {
            const user = await open();
            screen.getByTestId("field").focus();
            focusToasts();
            await user.keyboard("{Escape}");
            expect(active()).toBe(screen.getByTestId("field"));
            expect(screen.getByRole("dialog")).toBeTruthy();
            expect(toastButton("Dismiss notification")).toBeTruthy();
            // In the overlay again, Escape is the overlay's.
            await user.keyboard("{Escape}");
            await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        });

        it("Escape in the toast does not send focus to the page behind the overlay", async () => {
            // Focus went into the toasts from the page, before the overlay opened.
            const user = userEvent.setup();
            render(OverlayToastHarness, { kind, initialOpen: false });
            pushToast({ message: "Saved", title: "Saved", type: "success", duration: 0 });
            await waitFor(() => expect(toastButton("Dismiss notification")).toBeTruthy());
            screen.getByTestId("between").focus();
            focusToasts();
            screen.getByTestId("opener").focus();
            await user.keyboard("{Enter}");
            await waitFor(() => expect(dialog().contains(active())).toBe(true));
            // Now from nowhere: nothing in the overlay had focus on the way in.
            (active() as HTMLElement).blur();
            expect(focusToasts()).toBe(true);
            const inToast = active();

            await user.keyboard("{Escape}");
            expect(active(), "Not the link behind the overlay").not.toBe(screen.getByTestId("between"));
            expect(active()).toBe(inToast);
            expect(screen.getByRole("dialog"), "And the overlay is still open").toBeTruthy();
            await user.keyboard("{Tab}");
            await user.keyboard("{Tab}");
            expect(dialog().contains(active()), "Tab leads back into the overlay").toBe(true);
        });

        it("is not hidden from assistive technology by the overlay", async () => {
            await open();
            const region = screen.getByRole("region", { name: "Notifications" });
            for (let node: Element | null = region; node; node = node.parentElement) {
                expect(node.getAttribute("aria-hidden")).not.toBe("true");
                expect(node.hasAttribute("inert")).toBe(false);
            }
            expect(region.querySelector('[role="status"]')?.textContent).toContain("Saved");
        });
    },
);

describe("the Tab cycle without a toast", () => {
    it("is what it was: first and last control of the overlay", async () => {
        const user = userEvent.setup();
        render(OverlayToastHarness, { kind: "modal" });
        await waitFor(() => expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true));
        screen.getByTestId("save").focus();
        await user.keyboard("{Tab}");
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Close" }));
        await user.keyboard("{Shift>}{Tab}{/Shift}");
        expect(document.activeElement).toBe(screen.getByTestId("save"));
    });
});

describe("overlay footers, for what is drawn over them", () => {
    it("the footer of the overlay opened last is the one on top, and leaving removes it", () => {
        const heard = vi.fn();
        const stop = watchOverlayFooters(heard);
        const first = document.body.appendChild(document.createElement("div"));
        const second = document.body.appendChild(document.createElement("div"));
        expect(topOverlayFooter()).toBeNull();

        const leaveFirst = registerOverlayFooter(first);
        expect(topOverlayFooter()).toBe(first);
        const leaveSecond = registerOverlayFooter(second);
        expect(topOverlayFooter()).toBe(second);
        expect(heard).toHaveBeenCalledTimes(2);

        leaveSecond();
        expect(topOverlayFooter()).toBe(first);
        leaveFirst();
        expect(topOverlayFooter()).toBeNull();
        expect(heard).toHaveBeenCalledTimes(4);
        stop();
        first.remove();
        second.remove();
    });

    it.each([
        ["modal", true],
        ["sheet", true],
        ["drawer", true],
        ["modal", false],
    ] as const)("%s with a footer (%s) says so while it is open", async (kind, withFooter) => {
        const user = userEvent.setup();
        render(OverlayToastHarness, { kind, withFooter });
        await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy());
        if (withFooter) {
            const footer = topOverlayFooter();
            expect(footer).not.toBeNull();
            expect(footer!.contains(screen.getByTestId("save"))).toBe(true);
        } else {
            expect(topOverlayFooter()).toBeNull();
        }
        await user.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(topOverlayFooter()).toBeNull();
    });
});

describe("followKeyboard", () => {
    /** A visual viewport of this height in a 740px layout: a keyboard of the difference. */
    function withKeyboard(height: number | null, offsetTop = 0) {
        const viewport = window.visualViewport ?? new EventTarget();
        Object.defineProperty(window, "visualViewport", { configurable: true, value: viewport });
        Object.defineProperty(document.documentElement, "clientHeight", { configurable: true, value: 740 });
        Object.defineProperty(viewport, "scale", { configurable: true, value: 1 });
        Object.defineProperty(viewport, "offsetTop", { configurable: true, value: offsetTop });
        Object.defineProperty(viewport, "height", { configurable: true, value: height ?? 740 });
        (viewport as EventTarget).dispatchEvent(new Event("resize"));
    }

    afterEach(() => {
        withKeyboard(null);
    });

    it("moves the root's bottom edge to the top of the keyboard, and back", () => {
        withKeyboard(null);
        const root = document.body.appendChild(document.createElement("div"));
        const stop = followKeyboard(root);
        expect(root.style.bottom).toBe("");
        expect(root.hasAttribute("data-keyboard-open")).toBe(false);

        withKeyboard(420);
        expect(root.style.bottom).toBe("320px");
        expect(root.getAttribute("data-keyboard-open")).toBe("true");

        withKeyboard(null);
        expect(root.style.bottom).toBe("");
        expect(root.hasAttribute("data-keyboard-open")).toBe(false);

        withKeyboard(420);
        stop();
        expect(root.style.bottom, "Put back when the overlay closes").toBe("");
        expect(root.hasAttribute("data-keyboard-open")).toBe(false);
        root.remove();
    });

    it("follows the screen where the browser has panned it, up to a complete pan", () => {
        withKeyboard(null);
        const root = document.body.appendChild(document.createElement("div"));
        const stop = followKeyboard(root);

        // A 320px keyboard, and the screen panned 60px: 60 to 480 can be seen.
        withKeyboard(420, 60);
        expect(root.style.top).toBe("60px");
        expect(root.style.bottom).toBe("260px");

        // Panned all the way: the keyboard covers nothing of the page any
        // more, and the top 320px of it are above the screen.
        withKeyboard(420, 320);
        expect(root.style.top, "The root starts where the screen does").toBe("320px");
        expect(root.style.bottom).toBe("");
        expect(root.getAttribute("data-keyboard-open")).toBe("true");

        // And part of the way back.
        withKeyboard(420, 300);
        expect(root.style.top).toBe("300px");
        expect(root.style.bottom).toBe("20px");

        withKeyboard(null);
        expect(root.style.top).toBe("");
        expect(root.style.bottom).toBe("");
        expect(root.hasAttribute("data-keyboard-open")).toBe(false);
        stop();
        root.remove();
    });

    it("a pinch zoom that moves the screen is not a keyboard", () => {
        withKeyboard(null);
        const root = document.body.appendChild(document.createElement("div"));
        const stop = followKeyboard(root);
        const viewport = window.visualViewport!;
        Object.defineProperty(viewport, "scale", { configurable: true, value: 2 });
        Object.defineProperty(viewport, "offsetTop", { configurable: true, value: 120 });
        Object.defineProperty(viewport, "height", { configurable: true, value: 370 });
        viewport.dispatchEvent(new Event("resize"));
        expect(root.style.top).toBe("");
        expect(root.style.bottom).toBe("");
        expect(root.hasAttribute("data-keyboard-open")).toBe(false);
        stop();
        root.remove();
    });

    it("carries the backdrop's dimming on past the root while it is moved", () => {
        withKeyboard(null);
        const root = document.body.appendChild(document.createElement("div"));
        root.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        const stop = followKeyboard(root);
        expect(root.style.boxShadow).toBe("");

        withKeyboard(420);
        expect(root.style.boxShadow).toContain("100vmax");
        expect(root.style.boxShadow).toContain("rgba(0, 0, 0, 0.5)");

        withKeyboard(null);
        expect(root.style.boxShadow).toBe("");

        // A root that is no backdrop gets no shadow.
        root.style.backgroundColor = "";
        withKeyboard(420);
        expect(root.style.bottom).toBe("320px");
        expect(root.style.boxShadow).toBe("");
        stop();
        expect(root.style.boxShadow).toBe("");
        root.remove();
    });

    it("brings the focused field back into view, and tells the toast stack", () => {
        withKeyboard(null);
        const root = document.body.appendChild(document.createElement("div"));
        const field = root.appendChild(document.createElement("input"));
        field.scrollIntoView = vi.fn();
        field.focus();
        const heard = vi.fn();
        const stopWatching = watchOverlayFooters(heard);
        const stop = followKeyboard(root);
        heard.mockClear();

        withKeyboard(420);
        expect(field.scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
        expect(heard).toHaveBeenCalled();
        stop();
        stopWatching();
        root.remove();
    });

    it.each(["modal", "sheet", "drawer", "slide"] as const)("a %s follows it while open", async (kind) => {
        withKeyboard(null);
        render(OverlayToastHarness, { kind });
        const root = () => screen.getByRole("dialog").parentElement!;
        await waitFor(() => expect(screen.getByRole("dialog")).toBeTruthy());
        expect(classesOf(root())).toContain("group/overlay");
        withKeyboard(420);
        expect(root().style.bottom).toBe("320px");
        expect(root().getAttribute("data-keyboard-open")).toBe("true");
        withKeyboard(null);
        expect(root().style.bottom).toBe("");
    });
});

describe("ToasterToast and Toast at 320px", () => {
    it("the buttons of a toast wrap under a title that keeps 8rem", async () => {
        const { container } = render(Toaster);
        pushToast({ message: "Saved", type: "success", duration: 0 });
        await waitFor(() => expect(container.querySelector("[data-toast-id]")).not.toBeNull());
        const toast = container.querySelector("[data-toast-id]")!;
        // In a stack that has a height, a toast keeps its own.
        expect(classesOf(toast)).toContain("shrink-0");
        const status = toast.querySelector('[role="status"]')!;
        expect(classesOf(status.parentElement)).toEqual(
            expect.arrayContaining(["flex", "flex-wrap", "gap-x-3", "gap-y-1"]),
        );
        expect(classesOf(status)).toContain("flex-[1_1_8rem]");
        const buttons = screen.getByRole("button", { name: "Dismiss notification" }).parentElement!;
        expect(classesOf(buttons)).toEqual(expect.arrayContaining(["ms-auto", "shrink-0"]));
        expect(classesOf(toast.querySelector("h4"))).toContain("[overflow-wrap:anywhere]");
    });

    it("the stack reads a footer's inset, and is at rest without one", () => {
        const { container } = render(Toaster);
        const region = container.querySelector<HTMLElement>("[data-zabi-toaster]")!;
        const bottom = classesOf(region).find((name) => name.startsWith("bottom-"))!;
        expect(bottom).toContain("var(--toaster-overlay-inset,0px)");
        expect(region.style.getPropertyValue("--toaster-overlay-inset")).toBe("");
        expect(region.style.maxHeight).toBe("");
        expect(region.hasAttribute("data-at")).toBe(false);
    });

    it("the Toast atom's close button is wide enough for its 44px layer", () => {
        render(Toast, { message: "Round starts" });
        expect(classesOf(screen.getByRole("button", { name: "Close notification" }))).toContain(
            "pointer-coarse:px-1",
        );
    });
});

describe("FloatingActionButton and keyboard focus under it", () => {
    it("reserves the room it takes at the bottom of the page, and gives it back", () => {
        const height = vi
            .spyOn(HTMLElement.prototype, "offsetHeight", "get")
            .mockReturnValue(56);
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
            top: 668,
            bottom: 724,
            left: 303,
            right: 359,
            width: 56,
            height: 56,
            x: 303,
            y: 668,
            toJSON: () => ({}),
        });
        Object.defineProperty(document.documentElement, "clientHeight", { configurable: true, value: 740 });
        document.documentElement.style.scrollPaddingBottom = "";

        const { unmount } = render(FloatingActionButton, { label: "New quiz" });
        // 56px of button and 16px under it.
        expect(document.documentElement.style.scrollPaddingBottom).toBe("72px");
        unmount();
        expect(document.documentElement.style.scrollPaddingBottom).toBe("");
        height.mockRestore();
    });

    it("reserves nothing where it has no layout", () => {
        document.documentElement.style.scrollPaddingBottom = "";
        const { unmount } = render(FloatingActionButton, { label: "New quiz" });
        expect(document.documentElement.style.scrollPaddingBottom).toBe("0px");
        unmount();
        expect(document.documentElement.style.scrollPaddingBottom).toBe("");
    });
});
