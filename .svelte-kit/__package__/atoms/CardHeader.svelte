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

<header
    class="flex flex-col space-y-1.5 p-6 {className}"
    {...restProps}
>
    {#if children}
        {@render children()}
    {/if}
</header>

