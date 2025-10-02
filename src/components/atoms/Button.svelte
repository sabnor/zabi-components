<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { ButtonEvents, ClickEventDetail } from "../../types/events";

    // Standardized component props
    export let variant:
        | "primary"
        | "secondary"
        | "danger"
        | "success"
        | "warning"
        | "info" = "primary";
    export let size: "sm" | "md" | "lg" = "md";
    export let disabled: boolean = false;
    export let loading: boolean = false;
    export let type: "button" | "submit" | "reset" = "button";
    export let className: string = "";

    // Icon props - can be string (emoji/text) or Svelte component
    export let iconLeft: string | any = null;
    export let iconRight: string | any = null;

    // Accessibility props
    export let ariaLabel: string = "";
    export let ariaDescribedBy: string = "";
    export let ariaExpanded: boolean | undefined = undefined;
    export let ariaControls: string | undefined = undefined;
    export let ariaPressed: boolean | undefined = undefined;

    const dispatch = createEventDispatcher<ButtonEvents>();

    function handleClick(event: CustomEvent) {
        if (disabled || loading) {
            event.preventDefault();
            return;
        }
        // Dispatch with standardized event structure
        dispatch("click", { value: true, event: event.detail?.event || event });
    }

    function handleKeydown(event: KeyboardEvent) {
        if (disabled || loading) return;

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            dispatch("click", { value: true, event });
        }
    }

    // Base classes using semantic tokens
    const baseClasses =
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden";

    // Size classes using standardized sizes
    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-4 py-2 text-sm rounded-md",
        lg: "px-5 py-3 text-base rounded-lg",
    };

    // Variant classes using CSS custom properties for easy theming
    const variantClasses = {
        primary: [
            "bg-[var(--zabi-primary)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-primary)]",
            "hover:bg-[var(--zabi-primary-hover)] hover:border-[var(--zabi-primary-hover)]",
            "active:bg-[var(--zabi-primary-active)] active:border-[var(--zabi-primary-active)]",
            "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
            "shadow-sm hover:shadow-md",
        ].join(" "),

        secondary: [
            "bg-[var(--zabi-surface)] text-[var(--zabi-text)] border border-[var(--zabi-border)]",
            "hover:bg-[var(--zabi-surface-hover)] hover:border-[var(--zabi-border-hover)]",
            "active:bg-[var(--zabi-surface-active)] active:border-[var(--zabi-border-hover)]",
            "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
            "shadow-sm hover:shadow-md",
        ].join(" "),

        success: [
            "bg-[var(--zabi-success)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-success)]",
            "hover:bg-[var(--zabi-success-hover)] hover:border-[var(--zabi-success-hover)]",
            "active:bg-[var(--zabi-success-active)] active:border-[var(--zabi-success-active)]",
            "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
            "shadow-sm hover:shadow-md",
        ].join(" "),

        warning: [
            "bg-[var(--zabi-warning)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-warning)]",
            "hover:bg-[var(--zabi-warning-hover)] hover:border-[var(--zabi-warning-hover)]",
            "active:bg-[var(--zabi-warning-active)] active:border-[var(--zabi-warning-active)]",
            "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
            "shadow-sm hover:shadow-md",
        ].join(" "),

        danger: [
            "bg-[var(--zabi-error)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-error)]",
            "hover:bg-[var(--zabi-error-hover)] hover:border-[var(--zabi-error-hover)]",
            "active:bg-[var(--zabi-error-active)] active:border-[var(--zabi-error-active)]",
            "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
            "shadow-sm hover:shadow-md",
        ].join(" "),

        info: [
            "bg-[var(--zabi-info)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-info)]",
            "hover:bg-[var(--zabi-info-hover)] hover:border-[var(--zabi-info-hover)]",
            "active:bg-[var(--zabi-info-active)] active:border-[var(--zabi-info-active)]",
            "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
            "shadow-sm hover:shadow-md",
        ].join(" "),
    };

    // Disabled state classes
    const disabledClasses = disabled
        ? [
              "bg-[var(--zabi-surface-disabled)] text-[var(--zabi-text-disabled)] border-[var(--zabi-border-disabled)]",
              "hover:bg-[var(--zabi-surface-disabled)] hover:text-[var(--zabi-text-disabled)] hover:border-[var(--zabi-border-disabled)]",
              "active:bg-[var(--zabi-surface-disabled)] active:text-[var(--zabi-text-disabled)] active:border-[var(--zabi-border-disabled)]",
              "shadow-none",
          ].join(" ")
        : "";

    // Simple loading indicator
    const showLoading = loading;

    // Computed classes
    $: buttonClasses = [
        baseClasses,
        sizeClasses[size],
        disabled ? disabledClasses : variantClasses[variant],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Accessibility attributes
    $: accessibilityProps = {
        "aria-busy": loading,
        "aria-label": ariaLabel || (loading ? "Loading..." : undefined),
        "aria-describedby": ariaDescribedBy || undefined,
        "aria-expanded": ariaExpanded,
        "aria-controls": ariaControls,
        "aria-pressed": ariaPressed,
        "aria-disabled": disabled,
    };
</script>

<button
    {type}
    class={buttonClasses}
    on:click={handleClick}
    on:keydown={handleKeydown}
    disabled={disabled || loading}
    {...accessibilityProps}
>
    {#if loading}
        <svg
            class="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    {/if}

    {#if iconLeft && !loading}
        {#if typeof iconLeft === "string"}
            <span class="h-4 w-4 flex items-center justify-center"
                >{iconLeft}</span
            >
        {:else}
            <svelte:component this={iconLeft} class="h-4 w-4" />
        {/if}
    {/if}

    <slot />

    {#if iconRight && !loading}
        {#if typeof iconRight === "string"}
            <span class="h-4 w-4 flex items-center justify-center"
                >{iconRight}</span
            >
        {:else}
            <svelte:component this={iconRight} class="h-4 w-4" />
        {/if}
    {/if}
</button>

<style>
    /* Ensure proper focus styles for reduced motion users */
    @media (prefers-reduced-motion: reduce) {
        button {
            transition: none;
        }
    }

    /* Ensure proper contrast for disabled state */
    button:disabled {
        opacity: 0.6;
    }

    /* Loading state animation */
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .animate-spin {
        animation: spin 1s linear infinite;
    }
</style>
