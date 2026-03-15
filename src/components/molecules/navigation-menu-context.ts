export interface NavigationMenuContextValue {
    activeItem: string | null;
    setActiveItem: (item: string | null) => void;
    isMobile: boolean;
}

export const NAVIGATION_MENU_CONTEXT_KEY = Symbol("navigation-menu");
