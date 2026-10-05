<script lang="ts">
    import type { Snippet } from 'svelte';

    import { cn } from "../util/cn.js";
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

    const classes = $derived(
        cn('mx-auto w-full', maxClass[maxWidth], padded ? 'px-4 sm:px-6' : '', className),
    );
</script>

<!-- One branch per tag, not `<svelte:element>`: hydration takes a dynamic
element out and puts it back, which blurs a control inside it that the user
had already tabbed to. -->
{#if Tag === 'section'}
    <section class={classes}>{@render children?.()}</section>
{:else if Tag === 'main'}
    <main class={classes}>{@render children?.()}</main>
{:else if Tag === 'article'}
    <article class={classes}>{@render children?.()}</article>
{:else}
    <div class={classes}>{@render children?.()}</div>
{/if}
