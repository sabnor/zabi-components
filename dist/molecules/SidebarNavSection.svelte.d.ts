import type { Snippet } from "svelte";
interface Props {
    /** Short section label above the list (hidden when collapsed). */
    title?: string;
    /** Stable id fragment so duplicate titles stay unique in the DOM. */
    sectionKey?: string;
    /** Accessible name for the list when no visible title is shown. */
    listAriaLabel: string;
    collapsed?: boolean;
    className?: string;
    children: Snippet;
}
declare const SidebarNavSection: import("svelte").Component<Props, {}, "">;
type SidebarNavSection = ReturnType<typeof SidebarNavSection>;
export default SidebarNavSection;
