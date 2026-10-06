<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import type { SurfaceTone } from "../types/variants.js";

    import { cn } from "../util/cn.js";
    import { toneSurface } from "../util/tone-surface.js";

    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        /**
         * The block's fill: `neutral` (the default, the card surface), `tint`,
         * `brand` or `accent`. On `brand` and `accent` the text, links, controls
         * and focus rings inside take the fill's label colour.
         */
        tone?: SurfaceTone;
        /** A fill the app chooses, any CSS colour. Wins over `tone`. The app must check the contrast of `fill` and `onFill`. */
        fill?: string;
        /** The label colour on `fill`, any CSS colour. */
        onFill?: string;
        /** Inner space: `none`, `sm` (16 / 16), `md` (16 inline, 24 block; the default) or `lg` (24 inline, 32 block). */
        padding?: "none" | "sm" | "md" | "lg";
        /** The element: `div` by default; a landmark (`section` needs a name, `aria-label` or `aria-labelledby`). */
        as?: "div" | "section" | "header" | "footer" | "article" | "aside";
        /**
         * A Block is full width and square-cornered, and does not break out of
         * a padded parent by itself: put it outside the padded container, or
         * give it a negative inline margin here (for example `-mx-4`).
         */
        class?: string;
        children?: Snippet;
    };

    let {
        tone = "neutral",
        fill,
        onFill,
        padding = "md",
        as = "div",
        class: classProp = "",
        style: styleProp,
        children,
        ...restProps
    }: Props = $props();

    const surface = $derived(toneSurface({ tone, fill, onFill }));

    const paddingClass = $derived(
        padding === "none" ? "" : padding === "sm" ? "px-4 py-4" : padding === "lg" ? "px-6 py-8" : "px-4 py-6",
    );

    const classes = $derived(
        cn("block w-full rounded-none border-none shadow-none", surface.filled ? surface.classes : "bg-card", paddingClass, classProp),
    );

    const style = $derived(
        [surface.style, typeof styleProp === "string" ? styleProp : undefined].filter(Boolean).join("; ") || undefined,
    );
</script>

<!-- One branch per element, not a dynamic element: hydration takes a dynamic
element out and puts it back (see Heading). -->
{#if as === "section"}
    <section class={classes} {style} {...restProps}>{@render children?.()}</section>
{:else if as === "header"}
    <header class={classes} {style} {...restProps}>{@render children?.()}</header>
{:else if as === "footer"}
    <footer class={classes} {style} {...restProps}>{@render children?.()}</footer>
{:else if as === "article"}
    <article class={classes} {style} {...restProps}>{@render children?.()}</article>
{:else if as === "aside"}
    <aside class={classes} {style} {...restProps}>{@render children?.()}</aside>
{:else}
    <div class={classes} {style} {...restProps}>{@render children?.()}</div>
{/if}
