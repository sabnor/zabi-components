import { describe, expect, it } from "vitest";

import { moveForKey } from "../src/components/util/media-grid";
import {
    clampIndex,
    clampPan,
    CLOSE_DISTANCE,
    DOUBLE_TAP_SCALE,
    doubleTapTransform,
    dragAxis,
    fitSize,
    isDoubleTap,
    isZoomed,
    MAX_SCALE,
    panBy,
    PHOTO_GRID_STRINGS,
    PHOTO_VIEWER_STRINGS,
    photoKey,
    pinchSample,
    pinchTransform,
    resist,
    REST,
    settleZoom,
    splitActions,
    swipeCloses,
    swipeTurn,
    TAP_MS,
    TURN_DISTANCE,
    visibleCount,
    zoomAbout,
} from "../src/components/util/photo";

/** A 375 by 740 screen and a 4:3 photo fitted to it: 375 by 281.25. */
const view = { width: 375, height: 740 };
const fit = { width: 375, height: 281.25 };
const FLICK = 0.5;

describe("photo identity and counts", () => {
    it("uses the id, and the src without one", () => {
        expect(photoKey({ id: "a", src: "/1.jpg", alt: "", width: 1, height: 1 })).toBe("a");
        expect(photoKey({ id: 0, src: "/1.jpg", alt: "", width: 1, height: 1 })).toBe(0);
        expect(photoKey({ src: "/1.jpg", alt: "", width: 1, height: 1 })).toBe("/1.jpg");
    });

    it("holds an index inside the list", () => {
        expect(clampIndex(3, 12)).toBe(3);
        expect(clampIndex(-2, 12)).toBe(0);
        expect(clampIndex(40, 12)).toBe(11);
        expect(clampIndex(2.7, 12)).toBe(2);
        expect(clampIndex(Number.NaN, 12)).toBe(0);
        expect(clampIndex(0, 0)).toBe(-1);
    });

    it("shows all photos without max, and max with the rest counted", () => {
        expect(visibleCount(14, undefined)).toEqual({ shown: 14, hidden: 0 });
        expect(visibleCount(14, 8)).toEqual({ shown: 8, hidden: 6 });
        expect(visibleCount(8, 8)).toEqual({ shown: 8, hidden: 0 });
        expect(visibleCount(5, 8)).toEqual({ shown: 5, hidden: 0 });
        expect(visibleCount(14, 0)).toEqual({ shown: 14, hidden: 0 });
        expect(visibleCount(14, 3.9)).toEqual({ shown: 3, hidden: 11 });
        expect(visibleCount(14, Number.NaN)).toEqual({ shown: 14, hidden: 0 });
    });

    it("puts up to three actions in the bar, and with more keeps a place for the menu", () => {
        expect(splitActions([1, 2, 3])).toEqual({ bar: [1, 2, 3], menu: [] });
        expect(splitActions([1, 2, 3, 4])).toEqual({ bar: [1, 2], menu: [3, 4] });
        expect(splitActions([1, 2, 3, 4, 5])).toEqual({ bar: [1, 2], menu: [3, 4, 5] });
        expect(splitActions([])).toEqual({ bar: [], menu: [] });
    });

    it("words its defaults", () => {
        expect(PHOTO_GRID_STRINGS.morePhotos(12)).toBe("12 more photos");
        expect(PHOTO_GRID_STRINGS.morePhotos(1)).toBe("1 more photo");
        expect(PHOTO_GRID_STRINGS.photoName(3, 12)).toBe("Photo 3 of 12");
        expect(PHOTO_GRID_STRINGS.openPhoto("The bar")).toBe("Open The bar");
        expect(PHOTO_VIEWER_STRINGS.counter(3, 12)).toBe("3 / 12");
        expect(PHOTO_VIEWER_STRINGS.position(3, 12)).toBe("3 of 12");
    });
});

describe("fitting a photo to the screen", () => {
    it("fills the width of a portrait screen with a landscape photo", () => {
        expect(fitSize({ width: 1600, height: 1200 }, view)).toEqual(fit);
    });

    it("fills the height when the photo is taller than the screen is", () => {
        const tall = fitSize({ width: 1000, height: 4000 }, view);
        expect(tall.height).toBe(740);
        expect(tall.width).toBe(185);
    });

    it("enlarges a small photo to the screen, and is nothing for a size that is not one", () => {
        expect(fitSize({ width: 100, height: 100 }, view)).toEqual({ width: 375, height: 375 });
        expect(fitSize({ width: 0, height: 100 }, view)).toEqual({ width: 0, height: 0 });
        expect(fitSize({ width: 100, height: 100 }, { width: 0, height: 0 })).toEqual({ width: 0, height: 0 });
    });
});

