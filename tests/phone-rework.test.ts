import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import Checkbox from "../src/components/atoms/Checkbox.svelte";
import FloatingActionButton from "../src/components/atoms/FloatingActionButton.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import Toast from "../src/components/atoms/Toast.svelte";
import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store";
import { TOUCH_HIT_AREA } from "../src/components/util/touch-target";
import { pickSide, shiftIntoViewport } from "../src/components/util/viewport-fit";
import ConfirmDialogHarness from "./fixtures/ConfirmDialogHarness.svelte";
import ModalFullScreenHarness from "./fixtures/ModalFullScreenHarness.svelte";
import PageSafeAreaHarness from "./fixtures/PageSafeAreaHarness.svelte";
import TooltipTouchHarness from "./fixtures/TooltipTouchHarness.svelte";

/**
 * The phone rework of Tooltip, Toaster, Modal and Page, as far as jsdom can
 * see it: what a tap does to a tooltip, which classes and attributes a
 * full-screen modal carries, and that the dialog under it is the same dialog.
 * jsdom has no layout, no media queries and no `env()`, so where things end up
 * on a screen is measured in playwright/phone-rework.spec.ts.
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
    cleanup();
    vi.useRealTimers();
});

describe("Tooltip on a touch screen", () => {
    const trigger = () => screen.getByTestId("trigger");
    const bubble = () => screen.getByRole("tooltip", { hidden: true });
    const isOpen = () => bubble().getAttribute("data-visible") === "true";
    const touch = (target: Element, pointerType = "touch") =>
        fireEvent.pointerDown(target, { pointerId: 1, pointerType });
    /**
     * The pointer moving onto the tooltip's wrapper. Enter and leave events
     * do not bubble, and Testing Library's `mouseEnter` is a `mouseover`, so
     * they are dispatched on the element that listens.
     */
    const wrapper = () => trigger().closest(".tooltip-container")!;
    async function enter(pointerType: string) {
        wrapper().dispatchEvent(Object.assign(new Event("pointerenter"), { pointerType }));
        wrapper().dispatchEvent(new MouseEvent("mouseenter"));
        await Promise.resolve();
    }
    async function leave() {
        wrapper().dispatchEvent(new MouseEvent("mouseleave"));
        await Promise.resolve();
    }

    it("a tap opens it and ties it to the trigger, and takes nothing from the tap", async () => {
        render(TooltipTouchHarness);
        expect(isOpen()).toBe(false);
        expect(trigger().hasAttribute("aria-describedby")).toBe(false);

        // `fireEvent` returns false when a handler called preventDefault.
        expect(await touch(trigger())).toBe(true);
        expect(isOpen()).toBe(true);
        expect(bubble().getAttribute("aria-hidden")).toBe("false");
        await waitFor(() =>
            expect(trigger().getAttribute("aria-describedby")).toBe(bubble().id),
        );

        // The click a tap ends in is the button's own.
        await fireEvent.pointerUp(trigger(), { pointerId: 1, pointerType: "touch" });
        await fireEvent.click(trigger());
        expect(screen.getByTestId("pressed").textContent).toBe("1");
        expect(isOpen()).toBe(true);
    });

    it("a pen is a finger; a mouse button is not", async () => {
        render(TooltipTouchHarness);
        await touch(trigger(), "pen");
        expect(isOpen()).toBe(true);
        await touch(trigger(), "pen");
        expect(isOpen()).toBe(false);

        await touch(trigger(), "mouse");
        expect(isOpen(), "A mouse press does not open it").toBe(false);
        await enter("mouse");
        expect(isOpen(), "Hover does").toBe(true);
        await touch(trigger(), "mouse");
        expect(isOpen(), "A mouse press does not close it either").toBe(true);
    });

    it("goes by itself after touchDuration, and is then parked out of the layout", async () => {
        vi.useFakeTimers();
        render(TooltipTouchHarness);
        expect(bubble().getAttribute("data-parked")).toBe("true");

        await touch(trigger());
        expect(isOpen()).toBe(true);
        expect(bubble().getAttribute("data-parked")).toBe("false");

        await vi.advanceTimersByTimeAsync(2400);
        expect(isOpen()).toBe(true);
        await vi.advanceTimersByTimeAsync(200);
        expect(isOpen()).toBe(false);
        // Still in place while it fades; parked once it has.
        expect(bubble().getAttribute("data-parked")).toBe("false");
        await vi.advanceTimersByTimeAsync(300);
        expect(bubble().getAttribute("data-parked")).toBe("true");
    });

    it("takes the duration it is given, and 0 means until dismissed", async () => {
        vi.useFakeTimers();
        const { unmount } = render(TooltipTouchHarness, { touchDuration: 600 });
        await touch(trigger());
        await vi.advanceTimersByTimeAsync(500);
        expect(isOpen()).toBe(true);
        await vi.advanceTimersByTimeAsync(200);
        expect(isOpen()).toBe(false);
        unmount();

        render(TooltipTouchHarness, { touchDuration: 0 });
        await touch(trigger());
        await vi.advanceTimersByTimeAsync(60_000);
        expect(isOpen()).toBe(true);
        await touch(trigger());
        expect(isOpen(), "A second tap closes it").toBe(false);
    });

    it("closes on a tap elsewhere, on Escape and on scrolling", async () => {
        render(TooltipTouchHarness, { touchDuration: 0 });

        await touch(trigger());
        expect(isOpen()).toBe(true);
        await touch(screen.getByTestId("outside"));
        expect(isOpen(), "A tap outside").toBe(false);

        await touch(trigger());
        expect(isOpen()).toBe(true);
        await fireEvent.keyDown(window, { key: "Escape" });
        expect(isOpen(), "Escape").toBe(false);

        await touch(trigger());
        expect(isOpen()).toBe(true);
        await fireEvent.scroll(window);
        expect(isOpen(), "Scrolling").toBe(false);
    });

    it("closes when focus leaves", async () => {
        vi.useFakeTimers();
        render(TooltipTouchHarness, { touchDuration: 0 });
        await touch(trigger());
        // The focus the tap gives the button; it is the tap's, and opens nothing twice.
        trigger().focus();
        expect(isOpen()).toBe(true);
        screen.getByTestId("outside").focus();
        await vi.advanceTimersByTimeAsync(150);
        expect(isOpen()).toBe(false);
    });

    it("the mouse events and the focus a tap brings with it do not undo the tap", async () => {
        render(TooltipTouchHarness, { touchDuration: 0 });
        await touch(trigger());
        expect(isOpen()).toBe(true);

        // Second tap: closed on the way down. What follows is its echo.
        await touch(trigger());
        expect(isOpen()).toBe(false);
        await fireEvent.pointerUp(trigger(), { pointerId: 1, pointerType: "touch" });
        wrapper().dispatchEvent(new MouseEvent("mouseenter"));
        await fireEvent.focusIn(trigger());
        await fireEvent.click(trigger());
        expect(isOpen(), "Still closed").toBe(false);

        // And a tap that opened it is not closed by the mouseleave made up later.
        await touch(trigger());
        await leave();
        expect(isOpen()).toBe(true);
    });

    it("hover and focus are as they were: no timer, and scrolling does not close", async () => {
        vi.useFakeTimers();
        render(TooltipTouchHarness);
        await enter("mouse");
        expect(isOpen()).toBe(true);
        await vi.advanceTimersByTimeAsync(10_000);
        expect(isOpen(), "No timer under a mouse").toBe(true);
        await fireEvent.scroll(window);
        expect(isOpen(), "Scrolling leaves a hovered tooltip").toBe(true);
        await leave();
        expect(isOpen()).toBe(false);

        trigger().focus();
        await fireEvent.focusIn(trigger());
        expect(isOpen(), "Keyboard focus opens it").toBe(true);
        await vi.advanceTimersByTimeAsync(10_000);
        expect(isOpen(), "No timer under the keyboard").toBe(true);
    });

    it("a finger after a mouse, and a mouse after a finger, each work", async () => {
        vi.useFakeTimers();
        render(TooltipTouchHarness);
        await touch(trigger());
        await vi.advanceTimersByTimeAsync(3000);
        expect(isOpen()).toBe(false);

        // Without the pointer saying it is a mouse, a mouseenter is still the tap's echo.
        wrapper().dispatchEvent(new MouseEvent("mouseenter"));
        await Promise.resolve();
        expect(isOpen()).toBe(false);
        await enter("mouse");
        expect(isOpen(), "The mouse is listened to again").toBe(true);
    });

    it("a disabled tooltip does not open on a tap", async () => {
        render(TooltipTouchHarness, { disabled: true });
        await touch(trigger());
        expect(screen.queryByRole("tooltip", { hidden: true })).toBeNull();
        expect(trigger().hasAttribute("aria-describedby")).toBe(false);
    });
});

