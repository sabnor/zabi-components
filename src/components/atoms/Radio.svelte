<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import SelectionControl from "./SelectionControl.svelte";
    import type { SelectionControlMarkProps } from "./SelectionControl.svelte";
    import { RADIO_CHECKED_DOT_CLASSES } from "./selection-control.styles";

    /** Other attributes (`required`, `data-*`, `aria-*`, ...) land on the `<input>`. */
    type Props = Omit<
        HTMLInputAttributes,
        "class" | "id" | "name" | "value" | "disabled" | "checked" | "type" | "onchange"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        id?: string;
        name?: string;
        value?: string;
        label?: string;
        disabled?: boolean;
        defaultChecked?: boolean;
        checked?: boolean;
        onChange?: (event: Event) => void;
        onchange?: (event: Event) => void;
    };

    let {
        class: className = "",
        id,
        name = "",
        value = "",
        label = "",
        disabled = false,
        defaultChecked = false,
        checked = $bindable(defaultChecked),
        onChange,
        onchange,
        ...restProps
    }: Props = $props();
</script>

{#snippet mark(_props: SelectionControlMarkProps)}
    <span class={RADIO_CHECKED_DOT_CLASSES} aria-hidden="true"></span>
{/snippet}

<SelectionControl
    type="radio"
    shape="circle"
    {id}
    {name}
    {value}
    {label}
    {disabled}
    bind:checked
    {defaultChecked}
    {onChange}
    {onchange}
    {mark}
    class={className}
    {...restProps}
/>

