<!-- SSR-safe wrapper component for zabi-components -->
<script lang="ts">
    import { onMount } from "svelte";

    export let fallback: any = null;
    export let component: any;
    export let props: Record<string, any> = {};

    let mounted = false;

    onMount(() => {
        mounted = true;
    });

    // Check if we're in browser environment
    $: isBrowser =
        typeof window !== "undefined" && typeof document !== "undefined";
</script>

{#if isBrowser && mounted}
    <svelte:component this={component} {...props}>
        <slot />
    </svelte:component>
{:else if fallback}
    <svelte:component this={fallback} {...props}>
        <slot />
    </svelte:component>
{:else}
    <!-- Fallback content for SSR -->
    <div class="zabi-ssr-fallback">
        <slot />
    </div>
{/if}

<style>
    .zabi-ssr-fallback {
        /* Minimal styling for SSR fallback */
        display: contents;
    }
</style>
