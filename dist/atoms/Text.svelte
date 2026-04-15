<script lang="ts">
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

    let {
        as: Tag = 'p',
        tone = 'body',
        size = 'md',
        class: className = '',
        children,
    }: Props = $props();

    const toneClass: Record<Tone, string> = {
        body: 'text-body',
        description: 'text-description',
        caption: 'text-caption',
        headline: 'text-headline',
        label: 'text-label',
        error: 'text-error',
    };

    const sizeClass: Record<Size, string> = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };
</script>

<svelte:element
    this={Tag}
    class={[toneClass[tone], sizeClass[size], className].filter(Boolean).join(' ')}
>
    {#if children}
        {@render children()}
    {/if}
</svelte:element>
