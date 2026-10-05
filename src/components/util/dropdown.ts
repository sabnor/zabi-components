import type { Component } from "svelte";

/** An icon component, as `@lucide/svelte` icons are. */
export type DropdownItemIcon = Component<{ size?: number; class?: string }>;

export type DropdownItemTone = "default" | "danger";

/** One entry of Dropdown's `options`. */
export interface DropdownOption {
    value: string | number;
    label: string;
    /**
     * A disabled item stays focusable, so the arrow keys still reach it and a
     * screen reader can read why it is unavailable; it cannot be chosen.
     */
    disabled?: boolean;
    /** Rendered before the label, at 16px. Decorative: the label names the item. */
    icon?: DropdownItemIcon;
    /** `danger` for a destructive action such as Delete. */
    tone?: DropdownItemTone;
    /** Second line under the label, e.g. why the item is disabled. */
    description?: string;
}

/**
 * How a Dropdown's menu is shown: `popover` under its trigger, `sheet` in a
 * BottomSheet, or `auto`: a sheet on a phone, the pop-over everywhere else.
 */
export type DropdownPresentation = "auto" | "popover" | "sheet";

/**
 * A phone, for `auto`: a touch screen (`pointer: coarse`) narrower than the
 * `sm` breakpoint. A tablet has the room for a pop-over under its trigger,
 * and a narrow window with a mouse has the precision for one.
 */
export const SHEET_MEDIA_QUERY = "(pointer: coarse) and (max-width: 639.98px)";

/**
 * Whether a menu asked for as `presentation` opens in a sheet right now.
 * Read when the menu opens, in the browser: on the server it is never a sheet,
 * so what is rendered before anyone touches the control is the same everywhere.
 */
export function opensAsSheet(presentation: DropdownPresentation): boolean {
    if (presentation === "sheet") return true;
    if (presentation !== "auto") return false;
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia(SHEET_MEDIA_QUERY).matches
    );
}

/** What a Dropdown tells the items inside it. */
export interface DropdownContext {
    /** `option` inside a listbox, `menuitem` inside a menu. */
    readonly itemRole: "menuitem" | "option";
}

export const DROPDOWN_CONTEXT_KEY = Symbol("dropdown");
