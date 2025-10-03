<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let label: string = "";
    export let size: "sm" | "md" | "lg" = "md";
    export let className: string = "";

    const dispatch = createEventDispatcher<{
        change: { checked: boolean };
    }>();

    function handleToggle() {
        if (disabled) return;
        checked = !checked;
        dispatch("change", { checked });
    }

    const sizeClasses = {
        sm: "w-8 h-4",
        md: "w-11 h-6",
        lg: "w-14 h-7",
    };

    const thumbSizeClasses = {
        sm: "w-3 h-3",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    // Make translate classes reactive to checked state
    $: translateClasses = {
        sm: checked ? "translate-x-4" : "translate-x-0",
        md: checked ? "translate-x-5" : "translate-x-0",
        lg: checked ? "translate-x-7" : "translate-x-0",
    };
</script>

<div
    class="flex items-center space-x-3 min-w-32 sm:min-w-36 md:min-w-40 lg:min-w-44 {className}"
>
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || "Toggle"}
        {disabled}
        on:click={handleToggle}
        on:keydown={(e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
            }
        }}
        class="relative inline-flex {sizeClasses[
            size
        ]} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 {checked
            ? 'bg-primary'
            : 'bg-surface-tertiary'} {disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-opacity-80'}"
    >
        <span
            class="pointer-events-none inline-block {thumbSizeClasses[
                size
            ]} transform rounded-full bg-surface shadow-lg ring-0 transition duration-200 ease-in-out {translateClasses[
                size
            ]}"
        ></span>
    </button>

    {#if label}
        <button
            type="button"
            class="text-sm font-medium text-primary cursor-pointer select-none hover:text-secondary transition-colors"
            on:click={handleToggle}
            on:keydown={(e: KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggle();
                }
            }}
        >
            {label}
        </button>
    {/if}
</div>
