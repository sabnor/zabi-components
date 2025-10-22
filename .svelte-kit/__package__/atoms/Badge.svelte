<!--
    Badge Component - SSR-safe and robust
    
    A simple badge component with proper SSR handling and defensive programming
    to prevent DOM access errors during hydration and rapid state changes.
-->
<script lang="ts">
    // Props using Svelte 5 runes
    let {
        variant = "default",
        size = "md",
        text = "",
    }: {
        variant?: "default" | "success" | "warning" | "error" | "info";
        size?: "sm" | "md" | "lg";
        text: string;
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

        // Variant classes - using full class names
        const variantClass =
            variant === "success"
                ? "bg-green-100 text-green-800 border-green-300"
                : variant === "warning"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                  : variant === "error"
                    ? "bg-red-100 text-red-800 border-red-300"
                    : variant === "info"
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-gray-100 text-gray-800 border-gray-300"; // default

        return `${baseClasses} ${sizeClass} ${variantClass}`.trim();
    });
</script>

<span class={classes()}>
    {text}
</span>
