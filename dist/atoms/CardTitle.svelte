<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        level?: 1 | 2 | 3 | 4 | 5 | 6;
        className?: string;
        children?: Snippet;
    }

    let {
        level = 3,
        className = "",
        children,
        ...restProps
    }: Props = $props();

    const headingTag = $derived(`h${level}`);
    const headingClasses = $derived(() => {
        const baseClasses = "text-2xl font-semibold leading-none tracking-tight text-headline";
        return `${baseClasses} ${className}`.trim();
    });
</script>

<svelte:element
    this={headingTag}
    class={headingClasses()}
    {...restProps}
>
    {#if children}
        {@render children()}
    {/if}
</svelte:element>

