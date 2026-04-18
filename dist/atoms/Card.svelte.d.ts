import type { Snippet } from "svelte";
import type { CardVariant, SizeVariant } from "../../types/variants.js";
interface Props {
    onclick?: (event: MouseEvent) => void | Promise<void>;
    size?: SizeVariant;
    variant?: CardVariant;
    fullWidth?: boolean;
    className?: string;
    /** Required when `onclick` is set (no visible label). */
    ariaLabel?: string;
    children?: Snippet;
}
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
