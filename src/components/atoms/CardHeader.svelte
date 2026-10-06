<script lang="ts">
    import type { Snippet } from "svelte";
    import { cn } from "../util/cn.js";

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
    const className = $derived(cn(`${classAttr} ${legacyClass}`));

    const headingClasses = $derived(() => {
        return "text-2xl font-semibold leading-none tracking-tight text-headline";
    });
</script>

<header class={cn(`flex flex-col space-y-2 pb-4 ${className}`)} {...restProps}>
    {#if title}
        <!-- One branch per level, not a dynamic element: hydration takes a dynamic
        element out and puts it back, which blurs a control inside it that the user
        had already tabbed to. -->
        {#if level === 1}
            <h1 class={headingClasses()}>{title}</h1>
        {:else if level === 2}
            <h2 class={headingClasses()}>{title}</h2>
        {:else if level === 3}
            <h3 class={headingClasses()}>{title}</h3>
        {:else if level === 4}
            <h4 class={headingClasses()}>{title}</h4>
        {:else if level === 5}
            <h5 class={headingClasses()}>{title}</h5>
        {:else}
            <h6 class={headingClasses()}>{title}</h6>
        {/if}
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
