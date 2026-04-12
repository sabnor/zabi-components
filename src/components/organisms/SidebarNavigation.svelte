<script lang="ts">
    import Badge from "../atoms/Badge.svelte";
    import Input from "../atoms/Input.svelte";
    import { Search, LogOut, Sun, Moon } from "@lucide/svelte";
    import type { Component } from "svelte";

    export interface SidebarNavigationItem {
        id: string;
        label: string;
        href: string;
        icon?: Component<{ size?: number; class?: string }>;
        badgeText?: string | number;
        badgeCount?: number;
        group?: "primary" | "secondary";
    }

    interface Props {
        mode?: "expanded" | "collapsed";
        items?: SidebarNavigationItem[];
        currentPath?: string;
        ariaLabel?: string;
        className?: string;
        showProfile?: boolean;
        profileName?: string;
        profileEmail?: string;
        profileInitials?: string;
        showSearch?: boolean;
        searchMode?: "input" | "button";
        searchPlaceholder?: string;
        searchValue?: string;
        showLogout?: boolean;
        logoutLabel?: string;
        showThemeToggle?: boolean;
        lightModeLabel?: string;
        isLightMode?: boolean;
        emptyStateTitle?: string;
        emptyStateDescription?: string;
        emptyStateActionLabel?: string;
        onNavigate?: (item: SidebarNavigationItem, event: MouseEvent) => void;
        onSearchClick?: () => void;
        onLogout?: () => void;
        onThemeToggle?: (nextIsLightMode: boolean) => void;
        onEmptyStateAction?: () => void;
        /**
         * Highlights a primary (e.g. category) row when the current route is a child
         * of that section, while `currentPath` points at the leaf (e.g. a component).
         */
        activePrimaryHref?: string;
    }

    let {
        mode = "expanded",
        items = [],
        currentPath = "",
        activePrimaryHref = "",
        ariaLabel = "Sidebar navigation",
        className = "",
        showProfile = true,
        profileName = "Zabi",
        profileEmail = "hello@zabi.dev",
        profileInitials = "ZA",
        showSearch = true,
        searchMode = "input",
        searchPlaceholder = "Search...",
        searchValue = $bindable(""),
        showLogout = true,
        logoutLabel = "Logout",
        showThemeToggle = true,
        lightModeLabel = "Light mode",
        isLightMode = $bindable(false),
        emptyStateTitle = "Create your first navigation item",
        emptyStateDescription = "Add your first sidebar item so users can start navigating your product.",
        emptyStateActionLabel = "Add navigation item",
        onNavigate,
        onSearchClick,
        onLogout,
        onThemeToggle,
        onEmptyStateAction,
        ...restProps
    }: Props = $props();

    const isCollapsed = $derived(mode === "collapsed");
    const normalizedSearchTerm = $derived(searchValue.trim().toLowerCase());
    const primaryItems = $derived(
        items.filter((item) => item.group !== "secondary"),
    );
    const secondaryItems = $derived(
        items.filter((item) => item.group === "secondary"),
    );
    function itemMatchesSearch(item: SidebarNavigationItem): boolean {
        return item.label.toLowerCase().includes(normalizedSearchTerm);
    }

    /** Keep the current (and section) row visible even when it does not match the filter. */
    function itemPinnedBySelection(item: SidebarNavigationItem): boolean {
        if (currentPath === item.href) {
            return true;
        }
        return Boolean(activePrimaryHref) && item.href === activePrimaryHref;
    }

    const filteredPrimaryItems = $derived(
        searchMode === "input" && normalizedSearchTerm
            ? primaryItems.filter(
                  (item) =>
                      itemMatchesSearch(item) || itemPinnedBySelection(item),
              )
            : primaryItems,
    );
    const filteredSecondaryItems = $derived(
        searchMode === "input" && normalizedSearchTerm
            ? secondaryItems.filter(
                  (item) =>
                      itemMatchesSearch(item) || itemPinnedBySelection(item),
              )
            : secondaryItems,
    );
    const hasFilteredItems = $derived(
        filteredPrimaryItems.length + filteredSecondaryItems.length > 0,
    );

    const containerClasses = $derived.by(() => {
        const widthClass = isCollapsed ? "w-[104px]" : "w-[266px]";
        const surfaceClasses = "bg-background border-border text-headline";
        const baseClasses =
            "flex h-full min-h-0 max-h-full flex-col overflow-hidden border-r py-6";

        return `${baseClasses} ${widthClass} ${surfaceClasses} ${className}`.trim();
    });

    const avatarClasses = $derived(
        "size-14 rounded-2xl bg-action-primary text-action-primary flex items-center justify-center font-semibold text-base shrink-0",
    );

    /** Search trigger (collapsed icon strip or button mode): matches nav item interaction tokens. */
    const searchControlStates =
        "text-nav-menu-item outline-none transition-colors duration-150 hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-base-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";

    const searchButtonClasses = $derived(
        `flex min-h-11 w-full cursor-pointer items-center justify-center rounded-2xl border border-input-border bg-input px-0 py-2.5 ${searchControlStates}`,
    );
    const searchTriggerClasses = $derived.by(() => {
        return isCollapsed
            ? searchButtonClasses
            : `flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-2xl border border-input-border bg-input px-4 py-2.5 text-left ${searchControlStates}`;
    });
    const iconContainerClasses = $derived(
        "flex size-6 shrink-0 items-center justify-center leading-none text-current",
    );
    const shouldRenderSearchButton = $derived(
        isCollapsed || searchMode === "button" || Boolean(onSearchClick),
    );

    function getTextToneClass(isMuted = false): string {
        return isMuted ? "text-description" : "text-headline";
    }

    function getNavItemClasses(item: SidebarNavigationItem): string {
        const isActive =
            currentPath === item.href ||
            (Boolean(activePrimaryHref) && item.href === activePrimaryHref);
        const layoutClasses = isCollapsed
            ? "flex min-h-11 items-center justify-center px-0 py-2.5"
            : "flex min-h-11 items-center gap-3 px-4 py-2.5";
        const structural =
            "w-full cursor-pointer rounded-lg no-underline transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";

        if (isActive) {
            /* Current page: keep active surface on hover (do not apply inactive hover bg). */
            return `${structural} ${layoutClasses} bg-nav-menu-active text-inherit hover:bg-nav-menu-active hover:text-inherit active:opacity-90`;
        }

        return `${structural} ${layoutClasses} text-nav-menu-item hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-base-200`;
    }

    function getControlButtonClasses(): string {
        const baseClasses =
            "w-full cursor-pointer rounded-lg text-nav-menu-item transition-colors duration-150 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-base-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";
        const layoutClasses = isCollapsed
            ? "flex min-h-11 items-center justify-center px-0 py-2.5"
            : "flex min-h-11 items-center gap-3 px-4 py-2.5";

        return `${baseClasses} ${layoutClasses}`;
    }

    const themeToggleContainerClasses = $derived(
        isCollapsed
            ? "flex w-full justify-center py-1"
            : "flex w-full justify-start py-1",
    );

    function handleNavigate(item: SidebarNavigationItem, event: MouseEvent) {
        if (onNavigate) {
            onNavigate(item, event);
        }
    }

    function handleSearchClick() {
        if (onSearchClick) {
            onSearchClick();
        }
    }

    function handleLogout() {
        if (onLogout) {
            onLogout();
        }
    }

    function handleThemeToggle() {
        isLightMode = !isLightMode;
        if (onThemeToggle) {
            onThemeToggle(isLightMode);
        }
    }

    function handleEmptyStateAction() {
        if (onEmptyStateAction) {
            onEmptyStateAction();
        }
    }

    function getItemBadgeText(item: SidebarNavigationItem): string | null {
        if (item.badgeText !== undefined) {
            return String(item.badgeText);
        }
        if (item.badgeCount !== undefined) {
            return String(item.badgeCount);
        }
        return null;
    }

    function getAriaCurrent(
        item: SidebarNavigationItem,
    ): "page" | "location" | undefined {
        if (currentPath === item.href) {
            return "page";
        }
        if (activePrimaryHref && item.href === activePrimaryHref) {
            return "location";
        }
        return undefined;
    }
