/** Types and pure helpers for `SortableList`. Kept out of the component so they can be tested without a DOM. */

import type { Snippet } from "svelte";

/** Payload of `onreorder`: which item moved, and between which zero-based indexes. */
export interface SortableListReorderDetail<T> {
    item: T;
    from: number;
    to: number;
    /** The list in its new order (the same array `bind:items` receives). */
    items: T[];
}

/** What a live-region message is built from. `position` is one-based. */
export interface SortableListAnnouncement {
    label: string;
    position: number;
    total: number;
}

/** Second argument of the `item` snippet. */
export interface SortableListRow {
    /** Zero-based index in the current order. */
    index: number;
    /** True while this row is being dragged with a pointer. */
    dragging: boolean;
    /** True when the list or this item is disabled. */
    disabled: boolean;
    /** The drag handle. Render it yourself when `controls="manual"`. */
    handle: Snippet;
    /** The move up / move down buttons. Render them yourself when `controls="manual"`. */
    moveButtons: Snippet;
}

/** Every built-in string. Pass a partial object to `strings` to translate. */
export interface SortableListStrings {
    /** Accessible name of the drag handle. */
    handleLabel: (label: string) => string;
    /** How to use the handle; referenced by every handle through `aria-describedby`. */
    handleDescription: string;
    moveUp: (label: string) => string;
    moveDown: (label: string) => string;
    /** Announced after every move. */
    moved: (detail: SortableListAnnouncement) => string;
    /** Announced when Escape (or a cancelled pointer) abandons a drag. */
    cancelled: (detail: SortableListAnnouncement) => string;
    /** Announced when Arrow Up or Home is pressed on the first item. */
    atStart: (detail: SortableListAnnouncement) => string;
    /** Announced when Arrow Down or End is pressed on the last item. */
    atEnd: (detail: SortableListAnnouncement) => string;
}

export const SORTABLE_LIST_STRINGS: SortableListStrings = {
    handleLabel: (label) => `Reorder ${label}`,
    // Kept short: a screen reader reads it after the name each time the
    // handle takes focus, and a move down can hand focus back to the handle.
    handleDescription:
        "Arrow keys move this item. Home and End move it to the start or the end.",
    moveUp: (label) => `Move ${label} up`,
    moveDown: (label) => `Move ${label} down`,
    moved: ({ label, position, total }) =>
        `${label}, moved to position ${position} of ${total}`,
    cancelled: ({ label, position, total }) =>
        `${label}, move cancelled, still at position ${position} of ${total}`,
    atStart: ({ label }) => `${label}, already first`,
    atEnd: ({ label }) => `${label}, already last`,
};

/** A copy of `items` with the entry at `from` moved to `to`. Out-of-range indexes are clamped. */
export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
    const next = [...items];
    if (from < 0 || from >= next.length) return next;
    const target = Math.max(0, Math.min(next.length - 1, to));
    const [moved] = next.splice(from, 1);
    next.splice(target, 0, moved);
    return next;
}

/** Top edge and height of a row, measured once when a drag starts. */
export interface SortableSlot {
    top: number;
    height: number;
}

/**
 * Index the dragged row would land on, given how far it has travelled.
 *
 * A row below counts as passed once the dragged row's bottom edge crosses its
 * centre, and a row above once the top edge does. Both are read from the
 * positions measured at drag start, so the answer depends on the pointer
 * alone: rows sliding out of the way cannot feed back into it and make the
 * target flicker, which is what happens when the live positions are compared.
 */
export function dropIndex(
    slots: readonly SortableSlot[],
    from: number,
    offset: number,
): number {
    const dragged = slots[from];
    if (!dragged) return from;
    const top = dragged.top + offset;
    const bottom = top + dragged.height;
    let to = from;
    for (let i = from + 1; i < slots.length; i += 1) {
        if (bottom > slots[i].top + slots[i].height / 2) to = i;
        else break;
    }
    for (let i = from - 1; i >= 0; i -= 1) {
        if (top < slots[i].top + slots[i].height / 2) to = i;
        else break;
    }
    return to;
}