describe("pan limits", () => {
    it("keeps the fitted photo in the middle", () => {
        expect(clampPan({ scale: 1, x: 80, y: -200 }, fit, view)).toEqual(REST);
    });

    it("lets a side that is wider than the screen go as far as its edge, and no further", () => {
        // At 2x the photo is 750 wide: 187.5 either way. It is 562.5 tall, still under 740.
        const at = (x: number, y: number) => clampPan({ scale: 2, x, y }, fit, view);
        expect(at(100, 0)).toEqual({ scale: 2, x: 100, y: 0 });
        expect(at(500, 0).x).toBe(187.5);
        expect(at(-500, 0).x).toBe(-187.5);
        expect(at(0, 300).y, "A side narrower than the screen stays centred").toBe(0);
    });

    it("opens the other direction once the photo is taller than the screen", () => {
        // At 4x: 1500 by 1125. 562.5 sideways, 192.5 up and down.
        const far = clampPan({ scale: 4, x: 9999, y: -9999 }, fit, view);
        expect(far.x).toBe(562.5);
        expect(far.y).toBe(-192.5);
    });

    it("holds the scale between fitted and four times", () => {
        expect(clampPan({ scale: 0.3, x: 0, y: 0 }, fit, view).scale).toBe(1);
        expect(clampPan({ scale: 9, x: 0, y: 0 }, fit, view).scale).toBe(MAX_SCALE);
    });

    it("moves by a step and stops at the edge", () => {
        const zoomed = { scale: 2, x: 0, y: 0 };
        expect(panBy(zoomed, { x: -64, y: 0 }, fit, view).x).toBe(-64);
        expect(panBy({ scale: 2, x: -180, y: 0 }, { x: -64, y: 0 }, fit, view).x).toBe(-187.5);
        expect(panBy(REST, { x: -64, y: 20 }, fit, view)).toEqual(REST);
    });
});

describe("zooming about a point", () => {
    it("about the centre leaves the photo centred", () => {
        expect(zoomAbout(REST, 2, { x: 0, y: 0 }, fit, view)).toEqual({ scale: 2, x: 0, y: 0 });
    });

    it("keeps the point under the finger where it was", () => {
        // The point 100px right of centre shows the photo's point 100px right
        // of its own centre. At 2x that point is 200px from the photo's
        // centre, so the centre has to move 100px left for it to stay put.
        const zoomed = zoomAbout(REST, 2, { x: 100, y: 0 }, fit, view);
        expect(zoomed).toEqual({ scale: 2, x: -100, y: 0 });
        const under = (transform: typeof zoomed, photoPoint: number) => transform.x + photoPoint * transform.scale;
        expect(under(zoomed, 100)).toBe(100);
        // And further in, from there.
        const further = zoomAbout(zoomed, 3, { x: 100, y: 0 }, fit, view);
        expect(under(further, 100)).toBeCloseTo(100);
    });

    it("gives way at the edge: a point near the side cannot pull the photo off the screen", () => {
        // About the right edge the photo would have to move 187.5 left, which is its limit at 2x.
        const edge = zoomAbout(REST, 2, { x: 187.5, y: 0 }, fit, view);
        expect(edge.x).toBe(-187.5);
        // At 4x from the same point it wants 562.5, also exactly its limit.
        expect(zoomAbout(REST, 4, { x: 187.5, y: 0 }, fit, view).x).toBe(-562.5);
        // A point outside the photo (above it) cannot move it up: it is not taller than the screen.
        expect(zoomAbout(REST, 2, { x: 0, y: 300 }, fit, view).y).toBe(0);
    });

    it("clamps the scale", () => {
        expect(zoomAbout(REST, 10, { x: 0, y: 0 }, fit, view).scale).toBe(MAX_SCALE);
        expect(zoomAbout({ scale: 2, x: 50, y: 0 }, 0.2, { x: 0, y: 0 }, fit, view)).toEqual(REST);
    });
});

