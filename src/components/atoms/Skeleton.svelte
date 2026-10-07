<script lang="ts">
    import { cn } from "../util/cn.js";
    import { mergeStrings } from "../util/ready-made-strings.js";
    import {
        DEFAULT_SKELETON_STRINGS,
        inSkeletonGroup,
        skeletonLineCount,
        type SkeletonStrings,
    } from "../util/skeleton.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";

    type Variant = "text" | "circle" | "block";
    type Tone = "neutral" | "on-color";

    interface Props {
        variant?: Variant;
        /** CSS length or px number; omit to use variant default (circle stays square). */
        width?: string | number;
        /** CSS length or px number; omit for variant default height. With `lines`, the height of each line. */
        height?: string | number;
        class?: string;
        /** The status label. Defaults to the provider's `skeleton.label`, then "Loading…". */
        "aria-label"?: string;
        /** Overrides for the built-in strings. */
        strings?: Partial<SkeletonStrings>;
        /**
         * Draws the piece only: no role, no label, hidden from assistive tech.
         * For a piece beside a status of your own. A piece under a `SkeletonGroup` is decorative already.
         */
        decorative?: boolean;
        /**
         * "neutral" is the quiet fill for a page or a card. "on-color" is the label colour of
         * the surface it sits on at a low strength, for a brand, accent or fill block (`on-brand`,
         * `on-accent`, `on-fill`, a `Card` with `tone`), in light and dark.
         */
        tone?: Tone;
        /**
         * Text variant only: draws this many lines (1 to 20) as one placeholder, the last one shorter.
         * `class` and `width` then apply to the whole paragraph, `height` to each line.
         */
        lines?: number;
    }

    let {
        variant = "text",
        width,
        height,
        class: className = "",
        "aria-label": ariaLabel,
        strings,
        decorative = false,
        tone = "neutral",
        lines,
    }: Props = $props();

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("skeleton");
    const text = $derived(mergeStrings(DEFAULT_SKELETON_STRINGS, provided(), strings));

    const grouped = inSkeletonGroup();
    const hidden = $derived(decorative || grouped);

    const radius: Record<Variant, string> = {
        text: "rounded-control",
        circle: "rounded-full",
        block: "rounded-control",
    };

    const defaultShape: Record<Variant, string> = {
        text: "w-full h-3",
        circle: "w-10 aspect-square",
        block: "w-full h-32",
    };

    const fill: Record<Tone, string> = {
        neutral: "bg-neutral-subtle",
        "on-color": "bg-skeleton-on-color",
    };

    function toSize(value: string | number): string {
        return typeof value === "number" ? `${value}px` : value;
    }

    const inlineStyle = $derived(
        [
            width !== undefined ? `width: ${toSize(width)}` : null,
            height !== undefined ? `height: ${toSize(height)}` : null,
        ]
            .filter(Boolean)
            .join("; "),
    );

    const lineCount = $derived(variant === "text" ? skeletonLineCount(lines) : 0);
    const lineStyle = $derived(height !== undefined ? `height: ${toSize(height)}` : undefined);
    const wrapperStyle = $derived(width !== undefined ? `width: ${toSize(width)}` : undefined);
    const pieceClass = $derived(cn("animate-pulse motion-reduce:animate-none", fill[tone], radius.text));
</script>

{#if lineCount > 0}
    <div
        class={cn("flex w-full flex-col gap-2", className)}
        style={wrapperStyle}
        role={hidden ? undefined : "status"}
        aria-busy={hidden ? undefined : "true"}
        aria-label={hidden ? undefined : (ariaLabel ?? text.label)}
        aria-hidden={hidden ? "true" : undefined}
    >
        {#each { length: lineCount } as _, index (index)}
            <div
                class={cn(pieceClass, "h-3", index === lineCount - 1 && lineCount > 1 ? "w-3/5" : "w-full")}
                style={lineStyle}
                data-skeleton-line
            ></div>
        {/each}
    </div>
{:else}
    <div
        class={cn("animate-pulse motion-reduce:animate-none", fill[tone], defaultShape[variant], radius[variant], className)}
        style={inlineStyle || undefined}
        role={hidden ? undefined : "status"}
        aria-busy={hidden ? undefined : "true"}
        aria-label={hidden ? undefined : (ariaLabel ?? text.label)}
        aria-hidden={hidden ? "true" : undefined}
    ></div>
{/if}
