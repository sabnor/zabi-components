<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";
    import { chartColor, linePath, type ChartColor } from "../util/chart.js";

    /**
     * A small line with no axes, for a trend beside a figure or in a table
     * cell. Plain SVG, an image named by `label`; it has no table of its
     * own, so say what the number is in the text next to it.
     *
     * It is 5rem by 1.5rem; size it with `class` (`w-full h-8`). The line
     * stretches to the box and keeps its thickness.
     */
    type Props = Omit<SVGAttributes<SVGSVGElement>, "class" | "points" | "min" | "max" | "color"> & {
        /** The values, in order. `null` leaves a gap. */
        points: Array<number | null>;
        /** What the image is called ("Results, last eight weeks: rising"). Without it the line is decoration, hidden from assistive technology. */
        label?: string;
        /** A theme colour by name or any CSS colour. Without it, the first series colour. */
        color?: ChartColor;
        /** The bottom of the scale. Without it, the lowest value. */
        min?: number;
        /** The top of the scale. Without it, the highest value. */
        max?: number;
        class?: string;
    };

    let { points, label, color, min, max, class: className = "", ...restProps }: Props = $props();

    const isValue = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

    const path = $derived.by(() => {
        const values = points.filter(isValue);
        if (!values.length) return "";
        const low = isValue(min) ? min : Math.min(...values);
        const high = isValue(max) ? max : Math.max(...values);
        const span = high - low;
        const last = Math.max(points.length - 1, 1);
        // 100 by 100, with room above and below for the stroke; the box stretches it.
        return linePath(
            points.map((value, index) =>
                isValue(value)
                    ? {
                          x: points.length === 1 ? 50 : (index / last) * 100,
                          y: span > 0 ? 92 - (Math.min(Math.max(value, low), high) - low) / span * 84 : 50,
                      }
                    : null,
            ),
        );
    });
    /** One value alone is a dash, not a dot that stretches. */
    const d = $derived(points.filter(isValue).length === 1 && path ? "M0 50L100 50" : path);
</script>

<svg
    class={cn("zabi-sparkline inline-block h-6 w-20 align-middle", className)}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    role={label ? "img" : undefined}
    aria-label={label || undefined}
    aria-hidden={label ? undefined : "true"}
    focusable="false"
    style:--_c={chartColor(color, 0)}
    {...restProps}
>
    <path class="line" {d} />
</svg>

<style>
    /* The colour an app may set, on the line or on anything around it; read
       with a fallback (in util/chart.ts) and never declared here: --zabi-chart-1 */
    .zabi-sparkline {
        overflow: visible;
    }

    .line {
        fill: none;
        stroke: var(--_c);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
    }

    @media (forced-colors: active) {
        .line {
            stroke: CanvasText;
        }
    }
</style>
