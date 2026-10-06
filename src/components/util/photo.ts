/**
 * Public types and pure helpers for `PhotoGrid` and `PhotoViewer`.
 *
 * Everything a gesture means is worked out here, on numbers: where a pinch
 * leaves the photo, how far it may be panned, whether a swipe turns the page.
 * The components only feed pointers in and apply the result, so the
 * arithmetic can be tested without a browser.
 */

import type { Component } from "svelte";

export type PhotoKey = string | number;

/** One photo. `PhotoGrid` and `PhotoViewer` take the same array. */
export interface Photo {
    /** Stable identity, when the same `src` may appear twice or may change. Without it, `src` is the identity. */
    id?: PhotoKey;
    /** The full image, shown in the viewer. */
    src: string;
    /** A small version for the grid, and for the viewer while the full image loads. Without it, `src`. */
    thumbSrc?: string;
    /** What the photo shows, for those who cannot see it. */
    alt: string;
    /** Width of the full image in px. With `height` it reserves the photo's box before it has loaded. */
    width: number;
    /** Height of the full image in px. */
    height: number;
    /** Shown under the photo in the viewer. */
    caption?: string;
}

export function photoKey(photo: Photo): PhotoKey {
    return photo.id ?? photo.src;
}

/** Payload of PhotoGrid's `onselect`. */
export interface PhotoGridSelectDetail {
    photo: Photo;
    index: number;
    /** False when the press cleared the photo's selection (only in `multiple`). */
    selected: boolean;
    /** Every selected key after the change: one or none in `single`. */
    keys: PhotoKey[];
}

/** Every built-in string of PhotoGrid. Pass a partial object to `strings` to translate. */
export interface PhotoGridStrings {
    /** Visible label and name of the tile that adds a photo. */
    addPhoto: string;
    /** Name of a photo that has no `alt`. */
    photoName: (position: number, total: number) => string;
    /** Name of the last tile when it stands for the photos not shown. */
    morePhotos: (count: number) => string;
    /** Name of the button that opens a photo, in a grid where a press selects. */
    openPhoto: (name: string) => string;
    /** How to get around by keyboard. Read once when focus enters the grid, and shown while it has keyboard focus. */
    keyboardHint: string;
}

export const PHOTO_GRID_STRINGS: PhotoGridStrings = {
    addPhoto: "Add photo",
    photoName: (position, total) => `Photo ${position} of ${total}`,
    morePhotos: (count) => `${count} more ${count === 1 ? "photo" : "photos"}`,
    openPhoto: (name) => `Open ${name}`,
    keyboardHint: "Use the arrow keys to move between photos.",
};

/** What the user did to close the viewer. `swipe` is a swipe down on the photo. */
export type PhotoViewerCloseReason = "escape" | "close-button" | "swipe";

/** Something to do with the photo that is showing: share it, delete it. */
export interface PhotoViewerAction {
    id: string;
    label: string;
    /** An icon component, as `@lucide/svelte` icons are. */
    icon?: Component<{ size?: number; class?: string }>;
    /** `danger` for a destructive action such as Delete. */
    tone?: "danger";
    disabled?: boolean;
    onclick: (photo: Photo, index: number) => void;
}

/** Every built-in string of PhotoViewer. Pass a partial object to `strings` to translate. */
export interface PhotoViewerStrings {
    close: string;
    previous: string;
    next: string;
    /** The counter that is shown: "3 / 12". */
    counter: (position: number, total: number) => string;
    /** The same for a screen reader, read out after the photo's `alt`: "3 of 12". */
    position: (position: number, total: number) => string;
    /** Announced, with a spinner, when a photo takes a while to load. */
    loading: string;
    /** Shown when a photo cannot be loaded. */
    loadError: string;
    retry: string;
    /** Name of the menu that holds the actions that do not fit in the bar. */
    moreActions: string;
    /** The button that shows all of a long caption, and the one that folds it again. */
    showMore: string;
    showLess: string;
    /** Name of a photo that has no `alt`. */
    photoName: (position: number, total: number) => string;
}

export const PHOTO_VIEWER_STRINGS: PhotoViewerStrings = {
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
    counter: (position, total) => `${position} / ${total}`,
    position: (position, total) => `${position} of ${total}`,
    loading: "Loading photo",
    loadError: "The photo could not be loaded.",
    retry: "Try again",
    moreActions: "More actions",
    showMore: "More",
    showLess: "Less",
    photoName: (position, total) => `Photo ${position} of ${total}`,
};

/** How many actions the viewer's bar shows before the rest go into a menu. */
export const MAX_BAR_ACTIONS = 3;

