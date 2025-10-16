<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Props
    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let label: string = "";
    export let className: string = "";

    // Event dispatcher
    const dispatch = createEventDispatcher<{
        click: MouseEvent;
        change: { checked: boolean };
    }>();

    // Simple ID generation
    let toggleId = "toggle-" + Math.floor(Math.random() * 1000000);

    // Handle click
    function handleClick(event: MouseEvent) {
        if (disabled) return;
        checked = !checked;
        dispatch("click", event);
        dispatch("change", { checked });
    }

    // Handle keyboard
    function handleKeydown(event: KeyboardEvent) {
        if (disabled) return;
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            handleClick(event as any);
        }
    }
</script>

<div class="flex items-center gap-3 {className}">
    <button
        type="button"
        role="switch"
        id={toggleId}
        aria-checked={checked}
        aria-label={label || "Toggle"}
        {disabled}
        on:click={handleClick}
        on:keydown={handleKeydown}
        class="relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 {checked
            ? 'bg-blue-600'
            : 'bg-gray-200'} {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
    >
        <span
            class="pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out {checked
                ? 'translate-x-5'
                : 'translate-x-0'}"
        ></span>
    </button>

    {#if label}
        <label
            for={toggleId}
            class="text-sm font-medium text-gray-700 cursor-pointer"
        >
            {label}
        </label>
    {/if}
</div>
