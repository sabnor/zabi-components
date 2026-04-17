<script lang="ts">
    type Variant = "text" | "circle" | "block";

    interface Props {
        /** Shape of the skeleton placeholder. */
        variant?: Variant;
        /**
         * Explicit width. Accepts any CSS length string or a pixel number.
         * When omitted, the element fills its parent (except `circle`, which
         * stays square at its default size). Pass a Tailwind `w-*` utility
         * via `class` to override using utilities instead.
         */
        width?: string | number;
        /**
         * Explicit height. Accepts any CSS length string or a pixel number.
         * When omitted, each variant uses a sensible default via utilities.
         */
        height?: string | number;
        /** Extra classes forwarded to the root element. */
        class?: string;
        /** Accessible label announced by assistive tech. */
        "aria-label"?: string;
    }

    let {
        variant = "text",
        width,
        height,
        class: className = "",
        "aria-label": ariaLabel = "Loading…",
    }: Props = $props();

    const radius: Record<Variant, string> = {
        text: "rounded-md",
        circle: "rounded-full",
        block: "rounded-lg",
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
    class="animate-pulse bg-surface-2 {defaultShape[variant]} {radius[variant]} {className}"
    style={inlineStyle || undefined}
    role="status"
    aria-busy="true"
    aria-label={ariaLabel}
></div>
