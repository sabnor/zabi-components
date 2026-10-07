<script lang="ts">
    import type { HTMLTextareaAttributes } from 'svelte/elements';
    import type { SemanticVariant, SizeVariant } from '../types/variants.js';
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import { fieldDescribedBy, fieldMessageState } from "../util/field.js";
    import FieldMessages from "./FieldMessages.svelte";

    /**
     * Other attributes (`autocomplete`, `inputmode`, `maxlength`,
     * `enterkeyhint`, `data-*`, `onchange`, ...) land on the `<textarea>`.
     */
    type Props = Omit<
        HTMLTextareaAttributes,
        | 'class'
        | 'value'
        | 'id'
        | 'name'
        | 'placeholder'
        | 'required'
        | 'disabled'
        | 'rows'
        | 'oninput'
        | 'aria-describedby'
    > & {
        id?: string;
        value?: string;
        name?: string;
        class?: string;
        label?: string;
        hideLabel?: boolean;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        loading?: boolean;
        rows?: number;
        /**
         * The resize grip. `auto` (default): the browser's vertical grip with a mouse or
         * trackpad, none on a touch screen, where dragging it scrolls the page. `vertical`
         * shows it everywhere, `none` never. With `autogrow` there is no grip.
         */
        resize?: 'auto' | 'none' | 'vertical';
        /** The field grows with its content, from `rows` up to `maxRows`, and scrolls after that. */
        autogrow?: boolean;
        /** The tallest an `autogrow` field gets, in rows. Without it the field has no limit. */
        maxRows?: number;
        size?: SizeVariant;
        variant?: SemanticVariant;
        /** Status text under the field. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
        message?: string;
        /** Help text under the field, read out with it. */
        hint?: string;
        /** An error under the field. It marks the field invalid and is announced; it wins over `variant` and `message`. */
        error?: string;
        oninput?: (event: Event) => void;
        /** Ids of other elements that describe the field. The hint and the message are added after them. */
        "aria-describedby"?: string | null;
    };

    let {
        id: idProp,
        value = $bindable<Exclude<Props["value"], undefined>>(),
        name = '',
        class: className = '',
        label = '',
        hideLabel = false,
        placeholder = '',
        required = false,
        disabled = false,
        loading = false,
        rows = 4,
        resize = 'auto',
        autogrow = false,
        maxRows,
        size = 'md',
        variant = 'default',
        message = '',
        hint = '',
        error = '',
        oninput,
        'aria-describedby': describedBy,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (value === undefined) value = '';
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    const fallbackId = generateId('textarea');
    const textareaId = $derived(idProp ?? fallbackId);
    const isDisabled = $derived(disabled || loading);

    const status = $derived(fieldMessageState({ variant, message, hint, error }));

    const variantClass = $derived(() => {
        return status.variant === 'success'
            ? 'border-success focus-visible:border-success'
            : status.variant === 'warning'
              ? 'border-warning focus-visible:border-warning'
              : status.variant === 'error'
                ? 'border-error focus-visible:border-error'
                : 'border-input-border enabled:hover:border-input-border-hover';
    });

    const resizeClass = $derived(
        autogrow || resize === 'none'
            ? 'resize-none'
            : resize === 'vertical'
              ? 'resize-y'
              : 'resize-y pointer-coarse:resize-none',
    );

    // Autogrow: `field-sizing: content` where the browser has it, held between
    // `rows` and `maxRows` lines (`leading-6`, plus `py-2` and the two borders,
    // since the box is border-box). Elsewhere the height is measured from the
    // content after each change; the same two limits clamp it.
    const linesHeight = (lines: number) => `calc(${lines * 1.5 + 1}rem + 2px)`;
    const minHeight = $derived(autogrow ? linesHeight(Math.max(1, rows)) : undefined);
    const maxHeight = $derived(
        autogrow && maxRows !== undefined ? linesHeight(Math.max(rows, maxRows)) : undefined,
    );

    let element: HTMLTextAreaElement | undefined = $state();

    $effect(() => {
        void value;
        if (!autogrow || !element) return;
        if (typeof CSS !== 'undefined' && CSS.supports?.('field-sizing', 'content')) return;
        const field = element;
        field.style.height = 'auto';
        field.style.height = `${field.scrollHeight + field.offsetHeight - field.clientHeight}px`;
        return () => {
            field.style.height = '';
        };
    });

    // 16px below `sm`: iOS Safari zooms the page when a focused field is smaller.
    const textareaClasses = $derived(() => {
        const baseClasses =
            'focus-ring w-full border bg-input hover:bg-input-hover focus-visible:bg-input-focus disabled:bg-input-disabled rounded-control transition-colors duration-150 placeholder:text-input-placeholder text-body focus:outline-none focus-visible:outline-none disabled:text-action-disabled-text disabled:cursor-not-allowed px-3 py-2 text-sm max-sm:text-base leading-6';

        return cn(`${baseClasses} ${resizeClass} ${variantClass()} ${className}`);
    });

    const labelClasses = $derived(
        () => 'mb-1 block text-sm font-medium text-label',
    );

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
            bind:this={element}
            id={textareaId}
            {name}
            bind:value
            {placeholder}
            {required}
            disabled={isDisabled}
            {rows}
            class={textareaClasses()}
            style:field-sizing={autogrow ? 'content' : undefined}
            style:min-height={minHeight}
            style:max-height={maxHeight}
            style:overflow-y={maxHeight ? 'auto' : undefined}
            oninput={handleInput}
            aria-invalid={status.variant === 'error' ? 'true' : undefined}
            aria-required={required ? 'true' : undefined}
            aria-busy={loading ? 'true' : undefined}
            aria-describedby={fieldDescribedBy(textareaId, status, describedBy)}
            {...restProps}
        ></textarea>
        {#if loading}
            <span
                class="pointer-events-none absolute top-3 right-3 flex items-center text-description"
                aria-hidden="true"
            >
                <span
                    class="inline-block size-5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70 motion-reduce:animate-pulse"
                ></span>
            </span>
        {/if}
    </div>
    <FieldMessages fieldId={textareaId} {status} {hint} gap="mt-1" />
</div>
