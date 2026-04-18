export interface NavigationMenuContextValue {
    activeItem: string | null;
    setActiveItem: (item: string | null) => void;
    isMobile: boolean;
    /** Prefix for panel `id` / trigger `aria-controls` (one menu instance). */
    menuInstanceId: string;
}

export const NAVIGATION_MENU_CONTEXT_KEY = Symbol("navigation-menu");

/** Panel element id; `itemValue` is sanitized for HTML id rules. */
export function navigationMenuPanelId(
    menuInstanceId: string,
    itemValue: string,
): string {
    const safe = itemValue.replace(/[^a-zA-Z0-9_-]/g, "-");
    return `${menuInstanceId}-${safe}-panel`;
}

/**
 * Deterministic menu id from item order + values (FNV-1a).
 * SSR and client must agree — do not use `generateId()` for this pairing.
 */
export function navigationMenuStableInstanceId(
    items: ReadonlyArray<{ value: string }>,
): string {
    const raw = items.map((i) => i.value).join("\u001f");
    let h = 2166136261;
    for (let i = 0; i < raw.length; i++) {
        h ^= raw.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return `zabi-nav-${(h >>> 0).toString(36)}`;
}
