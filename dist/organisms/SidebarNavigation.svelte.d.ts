import type { Component } from "svelte";
export interface SidebarNavigationItem {
    id: string;
    label: string;
    href: string;
    icon?: Component<{
        size?: number;
        class?: string;
    }>;
    badgeText?: string | number;
    badgeCount?: number;
    group?: "primary" | "secondary";
    /** Optional heading group (Daybridge-style section labels). */
    section?: string;
}
interface Props {
    mode?: "expanded" | "collapsed";
    /** Flush rail (default) or floating card surface inspired by Daybridge. */
    layout?: "rail" | "card";
    items?: SidebarNavigationItem[];
    currentPath?: string;
    ariaLabel?: string;
    className?: string;
    /** Optional logo URL — shown with `brandName` when provided. */
    logoSrc?: string;
    logoAlt?: string;
    brandName?: string;
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
declare const SidebarNavigation: Component<Props, {}, "searchValue" | "isLightMode">;
type SidebarNavigation = ReturnType<typeof SidebarNavigation>;
export default SidebarNavigation;
