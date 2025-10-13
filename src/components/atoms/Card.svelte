<script lang="ts">
    import { getCardVariantClasses } from "../../lib/variant-utils";

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
    } = $props<Props & { children?: any }>();

    // Size classes
    let sizeClasses = $derived({
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
    });

    // Get variant class using utility function
    let variantClass = $derived(getCardVariantClasses(variant));

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
