<script lang="ts">
    import Chip from "../../src/components/atoms/Chip.svelte";
    import ChipGroup from "../../src/components/molecules/ChipGroup.svelte";

    /**
     * Chips and groups bound to state the test can read: for tests/chip.test.ts,
     * tests/chip-group.test.ts and tests/chip-hydration.test.ts.
     */
    interface Props {
        pressed?: boolean;
        agreed?: boolean;
        plan?: string | undefined;
        toppings?: string[];
        onreport?: (which: string, value: unknown) => void;
    }

    // svelte-ignore state_referenced_locally
    let { pressed: initialPressed = false, agreed: initialAgreed = false, plan: initialPlan = undefined, toppings: initialToppings = [], onreport }: Props = $props();

    // svelte-ignore state_referenced_locally
    let pressed = $state(initialPressed);
    // svelte-ignore state_referenced_locally
    let agreed = $state(initialAgreed);
    // svelte-ignore state_referenced_locally
    let plan = $state<string | undefined>(initialPlan);
    // svelte-ignore state_referenced_locally
    let toppings = $state<string[]>(initialToppings);
</script>

<form data-testid="form">
    <Chip bind:selected={pressed} onchange={(value) => onreport?.("button", value)}>Open now</Chip>
    <Chip type="checkbox" name="terms" value="yes" bind:selected={agreed} onchange={(value) => onreport?.("checkbox", value)}>Terms</Chip>
    <ChipGroup label="Plan" type="radio" name="plan" bind:value={plan} onchange={(value) => onreport?.("plan", value)}>
        <Chip value="basic">Basic</Chip>
        <Chip value="pro">Pro</Chip>
        <Chip value="team" disabled>Team</Chip>
    </ChipGroup>
    <ChipGroup label="Toppings" type="checkbox" name="topping" bind:value={toppings} onchange={(value) => onreport?.("toppings", value)}>
        <Chip value="cheese">Cheese</Chip>
        <Chip value="ham">Ham</Chip>
    </ChipGroup>
    <button type="reset">Reset</button>
</form>

<output data-testid="state">{JSON.stringify({ pressed, agreed, plan: plan ?? null, toppings })}</output>
<button type="button" onclick={() => ((pressed = true), (agreed = true), (plan = "pro"), (toppings = ["ham"]))}>Set all</button>
<button type="button" onclick={() => ((pressed = false), (agreed = false), (plan = undefined), (toppings = []))}>Clear all</button>
