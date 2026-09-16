<script lang="ts">
    import type { Snippet } from "svelte";
    import { cn } from "../util/cn.js";

    interface Props {
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        children?: Snippet;
    }

    let {
        class: classAttr = "",
        className: legacyClass = "",
        children,
        ...restProps
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));
</script>

<footer
    class={cn("flex items-center p-6 pt-0", className)}
    {...restProps}
>
    {#if children}
        {@render children()}
    {/if}
</footer>

