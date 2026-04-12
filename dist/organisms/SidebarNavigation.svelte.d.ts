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
}
declare const SidebarNavigation: Component<Props, {}, "searchValue" | "isLightMode">;
type SidebarNavigation = ReturnType<typeof SidebarNavigation>;
export default SidebarNavigation;
