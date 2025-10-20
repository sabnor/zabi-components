<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        image?: string;
        interactive?: boolean;
        variant?: "default" | "success" | "warning" | "error" | "info";
        size?: "sm" | "md" | "lg";
        children?: Snippet;
    }

    let {
        title = "",
        image = "",
        interactive = false,
        variant = "default",
        size = "md",
        children,
        ...restProps
    }: Props = $props();

    // Size classes using full class names
    const sizeClass = $derived(() => {
        return size === "sm" ? "p-3" : size === "lg" ? "p-6" : "p-4"; // default md
    });

    // Variant classes using full class names
    const variantClass = $derived(() => {
        return variant === "success"
            ? "border-green-200 bg-green-50"
            : variant === "warning"
              ? "border-yellow-200 bg-yellow-50"
              : variant === "error"
                ? "border-red-200 bg-red-50"
                : variant === "info"
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-200 bg-white"; // default
    });

    // Card classes using Badge pattern
    const cardClasses = $derived(() => {
        const baseClasses =
            "rounded-lg transition-all duration-200 hover:shadow-adaptive-md";
        const interactiveClasses = interactive
            ? "cursor-pointer hover:scale-[1.02]"
            : "";

        return `${baseClasses} ${interactiveClasses} ${sizeClass()} ${variantClass()}`.trim();
    });

    // Title classes using semantic text colors
    const titleClasses = $derived(
        () => "text-lg font-semibold mb-2 text-primary",
    );
</script>

<div class={cardClasses()} {...restProps}>
    {#if image}
        <img
            src={image}
            alt={title}
            class="w-full h-48 object-cover rounded-md mb-4"
        />
    {/if}

    {#if title}
        <h3 class={titleClasses()}>{title}</h3>
    {/if}

    {#if children}
        {@render children()}
    {/if}
</div>
