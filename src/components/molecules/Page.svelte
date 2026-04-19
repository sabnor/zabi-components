<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children?: Snippet;
        className?: string;
    }

    let { children, className = "" }: Props = $props();
</script>

<div class="mx-auto w-full space-y-10 {className}">
    {#if children}
        {@render children()}
    {/if}
</div>
