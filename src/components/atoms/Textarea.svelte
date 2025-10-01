<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { AlertCircle, CheckCircle } from "@lucide/svelte";

    export let value: string = "";
    export let placeholder: string = "";
    export let label: string = "";
    export let disabled: boolean = false;
    export let required: boolean = false;
    export let readonly: boolean = false;
    export let error: string = "";
    export let success: string = "";
    export let helpText: string = "";
    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "default" | "outlined" | "filled" | "ghost" = "default";
    export let rows: number = 4;
    export let maxLength: number | undefined = undefined;
    export let minLength: number | undefined = undefined;
    export const pattern: string | undefined = undefined;
    export let name: string | undefined = undefined;
    export let id: string | undefined = undefined;
    export let resize: "none" | "both" | "horizontal" | "vertical" = "vertical";
    export let autoResize: boolean = false;

    const dispatch = createEventDispatcher<{
        input: { value: string; event: Event };
        change: { value: string; event: Event };
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

    // Handle input events
    function handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
        hasValue = value !== "";

        if (autoResize) {
            autoResizeTextarea();
        }

        dispatch("input", { value, event });
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
        hasValue = value !== "";
        dispatch("change", { value, event });
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

    // Size classes
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3 text-lg",
    };

    // Variant classes
    $: variantClasses = {
        default:
            "bg-surface border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
        outlined:
            "bg-surface-secondary border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
        filled: "bg-surface-secondary border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
        ghost: "bg-transparent border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
    };

    // State classes
    $: stateClasses = error
        ? "focus:ring-error border-error"
        : success
          ? "focus:ring-success border-success"
          : "";

    // Resize classes
    $: resizeClasses = {
        none: "resize-none",
        both: "resize",
        horizontal: "resize-x",
        vertical: "resize-y",
    };

    // Container classes
    $: containerClasses = [
        "relative",
        "group",
        "transition-all",
        "duration-200",
        "ease-in-out",
    ].join(" ");

    // Textarea classes
    $: textareaClasses = [
        "w-full",
        "min-w-0", // Allow textarea to shrink below minimum width
        "rounded-lg",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-offset-dark-900",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "read-only:cursor-default",
        "read-only:opacity-75",
        "overflow-hidden",
        sizeClasses[size],
        variantClasses[variant],
        stateClasses,
        resizeClasses[resize],
        error ? "grainy-red" : success ? "grainy-green" : "grainy-texture",
    ].join(" ");

    // Label classes
    $: labelClasses = [
        "block",
        "text-sm",
        "font-medium",
        "mb-2",
        "transition-colors",
        "duration-200",
        error ? "text-error" : success ? "text-success" : "text-primary",
    ].join(" ");

    // Help text classes
    $: helpTextClasses = [
        "mt-2",
        "text-xs",
        error ? "text-error" : success ? "text-success" : "text-tertiary",
    ].join(" ");

    // Character count classes
    $: charCountClasses = [
        "text-xs",
        "text-tertiary",
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
                <span class="text-error ml-1">*</span>
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
            on:focus={handleFocus}
            on:blur={handleBlur}
            on:keydown={handleKeydown}
            on:keyup={handleKeyup}
            on:resize={handleResize}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error || success || helpText || maxLength
                ? `${textareaId}-help`
                : undefined}
        ></textarea>

        <!-- Focus indicator -->
        <div
            class="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 {isFocused
                ? 'ring-2 ring-primary'
                : ''}"
        ></div>
    </div>

    <!-- Character count -->
    {#if maxLength}
        <div class={charCountClasses}>
            {value.length}/{maxLength}
        </div>
    {/if}

    {#if error || success || helpText}
        <div id="{textareaId}-help" class={helpTextClasses}>
            {#if error}
                <div class="flex items-center gap-1">
                    <AlertCircle size={16} class="flex-shrink-0" />
                    <span>{error}</span>
                </div>
            {:else if success}
                <div class="flex items-center gap-1">
                    <CheckCircle size={16} class="flex-shrink-0" />
                    <span>{success}</span>
                </div>
            {:else if helpText}
                <span>{helpText}</span>
            {/if}
        </div>
    {/if}
</div>

<style>
    /* Custom focus styles for better accessibility */
    :global(.textarea-focus-visible) {
        outline: 2px solid var(--color-plasma-red-500);
        outline-offset: 2px;
    }

    /* Smooth transitions for all interactive elements */
    textarea {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Custom scrollbar for textarea */
    textarea::-webkit-scrollbar {
        width: 6px;
    }

    textarea::-webkit-scrollbar-track {
        background: transparent;
    }

    textarea::-webkit-scrollbar-thumb {
        background: var(--color-dark-600);
        border-radius: 3px;
    }

    textarea::-webkit-scrollbar-thumb:hover {
        background: var(--color-dark-500);
    }

    /* Placeholder styling */
    textarea::placeholder {
        transition: color 0.2s ease;
    }

    textarea:focus::placeholder {
        color: var(--color-gray-300);
    }

    /* Character count styling */
    .char-count-warning {
        color: var(--color-cyber-amber-400);
    }

    .char-count-error {
        color: var(--color-blood-red-400);
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
