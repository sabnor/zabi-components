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
                ? "bg-green-100 border-green-300 text-success"
                : variant === "warning"
                  ? "bg-yellow-100 border-yellow-300 text-warning"
                  : variant === "error"
                    ? "bg-red-100 border-red-300 text-error"
                    : variant === "info"
                      ? "bg-blue-100 border-blue-300 text-body"
                      : "bg-gray-100 border-gray-300 text-body"; // default

        return `${baseClasses} ${sizeClass} ${variantClass}`.trim();
    });
</script>

<span class={classes()}>
    {text}
</span>
