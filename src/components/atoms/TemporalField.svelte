<script lang="ts">
    import type { SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";
    import { generateId } from "../util/ssr-safe.js";
    import Input from "./Input.svelte";

    /**
     * What DateField and TimeField share. Internal: it is not exported from
     * the package, and its props are those of the two fields.
     *
     * It is an `Input` with a native `type`, so the box, the sizes, the label
     * and the error message are Input's own and cannot drift from it. What is
     * added here is only what a native date or time input needs to look like
     * one: see the classes and the style block below.
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
        value = $bindable(""),
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

    const fallbackId = generateId("temporal-field");
    const fieldId = $derived(idProp ?? fallbackId);
    const hintId = $derived(`${fieldId}-hint`);

    /**
     * Input describes the field by its own message only. Here there may also
     * be a hint, and ids from a FormField around the field.
     */
    const describedByIds = $derived(
        [describedBy, hint ? hintId : "", error ? `${fieldId}-message` : ""]
            .filter(Boolean)
            .join(" ") || undefined,
    );

    /** What Input does not declare, but passes on to the `<input>`. */
    const native = $derived({
        min,
        max,
        step,
        readonly: readonly || undefined,
        "aria-describedby": describedByIds,
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
        id={fieldId}
        type={kind}
        bind:value
        {name}
        {label}
        {hideLabel}
        {required}
        {disabled}
        {size}
        variant={error ? "error" : "default"}
        message={error}
        class={fieldClasses}
        {...native}
    />
    {#if hint}
        <p id={hintId} class="mt-2 text-sm text-description">{hint}</p>
    {/if}
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
