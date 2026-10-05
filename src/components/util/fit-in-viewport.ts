/**
 * Keeps a floating box (a menu, a panel, a tooltip) where it can be seen.
 *
 * One module for everything that opens next to a trigger. Two layers:
 *
 * - `pickSide` and `shiftIntoViewport` are the two decisions every such box
 *   needs: which side of its trigger it opens on, and how far it has to move
 *   along that side to stay on screen. Tooltip uses them as they are.
 * - `fitPanel` builds on them for a panel that hangs from one edge of its
 *   anchor (Dropdown, Select's list, NavigationMenuContent): it also narrows
 *   and shortens a panel too large for the screen. `measurePlacement` reads
 *   the layout for it, and `watchViewport` re-runs it while the panel is open.
 *
 * The arithmetic is pure, so it can be tested without a layout.
 *
 * The screen is not the only thing that cuts a panel off. Inside a box that
 * scrolls (a Modal's body, a list with its own scrollbar) the box clips it
 * first. `measurePlacement` takes the nearest such box into account: it
 * decides which side the panel opens on, and when the panel fits on neither
 * side it says where to put the panel with `position: fixed`, which a
 * scrolling ancestor does not clip.
 */

export type PanelBlock = "bottom" | "top";
export type PanelInline = "start" | "end";

export interface PanelBox {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export interface FitPanelInput {
    /** The box the panel is positioned against, in viewport coordinates. */
    anchor: PanelBox;
    /** The panel's natural size, measured with no limit on it. */
    panel: { width: number; height: number };
    viewport: { width: number; height: number };
    /** The side asked for. It is kept whenever the panel fits there. */
    block: PanelBlock;
    inline: PanelInline;
    /** Right-to-left layout: `start` is then the right edge. */
    rtl?: boolean;
    /** Room kept between the panel and every edge of the viewport. */
    margin?: number;
    /** Distance between the anchor and the panel. */
    gap?: number;
    /** False keeps the panel on the `block` side asked for, whatever fits. */
    flipBlock?: boolean;
    /** False keeps it on the `inline` edge asked for and slides it back inside instead. */
    flipInline?: boolean;
    /**
     * The inside of the nearest ancestor that clips, in viewport coordinates.
     * It decides which side the panel opens on and how far it slides; it
     * never limits the panel's size, which only the viewport does.
     */
    clip?: PanelBox | null;
}

export interface PanelFit {
    block: PanelBlock;
    inline: PanelInline;
    /**
     * Distance to put between the anchor's `inline` edge and the panel's, for
     * `inset-inline-start` or `inset-inline-end`. 0 when the panel fits as it
     * is; otherwise what slides it back inside.
     */
    inlineOffset: number;
    /** A limit to set, or null when the panel fits without one. */
    maxWidth: number | null;
    maxHeight: number | null;
    /** Where the panel's box ends up, in viewport coordinates, and how wide it is there. */
    left: number;
    top: number;
    width: number;
    /** False when part of the panel is outside `clip` (or the viewport) even so. */
    visible: boolean;
}

/** The viewport less its margin, and less whatever `clip` cuts off. */
function boundsOf(
    viewport: { width: number; height: number },
    margin: number,
    clip?: PanelBox | null,
): PanelBox {
    const view = {
        left: margin,
        top: margin,
        right: viewport.width - margin,
        bottom: viewport.height - margin,
    };
    if (!clip) return view;
    return {
        left: Math.max(view.left, clip.left),
        top: Math.max(view.top, clip.top),
        right: Math.min(view.right, clip.right),
        bottom: Math.min(view.bottom, clip.bottom),
    };
}

export type FloatingSide = "top" | "bottom" | "left" | "right";

const OPPOSITE: Record<FloatingSide, FloatingSide> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
};

/** The room, in px, between each side of `trigger` and the matching edge of `bounds`. */
function roomAround(trigger: PanelBox, bounds: PanelBox): Record<FloatingSide, number> {
    return {
        top: trigger.top - bounds.top,
        bottom: bounds.bottom - trigger.bottom,
        left: trigger.left - bounds.left,
        right: bounds.right - trigger.right,
    };
}

/**
 * The side a floating box of `size` opens on: the preferred one when it fits
 * there, the opposite one when only that fits, and otherwise whichever of the
 * two has more room.
 *
 * `gap` is the distance between trigger and box; `margin` is how close to the
 * viewport edge the box may come. `clip` is the inside of an ancestor that
 * cuts the box off, when there is one: the box then has to fit in what both
 * leave.
 */
