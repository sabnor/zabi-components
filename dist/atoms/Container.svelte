<script lang="ts">
    import type { Snippet } from 'svelte';

    type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

    interface Props {
        as?: 'div' | 'section' | 'main' | 'article';
        maxWidth?: MaxWidth;
        padded?: boolean;
        class?: string;
        children?: Snippet;
    }

    let {
        as: Tag = 'div',
        maxWidth = 'xl',
        padded = true,
        class: className = '',
        children,
    }: Props = $props();

    const maxClass: Record<MaxWidth, string> = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
    };
</script>

<svelte:element
    this={Tag}
    class={['mx-auto w-full', maxClass[maxWidth], padded ? 'px-4 sm:px-6' : '', className]
        .filter(Boolean)
        .join(' ')}
>
    {#if children}
        {@render children()}
    {/if}
</svelte:element>
