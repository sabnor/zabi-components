<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import type { ButtonVariant, SizeVariant } from "../types/variants.js";

    type Props = Omit<HTMLButtonAttributes, "class"> & {
        variant?: ButtonVariant;
        size?: SizeVariant;
        loading?: boolean;
        /** Required for icon-only usage (no visible text). */
        label?: string;
        class?: string;
        children?: Snippet;
    };

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        loading = false,
        type = "button",
        label = "",
        class: className = "",
        onclick,
        children,
        ...restProps
    }: Props = $props();

    const isDisabled = $derived(disabled || loading);

    const sizeClass = $derived.by(() => {
        if (size === "sm") {
            return {
                padding: "p-2",
                radius: "rounded-md",
                spinner: "size-4",
            };
        } else if (size === "lg") {
            return {
                padding: "p-3",
                radius: "rounded-xl",
                spinner: "size-6",
            };
        } else {
            return {
                padding: "p-2.5",
                radius: "rounded-lg",
                spinner: "size-5",
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
                    ? "bg-transparent border-2 border-action-primary text-headline hover:bg-action-secondary hover:text-action-primary active:bg-action-primary-active active:text-action-primary active:scale-[0.98] disabled:border-disabled disabled:text-disabled"
                    : variant === "link"
                      ? "text-brand-700 active:text-brand-700 hover:underline disabled:text-disabled disabled:no-underline"
                      : "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98]";
    });

    const buttonClasses = $derived.by(() => {
        const sizeStyles = sizeClass;
        const baseClasses =
            "inline-flex focus-ring items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

        return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.radius} ${variantClass} ${className}`.trim();
    });
</script>

<button
    {type}
    class={buttonClasses}
    disabled={isDisabled}
    aria-busy={loading ? "true" : undefined}
    {onclick}
    aria-label={label || undefined}
    {...restProps}
>
    {#if loading}
        <span
            class="inline-block {sizeClass.spinner} shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80"
            aria-hidden="true"
        ></span>
    {:else if children}
        {@render children()}
    {/if}
</button>
