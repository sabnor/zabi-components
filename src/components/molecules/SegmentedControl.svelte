<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import type { SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";
    import { isRtl, radioKeyIndex } from "../util/radio-keys.js";
    import type { SegmentedControlOption } from "../util/segmented-control.js";

    /** Other attributes (`data-*`, `id`, ...) land on the host element. */
    type Props = Omit<
        HTMLAttributes<HTMLDivElement>,
        "class" | "onchange" | "aria-label" | "aria-labelledby"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        /** Two to four choices, shown in one row. */
        options: SegmentedControlOption[];
        /** Selected value; supports `bind:value`. `undefined` for no selection. */
        value?: string | undefined;
        /** Accessible name of the group. Not shown. */
        label?: string;
        /** Accessible name of the group, the same as `label`. */
        "aria-label"?: string;
        /** Id of a visible element that names the group, in place of `label`. */
        "aria-labelledby"?: string;
        /** Height, on the scale Input and Button use. At least 44px on a touch screen. */
        size?: SizeVariant;
        /** Equal-width segments that fill the row. Off: each segment is as wide as its label. */
        fullWidth?: boolean;
        /** Name the value is submitted under in a form. */
        name?: string;
        disabled?: boolean;
        /** Called with the new value when the user picks another segment. */
        onchange?: (value: string) => void;
    };

    let {
        class: className = "",
        options,
        value = $bindable(),
        label = "",
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        size = "md",
        fullWidth = true,
        name = "",
        disabled = false,
        onchange,
        ...restProps
    }: Props = $props();

    $effect(() => {
        if (import.meta.env?.DEV && (options.length < 2 || options.length > 4)) {
            console.warn(
                `[zabi-components] SegmentedControl is made for 2 to 4 options and got ${options.length}. Use Tabs, RadioGroup or Select for more.`,
            );
        }
    });

    const enabled = $derived(
        options.filter((option) => !disabled && !option.disabled),
    );

    /** The segment that takes Tab: the selected one, or the first that can be chosen. */
    const tabStop = $derived(
        enabled.find((option) => option.value === value)?.value ?? enabled[0]?.value,
    );

    const inputs: Record<string, HTMLInputElement | undefined> = $state({});

    /** A press on the selected segment is not a change: a single selection never clears. */
    function select(next: string) {
        if (disabled || next === value) return;
        value = next;
        onchange?.(next);
    }

    /** `focused` is the value of the segment the key was pressed on, which need not be the selected one. */
    function handleKeydown(event: KeyboardEvent, focused: string) {
        const next = radioKeyIndex(
            event.key,
            enabled.findIndex((option) => option.value === focused),
            enabled.length,
            isRtl(event.currentTarget as Element),
            enabled.some((option) => option.value === value),
        );
        if (next === -1) return;
        event.preventDefault();
        select(enabled[next].value);
        inputs[enabled[next].value]?.focus();
    }
</script>

<!-- Native radio inputs: one Tab stop, Space selects, a press on the selected
one changes nothing, and the value goes with a form. -->
<div
    class={cn("segmented", fullWidth ? "w-full" : "", className)}
    data-size={size}
    data-full-width={fullWidth ? "" : undefined}
    role="radiogroup"
    aria-label={ariaLabelledby ? undefined : label || ariaLabel}
    aria-labelledby={ariaLabelledby}
    aria-disabled={disabled ? "true" : undefined}
    {...restProps}
