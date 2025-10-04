<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import { AlignLeft, AlignCenter, AlignRight } from "@lucide/svelte";
    import type { TextAlignmentEvents } from "../../types/events";

    export let value: string = "center";
    export let label: string = "Text Alignment";
    export let required: boolean = false;
    export let size: "sm" | "md" | "lg" = "sm";
    // export let variant: "outlined" | "filled" = "outlined"; // Not used in this component

    const dispatch = createEventDispatcher<TextAlignmentEvents>();

    // Generate a unique ID for this component instance
    const componentId = `text-alignment-${Math.random().toString(36).substr(2, 9)}`;

    const alignmentOptions = [
        {
            value: "left",
            label: "Left",
            component: AlignLeft,
        },
        {
            value: "center",
            label: "Center",
            component: AlignCenter,
        },
        {
            value: "right",
            label: "Right",
            component: AlignRight,
        },
    ];

    function selectAlignment(alignmentValue: string, event?: Event) {
        value = alignmentValue;
        dispatch("change", {
            value: alignmentValue,
            event: event || new Event("change"),
        });
    }

    // Size classes
    const sizeClasses = {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-2",
        lg: "text-base px-4 py-3",
    };

    const buttonSizeClasses = {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-2",
        lg: "text-base px-4 py-3",
    };
</script>

<div class="space-y-2">
    <label
        for={componentId}
        class="block text-sm font-medium"
        style="color: rgb(var(--color-text));"
    >
        {label}
        {#if required}
            <span class="ml-1" style="color: rgb(var(--color-error));">*</span>
        {/if}
    </label>

    <div
        id={componentId}
        class="flex gap-1 p-1 rounded-lg min-w-48 sm:min-w-56 md:min-w-64 lg:min-w-72"
        style="background-color: rgb(var(--color-surface-secondary)); border-color: rgb(var(--color-border));"
        role="radiogroup"
        aria-label={label}
    >
        {#each alignmentOptions as option}
            <button
                type="button"
                class="flex-1 flex items-center justify-center gap-2 {buttonSizeClasses[
                    size
                ]} rounded-md transition-all duration-200 {value ===
                option.value
                    ? 'shadow-sm'
                    : ''}"
                style="color: {value === option.value
                    ? 'rgb(var(--color-text-inverse))'
                    : 'rgb(var(--color-text-secondary))'}; background-color: {value ===
                option.value
                    ? 'rgb(var(--color-primary))'
                    : 'transparent'};"
                on:click={(e) =>
                    selectAlignment(option.value, e as unknown as Event)}
                on:keydown={(e) => {
                    const keyboardEvent = e as unknown as KeyboardEvent;
                    if (keyboardEvent.key === "Enter") {
                        selectAlignment(option.value, keyboardEvent);
                    }
                }}
                role="radio"
                aria-checked={value === option.value}
                aria-label={option.label}
            >
                <svelte:component this={option.component} size={16} />
                <span class="hidden sm:inline">{option.label}</span>
            </button>
        {/each}
    </div>
</div>
