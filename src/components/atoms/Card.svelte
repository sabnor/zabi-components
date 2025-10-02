<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { CardEvents, ClickEventDetail } from "../../types/events";

    // Standardized component props
    export let variant: "default" | "elevated" | "outlined" = "default";
    export let density: "comfortable" | "compact" = "comfortable";
    export let disabled: boolean = false;
    export let loading: boolean = false;
    export let className: string = "";
    export let ariaLabel: string = "";
    export let ariaDescribedBy: string = "";

    const dispatch = createEventDispatcher<CardEvents>();

    // Density classes using standardized approach
    const densityClasses = {
        compact: "p-3 rounded-md",
        comfortable: "p-4 rounded-lg",
    };

    // Variant classes using CSS custom properties
    const variantClasses = {
        default:
            "bg-[var(--zabi-surface)] border border-[var(--zabi-border)] shadow-sm",
        elevated:
            "bg-[var(--zabi-surface)] border border-[var(--zabi-border)] shadow-md",
        outlined:
            "bg-[var(--zabi-surface)] border-2 border-[var(--zabi-border)] shadow-sm",
    };

    // Computed classes
    $: baseClasses = [
        "transition-all duration-200",
        variantClasses[variant],
        densityClasses[density],
        disabled ? "opacity-50 cursor-not-allowed" : "",
        loading ? "animate-pulse" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Accessibility attributes
    $: accessibilityProps = {
        "aria-busy": loading,
        "aria-label": ariaLabel || undefined,
        "aria-describedby": ariaDescribedBy || undefined,
    };

    function handleClick(event: CustomEvent) {
        if (disabled || loading) {
            event.preventDefault();
            return;
        }
        dispatch("click", { value: true, event: event.detail?.event || event });
    }

    function handleKeydown(event: KeyboardEvent) {
        if (disabled || loading) {
            return;
        }

        // Handle Escape key to blur focus
        if (event.key === "Escape") {
            (event.target as HTMLElement).blur();
        }
    }

    function handleFocus(event: FocusEvent) {
        if (!disabled && !loading) {
            dispatch("focus", { event });
        }
    }

    function handleBlur(event: FocusEvent) {
        if (!disabled && !loading) {
            dispatch("blur", { event });
        }
    }

    function handleMouseEnter(event: MouseEvent) {
        if (!disabled && !loading) {
            dispatch("hover", { event });
        }
    }

    function handleMouseLeave(event: MouseEvent) {
        if (!disabled && !loading) {
            dispatch("leave", { event });
        }
    }
</script>

<div
    class={baseClasses}
    {...accessibilityProps}
    on:click={handleClick}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
>
    <!-- Header slot -->
    <div class="card-header">
        <slot name="header" />
    </div>

    <!-- Content slot -->
    <div class="card-content">
        <slot />
    </div>

    <!-- Footer slot -->
    <div class="card-footer">
        <slot name="footer" />
    </div>

    <!-- Loading overlay -->
    {#if loading}
        <div
            class="absolute inset-0 bg-surface/50 rounded-lg flex items-center justify-center"
            aria-hidden="true"
        >
            <div
                class="animate-spin rounded-full h-6 w-6 border-2 border-tertiary border-t-transparent"
            ></div>
        </div>
    {/if}
</div>

<style>
    .card-header:empty {
        display: none;
    }

    .card-content:empty {
        display: none;
    }

    .card-footer:empty {
        display: none;
    }
</style>
