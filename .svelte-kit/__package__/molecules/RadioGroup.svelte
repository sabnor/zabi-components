<script lang="ts">
    import {
        RADIO_CHECKED_DOT_CLASSES,
        RADIO_GROUP_CONTROL_SHELL,
        RADIO_GROUP_OPTION_LABEL_ROW,
        RADIO_GROUP_RING_OVERLAY,
    } from "../atoms/selection-control.styles";
    import { generateId } from "../util/ssr-safe.js";
    import { SvelteMap } from "svelte/reactivity";

    export type RadioGroupOption = {
        value: string;
        label: string;
        disabled?: boolean;
        description?: string;
    };

    interface Props {
        options: RadioGroupOption[];
        /** Selected value; `bind:value`. Use `undefined` for no selection. */
        value?: string | undefined;
        /** Uncontrolled initial value. */
        defaultValue?: string | undefined;
        name?: string;
        disabled?: boolean;
        legend?: string;
        label?: string;
    }

    let {
        options,
        defaultValue,
        value = $bindable(defaultValue),
        name: nameProp,
        disabled = false,
        legend = "",
        label = "",
        ...restProps
    }: Props = $props();

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

    function handleChange(event: Event) {
        if (disabled) return;
        const target = event.target as HTMLInputElement;
        value = target.value;
    }

    const elementsByValue = new SvelteMap<string, HTMLInputElement>();
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
    class="space-y-3"
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
            {@const isChecked = value === option.value}
            <label class={optionLabelWrapperClasses}>
                <span class={radioControlShellClasses}>
                    <input
                        type="radio"
                        name={groupName}
                        value={option.value}
                        checked={isChecked}
                        disabled={optionDisabled}
                        tabindex={tabIndexFor(option)}
                        class="sr-only"
                        onchange={handleChange}
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
