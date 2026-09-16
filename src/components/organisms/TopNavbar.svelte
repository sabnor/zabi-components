<script lang="ts">
    import ThemeToggle from "../atoms/ThemeToggle.svelte";
    import IconButton from "../atoms/IconButton.svelte";
    import { ExternalLink, Menu, X } from "@lucide/svelte";
    import type { Component, Snippet } from "svelte";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";

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
        class?: string;
        /** @deprecated use `class`. */
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
        class: classAttr = "",
        className: legacyClass = "",
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

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));

    const mobileMenuId = generateId("topnavbar-menu");

    let isMenuOpen = $state(false);

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function handleWindowKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isMenuOpen) {
            isMenuOpen = false;
        }
    }

    function handleNavLinkClick(event: MouseEvent) {
        if (preventNavigation) {
            event.preventDefault();
        }
        if (onclick) {
            onclick(event);
        }
    }

    /** Absolute URLs leave the site, so they are marked and open in a new tab. */
    function isExternal(href: string): boolean {
        return href.startsWith("http://") || href.startsWith("https://");
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

    /**
     * The active state is resolved here rather than with
     * `aria-[current=page]:text-nav-menu-item-active`.
     *
     * That variant was dead: the semantic utilities are hand-written in
     * app.css and sit outside Tailwind's cascade layer, so an unlayered
     * `.text-nav-menu-item` beats anything Tailwind generates for a variant of
     * the same property. The fill happened to survive only because no plain
     * `bg-*` class competed with it — so the selected tab painted its pill but
     * kept the idle label colour (#27272a where #3c52ba was intended), which
     * is exactly the "active state does almost nothing" failure the sidebar
     * had.
     *
     * Plain classes chosen in JS cannot lose that way.
     */
    function getIconContainerClasses(isActive: boolean): string {
        const base =
            "focus-ring focus-ring--nav group/nav-item flex flex-col items-center justify-center overflow-clip relative rounded-pill shrink-0 transition-colors duration-200 outline-none";
        return isActive
            ? cn(base, "bg-nav-menu-active text-nav-menu-item-active")
            : cn(
                  base,
                  "text-nav-menu-item hover:bg-nav-menu-hover hover:text-nav-menu-item-hover",
              );
    }

    function getStateLayerClasses(): string {
        return "box-border flex gap-1 h-10 items-center px-4 py-2 relative shrink-0";
    }

    function getLabelClasses(): string {
        // `whitespace-pre` used to sit beside `text-nowrap` — same property,
        // and it preserved literal whitespace as a side effect.
        return "font-medium leading-4 relative shrink-0 text-center text-nowrap tracking-wide text-xs text-inherit";
    }

    function getIconWrapperClasses(): string {
        return "overflow-clip relative shrink-0 size-4 text-current";
    }
</script>

{#snippet defaultNavList()}
    <ul class="{ulClasses} list-none m-0 p-0">
        {#each items as item (item.href)}
            {@const isActive = isNavItemActive(item.href)}
            {@const external = isExternal(item.href)}
            <li class={getNavItemClasses()}>
                <a
                    href={item.href}
                    class={getIconContainerClasses(isActive)}
                    onclick={handleNavLinkClick}
                    aria-current={isActive ? "page" : undefined}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
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
                        <span class={getLabelClasses()}>
                            {item.label}
                        </span>
                        {#if external}
                            <ExternalLink
                                size={12}
                                class="shrink-0 text-current opacity-70"
                                aria-hidden="true"
                            />
                            <span class="sr-only">(opens in a new tab)</span>
                        {/if}
                    </div>
                </a>
            </li>
        {/each}
    </ul>
{/snippet}

<svelte:window onkeydown={handleWindowKeydown} />

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
        class={cn("border-b border-border bg-background sticky top-0 z-sticky", className)}
        aria-label={ariaLabel}
        {...restProps}
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="shrink-0">
                    {#if brandHref}
                        <a
                            href={brandHref}
                            class="focus-ring text-xl font-bold text-headline transition-colors hover:text-link"
                        >
                            {brand}
                        </a>
                    {:else}
                        <span class="text-xl font-bold text-headline">{brand}</span>
                    {/if}
                </div>

                <div class="hidden md:block">
                    <div class="ml-10 flex items-center space-x-4">
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
                    <!--
                      Was a bare ☰ glyph in a text-2xl span: font-dependent,
                      off the icon scale, and with no disclosure semantics, so
                      a screen reader could not tell the menu was open.
                    -->
                    <IconButton
                        variant="ghost"
                        label={isMenuOpen ? "Close menu" : "Open menu"}
                        onclick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls={mobileMenuId}
                    >
                        {#if isMenuOpen}
                            <X size={20} />
                        {:else}
                            <Menu size={20} />
                        {/if}
                    </IconButton>
                </div>
            </div>

            {#if isMenuOpen}
                <div class="md:hidden" id={mobileMenuId}>
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
