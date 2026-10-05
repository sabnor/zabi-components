import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import BottomSheetHarness from "./fixtures/BottomSheetHarness.svelte";
import { nextSnap, normaliseSnapPoints, settleSnap } from "../src/components/util/bottom-sheet";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
});

const sheet = () => screen.getByRole("dialog", { name: "Filters" });
const maybeSheet = () => screen.queryByRole("dialog");
const opener = () => screen.getByTestId("opener");
const state = () => screen.getByTestId("state").textContent;
const header = () => sheet().querySelector<HTMLElement>("[data-sheet-grip]")!.parentElement!;
const scroller = () => sheet().querySelector<HTMLElement>("[data-bottom-sheet-content]")!;
const grip = () => sheet().querySelector<HTMLElement>("[data-sheet-grip]")!;

async function openSheet(props: Record<string, unknown> = {}) {
    const user = userEvent.setup();
    render(BottomSheetHarness, { props });
    await user.click(opener());
    await waitFor(() => expect(maybeSheet()).not.toBeNull());
    return user;
}

/**
 * jsdom has no layout. A screen 800px tall with nothing under the status bar:
 * half is 400px and full is 800px. The panel reports the height of the snap
 * point it is at.
 */
function layOut() {
    const root = sheet().parentElement!;
    Object.defineProperty(root, "clientHeight", { configurable: true, value: 800 });
    vi.spyOn(sheet(), "getBoundingClientRect").mockImplementation(
        () =>
            ({
                height: sheet().getAttribute("data-snap") === "full" ? 800 : 400,
                width: 375,
                top: 0,
                left: 0,
                right: 375,
                bottom: 800,
                x: 0,
                y: 0,
            }) as DOMRect,
    );
}

/** A clock the test moves, so a drag has the speed the test gives it. */
function clock() {
    let time = 1000;
    vi.spyOn(performance, "now").mockImplementation(() => time);
    return (ms: number) => {
        time += ms;
    };
}

/**
 * A drag on the grip with a pointer, from y=400 by `distance` px (positive is
 * down), taking `duration` ms and resting `hold` ms before the release.
 */
async function dragGrip(distance: number, { duration = 400, hold = 200 } = {}) {
    const tick = clock();
    const target = grip();
    const steps = 10;
    await fireEvent.pointerDown(target, { pointerId: 1, button: 0, clientY: 400 });
    for (let step = 1; step <= steps; step += 1) {
        tick(duration / steps);
        await fireEvent.pointerMove(target, {
            pointerId: 1,
            clientY: 400 + (distance * step) / steps,
        });
    }
    if (hold > 0) {
        tick(hold);
        await fireEvent.pointerMove(target, { pointerId: 1, clientY: 400 + distance });
    }
    await fireEvent.pointerUp(target, { pointerId: 1, clientY: 400 + distance });
}

const touch = (target: Element, clientY: number) => ({ identifier: 7, target, clientY, clientX: 100 });

async function swipeContent(distance: number) {
    const tick = clock();
    const target = scroller();
    await fireEvent.touchStart(target, { touches: [touch(target, 300)] });
    for (let step = 1; step <= 10; step += 1) {
        tick(40);
        await fireEvent.touchMove(target, {
            touches: [touch(target, 300 + (distance * step) / 10)],
            cancelable: true,
        });
    }
    tick(200);
    await fireEvent.touchMove(target, { touches: [touch(target, 300 + distance)], cancelable: true });
    await fireEvent.touchEnd(target, { changedTouches: [touch(target, 300 + distance)] });
}