describe("pinch", () => {
    const fingers = (centreX: number, centreY: number, spread: number) =>
        pinchSample({ x: centreX - spread / 2, y: centreY }, { x: centreX + spread / 2, y: centreY });

    it("measures the point between two fingers and how far apart they are", () => {
        expect(pinchSample({ x: -30, y: 40 }, { x: 30, y: -40 })).toEqual({
            centre: { x: 0, y: 0 },
            distance: 100,
        });
    });

    it("scales by how much the fingers have spread", () => {
        const from = fingers(0, 0, 100);
        expect(pinchTransform(REST, from, fingers(0, 0, 200), fit, view).scale).toBe(2);
        expect(pinchTransform(REST, from, fingers(0, 0, 250), fit, view).scale).toBe(2.5);
        expect(pinchTransform({ scale: 2, x: 0, y: 0 }, from, fingers(0, 0, 150), fit, view).scale).toBe(3);
    });

    it("zooms about the point between the fingers, not the middle of the screen", () => {
        const pinched = pinchTransform(REST, fingers(100, 0, 100), fingers(100, 0, 200), fit, view);
        expect(pinched).toEqual({ scale: 2, x: -100, y: 0 });
    });

    it("moves the photo with the fingers while it zooms", () => {
        // Spread to 2x about the centre, while the fingers travel 60px left.
        const pinched = pinchTransform(REST, fingers(0, 0, 100), fingers(-60, 0, 200), fit, view);
        expect(pinched).toEqual({ scale: 2, x: -60, y: 0 });
    });

    it("does not go past four times, or under the fitted size", () => {
        const from = fingers(0, 0, 100);
        expect(pinchTransform(REST, from, fingers(0, 0, 900), fit, view).scale).toBe(MAX_SCALE);
        expect(pinchTransform(REST, from, fingers(0, 0, 20), fit, view)).toEqual(REST);
    });

    it("keeps the pan inside the photo's edges throughout", () => {
        const dragged = pinchTransform(REST, fingers(0, 0, 100), fingers(900, 0, 200), fit, view);
        expect(dragged.x).toBe(187.5);
    });

    it("ignores two fingers on the same spot", () => {
        expect(pinchTransform(REST, fingers(0, 0, 0), fingers(0, 0, 100), fit, view)).toEqual(REST);
    });

    it("lets go a hair above fitted as fitted, and anything more as it is", () => {
        expect(settleZoom({ scale: 1.01, x: 2, y: 0 }, fit, view)).toEqual(REST);
        expect(settleZoom({ scale: 1.5, x: 0, y: 0 }, fit, view)).toEqual({ scale: 1.5, x: 0, y: 0 });
        expect(settleZoom({ scale: 2, x: 999, y: 0 }, fit, view).x).toBe(187.5);
    });
});

describe("double tap", () => {
    it("goes in to two and a half times about the tap", () => {
        const zoomed = doubleTapTransform(REST, { x: 50, y: 0 }, fit, view);
        expect(zoomed.scale).toBe(DOUBLE_TAP_SCALE);
        // The tapped point stays under the finger: 50 = x + 50 * 2.5.
        expect(zoomed.x).toBe(-75);
        expect(isZoomed(zoomed)).toBe(true);
    });

    it("goes back to fitted from any zoom, wherever the tap is", () => {
        expect(doubleTapTransform({ scale: 2.5, x: -75, y: 0 }, { x: 120, y: 30 }, fit, view)).toEqual(REST);
        expect(doubleTapTransform({ scale: 1.4, x: 10, y: 0 }, { x: 0, y: 0 }, fit, view)).toEqual(REST);
    });

    it("is two taps close together in time and place", () => {
        const first = { time: 1000, point: { x: 100, y: 100 } };
        expect(isDoubleTap(first, { time: 1000 + TAP_MS, point: { x: 110, y: 105 } })).toBe(true);
        expect(isDoubleTap(first, { time: 1000 + TAP_MS + 1, point: { x: 100, y: 100 } })).toBe(false);
        expect(isDoubleTap(first, { time: 1100, point: { x: 160, y: 100 } })).toBe(false);
        expect(isDoubleTap(null, { time: 1100, point: { x: 100, y: 100 } })).toBe(false);
    });
});

describe("telling a swipe from a press", () => {
    it("is undecided under the slop", () => {
        expect(dragAxis({ x: 3, y: -4 })).toBeNull();
        expect(dragAxis({ x: 7, y: 7 })).toBeNull();
    });

    it("turns the page when it goes sideways", () => {
        expect(dragAxis({ x: -20, y: 5 })).toBe("x");
        expect(dragAxis({ x: 20, y: -15 })).toBe("x");
        expect(dragAxis({ x: 10, y: 10 }), "A tie goes sideways").toBe("x");
    });

    it("closes when it goes down, and is nothing when it goes up", () => {
        expect(dragAxis({ x: 4, y: 30 })).toBe("down");
        expect(dragAxis({ x: 4, y: -30 })).toBeNull();
    });
});

