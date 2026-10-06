import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import GalleryHarness from "./fixtures/GalleryHarness.svelte";
import type { PhotoViewerAction } from "../src/components/util/photo";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.useRealTimers();
    document.documentElement.dir = "";
});

const viewer = () => screen.getByRole("dialog", { name: "Photo viewer" });
const maybeViewer = () => screen.queryByRole("dialog");
const stage = () => viewer().querySelector<HTMLElement>("[data-photo-viewer-stage]")!;
const currentSlide = () => viewer().querySelector<HTMLElement>("[data-photo-viewer-current]")!;
const box = () => currentSlide().querySelector<HTMLElement>("[data-photo-viewer-box]")!;
const image = () => currentSlide().querySelector<HTMLImageElement>("[data-photo-viewer-image]")!;
const status = () => viewer().querySelector("[data-photo-viewer-status]")!.textContent!.replace(/\s+/g, " ").trim();
const counter = () => viewer().querySelector("[data-photo-viewer-counter]")!.textContent!.trim();
const button = (name: string) => within(viewer()).getByRole("button", { name });
const grid = () => screen.getByTestId("grid");
const tile = (name: string) => within(grid()).getByRole("button", { name });
const state = () => {
    const [open, index, , , count] = screen.getByTestId("state").textContent!.split("|");
    return { open, index: Number(index), count: Number(count) };
};

/** What the zoom is, read from the box's transform; `null` when it is at rest. */
function zoom(): { x: number; y: number; scale: number } | null {
    const match = /translate3d\((-?[\d.]+)px, (-?[\d.]+)px, 0(?:px)?\) scale\((-?[\d.]+)\)/.exec(box().style.transform);
    return match ? { x: Number(match[1]), y: Number(match[2]), scale: Number(match[3]) } : null;
}

/** How far a swipe has moved the photo sideways and down, read from the slide's transform. */
function drag(): { x: number; y: number } {
    const match = /\+ (-?[\d.]+)px\), (-?[\d.]+)px/.exec(currentSlide().style.transform);
    return match ? { x: Number(match[1]), y: Number(match[2]) } : { x: 0, y: 0 };
}

/**
 * A clock the test moves, so a gesture has the speed the test gives it. The
 * speed is read from the events' own `timeStamp`, as a sheet's drag is, so
 * that moves with it.
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
 * The same, with the two clocks apart: `events` moves the time the events
 * say they happened at, `handled` the time the page gets round to them.
 */
function clocks() {
    let stamp = 1000;
    let handled = 1000;
    vi.spyOn(performance, "now").mockImplementation(() => handled);
    vi.spyOn(Event.prototype, "timeStamp", "get").mockImplementation(() => stamp);
    return {
        events: (ms: number) => {
            stamp += ms;
        },
        handled: (ms: number) => {
            handled += ms;
        },
    };
}

/**
 * jsdom has no layout: a 375 by 740 screen, and a 4:3 photo fitted to it,
 * 375 by 281. The stage's centre is at (187.5, 370).
 */
function layOut() {
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) {
        return this.hasAttribute("data-photo-viewer-stage") ? 375 : 0;
    });
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockImplementation(function (this: HTMLElement) {
        return this.hasAttribute("data-photo-viewer-stage") ? 740 : 0;
    });
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(function (this: HTMLElement) {
        return this.hasAttribute("data-photo-viewer-box") ? 375 : 0;
    });
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(function (this: HTMLElement) {
        return this.hasAttribute("data-photo-viewer-box") ? 281 : 0;
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
        () => ({ left: 0, top: 0, right: 375, bottom: 740, width: 375, height: 740, x: 0, y: 0 }) as DOMRect,
    );
    // The eased step into the next photo waits for a frame.
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
        callback(0);
        return 0;
    });
}

const CENTRE = { x: 187.5, y: 370 };

async function open(props: Record<string, unknown> = {}) {
    const user = userEvent.setup();
    render(GalleryHarness, { props });
    if (!props.initialOpen) {
        const first = props.withGrid === false ? screen.getByTestId("opener") : tile("Score sheet");
        await user.click(first);
    }
    await waitFor(() => expect(maybeViewer()).not.toBeNull());
    layOut();
    return user;
}

const down = (id: number, x: number, y: number, type = "touch") =>
    fireEvent.pointerDown(stage(), { pointerId: id, button: 0, pointerType: type, clientX: x, clientY: y });
const move = (id: number, x: number, y: number) =>
    fireEvent.pointerMove(stage(), { pointerId: id, clientX: x, clientY: y });
const up = (id: number, x: number, y: number) =>
    fireEvent.pointerUp(stage(), { pointerId: id, clientX: x, clientY: y });

/** One finger from `from` to `to` in ten steps over `duration` ms, resting `hold` ms before it lifts. */
async function swipe(
    from: { x: number; y: number },
    to: { x: number; y: number },
    { duration = 400, hold = 200 } = {},
) {
    const tick = clock();
    await down(1, from.x, from.y);
    for (let step = 1; step <= 10; step += 1) {
        tick(duration / 10);
        await move(1, from.x + ((to.x - from.x) * step) / 10, from.y + ((to.y - from.y) * step) / 10);
    }
    if (hold > 0) {
        tick(hold);
        await move(1, to.x, to.y);
    }
    await up(1, to.x, to.y);
}

async function tap(x: number, y: number, tick: (ms: number) => void, gap = 100) {
    await down(1, x, y);
    tick(40);
    await up(1, x, y);
    tick(gap);
}

