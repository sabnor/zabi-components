<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { AlertCircle, CheckCircle } from "@lucide/svelte";

    // Core props
    export let value: string = "";
    export let label: string = "";
    export let placeholder: string = "";
    export let helperText: string = "";
    export let disabled: boolean = false;
    export let required: boolean = false;
    export let readonly: boolean = false;
    export let id: string | undefined = undefined;
    export let name: string | undefined = undefined;

    // State props
    export let error: string = "";
    export let success: string = "";
    export let helpText: string = "";

    // Additional props
    export let maxLength: number | undefined = undefined;
    export let minLength: number | undefined = undefined;
    export let rows: number = 4;
    export let resize: "none" | "both" | "horizontal" | "vertical" = "vertical";
    export let autoResize: boolean = false;

    // UI props
    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "outlined" | "filled" | "underlined" = "outlined";
    export let className: string = "";

    // Accessibility props
    export let ariaLabel: string | undefined = undefined;

    const dispatch = createEventDispatcher<{
        input: { value: string };
        change: { value: string };
        focus: { event: FocusEvent };
        blur: { event: FocusEvent };
        keydown: { event: KeyboardEvent };
        keyup: { event: KeyboardEvent };
        resize: { event: Event };
    }>();

    let textareaElement: HTMLTextAreaElement;
    let isFocused = false;
    let hasValue = false;

    // Generate unique ID if not provided
    $: textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    // Check if textarea has value
    $: hasValue = value !== "" && value !== null && value !== undefined;

    // Error and success message handling
    $: hasError = Boolean(error);
    $: hasSuccess = Boolean(success);

    // Handle input events
    function handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
        hasValue = value !== "";

        if (autoResize) {
            autoResizeTextarea();
        }

        dispatch("input", { value });
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
        hasValue = value !== "";
        dispatch("change", { value });
    }

    function handleFocus(event: FocusEvent) {
        isFocused = true;
        dispatch("focus", { event });
    }

    function handleBlur(event: FocusEvent) {
        isFocused = false;
        dispatch("blur", { event });
    }

    function handleKeydown(event: KeyboardEvent) {
        dispatch("keydown", { event });
    }

    function handleKeyup(event: KeyboardEvent) {
        dispatch("keyup", { event });
    }

    function handleResize(event: Event) {
        dispatch("resize", { event });
    }

    function autoResizeTextarea() {
        if (textareaElement) {
            textareaElement.style.height = "auto";
            textareaElement.style.height = textareaElement.scrollHeight + "px";
        }
    }

    // Focus method for external use
    export function focus() {
        textareaElement?.focus();
    }

    // Blur method for external use
    export function blur() {
        textareaElement?.blur();
    }

    // Select method for external use
    export function select() {
        textareaElement?.select();
    }

    // Size classes using semantic tokens
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
    };

    // Variant classes
    $: variantClasses = {
        outlined: "border border-primary bg-surface",
        filled: "border-0 bg-surface-secondary",
        underlined:
            "border-0 border-b border-primary bg-transparent rounded-none",
    };

    // Resize classes
    $: resizeClasses = {
        none: "resize-none",
        both: "resize",
        horizontal: "resize-x",
        vertical: "resize-y",
    };

    // Base textarea classes using semantic tokens
    $: baseTextareaClasses = [
        "w-full",
        "min-w-0",
        variant === "underlined" ? "rounded-none" : "rounded-md",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-focus",
        "focus:ring-offset-2",
        "focus:ring-offset-surface",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "read-only:cursor-default",
        "read-only:opacity-75",
        "overflow-hidden",
        sizeClasses[size],
        variantClasses[variant],
        resizeClasses[resize],
        className,
    ].join(" ");

    // State-specific classes using semantic tokens
    $: stateClasses = hasError
        ? "border-error text-primary placeholder-placeholder focus:ring-error focus:border-error"
        : hasSuccess
          ? "border-success text-primary placeholder-placeholder focus:ring-success focus:border-success"
          : "text-primary placeholder-placeholder focus:ring-focus focus:border-focus";

    // Disabled state classes
    $: disabledClasses = disabled
        ? "bg-surface-disabled text-disabled border-disabled cursor-not-allowed"
        : "";

    // Textarea classes combining all states
    $: textareaClasses = [
        baseTextareaClasses,
        stateClasses,
        disabledClasses,
    ].join(" ");

    // Container classes
    $: containerClasses = [
        "relative",
        "group",
        "transition-all",
        "duration-200",
        "ease-in-out",
    ].join(" ");

    // Label classes using semantic tokens
    $: labelClasses = [
        "block",
        "text-sm",
        "font-medium",
        "mb-2",
        "transition-colors",
        "duration-200",
        hasError ? "text-error" : hasSuccess ? "text-success" : "text-primary",
    ].join(" ");

    // Helper text classes using semantic tokens
    $: helperTextClasses = [
        "mt-2",
        "text-xs",
        hasError
            ? "text-error"
            : hasSuccess
              ? "text-success"
              : "text-secondary",
    ].join(" ");

    // Character count classes using semantic tokens
    $: charCountClasses = [
        "text-xs",
        "text-secondary",
        "mt-1",
        "text-right",
        maxLength && value.length > maxLength * 0.9 ? "text-warning" : "",
        maxLength && value.length >= maxLength ? "text-error" : "",
    ].join(" ");
