import type { Component } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";

/** An icon component, as `@lucide/svelte` icons are. */
export type SegmentedControlIcon = Component<{ size?: number; class?: string }>;

/** One entry of SegmentedControl's `options`. */
export interface SegmentedControlOption {
    value: string;
    label: string;
    /** Rendered before the label. Decorative: the label names the segment. */
    icon?: SegmentedControlIcon;
    /** A disabled segment cannot be chosen, and the arrow keys skip it. */
    disabled?: boolean;
    /**
     * Attributes for this segment's radio input, the element that is checked
     * and that the label names: a `data-testid`, an `id`, an `aria-describedby`.
     * The ones the control needs (`type`, `name`, `form`, `value`, `checked`,
     * `disabled`, `tabindex`) are its own and win over these.
     */
    attrs?: SegmentedControlOptionAttrs;
}

/** What an option's `attrs` may set: an input's attributes, less the ones the control owns. */
export type SegmentedControlOptionAttrs = Omit<
    HTMLInputAttributes,
    "type" | "name" | "form" | "value" | "checked" | "disabled" | "tabindex" | "bind:group" | "bind:checked" | "bind:value" | "class" | "children"
>;
