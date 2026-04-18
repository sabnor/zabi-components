import type { Component, Snippet } from "svelte";
interface Props {
    title: string;
    description?: string;
    icon?: Component<{
        size?: number;
        class?: string;
    }>;
    children?: Snippet;
    class?: string;
}
declare const FeatureCard: Component<Props, {}, "">;
type FeatureCard = ReturnType<typeof FeatureCard>;
export default FeatureCard;
