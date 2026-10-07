<script lang="ts">
    import Card from "../../../components/atoms/Card.svelte";
    import BarChart from "../../../components/molecules/BarChart.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const rounds = [
        { label: "R1", value: 7 },
        { label: "R2", value: 9 },
        { label: "R3", value: 4 },
        { label: "R4", value: 8 },
    ];
</script>

<div class="w-full">
    {#if exampleIndex === 0}
        <BarChart
            label="Poäng per runda"
            categoryTitle="Runda"
            valueTitle="Poäng"
            data={[
                { label: "R1", value: 7 },
                { label: "R2", value: 9 },
                { label: "R3", value: 4 },
                { label: "R4", value: 8 },
            ]}
            yMax={10}
        />
    {:else if exampleIndex === 2}
        <Card tone="tint">
            <div class="grid gap-6 md:grid-cols-2">
                <BarChart label="Utan glas" data={rounds} yMax={10} height={200} />
                <BarChart glass label="Med glas" data={rounds} yMax={10} height={200} />
            </div>
        </Card>
    {:else if exampleIndex === 3}
        <div class="grid gap-6 md:grid-cols-2">
            <BarChart label="Glas" data={rounds} yMax={10} height={200} />
            <div data-materials="opaque">
                <BarChart label="Platt" data={rounds} yMax={10} height={200} />
            </div>
        </div>
    {:else}
        <BarChart
            label="Spelade per dag"
            categoryTitle="Dag"
            valueTitle="Spelade"
            data={[
                { label: "Mån", value: 12 },
                { label: "Tis", value: 18 },
                { label: "Ons", value: 9 },
                { label: "Tors", value: 22 },
                { label: "Fre", value: 15 },
            ]}
        />
    {/if}
</div>
