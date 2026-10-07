<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Table from "../atoms/Table.svelte";
    import { cn } from "../util/cn.js";
    import {
        CHART_GLASS,
        chartColors,
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
     *
     * Beside the key when there is room for both, over it when there is not
     * (the chart measures its own width, not the window's).
     */
    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        /** The slices, in order: a `label`, a `value` (above zero), and a `color` of its own if it needs one. */
        data: ChartDatum[];
        /** A ring, not a full disc. */
        donut?: boolean;
        /** What stands in the middle of the ring (`donut`): the total, or the one share that matters. Read by assistive technology, so keep it to what the table does not already say or say it the same way. */
        center?: Snippet;
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
        /** Stands the chart on a panel of the thick material (frosted glass), for a chart that floats over a wash, a tint or a picture. On a plain card it shows nothing: leave it off there. */
        glass?: boolean;
        class?: string;
    };

    let {
        data,
        donut = false,
        center,
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
        glass = false,
        class: className = "",
        ...restProps
    }: Props = $props();

    const uid = $props.id();
    const maskId = `${uid}-gaps`;
    const clipId = `${uid}-shape`;
    const veilId = `${uid}-veil`;
    const shineId = `${uid}-shine`;
    const lipId = `${uid}-lip`;
    const softId = `${uid}-soft`;

    const OUTER = 50;
    /** How far inside the edge the sheen lies, in the drawing's own units (of 100). */
    const SHEEN = 4;
    /** The ring is a third of the radius: a band, with room in the middle for a figure. */
    const inner = $derived(donut ? 33 : 0);
    const write = $derived(chartFormatter(format, locale));
    const share = $derived(shareFormatter(locale));
    const isValue = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

    const colors = $derived(chartColors(data.map((datum) => datum.color)));
    const slices = $derived(
        pieSlices(data).map((slice) => ({
            ...slice,
            color: colors[slice.index],
            text: isValue(slice.value) ? write(slice.value) : "",
            shareText: share(slice.share),
            path: slicePath(50, 50, OUTER, inner, slice.start, slice.end),
        })),
    );
    const drawn = $derived(slices.filter((slice) => slice.path));
    /** The whole disc or ring, as one shape: what the glass is laid over. */
    const whole = $derived(slicePath(50, 50, OUTER, inner, 0, Math.PI * 2));
    /** The width of the gap between two slices, in the drawing's own units (of 100). */
    const GAP = 1;
    const spot = (radius: number, angle: number) =>
        `${Math.round((50 + radius * Math.sin(angle)) * 100) / 100} ${Math.round((50 - radius * Math.cos(angle)) * 100) / 100}`;
    /**
     * Where two slices meet, a thin gap is cut, so they part on any surface
     * without a border colour. Every gap is one line of even width from the
     * exact centre to the rim, with a round end, so in a full pie the gaps
     * meet in one small round point in the middle and each is as wide at the
     * centre as at the rim.
     */
    const cuts = $derived(drawn.length > 1 ? drawn.map((slice) => `M50 50L${spot(OUTER + 1, slice.start)}`) : []);
</script>

<figure class={cn("zabi-chart relative m-0 flex flex-col gap-3", glass && CHART_GLASS, className)} {...restProps}>
    <figcaption class={cn("text-label text-sm font-medium", labelHidden && "sr-only")}>{label}</figcaption>

    <div class="layout">
        <div class="disc" style:max-inline-size="{size}px">
            <svg class="pie block aspect-square w-full" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
                <defs>
                    <clipPath id={clipId}><path d={whole} clip-rule="evenodd" /></clipPath>
                    <linearGradient id={veilId} x1="0" y1="0" x2="0" y2="1">
                        <stop class="veil-top" offset="0" />
                        <stop class="veil-bottom" offset="1" />
                    </linearGradient>
                    <linearGradient id={shineId} x1="0" y1="0" x2="0" y2="1">
                        <stop class="light" offset="0" />
                        <stop class="light off" offset="0.35" />
                    </linearGradient>
                    <linearGradient id={lipId} x1="0" y1="0" x2="0" y2="1">
                        <stop class="light off" offset="0.65" />
                        <stop class="light" offset="1" />
                    </linearGradient>
                    <filter id={softId} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.6" />
                    </filter>
                </defs>
                <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                    <rect width="100" height="100" fill="white" />
                    {#each cuts as cut, index (index)}
                        <path class="cut" d={cut} fill="none" stroke="black" stroke-width={GAP} stroke-linecap="round" />
                    {/each}
                </mask>
                {#if drawn.length === 0}
                    <!-- Nothing to share out: the empty shape, so the chart keeps its place. -->
                    <path class="none" d={whole} />
                {/if}
                <g mask="url(#{maskId})">
                    {#each drawn as slice (slice.index)}
                        <path class="slice" style:--_c={slice.color} d={slice.path}>
                            <title>{slice.label}: {slice.text} ({slice.shareText})</title>
                        </path>
                    {/each}
                    {#if drawn.length > 0}
                        <!--
                            The glass. The slices keep their colour, opaque; over all of them, as one
                            piece, lie the veil of a solid control, a soft sheen under the top edge,
                            and a hairline of light on the top of the rim and, on a ring, on the
                            lower lip of the hole. Nothing is drawn along the sides of a slice. The
                            gaps are cut through it with the slices. Decoration only: it takes no
                            pointer, and it is not drawn where the materials are opaque.
                        -->
                        <g class="glass" clip-path="url(#{clipId})">
                            <path class="veil" d={whole} fill="url(#{veilId})" />
                            <circle class="sheen" cx="50" cy="50" r={OUTER - SHEEN} stroke="url(#{shineId})" filter="url(#{softId})" />
                            <circle class="rim" cx="50" cy="50" r={OUTER} stroke="url(#{shineId})" />
                            {#if inner > 0}
                                <circle class="rim" cx="50" cy="50" r={inner} stroke="url(#{lipId})" />
                            {/if}
                        </g>
                    {/if}
                </g>
            </svg>
            {#if donut && center}
                <div class="center text-headline">{@render center()}</div>
            {/if}
        </div>

        {#if legend}
            <!-- The table below says the same to assistive technology. -->
            <ul class="key text-description m-0 list-none p-0 text-sm" aria-hidden="true">
                {#each slices as slice (slice.index)}
                    <li>
                        <span class="swatch" style:--_c={slice.color}></span>
                        <span class="name text-headline font-medium">{slice.label}</span>
                        <span class="text-headline tabular-nums">{slice.text}</span>
                        <span class="share tabular-nums">{slice.shareText}</span>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>

    <!-- The library's own Table, so the numbers look like every other table in the app. -->
    <Table class={showTable ? "" : "sr-only"}>
        <thead class="border-border bg-surface-elevated border-b">
            <tr>
                <th class="text-headline px-4 py-3 text-start font-medium" scope="col">{categoryTitle}</th>
                <th class="text-headline px-4 py-3 text-end font-medium" scope="col">{valueTitle}</th>
                <th class="text-headline px-4 py-3 text-end font-medium" scope="col">{shareTitle}</th>
            </tr>
        </thead>
        <tbody class="divide-border divide-y">
            {#each slices as slice (slice.index)}
                <tr>
                    <th class="text-body px-4 py-3 text-start font-normal" scope="row">{slice.label}</th>
                    <td class="text-body px-4 py-3 text-end tabular-nums">{slice.text}</td>
                    <td class="text-body px-4 py-3 text-end tabular-nums">{slice.shareText}</td>
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
    .zabi-chart {
        container-type: inline-size;
    }

    /* Side by side: the drawing, then a key that takes the rest of the width,
       as a List does. Both start where the caption starts. */
    .layout {
        display: flex;
        align-items: center;
        gap: 1.5rem 2rem;
    }

    .disc {
        position: relative;
        flex: none;
        inline-size: 100%;
    }

    /* The middle of the ring, for the app's figure: centred, and never wider than the hole. */
    .center {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 22%;
        text-align: center;
        line-height: 1.2;
        pointer-events: none;
    }

    .slice {
        fill: var(--_c);
    }

    /*
     * The marks are glass, drawn: an SVG shape takes no backdrop blur, so the
     * slices stay their own colour and the depth comes from a soft gradient
     * and a barely-there edge, in the library's own terms.
     *   the veil     --color-control-gradient-accent-start / -end, the veil of
     *                a solid control that is darken-only in light and light at
     *                the top in dark, so a slice never loses contrast to it
     *   the rim      one pixel of light on the top of the outer edge, fading out
     *                a third of the way down, and on the lower lip of a ring's
     *                hole: the lightest neutral at 30%, the same in light and
     *                dark, since the first series colours are the same in both
     *   the sheen    the same light at a third of that, blurred, just under the
     *                top edge
     *   the shadow   the two shadows of the library's middle step (--shadow-md)
     */
    .pie {
        filter: drop-shadow(0 1px 3px rgb(var(--shadow-color) / var(--shadow-opacity-contact)))
            drop-shadow(0 6px 14px rgb(var(--shadow-color) / var(--shadow-opacity)));
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

    /* Drawn on the outline and clipped to the shape, so the inner half shows: one pixel. */
    .rim {
        fill: none;
        stroke-width: 2px;
        vector-effect: non-scaling-stroke;
    }

    .sheen {
        fill: none;
        stroke-width: 3.5;
        opacity: 0.35;
    }

    /* Flat where the library's materials are opaque: the same switches, the same reasons. */
    @media (prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active) {
        .glass {
            display: none;
        }

        .pie {
            filter: none;
        }
    }

    :global([data-materials="opaque"]) .glass {
        display: none;
    }

    :global([data-materials="opaque"]) .pie {
        filter: none;
    }

    /* Nothing yet: the empty track of a Progress, in the round. */
    .none {
        fill: var(--color-progress-track);
        stroke: var(--color-progress-track-border);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
    }

    /* The rows of a List: a mark, the name, and what it comes to at the far
       end, in columns that line up down the key. */
    .key {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto auto;
        flex: 1 1 0;
        min-inline-size: 0;
    }

    .key li {
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: subgrid;
        align-items: center;
        column-gap: 0.75rem;
        padding-block: 0.75rem;
        border-block-end: 1px solid var(--zabi-list-divider-color, var(--color-border));
    }

    .key li:last-child {
        border-block-end: 0;
    }

    .name {
        overflow-wrap: anywhere;
    }

    .share {
        min-inline-size: 2.5rem;
        text-align: end;
    }

    .swatch {
        inline-size: 0.625rem;
        block-size: 0.625rem;
        border-radius: var(--radius-pill);
        background-color: var(--_c);
    }

    /* No room for both: the drawing in the middle, the key under it at full width. */
    @container (max-width: 26rem) {
        .layout {
            flex-direction: column;
            align-items: stretch;
        }

        .disc {
            align-self: center;
        }

        .key {
            flex: none;
        }
    }

    /* Forced colours: the slices are the system's text colour, parted by the
       gaps; the key lists them in the same order, clockwise from the top. */
    @media (forced-colors: active) {
        .slice {
            fill: CanvasText;
        }

        .none {
            fill: GrayText;
        }

        .swatch {
            forced-color-adjust: none;
            background-color: CanvasText;
        }
    }
</style>
