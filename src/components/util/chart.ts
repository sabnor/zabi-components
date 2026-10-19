/**
 * What the four charts share: the series colours, a number formatter, a
 * linear scale with round ticks, and the few path builders. Plain arithmetic
 * that writes SVG; there is no chart library under it.
 */

/**
 * `glass` on a chart: the library's thick material (the one a Tooltip and a
 * sheet are made of, the level that carries description and caption text),
 * the container corner and room inside it. `on-surface` gives the text its
 * theme colours back when the chart stands in a brand or accent block. Every
 * fallback of the material (reduced transparency, more contrast, forced
 * colours, no backdrop-filter, data-materials="opaque") comes with the class.
 */
export const CHART_GLASS = "material-thick on-surface rounded-container p-4";

/** A theme colour by name. */
export type ChartColorName = "primary" | "accent" | "success" | "warning" | "error" | "info" | "neutral";

/** A theme colour by name, or any CSS colour (`"#c2410c"`, `"var(--color-brand-800)"`). */
export type ChartColor = ChartColorName | (string & {});

/** A number as text: the two built in, or the app's own function. */
export type ChartFormat = "number" | "percent" | ((value: number) => string);

/** One value of a `BarChart` or a `PieChart`. */
export interface ChartDatum {
    label: string;
    value: number;
    /** Without it, the series colour of its place in the list. */
    color?: ChartColor;
}

/** One line of a `LineChart`. */
export interface ChartSeries {
    name: string;
    /** One value per x label; `null` leaves a gap in the line. */
    points: Array<number | null>;
    /** Without it, the series colour of its place in the list. */
    color?: ChartColor;
}

const NAMED: Record<ChartColorName, string> = {
    primary: "var(--color-action-primary)",
    accent: "var(--color-accent)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    error: "var(--color-error)",
    info: "var(--color-info)",
    neutral: "var(--color-neutral)",
};

/**
 * The six series colours, in order. Each is a custom property an app may set
 * on the chart or on anything around it (read with a fallback, declared
 * nowhere), and falls back to a step of the theme's own ramps, so it follows
 * light and dark and the app's brand.
 *
 * They are the colours the rest of the library is made of: the action blue
 * a `Progress` fills with, the accent, a deep step of each, and the neutral
 * grey. Two hues and a grey, told apart by lightness as much as by hue,
 * which is what a reader who does not see red and green needs. None is a
 * status colour. The sixth is the one colour from outside those ramps (the
 * brand turned toward red), for the rare chart with six series.
 */
export const CHART_SERIES_COLORS: readonly string[] = [
    "var(--zabi-chart-1, var(--color-action-primary))",
    "var(--zabi-chart-2, var(--color-accent-500))",
    "var(--zabi-chart-3, var(--color-brand-900))",
    "var(--zabi-chart-4, var(--color-accent-700))",
    "var(--zabi-chart-5, var(--color-base-500))",
    "var(--zabi-chart-6, color-mix(in oklch, var(--color-brand-700), var(--color-error-700)))",
];

const slot = (index: number) => ((index % 6) + 6) % 6;

/** The CSS colour of a series: its own if it names one, else the one of its place (they repeat after six). */
export function chartColor(color: ChartColor | undefined, index: number): string {
    if (!color) return CHART_SERIES_COLORS[slot(index)];
    return Object.prototype.hasOwnProperty.call(NAMED, color) ? NAMED[color as ChartColorName] : color;
}

/** The series colour a theme colour sits nearest to: one chart does not show both. */
const NEAREST = new Map<string, number>([
    ["primary", 0],
    ["info", 0],
    ["accent", 1],
    ["success", 3],
    ["neutral", 4],
]);

/**
 * The colours of a whole chart, for when named colours and places mix.
 * A series with a `color` gets it. One without keeps the series colour of
 * its place, unless a named colour in the same chart sits next to that one
 * (`success` beside the deep accent, `neutral` beside the grey): then it moves on
 * to the next series colour that is free.
 */
export function chartColors(colors: Array<ChartColor | undefined>): string[] {
    const taken = new Set<number>();
    for (const color of colors) {
        const near = color ? NEAREST.get(color) : undefined;
        if (near !== undefined) taken.add(near);
    }
    colors.forEach((color, index) => {
        if (!color && !taken.has(slot(index))) taken.add(slot(index));
    });
    const moved = new Set<number>();
    return colors.map((color, index) => {
        if (color) return chartColor(color, index);
        const own = slot(index);
        const clash = colors.some((other) => other && NEAREST.get(other) === own);
        if (!clash) return CHART_SERIES_COLORS[own];
        for (let step = 1; step < 6; step++) {
            const next = slot(own + step);
            if (!taken.has(next) && !moved.has(next)) {
                moved.add(next);
                return CHART_SERIES_COLORS[next];
            }
        }
        return CHART_SERIES_COLORS[own];
    });
}

/**
 * `"number"` is the locale's plain number. `"percent"` reads the value as
 * already a percentage (72 is "72 %", not 7,200 %). Without a `locale` the
 * runtime's is used, which on a server may not be the reader's: pass one.
 */