describe("PhotoViewer semantics", () => {
    it("renders nothing while closed", () => {
        render(GalleryHarness);
        expect(maybeViewer()).toBeNull();
        expect(document.body.style.overflow).toBe("");
    });

    it("is a named modal dialog showing the photo that was opened, with its alt", async () => {
        await open();
        expect(viewer().getAttribute("aria-modal")).toBe("true");
        expect(viewer().getAttribute("data-testid"), "Other attributes land on the panel").toBe("viewer");
        expect(image().getAttribute("alt")).toBe("Score sheet");
        expect(image().getAttribute("src")).toContain("#full-2");
        expect(within(viewer()).getByRole("img", { name: "Score sheet" })).toBe(image());
        expect(state()).toMatchObject({ open: "open", index: 1 });
    });

    it("shows a counter, and reads the photo and its place out politely", async () => {
        await open();
        expect(counter()).toBe("2 / 6");
        // The counter is for the eye; the status says it in words.
        expect(viewer().querySelector("[data-photo-viewer-counter]")!.getAttribute("aria-hidden")).toBe("true");
        const live = viewer().querySelector("[data-photo-viewer-status]")!;
        expect(live.getAttribute("aria-live")).toBe("polite");
        expect(live.getAttribute("aria-atomic")).toBe("true");
        expect(status()).toBe("Score sheet, 2 of 6");
    });

    it("takes its name and words from label and strings", async () => {
        await open({
            label: "Bildvisare",
            viewerStrings: {
                close: "Stäng",
                previous: "Föregående bild",
                next: "Nästa bild",
                counter: (at: number, total: number) => `${at} av ${total}`,
                position: (at: number, total: number) => `bild ${at} av ${total}`,
            },
        });
        const dialog = screen.getByRole("dialog", { name: "Bildvisare" });
        expect(within(dialog).getByRole("button", { name: "Stäng" })).toBeTruthy();
        expect(within(dialog).getByRole("button", { name: "Föregående bild" })).toBeTruthy();
        expect(within(dialog).getByRole("button", { name: "Nästa bild" })).toBeTruthy();
        expect(dialog.querySelector("[data-photo-viewer-counter]")!.textContent!.trim()).toBe("2 av 6");
        expect(dialog.querySelector("[data-photo-viewer-status]")!.textContent!.replace(/\s+/g, " ").trim()).toBe(
            "Score sheet, bild 2 av 6",
        );
    });

    it("renders in document.body by default, and in place with portal false", async () => {
        await open();
        expect(viewer().parentElement?.parentElement).toBe(document.body);
        cleanup();
        await open({ portal: false });
        expect(screen.getByTestId("host").contains(viewer())).toBe(true);
    });

    it("locks the page behind it, and releases it on close", async () => {
        const user = await open();
        expect(document.body.style.overflow).toBe("hidden");
        await user.keyboard("{Escape}");
        expect(maybeViewer()).toBeNull();
        expect(document.body.style.overflow).toBe("");
    });

    it("keeps its controls on opaque plates, inside the safe areas, and takes every touch on the stage", async () => {
        await open();
        for (const name of ["Close", "Previous photo", "Next photo"]) {
            expect(button(name).className).toContain("bg-surface-overlay");
            expect(button(name).className).toContain("border-control-border");
            // 48px: the large size of an icon button.
            expect(button(name).className).toContain("size-12");
        }
        expect(viewer().innerHTML).toContain("env(safe-area-inset-top)");
        expect(viewer().innerHTML).toContain("env(safe-area-inset-left)");
        expect(viewer().innerHTML).toContain("env(safe-area-inset-right)");
        expect(stage().className).toContain("touch-none");
        expect(viewer().parentElement!.className).toContain("h-dvh");
    });

    it("gives the photo its own proportions before it has loaded", async () => {
        await open();
        expect(box().style.aspectRatio).toBe("1600 / 1200");
        expect(image().getAttribute("width")).toBe("1600");
        expect(image().getAttribute("height")).toBe("1200");
    });

    it("names a photo without alt by its place, and warns in development", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        await open({
            withGrid: false,
            initialPhotos: [
                { src: "/1.jpg", alt: "", width: 4, height: 3 },
                { src: "/2.jpg", alt: "The bar", width: 4, height: 3 },
            ],
        });
        expect(image().getAttribute("alt")).toBe("Photo 1 of 2");
        expect(status()).toBe("Photo 1 of 2, 1 of 2");
        await waitFor(() => expect(warn).toHaveBeenCalled());
        expect(String(warn.mock.calls[0][0])).toContain("1 of 2 photos have no alt text");
    });
});

