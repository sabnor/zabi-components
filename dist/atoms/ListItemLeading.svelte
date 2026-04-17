<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        /**
         * Extra classes on the leading region (for example `rounded-full` when the
         * visual is circular).
         */
        class?: string;
        children?: Snippet;
    }

    let { class: className = "", children }: Props = $props();

    /** Default icon rounding; avatars pass `rounded-full` (no conflicting `rounded-md`). */
    const roundingClass = $derived(className.trim() ? className.trim() : "rounded-md");
</script>

<!--
  Fixed footprint using theme spacing tokens so rows stay aligned and any
  leading content (icon, avatar, custom SVG) centers in the same box.
-->
<span
    class="flex size-[length:var(--spacing-xl)] shrink-0 select-none items-center justify-center overflow-hidden text-description {roundingClass}"
>
    {@render children?.()}
</span>
