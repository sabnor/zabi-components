import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { createRawSnippet } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import BottomSheet from "../src/components/molecules/BottomSheet.svelte";
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

/**
 * A clock the test moves, so a drag has the speed the test gives it. The
 * speed is read from the events' own `timeStamp`, so that is what is moved;
 * the page clock moves with it.
 */
function clock() {
    let time = 1000;
    vi.spyOn(performance, "now").mockImplementation(() => time);
    vi.spyOn(Event.prototype, "timeStamp", "get").mockImplementation(() => time);
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

describe("BottomSheet motion", () => {
    // jsdom has no matchMedia, which the component reads as "reduced motion".
    const mediaList = (reduce: boolean) =>
        ((q: string) => ({ matches: reduce && q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })) as never;
    const stubAnimate = (impl?: (...args: unknown[]) => unknown) => {
        const animate = vi.fn(impl ?? (() => ({})));
        HTMLElement.prototype.animate = animate as never;
        window.matchMedia = mediaList(false);
        return animate;
    };
    afterEach(() => {
        delete (HTMLElement.prototype as { animate?: unknown }).animate;
        delete (window as { matchMedia?: unknown }).matchMedia;
    });

    it("carries the thick material as a layer, not a filter on the panel", async () => {
        await openSheet();
        const classes = sheet().getAttribute("class")!.split(/\s+/);
        expect(classes).toContain("material-layer-thick");
        expect(classes).not.toContain("material-thick");
        expect(classes).not.toContain("shadow-lg");
        expect(classes).not.toContain("bg-surface-overlay");
    });

    it("uses the motion tokens for snapping, with a filler under the bottom edge", async () => {
        await openSheet();
        const cls = sheet().getAttribute("class")!;
        // Its own tokens first, then the slow duration and the standard curve: no overshoot (Z-146).
        expect(cls).toContain("duration-(--zabi-sheet-duration,var(--duration-slow))");
        expect(cls).toContain("ease-(--zabi-sheet-ease,var(--ease-standard))");
        expect(cls).not.toContain("ease-spring");
        expect(cls).not.toMatch(/duration-(150|200|300)\b/);
        expect(cls).toContain("after:top-full");
        expect(cls).toContain("after:pointer-events-none");
        // The panel is transparent (its fill is on a layer), so the filler paints the material token.
        expect(cls).toContain("after:bg-(--color-material-thick)");
        expect(cls).not.toContain("after:[background:inherit]");
    });

    it("slides in over the slow duration with the standard easing, not the spring, when the tokens are readable", async () => {
        const animate = stubAnimate();
        const real = window.getComputedStyle;
        vi.spyOn(window, "getComputedStyle").mockImplementation((el, pseudo) => {
            const style = real(el, pseudo);
            return new Proxy(style, {
                get: (t, key) =>
                    key === "getPropertyValue"
                        ? (name: string) =>
                              name === "--duration-slow"
                                  ? "0.3s"
                                  : name === "--ease-standard"
                                    ? " cubic-bezier(0.2, 0, 0, 1) "
                                    : name === "--ease-spring"
                                      ? "linear(0, 1.05, 1)"
                                      : t.getPropertyValue(name)
                        : Reflect.get(t, key).bind?.(t) ?? Reflect.get(t, key),
            });
        });
        await openSheet();
        expect(animate).toHaveBeenCalledTimes(1);
        expect(animate.mock.calls[0][1]).toEqual({ duration: 300, easing: "cubic-bezier(0.2, 0, 0, 1)" });
    });

    it("falls back to 300ms and ease-out without tokens, and when the easing is rejected", async () => {
        const animate = stubAnimate();
        await openSheet();
        expect(animate.mock.calls[0][1]).toEqual({ duration: 300, easing: "ease-out" });
        cleanup();

        const rejecting = stubAnimate((_f, options) => {
            if ((options as { easing: string }).easing !== "ease-out") throw new TypeError("bad easing");
            return {};
        });
        const real = window.getComputedStyle;
        vi.spyOn(window, "getComputedStyle").mockImplementation((el, pseudo) => {
            const style = real(el, pseudo);
            return new Proxy(style, {
                get: (t, key) =>
                    key === "getPropertyValue"
                        ? (name: string) => (name === "--ease-standard" ? "linear(0, 1)" : t.getPropertyValue(name))
                        : Reflect.get(t, key).bind?.(t) ?? Reflect.get(t, key),
            });
        });
        await openSheet();
        expect(rejecting).toHaveBeenCalledTimes(2);
        expect(rejecting.mock.calls[1][1]).toEqual({ duration: 300, easing: "ease-out" });
    });

    it("does not animate under reduced motion", async () => {
        const animate = stubAnimate();
        window.matchMedia = mediaList(true);
        await openSheet();
        expect(animate).not.toHaveBeenCalled();
    });

    it("has no height transition until the slide-in has ended (Z-079)", async () => {
        stubAnimate();
        await openSheet();
        // The slide is on: a change of height now is applied at once, not sprung.
        expect(sheet().style.transition).toBe("none");
        await new Promise((resolve) => setTimeout(resolve, 320));
        expect(sheet().style.transition).toBe("");
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

    it("draws the focus ring of the grip inside its box, clear of the title row", async () => {
        await openSheet();
        const classes = grip().className;
        expect(classes).toContain("focus-ring");
        expect(classes).toContain("focus-visible:[--tw-ring-offset-shadow:inset_");
        expect(classes).toContain("inset_0_0_0_4px_var(--zabi-focus-ring-color)");
        // The ring-offset utilities are guarded against on focus-ring elements.
        expect(classes).not.toMatch(/(^|\s)ring-offset-/);
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

/**
 * jsdom has no layout: whether a box "scrolls" is stubbed with its scroll and
 * client heights. Nothing here was run against a real touch screen.
 */
function scrolls(box: Element, { scrollTop = 0, content = 400, shown = 120 } = {}) {
    Object.defineProperty(box, "scrollHeight", { configurable: true, value: content });
    Object.defineProperty(box, "clientHeight", { configurable: true, value: shown });
    (box as HTMLElement).scrollTop = scrollTop;
}

/** A swipe down of `distance` that starts on `target`, bubbling to the content. */
async function swipeFrom(target: Element, distance: number) {
    const tick = clock();
    await fireEvent.touchStart(target, { touches: [touch(target, 300)] });
    let prevented = false;
    for (let step = 1; step <= 10; step += 1) {
        tick(40);
        const move = new TouchEvent("touchmove", {
            bubbles: true,
            cancelable: true,
            touches: [touch(target, 300 + (distance * step) / 10) as unknown as Touch],
        });
        target.dispatchEvent(move);
        prevented ||= move.defaultPrevented;
    }
    await fireEvent.touchEnd(target, { changedTouches: [touch(target, 300 + distance)] });
    return prevented;
}

describe("BottomSheet drags that start on something inside the content", () => {
    it("a drag on the grip moves the sheet", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "list" });
        layOut();
        await dragGrip(300);
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
    });

    it("a drag down on a list that scrolls and is scrolled leaves the sheet where it is", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "list" });
        layOut();
        const list = screen.getByTestId("inner");
        scrolls(list, { scrollTop: 80 });
        expect(await swipeFrom(screen.getByTestId("inner-row"), 300)).toBe(false);
        expect(maybeSheet()).not.toBeNull();
        expect(onclose).not.toHaveBeenCalled();
    });

    it("keeps a drag down on a list at its own top with the list, too: it never hands over", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "list" });
        layOut();
        scrolls(screen.getByTestId("inner"), { scrollTop: 0 });
        expect(await swipeFrom(screen.getByTestId("inner-row"), 300)).toBe(false);
        expect(maybeSheet()).not.toBeNull();
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
        expect(onclose).not.toHaveBeenCalled();
    });

    it("a list with nothing to scroll does not hold the sheet back", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "short-list" });
        layOut();
        scrolls(screen.getByTestId("inner"), { content: 120, shown: 120 });
        await swipeFrom(screen.getByTestId("inner-row"), 300);
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
    });

    it("a drag on something marked data-sheet-no-drag leaves the sheet where it is", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "opt-out" });
        layOut();
        expect(await swipeFrom(screen.getByTestId("inner-row"), 300)).toBe(false);
        expect(maybeSheet()).not.toBeNull();
        expect(onclose).not.toHaveBeenCalled();
    });

    it("a drag on a range input leaves the sheet where it is", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "range" });
        layOut();
        expect(await swipeFrom(screen.getByTestId("inner"), 300)).toBe(false);
        expect(onclose).not.toHaveBeenCalled();
    });

    it("the content outside the list still hands a pull down at its top to the sheet", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "list" });
        layOut();
        scrolls(screen.getByTestId("inner"), { scrollTop: 80 });
        await swipeFrom(screen.getByText("Pick what to show."), 300);
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
    });

    it("the time columns of TimeField, inside a sheet, keep a drag down", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "time-column" });
        layOut();
        const column = sheet().querySelector("[data-time-column]")!;
        expect(column.hasAttribute("data-sheet-no-drag")).toBe(true);
        scrolls(column, { scrollTop: 0, content: 176, shown: 176 });
        const row = column.querySelector("[role=option]")!;
        expect(await swipeFrom(row, 300)).toBe(false);
        expect(maybeSheet()).not.toBeNull();
        expect(onclose).not.toHaveBeenCalled();
    });
});

