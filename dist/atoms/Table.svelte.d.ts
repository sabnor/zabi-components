import type { Snippet } from 'svelte';
interface Props {
    /** Accessible name for the table (use with caption or aria-label). */
    caption?: string;
    class?: string;
    children?: Snippet;
}
declare const Table: import("svelte").Component<Props, {}, "">;
type Table = ReturnType<typeof Table>;
export default Table;
