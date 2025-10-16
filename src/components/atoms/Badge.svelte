<script lang="ts">
    interface Props {
        variant?: "default" | "success" | "warning" | "error" | "info";
        size?: "sm" | "md" | "lg";
        closable?: boolean;
        className?: string;
    }

    let {
        variant = "default",
        size = "md",
        closable = false,
        className = "",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

    function handleClose(event: MouseEvent) {
        event.stopPropagation();
        // Close is now handled by the parent component
        // through event forwarding
    }

    // Simple size classes
    let sizeClasses = $derived({
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
    });

    // Simple variant classes
    let variantClasses = $derived({
        default: "bg-gray-100 text-gray-800 border-gray-300",
        success: "bg-green-100 text-green-800 border-green-300",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
        error: "bg-red-100 text-red-800 border-red-300",
        info: "bg-blue-100 text-blue-800 border-blue-300",
    });

    // Badge classes
    let badgeClasses = $derived(
        [
            "inline-flex items-center gap-1 font-medium border rounded-md",
            sizeClasses[size],
            variantClasses[variant],
            closable ? "cursor-pointer hover:opacity-80" : "",
        ].join(" "),
    );
</script>

{#if closable}
    <button
        type="button"
        class={badgeClasses}
        onclick={handleClose}
        {...restProps}
    >
        {@render children?.()}
        <span class="ml-1 text-xs">×</span>
    </button>
{:else}
    <span class={badgeClasses} {...restProps}>
        {@render children?.()}
    </span>
{/if}
