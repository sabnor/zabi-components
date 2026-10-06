<script lang="ts">
    import Checkbox from "../../src/components/atoms/Checkbox.svelte";
    import Radio from "../../src/components/atoms/Radio.svelte";
    import Rating from "../../src/components/atoms/Rating.svelte";
    import RadioGroup from "../../src/components/molecules/RadioGroup.svelte";
    import SegmentedControl from "../../src/components/molecules/SegmentedControl.svelte";

    /**
     * The five controls that hold a choice, in one form, bound to state the
     * test can read and set: for tests/hydration-value.test.ts.
     */
    interface Props {
        checked?: boolean;
        radio?: boolean;
        answer?: string | undefined;
        stars?: number | null;
        size?: string | undefined;
        /** Give Rating and SegmentedControl a `name`, which makes them part of the form. */
        named?: boolean;
        onreport?: (which: string, value: unknown) => void;
    }

    let {
        checked: initialChecked = false,
        radio: initialRadio = false,
        answer: initialAnswer = undefined,
        stars: initialStars = null,
        size: initialSize = undefined,
        named = true,
        onreport,
    }: Props = $props();

    const options = [
        { value: "a", label: "Alpha" },
        { value: "b", label: "Beta" },
        { value: "c", label: "Gamma" },
    ];

    // svelte-ignore state_referenced_locally
    let checked = $state(initialChecked);
    // svelte-ignore state_referenced_locally
    let radio = $state(initialRadio);
    // svelte-ignore state_referenced_locally
    let answer = $state(initialAnswer);
    // svelte-ignore state_referenced_locally
    let stars = $state(initialStars);
    // svelte-ignore state_referenced_locally
    let size = $state(initialSize);
</script>

<form data-testid="form">
    <Checkbox label="Terms" name="terms" bind:checked onchange={() => onreport?.("checkbox", checked)} />
    <Radio label="Only" name="only" value="x" bind:checked={radio} onchange={() => onreport?.("radio", radio)} />
    <RadioGroup legend="Answer" name="answer" {options} bind:value={answer} />
    <Rating label="Quiz" name={named ? "quiz" : ""} bind:value={stars} onchange={(value) => onreport?.("rating", value)} />
    <SegmentedControl
        label="Size"
        name={named ? "size" : ""}
        {options}
        bind:value={size}
        onchange={(value) => onreport?.("segmented", value)}
    />
    <button type="reset">Reset</button>
</form>

<output data-testid="state">{JSON.stringify({ checked, radio, answer: answer ?? null, stars, size: size ?? null })}</output>
<button type="button" onclick={() => ((checked = true), (radio = true), (answer = "c"), (stars = 5), (size = "c"))}>Set all</button>
<button type="button" onclick={() => ((checked = false), (radio = false), (answer = undefined), (stars = null), (size = undefined))}>
    Clear all
</button>
