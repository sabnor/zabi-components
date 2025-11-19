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

    const sizeClass = $derived(() => {
        if (size === "sm") {
            return {
                padding: "px-4 py-2.5",
                text: "text-sm",
                font: "font-medium",
                leading: "leading-5",
                tracking: "tracking-[0.1px]",
                radius: "rounded-lg",
                gap: "gap-2",
            };
        } else if (size === "lg") {
            return {
                padding: "px-8 py-4",
                text: "text-lg",
                font: "font-normal",
                leading: "leading-8",
                tracking: "tracking-normal",
                radius: "rounded-xl",
                gap: "gap-3",
            };
        } else {
            return {
                padding: "px-5 py-3",
                text: "text-base",
                font: "font-medium",
                leading: "leading-6",
                tracking: "tracking-[0.15px]",
                radius: "rounded-lg",
                gap: "gap-2",
            };
        }
    });

    const variantClass = $derived(() => {
        return variant === "primary"
            ? "bg-action-primary text-inverse hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            : variant === "secondary"
              ? "bg-brand-100 text-brand-800 hover:bg-brand-200 active:bg-brand-300 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              : variant === "danger"
                ? "bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                : variant === "ghost"
                  ? "bg-transparent text-headline hover:bg-base-100 active:bg-base-200 focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:text-disabled"
                  : "bg-action-primary text-inverse hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2";
    });

    const buttonClasses = $derived(() => {
        const sizeStyles = sizeClass();
        const baseClasses =
            "inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none";

        return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.font} ${sizeStyles.leading} ${sizeStyles.tracking} ${sizeStyles.radius} ${sizeStyles.gap} ${variantClass()}`.trim();
    });
</script>

<button {type} class={buttonClasses()} {disabled} {onclick} {...restProps}>
    {#if text}
        {text}
    {:else if children}
        {@render children()}
    {/if}
</button>