describe("viewport-fit", () => {
    const viewport = { width: 320, height: 568 };
    const size = { width: 200, height: 40 };
    const at = (left: number, top: number, width = 40, height = 40) => ({
        left,
        top,
        right: left + width,
        bottom: top + height,
    });

    it("keeps the preferred side when there is room", () => {
        expect(pickSide("top", at(140, 300), size, viewport)).toBe("top");
        expect(pickSide("bottom", at(140, 300), size, viewport)).toBe("bottom");
    });

    it("takes the opposite side when only that has room", () => {
        // 10px above: a 40px box with its 8px gap and 8px margin does not fit.
        expect(pickSide("top", at(140, 10), size, viewport)).toBe("bottom");
        expect(pickSide("bottom", at(140, 520), size, viewport)).toBe("top");
        expect(pickSide("left", at(10, 300), size, viewport)).toBe("right");
    });

    it("with room on neither side, takes the one with more", () => {
        const tall = { width: 200, height: 400 };
        expect(pickSide("top", at(140, 100), tall, viewport)).toBe("bottom");
        expect(pickSide("top", at(140, 400), tall, viewport)).toBe("top");
        // On a 320px screen a 200px box fits on neither side of a centred trigger.
        expect(pickSide("left", at(140, 300), size, viewport)).toBe("left");
    });

    it("counts the gap and the margin", () => {
        // 56px above: exactly the 40px box, 8px gap and 8px margin.
        expect(pickSide("top", at(140, 56), size, viewport)).toBe("top");
        expect(pickSide("top", at(140, 55), size, viewport)).toBe("bottom");
        expect(pickSide("top", at(140, 55), size, viewport, { gap: 0, margin: 0 })).toBe("top");
    });

    it("moves a box back on screen, by no more than it takes", () => {
        expect(shiftIntoViewport({ left: 60, right: 260, top: 100, bottom: 140 }, viewport)).toEqual({
            x: 0,
            y: 0,
        });
        expect(shiftIntoViewport({ left: -84, right: 116, top: 100, bottom: 140 }, viewport)).toEqual({
            x: 92,
            y: 0,
        });
        expect(shiftIntoViewport({ left: 204, right: 404, top: 100, bottom: 140 }, viewport)).toEqual({
            x: -92,
            y: 0,
        });
        expect(shiftIntoViewport({ left: 60, right: 260, top: -20, bottom: 20 }, viewport).y).toBe(28);
        expect(shiftIntoViewport({ left: 60, right: 260, top: 540, bottom: 580 }, viewport, 0).y).toBe(-12);
    });

    it("starts a box wider than the screen at the start edge", () => {
        expect(shiftIntoViewport({ left: -40, right: 360, top: 100, bottom: 140 }, viewport).x).toBe(48);
    });
});

