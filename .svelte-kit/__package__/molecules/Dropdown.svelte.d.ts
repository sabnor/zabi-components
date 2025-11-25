interface Props {
    isOpen?: boolean;
    placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
    ariaLabel?: string;
    selectedValue?: string | number | null;
    options?: Array<{
        value: string | number;
        label: string;
        disabled?: boolean;
    }>;
    onOptionClick?: (value: string | number) => void;
}
type $$ComponentProps = Props & {
    children?: any;
    trigger?: any;
};
declare const Dropdown: import("svelte").Component<$$ComponentProps, {}, "">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
