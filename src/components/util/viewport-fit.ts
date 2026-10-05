/**
 * Keeping a floating box (a tooltip, a menu) inside the viewport: which side
 * of its trigger it opens on, and how far it has to move along that side to
 * stay on screen. Pure arithmetic over rectangles, so it runs in a unit test
 * and nothing here reads the DOM.
 */

export type FloatingSide = "top" | "bottom" | "left" | "right";

/** A rectangle in viewport coordinates, as `getBoundingClientRect` gives it. */
export interface ViewportRect {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface ViewportSize {
    width: number;
    height: number;
}

const OPPOSITE: Record<FloatingSide, FloatingSide> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
};

/** The room, in px, between each side of `trigger` and the viewport edge. */
function roomAround(trigger: ViewportRect, viewport: ViewportSize): Record<FloatingSide, number> {
    return {
        top: trigger.top,
        bottom: viewport.height - trigger.bottom,
        left: trigger.left,
        right: viewport.width - trigger.right,
    };
}

/**
 * The side a floating box of `size` opens on: the preferred one when it fits
 * there, the opposite one when only that fits, and otherwise whichever of the
 * two has more room.
 *
 * `gap` is the distance between trigger and box; `margin` is how close to the
 * viewport edge the box may come.
 */
export function pickSide(
    preferred: FloatingSide,
    trigger: ViewportRect,
    size: ViewportSize,
    viewport: ViewportSize,
    { gap = 8, margin = 8 }: { gap?: number; margin?: number } = {},
): FloatingSide {
    const room = roomAround(trigger, viewport);
    const needed =
        (preferred === "top" || preferred === "bottom" ? size.height : size.width) + gap + margin;
    const opposite = OPPOSITE[preferred];
    if (room[preferred] >= needed) return preferred;
    if (room[opposite] >= needed) return opposite;
    return room[opposite] > room[preferred] ? opposite : preferred;
}

/**
 * How far `box` has to move, in px, to lie inside the viewport with `margin`
 * to spare. Zero on an axis where it already does. A box larger than the
 * viewport is aligned to the start edge (top, left), where its text begins.
 */
export function shiftIntoViewport(
    box: ViewportRect,
    viewport: ViewportSize,
    margin = 8,
): { x: number; y: number } {
    const along = (start: number, end: number, extent: number): number => {
        if (end - start > extent - 2 * margin) return margin - start;
        if (start < margin) return margin - start;
        if (end > extent - margin) return extent - margin - end;
        return 0;
    };
    return {
        x: along(box.left, box.right, viewport.width),
        y: along(box.top, box.bottom, viewport.height),
    };
}

export interface ViewportPoint {
    x: number;
    y: number;
}

/**
 * True when `point` lies in the triangle `a`, `b`, `c`, edges included. For
 * the path a pointer takes from a trigger to its floating box: as long as it
 * stays in the triangle between where it left and the near edge of the box,
 * it is on its way there.
 */
export function insideTriangle(
    point: ViewportPoint,
    a: ViewportPoint,
    b: ViewportPoint,
    c: ViewportPoint,
): boolean {
    const side = (p: ViewportPoint, q: ViewportPoint, r: ViewportPoint) =>
        (p.x - r.x) * (q.y - r.y) - (q.x - r.x) * (p.y - r.y);
    const first = side(point, a, b);
    const second = side(point, b, c);
    const third = side(point, c, a);
    const negative = first < 0 || second < 0 || third < 0;
    const positive = first > 0 || second > 0 || third > 0;
    return !(negative && positive);
}
