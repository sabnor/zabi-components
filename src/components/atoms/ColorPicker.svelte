<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import Dropdown from "../molecules/Dropdown.svelte";
    import SlideUp from "../molecules/SlideUp.svelte";
    import { isMobile } from "../../utils/responsive";
    import { Check } from "@lucide/svelte";

    export let value: string = "";
    export let label: string = "";
    export let required: boolean = false;
    export let disabled: boolean = false;
    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "default" | "outlined" | "filled" | "ghost" =
        "outlined";

    let isExpanded = false;
    let isFocused = false;
    let isMobileDevice = false;
    // Complete color palette using Tailwind classes
    const colors: Array<{
        label: string;
        className: string;
        family: string;
    }> = [
        // Plasma Red Scale
        {
            label: "Plasma Red 50",
            className: "bg-plasma-red-50",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 100",
            className: "bg-plasma-red-100",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 200",
            className: "bg-plasma-red-200",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 300",
            className: "bg-plasma-red-300",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 400",
            className: "bg-plasma-red-400",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 500",
            className: "bg-plasma-red-500",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 600",
            className: "bg-plasma-red-600",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 700",
            className: "bg-plasma-red-700",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 800",
            className: "bg-plasma-red-800",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 900",
            className: "bg-plasma-red-900",
            family: "Plasma Red",
        },
        {
            label: "Plasma Red 950",
            className: "bg-plasma-red-950",
            family: "Plasma Red",
        },

        // Matrix Green Scale
        {
            label: "Matrix Green 50",
            className: "bg-matrix-green-50",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 100",
            className: "bg-matrix-green-100",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 200",
            className: "bg-matrix-green-200",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 300",
            className: "bg-matrix-green-300",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 400",
            className: "bg-matrix-green-400",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 500",
            className: "bg-matrix-green-500",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 600",
            className: "bg-matrix-green-600",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 700",
            className: "bg-matrix-green-700",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 800",
            className: "bg-matrix-green-800",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 900",
            className: "bg-matrix-green-900",
            family: "Matrix Green",
        },
        {
            label: "Matrix Green 950",
            className: "bg-matrix-green-950",
            family: "Matrix Green",
        },

        // Blood Red Scale
        {
            label: "Blood Red 50",
            className: "bg-blood-red-50",
            family: "Blood Red",
        },
        {
            label: "Blood Red 100",
            className: "bg-blood-red-100",
            family: "Blood Red",
        },
        {
            label: "Blood Red 200",
            className: "bg-blood-red-200",
            family: "Blood Red",
        },
        {
            label: "Blood Red 300",
            className: "bg-blood-red-300",
            family: "Blood Red",
        },
        {
            label: "Blood Red 400",
            className: "bg-blood-red-400",
            family: "Blood Red",
        },
        {
            label: "Blood Red 500",
            className: "bg-blood-red-500",
            family: "Blood Red",
        },
        {
            label: "Blood Red 600",
            className: "bg-blood-red-600",
            family: "Blood Red",
        },
        {
            label: "Blood Red 700",
            className: "bg-blood-red-700",
            family: "Blood Red",
        },
        {
            label: "Blood Red 800",
            className: "bg-blood-red-800",
            family: "Blood Red",
        },
        {
            label: "Blood Red 900",
            className: "bg-blood-red-900",
            family: "Blood Red",
        },
        {
            label: "Blood Red 950",
            className: "bg-blood-red-950",
            family: "Blood Red",
        },

        // Cyber Amber Scale
        {
            label: "Cyber Amber 50",
            className: "bg-cyber-amber-50",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 100",
            className: "bg-cyber-amber-100",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 200",
            className: "bg-cyber-amber-200",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 300",
            className: "bg-cyber-amber-300",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 400",
            className: "bg-cyber-amber-400",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 500",
            className: "bg-cyber-amber-500",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 600",
            className: "bg-cyber-amber-600",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 700",
            className: "bg-cyber-amber-700",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 800",
            className: "bg-cyber-amber-800",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 900",
            className: "bg-cyber-amber-900",
            family: "Cyber Amber",
        },
        {
            label: "Cyber Amber 950",
            className: "bg-cyber-amber-950",
            family: "Cyber Amber",
        },

        // Dark Scale
        { label: "Dark 600", className: "bg-dark-600", family: "Dark" },
        { label: "Dark 700", className: "bg-dark-700", family: "Dark" },
        { label: "Dark 800", className: "bg-dark-800", family: "Dark" },
        { label: "Dark 900", className: "bg-dark-900", family: "Dark" },
    ];

    const dispatch = createEventDispatcher();
    const componentId = `color-picker-${Math.random().toString(36).substr(2, 9)}`;

    // Subscribe to mobile state
    $: isMobileDevice = $isMobile;

    onMount(() => {
        // Initialize mobile state
        isMobileDevice = $isMobile;
    });

    function selectColor(color: {
        label: string;
        className: string;
        family: string;
    }) {
        if (disabled) return;
        value = color.className;
        isExpanded = false; // Collapse after selection
        dispatch("change", { value: color.className });
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
            "bg-dark-700 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
        outlined:
            "bg-dark-600 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
        filled: "bg-dark-600 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
        ghost: "bg-transparent border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
    };

    // Label classes (matching Input component)
    $: labelClasses = [
        "block",
        "text-sm",
        "font-medium",
        "mb-2",
        "transition-colors",
        "duration-200",
        "text-gray-300",
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
    $: selectedColor = colors.find((c) => c.className === value);

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
                <span class="text-blood-red-500 ml-1">*</span>
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
                                    class="w-8 h-8 rounded border border-stone-600 flex-shrink-0 {selectedColor.className}"
                                ></div>
                            {:else}
                                <div
                                    class="w-8 h-8 rounded border border-stone-600 flex-shrink-0 bg-stone-700"
                                ></div>
                                <span class="text-gray-400">Select a color</span
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
                                {#each familyColors as color (color.className)}
                                    <button
                                        type="button"
                                        class="group relative flex flex-col items-center rounded-lg transition-all duration-200 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-cyber-amber-500 focus:ring-opacity-50 {value ===
                                        color.className
                                            ? 'bg-cyber-amber-500/20 ring-2 ring-cyber-amber-500'
                                            : ''} {disabled
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer'}"
                                        on:click={() => selectColor(color)}
                                        on:keydown={(e) =>
                                            e.key === "Enter" &&
                                            selectColor(color)}
                                        {disabled}
                                    >
                                        <div
                                            class="w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200 {value ===
                                            color.className
                                                ? 'border-cyber-amber-500'
                                                : ''} {color.className}"
                                        ></div>
                                        {#if value === color.className}
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
                            class="w-8 h-8 rounded border border-stone-600 flex-shrink-0 {selectedColor.className}"
                        ></div>
                    {:else}
                        <div
                            class="w-8 h-8 rounded border border-stone-600 flex-shrink-0 bg-stone-700"
                        ></div>
                        <span class="text-gray-400">Select a color</span>
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
                                {#each familyColors as color (color.className)}
                                    <button
                                        type="button"
                                        class="group relative flex flex-col items-center rounded-lg transition-all duration-200 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-cyber-amber-500 focus:ring-opacity-50 {value ===
                                        color.className
                                            ? 'bg-cyber-amber-500/20 ring-2 ring-cyber-amber-500'
                                            : ''} {disabled
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer'}"
                                        on:click={() => selectColor(color)}
                                        on:keydown={(e) =>
                                            e.key === "Enter" &&
                                            selectColor(color)}
                                        {disabled}
                                    >
                                        <div
                                            class="w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200 {value ===
                                            color.className
                                                ? 'border-cyber-amber-500'
                                                : ''} {color.className}"
                                        ></div>
                                        {#if value === color.className}
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
