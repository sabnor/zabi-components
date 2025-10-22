interface Props {
    isOpen?: boolean;
    placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
}
type $$ComponentProps = Props & {
    children?: any;
    trigger?: any;
};
declare const Dropdown: import("svelte").Component<$$ComponentProps, {}, "">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
