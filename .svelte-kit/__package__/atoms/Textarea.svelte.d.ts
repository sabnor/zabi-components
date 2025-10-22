interface Props {
    value?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "success" | "warning" | "error";
    oninput?: (event: Event) => void;
}
declare const Textarea: import("svelte").Component<Props, {}, "">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
