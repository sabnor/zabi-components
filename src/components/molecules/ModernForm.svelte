<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import type { FormEvents } from "../../types/events";

    // Form configuration
    export let method: "get" | "post" = "post";
    export let action: string = "";
    export let enctype:
        | "application/x-www-form-urlencoded"
        | "multipart/form-data"
        | "text/plain" = "application/x-www-form-urlencoded";
    export let novalidate: boolean = false;
    export let autocomplete: "on" | "off" = "on";
    export let spellcheck: boolean = true;

    // Layout and styling
    export let layout: "vertical" | "horizontal" | "grid" | "inline" =
        "vertical";
    export let gap: "sm" | "md" | "lg" = "md";
    export let density: "comfortable" | "compact" = "comfortable";
    export let className: string = "";

    // Accessibility
    export let ariaLabel: string = "";
    export let ariaDescribedBy: string = "";
    export let ariaLabelledBy: string = "";

    // Form state
    export let loading: boolean = false;
    export let disabled: boolean = false;
    export let errors: Record<string, string> = {};
    export let touched: Record<string, boolean> = {};

    const dispatch = createEventDispatcher<FormEvents>();

    let formElement: HTMLFormElement;
    let fieldsetElement: HTMLFieldSetElement;

    // Layout classes using modern CSS
    const layoutClasses = {
        vertical: "form-vertical",
        horizontal: "form-horizontal",
        grid: "form-grid",
        inline: "form-inline",
    };

    // Gap classes using semantic tokens
    const gapClasses = {
        sm: "gap-sm",
        md: "gap-md",
        lg: "gap-lg",
    };

    // Density classes
    const densityClasses = {
        comfortable: "density-comfortable",
        compact: "density-compact",
    };

    // Computed classes
    $: computedClasses = [
        "modern-form",
        layoutClasses[layout],
        gapClasses[gap],
        densityClasses[density],
        loading ? "loading" : "",
        disabled ? "disabled" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Form submission handler
    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        if (loading || disabled) {
            event.preventDefault();
            return;
        }

        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData.entries()) as Record<
            string,
            string
        >;

        // Validate form
        const validationErrors = validateForm(data);
        if (Object.keys(validationErrors).length > 0) {
            errors = validationErrors;
            dispatch("validation-error", { errors: validationErrors });
            return;
        }

        dispatch("submit", {
            data,
            formData,
            event: event as SubmitEvent,
        });
    }

    // Form reset handler
    function handleReset(event: Event) {
        errors = {};
        touched = {};
        dispatch("reset", { event });
    }

    // Input change handler
    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const name = target.name;

        if (name) {
            touched = { ...touched, [name]: true };

            // Clear error when user starts typing
            if (errors[name]) {
                errors = { ...errors, [name]: "" };
            }
        }

        dispatch("input", {
            name,
            value: target.value,
            event,
        });
    }

    // Input blur handler
    function handleBlur(event: FocusEvent) {
        const target = event.target as HTMLInputElement;
        const name = target.name;

        if (name) {
            touched = { ...touched, [name]: true };

            // Validate field on blur
            const fieldError = validateField(name, target.value);
            if (fieldError) {
                errors = { ...errors, [name]: fieldError };
            }
        }

        dispatch("blur", {
            name,
            value: target.value,
            event,
        });
    }

    // Basic validation
    function validateForm(
        data: Record<string, string>,
    ): Record<string, string> {
        const newErrors: Record<string, string> = {};

        // Check required fields
        const requiredFields = formElement.querySelectorAll("[required]");
        requiredFields.forEach((field) => {
            const input = field as HTMLInputElement;
            if (!data[input.name] || data[input.name].trim() === "") {
                newErrors[input.name] = `${input.name} is required`;
            }
        });

        // Check email fields
        const emailFields = formElement.querySelectorAll('input[type="email"]');
        emailFields.forEach((field) => {
            const input = field as HTMLInputElement;
            if (data[input.name] && !isValidEmail(data[input.name])) {
                newErrors[input.name] = "Please enter a valid email address";
            }
        });

        return newErrors;
    }

    function validateField(name: string, value: string): string | null {
        const field = formElement.querySelector(
            `[name="${name}"]`,
        ) as HTMLInputElement;
        if (!field) return null;

        if (field.required && (!value || value.trim() === "")) {
            return `${name} is required`;
        }

        if (field.type === "email" && value && !isValidEmail(value)) {
            return "Please enter a valid email address";
        }

        if (field.minLength && value.length < field.minLength) {
            return `${name} must be at least ${field.minLength} characters`;
        }

        if (field.maxLength && value.length > field.maxLength) {
            return `${name} must be no more than ${field.maxLength} characters`;
        }

        return null;
    }

    function isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Focus management
    function focusFirstError() {
        const firstErrorField = formElement.querySelector(
            '[aria-invalid="true"]',
        ) as HTMLElement;
        if (firstErrorField) {
            firstErrorField.focus();
        }
    }

    // Expose methods for external use
    export function submit() {
        formElement.requestSubmit();
    }

    export function reset() {
        formElement.reset();
        errors = {};
        touched = {};
    }

    export function validate() {
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData.entries()) as Record<
            string,
            string
        >;
        const validationErrors = validateForm(data);
        errors = validationErrors;
        return Object.keys(validationErrors).length === 0;
    }

    // Accessibility attributes
    $: accessibilityProps = {
        "aria-label": ariaLabel || undefined,
        "aria-describedby": ariaDescribedBy || undefined,
        "aria-labelledby": ariaLabelledBy || undefined,
        "aria-busy": loading,
        "aria-disabled": disabled,
    };

    // Watch for errors to focus first error field
    $: if (Object.keys(errors).length > 0) {
        setTimeout(focusFirstError, 100);
    }
