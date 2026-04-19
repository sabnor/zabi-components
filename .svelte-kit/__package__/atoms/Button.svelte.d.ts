import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { ButtonVariant, SizeVariant } from "../types/variants.js";
type Props = Omit<HTMLButtonAttributes, "class"> & {
    variant?: ButtonVariant;
    size?: SizeVariant;
    loading?: boolean;
    text?: string;
    isFullWidth?: boolean;
    class?: string;
    children?: Snippet;
};
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
