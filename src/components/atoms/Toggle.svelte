<script lang="ts">
    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let label: string = "";

    // Simple toggle classes
    $: toggleClasses = [
        "relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
        "transition-colors duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        checked ? "bg-blue-600" : "bg-gray-200",
        disabled ? "opacity-50 cursor-not-allowed" : "",
    ].join(" ");

    $: thumbClasses = [
        "pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg",
        "transition duration-200 ease-in-out",
        checked ? "translate-x-5" : "translate-x-0",
    ].join(" ");

    function handleClick(event: Event) {
        if (!disabled) {
            checked = !checked;
        }
    }
</script>

<div class="flex items-center gap-3">
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || "Toggle"}
        {disabled}
        on:click={handleClick}
        class={toggleClasses}
        {...$$restProps}
    >
        <span class={thumbClasses}></span>
    </button>

    {#if label}
        <span class="text-sm font-medium text-gray-700">
            {label}
        </span>
    {/if}
</div>
