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
        checked = $bindable<Exclude<Props["checked"], undefined>>(),
        onChange,
        onchange,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (checked === undefined) checked = defaultChecked;
    };
    applyDefaults();
    $effect.pre(applyDefaults);
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