</script>

<form
    bind:this={formElement}
    {method}
    {action}
    {enctype}
    {novalidate}
    {autocomplete}
    {spellcheck}
    class={computedClasses}
    on:submit={handleSubmit}
    on:reset={handleReset}
    on:input={handleInput}
    on:blur={(e) => handleBlur(e as unknown as FocusEvent)}
    {...accessibilityProps}
>
    <fieldset
        bind:this={fieldsetElement}
        disabled={disabled || loading}
        class="form-fieldset"
    >
        <legend class="sr-only">Form Fields</legend>

        <div class="form-content">
            <slot />
        </div>

        {#if $$slots.actions}
            <div class="form-actions">
                <slot name="actions" />
            </div>
        {/if}
    </fieldset>

    {#if loading}
        <div class="form-loading-overlay" aria-hidden="true">
            <div class="loading-spinner"></div>
            <span class="loading-text">Processing...</span>
        </div>
    {/if}
</form>

<style>
    /* Modern Form Layouts using CSS Grid and Flexbox */
    .modern-form {
        position: relative;
        contain: layout style;
    }

    .form-fieldset {
        border: none;
        margin: 0;
        padding: 0;
        min-width: 0;
    }

    /* Vertical Layout (Default) */
    .form-vertical .form-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    /* Horizontal Layout */
    .form-horizontal .form-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: var(--spacing-md);
        align-items: start;
    }

    /* Grid Layout */
    .form-grid .form-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-md);
    }

    /* Inline Layout */
    .form-inline .form-content {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        align-items: end;
    }

    /* Gap variations */
    .gap-sm .form-content {
        gap: var(--spacing-sm);
    }

    .gap-md .form-content {
        gap: var(--spacing-md);
    }

    .gap-lg .form-content {
        gap: var(--spacing-lg);
    }

    /* Density variations */
    .density-compact .form-content {
        gap: var(--spacing-sm);
    }

    .density-comfortable .form-content {
        gap: var(--spacing-md);
    }

    /* Form Actions */
    .form-actions {
        display: flex;
        gap: var(--spacing-sm);
        justify-content: flex-end;
        margin-top: var(--spacing-lg);
        padding-top: var(--spacing-md);
        border-top: 1px solid rgb(var(--color-border));
    }

    /* Loading State */
    .form-loading-overlay {
        position: absolute;
        inset: 0;
        background: rgb(var(--color-surface) / 0.8);
        backdrop-filter: blur(2px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        z-index: 10;
    }

    .loading-spinner {
        width: 2rem;
        height: 2rem;
        border: 2px solid rgb(var(--color-border));
        border-top-color: rgb(var(--color-primary));
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .loading-text {
        font-size: 0.875rem;
        color: rgb(var(--color-text-secondary));
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Disabled State */
    .disabled .form-fieldset {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .disabled .form-fieldset * {
        pointer-events: none;
    }

    /* Focus Management */
    .modern-form:focus-within {
        outline: 2px solid rgb(var(--color-focus-ring));
        outline-offset: 2px;
        border-radius: var(--radius-md);
    }

    /* Error State */
    .form-field[aria-invalid="true"] {
        border-color: rgb(var(--color-error));
        box-shadow: 0 0 0 1px rgb(var(--color-error));
    }

    /* Screen Reader Only */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .form-horizontal .form-content {
            grid-template-columns: 1fr;
        }
    }

    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
        .loading-spinner {
            animation: none;
        }
    }

    /* High Contrast Mode */
    @media (prefers-contrast: high) {
        .modern-form:focus-within {
            outline-width: 3px;
        }
    }

    /* Print Styles */
    @media print {
        .form-loading-overlay {
            display: none;
        }

        .form-actions {
            border-top: 1px solid #000;
        }
    }
</style>
