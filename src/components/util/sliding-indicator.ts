/**
 * Measuring for the sliding indicator of Tabs and SegmentedControl. The
 * component paints its selected item itself until a box has been measured, so
 * a server render, a page that has not hydrated and an engine that cannot
 * measure all keep the static look.
 */

export interface IndicatorBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * The `item`'s box in the coordinates an absolutely positioned child of
 * `container` uses: from the container's padding box, plus what the container
 * has scrolled (so an indicator inside a scrolling list stays on its item).
 * Measured as physical boxes, so a right-to-left layout needs nothing extra.
 * Null where nothing can be measured (no layout, or the item is not shown).
 */
export function measureIndicator(container: HTMLElement, item: HTMLElement): IndicatorBox | null {
    const outer = container.getBoundingClientRect();
    const inner = item.getBoundingClientRect();
    if (inner.width === 0 && inner.height === 0) return null;
    return {
        x: inner.left - outer.left - container.clientLeft + container.scrollLeft,
        y: inner.top - outer.top - container.clientTop + container.scrollTop,
        width: inner.width,
        height: inner.height,
    };
}

/**
 * The box for the indicator now: the one measured, or, while the container
 * has no layout at all (a `hidden` ancestor, as a screen kept for coming
 * back to is), the `last` one, so the indicator is not dropped and put back
 * each time. Null when nothing has been measured or the item is not shown.
 */
export function nextIndicator(container: HTMLElement, item: HTMLElement, last: IndicatorBox | null): IndicatorBox | null {
    const box = measureIndicator(container, item);
    if (box || !last) return box;
    const outer = container.getBoundingClientRect();
    return outer.width === 0 && outer.height === 0 ? last : null;
}

/** Calls `onChange` when any of the `targets` changes size; a no-op without ResizeObserver. */
export function observeSizes(targets: Array<Element | null | undefined>, onChange: () => void): () => void {
    if (typeof ResizeObserver === "undefined") return () => {};
    const observer = new ResizeObserver(onChange);
    for (const target of targets) if (target) observer.observe(target);
    return () => observer.disconnect();
}

/** Runs `callback` after the next frame; the timer stands in where there are no frames. */
export function afterFrame(callback: () => void): () => void {
    if (typeof requestAnimationFrame === "function") {
        const id = requestAnimationFrame(callback);
        return () => cancelAnimationFrame(id);
    }
    const id = setTimeout(callback, 16);
    return () => clearTimeout(id);
}
