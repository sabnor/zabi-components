interface Props {
    value?: string;
    type?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "success" | "warning" | "error";
    message?: string;
    oninput?: (event: Event) => void;
}
declare const Input: import("svelte").Component<Props, {}, "">;
type Input = ReturnType<typeof Input>;
export default Input;
