<script lang="ts">
    import Dropdown from "../molecules/Dropdown.svelte";
    import Input from "./Input.svelte";
    import {
        ChevronDown,
        CheckCircle,
        AlertTriangle,
        AlertCircle,
    } from "@lucide/svelte";
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        value?: string | number | undefined;
        options?: Array<{
            value: string | number;
            label: string;
            disabled?: boolean;
        }>;
        searchable?: boolean;
        searchPlaceholder?: string;
        maxMenuHeight?: string;
        menuWidth?: string;
        noResultsText?: string;
        isLoading?: boolean;
        loadingText?: string;
        emptyStateTitle?: string;
        emptyStateDescription?: string;
        emptyStateActionLabel?: string;
        placeholder?: string;
        label?: string;
        required?: boolean;
        disabled?: boolean;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "success" | "warning" | "error";
        message?: string;
        onchange?: (event: Event) => void;
        onEmptyStateAction?: () => void;
    }

    let {
        value = $bindable(undefined),
        options = [],
        searchable = true,
        searchPlaceholder = "Search options",
        maxMenuHeight = "60vh",
        menuWidth = "100%",
        noResultsText = "No results found",
        isLoading = false,
        loadingText = "Loading options...",
        emptyStateTitle = "No options available",
        emptyStateDescription = "Add an option to start making selections.",
        emptyStateActionLabel = "",
        placeholder = "Select an option",
        label = "",
        required = false,
        disabled = false,
        size = "md",
        variant = "default",
        message = "",
        onchange,
        onEmptyStateAction,
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
            ? "border-success focus-visible:border-success"
            : variant === "warning"
              ? "border-warning focus-visible:border-warning"
              : variant === "error"
                ? "border-error focus-visible:border-error"
                : "border-input-border";
    });

    const triggerClasses = $derived(() => {
        const sizeStyles = sizeClass();
        const baseClasses =
            "focus-ring flex w-full cursor-pointer items-center justify-between rounded-lg border bg-input text-body transition-all duration-200 hover:bg-input-hover active:bg-input-focus focus-visible:bg-input-focus focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-input-disabled disabled:opacity-50";

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
        if (disabled || isLoading) return;
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
        if (disabled || isLoading) return;
        event.stopPropagation();
        isOpen = !isOpen;
    }

    function handleClickOutside(event: MouseEvent) {
        if (!isOpen) return;

        const target = event.target as HTMLElement;
        const clickedSelectContainer = target.closest(".select-container");

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
        bind:isOpen={isOpen}
        placement="bottom-start"
        selectedValue={value}
        onOptionClick={handleOptionClick}
        ariaLabel="Select options"
        menuRole="listbox"
    >
        {#snippet trigger(aria)}
            <button
                type="button"
                id={selectId}
                class={triggerClasses()}
                {disabled}
                onclick={handleTriggerClick}
                {...aria}
                aria-describedby={message ? `${selectId}-message` : undefined}
            >
                <span
                    class="text-left flex-1 truncate {isLoading
                        ? 'text-description'
                        : isEmpty()
                        ? 'text-description'
                        : 'text-body'}"
                >
                    {#if isLoading}
                        {loadingText}
                    {:else}
                        {isEmpty()
                        ? placeholder
                        : options.find((opt) => opt.value === value)?.label ||
                          placeholder}
                    {/if}
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
                {#if searchable && !isLoading}
                    <div class="px-1 pb-2">
                        <Input
                            type="text"
                            size="sm"
                            class="min-w-0"
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
                    {#if isLoading}
                        <div class="space-y-2 px-2 py-2" role="status" aria-live="polite">
                            <div class="h-8 w-full animate-pulse rounded-md bg-base-200"></div>
                            <div class="h-8 w-full animate-pulse rounded-md bg-base-200"></div>
                            <p class="text-xs text-description">{loadingText}</p>
                        </div>
                    {:else if filteredOptions().length > 0}
                        {#each filteredOptions() as option (option.value)}
                            {@const buttonRestProps = {
                                "data-value": String(option.value),
                            } as Record<string, string>}
                            <div class="w-full my-0.5">
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={value === option.value
                                        ? true
                                        : undefined}
                                    class="focus-ring flex w-full items-center justify-start rounded-md border-2 px-3 py-2 text-left text-sm font-medium transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 {value ===
                                    option.value
                                        ? 'border-action-primary bg-transparent text-headline'
                                        : 'border-transparent bg-transparent text-body hover:bg-base-100'}"
                                    disabled={option.disabled}
                                    {...buttonRestProps}
                                    onclick={() =>
                                        handleOptionClick(option.value)}
                                >
                                    {option.label}
                                </button>
                            </div>
                        {/each}
                    {:else if hasSearchQuery()}
                        <div class="px-3 py-2 text-sm text-description">
                            {noResultsText}
                        </div>
                    {:else}
                        <div class="rounded-md border border-border bg-base-50 px-3 py-3 text-sm">
                            <p class="font-medium text-headline">{emptyStateTitle}</p>
                            <p class="mt-1 text-description">{emptyStateDescription}</p>
                            {#if emptyStateActionLabel && onEmptyStateAction}
                                <button
                                    type="button"
                                    class="mt-3 inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-action-primary px-3 py-2 text-sm text-action-primary"
                                    onclick={onEmptyStateAction}
                                >
                                    {emptyStateActionLabel}
                                </button>
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>
        {/snippet}
    </Dropdown>
    {#if message && variant !== "default"}
        <p
            id={`${selectId}-message`}
            class={messageClasses()}
            role={variant === "error" ? "alert" : "status"}
            aria-live={variant === "error" ? "assertive" : "polite"}
        >
            {#if getIcon()}
                {@const Icon = getIcon()}
                <Icon size={14} class="shrink-0" />
            {/if}
            <span>{message}</span>
        </p>
    {/if}
</div>
