<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
    }

    let { children, class: classAttr = "", className: legacyClass = "" }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias. */
    const className = $derived(`${classAttr} ${legacyClass}`.trim());
</script>

<div class="mx-auto w-full space-y-10 {className}">
    {#if children}
        {@render children()}
    {/if}
</div>
