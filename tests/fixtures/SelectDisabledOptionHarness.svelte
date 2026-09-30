<script lang="ts">
    import Select from "../../src/components/atoms/Select.svelte";

    let value = $state<string | number | undefined>(undefined);
    const options = [
        { value: "a", label: "Alpha" },
        { value: "b", label: "Bravo", disabled: true },
        { value: "c", label: "Charlie" },
    ];
</script>

<Select label="Plan" {options} bind:value searchable={false} />
<output data-testid="bound">{value ?? ""}</output>
