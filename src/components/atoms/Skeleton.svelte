<script lang="ts">
    import { cn } from "../util/cn.js";
    import { mergeStrings } from "../util/ready-made-strings.js";
    import {
        DEFAULT_SKELETON_STRINGS,
        inSkeletonGroup,
        type SkeletonStrings,
    } from "../util/skeleton.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";

    type Variant = "text" | "circle" | "block";

    interface Props {
        variant?: Variant;
        /** CSS length or px number; omit to use variant default (circle stays square). */
        width?: string | number;
        /** CSS length or px number; omit for variant default height. */
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
    }

    let {
        variant = "text",
        width,
        height,
        class: className = "",
        "aria-label": ariaLabel,
        strings,
        decorative = false,
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
</script>

<div
    class={cn("animate-pulse motion-reduce:animate-none bg-neutral-subtle", defaultShape[variant], radius[variant], className)}
    style={inlineStyle || undefined}
    role={hidden ? undefined : "status"}
    aria-busy={hidden ? undefined : "true"}
    aria-label={hidden ? undefined : (ariaLabel ?? text.label)}
    aria-hidden={hidden ? "true" : undefined}
></div>
