<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";
    import {
        chartColor,
        chartFormatter,
        chartMarker,
        chartScale,
        labelEvery,
        measureWidth,
        linePath,
        markerPath,
        type ChartFormat,
        type ChartSeries,
    } from "../util/chart.js";

    /**
     * A line chart for one or a few series over shared x labels, drawn as
     * plain SVG.
     *
     * It is a `figure`: the `label` is its caption, the drawing is hidden
     * from assistive technology, and the same numbers are in a real table
     * (off screen unless `showTable`). Each series has its own marker shape
     * as well as its own colour. Pointing at or tapping the plot shows the
     * values at that x label in the row under it.
     *
     * The six series colours are `--zabi-chart-1` to `--zabi-chart-6`, set on
     * the chart or on anything around it; they default to theme tokens that
     * follow light and dark.
     */
    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        /** The lines: a `name` and one value per x label (`null` leaves a gap). Up to six keep a colour of their own. */
        series: ChartSeries[];
        /** The labels along the x axis, one per point. */
        xLabels?: string[];
        /** The bottom of the y axis. Without it, the lowest value rounded down to a tick. */
        yMin?: number;
        /** The top of the y axis. Without it, the highest value rounded up to a tick. */
        yMax?: number;
        /** How a value is written: `number` (default), `percent` (72 is "72 %"), or a function. */
        yFormat?: ChartFormat;
        /** Height of the drawing in px. The width is the container's. */
        height?: number;
        /** The caption, and what the chart is called. */
        label: string;
        /** Keeps the caption for assistive technology and takes it off the screen. */
        labelHidden?: boolean;
        /** The key under the plot. Without it, shown when there is more than one series. */
        legend?: boolean;
        /** A marker on every point, a different shape per series. */
        markers?: boolean;
        /** Shows the data table under the chart; otherwise it is there for assistive technology only. */
        showTable?: boolean;
        /** The heading of the table's first column (what the x labels are: "Week"). */
        xTitle?: string;
        /** The language of the built-in number formats. Without it, the runtime's. */
        locale?: string;
        class?: string;
    };

    let {
        series,
        xLabels = [],
        yMin,
        yMax,
        yFormat = "number",
        height = 240,
        label,
        labelHidden = false,
        legend,
        markers = true,
        showTable = false,
        xTitle = "",
        locale,
        class: className = "",
        ...restProps
    }: Props = $props();

    /** Before it is measured (on the server) the drawing is laid out this wide and scaled to fit. */
    const FALLBACK_WIDTH = 600;
    const TOP = 10;
    const RIGHT = 12;
    const BOTTOM = 26;

    let measured = $state(0);
    let active = $state<number | null>(null);

    const width = $derived(measured > 0 ? measured : FALLBACK_WIDTH);
    const plotHeight = $derived(Math.max(height, 80));
    const format = $derived(chartFormatter(yFormat, locale));
    const count = $derived(Math.max(xLabels.length, ...series.map((line) => line.points.length), 0));
    const scale = $derived(chartScale(series.flatMap((line) => line.points), { min: yMin, max: yMax }));
    const tickLabels = $derived(scale.ticks.map((tick) => format(tick)));
    const left = $derived(Math.max(...tickLabels.map((text) => text.length), 1) * 7 + 12);
    const innerWidth = $derived(Math.max(width - left - RIGHT, 10));
    const innerHeight = $derived(plotHeight - TOP - BOTTOM);
    const every = $derived(labelEvery(xLabels, innerWidth));
    const showLegend = $derived(legend ?? series.length > 1);

    const x = (index: number) => (count <= 1 ? left + innerWidth / 2 : left + (index * innerWidth) / (count - 1));
    const y = (value: number) => TOP + innerHeight - ((value - scale.min) / (scale.max - scale.min)) * innerHeight;
    const isValue = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

    const lines = $derived(
        series.map((line, index) => {
            const points = Array.from({ length: count }, (_, at) => {
                const value = line.points[at];
                return isValue(value) ? { x: x(at), y: y(value) } : null;
            });
            return {
                name: line.name,
                color: chartColor(line.color, index),
                marker: chartMarker(index),
                points,
                path: linePath(points),
            };
        }),
    );

    function nearest(event: PointerEvent) {
        if (count === 0) return;
        const box = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
        if (!(box.width > 0)) return;
        const at = ((event.clientX - box.left) / box.width) * width;
        const index = count <= 1 ? 0 : Math.round(((at - left) / innerWidth) * (count - 1));
        active = Math.min(count - 1, Math.max(0, index));
    }

    /** A finger lifting leaves the values up; a mouse leaving takes them away. */
    function leave(event: PointerEvent) {
        if (event.pointerType === "mouse") active = null;
    }
