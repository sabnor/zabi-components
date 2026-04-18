<script lang="ts">
    import RadioGroup from "../../src/components/molecules/RadioGroup.svelte";

    /** Controlled value that does not exist in `options` (stale key). */
    let value = $state("ghost");

    const options = [
        { value: "a", label: "Alpha" },
        { value: "b", label: "Beta" },
    ];
</script>

<RadioGroup legend="Pick" bind:value {options} />
