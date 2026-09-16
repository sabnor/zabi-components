<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

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
        class?: string;
        children?: Snippet;
    };

    let {
        level = 1,
        size,
        text = "",
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    const visualSize = $derived(size ?? level);
    const Tag = $derived(`h${level}`);

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

    const headingClasses = $derived(
        `text-headline ${sizeClasses[visualSize] ?? sizeClasses[6]} ${className}`.trim(),
    );
</script>

<!--
  The font family comes from `--font-family-sans`, applied on `body`. This
  component used to carry its own `font-family: "Nunito Sans"` in a local
  <style> block, which meant a consumer who rebranded the font token got a
  rebranded body and Nunito Sans headings.
-->
<svelte:element this={Tag} class={headingClasses} {...restProps}>
    {#if children}
        {@render children()}
    {:else}
        {text}
    {/if}
</svelte:element>
