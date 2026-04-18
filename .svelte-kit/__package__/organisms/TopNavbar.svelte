<script lang="ts">
    import ThemeToggle from "../atoms/ThemeToggle.svelte";
    import type { Component, Snippet } from "svelte";

    export interface TopNavbarNavItem {
        label: string;
        href: string;
        icon?: Component<{ size?: number; class?: string }>;
        iconFilled?: Component<{ size?: number; class?: string }>;
    }

    interface Props {
        brand?: string;
        brandHref?: string;
        /** `aria-label` on `<nav>` when multiple nav landmarks exist. */
        ariaLabel?: string;
        showThemeToggle?: boolean;
        className?: string;
        /** Slim mode: only the `nav` region (no full chrome bar). */
        embedded?: boolean;
        items?: TopNavbarNavItem[];
        navVariant?: "header" | "sidebar";
        currentPath?: string;
        preventNavigation?: boolean;
        onclick?: (event: Event) => void;
    }

    let {
        brand = "",
        brandHref,
        ariaLabel,
        showThemeToggle = true,
        className = "",
        embedded = false,
        items = [],
        navVariant = "header",
        currentPath = "",
        preventNavigation = false,
        onclick,
        nav,
        actions,
        ...restProps
    }: Props & { nav?: Snippet; actions?: Snippet } = $props();

    let isMenuOpen = $state(false);

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function handleNavLinkClick(event: MouseEvent) {
        if (preventNavigation) {
            event.preventDefault();
        }
        if (onclick) {
            onclick(event);
        }
    }

    /** App routes: prefix match except `/` and absolute URLs (exact match). */
    function isNavItemActive(href: string): boolean {
        if (href.startsWith("http://") || href.startsWith("https://")) {
            return currentPath === href;
        }
        if (href === "/") {
            return currentPath === "/";
        }
        return currentPath === href || currentPath.startsWith(`${href}/`);
    }

    const ulClasses = $derived.by(() => {
        return navVariant === "sidebar"
            ? "flex flex-col gap-1"
            : "flex flex-col gap-1 md:flex-row md:items-center md:justify-between";
    });

    function getNavItemClasses(): string {
        return "flex flex-col gap-1 grow h-full items-center justify-center min-h-0 min-w-0 relative shrink-0 cursor-pointer w-full md:w-auto";
    }

    function getIconContainerClasses(): string {
        return "focus-ring focus-ring--nav group/nav-item flex flex-col items-center justify-center overflow-clip relative rounded-[20px] shrink-0 text-nav-menu-item transition-colors duration-200 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover aria-[current=page]:bg-nav-menu-active aria-[current=page]:text-nav-menu-item-active";
    }

    function getStateLayerClasses(): string {
        return "box-border flex gap-1 h-10 items-center px-4 py-2 relative shrink-0";
    }

    function getLabelClasses(): string {
        return "font-medium leading-4 relative shrink-0 text-center text-nowrap tracking-[0.5px] whitespace-pre text-xs text-inherit";
    }

    function getIconWrapperClasses(): string {
        return "overflow-clip relative shrink-0 size-4 text-current";
    }
</script>

{#snippet defaultNavList()}
    <ul class="{ulClasses} list-none m-0 p-0">
        {#each items as item (item.href)}
            {@const isActive = isNavItemActive(item.href)}
            <li class={getNavItemClasses()}>
                <a
                    href={item.href}
                    class={getIconContainerClasses()}
                    onclick={handleNavLinkClick}
                    aria-current={isActive ? "page" : undefined}
                >
                    <div class={getStateLayerClasses()}>
                        {#if item.iconFilled && isActive}
                            {@const Icon = item.iconFilled}
                            <div class={getIconWrapperClasses()}>
                                <Icon size={16} class="w-4 h-4" />
                            </div>
                        {:else if item.icon}
                            {@const Icon = item.icon}
                            <div class={getIconWrapperClasses()}>
                                <Icon size={16} class="w-4 h-4" />
                            </div>
                        {/if}
                        <p class={getLabelClasses()}>
                            {item.label}
                        </p>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
{/snippet}

{#if embedded}
    <nav class={className} aria-label={ariaLabel} {...restProps}>
        {#if nav}
            {@render nav()}
        {:else}
            {@render defaultNavList()}
        {/if}
    </nav>
{:else}
    <nav
        class="border-b border-border bg-background sticky top-0 z-50 {className}"
        aria-label={ariaLabel}
        {...restProps}
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="shrink-0">
                    {#if brandHref}
                        <a
                            href={brandHref}
                            class="focus-ring text-xl font-bold text-headline hover:opacity-90"
                        >
                            {brand}
                        </a>
                    {:else}
                        <span class="text-xl font-bold text-headline">{brand}</span>
                    {/if}
                </div>

                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        {#if nav}
                            {@render nav()}
                        {:else if items.length > 0}
                            {@render defaultNavList()}
                        {/if}
                    </div>
                </div>

                <div class="hidden md:block">
                    <div class="ml-4 flex items-center space-x-4">
                        {@render actions?.()}
                        {#if showThemeToggle}
                            <ThemeToggle />
                        {/if}
                    </div>
                </div>

                <div class="md:hidden">
                    <button
                        type="button"
                        class="cursor-pointer text-description hover:text-body"
                        onclick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span class="text-2xl">☰</span>
                    </button>
                </div>
            </div>

            {#if isMenuOpen}
                <div class="md:hidden">
                    <div
                        class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border"
                    >
                        {#if nav}
                            {@render nav()}
                        {:else if items.length > 0}
                            {@render defaultNavList()}
                        {/if}
                        <div class="pt-4">
                            {@render actions?.()}
                            {#if showThemeToggle}
                                <div class="mt-2">
                                    <ThemeToggle />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </nav>
{/if}
