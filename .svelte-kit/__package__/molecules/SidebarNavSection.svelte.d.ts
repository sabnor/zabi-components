import type { Snippet } from "svelte";
interface Props {
    title?: string;
    /** Disambiguates generated ids when section titles repeat. */
    sectionKey?: string;
    /** `aria-label` on the `<ul>` (required when title is hidden in collapsed mode). */
    listAriaLabel: string;
    collapsed?: boolean;
    className?: string;
    children: Snippet;
}
declare const SidebarNavSection: import("svelte").Component<Props, {}, "">;
type SidebarNavSection = ReturnType<typeof SidebarNavSection>;
export default SidebarNavSection;
