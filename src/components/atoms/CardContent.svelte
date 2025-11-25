<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        image?: string;
        imageAlt?: string;
        className?: string;
        children?: Snippet;
    }

    let {
        image = "",
        imageAlt = "",
        className = "",
        children,
        ...restProps
    }: Props = $props();
</script>

<div class="p-6 pt-0 {className}" {...restProps}>
    {#if image}
        <img
            src={image}
            alt={imageAlt}
            class="w-full h-48 object-cover rounded-lg mb-4"
        />
    {/if}
    {#if children}
        {@render children()}
    {/if}
</div>