describe("BottomSheet semantics", () => {
    it("renders nothing while closed", () => {
        render(BottomSheetHarness);
        expect(maybeSheet()).toBeNull();
        expect(document.body.style.overflow).toBe("");
    });

    it("is a modal dialog named by its title and described by its description", async () => {
        await openSheet({ description: "Narrow the list." });
        expect(sheet().getAttribute("aria-modal")).toBe("true");
        expect(within(sheet()).getByRole("heading", { level: 2, name: "Filters" })).toBeTruthy();
        const describedBy = sheet().getAttribute("aria-describedby")!;
        expect(document.getElementById(describedBy)?.textContent?.trim()).toBe("Narrow the list.");
        expect(sheet().getAttribute("data-testid"), "Other attributes land on the panel").toBe("sheet");
    });

    it("has no description wiring without a description", async () => {
        await openSheet();
        expect(sheet().hasAttribute("aria-describedby")).toBe(false);
    });

    it("renders in document.body by default, and in place with portal false", async () => {
        await openSheet();
        expect(sheet().parentElement?.parentElement).toBe(document.body);
        cleanup();
        await openSheet({ portal: false });
        expect(screen.getByTestId("host").contains(sheet())).toBe(true);
    });

    it("locks the page behind it while open, and releases it on close", async () => {
        const user = await openSheet();
        expect(document.body.style.overflow).toBe("hidden");
        await user.keyboard("{Escape}");
        expect(maybeSheet()).toBeNull();
        expect(document.body.style.overflow).toBe("");
    });

    it("keeps clear of the status bar and the home indicator, and of motion when it is unwanted", async () => {
        await openSheet();
        expect(sheet().className).toContain("pb-[env(safe-area-inset-bottom)]");
        expect(sheet().className).toContain("max-h-[calc(100dvh-env(safe-area-inset-top,0px))]");
        expect(sheet().parentElement!.className).toContain("pt-[env(safe-area-inset-top)]");
        expect(sheet().className).toContain("motion-reduce:transition-none");
        // The grip's mark is drawn where colours are forced.
        expect(grip().querySelector("span")!.className).toContain("forced-colors:bg-[CanvasText]");
    });
});

describe("BottomSheet snap points", () => {
    // The heights themselves need a stylesheet and layout, and jsdom does not
    // parse `min()` and `max()`: they are in playwright/bottom-sheet.spec.ts.
    it("opens at the lowest snap point", async () => {
        await openSheet();
        expect(sheet().getAttribute("data-snap")).toBe("half");
        expect(state(), "The bound value is left alone until the sheet moves").toBe("open:unset");
    });

    it("opens at the snap point it is given", async () => {
        await openSheet({ initialSnap: "full" });
        expect(sheet().getAttribute("data-snap")).toBe("full");
        // Full height stops at the status bar.
        expect(sheet().style.height).toContain("safe-area-inset-top");
        expect(sheet().style.height).not.toContain("50%");
    });

    it("falls back to the lowest one in use when given one that is not", async () => {
        await openSheet({ initialSnap: "full", snapPoints: ["half"] });
        expect(sheet().getAttribute("data-snap")).toBe("half");
    });

    it("the grip is a button named by what it will do, and does it", async () => {
        const user = await openSheet();
        const expand = within(sheet()).getByRole("button", { name: "Expand" });
        expect(expand).toBe(grip());
        await user.click(expand);
        expect(sheet().getAttribute("data-snap")).toBe("full");
        expect(state()).toBe("open:full");

        const collapse = within(sheet()).getByRole("button", { name: "Collapse" });
        expect(collapse, "The same button, renamed").toBe(expand);
        await user.click(collapse);
        expect(sheet().getAttribute("data-snap")).toBe("half");
        expect(state()).toBe("open:half");
    });

    it("works the grip from the keyboard with Enter and Space", async () => {
        const user = await openSheet();
        await waitFor(() => expect(document.activeElement).toBe(grip()));
        await user.keyboard("{Enter}");
        expect(sheet().getAttribute("data-snap")).toBe("full");
        await user.keyboard(" ");
        expect(sheet().getAttribute("data-snap")).toBe("half");
        expect(document.activeElement).toBe(grip());
    });

    it("takes the grip's wording from expandLabel and collapseLabel", async () => {
        const user = await openSheet({ expandLabel: "Visa mer", collapseLabel: "Visa mindre" });
        await user.click(within(sheet()).getByRole("button", { name: "Visa mer" }));
        expect(within(sheet()).getByRole("button", { name: "Visa mindre" })).toBeTruthy();
    });

    it("with one snap point the grip is not a control", async () => {
        await openSheet({ snapPoints: ["full"] });
        expect(sheet().getAttribute("data-snap")).toBe("full");
        expect(grip().tagName).toBe("DIV");
        expect(within(sheet()).queryByRole("button", { name: "Expand" })).toBeNull();
        expect(within(sheet()).queryByRole("button", { name: "Collapse" })).toBeNull();
        // The close button is then the first control, and takes the focus.
        await waitFor(() =>
            expect(document.activeElement).toBe(within(sheet()).getByRole("button", { name: "Close" })),
        );
    });
});

