import type { Snippet } from 'svelte';
type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
interface Props {
    as?: 'div' | 'section' | 'main' | 'article';
    maxWidth?: MaxWidth;
    padded?: boolean;
    class?: string;
    children?: Snippet;
}
declare const Container: import("svelte").Component<Props, {}, "">;
type Container = ReturnType<typeof Container>;
export default Container;
