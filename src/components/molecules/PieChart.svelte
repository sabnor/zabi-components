<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";
    import {
        chartColor,
        chartFormatter,
        pieSlices,
        shareFormatter,
        slicePath,
        type ChartDatum,
        type ChartFormat,
    } from "../util/chart.js";

    /**
     * A pie chart, or a ring with `donut`, drawn as plain SVG: parts of a
     * whole, clockwise from twelve o'clock in the order given.
     *
     * It is a `figure`: the `label` is its caption, the drawing is hidden
     * from assistive technology, and the same numbers are in a real table
     * (off screen unless `showTable`). The key beside the drawing writes each
     * slice's label, value and share, in the order of the slices, so no slice
     * is told by its colour alone. Keep it to six slices or fewer: after six
     * the colours repeat, and a pie with more is hard to read anyway.
     */
    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        /** The slices, in order: a `label`, a `value` (above zero), and a `color` of its own if it needs one. */
        data: ChartDatum[];
        /** A ring, not a full disc. */
        donut?: boolean;
        /** How a value is written: `number` (default), `percent` (72 is "72 %"), or a function. */
        format?: ChartFormat;
        /** The widest the drawing gets, in px. It shrinks with its container. */
        size?: number;
        /** The caption, and what the chart is called. */
        label: string;
        /** Keeps the caption for assistive technology and takes it off the screen. */
        labelHidden?: boolean;
        /** The key beside the drawing: each slice's label, value and share. */
        legend?: boolean;
        /** Shows the data table under the chart; otherwise it is there for assistive technology only. */
        showTable?: boolean;
        /** The heading of the table's first column. */
        categoryTitle?: string;
        /** The heading of the table's value column. */
        valueTitle?: string;
        /** The heading of the table's share column. */
        shareTitle?: string;
        /** The language of the built-in number formats. Without it, the runtime's. */
        locale?: string;
        class?: string;
    };

    let {
        data,
        donut = false,
        format = "number",
        size = 192,
        label,
        labelHidden = false,
        legend = true,
        showTable = false,
        categoryTitle = "Category",
        valueTitle = "Value",
        shareTitle = "Share",
        locale,
        class: className = "",
        ...restProps
    }: Props = $props();

    const uid = $props.id();
    const maskId = `${uid}-gaps`;

    const OUTER = 50;
    const inner = $derived(donut ? 30 : 0);
    const write = $derived(chartFormatter(format, locale));
    const share = $derived(shareFormatter(locale));
    const isValue = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

    const slices = $derived(
        pieSlices(data).map((slice) => ({
            ...slice,
            color: chartColor(data[slice.index].color, slice.index),
            text: isValue(slice.value) ? write(slice.value) : "",
            shareText: share(slice.share),
            path: slicePath(50, 50, OUTER, inner, slice.start, slice.end),
        })),
    );
    const drawn = $derived(slices.filter((slice) => slice.path));
    /** Where two slices meet, a thin gap is cut, so they part on any surface without a border colour. */
    const cuts = $derived(
        drawn.length > 1
            ? drawn.map((slice) => ({
                  x: 50 + (OUTER + 1) * Math.sin(slice.start),
                  y: 50 - (OUTER + 1) * Math.cos(slice.start),
              }))
            : [],
    );
</script>

<figure class={cn("zabi-chart relative m-0 flex flex-col gap-3", className)} {...restProps}>
    <figcaption class={cn("text-headline text-sm font-medium", labelHidden && "sr-only")}>{label}</figcaption>

    <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
        <svg
            class="pie block aspect-square w-full flex-none"
            style:max-inline-size="{size}px"
            viewBox="0 0 100 100"
            aria-hidden="true"
            focusable="false"
        >
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                <rect width="100" height="100" fill="white" />
                {#each cuts as cut, index (index)}
                    <line x1="50" y1="50" x2={cut.x} y2={cut.y} stroke="black" stroke-width="1.25" />
                {/each}
            </mask>
            <g mask="url(#{maskId})">
                {#each drawn as slice (slice.index)}
                    <path class="slice" style:--_c={slice.color} d={slice.path}>
                        <title>{slice.label}: {slice.text} ({slice.shareText})</title>
                    </path>
                {/each}
            </g>
        </svg>

        {#if legend}
            <!-- The table below says the same to assistive technology. -->
            <ul class="key text-description m-0 flex min-w-0 list-none flex-col gap-2 p-0 text-sm" aria-hidden="true">
                {#each slices as slice (slice.index)}
                    <li class="flex items-baseline gap-2">
                        <span class="swatch" style:--_c={slice.color}></span>
                        <span class="min-w-0">{slice.label}</span>
                        <span class="text-headline font-medium tabular-nums">{slice.text}</span>
                        <span class="tabular-nums">{slice.shareText}</span>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>

    <div class={showTable ? "overflow-x-auto" : "sr-only"}>
        <table class="data text-body w-full text-sm">
            <thead>
                <tr>
                    <th scope="col">{categoryTitle}</th>
                    <th scope="col">{valueTitle}</th>
                    <th scope="col">{shareTitle}</th>
                </tr>
            </thead>
            <tbody>
                {#each slices as slice (slice.index)}
                    <tr>
                        <th scope="row">{slice.label}</th>
                        <td>{slice.text}</td>
                        <td>{slice.shareText}</td>
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
    .slice {
        fill: var(--_c);
    }

    .swatch {
        flex: none;
        inline-size: 0.625rem;
        block-size: 0.625rem;
        border-radius: 0.125rem;
        background-color: var(--_c);
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

    /* Forced colours: the slices are the system's text colour, parted by the
       gaps; the key lists them in the same order, clockwise from the top. */
    @media (forced-colors: active) {
        .slice {
            fill: CanvasText;
        }

        .swatch {
            forced-color-adjust: none;
            background-color: CanvasText;
        }
    }
</style>
