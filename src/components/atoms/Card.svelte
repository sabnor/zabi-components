<script lang="ts">
    import type { Snippet } from "svelte";
    import type { CardVariant, SizeVariant } from "../../types/variants.js";

    interface Props {
        title?: string;
        description?: string;
        image?: string;
        onclick?: (event: MouseEvent) => void | Promise<void>;
        size?: SizeVariant;
        variant?: CardVariant;
        fullWidth?: boolean;
        children?: Snippet;
    }

    let {
        title = "",
        description = "",
        image = "",
        onclick,
        size = "md",
        variant = "default",
        fullWidth = true,
        children,
        ...restProps
    }: Props = $props();

    const sizeClass = $derived(() => {
        return size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-6";
    });

    const variantClasses = $derived(() => {
        switch (variant) {
            case "elevated":
                return "bg-card shadow-lg";
            case "outlined":
                return "bg-card border-2 border-base-200 shadow-none";
            case "flat":
                return "bg-card shadow-none border-none";
            default:
                return "bg-card shadow-sm";
        }
    });

    const useOldAPI = $derived(title !== "" || description !== "" || image !== "");
    
    const cardClasses = $derived(() => {
        const baseClasses =
            `rounded-lg transition-all duration-200 ${variantClasses()}`;
        const interactiveClasses = onclick
            ? variant === "elevated"
                ? "cursor-pointer hover:shadow-xl hover:bg-card-hover"
                : variant === "outlined"
                  ? "cursor-pointer hover:border-brand-500 hover:bg-card-hover"
                  : variant === "flat"
                    ? "cursor-pointer hover:bg-card-hover"
                    : "cursor-pointer hover:shadow-lg hover:bg-card-hover"
            : "";
        const widthClasses = fullWidth ? "w-full" : "";
        const minWidthClass = useOldAPI ? "min-w-64" : "";
        const paddingClass = useOldAPI ? sizeClass() : "";

        return `${baseClasses} ${interactiveClasses} ${widthClasses} ${minWidthClass} ${paddingClass}`.trim();
    });

    const titleClasses = $derived(() => {
        if (size === "sm") {
            return "text-lg font-medium mb-2 text-headline";
        } else if (size === "lg") {
            return "text-2xl font-medium mb-4 text-headline";
        } else {
            return "text-xl font-medium mb-3 text-headline";
        }
    });

    const descriptionClasses = $derived(() => {
        if (size === "sm") {
            return "text-xs text-description mb-3";
        } else if (size === "lg") {
            return "text-base text-description mb-5";
        } else {
            return "text-sm text-description mb-4";
        }
    });

    function handleKeydown(event: KeyboardEvent) {
        if (onclick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onclick(event as unknown as MouseEvent);
        }
    }

    const cardRole = $derived(onclick ? "button" : undefined);
    const cardTabIndex = $derived(onclick ? 0 : undefined);
    const cardAriaLabel = $derived(onclick && title ? title : undefined);
</script>

<div 
    class={cardClasses()} 
    {onclick} 
    role={cardRole}
    tabindex={cardTabIndex}
    aria-label={cardAriaLabel}
    onkeydown={handleKeydown}
    {...restProps}
>
    {#if useOldAPI}
        <!-- Old API: Using title/description/image props -->
        {#if image}
            <img
                src={image}
                alt={title}
                class="w-full h-48 object-cover rounded-lg mb-4"
            />
        {/if}

        {#if title}
            <h3 class={titleClasses()}>{title}</h3>
        {/if}

        {#if description}
            <p class={descriptionClasses()}>{description}</p>
        {/if}

        {#if children}
            {@render children()}
        {/if}
    {:else}
        <!-- New API: Using compound components (CardHeader, CardContent, CardFooter) -->
        {#if children}
            {@render children()}
        {/if}
    {/if}
</div>