describe("PhotoViewer focus and closing", () => {
    it("moves focus to Close, keeps Tab inside, and wraps", async () => {
        const user = await open();
        await waitFor(() => expect(document.activeElement).toBe(button("Close")));
        const stops = [button("Close"), button("Previous photo"), button("Next photo")];
        for (const stop of stops.slice(1)) {
            await user.tab();
            expect(document.activeElement).toBe(stop);
        }
        await user.tab();
        expect(document.activeElement, "Tab wraps to the first control").toBe(stops[0]);
        await user.tab({ shift: true });
        expect(document.activeElement).toBe(stops[2]);
    });

    it.each([
        ["Escape", "escape", (user: ReturnType<typeof userEvent.setup>) => user.keyboard("{Escape}")],
        ["the close button", "close-button", (user: ReturnType<typeof userEvent.setup>) => user.click(button("Close"))],
    ])("closes with %s and says so", async (_name, reason, act) => {
        const onclose = vi.fn();
        const user = await open({ onclose });
        await act(user);
        expect(maybeViewer()).toBeNull();
        expect(onclose).toHaveBeenCalledTimes(1);
        expect(onclose).toHaveBeenCalledWith({ reason });
        expect(state().open).toBe("closed");
    });

    it("returns focus to the tile it was opened from", async () => {
        const user = await open();
        await user.keyboard("{Escape}");
        expect(document.activeElement).toBe(tile("Score sheet"));
    });

    it("returns focus to the tile of the photo now showing, after moving to another", async () => {
        const user = await open();
        await user.keyboard("{ArrowRight}{ArrowRight}");
        expect(status()).toBe("Trophy, 4 of 6");
        await user.keyboard("{Escape}");
        expect(document.activeElement).toBe(tile("Trophy"));
        // And that tile is now the grid's Tab stop.
        expect(tile("Trophy").tabIndex).toBe(0);
    });

    it("returns focus to the opener when the grid does not show that photo", async () => {
        const user = userEvent.setup();
        render(GalleryHarness, { props: { count: 14, max: 8 } });
        const last = within(grid()).getByRole("button", { name: /6 more photos/ });
        await user.click(last);
        await waitFor(() => expect(maybeViewer()).not.toBeNull());
        layOut();
        await user.keyboard("{End}");
        expect(status()).toBe("Score sheet 14, 14 of 14");
        await user.keyboard("{Escape}");
        expect(document.activeElement).toBe(last);
    });

    it("returns focus to whatever opened it when there is no grid", async () => {
        const user = await open({ withGrid: false });
        await user.keyboard("{ArrowRight}{Escape}");
        expect(document.activeElement).toBe(screen.getByTestId("opener"));
    });

    it("does not close on a tap beside the photo", async () => {
        const onclose = vi.fn();
        await open({ onclose });
        const tick = clock();
        // Well above the photo, on the black.
        await tap(187, 60, tick, 500);
        expect(maybeViewer()).not.toBeNull();
        expect(onclose).not.toHaveBeenCalled();
    });

    it("is described by the photo showing, so that is read with its name when it opens", async () => {
        await open();
        const described = viewer().getAttribute("aria-describedby");
        expect(described).toBeTruthy();
        const description = document.getElementById(described!)!;
        expect(description).toBe(viewer().querySelector("[data-photo-viewer-status]"));
        expect(description.textContent!.replace(/\s+/g, " ").trim()).toBe("Score sheet, 2 of 6");
        expect(description.getAttribute("aria-live")).toBe("polite");
    });

    it("says nothing when the parent closes it", async () => {
        const onclose = vi.fn();
        const user = await open({ onclose });
        await user.click(screen.getByTestId("remove-all"));
        await waitFor(() => expect(maybeViewer()).toBeNull());
        expect(onclose).not.toHaveBeenCalled();
    });
});

describe("PhotoViewer moving between photos", () => {
    it("goes with the buttons, and the status, counter and bound index follow", async () => {
        const user = await open();
        await user.click(button("Next photo"));
        expect(status()).toBe("The bar, 3 of 6");
        expect(counter()).toBe("3 / 6");
        expect(state().index).toBe(2);
        expect(image().getAttribute("alt")).toBe("The bar");
        await user.click(button("Previous photo"));
        await user.click(button("Previous photo"));
        expect(status()).toBe("Team at the table, 1 of 6");
    });

    it("at either end the button stays, dimmed and aria-disabled, and holds focus", async () => {
        const user = await open({ initialOpen: true, initialIndex: 1 });
        await user.click(button("Previous photo"));
        expect(state().index).toBe(0);
        const previous = button("Previous photo");
        expect(previous.getAttribute("aria-disabled")).toBe("true");
        expect((previous as HTMLButtonElement).disabled).toBe(false);
        // Only the arrow is dimmed: the plate stays opaque over the photo.
        expect(previous.className).not.toContain("opacity-");
        expect(previous.className).toContain("text-control-border");
        expect(previous.className).toContain("bg-surface-overlay");
        expect(previous.className).not.toContain("hover:bg-surface-overlay-hover");
        expect(document.activeElement, "Focus is not dropped at the end").toBe(previous);
        await user.click(previous);
        expect(state().index).toBe(0);
        expect(button("Next photo").hasAttribute("aria-disabled")).toBe(false);

        await user.keyboard("{End}");
        expect(button("Next photo").getAttribute("aria-disabled")).toBe("true");
        expect(button("Previous photo").hasAttribute("aria-disabled")).toBe(false);
    });

    it("goes with the arrow keys, Page Up and Down, Home and End", async () => {
        const user = await open();
        await user.keyboard("{ArrowRight}");
        expect(state().index).toBe(2);
        await user.keyboard("{ArrowLeft}{ArrowLeft}");
        expect(state().index).toBe(0);
        await user.keyboard("{ArrowLeft}");
        expect(state().index, "Nothing before the first").toBe(0);
        await user.keyboard("{PageDown}{PageDown}");
        expect(state().index).toBe(2);
        await user.keyboard("{PageUp}");
        expect(state().index).toBe(1);
        await user.keyboard("{End}");
        expect(state().index).toBe(5);
        await user.keyboard("{ArrowRight}");
        expect(state().index, "Nothing after the last").toBe(5);
        await user.keyboard("{Home}");
        expect(state().index).toBe(0);
    });

    it("mirrors left and right in a right-to-left page", async () => {
        document.documentElement.dir = "rtl";
        const user = await open();
        await user.keyboard("{ArrowLeft}");
        expect(state().index).toBe(2);
        await user.keyboard("{ArrowRight}{ArrowRight}");
        expect(state().index).toBe(0);
    });

    it("has no previous and next buttons with a single photo", async () => {
        await open({ withGrid: false, count: 1 });
        expect(within(viewer()).queryByRole("button", { name: "Next photo" })).toBeNull();
        expect(within(viewer()).queryByRole("button", { name: "Previous photo" })).toBeNull();
        expect(counter()).toBe("1 / 1");
    });

    it("keeps the photo before and after in the page, hidden, so they are loaded and can be peeked at", async () => {
        await open();
        const sources = [...viewer().querySelectorAll<HTMLImageElement>("[data-photo-viewer-image]")].map(
            (element) => element.getAttribute("src")!.split("#")[1],
        );
        expect(sources.sort()).toEqual(["full-1", "full-2", "full-3"]);
        const others = [...viewer().querySelectorAll(".photo-slide")].filter(
            (slide) => !slide.hasAttribute("data-photo-viewer-current"),
        );
        expect(others).toHaveLength(2);
        for (const slide of others) {
            expect(slide.getAttribute("aria-hidden")).toBe("true");
            expect(slide.querySelector("[data-photo-viewer-image]")!.getAttribute("alt")).toBe("");
        }
        // Nothing further: the photo two places on is not asked for.
        expect(viewer().innerHTML).not.toContain("#full-4");
    });
});

