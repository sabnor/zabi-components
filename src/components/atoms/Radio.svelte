<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { SemanticVariant } from "../types/variants.js";
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
        /**
         * Drawn inside the one label, between the box and the label text, as
         * decoration for the name `label` already gives. A leading image
         * should have an empty alt: the label names the row.
         */
        leading?: Snippet;
        /**
         * A line under the label, tied to the radio with `aria-describedby`.
         * The label names the radio; the description does not join the name.
         */
        description?: string;
        /**
         * Where the radio sits in the row. `end` puts it after the leading,
         * the label and the description, at the far edge; the row is still
         * one label and fills the width it is given.
         */
        controlPosition?: "start" | "end";
        variant?: SemanticVariant;
        /** Status text under the control. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
        message?: string;
        /** Help text under the control, read out with it. */
        hint?: string;
        /** An error under the control. It marks the input invalid and is announced; it wins over `variant` and `message`. */
        error?: string;
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
        leading,
        description,
        controlPosition = "start",
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
    {leading}
    {description}
    {controlPosition}
    class={className}
    {...restProps}
/>

