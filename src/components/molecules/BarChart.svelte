<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import Table from "../atoms/Table.svelte";
    import { cn } from "../util/cn.js";
    import {
        CHART_GLASS,
        chartColor,
        chartFormatter,
        barPath,
        chartScale,
        chartTextScale,
        labelEvery,
        measureWidth,
        widestText,
        type ChartColor,
        type ChartDatum,
        type ChartFormat,
    } from "../util/chart.js";

    /**
     * A bar chart of one set of values, drawn as plain SVG: upright bars from
     * a zero line, a label under each and its value over it. A bar is drawn
     * the way `Progress` draws its fill, and with a `yMax` each bar stands in
     * a track up to it, as a `Progress` does: so many of so many.
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
        /** The top of the value axis, and the ceiling each bar is measured against: with it every bar stands in a track that reaches it. Without it, the highest value rounded up to a tick, and no tracks. */
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
        /** Stands the chart on a panel of the thick material (frosted glass), for a chart that floats over a wash, a tint or a picture. On a plain card it shows nothing: leave it off there. */
        glass?: boolean;
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
        glass = false,
        class: className = "",
        ...restProps
    }: Props = $props();

    /** Before it is measured (on the server) the drawing is laid out this wide and scaled to fit. */
    const FALLBACK_WIDTH = 600;
    /** The widest a bar gets: a bar is a `Progress` stood on end, a rod and not a block. */
    const WIDEST = 24;

    const uid = $props.id();
    const clipId = `${uid}-bars`;
    const veilId = `${uid}-veil`;
    const shineId = `${uid}-shine`;
    const streakId = `${uid}-streak`;
    const softId = `${uid}-soft`;

    let measured = $state(0);
    let tickWidth = $state(0);

    const width = $derived(measured > 0 ? measured : FALLBACK_WIDTH);
    /** Chart text is set in rem; the room for it grows with the reader's text size. */
    const rem = $derived(measured > 0 ? chartTextScale() : 1);
    const plotHeight = $derived(Math.max(height, 80));
    const top = $derived(showValues ? Math.round(24 * rem) : 8);
    const bottom = $derived(Math.round(28 * rem));
    const format = $derived(chartFormatter(yFormat, locale));
    const isValue = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
    const scale = $derived(chartScale(data.map((datum) => datum.value), { max: yMax, zero: true }));
    const tickLabels = $derived(scale.ticks.map((tick) => format(tick)));
    /** The value axis takes the width of its widest label as drawn; until that is known, an estimate. */
    const left = $derived((tickWidth || Math.max(...tickLabels.map((text) => text.length), 1) * 7 * rem) + 12);
    const innerWidth = $derived(Math.max(width - left, 10));
    const innerHeight = $derived(Math.max(plotHeight - top - bottom, 10));
    const band = $derived(innerWidth / Math.max(data.length, 1));
    const barWidth = $derived(Math.max(1, Math.min(band * 0.5, WIDEST)));
    /** A ceiling the app gave, and nothing below zero: each bar has a track up to it. */
    const tracks = $derived(isValue(yMax) && scale.min >= 0 && scale.max > 0);
    const every = $derived(labelEvery(data.map((datum) => datum.label), innerWidth, 7 * rem));
    /** A value over every bar only while each has room for it. */
    const valuesFit = $derived(showValues && band >= Math.max(...tickLabels.map((text) => text.length), 1) * 7 * rem);
    /** Where the bars stand: zero, or the end of the axis nearest to it. */
    const zero = $derived(Math.min(Math.max(0, scale.min), scale.max));

    const y = (value: number) => top + innerHeight - ((value - scale.min) / (scale.max - scale.min)) * innerHeight;

    const bars = $derived(
        data.map((datum, index) => {
            const value = isValue(datum.value) ? Math.min(Math.max(datum.value, scale.min), scale.max) : 0;
            const from = y(zero);
            const to = y(value);
            return {
                label: datum.label,
                text: isValue(datum.value) ? format(datum.value) : "",
                color: datum.color ? chartColor(datum.color, index) : chartColor(color, 0),
                centre: left + band * (index + 0.5),
                top: Math.min(from, to),
                height: Math.abs(from - to),
                path: barPath(left + band * (index + 0.5) - barWidth / 2, barWidth, from, to, barWidth / 2),
                track: barPath(left + band * (index + 0.5) - barWidth / 2, barWidth, from, y(scale.max), barWidth / 2),
                below: value < zero,
            };
        }),
    );
