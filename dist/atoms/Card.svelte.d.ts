import type { Snippet } from "svelte";
interface Props {
    title?: string;
    description?: string;
    image?: string;
    onclick?: (event: MouseEvent) => void | Promise<void>;
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    children?: Snippet;
}
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
