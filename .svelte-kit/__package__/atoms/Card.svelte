<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        description?: string;
        image?: string;
        onclick?: (event: MouseEvent) => void | Promise<void>;
        size?: "sm" | "md" | "lg";
        fullWidth?: boolean;
        children?: Snippet;
    }

    let {
        title = "",
        description = "",
        image = "",
        onclick,
        size = "md",
        fullWidth = true,
        children,
        ...restProps
    }: Props = $props();

    const sizeClass = $derived(() => {
        return size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-6"; // default md
    });

    const cardClasses = $derived(() => {
        const baseClasses =
            "rounded-lg transition-all duration-200 min-w-64 bg-card shadow-sm";
        const interactiveClasses = onclick
            ? "cursor-pointer hover:shadow-lg hover:bg-card-hover"
            : "";
        const widthClasses = fullWidth ? "w-full" : "";

        return `${baseClasses} ${interactiveClasses} ${widthClasses} ${sizeClass()}`.trim();
    });

    const titleClasses = $derived(() => {
        if (size === "sm") {
            return "text-lg font-medium mb-2 text-headline";
        } else if (size === "lg") {
            return "text-2xl font-medium mb-4 text-headline";
        } else {
            // default md
            return "text-xl font-medium mb-3 text-headline";
        }
    });

    const descriptionClasses = $derived(() => {
        if (size === "sm") {
            return "text-xs text-description mb-3";
        } else if (size === "lg") {
            return "text-base text-description mb-5";
        } else {
            // default md
            return "text-sm text-description mb-4";
        }
    });
</script>

<div class={cardClasses()} {onclick} {...restProps}>
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
</div>
