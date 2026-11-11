<script lang="ts">
    import {
        RADIO_CHECKED_DOT_CLASSES,
        RADIO_GROUP_CONTROL_SHELL,
        RADIO_GROUP_OPTION_LABEL_ROW,
        RADIO_GROUP_RING_OVERLAY,
        SELECTION_CONTROL_INPUT,
    } from "../atoms/selection-control.styles";
    import type { Snippet } from "svelte";
    import type { HTMLFieldsetAttributes } from "svelte/elements";
    import { generateId } from "../util/ssr-safe.js";
    import { SvelteMap } from "svelte/reactivity";
    import { cn } from "../util/cn.js";
    import { resetValueOf, groupBinding } from "../util/hydration.js";

    export type RadioGroupOption = {
        value: string;
        label: string;
        disabled?: boolean;
        description?: string;
        /** What a screen reader says for the description, in its place; it is not drawn. */
        descriptionSpoken?: string;
    };

    /** What `optionVisual` is told about its option. */
    export type RadioGroupOptionState = { checked: boolean; disabled: boolean };

    /** Other attributes (`id`, `data-*`, `aria-*`, ...) land on the `<fieldset>`. */
    type Props = Omit<HTMLFieldsetAttributes, "class" | "name" | "disabled"> & {
        /** Extra classes for the host element. */
        class?: string;
        options: RadioGroupOption[];
        /** Selected value; `bind:value`. Use `undefined` for no selection. */
        value?: string | undefined;
        /**
         * The selection to start with when `value` is `undefined` as the
         * group is created. Applied once: it does not come back when the
         * value is set to `undefined` later, and it never replaces a choice.
         */
        defaultValue?: string | undefined;
        /**
         * Name the value is submitted under in a form. Without a name the
         * group is not part of the form around it: it submits nothing and a
         * form reset leaves it alone.
         */
        name?: string;
        disabled?: boolean;
        legend?: string;
        label?: string;
        /**
         * Draw a ring round the chosen row. Off, the filled radio alone shows
         * the choice; keyboard focus keeps its ring either way.
         */
        chosenRing?: boolean;
        /**
         * How the options are laid out. `"list"` is a column of rows.
         * `"tile"` is a wrapping grid of tiles, for a choice that is easier
         * to see than to read; the chosen tile has a 2px edge and
         * `chosenRing` does not apply.
         */
        appearance?: "list" | "tile";
        /**
         * A picture of the option. In a tile it is drawn above the label; in
         * a list, between the radio and the label. It is decoration and is
         * hidden from assistive technology: the option's `label` stays its
         * name and `description` still describes it.
         */
        optionVisual?: Snippet<[RadioGroupOption, RadioGroupOptionState]>;
        /**
         * Tiles only: a fixed number of equal columns, in place of as many as
         * fit at `tileMinWidth`. Three fit a 360px screen where the default
         * makes two.
         */
        columns?: number;
        /** Tiles only: the narrowest a tile gets before the grid drops a column (any CSS length). */
        tileMinWidth?: string;
        /**
         * Tiles only. `"column"`: the picture above the label, centred.
         * `"row"`: the picture beside the text, which starts at the inline
         * start, for a wide tile with a picture and a description.
         */
        tileLayout?: "column" | "row";
    };

    let {
        class: className = "",
        options,
        defaultValue,
        value = $bindable(),
        name: nameProp,
        disabled = false,
        legend = "",
        label = "",
        chosenRing = true,
        appearance = "list",
        optionVisual,
        columns,
        tileMinWidth,
        tileLayout = "column",
        ...restProps
    }: Props = $props();

    // No fallback on the bindable prop: with one, `bind:value={undefined}`
    // (which the prop's own documentation names as "no selection") throws
    // `props_invalid_value` and the page never hydrates. The default is
    // applied once, here, so the server renders it too. A choice made in the
    // server markup before hydration is taken in after this and wins.
    (() => {
        if (value === undefined && defaultValue !== undefined) value = defaultValue;
    })();

    /**
     * The radios always share a name, the caller's or one made here: without
     * one they are not a group to the browser. With a name made here they are
     * kept out of any form around them (`form` names a form that does not
     * exist): it used to be submitted as `radiogroup-…`, a field nobody named.
     */
    const fallbackName = generateId("radiogroup");
    const groupName = $derived(nameProp || fallbackName);
    const legendText = $derived(legend || label);

    const enabledOptions = $derived.by(() =>
        options.filter((o: RadioGroupOption) => !disabled && !o.disabled),
    );

    const fallbackValue = $derived.by(() => enabledOptions[0]?.value ?? "");

    /** False if controlled `value` is set but missing from `options` (stale); roving tabindex then follows first enabled instead. */
    const valueMatchesOption = $derived(
        value === undefined ||
            value === "" ||
            options.some((o: RadioGroupOption) => o.value === value),
    );

    function isOptionDisabled(option: RadioGroupOption): boolean {
        return disabled || !!option.disabled;
    }

    function tabIndexFor(option: RadioGroupOption): number {
        if (isOptionDisabled(option)) return -1;
        if (
            value !== undefined &&
            value !== "" &&
            valueMatchesOption
        ) {
            return option.value === value ? 0 : -1;
        }
        return option.value === fallbackValue ? 0 : -1;
    }

    const elementsByValue = new SvelteMap<string, HTMLInputElement>();

    /**
     * The radios are bound, so an option picked before the page hydrated is
     * kept: Svelte's binding hands it over here instead of overwriting it
     * (see util/hydration.ts). A form reset empties the selection, as it empties
     * a bound native input.
     */
    const chosen = groupBinding<string>(
        () => value,
        (next) => {
            if (!disabled) value = next;
        },
        () => {
            if (!disabled) value = resetValueOf<string>(elementsByValue.values());
        },
    );

    function registerRadio(valueKey: string) {
        return (node: HTMLInputElement) => {
            elementsByValue.set(valueKey, node);
            return () => {
                elementsByValue.delete(valueKey);
            };
        };
    }

    function focusValue(nextValue: string) {
        const el = elementsByValue.get(nextValue);
        el?.focus();
    }

    function moveSelection(delta: number) {
        const enabled = enabledOptions;
        if (enabled.length === 0) return;

        const rawIndex = enabled.findIndex((o) => o.value === value);
        const currentIndex =
            rawIndex === -1
                ? delta > 0
                    ? -1
                    : enabled.length
                : rawIndex;
        const nextIndex =
            (currentIndex + delta + enabled.length) % enabled.length;
        const next = enabled[nextIndex];
        if (!next) return;
        value = next.value;
        focusValue(next.value);
    }

    function handleKeydown(event: KeyboardEvent) {
        const key = event.key;
        if (
            key !== "ArrowRight" &&
            key !== "ArrowDown" &&
            key !== "ArrowLeft" &&
            key !== "ArrowUp" &&
            key !== "Home" &&
            key !== "End"
        ) {
            return;
        }

        const enabled = enabledOptions;
        if (enabled.length === 0) return;

        event.preventDefault();
        if (key === "ArrowRight" || key === "ArrowDown") {
            moveSelection(1);
        } else if (key === "ArrowLeft" || key === "ArrowUp") {
            moveSelection(-1);
        } else if (key === "Home") {
            value = enabled[0].value;
            focusValue(enabled[0].value);
        } else if (key === "End") {
            const last = enabled[enabled.length - 1];
            value = last.value;
            focusValue(last.value);
        }
    }

    const optionLabelWrapperClasses = RADIO_GROUP_OPTION_LABEL_ROW;

    const radioControlShellClasses = RADIO_GROUP_CONTROL_SHELL;

    const radioRingOverlayClasses = RADIO_GROUP_RING_OVERLAY;

    const tile = $derived(appearance === "tile");

    // The tile's edge is a 1px border plus a 2px inset outline when chosen (no
    // layout shift); keyboard focus is the library ring, a box-shadow.
    const tileClasses =
        "tile relative flex flex-col items-center justify-center gap-2 p-3 text-center rounded-control border border-control-border bg-card cursor-pointer transition-colors duration-150 not-has-[:disabled]:hover:bg-surface-hover not-has-[:disabled]:active:bg-surface-active has-[:checked]:border-action-primary has-[:checked]:outline-2 has-[:checked]:-outline-offset-1 has-[:checked]:outline-action-primary forced-colors:has-[:checked]:border-[Highlight] forced-colors:has-[:checked]:outline-[Highlight] has-[:focus-visible]:shadow-[0_0_0_2px_var(--color-focus-ring-offset),0_0_0_4px_var(--color-focus-ring)] has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed";
    const tileGridClasses = "tile-grid grid gap-3";
    const rowTile = $derived(tile && tileLayout === "row");
    const gridStyle = $derived(
        tile
            ? [
                  columns && columns > 0 ? `--zabi-tile-columns: ${Math.floor(columns)}` : "",
                  tileMinWidth ? `--zabi-tile-min: ${tileMinWidth}` : "",
              ]
                  .filter(Boolean)
                  .join("; ") || undefined
            : undefined,
    );
