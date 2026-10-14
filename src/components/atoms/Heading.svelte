<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";
    import type { OnFillTone } from "../types/variants.js";
    import { displayVoice } from "../util/display-voice.js";

    /** Semantic heading level — also the default visual size. */
    type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

    type Props = Omit<HTMLAttributes<HTMLHeadingElement>, "class"> & {
        level?: HeadingLevel;
        /**
         * Visual size, when it should differ from the semantic level — an `h2`
         * that needs to look like an `h4` keeps the document outline correct
         * without forcing the wrong tag.
         */
        size?: HeadingLevel;
        /** Heading text. Ignored when `children` is provided. */
        text?: string;
        /**
         * Text colour. `headline` (the default) is for a page or a card. On a
         * filled block use `inherit` (the block's own colour), `on-brand` or
         * `on-accent`.
         */
        tone?: "headline" | OnFillTone;
        /**
         * `heading` is the document heading voice. `display` is the second
         * face (`--font-family-display`) with larger steps, for a hero, a
         * score or a big number; its weight and tracking are the custom
         * properties `--zabi-display-weight` and `--zabi-display-tracking`.
         */
        variant?: "heading" | "display";
        class?: string;
        children?: Snippet;
    };

    let {
        level = 1,
        size,
        text = "",
        tone = "headline",
        variant = "heading",
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    const toneClasses: Record<"headline" | OnFillTone, string> = {
        headline: "text-headline",
        inherit: "text-inherit",
        "on-brand": "text-on-brand",
        "on-accent": "text-on-accent",
    };

    const visualSize = $derived(size ?? level);

    /**
     * Display sizes tighten as they grow. Untracked 36px type with default
     * 40px leading is the single clearest "this is stock Tailwind" tell;
     * negative tracking and a tighter leading is most of what separates
     * display type from body type set large.
     */
    const sizeClasses: Record<HeadingLevel, string> = {
        1: "text-4xl leading-10 tracking-[-0.02em] font-bold",
        2: "text-3xl leading-9 tracking-[-0.015em] font-bold",
        3: "text-2xl leading-8 tracking-[-0.01em] font-semibold",
        4: "text-xl leading-7 tracking-[-0.005em] font-semibold",
        5: "text-lg leading-7 font-semibold",
        6: "text-base leading-6 font-semibold",
    };

    /**
     * Display steps: 60px (48 on a phone), 48 (36), 36 (30), 30, 24, 20. Weight and tracking come from
     * `displayVoice`, so no size carries its own.
     */
    const displaySizeClasses: Record<HeadingLevel, string> = {
        1: "text-5xl sm:text-6xl leading-[1.0]",
        2: "text-4xl sm:text-5xl leading-[1.05]",
        3: "text-3xl sm:text-4xl leading-[1.1]",
        4: "text-3xl leading-[1.2]",
        5: "text-2xl leading-[1.2]",
        6: "text-xl leading-[1.2]",
    };

    const headingClasses = $derived(
        variant === "display"
            ? cn(
                  `${toneClasses[tone] ?? toneClasses.headline} font-display text-balance ${displayVoice} ${displaySizeClasses[visualSize] ?? displaySizeClasses[6]} ${className}`,
              )
            : cn(`${toneClasses[tone] ?? toneClasses.headline} ${sizeClasses[visualSize] ?? sizeClasses[6]} ${className}`),
    );
</script>

<!--
  The font family comes from `--font-family-heading`, which the theme applies
  to h1–h6 in its base layer and which defaults to `--font-family-sans`. This
  component used to carry its own `font-family: "Nunito Sans"` in a local
  <style> block, which meant a consumer who rebranded the font token got a
  rebranded body and Nunito Sans headings.
-->
{#snippet content()}
    {#if children}
        {@render children()}
    {:else}
        {text}
    {/if}
{/snippet}

<!-- One branch per level, not a dynamic element: hydration takes a dynamic
element out and puts it back, which blurs a control inside it that the user
had already tabbed to. -->
{#if level === 1}
    <h1 class={headingClasses} {...restProps}>{@render content()}</h1>
{:else if level === 2}
    <h2 class={headingClasses} {...restProps}>{@render content()}</h2>
{:else if level === 3}
    <h3 class={headingClasses} {...restProps}>{@render content()}</h3>
{:else if level === 4}
    <h4 class={headingClasses} {...restProps}>{@render content()}</h4>
{:else if level === 5}
    <h5 class={headingClasses} {...restProps}>{@render content()}</h5>
{:else}
    <h6 class={headingClasses} {...restProps}>{@render content()}</h6>
{/if}