</script>

<figure class={cn("zabi-chart relative m-0 flex flex-col gap-3", glass && CHART_GLASS, className)} {...restProps}>
    <figcaption class={cn("text-label text-sm font-medium", labelHidden && "sr-only")}>{label}</figcaption>

    <div class="w-full" use:measureWidth={(value) => (measured = value)}>
        <svg class="plot block w-full" viewBox="0 0 {width} {plotHeight}" height={plotHeight} aria-hidden="true" focusable="false">
            <g use:widestText={{ onwidth: (value) => (tickWidth = value), key: [tickLabels, measured] }}>
                {#each scale.ticks as tick, index (tick)}
                    {#if tick !== zero}
                        <line class="grid" x1={left} x2={left + innerWidth} y1={y(tick)} y2={y(tick)} />
                    {/if}
                    <text class="tick" x={left - 12} y={y(tick)} text-anchor="end" dominant-baseline="central">
                        {tickLabels[index]}
                    </text>
                {/each}
            </g>

            {#each bars as bar, index (index)}
                {#if tracks}<path class="track" d={bar.track} />{/if}
                <path class="bar" style:--_c={bar.color} d={bar.path}>
                    <title>{bar.label}: {bar.text}</title>
                </path>
                {#if valuesFit && bar.text}
                    <text
                        class="value"
                        x={bar.centre}
                        y={bar.below ? bar.top + bar.height + 16 * rem : (tracks ? top : bar.top) - 8}
                        text-anchor="middle"
                    >
                        {bar.text}
                    </text>
                {/if}
                {#if index % every === 0}
                    <text class="label" x={bar.centre} y={plotHeight - bottom + 20 * rem} text-anchor="middle">{bar.label}</text>
                {/if}
            {/each}

            <!--
                The glass, as on a PieChart: the bars keep their colour, opaque, and over them
                lie the veil of a solid control, a hairline of light on the round end of each
                bar and a soft sheen down its near side. Decoration only; not drawn where the materials are opaque.
            -->
            <defs>
                <clipPath id={clipId}>
                    {#each bars as bar, index (index)}<path d={bar.path} />{/each}
                </clipPath>
                <linearGradient id={veilId} x1="0" y1="0" x2="0" y2="1">
                    <stop class="veil-top" offset="0" />
                    <stop class="veil-bottom" offset="1" />
                </linearGradient>
                <linearGradient id={shineId} x1="0" y1="0" x2="0" y2="1">
                    <stop class="light" offset="0" />
                    <stop class="light off" offset="0.5" />
                </linearGradient>
                <linearGradient id={streakId} gradientUnits="userSpaceOnUse" x1="0" y1={top} x2="0" y2={top + innerHeight}>
                    <stop class="light" offset="0" />
                    <stop class="light off" offset="1" />
                </linearGradient>
                <filter id={softId} filterUnits="userSpaceOnUse" x="0" y="0" {width} height={plotHeight}>
                    <feGaussianBlur stdDeviation="1.2" />
                </filter>
            </defs>
            <g class="glass" clip-path="url(#{clipId})">
                {#each bars as bar, index (index)}
                    {#if bar.height > 0}
                        <path class="veil" d={bar.path} fill="url(#{veilId})" />
                        <path class="rim" d={bar.path} stroke="url(#{shineId})" />
                        {#if barWidth >= 12 && bar.height > barWidth}
                            <line
                                class="sheen"
                                filter="url(#{softId})"
                                x1={bar.centre - barWidth / 2 + 4.5}
                                x2={bar.centre - barWidth / 2 + 4.5}
                                y1={bar.top + barWidth / 2}
                                y2={bar.top + bar.height - barWidth / 2}
                                stroke="url(#{streakId})"
                            />
                        {/if}
                    {/if}
                {/each}
            </g>

            <!-- The zero line is drawn last, so every bar stands on it. -->
            <line class="grid axis" x1={left} x2={left + innerWidth} y1={y(zero)} y2={y(zero)} />
        </svg>
    </div>

    <!-- The library's own Table, so the numbers look like every other table in the app. -->
    <Table class={showTable ? "" : "sr-only"}>
        <thead class="border-border bg-surface-elevated border-b">
            <tr>
                <th class="text-headline px-4 py-3 text-start font-medium" scope="col">{categoryTitle}</th>
                <th class="text-headline px-4 py-3 text-end font-medium" scope="col">{valueTitle}</th>
            </tr>
        </thead>
        <tbody class="divide-border divide-y">
            {#each bars as bar, index (index)}
                <tr>
                    <th class="text-body px-4 py-3 text-start font-normal" scope="row">{bar.label}</th>
                    <td class="text-body px-4 py-3 text-end tabular-nums">{bar.text}</td>
                </tr>
            {/each}
        </tbody>
    </Table>
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

    /* The library's hairline, as between the rows of a list; the line the bars
       stand on is the edge a Progress track has. */
    .grid {
        stroke: var(--color-border);
        stroke-width: 1;
        shape-rendering: crispEdges;
    }

    .grid.axis {
        stroke: var(--color-border-strong);
    }

    /* The track of a Progress, stood on end: same fill, same edge. */
    .track {
        fill: var(--color-progress-track);
        stroke: var(--color-progress-track-border);
        stroke-width: 1;
    }

    .tick,
    .label {
        fill: var(--color-caption);
        font-size: 0.75rem;
        font-variant-numeric: tabular-nums;
    }

    /* What a bar is called reads a step firmer than the scale beside it. */
    .label {
        fill: var(--color-description);
    }

    .value {
        fill: var(--color-headline);
        font-size: 0.75rem;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
    }

    .bar {
        fill: var(--_c);
    }

    /*
     * The bars are glass, drawn, in the same terms as the slices of a PieChart (which has the
     * list): the veil of a solid control, one pixel of light on the round end fading down the
     * sides, a soft sheen down the near side, and the contact shadow.
     */
    .bar {
        /* The contact shadow only: a wider one is a smudge under a rod this thin. */
        filter: drop-shadow(0 1px 2px rgb(var(--shadow-color) / var(--shadow-opacity-contact)));
    }

    .glass {
        pointer-events: none;
    }

    .veil-top {
        stop-color: var(--color-control-gradient-accent-start);
    }

    .veil-bottom {
        stop-color: var(--color-control-gradient-accent-end);
    }

    .light {
        stop-color: color-mix(in srgb, var(--zabi-base-50) 30%, transparent);
    }

    .light.off {
        stop-opacity: 0;
    }

    .rim {
        fill: none;
        stroke-width: 2px;
        vector-effect: non-scaling-stroke;
    }

    .sheen {
        stroke-width: 3;
        stroke-linecap: round;
        opacity: 0.45;
    }

    /* Flat where the library's materials are opaque: the same switches, the same reasons. */
    @media (prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active) {
        .glass {
            display: none;
        }

        .bar {
            filter: none;
        }
    }

    :global([data-materials="opaque"]) .glass {
        display: none;
    }

    :global([data-materials="opaque"]) .bar {
        filter: none;
    }

    /* Forced colours: bars in the system's text colour; the labels tell them apart. */
    @media (forced-colors: active) {
        .bar,
        .tick,
        .label,
        .value {
            fill: CanvasText;
        }

        .grid,
        .grid.axis {
            stroke: GrayText;
        }

        .track {
            fill: Canvas;
            stroke: CanvasText;
        }

        .bar {
            fill: Highlight;
        }
    }
</style>
