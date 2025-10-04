<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
    import type { NavigationEvents } from "../../types/events";
    import {
        createNavigationState,
        updateNavigationState,
        getNavigationClasses,
        createKeyboardNavigation,
        createMenuState,
        createItemClickHandler,
        getAccessibilityProps,
        getMenuButtonProps,
        getMenuListProps,
        getFocusableItems,
        breakpoints,
    } from "../../lib/navigation-utils";
    import NavigationItem from "./NavigationItem.svelte";

    // Navigation configuration
    export let variant:
        | "header"
        | "sidebar"
        | "breadcrumb"
        | "tabs"
        | "pagination" = "header";
    export let orientation: "horizontal" | "vertical" = "horizontal";
    export let density: "comfortable" | "compact" = "comfortable";
    export let responsive: boolean = true;
    export let collapsible: boolean = false;
    export let className: string = "";
    export let currentPath: string = "";
    export let isOpen: boolean = false;
    export let activeItem: string = "";
    export let items: Array<{
        id: string;
        label: string;
        href?: string;
        icon?: any;
        children?: Array<{
            id: string;
            label: string;
            href: string;
            icon?: any;
        }>;
        disabled?: boolean;
        external?: boolean;
    }> = [];
    export let ariaLabel: string = "";
    export let ariaDescribedBy: string = "";
    export let role: string = "navigation";

    const dispatch = createEventDispatcher<NavigationEvents>();

    let navigationElement: HTMLElement;
    let menuButton: HTMLButtonElement;
    let menuList: HTMLElement;

    // Create navigation configuration and state
    const config = { variant, orientation, density, responsive, collapsible };
    $: navigationState = updateNavigationState(
        createNavigationState(activeItem),
        { isOpen, activeItem },
    );

    // Event handlers
    const handleItemClick = createItemClickHandler(
        (updates) => {
            activeItem = updates.activeItem || activeItem;
            isOpen = updates.isOpen !== undefined ? updates.isOpen : isOpen;
        },
        config,
        dispatch,
    );

    const handleKeydown = createKeyboardNavigation(
        navigationState,
        (updates) => {
            isOpen = updates.isOpen !== undefined ? updates.isOpen : isOpen;
        },
        () => getFocusableItems(menuList),
        handleItemClick,
    );

    const menuState = createMenuState(
        navigationState,
        (updates) => {
            isOpen = updates.isOpen !== undefined ? updates.isOpen : isOpen;
        },
        () => getFocusableItems(menuList),
    );

    // Mouse event handlers
    function handleMouseEnter() {
        // Reset keyboard navigation flag
    }

    function handleMouseLeave() {
        if (variant === "header" && isOpen) {
            menuState.close();
        }
    }

    // Click outside handler
    function handleClickOutside(event: MouseEvent) {
        if (
            navigationElement &&
            !navigationElement.contains(event.target as Node)
        ) {
            menuState.close();
        }
    }

    // Resize handler for responsive behavior
    function handleResize() {
        if (window.innerWidth >= breakpoints.tablet && isOpen) {
            menuState.close();
        }
    }

    onMount(() => {
        document.addEventListener("click", handleClickOutside);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        };
    });

    // Computed classes and props
    $: computedClasses = getNavigationClasses(
        config,
        navigationState,
        className,
    );
    $: accessibilityProps = getAccessibilityProps(
        variant,
        ariaLabel,
        ariaDescribedBy,
        role,
    );
    $: menuButtonProps = getMenuButtonProps(isOpen);
    $: menuListProps = getMenuListProps(orientation, variant);
</script>

<nav
    bind:this={navigationElement}
    class={computedClasses}
    on:keydown={(e) => handleKeydown(e as unknown as KeyboardEvent)}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    {...accessibilityProps}
