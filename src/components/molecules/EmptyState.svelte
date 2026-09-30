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
        /** `compact` tightens the padding and the title to sit inside a card. */
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
</script>

<section
    class={cn(
        "mx-auto flex flex-col items-center justify-center text-center",
        compact ? "gap-3 px-4 py-6" : "gap-4 px-6 py-12",
        className,
    )}
    aria-labelledby={titleId}
>
    {#if media}
        <div class="text-description" aria-hidden="true">
            {@render media()}
        </div>
    {/if}
    <div class={compact ? "space-y-1" : "space-y-2"}>
        <svelte:element
            this={`h${headingLevel}`}
            id={titleId}
            class={cn("font-semibold text-headline", compact ? "text-base" : "text-lg")}
        >
            {title}
        </svelte:element>
        <p class="text-sm text-description">{description}</p>
    </div>
    {#if action}
        <div
            class={cn("flex flex-wrap items-center justify-center gap-2", compact ? "mt-1" : "mt-2")}
        >
            {@render action()}
        </div>
    {/if}
</section>
