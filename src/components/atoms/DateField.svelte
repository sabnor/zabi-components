<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { SizeVariant } from "../types/variants.js";
    import TemporalField from "./TemporalField.svelte";

    /**
     * A date, picked with the device's own date picker and styled like Input.
     *
     * It is a native `<input type="date">`: an iPhone shows its wheels or
     * calendar, Android its calendar, a desktop browser its own. `value` is
     * always `YYYY-MM-DD`, or `""` while empty, whatever the field shows.
     *
     * What the field shows is the browser's decision: the date in the format
     * of the browser or device, not of the page, and no attribute changes
     * that. To show a date as text in the page's language, use `formatDate`:
     *
     * ```svelte
     * <DateField label="Date" bind:value={date} min="2026-01-01" />
     * <p>{formatDate(date, "sv")}</p>  <!-- 6 okt. 2026 -->
     * ```
     *
     * Other attributes (`autocomplete`, `data-*`, `onchange`, ...) land on the
     * `<input>`.
     */
    type Props = Omit<
        HTMLInputAttributes,
        "class" | "type" | "value" | "size" | "min" | "max" | "step" | "required" | "disabled" | "readonly" | "id" | "name"
    > & {
        /** Omit to auto-generate; pair with FormField's `id` when used inside FormField. */
        id?: string;
        /** The date as `YYYY-MM-DD`, or `""` while empty. Supports `bind:value`. */
        value?: string;
        /** Name the value is submitted under in a form. */
        name?: string;
        label?: string;
        /** True when FormField supplies the visible `<label>`. */
        hideLabel?: boolean;
        /** Help text under the field, read out with it. */
        hint?: string;
        /** An error under the field. It marks the field invalid and is announced. */
        error?: string;
        /** Earliest date that can be picked, as `YYYY-MM-DD`. */
        min?: string;
        /** Latest date that can be picked, as `YYYY-MM-DD`. */
        max?: string;
        /** Steps between dates that can be picked, in days. */
        step?: number | "any";
        required?: boolean;
        disabled?: boolean;
        /** Shows the value without letting it be changed; it is still submitted. */
        readonly?: boolean;
        /** Height, on the scale Input and Button use. At least 44px on a touch screen. */
        size?: SizeVariant;
        /** Extra classes for the `<input>`. */
        class?: string;
    };

    let {
        id,
        value = $bindable<Exclude<Props["value"], undefined>>(),
        name = "",
        label = "",
        hideLabel = false,
        hint = "",
        error = "",
        min,
        max,
        step,
        required = false,
        disabled = false,
        readonly = false,
        size = "md",
        class: className = "",
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (value === undefined) value = "";
    };
    applyDefaults();
    $effect.pre(applyDefaults);
</script>

<TemporalField
    kind="date"
    {id}
    bind:value
    {name}
    {label}
    {hideLabel}
    {hint}
    {error}
    {min}
    {max}
    {step}
    {required}
    {disabled}
    {readonly}
    {size}
    class={className}
    {...restProps}
/>
