import type { Component, Snippet } from "svelte";
export interface TopNavbarNavItem {
    label: string;
    href: string;
    icon?: Component<{
        size?: number;
        class?: string;
    }>;
    iconFilled?: Component<{
        size?: number;
        class?: string;
    }>;
}
interface Props {
    brand?: string;
    brandHref?: string;
    /** `aria-label` on `<nav>` when multiple nav landmarks exist. */
    ariaLabel?: string;
    showThemeToggle?: boolean;
    className?: string;
    /** Slim mode: only the `nav` region (no full chrome bar). */
    embedded?: boolean;
    items?: TopNavbarNavItem[];
    navVariant?: "header" | "sidebar";
    currentPath?: string;
    preventNavigation?: boolean;
    onclick?: (event: Event) => void;
}
type $$ComponentProps = Props & {
    nav?: Snippet;
    actions?: Snippet;
};
declare const TopNavbar: Component<$$ComponentProps, {}, "">;
type TopNavbar = ReturnType<typeof TopNavbar>;
export default TopNavbar;