export function chartFormatter(format: ChartFormat | undefined, locale?: string): (value: number) => string {
    if (typeof format === "function") return format;
    const options: Intl.NumberFormatOptions =
        format === "percent"
            ? { style: "unit", unit: "percent", maximumFractionDigits: 1 }
            : { maximumFractionDigits: 2 };
    let formatter: Intl.NumberFormat;
    try {
        formatter = new Intl.NumberFormat(locale, options);
    } catch {
        formatter = new Intl.NumberFormat(undefined, options);
    }
    return (value) => formatter.format(value);
}

/** A share of the whole (0 to 1) as a whole percentage. */
export function shareFormatter(locale?: string): (share: number) => string {
    let formatter: Intl.NumberFormat;
    try {
        formatter = new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 });
    } catch {
        formatter = new Intl.NumberFormat(undefined, { style: "percent", maximumFractionDigits: 0 });
    }
    return (share) => formatter.format(share);
}

const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

/** 1, 2 or 5 times a power of ten: the one nearest to `target` intervals. */
export function niceStep(range: number, target = 4): number {
    if (!(range > 0)) return 1;
    const raw = range / target;
    const magnitude = 10 ** Math.floor(Math.log10(raw));
    const unit = raw / magnitude;
    return (unit < 1.5 ? 1 : unit < 3.5 ? 2 : unit < 7.5 ? 5 : 10) * magnitude;
}

export interface ChartScale {
    min: number;
    max: number;
    ticks: number[];
}

/**
 * The value axis. A `min` or `max` that is given is kept exactly; one that is
 * not is rounded outward to a tick. `zero` keeps zero on the axis (bars).
 */
export function chartScale(
    values: Array<number | null | undefined>,
    options: { min?: number; max?: number; zero?: boolean } = {},
): ChartScale {
    const data = values.filter(finite);
    let low = data.length ? Math.min(...data) : 0;
    let high = data.length ? Math.max(...data) : 1;
    if (options.zero) {
        low = Math.min(0, low);
        high = Math.max(0, high);
    }
    const fixedMin = finite(options.min);
    const fixedMax = finite(options.max);
    if (fixedMin) low = options.min as number;
    if (fixedMax) high = options.max as number;
    if (!(high > low)) {
        if (fixedMax && !fixedMin) low = high - 1;
        else high = low + 1;
    }
    const step = niceStep(high - low);
    if (!fixedMin) low = Math.floor(low / step) * step;
    if (!fixedMax) high = Math.ceil(high / step) * step;
    const ticks: number[] = [];
    for (let tick = Math.ceil(low / step - 1e-9) * step; tick <= high + step * 1e-9; tick += step) {
        ticks.push(Number(tick.toPrecision(12)));
    }
    return { min: Number(low.toPrecision(12)), max: Number(high.toPrecision(12)), ticks };
}

/** Every how-manyth x label fits: 1 is all of them. */
export function labelEvery(labels: string[], available: number, charWidth = 7): number {
    if (!labels.length || !(available > 0)) return 1;
    const widest = Math.max(...labels.map((label) => label.length)) * charWidth + 12;
    return Math.max(1, Math.ceil((widest * labels.length) / available));
}

/**
 * Whether the x label at `index` of `count` is drawn when only every
 * `every`-th fits. Counted back from the last, so the newest is always
 * there; the first is there too, in place of the one that would stand too
 * close to it. With room for one label only, the last.
 */
export function labelShown(index: number, count: number, every: number): boolean {
    const last = count - 1;
    if (index < 0 || index > last) return false;
    if (every <= 1 || index === last) return true;
    if (last < every) return false;
    if (index === 0) return true;
    return (last - index) % every === 0 && index >= every;
}

const round = (value: number) => Math.round(value * 100) / 100;

/** A line through the points, broken where one is missing. */
export function linePath(points: Array<{ x: number; y: number } | null>): string {
    let path = "";
    let pen = false;
    for (const point of points) {
        if (!point) {
            pen = false;
            continue;
        }
        path += `${pen ? "L" : "M"}${round(point.x)} ${round(point.y)}`;
        pen = true;
    }
    return path;
}

/** An upright bar from `from` to `to` (y), rounded at the `to` end and square where it stands on the zero line. */
export function barPath(x: number, width: number, from: number, to: number, radius: number): string {
    const height = Math.abs(to - from);
    const r = round(Math.max(0, Math.min(radius, width / 2, height)));
    const [left, base, w] = [round(x), round(from), round(width)];
    const up = to < from ? -1 : 1;
    const side = round(height - r);
    if (!(height > 0)) return "";
    return `M${left} ${base}v${up * side}a${r} ${r} 0 0 ${up < 0 ? 1 : 0} ${r} ${up * r}h${round(w - 2 * r)}a${r} ${r} 0 0 ${up < 0 ? 1 : 0} ${r} ${-up * r}v${-up * side}Z`;
}

export const CHART_MARKERS = ["circle", "square", "diamond", "triangle"] as const;
export type ChartMarker = (typeof CHART_MARKERS)[number];