describe("BottomSheet focus and closing", () => {
    it("moves focus in, keeps Tab inside, and returns focus to the opener", async () => {
        const user = await openSheet();
        await waitFor(() => expect(document.activeElement).toBe(grip()));
        const stops = [
            grip(),
            within(sheet()).getByRole("button", { name: "Close" }),
            within(sheet()).getByLabelText("Search"),
            within(sheet()).getByRole("button", { name: "Show results" }),
        ];
        for (const stop of stops.slice(1)) {
            await user.tab();
            expect(document.activeElement).toBe(stop);
        }
        await user.tab();
        expect(document.activeElement, "Tab wraps to the first control").toBe(stops[0]);
        await user.tab({ shift: true });
        expect(document.activeElement, "Shift+Tab wraps to the last").toBe(stops[3]);

        await user.keyboard("{Escape}");
        expect(maybeSheet()).toBeNull();
        expect(document.activeElement).toBe(opener());
    });

    it("starts on the control initialFocus names", async () => {
        await openSheet({ initialFocus: "#sheet-search" });
        await waitFor(() =>
            expect(document.activeElement).toBe(within(sheet()).getByLabelText("Search")),
        );
    });

    it.each([
        ["Escape", "escape", async (user: ReturnType<typeof userEvent.setup>) => user.keyboard("{Escape}")],
        [
            "the close button",
            "close-button",
            async (user: ReturnType<typeof userEvent.setup>) =>
                user.click(within(sheet()).getByRole("button", { name: "Close" })),
        ],
        [
            "the backdrop",
            "backdrop",
            async (user: ReturnType<typeof userEvent.setup>) => user.click(sheet().parentElement!),
        ],
    ])("closes with %s and says so", async (_name, reason, act) => {
        const onclose = vi.fn();
        const user = await openSheet({ onclose });
        await act(user);
        expect(maybeSheet()).toBeNull();
        expect(onclose).toHaveBeenCalledTimes(1);
        expect(onclose).toHaveBeenCalledWith({ reason });
        expect(state()).toContain("closed");
    });

    it("does not close on a click inside the panel", async () => {
        const onclose = vi.fn();
        const user = await openSheet({ onclose });
        await user.click(within(sheet()).getByText("Pick what to show."));
        expect(maybeSheet()).not.toBeNull();
        expect(onclose).not.toHaveBeenCalled();
    });

    it("says nothing when the parent closes it", async () => {
        const onclose = vi.fn();
        const user = await openSheet({ onclose });
        await user.click(within(sheet()).getByRole("button", { name: "Show results" }));
        expect(maybeSheet()).toBeNull();
        expect(onclose).not.toHaveBeenCalled();
        expect(document.activeElement).toBe(opener());
    });

    it("takes its close button's name from closeLabel", async () => {
        await openSheet({ closeLabel: "Stäng" });
        expect(within(sheet()).getByRole("button", { name: "Stäng" })).toBeTruthy();
    });

    it("passes keydowns on after handling Escape", async () => {
        const onkeydown = vi.fn();
        const user = await openSheet({ onkeydown });
        await user.keyboard("a");
        expect(onkeydown).toHaveBeenCalled();
    });

    it("cannot be dismissed when dismissible is false, but the grip still moves it", async () => {
        const onclose = vi.fn();
        const user = await openSheet({ dismissible: false, onclose });
        const close = within(sheet()).getByRole("button", { name: "Close" });
        expect(close.getAttribute("aria-disabled")).toBe("true");
        expect((close as HTMLButtonElement).disabled, "Still focusable, so the trap holds").toBe(false);

        await user.keyboard("{Escape}");
        await user.click(close);
        await user.click(sheet().parentElement!);
        expect(maybeSheet()).not.toBeNull();
        expect(onclose).not.toHaveBeenCalled();

        await user.click(within(sheet()).getByRole("button", { name: "Expand" }));
        expect(sheet().getAttribute("data-snap")).toBe("full");

        layOut();
        await dragGrip(700);
        expect(maybeSheet(), "A swipe down does not close it either").not.toBeNull();
        expect(onclose).not.toHaveBeenCalled();
        // It comes down as far as the lowest snap point, and no further.
        expect(sheet().getAttribute("data-snap")).toBe("half");
    });
});