describe("swipe between photos", () => {
    const base = { width: 375, index: 3, count: 12, flick: FLICK };
    const far = 375 * TURN_DISTANCE;

    it("turns to the next photo on a swipe left, and the previous on a swipe right", () => {
        expect(swipeTurn({ ...base, distance: -(far + 1), velocity: 0 })).toBe(1);
        expect(swipeTurn({ ...base, distance: far + 1, velocity: 0 })).toBe(-1);
    });

    it("stays put when a slow swipe stops short", () => {
        expect(swipeTurn({ ...base, distance: -(far - 1), velocity: -0.1 })).toBe(0);
        expect(swipeTurn({ ...base, distance: far - 1, velocity: 0.1 })).toBe(0);
        expect(swipeTurn({ ...base, distance: 0, velocity: 0 })).toBe(0);
    });

    it("turns on a flick however short", () => {
        expect(swipeTurn({ ...base, distance: -20, velocity: -FLICK })).toBe(1);
        expect(swipeTurn({ ...base, distance: 20, velocity: FLICK })).toBe(-1);
    });

    it("stays put when the flick goes back the way the photo was dragged", () => {
        // Dragged well to the left, then flicked right: a change of mind.
        expect(swipeTurn({ ...base, distance: -200, velocity: 1 })).toBe(0);
        expect(swipeTurn({ ...base, distance: 200, velocity: -1 })).toBe(0);
    });

    it("has nothing to turn to at either end", () => {
        expect(swipeTurn({ ...base, index: 11, distance: -300, velocity: -1 })).toBe(0);
        expect(swipeTurn({ ...base, index: 0, distance: 300, velocity: 1 })).toBe(0);
        expect(swipeTurn({ ...base, index: 0, distance: -300, velocity: -1 })).toBe(1);
        expect(swipeTurn({ ...base, index: 0, count: 1, distance: -300, velocity: -1 })).toBe(0);
    });

    it("is mirrored in a right-to-left layout", () => {
        expect(swipeTurn({ ...base, rtl: true, distance: -300, velocity: 0 })).toBe(-1);
        expect(swipeTurn({ ...base, rtl: true, distance: 300, velocity: 0 })).toBe(1);
        expect(swipeTurn({ ...base, rtl: true, index: 11, distance: 300, velocity: 0 })).toBe(0);
        expect(swipeTurn({ ...base, rtl: true, index: 0, distance: -300, velocity: 0 })).toBe(0);
    });

    it("gives a third of the way past an end", () => {
        expect(resist(90)).toBe(30);
        expect(resist(-90)).toBe(-30);
    });
});

describe("swipe down to close", () => {
    const base = { height: 740, flick: FLICK };
    const far = 740 * CLOSE_DISTANCE;

    it("closes after a fifth of the screen, or on a flick down", () => {
        expect(swipeCloses({ ...base, distance: far + 1, velocity: 0 })).toBe(true);
        expect(swipeCloses({ ...base, distance: 30, velocity: FLICK })).toBe(true);
    });

    it("does not close on a short, slow pull", () => {
        expect(swipeCloses({ ...base, distance: far - 1, velocity: 0.2 })).toBe(false);
    });

    it("does not close when the finger was going back up, or never went down", () => {
        expect(swipeCloses({ ...base, distance: 300, velocity: -FLICK })).toBe(false);
        expect(swipeCloses({ ...base, distance: 0, velocity: 2 })).toBe(false);
        expect(swipeCloses({ ...base, distance: -40, velocity: 0 })).toBe(false);
    });
});

describe("keys in a grid of tiles (shared with MediaGrid)", () => {
    const key = (name: string, ctrlKey = false) => ({ key: name, ctrlKey });

    it("maps the arrows, mirrored in right-to-left", () => {
        expect(moveForKey(key("ArrowLeft"), false)).toBe("left");
        expect(moveForKey(key("ArrowRight"), false)).toBe("right");
        expect(moveForKey(key("ArrowLeft"), true)).toBe("right");
        expect(moveForKey(key("ArrowRight"), true)).toBe("left");
        expect(moveForKey(key("ArrowUp"), true)).toBe("up");
        expect(moveForKey(key("ArrowDown"), false)).toBe("down");
    });

    it("maps Home and End to the row, and with Ctrl to the whole grid", () => {
        expect(moveForKey(key("Home"), false)).toBe("rowStart");
        expect(moveForKey(key("End"), false)).toBe("rowEnd");
        expect(moveForKey(key("Home", true), false)).toBe("first");
        expect(moveForKey(key("End", true), false)).toBe("last");
    });

    it("leaves other keys, and Ctrl with an arrow up or down, alone", () => {
        expect(moveForKey(key("Enter"), false)).toBeUndefined();
        expect(moveForKey(key("a"), false)).toBeUndefined();
        expect(moveForKey(key("ArrowDown", true), false)).toBeUndefined();
    });
});
