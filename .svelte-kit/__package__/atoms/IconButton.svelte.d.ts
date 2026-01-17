import type { Snippet } from "svelte";
import type { ButtonVariant, SizeVariant } from "../../types/variants.js";
interface Props {
    /** Visual style variant. */
    variant?: ButtonVariant;
    /** Size variant controlling padding and radius. */
    size?: SizeVariant;
    /** Whether the button is disabled. */
    disabled?: boolean;
    /** Button type attribute. */
    type?: "button" | "submit" | "reset";
    /** Accessible label for icon-only buttons. */
    label?: string;
    /** Click handler for native click events. */
    onclick?: (event: MouseEvent) => void;
    /** Icon content. */
    children?: Snippet;
}
declare const IconButton: import("svelte").Component<Props, {}, "">;
type IconButton = ReturnType<typeof IconButton>;
export default IconButton;
