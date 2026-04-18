import type { Snippet } from "svelte";
interface Props {
    title?: string;
    subtitle?: string;
    description?: string;
    /** `id` on the subtitle `<p>` (e.g. `aria-describedby` on the title). */
    subtitleId?: string;
    /** `id` on the description `<p>`. */
    descriptionId?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    children?: Snippet;
}
declare const CardHeader: import("svelte").Component<Props, {}, "">;
type CardHeader = ReturnType<typeof CardHeader>;
export default CardHeader;