describe("Modal fullScreen", () => {
    const panel = () => screen.getByTestId("panel");
    const close = () => screen.getByRole("button", { name: "Close" });

    it("without the prop the dialog is what it was, with its height limit in dvh", () => {
        render(ModalFullScreenHarness, { initialOpen: true });
        const classes = classesOf(panel());
        expect(panel().hasAttribute("data-full-screen")).toBe(false);
        expect(classes).toContain("max-h-[90dvh]");
        expect(classes.join(" ")).not.toContain("90vh]");
        expect(classes).toEqual(
            expect.arrayContaining(["rounded-t-overlay", "md:rounded-overlay", "overflow-y-auto", "border"]),
        );
        expect(classes).not.toContain("h-dvh");
        expect(classes.some((name) => name.startsWith("max-md:"))).toBe(false);
        expect(panel().querySelector("[data-modal-content]")).toBeNull();
        expect(classesOf(panel().parentElement)).toContain("md:p-4");
    });

    it("true fills the screen at every width: dvh, square, no margin", () => {
        render(ModalFullScreenHarness, { initialOpen: true, fullScreen: true });
        const classes = classesOf(panel());
        expect(panel().getAttribute("data-full-screen")).toBe("true");
        expect(classes).toEqual(
            expect.arrayContaining(["h-dvh", "max-h-none", "rounded-none", "md:rounded-none", "border-0", "md:w-full"]),
        );
        // What it replaces is gone, not merely outweighed.
        for (const gone of ["max-h-[90dvh]", "rounded-t-overlay", "md:rounded-overlay", "md:w-[28rem]", "border"]) {
            expect(classes, gone).not.toContain(gone);
        }
        const backdrop = classesOf(panel().parentElement);
        expect(backdrop).toContain("md:p-0");
        expect(backdrop).not.toContain("md:p-4");
    });

    it('"mobile" does the same below md only', () => {
        render(ModalFullScreenHarness, { initialOpen: true, fullScreen: "mobile" });
        const classes = classesOf(panel());
        expect(panel().getAttribute("data-full-screen")).toBe("mobile");
        expect(classes).toEqual(
            expect.arrayContaining(["max-md:h-dvh", "max-md:max-h-none", "max-md:rounded-none", "max-md:border-0"]),
        );
        // From md up it is the dialog: its width, its corners, its limit.
        expect(classes).toEqual(
            expect.arrayContaining(["md:w-[28rem]", "md:rounded-overlay", "max-h-[90dvh]"]),
        );
        expect(classes).not.toContain("h-dvh");
        expect(classesOf(panel().parentElement)).toContain("md:p-4");
    });

    it("header, content and footer: the ends are fixed inside the safe areas, the middle scrolls", () => {
        render(ModalFullScreenHarness, { initialOpen: true, fullScreen: true });
        const header = classesOf(panel().querySelector("header")).join(" ");
        expect(header).toContain("shrink-0");
        expect(header).toContain("env(safe-area-inset-top,0px)");
        expect(header).toContain("env(safe-area-inset-left,0px)");
        expect(header).toContain("env(safe-area-inset-right,0px)");

        const content = panel().querySelector("[data-modal-content]");
        expect(content).not.toBeNull();
        expect(classesOf(content)).toEqual(
            expect.arrayContaining(["overflow-y-auto", "min-h-0", "flex-1", "overscroll-contain"]),
        );
        expect(content!.contains(screen.getByTestId("first-field"))).toBe(true);
        expect(content!.contains(close())).toBe(false);
        expect(content!.contains(screen.getByTestId("save"))).toBe(false);

        const footer = classesOf(panel().querySelector("footer")).join(" ");
        expect(footer).toContain("shrink-0");
        expect(footer).toContain("env(safe-area-inset-bottom,0px)");
        expect(footer).toContain("flex-wrap");
    });

    it("without a footer the content itself ends above the home indicator", () => {
        render(ModalFullScreenHarness, { initialOpen: true, fullScreen: true, withFooter: false });
        expect(panel().querySelector("footer")).toBeNull();
        expect(classesOf(panel().querySelector("[data-modal-content]")).join(" ")).toContain(
            "pb-[max(24px,calc(env(safe-area-inset-bottom,0px)_+_8px))]",
        );
    });

    it("without a header the content starts below the status bar", () => {
        render(ModalFullScreenHarness, {
            initialOpen: true,
            fullScreen: true,
            title: "",
            showClose: false,
        });
        expect(panel().querySelector("header")).toBeNull();
        expect(classesOf(panel().querySelector("[data-modal-content]")).join(" ")).toContain(
            "pt-[max(24px,calc(env(safe-area-inset-top,0px)_+_8px))]",
        );
    });

    it("the close button is named, keeps its size and has the 44px touch layer", () => {
        render(ModalFullScreenHarness, { initialOpen: true, fullScreen: true });
        const classes = classesOf(close());
        expect(classes).toEqual(expect.arrayContaining(TOUCH_HIT_AREA.split(" ")));
        expect(classes).toEqual(expect.arrayContaining(["size-8", "shrink-0", "focus-ring"]));
        // Beside it the title may wrap; it does not push the button out.
        expect(classesOf(screen.getByRole("heading", { name: "New quiz round" }))).toContain("min-w-0");
    });

    it.each([true, "mobile"] as const)("fullScreen=%s is the same dialog: named, modal, trapped", async (fullScreen) => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(ModalFullScreenHarness, { fullScreen, onclose });
        await user.click(screen.getByTestId("opener"));

        const dialog = screen.getByRole("dialog", { name: "New quiz round" });
        expect(dialog).toBe(panel());
        expect(dialog.getAttribute("aria-modal")).toBe("true");
        expect(document.body.style.overflow).toBe("hidden");
        await waitFor(() => expect(document.activeElement).toBe(close()));

        // Backwards from the first control is the last; forwards from the last is the first.
        await user.keyboard("{Shift>}{Tab}{/Shift}");
        expect(document.activeElement).toBe(screen.getByTestId("save"));
        await user.keyboard("{Tab}");
        expect(document.activeElement).toBe(close());
        await user.keyboard("{Tab}");
        expect(document.activeElement).toBe(screen.getByTestId("first-field"));

        await user.keyboard("{Escape}");
        expect(screen.queryByRole("dialog")).toBeNull();
        expect(onclose).toHaveBeenCalledWith({ reason: "escape" });
        expect(document.activeElement).toBe(screen.getByTestId("opener"));
        expect(document.body.style.overflow).toBe("");
    });

    it("dismissible={false} still holds it, and portal still moves it to the body", async () => {
        const user = userEvent.setup();
        render(ModalFullScreenHarness, {
            initialOpen: true,
            fullScreen: true,
            dismissible: false,
            portal: true,
        });
        await waitFor(() =>
            expect(screen.getByTestId("host").contains(panel())).toBe(false),
        );
        expect(close().getAttribute("aria-disabled")).toBe("true");
        await user.keyboard("{Escape}");
        await user.click(close());
        expect(screen.getByRole("dialog")).toBeTruthy();
    });

    it("content with nothing to focus is not a Tab stop where it does not scroll", () => {
        // jsdom has no layout: nothing overflows, so the box stays out of the tab order.
        render(ModalFullScreenHarness, { initialOpen: true, fullScreen: true, withFields: false });
        const content = panel().querySelector("[data-modal-content]")!;
        expect(content.hasAttribute("tabindex")).toBe(false);
        expect(content.hasAttribute("role")).toBe(false);
    });

    it("ConfirmDialog, built on Modal, is never full screen", () => {
        render(ConfirmDialogHarness, { initialOpen: true });
        const dialog = screen.getByRole("alertdialog");
        expect(dialog.hasAttribute("data-full-screen")).toBe(false);
        const classes = classesOf(dialog);
        expect(classes).toContain("max-h-[90dvh]");
        expect(classes).toContain("md:w-[24rem]");
        expect(classes).not.toContain("h-dvh");
        expect(classes.some((name) => name.startsWith("max-md:"))).toBe(false);
        expect(dialog.querySelector("[data-modal-content]")).toBeNull();
    });
});

