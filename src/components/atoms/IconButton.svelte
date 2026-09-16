<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import type { ButtonVariant, SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";

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

    /**
     * Square, on the same height scale as Button / Input / Select, so an icon
     * button sits flush in a toolbar beside a text button of the same size.
     * Previously these were 8–16px shorter than their own Button.
     */
    const sizeClass = $derived.by(() => {
        if (size === "sm") return { box: "size-8", spinner: "size-3.5" };
        if (size === "lg") return { box: "size-12", spinner: "size-5" };
        return { box: "size-10", spinner: "size-4" };
    });

    const disabledClass =
        "disabled:bg-action-disabled disabled:text-action-disabled-text disabled:border-transparent disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100";

    const variantClass = $derived.by(() => {
        switch (variant) {
            case "secondary":
                return "bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active active:scale-[0.98]";
            case "danger":
                return "bg-action-danger text-action-danger-text hover:bg-action-danger-hover active:bg-action-danger-active active:scale-[0.98] focus-ring--danger";
            case "ghost":
                return "bg-transparent text-headline hover:bg-surface-hover active:bg-surface-active active:scale-[0.98] focus-ring--muted";
            case "outline":
                return "bg-transparent border border-border text-headline hover:bg-surface-hover hover:border-border-medium active:bg-surface-active active:scale-[0.98]";
            case "link":
                return "bg-transparent text-link hover:text-link-hover focus-ring--muted";
            case "primary":
            default:
                return "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98]";
        }
    });

    const buttonClasses = $derived.by(() => {
        const base =
            "inline-flex focus-ring items-center justify-center rounded-control shrink-0 transition-colors duration-150 cursor-pointer select-none";
        return cn(`${base} ${sizeClass.box} ${variantClass} ${disabledClass} ${className}`);
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
