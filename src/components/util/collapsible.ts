/** Types and pure helpers for `Collapsible` and `CollapsibleGroup`. Kept out of the components so they can be tested without a DOM. */

/** Heading element the default trigger is wrapped in. */
export type CollapsibleHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * First argument of the `trigger` snippet. Spread it on your own `<button>`:
 * it carries the whole wiring, so the button needs nothing else to work.
 */
export type CollapsibleTriggerProps = {
    id: string;
    /** Keeps a trigger inside a `<form>` from submitting it. */
    type: "button";
    "aria-expanded": boolean;
    "aria-controls": string;
    disabled: boolean;
    onclick: (event: MouseEvent) => void;
    /** How a `CollapsibleGroup` finds its header buttons for the arrow keys. */
    "data-collapsible-trigger": "";
};

/** Second argument of the `trigger` snippet. */
export interface CollapsibleTriggerState {
    open: boolean;
    disabled: boolean;
}

/** What a `Collapsible` hands its group. */
export interface CollapsibleGroupMember {
    triggerId: string;
    isOpen: () => boolean;
    /** A disabled member keeps its state: the group neither closes it nor counts it. */
    isDisabled: () => boolean;
    close: () => void;
}

/** What a member gets back when it joins a group. */
export interface CollapsibleGroupRegistration {
    /** Removes the member again. */
    unregister: () => void;
    /**
     * True when the member asked to start open in a single-open group that
     * already has an open panel. The member then renders closed from the
     * start, on the server too, instead of opening and being closed again.
     */
    startClosed: boolean;
}

/** What a `CollapsibleGroup` offers the Collapsibles inside it, through context. */
export interface CollapsibleGroupContext {
    /** False when opening one panel closes the others. */
    readonly multiple: boolean;
    register: (member: CollapsibleGroupMember) => CollapsibleGroupRegistration;
    /** Called whenever a member is open, however it got there. */
    opened: (member: CollapsibleGroupMember) => void;
}

/** Context key shared by the two components. */
export const COLLAPSIBLE_GROUP = Symbol("zabi-collapsible-group");

/**
 * Index of the header button an accordion key moves focus to, or `null` when
 * the key is not one of them. Arrow keys wrap, as they do in Tabs and Dropdown.
 */
export function nextTriggerIndex(
    key: string,
    current: number,
    count: number,
): number | null {
    if (count === 0) return null;
    switch (key) {
        case "ArrowDown":
            return (current + 1) % count;
        case "ArrowUp":
            return (current - 1 + count) % count;
        case "Home":
            return 0;
        case "End":
            return count - 1;
        default:
            return null;
    }
}
