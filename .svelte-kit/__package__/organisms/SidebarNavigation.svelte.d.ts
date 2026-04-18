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
    /** Groups items under a section heading in the rail. */
    section?: string;
}
interface Props {
    mode?: "expanded" | "collapsed";
    layout?: "rail" | "card";
    items?: SidebarNavigationItem[];
    currentPath?: string;
    ariaLabel?: string;
    className?: string;
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
    /** Trigger icon when search is a button or rail is collapsed; input mode keeps `Search` on the field. */
    searchTriggerIcon?: Component<{
        size?: number;
        class?: string;
    }>;
    searchTriggerVariant?: ButtonVariant;
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
    onProfileClick?: (event?: MouseEvent) => void;
    profilePanelOpen?: boolean;
    profilePanelControlsId?: string;
    profilePanel?: Snippet;
    /** Parent nav href to highlight when `currentPath` is a deeper leaf (e.g. category row). */
    activePrimaryHref?: string;
}
declare const SidebarNavigation: Component<Props, {}, "isLightMode" | "searchValue">;
type SidebarNavigation = ReturnType<typeof SidebarNavigation>;
export default SidebarNavigation;
