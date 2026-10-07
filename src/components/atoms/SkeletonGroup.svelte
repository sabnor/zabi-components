<script lang="ts">
    import type { Snippet } from "svelte";

    import { cn } from "../util/cn.js";
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { DEFAULT_SKELETON_STRINGS, provideSkeletonGroup, type SkeletonStrings } from "../util/skeleton.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";

    /**
     * One loading status for a set of `Skeleton` pieces. The group is the
     * `role="status"` region with the label; every `Skeleton` inside it is
     * hidden from assistive tech, so a screen's eight pieces are announced
     * once, not eight times.
     */
    interface Props {
        /** The status label. Defaults to the provider's `skeleton.label`, then "Loading…". */
        "aria-label"?: string;
        /** Overrides for the built-in strings. */
        strings?: Partial<SkeletonStrings>;
        class?: string;
        children?: Snippet;
    }

    let { "aria-label": ariaLabel, strings, class: className = "", children }: Props = $props();

    provideSkeletonGroup();

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("skeleton");
    const text = $derived(mergeStrings(DEFAULT_SKELETON_STRINGS, provided(), strings));
</script>

<div class={cn(className)} role="status" aria-busy="true" aria-label={ariaLabel ?? text.label}>
    {@render children?.()}
</div>
