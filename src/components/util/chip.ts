/**
 * Chip and ChipGroup: what they share, and the arithmetic of the one-row
 * layout.
 *
 * The scroll logic is pure, so it can be tested with made-up metrics: jsdom
 * has no layout. The component reads the real ones and passes them in.
 */

export type ChipGroupType = "radio" | "checkbox";
export type ChipGroupLayout = "wrap" | "row";
export type ChipGroupEdge = "fade" | "none";

/** What a ChipGroup hands to the chips (and groups) inside it. */
export interface ChipGroupContext {
    /** Without a type the group is layout only. */
    readonly type: ChipGroupType | undefined;
    readonly name: string | undefined;
    readonly layout: ChipGroupLayout;
    readonly disabled: boolean;
    /** Whether the chip with this value is selected, by the group's `value`. */
    isSelected(value: string): boolean;
    /**
     * The chip with this value was checked or unchecked. `report` is true for
     * a person's change (the group's `onchange` hears it) and false for one
     * taken in by a binding on hydration, which is reported once afterwards.
     */
    change(value: string, checked: boolean, report: boolean): void;
    /** The value a radio group holds, for `bind:group`. */
    readonly radioValue: string | undefined;
    /** A form reset emptied a radio group. */
    restore(): void;
}

export const CHIP_GROUP_CONTEXT_KEY = Symbol("zabi-chip-group");

/** The gap between chips, and the margin that keeps a revealed chip off the edge. */
export const CHIP_GAP = 8;

/** The next value of a checkbox group when `value` is checked or unchecked. Order is kept. */
export function toggleValue(current: readonly string[] | undefined, value: string, checked: boolean): string[] {
    const list = current ?? [];
    const has = list.includes(value);
    if (checked) return has ? [...list] : [...list, value];
    return has ? list.filter((item) => item !== value) : [...list];
}

export interface RowMetrics {
    /** `scrollLeft`: 0 at the start, negative towards the end in a right-to-left row. */
    scrollLeft: number;
    scrollWidth: number;
    clientWidth: number;
    rtl: boolean;
}

export interface RowOverflow {
    /** More chips are hidden before the first visible one. */
    start: boolean;
    /** More chips are hidden after the last visible one. */
    end: boolean;
}

/** Fractional scroll positions: less than this from an edge counts as at it. */
const TOLERANCE = 1;

/** Which sides of the row have chips out of view. Start and end follow the direction. */
export function measureRowOverflow(metrics: RowMetrics): RowOverflow {
    const hidden = metrics.scrollWidth - metrics.clientWidth;
    if (hidden <= TOLERANCE) return { start: false, end: false };
    // The distance from the start edge: `scrollLeft` itself, or its negative in a
    // right-to-left row. The wrong sign is rubber-banding, and counts as none.
    const fromStart = Math.min(Math.max(0, metrics.rtl ? -metrics.scrollLeft : metrics.scrollLeft), hidden);
    return { start: fromStart > TOLERANCE, end: fromStart < hidden - TOLERANCE };
}

export interface Span {
    left: number;
    right: number;
}

/**
 * The `scrollLeft` that brings `item` fully into `box` with `margin` to spare,
 * or the current one if it is in view already. Both spans are in the same
 * coordinates (the viewport's). The result stays inside what the row can
 * scroll. An item wider than the box is lined up with its start edge.
 */
export function scrollLeftToReveal(
    metrics: RowMetrics,
    box: Span,
    item: Span,
    margin: number = CHIP_GAP,
): number {
    const hidden = Math.max(0, metrics.scrollWidth - metrics.clientWidth);
    let delta = 0;
    const tooWide = item.right - item.left > box.right - box.left - margin * 2;
    if (tooWide) {
        delta = metrics.rtl ? item.right - box.right + margin : item.left - box.left - margin;
    } else if (item.left < box.left + margin) {
        delta = item.left - box.left - margin;
    } else if (item.right > box.right - margin) {
        delta = item.right - box.right + margin;
    }
    const next = metrics.scrollLeft + delta;
    return metrics.rtl ? Math.min(0, Math.max(-hidden, next)) : Math.min(hidden, Math.max(0, next));
}

/** The first chosen chip in a row: a link, a toggle button or a checked input. */
export const SELECTED_CHIP_SELECTOR = '[aria-current]:not([aria-current="false"]), [aria-pressed="true"], input:checked';

/** The element to bring into view for a selected chip: the label around an input, else the element. */
export function chipBox(selected: Element): Element {
    return selected instanceof HTMLInputElement ? (selected.closest("label") ?? selected) : selected;
}
