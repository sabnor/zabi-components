<script lang="ts">
    type Variant = "text" | "circle" | "block";

    interface Props {
        variant?: Variant;
        /** CSS length or px number; omit to use variant default (circle stays square). */
        width?: string | number;
        /** CSS length or px number; omit for variant default height. */
        height?: string | number;
        class?: string;
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
