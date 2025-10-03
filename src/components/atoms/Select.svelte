<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import { ChevronDown, X, AlertCircle, CheckCircle } from "@lucide/svelte";

    export let value: string | number | undefined = undefined;
    export let options: Array<{
        value: string | number;
        label: string;
        disabled?: boolean;
    }> = [];
    export let placeholder: string = "Select an option";
    export let label: string = "";
    export let disabled: boolean = false;
    export let required: boolean = false;
    export let error: string = "";
    export let success: string = "";
    export let helpText: string = "";
    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "outlined" | "filled" | "underlined" = "outlined";
    export let searchable: boolean = false;
    export let clearable: boolean = false;
    export let name: string | undefined = undefined;
    export let id: string | undefined = undefined;
    export let className: string = "";

    const dispatch = createEventDispatcher<{
        input: { value: string };
        change: { value: string };
        focus: { event: FocusEvent };
        blur: { event: FocusEvent };
        keydown: { event: KeyboardEvent };
        keyup: { event: KeyboardEvent };
        clear: { event: Event };
    }>();

    let selectElement: HTMLSelectElement;
    let isOpen = false;
    let isFocused = false;
    let searchQuery = "";
    let filteredOptions: typeof options = [];

    // Generate unique ID if not provided
    $: selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Filter options based on search query
    $: {
        if (searchable && searchQuery) {
            filteredOptions = options.filter((option) =>
                option.label.toLowerCase().includes(searchQuery.toLowerCase()),
            );
        } else {
            filteredOptions = options;
        }
    }

    // Get the selected option
    $: selectedOption = options.find((option) => option.value === value);

    function handleInput(event: Event) {
        const target = event.target as HTMLSelectElement;
        value = target.value;
        dispatch("input", { value: String(value) });
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        value = target.value;
        dispatch("change", { value: String(value) });
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

    function handleClear(event: Event) {
        event.stopPropagation();
        value = undefined;
        dispatch("clear", { event });
    }

    function handleSearchInput(event: Event) {
        const target = event.target as HTMLInputElement;
        searchQuery = target.value;
    }

    // Focus method for external use
    export function focus() {
        selectElement?.focus();
    }

    // Blur method for external use
    export function blur() {
        selectElement?.blur();
    }

    // Size classes
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3 text-lg",
    };

    // Variant classes
    $: variantClasses = {
        outlined: "border border-primary bg-surface",
        filled: "border-0 bg-surface-secondary",
        underlined:
            "border-0 border-b border-primary bg-transparent rounded-none",
    };

    // State classes
    $: stateClasses = error
        ? "focus:ring-error border-error"
        : success
          ? "focus:ring-success border-success"
          : "";

    // Container classes
    $: containerClasses = [
        "relative",
        "group",
        "transition-all",
        "duration-200",
        "ease-in-out",
    ].join(" ");

    // Select classes
    $: selectClasses = [
        "w-full",
        "min-w-40 sm:min-w-48 md:min-w-56 lg:min-w-64", // Responsive minimum width for selects
        variant === "underlined" ? "rounded-none" : "rounded-lg",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-offset-dark-900",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "cursor-pointer",
        "appearance-none",
        "pr-10",
        sizeClasses[size],
        variantClasses[variant],
        stateClasses,
        className,
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

    // Dropdown icon classes
    $: iconClasses = [
        "absolute",
        "right-3",
        "top-1/2",
        "-translate-y-1/2",
        "pointer-events-none",
        "transition-transform",
        "duration-200",
        isOpen ? "rotate-180" : "",
        size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6",
    ].join(" ");

    // Clear button classes
    $: clearButtonClasses = [
        "absolute",
        "right-8",
        "top-1/2",
        "-translate-y-1/2",
        "text-gray-400",
        "hover:text-white",
        "transition-colors",
        "duration-200",
        "focus:outline-none",
        "focus:text-white",
        size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6",
    ].join(" ");
</script>

<div class={containerClasses}>
    {#if label}
        <label for={selectId} class={labelClasses}>
            {label}
            {#if required}
                <span class="text-error ml-1">*</span>
            {/if}
        </label>
    {/if}

    <div class="relative">
        <select
            bind:this={selectElement}
            id={selectId}
            {value}
            {disabled}
            {required}
            {name}
            class={selectClasses}
            on:input={handleInput}
            on:change={handleChange}
            on:focus={handleFocus}
            on:blur={handleBlur}
            on:keydown={handleKeydown}
            on:keyup={handleKeyup}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error || success || helpText
                ? `${selectId}-help`
                : undefined}
        >
            {#if placeholder && !value}
                <option value="" disabled>{placeholder}</option>
            {/if}
            {#each filteredOptions as option (option.value)}
                <option
                    value={option.value}
                    disabled={option.disabled}
                    class="bg-dark-800 text-white"
                >
                    {option.label}
                </option>
            {/each}
        </select>

        <!-- Clear button -->
        {#if clearable && value !== undefined && value !== ""}
            <button
                type="button"
                class={clearButtonClasses}
                on:click={handleClear}
                on:keydown={(e: KeyboardEvent) =>
                    e.key === "Enter" && handleClear(e)}
                tabindex="-1"
                aria-label="Clear selection"
            >
                <X size={size === "sm" ? 12 : size === "md" ? 16 : 20} />
            </button>
        {/if}

        <!-- Dropdown icon -->
        <div class={iconClasses}>
            <ChevronDown size={size === "sm" ? 16 : size === "md" ? 20 : 24} />
        </div>

        <!-- Focus indicator -->
        <div
            class="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 {isFocused
                ? 'ring-2 ring-primary'
                : ''}"
        ></div>
    </div>

    {#if error || success || helpText}
        <div id="{selectId}-help" class={helpTextClasses}>
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
    :global(.select-focus-visible) {
        outline: 2px solid var(--color-plasma-red-500);
        outline-offset: 2px;
    }

    /* Smooth transitions for all interactive elements */
    select {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Custom dropdown arrow styling */
    select::-ms-expand {
        display: none;
    }

    /* Option styling */
    option {
        background-color: var(--color-dark-800);
        color: white;
        padding: 0.5rem;
    }

    /* Hover effects */
    .select-container:hover .select-icon {
        transform: scale(1.1);
    }

    .select-container:active .select-icon {
        transform: scale(0.95);
    }

    /* Clear button hover effects */
    button[aria-label="Clear selection"] {
        transition: all 0.2s ease;
    }

    button[aria-label="Clear selection"]:hover {
        transform: scale(1.1);
    }

    button[aria-label="Clear selection"]:active {
        transform: scale(0.95);
    }

    /* Focus ring animation */
    .select-focus-ring {
        animation: select-focus-ring-pulse 0.2s ease-out;
    }

    @keyframes select-focus-ring-pulse {
        0% {
            transform: scale(0.95);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* Disabled state styling */
    .select-disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .select-disabled:hover {
        transform: none;
    }

    /* Required indicator styling */
    .select-required {
        color: var(--color-blood-red-500);
    }
</style>
