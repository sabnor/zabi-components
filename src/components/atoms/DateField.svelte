<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { SizeVariant } from "../types/variants.js";
    import type { DateFieldStrings } from "../util/temporal-field.js";
    import TemporalField from "./TemporalField.svelte";

    /**
     * A date, picked with the device's own date picker and styled like Input.
     *
     * It is a native `<input type="date">`: an iPhone shows its wheels or
     * calendar, Android its calendar, a desktop browser its own. `value` is
     * always `YYYY-MM-DD`, or `""` while empty, whatever the field shows.
     *
     * What the field shows is the browser's decision, unless it has a
     * `locale`: without one, the date is in the format of the browser or
     * device, not of the page, and no attribute changes that. To show a date
     * as text in the page's language, use `formatDate`:
     *
     * ```svelte
     * <DateField label="Date" bind:value={date} min="2026-01-01" />
     * <p>{formatDate(date, "sv")}</p>  <!-- 6 okt. 2026 -->
     * ```
     *
     * With `locale`, the field shows the value in that language and its own
     * picker opens: a Calendar in a BottomSheet (at every width), with Clear
     * unless the field is `required`. Until the page has run, and without
     * scripts, it is the native input as above and submits as before; once
     * it has, the native input stays as the form control, out of sight, and a
     * button in its place shows the date. `picker="native"` opens the
     * platform's own picker instead.
     *
     * ```svelte
     * <DateField label="Datum" locale="sv" bind:value format={{ weekday: "short", day: "numeric", month: "short" }} />
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
        /**
         * Language of the field, as a BCP 47 tag (`sv`, `en-GB`) or a list of them. With it the
         * field shows the value in that language, whatever the browser's is, and opens the
         * library's own picker; see above. Left out, the field is the native input.
         */
        locale?: string | string[];
        /** With `locale`: how the value is shown, as options of `Intl.DateTimeFormat`. Default: what formatDate gives for the locale. */
        format?: Intl.DateTimeFormatOptions;
        /** With `locale`: shown in the placeholder colour while the field is empty. */
        placeholder?: string;
        /** With `locale`: `library` (default) opens the library's calendar in a sheet; `native` opens the platform's own picker. */
        picker?: "library" | "native";
        /** With `locale`: the words the field says; replace any of them to translate. */
        strings?: Partial<DateFieldStrings>;
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
        locale,
        format,
        placeholder,
        picker = "library",
        strings,
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
    {locale}
    {format}
    {placeholder}
    {picker}
    {strings}
    {...restProps}
/>