describe("PhotoViewer swiping", () => {
    it("follows the finger sideways and shows the next photo when it has gone far enough", async () => {
        await open();
        const tick = clock();
        await down(1, 300, 370);
        tick(50);
        await move(1, 280, 372);
        tick(50);
        await move(1, 180, 372);
        // 100px from where the swipe was recognised.
        expect(drag().x).toBe(-100);
        expect(currentSlide().style.transition, "No easing under the finger").toBe("none");
        tick(300);
        await move(1, 180, 372);
        await up(1, 180, 372);
        await waitFor(() => expect(state().index).toBe(2));
        expect(status()).toBe("The bar, 3 of 6");
    });

    it("goes back to the previous photo on a swipe right", async () => {
        await open();
        await swipe({ x: 80, y: 370 }, { x: 280, y: 375 });
        await waitFor(() => expect(state().index).toBe(0));
    });

    it("stays on the photo after a short, slow swipe", async () => {
        await open();
        await swipe({ x: 300, y: 370 }, { x: 250, y: 370 });
        expect(state().index).toBe(1);
        expect(drag().x).toBe(0);
    });

    it("turns on a flick, however short", async () => {
        await open();
        await swipe({ x: 300, y: 370 }, { x: 240, y: 370 }, { duration: 60, hold: 0 });
        await waitFor(() => expect(state().index).toBe(2));
    });

    it("only gives a little past the last photo, and stays", async () => {
        await open({ initialOpen: true, initialIndex: 5 });
        const tick = clock();
        await down(1, 300, 370);
        tick(50);
        await move(1, 280, 370);
        tick(50);
        await move(1, 100, 370);
        expect(drag().x, "A third of the finger's 180px").toBe(-60);
        tick(300);
        await up(1, 100, 370);
        expect(state().index).toBe(5);
    });

    it("is mirrored in a right-to-left page", async () => {
        document.documentElement.dir = "rtl";
        await open();
        await swipe({ x: 80, y: 370 }, { x: 280, y: 370 });
        await waitFor(() => expect(state().index).toBe(2));
    });

    it("closes on a swipe down, with reason swipe, and gives focus back", async () => {
        const onclose = vi.fn();
        await open({ onclose });
        await swipe({ x: 187, y: 300 }, { x: 190, y: 520 });
        await waitFor(() => expect(maybeViewer()).toBeNull());
        expect(onclose).toHaveBeenCalledWith({ reason: "swipe" });
        expect(document.activeElement).toBe(tile("Score sheet"));
    });

    it("follows the finger down, and comes back from a short pull", async () => {
        await open();
        const tick = clock();
        await down(1, 187, 300);
        tick(50);
        await move(1, 188, 320);
        tick(50);
        await move(1, 188, 380);
        expect(drag().y).toBe(60);
        tick(400);
        await move(1, 188, 380);
        await up(1, 188, 380);
        expect(maybeViewer()).not.toBeNull();
        expect(drag().y).toBe(0);
    });

    it("does nothing on a swipe up", async () => {
        await open();
        await swipe({ x: 187, y: 500 }, { x: 190, y: 200 });
        expect(maybeViewer()).not.toBeNull();
        expect(state().index).toBe(1);
        expect(drag()).toEqual({ x: 0, y: 0 });
    });

    it("puts the photo back when the browser cancels the gesture", async () => {
        await open();
        await down(1, 300, 370);
        await move(1, 280, 370);
        await move(1, 150, 370);
        expect(drag().x).toBe(-130);
        await fireEvent.pointerCancel(stage(), { pointerId: 1 });
        expect(drag().x).toBe(0);
        expect(state().index).toBe(1);
    });
});

