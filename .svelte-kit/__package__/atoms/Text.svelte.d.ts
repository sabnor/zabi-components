import type { Snippet } from 'svelte';
type Tone = 'body' | 'description' | 'caption' | 'headline' | 'label' | 'error';
type Size = 'sm' | 'md' | 'lg';
interface Props {
    as?: 'p' | 'span' | 'div';
    tone?: Tone;
    size?: Size;
    class?: string;
    children?: Snippet;
}
declare const Text: import("svelte").Component<Props, {}, "">;
type Text = ReturnType<typeof Text>;
export default Text;
