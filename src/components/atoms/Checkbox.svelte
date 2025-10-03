<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let required: boolean = false;
    export let label: string = "";
    export let helpText: string = "";
    export let error: string = "";
    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "default" | "outlined" | "filled" = "default";
    export let indeterminate: boolean = false;
    export let name: string | undefined = undefined;
    export let id: string | undefined = undefined;
    export let value: string | undefined = undefined;
    export let className: string = "";

    const dispatch = createEventDispatcher<{
        change: { checked: boolean };
        focus: { event: FocusEvent };
        blur: { event: FocusEvent };
    }>();

    let checkboxElement: HTMLInputElement;
    let isFocused = false;

    // Generate unique ID if not provided
    $: checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        dispatch("change", { checked });
    }

    function handleFocus(event: FocusEvent) {
        isFocused = true;
        dispatch("focus", { event });
    }

    function handleBlur(event: FocusEvent) {
        isFocused = false;
        dispatch("blur", { event });
    }

    // Focus method for external use
    export function focus() {
        checkboxElement?.focus();
    }

    // Blur method for external use
    export function blur() {
        checkboxElement?.blur();
    }

    // Size classes
    $: sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    // Variant classes
    $: variantClasses = {
        default:
            "bg-surface border border-primary text-primary focus:ring-primary focus:border-transparent",
        outlined:
            "bg-surface-secondary border border-primary text-primary focus:ring-primary focus:border-transparent",
        filled: "bg-surface-secondary border border-primary text-primary focus:ring-primary focus:border-transparent",
    };

    // State classes
    $: stateClasses = error ? "focus:ring-error border-error" : "";

    // Container classes
    $: containerClasses = [
        "relative",
        "flex",
        "items-start",
        "gap-3",
        "group",
        "transition-all",
        "duration-200",
        "ease-in-out",
        className,
    ].join(" ");

    // Checkbox classes
    $: checkboxClasses = [
        "flex-shrink-0",
        "rounded",
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
        sizeClasses[size],
        variantClasses[variant],
        stateClasses,
        error ? "grainy-red" : "grainy-texture",
    ].join(" ");

    // Label classes
    $: labelClasses = [
        "text-sm",
        "font-medium",
        "cursor-pointer",
        "select-none",
        "transition-colors",
        "duration-200",
        error ? "text-error" : "text-primary",
        disabled ? "opacity-50 cursor-not-allowed" : "",
    ].join(" ");

    // Help text classes
    $: helpTextClasses = [
        "text-xs",
        "mt-1",
        error ? "text-error" : "text-tertiary",
    ].join(" ");

    // Check icon classes
    $: checkIconClasses = [
        "w-full",
        "h-full",
        "text-current",
        "transition-all",
        "duration-200",
        "ease-in-out",
    ].join(" ");

    // Indeterminate icon classes
    $: indeterminateIconClasses = [
        "w-full",
        "h-full",
        "text-current",
        "transition-all",
        "duration-200",
        "ease-in-out",
    ].join(" ");
</script>

<div class={containerClasses}>
    <div class="relative">
        <input
            bind:this={checkboxElement}
            type="checkbox"
            id={checkboxId}
            bind:checked
            {disabled}
            {required}
            {name}
            {value}
            class="sr-only"
            on:change={handleChange}
            on:focus={(e) => handleFocus(e as unknown as FocusEvent)}
            on:blur={(e) => handleBlur(e as unknown as FocusEvent)}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error || helpText
                ? `${checkboxId}-help`
                : undefined}
        />

        <div class={checkboxClasses}>
            {#if checked && !indeterminate}
                <svg
                    class={checkIconClasses}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    />
                </svg>
            {:else if indeterminate}
                <svg
                    class={indeterminateIconClasses}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fill-rule="evenodd"
                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>
            {/if}
        </div>

        <!-- Focus indicator -->
        <div
            class="absolute inset-0 rounded pointer-events-none transition-all duration-200 {isFocused
                ? 'ring-2 ring-primary'
                : ''}"
        ></div>
    </div>

    <div class="flex-1 min-w-0">
        {#if label}
            <label for={checkboxId} class={labelClasses}>
                {label}
                {#if required}
                    <span class="text-error ml-1">*</span>
                {/if}
            </label>
        {/if}

        {#if error || helpText}
            <div id="{checkboxId}-help" class={helpTextClasses}>
                {#if error}
                    <div class="flex items-center gap-1">
                        <svg
                            class="w-3 h-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                {:else if helpText}
                    <span>{helpText}</span>
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    /* Custom focus styles for better accessibility */
    :global(.checkbox-focus-visible) {
        outline: 2px solid var(--color-plasma-red-500);
        outline-offset: 2px;
    }

    /* Smooth transitions for all interactive elements */
    .checkbox-input {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Hover effects */
    .checkbox-container:hover .checkbox-visual {
        transform: scale(1.05);
    }

    .checkbox-container:active .checkbox-visual {
        transform: scale(0.95);
    }

    /* Check animation */
    .checkbox-check {
        animation: checkbox-check 0.2s ease-out;
    }

    @keyframes checkbox-check {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* Indeterminate animation */
    .checkbox-indeterminate {
        animation: checkbox-indeterminate 0.2s ease-out;
    }

    @keyframes checkbox-indeterminate {
        0% {
            opacity: 0;
            transform: scaleX(0);
        }
        100% {
            opacity: 1;
            transform: scaleX(1);
        }
    }

    /* Focus ring animation */
    .checkbox-focus-ring {
        animation: checkbox-focus-ring 0.2s ease-out;
    }

    @keyframes checkbox-focus-ring {
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
    .checkbox-disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .checkbox-disabled:hover {
        transform: none;
    }

    /* Required indicator styling */
    .checkbox-required {
        color: var(--color-blood-red-500);
    }
</style>
