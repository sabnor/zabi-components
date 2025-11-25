import type { Snippet } from "svelte";
interface Props {
    title?: string;
    description?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    children?: Snippet;
}
declare const CardHeader: import("svelte").Component<Props, {}, "">;
type CardHeader = ReturnType<typeof CardHeader>;
export default CardHeader;