/** A touch that moves through the given [x, y] offsets from (100, 300), one event each, on `target`. */
async function gesture(target: Element, path: [number, number][]) {
    const tick = clock();
    await fireEvent.touchStart(target, { touches: [touch(target, 300)] });
    let prevented = false;
    for (const [dx, dy] of path) {
        tick(40);
        const move = new TouchEvent("touchmove", {
            bubbles: true,
            cancelable: true,
            touches: [{ ...touch(target, 300 + dy), clientX: 100 + dx } as unknown as Touch],
        });
        target.dispatchEvent(move);
        prevented ||= move.defaultPrevented;
    }
    const [dx, dy] = path[path.length - 1];
    await fireEvent.touchEnd(target, { changedTouches: [{ ...touch(target, 300 + dy), clientX: 100 + dx }] });
    return prevented;
}

describe("BottomSheet and content that handles its own gesture (Z-107, D243)", () => {
    const down: [number, number][] = [
        [0, 30],
        [0, 90],
        [0, 200],
        [0, 300],
    ];

    it("an element with touch-action: none under the finger keeps the drag, with no data-sheet-no-drag", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "short-list" });
        layOut();
        const row = screen.getByTestId("inner-row") as HTMLElement;
        row.style.touchAction = "none";
        expect(getComputedStyle(row).getPropertyValue("touch-action")).toBe("none");
        expect(await gesture(row, down)).toBe(false);
        expect(maybeSheet()).not.toBeNull();
        expect(onclose).not.toHaveBeenCalled();
    });

    it("so does an ancestor of the touched element, up to the content", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "short-list" });
        layOut();
        (screen.getByTestId("inner") as HTMLElement).style.touchAction = "none";
        expect(await gesture(screen.getByTestId("inner-row"), down)).toBe(false);
        expect(onclose).not.toHaveBeenCalled();
    });

    it("pan-x alone gives up the vertical gesture; pan-y, manipulation and auto do not", async () => {
        for (const [value, owned] of [
            ["pan-x", true],
            ["pan-x pinch-zoom", true],
            ["pan-y", false],
            ["pan-x pan-y", false],
            ["manipulation", false],
            ["auto", false],
        ] as const) {
            const onclose = vi.fn();
            await openSheet({ onclose, inner: "short-list" });
            layOut();
            scrolls(screen.getByTestId("inner"), { content: 120, shown: 120 });
            const row = screen.getByTestId("inner-row") as HTMLElement;
            row.style.touchAction = value;
            await gesture(row, down);
            expect(onclose.mock.calls.length, value).toBe(owned ? 0 : 1);
            cleanup();
        }
    });

    it("a touch-action on something the finger did not touch changes nothing", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "short-list" });
        layOut();
        scrolls(screen.getByTestId("inner"), { content: 120, shown: 120 });
        (screen.getByTestId("inner-row") as HTMLElement).style.touchAction = "none";
        await gesture(screen.getByText("Pick what to show."), down);
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
    });
});

