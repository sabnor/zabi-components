<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ButtonVariant, SizeVariant } from "../../types/variants.js";

    interface Props {
        /** Visual style variant. */
        variant?: ButtonVariant;
        /** Size variant controlling padding and radius. */
        size?: SizeVariant;
        /** Whether the button is disabled. */
        disabled?: boolean;
        /** Button type attribute. */
        type?: "button" | "submit" | "reset";
        /** Accessible label for icon-only buttons. */
        label?: string;
        /** Click handler for native click events. */
        onclick?: (event: MouseEvent) => void;
        /** Icon content. */
        children?: Snippet;
    }

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        type = "button",
        label = "",
        onclick,
        children,
        ...restProps
    }: Props = $props();

    const sizeClass = $derived(() => {
        if (size === "sm") {
            return {
                padding: "p-2",
                radius: "rounded-md",
            };
        } else if (size === "lg") {
            return {
                padding: "p-3",
                radius: "rounded-xl",
            };
        } else {
            return {
                padding: "p-2.5",
                radius: "rounded-lg",
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
        const baseClasses =
            "inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none";

        return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.radius} ${variantClass()}`.trim();
    });
</script>

<button
    {type}
    class={buttonClasses()}
    {disabled}
    {onclick}
    aria-label={label || undefined}
    {...restProps}
>
    {#if children}
        {@render children()}
    {/if}
</button>
