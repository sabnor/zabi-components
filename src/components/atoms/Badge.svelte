<!--
    Badge Component - SSR-safe and robust
    
    A simple badge component with proper SSR handling and defensive programming
    to prevent DOM access errors during hydration and rapid state changes.
-->
<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount } from "svelte";

    // Props using Svelte 5 runes
    let {
        variant = "default",
        className = "",
        text = "",
        children,
    }: {
        variant?: "default" | "success" | "warning" | "error" | "info";
        className?: string;
        text?: string;
        children?: Snippet;
    } = $props();

    // Track mounting state for SSR safety
    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    });

    // Variant classes mapping
    const variantClasses = {
        success: "bg-green-100 text-green-800 border-green-300",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
        error: "bg-red-100 text-red-800 border-red-300",
        info: "bg-blue-100 text-blue-800 border-blue-300",
        default: "bg-gray-100 text-gray-800 border-gray-300",
    };

    // Safe class computation
    const classes = $derived(() => {
        const baseClasses =
            "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md";
        const variantClass = variantClasses[variant] || variantClasses.default;

        return [baseClasses, variantClass, className].filter(Boolean).join(" ");
    });

    // Safe text content
    const displayText = $derived(() => text || "");
</script>

{#if mounted}
    <span class={classes}>
        {#if children}
            {@render children()}
        {:else if displayText}
            {displayText}
        {/if}
    </span>
{:else}
    <!-- SSR fallback -->
    <span
        class="inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md bg-gray-100 text-gray-800 border-gray-300"
    >
        {#if children}
            {@render children()}
        {:else if displayText}
            {displayText}
        {/if}
    </span>
{/if}
