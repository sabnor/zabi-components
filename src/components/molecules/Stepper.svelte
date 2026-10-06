<script lang="ts">
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import Check from "@lucide/svelte/icons/check";
    import { tick, untrack } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import type { SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";
    import {
        STEPPER_STRINGS,
        clampStep,
        normalizeSteps,
        stepState,
        type StepperItem,
        type StepperStep,
        type StepperStepState,
        type StepperStrings,
    } from "../util/stepper.js";

    /** Other attributes (`data-*`, `id`, `aria-labelledby`, ...) land on the host element. */
    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        /** Extra classes for the host element. */
        class?: string;
        /** The steps, in order: labels, or objects with a label and a description. */
        steps: StepperItem[];
        /**
         * Index of the current step, counted from 0; supports `bind:current`.
         * A value outside the steps is shown as the nearest step (below the
         * first: the first; past the last: the last) and the bound value is
         * left as it was given.
         */
        current?: number;
        /** Size of the markers and the text. */
        size?: SizeVariant;
        /**
         * `full` draws every step with its marker and label; `compact` draws
         * one line of text under a segmented bar. `auto` is compact while the
         * Stepper itself is narrower than 30rem, and full from there.
         */
        layout?: "auto" | "full" | "compact";
        /**
         * Makes the completed steps buttons that go back to that step. The
         * current step and the ones after it are never buttons.
         */
        interactive?: boolean;
        /** Accessible name of the navigation landmark. */
        label?: string;
        /** Overrides for the built-in strings. */
        strings?: Partial<StepperStrings>;
        /** Called with the index of the step a press went back to. Only with `interactive`. */
        onstepchange?: (index: number) => void;
    };

    let {
        class: className = "",
        steps,
        current = $bindable<Exclude<Props["current"], undefined>>(),
        size = "md",
        layout = "auto",
        interactive = false,
        label = "Progress",
        strings,
        onstepchange,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (current === undefined) current = 0;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("stepper");
    const text = $derived(mergeStrings(STEPPER_STRINGS, provided(), strings));
    const items = $derived(normalizeSteps(steps));
    /** The step shown as current: `current` held within the steps. */
    const shown = $derived(clampStep(current, items.length));
    const currentStep = $derived(items[shown]);

    /** What a step is drawn in: a button while it can be pressed, a span otherwise. */
    const bodies: (HTMLElement | undefined)[] = $state([]);

    /**
     * Only a completed step is a button, so the press is never on the current
     * one and a repeat press has nothing to clear. The button turns into the
     * current step's plain text as it is pressed; focus is put on that text,
     * so it is not dropped onto the page.
     */
    async function go(index: number) {
        if (index >= shown) return;
        current = index;
        onstepchange?.(index);
        await tick();
        bodies[index]?.focus();
    }

    /** Read out once when the current step changes, and never for the first render. */
    let announced = $state("");
    let previous: number | undefined;

    $effect(() => {
        const index = shown;
        if (previous === undefined || index === previous || index < 0) {
            previous = index;
            return;
        }
        previous = index;
        announced = untrack(() =>
            text.announcement(index + 1, items.length, items[index].label),
        );
        // Taken away again, so the list stays the one place the steps are read from.
        const timer = setTimeout(() => (announced = ""), 3000);
        return () => clearTimeout(timer);
    });
</script>

{#snippet content(step: StepperStep, index: number, state: StepperStepState)}
    <span class="stepper-marker" aria-hidden="true">
        {#if state === "completed"}
            <Check />
        {:else}
            <span class="stepper-number">{index + 1}</span>
        {/if}
    </span>
    <span class="stepper-text">
        <!-- One sentence with the number, the label and the state, so a
        translation can order them; the visible label is a repeat of it. -->
        <span class="sr-only">{text.stepLabel(index + 1, items.length, step.label, state)}</span>
        <span class="stepper-label" aria-hidden="true">{step.label}</span>
        {#if step.description}
            <span class="stepper-description">{step.description}</span>
        {/if}
    </span>
{/snippet}

{#if items.length > 0}
    <nav
        class={cn("stepper", className)}
        data-stepper
        data-size={size}
        data-layout={layout}
        data-interactive={interactive ? "" : undefined}
        aria-label={restProps["aria-labelledby"] ? undefined : label}
        {...restProps}
    >
        <div class="stepper-frame">
            <!-- The one list, in both layouts: the compact layout draws its
            markers as the segments of a bar and clips the text, so a screen
            reader reads the same steps either way. `role`, because a list
            without bullets loses its role in Safari. -->
            <ol class="stepper-list" role="list">
                {#each items as step, index (index)}
                    {@const state = stepState(index, shown)}
                    <li
                        class="stepper-step"
                        data-state={state}
                        aria-current={state === "current" ? "step" : undefined}
                    >
                        {#if interactive && state === "completed"}
                            <button
                                bind:this={bodies[index]}
                                type="button"
                                class="stepper-body focus-ring"
                                onclick={() => go(index)}
                            >
                                {@render content(step, index, state)}
                            </button>
                        {:else}
                            <!-- Never a Tab stop: -1, so that a step can take
                            focus from the button that was pressed to reach it. -->
                            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
                            <span
                                bind:this={bodies[index]}
                                class="stepper-body focus-ring"
                                tabindex={interactive ? -1 : undefined}
                            >
                                {@render content(step, index, state)}
                            </span>
                        {/if}
                        {#if index < items.length - 1}
                            <span class="stepper-connector" aria-hidden="true"></span>
                        {/if}
                    </li>
                {/each}
            </ol>
            <!-- What the compact layout shows instead of the labels. Not in
            the layout at all in the full one, and never read: the list says it. -->
            <div class="stepper-summary" aria-hidden="true" data-stepper-summary>
                <p class="stepper-summary-line">
                    <span>{text.position(shown + 1, items.length)}</span>
                    <span>—</span>
                    <span class="stepper-summary-label">{currentStep.label}</span>
                </p>
                {#if currentStep.description}
                    <p class="stepper-summary-description">{currentStep.description}</p>
                {/if}
            </div>
        </div>
        <span class="sr-only" role="status" data-stepper-status>{announced}</span>
    </nav>
{/if}

<style>
    /*
     * One list, two drawings. The full layout is the default; the compact one
     * is a set of values on `.stepper-frame`, switched on by `layout="compact"`
     * or, for `auto`, by the width of the Stepper itself. The rules below read
     * those values, so the two ways in cannot drift apart: `COMPACT` appears
     * twice and must be the same list both times.
     */
    .stepper {
        container-type: inline-size;
        /*
         * A size container has no width of its own: as an item of a flex row,
         * or centred in a column or a grid, it would be 0px wide and nothing
         * of it would show. So it asks for the width at which the full layout
         * begins, and gives way to what there is: narrower than that, it is
         * as wide as the room it gets and compact.
         */
        contain-intrinsic-inline-size: 30rem;
        min-inline-size: 0;
        --zabi-stepper-marker: 2rem;
        --zabi-stepper-bar: 8px;
        --zabi-stepper-leading: 1.25rem;
        /* The least height of a step that can be pressed. */
        --zabi-stepper-min-row: 0px;
        font-size: 0.875rem;
        line-height: var(--zabi-stepper-leading);
    }

    .stepper[data-size="sm"] {
        --zabi-stepper-marker: 1.5rem;
        --zabi-stepper-bar: 6px;
        --zabi-stepper-leading: 1rem;
        font-size: 0.75rem;
    }

    .stepper[data-size="lg"] {
        --zabi-stepper-marker: 2.5rem;
        --zabi-stepper-bar: 10px;
        --zabi-stepper-leading: 1.5rem;
        font-size: 1rem;
    }

    .stepper[data-interactive] {
        --zabi-stepper-min-row: 24px;
    }

    /* A finger is the same size whatever the text size is, so the target is in px. */
    @media (pointer: coarse) {
        .stepper[data-interactive] {
            --zabi-stepper-min-row: 44px;
        }
    }

    .stepper-frame {
        --zabi-stepper-row: max(var(--zabi-stepper-min-row), var(--zabi-stepper-marker));
        --zabi-stepper-gap: 0px;
        --zabi-stepper-step-flex: 1 1 auto;
        --zabi-stepper-last-flex: 0 1 auto;
        --zabi-stepper-body-size: auto;
        --zabi-stepper-body-least: var(--zabi-stepper-min-row);
        --zabi-stepper-marker-inline: var(--zabi-stepper-marker);
        --zabi-stepper-marker-block: var(--zabi-stepper-marker);
        --zabi-stepper-marker-edge: 2px;
        --zabi-stepper-current-gap: 2px;
        --zabi-stepper-glyph: flex;
        --zabi-stepper-connector: block;
        --zabi-stepper-summary: none;
        --zabi-stepper-text-position: static;
        --zabi-stepper-text-size: auto;
        --zabi-stepper-text-overflow: visible;
        --zabi-stepper-text-clip: none;
        --zabi-stepper-text-space: normal;
    }

    /* COMPACT */
    .stepper[data-layout="compact"] .stepper-frame {
        --zabi-stepper-row: max(var(--zabi-stepper-min-row), var(--zabi-stepper-bar));
        --zabi-stepper-gap: 4px;
        --zabi-stepper-step-flex: 1 1 0;
        --zabi-stepper-last-flex: 1 1 0;
        --zabi-stepper-body-size: 100%;
        --zabi-stepper-body-least: 0px;
        --zabi-stepper-marker-inline: 100%;
        --zabi-stepper-marker-block: var(--zabi-stepper-bar);
        --zabi-stepper-marker-edge: 1px;
        --zabi-stepper-current-gap: 0px;
        --zabi-stepper-glyph: none;
        --zabi-stepper-connector: none;
        --zabi-stepper-summary: block;
        --zabi-stepper-text-position: absolute;
        --zabi-stepper-text-size: 1px;
        --zabi-stepper-text-overflow: hidden;
        --zabi-stepper-text-clip: inset(50%);
        --zabi-stepper-text-space: nowrap;
    }

    /* COMPACT, again: in rem, so enlarged text goes compact sooner. */
    @container (width < 30rem) {
        .stepper[data-layout="auto"] .stepper-frame {
            --zabi-stepper-row: max(var(--zabi-stepper-min-row), var(--zabi-stepper-bar));
            --zabi-stepper-gap: 4px;
            --zabi-stepper-step-flex: 1 1 0;
            --zabi-stepper-last-flex: 1 1 0;
            --zabi-stepper-body-size: 100%;
        --zabi-stepper-body-least: 0px;
            --zabi-stepper-marker-inline: 100%;
            --zabi-stepper-marker-block: var(--zabi-stepper-bar);
            --zabi-stepper-marker-edge: 1px;
            --zabi-stepper-current-gap: 0px;
            --zabi-stepper-glyph: none;
            --zabi-stepper-connector: none;
            --zabi-stepper-summary: block;
            --zabi-stepper-text-position: absolute;
            --zabi-stepper-text-size: 1px;
            --zabi-stepper-text-overflow: hidden;
            --zabi-stepper-text-clip: inset(50%);
            --zabi-stepper-text-space: nowrap;
        }
    }

    .stepper-list {
        display: flex;
        align-items: flex-start;
        gap: var(--zabi-stepper-gap);
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .stepper-step {
        position: relative;
        display: flex;
        flex: var(--zabi-stepper-step-flex);
        align-items: flex-start;
        min-width: 0;
    }

    .stepper-step:last-child {
        flex: var(--zabi-stepper-last-flex);
    }

    .stepper-body {
        display: flex;
        align-items: flex-start;
        /* Between a marker and its label; not a distance that should grow with the text. */
        gap: 8px;
        width: var(--zabi-stepper-body-size);
        min-width: 0;
        min-height: var(--zabi-stepper-row);
        margin: 0;
        padding: 0;
        border: 0;
        /* A pill, as the marker in it is: the focus ring follows it. */
        border-radius: 9999px;
        background: none;
        color: inherit;
        font: inherit;
        text-align: start;
    }

    /* A segment of the bar is as wide as its share of the bar, and no wider:
       a least width there would lay the segments over each other. */
    button.stepper-body {
        min-width: var(--zabi-stepper-body-least);
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    /*
     * Completed and current are filled in the brand colour, upcoming is the
     * lighter track: a difference of shape too. Completed has a check where the others have their number, and
     * the current one stands inside a ring of its own.
     */
    .stepper-marker {
        display: flex;
        flex: none;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: var(--zabi-stepper-marker-inline);
        height: var(--zabi-stepper-marker-block);
        margin-block: calc((var(--zabi-stepper-row) - var(--zabi-stepper-marker-block)) / 2);
        /* `--zabi-stepper-fill` is what a hovered or pressed step changes. */
        border: var(--zabi-stepper-marker-edge) solid
            var(--zabi-stepper-fill, var(--color-action-primary));
        border-radius: 9999px;
        background-color: var(--zabi-stepper-fill, var(--color-action-primary));
        color: var(--color-on-brand);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        line-height: 1;
        transition:
            background-color 150ms,
            border-color 150ms,
            transform 150ms;
    }

    .stepper-marker > :global(*) {
        display: var(--zabi-stepper-glyph);
    }

    .stepper-marker > :global(svg) {
        width: 60%;
        height: 60%;
        stroke-width: 3;
    }

    /* The ring: the fill stops 2px short of the edge, and the surface shows between. */
    .stepper-step[data-state="current"] .stepper-marker {
        padding: var(--zabi-stepper-current-gap);
        background-clip: content-box;
    }

    /*
     * An upcoming marker is the progress track: a filled pill in the bar
     * layout, with the track's own edge. An app that themes the progress
     * track (an edgeless one that reaches 3:1 on its own) gets the same here.
     * `--zabi-stepper-upcoming-fill` and `--zabi-stepper-upcoming-edge` are
     * declared nowhere, so any ancestor can set them. The 8.1 look, a hollow
     * outline, is
     * `--zabi-stepper-upcoming-fill: transparent;
     *  --zabi-stepper-upcoming-edge: var(--color-control-border);`
     */
    .stepper-step[data-state="upcoming"] .stepper-marker {
        border-color: var(--zabi-stepper-upcoming-edge, var(--color-progress-track-border));
        background-color: var(--zabi-stepper-upcoming-fill, var(--color-progress-track));
        color: var(--color-description);
    }

    .stepper-text {
        position: var(--zabi-stepper-text-position);
        display: flex;
        flex-direction: column;
        width: var(--zabi-stepper-text-size);
        height: var(--zabi-stepper-text-size);
        min-width: 0;
        overflow: var(--zabi-stepper-text-overflow);
        clip-path: var(--zabi-stepper-text-clip);
        white-space: var(--zabi-stepper-text-space);
        padding-block: calc((var(--zabi-stepper-row) - var(--zabi-stepper-leading)) / 2);
        overflow-wrap: anywhere;
    }

    .stepper-label {
        color: var(--color-body);
    }

    .stepper-step[data-state="current"] .stepper-label {
        font-weight: 600;
    }

    .stepper-step[data-state="upcoming"] .stepper-label {
        color: var(--color-description);
    }

    .stepper-description,
    .stepper-summary-description {
        color: var(--color-description);
        font-size: 0.75rem;
        line-height: 1rem;
    }

    /* Solid up to the current step and dashed after it: not by colour alone. */
    .stepper-connector {
        display: var(--zabi-stepper-connector);
        flex: 1 1 1rem;
        min-width: 1rem;
        margin-inline: 8px;
        margin-block-start: calc(var(--zabi-stepper-row) / 2 - 1px);
        border-block-start: 2px dashed var(--color-control-border);
        transition: border-color 150ms;
    }

    .stepper-step[data-state="completed"] > .stepper-connector {
        border-block-start: 2px solid var(--color-action-primary);
    }

    .stepper-summary {
        display: var(--zabi-stepper-summary);
        margin-block-start: 8px;
        color: var(--color-description);
        overflow-wrap: anywhere;
    }

    .stepper-summary-line {
        margin: 0;
    }

    .stepper-summary-label {
        color: var(--color-body);
        font-weight: 600;
    }

    .stepper-summary-description {
        margin: 2px 0 0;
    }

    @media (hover: hover) {
        button.stepper-body:hover {
            --zabi-stepper-fill: var(--color-action-primary-hover);
        }

        button.stepper-body:hover .stepper-label {
            text-decoration: underline;
        }
    }

    /* Pressed, on every pointer. */
    button.stepper-body:active {
        --zabi-stepper-fill: var(--color-action-primary-active);
    }

    button.stepper-body:active .stepper-marker {
        transform: scale(0.92);
    }

    /*
     * Forced colours take every background away. The filled markers are put
     * back in the system's own pair, so filled still differs from outlined;
     * the connectors are borders, which are kept, solid and dashed. A hovered
     * or pressed step changes `--zabi-stepper-fill`, which is not read here.
     */
    @media (forced-colors: active) {
        .stepper-marker {
            forced-color-adjust: none;
            border-color: Highlight;
            background-color: Highlight;
            color: HighlightText;
        }

        .stepper-step[data-state="upcoming"] .stepper-marker {
            border-color: CanvasText;
            background-color: Canvas;
            color: CanvasText;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .stepper-marker,
        .stepper-connector {
            transition: none;
        }

        button.stepper-body:active .stepper-marker {
            transform: none;
        }
    }
</style>
