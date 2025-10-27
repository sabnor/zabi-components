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
        placeholder?: string;
        onchange?: (event: Event) => void;
    }

    let {
        value = "",
        label = "",
        disabled = false,
        placeholder = "#000000",
        onchange,
        ...restProps
    }: Props = $props();

    // Generate unique ID - SSR safe
    const inputId = generateId("color-picker");

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
            if (onchange) onchange(event);
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

<div class="space-y-2" {...restProps}>
    {#if label}
        <label for={inputId} class="block text-sm font-medium text-label">
            {label}
        </label>
    {/if}

    <div class="flex items-center space-x-2">
        <input
            id={inputId}
            type="text"
            {placeholder}
            {value}
            oninput={handleHexInput}
            onblur={handleHexBlur}
            {disabled}
            class={inputClasses()}
            aria-label="Hex color input"
        />
        {#if value && isValidHex(value)}
            <div
                class="w-8 h-8 rounded border-2 border-gray-300 shrink-0"
                style="background-color: {value};"
                aria-label="Color preview"
            ></div>
        {/if}
    </div>

    {#if value && !isValidHex(value)}
        <p class="text-xs text-red-500">
            Please enter a valid hex color (e.g., #ff0000 or #f00)
        </p>
    {/if}
</div>
