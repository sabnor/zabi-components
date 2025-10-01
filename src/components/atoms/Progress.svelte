<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let value: number = 0;
    export let max: number = 100;
    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "default" | "success" | "warning" | "error" | "info" =
        "default";
    export let shape: "linear" | "circular" = "linear";
    export let animated: boolean = true;
    export let striped: boolean = false;
    export let showValue: boolean = false;
    export let label: string = "";
    export let className: string = "";

    const dispatch = createEventDispatcher<{
        complete: { value: number; max: number };
    }>();

    // Generate unique ID for accessibility
    let progressId = `progress-${Math.random().toString(36).substr(2, 9)}`;

    // Calculate percentage
    $: percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    $: isComplete = percentage >= 100;

    // Size classes
    const sizeClasses = {
        sm: {
            linear: "h-1",
            circular: "w-8 h-8",
            text: "text-xs",
        },
        md: {
            linear: "h-2",
            circular: "w-12 h-12",
            text: "text-sm",
        },
        lg: {
            linear: "h-3",
            circular: "w-16 h-16",
            text: "text-base",
        },
    };

    // Variant classes
    const variantClasses = {
        default: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
        info: "bg-info",
    };

    // Background classes
    const backgroundClasses = {
        default: "bg-surface-tertiary",
        success: "bg-success-surface",
        warning: "bg-warning-surface",
        error: "bg-error-surface",
        info: "bg-info-surface",
    };

    // Dispatch complete event when progress reaches 100%
    $: if (isComplete) {
        dispatch("complete", { value, max });
    }

    // Calculate circular progress
    $: circumference = shape === "circular" ? 2 * Math.PI * 20 : 0; // radius = 20
    $: strokeDasharray = circumference;
    $: strokeDashoffset = circumference - (percentage / 100) * circumference;
</script>

<div class="progress-container {className}">
    {#if label}
        <div class="flex justify-between items-center mb-2">
            <label for={progressId} class="text-sm font-medium text-primary"
                >{label}</label
            >
            {#if showValue}
                <span class="text-sm text-secondary"
                    >{Math.round(percentage)}%</span
                >
            {/if}
        </div>
    {/if}

    {#if shape === "linear"}
        <div class="relative">
            <!-- Background -->
            <div
                class="
                w-full rounded-full overflow-hidden
                {sizeClasses[size].linear}
                {backgroundClasses[variant]}
            "
            >
                <!-- Progress bar -->
                <div
                    id={progressId}
                    class="
                        h-full rounded-full transition-all duration-300 ease-out
                        {variantClasses[variant]}
                        {animated ? 'animate-pulse' : ''}
                        {striped ? 'bg-stripes' : ''}
                    "
                    style="width: {percentage}%"
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin="0"
                    aria-valuemax={max}
                    aria-label={label || `Progress: ${Math.round(percentage)}%`}
                ></div>
            </div>

            <!-- Value display inside bar (for larger sizes) -->
            {#if showValue && size === "lg"}
                <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xs font-medium text-white">
                        {Math.round(percentage)}%
                    </span>
                </div>
            {/if}
        </div>
    {:else if shape === "circular"}
        <div class="relative inline-block">
            <!-- Circular progress -->
            <svg
                id={progressId}
                class="transform -rotate-90 {sizeClasses[size].circular}"
                viewBox="0 0 44 44"
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin="0"
                aria-valuemax={max}
                aria-label={label || `Progress: ${Math.round(percentage)}%`}
            >
                <!-- Background circle -->
                <circle
                    cx="22"
                    cy="22"
                    r="20"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                    class="text-neutral-200 dark:text-neutral-700"
                />
                <!-- Progress circle -->
                <circle
                    cx="22"
                    cy="22"
                    r="20"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                    stroke-linecap="round"
                    stroke-dasharray={strokeDasharray}
                    stroke-dashoffset={strokeDashoffset}
                    class="
                        transition-all duration-300 ease-out
                        {variantClasses[variant]}
                        {animated ? 'animate-pulse' : ''}
                    "
                />
            </svg>

            <!-- Center content -->
            <div class="absolute inset-0 flex items-center justify-center">
                {#if showValue}
                    <span
                        class="
                        font-medium text-primary
                        {sizeClasses[size].text}
                    "
                    >
                        {Math.round(percentage)}%
                    </span>
                {:else}
                    <slot name="center" />
                {/if}
            </div>
        </div>
    {/if}

    <!-- Additional info slot -->
    <slot />
</div>

<style>
    /* Striped animation */
    @keyframes stripes {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 40px 0;
        }
    }

    .bg-stripes {
        background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
        );
        background-size: 40px 40px;
        animation: stripes 1s linear infinite;
    }

    /* Smooth transitions */
    .progress-bar {
        transition: width 0.3s ease-out;
    }

    .progress-circle {
        transition: stroke-dashoffset 0.3s ease-out;
    }

    /* Focus styles for accessibility */
    [role="progressbar"]:focus {
        outline: 2px solid var(--color-primary-500);
        outline-offset: 2px;
    }

    /* Animation for completion */
    .progress-complete {
        animation: progress-complete 0.5s ease-out;
    }

    @keyframes progress-complete {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