describe("PhotoViewer zooming", () => {
    it("double tap zooms in about the tap, and again zooms back out", async () => {
        await open();
        const tick = clock();
        // 50px right of the centre.
        await tap(CENTRE.x + 50, CENTRE.y, tick);
        expect(zoom(), "One tap does nothing").toBeNull();
        await tap(CENTRE.x + 50, CENTRE.y, tick, 600);
        expect(zoom()).toEqual({ x: -75, y: 0, scale: 2.5 });
        expect(viewer().getAttribute("data-zoomed")).toBe("true");

        await tap(CENTRE.x, CENTRE.y, tick);
        await tap(CENTRE.x, CENTRE.y, tick, 600);
        expect(zoom()).toBeNull();
        expect(viewer().hasAttribute("data-zoomed")).toBe(false);
    });

    it("two taps far apart in time or place are two taps", async () => {
        await open();
        const tick = clock();
        await tap(CENTRE.x, CENTRE.y, tick, 500);
        await tap(CENTRE.x, CENTRE.y, tick, 500);
        expect(zoom()).toBeNull();
        await tap(60, CENTRE.y, tick, 100);
        await tap(300, CENTRE.y, tick, 500);
        expect(zoom()).toBeNull();
    });

    it("a tap is timed by when the finger touched, not by when the page got to it", async () => {
        await open();
        const time = clocks();
        // Two taps 140ms apart, on a page that was 600ms late with the second.
        const both = (ms: number) => (time.events(ms), time.handled(ms));
        await tap(CENTRE.x, CENTRE.y, both);
        time.handled(600);
        await tap(CENTRE.x, CENTRE.y, both, 600);
        expect(zoom(), "Handled late, still a double tap").toEqual({ x: 0, y: 0, scale: 2.5 });

        // And back out, to start again from the fitted photo.
        await tap(CENTRE.x, CENTRE.y, both);
        await tap(CENTRE.x, CENTRE.y, both, 600);
        expect(zoom()).toBeNull();

        // Two taps 540ms apart, which the page handled in the same moment.
        await tap(CENTRE.x, CENTRE.y, time.events, 500);
        await tap(CENTRE.x, CENTRE.y, time.events, 500);
        expect(zoom(), "Handled together, still two taps").toBeNull();
    });

    it("events that all carry one stamp are timed by the clock", async () => {
        await open();
        const time = clocks();
        await tap(CENTRE.x, CENTRE.y, time.handled, 500);
        await tap(CENTRE.x, CENTRE.y, time.handled, 500);
        expect(zoom(), "540ms apart by the clock: two taps").toBeNull();
        await tap(CENTRE.x, CENTRE.y, time.handled);
        await tap(CENTRE.x, CENTRE.y, time.handled, 600);
        expect(zoom(), "140ms apart by the clock: a double tap").toEqual({ x: 0, y: 0, scale: 2.5 });
    });

    it("a double click with the mouse zooms as well", async () => {
        await open();
        const tick = clock();
        for (let click = 0; click < 2; click += 1) {
            await down(1, CENTRE.x, CENTRE.y, "mouse");
            tick(30);
            await up(1, CENTRE.x, CENTRE.y);
            tick(80);
        }
        expect(zoom()?.scale).toBe(2.5);
    });

    it("pinch zooms about the point between the fingers", async () => {
        await open();
        // Two fingers 100px apart about a point 100px right of the centre, spread to 200px.
        await down(1, CENTRE.x + 50, CENTRE.y);
        await down(2, CENTRE.x + 150, CENTRE.y);
        await move(1, CENTRE.x, CENTRE.y);
        await move(2, CENTRE.x + 200, CENTRE.y);
        expect(zoom()).toEqual({ x: -100, y: 0, scale: 2 });
        expect(box().style.transition, "No easing under the fingers").toBe("none");
        await up(2, CENTRE.x + 200, CENTRE.y);
        await up(1, CENTRE.x, CENTRE.y);
        expect(zoom()).toEqual({ x: -100, y: 0, scale: 2 });
        expect(state().index, "A pinch does not turn the page").toBe(1);
    });

    it("pinch stops at four times, and a pinch back to almost fitted is fitted", async () => {
        await open();
        await down(1, CENTRE.x - 20, CENTRE.y);
        await down(2, CENTRE.x + 20, CENTRE.y);
        await move(1, CENTRE.x - 180, CENTRE.y);
        await move(2, CENTRE.x + 180, CENTRE.y);
        expect(zoom()?.scale).toBe(4);
        await move(1, CENTRE.x - 20.2, CENTRE.y);
        await move(2, CENTRE.x + 20.2, CENTRE.y);
        await up(1, CENTRE.x - 20.2, CENTRE.y);
        await up(2, CENTRE.x + 20.2, CENTRE.y);
        expect(zoom()).toBeNull();
    });

    it("the finger left after a pinch does not drag the photo or turn the page", async () => {
        await open();
        await down(1, CENTRE.x - 50, CENTRE.y);
        await down(2, CENTRE.x + 50, CENTRE.y);
        await move(2, CENTRE.x + 150, CENTRE.y);
        await up(2, CENTRE.x + 150, CENTRE.y);
        const settled = zoom();
        await move(1, CENTRE.x - 150, CENTRE.y + 80);
        expect(zoom()).toEqual(settled);
        await up(1, CENTRE.x - 150, CENTRE.y + 80);
        expect(state().index).toBe(1);
        expect(maybeViewer()).not.toBeNull();
    });

    it("while zoomed a drag pans, held to the photo's edges, and neither turns the page nor closes", async () => {
        const user = await open();
        await user.keyboard("+");
        // 1.5x: the photo is 562.5 wide, so 93.75px of pan either way; it is not taller than the screen.
        expect(zoom()).toEqual({ x: 0, y: 0, scale: 1.5 });
        await down(1, 250, 370);
        await move(1, 240, 370);
        await move(1, 200, 420);
        expect(zoom()).toEqual({ x: -40, y: 0, scale: 1.5 });
        await move(1, -300, 600);
        expect(zoom()?.x).toBe(-93.75);
        expect(zoom()?.y).toBe(0);
        await up(1, -300, 600);
        expect(state().index).toBe(1);
        expect(maybeViewer()).not.toBeNull();
        expect(drag()).toEqual({ x: 0, y: 0 });
    });

    it("zooms with + and −, pans with the arrows, and 0 goes back to fitted", async () => {
        const user = await open();
        await user.keyboard("++");
        expect(zoom()?.scale).toBe(2.25);
        // Right shows what is to the right: the photo moves left.
        await user.keyboard("{ArrowRight}");
        expect(zoom()).toEqual({ x: -64, y: 0, scale: 2.25 });
        await user.keyboard("{ArrowLeft}{ArrowLeft}");
        expect(zoom()?.x).toBe(64);
        expect(state().index, "The arrows pan while zoomed").toBe(1);
        await user.keyboard("-");
        expect(zoom()?.scale).toBe(1.5);
        await user.keyboard("0");
        expect(zoom()).toBeNull();
        await user.keyboard("-");
        expect(zoom(), "Not under the fitted size").toBeNull();
    });

    it("pans up and down once the photo is taller than the screen", async () => {
        const user = await open();
        await user.keyboard("++++");
        // 4x at most: 1500 by 1124. 192px of pan up and down.
        expect(zoom()?.scale).toBe(4);
        await user.keyboard("{ArrowDown}");
        expect(zoom()?.y).toBe(-64);
        await user.keyboard("{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}");
        expect(zoom()?.y).toBe(192);
    });

    it("while zoomed, Page Up and Down, Home, End and the buttons still change photo, and the zoom resets", async () => {
        const user = await open();
        await user.keyboard("+{PageDown}");
        expect(state().index).toBe(2);
        expect(zoom()).toBeNull();
        await user.keyboard("+");
        await user.click(button("Next photo"));
        expect(state().index).toBe(3);
        expect(zoom()).toBeNull();
        await user.keyboard("+{Home}");
        expect(state().index).toBe(0);
        expect(zoom()).toBeNull();
    });

    it("Escape leaves the zoom first, and closes on the next press", async () => {
        const onclose = vi.fn();
        const user = await open({ onclose });
        await user.keyboard("+");
        await user.keyboard("{Escape}");
        expect(maybeViewer()).not.toBeNull();
        expect(zoom()).toBeNull();
        expect(onclose).not.toHaveBeenCalled();
        await user.keyboard("{Escape}");
        expect(maybeViewer()).toBeNull();
        expect(onclose).toHaveBeenCalledWith({ reason: "escape" });
    });

    it("zooms about the pointer with Ctrl or Cmd and the wheel, and leaves a plain wheel alone", async () => {
        await open();
        const wheel = (init: WheelEventInit) => {
            const event = new WheelEvent("wheel", { bubbles: true, cancelable: true, clientX: CENTRE.x, clientY: CENTRE.y, ...init });
            stage().dispatchEvent(event);
            return event.defaultPrevented;
        };
        expect(wheel({ deltaY: -100 })).toBe(false);
        expect(zoom()).toBeNull();
        expect(wheel({ deltaY: -100, ctrlKey: true }), "The page must not zoom as well").toBe(true);
        await waitFor(() => expect(zoom()?.scale).toBeCloseTo(1.1));
        wheel({ deltaY: -100, metaKey: true });
        await waitFor(() => expect(zoom()?.scale).toBeCloseTo(1.21));
        wheel({ deltaY: 100, ctrlKey: true });
        wheel({ deltaY: 100, ctrlKey: true });
        await waitFor(() => expect(zoom()).toBeNull());
    });

    it("ignores other mouse buttons and a third finger", async () => {
        await open();
        await fireEvent.pointerDown(stage(), { pointerId: 1, button: 2, pointerType: "mouse", clientX: 300, clientY: 370 });
        await move(1, 100, 370);
        expect(drag().x).toBe(0);

        await down(1, CENTRE.x - 50, CENTRE.y);
        await down(2, CENTRE.x + 50, CENTRE.y);
        await down(3, CENTRE.x, CENTRE.y + 100);
        await move(3, CENTRE.x, CENTRE.y + 300);
        expect(zoom()).toBeNull();
    });
});

