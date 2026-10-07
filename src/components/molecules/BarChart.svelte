<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";
    import {
        chartColor,
        chartFormatter,
        chartScale,
        labelEvery,
        measureWidth,
        type ChartColor,
        type ChartDatum,
        type ChartFormat,
    } from "../util/chart.js";

    /**
     * A bar chart of one set of values, drawn as plain SVG: upright bars from
     * a zero line, a label under each and its value over it.
     *
     * It is a `figure`: the `label` is its caption, the drawing is hidden
     * from assistive technology, and the same numbers are in a real table
     * (off screen unless `showTable`). The bars are one colour, since the
     * labels tell them apart; a datum may carry its own.
     */
    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        /** The bars, in order: a `label`, a `value`, and a `color` of its own if it needs one. */
        data: ChartDatum[];
        /** The colour of the bars: a theme colour by name or any CSS colour. Without it, the first series colour. */
        color?: ChartColor;
        /** The top of the value axis. Without it, the highest value rounded up to a tick. */
        yMax?: number;
        /** How a value is written: `number` (default), `percent` (72 is "72 %"), or a function. */
        yFormat?: ChartFormat;
        /** Height of the drawing in px. The width is the container's. */
        height?: number;
        /** The caption, and what the chart is called. */
        label: string;
        /** Keeps the caption for assistive technology and takes it off the screen. */
        labelHidden?: boolean;
        /** Writes each value over its bar. */
        showValues?: boolean;
        /** Shows the data table under the chart; otherwise it is there for assistive technology only. */
        showTable?: boolean;
        /** The heading of the table's first column. */
        categoryTitle?: string;
        /** The heading of the table's value column. */
        valueTitle?: string;
        /** The language of the built-in number formats. Without it, the runtime's. */
        locale?: string;
        class?: string;
    };

    let {
        data,
        color,
        yMax,
        yFormat = "number",
        height = 240,
        label,
        labelHidden = false,
        showValues = true,
        showTable = false,
        categoryTitle = "Category",
        valueTitle = "Value",
        locale,
        class: className = "",
        ...restProps
    }: Props = $props();

    /** Before it is measured (on the server) the drawing is laid out this wide and scaled to fit. */
    const FALLBACK_WIDTH = 600;
    const RIGHT = 4;
    const BOTTOM = 26;

    let measured = $state(0);

    const width = $derived(measured > 0 ? measured : FALLBACK_WIDTH);
    const plotHeight = $derived(Math.max(height, 80));
    const top = $derived(showValues ? 22 : 10);
    const format = $derived(chartFormatter(yFormat, locale));
    const isValue = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
    const scale = $derived(chartScale(data.map((datum) => datum.value), { max: yMax, zero: true }));
    const tickLabels = $derived(scale.ticks.map((tick) => format(tick)));
    const left = $derived(Math.max(...tickLabels.map((text) => text.length), 1) * 7 + 12);
    const innerWidth = $derived(Math.max(width - left - RIGHT, 10));
    const innerHeight = $derived(plotHeight - top - BOTTOM);
    const band = $derived(innerWidth / Math.max(data.length, 1));
    const barWidth = $derived(Math.max(1, Math.min(band * 0.7, 56)));
    const every = $derived(labelEvery(data.map((datum) => datum.label), innerWidth));
    /** A value over every bar only while each has room for it. */
    const valuesFit = $derived(showValues && band >= Math.max(...tickLabels.map((text) => text.length), 1) * 7);

    const y = (value: number) => top + innerHeight - ((value - scale.min) / (scale.max - scale.min)) * innerHeight;

    const bars = $derived(
        data.map((datum, index) => {
            const value = isValue(datum.value) ? Math.min(Math.max(datum.value, scale.min), scale.max) : 0;
            const from = y(0 < scale.min ? scale.min : 0 > scale.max ? scale.max : 0);
            const to = y(value);
            return {
                label: datum.label,
                text: isValue(datum.value) ? format(datum.value) : "",
                color: datum.color ? chartColor(datum.color, index) : chartColor(color, 0),
                centre: left + band * (index + 0.5),
                top: Math.min(from, to),
                height: Math.abs(from - to),
                below: value < 0,
            };
        }),
    );
</script>

<figure class={cn("zabi-chart relative m-0 flex flex-col gap-2", className)} {...restProps}>
    <figcaption class={cn("text-headline text-sm font-medium", labelHidden && "sr-only")}>{label}</figcaption>

    <div class="w-full" use:measureWidth={(value) => (measured = value)}>
        <svg class="plot block w-full" viewBox="0 0 {width} {plotHeight}" height={plotHeight} aria-hidden="true" focusable="false">
            {#each scale.ticks as tick, index (tick)}
                <line class="grid" class:zero={tick === 0} x1={left} x2={left + innerWidth} y1={y(tick)} y2={y(tick)} />
                <text class="tick" x={left - 8} y={y(tick)} text-anchor="end" dominant-baseline="middle">
                    {tickLabels[index]}
                </text>
            {/each}

            {#each bars as bar, index (index)}
                <rect
                    class="bar"
                    style:--_c={bar.color}
                    x={bar.centre - barWidth / 2}
                    y={bar.top}
                    width={barWidth}
                    height={bar.height}
                    rx={Math.min(2, barWidth / 2, bar.height / 2)}
                >
                    <title>{bar.label}: {bar.text}</title>
                </rect>
                {#if valuesFit && bar.text}
                    <text
                        class="value"
                        x={bar.centre}
                        y={bar.below ? bar.top + bar.height + 14 : bar.top - 6}
                        text-anchor="middle"
                    >
                        {bar.text}
                    </text>
                {/if}
                {#if index % every === 0}
                    <text class="tick" x={bar.centre} y={plotHeight - 6} text-anchor="middle">{bar.label}</text>
                {/if}
            {/each}
        </svg>
    </div>

    <div class={showTable ? "overflow-x-auto" : "sr-only"}>
        <table class="data text-body w-full text-sm">
            <thead>
                <tr>
                    <th scope="col">{categoryTitle}</th>
                    <th scope="col">{valueTitle}</th>
                </tr>
            </thead>
            <tbody>
                {#each bars as bar, index (index)}
                    <tr>
                        <th scope="row">{bar.label}</th>
                        <td>{bar.text}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</figure>

<style>
    /*
     * The series colours an app may set, on the chart or on anything around
     * it; read with a fallback (in util/chart.ts) and never declared here:
     *   --zabi-chart-1 … --zabi-chart-6
     */
    .plot {
        overflow: visible;
    }

    .grid {
        stroke: var(--color-border);
        stroke-width: 1;
        shape-rendering: crispEdges;
    }

    .grid.zero {
        stroke: var(--color-description);
    }

    .tick {
        fill: var(--color-description);
        font-size: 12px;
        font-variant-numeric: tabular-nums;
    }

    .value {
        fill: var(--color-headline);
        font-size: 12px;
        font-weight: 500;
        font-variant-numeric: tabular-nums;
    }

    .bar {
        fill: var(--_c);
    }

    .data th,
    .data td {
        padding: 0.25rem 0.75rem 0.25rem 0;
        text-align: start;
        font-variant-numeric: tabular-nums;
        border-block-end: 1px solid var(--color-border);
    }

    .data th {
        font-weight: 500;
    }

    /* Forced colours: bars in the system's text colour; the labels tell them apart. */
    @media (forced-colors: active) {
        .bar,
        .tick,
        .value {
            fill: CanvasText;
        }

        .grid {
            stroke: GrayText;
        }
    }
</style>
