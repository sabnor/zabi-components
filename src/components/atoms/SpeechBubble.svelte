<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";

    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        /**
         * The caption that names the quotation ("Säg så här i luren"), read
         * before it. A string, or a snippet for a caption in the app's own
         * text style.
         */
        label?: string | Snippet;
        /** Keeps the caption for assistive technology and takes it off the screen. */
        labelHidden?: boolean;
        /** The side the tail is on: `end` (default) or `start`. Follows the text direction. */
        side?: "end" | "start";
        /**
         * `ink` (default): the headline colour as fill, the page colour as
         * text, so it is dark in light and light in dark. `paper`: the two
         * swapped, for a bubble on a filled block. A pair of your own:
         * `--zabi-bubble-fill` and `--zabi-bubble-text`, which win over both.
         */
        tone?: "ink" | "paper";
        /**
         * A drawing on the top corner of the tail's side, half over the edge
         * (a sparkle, a quotation mark). Hidden from assistive technology;
         * the app sizes and colours what it passes.
         */
        decoration?: Snippet;
        class?: string;
        /** The quoted text: phrasing content or paragraphs. */
        children?: Snippet;
    };

    let {
        label,
        labelHidden = false,
        side = "end",
        tone = "ink",
        decoration,
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    /* The type is in utility classes, so a call-site class can replace it;
       the quotation inherits it. */
    const hostClasses = $derived(cn("speech-bubble flex flex-col gap-2 text-lg font-medium", className));
</script>

<figure
    class={hostClasses}
    data-side={side === "start" ? "start" : "end"}
    data-tone={tone === "paper" ? "paper" : "ink"}
    {...restProps}
>
    {#if label}
        <figcaption class={cn("text-description text-sm font-normal", labelHidden && "sr-only")}>
            {#if typeof label === "string"}{label}{:else}{@render label()}{/if}
        </figcaption>
    {/if}
    <blockquote class="quote">
        <span class="art" aria-hidden="true">
            <span class="fill"></span>
            <svg class="tail" viewBox="0 0 30 24" focusable="false">
                <path d="M1 0C1 9 9 20 29 23 22 18 19 10 21 0Z" />
            </svg>
        </span>
        {#if decoration}
            <span class="decoration" aria-hidden="true">{@render decoration()}</span>
        {/if}
        {@render children?.()}
    </blockquote>
</figure>

<style>
    /*
     * What an app may set, on the component or on anything around it (they
     * inherit); read with a fallback and never declared here:
     *   --zabi-bubble-fill    the bubble and its tail; default by `tone`
     *   --zabi-bubble-text    the quoted text; default by `tone`
     *   --zabi-bubble-radius  any border-radius value, the eight-value form
     *                         included; default 1.5rem
     *   --zabi-bubble-tilt    turns the fill and the tail, never the text;
     *                         default 0deg
     * Inside a filled block (`on-brand`, `on-accent`, `on-fill`) the headline
     * role is the block's label colour; `--zabi-theme-headline` is the
     * theme's own, kept by the block's parent, so the bubble is the same
     * object on a block as on the page.
     */
    .quote {
        --_bubble-ink: var(--zabi-theme-headline, var(--color-headline));
        --_bubble-paper: var(--color-surface-base);
        --_bubble-fill: var(--zabi-bubble-fill, var(--_bubble-ink));
        position: relative;
        isolation: isolate;
        /* The tail hangs 0.8rem under the bubble; this keeps it off what follows. */
        margin: 0 0 1rem;
        padding: 1.125rem 1.25rem 1.25rem;
        color: var(--zabi-bubble-text, var(--_bubble-paper));
        font-style: normal;
        overflow-wrap: anywhere;
        user-select: text;
    }

    .speech-bubble[data-tone="paper"] .quote {
        --_bubble-fill: var(--zabi-bubble-fill, var(--_bubble-paper));
        color: var(--zabi-bubble-text, var(--_bubble-ink));
    }

    .art {
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        rotate: var(--zabi-bubble-tilt, 0deg);
    }

    .fill {
        position: absolute;
        inset: 0;
        border-radius: var(--zabi-bubble-radius, 1.5rem);
        background-color: var(--_bubble-fill);
    }

    /* A drawn curl that turns outward, towards the side it is on. Its top
       0.4rem is under the fill; all of it is in rem, so it grows with the text. */
    .tail {
        position: absolute;
        inset-block-start: calc(100% - 0.4rem);
        inset-inline-end: 1.5rem;
        inline-size: 1.5rem;
        block-size: 1.2rem;
        fill: var(--_bubble-fill);
    }

    .decoration {
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        display: flex;
        line-height: 0;
        pointer-events: none;
        translate: 25% -55%;
    }

    .speech-bubble[data-side="start"] .tail {
        inset-inline: 1.5rem auto;
        scale: -1 1;
    }

    .speech-bubble[data-side="start"] .decoration {
        inset-inline: 0 auto;
        translate: -25% -55%;
    }

    /* The path is drawn turning right; the other three cases follow from it. */
    .speech-bubble:dir(rtl) .tail {
        scale: -1 1;
    }

    .speech-bubble:dir(rtl) .decoration {
        translate: -25% -55%;
    }

    .speech-bubble[data-side="start"]:dir(rtl) .tail {
        scale: none;
    }

    .speech-bubble[data-side="start"]:dir(rtl) .decoration {
        translate: 25% -55%;
    }

    /* Forced colours drop the fill: the shape is an outline in the text
       colour, tilt and radius kept, and the tail is not drawn. */
    @media (forced-colors: active) {
        .fill {
            outline: 0.125rem solid CanvasText;
        }

        .tail {
            display: none;
        }
    }
</style>