export function pickSide(
    preferred: FloatingSide,
    trigger: PanelBox,
    size: { width: number; height: number },
    viewport: { width: number; height: number },
    {
        gap = 8,
        margin = 8,
        clip = null,
    }: { gap?: number; margin?: number; clip?: PanelBox | null } = {},
): FloatingSide {
    const room = roomAround(trigger, boundsOf(viewport, margin, clip));
    const needed = (preferred === "top" || preferred === "bottom" ? size.height : size.width) + gap;
    const opposite = OPPOSITE[preferred];
    if (room[preferred] >= needed) return preferred;
    if (room[opposite] >= needed) return opposite;
    return room[opposite] > room[preferred] ? opposite : preferred;
}

/**
 * Where a box `extent` long that starts at `start` ends up when it has to lie
 * between `from` and `to`. A box longer than that is put at `from`, where its
 * text begins.
 */
function slideInto(start: number, extent: number, from: number, to: number): number {
    if (extent > to - from) return from;
    return Math.min(Math.max(start, from), to - extent);
}

/**
 * How far `box` has to move, in px, to lie inside the viewport with `margin`
 * to spare. Zero on an axis where it already does. A box larger than the
 * viewport is aligned to the start edge (top, left), where its text begins.
 */
export function shiftIntoViewport(
    box: PanelBox,
    viewport: { width: number; height: number },
    margin = 8,
): { x: number; y: number } {
    const view = boundsOf(viewport, margin);
    return {
        x: slideInto(box.left, box.right - box.left, view.left, view.right) - box.left,
        y: slideInto(box.top, box.bottom - box.top, view.top, view.bottom) - box.top,
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

/** Where the panel fits, starting from the side asked for. */
export function fitPanel(input: FitPanelInput): PanelFit {
    const {
        anchor,
        panel,
        viewport,
        rtl = false,
        margin = 8,
        gap = 8,
        flipBlock = true,
        flipInline = true,
        clip = null,
    } = input;
    const view = boundsOf(viewport, margin);
    // What the panel has to be inside to be seen: the same as `view` unless something clips.
    const within = boundsOf(viewport, margin, clip);

    // Width first: a panel wider than the screen is narrowed, whichever side it is on.
    const widest = Math.max(0, view.right - view.left);
    const width = Math.min(panel.width, widest);
    const maxWidth = panel.width > widest ? widest : null;

    // `start` grows from the anchor's left edge (its right one when right-to-left).
    const growsRight = (side: PanelInline) => (side === "start") !== rtl;
    const leftFor = (side: PanelInline) =>
        growsRight(side) ? anchor.left : anchor.right - width;
    const fitsInline = (side: PanelInline) => {
        const left = leftFor(side);
        return left >= within.left && left + width <= within.right;
    };
    const other: PanelInline = input.inline === "start" ? "end" : "start";
    const inline =
        !flipInline || fitsInline(input.inline) || !fitsInline(other) ? input.inline : other;

    // Neither side fits: stay on the side asked for and slide back inside. A
    // panel too wide for a clipping box cannot be slid into it; the screen is
    // then all there is to stay inside.
    const start = leftFor(inline);
    const lane = width <= within.right - within.left ? within : view;
    const left = slideInto(start, width, lane.left, lane.right);
    const inlineOffset = growsRight(inline) ? left - start : start - left;

    const roomIn = (bounds: PanelBox, side: PanelBlock) =>
        side === "bottom" ? bounds.bottom - anchor.bottom - gap : anchor.top - gap - bounds.top;
    // The other side if the panel fits only there, else whichever has more room.
    const block = flipBlock
        ? (pickSide(input.block, anchor, panel, viewport, { gap, margin, clip }) as PanelBlock)
        : input.block;
    // The size limit is the screen's, whatever clips: a menu squeezed into a
    // 160px box would be worse than one that reaches out of it.
    const maxHeight =
        panel.height > roomIn(view, block) ? Math.max(0, roomIn(view, block)) : null;
    const height = maxHeight ?? panel.height;
    const top = block === "bottom" ? anchor.bottom + gap : anchor.top - gap - height;

    const slack = 0.5;
    const visible =
        left >= within.left - slack &&
        left + width <= within.right + slack &&
        top >= within.top - slack &&
        top + height <= within.bottom + slack;

    return {
        block,
        inline,
        // -0 would print as "-0px".
        inlineOffset: inlineOffset === 0 ? 0 : inlineOffset,
        maxWidth,
        maxHeight,
        left,
        top,
        width,
        visible,
    };
}

/** A fit that changes nothing: the panel where the CSS puts it, with no limits. */
export function unfitted(block: PanelBlock, inline: PanelInline): PanelFit {
    return {
        block,
        inline,
        inlineOffset: 0,
        maxWidth: null,
        maxHeight: null,
        left: 0,
        top: 0,
        width: 0,
        visible: true,
    };
}

export interface MeasureOptions {
    margin?: number;
    gap?: number;
    flipBlock?: boolean;
    flipInline?: boolean;
    /** Overrides the anchor's own direction; `false` for a panel placed with `left`, not `inset-inline-start`. */
    rtl?: boolean;
    clip?: PanelBox | null;
}

/**
 * Notes how far `panel` and whatever scrolls inside it are scrolled, and
 * returns the function that puts it back. The part of a panel that scrolls is
 * often a list inside it (Dropdown's, Select's), not the panel.
 */
function rememberScroll(panel: HTMLElement): () => void {
    const scrolled = [panel, ...panel.querySelectorAll<HTMLElement>("*")]
        .filter((element) => element.scrollTop !== 0 || element.scrollLeft !== 0)
        .map((element) => ({ element, top: element.scrollTop, left: element.scrollLeft }));
    return () => {
        for (const { element, top, left } of scrolled) {
            element.scrollTop = top;
            element.scrollLeft = left;
        }
    };
}

/**
 * Measures `panel` against `anchor` and returns its fit. Any limit already on
 * the panel is lifted for the measurement, so the answer does not depend on
 * the previous one. Call it before paint (from an effect) and apply the result.
 */
export function measureFit(
    anchor: Element,
    panel: HTMLElement,
    preferred: { block: PanelBlock; inline: PanelInline },
    options: MeasureOptions = {},
): PanelFit {
    const { maxWidth, maxHeight } = panel.style;
    // Without its limit the panel has nothing to scroll, and the browser
    // forgets how far it was scrolled: put that back as well.
    const restoreScroll = rememberScroll(panel);
    panel.style.maxWidth = "none";
    panel.style.maxHeight = "none";
    const natural = panel.getBoundingClientRect();
    let height = natural.height;
    // A panel that will be narrowed wraps its text and grows taller: the
    // height that has to fit is the one it has at that width.
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const widest = Math.max(0, viewportWidth - (options.margin ?? 8) * 2);
    if (natural.width > widest) {
        const { minWidth } = panel.style;
        panel.style.maxWidth = `${widest}px`;
        panel.style.minWidth = `${widest}px`;
        height = panel.getBoundingClientRect().height;
        panel.style.minWidth = minWidth;
    }
    const size = { width: natural.width, height };
    panel.style.maxWidth = maxWidth;
    panel.style.maxHeight = maxHeight;
    restoreScroll();

    // Nothing is laid out (a hidden ancestor, or a test without a layout engine).
    if (size.width === 0 && size.height === 0) return unfitted(preferred.block, preferred.inline);

    const box = anchor.getBoundingClientRect();
    return fitPanel({
        anchor: { left: box.left, right: box.right, top: box.top, bottom: box.bottom },
        panel: { width: size.width, height: size.height },
        // The layout viewport, without a scrollbar's width.
        viewport: {
            width: viewportWidth,
            height: document.documentElement.clientHeight || window.innerHeight,
        },
        ...preferred,
        rtl: getComputedStyle(anchor).direction === "rtl",
        ...options,
    });
}

/**
 * The nearest ancestor of `element` that clips what reaches outside it (any
 * `overflow` but `visible`), with the box it clips to: its inside, without
 * borders or scrollbars, in viewport coordinates. Null when only the viewport
 * clips.
 */
export function clippingAncestor(
    element: Element,
): { element: HTMLElement; box: PanelBox } | null {
    for (
        let current = element.parentElement;
        current && current !== document.body && current !== document.documentElement;
        current = current.parentElement
    ) {
        const style = getComputedStyle(current);
        if (style.overflowX === "visible" && style.overflowY === "visible") continue;
        const outer = current.getBoundingClientRect();
        const left = outer.left + current.clientLeft;
        const top = outer.top + current.clientTop;
        return {
            element: current,
            box: {
                left,
                top,
                right: left + current.clientWidth,
                bottom: top + current.clientHeight,
            },
        };
    }
    return null;
}

/**
 * Whether `element` is the containing block of `position: fixed` descendants:
 * such a descendant is placed against it, not the viewport, and is clipped by
 * it like any other child.
 */
function containsFixed(element: Element): boolean {
    const style = getComputedStyle(element);
    const set = (value: string | undefined) => !!value && value !== "none";
    return (
        set(style.transform) ||
        set(style.filter) ||
        set(style.perspective) ||
        set((style as CSSStyleDeclaration & { backdropFilter?: string }).backdropFilter) ||
        /paint|layout|strict|content/.test(style.contain ?? "") ||
        /transform|filter|perspective/.test(style.willChange ?? "") ||
        (!!style.containerType && style.containerType !== "normal")
    );
}

/** Whether a fixed `panel` would get out of `clipper`: nothing from the panel up to it holds fixed descendants. */
function escapes(panel: Element, clipper: Element): boolean {
    for (let current = panel.parentElement; current; current = current.parentElement) {
        if (containsFixed(current)) return false;
        if (current === clipper) return true;
    }
    return true;
}

/**
 * Where `position: fixed; top: 0; left: 0` puts `panel`. That is the viewport's
 * corner unless an ancestor further up holds fixed descendants, in which case
 * coordinates have to be given from its corner instead.
 */
function fixedOrigin(panel: HTMLElement): { left: number; top: number } {
    const saved = panel.style.cssText;
    panel.style.position = "fixed";
    panel.style.inset = "0 auto auto 0";
    panel.style.margin = "0";
    panel.style.translate = "none";
    const box = panel.getBoundingClientRect();
    panel.style.cssText = saved;
    return { left: box.left, top: box.top };
}

export interface PanelPlacement extends PanelFit {
    /**
     * Set when the panel has to leave a clipping ancestor to be seen: the
     * `top`, `left` and `width` to give it with `position: fixed`. Null when
     * it stays where the CSS puts it.
     *
     * The width is the one the panel has where the CSS puts it. A fixed box
     * is sized against the viewport instead of the anchor, so without it the
     * panel would change width as it leaves the box.
     */
    fixed: { left: number; top: number; width: number } | null;
}

/** The inline styles `fixed` is applied with. Lifted while the panel is measured. */
const FIXED_STYLES = ["position", "top", "left", "right", "bottom", "margin", "width"] as const;

/** Runs `measure` with the panel where the CSS puts it, whatever an earlier placement set on it. */
function asPlaced<T>(panel: HTMLElement, measure: () => T): T {
    const saved = FIXED_STYLES.map((name) => panel.style[name]);
    const restoreScroll = rememberScroll(panel);
    for (const name of FIXED_STYLES) panel.style[name] = "";
    try {
        return measure();
    } finally {
        FIXED_STYLES.forEach((name, index) => (panel.style[name] = saved[index]));
        restoreScroll();
    }
}

/**
 * The fit of `panel`, with the nearest clipping ancestor of `anchor` taken
 * into account.
 *
 * - The panel fits inside that ancestor on the side asked for: nothing changes.
 * - It fits on the other side: it opens there.
 * - It fits on neither: it is placed against the viewport with `fixed`, on the
 *   side the viewport has room for, and reaches out of the ancestor. Only
 *   while some of the anchor can be seen in the ancestor: scrolled out of it,
 *   the anchor takes the panel with it.
 * - It cannot be: something between the panel and that ancestor is the
 *   containing block of fixed descendants (a `transform`, a `filter`). It then
 *   opens on the side of the ancestor with more room, and is cut where that
 *   ends. That is the limit of what a panel can do without leaving its place
 *   in the DOM, and it stays there so that the keyboard, focus and a dialog's
 *   focus trap treat it as part of what opened it.
 */
export function measurePlacement(
    anchor: Element,
    panel: HTMLElement,
    preferred: { block: PanelBlock; inline: PanelInline },
    options: MeasureOptions = {},
): PanelPlacement {
    const clipper = clippingAncestor(anchor);
    if (!clipper) return { ...measureFit(anchor, panel, preferred, options), fixed: null };

    const inside = asPlaced(panel, () =>
        measureFit(anchor, panel, preferred, { ...options, clip: clipper.box }),
    );
    if (inside.visible || !escapes(panel, clipper.element)) return { ...inside, fixed: null };
    // The anchor itself is scrolled out of the box: the panel goes with it. Left
    // fixed, it would float over the page with nothing to show what it belongs to.
    const box = anchor.getBoundingClientRect();
    const { box: clip } = clipper;
    if (box.bottom <= clip.top || box.top >= clip.bottom || box.right <= clip.left || box.left >= clip.right) {
        return { ...inside, fixed: null };
    }

    // Out of the box: only the viewport decides now.
    const free = asPlaced(panel, () => measureFit(anchor, panel, preferred, options));
    const origin = fixedOrigin(panel);
    return {
        ...free,
        fixed: { left: free.left - origin.left, top: free.top - origin.top, width: free.width },
    };
}

/**
 * Calls `update` when the viewport changes size or anything outside `panel`
 * scrolls, at most once a frame. Returns the function that stops it.
 */
export function watchViewport(update: () => void, panel?: Element | null): () => void {
    if (typeof window === "undefined") return () => {};
    let frame = 0;
    const schedule = (event?: Event) => {
        // The panel scrolling its own content moves nothing it is placed against.
        if (panel && event?.type === "scroll" && event.target instanceof Node && panel.contains(event.target)) {
            return;
        }
        if (frame) return;
        frame = requestAnimationFrame(() => {
            frame = 0;
            update();
        });
    };
    window.addEventListener("resize", schedule);
    // Capture: a scroll inside any ancestor moves the anchor too, and scroll does not bubble.
    window.addEventListener("scroll", schedule, true);
    return () => {
        if (frame) cancelAnimationFrame(frame);
        window.removeEventListener("resize", schedule);
        window.removeEventListener("scroll", schedule, true);
    };
}
