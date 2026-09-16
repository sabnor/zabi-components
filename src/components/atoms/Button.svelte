<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import type { ButtonVariant, SizeVariant } from "../types/variants.js";

    type Props = Omit<HTMLButtonAttributes, "class"> & {
        variant?: ButtonVariant;
        size?: SizeVariant;
        loading?: boolean;
        text?: string;
        /** Stretch to the width of the container. */
        fullWidth?: boolean;
        /** @deprecated use `fullWidth` — kept so 7.x call sites keep working. */
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
        fullWidth = false,
        isFullWidth = false,
        class: className = "",
        onclick,
        children,
        ...restProps
    }: Props = $props();

    const isDisabled = $derived(disabled || loading);

    /**
     * One height scale, shared with Input, Select and IconButton, so controls
     * of the same size line up in a row. Heights are fixed (h-8 / h-10 / h-12)
     * rather than derived from padding + line-height, which is what let Button
     * and Input drift 14px apart at `lg`.
     *
     * Weight and tracking do NOT change with size: a large button used to drop
     * to font-normal, so the biggest button had the lightest label.
     */
    const sizeClass = $derived.by(() => {
        if (size === "sm") {
            return { box: "h-8 px-3", text: "text-sm", gap: "gap-2", spinner: "size-3.5" };
        }
        if (size === "lg") {
            return { box: "h-12 px-5", text: "text-base", gap: "gap-2", spinner: "size-4" };
        }
        return { box: "h-10 px-4", text: "text-sm", gap: "gap-2", spinner: "size-4" };
    });

    /**
     * Disabled is deliberately NOT `opacity-50` over the variant colour — that
     * made a disabled primary lighter and more colourful than an enabled
     * secondary. Every variant falls back to the same neutral disabled pair.
     */
    const disabledClass =
        "disabled:bg-action-disabled disabled:text-action-disabled-text disabled:border-transparent disabled:no-underline disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100";

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
                // A link variant has to look like a link at rest, not only on
                // hover — otherwise it is indistinguishable from `ghost`.
                return "bg-transparent text-link hover:text-link-hover underline underline-offset-4 decoration-1 hover:decoration-2 px-0 focus-ring--muted";
            case "primary":
            default:
                return "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98]";
        }
    });

    const buttonClasses = $derived.by(() => {
        const s = sizeClass;
        const layout = fullWidth || isFullWidth ? "flex w-full" : "inline-flex";
        const base = `${layout} focus-ring items-center justify-center rounded-control font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer select-none`;
        return `${base} ${s.box} ${s.text} ${s.gap} ${variantClass} ${disabledClass} ${className}`.trim();
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
            class="inline-block {sizeClass.spinner} shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80"
            aria-hidden="true"
        ></span>
    {/if}
    {#if text}
        {text}
    {:else if children}
        {@render children()}
    {/if}
</button>
