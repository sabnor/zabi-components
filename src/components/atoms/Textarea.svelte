<script lang="ts">
    export let value: string = "";
    export let label: string = "";
    export let placeholder: string = "";
    export let disabled: boolean = false;
    export let rows: number = 4;
    export let size: "sm" | "md" | "lg" = "md";

    // Generate unique ID
    const textareaId = `textarea-${Math.random().toString(36).substr(2, 9)}`;

    // Simple size classes
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    };

    // Textarea classes
    $: textareaClasses = [
        "w-full border border-gray-300 rounded-md",
        "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "resize-y",
        sizeClasses[size],
    ].join(" ");
</script>

<div>
    {#if label}
        <label
            for={textareaId}
            class="block text-sm font-medium text-gray-700 mb-1">{label}</label
        >
    {/if}

    <textarea
        id={textareaId}
        bind:value
        {placeholder}
        {disabled}
        {rows}
        class={textareaClasses}
    ></textarea>
</div>
