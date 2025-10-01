<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let variant: "default" | "outlined" | "elevated" | "filled" =
        "default";
    export let density: "compact" | "comfortable" | "spacious" = "comfortable";
    export let disabled: boolean = false;
    export let loading: boolean = false;
    export let className: string = "";
    export let ariaLabel: string = "";
    export let ariaDescribedBy: string = "";

    const dispatch = createEventDispatcher<{
        click: CustomEvent;
        hover: MouseEvent;
        leave: MouseEvent;
        focus: FocusEvent;
        blur: FocusEvent;
    }>();

    // Density classes - responsive padding, shadow, and radius
    const densityClasses = {
        compact: "p-3 sm:p-4 rounded-md shadow-sm",
        comfortable: "p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md",
        spacious: "p-6 sm:p-8 rounded-xl shadow-md sm:shadow-lg",
    };

    // Variant classes
    const variantClasses = {
        default: "bg-card border border-primary",
        outlined: "bg-card border-2 border-primary",
        elevated: "bg-card border border-primary shadow-lg",
        filled: "bg-surface-secondary border border-primary",
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
        dispatch("click", event);
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
            dispatch("focus", event);
        }
    }

    function handleBlur(event: FocusEvent) {
        if (!disabled && !loading) {
            dispatch("blur", event);
        }
    }

    function handleMouseEnter(event: MouseEvent) {
        if (!disabled && !loading) {
            dispatch("hover", event);
        }
    }

    function handleMouseLeave(event: MouseEvent) {
        if (!disabled && !loading) {
            dispatch("leave", event);
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