describe("BottomSheet dragging the grip", () => {
    it("follows the pointer: taller on the way up, then sliding off below the lowest point", async () => {
        await openSheet();
        layOut();
        const tick = clock();
        await fireEvent.pointerDown(grip(), { pointerId: 1, button: 0, clientY: 400 });
        tick(16);
        // Past the slop: the drag begins here.
        await fireEvent.pointerMove(grip(), { pointerId: 1, clientY: 390 });
        expect(sheet().getAttribute("data-dragging")).toBe("true");
        expect(sheet().style.transition).toBe("none");
        tick(16);
        await fireEvent.pointerMove(grip(), { pointerId: 1, clientY: 290 });
        expect(sheet().style.height).toBe("500px");
        expect(sheet().style.transform).toBe("");

        tick(16);
        await fireEvent.pointerMove(grip(), { pointerId: 1, clientY: 490 });
        // 100px below where it rests at half: its size is kept and it slides.
        expect(sheet().style.height).toBe("400px");
        expect(sheet().style.transform).toBe("translateY(100px)");

        tick(16);
        await fireEvent.pointerMove(grip(), { pointerId: 1, clientY: -600 });
        expect(sheet().style.height, "Never taller than full").toBe("800px");
    });

    it("a slow drag up settles on full, and back down on half", async () => {
        await openSheet();
        layOut();
        await dragGrip(-300);
        expect(sheet().getAttribute("data-snap")).toBe("full");
        expect(state()).toBe("open:full");
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
        // The drag's px height is gone: the snap point's own height is back.
        expect(sheet().style.height).not.toMatch(/^\d+px$/);
        expect(sheet().style.height).not.toContain("50%");
        expect(sheet().style.transition).toBe("");

        await dragGrip(320);
        expect(sheet().getAttribute("data-snap")).toBe("half");
    });

    it("a slow drag that stops nearer to where it began goes back there", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose });
        layOut();
        await dragGrip(-150);
        expect(sheet().getAttribute("data-snap")).toBe("half");
        await dragGrip(150);
        expect(sheet().getAttribute("data-snap")).toBe("half");
        expect(maybeSheet()).not.toBeNull();
        expect(onclose).not.toHaveBeenCalled();
        expect(sheet().style.transform).toBe("");
    });

    it("a drag down past the lowest snap point closes with reason swipe, and returns focus", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose });
        layOut();
        await dragGrip(260);
        expect(maybeSheet()).toBeNull();
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
        expect(document.activeElement).toBe(opener());
        expect(document.body.style.overflow).toBe("");
    });

    it("a flick decides by direction, not by distance", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose });
        layOut();
        // 60px up in 60ms, no rest: far short of halfway to full.
        await dragGrip(-60, { duration: 60, hold: 0 });
        expect(sheet().getAttribute("data-snap")).toBe("full");
        // One step per flick: from full a flick down stops at half...
        await dragGrip(60, { duration: 60, hold: 0 });
        expect(sheet().getAttribute("data-snap")).toBe("half");
        expect(onclose).not.toHaveBeenCalled();
        // ...and the next one closes.
        await dragGrip(60, { duration: 60, hold: 0 });
        expect(maybeSheet()).toBeNull();
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
    });

    it("a drag is not a press of the grip, and a press without movement is", async () => {
        const user = await openSheet();
        layOut();
        await dragGrip(-300);
        // The click a browser sends after the release must not toggle it back.
        await fireEvent.click(grip());
        expect(sheet().getAttribute("data-snap")).toBe("full");

        await new Promise((resolve) => setTimeout(resolve, 5));
        await user.click(grip());
        expect(sheet().getAttribute("data-snap")).toBe("half");
    });

    it("does not start a drag from the close button", async () => {
        await openSheet();
        layOut();
        const close = within(sheet()).getByRole("button", { name: "Close" });
        await fireEvent.pointerDown(close, { pointerId: 1, button: 0, clientY: 400 });
        await fireEvent.pointerMove(close, { pointerId: 1, clientY: 600 });
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
        await fireEvent.pointerUp(close, { pointerId: 1, clientY: 600 });
        expect(maybeSheet()).not.toBeNull();
    });

    it("drags from the rest of the header too, and ignores other mouse buttons", async () => {
        await openSheet();
        layOut();
        const title = within(sheet()).getByRole("heading");
        await fireEvent.pointerDown(title, { pointerId: 1, button: 2, pointerType: "mouse", clientY: 400 });
        await fireEvent.pointerMove(title, { pointerId: 1, clientY: 300 });
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
        await fireEvent.pointerUp(title, { pointerId: 1, clientY: 300 });

        await fireEvent.pointerDown(title, { pointerId: 2, button: 0, pointerType: "mouse", clientY: 400 });
        await fireEvent.pointerMove(title, { pointerId: 2, clientY: 380 });
        expect(sheet().getAttribute("data-dragging")).toBe("true");
        expect(header().className).toContain("touch-none");
    });

    it("puts the sheet back when the browser cancels the gesture", async () => {
        await openSheet();
        layOut();
        await fireEvent.pointerDown(grip(), { pointerId: 1, button: 0, clientY: 400 });
        await fireEvent.pointerMove(grip(), { pointerId: 1, clientY: 380 });
        await fireEvent.pointerMove(grip(), { pointerId: 1, clientY: 200 });
        expect(sheet().style.height).toBe("580px");
        await fireEvent.pointerCancel(grip(), { pointerId: 1, clientY: 200 });
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
        expect(sheet().getAttribute("data-snap")).toBe("half");
        expect(sheet().style.transition).toBe("");
        expect(sheet().style.transform).toBe("");
    });
});