describe("PhotoViewer keys it leaves alone", () => {
    it("does not take keys with a modifier, or keys it has no use for", async () => {
        await open();
        const press = (key: string, init: KeyboardEventInit = {}) => {
            const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init });
            viewer().dispatchEvent(event);
            return event.defaultPrevented;
        };
        expect(press("ArrowLeft", { altKey: true }), "Alt+Left is the browser's Back").toBe(false);
        expect(press("+", { ctrlKey: true }), "Ctrl+Plus is the browser's zoom").toBe(false);
        expect(press("a")).toBe(false);
        expect(press("ArrowDown"), "Nothing to pan when not zoomed").toBe(false);
        expect(press("ArrowRight")).toBe(true);
        await waitFor(() => expect(state().index).toBe(2));
    });
});

describe("PhotoViewer loading", () => {
    it("shows the thumbnail blurred until the full image has loaded, in the same box", async () => {
        await open();
        const thumb = currentSlide().querySelector<HTMLImageElement>("[data-photo-viewer-thumb]")!;
        expect(thumb.getAttribute("src")).toContain("#thumb-2");
        expect(thumb.className).toContain("blur-md");
        expect(thumb.getAttribute("alt")).toBe("");
        expect(thumb.parentElement).toBe(image().parentElement);
        expect(image().className).toContain("opacity-0");

        await fireEvent.load(image());
        expect(image().className).toContain("opacity-100");
        expect(currentSlide().querySelector("[data-photo-viewer-thumb]")).toBeNull();
    });

    it("shows a spinner and says so only when the photo is slow", async () => {
        vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
        render(GalleryHarness, { props: { initialOpen: true } });
        await vi.advanceTimersByTimeAsync(300);
        expect(within(viewer()).queryByRole("status")).toBeNull();
        await vi.advanceTimersByTimeAsync(150);
        expect(within(viewer()).getByRole("status").textContent).toContain("Loading photo");

        await fireEvent.load(image());
        expect(within(viewer()).queryByRole("status")).toBeNull();
    });

    it("never shows the spinner for a photo that loads quickly", async () => {
        vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
        render(GalleryHarness, { props: { initialOpen: true } });
        await vi.advanceTimersByTimeAsync(100);
        await fireEvent.load(image());
        await vi.advanceTimersByTimeAsync(1000);
        expect(within(viewer()).queryByRole("status")).toBeNull();
    });

    it("says when a photo cannot be loaded, and tries again on request", async () => {
        const user = await open();
        const failing = image();
        await fireEvent.error(failing);
        expect(within(viewer()).getByRole("alert").textContent).toContain("The photo could not be loaded.");
        expect(currentSlide().querySelector("[data-photo-viewer-image]")).toBeNull();

        await user.click(button("Try again"));
        expect(within(viewer()).queryByRole("alert")).toBeNull();
        // The button went with the message; its focus is the dialog's, not the page's.
        expect(document.activeElement).toBe(viewer());
        expect(image(), "A new image element, asking again").not.toBe(failing);
        await fireEvent.load(image());
        expect(image().className).toContain("opacity-100");
    });

    it("remembers a photo that has loaded when it is shown again", async () => {
        const user = await open();
        await fireEvent.load(image());
        await user.keyboard("{ArrowRight}{ArrowLeft}");
        expect(image().getAttribute("src")).toContain("#full-2");
        expect(image().className).toContain("opacity-100");
    });
});

