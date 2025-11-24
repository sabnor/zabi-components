import type { Snippet } from "svelte";
interface Props {
    className?: string;
    children?: Snippet;
}
declare const CardHeader: import("svelte").Component<Props, {}, "">;
type CardHeader = ReturnType<typeof CardHeader>;
export default CardHeader;
