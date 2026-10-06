<script lang="ts">
    import ThemeToggle from "../atoms/ThemeToggle.svelte";
    import IconButton from "../atoms/IconButton.svelte";
    import ExternalLink from "@lucide/svelte/icons/external-link";
    import Menu from "@lucide/svelte/icons/menu";
    import X from "@lucide/svelte/icons/x";
    import type { Component, Snippet } from "svelte";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import type { ThemeToggleLabels } from "../util/theme-mode.js";
    import { DEFAULT_TOP_NAVBAR_STRINGS, type TopNavbarStrings } from "../util/top-navbar.js";
    import { isInsideToastRegion } from "../util/focus-utils.js";

    export interface TopNavbarNavItem {
        label: string;
        href: string;
        icon?: Component<{ size?: number; class?: string }>;
        iconFilled?: Component<{ size?: number; class?: string }>;
        /** Marks the link and opens it in a new tab. Defaults to true for absolute URLs. */
        external?: boolean;
    }

    export type TopNavbarCollapseAt = "sm" | "md" | "lg" | "xl";

    interface Props {
        brand?: string;
        brandHref?: string;
        /** `aria-label` on `<nav>` when multiple nav landmarks exist. */
        ariaLabel?: string;
        showThemeToggle?: boolean;
        /**
         * How the theme toggle steps: `"two"` flips light and dark, `"three"`
         * goes through system, light and dark. As `modes` of ThemeToggle.
         */
        themeModes?: "two" | "three";
        /**
         * The `localStorage` key the theme choice is kept under; `null` keeps
         * nothing. As `storageKey` of ThemeToggle, whose default applies when
         * this is left out.
         */
        themeStorageKey?: string | null;
        /** The texts of the theme toggle's name, for another language. As `labels` of ThemeToggle. */
        themeLabels?: Partial<ThemeToggleLabels>;
        /** The words the bar says by itself: the menu button's two names and the note on a link that opens a new tab. */
        strings?: Partial<TopNavbarStrings>;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        /** Slim mode: only the `nav` region (no full chrome bar). */
        embedded?: boolean;
        items?: TopNavbarNavItem[];
        navVariant?: "header" | "sidebar";
        currentPath?: string;
        /**
         * Where the links move from the phone menu into the bar: at this
         * breakpoint and wider they sit in the row. Raise it when the row has
         * more items than fit at 768px.
         */
        collapseAt?: TopNavbarCollapseAt;
        preventNavigation?: boolean;
        onclick?: (event: Event) => void;
    }

    let {
        brand = "",
        brandHref,
        ariaLabel,
        showThemeToggle = true,
        themeModes = "two",
        themeStorageKey,
        themeLabels,
        strings,
        class: classAttr = "",
        className: legacyClass = "",
        embedded = false,
        items = [],
        navVariant = "header",
        currentPath = "",
        collapseAt = "md",
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

    const text = $derived({ ...DEFAULT_TOP_NAVBAR_STRINGS, ...strings });

    let isMenuOpen = $state(false);
    let navElement = $state<HTMLElement | null>(null);
    let panelElement = $state<HTMLElement | null>(null);
    let menuButtonHolder = $state<HTMLElement | null>(null);

    /**
     * The classes that move the links between the row and the menu, written
     * out for each breakpoint: Tailwind only generates a class it can read in
     * the source, so `${collapseAt}:hidden` would produce nothing. `query` is
     * the same breakpoint for the script (Tailwind's defaults).
     */
    const COLLAPSE: Record<
        TopNavbarCollapseAt,
        { row: string; menu: string; brand: string; query: string }
    > = {
        sm: { row: "hidden sm:block", menu: "sm:hidden", brand: "sm:shrink-0", query: "(min-width: 40rem)" },
        md: { row: "hidden md:block", menu: "md:hidden", brand: "md:shrink-0", query: "(min-width: 48rem)" },
        lg: { row: "hidden lg:block", menu: "lg:hidden", brand: "lg:shrink-0", query: "(min-width: 64rem)" },
        xl: { row: "hidden xl:block", menu: "xl:hidden", brand: "xl:shrink-0", query: "(min-width: 80rem)" },
    };
    const collapse = $derived(COLLAPSE[collapseAt] ?? COLLAPSE.md);

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function focusMenuButton() {
        menuButtonHolder?.querySelector("button")?.focus();
    }

    /**
     * The menu is a disclosure, not a dialog: nothing is trapped or locked, so
     * it has to get out of the way by itself whenever the user has moved on.
     */
    function handleWindowKeydown(event: KeyboardEvent) {
        // A menu inside the panel (a Dropdown, say) closes on Escape first.
        if (event.key !== "Escape" || !isMenuOpen || event.defaultPrevented) return;
        const focusInside = !!panelElement?.contains(document.activeElement);
        isMenuOpen = false;
        // The link that had focus is gone; without this, focus falls to <body>.
        if (focusInside) focusMenuButton();
    }

    /** A toast lies over the menu; a press on it, or focus in it, is not leaving the bar. */
    function isOutside(event: Event): boolean {
        if (isInsideToastRegion(event.target)) return false;
        return !!navElement && !(event.target instanceof Node && navElement.contains(event.target));
    }

    /**
     * A press outside the bar closes the menu once it is complete (the click),
     * not when it starts. The open menu pushes the page down, so closing it
     * on the way down moved the page back up under the pointer and the
     * control that was pressed never got its click.
     */
    let pressing = false;

    function handleOutsideClick(event: MouseEvent) {
        if (isMenuOpen && isOutside(event)) isMenuOpen = false;
    }

    /**
     * Focus that leaves the bar by the keyboard or from a script. A press
     * moves focus too, between its `mousedown` and its click (after the
     * finger has lifted, on a touch screen); that one is left to the click.
     */
    function handleOutsideFocus(event: FocusEvent) {
        if (isMenuOpen && !pressing && isOutside(event)) isMenuOpen = false;
    }

    /** Following a link in the menu: the page under it is about to change. */
    function handlePanelClick(event: MouseEvent) {
        if (event.target instanceof Element && event.target.closest("a[href]")) {
            isMenuOpen = false;
        }
    }

    // The route changed some other way (history, a link elsewhere on the page).
    let lastPath: string | undefined;
    $effect(() => {
        if (lastPath !== undefined && currentPath !== lastPath) isMenuOpen = false;
        lastPath = currentPath;
    });

    // Past the breakpoint the menu button is gone, so a menu left open could
    // not be closed, and it would still be open on the way back down.
    $effect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const wide = window.matchMedia(collapse.query);
        const close = () => {
            if (wide.matches) isMenuOpen = false;
        };
        wide.addEventListener("change", close);
        return () => wide.removeEventListener("change", close);
    });

    /**
     * The menu scrolls on its own only when it is taller than the room under
     * the bar. A scrolling box clips whatever reaches outside it, and a
     * Dropdown among the `actions` opens past the end of the menu: when the
     * menu fits, that has to stay visible, as it was before the menu could
     * scroll.
     */
    let panelScrolls = $state(false);
    $effect(() => {
        const panel = panelElement;
        const content = panel?.firstElementChild;
        if (!panel || !content) {
            panelScrolls = false;
            return;
        }
        const measure = () => {
            const room = parseFloat(getComputedStyle(panel).maxHeight);
            panelScrolls = Number.isFinite(room) && content.getBoundingClientRect().height > room;
        };
        measure();
        window.addEventListener("resize", measure);
        const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
        observer?.observe(content);
        return () => {
            window.removeEventListener("resize", measure);
            observer?.disconnect();
        };
    });

    function handleNavLinkClick(event: MouseEvent) {
        if (preventNavigation) {
            event.preventDefault();
        }
        if (onclick) {
            onclick(event);
        }
    }

    /** Absolute URLs leave the site, so they are marked and open in a new tab.
     * `external` overrides that for same-origin links that leave the app. */
    function isExternal(item: TopNavbarNavItem): boolean {
        return item.external ?? (item.href.startsWith("http://") || item.href.startsWith("https://"));
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

    /** Where a list of links is drawn: in the bar, in the phone menu, or alone (`embedded`). */
    type NavListPlace = "row" | "menu" | "embedded";

    function getListClasses(place: NavListPlace): string {
        if (place === "embedded" || navVariant === "sidebar") return ulClasses;
        // The row only shows at the breakpoint and wider, and the menu only
        // below it, so neither needs a breakpoint of its own.
        return place === "row"
            ? "flex flex-row items-center justify-between gap-1"
            : "flex flex-col gap-1";
    }

    function getNavItemClasses(place: NavListPlace = "embedded"): string {
        const base =
            "flex flex-col gap-1 grow h-full items-center justify-center min-h-0 min-w-0 relative shrink-0 cursor-pointer";
        if (place === "row") return `${base} w-auto`;
        if (place === "menu") return `${base} w-full`;
        return `${base} w-full md:w-auto`;
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
                  "text-nav-menu-item hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-nav-menu-active",
              );
    }

    function getStateLayerClasses(): string {
        return "box-border flex gap-1 h-10 pointer-coarse:h-11 items-center px-4 py-2 relative shrink-0";
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

{#snippet defaultNavList(place: NavListPlace)}
    <ul class="{getListClasses(place)} list-none m-0 p-0">
        {#each items as item (item.href)}
            {@const isActive = isNavItemActive(item.href)}
            {@const external = isExternal(item)}
            <li class={getNavItemClasses(place)}>
                <!-- In the menu the link is the whole row, not a pill as wide as its label. -->
                <a
                    href={item.href}
                    class={cn(getIconContainerClasses(isActive), place === "menu" && "w-full")}
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
                            <span class="sr-only">{text.opensInNewTab}</span>
                        {/if}
                    </div>
                </a>
            </li>
        {/each}
    </ul>
{/snippet}

<svelte:window
    onkeydown={handleWindowKeydown}
    onmousedowncapture={() => (pressing = true)}
    onmouseupcapture={() => (pressing = false)}
    onpointercancelcapture={() => (pressing = false)}
    onclickcapture={handleOutsideClick}
    onfocusin={handleOutsideFocus}
/>

{#if embedded}
    <nav class={className} aria-label={ariaLabel} {...restProps}>
        {#if nav}
            {@render nav()}
        {:else}
            {@render defaultNavList("embedded")}
        {/if}
    </nav>
{:else}
    <nav
        bind:this={navElement}
        class={cn("border-b border-border bg-background sticky top-0 z-sticky", className)}
        aria-label={ariaLabel}
        {...restProps}
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Beside the menu button the brand gives way and is cut short,
                so the button stays on screen however long the name or large the
                text. In the row it keeps its full width, as before. -->
                <div class={cn("flex min-w-0", collapse.brand)}>
                    {#if brandHref}
                        <a
                            href={brandHref}
                            class="focus-ring block min-w-0 truncate text-xl font-bold text-headline transition-colors hover:text-link active:text-link pointer-coarse:min-h-11 pointer-coarse:leading-[2.75rem]"
                        >
                            {brand}
                        </a>
                    {:else}
                        <span class="block min-w-0 truncate text-xl font-bold text-headline">{brand}</span>
                    {/if}
                </div>

                <div class={collapse.row}>
                    <div class="ml-10 flex items-center space-x-4">
                        {#if nav}
                            {@render nav()}
                        {:else if items.length > 0}
                            {@render defaultNavList("row")}
                        {/if}
                    </div>
                </div>

                <div class={collapse.row}>
                    <div class="ml-4 flex items-center space-x-4">
                        {@render actions?.()}
                        {#if showThemeToggle}
                            <ThemeToggle modes={themeModes} storageKey={themeStorageKey} labels={themeLabels} />
                        {/if}
                    </div>
                </div>

                <div bind:this={menuButtonHolder} class={cn("ms-2 shrink-0", collapse.menu)}>
                    <!--
                      Was a bare ☰ glyph in a text-2xl span: font-dependent,
                      off the icon scale, and with no disclosure semantics, so
                      a screen reader could not tell the menu was open.
                    -->
                    <IconButton
                        variant="ghost"
                        label={isMenuOpen ? text.closeMenu : text.openMenu}
                        onclick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls={isMenuOpen ? mobileMenuId : undefined}
                    >
                        {#if isMenuOpen}
                            <X size={20} />
                        {:else}
                            <Menu size={20} />
                        {/if}
                    </IconButton>
                </div>
            </div>

            <!-- `aria-controls` above names this panel only while it exists.
            Keeping it in the DOM, hidden, would render `nav` and `actions` a
            second time on every page for every desktop visitor: duplicate ids
            from the caller's snippets, and a second ThemeToggle mounted. -->
            {#if isMenuOpen}
                <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
                <div
                    bind:this={panelElement}
                    class={cn("topnavbar-menu", collapse.menu)}
                    id={mobileMenuId}
                    data-scrolls={panelScrolls ? "" : undefined}
                    onclick={handlePanelClick}
                >
                    <div
                        class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border"
                    >
                        {#if nav}
                            {@render nav()}
                        {:else if items.length > 0}
                            {@render defaultNavList("menu")}
                        {/if}
                        <div class="pt-4">
                            {@render actions?.()}
                            {#if showThemeToggle}
                                <div class="mt-2">
                                    <ThemeToggle modes={themeModes} storageKey={themeStorageKey} labels={themeLabels} />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </nav>
{/if}

<style>
    /*
     * The bar is sticky, so an open menu taller than the screen could never be
     * scrolled into view: the page moved under it and its last control stayed
     * below the fold. It takes what is left of the screen under the 4rem bar
     * (and its 1px border) and scrolls on its own, without handing the scroll
     * on to the page when it reaches an end. `dvh` follows a phone's
     * collapsing address bar; `vh` is for browsers without it. In a web app
     * installed to the home screen the bar starts below the status bar, so
     * that inset comes off as well, or the menu's end would be under the
     * bottom of the screen by as much.
     *
     * Only a menu that does not fit scrolls (`data-scrolls`, set by the
     * script): a scrolling box would clip a Dropdown that opens out of it.
     */
    .topnavbar-menu {
        max-height: calc(100vh - 4rem - 1px - env(safe-area-inset-top, 0px));
        max-height: calc(100dvh - 4rem - 1px - env(safe-area-inset-top, 0px));
    }

    .topnavbar-menu[data-scrolls] {
        overflow-y: auto;
        overscroll-behavior: contain;
    }
</style>
