import type { Snippet } from "svelte";
interface Props {
    title?: string;
    image?: string;
    interactive?: boolean;
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    children?: Snippet;
}
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
