<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";

    const NAVIGATION_MENU_CONTEXT = Symbol("navigation-menu");

    interface Props {
        href?: string;
        asChild?: boolean;
        className?: string;
        children?: Snippet;
    }

    let {
        href = "#",
        asChild = false,
        className = "",
        children,
        ...restProps
    }: Props = $props();

    const context = getContext<{
        setActiveItem: (item: string | null) => void;
    }>(NAVIGATION_MENU_CONTEXT);

    function handleClick() {
        context?.setActiveItem(null);
    }

    const linkClasses =
        "block px-4 py-2 text-sm text-headline hover:bg-base-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 no-underline {className}";
</script>

{#if asChild}
    <div
        class={linkClasses}
        onclick={handleClick}
        data-navigation-menu-link
        {...restProps}
    >
        {@render children?.()}
    </div>
{:else}
    <a
        {href}
        class={linkClasses}
        onclick={handleClick}
        data-navigation-menu-link
        {...restProps}
    >
        {@render children?.()}
    </a>
{/if}
