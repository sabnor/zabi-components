<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import { Eye, EyeOff, AlertCircle, CheckCircle } from "@lucide/svelte";

    export let value: string = "";
    export let type:
        | "text"
        | "email"
        | "password"
        | "number"
        | "tel"
        | "url"
        | "search" = "text";
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
    export let showPasswordToggle: boolean = false;
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
    export let name: string | undefined = undefined;
    export let id: string | undefined = undefined;

    const dispatch = createEventDispatcher<{
        input: { value: string; event: Event };
        change: { value: string; event: Event };
        focus: { event: FocusEvent };
        blur: { event: FocusEvent };
        keydown: { event: KeyboardEvent };
        keyup: { event: KeyboardEvent };
    }>();

    let inputElement: HTMLInputElement;
    let showPassword = false;
    let isFocused = false;
    let hasValue = false;

    // Generate unique ID if not provided
    $: inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Check if input has value
    $: hasValue = value !== "" && value !== null && value !== undefined;

    // Handle input events
    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
        hasValue = value !== "";
        dispatch("input", { value, event });
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
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

    function togglePasswordVisibility() {
        showPassword = !showPassword;
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

    // Size classes
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3 text-lg",
    };

    // Variant classes
    $: variantClasses = {
        default:
            "bg-dark-700 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
        outlined:
            "bg-dark-600 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
        filled: "bg-dark-600 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
        ghost: "bg-transparent border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
    };

    // State classes
    $: stateClasses = error
        ? "focus:ring-blood-red-500/20"
        : success
          ? "focus:ring-matrix-green-500/20"
          : "";

    // Container classes
    $: containerClasses = [
        "relative",
        "group",
        "transition-all",
        "duration-200",
        "ease-in-out",
    ].join(" ");

    // Input classes
    $: inputClasses = [
        "w-full",
        "min-w-0", // Allow input to shrink below minimum width
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
        sizeClasses[size],
        variantClasses[variant],
        stateClasses,
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
        error
            ? "text-blood-red-400"
            : success
              ? "text-matrix-green-400"
              : "text-gray-300",
    ].join(" ");

    // Help text classes
    $: helpTextClasses = [
        "mt-2",
        "text-xs",
        error
            ? "text-blood-red-400"
            : success
              ? "text-matrix-green-400"
              : "text-gray-400",
    ].join(" ");
</script>

<div class={containerClasses}>
    {#if label}
        <label for={inputId} class={labelClasses}>
            {label}
            {#if required}
                <span class="text-blood-red-500 ml-1">*</span>
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
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error || success || helpText
                ? `${inputId}-help`
                : undefined}
        />

        {#if showPasswordToggle && type === "password"}
            <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                on:click={togglePasswordVisibility}
                on:keydown={(e) =>
                    e.key === "Enter" && togglePasswordVisibility()}
                tabindex="-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {#if showPassword}
                    <EyeOff size={20} />
                {:else}
                    <Eye size={20} />
                {/if}
            </button>
        {/if}

        <!-- Focus indicator -->
        <div
            class="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 {isFocused
                ? 'ring-2 ring-plasma-red-500/20'
                : ''}"
        ></div>
    </div>

    {#if error || success || helpText}
        <div id="{inputId}-help" class={helpTextClasses}>
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
    :global(.input-focus-visible) {
        outline: 2px solid var(--color-plasma-red-500);
        outline-offset: 2px;
    }

    /* Smooth transitions for all interactive elements */
    input {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Custom scrollbar for textarea-like inputs */
    input::-webkit-scrollbar {
        width: 4px;
    }

    input::-webkit-scrollbar-track {
        background: transparent;
    }

    input::-webkit-scrollbar-thumb {
        background: var(--color-dark-600);
        border-radius: 2px;
    }

    input::-webkit-scrollbar-thumb:hover {
        background: var(--color-dark-500);
    }

    /* Placeholder styling */
    input::placeholder {
        transition: color 0.2s ease;
    }

    input:focus::placeholder {
        color: var(--color-gray-300);
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

    /* Password toggle button hover effects */
    button[aria-label] {
        transition: all 0.2s ease;
    }

    button[aria-label]:hover {
        transform: scale(1.1);
    }

    button[aria-label]:active {
        transform: scale(0.95);
    }
</style>
