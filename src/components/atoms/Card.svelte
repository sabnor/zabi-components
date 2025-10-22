<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        image?: string;
        onclick?: (event: MouseEvent) => void | Promise<void>;
        size?: "sm" | "md" | "lg";
        fullWidth?: boolean;
        children?: Snippet;
    }

    let {
        title = "",
        image = "",
        onclick,
        size = "md",
        fullWidth = false,
        children,
        ...restProps
    }: Props = $props();

    const sizeClass = $derived(() => {
        return size === "sm" ? "p-3" : size === "lg" ? "p-6" : "p-4"; // default md
    });

    const cardClasses = $derived(() => {
        const baseClasses =
            "bg-surface rounded-lg transition-all duration-200 hover:shadow-adaptive-md min-w-64";
        const interactiveClasses = onclick
            ? "cursor-pointer hover:bg-surface-hover hover:border-focus"
            : "";
        const widthClasses = fullWidth ? "w-full" : "";

        return `${baseClasses} ${interactiveClasses} ${widthClasses} ${sizeClass()}`.trim();
    });

    const titleClasses = $derived(
        () => "text-lg font-semibold mb-2 text-headline",
    );
</script>

<div class={cardClasses()} {onclick} {...restProps}>
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
