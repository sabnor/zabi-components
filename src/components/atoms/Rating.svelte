<script lang="ts">
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import Star from "@lucide/svelte/icons/star";
    import X from "@lucide/svelte/icons/x";
    import type { HTMLAttributes } from "svelte/elements";
    import type { SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";
    import { resetValueOf, groupBinding } from "../util/hydration.js";
    import { isRtl, radioKeyIndex } from "../util/radio-keys.js";
    import {
        RATING_STRINGS,
        clampRating,
        defaultRatingFormat,
        starCount,
        starFill,
        type RatingStrings,
    } from "../util/rating.js";
    import { generateId } from "../util/ssr-safe.js";

    /** Other attributes (`data-*`, `id`, ...) land on the host element. */
    type Props = Omit<
        HTMLAttributes<HTMLDivElement>,
        "class" | "onchange" | "aria-label" | "aria-labelledby"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        /** Stars given, or `null` for no rating; supports `bind:value`. */
        value?: number | null;
        /** Number of stars. */
        max?: number;
        /** Names the rating ("Quiz"). Shown above the stars unless `hideLabel`. */
        label?: string;
        /** Keeps `label` as the accessible name only. */
        hideLabel?: boolean;
        /** Names the rating when there is no `label`. */
        "aria-label"?: string;
        /** Id of the element that names the rating, when there is no `label`. */
        "aria-labelledby"?: string;
        /** Size of a star. An interactive star is a 44px target at every size. */
        size?: SizeVariant;
        /**
         * Colour of a filled star: the primary action colour, or the app's
         * accent (`--color-accent`). An app can also set the colours itself:
         * `--zabi-rating-on` and `--zabi-rating-off`, see THEMING.md.
         */
        tone?: "primary" | "accent";
        /**
         * Shows a score instead of asking for one: one image with one name,
         * and a star can be partly filled (3.5 fills half of the fourth).
         */
        readonly?: boolean;
        /**
         * Adds a clear button beside the stars, and Delete or Backspace clears
         * too. Pressing the selected star again never clears.
         */
        clearable?: boolean;
        disabled?: boolean;
        /**
         * Name the value is submitted under in a form. Nothing is submitted
         * without a rating. Without a name the rating is not part of the form
         * around it: it submits nothing and a form reset leaves it alone.
         */
        name?: string;
        /** Shows the number beside the stars. On by default when `readonly`. */
        showValue?: boolean;
        /** Turns the value into text for a locale ("3,5"). At most one decimal by default. */
        formatValue?: (value: number) => string;
        /** Overrides for the built-in strings. */
        strings?: Partial<RatingStrings>;
        /** Called when the user changes the rating; `null` when it was cleared. */
        onchange?: (value: number | null) => void;
    };

    let {
        class: className = "",
        value = $bindable<Exclude<Props["value"], undefined>>(),
        max = 5,
        label = "",
        hideLabel = false,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        size = "md",
        tone = "primary",
        readonly = false,
        clearable = false,
        disabled = false,
        name = "",
        showValue,
        formatValue,
        strings,
        onchange,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (value === undefined) value = null;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    const baseId = generateId("rating");
    const labelId = `${baseId}-label`;
    const valueId = `${baseId}-value`;
    /**
     * The radios always share a name, the caller's or one made here: without
     * one they are not a group to the browser, and before the page hydrates a
     * second choice would leave the first one checked beside it.
     *
     * With a name made here they are also kept out of any form around them
     * (`form` names a form that does not exist), so nothing is submitted
     * that the caller did not name, as before.
     */
    const groupName = $derived(name || `${baseId}-group`);

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("rating");
    const text = $derived({ ...RATING_STRINGS, ...provided(), ...strings });
    const count = $derived(starCount(max));
    const stars = $derived(Array.from({ length: count }, (_, index) => index + 1));
    /** What the stars show: the value held within 0..max. */
    const shown = $derived(clampRating(value, count));
    const valueShown = $derived(showValue ?? readonly);
    const labelVisible = $derived(!!label && !hideLabel);

    function format(current: number): string {
        return formatValue ? formatValue(current) : defaultRatingFormat(current);
    }

    const valueText = $derived(shown === null ? "" : format(shown));
    /** "3.5 of 5 stars", or "No rating". */
    const valueLabel = $derived(
        shown === null ? text.noRating : text.starLabel(valueText, count),
    );

    /** The star that takes Tab: the selected one, or the first when none is. */
    const tabStop = $derived(value !== null && stars.includes(value) ? value : 1);

    const inputs: (HTMLInputElement | undefined)[] = $state([]);

    function select(next: number | null) {
        if (disabled || next === value) return;
        value = next;
        onchange?.(next);
    }

    /**
     * The radios are bound, so a star picked before the page hydrated is kept:
     * Svelte's binding hands it over here instead of overwriting it (see
     * util/hydration.ts), and it goes through `select` like any other choice,
     * `onchange` included. A form reset empties the rating, as it empties
     * a bound native input.
     */
    const chosen = groupBinding<number>(
        () => value,
        (star) => select(star),
        () => {
            if (!disabled) value = resetValueOf<number>(inputs) ?? null;
        },
    );

    /** The clear button hides once there is nothing to clear, so focus goes back to the stars. */
    function clear() {
        if (disabled || value === null) return;
        select(null);
        inputs[0]?.focus();
    }

    /** `focused` is the index of the star the key was pressed on, which need not be the selected one. */
    function handleKeydown(event: KeyboardEvent, focused: number) {
        if (disabled) return;
        if (event.key === "Delete" || event.key === "Backspace") {
            if (!clearable) return;
            event.preventDefault();
            clear();
            return;
        }
        const next = radioKeyIndex(
            event.key,
            focused,
            count,
            isRtl(event.currentTarget as Element),
            value !== null && stars.includes(value),
        );
        if (next === -1) return;
        event.preventDefault();
        select(stars[next]);
        inputs[next]?.focus();
    }
</script>

{#snippet glyph(fill: number | undefined)}
    <span class="rating-glyph" style:--zabi-rating-fill={fill} aria-hidden="true">
        <Star class="rating-glyph-empty" />
        <span class="rating-glyph-fill"><Star fill="currentColor" /></span>
    </span>
{/snippet}

{#snippet valueOutput()}
    <span
        class={cn(
            "shrink-0 text-sm tabular-nums",
            shown === null ? "text-description" : "font-medium text-body",
        )}
        data-rating-value
        aria-hidden={readonly ? undefined : "true"}
    >
        {shown === null ? (readonly ? text.noRating : "") : valueText}
    </span>
{/snippet}

{#if readonly}
    <!-- One image with one name. Its children, the visible label and number
    included, are presentational, so nothing is read twice. -->
    <div
        class={cn("rating", className)}
        data-size={size}
        data-tone={tone}
        data-readonly
        role="img"
        aria-label={ariaLabelledby
            ? undefined
            : [label || ariaLabel, valueLabel].filter(Boolean).join(", ")}
        aria-labelledby={ariaLabelledby ? `${ariaLabelledby} ${valueId}` : undefined}
        {...restProps}
    >
        {#if labelVisible}
            <span class="mb-1 block text-sm font-medium text-label">{label}</span>
        {/if}
        <span class="flex flex-wrap items-center gap-2">
            <span class="rating-stars">
                {#each stars as star (star)}
                    {@render glyph(starFill(shown, star))}
                {/each}
            </span>
            {#if valueShown}
                {@render valueOutput()}
            {/if}
        </span>
        {#if ariaLabelledby}
            <span id={valueId} class="sr-only">{valueLabel}</span>
        {/if}
    </div>
{:else}
    <div
        class={cn("rating", disabled && "opacity-50", className)}
        data-size={size}
        data-tone={tone}
        {...restProps}
    >
        {#if labelVisible}
            <span id={labelId} class="mb-1 block text-sm font-medium text-label">{label}</span>
        {/if}
        <div class="flex flex-wrap items-center gap-2">
            <!-- Native radio inputs: one Tab stop, Space selects, a press on
            the selected one changes nothing, and the value goes with a form. -->
            <div
                class="rating-stars"
                role="radiogroup"
                aria-labelledby={labelVisible ? labelId : label ? undefined : ariaLabelledby}
                aria-label={labelVisible ? undefined : label || ariaLabel}
                aria-disabled={disabled ? "true" : undefined}
            >
                {#each stars as star, index (star)}
                    <label class="rating-star" data-on={shown !== null && star <= shown ? "" : undefined}>
                        <input
                            bind:this={inputs[index]}
                            type="radio"
                            class="sr-only"
                            name={groupName}
                            form={name ? undefined : groupName}
                            value={star}
                            bind:group={chosen.value}
                            {disabled}
                            tabindex={star === tabStop ? 0 : -1}
                            aria-label={text.starLabel(format(star), count)}
                            onkeydown={(event) => handleKeydown(event, index)}
                        />
                        {@render glyph(undefined)}
                    </label>
                {/each}
            </div>
            {#if clearable}
                <!-- No `disabled:opacity-50`: the host dims a disabled rating
                once, and the button is invisible while there is nothing to clear. -->
                <button
                    type="button"
                    class={cn(
                        "focus-ring focus-ring--muted flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-control text-description transition-colors duration-150 hover:bg-surface-hover hover:text-body active:bg-surface-active motion-reduce:transition-none disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-description",
                        value === null && "invisible",
                    )}
                    aria-label={text.clearLabel}
                    title={text.clearLabel}
                    disabled={disabled || value === null}
                    onclick={clear}
                    data-rating-clear
                >
                    <X class="size-4" aria-hidden="true" />
                </button>
            {/if}
            {#if valueShown}
                {@render valueOutput()}
            {/if}
        </div>
    </div>
{/if}

<style>
    /*
     * A star is two glyphs: an outline, and a filled one on top that is cut
     * off at `--zabi-rating-fill` of its width. So a star can be half filled,
     * and filled differs from empty by shape as well as by colour.
     */
    .rating {
        --zabi-rating-star: 1.5rem;
        /* A finger is the same size whatever the text size is, so the target
           is in px; it only grows to keep room around a star enlarged by zoom. */
        --zabi-rating-target: max(44px, var(--zabi-rating-star) + 8px);
        /*
         * The star colours an app may set, on the component or on anything
         * around it (they inherit):
         *   --zabi-rating-on         a filled star
         *   --zabi-rating-on-hover   the same under the pointer; default: --zabi-rating-on
         *   --zabi-rating-on-active  the same while pressed; default: --zabi-rating-on
         *   --zabi-rating-on-edge    the outline of a filled star; default: its fill
         *   --zabi-rating-off        the outline of an empty star
         * They are read with a fallback and never declared here. Declared on
         * `.rating`, they could only be overridden by an inline style: this
         * rule would beat any class or ancestor an app set them on.
         * The defaults below are the component's own and are not for apps.
         */
        --_rating-on: var(--color-action-primary);
        --_rating-on-hover: var(--color-action-primary-hover);
        --_rating-on-active: var(--color-action-primary-active);
        --_rating-on-edge: currentColor;
        /* The outline is all there is of an empty star, so it needs 3:1 against
           what it sits on (WCAG 1.4.11). `--color-border-medium` is 2.2:1 on
           the light page and 1.9:1 on a dark card, and `--color-border-strong`
           2.49:1 on the dark elevated surface; the control boundary is held to
           3:1 on every surface level of both themes. The fallback is for an
           app whose own theme file predates the role. */
        --_rating-off: var(--color-control-border, var(--color-border-strong));
    }

    /*
     * The app's accent. An accent can be a light colour: a yellow fill is
     * about 1.3:1 on a white card, and no star made of it alone can be seen
     * there. So the filled star is outlined in the accent's text step, which
     * is held to 4.5:1 on the page and a card and 3:1 on the inset surface in
     * both themes. The outline carries the shape whatever the accent is; the
     * fill carries the colour.
     */
    .rating[data-tone="accent"] {
        --_rating-on: var(--color-accent);
        --_rating-on-hover: var(--color-accent-hover);
        --_rating-on-active: var(--color-accent-active);
        --_rating-on-edge: var(--color-accent-text);
    }

    .rating[data-size="sm"] {
        --zabi-rating-star: 1.25rem;
    }

    .rating[data-size="lg"] {
        --zabi-rating-star: 2rem;
        --zabi-rating-target: max(48px, var(--zabi-rating-star) + 8px);
    }

    .rating-stars {
        display: inline-flex;
        flex-wrap: wrap;
        /* The 44px target reaches past the first glyph; pulled back so the
           glyph lines up with the label above. Only at the start: overflow
           there cannot make the page scroll sideways, at the end it could. */
        --zabi-rating-inset: calc((var(--zabi-rating-target) - var(--zabi-rating-star)) / 2);
        margin-inline-start: calc(var(--zabi-rating-inset) * -1);
        max-width: calc(100% + var(--zabi-rating-inset));
    }

    .rating[data-readonly] .rating-stars {
        gap: 0.125rem;
        margin-inline-start: 0;
        max-width: 100%;
    }

    .rating-star {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--zabi-rating-target);
        height: var(--zabi-rating-target);
        border-radius: var(--radius-control);
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    .rating-star[data-on] {
        --zabi-rating-fill: 1;
    }

    .rating-glyph {
        position: relative;
        display: block;
        flex: none;
        width: var(--zabi-rating-star);
        height: var(--zabi-rating-star);
        transition: transform 150ms;
    }

    .rating-glyph :global(svg) {
        display: block;
        width: var(--zabi-rating-star);
        height: var(--zabi-rating-star);
        max-width: none;
    }

    .rating-glyph :global(.rating-glyph-empty) {
        color: var(--zabi-rating-off, var(--_rating-off));
    }

    /* Anchored at the start, so the filled part is on the right in a right-to-left layout. */
    .rating-glyph-fill {
        position: absolute;
        inset-block: 0;
        inset-inline-start: 0;
        width: calc(var(--zabi-rating-fill, 0) * 100%);
        overflow: hidden;
        color: var(--_rating-on-now, var(--zabi-rating-on, var(--_rating-on)));
    }

    .rating-glyph-fill :global(svg) {
        stroke: var(--zabi-rating-on-edge, var(--_rating-on-edge));
    }

    /* A preview of the rating a click would give, where a pointer can hover. */
    @media (hover: hover) {
        .rating-stars:not([aria-disabled="true"]):hover .rating-star {
            --zabi-rating-fill: 1;
            /* An app that set only --zabi-rating-on keeps that colour here. */
            --_rating-on-now: var(--zabi-rating-on-hover, var(--zabi-rating-on, var(--_rating-on-hover)));
        }

        .rating-stars:not([aria-disabled="true"]) .rating-star:hover ~ .rating-star {
            --zabi-rating-fill: 0;
        }
    }

    /* Pressed, on every pointer: the star under the finger fills and dips. */
    .rating-stars:not([aria-disabled="true"]) .rating-star:active {
        --zabi-rating-fill: 1;
        --_rating-on-now: var(--zabi-rating-on-active, var(--zabi-rating-on, var(--_rating-on-active)));
    }

    .rating-stars:not([aria-disabled="true"]) .rating-star:active .rating-glyph {
        transform: scale(0.85);
    }

    /* Same geometry as `.focus-ring`: a 2px gap, then a 2px ring. */
    .rating-star:has(:focus-visible) {
        z-index: 1;
        box-shadow:
            0 0 0 2px var(--color-focus-ring-offset),
            0 0 0 4px var(--color-focus-ring);
    }

    .rating-stars[aria-disabled="true"] .rating-star {
        cursor: not-allowed;
    }

    /* Forced colours drop every box-shadow; an outline is kept. As `.focus-ring` does in app.css. */
    @media (forced-colors: active) {
        .rating-star:has(:focus-visible) {
            outline: 2px solid Highlight;
            outline-offset: 2px;
        }

        /* An svg keeps its author colour in forced colours; the outline takes the text colour as the fill does. */
        .rating-glyph :global(.rating-glyph-empty) {
            color: CanvasText;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .rating-glyph {
            transition: none;
        }
    }
</style>
