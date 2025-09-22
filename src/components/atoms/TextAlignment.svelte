<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";
    import { AlignLeft, AlignCenter, AlignRight } from "@lucide/svelte";

    export let value: string = "center";
    export let label: string = "Text Alignment";
    export let required: boolean = false;
    export let size: "sm" | "md" | "lg" = "sm";
    // export let variant: "outlined" | "filled" = "outlined"; // Not used in this component

    const dispatch = createEventDispatcher();

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

    function selectAlignment(alignmentValue: string) {
        value = alignmentValue;
        dispatch("change", { value: alignmentValue });
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
    <label for={componentId} class="block text-sm font-medium text-stone-300">
        {label}
        {#if required}
            <span class="text-red-400 ml-1">*</span>
        {/if}
    </label>

    <div
        id={componentId}
        class="flex gap-1 p-1 bg-stone-800 rounded-lg border border-stone-700 min-w-48 sm:min-w-56 md:min-w-64 lg:min-w-72"
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
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-700'}"
                on:click={() => selectAlignment(option.value)}
                on:keydown={(e) =>
                    e.key === "Enter" && selectAlignment(option.value)}
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
