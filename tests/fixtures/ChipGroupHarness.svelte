<script lang="ts">
    import Chip from "../../src/components/atoms/Chip.svelte";
    import ChipGroup from "../../src/components/molecules/ChipGroup.svelte";

    /** Row and sub-group layouts for tests/chip-group.test.ts. */
    interface Props {
        scenario: "row" | "subgroups" | "grid";
        edge?: "fade" | "none";
        scrollSelectedIntoView?: boolean;
    }

    let { scenario, edge = "fade", scrollSelectedIntoView = true }: Props = $props();
</script>

{#if scenario === "row"}
    <ChipGroup label="Filter" layout="row" {edge} {scrollSelectedIntoView}>
        <Chip href="/?f=1">One</Chip>
        <Chip href="/?f=2">Two</Chip>
        <Chip href="/?f=3" selected>Three</Chip>
    </ChipGroup>
{:else if scenario === "grid"}
    <ChipGroup label="Pick" layout="grid" columns={3} type="radio" name="pick" value="a">
        {#each ["a", "b", "c", "d", "e", "f", "g"] as id (id)}
            <Chip value={id}>{id.toUpperCase()}</Chip>
        {/each}
    </ChipGroup>
{:else}
    <ChipGroup label="Filters" layout="row">
        <ChipGroup label="Day" type="radio" name="day" value="mon">
            <Chip value="mon">Mon</Chip>
            <Chip value="tue">Tue</Chip>
        </ChipGroup>
        <ChipGroup label="Area" type="checkbox" name="area" value={["north"]}>
            <Chip value="north">North</Chip>
            <Chip value="south">South</Chip>
        </ChipGroup>
    </ChipGroup>
{/if}