describe("Page safeArea", () => {
    const page = () => screen.getByTestId("host").firstElementChild!;
    const SAFE = [
        "pb-[env(safe-area-inset-bottom,0px)]",
        "pl-[env(safe-area-inset-left,0px)]",
        "pr-[env(safe-area-inset-right,0px)]",
    ];

    it("pads the left, right and bottom by the insets, and not the top", () => {
        render(PageSafeAreaHarness);
        expect(classesOf(page())).toEqual(expect.arrayContaining(SAFE));
        expect(classesOf(page())).toEqual(expect.arrayContaining(["mx-auto", "w-full", "space-y-10"]));
        expect(page().getAttribute("class")).not.toContain("safe-area-inset-top");
        expect(page().hasAttribute("data-safe-area")).toBe(true);
    });

    it("adds nothing with safeArea={false}", () => {
        render(PageSafeAreaHarness, { safeArea: false });
        expect(page().getAttribute("class")).not.toContain("safe-area");
        expect(page().hasAttribute("data-safe-area")).toBe(false);
    });

    it("adds nothing inside an AppShell, which has already kept clear", () => {
        render(PageSafeAreaHarness, { inShell: true });
        expect(page().getAttribute("class")).not.toContain("safe-area");
        expect(page().hasAttribute("data-safe-area")).toBe(false);
        // The shell's own content element is where the insets are applied, once.
        expect(page().closest("[data-app-shell-content]")!.getAttribute("class")).toContain(
            "safe-area-inset-left",
        );
    });

    it("a class from the caller still wins, as it does everywhere", () => {
        render(PageSafeAreaHarness, { class: "max-w-4xl px-4" });
        const classes = classesOf(page());
        expect(classes).toEqual(expect.arrayContaining(["max-w-4xl", "px-4", SAFE[0]]));
        expect(classes).not.toContain(SAFE[1]);
        expect(classes).not.toContain(SAFE[2]);
    });
});

