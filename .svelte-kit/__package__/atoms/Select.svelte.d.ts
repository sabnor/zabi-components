interface Props {
    value?: string | number | undefined;
    options?: Array<{
        value: string | number;
        label: string;
        disabled?: boolean;
    }>;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    onchange?: (event: Event) => void;
}
declare const Select: import("svelte").Component<Props, {}, "">;
type Select = ReturnType<typeof Select>;
export default Select;
