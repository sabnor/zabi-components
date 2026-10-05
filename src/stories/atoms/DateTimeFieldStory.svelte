<script lang="ts">
    import DateField from '../../components/atoms/DateField.svelte';
    import TimeField from '../../components/atoms/TimeField.svelte';
    import FormField from '../../components/molecules/FormField.svelte';
    import { formatDate, formatTime } from '../../components/util/date.js';

    interface Props {
        /** Which of the two fields the story shows. */
        kind?: 'date' | 'time';
        /** The value the field starts with; empty for none. */
        startValue?: string;
        label?: string;
        hint?: string;
        error?: string;
        min?: string;
        max?: string;
        step?: number;
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        size?: 'sm' | 'md' | 'lg';
        /** Put the field inside a FormField, which then supplies the label. */
        inFormField?: boolean;
        /** Language of the line of text under the field. */
        locale?: string;
    }

    let {
        kind = 'date',
        startValue,
        label,
        hint,
        error,
        min,
        max,
        step,
        required = false,
        disabled = false,
        readonly = false,
        size = 'md',
        inFormField = false,
        locale = 'sv',
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let value = $state(startValue ?? (kind === 'date' ? '2026-10-06' : '19:00'));
    const Field = $derived(kind === 'date' ? DateField : TimeField);
    const fieldLabel = $derived(label ?? (kind === 'date' ? 'Quiz date' : 'Starts'));
    const asText = $derived(kind === 'date' ? formatDate(value, locale) : formatTime(value, locale));
</script>

<!-- A phone-width column. The field shows the browser's own format; the line
under it is the same value as text in the story's locale. -->
<div class="w-80 space-y-3">
    {#if inFormField}
        <FormField label={fieldLabel} description={hint} {error} {required} {disabled}>
            {#snippet control(props)}
                <Field hideLabel bind:value {min} {max} {step} {size} {...props} />
            {/snippet}
        </FormField>
    {:else}
        <Field
            label={fieldLabel}
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
        />
    {/if}
    <p class="text-sm text-description">
        Value: {value || 'empty'}. As text ({locale}): {asText || '–'}.
    </p>
</div>
