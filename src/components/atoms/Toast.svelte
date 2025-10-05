<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { fly, fade } from "svelte/transition";
    import {
        isBrowser,
        safeDocument,
        safeSetTimeout,
        safeClearTimeout,
    } from "../../lib/ssr-safe";
    import {
        CheckCircle,
        AlertCircle,
        AlertTriangle,
        Info,
        X,
    } from "@lucide/svelte";

    export let id: string = "";
    export let title: string = "";
    export let message: string = "";
    export let type: "success" | "error" | "warning" | "info" = "info";
    export let duration: number = 5000; // Auto-dismiss duration (0 = no auto-dismiss)
    export let position:
        | "top-right"
        | "top-left"
        | "bottom-right"
        | "bottom-left"
        | "top-center"
        | "bottom-center" = "top-right";
    export let closable: boolean = true;
    export let showIcon: boolean = true;
    export let className: string = "";

    const dispatch = createEventDispatcher<{
        close: { id: string };
        click: { id: string; event: MouseEvent };
    }>();

    let isVisible = true;
    let autoDismissTimeout: ReturnType<typeof setTimeout> | undefined;

    // Icon mapping
    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info,
    };

    // Type classes
    const typeClasses = {
        success: {
            container: "bg-success-surface border-success text-success-text",
            icon: "text-success",
            close: "text-success hover:text-success-hover",
        },
        error: {
            container: "bg-error-surface border-error text-error-text",
            icon: "text-error",
            close: "text-error hover:text-error-hover",
        },
        warning: {
            container: "bg-warning-surface border-warning text-warning-text",
            icon: "text-warning",
            close: "text-warning hover:text-warning-hover",
        },
        info: {
            container: "bg-info-surface border-info text-info-text",
            icon: "text-info",
            close: "text-info hover:text-info-hover",
        },
    };

    // Position classes
    const positionClasses = {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-center": "top-4 left-1/2 transform -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    };

    function closeToast() {
        isVisible = false;
        dispatch("close", { id });
    }

    function handleClick(event: MouseEvent) {
        dispatch("click", { id, event });
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && closable) {
            closeToast();
        }
    }

    onMount(() => {
        // Only run on client side
        if (!isBrowser()) return;

        const doc = safeDocument();
        if (!doc) return;

        // Auto-dismiss if duration is set
        if (duration > 0) {
            autoDismissTimeout = safeSetTimeout(() => {
                closeToast();
            }, duration);
        }

        // Add keyboard listener
        doc.addEventListener("keydown", handleKeydown);

        return () => {
            if (autoDismissTimeout) {
                safeClearTimeout(autoDismissTimeout);
            }
            doc.removeEventListener("keydown", handleKeydown);
        };
    });

    // Pause auto-dismiss on hover
    function handleMouseEnter() {
        if (autoDismissTimeout) {
            safeClearTimeout(autoDismissTimeout);
        }
    }

    function handleMouseLeave() {
        if (duration > 0) {
            autoDismissTimeout = safeSetTimeout(() => {
                closeToast();
            }, duration);
        }
    }
</script>

{#if isVisible}
    <div
        class="
            fixed z-notification max-w-sm w-full
            {positionClasses[position]}
            {typeClasses[type].container}
            border rounded-lg shadow-adaptive-lg
            {className}
        "
        role="alert"
        aria-live="polite"
        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
        transition:fly={{
            x: position.includes("right")
                ? 300
                : position.includes("left")
                  ? -300
                  : 0,
            y: position.includes("top") ? -50 : 50,
            duration: 300,
        }}
    >
        <div class="p-4">
            <div class="flex items-start">
                <!-- Icon -->
                {#if showIcon}
                    <div class="flex-shrink-0 mr-3">
                        <svelte:component
                            this={icons[type]}
                            size={20}
                            class={typeClasses[type].icon}
                        />
                    </div>
                {/if}

                <!-- Content -->
                <div class="flex-1 min-w-0">
                    {#if title}
                        <h4 class="text-sm font-semibold mb-1">{title}</h4>
                    {/if}
                    {#if message}
                        <p class="text-sm opacity-90">{message}</p>
                    {/if}
                    <slot />
                </div>

                <!-- Close button -->
                {#if closable}
                    <button
                        type="button"
                        class="
                            flex-shrink-0 ml-3 p-1 rounded-full
                            {typeClasses[type].close}
                            transition-colors duration-200
                        "
                        on:click={closeToast}
                        aria-label="Close notification"
                    >
                        <X size={16} />
                    </button>
                {/if}
            </div>
        </div>

        <!-- Progress bar for auto-dismiss -->
        {#if duration > 0}
            <div
                class="absolute bottom-0 left-0 right-0 h-1 bg-current opacity-20 rounded-b-lg overflow-hidden"
            >
                <div
                    class="h-full bg-current opacity-50 animate-progress-bar"
                    style="animation-duration: {duration}ms;"
                ></div>
            </div>
        {/if}
    </div>
{/if}

<style>
    /* Progress bar animation */
    @keyframes progress-bar {
        0% {
            width: 100%;
        }
        100% {
            width: 0%;
        }
    }

    .animate-progress-bar {
        animation: progress-bar linear forwards;
    }

    /* Toast animations */
    .toast-enter {
        animation: toast-enter 0.3s ease-out;
    }

    .toast-exit {
        animation: toast-exit 0.2s ease-in;
    }

    @keyframes toast-enter {
        0% {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes toast-exit {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
        }
    }

    /* Hover effects */
    .toast-container:hover {
        transform: translateY(-1px);
        box-shadow:
            0 10px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    /* Focus styles for accessibility */
    .toast-container:focus {
        outline: 2px solid var(--color-primary-500);
        outline-offset: 2px;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .toast-container {
            max-width: calc(100vw - 2rem);
            margin: 0 1rem;
        }
    }
</style>