describe("PhotoViewer caption", () => {
    it("shows the photo's caption on a plate, and none where there is none", async () => {
        const user = await open();
        const caption = viewer().querySelector("[data-photo-viewer-caption]")!;
        expect(caption.textContent).toContain("Round three, taken from the corner table.");
        expect(caption.className).toContain("bg-surface-overlay");
        expect(caption.querySelector("p")!.className).toContain("line-clamp-2");
        // Short: no button to unfold it.
        expect(within(viewer()).queryByRole("button", { name: "More" })).toBeNull();
        await user.keyboard("{ArrowRight}");
        expect(viewer().querySelector("[data-photo-viewer-caption]")).toBeNull();
    });

    it("folds an unfolded caption when a key changes the photo, as when a button does", async () => {
        vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(120);
        const user = userEvent.setup();
        render(GalleryHarness, {
            props: {
                initialOpen: true,
                initialIndex: 1,
                initialPhotos: ["One", "Two", "Three", "Four"].map((alt, at) => ({
                    id: alt,
                    src: `data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==#${at}`,
                    alt,
                    width: 1600,
                    height: 1200,
                    caption: `Caption of ${alt}`,
                })),
            },
        });
        for (const key of ["{ArrowRight}", "{PageDown}", "{Home}"]) {
            await user.click(await within(viewer()).findByRole("button", { name: "More" }));
            expect(button("Less").getAttribute("aria-expanded")).toBe("true");
            await user.keyboard(key);
            await waitFor(() => expect(within(viewer()).queryByRole("button", { name: "Less" }), key).toBeNull());
            expect(viewer().querySelector("[data-photo-viewer-caption] p")!.className).toContain("line-clamp-2");
        }
    });

    it("keeps the focus, and the keys, when the button that holds it goes with its caption", async () => {
        vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(120);
        const user = userEvent.setup();
        render(GalleryHarness, { props: { initialOpen: true, initialIndex: 1 } });
        const more = await within(viewer()).findByRole("button", { name: "More" });
        // Opening puts the focus on Close a moment later; after that, on More.
        await waitFor(() => expect(document.activeElement).toBe(button("Close")));
        more.focus();
        expect(document.activeElement).toBe(more);
        // The next photo has no caption: no More to hold the focus.
        await user.keyboard("{ArrowRight}");
        await waitFor(() => expect(status()).toBe("The bar, 3 of 6"));
        expect(within(viewer()).queryByRole("button", { name: "More" })).toBeNull();
        await waitFor(() => expect(document.activeElement).toBe(viewer()));
        await user.keyboard("{ArrowRight}");
        await waitFor(() => expect(status()).toBe("Trophy, 4 of 6"));
        await user.keyboard("{Escape}");
        await waitFor(() => expect(maybeViewer()).toBeNull());
    });

    it("unfolds a long caption with More, and folds it again when the photo changes", async () => {
        vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(120);
        const user = userEvent.setup();
        render(GalleryHarness, { props: { initialOpen: true, initialIndex: 1 } });
        const more = await within(viewer()).findByRole("button", { name: "More" });
        expect(more.getAttribute("aria-expanded")).toBe("false");
        await user.click(more);
        const less = button("Less");
        expect(less.getAttribute("aria-expanded")).toBe("true");
        const text = viewer().querySelector("[data-photo-viewer-caption] p")!;
        expect(text.className).not.toContain("line-clamp-2");
        expect(text.className).toContain("overflow-y-auto");

        await user.click(button("Next photo"));
        await user.click(button("Previous photo"));
        expect(viewer().querySelector("[data-photo-viewer-caption] p")!.className).toContain("line-clamp-2");
    });
});

