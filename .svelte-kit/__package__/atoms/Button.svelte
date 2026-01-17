<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ButtonVariant, SizeVariant } from "../../types/variants.js";

    interface Props {
        variant?: ButtonVariant;
        size?: SizeVariant;
        disabled?: boolean;
        type?: "button" | "submit" | "reset";
        text?: string;
        isFullWidth?: boolean;
        onclick?: (event: MouseEvent) => void;
        children?: Snippet;
    }

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        type = "button",
        text = "",
        isFullWidth = false,
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
            ? "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            : variant === "secondary"
              ? "bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              : variant === "danger"
                ? "bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                : variant === "ghost"
                  ? "bg-transparent text-headline hover:bg-base-100 active:bg-base-200 focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:text-disabled"
                  : variant === "outline"
                    ? "bg-transparent border-2 border-action-primary text-headline hover:bg-action-secondary hover:text-action-primary active:bg-action-primary-active active:text-action-primary focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:border-disabled disabled:text-disabled"
                    : variant === "link"
                      ? "text-brand-700 active:text-brand-700 underline-offset-4 hover:underline focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:text-disabled disabled:no-underline"
                      : "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2";
    });

    const buttonClasses = $derived(() => {
        const sizeStyles = sizeClass();
        const flexClass = isFullWidth ? "flex" : "inline-flex";
        const widthClass = isFullWidth ? "w-full" : "";
        const baseClasses = `${flexClass} items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none`;

        return `${baseClasses} ${widthClass} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.font} ${sizeStyles.leading} ${sizeStyles.tracking} ${sizeStyles.radius} ${sizeStyles.gap} ${variantClass()}`.trim();
    });
</script>

<button {type} class={buttonClasses()} {disabled} {onclick} {...restProps}>
    {#if text}
        {text}
    {:else if children}
        {@render children()}
    {/if}
</button>
