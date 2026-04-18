<script lang="ts">
    import type { Snippet } from "svelte";
    import { setContext } from "svelte";
    import { onMount } from "svelte";
    import NavigationMenuList from "./NavigationMenuList.svelte";
    import NavigationMenuItem from "./NavigationMenuItem.svelte";
    import NavigationMenuTrigger from "./NavigationMenuTrigger.svelte";
    import NavigationMenuContent from "./NavigationMenuContent.svelte";
    import NavigationMenuLink from "./NavigationMenuLink.svelte";

    import { generateId } from "../util/ssr-safe.js";
    import {
        NAVIGATION_MENU_CONTEXT_KEY,
        navigationMenuStableInstanceId,
        type NavigationMenuContextValue,
    } from "./navigation-menu-context.js";

    export interface NavigationMenuItemData {
        value: string;
        label: string;
        href?: string;
        content?: NavigationMenuLinkData[];
        children?: Snippet;
    }

    export interface NavigationMenuLinkData {
        href: string;
        label?: string;
        description?: string;
        children?: Snippet;
        asChild?: boolean;
    }

    interface Props {
        viewport?: boolean | "mobile";
        className?: string;
        items?: NavigationMenuItemData[];
        children?: Snippet;
        listClassName?: string;
        /** Panel id / `aria-controls` prefix; pass for SSR or multiple menus. If omitted with non-empty `items`, a deterministic hash is used. */
        menuId?: string;
    }

    let {
        viewport = true,
        className = "",
        items = [],
        children,
        listClassName = "",
        menuId = "",
        ...restProps
    }: Props = $props();

    let activeItem = $state<string | null>(null);
    let isMobile = $state(false);
    let containerElement = $state<HTMLElement | null>(null);

    const menuInstanceId = $derived(
        menuId.trim() !== ""
            ? menuId.trim()
            : items.length > 0
              ? navigationMenuStableInstanceId(items)
              : generateId("nav-menu"),
    );

    function setActiveItem(item: string | null) {
        activeItem = item;
    }

    function checkMobile() {
        if (viewport === "mobile") {
            isMobile = true;
        } else if (viewport === true) {
            isMobile = window.innerWidth < 768;
        } else {
            isMobile = false;
        }
    }

    onMount(() => {
        checkMobile();
        if (viewport !== false) {
            const handleResize = () => checkMobile();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    });

    const context: NavigationMenuContextValue = {
        get activeItem() {
            return activeItem;
        },
        setActiveItem,
        get isMobile() {
            return isMobile;
        },
        get menuInstanceId() {
            return menuInstanceId;
        },
    };

    setContext(NAVIGATION_MENU_CONTEXT_KEY, context);
</script>

<nav
    bind:this={containerElement}
    class="relative {className}"
    aria-label="Main navigation"
    {...restProps}
>
    {#if items.length > 0}
        <NavigationMenuList className={listClassName}>
            {#each items as item}
                <NavigationMenuItem value={item.value}>
                    {#if item.content && item.content.length > 0}
                        <NavigationMenuTrigger value={item.value}>
                            {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent value={item.value}>
                            {#if item.children}
                                {@render item.children()}
                            {:else}
                                <ul class="grid gap-2">
                                    {#each item.content as link}
                                        <li>
                                            <NavigationMenuLink
                                                href={link.href}
                                                asChild={link.asChild}
                                            >
                                                {#if link.children}
                                                    {@render link.children()}
                                                {:else if link.label}
                                                    <div
                                                        class="text-sm font-medium leading-none"
                                                    >
                                                        {link.label}
                                                    </div>
                                                    {#if link.description}
                                                        <p
                                                            class="line-clamp-2 text-sm leading-snug text-description"
                                                        >
                                                            {link.description}
                                                        </p>
                                                    {/if}
                                                {/if}
                                            </NavigationMenuLink>
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                        </NavigationMenuContent>
                    {:else if item.href}
                        <NavigationMenuLink href={item.href}>
                            {item.label}
                        </NavigationMenuLink>
                    {:else if item.children}
                        {@render item.children()}
                    {/if}
                </NavigationMenuItem>
            {/each}
        </NavigationMenuList>
    {:else if children}
        {@render children()}
    {/if}
</nav>

<style>
    :global([data-navigation-menu]) {
        position: relative;
    }
</style>
