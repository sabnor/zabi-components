import type { Snippet } from "svelte";
import type { ButtonVariant, SizeVariant } from "../../types/variants.js";
interface Props {
    variant?: ButtonVariant;
    size?: SizeVariant;
    disabled?: boolean;
    /** Shows spinner and disables interaction while true */
    loading?: boolean;
    type?: "button" | "submit" | "reset";
    text?: string;
    isFullWidth?: boolean;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
}
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