>
    {#each options as option (option.value)}
        {@const optionDisabled = disabled || !!option.disabled}
        {@const Icon = option.icon}
        <label class="segment">
            <input
                bind:this={inputs[option.value]}
                type="radio"
                class="sr-only"
                name={name || undefined}
                value={option.value}
                checked={value === option.value}
                disabled={optionDisabled}
                tabindex={option.value === tabStop ? 0 : -1}
                onchange={() => select(option.value)}
                onkeydown={(event) => handleKeydown(event, option.value)}
            />
            <span class="segment-face text-sm font-medium">
                {#if Icon}
                    <span class="flex shrink-0" aria-hidden="true"><Icon size={16} /></span>
                {/if}
                <span class="segment-label">{option.label}</span>
            </span>
        </label>
    {/each}
</div>

<style>
    /*
     * The states hang off the radio input (`:checked`, `:disabled`,
     * `:focus-visible`), which utilities on the face could only reach through
     * a `peer-*` variant per declaration.
     *
     * Columns are as many as fit at 3.5rem each, so two to four segments share
     * one row down to a 320px screen, and fold into rows instead of squeezing
     * the labels when the text is zoomed or the container is narrower still.
     */
    .segmented {
        --zabi-segment-height: 2.125rem;
        /* In px: side padding that grew with zoomed text would take the room the text needs. */
        --zabi-segment-pad: 12px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 3.5rem), 1fr));
        gap: 0.125rem;
        padding: 0.125rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-control);
        background: var(--color-action-secondary);
    }

    .segmented:not([data-full-width]) {
        display: inline-flex;
        flex-wrap: wrap;
        max-width: 100%;
    }

    .segmented[data-size="sm"] {
        --zabi-segment-height: 1.625rem;
        --zabi-segment-pad: 8px;
    }

    .segmented[data-size="lg"] {
        --zabi-segment-height: 2.625rem;
        --zabi-segment-pad: 16px;
    }

    /* A finger needs 44px whatever the size says. */
    @media (pointer: coarse) {
        .segmented,
        .segmented[data-size] {
            --zabi-segment-height: 2.75rem;
        }
    }

    .segment {
        position: relative;
        display: flex;
        min-width: 0;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    .segmented:not([data-full-width]) .segment {
        flex: 0 1 auto;
        min-width: 3.5rem;
    }

    .segment-face {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        /* An icon moves above its label before the label has to break. */
        flex-wrap: wrap;
        gap: 0.125rem 0.5rem;
        min-width: 0;
        min-height: var(--zabi-segment-height);
        padding: 0.25rem var(--zabi-segment-pad);
        border-radius: calc(var(--radius-control) - 0.1875rem);
        color: var(--color-body);
        line-height: 1.25;
        text-align: center;
        transition:
            background-color 150ms,
            color 150ms;
    }

    /* A long label wraps onto a second line, and breaks inside a word only when a word alone does not fit. */
    .segment-label {
        min-width: 0;
        overflow-wrap: anywhere;
        hyphens: auto;
    }

    .segment:hover input:enabled:not(:checked) + .segment-face {
        background: var(--color-surface-hover);
    }

    .segment:active input:enabled:not(:checked) + .segment-face {
        background: var(--color-surface-active);
    }

    input:checked + .segment-face {
        background: var(--color-action-primary);
        color: var(--color-action-primary-text);
    }

    /* Same geometry as `.focus-ring`: a 2px gap, then a 2px ring. */
    input:focus-visible + .segment-face {
        box-shadow:
            0 0 0 2px var(--color-focus-ring-offset),
            0 0 0 4px var(--color-focus-ring);
    }

    .segment:has(input:disabled) {
        cursor: not-allowed;
    }

    input:disabled + .segment-face {
        opacity: 0.5;
    }

    /*
     * Forced colours paint every background with the canvas colour and drop
     * every box-shadow, which would leave the selected segment looking like
     * the others and keyboard focus with no mark. The selection takes the
     * system's own selection colours, and focus an outline, as `.focus-ring`
     * gets in app.css.
     */
    @media (forced-colors: active) {
        input:checked + .segment-face {
            forced-color-adjust: none;
            background: Highlight;
            color: HighlightText;
        }

        input:disabled + .segment-face {
            opacity: 1;
            color: GrayText;
        }

        input:checked:disabled + .segment-face {
            background: GrayText;
            color: Canvas;
        }

        /* The selected face opted out of forced colours above, so its shadow ring would come back beside the outline. */
        input:focus-visible + .segment-face {
            box-shadow: none;
            outline: 2px solid Highlight;
            outline-offset: 2px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .segment-face {
            transition: none;
        }
    }
</style>
