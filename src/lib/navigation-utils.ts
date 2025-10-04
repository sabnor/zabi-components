// Navigation utilities for common navigation patterns
import type { NavigationEvents } from '../types/events';

export interface NavigationItem {
    id: string;
    label: string;
    href?: string;
    icon?: any;
    children?: NavigationItem[];
    disabled?: boolean;
    external?: boolean;
}

export interface NavigationConfig {
    variant: 'header' | 'sidebar' | 'breadcrumb' | 'tabs' | 'pagination';
    orientation: 'horizontal' | 'vertical';
    density: 'comfortable' | 'compact';
    responsive: boolean;
    collapsible: boolean;
}

export interface NavigationState {
    isOpen: boolean;
    activeItem: string;
    currentFocusIndex: number;
    isKeyboardNavigation: boolean;
}

/**
 * Creates initial navigation state
 */
export function createNavigationState(activeItem: string = ''): NavigationState {
    return {
        isOpen: false,
        activeItem,
        currentFocusIndex: -1,
        isKeyboardNavigation: false,
    };
}

/**
 * Updates navigation state
 */
export function updateNavigationState(
    state: NavigationState,
    updates: Partial<NavigationState>
): NavigationState {
    return { ...state, ...updates };
}

/**
 * Navigation class generators
 */
export const navigationClasses = {
    density: {
        compact: "density-compact",
        comfortable: "density-comfortable",
    },
    variant: {
        header: "nav-header",
        sidebar: "nav-sidebar",
        breadcrumb: "nav-breadcrumb",
        tabs: "nav-tabs",
        pagination: "nav-pagination",
    },
} as const;

/**
 * Generates computed navigation classes
 */
export function getNavigationClasses(
    config: NavigationConfig,
    state: NavigationState,
    className: string = ''
): string {
    return [
        "modern-navigation",
        navigationClasses.variant[config.variant],
        `nav-${config.orientation}`,
        navigationClasses.density[config.density],
        config.responsive ? "responsive" : "",
        config.collapsible ? "collapsible" : "",
        state.isOpen ? "open" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");
}

/**
 * Keyboard navigation handlers
 */
export function createKeyboardNavigation(
    state: NavigationState,
    updateState: (updates: Partial<NavigationState>) => void,
    getFocusableItems: () => HTMLElement[],
    onItemClick: (item: NavigationItem, event: MouseEvent) => void
) {
    return function handleKeydown(event: KeyboardEvent) {
        if (!state.isOpen && event.key !== "Enter" && event.key !== " ") return;

        updateState({ isKeyboardNavigation: true });

        switch (event.key) {
            case "Enter":
            case " ":
                event.preventDefault();
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement?.getAttribute("role") === "menuitem") {
                    activeElement.click();
                }
                break;

            case "Escape":
                if (state.isOpen) {
                    updateState({ isOpen: false });
                }
                break;

            case "ArrowDown":
                event.preventDefault();
                focusNextItem(state, updateState, getFocusableItems);
                break;

            case "ArrowUp":
                event.preventDefault();
                focusPreviousItem(state, updateState, getFocusableItems);
                break;

            case "ArrowRight":
                event.preventDefault();
                if (state.isOpen) {
                    focusNextItem(state, updateState, getFocusableItems);
                }
                break;

            case "ArrowLeft":
                event.preventDefault();
                focusPreviousItem(state, updateState, getFocusableItems);
                break;

            case "Home":
                event.preventDefault();
                focusFirstItem(state, updateState, getFocusableItems);
                break;

            case "End":
                event.preventDefault();
                focusLastItem(state, updateState, getFocusableItems);
                break;
        }
    };
}

/**
 * Focus management functions
 */
function focusNextItem(
    state: NavigationState,
    updateState: (updates: Partial<NavigationState>) => void,
    getFocusableItems: () => HTMLElement[]
) {
    const focusableItems = getFocusableItems();
    if (focusableItems.length === 0) return;

    const newIndex = (state.currentFocusIndex + 1) % focusableItems.length;
    updateState({ currentFocusIndex: newIndex });
    focusableItems[newIndex]?.focus();
}

