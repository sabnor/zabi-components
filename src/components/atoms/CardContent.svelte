<script lang="ts">
    import type { Snippet } from "svelte";
    import { cn } from "../util/cn.js";

    interface Props {
        image?: string;
        imageAlt?: string;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        children?: Snippet;
    }

    let {
        image = "",
        imageAlt = "",
        class: classAttr = "",
        className: legacyClass = "",
        children,
        ...restProps
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));
</script>

<div class={className} {...restProps}>
    {#if image}
        <img
            src={image}
            alt={imageAlt}
            class="w-full h-48 object-cover rounded-control mb-4"
        />
    {/if}
    {#if children}
        {@render children()}
    {/if}
</div>