describe("BottomSheet decides the axis of a swipe in the content once (Z-107, D244)", () => {
    const stage = async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "short-list" });
        layOut();
        scrolls(screen.getByTestId("inner"), { content: 120, shown: 120 });
        return { onclose, row: screen.getByText("Pick what to show.") };
    };

    it("a swipe that starts sideways and then turns down never moves the sheet", async () => {
        const { onclose, row } = await stage();
        const prevented = await gesture(row, [
            [12, 2],
            [30, 20],
            [34, 120],
            [34, 300],
        ]);
        expect(prevented).toBe(false);
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
        expect(onclose).not.toHaveBeenCalled();
    });

    it("a swipe that starts down and then turns sideways stays the sheet's", async () => {
        const { onclose, row } = await stage();
        const prevented = await gesture(row, [
            [1, 14],
            [40, 60],
            [200, 100],
            [260, 300],
        ]);
        expect(prevented).toBe(true);
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
    });

    it("under the slop nothing is decided: a small wobble sideways does not claim the swipe", async () => {
        const { onclose, row } = await stage();
        await gesture(row, [
            [5, 3],
            [-4, 20],
            [2, 120],
            [0, 300],
        ]);
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
    });

    it("the next touch decides for itself", async () => {
        const { onclose, row } = await stage();
        await gesture(row, [
            [30, 5],
            [40, 200],
        ]);
        expect(onclose).not.toHaveBeenCalled();
        await gesture(row, [
            [0, 30],
            [0, 120],
            [0, 220],
            [0, 300],
        ]);
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
    });

    it("the grip still drags, whichever way the pointer first moves", async () => {
        const onclose = vi.fn();
        await openSheet({ onclose, inner: "list" });
        layOut();
        await dragGrip(300);
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
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

describe("BottomSheet overlay root", () => {
    it("clips instead of hiding, so WebKit cannot scroll it to the focused grip while the panel slides in", async () => {
        await openSheet();
        const root = sheet().parentElement!;
        // `overflow: hidden` is still a scroll container; `clip` is not. With it the
        // root scrolled by the panel's own height as focus moved to the grip, and
        // the sheet rose to the top of the screen (Z-088).
        expect(root.classList.contains("overflow-clip")).toBe(true);
        expect(root.classList.contains("overflow-hidden")).toBe(false);
    });
});

describe("BottomSheet: a picture before the title (Z-142)", () => {
    const picture = createRawSnippet(() => ({
        render: () => '<svg width="40" height="40" data-testid="portrait"></svg>',
    }));

    it("draws titlePicture before the title, aria-hidden, and the title alone names the sheet", async () => {
        render(BottomSheet, { props: { isOpen: true, title: "Kvarnen", titlePicture: picture } });
        const dialog = await screen.findByRole("dialog", { name: "Kvarnen" });
        const box = dialog.querySelector<HTMLElement>("[data-sheet-title-picture]")!;
        expect(box).not.toBeNull();
        expect(box.getAttribute("aria-hidden")).toBe("true");
        expect(box.className).toContain("h-[1lh]");
        expect(box.querySelector("[data-testid='portrait']")).not.toBeNull();
        expect(box.firstElementChild!.className).toContain("[max-inline-size:40px]");
        const heading = within(dialog).getByRole("heading", { name: "Kvarnen" });
        expect(box.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(box.parentElement).toBe(heading.parentElement);
    });

    it("draws no picture box without it", async () => {
        render(BottomSheet, { props: { isOpen: true, title: "Kvarnen" } });
        const dialog = await screen.findByRole("dialog", { name: "Kvarnen" });
        expect(dialog.querySelector("[data-sheet-title-picture]")).toBeNull();
    });
});
