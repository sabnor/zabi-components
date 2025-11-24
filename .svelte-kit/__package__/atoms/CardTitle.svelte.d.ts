import type { Snippet } from "svelte";
interface Props {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    children?: Snippet;
}
declare const CardTitle: import("svelte").Component<Props, {}, "">;
type CardTitle = ReturnType<typeof CardTitle>;
export default CardTitle;
