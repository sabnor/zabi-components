<script lang="ts">
    import { CheckCircle, AlertTriangle, AlertCircle } from '@lucide/svelte';
    import type { SemanticVariant, SizeVariant } from '../../types/variants.js';
    import { generateId } from '../../routes/lib/ssr-safe.js';

    interface Props {
        id?: string;
        value?: string;
        name?: string;
        class?: string;
        label?: string;
        hideLabel?: boolean;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        /** Shows a spinner overlay and disables interaction while true. */
        loading?: boolean;
        rows?: number;
        size?: SizeVariant;
        variant?: SemanticVariant;
        message?: string;
        oninput?: (event: Event) => void;
    }

    let {
        id: idProp,
        value = $bindable(''),
        name = '',
        class: className = '',
        label = '',
        hideLabel = false,
        placeholder = '',
        required = false,
        disabled = false,
        loading = false,
        rows = 4,
        size = 'md',
        variant = 'default',
        message = '',
        oninput,
        ...restProps
    }: Props = $props();

    const fallbackId = generateId('textarea');
    const textareaId = $derived(idProp ?? fallbackId);
    const isDisabled = $derived(disabled || loading);

    const variantClass = $derived(() => {
        return variant === 'success'
            ? 'border-success focus-visible:border-success'
            : variant === 'warning'
              ? 'border-warning focus-visible:border-warning'
              : variant === 'error'
                ? 'border-error focus-visible:border-error'
                : 'border-input-border';
    });

    const textareaClasses = $derived(() => {
        const baseClasses =
            'focus-ring w-full border bg-input hover:bg-input-hover focus-visible:bg-input-focus disabled:bg-input-disabled rounded-lg transition-all duration-200 placeholder:text-description text-body focus:outline-none focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-y px-4 py-2.5 text-base leading-6';

        return `${baseClasses} ${variantClass()} ${className}`.trim();
    });

    const labelClasses = $derived(
        () => 'mb-1 block text-sm font-medium text-label',
    );

    const messageClasses = $derived(() => {
        if (variant === 'error') {
            return 'mt-1 flex items-center gap-1.5 text-sm text-error';
        } else if (variant === 'success') {
            return 'mt-1 flex items-center gap-1.5 text-sm text-success';
        } else if (variant === 'warning') {
            return 'mt-1 flex items-center gap-1.5 text-sm text-warning';
        }
        return 'mt-1 flex items-center gap-1.5 text-sm text-description';
    });

    const getIcon = $derived(() => {
        if (variant === 'error') return AlertCircle;
        if (variant === 'success') return CheckCircle;
        if (variant === 'warning') return AlertTriangle;
        return null;
    });

    function handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
        oninput?.(event);
    }
</script>

<div>
    {#if label && !hideLabel}
        <label for={textareaId} class={labelClasses()}>{label}</label>
    {/if}
    <div class="relative">
        <textarea
            id={textareaId}
            {name}
            bind:value
            {placeholder}
            {required}
            disabled={isDisabled}
            {rows}
            class={textareaClasses()}
            oninput={handleInput}
            aria-invalid={variant === 'error' ? 'true' : undefined}
            aria-required={required ? 'true' : undefined}
            aria-busy={loading ? 'true' : undefined}
            aria-describedby={message ? `${textareaId}-message` : undefined}
            {...restProps}
        ></textarea>
        {#if loading}
            <span
                class="pointer-events-none absolute top-3 right-3 flex items-center text-description"
                aria-hidden="true"
            >
                <span
                    class="inline-block size-5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70"
                ></span>
            </span>
        {/if}
    </div>
    {#if message && variant !== 'default'}
        <p
            id={`${textareaId}-message`}
            class={messageClasses()}
            role={variant === 'error' ? 'alert' : 'status'}
            aria-live={variant === 'error' ? 'assertive' : 'polite'}
        >
            {#if getIcon()}
                {@const Icon = getIcon()}
                <Icon size={14} class="shrink-0" />
            {/if}
            <span>{message}</span>
        </p>
    {/if}
</div>
