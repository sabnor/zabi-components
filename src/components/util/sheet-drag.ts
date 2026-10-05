/**
 * Dragging a bottom sheet with a finger or a pointer. Shared by `BottomSheet`
 * and `SlideUp`, so the two cannot disagree on what a swipe is.
 *
 * It only reports the gesture: how far the pointer has travelled since the
 * drag began and how fast it was going at the end. What that means (move the
 * panel, snap, close) is the caller's.
 */

export interface SheetDragCallbacks {
    /** Asked when a gesture could begin. Return false to leave it alone. */
    canStart?: () => boolean;
    onStart?: () => void;
    /** `distance` in px since the drag began; positive is down. */
    onMove: (distance: number) => void;
    /** `velocity` in px per ms over the last moments of the drag; positive is down. */
    onEnd: (distance: number, velocity: number, event: Event) => void;
    /** The browser took the gesture back (a call came in, the pointer was lost). */
    onCancel?: () => void;
}

export interface SheetDragTargets {
    /**
     * The grip and the area around it. A drag that starts here moves the
     * sheet in either direction. Give it `touch-action: none`.
     */
    handleZone: HTMLElement;
    /**
     * The scrolling content. A touch that starts here scrolls it; only a
     * downward swipe that begins with the content at its top moves the sheet.
     */
    scroller?: HTMLElement | null;
}

/** Movement under this many px is a press, not a drag. */
export const DRAG_SLOP = 6;

/** Controls in the handle zone that keep their own press, except the grip itself. */
const INTERACTIVE = "button, a[href], input, select, textarea, [data-sheet-no-drag]";
const GRIP = "[data-sheet-grip]";

/**
 * The clock for velocity. Not `event.timeStamp`: some browsers hand every
 * event of one frame the same stamp, and a flick then has no duration.
 */
const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

/** How far back the velocity looks, in ms. */
const VELOCITY_WINDOW = 100;

/**
 * How fast a pointer was moving over the last moments of a gesture, on one
 * axis. Also used by `PhotoViewer`, for both axes.
 */
export function createVelocityTracker() {
    let samples: { time: number; y: number }[] = [];
    return {
        reset(y: number, time: number) {
            samples = [{ time, y }];
        },
        add(y: number, time: number) {
            samples.push({ time, y });
            while (samples.length > 2 && time - samples[0].time > VELOCITY_WINDOW) samples.shift();
        },
        velocity(): number {
            if (samples.length < 2) return 0;
            const first = samples[0];
            const last = samples[samples.length - 1];
            const elapsed = last.time - first.time;
            return elapsed > 0 ? (last.y - first.y) / elapsed : 0;
        },
    };
}

/**
 * Listens for drags on a sheet. Call it when the sheet is open, in the
 * browser, and call the returned function when it closes.
 */
