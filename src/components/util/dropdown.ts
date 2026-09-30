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

/** What a Dropdown tells the items inside it. */
export interface DropdownContext {
    /** `option` inside a listbox, `menuitem` inside a menu. */
    readonly itemRole: "menuitem" | "option";
}

export const DROPDOWN_CONTEXT_KEY = Symbol("dropdown");
