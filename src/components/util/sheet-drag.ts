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
     * downward swipe that begins with the content at its top moves the sheet,
     * and not one that begins on a box inside it that scrolls itself or on
     * something that handles its own gesture: marked `data-sheet-no-drag`,
     * a range input, or with a `touch-action` that gives up vertical
     * panning (`contentTakesTouch`). A swipe that begins sideways stays
     * sideways and never moves the sheet.
     */
    scroller?: HTMLElement | null;
}

/** Movement under this many px is a press, not a drag. */
export const DRAG_SLOP = 6;

/**
 * Movement, on either axis, after which a touch in the content has an axis:
 * more across than down is sideways (a carousel, a row that scrolls, a
 * swipeable item), and stays so until the finger lifts.
 */
export const AXIS_SLOP = 8;

/** Controls in the handle zone that keep their own press, except the grip itself. */
const INTERACTIVE = "button, a[href], input, select, textarea, [data-sheet-no-drag]";
const GRIP = "[data-sheet-grip]";

/**
 * Content that is dragged by a finger on its own and so is never the sheet's:
 * anything carrying `data-sheet-no-drag`, and a range input. Read on a touch
 * that starts in the content.
 */
const OWN_DRAG = "[data-sheet-no-drag], input[type='range']";

/**
 * Whether a computed `touch-action` hands vertical gestures to the element's
 * own code: `none`, or panning on the x axis only. `auto`, `manipulation`,
 * `pan-y` and the like let the browser pan vertically, which is the sheet's
 * to take.
 */
function ownsVerticalGesture(touchAction: string): boolean {
    const tokens = touchAction.trim().split(/\s+/);
    if (tokens.includes("none")) return true;
    const sideways = tokens.some((token) => token === "pan-x" || token === "pan-left" || token === "pan-right");
    const vertical = tokens.some((token) => token === "pan-y" || token === "pan-up" || token === "pan-down");
    return sideways && !vertical;
}

/**
 * Whether a touch that begins on `target` belongs to the content and not to the
 * sheet: it started on something that is dragged itself (`OWN_DRAG`), or it
 * has, between it and the sheet's `scroller`, a box that scrolls on the y axis
 * or one whose `touch-action` leaves vertical panning to the page's own code
 * (`ownsVerticalGesture`: a map, a canvas, a drawing pad, a slider).
 * A box that can scroll keeps the gesture whether it is at its top or not: a
 * drag that sometimes scrolls a list and sometimes closes the sheet cannot be
 * predicted, and the list does not hand over what it cannot use
 * (`overscroll-contain`). The scroller itself is not asked here; it is the
 * sheet's own content, and hands a pull down at its top to the sheet.
 */
export function contentTakesTouch(target: EventTarget | null, scroller: HTMLElement): boolean {
    if (!(target instanceof Element)) return false;
    if (target.closest(OWN_DRAG)) return true;
    for (let node: Element | null = target; node && node !== scroller; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (ownsVerticalGesture(style.getPropertyValue("touch-action"))) return true;
        const overflow = style.overflowY;
        if ((overflow === "auto" || overflow === "scroll") && node.scrollHeight > node.clientHeight) {
            return true;
        }
    }
    return false;
}

/** The clock of this page, for when an event's own time cannot be used. */
const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

/**
 * When a pointer or touch event happened: its own `timeStamp`, which is when
 * the finger moved. The time the handler runs is later by however busy the
 * page is, and unevenly so, which made a flick on a janky frame (or a loaded
 * machine) measure slower than it was and spring back. An event without a
 * usable stamp gets the clock.
 */
export function timeOf(event: Event): number {
    const stamp = event.timeStamp;
    return typeof stamp === "number" && stamp > 0 ? stamp : now();
}

/** How far back the velocity looks, in ms. */
const VELOCITY_WINDOW = 100;

/**
 * How fast a pointer was moving over the last moments of a gesture, on one
 * axis. Also used by `PhotoViewer`, for both axes.
 */
