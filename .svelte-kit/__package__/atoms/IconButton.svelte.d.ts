import type { Snippet } from "svelte";
import type { ButtonVariant, SizeVariant } from "../types/variants.js";
interface Props {
    variant?: ButtonVariant;
    size?: SizeVariant;
    disabled?: boolean;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
    /** Required for icon-only usage (no visible text). */
    label?: string;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    children?: Snippet;
}
declare const IconButton: import("svelte").Component<Props, {}, "">;
type IconButton = ReturnType<typeof IconButton>;
export default IconButton;
