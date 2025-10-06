<script lang="ts">
    export let value: string | number | undefined = undefined;
    export let options: Array<{
        value: string | number;
        label: string;
        disabled?: boolean;
    }> = [];
    export let placeholder: string = "Select an option";
    export let label: string = "";
    export let disabled: boolean = false;
    export let size: "sm" | "md" | "lg" = "md";

    // Generate unique ID
    const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;

    // Simple size classes
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    };

    // Select classes
    $: selectClasses = [
        "w-full border border-gray-300 rounded-md bg-white",
        "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
    ].join(" ");
</script>

<div>
    {#if label}
        <label
            for={selectId}
            class="block text-sm font-medium text-gray-700 mb-1">{label}</label
        >
    {/if}

    <select id={selectId} bind:value {disabled} class={selectClasses}>
        {#if placeholder && !value}
            <option value="" disabled>{placeholder}</option>
        {/if}
        {#each options as option (option.value)}
            <option value={option.value} disabled={option.disabled}>
                {option.label}
            </option>
        {/each}
    </select>
</div>
