<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import Table from "../atoms/Table.svelte";
    import { cn } from "../util/cn.js";
    import {
        CHART_GLASS,
        chartColors,
        chartFormatter,
        chartMarker,
        chartScale,
        chartTextScale,
        labelEvery,
        labelShown,
        measureHeight,
        measureWidth,
        widestText,
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
     * values at that x label in a small pane of the library's thick material
     * that floats over the plot beside the guide, as a Tooltip does.
     *
     * The six series colours are `--zabi-chart-1` to `--zabi-chart-6`, set on
     * the chart or on anything around it; they default to colours made from
     * theme tokens that follow light and dark. Each marker has a ring cut out
     * of the lines around it, so it shows whatever the chart stands on;
     * `--zabi-chart-surface` paints that ring a colour of your own.
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
        /** What the number is ("Correct"), for a chart of one series: the heading of the table's value column and the label in the pane of values. Without it, the series `name`. With more than one series, unused. */
        valueTitle?: string;
        /** Draws only the last this many points; the table still holds every one. Without it, all of them are drawn. */
        visible?: number;
        /** The language of the built-in number formats. Without it, the runtime's. */
        locale?: string;
        /** Stands the chart on a panel of the thick material (frosted glass), for a chart that floats over a wash, a tint or a picture. On a plain card it shows nothing: leave it off there. */
        glass?: boolean;
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
        valueTitle,
        visible,
        locale,
        glass = false,
        class: className = "",
        ...restProps
    }: Props = $props();

    const uid = $props.id();
    const maskId = `${uid}-rings`;

    /** Before it is measured (on the server) the drawing is laid out this wide and scaled to fit. */
    const FALLBACK_WIDTH = 600;
    const TOP = 8;
    /** Room at each end of the plot, so the first and last markers stand inside it. */
    const INSET = 8;
    const MARKER = 4;

    let measured = $state(0);
    let tickWidth = $state(0);
    let active = $state<number | null>(null);
    let paneHeight = $state(0);
    /** The size at which the pane of values was found taller than the plot; at that size it is drawn under the plot. */
    let underAt = $state("");

    const width = $derived(measured > 0 ? measured : FALLBACK_WIDTH);
    /** Chart text is set in rem; the room for it grows with the reader's text size. */
    const rem = $derived(measured > 0 ? chartTextScale() : 1);
    const plotHeight = $derived(Math.max(height, 80));
    const bottom = $derived(Math.round(28 * rem));
    const format = $derived(chartFormatter(yFormat, locale));
    /** Every point there is: the table holds them all. */
    const total = $derived(Math.max(xLabels.length, ...series.map((line) => line.points.length), 0));
    /** With `visible`, the drawing starts that many points from the end. */
    const start = $derived(visible !== undefined && visible >= 1 && visible < total ? total - Math.floor(visible) : 0);
    const drawnLabels = $derived(start > 0 ? xLabels.slice(start) : xLabels);
    const drawnSeries = $derived(start > 0 ? series.map((line) => ({ ...line, points: line.points.slice(start) })) : series);
    const count = $derived(Math.max(drawnLabels.length, ...drawnSeries.map((line) => line.points.length), 0));
    const scale = $derived(chartScale(drawnSeries.flatMap((line) => line.points), { min: yMin, max: yMax }));
    const tickLabels = $derived(scale.ticks.map((tick) => format(tick)));
    /** The value axis takes the width of its widest label as drawn; until that is known, an estimate. */
    const left = $derived((tickWidth || Math.max(...tickLabels.map((label) => label.length), 1) * 7 * rem) + 12);
    const innerWidth = $derived(Math.max(width - left, 10));
    const innerHeight = $derived(Math.max(plotHeight - TOP - bottom, 10));
    const span = $derived(Math.max(innerWidth - INSET * 2, 1));
    const every = $derived(labelEvery(drawnLabels, span, 7 * rem));
    const showLegend = $derived(legend ?? series.length > 1);
    /** A marker on every point only while the points stand apart; closer than that they would run into a band. */
    const roomForMarkers = $derived(count <= 1 || span / (count - 1) >= MARKER * 3);

    const x = (index: number) => (count <= 1 ? left + innerWidth / 2 : left + INSET + (index * span) / (count - 1));
    const y = (value: number) => TOP + innerHeight - ((value - scale.min) / (scale.max - scale.min)) * innerHeight;
    const isValue = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

    const colors = $derived(chartColors(drawnSeries.map((line) => line.color)));
    const lines = $derived(
        drawnSeries.map((line, index) => {
            const points = Array.from({ length: count }, (_, at) => {
                const value = line.points[at];
                return isValue(value) ? { x: x(at), y: y(value) } : null;
            });
            return {
                name: line.name,
                color: colors[index],
                marker: chartMarker(index),
                points,
                path: linePath(points),
            };
        }),
    );

    /** The word for the number: `valueTitle` on a chart of one series, otherwise each series' name. */
    const valueName = (name: string) => (series.length === 1 && valueTitle ? valueTitle : name);

    const fit = $derived(`${width}:${rem}:${plotHeight}`);
    const under = $derived(underAt === fit);
    /** A pane taller than the plot would cover the chart and what is under it: it goes under the plot instead, until the size changes. */
    $effect(() => {
        if (!under && active !== null && paneHeight > plotHeight - TOP) underAt = fit;
    });

    function nearest(event: PointerEvent) {
        if (count === 0) return;
        const box = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
        if (!(box.width > 0)) return;
        const at = ((event.clientX - box.left) / box.width) * width;
        const index = count <= 1 ? 0 : Math.round(((at - left - INSET) / span) * (count - 1));
        active = Math.min(count - 1, Math.max(0, index));
    }

    /** A finger lifting leaves the values up; a mouse leaving takes them away. */
    function leave(event: PointerEvent) {
        if (event.pointerType === "mouse") active = null;
    }
