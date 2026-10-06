<script module lang="ts">
    /**
     * Remembered for the page's life: the platform's own picker refused to
     * open (or is not there), so a field that wanted it shows its native input.
     */
    let nativePickerFailed = false;
</script>

<script lang="ts">
    import CalendarIcon from "@lucide/svelte/icons/calendar";
    import Clock from "@lucide/svelte/icons/clock";
    import { onMount, tick } from "svelte";
    import type { SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";
    import { clampDate, formatDate, formatTime, isIsoDate, monthOf, todayIso } from "../util/date.js";
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { generateId } from "../util/ssr-safe.js";
    import {
        DATE_FIELD_STRINGS,
        TIME_FIELD_STRINGS,
        hasLocale,
        hourChoices,
        minuteChoices,
        minuteStep,
        parseHourMinute,
        stepFitsLibraryPicker,
        timeInRange,
        type DateFieldStrings,
        type TimeFieldStrings,
    } from "../util/temporal-field.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import BottomSheet from "../molecules/BottomSheet.svelte";
    import Calendar from "../molecules/Calendar.svelte";
    import Button from "./Button.svelte";
    import Input from "./Input.svelte";
    import PickerField from "./PickerField.svelte";
    import TimeColumn from "./TimeColumn.svelte";

    /**
     * What DateField and TimeField share. Internal: it is not exported from
     * the package, and its props are those of the two fields.
     *
     * Without `locale` it is an `Input` with a native `type`, so the box, the
     * sizes, the label, the hint and the error message are Input's own and
     * cannot drift from it. What is added here is only what a native date or
     * time input needs to look like one: see the classes and the style block
     * below.
     *
     * With `locale`, the same on the server and until the page has run: the
     * native input, which works and submits without scripts. Once mounted the
     * native input stays as the form control, out of sight, the tab order and
     * the accessibility tree, and a field-shaped button (PickerField) takes
     * its place: it shows the value written by `Intl.DateTimeFormat` and opens
     * the library's picker in a BottomSheet (a Calendar; two columns for a
     * time), or, with `picker="native"`, the platform's own.
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
        locale?: string | string[];
        format?: Intl.DateTimeFormatOptions;
        placeholder?: string;
        picker?: "library" | "native";
        strings?: Partial<DateFieldStrings> | Partial<TimeFieldStrings>;
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
        locale,
        format,
        placeholder = "",
        picker = "library",
        strings,
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

    /** The words of a provider above, then this field's own. */
    const dateProvided = zabiStringsFor("dateField");
    const timeProvided = zabiStringsFor("timeField");
    const dateText = $derived(mergeStrings(DATE_FIELD_STRINGS, dateProvided(), strings as Partial<DateFieldStrings>));
    const timeText = $derived(mergeStrings(TIME_FIELD_STRINGS, timeProvided(), strings as Partial<TimeFieldStrings>));

    // The id of the field. Only a field with a locale needs to know it: the
    // native input and the button must not share one once the button is in.
    // svelte-ignore state_referenced_locally
    const ownId = hasLocale(locale) ? generateId("input") : undefined;
    const baseId = $derived(idProp ?? ownId);

    let root: HTMLDivElement | undefined = $state();
    let trigger = $state<HTMLButtonElement | HTMLAnchorElement | null>(null);

    /** True once the page has run. The server and the first render never are. */
    let mounted = $state(false);
    let supportsNativePicker = $state(false);
    let sessionBroken = $state(false);
    /** This field's native input was put back in sight: the platform's picker would not open. */
    let unhidden = $state(false);
    let isOpen = $state(false);

    onMount(() => {
        supportsNativePicker = typeof HTMLInputElement !== "undefined" && typeof HTMLInputElement.prototype.showPicker === "function";
        sessionBroken = nativePickerFailed;
        mounted = true;
    });

    /** `library`, unless the app asked for the platform's, or the library's picker cannot serve this `step`. */
    const effectivePicker = $derived(
        picker === "native" || (kind === "time" && !stepFitsLibraryPicker(step)) ? "native" : "library",
    );
    const enhanced = $derived(
        mounted &&
            hasLocale(locale) &&
            !unhidden &&
            (effectivePicker === "library" || (supportsNativePicker && !sessionBroken)),
    );

    const display = $derived(
        !value
            ? ""
            : kind === "date"
              ? formatDate(value, locale, format)
              : formatTime(value, locale, format),
    );

    const text = $derived(kind === "date" ? dateText : timeText);

    /** What the button is named by when the label is not on the page: the label and the value. */
    const hiddenLabelName = $derived(hideLabel && label ? [label, display || placeholder].filter(Boolean).join(", ") : undefined);

    const nativeInput = () => root?.querySelector<HTMLInputElement>("input[data-temporal-native]") ?? null;

    /**
     * What the picker chose goes into the native input, which is the form
     * control: its value, and real `input` and `change` events, so a listener
     * the app put on the field hears it as it hears a native change. The
     * binding follows from the `input` event.
     */
    function setValue(next: string) {
        if (next === value) return;
        const input = nativeInput();
        if (input) {
            input.value = next;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
        }
        value = next;
    }

    async function closeAndFocus() {
        isOpen = false;
        await tick();
        trigger?.focus();
    }

    // ---- the sheet -------------------------------------------------------

    let calendarMonth = $state<string | undefined>();
    let sheetSnap = $state<"half" | "full">("half");
    let draftHour = $state("");
    let draftMinute = $state("");

    function openPicker() {
        if (disabled || readonly) return;
        if (effectivePicker === "native") {
            openNative();
            return;
        }
        if (kind === "date") {
            calendarMonth = monthOf(isIsoDate(value) ? value : clampDate(todayIso(), min, max)) ?? undefined;
            sheetSnap = typeof window !== "undefined" && window.innerHeight >= 900 ? "half" : "full";
        } else {
            const now = parseHourMinute(value);
            draftHour = now ? String(now[0]).padStart(2, "0") : "";
            draftMinute = now ? String(now[1]).padStart(2, "0") : "";
            sheetSnap = typeof window !== "undefined" && window.innerHeight >= 700 ? "half" : "full";
        }
        isOpen = true;
    }

    /** The platform's picker, from inside the press that asked for it. Where it is refused, the native input comes back. */
    function openNative() {
        const input = nativeInput();
        try {
            if (!input) throw new Error("no input");
            input.showPicker();
        } catch {
            nativePickerFailed = true;
            unhidden = true;
            void tick().then(() => root?.querySelector<HTMLInputElement>("input")?.focus());
        }
    }

    const canClear = $derived(!required && value !== "");
    const sheetTitle = $derived(label || (kind === "date" ? dateText.chooseDate : timeText.chooseTime));

    function chooseDay(date: string) {
        setValue(date);
        void closeAndFocus();
    }

    function clear() {
        setValue("");
        void closeAndFocus();
    }

    // ---- the time columns -----------------------------------------------

    const hours = $derived(hourChoices(locale, min, max));
    const minutes = $derived(
        minuteChoices({ locale, stepMinutes: minuteStep(step), hour: draftHour, current: value, min, max }),
    );

    function chooseHour(hour: string) {
        draftHour = hour;
        const options = minuteChoices({ locale, stepMinutes: minuteStep(step), hour, current: value, min, max });
        // A minute the new hour does not allow, or none yet: the first one it does.
        if (!draftMinute || options.find((option) => option.value === draftMinute)?.disabled !== false) {
            draftMinute = options.find((option) => !option.disabled)?.value ?? draftMinute;
        }
    }

    const draftValid = $derived(
        draftHour !== "" && draftMinute !== "" && timeInRange(Number(draftHour), Number(draftMinute), min, max),
    );

    function done() {
        if (!draftValid) return;
        const next = `${draftHour}:${draftMinute}`;
        // The seconds of a value that is kept are kept.
        const kept = parseHourMinute(value);
        setValue(kept && `${String(kept[0]).padStart(2, "0")}:${String(kept[1]).padStart(2, "0")}` === next ? value : next);
        void closeAndFocus();
    }

    // ---- the native input, out of sight once the button is in -----------

    const HIDDEN_STYLE =
        "position:absolute;inline-size:1px;block-size:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;opacity:0;pointer-events:none";

    /**
     * The browser's own validation (`required` and empty) fires on the hidden
     * input, where its bubble cannot be shown: that is cancelled, and focus
     * goes to the button. The message people read is the field's `error`.
     */
    function handleInvalid(event: Event) {
        (restProps as { oninvalid?: (event: Event) => void }).oninvalid?.(event);
        if (!enhanced) return;
        event.preventDefault();
        trigger?.focus();
    }

    /** What Input does not declare, but passes on to the `<input>`. */
    const native = $derived({
        min,
        max,
        step,
        readonly: readonly || undefined,
        "data-empty": value ? undefined : "",
        ...restProps,
        ...(hasLocale(locale) ? { oninvalid: handleInvalid } : {}),
        ...(enhanced
            ? {
                  tabindex: -1,
                  "aria-hidden": "true" as const,
                  "data-temporal-native": "",
                  style: HIDDEN_STYLE,
              }
            : {}),
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

<div bind:this={root}>
    {#if enhanced}
        <PickerField
            bind:element={trigger}
            id={baseId}
            label={hideLabel ? "" : label}
            value={display}
            {placeholder}
            {size}
            {disabled}
            {hint}
            {error}
            expanded={isOpen}
            aria-describedby={describedBy}
            aria-label={hiddenLabelName}
            data-readonly={readonly ? "" : undefined}
            onclick={openPicker}
        >
            {#snippet trailing()}
                {#if kind === "date"}
                    <CalendarIcon size={20} aria-hidden="true" />
                {:else}
                    <Clock size={20} aria-hidden="true" />
                {/if}
            {/snippet}
        </PickerField>
    {/if}
    <Input
        id={enhanced && baseId ? `${baseId}-native` : baseId}
        type={kind}
        bind:value
        {name}
        {label}
        hideLabel={hideLabel || enhanced}
        {required}
        {disabled}
        {size}
        hint={enhanced ? "" : hint}
        error={enhanced ? "" : error}
        aria-describedby={enhanced ? undefined : describedBy}
        class={fieldClasses}
        {...native}
    />
</div>

{#snippet clearAction()}
    <Button variant="ghost" onclick={clear}>{text.clear}</Button>
{/snippet}

{#snippet doneAction()}
    {#if canClear}
        {@render clearAction()}
    {/if}
    <Button variant="primary" disabled={!draftValid} onclick={done}>{timeText.done}</Button>
{/snippet}

{#if enhanced && effectivePicker === "library"}
    {#if kind === "date"}
        <BottomSheet
            bind:isOpen
            title={sheetTitle}
            snap={sheetSnap}
            initialFocus="[data-date][tabindex='0']"
            data-temporal-sheet="date"
            {...canClear ? { footer: clearAction } : {}}
        >
            <Calendar
                bind:month={calendarMonth}
                selected={isIsoDate(value) ? value : null}
                locale={Array.isArray(locale) ? locale[0] : locale}
                {min}
                {max}
                onselect={chooseDay}
            />
        </BottomSheet>
    {:else}
        <BottomSheet
            bind:isOpen
            title={sheetTitle}
            snap={sheetSnap}
            initialFocus="[role='option'][tabindex='0']"
            data-temporal-sheet="time"
            footer={doneAction}
        >
            <div class="flex gap-3">
                <TimeColumn label={timeText.hours} options={hours} selected={draftHour} onselect={chooseHour} />
                <TimeColumn label={timeText.minutes} options={minutes} selected={draftMinute} onselect={(minute) => (draftMinute = minute)} />
            </div>
        </BottomSheet>
    {/if}
{/if}

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
