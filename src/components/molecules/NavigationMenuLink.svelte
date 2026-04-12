<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";
    import {
        NAVIGATION_MENU_CONTEXT_KEY,
        type NavigationMenuContextValue,
    } from "./navigation-menu-context.js";

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

    const context = getContext<NavigationMenuContextValue>(
        NAVIGATION_MENU_CONTEXT_KEY,
    );

    function handleClick() {
        context?.setActiveItem(null);
    }

    const linkClasses =
        "block cursor-pointer rounded-md px-4 py-2 text-sm text-headline no-underline transition-colors hover:bg-base-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 {className}";
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
