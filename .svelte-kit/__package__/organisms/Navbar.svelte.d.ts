import type { Component, Snippet } from "svelte";
/** Link shown in the built-in nav list (when not using the `nav` snippet). */
export interface NavbarNavItem {
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
    /** When set, the brand is a link (use `""` to show text only). */
    brandHref?: string;
    /** Accessible name for the landmark when you have more than one `nav`. */
    ariaLabel?: string;
    showThemeToggle?: boolean;
    className?: string;
    /**
     * When true, renders only the built-in link list (or `nav` snippet) inside a `nav` landmark.
     * Use for headers that are not the full chrome bar.
     */
    embedded?: boolean;
    /** Inline nav links; ignored when the `nav` snippet is provided. */
    items?: NavbarNavItem[];
    navVariant?: "header" | "sidebar";
    currentPath?: string;
    preventNavigation?: boolean;
    onclick?: (event: Event) => void;
}
type $$ComponentProps = Props & {
    nav?: Snippet;
    actions?: Snippet;
};
declare const Navbar: Component<$$ComponentProps, {}, "">;
type Navbar = ReturnType<typeof Navbar>;
export default Navbar;
