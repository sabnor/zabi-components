<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        className?: string;
        children?: Snippet;
    }

    let {
        className = "",
        children,
        ...restProps
    }: Props = $props();
</script>

<p
    class="text-sm text-description {className}"
    {...restProps}
>
    {#if children}
        {@render children()}
    {/if}
</p>

