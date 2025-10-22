<script lang="ts">
    // SSR-safe ID generation
    function generateId(prefix: string = "id"): string {
        if (typeof window !== "undefined") {
            return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
        } else {
            return `${prefix}-ssr-${Date.now()}`;
        }
    }

    interface Props {
        value?: string;
        label?: string;
        disabled?: boolean;
        onclick?: (event: Event) => void;
    }

    let {
        value = "",
        label = "",
        disabled = false,
        onclick,
        ...restProps
    }: Props = $props();

    const colors = [
        { label: "Red", value: "#ef4444" },
        { label: "Blue", value: "#3b82f6" },
        { label: "Green", value: "#10b981" },
        { label: "Yellow", value: "#f59e0b" },
        { label: "Purple", value: "#8b5cf6" },
        { label: "Pink", value: "#ec4899" },
        { label: "Gray", value: "#6b7280" },
        { label: "Black", value: "#000000" },
    ];

    // Generate unique IDs - SSR safe (call directly, not in onMount)
    const groupId = generateId("color-picker");
    const inputId = generateId("color-input");

    // Hex color validation
    function isValidHex(hex: string): boolean {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexPattern.test(hex);
    }

    // Handle hex input changes
    function handleHexInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const hexValue = target.value;

        if (hexValue === "" || isValidHex(hexValue)) {
            value = hexValue;
            if (onclick) onclick(event);
        }
    }

    // Handle hex input blur - validate and format
    function handleHexBlur(event: Event) {
        const target = event.target as HTMLInputElement;
        let hexValue = target.value.trim();

        // Add # if missing
        if (hexValue && !hexValue.startsWith("#")) {
            hexValue = "#" + hexValue;
        }

        // Validate and update
        if (hexValue === "" || isValidHex(hexValue)) {
            value = hexValue;
            target.value = hexValue;
        } else {
            // Reset to current value if invalid
            target.value = value;
        }
    }

    // Color button classes using full class names
    const colorButtonClasses = $derived(() => {
        return (colorValue: string) => {
            const baseClasses =
                "w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 transition-all";
            const stateClasses =
                value === colorValue
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-300 hover:border-gray-400";

            return `${baseClasses} ${stateClasses}`.trim();
        };
    });

    // Input classes
    const inputClasses = $derived(() => {
        const baseClasses =
            "w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200";
        const stateClasses =
            isValidHex(value) || value === ""
                ? "border-gray-300 focus:border-blue-500"
                : "border-red-300 focus:border-red-500 focus:ring-red-200";

        return `${baseClasses} ${stateClasses}`.trim();
    });
</script>

<div class="space-y-3 sm:space-y-4">
    {#if label}
        <label for={groupId} class="block text-sm font-medium text-label"
            >{label}</label
        >
    {/if}

    <!-- Predefined Colors -->
    <div
        id={groupId}
        class="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3"
        role="radiogroup"
        {...restProps}
    >
        {#each colors as color}
            <button
                type="button"
                class={colorButtonClasses()(color.value)}
                style="background-color: {color.value};"
                onclick={(e) => {
                    value = color.value;
                    if (onclick) onclick(e);
                }}
                {disabled}
                role="radio"
                aria-checked={value === color.value}
                aria-label={color.label}
            >
                {#if value === color.value}
                    <span class="text-white text-lg">✓</span>
                {/if}
            </button>
        {/each}
    </div>

    <!-- Custom Hex Input -->
    <div class="space-y-1">
        <label for={inputId} class="block text-xs font-medium text-label">
            Or enter custom color
        </label>
        <div class="flex items-center space-x-2">
            <input
                id={inputId}
                type="text"
                placeholder="#000000"
                {value}
                oninput={handleHexInput}
                onblur={handleHexBlur}
                {disabled}
                class={inputClasses()}
                aria-label="Custom hex color input"
            />
            {#if value && isValidHex(value)}
                <div
                    class="w-6 h-6 sm:w-8 sm:h-8 rounded border-2 border-gray-300 shrink-0"
                    style="background-color: {value};"
                    aria-label="Color preview"
                ></div>
            {/if}
        </div>
        {#if value && !isValidHex(value)}
            <p class="text-xs text-red-500">
                Please enter a valid hex color (e.g., #ff0000)
            </p>
        {/if}
    </div>
</div>
