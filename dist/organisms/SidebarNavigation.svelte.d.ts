import type { Snippet } from "svelte";
import type { Component } from "svelte";
import type { ButtonVariant, SizeVariant } from "../../types/variants.js";
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
    /** Icon inside the panel trigger (button mode / collapsed / `onSearchClick`). Defaults to `Command`. `searchMode: "input"` keeps the magnifier (`Search`) on the field. */
    searchTriggerIcon?: Component<{
        size?: number;
        class?: string;
    }>;
    /** Button variant for the panel/search trigger (defaults to `outline`). */
    searchTriggerVariant?: ButtonVariant;
    /** Button size for the search trigger (defaults to `sm`). */
    searchTriggerSize?: SizeVariant;
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
    /** Trigger for rendering an external account panel (project-picker pattern). */
    onProfileClick?: (event?: MouseEvent) => void;
    /** Whether the external account panel is open (for aria-expanded). */
    profilePanelOpen?: boolean;
    /** Optional external panel id for aria-controls. */
    profilePanelControlsId?: string;
    /** Optional profile panel snippet rendered by the footer (CSS overlay). */
    profilePanel?: Snippet;
    /**
     * Highlights a primary (e.g. category) row when the current route is a child
     * of that section, while `currentPath` points at the leaf (e.g. a component).
     */
    activePrimaryHref?: string;
}
declare const SidebarNavigation: Component<Props, {}, "isLightMode" | "searchValue">;
type SidebarNavigation = ReturnType<typeof SidebarNavigation>;
export default SidebarNavigation;
