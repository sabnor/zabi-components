interface Props {
    value?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
    variant?: "default" | "success" | "warning" | "error";
    message?: string;
    oninput?: (event: Event) => void;
}
declare const Textarea: import("svelte").Component<Props, {}, "">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
