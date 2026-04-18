export interface NavigationMenuContextValue {
    activeItem: string | null;
    setActiveItem: (item: string | null) => void;
    isMobile: boolean;
    /** Prefix for panel `id` / trigger `aria-controls` (one menu instance). */
    menuInstanceId: string;
}
export declare const NAVIGATION_MENU_CONTEXT_KEY: unique symbol;
/** Panel element id; `itemValue` is sanitized for HTML id rules. */
export declare function navigationMenuPanelId(menuInstanceId: string, itemValue: string): string;
/**
 * Deterministic menu id from item order + values (FNV-1a).
 * SSR and client must agree — do not use `generateId()` for this pairing.
 */
export declare function navigationMenuStableInstanceId(items: ReadonlyArray<{
    value: string;
}>): string;
