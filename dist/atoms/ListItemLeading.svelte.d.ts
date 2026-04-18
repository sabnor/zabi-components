import type { Snippet } from "svelte";
interface Props {
    /** e.g. `rounded-full` for avatars; default is `rounded-md` for icons. */
    class?: string;
    children?: Snippet;
}
declare const ListItemLeading: import("svelte").Component<Props, {}, "">;
type ListItemLeading = ReturnType<typeof ListItemLeading>;
export default ListItemLeading;