export function attachSheetDrag(
    { handleZone, scroller }: SheetDragTargets,
    callbacks: SheetDragCallbacks,
): () => void {
    const tracker = createVelocityTracker();
    const allowed = () => callbacks.canStart?.() ?? true;

    // --- The handle zone: pointer events, so a mouse and a pen drag it too.
    let pointerId: number | null = null;
    let pointerStart = 0;
    let pointerDragging = false;

    function swallowClick(event: MouseEvent) {
        // The click that ends a drag on the grip is not a press of the grip.
        event.preventDefault();
        event.stopPropagation();
    }

    function onPointerDown(event: PointerEvent) {
        if (pointerId !== null || touchDragging) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;
        const target = event.target as Element | null;
        if (target?.closest(INTERACTIVE) && !target.closest(GRIP)) return;
        if (!allowed()) return;
        pointerId = event.pointerId;
        pointerStart = event.clientY;
        pointerDragging = false;
        tracker.reset(event.clientY, now());
        try {
            handleZone.setPointerCapture(event.pointerId);
        } catch {
            /* a test DOM, or a pointer that is already gone */
        }
    }

    function onPointerMove(event: PointerEvent) {
        if (event.pointerId !== pointerId) return;
        const distance = event.clientY - pointerStart;
        if (!pointerDragging) {
            if (Math.abs(distance) < DRAG_SLOP) return;
            pointerDragging = true;
            // Measured from where the drag was recognised, so the sheet does
            // not jump by the slop.
            pointerStart = event.clientY;
            tracker.reset(event.clientY, now());
            callbacks.onStart?.();
            callbacks.onMove(0);
            return;
        }
        tracker.add(event.clientY, now());
        callbacks.onMove(distance);
    }

    function finishPointer(event: PointerEvent, cancelled: boolean) {
        if (event.pointerId !== pointerId) return;
        const wasDragging = pointerDragging;
        const distance = event.clientY - pointerStart;
        pointerId = null;
        pointerDragging = false;
        try {
            handleZone.releasePointerCapture(event.pointerId);
        } catch {
            /* never captured */
        }
        if (!wasDragging) return;
        if (cancelled) {
            callbacks.onCancel?.();
            return;
        }
        tracker.add(event.clientY, now());
        handleZone.addEventListener("click", swallowClick, { capture: true, once: true });
        // No click follows a drag that ends off the element it began on.
        setTimeout(() => handleZone.removeEventListener("click", swallowClick, true), 0);
        callbacks.onEnd(distance, tracker.velocity(), event);
    }

    const onPointerUp = (event: PointerEvent) => finishPointer(event, false);
    const onPointerCancel = (event: PointerEvent) => finishPointer(event, true);

    // --- The content: touch events, because here the browser owns the
    // gesture (it scrolls) until we take it, and only a touch listener that
    // is not passive can take it.
    let touchId: number | null = null;
    let touchStart = 0;
    let touchDragging = false;
    let startedAtTop = false;

    const touchOf = (event: TouchEvent, list: TouchList) =>
        Array.from(list).find((touch) => touch.identifier === touchId);

    function onTouchStart(event: TouchEvent) {
        if (touchId !== null || pointerId !== null || event.touches.length !== 1) return;
        const touch = event.touches[0];
        touchId = touch.identifier;
        touchStart = touch.clientY;
        touchDragging = false;
        startedAtTop = (scroller?.scrollTop ?? 0) <= 0;
    }

    function onTouchMove(event: TouchEvent) {
        const touch = touchOf(event, event.touches);
        if (!touch) return;
        const distance = touch.clientY - touchStart;
        if (!touchDragging) {
            // Content that has scrolled, or a swipe upwards: the content's.
            if (!startedAtTop || (scroller?.scrollTop ?? 0) > 0) return;
            if (distance < DRAG_SLOP || !allowed()) return;
            touchDragging = true;
            touchStart = touch.clientY;
            tracker.reset(touch.clientY, now());
            callbacks.onStart?.();
            if (event.cancelable) event.preventDefault();
            callbacks.onMove(0);
            return;
        }
        // Ours now: no scrolling, no pull-to-refresh.
        if (event.cancelable) event.preventDefault();
        tracker.add(touch.clientY, now());
        callbacks.onMove(distance);
    }

    function finishTouch(event: TouchEvent, cancelled: boolean) {
        const touch = touchOf(event, event.changedTouches);
        if (!touch) return;
        const wasDragging = touchDragging;
        const distance = touch.clientY - touchStart;
        touchId = null;
        touchDragging = false;
        if (!wasDragging) return;
        if (cancelled) {
            callbacks.onCancel?.();
            return;
        }
        tracker.add(touch.clientY, now());
        callbacks.onEnd(distance, tracker.velocity(), event);
    }

    const onTouchEnd = (event: TouchEvent) => finishTouch(event, false);
    const onTouchCancel = (event: TouchEvent) => finishTouch(event, true);

    handleZone.addEventListener("pointerdown", onPointerDown);
    handleZone.addEventListener("pointermove", onPointerMove);
    handleZone.addEventListener("pointerup", onPointerUp);
    handleZone.addEventListener("pointercancel", onPointerCancel);
    scroller?.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller?.addEventListener("touchmove", onTouchMove, { passive: false });
    scroller?.addEventListener("touchend", onTouchEnd);
    scroller?.addEventListener("touchcancel", onTouchCancel);

    return () => {
        handleZone.removeEventListener("pointerdown", onPointerDown);
        handleZone.removeEventListener("pointermove", onPointerMove);
        handleZone.removeEventListener("pointerup", onPointerUp);
        handleZone.removeEventListener("pointercancel", onPointerCancel);
        handleZone.removeEventListener("click", swallowClick, true);
        scroller?.removeEventListener("touchstart", onTouchStart);
        scroller?.removeEventListener("touchmove", onTouchMove);
        scroller?.removeEventListener("touchend", onTouchEnd);
        scroller?.removeEventListener("touchcancel", onTouchCancel);
    };
}

/** A flick: faster than this, in px per ms, and the direction decides, not the distance. */
export const FLICK_VELOCITY = 0.5;

/** True where the user has asked for less motion, or where that cannot be asked. */
export function prefersReducedMotion(): boolean {
    return (
        typeof window === "undefined" ||
        typeof window.matchMedia !== "function" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}
