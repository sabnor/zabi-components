<script lang="ts">
    import type { Snippet } from "svelte";
    import { cn } from "../util/cn.js";

    interface Props {
        children?: Snippet;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
    }

    let { children, class: classAttr = "", className: legacyClass = "" }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));
</script>

<div class={cn("mx-auto w-full space-y-10", className)}>
    {#if children}
        {@render children()}
    {/if}
</div>
