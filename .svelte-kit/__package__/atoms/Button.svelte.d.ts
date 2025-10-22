import type { Snippet } from "svelte";
interface Props {
    variant?: "primary" | "secondary" | "danger" | "success" | "ghost" | "brand";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    text?: string;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
}
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
