<script lang="ts">
    import { getCardVariantClasses } from "../../lib/variant-utils";

    export let title: string = "";
    export let image: string = "";
    export let interactive: boolean = false;
    export let variant: "default" | "success" | "warning" | "error" | "info" =
        "default";
    export let size: "sm" | "md" | "lg" = "md";

    // Size classes
    $: sizeClasses = {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
    };

    // Get variant class using utility function
    $: variantClass = getCardVariantClasses(variant);

    // Card classes
    $: cardClasses = [
        "rounded-lg transition-all duration-200",
        "hover:shadow-adaptive-md",
        interactive ? "cursor-pointer hover:scale-[1.02]" : "",
        sizeClasses[size],
        variantClass,
    ].join(" ");

    // Title classes using semantic text colors
    $: titleClasses = "text-lg font-semibold mb-2 text-primary";
</script>

<div class={cardClasses} {...$$restProps}>
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

    <slot />
</div>
