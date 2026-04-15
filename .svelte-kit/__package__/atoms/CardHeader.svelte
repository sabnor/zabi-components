<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        /** Short secondary text displayed directly under the title */
        subtitle?: string;
        /** Longer supporting text displayed below the subtitle */
        description?: string;
        /** Element id for `subtitle` (e.g. `aria-describedby`). */
        subtitleId?: string;
        /** Element id for `description` (e.g. `aria-describedby`). */
        descriptionId?: string;
        level?: 1 | 2 | 3 | 4 | 5 | 6;
        className?: string;
        children?: Snippet;
    }

    let {
        title = "",
        subtitle = "",
        description = "",
        subtitleId,
        descriptionId,
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

<header class={`flex flex-col space-y-1.5 pb-4 ${className}`.trim()} {...restProps}>
    {#if title}
        <svelte:element this={headingTag} class={headingClasses()}>
            {title}
        </svelte:element>
    {/if}
    {#if children}
        {@render children()}
    {/if}
    {#if subtitle}
        <p id={subtitleId} class="text-sm text-description">
            {subtitle}
        </p>
    {/if}
    {#if description}
        <p id={descriptionId} class="text-sm text-description">
            {description}
        </p>
    {/if}
</header>
