<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        title?: string;
        subtitle?: string;
        description?: string;
        /** `id` on the subtitle `<p>` (e.g. `aria-describedby` on the title). */
        subtitleId?: string;
        /** `id` on the description `<p>`. */
        descriptionId?: string;
        level?: 1 | 2 | 3 | 4 | 5 | 6;
        class?: string;
        /** @deprecated use `class`. */
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
        class: classAttr = "",
        className: legacyClass = "",
        children,
        ...restProps
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(`${classAttr} ${legacyClass}`.trim());

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