describe("Toaster and Toast at the edges of a phone", () => {
    afterEach(() => toastStore.clear());

    it("the region is offset by the shell's bar, the home indicator and a bar of your own", () => {
        const { container } = render(Toaster);
        const region = container.querySelector("[data-zabi-toaster]")!;
        const classes = region.getAttribute("class")!;
        expect(region.getAttribute("role")).toBe("region");
        expect(region.getAttribute("aria-label")).toBe("Notifications");
        const bottom = classesOf(region).find((name) => name.startsWith("bottom-"))!;
        expect(bottom).toContain("max(var(--app-shell-bottom-inset,0px),env(safe-area-inset-bottom,0px))");
        expect(bottom).toContain("var(--toaster-bottom-offset,0px)");
        expect(classes).toContain("env(safe-area-inset-right,0px)");
        expect(classes).toContain("env(safe-area-inset-left,0px)");
        // From 640px up: 1rem from the edges, 24rem wide, 1rem of padding, as before.
        expect(classesOf(region)).toEqual(
            expect.arrayContaining([
                "sm:[--toaster-edge:1rem]",
                "sm:[--toaster-width:24rem]",
                "sm:[--toaster-padding:1rem]",
                "[--toaster-edge:0px]",
                "[--toaster-width:100vw]",
                "[--toaster-padding:16px]",
            ]),
        );
    });

    it("a class or a style from the caller reaches the region, and a class replaces the default", () => {
        const { container } = render(Toaster, {
            class: "bottom-20",
            style: "--toaster-bottom-offset: 65px",
        });
        const region = container.querySelector<HTMLElement>("[data-zabi-toaster]")!;
        expect(region.style.getPropertyValue("--toaster-bottom-offset")).toBe("65px");
        const bottoms = classesOf(region).filter((name) => /(^|:)bottom-/.test(name));
        expect(bottoms).toEqual(["bottom-20"]);
        expect(region.getAttribute("role")).toBe("region");
    });

    it("a toast is never wider than the stack it is in", async () => {
        const { container } = render(Toaster);
        pushToast({ message: "Saved", type: "success" });
        await waitFor(() => expect(container.querySelector("[data-toast-id]")).not.toBeNull());
        const toast = classesOf(container.querySelector("[data-toast-id]"));
        expect(toast).toContain("min-w-[min(18rem,100%)]");
        expect(toast).not.toContain("min-w-[18rem]");
    });

    it("the Toast atom keeps below the status bar and an AppShell's top bar", () => {
        const { container } = render(Toast, { message: "Round starts", closable: true });
        const alert = screen.getByRole("alert");
        const wrapper = alert.parentElement!.getAttribute("class")!;
        expect(wrapper).toContain("max(var(--app-shell-top-inset,0px),env(safe-area-inset-top,0px))_+_1rem");
        expect(wrapper).toContain("env(safe-area-inset-right,0px)_+_1rem");
        expect(wrapper).toContain("env(safe-area-inset-left,0px)_+_1rem");
        expect(wrapper).toContain("sm:left-auto");
        expect(classesOf(alert)).toContain("min-w-[min(18rem,100%)]");
        expect(container.querySelector("button")!.getAttribute("aria-label")).toBe("Close notification");
    });
});

