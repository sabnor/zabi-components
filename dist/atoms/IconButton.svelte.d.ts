import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import type { ButtonVariant, SizeVariant } from "../types/variants.js";
type Props = Omit<HTMLButtonAttributes, "class"> & {
    variant?: ButtonVariant;
    size?: SizeVariant;
    loading?: boolean;
    /** Required for icon-only usage (no visible text). */
    label?: string;
    class?: string;
    children?: Snippet;
};
declare const IconButton: import("svelte").Component<Props, {}, "">;
type IconButton = ReturnType<typeof IconButton>;
export default IconButton;
