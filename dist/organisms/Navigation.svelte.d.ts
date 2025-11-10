import type { Component } from "svelte";
interface NavigationItem {
    label: string;
    href: string;
    icon?: Component<any>;
    iconFilled?: Component<any>;
}
interface Props {
    variant?: "header" | "sidebar";
    items?: NavigationItem[];
    currentPath?: string;
    onclick?: (event: Event) => void;
    className?: string;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const Navigation: Component<$$ComponentProps, {}, "">;
type Navigation = ReturnType<typeof Navigation>;
export default Navigation;
