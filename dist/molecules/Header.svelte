<script lang="ts">
    import Badge from "../atoms/Badge.svelte";
    import Heading from "../atoms/Heading.svelte";
    import type { ComponentCategory } from "../../types/page.types";

    interface Props {
        title: string;
        description: string;
        category: ComponentCategory;
        variantsStates?: string[];
    }

    let { title, description, category, variantsStates }: Props = $props();
</script>

<header class="space-y-4">
    <div class="space-y-2">
        <Heading level={1} text={title} />
        <p class="text-lg whitespace-pre-line text-description">{description}</p>
    </div>

    <div class="flex flex-wrap items-center gap-2">
        <Badge variant="info" text={category} />
        {#if variantsStates?.length}
            <Badge variant="info" text="{variantsStates.length} variants" />
        {/if}
    </div>

    {#if variantsStates?.length}
        <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm font-medium text-headline">
                Variants / states:
            </span>
            {#each variantsStates as v (v)}
                <span class="rounded-md bg-base-100 px-2 py-1 text-xs text-headline">
                    {v}
                </span>
            {/each}
        </div>
    {/if}
</header>