/** The marker of a series, so two lines differ by more than colour (they repeat after four). */
export function chartMarker(index: number): ChartMarker {
    return CHART_MARKERS[((index % 4) + 4) % 4];
}

/** A marker centred on a point, as a path. */
export function markerPath(shape: ChartMarker, x: number, y: number, r: number): string {
    const [cx, cy] = [round(x), round(y)];
    switch (shape) {
        case "square": {
            const side = round(r * 0.9);
            return `M${cx - side} ${cy - side}h${side * 2}v${side * 2}h${-side * 2}Z`;
        }
        case "diamond": {
            const reach = round(r * 1.25);
            return `M${cx} ${cy - reach}L${cx + reach} ${cy}L${cx} ${cy + reach}L${cx - reach} ${cy}Z`;
        }
        case "triangle": {
            const reach = round(r * 1.2);
            return `M${cx} ${cy - reach}L${cx + reach} ${round(cy + reach * 0.8)}L${cx - reach} ${round(cy + reach * 0.8)}Z`;
        }
        default:
            return `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;
    }
}

export interface PieSlice {
    index: number;
    label: string;
    value: number;
    /** 0 to 1. */
    share: number;
    /** Radians, clockwise from twelve o'clock. */
    start: number;
    end: number;
}

/** The slices in the order given. A value that is not a positive number takes no room. */
export function pieSlices(data: ChartDatum[]): PieSlice[] {
    const values = data.map((datum) => (finite(datum.value) && datum.value > 0 ? datum.value : 0));
    const total = values.reduce((sum, value) => sum + value, 0);
    let angle = 0;
    return data.map((datum, index) => {
        const share = total > 0 ? values[index] / total : 0;
        const start = angle;
        angle += share * Math.PI * 2;
        return { index, label: datum.label, value: datum.value, share, start, end: angle };
    });
}

const onCircle = (cx: number, cy: number, r: number, angle: number) =>
    `${round(cx + r * Math.sin(angle))} ${round(cy - r * Math.cos(angle))}`;

/** A slice of a pie, or of a ring when `inner` is above zero. */
export function slicePath(cx: number, cy: number, outer: number, inner: number, start: number, end: number): string {
    const sweep = end - start;
    if (!(sweep > 0)) return "";
    if (sweep >= Math.PI * 2 - 1e-6) {
        // A whole turn has no arc of its own: two halves.
        const half = start + Math.PI;
        const ring = (r: number, clockwise: 0 | 1) =>
            `M${onCircle(cx, cy, r, start)}A${r} ${r} 0 1 ${clockwise} ${onCircle(cx, cy, r, half)}A${r} ${r} 0 1 ${clockwise} ${onCircle(cx, cy, r, start)}Z`;
        return inner > 0 ? ring(outer, 1) + ring(inner, 0) : ring(outer, 1);
    }
    const large = sweep > Math.PI ? 1 : 0;
    const arc = `M${onCircle(cx, cy, outer, start)}A${outer} ${outer} 0 ${large} 1 ${onCircle(cx, cy, outer, end)}`;
    if (!(inner > 0)) return `${arc}L${round(cx)} ${round(cy)}Z`;
    return `${arc}L${onCircle(cx, cy, inner, end)}A${inner} ${inner} 0 ${large} 0 ${onCircle(cx, cy, inner, start)}Z`;
}

/** How much larger than 16px the reader's text is: chart text is set in rem, and the room for it follows. */
export function chartTextScale(): number {
    if (typeof document === "undefined" || typeof getComputedStyle !== "function") return 1;
    const size = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    return size > 0 ? size / 16 : 1;
}

/**
 * Reports the width of the widest `text` inside the node, as drawn, now and
 * whenever what it is given changes. The value axis takes its room from
 * this, not from a count of characters. Where text cannot be measured
 * nothing is reported and the estimate stands.
 */
export function widestText(node: SVGElement, options: { onwidth: (width: number) => void; key?: unknown }) {
    let report = options.onwidth;
    const measure = () => {
        let widest = 0;
        for (const text of node.querySelectorAll("text")) {
            if (typeof text.getComputedTextLength !== "function") return;
            widest = Math.max(widest, text.getComputedTextLength());
        }
        if (widest > 0) report(Math.ceil(widest));
    };
    measure();
    return {
        update(next: { onwidth: (width: number) => void; key?: unknown }) {
            report = next.onwidth;
            measure();
        },
    };
}

/**
 * Reports the element's width now and whenever it changes: the charts are
 * drawn at the width of their container, in real pixels, so text is never
 * scaled. Where there is no `ResizeObserver` the width is read once.
 */
export function measureWidth(node: HTMLElement, onwidth: (width: number) => void) {
    onwidth(node.clientWidth);
    if (typeof ResizeObserver === "undefined") return {};
    const observer = new ResizeObserver(() => onwidth(node.clientWidth));
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
}

/** Reports the element's height (its border box) now and whenever it changes, as `measureWidth` does the width. */
export function measureHeight(node: HTMLElement, onheight: (height: number) => void) {
    onheight(node.offsetHeight);
    if (typeof ResizeObserver === "undefined") return {};
    const observer = new ResizeObserver(() => onheight(node.offsetHeight));
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
}
