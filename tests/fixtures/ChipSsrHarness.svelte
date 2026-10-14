<script lang="ts">
    import Chip from "../../src/components/atoms/Chip.svelte";
    import ChipGroup from "../../src/components/molecules/ChipGroup.svelte";

    /** Every form of Chip and the layouts of ChipGroup, for tests/chip-ssr.test.ts. */
    interface Props {
        scenario: "forms" | "radio-group" | "checkbox-group" | "row" | "subgroups";
    }

    let { scenario }: Props = $props();
</script>

{#if scenario === "forms"}
    <Chip href="/pubs?filter=open" selected>Open</Chip>
    <Chip href="/pubs?filter=all">All</Chip>
    <Chip href="/pubs" selected current="page" disabled>Gone</Chip>
    <Chip selected>Pressed</Chip>
    <Chip>Not pressed</Chip>
    <Chip type="radio" name="size" value="s" selected>Small</Chip>
    <Chip type="radio" name="size" value="m">Medium</Chip>
    <Chip type="checkbox" name="extra" value="cheese" selected required>Cheese</Chip>
{:else if scenario === "radio-group"}
    <ChipGroup label="Plan" type="radio" name="plan" value="pro">
        <Chip value="basic">Basic</Chip>
        <Chip value="pro">Pro</Chip>
    </ChipGroup>
{:else if scenario === "checkbox-group"}
    <ChipGroup label="Toppings" type="checkbox" name="topping" value={["ham"]}>
        <Chip value="cheese">Cheese</Chip>
        <Chip value="ham">Ham</Chip>
    </ChipGroup>
{:else if scenario === "row"}
    <ChipGroup label="Filter" layout="row">
        <Chip href="/?f=1">One</Chip>
        <Chip href="/?f=2" selected>Two</Chip>
        <Chip href="/?f=3">Three</Chip>
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