describe("BottomSheet touching the content", () => {
    it("a swipe down from the top of the content moves the sheet and closes it", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose });
        layOut();
        await swipeContent(300);
        expect(maybeSheet()).toBeNull();
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
    });

    it("takes the gesture from the browser once it is the sheet's", async () => {
        await openSheet();
        layOut();
        const target = scroller();
        await fireEvent.touchStart(target, { touches: [touch(target, 300)] });
        const first = new TouchEvent("touchmove", {
            bubbles: true,
            cancelable: true,
            touches: [touch(target, 320) as unknown as Touch],
        });
        target.dispatchEvent(first);
        expect(first.defaultPrevented, "No scrolling and no pull-to-refresh under a drag").toBe(true);
        await waitFor(() => expect(sheet().getAttribute("data-dragging")).toBe("true"));
    });

    it("leaves a swipe up to the content: it scrolls, the sheet stays", async () => {
        await openSheet();
        layOut();
        const target = scroller();
        await fireEvent.touchStart(target, { touches: [touch(target, 300)] });
        const move = new TouchEvent("touchmove", {
            bubbles: true,
            cancelable: true,
            touches: [touch(target, 200) as unknown as Touch],
        });
        target.dispatchEvent(move);
        expect(move.defaultPrevented).toBe(false);
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
        await fireEvent.touchEnd(target, { changedTouches: [touch(target, 200)] });
        expect(sheet().getAttribute("data-snap")).toBe("half");
    });

    it("leaves a swipe down to the content while the content is scrolled", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose });
        layOut();
        scroller().scrollTop = 120;
        await swipeContent(300);
        expect(maybeSheet()).not.toBeNull();
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
        expect(onclose).not.toHaveBeenCalled();
    });
});

describe("snap point arithmetic", () => {
    it("keeps the snap points in use in order, and falls back to both", () => {
        expect(normaliseSnapPoints(["full", "half"])).toEqual(["half", "full"]);
        expect(normaliseSnapPoints(["full"])).toEqual(["full"]);
        expect(normaliseSnapPoints([])).toEqual(["half", "full"]);
        expect(normaliseSnapPoints(undefined)).toEqual(["half", "full"]);
    });

    it("steps up, and from the top back down", () => {
        expect(nextSnap(["half", "full"], "half")).toBe("full");
        expect(nextSnap(["half", "full"], "full")).toBe("half");
        expect(nextSnap(["half"], "half")).toBeNull();
    });

    it("settles on the nearest point, with closed at height 0", () => {
        const base = { heights: [400, 800], startIndex: 0, velocity: 0, flick: 0.5, canClose: true };
        expect(settleSnap({ ...base, height: 650 })).toBe(1);
        expect(settleSnap({ ...base, height: 550 })).toBe(0);
        expect(settleSnap({ ...base, height: 250 })).toBe(0);
        expect(settleSnap({ ...base, height: 150 })).toBe(-1);
        expect(settleSnap({ ...base, height: 150, canClose: false })).toBe(0);
    });

    it("lets a flick go one step, and never past an end", () => {
        const base = { heights: [400, 800], height: 400, flick: 0.5, canClose: true };
        expect(settleSnap({ ...base, startIndex: 0, velocity: -1 })).toBe(1);
        expect(settleSnap({ ...base, startIndex: 1, velocity: -1 })).toBe(1);
        expect(settleSnap({ ...base, startIndex: 1, velocity: 1 })).toBe(0);
        expect(settleSnap({ ...base, startIndex: 0, velocity: 1 })).toBe(-1);
        expect(settleSnap({ ...base, startIndex: 0, velocity: 1, canClose: false })).toBe(0);
    });
});
