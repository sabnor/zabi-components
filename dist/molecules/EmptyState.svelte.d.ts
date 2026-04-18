import type { Snippet } from 'svelte';
interface Props {
    title: string;
    description: string;
    class?: string;
    action?: Snippet;
    media?: Snippet;
}
declare const EmptyState: import("svelte").Component<Props, {}, "">;
type EmptyState = ReturnType<typeof EmptyState>;
export default EmptyState;
