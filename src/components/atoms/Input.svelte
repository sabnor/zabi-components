<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { InputEvents } from "../../types/events";
    import {
        createInputState,
        updateInputState,
        updateFocusState,
        updateValidationState,
        generateInputId,
        createInputEventDetail,
        createChangeEventDetail,
        formSizeClasses,
        baseInputClasses,
        getStateClasses,
        getDisabledClasses,
        getLabelClasses,
    } from "../../lib/form-utils";
    import InputActions from "./InputActions.svelte";
    import InputValidation from "./InputValidation.svelte";

    // Component props
    export let value: string = "";
    export let type: string = "text";
    export let label: string = "";
    export let placeholder: string = "";
    export let required: boolean = false;
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "default" | "error" | "success" = "default";
    export let error: string = "";
    export let success: string = "";
    export let helpText: string = "";
    export let className: string = "";
    export let id: string = "";
    export let name: string | undefined = undefined;
    export let maxLength: number | undefined = undefined;
    export let minLength: number | undefined = undefined;
    export let pattern: string | undefined = undefined;
    export let autocomplete:
        | "on"
        | "off"
        | "name"
        | "email"
        | "username"
        | "current-password"
        | "new-password"
        | "tel"
        | "url"
        | undefined = undefined;
    export let showPasswordToggle: boolean = false;
    export let showClearButton: boolean = false;
    export let ariaLabel: string | undefined = undefined;

    const dispatch = createEventDispatcher<InputEvents>();

    let inputElement: HTMLInputElement;
    let showPassword = false;

    // Generate unique ID
    $: inputId = generateInputId(id);

    // Create and manage input state
    $: inputState = updateValidationState(
        createInputState({ value, error, success, variant }),
        error,
        success,
        variant,
    );

    // Event handlers
    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
        dispatch("input", createInputEventDetail(value, event, name));
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
        dispatch("change", createChangeEventDetail(value, event, name));
    }

    function handleFocus(event: CustomEvent) {
        const focusEvent = event as unknown as FocusEvent;
        dispatch("focus", { event: focusEvent });
    }

    function handleBlur(event: CustomEvent) {
        const focusEvent = event as unknown as FocusEvent;
        dispatch("blur", { event: focusEvent });
    }

    function handleKeydown(event: CustomEvent) {
        const keyboardEvent = event as unknown as KeyboardEvent;
        dispatch("keydown", { event: keyboardEvent });
    }

    function handleKeyup(event: CustomEvent) {
        const keyboardEvent = event as unknown as KeyboardEvent;
        dispatch("keyup", { event: keyboardEvent });
    }

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    function clearValue() {
        value = "";
        dispatch("clear", { event: new Event("clear") });
        inputElement?.focus();
    }

    // Public methods
    export function focus() {
        inputElement?.focus();
    }
    export function blur() {
        inputElement?.blur();
    }
    export function select() {
        inputElement?.select();
    }

    // Computed classes
    $: inputClasses = [
        baseInputClasses,
        formSizeClasses[size].input,
        getStateClasses(inputState.hasError, inputState.hasSuccess),
        getDisabledClasses(disabled),
        className,
    ].join(" ");

    $: labelClasses = getLabelClasses(
        inputState.hasError,
        inputState.hasSuccess,
        size,
    );
</script>

<div class="relative group transition-all duration-200 ease-in-out">
    {#if label}
        <label for={inputId} class={labelClasses}>
            {label}
            {#if required}
                <span class="text-error ml-1" aria-label="required">*</span>
            {/if}
        </label>
    {/if}

    <div class="relative">
        <input
            bind:this={inputElement}
            id={inputId}
            type={showPasswordToggle && showPassword ? "text" : type}
            {value}
            {placeholder}
            {disabled}
            {required}
            {readonly}
            maxlength={maxLength}
            minlength={minLength}
            {pattern}
            autocomplete={autocomplete || undefined}
            {name}
            class={inputClasses}
            on:input={handleInput}
            on:change={handleChange}
            on:focus={handleFocus}
            on:blur={handleBlur}
            on:keydown={handleKeydown}
            on:keyup={handleKeyup}
            aria-invalid={inputState.hasError ? "true" : "false"}
            aria-describedby={inputState.hasError ||
            inputState.hasSuccess ||
            helpText
                ? `${inputId}-help`
                : undefined}
            aria-label={ariaLabel || (label ? undefined : "Input field")}
            aria-required={required}
        />

        <InputActions
            {showPasswordToggle}
            {showClearButton}
            hasValue={inputState.hasValue}
            {disabled}
            {readonly}
            {showPassword}
            onTogglePassword={togglePasswordVisibility}
            onClear={clearValue}
        />
    </div>

    <InputValidation
        hasError={inputState.hasError}
        hasSuccess={inputState.hasSuccess}
        {error}
        {success}
        {helpText}
        {inputId}
    />
</div>

<style>
    /* Enhanced focus styles using semantic tokens */
    :global(.input-focus-visible) {
        outline: 2px solid rgb(var(--color-focus-ring));
        outline-offset: 2px;
    }

    /* Smooth transitions for all interactive elements */
    input {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Placeholder styling using semantic tokens */
    input::placeholder {
        transition: color 0.2s ease;
        color: rgb(var(--color-text-placeholder));
    }

    input:focus::placeholder {
        color: rgb(var(--color-text-tertiary));
    }

    /* Number input spinner styling */
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
    }

    /* Search input styling */
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }
</style>
