<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        description?: string;
        level?: 1 | 2 | 3 | 4 | 5 | 6;
        className?: string;
        children?: Snippet;
    }

    let {
        title = "",
        description = "",
        level = 3,
        className = "",
        children,
        ...restProps
    }: Props = $props();

    const headingTag = $derived(`h${level}`);
    const headingClasses = $derived(() => {
        return "text-2xl font-semibold leading-none tracking-tight text-headline";
    });
</script>

<header class="flex flex-col space-y-1.5 p-6 {className}" {...restProps}>
    {#if title}
        <svelte:element this={headingTag} class={headingClasses()}>
            {title}
        </svelte:element>
    {/if}
    {#if children}
        {@render children()}
    {/if}
    {#if description}
        <p class="text-sm text-description">
            {description}
        </p>
    {/if}
</header>
