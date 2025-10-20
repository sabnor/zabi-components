<script lang="ts">
    import type { Snippet } from "svelte";

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

    // Simple class computation
    const classes = $derived(
        [
            "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md",
            variant === "success"
                ? "bg-green-100 text-green-800 border-green-300"
                : variant === "warning"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                  : variant === "error"
                    ? "bg-red-100 text-red-800 border-red-300"
                    : variant === "info"
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-gray-100 text-gray-800 border-gray-300",
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<span class={classes}>
    {#if children}
        {@render children()}
    {:else if text}
        {text}
    {/if}
</span>