describe("PhotoViewer actions", () => {
    const make = (onclick = vi.fn()): PhotoViewerAction[] => [
        { id: "share", label: "Share", onclick },
        { id: "cover", label: "Set as cover", onclick },
        { id: "delete", label: "Delete", tone: "danger", onclick },
    ];

    it("has no bar without actions", async () => {
        await open();
        expect(viewer().querySelector("[data-photo-viewer-actions]")).toBeNull();
    });

    it("shows up to three as labelled buttons, and calls each with the photo showing and its place", async () => {
        const onclick = vi.fn();
        const user = await open({ actions: make(onclick) });
        const bar = viewer().querySelector<HTMLElement>("[data-photo-viewer-actions]")!;
        expect(within(bar).getAllByRole("button").map((element) => element.textContent?.trim())).toEqual([
            "Share",
            "Set as cover",
            "Delete",
        ]);
        expect(within(bar).queryByRole("button", { name: "More actions" })).toBeNull();
        await user.keyboard("{ArrowRight}");
        await user.click(within(bar).getByRole("button", { name: "Set as cover" }));
        expect(onclick).toHaveBeenCalledTimes(1);
        expect(onclick.mock.calls[0][0].id).toBe("p3");
        expect(onclick.mock.calls[0][1]).toBe(2);
        expect(maybeViewer(), "An action does not close the viewer").not.toBeNull();
    });

    it("marks a dangerous action, and keeps the buttons on plates at 48px", async () => {
        await open({ actions: make() });
        const remove = button("Delete");
        expect(remove.className).toContain("text-error-text");
        expect(remove.className).toContain("min-h-12");
        expect(remove.className).toContain("bg-surface-overlay");
        expect(button("Share").className).not.toContain("text-error-text");
    });

    it("with more than three, shows two and puts the rest in a menu", async () => {
        const onclick = vi.fn();
        const actions = [...make(onclick), { id: "download", label: "Download", onclick }];
        const user = await open({ actions });
        const bar = viewer().querySelector<HTMLElement>("[data-photo-viewer-actions]")!;
        expect(within(bar).queryByRole("button", { name: "Delete" })).toBeNull();
        expect(within(bar).getByRole("button", { name: "Share" })).toBeTruthy();
        expect(within(bar).getByRole("button", { name: "Set as cover" })).toBeTruthy();

        const more = within(bar).getByRole("button", { name: "More actions" });
        expect(more.getAttribute("aria-haspopup")).toBe("menu");
        await user.click(more);
        const menu = within(viewer()).getByRole("menu");
        expect(within(menu).getAllByRole("menuitem").map((item) => item.textContent?.trim())).toEqual([
            "Delete",
            "Download",
        ]);
        await user.click(within(menu).getByRole("menuitem", { name: "Download" }));
        expect(onclick).toHaveBeenCalledTimes(1);
        expect(onclick.mock.calls[0][0].id).toBe("p2");
    });

    it("leaves the keys to the menu while it is open: Escape closes the menu, not the viewer", async () => {
        const actions = [...make(), { id: "download", label: "Download", onclick: vi.fn() }];
        const user = await open({ actions });
        await user.click(button("More actions"));
        expect(within(viewer()).getByRole("menu")).toBeTruthy();
        await user.keyboard("{ArrowDown}");
        expect(state().index, "The arrows are the menu's").toBe(1);
        await user.keyboard("{Escape}");
        expect(within(viewer()).queryByRole("menu")).toBeNull();
        expect(maybeViewer()).not.toBeNull();
    });

    it("does not run a disabled action, and keeps it focusable", async () => {
        const onclick = vi.fn();
        const user = await open({ actions: [{ id: "share", label: "Share", disabled: true, onclick }] });
        const share = button("Share");
        expect(share.getAttribute("aria-disabled")).toBe("true");
        expect((share as HTMLButtonElement).disabled).toBe(false);
        await user.click(share);
        expect(onclick).not.toHaveBeenCalled();
    });
});

describe("PhotoViewer when the photos change under it", () => {
    it("stays on a photo that exists when the one showing is removed", async () => {
        const user = await open();
        await user.keyboard("{End}");
        expect(status()).toBe("Team by the door, 6 of 6");
        await user.click(screen.getByTestId("remove-current"));
        await waitFor(() => expect(status()).toBe("Question card, 5 of 5"));
        expect(state()).toMatchObject({ open: "open", index: 4, count: 5 });
    });

    it("shows the photo that takes the place of one removed from the middle", async () => {
        const user = await open();
        await user.click(screen.getByTestId("remove-current"));
        await waitFor(() => expect(status()).toBe("The bar, 2 of 5"));
        expect(state().index).toBe(1);
    });

    it("closes when the last photo is removed", async () => {
        const user = await open();
        await user.click(screen.getByTestId("remove-all"));
        await waitFor(() => expect(maybeViewer()).toBeNull());
        expect(state().open).toBe("closed");
        expect(document.body.style.overflow).toBe("");
    });

    it("gives focus to the tile of the photo showing after the one it was opened from is removed", async () => {
        const user = await open();
        await waitFor(() => expect(document.activeElement).toBe(button("Close")));
        // Not a user's click: that would take the focus out of the viewer with it.
        await fireEvent.click(screen.getByTestId("remove-current"));
        await waitFor(() => expect(status()).toBe("The bar, 2 of 5"));
        expect(within(grid()).queryByRole("button", { name: "Score sheet" })).toBeNull();
        await user.keyboard("{Escape}");
        await waitFor(() => expect(maybeViewer()).toBeNull());
        expect(document.activeElement).toBe(tile("The bar"));
    });

    it("gives focus to the grid when the tile it was opened from is gone and the photo showing has none", async () => {
        // Three tiles for six photos: the last stands for the rest.
        const user = await open({ max: 3 });
        await waitFor(() => expect(document.activeElement).toBe(button("Close")));
        await fireEvent.click(screen.getByTestId("remove-current"));
        await waitFor(() => expect(status()).toBe("The bar, 2 of 5"));
        await user.keyboard("{End}");
        expect(status()).toBe("Team by the door, 5 of 5");
        await user.keyboard("{Escape}");
        await waitFor(() => expect(maybeViewer()).toBeNull());
        expect(grid().contains(document.activeElement), "focus is in the grid, not on the page").toBe(true);
        expect(document.activeElement?.getAttribute("tabindex")).toBe("0");
    });

    it("gives focus to the add tile when the last photo is removed", async () => {
        await open({ withAdd: true });
        await waitFor(() => expect(document.activeElement).toBe(button("Close")));
        await fireEvent.click(screen.getByTestId("remove-all"));
        await waitFor(() => expect(maybeViewer()).toBeNull());
        expect(document.activeElement).toBe(within(grid()).getByRole("button", { name: "Add photo" }));
    });

    it("holds an index outside the list to the list", async () => {
        await open({ initialOpen: true, initialIndex: 40, withGrid: false });
        expect(status()).toBe("Team by the door, 6 of 6");
    });
});
