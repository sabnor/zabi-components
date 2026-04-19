<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import type { ButtonVariant, SizeVariant } from "../types/variants.js";

    type Props = Omit<HTMLButtonAttributes, "class"> & {
        variant?: ButtonVariant;
        size?: SizeVariant;
        loading?: boolean;
        text?: string;
        isFullWidth?: boolean;
        class?: string;
        children?: Snippet;
    };

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        loading = false,
        type = "button",
        text = "",
        isFullWidth = false,
        class: className = "",
        onclick,
        children,
        ...restProps
    }: Props = $props();

    const isDisabled = $derived(disabled || loading);

    const sizeClass = $derived.by(() => {
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

    const variantClass = $derived.by(() => {
        return variant === "primary"
            ? "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98]"
            : variant === "secondary"
              ? "bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active active:scale-[0.98]"
              : variant === "danger"
                ? "bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active active:scale-[0.98] focus-ring--danger"
                : variant === "ghost"
                  ? "bg-transparent text-headline hover:bg-base-100 active:bg-base-200 active:scale-[0.98] focus-ring--muted disabled:text-disabled"
                    : variant === "outline"
                      ? "bg-transparent border border-border text-headline hover:bg-action-secondary hover:border-border-medium hover:text-action-primary active:bg-action-primary-active active:text-action-primary active:scale-[0.98] disabled:border-disabled disabled:text-disabled"
                    : variant === "link"
                      ? "text-brand-700 active:text-brand-700 underline-offset-4 hover:underline disabled:text-disabled disabled:no-underline"
                      : "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98]";
    });

    const buttonClasses = $derived.by(() => {
        const sizeStyles = sizeClass;
        const flexClass = isFullWidth ? "flex" : "inline-flex";
        const widthClass = isFullWidth ? "w-full" : "";
        const baseClasses = `${flexClass} focus-ring items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100`;

        return `${baseClasses} ${widthClass} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.font} ${sizeStyles.leading} ${sizeStyles.tracking} ${sizeStyles.radius} ${sizeStyles.gap} ${variantClass} ${className}`.trim();
    });
</script>

<button
    {type}
    class={buttonClasses}
    disabled={isDisabled}
    aria-busy={loading ? "true" : undefined}
    {onclick}
    {...restProps}
>
    {#if loading}
        <span
            class="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80"
            aria-hidden="true"
        ></span>
    {/if}
    {#if text}
        {text}
    {:else if children}
        {@render children()}
    {/if}
</button>
