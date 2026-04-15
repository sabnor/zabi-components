import type { Snippet } from "svelte";
interface Props {
    title?: string;
    /** Short secondary text displayed directly under the title */
    subtitle?: string;
    /** Longer supporting text displayed below the subtitle */
    description?: string;
    /** Element id for `subtitle` (e.g. `aria-describedby`). */
    subtitleId?: string;
    /** Element id for `description` (e.g. `aria-describedby`). */
    descriptionId?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    children?: Snippet;
}
declare const CardHeader: import("svelte").Component<Props, {}, "">;
type CardHeader = ReturnType<typeof CardHeader>;
export default CardHeader;
