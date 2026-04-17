import type { Snippet } from "svelte";
interface Props {
    /**
     * Extra classes on the leading region (for example `rounded-full` when the
     * visual is circular).
     */
    class?: string;
    children?: Snippet;
}
declare const ListItemLeading: import("svelte").Component<Props, {}, "">;
type ListItemLeading = ReturnType<typeof ListItemLeading>;
export default ListItemLeading;
