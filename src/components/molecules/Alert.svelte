<script lang="ts">
    export let variant: "success" | "warning" | "danger" | "info" = "info";
    export let title: string = "";
    export let message: string = "";
    export let dismissible: boolean = false;
    export let onDismiss: (() => void) | null = null;
    export let actions: Array<{
        label: string;
        href?: string;
        onClick?: () => void;
    }> = [];

    function handleDismiss() {
        if (onDismiss) {
            onDismiss();
        }
    }

    function handleActionClick(action: {
        label: string;
        href?: string;
        onClick?: () => void;
    }) {
        if (action.onClick) {
            action.onClick();
        }
    }

    $: alertClasses = {
        success: "bg-success-light text-success-dark border border-success",
        warning: "bg-warning-light text-warning-dark border border-warning",
        danger: "bg-error-light text-error-dark border border-error",
        info: "bg-info-light text-info-dark border border-info",
    };

    $: alertRole =
        variant === "success" || variant === "info" ? "status" : "alert";

    $: iconSvg = {
        success: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>`,
        warning: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>`,
        danger: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>`,
        info: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>`,
    };
</script>

<div
    class="relative rounded-md p-md border {alertClasses[
        variant
    ]} transition-all duration-200 motion-reduce:transition-none"
    role={alertRole}
    aria-live={variant === "success" || variant === "info"
        ? "polite"
        : "assertive"}
    aria-atomic="true"
>
    <!-- Dismiss button (X in top right) -->
    {#if dismissible}
        <button
            on:click={handleDismiss}
            class="absolute top-sm right-sm z-10 w-6 h-6 flex items-center justify-center rounded-full text-secondary hover:text-primary transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            aria-label="Dismiss alert"
            type="button"
        >
            <svg
                class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    {/if}

    <!-- Content -->
    <div class="flex items-start gap-sm {dismissible ? 'pr-8' : ''}">
        <!-- Icon -->
        <div class="flex-shrink-0 mt-0.5">
            {@html iconSvg[variant]}
        </div>

        <!-- Text content -->
        <div class="flex-1 min-w-0">
            {#if title}
                <h4 class="font-semibold text-sm mb-1">{title}</h4>
            {/if}
            {#if message}
                <p class="text-sm leading-relaxed">{message}</p>
            {/if}

            <!-- Actions -->
            {#if actions.length > 0}
                <div class="mt-3 flex flex-wrap gap-2">
                    {#each actions as action}
                        {#if action.href}
                            <a
                                href={action.href}
                                class="text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded-sm"
                            >
                                {action.label}
                            </a>
                        {:else}
                            <button
                                on:click={() => handleActionClick(action)}
                                class="text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded-sm"
                                type="button"
                            >
                                {action.label}
                            </button>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </div>

    <!-- Slot for custom content -->
    <slot />
</div>
