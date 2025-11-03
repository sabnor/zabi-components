<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        variant?: "primary" | "secondary" | "danger" | "ghost";
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

    // Variant classes using semantic action colors
    const variantClass = $derived(() => {
        return variant === "primary"
            ? "bg-action-primary text-inverse focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            : variant === "secondary"
              ? "border border-secondary text-description hover:border-secondary-hover focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
              : variant === "danger"
                ? "bg-action-danger text-inverse focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                : variant === "ghost"
                  ? "bg-transparent text-headline hover:bg-surface-hover active:bg-surface-active focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 disabled:text-disabled"
                  : "bg-action-primary text-inverse focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"; // default primary
    });

    // Button classes using Badge pattern
    const buttonClasses = $derived(() => {
        const baseClasses =
            "inline-flex items-center justify-center rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 transform-gpu";

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
