import type { Snippet } from "svelte";
import type { CardVariant, SizeVariant } from "../../types/variants.js";
interface Props {
    title?: string;
    description?: string;
    image?: string;
    onclick?: (event: MouseEvent) => void | Promise<void>;
    size?: SizeVariant;
    variant?: CardVariant;
    fullWidth?: boolean;
    children?: Snippet;
}
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