/** The actions shown in the bar, and those that go into the menu. */
export function splitActions<T>(actions: readonly T[], max = MAX_BAR_ACTIONS): { bar: T[]; menu: T[] } {
    if (actions.length <= max) return { bar: [...actions], menu: [] };
    // One place in the bar goes to the menu's own button.
    return { bar: actions.slice(0, max - 1), menu: actions.slice(max - 1) };
}

/** An index held inside a list of `count` photos; -1 for an empty list. */
export function clampIndex(index: number, count: number): number {
    if (count <= 0) return -1;
    if (!Number.isFinite(index)) return 0;
    return Math.min(Math.max(Math.trunc(index), 0), count - 1);
}

/** What the grid shows of `total` photos under `max`, and how many the last tile stands for. */
export function visibleCount(total: number, max: number | undefined): { shown: number; hidden: number } {
    if (max === undefined || !Number.isFinite(max) || max < 1 || total <= max) {
        return { shown: total, hidden: 0 };
    }
    const shown = Math.floor(max);
    return { shown, hidden: total - shown };
}

// ---------------------------------------------------------------------------
// Zoom and pan
// ---------------------------------------------------------------------------

export interface Size {
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}

/**
 * Where the photo is. `scale` 1 is the photo fitted to the screen. `x` and
 * `y` are how far its centre is from the centre of the screen, in px.
 */
export interface PhotoTransform {
    scale: number;
    x: number;
    y: number;
}

export const REST: PhotoTransform = { scale: 1, x: 0, y: 0 };
export const MIN_SCALE = 1;
export const MAX_SCALE = 4;
/** What a double tap zooms to. */
export const DOUBLE_TAP_SCALE = 2.5;
/** Under this a released pinch goes back to the fitted photo. */
const SNAP_TO_FIT = 1.02;

export const isZoomed = (transform: PhotoTransform) => transform.scale > 1.001;

/** The largest size a photo of `photo` px takes inside `view` without being cropped. */
export function fitSize(photo: Size, view: Size): Size {
    if (photo.width <= 0 || photo.height <= 0 || view.width <= 0 || view.height <= 0) {
        return { width: 0, height: 0 };
    }
    const ratio = Math.min(view.width / photo.width, view.height / photo.height);
    return { width: photo.width * ratio, height: photo.height * ratio };
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * The transform with its pan held to the photo's edges: an edge of the photo
 * never comes further in than the edge of the screen, and a side that is
 * narrower than the screen stays centred. `fit` is the photo's size at scale 1.
 */
export function clampPan(transform: PhotoTransform, fit: Size, view: Size): PhotoTransform {
    const scale = clamp(transform.scale, MIN_SCALE, MAX_SCALE);
    const maxX = Math.max(0, (fit.width * scale - view.width) / 2);
    const maxY = Math.max(0, (fit.height * scale - view.height) / 2);
    // `|| 0`: a clamp to a limit of zero can leave -0, which is not what "centred" should print as.
    return {
        scale,
        x: clamp(transform.x, -maxX, maxX) || 0,
        y: clamp(transform.y, -maxY, maxY) || 0,
    };
}

/**
 * Zooms to `scale` so that the point of the photo under `point` stays under
 * it. `point` is measured from the centre of the screen.
 */
export function zoomAbout(
    transform: PhotoTransform,
    scale: number,
    point: Point,
    fit: Size,
    view: Size,
): PhotoTransform {
    const next = clamp(scale, MIN_SCALE, MAX_SCALE);
    const ratio = next / transform.scale;
    return clampPan(
        {
            scale: next,
            x: point.x - (point.x - transform.x) * ratio,
            y: point.y - (point.y - transform.y) * ratio,
        },
        fit,
        view,
    );
}

/** Two fingers on the glass: the point between them, and how far apart they are. */
export interface PinchSample {
    centre: Point;
    distance: number;
}

export function pinchSample(first: Point, second: Point): PinchSample {
    return {
        centre: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 },
        distance: Math.hypot(second.x - first.x, second.y - first.y),
    };
}

/**
 * Where a pinch has taken the photo: scaled by how much the fingers have
 * spread, about the point that was between them when it began, and moved with
 * that point. Points are measured from the centre of the screen.
 */
export function pinchTransform(
    start: PhotoTransform,
    from: PinchSample,
    now: PinchSample,
    fit: Size,
    view: Size,
): PhotoTransform {
    if (from.distance <= 0) return clampPan(start, fit, view);
    const zoomed = zoomAbout(start, start.scale * (now.distance / from.distance), from.centre, fit, view);
    return clampPan(
        {
            scale: zoomed.scale,
            x: zoomed.x + (now.centre.x - from.centre.x),
            y: zoomed.y + (now.centre.y - from.centre.y),
        },
        fit,
        view,
    );
}

