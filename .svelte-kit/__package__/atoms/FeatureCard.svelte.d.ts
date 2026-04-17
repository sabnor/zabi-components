import type { Component, Snippet } from "svelte";
interface Props {
    /** Feature title. Kept intentionally short — one line at most. */
    title: string;
    /** Supporting copy. Optional; omit for a title-only card. */
    description?: string;
    /** Lucide (or any) icon component rendered in the top-left slot. */
    icon?: Component<{
        size?: number;
        class?: string;
    }>;
    /** Optional footer content (e.g. a link or CTA). */
    children?: Snippet;
    /** Extra classes forwarded to the root element. */
    class?: string;
}
declare const FeatureCard: Component<Props, {}, "">;
type FeatureCard = ReturnType<typeof FeatureCard>;
export default FeatureCard;
