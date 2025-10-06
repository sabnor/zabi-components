<script lang="ts">
    let {
        variant = "primary",
        size = "md",
        disabled = false,
        loading = false,
        type = "button",
        className = "",
        children,
        ...restProps
    }: {
        variant?:
            | "primary"
            | "secondary"
            | "danger"
            | "success"
            | "warning"
            | "info"
            | "ghost"
            | "link"
            | "neutral";
        size?: "sm" | "md" | "lg";
        disabled?: boolean;
        loading?: boolean;
        type?: "button" | "submit" | "reset";
        className?: string;
        children?: any;
        [key: string]: any;
    } = $props();

    // Base classes
    const baseClasses =
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden";

    // Size classes
    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm rounded-md",
        md: "px-4 py-2 text-sm rounded-md",
        lg: "px-5 py-3 text-base rounded-lg",
    };

    // Variant classes
    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
            "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        success:
            "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        warning:
            "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
        info: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
        link: "bg-transparent text-blue-600 hover:text-blue-700 underline focus:ring-blue-500",
        neutral:
            "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    };

    // Computed classes
    const buttonClasses = $derived(
        [baseClasses, sizeClasses[size], variantClasses[variant], className]
            .filter(Boolean)
            .join(" "),
    );
</script>

<button
    {type}
    class={buttonClasses}
    disabled={disabled || loading}
    {...restProps}
>
    {#if loading}
        <svg
            class="animate-spin h-4 w-4 text-current"
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

    {#if children}
        {@render children()}
    {/if}
</button>

<style>
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
