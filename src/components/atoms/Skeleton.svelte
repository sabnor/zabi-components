<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

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

    /**
     * Anything else a `div` takes (`id`, `data-testid`, `style`, `aria-*`) goes to the piece, or to the
     * paragraph's wrapper with `lines`. `role`, `aria-busy`, `aria-hidden` and `data-skeleton` are set by
     * the component and are not overridden.
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "role" | "aria-busy" | "aria-hidden"> & {
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
    };

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
        style,
        ...restProps
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

    /**
     * The variant's own box, at zero specificity (`:where()`): any size class at
     * the call site wins over it in the stylesheet, whether `cn()` knows its name
     * (`size-14`) or not (`size-sticker`, an app's own step).
     */
    const defaultShape: Record<Variant, string> = {
        text: "[:where(&)]:w-full [:where(&)]:h-3",
        circle: "[:where(&)]:w-10 aspect-square",
        block: "[:where(&)]:w-full [:where(&)]:h-32",
    };

    const fill: Record<Tone, string> = {
        neutral: "bg-neutral-subtle",
        "on-color": "bg-skeleton-on-color",
    };

    function toSize(value: string | number): string {
        return typeof value === "number" ? `${value}px` : value;
    }

    /** The component's own inline styles first, then the caller's `style`, which wins where both set a property. */
    function joinStyles(...parts: Array<string | null | undefined>): string | undefined {
        const joined = parts
            .filter(Boolean)
            .map((part) => String(part).replace(/;\s*$/, ""))
            .join("; ");
        return joined || undefined;
    }

    const inlineStyle = $derived(
        joinStyles(
            width !== undefined ? `width: ${toSize(width)}` : null,
            height !== undefined ? `height: ${toSize(height)}` : null,
            style,
        ),
    );

    const lineCount = $derived(variant === "text" ? skeletonLineCount(lines) : 0);
    const lineStyle = $derived(height !== undefined ? `height: ${toSize(height)}` : undefined);
    const wrapperStyle = $derived(joinStyles(width !== undefined ? `width: ${toSize(width)}` : null, style));
    const pieceClass = $derived(cn("animate-pulse motion-reduce:animate-none", fill[tone], radius.text));
</script>

{#if lineCount > 0}
    <div
        {...restProps}
        class={cn("flex w-full flex-col gap-2", className)}
        style={wrapperStyle}
        data-skeleton-paragraph
        role={hidden ? undefined : "status"}
        aria-busy={hidden ? undefined : "true"}
        aria-label={hidden ? undefined : (ariaLabel ?? text.label)}
        aria-hidden={hidden ? "true" : undefined}
    >
        {#each { length: lineCount } as _, index (index)}
            <div
                class={cn(pieceClass, "h-3", index === lineCount - 1 && lineCount > 1 ? "w-3/5" : "w-full")}
                style={lineStyle}
                data-skeleton="text"
                data-skeleton-line
            ></div>
        {/each}
    </div>
{:else}
    <div
        {...restProps}
        class={cn("animate-pulse motion-reduce:animate-none", fill[tone], defaultShape[variant], radius[variant], className)}
        style={inlineStyle}
        data-skeleton={variant}
        role={hidden ? undefined : "status"}
        aria-busy={hidden ? undefined : "true"}
        aria-label={hidden ? undefined : (ariaLabel ?? text.label)}
        aria-hidden={hidden ? "true" : undefined}
    ></div>
{/if}