function focusPreviousItem(
    state: NavigationState,
    updateState: (updates: Partial<NavigationState>) => void,
    getFocusableItems: () => HTMLElement[]
) {
    const focusableItems = getFocusableItems();
    if (focusableItems.length === 0) return;

    const newIndex = state.currentFocusIndex <= 0
        ? focusableItems.length - 1
        : state.currentFocusIndex - 1;
    updateState({ currentFocusIndex: newIndex });
    focusableItems[newIndex]?.focus();
}

function focusFirstItem(
    state: NavigationState,
    updateState: (updates: Partial<NavigationState>) => void,
    getFocusableItems: () => HTMLElement[]
) {
    const focusableItems = getFocusableItems();
    if (focusableItems.length === 0) return;

    updateState({ currentFocusIndex: 0 });
    focusableItems[0]?.focus();
}

function focusLastItem(
    state: NavigationState,
    updateState: (updates: Partial<NavigationState>) => void,
    getFocusableItems: () => HTMLElement[]
) {
    const focusableItems = getFocusableItems();
    if (focusableItems.length === 0) return;

    const lastIndex = focusableItems.length - 1;
    updateState({ currentFocusIndex: lastIndex });
    focusableItems[lastIndex]?.focus();
}

/**
 * Gets focusable items from a container
 */
export function getFocusableItems(container: HTMLElement): HTMLElement[] {
    return Array.from(
        container.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
    ) as HTMLElement[];
}

/**
 * Menu state management
 */
export function createMenuState(
    state: NavigationState,
    updateState: (updates: Partial<NavigationState>) => void,
    getFocusableItems: () => HTMLElement[]
) {
    return {
        toggle: () => {
            const newIsOpen = !state.isOpen;
            updateState({ isOpen: newIsOpen });
            if (newIsOpen) {
                setTimeout(() => {
                    const focusableItems = getFocusableItems();
                    if (focusableItems.length > 0) {
                        updateState({ currentFocusIndex: 0 });
                        focusableItems[0]?.focus();
                    }
                }, 100);
            }
        },
        open: () => {
            updateState({ isOpen: true });
            setTimeout(() => {
                const focusableItems = getFocusableItems();
                if (focusableItems.length > 0) {
                    updateState({ currentFocusIndex: 0 });
                    focusableItems[0]?.focus();
                }
            }, 100);
        },
        close: () => {
            updateState({ isOpen: false });
        },
    };
}

/**
 * Item click handler
 */
export function createItemClickHandler(
    updateState: (updates: Partial<NavigationState>) => void,
    config: NavigationConfig,
    dispatch: (event: keyof NavigationEvents, detail: any) => void
) {
    return function handleItemClick(item: NavigationItem, event: MouseEvent) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        updateState({ activeItem: item.id });
        dispatch("item-click", { item, event });

        if (config.collapsible && config.variant !== "tabs") {
            updateState({ isOpen: false });
        }
    };
}

/**
 * Responsive breakpoints
 */
export const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
} as const;

/**
 * Accessibility attributes
 */
export function getAccessibilityProps(
    variant: NavigationConfig['variant'],
    ariaLabel?: string,
    ariaDescribedBy?: string,
    role: string = 'navigation'
) {
    return {
        "aria-label": ariaLabel || `${variant} navigation`,
        "aria-describedby": ariaDescribedBy || undefined,
        role: role,
        "data-variant": variant,
    };
}

export function getMenuButtonProps(isOpen: boolean) {
    return {
        "aria-expanded": isOpen,
        "aria-controls": "navigation-menu",
        "aria-haspopup": "menu" as const,
        "aria-label": "Toggle navigation menu",
    };
}

export function getMenuListProps(orientation: NavigationConfig['orientation'], variant: NavigationConfig['variant']) {
    return {
        id: "navigation-menu",
        role: orientation === "horizontal" ? "menubar" : "menu",
        "aria-orientation": orientation,
        "aria-label": `${variant} menu`,
    };
}

