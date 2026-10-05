import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import MobileFormHarness from "./fixtures/MobileFormHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const sheet = () => screen.getByRole("dialog", { name: "Release notes" });
const maybeSheet = () => screen.queryByRole("dialog");
const opener = () => screen.getByTestId("opener");
const grip = () => sheet().querySelector<HTMLElement>("[data-sheet-grip]");

async function openSheet(props: Record<string, unknown> = {}) {
    const user = userEvent.setup();
    render(MobileFormHarness, { props: { piece: "slide-up", ...props } });
    await user.click(opener());
    await waitFor(() => expect(maybeSheet()).not.toBeNull());
    return user;
}

/** jsdom has no layout: the sheet is 500px tall. */
function layOut() {
    vi.spyOn(sheet(), "getBoundingClientRect").mockImplementation(
        () => ({ height: 500, width: 375, top: 300, left: 0, right: 375, bottom: 800, x: 0, y: 300 }) as DOMRect,
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

async function dragGrip(distance: number, { duration = 400, hold = 200 } = {}) {
    const tick = clock();
    const target = grip()!;
    await fireEvent.pointerDown(target, { pointerId: 1, button: 0, clientY: 300 });
    for (let step = 1; step <= 10; step += 1) {
        tick(duration / 10);
        await fireEvent.pointerMove(target, { pointerId: 1, clientY: 300 + (distance * step) / 10 });
    }
    if (hold > 0) {
        tick(hold);
        await fireEvent.pointerMove(target, { pointerId: 1, clientY: 300 + distance });
    }
    await fireEvent.pointerUp(target, { pointerId: 1, clientY: 300 + distance });
}

describe("SlideUp without swipeToClose", () => {
    it("has no grip and does not move under a pointer", async () => {
        await openSheet();
        expect(grip()).toBeNull();
        const title = within(sheet()).getByRole("heading");
        await fireEvent.pointerDown(title, { pointerId: 1, button: 0, clientY: 300 });
        await fireEvent.pointerMove(title, { pointerId: 1, clientY: 600 });
        await fireEvent.pointerUp(title, { pointerId: 1, clientY: 600 });
        expect(maybeSheet()).not.toBeNull();
        expect(sheet().style.transform).toBe("");
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
    });

    it("keeps its content clear of the home indicator", async () => {
        await openSheet();
        const content = sheet().lastElementChild!;
        expect(content.className).toContain("env(safe-area-inset-bottom");
        expect(content.className).toContain("1.5rem");
    });
});

describe("SlideUp with swipeToClose", () => {
    it("adds a decorative grip above the title, and keeps the close button", async () => {
        await openSheet({ swipeToClose: true });
        const mark = grip()!;
        expect(mark.getAttribute("aria-hidden")).toBe("true");
        expect(mark.className).toContain("touch-none");
        expect(mark.querySelector("span")!.className).toContain("forced-colors:bg-[CanvasText]");
        expect(
            mark.compareDocumentPosition(within(sheet()).getByRole("heading")) &
                Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
        expect(within(sheet()).getByRole("button", { name: "Close" })).toBeTruthy();
        // Still focus on the first control, and the grip is not one.
        await waitFor(() =>
            expect(document.activeElement).toBe(within(sheet()).getByRole("button", { name: "Close" })),
        );
    });

    it("follows the pointer down, and never up", async () => {
        await openSheet({ swipeToClose: true });
        layOut();
        const tick = clock();
        await fireEvent.pointerDown(grip()!, { pointerId: 1, button: 0, clientY: 300 });
        tick(16);
        await fireEvent.pointerMove(grip()!, { pointerId: 1, clientY: 310 });
        tick(16);
        await fireEvent.pointerMove(grip()!, { pointerId: 1, clientY: 390 });
        expect(sheet().style.transform).toBe("translateY(80px)");
        expect(sheet().getAttribute("data-dragging")).toBe("true");
        expect(sheet().style.transition).toBe("none");
        tick(16);
        await fireEvent.pointerMove(grip()!, { pointerId: 1, clientY: 100 });
        expect(sheet().style.transform).toBe("");
    });

    it("closes after a long enough drag down, reports the event, and returns focus", async () => {
        const onclick = vi.fn();
        await openSheet({ swipeToClose: true, onclick });
        layOut();
        await dragGrip(200);
        expect(maybeSheet()).toBeNull();
        expect(screen.getByTestId("state").textContent).toBe("closed");
        expect(onclick).toHaveBeenCalledTimes(1);
        expect(onclick.mock.calls[0][0].type).toBe("pointerup");
        expect(document.activeElement).toBe(opener());
        expect(document.body.style.overflow).toBe("");
    });

    it("springs back from a short, slow drag", async () => {
        const onclick = vi.fn();
        await openSheet({ swipeToClose: true, onclick });
        layOut();
        await dragGrip(100);
        expect(maybeSheet()).not.toBeNull();
        expect(sheet().style.transform).toBe("");
        expect(sheet().hasAttribute("data-dragging")).toBe(false);
        expect(onclick).not.toHaveBeenCalled();
        expect(sheet().className).toContain("motion-reduce:transition-none");
    });

    it("closes on a flick down, and not on a flick up", async () => {
        await openSheet({ swipeToClose: true });
        layOut();
        await dragGrip(-60, { duration: 60, hold: 0 });
        expect(maybeSheet()).not.toBeNull();
        await dragGrip(60, { duration: 60, hold: 0 });
        expect(maybeSheet()).toBeNull();
    });

    it("a touch on the content closes only from the top of the content", async () => {
        await openSheet({ swipeToClose: true });
        layOut();
        const tick = clock();
        const target = within(sheet()).getByText("Fixes and small improvements.");
        const touch = (clientY: number) => ({ identifier: 3, target, clientY, clientX: 50 });
        const swipe = async () => {
            await fireEvent.touchStart(target, { touches: [touch(400)] });
            for (const y of [420, 500, 600]) {
                tick(100);
                await fireEvent.touchMove(target, { touches: [touch(y)], cancelable: true });
            }
            tick(200);
            await fireEvent.touchMove(target, { touches: [touch(600)], cancelable: true });
            await fireEvent.touchEnd(target, { changedTouches: [touch(600)] });
        };

        sheet().scrollTop = 80;
        await swipe();
        expect(maybeSheet(), "Scrolled content keeps the swipe").not.toBeNull();

        sheet().scrollTop = 0;
        await swipe();
        expect(maybeSheet()).toBeNull();
    });

    it("still closes with Escape, the backdrop and the close button", async () => {
        const user = await openSheet({ swipeToClose: true });
        await user.keyboard("{Escape}");
        expect(maybeSheet()).toBeNull();
        await user.click(opener());
        await user.click(within(sheet()).getByRole("button", { name: "Close" }));
        expect(maybeSheet()).toBeNull();
    });
});
