<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let variant:
        | "default"
        | "success"
        | "warning"
        | "error"
        | "info"
        | "neutral" = "default";
    export let size: "sm" | "md" | "lg" = "md";
    export let shape: "rounded" | "pill" | "square" = "rounded";
    export let dot: boolean = false;
    export let closable: boolean = false;
    export let icon: string | undefined = undefined;
    export let iconPosition: "left" | "right" = "left";

    const dispatch = createEventDispatcher<{
        close: { event: MouseEvent };
        click: { event: MouseEvent };
    }>();

    function handleClose(event: MouseEvent | KeyboardEvent) {
        event.stopPropagation();
        dispatch("close", { event: event as MouseEvent });
    }

    function handleClick(event: MouseEvent | KeyboardEvent) {
        dispatch("click", { event: event as MouseEvent });
    }

    // Size classes
    $: sizeClasses = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
    };

    // Variant classes
    $: variantClasses = {
        default: "bg-dark-700 text-white border-dark-600",
        success:
            "bg-matrix-green-900/20 text-matrix-green-400 border-matrix-green-500/30 grainy-green",
        warning:
            "bg-cyber-amber-900/20 text-cyber-amber-400 border-cyber-amber-500/30 grainy-amber",
        error: "bg-blood-red-900/20 text-blood-red-400 border-blood-red-500/30 grainy-red",
        info: "bg-blue-900/20 text-blue-400 border-blue-500/30 grainy-blue",
        neutral: "bg-gray-800 text-gray-300 border-gray-600",
    };

    // Shape classes
    $: shapeClasses = {
        rounded: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none",
    };

    // Dot classes
    $: dotClasses = {
        sm: "w-1.5 h-1.5",
        md: "w-2 h-2",
        lg: "w-2.5 h-2.5",
    };

    // Badge classes
    $: badgeClasses = [
        "inline-flex",
        "items-center",
        "gap-1.5",
        "font-medium",
        "border",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "select-none",
        "cursor-default",
        sizeClasses[size],
        variantClasses[variant],
        shapeClasses[shape],
        closable ? "cursor-pointer hover:opacity-80" : "",
    ].join(" ");

    // Icon classes
    $: iconClasses = [
        "flex-shrink-0",
        size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5",
    ].join(" ");

    // Close button classes
    $: closeButtonClasses = [
        "flex-shrink-0",
        "ml-1",
        "hover:bg-white/10",
        "rounded-full",
        "p-0.5",
        "transition-colors",
        "duration-150",
        "ease-in-out",
        size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5",
    ].join(" ");
</script>

<div class="inline-flex items-center gap-1">
    {#if closable}
        <button
            type="button"
            class={badgeClasses}
            on:click={handleClick}
            on:keydown={(e) => e.key === "Enter" && handleClick(e)}
        >
            {#if dot}
                <div
                    class="w-2 h-2 rounded-full bg-current {dotClasses[size]}"
                ></div>
            {/if}

            {#if icon && iconPosition === "left"}
                <svg
                    class={iconClasses}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path fill-rule="evenodd" d={icon} clip-rule="evenodd" />
                </svg>
            {/if}

            <slot />

            {#if icon && iconPosition === "right"}
                <svg
                    class={iconClasses}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path fill-rule="evenodd" d={icon} clip-rule="evenodd" />
                </svg>
            {/if}
        </button>

        <button
            type="button"
            class={closeButtonClasses}
            on:click={handleClose}
            on:keydown={(e) => e.key === "Enter" && handleClose(e)}
            aria-label="Close badge"
        >
            <svg class="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
    {:else}
        <span class={badgeClasses}>
            {#if dot}
                <div
                    class="w-2 h-2 rounded-full bg-current {dotClasses[size]}"
                ></div>
            {/if}

            {#if icon && iconPosition === "left"}
                <svg
                    class={iconClasses}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path fill-rule="evenodd" d={icon} clip-rule="evenodd" />
                </svg>
            {/if}

            <slot />

            {#if icon && iconPosition === "right"}
                <svg
                    class={iconClasses}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path fill-rule="evenodd" d={icon} clip-rule="evenodd" />
                </svg>
            {/if}
        </span>
    {/if}
</div>

<style>
    /* Hover effects for closable badges */
    .badge-closable:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .badge-closable:active {
        transform: translateY(0);
    }

    /* Focus styles for accessibility */
    .badge-closable:focus {
        outline: 2px solid var(--color-plasma-red-500);
        outline-offset: 2px;
    }

    /* Animation for badge appearance */
    @keyframes badge-enter {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .badge-enter {
        animation: badge-enter 0.2s ease-out;
    }

    /* Animation for badge removal */
    @keyframes badge-exit {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.8);
        }
    }

    .badge-exit {
        animation: badge-exit 0.2s ease-in;
    }

    /* Dot animation */
    .badge-dot {
        animation: badge-dot-pulse 2s infinite;
    }

    @keyframes badge-dot-pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    /* Icon rotation for loading states */
    .badge-icon-loading {
        animation: badge-icon-spin 1s linear infinite;
    }

    @keyframes badge-icon-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
