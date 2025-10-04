<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Eye, EyeOff, AlertCircle, CheckCircle, X } from "@lucide/svelte";
    import type {
        InputEvents,
        InputEventDetail,
        ChangeEventDetail,
    } from "../../types/events";

    // Standardized component props
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

    // Additional props
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

    // UI props
    export let showPasswordToggle: boolean = false;
    export let showClearButton: boolean = false;

    // Accessibility props
    export let ariaLabel: string | undefined = undefined;

    const dispatch = createEventDispatcher<InputEvents>();

    let inputElement: HTMLInputElement;
    let showPassword = false;
    let isFocused = false;
    let hasValue = false;

    // Generate unique ID if not provided
    $: inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Check if input has value
    $: hasValue = value !== "" && value !== null && value !== undefined;

    // Error and success message handling
    $: hasError = Boolean(error) || variant === "error";
    $: hasSuccess = Boolean(success) || variant === "success";

    // Handle input events with standardized structure
    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
        hasValue = value !== "";
        dispatch("input", { value, event: event as InputEvent, field: name });
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
        hasValue = value !== "";
        dispatch("change", { value, event, field: name });
    }

    function handleFocus(event: CustomEvent) {
        isFocused = true;
        dispatch("focus", { event: event as unknown as FocusEvent });
    }

    function handleBlur(event: CustomEvent) {
        isFocused = false;
        dispatch("blur", { event: event as unknown as FocusEvent });
    }

    function handleKeydown(event: CustomEvent) {
        dispatch("keydown", { event: event as unknown as KeyboardEvent });
    }

    function handleKeyup(event: CustomEvent) {
        dispatch("keyup", { event: event as unknown as KeyboardEvent });
    }

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    function clearValue() {
        value = "";
        hasValue = false;
        dispatch("clear", { event: new Event("clear") });
        inputElement?.focus();
    }

    // Focus method for external use
    export function focus() {
        inputElement?.focus();
    }

    // Blur method for external use
    export function blur() {
        inputElement?.blur();
    }

    // Select method for external use
    export function select() {
        inputElement?.select();
    }

    // Size classes using standardized sizes
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
    };

    // Base input classes using CSS custom properties
    $: baseInputClasses = [
        "w-full",
        "min-w-0",
        "rounded-md",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-[var(--zabi-focus-ring)]",
        "focus:ring-offset-2",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "read-only:cursor-default",
        "read-only:opacity-75",
        sizeClasses[size],
        className,
    ].join(" ");

    // State-specific classes using CSS custom properties
    $: stateClasses = hasError
        ? "border-[var(--zabi-error)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-error)] focus:border-[var(--zabi-error)]"
        : hasSuccess
          ? "border-[var(--zabi-success)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-success)] focus:border-[var(--zabi-success)]"
          : "border-[var(--zabi-border)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-focus-ring)] focus:border-[var(--zabi-border-focus)]";

    // Disabled state classes
    $: disabledClasses = disabled
        ? "bg-[var(--zabi-surface-disabled)] text-[var(--zabi-text-disabled)] border-[var(--zabi-border-disabled)] cursor-not-allowed"
        : "";

    // Input classes combining all states
    $: inputClasses = [baseInputClasses, stateClasses, disabledClasses].join(
        " ",
    );

    // Container classes
    $: containerClasses = [
        "relative",
        "group",
        "transition-all",
        "duration-200",
        "ease-in-out",
    ].join(" ");

    // Label classes using CSS custom properties
    $: labelClasses = [
        "block",
        "text-sm",
        "font-medium",
        "mb-2",
        "transition-colors",
        "duration-200",
        hasError
            ? "text-[var(--zabi-error)]"
            : hasSuccess
              ? "text-[var(--zabi-success)]"
              : "text-[var(--zabi-text)]",
    ].join(" ");

    // Helper text classes using CSS custom properties
    $: helperTextClasses = [
        "mt-2",
        "text-xs",
        hasError
            ? "text-[var(--zabi-error)]"
            : hasSuccess
              ? "text-[var(--zabi-success)]"
              : "text-[var(--zabi-text-muted)]",
    ].join(" ");

    // Button classes for password toggle and clear button
    $: buttonClasses = [
        "absolute",
        "right-3",
        "top-1/2",
        "-translate-y-1/2",
        "text-tertiary",
        "hover:text-primary",
        "transition-colors",
        "duration-200",
        "focus:outline-none",
        "focus:text-primary",
        "focus:ring-2",
        "focus:ring-focus",
        "focus:ring-offset-1",
        "rounded-sm",
        "p-1",
    ].join(" ");
</script>

<div class={containerClasses}>
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
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError || hasSuccess || helpText
                ? `${inputId}-help`
                : undefined}
            aria-label={ariaLabel || (label ? undefined : "Input field")}
            aria-required={required}
        />

        <!-- Action buttons (password toggle and clear button) -->
        <div
            class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1"
        >
            {#if showClearButton && hasValue && !disabled && !readonly}
                <button
                    type="button"
                    class={buttonClasses}
                    on:click|preventDefault={clearValue}
                    on:keydown={(e) =>
                        (e as unknown as KeyboardEvent).key === "Enter" &&
                        clearValue()}
                    aria-label="Clear input"
                >
                    <X size={16} />
                </button>
            {/if}

            {#if showPasswordToggle && type === "password"}
                <button
                    type="button"
                    class={buttonClasses}
                    on:click|preventDefault={togglePasswordVisibility}
                    on:keydown={(e) =>
                        (e as unknown as KeyboardEvent).key === "Enter" &&
                        togglePasswordVisibility()}
                    aria-label={showPassword
                        ? "Hide password"
                        : "Show password"}
                >
                    {#if showPassword}
                        <EyeOff size={16} />
                    {:else}
                        <Eye size={16} />
                    {/if}
                </button>
            {/if}
        </div>
    </div>

    {#if hasError || hasSuccess || helpText}
        <div id="{inputId}-help" class={helperTextClasses}>
            {#if hasError}
                <div class="flex items-center gap-1">
                    <AlertCircle size={14} class="flex-shrink-0" />
                    <span>{error}</span>
                </div>
            {:else if hasSuccess}
                <div class="flex items-center gap-1">
                    <CheckCircle size={14} class="flex-shrink-0" />
                    <span>{success}</span>
                </div>
            {:else if helpText}
                <span>{helpText}</span>
            {/if}
        </div>
    {/if}
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

    /* Action button hover effects */
    button[aria-label] {
        transition: all 0.2s ease;
    }

    button[aria-label]:hover {
        transform: scale(1.05);
    }

    button[aria-label]:active {
        transform: scale(0.95);
    }

    /* Focus ring animation */
    .focus-ring {
        animation: focus-ring-pulse 0.2s ease-out;
    }

    @keyframes focus-ring-pulse {
        0% {
            transform: scale(0.95);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>
