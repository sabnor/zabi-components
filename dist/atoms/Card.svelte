<script lang="ts">
    import type { Snippet } from "svelte";
    import type { CardVariant, SizeVariant } from "../../types/variants.js";
    import CardHeader from "./CardHeader.svelte";
    import CardContent from "./CardContent.svelte";

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

    const useOldAPI = $derived(
        title !== "" || description !== "" || image !== "",
    );

    const cardClasses = $derived(() => {
        const baseClasses = `rounded-lg transition-all duration-200 ${variantClasses()}`;
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

    function handleKeydown(event: KeyboardEvent) {
        if (onclick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onclick(event as unknown as MouseEvent);
        }
    }

    const cardRole = $derived(onclick ? "button" : undefined);
    const cardAriaLabel = $derived(onclick && title ? title : undefined);
</script>

<div
    class={cardClasses()}
    {onclick}
    role={cardRole}
    {...onclick ? { tabindex: 0 } : {}}
    aria-label={cardAriaLabel}
    onkeydown={onclick ? handleKeydown : undefined}
    {...restProps}
>
    {#if useOldAPI}
        <!-- Old API: Using title/description/image props -->
        {#if title || description}
            <CardHeader {title} {description} />
        {/if}

        {#if image || children}
            <CardContent {image} imageAlt={title}>
                {#if children}
                    {@render children()}
                {/if}
            </CardContent>
        {/if}
    {:else}
        <!-- New API: Using compound components (CardHeader, CardContent, CardFooter) -->
        {#if children}
            <CardContent className="pt-6">
                {@render children()}
            </CardContent>
        {/if}
    {/if}
</div>
