<!--
    Badge Component - SSR-safe and robust
    
    A simple badge component with proper SSR handling and defensive programming
    to prevent DOM access errors during hydration and rapid state changes.
-->
<script lang="ts">
    import { Check, AlertTriangle, X, Info } from "@lucide/svelte";
    // Props using Svelte 5 runes
    let {
        variant = "default",
        size = "md",
        text = "",
        showIcon = true,
    }: {
        variant?: "default" | "success" | "warning" | "error" | "info";
        size?: "sm" | "md" | "lg";
        text: string;
        showIcon?: boolean;
    } = $props();

    // Class computation using conditional logic with full class names
    const classes = $derived(() => {
        const baseClasses =
            "inline-flex items-center font-medium border rounded-md";

        // Size classes - using full class names
        const sizeClass =
            size === "sm"
                ? "px-2 py-0.5 text-xs"
                : size === "lg"
                  ? "px-4 py-2 text-base"
                  : "px-3 py-1 text-sm"; // default md

        // Variant classes - using semantic color system
        const variantClass =
            variant === "success"
                ? "bg-surface-level-1 border-secondary text-success"
                : variant === "warning"
                  ? "bg-surface-level-1 border-secondary text-warning"
                  : variant === "error"
                    ? "bg-surface-level-1 border-secondary text-error"
                    : variant === "info"
                      ? "bg-surface-level-1 border-secondary text-body"
                      : "bg-surface-level-1 border-secondary text-body"; // default

        return `${baseClasses} ${sizeClass} ${variantClass}`.trim();
    });

    // Icon size based on badge size
    const iconSize = $derived(() => {
        return size === "sm" ? 12 : size === "lg" ? 20 : 16; // default md
    });

    // Icon spacing class
    const iconSpacingClass = $derived(() => {
        return size === "sm" ? "mr-1" : size === "lg" ? "mr-2" : "mr-1.5"; // default md
    });
</script>

<span class={classes()}>
    {#if showIcon}
        {#if variant === "success"}
            <Check size={iconSize()} class={iconSpacingClass()} />
        {:else if variant === "warning"}
            <AlertTriangle size={iconSize()} class={iconSpacingClass()} />
        {:else if variant === "error"}
            <X size={iconSize()} class={iconSpacingClass()} />
        {:else if variant === "info"}
            <Info size={iconSize()} class={iconSpacingClass()} />
        {:else}
            <Info size={iconSize()} class={iconSpacingClass()} />
        {/if}
    {/if}
    {text}
</span>
