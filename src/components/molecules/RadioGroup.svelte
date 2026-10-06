<script lang="ts">
    import {
        RADIO_CHECKED_DOT_CLASSES,
        RADIO_GROUP_CONTROL_SHELL,
        RADIO_GROUP_OPTION_LABEL_ROW,
        RADIO_GROUP_RING_OVERLAY,
        SELECTION_CONTROL_INPUT,
    } from "../atoms/selection-control.styles";
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
    };

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

    <div class="space-y-3">
        {#each options as option (option.value)}
            {@const optionDisabled = isOptionDisabled(option)}
            <label class={optionLabelWrapperClasses}>
                <span class={radioControlShellClasses}>
                    <input
                        type="radio"
                        name={groupName}
                        form={nameProp ? undefined : groupName}
                        value={option.value}
                        bind:group={chosen.value}
                        disabled={optionDisabled}
                        tabindex={tabIndexFor(option)}
                        class={SELECTION_CONTROL_INPUT}
                        {@attach registerRadio(option.value)}
                    />
                    <span class={radioRingOverlayClasses}></span>
                    <span class={RADIO_CHECKED_DOT_CLASSES} aria-hidden="true"></span>
                </span>
                <span class="flex flex-col gap-1">
                    <span class="text-sm font-medium text-label">
                        {option.label}
                    </span>
                    {#if option.description}
                        <span class="text-sm text-description">
                            {option.description}
                        </span>
                    {/if}
                </span>
            </label>
        {/each}
    </div>
</fieldset>