</script>

<div class={containerClasses}>
    {#if label}
        <label for={textareaId} class={labelClasses}>
            {label}
            {#if required}
                <span class="text-error ml-1" aria-label="required">*</span>
            {/if}
        </label>
    {/if}

    <div class="relative">
        <textarea
            bind:this={textareaElement}
            id={textareaId}
            {value}
            {placeholder}
            {disabled}
            {required}
            {readonly}
            maxlength={maxLength}
            minlength={minLength}
            {name}
            {rows}
            class={textareaClasses}
            on:input={handleInput}
            on:change={handleChange}
            on:focus={(e) => handleFocus(e as unknown as FocusEvent)}
            on:blur={(e) => handleBlur(e as unknown as FocusEvent)}
            on:keydown={(e) => handleKeydown(e as unknown as KeyboardEvent)}
            on:keyup={(e) => handleKeyup(e as unknown as KeyboardEvent)}
            on:resize={handleResize}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError || hasSuccess || helperText || maxLength
                ? `${textareaId}-help`
                : undefined}
            aria-label={ariaLabel || (label ? undefined : "Textarea field")}
            aria-required={required}
        ></textarea>
    </div>

    <!-- Character count -->
    {#if maxLength}
        <div class={charCountClasses}>
            {value.length}/{maxLength}
        </div>
    {/if}

    {#if hasError || hasSuccess || helpText}
        <div id="{textareaId}-help" class={helperTextClasses}>
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
    :global(.textarea-focus-visible) {
        outline: 2px solid rgb(var(--color-focus-ring));
        outline-offset: 2px;
    }

    /* Smooth transitions for all interactive elements */
    textarea {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Custom scrollbar for textarea using semantic tokens */
    textarea::-webkit-scrollbar {
        width: 6px;
    }

    textarea::-webkit-scrollbar-track {
        background: transparent;
    }

    textarea::-webkit-scrollbar-thumb {
        background: rgb(var(--color-border-secondary));
        border-radius: 3px;
    }

    textarea::-webkit-scrollbar-thumb:hover {
        background: rgb(var(--color-border-hover));
    }

    /* Placeholder styling using semantic tokens */
    textarea::placeholder {
        transition: color 0.2s ease;
        color: rgb(var(--color-text-placeholder));
    }

    textarea:focus::placeholder {
        color: rgb(var(--color-text-tertiary));
    }

    /* Character count styling using semantic tokens */
    .char-count-warning {
        color: rgb(var(--color-warning));
    }

    .char-count-error {
        color: rgb(var(--color-error));
    }

    /* Resize handle styling */
    textarea:not(.resize-none) {
        resize: both;
    }

    textarea.resize-x {
        resize: horizontal;
    }

    textarea.resize-y {
        resize: vertical;
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
