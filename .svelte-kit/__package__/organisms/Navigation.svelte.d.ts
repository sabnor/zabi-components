interface Props {
    variant?: "header" | "sidebar";
    items?: Array<{
        label: string;
        href: string;
    }>;
    currentPath?: string;
    onclick?: (event: Event) => void;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const Navigation: import("svelte").Component<$$ComponentProps, {}, "">;
type Navigation = ReturnType<typeof Navigation>;
export default Navigation;
