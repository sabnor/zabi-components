<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Component props with proper TypeScript types
    export let variant:
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger"
        | "ghost"
        | "link" = "primary";

    export let size: "sm" | "md" | "lg" = "md";
    export let disabled: boolean = false;
    export let loading: boolean = false;
    export let fullWidth: boolean = false;
    export let type: "button" | "submit" | "reset" = "button";
    export let className: string = "";

    // Icon props
    export let iconLeft: any = null;
    export let iconRight: any = null;

    // Accessibility props
    export let ariaLabel: string = "";
    export let ariaDescribedBy: string = "";
    export let ariaExpanded: boolean | undefined = undefined;
    export let ariaControls: string | undefined = undefined;
    export let ariaPressed: boolean | undefined = undefined;

    const dispatch = createEventDispatcher();

    function handleClick(event: CustomEvent) {
        if (disabled || loading) {
            event.preventDefault();
            return;
        }
        dispatch("click", event);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (disabled || loading) return;

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            dispatch("click", event);
        }
    }

    // Base classes using semantic tokens
    const baseClasses =
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden";

    // Size classes using semantic spacing tokens
    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-4 py-2 text-sm md:text-base rounded-md",
        lg: "px-5 py-3 text-base rounded-lg",
    };

    // Variant classes using semantic tokens
    const variantClasses = {
        primary: [
            "bg-primary text-inverse border border-primary",
            "hover:bg-primary-hover hover:border-primary-hover",
            "active:bg-primary-active active:border-primary-active",
            "focus:ring-primary focus:ring-offset-primary",
            "shadow-adaptive-sm hover:shadow-adaptive-md",
        ].join(" "),

        secondary: [
            "bg-surface-secondary text-primary border border-primary",
            "hover:bg-surface-tertiary hover:border-primary-hover",
            "active:bg-surface-active active:border-primary-active",
            "focus:ring-primary focus:ring-offset-primary",
            "shadow-adaptive-sm hover:shadow-adaptive-md",
        ].join(" "),

        success: [
            "bg-success text-inverse border border-success",
            "hover:bg-success-hover hover:border-success-hover",
            "active:bg-success-active active:border-success-active",
            "focus:ring-success focus:ring-offset-primary",
            "shadow-adaptive-sm hover:shadow-adaptive-md",
        ].join(" "),

        warning: [
            "bg-warning text-inverse border border-warning",
            "hover:bg-warning-hover hover:border-warning-hover",
            "active:bg-warning-active active:border-warning-active",
            "focus:ring-warning focus:ring-offset-primary",
            "shadow-adaptive-sm hover:shadow-adaptive-md",
        ].join(" "),

        danger: [
            "bg-error text-inverse border border-error",
            "hover:bg-error-hover hover:border-error-hover",
            "active:bg-error-active active:border-error-active",
            "focus:ring-error focus:ring-offset-primary",
            "shadow-adaptive-sm hover:shadow-adaptive-md",
        ].join(" "),

        ghost: [
            "bg-transparent text-primary border border-transparent",
            "hover:bg-surface-secondary hover:border-primary",
            "active:bg-surface-active active:border-primary-active",
            "focus:ring-primary focus:ring-offset-primary",
        ].join(" "),

        link: [
            "bg-transparent text-primary border border-transparent p-0",
            "hover:text-primary-hover hover:underline",
            "active:text-primary-active",
            "focus:ring-primary focus:ring-offset-primary",
            "shadow-none",
        ].join(" "),
    };

    // Disabled state classes
    const disabledClasses = disabled
        ? [
              "bg-surface-disabled text-disabled border-border-disabled",
              "hover:bg-surface-disabled hover:text-disabled hover:border-border-disabled",
              "active:bg-surface-disabled active:text-disabled active:border-border-disabled",
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
        fullWidth ? "w-full" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Accessibility attributes
    $: accessibilityProps = {
        "aria-busy": loading ? "true" : "false",
        "aria-label": ariaLabel || (loading ? "Loading..." : undefined),
        "aria-describedby": ariaDescribedBy || undefined,
        "aria-expanded": ariaExpanded,
        "aria-controls": ariaControls,
        "aria-pressed": ariaPressed,
        "aria-disabled": disabled ? "true" : "false",
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
        <svelte:component this={iconLeft} class="h-4 w-4" />
    {/if}

    <slot />

    {#if iconRight && !loading}
        <svelte:component this={iconRight} class="h-4 w-4" />
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
