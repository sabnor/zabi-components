<script lang="ts">
    import RadioGroup from "../../src/components/molecules/RadioGroup.svelte";

    let useAlt = $state(false);
    /** Empty string = no selection (valid with `RadioGroup` `$bindable`). */
    let value = $state("");

    const optionsA = [
        { value: "x", label: "X" },
        { value: "y", label: "Y" },
    ];
    const optionsB = [
        { value: "p", label: "P" },
        { value: "q", label: "Q" },
    ];
    const options = $derived(useAlt ? optionsB : optionsA);
</script>

<button type="button" data-testid="swap-options" onclick={() => (useAlt = !useAlt)}>
    Swap options
</button>

<RadioGroup legend="Pick" bind:value {options} />
