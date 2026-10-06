<script lang="ts">
    import type { SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";
    import Input from "./Input.svelte";

    /**
     * What DateField and TimeField share. Internal: it is not exported from
     * the package, and its props are those of the two fields.
     *
     * It is an `Input` with a native `type`, so the box, the sizes, the label,
     * the hint and the error message are Input's own and cannot drift from it.
     * What is added here is only what a native date or time input needs to
     * look like one: see the classes and the style block below.
     */
    interface Props {
        kind: "date" | "time";
        id?: string;
        value?: string;
        name?: string;
        label?: string;
        hideLabel?: boolean;
        hint?: string;
        error?: string;
        min?: string;
        max?: string;
        step?: number | "any";
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        size?: SizeVariant;
        class?: string;
        "aria-describedby"?: string | null;
    }

    let {
        kind,
        id: idProp,
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
        "aria-describedby": describedBy,
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

    /** What Input does not declare, but passes on to the `<input>`. */
    const native = $derived({
        min,
        max,
        step,
        readonly: readonly || undefined,
        "data-empty": value ? undefined : "",
        ...restProps,
    });

    const fieldClasses = $derived(
        cn(
            "zabi-temporal-field",
            // Its own look off: WebKit on iOS otherwise draws a date input as
            // a button, with its own height and centred text. `block` and
            // `min-w-0`: an empty one there has no intrinsic width.
            "block min-w-0 appearance-none",
            // The format the browser shows in an empty field ("mm/dd/yyyy")
            // is a hint, not a value: in the placeholder colour.
            !value && "text-input-placeholder",
            className,
        ),
    );
</script>

<div>
    <Input
        id={idProp}
        type={kind}
        bind:value
        {name}
        {label}
        {hideLabel}
        {required}
        {disabled}
        {size}
        {hint}
        {error}
        aria-describedby={describedBy}
        class={fieldClasses}
        {...native}
    />
</div>

<style>
    /*
     * The parts of a native date or time input that utilities cannot reach.
     * Global selectors under one class: the `<input>` is rendered by Input,
     * so a scoped selector would not match it.
     */

    /* WebKit on iOS centres the value, and gives an empty one no height. */
    :global(.zabi-temporal-field::-webkit-date-and-time-value) {
        min-height: 1.5em;
        text-align: start;
    }

    /* The editable segments in Chromium and desktop WebKit: no extra box
       inside the field, so the text sits where an Input's does. */
    :global(.zabi-temporal-field::-webkit-datetime-edit) {
        padding: 0;
    }

    /* The browser's calendar or clock button. It follows `color-scheme`,
       which the theme's dark block sets (see app.css); nothing here has to. */
    :global(.zabi-temporal-field::-webkit-calendar-picker-indicator) {
        cursor: pointer;
    }
    :global(.zabi-temporal-field:disabled::-webkit-calendar-picker-indicator),
    :global(.zabi-temporal-field:read-only::-webkit-calendar-picker-indicator) {
        cursor: default;
    }

</style>
