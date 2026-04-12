export interface NavigationMenuContextValue {
    activeItem: string | null;
    setActiveItem: (item: string | null) => void;
    isMobile: boolean;
}
export declare const NAVIGATION_MENU_CONTEXT_KEY: unique symbol;
