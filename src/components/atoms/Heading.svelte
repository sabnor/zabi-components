<!--
  Other attributes land on the element, `{@attach ...}` included (Svelte
  5.29+ passes an attachment on a component through the rest props). An
  action (`use:`) cannot go on a component: wrap it with `fromAction` from
  'svelte/attachments' and pass it with `{@attach}`.
-->
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
         * The `heading` variant's weight, at every level, is the custom
         * property `--zabi-heading-font-weight` when the app sets it (one
         * knob for a site's headline weight); without it, levels 1-2 are
         * bold and 3-6 semibold.
         */
        variant?: "heading" | "display";
        /**
         * With `variant="display"`: each size that has a phone step and a
         * desktop step (levels 1-3) grows smoothly with the viewport between
         * the two (from 24rem to 64rem wide) instead of jumping at `sm`.
         * Levels 4-6 have one step and stay as they are. Ignored with
         * `variant="heading"`.
         */
        fluid?: boolean;
        class?: string;
        children?: Snippet;
    };

    let {
        level = 1,
        size,
        text = "",
        tone = "headline",
        variant = "heading",
        fluid = false,
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
        1: "text-4xl leading-10 tracking-[-0.02em] font-[weight:var(--zabi-heading-font-weight,700)]",
        2: "text-3xl leading-9 tracking-[-0.015em] font-[weight:var(--zabi-heading-font-weight,700)]",
        3: "text-2xl leading-8 tracking-[-0.01em] font-[weight:var(--zabi-heading-font-weight,600)]",
        4: "text-xl leading-7 tracking-[-0.005em] font-[weight:var(--zabi-heading-font-weight,600)]",
        5: "text-lg leading-7 font-[weight:var(--zabi-heading-font-weight,600)]",
        6: "text-base leading-6 font-[weight:var(--zabi-heading-font-weight,600)]",
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

    /**
     * The same steps as `displaySizeClasses` 1-3, as one `clamp()` from the
     * phone step to the desktop step: 24rem wide gives the smaller, 64rem
     * and up the larger. Whole strings, so Tailwind finds each one.
     */
    const fluidDisplaySizeClasses: Partial<Record<HeadingLevel, string>> = {
        1: "text-[clamp(3rem,2.55rem_+_1.875vw,3.75rem)] leading-[1.0]",
        2: "text-[clamp(2.25rem,1.8rem_+_1.875vw,3rem)] leading-[1.05]",
        3: "text-[clamp(1.875rem,1.65rem_+_0.9375vw,2.25rem)] leading-[1.1]",
    };

    const displaySize = $derived(
        (fluid ? fluidDisplaySizeClasses[visualSize] : undefined) ?? displaySizeClasses[visualSize] ?? displaySizeClasses[6],
    );

    const headingClasses = $derived(
        variant === "display"
            ? cn(
                  `${toneClasses[tone] ?? toneClasses.headline} font-display text-balance ${displayVoice} ${displaySize} ${className}`,
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