</script>

<figure class={cn("zabi-chart relative m-0 flex flex-col gap-2", className)} {...restProps}>
    <figcaption class={cn("text-headline text-sm font-medium", labelHidden && "sr-only")}>{label}</figcaption>

    <div class="w-full" use:measureWidth={(value) => (measured = value)}>
        <svg
            class="plot block w-full"
            viewBox="0 0 {width} {plotHeight}"
            height={plotHeight}
            aria-hidden="true"
            focusable="false"
            onpointermove={nearest}
            onpointerdown={nearest}
            onpointerleave={leave}
        >
            {#each scale.ticks as tick, index (tick)}
                <line class="grid" x1={left} x2={left + innerWidth} y1={y(tick)} y2={y(tick)} />
                <text class="tick" x={left - 8} y={y(tick)} text-anchor="end" dominant-baseline="middle">
                    {tickLabels[index]}
                </text>
            {/each}

            {#each xLabels as text, index (index)}
                {#if index % every === 0 && index < count}
                    <text
                        class="tick"
                        x={x(index)}
                        y={plotHeight - 6}
                        text-anchor={count > 1 && index === 0 ? "start" : count > 1 && index === count - 1 ? "end" : "middle"}
                    >
                        {text}
                    </text>
                {/if}
            {/each}

            {#if active !== null}
                <line class="guide" x1={x(active)} x2={x(active)} y1={TOP} y2={TOP + innerHeight} />
            {/if}

            {#each lines as line, lineIndex (lineIndex)}
                <g class="series" style:--_c={line.color}>
                    <path class="line" d={line.path} />
                    {#each line.points as point, index (index)}
                        {#if point && (markers || index === active)}
                            <path
                                class="marker"
                                d={markerPath(line.marker, point.x, point.y, index === active ? 5 : 3.5)}
                            />
                        {/if}
                    {/each}
                </g>
            {/each}
        </svg>
    </div>

    <!-- The key, and the values at the x label pointed at. The table below says the same to assistive technology. -->
    <div class="key text-description flex min-h-5 flex-wrap items-center gap-x-4 gap-y-1 text-xs" aria-hidden="true">
        {#if active !== null && xLabels[active] !== undefined}
            <span class="text-headline font-medium">{xLabels[active]}</span>
        {/if}
        {#if showLegend || active !== null}
            {#each lines as line, index (index)}
                {@const value = active === null ? null : series[index].points[active]}
                <span class="inline-flex items-center gap-1">
                    <svg class="swatch" viewBox="0 0 12 12" width="12" height="12" style:--_c={line.color}>
                        <path class="marker" d={markerPath(line.marker, 6, 6, 4)} />
                    </svg>
                    <span>{line.name}</span>
                    {#if isValue(value)}
                        <span class="text-headline font-medium tabular-nums">{format(value)}</span>
                    {/if}
                </span>
            {/each}
        {/if}
    </div>

    <div class={showTable ? "overflow-x-auto" : "sr-only"}>
        <table class="data text-body w-full text-sm">
            <thead>
                <tr>
                    {#if xTitle}<th scope="col">{xTitle}</th>{:else}<td></td>{/if}
                    {#each series as line, column (column)}
                        <th scope="col">{line.name}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each { length: count } as _, index (index)}
                    <tr>
                        <th scope="row">{xLabels[index] ?? index + 1}</th>
                        {#each series as line, column (column)}
                            {@const value = line.points[index]}
                            <td>{isValue(value) ? format(value) : ""}</td>
                        {/each}
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
        /* A sideways drag reads along the line; an up or down one still scrolls the page. */
        touch-action: pan-y;
    }

    .grid {
        stroke: var(--color-border);
        stroke-width: 1;
        shape-rendering: crispEdges;
    }

    .guide {
        stroke: var(--color-description);
        stroke-width: 1;
        stroke-dasharray: 3 3;
    }

    .tick {
        fill: var(--color-description);
        font-size: 12px;
        font-variant-numeric: tabular-nums;
    }

    .line {
        fill: none;
        stroke: var(--_c);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .marker {
        fill: var(--_c);
    }

    .swatch {
        flex: none;
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

    /* Forced colours: the drawing is in the system's text colour, and the
       marker shapes and the key tell the series apart. */
    @media (forced-colors: active) {
        .line {
            stroke: CanvasText;
        }

        .marker,
        .tick {
            fill: CanvasText;
        }

        .grid,
        .guide {
            stroke: GrayText;
        }
    }
</style>
