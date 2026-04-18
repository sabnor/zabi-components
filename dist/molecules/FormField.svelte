<script lang="ts">
    import type { Snippet } from 'svelte';
    import { generateId } from "../util/ssr-safe.js";

    export type FormFieldControlProps = {
        id: string;
        'aria-describedby'?: string;
        'aria-invalid'?: 'true';
        disabled?: boolean;
        required?: boolean;
    };

    interface Props {
        id?: string;
        label: string;
        description?: string;
        error?: string;
        required?: boolean;
        disabled?: boolean;
        class?: string;
        labelClass?: string;
        control: Snippet<[FormFieldControlProps]>;
        meta?: Snippet;
    }

    let {
        id: idProp,
        label,
        description,
        error,
        required = false,
        disabled = false,
        class: className = '',
        labelClass = '',
        control,
        meta,
    }: Props = $props();

    const fallbackId = generateId('field');
    const fieldId = $derived(idProp ?? fallbackId);
    const descriptionId = $derived(
        description ? `${fieldId}-description` : undefined,
    );
    const errorId = $derived(error ? `${fieldId}-error` : undefined);
    const describedBy = $derived(
        [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
    );
</script>

<div class={['space-y-1.5', className].filter(Boolean).join(' ')}>
    <div class="flex items-baseline justify-between gap-3">
        <label
            class={[
                'text-sm font-medium text-label',
                disabled ? 'opacity-60' : '',
                labelClass,
            ]
                .filter(Boolean)
                .join(' ')}
            for={fieldId}
        >
            {label}
            {#if required}
                <span class="ml-1 text-error" aria-hidden="true">*</span>
                <span class="sr-only">(required)</span>
            {/if}
        </label>

        {#if meta}
            <div class="text-xs text-description">{@render meta()}</div>
        {/if}
    </div>

    {@render control({
        id: fieldId,
        'aria-describedby': describedBy,
        'aria-invalid': error ? 'true' : undefined,
        disabled,
        required,
    })}

    {#if description}
        <p id={descriptionId} class="text-xs text-description">{description}</p>
    {/if}

    {#if error}
        <p id={errorId} class="text-xs text-error" role="alert">{error}</p>
    {/if}
</div>
