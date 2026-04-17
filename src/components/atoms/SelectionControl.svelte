<script lang="ts">
    import type { Snippet } from "svelte";
    import { generateId } from "../../routes/lib/ssr-safe.js";
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
        /** Shows a spinner in the mark slot and disables interaction while true. */
        loading?: boolean;
        /** Initial checked state for uncontrolled usage. */
        defaultChecked?: boolean;
        /** Controlled checked state (also supports `bind:checked`). */
        checked?: boolean;
        onChange?: (event: Event) => void;
        /** Alias for consistency with existing components. */
        onchange?: (event: Event) => void;
        /** Optional slot for the inner mark (check icon, dot, spinner). */
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

    /** Stable per instance — `generateId()` must not run inside `$derived` (new id each invalidation). */
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