describe("a disabled checkbox or radio", () => {
    it.each([
        ["Checkbox", Checkbox, { label: "Agree", disabled: true }],
        ["Radio", Radio, { label: "Agree", name: "agree", value: "yes", disabled: true }],
    ] as const)("%s: the pressed dip and the hover fills are for an enabled control only", (_name, component, props) => {
        const { container } = render(component as typeof Checkbox, { props });
        const shell = classesOf(container.querySelector(".group\\/control"));
        // Never unconditional: the row around a disabled input still matches :active and :hover.
        expect(shell).not.toContain("group-active:scale-95");
        expect(shell).not.toContain("group-hover:border-brand-500");
        expect(shell).not.toContain("group-hover:bg-brand-50");
        expect(shell).toEqual(
            expect.arrayContaining([
                "not-has-[:disabled]:group-active:scale-95",
                "not-has-[:disabled]:group-hover:border-brand-500",
                "not-has-[:disabled]:group-hover:bg-brand-50",
                // The checked hover is undone for a disabled control by a heavier rule.
                "has-[:disabled]:has-[:checked]:group-hover:bg-action-primary",
                "has-[:disabled]:has-[:checked]:group-hover:border-action-primary",
                "has-[:disabled]:opacity-50",
            ]),
        );
        expect(container.querySelector("input")!.disabled).toBe(true);
    });
});

describe("FloatingActionButton focus ring", () => {
    it("is the shared focus ring, which now composes with the button's shadow", () => {
        render(FloatingActionButton, { label: "New quiz" });
        const classes = classesOf(screen.getByRole("button", { name: "New quiz" }));
        expect(classes).toContain("focus-ring");
        expect(classes).toContain("shadow-lg");
        expect(classes.some((name) => name.startsWith("focus-visible:shadow-"))).toBe(false);
    });
});
