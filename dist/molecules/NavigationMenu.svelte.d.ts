import type { Snippet } from "svelte";
export interface NavigationMenuLinkData {
    href: string;
    label?: string;
    description?: string;
    children?: Snippet;
    asChild?: boolean;
}
export interface NavigationMenuItemData {
    value: string;
    label: string;
    href?: string;
    content?: NavigationMenuLinkData[];
    children?: Snippet;
}
interface Props {
    viewport?: boolean | "mobile";
    className?: string;
    items?: NavigationMenuItemData[];
    children?: Snippet;
    listClassName?: string;
}
declare const NavigationMenu: import("svelte").Component<Props, {}, "">;
type NavigationMenu = ReturnType<typeof NavigationMenu>;
export default NavigationMenu;
