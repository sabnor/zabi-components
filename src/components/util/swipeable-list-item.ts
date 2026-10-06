import type { Component } from "svelte";

/** Public types and shared state for `SwipeableListItem`. */

/** One action behind a row, such as Delete. */
export interface SwipeableListItemAction {
    id: string;
    /** The button's text, and its accessible name. */
    label: string;
    /** Drawn above the label. */
    icon?: Component<{ size?: number; class?: string }>;
    /** `danger` for an action that destroys something. */
    tone?: "default" | "danger";
    /** Runs when the button is pressed. The row closes afterwards. */
    onselect: () => void;
}

/** The words a `SwipeableListItem` says by itself. */
export interface SwipeableListItemStrings {
    /** Accessible name of the button that opens the row's actions, and of the group they are in. */
    actions: string;
}

export const DEFAULT_SWIPEABLE_LIST_ITEM_STRINGS: SwipeableListItemStrings = {
    actions: "Actions",
};

/** What groups rows: the nearest list around a row. Rows with none are each on their own. */
const LIST = 'ul, ol, [role="list"], [role="listbox"]';

interface OpenRow {
    root: HTMLElement;
    close: () => void;
}

/** The rows that are open now. */
const openRows = new Set<OpenRow>();

/**
 * Says that a row has opened: every other open row in the same list closes.
 * Returns what to call when this row closes or goes away.
 */
export function registerOpenRow(root: HTMLElement, close: () => void): () => void {
    const list = root.closest(LIST);
    for (const other of [...openRows]) {
        if (other.root !== root && list && other.root.closest(LIST) === list) other.close();
    }
    const entry = { root, close };
    openRows.add(entry);
    return () => openRows.delete(entry);
}

/**
 * Where a swipe ends: open or closed. A flick decides by its direction,
 * whatever the distance; otherwise the row goes to whichever is nearer.
 * `revealed` and `width` are px of the actions; `velocity` is px per ms,
 * positive towards revealing.
 */
export function settleSwipe(revealed: number, width: number, velocity: number, flick: number): boolean {
    if (Math.abs(velocity) > flick) return velocity > 0;
    return revealed > width / 2;
}
