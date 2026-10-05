/**
 * Keeps a popup panel inside the viewport.
 *
 * Dropdown and NavigationMenuContent position their panel with CSS against the
 * element that opens it. That is right until the opener is near an edge: a
 * 200px panel under a button 60px from the right edge hangs 140px out of the
 * screen and widens the document. `fitPanel` is the arithmetic that decides
 * where the panel goes instead; `watchViewport` re-runs it while the panel is
 * open. The arithmetic is pure, so it can be tested without a layout.
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
}

export interface PanelFit {
    block: PanelBlock;
    inline: PanelInline;
    /**
     * Distance to put between the anchor's `inline` edge and the panel's, for
     * `inset-inline-start` or `inset-inline-end`. 0 when the panel fits as it
     * is; otherwise what slides it back inside the viewport.
     */
    inlineOffset: number;
    /** A limit to set, or null when the panel fits without one. */
    maxWidth: number | null;
    maxHeight: number | null;
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
    } = input;

    // Width first: a panel wider than the screen is narrowed, whichever side it is on.
    const widest = Math.max(0, viewport.width - margin * 2);
    const width = Math.min(panel.width, widest);
    const maxWidth = panel.width > widest ? widest : null;

    // `start` grows from the anchor's left edge (its right one when right-to-left).
    const growsRight = (side: PanelInline) => (side === "start") !== rtl;
    const leftFor = (side: PanelInline) =>
        growsRight(side) ? anchor.left : anchor.right - width;
    const fitsInline = (side: PanelInline) => {
        const left = leftFor(side);
        return left >= margin && left + width <= viewport.width - margin;
    };
    const other: PanelInline = input.inline === "start" ? "end" : "start";
    const inline =
        !flipInline || fitsInline(input.inline) || !fitsInline(other) ? input.inline : other;

    // Neither side fits: stay on the side asked for and slide back inside.
    const left = leftFor(inline);
    const clamped = Math.min(Math.max(left, margin), viewport.width - margin - width);
    const inlineOffset = growsRight(inline) ? clamped - left : left - clamped;

    const roomBelow = viewport.height - anchor.bottom - gap - margin;
    const roomAbove = anchor.top - gap - margin;
    const room = (side: PanelBlock) => (side === "bottom" ? roomBelow : roomAbove);
    const opposite: PanelBlock = input.block === "bottom" ? "top" : "bottom";
    let block = input.block;
    if (flipBlock && panel.height > room(block)) {
        // The other side if the panel fits there, else whichever has more room.
        if (panel.height <= room(opposite) || room(opposite) > room(block)) block = opposite;
    }
    const maxHeight = panel.height > room(block) ? Math.max(0, room(block)) : null;

    return {
        block,
        inline,
        // -0 would print as "-0px".
        inlineOffset: inlineOffset === 0 ? 0 : inlineOffset,
        maxWidth,
        maxHeight,
    };
}

/** A fit that changes nothing: the panel where the CSS puts it, with no limits. */
export function unfitted(block: PanelBlock, inline: PanelInline): PanelFit {
    return { block, inline, inlineOffset: 0, maxWidth: null, maxHeight: null };
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
    options: {
        margin?: number;
        gap?: number;
        flipBlock?: boolean;
        flipInline?: boolean;
        /** Overrides the anchor's own direction; `false` for a panel placed with `left`, not `inset-inline-start`. */
        rtl?: boolean;
    } = {},
): PanelFit {
    const { maxWidth, maxHeight } = panel.style;
    // Without its limit the panel has nothing to scroll, and the browser
    // forgets how far it was scrolled: put that back as well.
    const { scrollTop, scrollLeft } = panel;
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
    panel.scrollTop = scrollTop;
    panel.scrollLeft = scrollLeft;

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
