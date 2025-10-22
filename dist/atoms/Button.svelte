<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        variant?:
            | "primary"
            | "secondary"
            | "danger"
            | "success"
            | "ghost"
            | "brand";
        size?: "sm" | "md" | "lg";
        disabled?: boolean;
        type?: "button" | "submit" | "reset";
        text?: string;
        onclick?: (event: MouseEvent) => void;
        children?: Snippet;
    }

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        type = "button",
        text = "",
        onclick,
        children,
        ...restProps
    }: Props = $props();

    // Size classes using full class names
    const sizeClass = $derived(() => {
        return size === "sm"
            ? "px-3 py-1.5 text-sm font-medium"
            : size === "lg"
              ? "px-6 py-3 text-base font-semibold"
              : "px-4 py-2 text-sm font-medium"; // default md
    });

    // Variant classes using full class names in conditionals
    const variantClass = $derived(() => {
        return variant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
            : variant === "secondary"
              ? "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400"
              : variant === "danger"
                ? "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400"
                : variant === "success"
                  ? "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400"
                  : variant === "ghost"
                    ? "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400"
                    : variant === "brand"
                      ? "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
                      : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"; // default primary
    });

    // Button classes using Badge pattern
    const buttonClasses = $derived(() => {
        const baseClasses =
            "inline-flex items-center justify-center rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 transform-gpu shadow-sm hover:shadow-md";

        return `${baseClasses} ${sizeClass()} ${variantClass()}`.trim();
    });
</script>

<button {type} class={buttonClasses()} {disabled} {onclick} {...restProps}>
    {#if text}
        {text}
    {:else if children}
        {@render children()}
    {/if}
</button>
