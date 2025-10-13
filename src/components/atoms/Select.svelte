<script lang="ts">
    interface Props {
        value?: string | number | undefined;
        options?: Array<{
            value: string | number;
            label: string;
            disabled?: boolean;
        }>;
        placeholder?: string;
        label?: string;
        disabled?: boolean;
        size?: "sm" | "md" | "lg";
        onchange?: (event: Event) => void;
    }

    let {
        value = undefined,
        options = [],
        placeholder = "Select an option",
        label = "",
        disabled = false,
        size = "md",
        ...restProps
    }: Props = $props();

    // Generate unique ID - SSR safe
    let selectId = $state(
        typeof window !== "undefined"
            ? `select-${Math.random().toString(36).substr(2, 9)}`
            : `select-ssr-${Date.now()}`,
    );

    // Simple size classes
    let sizeClasses = $derived({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-base",
    });

    // Select classes
    let selectClasses = $derived(
        [
            "w-full border border-gray-300 rounded-md bg-white",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            sizeClasses[size],
        ].join(" "),
    );

    function handleChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        value = target.value;
    }
</script>

<div>
    {#if label}
        <label
            for={selectId}
            class="block text-sm font-medium text-gray-700 mb-1">{label}</label
        >
    {/if}

    <select
        id={selectId}
        {value}
        {disabled}
        class={selectClasses}
        onchange={handleChange}
        {...restProps}
    >
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
