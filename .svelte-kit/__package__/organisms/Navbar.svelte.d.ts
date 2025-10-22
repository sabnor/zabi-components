interface Props {
    brand?: string;
    showThemeToggle?: boolean;
    className?: string;
    onclick?: (event: Event) => void;
}
type $$ComponentProps = Props & {
    children?: any;
    nav?: any;
    actions?: any;
};
declare const Navbar: import("svelte").Component<$$ComponentProps, {}, "">;
type Navbar = ReturnType<typeof Navbar>;
export default Navbar;
