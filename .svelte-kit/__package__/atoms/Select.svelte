<script lang="ts">
    import Dropdown from "../molecules/Dropdown.svelte";
    import Button from "./Button.svelte";
    import {
        ChevronDown,
        CheckCircle,
        AlertTriangle,
        AlertCircle,
    } from "@lucide/svelte";

    function generateId(prefix: string = "id"): string {
        if (typeof window !== "undefined") {
            return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
        } else {
            return `${prefix}-ssr-${Date.now()}`;
        }
    }

    interface Props {
        value?: string | number | undefined;
        options?: Array<{
            value: string | number;
            label: string;
            disabled?: boolean;
        }>;
        /** Enables the search input inside the dropdown. */
        searchable?: boolean;
        /** Placeholder for the search input. */
        searchPlaceholder?: string;
        /** Max height for the options list (supports any valid CSS length). */
        maxMenuHeight?: string;
        /** Width for the dropdown menu (supports any valid CSS length). */
        menuWidth?: string;
        /** Message shown when no options match the search. */
        noResultsText?: string;
        placeholder?: string;
        label?: string;
        disabled?: boolean;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "success" | "warning" | "error";
        message?: string;
        onchange?: (event: Event) => void;
    }

    let {
        value = undefined,
        options = [],
        searchable = true,
        searchPlaceholder = "Search options",
        maxMenuHeight = "60vh",
        menuWidth = "100%",
        noResultsText = "No results found",
        placeholder = "Select an option",
        label = "",
        disabled = false,
        size = "md",
        variant = "default",
        message = "",
        onchange,
        ...restProps
    }: Props = $props();

    let isOpen = $state(false);
    let selectContainer: HTMLDivElement;
    let searchQuery = $state("");

    const sizeClass = $derived(() => {
        if (size === "sm") {
            return {
                padding: "px-4 py-2",
                text: "text-sm",
                leading: "leading-5",
            };
        } else if (size === "lg") {
            return {
                padding: "px-4 py-3",
                text: "text-base",
                leading: "leading-6",
            };
        } else {
            return {
                padding: "px-4 py-2.5",
                text: "text-base",
                leading: "leading-6",
            };
        }
    });

    const variantClass = $derived(() => {
        return variant === "success"
            ? "border-success focus:border-success focus:ring-success"
            : variant === "warning"
              ? "border-warning focus:border-warning focus:ring-warning"
              : variant === "error"
                ? "border-error focus:border-error focus:ring-error"
                : "border-0 focus:ring-2 focus:ring-brand-500"; // default - no border
    });

    const triggerClasses = $derived(() => {
        const sizeStyles = sizeClass();
        const baseClasses =
            "w-full bg-input hover:bg-input-hover focus:bg-input-focus disabled:bg-input-disabled rounded-lg transition-all duration-200 text-body focus:outline-none focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between";

        return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.leading} ${variantClass()}`.trim();
    });

    const labelClasses = $derived(
        () => "block text-sm font-medium text-label mb-1",
    );

    const messageClasses = $derived(() => {
        if (variant === "error") {
            return "text-error text-sm mt-1 flex items-center gap-1.5 w-full";
        } else if (variant === "success") {
            return "text-success text-sm mt-1 flex items-center gap-1.5 w-full";
        } else if (variant === "warning") {
            return "text-warning text-sm mt-1 flex items-center gap-1.5 w-full";
        }
        return "text-description text-sm mt-1 flex items-center gap-1.5 w-full";
    });

    const getIcon = $derived(() => {
        if (variant === "error") return AlertCircle;
        if (variant === "success") return CheckCircle;
        if (variant === "warning") return AlertTriangle;
        return null;
    });

    const selectId = generateId("select");

    const selectedLabel = $derived(() => {
        if (isEmpty()) {
            return String(placeholder || "Select an option");
        }
        const selected = options.find((opt) => opt.value === value);
        return selected?.label
            ? String(selected.label)
            : String(placeholder || "Select an option");
    });

    const isEmpty = $derived(() => {
        return value === undefined || value === null || value === "";
    });

    const normalizedOptions = $derived(() => {
        const fallbackOptions = (restProps as { options?: Props["options"] })
            .options;
        return Array.from(options ?? fallbackOptions ?? []);
    });

    const hasSearchQuery = $derived(() => {
        return searchQuery.trim().length > 0;
    });

    const filteredOptions = $derived(() => {
        const query = searchQuery.trim().toLowerCase();
        const availableOptions = normalizedOptions();
        if (!searchable || query.length === 0) {
            return availableOptions;
        }
        return availableOptions.filter((option) =>
            option.label.toLowerCase().includes(query),
        );
    });

    $effect(() => {
        if (!isOpen && searchQuery.length > 0) {
            searchQuery = "";
        }
    });

    function handleOptionClick(optionValue: string | number) {
        if (disabled) return;
        value = optionValue;
        isOpen = false;

        if (onchange) {
            const syntheticEvent = new Event("change", { bubbles: true });
            Object.defineProperty(syntheticEvent, "target", {
                value: { value: optionValue },
                enumerable: true,
            });
            (onchange as (event: Event) => void)(syntheticEvent);
        }
    }

    function handleTriggerClick(event: MouseEvent) {
        if (disabled) return;
        event.stopPropagation();
        isOpen = !isOpen;
    }

    function handleClickOutside(event: MouseEvent) {
        if (!isOpen) return;

        const target = event.target as HTMLElement;
        const clickedSelectContainer = target.closest(".select-container");

        // Close if clicking outside any select container, or clicking on a different select
        if (
            !clickedSelectContainer ||
            clickedSelectContainer !== selectContainer
        ) {
            isOpen = false;
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isOpen) {
            isOpen = false;
        }
    }
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div bind:this={selectContainer} class="w-full select-container">
    {#if label}
        <label for={selectId} class={labelClasses()}>{label}</label>
    {/if}

    <Dropdown
        {isOpen}
        placement="bottom-start"
        selectedValue={value}
        onOptionClick={handleOptionClick}
        ariaLabel="Select options"
    >
        {#snippet trigger()}
            <button
                type="button"
                id={selectId}
                class={triggerClasses()}
                {disabled}
                onclick={handleTriggerClick}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-describedby={message ? `${selectId}-message` : undefined}
            >
                <span
                    class="text-left flex-1 truncate {isEmpty()
                        ? 'text-description'
                        : 'text-body'}"
                >
                    {isEmpty()
                        ? placeholder
                        : options.find((opt) => opt.value === value)?.label ||
                          placeholder}
                </span>
                <ChevronDown
                    size={20}
                    class="text-description transition-transform duration-200 {isOpen
                        ? 'rotate-180'
                        : ''}"
                />
            </button>
        {/snippet}
        {#snippet children()}
            <div class="px-2 pb-2 pt-1" style:width={menuWidth}>
                {#if searchable}
                    <div class="px-1 pb-2">
                        <input
                            type="text"
                            class="w-full rounded-md bg-input hover:bg-input-hover focus:bg-input-focus text-body placeholder:text-description px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder={searchPlaceholder}
                            bind:value={searchQuery}
                            aria-label={searchPlaceholder}
                            {disabled}
                        />
                    </div>
                {/if}
                <div
                    class="overflow-y-auto px-1"
                    style:max-height={maxMenuHeight}
                >
                    {#if filteredOptions().length > 0}
                        {#each filteredOptions() as option (option.value)}
                            {@const buttonRestProps = {
                                "data-value": String(option.value),
                            } as Record<string, string>}
                            <div class="w-full my-0.5">
                                <Button
                                    variant={value === option.value
                                        ? "outline"
                                        : "ghost"}
                                    size="sm"
                                    isFullWidth={true}
                                    disabled={option.disabled}
                                    onclick={() => handleOptionClick(option.value)}
                                    {...buttonRestProps}
                                >
                                    {option.label}
                                </Button>
                            </div>
                        {/each}
                    {:else if hasSearchQuery()}
                        <div class="px-3 py-2 text-sm text-description">
                            {noResultsText}
                        </div>
                    {/if}
                </div>
            </div>
        {/snippet}
    </Dropdown>
    {#if message && variant !== "default"}
        <p id={`${selectId}-message`} class={messageClasses()} role="alert">
            {#if getIcon()}
                {@const Icon = getIcon()}
                <Icon size={14} class="shrink-0" />
            {/if}
            <span>{message}</span>
        </p>
    {/if}
</div>
