/** Public types and pure helpers for `BottomSheet`. */

/** A height the sheet rests at: half the screen, or all of it below the status bar. */
export type BottomSheetSnap = "half" | "full";

/** What the user did to close the sheet. `swipe` is a drag or flick downwards. */
export type BottomSheetCloseReason = "escape" | "backdrop" | "close-button" | "swipe";

const ORDER: BottomSheetSnap[] = ["half", "full"];

/** The snap points in use, lowest first, without repeats or unknown values. */
export function normaliseSnapPoints(points: readonly BottomSheetSnap[] | undefined): BottomSheetSnap[] {
    const wanted = ORDER.filter((point) => points?.includes(point));
    return wanted.length > 0 ? wanted : [...ORDER];
}

/**
 * Where the grip's button takes the sheet: up a step, and from the top back
 * down. Null when there is only one snap point, so nowhere to go.
 */
export function nextSnap(
    points: readonly BottomSheetSnap[],
    current: BottomSheetSnap,
): BottomSheetSnap | null {
    if (points.length < 2) return null;
    const index = points.indexOf(current);
    return index === points.length - 1 ? points[index - 1] : points[index + 1];
}

/**
 * Where a released sheet settles. `heights` are the px heights of the snap
 * points, lowest first; `height` is how much of the sheet shows at release.
 * A flick goes one step in its direction from where the drag began; a slow
 * release goes to whatever is nearest, with "closed" at height 0.
 *
 * Returns the index into `heights`, or -1 for closed.
 */
export function settleSnap(options: {
    heights: readonly number[];
    startIndex: number;
    height: number;
    /** px per ms, positive is down. */
    velocity: number;
    flick: number;
    canClose: boolean;
}): number {
    const { heights, startIndex, height, velocity, flick, canClose } = options;
    const lowest = canClose ? -1 : 0;
    if (velocity >= flick) return Math.max(lowest, startIndex - 1);
    if (velocity <= -flick) return Math.min(heights.length - 1, startIndex + 1);

    let best = canClose ? -1 : 0;
    let bestDistance = canClose ? Math.abs(height) : Math.abs(height - heights[0]);
    heights.forEach((candidate, index) => {
        const distance = Math.abs(height - candidate);
        if (distance < bestDistance) {
            best = index;
            bestDistance = distance;
        }
    });
    return best;
}
