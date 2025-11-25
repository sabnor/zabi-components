<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext, setContext } from "svelte";
    import { onMount } from "svelte";
    import NavigationMenuList from "./NavigationMenuList.svelte";
    import NavigationMenuItem from "./NavigationMenuItem.svelte";
    import NavigationMenuTrigger from "./NavigationMenuTrigger.svelte";
    import NavigationMenuContent from "./NavigationMenuContent.svelte";
    import NavigationMenuLink from "./NavigationMenuLink.svelte";

    interface NavigationMenuContext {
        activeItem: string | null;
        setActiveItem: (item: string | null) => void;
        isMobile: boolean;
    }

    const NAVIGATION_MENU_CONTEXT = Symbol("navigation-menu");

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
    }

    let {
        viewport = true,
        className = "",
        items = [],
        children,
        listClassName = "",
        ...restProps
    }: Props = $props();

    let activeItem = $state<string | null>(null);
    let isMobile = $state(false);
    let containerElement = $state<HTMLElement | null>(null);

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

    const context: NavigationMenuContext = {
        get activeItem() {
            return activeItem;
        },
        setActiveItem,
        get isMobile() {
            return isMobile;
        },
    };

    setContext(NAVIGATION_MENU_CONTEXT, context);
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
