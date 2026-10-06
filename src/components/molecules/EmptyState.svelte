<script lang="ts">
    import type { Snippet } from "svelte";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import type { CollapsibleHeadingLevel } from "../util/collapsible.js";

    interface Props {
        title: string;
        description: string;
        /** Heading element of the title, to fit the outline of the page around it. */
        headingLevel?: CollapsibleHeadingLevel;
        /**
         * `compact` tightens the padding and the title to sit inside a card,
         * and is a plain `<div>`, not a landmark region like the default.
         */
        size?: "default" | "compact";
        class?: string;
        action?: Snippet;
        media?: Snippet;
    }

    let {
        title,
        description,
        headingLevel = 2,
        size = "default",
        class: className = "",
        action,
        media,
    }: Props = $props();

    const titleId = generateId("empty-state-title");
    const compact = $derived(size === "compact");
    const rootClasses = $derived(
        cn(
            "mx-auto flex flex-col items-center justify-center text-center",
            compact ? "gap-3 px-4 py-6" : "gap-4 px-6 py-12",
            className,
        ),
    );
</script>

{#snippet body()}
    {@const headingClasses = cn("font-semibold text-headline", compact ? "text-base" : "text-lg")}
    {#if media}
        <div class="text-description" aria-hidden="true">
            {@render media()}
        </div>
    {/if}
    <div class={compact ? "space-y-1" : "space-y-2"}>
        {#if headingLevel === 1}
            <h1 id={titleId} class={headingClasses}>{title}</h1>
        {:else if headingLevel === 2}
            <h2 id={titleId} class={headingClasses}>{title}</h2>
        {:else if headingLevel === 3}
            <h3 id={titleId} class={headingClasses}>{title}</h3>
        {:else if headingLevel === 4}
            <h4 id={titleId} class={headingClasses}>{title}</h4>
        {:else if headingLevel === 5}
            <h5 id={titleId} class={headingClasses}>{title}</h5>
        {:else}
            <h6 id={titleId} class={headingClasses}>{title}</h6>
        {/if}
        <p class="text-sm text-description">{description}</p>
    </div>
    {#if action}
        <div
            class={cn("flex flex-wrap items-center justify-center gap-2", compact ? "mt-1" : "mt-2")}
        >
            {@render action()}
        </div>
    {/if}
{/snippet}

<!-- A named `<section>` is a landmark. One per page is a help; a compact empty
     state in every card is a page of landmarks, so that size is a plain `<div>`.

     Two branches, not `<svelte:element>`: hydration takes a dynamic element
     out and puts it back, which blurs a control inside it that the user had
     already tabbed to. The heading is one branch per level for the same
     reason. -->
{#if compact}
    <div class={rootClasses}>
        {@render body()}
    </div>
{:else}
    <section class={rootClasses} aria-labelledby={titleId}>
        {@render body()}
    </section>
{/if}
