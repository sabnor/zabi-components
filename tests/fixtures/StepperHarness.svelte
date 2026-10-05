<script lang="ts">
    import Stepper from "../../src/components/molecules/Stepper.svelte";
    import type { StepperItem, StepperLayout, StepperStrings } from "../../src/components/util/stepper";

    interface Props {
        steps?: StepperItem[];
        initial?: number;
        interactive?: boolean;
        layout?: StepperLayout;
        size?: "sm" | "md" | "lg";
        label?: string;
        strings?: Partial<StepperStrings>;
        onstepchange?: (index: number) => void;
    }

    let {
        steps = ["Details", "Ratings", "Result + notes"],
        initial = 1,
        interactive = false,
        layout,
        size,
        label,
        strings,
        onstepchange,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let current = $state(initial);
</script>

<Stepper
    {steps}
    bind:current
    {interactive}
    {layout}
    {size}
    {label}
    {strings}
    {onstepchange}
    class="from-the-app"
    data-testid="stepper"
/>
<output data-testid="bound">{current}</output>
<button type="button" onclick={() => (current -= 1)}>Back</button>
<button type="button" onclick={() => (current += 1)}>Next</button>
<button type="button" onclick={() => (current = 99)}>Far</button>
