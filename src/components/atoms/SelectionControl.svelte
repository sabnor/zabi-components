<script lang="ts">
    import type { Snippet } from "svelte";
    import { generateId } from "../util/ssr-safe.js";
    import {
        SELECTION_CONTROL_LABEL_ROW,
        selectionControlRingOverlayClasses,
        selectionControlShellClasses,
        type SelectionControlShape,
    } from "./selection-control.styles";

    type SelectionControlType = "checkbox" | "radio";

    export type SelectionControlMarkProps = {
        checked: boolean;
        loading: boolean;
        disabled: boolean;
    };

    interface Props {
        id?: string;
        type: SelectionControlType;
        shape: SelectionControlShape;
        name?: string;
        value?: string;
        label?: string;
        disabled?: boolean;
        loading?: boolean;
        defaultChecked?: boolean;
        checked?: boolean;
        onChange?: (event: Event) => void;
        onchange?: (event: Event) => void;
        mark?: Snippet<[SelectionControlMarkProps]>;
    }

    let {
        id: idProp,
        type,
        shape,
        name = "",
        value = "",
        label = "",
        disabled = false,
        loading = false,
        defaultChecked = false,
        checked = $bindable(defaultChecked),
        onChange,
        onchange,
        mark,
        ...restProps
    }: Props = $props();

    /** Call once per mount — `generateId()` in `$derived` would churn ids every tick. */
    const fallbackId = generateId("selection-control");
    const controlId = $derived(idProp ?? fallbackId);
    const isDisabled = $derived(disabled || loading);

    const labelWrapperClasses = SELECTION_CONTROL_LABEL_ROW;

    const controlContainerClasses = $derived(selectionControlShellClasses(shape));

    const controlRingClasses = $derived(selectionControlRingOverlayClasses(shape));

    function handleChange(event: Event) {
        if (isDisabled) return;
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        onChange?.(event);
        onchange?.(event);
    }
</script>

<div class="flex items-center gap-2">
    <label for={controlId} class={labelWrapperClasses}>
        <span class={controlContainerClasses}>
            <input
                {type}
                id={controlId}
                {name}
                {value}
                {checked}
                disabled={isDisabled}
                class="sr-only"
                aria-busy={loading ? "true" : undefined}
                onchange={handleChange}
                {...restProps}
            />
            <span class={controlRingClasses}></span>
            {#if mark}
                {@render mark({ checked, loading, disabled: isDisabled })}
            {/if}
        </span>
        {#if label}
            <span class="text-sm font-medium text-label">
                {label}
            </span>
        {/if}
    </label>
</div>