</script>

<nav class={containerClasses} aria-label={ariaLabel} {...restProps}>
    <div class="flex w-full shrink-0 flex-col gap-6 px-2">
        {#if showProfile}
            <div class="flex w-full items-center gap-3">
                <div class={avatarClasses} aria-hidden="true">
                    {profileInitials}
                </div>
                {#if !isCollapsed}
                    <div class="min-w-0">
                        <p
                            class="truncate text-base font-bold {getTextToneClass()}"
                        >
                            {profileName}
                        </p>
                        <p class="truncate text-sm {getTextToneClass(true)}">
                            {profileEmail}
                        </p>
                    </div>
                {/if}
            </div>
        {/if}

        {#if showSearch}
            {#if shouldRenderSearchButton}
                <button
                    type="button"
                    class={searchTriggerClasses}
                    onclick={handleSearchClick}
                    aria-label={searchPlaceholder}
                >
                    <span
                        class="truncate text-base text-inherit transition-colors"
                    >
                        {searchValue || searchPlaceholder}
                    </span>
                </button>
            {:else}
                <div class="relative w-full">
                    <span
                        class="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2"
                        aria-hidden="true"
                    >
                        <Search size={20} class={getTextToneClass(true)} />
                    </span>
                    <Input
                        type="search"
                        bind:value={searchValue}
                        placeholder={searchPlaceholder}
                        aria-label={searchPlaceholder}
                        class="w-full min-w-0 rounded-2xl pl-12"
                    />
                </div>
            {/if}
        {/if}
    </div>

    <div
        class="flex min-h-0 flex-1 w-full flex-col gap-6 overflow-y-auto overflow-x-hidden overscroll-y-contain py-1"
        role="region"
        aria-label="Navigation links"
    >
        {#if hasFilteredItems}
            <ul
                class="flex w-full flex-col gap-2 px-2"
                aria-label="Primary navigation"
            >
                {#each filteredPrimaryItems as item (item.id)}
                    {@const Icon = item.icon}
                    <li>
                        <a
                            href={item.href}
                            class={getNavItemClasses(item)}
                            onclick={(event) => handleNavigate(item, event)}
                            aria-current={getAriaCurrent(item)}
                            aria-label={isCollapsed ? item.label : undefined}
                        >
                            {#if Icon}
                                <span
                                    class={iconContainerClasses}
                                    aria-hidden="true"
                                >
                                    <Icon size={20} />
                                </span>
                            {/if}
                            {#if !isCollapsed}
                                <span
                                    class="text-base leading-snug text-inherit"
                                    >{item.label}</span
                                >
                            {/if}
                            {#if !isCollapsed && getItemBadgeText(item) !== null}
                                <span class="ml-auto">
                                    <Badge
                                        variant="default"
                                        size="sm"
                                        text={getItemBadgeText(item) ?? ""}
                                    />
                                </span>
                            {/if}
                        </a>
                    </li>
                {/each}
            </ul>

            {#if filteredSecondaryItems.length > 0}
                <ul
                    class="flex w-full flex-col gap-3 px-2"
                    aria-label="Secondary navigation"
                >
                    {#each filteredSecondaryItems as item (item.id)}
                        {@const Icon = item.icon}
                        <li>
                            <a
                                href={item.href}
                                class={getNavItemClasses(item)}
                                onclick={(event) => handleNavigate(item, event)}
                                aria-current={getAriaCurrent(item)}
                                aria-label={isCollapsed
                                    ? item.label
                                    : undefined}
                            >
                                {#if Icon}
                                    <span
                                        class={iconContainerClasses}
                                        aria-hidden="true"
                                    >
                                        <Icon size={20} />
                                    </span>
                                {/if}
                                {#if !isCollapsed}
                                    <span
                                        class="text-base leading-snug text-inherit"
                                        >{item.label}</span
                                    >
                                {/if}
                            </a>
                        </li>
                    {/each}
                </ul>
            {/if}
        {:else}
            <div
                class="rounded-2xl border border-border border-dashed bg-base-50 px-4 py-5"
            >
                <h3 class="text-base font-semibold {getTextToneClass()}">
                    {normalizedSearchTerm && searchMode === "input"
                        ? "No matching navigation items"
                        : emptyStateTitle}
                </h3>
                <p class="mt-1 text-sm {getTextToneClass(true)}">
                    {normalizedSearchTerm && searchMode === "input"
                        ? `No results found for "${searchValue}". Try another keyword.`
                        : emptyStateDescription}
                </p>
                {#if !(normalizedSearchTerm && searchMode === "input")}
                    <button
                        type="button"
                        class="mt-4 inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-action-primary px-3 py-2 text-sm text-action-primary outline-none transition-colors hover:bg-action-primary-hover focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus"
                        onclick={handleEmptyStateAction}
                    >
                        {emptyStateActionLabel}
                    </button>
                {/if}
            </div>
        {/if}
    </div>

    {#if showLogout || showThemeToggle}
        <div
            class="flex w-full shrink-0 flex-col gap-2 border-t border-border pt-4 px-2"
        >
            {#if showLogout}
                <button
                    type="button"
                    class={getControlButtonClasses()}
                    onclick={handleLogout}
                >
                    <span class={iconContainerClasses} aria-hidden="true">
                        <LogOut size={20} />
                    </span>
                    {#if !isCollapsed}
                        <span class="text-base text-inherit">{logoutLabel}</span
                        >
                    {/if}
                </button>
            {/if}

            {#if showThemeToggle}
                <div class={themeToggleContainerClasses}>
                    <button
                        type="button"
                        class="inline-flex h-8 w-14 cursor-pointer items-center rounded-2xl p-1 outline-none transition-colors duration-150 hover:opacity-95 active:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus {isLightMode
                            ? 'bg-action-primary'
                            : 'bg-base-200'}"
                        onclick={handleThemeToggle}
                        role="switch"
                        aria-checked={isLightMode}
                        title={lightModeLabel}
                        aria-label={isLightMode
                            ? "Switch to dark mode"
                            : "Switch to light mode"}
                    >
                        <span
                            class="flex h-6 w-6 items-center justify-center rounded-xl leading-none shadow-sm transition-transform duration-150 active:scale-95 {isLightMode
                                ? 'translate-x-6 bg-base-900 text-action-primary'
                                : 'translate-x-0 bg-base-900 text-base-50'}"
                        >
                            {#if isLightMode}
                                <Sun size={14} />
                            {:else}
                                <Moon size={14} />
                            {/if}
                        </span>
                    </button>
                </div>
            {/if}
        </div>
    {/if}
</nav>
