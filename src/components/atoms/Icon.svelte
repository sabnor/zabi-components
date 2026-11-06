<script lang="ts">
    import type { Component } from "svelte";

    type Props = {
        /** The icon component, e.g. an `@lucide/svelte` icon. */
        icon: Component<{ size?: number | string; class?: string; strokeWidth?: number | string }>;
        /**
         * On zabi's size scale: `xs` 12px, `sm` 16px, `md` 20px (default),
         * `lg` 24px; `inherit` is 1em, the size of the text around it.
         */
        size?: "xs" | "sm" | "md" | "lg" | "inherit";
        /**
         * Gives the icon a name (`role="img"`). Without it the icon is
         * decorative and hidden from assistive technology.
         */
        label?: string;
        strokeWidth?: number | string;
        class?: string;
    };

    let { icon: IconComponent, size = "md", label, strokeWidth, class: className = "" }: Props = $props();

    /**
     * Pixels on zabi's scale, picked to match the icons the controls draw:
     * `xs` 12 sits in the IconButton `xs` box (24px), `sm` 16 in Button
     * `sm`/`md` and IconButton `md`, `md` 20 in Button `lg` and IconButton
     * `lg`, `lg` 24 in the bottom tab bar. `inherit` is 1em, the text around
     * it. A few controls draw 14px (field messages, IconButton `sm`); that
     * is between `xs` and `sm`, not a step.
     */
    const sizes: Record<NonNullable<Props["size"]>, number | string> = {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
        inherit: "1em",
    };

    const px = $derived(sizes[size] ?? sizes.md);

    // Icon libraries spread the rest props onto the svg, so these land on it.
    const Svg = $derived(IconComponent as unknown as Component<Record<string, unknown>>);
</script>

<!-- Rendered as the icon itself, with no wrapper. A name makes it an image;
without one it is decorative and hidden from assistive technology. -->
{#if label}
    <Svg size={px} {strokeWidth} class={className} role="img" aria-label={label} />
{:else}
    <Svg size={px} {strokeWidth} class={className} aria-hidden="true" focusable="false" />
{/if}
