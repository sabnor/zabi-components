<script lang="ts">
    import Card from "../../../components/atoms/Card.svelte";
    import LineChart from "../../../components/molecules/LineChart.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const xLabels = ["v. 36", "v. 37", "v. 38", "v. 39", "v. 40"];
    const points = [31, 36, 34, 41, 44];
    const goal = [35, 35, 40, 40, 45];
</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <LineChart
            label="Rätt svar per vecka"
            xTitle="Vecka"
            {xLabels}
            series={[
                { name: "Vårt lag", points: [62, 68, 71, 66, 78] },
                { name: "Snitt", points: [58, 60, 59, 63, 64] },
            ]}
            yMin={0}
            yMax={100}
            yFormat="percent"
        />
    </div>
{:else if exampleIndex === 2}
    <Card tone="tint" class="w-full">
        <div class="grid gap-6 md:grid-cols-2">
            <LineChart
                label="Utan glas"
                {xLabels}
                series={[
                    { name: "Vårt lag", points: [62, 68, 71, 66, 78] },
                    { name: "Snitt", points: [58, 60, 59, 63, 64] },
                ]}
                yMin={0}
                yMax={100}
                yFormat="percent"
                height={200}
            />
            <LineChart
                glass
                label="Med glas"
                {xLabels}
                series={[
                    { name: "Vårt lag", points: [62, 68, 71, 66, 78] },
                    { name: "Snitt", points: [58, 60, 59, 63, 64] },
                ]}
                yMin={0}
                yMax={100}
                yFormat="percent"
                height={200}
            />
        </div>
    </Card>
{:else}
    <div class="w-full" style="--zabi-chart-1: var(--color-accent)">
        <LineChart
            label="Poäng"
            xTitle="Vecka"
            {xLabels}
            series={[
                { name: "Poäng", points },
                { name: "Mål", points: goal, color: "neutral" },
            ]}
            showTable
        />
    </div>
{/if}
