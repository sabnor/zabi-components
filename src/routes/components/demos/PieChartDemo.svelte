<script lang="ts">
    import Card from "../../../components/atoms/Card.svelte";
    import Stat from "../../../components/atoms/Stat.svelte";
    import PieChart from "../../../components/molecules/PieChart.svelte";
    import type { ChartDatum } from "../../../components/util/chart";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const answers: ChartDatum[] = [
        { label: "Rätt", value: 14, color: "success" },
        { label: "Fel", value: 4, color: "error" },
        { label: "Överhoppade", value: 2, color: "neutral" },
    ];
    const categories: ChartDatum[] = [
        { label: "Musik", value: 12 },
        { label: "Historia", value: 9 },
        { label: "Sport", value: 7 },
        { label: "Film", value: 5 },
        { label: "Natur", value: 4 },
        { label: "Övrigt", value: 3 },
    ];
</script>

<div class="w-full">
    {#if exampleIndex === 0}
        <PieChart label="Svar" data={answers} />
    {:else if exampleIndex === 2}
        <Card tone="tint">
            <div class="grid gap-6 md:grid-cols-2">
                <PieChart donut label="Utan glas" data={categories} size={144} />
                <PieChart glass donut label="Med glas" data={categories} size={144} />
            </div>
        </Card>
    {:else if exampleIndex === 3}
        <div class="grid gap-6 md:grid-cols-2">
            <PieChart donut label="Glas" data={categories} size={144} />
            <div data-materials="opaque">
                <PieChart donut label="Platt" data={categories} size={144} />
            </div>
        </div>
    {:else}
        <PieChart donut label="Frågor per kategori" categoryTitle="Kategori" valueTitle="Frågor" data={categories}>
            {#snippet center()}
                <Stat value={40} label="frågor" size="sm" align="center" />
            {/snippet}
        </PieChart>
    {/if}
</div>
