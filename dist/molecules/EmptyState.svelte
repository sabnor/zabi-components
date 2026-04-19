<script lang="ts">
    import type { Snippet } from "svelte";
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        title: string;
        description: string;
        class?: string;
        action?: Snippet;
        media?: Snippet;
    }

    let {
        title,
        description,
        class: className = "",
        action,
        media,
    }: Props = $props();

    const titleId = generateId("empty-state-title");
</script>

<section
    class="mx-auto flex flex-col items-center justify-center gap-4 px-6 py-12 text-center {className}"
    aria-labelledby={titleId}
>
    {#if media}
        <div class="text-description" aria-hidden="true">
            {@render media()}
        </div>
    {/if}
    <div class="space-y-2">
        <h2 id={titleId} class="text-lg font-semibold text-headline">
            {title}
        </h2>
        <p class="text-sm text-description">{description}</p>
    </div>
    {#if action}
        <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
            {@render action()}
        </div>
    {/if}
</section>
