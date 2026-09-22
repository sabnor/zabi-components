<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";
    import { cn } from "../util/cn.js";
    import {
        NAVIGATION_MENU_CONTEXT_KEY,
        type NavigationMenuContextValue,
    } from "./navigation-menu-context.js";

    interface Props {
        href?: string;
        asChild?: boolean;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        children?: Snippet;
    }

    let {
        href = "#",
        asChild = false,
        class: classAttr = "",
        className: legacyClass = "",
        children,
        ...restProps
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));

    const context = getContext<NavigationMenuContextValue>(
        NAVIGATION_MENU_CONTEXT_KEY,
    );

    function handleClick() {
        context?.setActiveItem(null);
    }

    const linkClasses =
        "focus-ring focus-ring--nav block cursor-pointer rounded-control px-4 py-2 text-sm text-nav-menu-item no-underline transition-colors duration-150 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover {className}";
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