</script>

<figure
    class={cn("zabi-chart relative m-0 flex flex-col gap-3", glass && CHART_GLASS, className)}
    {...restProps}
>
    <figcaption class={cn("text-label text-sm font-medium", labelHidden && "sr-only")}>{label}</figcaption>

    <div class="relative w-full" use:measureWidth={(value) => (measured = value)}>
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
            <g use:widestText={{ onwidth: (value) => (tickWidth = value), key: [tickLabels, measured] }}>
                {#each scale.ticks as tick, index (tick)}
                    <line class="grid" class:axis={index === 0} x1={left} x2={left + innerWidth} y1={y(tick)} y2={y(tick)} />
                    <text class="tick" x={left - 12} y={y(tick)} text-anchor="end" dominant-baseline="central">
                        {tickLabels[index]}
                    </text>
                {/each}
            </g>

            {#each drawnLabels as text, index (index)}
                {#if labelShown(index, drawnLabels.length, every) && index < count}
                    <text
                        class="tick"
                        class:on={index === active}
                        x={count > 1 && index === 0 ? left : count > 1 && index === count - 1 ? left + innerWidth : x(index)}
                        y={plotHeight - bottom + 20 * rem}
                        text-anchor={count > 1 && index === 0 ? "start" : count > 1 && index === count - 1 ? "end" : "middle"}
                    >
                        {text}
                    </text>
                {/if}
            {/each}

            {#if active !== null}
                <line class="guide" x1={x(active)} x2={x(active)} y1={TOP} y2={TOP + innerHeight} />
            {/if}

            <!-- A ring is cut out of the lines around every marker, so what shows in it is
                 whatever the chart stands on: a card, a tint, a pane of glass. -->
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" {width} height={plotHeight}>
                <rect {width} height={plotHeight} fill="white" />
                {#each lines as line, lineIndex (lineIndex)}
                    {#each line.points as point, index (index)}
                        {#if point && ((markers && roomForMarkers) || index === active)}
                            <path
                                class="ring"
                                d={markerPath(line.marker, point.x, point.y, index === active ? MARKER + 1.5 : MARKER)}
                            />
                        {/if}
                    {/each}
                {/each}
            </mask>
            <g mask="url(#{maskId})">
                {#each lines as line, lineIndex (lineIndex)}
                    <g class="series" style:--_c={line.color}>
                        <path class="line" d={line.path} />
                    </g>
                {/each}
            </g>
            {#each lines as line, lineIndex (lineIndex)}
                <g class="marks" style:--_c={line.color}>
                    {#each line.points as point, index (index)}
                        {#if point && ((markers && roomForMarkers) || index === active)}
                            <path
                                class="marker"
                                d={markerPath(line.marker, point.x, point.y, index === active ? MARKER + 1.5 : MARKER)}
                            />
                        {/if}
                    {/each}
                </g>
            {/each}
        </svg>

        <!-- The values at the x label pointed at: a pane of the same material as a Tooltip, over the
             plot and beside the guide, on the side with more room; under the plot when it would be
             taller than the plot (large text on a narrow screen). The table says the same to
             assistive technology. -->
        {#if active !== null}
            {@const before = x(active) > left + innerWidth / 2}
            <div
                class="readout material-thick text-body rounded-control px-3 py-2 text-sm leading-5"
                class:under
                style:top={under ? undefined : `${TOP}px`}
                style:left={under || before ? undefined : `${((x(active) + 12) / width) * 100}%`}
                style:right={!under && before ? `${((width - x(active) + 12) / width) * 100}%` : undefined}
                aria-hidden="true"
                use:measureHeight={(value) => (paneHeight = value)}
            >
                {#if drawnLabels[active] !== undefined}
                    <div class="text-label font-medium">{drawnLabels[active]}</div>
                {/if}
                {#each lines as line, index (index)}
                    {@const value = drawnSeries[index].points[active]}
                    {#if isValue(value)}
                        <div class="row">
                            <span class="series-name">
                                <svg class="swatch" viewBox="0 0 12 12" width="12" height="12" style:--_c={line.color}>
                                    <path class="marker" d={markerPath(line.marker, 6, 6, 4)} />
                                </svg>
                                <span class="name text-description">{valueName(line.name)}</span>
                            </span>
                            <span class="value text-headline font-medium tabular-nums">{format(value)}</span>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>

    <!-- The key. The table below says the same to assistive technology. -->
    <div class="key text-description text-sm" aria-hidden="true">
        {#if showLegend}
            {#each lines as line, index (index)}
                <span class="entry">
                    <svg class="swatch" viewBox="0 0 20 12" width="20" height="12" style:--_c={line.color}>
                        <path class="line" d="M1 6H19" />
                        <path class="marker" d={markerPath(line.marker, 10, 6, 3.5)} />
                    </svg>
                    <span>{line.name}</span>
                </span>
            {/each}
        {/if}
    </div>

    <!-- The library's own Table, so the numbers look like every other table in the app. -->
    <Table class={showTable ? "" : "sr-only"}>
        <thead class="border-border bg-surface-elevated border-b">
            <tr>
                {#if xTitle}<th class="text-headline px-4 py-3 text-start font-medium" scope="col">{xTitle}</th>{:else}<td></td>{/if}
                {#each series as line, column (column)}
                    <th class="text-headline px-4 py-3 text-end font-medium" scope="col">{valueName(line.name)}</th>
                {/each}
            </tr>
        </thead>
        <tbody class="divide-border divide-y">
            {#each { length: total } as _, index (index)}
                <tr>
                    <th class="text-body px-4 py-3 text-start font-normal" scope="row">{xLabels[index] ?? index + 1}</th>
                    {#each series as line, column (column)}
                        {@const value = line.points[index]}
                        <td class="text-body px-4 py-3 text-end tabular-nums">{isValue(value) ? format(value) : ""}</td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </Table>
</figure>

<style>
    /*
     * What an app may set, on the chart or on anything around it; read with
     * a fallback and never declared here:
     *   --zabi-chart-1 … --zabi-chart-6   the series colours (util/chart.ts)
     *   --zabi-chart-surface              what the chart stands on; rings the markers
     */
    .plot {
        overflow: visible;
        /* A sideways drag reads along the line; an up or down one still scrolls the page. */
        touch-action: pan-y;
    }

    /* The library's hairline, as between the rows of a list; the line the plot
       stands on is the edge a Progress track has. */
    .grid {
        stroke: var(--color-border);
        stroke-width: 1;
        shape-rendering: crispEdges;
    }

    .grid.axis {
        stroke: var(--color-border-strong);
    }

    .guide {
        stroke: var(--color-border-medium);
    }

    .guide {
        stroke-width: 1;
        shape-rendering: crispEdges;
    }

    .tick {
        fill: var(--color-caption);
        font-size: 0.75rem;
        font-variant-numeric: tabular-nums;
    }

    .tick.on {
        fill: var(--color-headline);
        font-weight: 500;
    }

    .line {
        fill: none;
        stroke: var(--_c);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    /* A marker stands in a ring cut out of the lines (the mask above), so the ring is whatever
       is behind the chart. An app that sets --zabi-chart-surface gets the ring painted instead. */
    .marker {
        fill: var(--_c);
        stroke: var(--zabi-chart-surface, transparent);
        stroke-width: 2;
        stroke-linejoin: round;
        paint-order: stroke;
    }

    .ring {
        fill: black;
        stroke: black;
        stroke-width: 4;
        stroke-linejoin: round;
    }

    .zabi-chart {
        container-type: inline-size;
    }

    .key {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.25rem 1.25rem;
    }

    .key:empty {
        display: none;
    }

    .entry {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* The pane of values: it floats, so it is glass (the fill, blur, edge and every fallback
       come with .material-thick), and it never takes the pointer from the plot under it. */
    .readout {
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        max-inline-size: min(16rem, 70%);
        pointer-events: none;
    }

    /* Taller than the plot: in the flow under it, the width of the chart, so it covers nothing. */
    .readout.under {
        position: relative;
        max-inline-size: none;
        margin-block-start: 0.5rem;
    }

    /* A name wraps between its words, never inside one unless the word is wider than the
       pane; when the name and the value do not fit on one row, the value goes under it. */
    .row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 0 1rem;
    }

    .series-name {
        display: flex;
        flex: 1 1 auto;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .series-name .swatch {
        margin-block-start: calc((1lh - 12px) / 2);
    }

    .row .name {
        min-inline-size: 0;
        overflow-wrap: break-word;
    }

    .row .value {
        margin-inline-start: auto;
    }

    .swatch {
        flex: none;
        overflow: visible;
    }

    /* In the key a marker sits on its own line: there the ring is the line knocked back. */
    .swatch .marker {
        stroke: none;
    }

    /* Forced colours: the drawing is in the system's text colour, and the
       marker shapes and the key tell the series apart. */
    @media (forced-colors: active) {
        .line {
            stroke: CanvasText;
        }

        .marker {
            fill: CanvasText;
            stroke: Canvas;
        }

        .tick {
            fill: CanvasText;
        }

        .grid,
        .grid.axis,
        .guide {
            stroke: GrayText;
        }
    }
</style>
