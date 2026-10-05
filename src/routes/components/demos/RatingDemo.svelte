<script lang="ts">
    import Rating from "../../../components/atoms/Rating.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let quiz = $state<number | null>(null);
    let food = $state<number | null>(4);
    let small = $state<number | null>(3);
    let medium = $state<number | null>(3);
    let large = $state<number | null>(3);
    let mood = $state<number | null>(2);
</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <Rating label="Quiz" bind:value={quiz} name="quiz" data-testid="rating-demo-quiz" />
        <p class="mt-2 text-sm text-description">
            Value: <span data-testid="rating-demo-quiz-value">{quiz ?? "none"}</span>
        </p>
    </div>
{:else if exampleIndex === 1}
    <div class="w-full">
        <Rating label="Food" bind:value={food} clearable data-testid="rating-demo-food" />
        <p class="mt-2 text-sm text-description">
            Value: <span data-testid="rating-demo-food-value">{food ?? "none"}</span>
        </p>
    </div>
{:else if exampleIndex === 2}
    <div class="w-full space-y-4">
        <Rating label="Pub score" value={3.5} readonly data-testid="rating-demo-average" />
        <Rating
            label="Snitt"
            value={4.3}
            readonly
            formatValue={(value) => value.toFixed(1).replace(".", ",")}
            strings={{ starLabel: (value, max) => `${value} av ${max} stjärnor` }}
        />
        <Rating label="Not rated yet" value={null} readonly />
        <Rating label="Favourites" value={3.5} readonly tone="accent" data-testid="rating-demo-accent" />
    </div>
{:else if exampleIndex === 3}
    <div class="w-full space-y-4">
        <Rating label="Small" size="sm" bind:value={small} />
        <Rating label="Medium" bind:value={medium} />
        <Rating label="Large" size="lg" bind:value={large} />
    </div>
{:else}
    <div class="w-full space-y-4">
        <Rating label="Locked" value={3} disabled />
        <Rating
            label="Stämning"
            bind:value={mood}
            clearable
            strings={{
                starLabel: (value, max) => `${value} av ${max} stjärnor`,
                clearLabel: "Rensa betyg",
            }}
        />
    </div>
{/if}