</script>

<fieldset
    class={cn("space-y-3", className)}
    aria-disabled={disabled ? "true" : undefined}
    onkeydown={handleKeydown}
    {...restProps}
>
    {#if legendText}
        <legend class="text-sm font-medium text-label mb-1">
            {legendText}
        </legend>
    {/if}

    <div class={tile ? tileGridClasses : "space-y-3"} style={gridStyle}>
        {#each options as option, index (option.value)}
            {@const optionDisabled = isOptionDisabled(option)}
            {@const descriptionId = option.description ? `${fallbackName}-${index}-description` : undefined}
            {@const state = { checked: value === option.value, disabled: optionDisabled }}
            <!-- A one-line row is centred in its height; with a description the radio stays at the top, by the label. -->
            <label
                class={tile
                    ? cn(tileClasses, rowTile && "tile-row")
                    : cn(
                          optionLabelWrapperClasses,
                          !option.description && "items-center",
                          !chosenRing && "selection-control-option-row-quiet",
                      )}
            >
                {#if tile}
                    <input
                        type="radio"
                        name={groupName}
                        form={nameProp ? undefined : groupName}
                        value={option.value}
                        bind:group={chosen.value}
                        disabled={optionDisabled}
                        tabindex={tabIndexFor(option)}
                        aria-describedby={descriptionId}
                        class="sr-only"
                        {@attach registerRadio(option.value)}
                    />
                    {#if optionVisual}
                        <span class="flex shrink-0 items-center justify-center" aria-hidden="true">
                            {@render optionVisual(option, state)}
                        </span>
                    {/if}
                    <!-- The chosen mark besides the edge and the fill: a check, so the choice does not rest on colour. -->
                    <span class="tile-badge" aria-hidden="true">
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
                    </span>
                {:else}
                    <span class={cn(radioControlShellClasses, !option.description && "mt-0")}>
                        <input
                            type="radio"
                            name={groupName}
                            form={nameProp ? undefined : groupName}
                            value={option.value}
                            bind:group={chosen.value}
                            disabled={optionDisabled}
                            tabindex={tabIndexFor(option)}
                            aria-describedby={descriptionId}
                            class={SELECTION_CONTROL_INPUT}
                            {@attach registerRadio(option.value)}
                        />
                        <span class={radioRingOverlayClasses}></span>
                        <span class={RADIO_CHECKED_DOT_CLASSES} aria-hidden="true"></span>
                    </span>
                    {#if optionVisual}
                        <span class="flex shrink-0 items-center justify-center" aria-hidden="true">
                            {@render optionVisual(option, state)}
                        </span>
                    {/if}
                {/if}
                <span class={cn("flex flex-col gap-1", tile && !rowTile && "items-center")}>
                    <span class="text-sm font-medium text-label">
                        {option.label}
                    </span>
                    {#if option.description}
                        <!-- aria-hidden keeps it out of the name; aria-describedby still reads it,
                             or reads the spoken words in its place. -->
                        <span
                            id={option.descriptionSpoken ? undefined : descriptionId}
                            class="text-sm text-description"
                            aria-hidden="true"
                        >
                            {option.description}
                        </span>
                        {#if option.descriptionSpoken}
                            <span id={descriptionId} hidden>{option.descriptionSpoken}</span>
                        {/if}
                    {/if}
                </span>
            </label>
        {/each}
    </div>
</fieldset>

<style>
    /*
     * Tiles. `--zabi-tile-columns` (from `columns`) and `--zabi-tile-min` (from
     * `tileMinWidth`) size the grid; `--zabi-tile-selected-bg` is the chosen
     * tile's fill and `--zabi-tile-badge-size` its check badge, both settable
     * on the group or above.
     */
    .tile-grid {
        grid-template-columns: repeat(
            var(--zabi-tile-columns, auto-fill),
            minmax(var(--zabi-tile-columns-min, var(--zabi-tile-min, 7rem)), 1fr)
        );
    }

    /* A fixed column count must not be held up by the minimum width. */
    .tile-grid[style*="--zabi-tile-columns"] {
        --zabi-tile-columns-min: 0px;
    }

    .tile:has(input:checked) {
        background: var(
            --zabi-tile-selected-bg,
            color-mix(in srgb, var(--color-action-primary) 10%, var(--color-card))
        );
    }

    .tile-row {
        flex-direction: row;
        justify-content: flex-start;
        gap: 0.75rem;
        text-align: start;
        /* Room for the badge at the end. */
        padding-inline-end: calc(var(--zabi-tile-badge-size, 1.25rem) + 1rem);
    }

    .tile-badge {
        position: absolute;
        inset-block-start: 0.375rem;
        inset-inline-end: 0.375rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--zabi-tile-badge-size, 1.25rem);
        height: var(--zabi-tile-badge-size, 1.25rem);
        border-radius: 9999px;
        background: var(--color-action-primary);
        color: var(--color-action-primary-text);
        opacity: 0;
        transform: scale(0.8);
        transition:
            opacity var(--duration-base),
            transform var(--duration-base) var(--ease-standard);
        pointer-events: none;
    }

    .tile:has(input:checked) .tile-badge {
        opacity: 1;
        transform: scale(1);
    }

    @media (forced-colors: active) {
        .tile-badge {
            forced-color-adjust: none;
            background: Highlight;
            color: HighlightText;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .tile-badge {
            transition: none;
        }
    }
</style>
