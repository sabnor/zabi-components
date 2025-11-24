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

<footer
    class="flex items-center p-6 pt-0 {className}"
    {...restProps}
>
    {#if children}
        {@render children()}
    {/if}
</footer>

