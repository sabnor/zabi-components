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
export declare function createNavigationState(activeItem?: string): NavigationState;
/**
 * Updates navigation state
 */
export declare function updateNavigationState(state: NavigationState, updates: Partial<NavigationState>): NavigationState;
/**
 * Navigation class generators
 */
export declare const navigationClasses: {
    readonly density: {
        readonly compact: "density-compact";
        readonly comfortable: "density-comfortable";
    };
    readonly variant: {
        readonly header: "nav-header";
        readonly sidebar: "nav-sidebar";
        readonly breadcrumb: "nav-breadcrumb";
        readonly tabs: "nav-tabs";
        readonly pagination: "nav-pagination";
    };
};
/**
 * Generates computed navigation classes
 */
export declare function getNavigationClasses(config: NavigationConfig, state: NavigationState, className?: string): string;
/**
 * Keyboard navigation handlers
 */
export declare function createKeyboardNavigation(state: NavigationState, updateState: (updates: Partial<NavigationState>) => void, getFocusableItems: () => HTMLElement[], onItemClick: (item: NavigationItem, event: MouseEvent) => void): (event: KeyboardEvent) => void;
/**
 * Gets focusable items from a container
 */
export declare function getFocusableItems(container: HTMLElement): HTMLElement[];
/**
 * Menu state management
 */
export declare function createMenuState(state: NavigationState, updateState: (updates: Partial<NavigationState>) => void, getFocusableItems: () => HTMLElement[]): {
    toggle: () => void;
    open: () => void;
    close: () => void;
};
/**
 * Item click handler
 */
export declare function createItemClickHandler(updateState: (updates: Partial<NavigationState>) => void, config: NavigationConfig, dispatch: (event: keyof NavigationEvents, detail: any) => void): (item: NavigationItem, event: MouseEvent) => void;
/**
 * Responsive breakpoints
 */
export declare const breakpoints: {
    readonly mobile: 768;
    readonly tablet: 1024;
    readonly desktop: 1280;
};
/**
 * Accessibility attributes
 */
export declare function getAccessibilityProps(variant: NavigationConfig['variant'], ariaLabel?: string, ariaDescribedBy?: string, role?: string): {
    "aria-label": string;
    "aria-describedby": string;
    role: string;
    "data-variant": "header" | "sidebar" | "breadcrumb" | "tabs" | "pagination";
};
export declare function getMenuButtonProps(isOpen: boolean): {
    "aria-expanded": boolean;
    "aria-controls": string;
    "aria-haspopup": "menu";
    "aria-label": string;
};
export declare function getMenuListProps(orientation: NavigationConfig['orientation'], variant: NavigationConfig['variant']): {
    id: string;
    role: string;
    "aria-orientation": "horizontal" | "vertical";
    "aria-label": string;
};
//# sourceMappingURL=navigation-utils.d.ts.map