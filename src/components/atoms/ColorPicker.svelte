<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import Dropdown from "../molecules/Dropdown.svelte";
    import SlideUp from "../molecules/SlideUp.svelte";
    import { Check } from "@lucide/svelte";

    export let value: string = "";
    export let label: string = "";
    export let required: boolean = false;
    export let disabled: boolean = false;
    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "default" | "outlined" | "filled" | "ghost" =
        "outlined";
    export let colors: Array<{
        label: string;
        value: string;
        family: string;
    }> = [
        // Default color palette - can be customized by parent
        { label: "Red", value: "#ef4444", family: "Basic" },
        { label: "Blue", value: "#3b82f6", family: "Basic" },
        { label: "Green", value: "#10b981", family: "Basic" },
        { label: "Yellow", value: "#f59e0b", family: "Basic" },
        { label: "Purple", value: "#8b5cf6", family: "Basic" },
        { label: "Pink", value: "#ec4899", family: "Basic" },
        { label: "Indigo", value: "#6366f1", family: "Basic" },
        { label: "Gray", value: "#6b7280", family: "Basic" },
        { label: "Black", value: "#000000", family: "Basic" },
        { label: "White", value: "#ffffff", family: "Basic" },
    ];

    let isExpanded = false;
    let isFocused = false;
    let isMobileDevice = false;

    const dispatch = createEventDispatcher();
    const componentId = `color-picker-${Math.random().toString(36).substr(2, 9)}`;

    // Check if mobile device
    onMount(() => {
        isMobileDevice = window.innerWidth < 768;

        const handleResize = () => {
            isMobileDevice = window.innerWidth < 768;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    function selectColor(color: {
        label: string;
        value: string;
        family: string;
    }) {
        if (disabled) return;
        value = color.value;
        isExpanded = false; // Collapse after selection
        dispatch("change", { value: color.value });
    }

    function toggleExpanded() {
        if (disabled) return;
        isExpanded = !isExpanded;
    }

    function handleFocus() {
        isFocused = true;
    }

    function handleBlur() {
        isFocused = false;
    }

    function handleClose() {
        isExpanded = false;
    }

    // Size classes (matching Input component)
    $: sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3 text-lg",
    };

    // Variant classes (matching Input component)
    $: variantClasses = {
        default:
            "bg-surface border border-border text-text placeholder-text-placeholder focus:ring-focus-ring",
        outlined:
            "bg-surface border border-border text-text placeholder-text-placeholder focus:ring-focus-ring",
        filled: "bg-surface-secondary border-0 text-text placeholder-text-placeholder focus:ring-focus-ring",
        ghost: "bg-transparent border-0 text-text placeholder-text-placeholder focus:ring-focus-ring",
    };

    // Label classes (matching Input component)
    $: labelClasses = [
        "block",
        "text-sm",
        "font-medium",
        "mb-2",
        "transition-colors",
        "duration-200",
    ].join(" ");

    // Button classes (matching Input styling)
    $: buttonClasses = [
        "w-full",
        "min-w-40 sm:min-w-48 md:min-w-56 lg:min-w-64", // Responsive minimum width for color picker
        "rounded-lg",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-offset-dark-900",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        "grainy-texture",
    ].join(" ");

    // Make selected color reactive
    $: selectedColor = colors.find((c) => c.value === value);

    // Group colors by family
    $: colorGroups = colors.reduce(
        (groups, color) => {
            const family = color.family || "Other";
            if (!groups[family]) {
                groups[family] = [];
            }
            groups[family].push(color);
            return groups;
        },
        {} as Record<string, typeof colors>,
    );
</script>

<div class="space-y-3">
    {#if label}
        <label for={componentId} class={labelClasses}>
            {label}
            {#if required}
                <span class="ml-1" style="color: rgb(var(--color-error));"
                    >*</span
                >
            {/if}
        </label>
    {/if}

    <!-- Desktop: Dropdown -->
    {#if !isMobileDevice}
        <Dropdown
            bind:isOpen={isExpanded}
            placement="bottom-start"
            width="auto"
            maxHeight="20rem"
            on:close={handleClose}
        >
            <svelte:fragment slot="trigger">
                <div class="relative">
                    <button
                        type="button"
                        class={buttonClasses}
                        on:click={toggleExpanded}
                        on:focus={handleFocus}
                        on:blur={handleBlur}
                        {disabled}
                    >
                        <div class="flex items-center space-x-3">
                            {#if selectedColor}
                                <div
                                    class="w-8 h-8 rounded border flex-shrink-0"
                                    style="background-color: {selectedColor.value}; border-color: rgb(var(--color-border));"
                                ></div>
                            {:else}
                                <div
                                    class="w-8 h-8 rounded border flex-shrink-0"
                                    style="background-color: rgb(var(--color-surface-secondary)); border-color: rgb(var(--color-border));"
                                ></div>
                                <span
                                    style="color: rgb(var(--color-text-secondary));"
                                    >Select a color</span
                                >
                            {/if}
                        </div>
                    </button>

                    <!-- Focus indicator (matching Input component) -->
                    <div
                        class="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 {isFocused
                            ? 'ring-2 ring-plasma-red-500/20'
                            : ''}"
                    ></div>
                </div>
            </svelte:fragment>

            <!-- Color Palette Content -->
            <div class="p-4">
                <div class="max-h-96 overflow-y-auto space-y-4 pr-2">
                    {#each Object.entries(colorGroups) as [familyName, familyColors] (familyName)}
                        <div class="space-y-2">
                            <div
                                class="grid grid-cols-11 gap-3 p-1 bg-stone-800 rounded-lg border border-stone-700"
                            >
                                {#each familyColors as color (color.value)}
                                    <button
                                        type="button"
                                        class="group relative flex flex-col items-center rounded-lg transition-all duration-200 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-cyber-amber-500 focus:ring-opacity-50 {value ===
                                        color.value
                                            ? 'bg-cyber-amber-500/20 ring-2 ring-cyber-amber-500'
                                            : ''} {disabled
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer'}"
                                        on:click={() => selectColor(color)}
                                        on:keydown={(e) => {
                                            const event =
                                                e as unknown as KeyboardEvent;
                                            if (event.key === "Enter") {
                                                selectColor(color);
                                            }
                                        }}
                                        {disabled}
                                    >
                                        <div
                                            class="w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200 {value ===
                                            color.value
                                                ? 'border-cyber-amber-500'
                                                : ''}"
                                            style="background-color: {color.value}"
                                        ></div>
                                        {#if value === color.value}
                                            <div
                                                class="absolute -top-1 -right-1 w-4 h-4 bg-cyber-amber-500 rounded-full flex items-center justify-center"
                                            >
                                                <Check
                                                    size={8}
                                                    class="text-stone-900"
                                                />
                                            </div>
                                        {/if}
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </Dropdown>
    {/if}

    <!-- Mobile: SlideUp -->
    {#if isMobileDevice}
        <div class="relative">
            <button
                type="button"
                class={buttonClasses}
                on:click={toggleExpanded}
                on:focus={handleFocus}
                on:blur={handleBlur}
                {disabled}
            >
                <div class="flex items-center space-x-3">
                    {#if selectedColor}
                        <div
                            class="w-8 h-8 rounded border border-stone-600 flex-shrink-0"
                            style="background-color: {selectedColor.value}"
                        ></div>
                    {:else}
                        <div
                            class="w-8 h-8 rounded border flex-shrink-0"
                            style="border-color: rgb(var(--color-border)); background-color: rgb(var(--color-surface-secondary));"
                        ></div>
                        <span style="color: rgb(var(--color-text-secondary));"
                            >Select a color</span
                        >
                    {/if}
                </div>
            </button>

            <!-- Focus indicator (matching Input component) -->
            <div
                class="absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 {isFocused
                    ? 'ring-2 ring-focus-ring'
                    : ''}"
            ></div>
        </div>

        <SlideUp
            bind:isOpen={isExpanded}
            title="Select Color"
            maxHeight="80vh"
            on:close={handleClose}
        >
            <div class="p-4">
                <div class="max-h-96 overflow-y-auto space-y-4 pr-2">
                    {#each Object.entries(colorGroups) as [familyName, familyColors] (familyName)}
                        <div class="space-y-2">
                            <div
                                class="grid grid-cols-8 gap-3 p-1 bg-stone-800 rounded-lg border border-stone-700"
                            >
                                {#each familyColors as color (color.value)}
                                    <button
                                        type="button"
                                        class="group relative flex flex-col items-center rounded-lg transition-all duration-200 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-cyber-amber-500 focus:ring-opacity-50 {value ===
                                        color.value
                                            ? 'bg-cyber-amber-500/20 ring-2 ring-cyber-amber-500'
                                            : ''} {disabled
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer'}"
                                        on:click={() => selectColor(color)}
                                        on:keydown={(e) => {
                                            const event =
                                                e as unknown as KeyboardEvent;
                                            if (event.key === "Enter") {
                                                selectColor(color);
                                            }
                                        }}
                                        {disabled}
                                    >
                                        <div
                                            class="w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200 {value ===
                                            color.value
                                                ? 'border-cyber-amber-500'
                                                : ''}"
                                            style="background-color: {color.value}"
                                        ></div>
                                        {#if value === color.value}
                                            <div
                                                class="absolute -top-1 -right-1 w-4 h-4 bg-cyber-amber-500 rounded-full flex items-center justify-center"
                                            >
                                                <Check
                                                    size={8}
                                                    class="text-stone-900"
                                                />
                                            </div>
                                        {/if}
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </SlideUp>
    {/if}

    {#if !colors || colors.length === 0}
        <div class="text-center py-6 text-stone-500 text-sm">
            No colors available
        </div>
    {/if}
</div>
