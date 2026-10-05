<script lang="ts">
    import SegmentedControl from "../../src/components/molecules/SegmentedControl.svelte";
    import type { SegmentedControlOption } from "../../src/components/util/segmented-control";

    interface Props {
        initial?: string;
        options?: SegmentedControlOption[];
        label?: string;
        labelledby?: boolean;
        size?: "sm" | "md" | "lg";
        fullWidth?: boolean;
        name?: string;
        disabled?: boolean;
        onchange?: (value: string) => void;
    }

    let {
        initial,
        options = [
            { value: "going", label: "Going" },
            { value: "maybe", label: "Maybe" },
            { value: "no", label: "Can't" },
        ],
        label = "Answer",
        labelledby = false,
        size,
        fullWidth,
        name = "answer",
        disabled,
        onchange,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let value = $state<string | undefined>(initial);
</script>

{#if labelledby}
    <p id="question">Are you coming?</p>
{/if}
<form data-testid="form">
    <SegmentedControl
        bind:value
        {options}
        label={labelledby ? undefined : label}
        aria-labelledby={labelledby ? "question" : undefined}
        {size}
        {fullWidth}
        {name}
        {disabled}
        {onchange}
        data-testid="segmented"
    />
</form>
<p data-testid="bound">{String(value)}</p>