export function createVelocityTracker() {
    /** `time` is the event's; `clock` is when it was handled. */
    let samples: { time: number; clock: number; y: number }[] = [];
    return {
        reset(y: number, time: number) {
            samples = [{ time, clock: now(), y }];
        },
        add(y: number, time: number) {
            samples.push({ time, clock: now(), y });
            while (samples.length > 2 && time - samples[0].time > VELOCITY_WINDOW) samples.shift();
        },
        velocity(): number {
            if (samples.length < 2) return 0;
            const first = samples[0];
            const last = samples[samples.length - 1];
            // Some browsers hand every event of one frame the same stamp:
            // such a flick has no duration by the events, and is timed by
            // the clock instead.
            const byEvents = last.time - first.time;
            const elapsed = byEvents > 0 ? byEvents : last.clock - first.clock;
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
        tracker.reset(event.clientY, timeOf(event));
        // Not captured yet. A captured pointer delivers its `pointerup` and
        // the click that follows to the handle zone, not to what was
        // pressed: a mouse click on the grip then never reached the grip's
        // button. It is captured once the press has become a drag. A mouse
        // can leave the zone before that, so its moves are followed on the
        // window meanwhile; a finger stays with the element it went down on.
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerCancel);
    }

    function stopFollowing() {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerCancel);
    }

    function onPointerMove(event: PointerEvent) {
        if (event.pointerId !== pointerId) return;
        const distance = event.clientY - pointerStart;
        if (!pointerDragging) {
            if (Math.abs(distance) < DRAG_SLOP) return;
            pointerDragging = true;
            try {
                handleZone.setPointerCapture(event.pointerId);
            } catch {
                /* a test DOM, or a pointer that is already gone */
            }
            // Measured from where the drag was recognised, so the sheet does
            // not jump by the slop.
            pointerStart = event.clientY;
            tracker.reset(event.clientY, timeOf(event));
            callbacks.onStart?.();
            callbacks.onMove(0);
            return;
        }
        tracker.add(event.clientY, timeOf(event));
        callbacks.onMove(distance);
    }

    function finishPointer(event: PointerEvent, cancelled: boolean) {
        if (event.pointerId !== pointerId) return;
        const wasDragging = pointerDragging;
        const distance = event.clientY - pointerStart;
        pointerId = null;
        pointerDragging = false;
        stopFollowing();
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
        tracker.add(event.clientY, timeOf(event));
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
    let touchStartX = 0;
    /** Decided once per gesture, after `AXIS_SLOP`: null until then. */
    let touchAxis: "x" | "y" | null = null;
    let touchDragging = false;
    let startedAtTop = false;
    /** The touch began on something inside the content that keeps it. */
    let contentOwns = false;

    const touchOf = (event: TouchEvent, list: TouchList) =>
        Array.from(list).find((touch) => touch.identifier === touchId);

    function onTouchStart(event: TouchEvent) {
        if (touchId !== null || pointerId !== null || event.touches.length !== 1) return;
        const touch = event.touches[0];
        touchId = touch.identifier;
        touchStart = touch.clientY;
        touchStartX = touch.clientX;
        touchAxis = null;
        touchDragging = false;
        startedAtTop = (scroller?.scrollTop ?? 0) <= 0;
        contentOwns = !!scroller && contentTakesTouch(event.target, scroller);
    }

    function onTouchMove(event: TouchEvent) {
        const touch = touchOf(event, event.touches);
        if (!touch) return;
        const distance = touch.clientY - touchStart;
        if (!touchDragging) {
            // Content that has scrolled, or a swipe upwards: the content's.
            if (contentOwns || touchAxis === "x" || !startedAtTop || (scroller?.scrollTop ?? 0) > 0) return;
            if (touchAxis === null) {
                const across = Math.abs(touch.clientX - touchStartX);
                if (Math.max(across, Math.abs(distance)) < AXIS_SLOP) return;
                touchAxis = across > Math.abs(distance) ? "x" : "y";
                if (touchAxis === "x") return;
            }
            if (distance < DRAG_SLOP || !allowed()) return;
            touchDragging = true;
            touchStart = touch.clientY;
            tracker.reset(touch.clientY, timeOf(event));
            callbacks.onStart?.();
            if (event.cancelable) event.preventDefault();
            callbacks.onMove(0);
            return;
        }
        // Ours now: no scrolling, no pull-to-refresh.
        if (event.cancelable) event.preventDefault();
        tracker.add(touch.clientY, timeOf(event));
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
        tracker.add(touch.clientY, timeOf(event));
        callbacks.onEnd(distance, tracker.velocity(), event);
    }

    const onTouchEnd = (event: TouchEvent) => finishTouch(event, false);
    const onTouchCancel = (event: TouchEvent) => finishTouch(event, true);

    handleZone.addEventListener("pointerdown", onPointerDown);
    scroller?.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller?.addEventListener("touchmove", onTouchMove, { passive: false });
    scroller?.addEventListener("touchend", onTouchEnd);
    scroller?.addEventListener("touchcancel", onTouchCancel);

    return () => {
        handleZone.removeEventListener("pointerdown", onPointerDown);
        stopFollowing();
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
