<script lang="ts">
    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let label: string = "";

    // Generate unique ID
    const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    // Simple checkbox classes
    $: checkboxClasses = [
        "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
        "focus:ring-blue-500 focus:ring-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" ");
</script>

<div class="flex items-center gap-2">
    <input
        type="checkbox"
        id={checkboxId}
        bind:checked
        {disabled}
        class={checkboxClasses}
    />
    {#if label}
        <label for={checkboxId} class="text-sm font-medium cursor-pointer"
            >{label}</label
        >
    {/if}
</div>
