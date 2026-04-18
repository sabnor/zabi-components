import type { Snippet } from 'svelte';
interface Props {
    /** Visible `<caption>` when set. */
    caption?: string;
    class?: string;
    children?: Snippet;
}
declare const Table: import("svelte").Component<Props, {}, "">;
type Table = ReturnType<typeof Table>;
export default Table;
