<script lang="ts">
    interface Props {
        title?: string;
        image?: string;
        interactive?: boolean;
        variant?: "default" | "success" | "warning" | "error" | "info";
        size?: "sm" | "md" | "lg";
    }

    let {
        title = "",
        image = "",
        interactive = false,
        variant = "default",
        size = "md",
        children,
        ...restProps
    }: Props & { children?: any } = $props();

    // Size classes
    let sizeClasses = $derived({
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
    });

    // Get variant class using utility function
    let variantClass = $derived(() => {
        const variantMap = {
            default: "border-gray-200 bg-white",
            success: "border-green-200 bg-green-50",
            warning: "border-yellow-200 bg-yellow-50",
            error: "border-red-200 bg-red-50",
            info: "border-blue-200 bg-blue-50",
        };
        return variantMap[variant] || variantMap.default;
    });

    // Card classes
    let cardClasses = $derived(
        [
            "rounded-lg transition-all duration-200",
            "hover:shadow-adaptive-md",
            interactive ? "cursor-pointer hover:scale-[1.02]" : "",
            sizeClasses[size],
            variantClass,
        ].join(" "),
    );

    // Title classes using semantic text colors
    let titleClasses = $derived("text-lg font-semibold mb-2 text-primary");
</script>

<div class={cardClasses} {...restProps}>
    {#if image}
        <img
            src={image}
            alt={title}
            class="w-full h-48 object-cover rounded-md mb-4"
        />
    {/if}

    {#if title}
        <h3 class={titleClasses}>{title}</h3>
    {/if}

    {@render children?.()}
</div>
