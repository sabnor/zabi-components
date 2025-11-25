import type { Snippet } from "svelte";
interface Props {
    image?: string;
    imageAlt?: string;
    className?: string;
    children?: Snippet;
}
declare const CardContent: import("svelte").Component<Props, {}, "">;
type CardContent = ReturnType<typeof CardContent>;
export default CardContent;
