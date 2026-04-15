import type { Snippet } from 'svelte';
interface Props {
    title: string;
    description: string;
    class?: string;
    /** Primary action (e.g. button). */
    action?: Snippet;
    /** Optional illustration or icon slot. */
    media?: Snippet;
}
declare const EmptyState: import("svelte").Component<Props, {}, "">;
type EmptyState = ReturnType<typeof EmptyState>;
export default EmptyState;