>
    {#if collapsible && variant !== "tabs"}
        <!-- Mobile Menu Button -->
        <button
            bind:this={menuButton}
            class="menu-button"
            on:click={menuState.toggle}
            {...menuButtonProps}
        >
            <span class="menu-button-text">Menu</span>
            <svg
                class="menu-button-icon text-text"
                class:rotated={isOpen}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
            >
                <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
        </button>
    {/if}

    <!-- Navigation List -->
    <ul
        bind:this={menuList}
        class="nav-list"
        class:open={isOpen}
        {...menuListProps}
    >
        {#each items as item (item.id)}
            <NavigationItem
                {item}
                isActive={activeItem === item.id}
                {currentPath}
                onItemClick={handleItemClick}
            />
        {/each}
    </ul>

    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
</nav>

<style>
    /* Modern Navigation Base Styles */
    .modern-navigation {
        position: relative;
        contain: layout style;
    }

    /* Menu Button for Collapsible Navigation */
    .menu-button {
        display: none;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-md);
        background: transparent;
        border: 1px solid rgb(var(--color-border));
        border-radius: var(--radius-md);
        color: rgb(var(--color-text));
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .menu-button:hover {
        background: rgb(var(--color-surface-hover));
    }

    .menu-button:focus {
        outline: 2px solid rgb(var(--color-focus-ring));
        outline-offset: 2px;
    }

    .menu-button-icon {
        width: 1.25rem;
        height: 1.25rem;
        transition: transform 0.2s ease;
    }

    .menu-button-icon.rotated {
        transform: rotate(90deg);
    }

    /* Navigation List */
    .nav-list {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: var(--spacing-sm);
    }

    .nav-list[role="menubar"] {
        flex-direction: row;
    }

    .nav-list[role="menu"] {
        flex-direction: column;
    }

    /* Navigation Items */
    .nav-item {
        position: relative;
    }

    .nav-item.active {
        background: rgb(var(--color-primary-light));
        border-radius: var(--radius-md);
    }

    /* Navigation Links and Buttons */
    .nav-link,
    .nav-button {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-md);
        text-decoration: none;
        color: rgb(var(--color-text));
        background: transparent;
        border: none;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .nav-link:hover,
    .nav-button:hover {
        background: rgb(var(--color-surface-hover));
        color: rgb(var(--color-text));
    }

    .nav-link:focus,
    .nav-button:focus {
        outline: 2px solid rgb(var(--color-focus-ring));
        outline-offset: 2px;
    }

    .nav-link[aria-current="page"],
    .nav-item.active .nav-link {
        background: rgb(var(--color-primary));
        color: rgb(var(--color-text-inverse));
    }

    .nav-link.disabled,
    .nav-button.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }

    .nav-link.external {
        position: relative;
    }

    /* Icons */
    .nav-icon {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
    }

    .external-icon {
        width: 0.75rem;
        height: 0.75rem;
        margin-left: var(--spacing-xs);
    }

    /* Submenu */
    .nav-submenu {
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 200px;
        background: rgb(var(--color-surface-elevated));
        border: 1px solid rgb(var(--color-border));
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        padding: var(--spacing-sm);
        list-style: none;
        margin: 0;
        z-index: var(--z-dropdown);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
    }

    .nav-item:hover .nav-submenu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .nav-subitem {
        margin: 0;
    }

    .nav-sublink {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm) var(--spacing-md);
        text-decoration: none;
        color: rgb(var(--color-text));
        border-radius: var(--radius-sm);
        transition: all 0.2s ease;
        font-size: 0.875rem;
    }

    .nav-sublink:hover {
        background: rgb(var(--color-surface-hover));
    }

    /* Variant Styles */
    .nav-header .nav-list {
        flex-direction: row;
        align-items: center;
    }

    .nav-sidebar .nav-list {
        flex-direction: column;
        align-items: stretch;
    }

    .nav-breadcrumb .nav-list {
        flex-direction: row;
        align-items: center;
    }

    .nav-breadcrumb .nav-item:not(:last-child)::after {
        content: "›";
        margin: 0 var(--spacing-sm);
        color: rgb(var(--color-text-tertiary));
    }

    .nav-tabs .nav-list {
        border-bottom: 1px solid rgb(var(--color-border));
    }

    .nav-tabs .nav-link {
        border-bottom: 2px solid transparent;
        border-radius: 0;
    }

    .nav-tabs .nav-link[aria-current="page"] {
        border-bottom-color: rgb(var(--color-primary));
        background: transparent;
        color: rgb(var(--color-primary));
    }

    .nav-pagination .nav-list {
        justify-content: center;
        gap: var(--spacing-xs);
    }

    .nav-pagination .nav-link {
        min-width: 2.5rem;
        height: 2.5rem;
        justify-content: center;
        border-radius: var(--radius-sm);
    }

    /* Density Variations */
    .density-compact .nav-link,
    .density-compact .nav-button {
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: 0.75rem;
    }

    .density-comfortable .nav-link,
    .density-comfortable .nav-button {
        padding: var(--spacing-sm) var(--spacing-md);
        font-size: 0.875rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .responsive .menu-button {
            display: flex;
        }

        .responsive .nav-list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgb(var(--color-surface-elevated));
            border: 1px solid rgb(var(--color-border));
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            padding: var(--spacing-sm);
            z-index: var(--z-dropdown);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease;
        }

        .responsive .nav-list.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .responsive .nav-item {
            width: 100%;
        }

        .responsive .nav-link,
        .responsive .nav-button {
            width: 100%;
            justify-content: flex-start;
        }
    }

    /* Skip Link */
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: rgb(var(--color-primary));
        color: rgb(var(--color-text-inverse));
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    }

    .skip-link:focus {
        top: 6px;
    }

    /* Focus Management */
    .modern-navigation:focus-within {
        outline: 2px solid rgb(var(--color-focus-ring));
        outline-offset: 2px;
        border-radius: var(--radius-md);
    }

    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
        .nav-link,
        .nav-button,
        .nav-submenu,
        .menu-button-icon {
            transition: none;
        }
    }

    /* High Contrast Mode */
    @media (prefers-contrast: high) {
        .nav-link,
        .nav-button {
            border: 1px solid transparent;
        }

        .nav-link:hover,
        .nav-button:hover {
            border-color: rgb(var(--color-text));
        }
    }
</style>
