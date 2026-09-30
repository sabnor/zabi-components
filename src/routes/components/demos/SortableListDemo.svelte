<script lang="ts">
    import Badge from "../../../components/atoms/Badge.svelte";
    import Card from "../../../components/atoms/Card.svelte";
    import SortableList from "../../../components/molecules/SortableList.svelte";
    import type { SortableListReorderDetail } from "../../../components/util/sortable-list.js";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    type Section = {
        id: string;
        title: string;
        summary: string;
        locked?: boolean;
    };

    let steps = $state([
        { id: "details", title: "Your details" },
        { id: "plan", title: "Choose a plan" },
        { id: "payment", title: "Payment" },
        { id: "review", title: "Review" },
    ]);

    let sections = $state<Section[]>([
        {
            id: "hero",
            title: "Hero section",
            summary: "Headline, lead text and the primary action.",
        },
        {
            id: "features",
            title: "Feature grid",
            summary: "Six cards in three columns.",
        },
        {
            id: "pricing",
            title: "Pricing table",
            summary: "Three plans with a monthly and yearly toggle.",
        },
        {
            id: "footer",
            title: "Footer",
            summary: "Set by the site template.",
            locked: true,
        },
    ]);

    let lastMove = $state("Nothing moved yet.");

    function describeMove(detail: SortableListReorderDetail<Section>) {
        lastMove = `${detail.item.title}: ${detail.from + 1} → ${detail.to + 1}`;
    }
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <SortableList
            bind:items={steps}
            getKey={(step) => step.id}
            getLabel={(step) => step.title}
            aria-label="Checkout steps"
        >
            {#snippet item(step, row)}
                <div
                    class="flex h-8 items-center gap-2 rounded-control border border-border bg-surface-raised px-3 text-sm text-body"
                >
                    <span class="text-description">{row.index + 1}.</span>
                    {step.title}
                </div>
            {/snippet}
        </SortableList>
        <p class="text-sm text-description">
            Order: {steps.map((step) => step.title).join(", ")}
        </p>
    </div>
{:else}
    <div class="w-full space-y-3">
        <SortableList
            bind:items={sections}
            getKey={(section) => section.id}
            getLabel={(section) => section.title}
            isItemDisabled={(section) => !!section.locked}
            onreorder={describeMove}
            controls="manual"
            listClass="gap-3"
            aria-label="Page sections"
        >
            {#snippet item(section, row)}
                <Card fullWidth={true}>
                    <div class="flex items-center gap-2">
                        {@render row.handle()}
                        <p class="min-w-0 flex-1 text-sm font-medium text-headline">
                            {section.title}
                        </p>
                        {#if section.locked}
                            <Badge text="Locked" />
                        {/if}
                        {@render row.moveButtons()}
                    </div>
                    <p class="mt-2 text-sm text-description">
                        {section.summary}
                    </p>
                </Card>
            {/snippet}
        </SortableList>
        <p class="text-sm text-description">Last move: {lastMove}</p>
    </div>
{/if}
