<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
    import type { NavigationEvents } from "../../types/events";

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

    // Navigation state
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

    // Accessibility
    export let ariaLabel: string = "";
    export let ariaDescribedBy: string = "";
    export let role: string = "navigation";

    const dispatch = createEventDispatcher<NavigationEvents>();

    let navigationElement: HTMLElement;
    let menuButton: HTMLButtonElement;
    let menuList: HTMLElement;
    let currentFocusIndex = -1;
    let isKeyboardNavigation = false;

    // Responsive breakpoints
    const breakpoints = {
        mobile: 768,
        tablet: 1024,
        desktop: 1280,
    };

    // Density classes
    const densityClasses = {
        compact: "density-compact",
        comfortable: "density-comfortable",
    };

    // Variant classes
    const variantClasses = {
        header: "nav-header",
        sidebar: "nav-sidebar",
        breadcrumb: "nav-breadcrumb",
        tabs: "nav-tabs",
        pagination: "nav-pagination",
    };

    // Computed classes
    $: computedClasses = [
        "modern-navigation",
        variantClasses[variant],
        `nav-${orientation}`,
        densityClasses[density],
        responsive ? "responsive" : "",
        collapsible ? "collapsible" : "",
        isOpen ? "open" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Keyboard navigation
    function handleKeydown(event: KeyboardEvent) {
        if (!isOpen && event.key !== "Enter" && event.key !== " ") return;

        isKeyboardNavigation = true;

        switch (event.key) {
            case "Enter":
            case " ":
                event.preventDefault();
                if (menuButton && document.activeElement === menuButton) {
                    toggleMenu();
                } else {
                    const activeElement = document.activeElement as HTMLElement;
                    if (
                        activeElement &&
                        activeElement.getAttribute("role") === "menuitem"
                    ) {
                        activeElement.click();
                    }
                }
                break;

            case "Escape":
                if (isOpen) {
                    closeMenu();
                    menuButton?.focus();
                }
                break;

            case "ArrowDown":
                event.preventDefault();
                if (orientation === "vertical") {
                    focusNextItem();
                } else {
                    if (!isOpen) {
                        openMenu();
                    }
                    focusNextItem();
                }
                break;

            case "ArrowUp":
                event.preventDefault();
                if (orientation === "vertical") {
                    focusPreviousItem();
                } else {
                    focusPreviousItem();
                }
                break;

            case "ArrowRight":
                event.preventDefault();
                if (orientation === "horizontal") {
                    focusNextItem();
                }
                break;

            case "ArrowLeft":
                event.preventDefault();
                if (orientation === "horizontal") {
                    focusPreviousItem();
                }
                break;

            case "Home":
                event.preventDefault();
                focusFirstItem();
                break;

            case "End":
                event.preventDefault();
                focusLastItem();
                break;
        }
    }

    // Focus management
    function focusNextItem() {
        const focusableItems = getFocusableItems();
        if (focusableItems.length === 0) return;

        currentFocusIndex = (currentFocusIndex + 1) % focusableItems.length;
        focusableItems[currentFocusIndex]?.focus();
    }

    function focusPreviousItem() {
        const focusableItems = getFocusableItems();
        if (focusableItems.length === 0) return;

        currentFocusIndex =
            currentFocusIndex <= 0
                ? focusableItems.length - 1
                : currentFocusIndex - 1;
        focusableItems[currentFocusIndex]?.focus();
    }

    function focusFirstItem() {
        const focusableItems = getFocusableItems();
        if (focusableItems.length === 0) return;

        currentFocusIndex = 0;
        focusableItems[0]?.focus();
    }

    function focusLastItem() {
        const focusableItems = getFocusableItems();
        if (focusableItems.length === 0) return;

        currentFocusIndex = focusableItems.length - 1;
        focusableItems[currentFocusIndex]?.focus();
    }

    function getFocusableItems(): HTMLElement[] {
        if (!menuList) return [];

        return Array.from(
            menuList.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
        ) as HTMLElement[];
    }

    // Menu state management
    function toggleMenu() {
        isOpen = !isOpen;
        dispatch("toggle", { open: isOpen });

        if (isOpen) {
            setTimeout(() => {
                focusFirstItem();
            }, 100);
        }
    }

    function openMenu() {
        isOpen = true;
        dispatch("open");

        setTimeout(() => {
            focusFirstItem();
        }, 100);
    }

    function closeMenu() {
        isOpen = false;
        dispatch("close");
    }

    // Item click handler
    function handleItemClick(item: any, event: MouseEvent) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        activeItem = item.id;
        dispatch("item-click", {
            item,
            event: event as MouseEvent,
        });

        if (collapsible && variant !== "tabs") {
            closeMenu();
        }
    }

    // Mouse event handlers
    function handleMouseEnter() {
        isKeyboardNavigation = false;
    }

    function handleMouseLeave() {
        if (variant === "header" && isOpen) {
            closeMenu();
        }
    }

    // Click outside handler
    function handleClickOutside(event: MouseEvent) {
        if (
            navigationElement &&
            !navigationElement.contains(event.target as Node)
        ) {
            closeMenu();
        }
    }

    // Resize handler for responsive behavior
    function handleResize() {
        if (window.innerWidth >= breakpoints.tablet && isOpen) {
            closeMenu();
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

    // Accessibility attributes
    $: accessibilityProps = {
        "aria-label": ariaLabel || `${variant} navigation`,
        "aria-describedby": ariaDescribedBy || undefined,
        role: role,
        "data-variant": variant,
        "data-orientation": orientation,
    };

    $: menuButtonProps = {
        "aria-expanded": isOpen,
        "aria-controls": "navigation-menu",
        "aria-haspopup": "menu" as const,
        "aria-label": "Toggle navigation menu",
    };

    $: menuListProps = {
        id: "navigation-menu",
        role: orientation === "horizontal" ? "menubar" : "menu",
        "aria-orientation": orientation,
        "aria-label": `${variant} menu`,
    };
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
            on:click={toggleMenu}
            {...menuButtonProps}
        >
            <span class="menu-button-text">Menu</span>
            <svg
                class="menu-button-icon"
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
            <li class="nav-item" class:active={activeItem === item.id}>
                {#if item.href}
                    <a
                        href={item.href}
                        class="nav-link"
                        class:disabled={item.disabled}
                        class:external={item.external}
                        on:click={(e) =>
                            handleItemClick(item, e as unknown as MouseEvent)}
                        aria-current={currentPath === item.href
                            ? "page"
                            : undefined}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                    >
                        {#if item.icon}
                            <svelte:component
                                this={item.icon}
                                class="nav-icon"
                            />
                        {/if}
                        <span class="nav-label">{item.label}</span>
                        {#if item.external}
                            <svg
                                class="external-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                aria-hidden="true"
                            >
                                <path
                                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                />
                                <polyline points="15,3 21,3 21,9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        {/if}
                    </a>
                {:else}
                    <button
                        class="nav-button"
                        class:disabled={item.disabled}
                        on:click={(e) =>
                            handleItemClick(item, e as unknown as MouseEvent)}
                        disabled={item.disabled}
                    >
                        {#if item.icon}
                            <svelte:component
                                this={item.icon}
                                class="nav-icon"
                            />
                        {/if}
                        <span class="nav-label">{item.label}</span>
                    </button>
                {/if}

                {#if item.children && item.children.length > 0}
                    <ul class="nav-submenu" role="menu">
                        {#each item.children as child (child.id)}
                            <li class="nav-subitem">
                                <a
                                    href={child.href}
                                    class="nav-sublink"
                                    on:click={(e) =>
                                        handleItemClick(
                                            child,
                                            e as unknown as MouseEvent,
                                        )}
                                    aria-current={currentPath === child.href
                                        ? "page"
                                        : undefined}
                                >
                                    {#if child.icon}
                                        <svelte:component
                                            this={child.icon}
                                            class="nav-icon"
                                        />
                                    {/if}
                                    <span class="nav-label">{child.label}</span>
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </li>
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
