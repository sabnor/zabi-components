<script lang="ts">
    import { CalendarDays, List } from "@lucide/svelte";
    import SegmentedControl from "../../../components/molecules/SegmentedControl.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let view = $state<string | undefined>("list");
    let answer = $state<string | undefined>(undefined);
    let period = $state<string | undefined>("week");
    let small = $state<string | undefined>("list");
    let medium = $state<string | undefined>("list");
    let large = $state<string | undefined>("list");
    let plan = $state<string | undefined>("free");

    const views = [
        { value: "list", label: "List" },
        { value: "month", label: "Month" },
    ];
</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <SegmentedControl
            label="View"
            options={views}
            bind:value={view}
            data-testid="segmented-demo-view"
        />
        <p class="mt-2 text-sm text-description">
            Value: <span data-testid="segmented-demo-view-value">{view ?? "none"}</span>
        </p>
    </div>
{:else if exampleIndex === 1}
    <div class="w-full">
        <p id="segmented-demo-answer-label" class="mb-2 text-sm font-medium text-label">
            Are you coming on Thursday?
        </p>
        <SegmentedControl
            aria-labelledby="segmented-demo-answer-label"
            name="answer"
            options={[
                { value: "going", label: "Going" },
                { value: "maybe", label: "Maybe" },
                { value: "no", label: "Can't" },
            ]}
            bind:value={answer}
            data-testid="segmented-demo-answer"
        />
        <p class="mt-2 text-sm text-description">
            Value: <span data-testid="segmented-demo-answer-value">{answer ?? "none"}</span>
        </p>
    </div>
{:else if exampleIndex === 2}
    <div class="w-full space-y-4">
        <SegmentedControl
            label="Period"
            options={[
                { value: "day", label: "Day" },
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
                { value: "year", label: "This year" },
            ]}
            bind:value={period}
            data-testid="segmented-demo-period"
        />
        <SegmentedControl
            label="View"
            options={[
                { value: "list", label: "List", icon: List },
                { value: "month", label: "Month", icon: CalendarDays },
            ]}
            bind:value={view}
        />
    </div>
{:else if exampleIndex === 3}
    <div class="w-full space-y-4">
        <SegmentedControl label="Small" size="sm" options={views} bind:value={small} />
        <SegmentedControl label="Medium" options={views} bind:value={medium} />
        <SegmentedControl label="Large" size="lg" options={views} bind:value={large} />
    </div>
{:else}
    <div class="w-full space-y-4">
        <SegmentedControl label="View" fullWidth={false} options={views} bind:value={view} />
        <SegmentedControl
            label="Plan"
            options={[
                { value: "free", label: "Free" },
                { value: "team", label: "Team" },
                { value: "enterprise", label: "Enterprise", disabled: true },
            ]}
            bind:value={plan}
        />
        <SegmentedControl label="View" options={views} value="month" disabled />
    </div>
{/if}
