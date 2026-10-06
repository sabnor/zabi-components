<script lang="ts">
    import DateField from "../../src/components/atoms/DateField.svelte";
    import TimeField from "../../src/components/atoms/TimeField.svelte";
    import Calendar from "../../src/components/molecules/Calendar.svelte";
    import FormField from "../../src/components/molecules/FormField.svelte";
    import type { CalendarEvent, CalendarStrings } from "../../src/components/util/calendar";

    /**
     * One harness for the date pieces, picked by `piece`:
     * - `date` / `time`: the field, bound, optionally inside a FormField and a form;
     * - `calendar`: a Calendar with `month` and `selected` bound.
     */
    interface Props {
        piece: "date" | "time" | "calendar";
        initialValue?: string;
        inFormField?: boolean;
        fieldError?: string;
        label?: string;
        hint?: string;
        error?: string;
        min?: string;
        max?: string;
        step?: number;
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        size?: "sm" | "md" | "lg";
        fieldClass?: string;
        onsubmitted?: (data: Record<string, FormDataEntryValue>) => void;

        initialMonth?: string;
        initialSelected?: string | null;
        events?: CalendarEvent[];
        weekStartsOn?: number;
        locale?: string;
        isDateDisabled?: (date: string) => boolean;
        strings?: Partial<CalendarStrings> | Record<string, string>;
        onselect?: (date: string) => void;
        onmonthchange?: (month: string) => void;

        /** The field's own props with a `locale` (`locale`, `strings` and `onselect` are shared with the calendar piece). */
        format?: Intl.DateTimeFormatOptions;
        placeholder?: string;
        picker?: "library" | "native";
        onfieldchange?: (event: Event) => void;
        onfieldinput?: (event: Event) => void;
        oninvalid?: (event: Event) => void;
    }

    let {
        piece,
        initialValue = "",
        inFormField = false,
        fieldError,
        label = piece === "time" ? "Starts" : "Quiz date",
        hint,
        error,
        min,
        max,
        step,
        required,
        disabled,
        readonly,
        size,
        fieldClass,
        onsubmitted,
        initialMonth,
        initialSelected = null,
        events,
        weekStartsOn,
        locale,
        isDateDisabled,
        strings,
        onselect,
        onmonthchange,
        format,
        placeholder,
        picker,
        onfieldchange,
        onfieldinput,
        oninvalid,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let value = $state(initialValue);
    // svelte-ignore state_referenced_locally
    let month = $state<string | undefined>(initialMonth);
    // svelte-ignore state_referenced_locally
    let selected = $state<string | null>(initialSelected);

    const Field = $derived(piece === "time" ? TimeField : DateField);

    function submit(event: SubmitEvent) {
        event.preventDefault();
        onsubmitted?.(Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement)));
    }
</script>

<output data-testid="state">{value}|{month ?? "unset"}|{selected ?? "none"}</output>

{#if piece === "calendar"}
    <button type="button" data-testid="before">Before</button>
    <Calendar
        bind:month
        bind:selected
        {events}
        {weekStartsOn}
        {locale}
        {min}
        {max}
        {isDateDisabled}
        {strings}
        {onselect}
        {onmonthchange}
        data-testid="calendar"
    />
    <button type="button" data-testid="after">After</button>
    <button type="button" data-testid="set-outside" onclick={() => (selected = "2027-03-15")}>
        Select from outside
    </button>
{:else}
    <form onsubmit={submit}>
        {#if inFormField}
            <FormField {label} description={hint} error={fieldError} {required} {disabled}>
                {#snippet control(props)}
                    <Field hideLabel name="when" bind:value {min} {max} {step} {locale} {format} {placeholder} {picker} {strings} {...props} />
                {/snippet}
            </FormField>
        {:else}
            <Field
                {label}
                name="when"
                bind:value
                {hint}
                {error}
                {min}
                {max}
                {step}
                {required}
                {disabled}
                {readonly}
                {size}
                class={fieldClass}
                {locale}
                {format}
                {placeholder}
                {picker}
                {strings}
                onchange={onfieldchange}
                oninput={onfieldinput}
                {oninvalid}
                data-testid="field"
            />
        {/if}
        <button type="submit">Send</button>
    </form>
{/if}
