import type { Component } from "svelte";

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
}