/** A pinch let go a hair above the fitted size is the fitted size. */
export function settleZoom(transform: PhotoTransform, fit: Size, view: Size): PhotoTransform {
    return transform.scale < SNAP_TO_FIT ? REST : clampPan(transform, fit, view);
}

/** A double tap: in to 2.5 times about the tap from the fitted photo, and back to fitted from any zoom. */
export function doubleTapTransform(
    transform: PhotoTransform,
    point: Point,
    fit: Size,
    view: Size,
): PhotoTransform {
    return isZoomed(transform) ? REST : zoomAbout(transform, DOUBLE_TAP_SCALE, point, fit, view);
}

/** The photo moved by `delta` px, held to its edges. */
export function panBy(transform: PhotoTransform, delta: Point, fit: Size, view: Size): PhotoTransform {
    return clampPan({ scale: transform.scale, x: transform.x + delta.x, y: transform.y + delta.y }, fit, view);
}

/** One step of the keyboard or the wheel: in or out by half again, about the centre. */
export const ZOOM_STEP = 1.5;

// ---------------------------------------------------------------------------
// Taps and swipes
// ---------------------------------------------------------------------------

/** Movement under this many px is a press, not a drag. */
export const TAP_SLOP = 8;
/** A press shorter than this is a tap, and two taps closer together than this are a double tap. */
export const TAP_MS = 300;
/** Two taps further apart than this are two taps. */
export const DOUBLE_TAP_RADIUS = 32;

export function isDoubleTap(
    previous: { time: number; point: Point } | null,
    now: { time: number; point: Point },
): boolean {
    if (!previous) return false;
    return (
        now.time - previous.time <= TAP_MS &&
        Math.hypot(now.point.x - previous.point.x, now.point.y - previous.point.y) <= DOUBLE_TAP_RADIUS
    );
}

/**
 * Which way a drag on the fitted photo is going, once it has gone far enough
 * to tell: `x` turns the page, `down` closes, and null is not yet known. A
 * drag upwards is neither, and stays null.
 */
export function dragAxis(delta: Point, slop = TAP_SLOP): "x" | "down" | null {
    const horizontal = Math.abs(delta.x);
    const vertical = Math.abs(delta.y);
    if (Math.max(horizontal, vertical) < slop) return null;
    if (horizontal >= vertical) return "x";
    return delta.y > 0 ? "down" : null;
}

/** Part of the screen's width a slow swipe has to cross to turn the page. */
export const TURN_DISTANCE = 0.25;
/** Part of the screen's height a slow swipe down has to cross to close. */
export const CLOSE_DISTANCE = 0.2;

/**
 * What a horizontal swipe does when the finger lifts. A flick decides by its
 * direction; a slow one by how far it went. Swiping left shows the next
 * photo, and the previous one in a right-to-left layout. At either end there
 * is nothing to turn to.
 */
export function swipeTurn(options: {
    /** px moved; negative is to the left. */
    distance: number;
    /** px per ms at release; negative is to the left. */
    velocity: number;
    width: number;
    index: number;
    count: number;
    rtl?: boolean;
    flick: number;
}): -1 | 0 | 1 {
    const { distance, velocity, width, index, count, rtl = false, flick } = options;
    let direction: -1 | 0 | 1 = 0;
    if (Math.abs(velocity) >= flick) direction = velocity < 0 ? 1 : -1;
    else if (Math.abs(distance) >= width * TURN_DISTANCE) direction = distance < 0 ? 1 : -1;
    // A flick against the way the photo was dragged is a change of mind.
    if (direction !== 0 && distance !== 0 && Math.sign(distance) === direction) direction = 0;
    if (rtl && direction !== 0) direction = direction === 1 ? -1 : 1;
    const target = index + direction;
    return target < 0 || target >= count ? 0 : direction;
}

/** Whether a swipe down closes the viewer when the finger lifts. */
export function swipeCloses(options: {
    /** px moved down. */
    distance: number;
    /** px per ms at release; positive is down. */
    velocity: number;
    height: number;
    flick: number;
}): boolean {
    const { distance, velocity, height, flick } = options;
    if (distance <= 0) return false;
    return velocity >= flick || (distance >= height * CLOSE_DISTANCE && velocity > -flick);
}

/**
 * How far a drag past the first or last photo moves it: a third of the
 * finger's travel, so it gives but does not come away.
 */
export function resist(distance: number): number {
    return distance / 3;
}
