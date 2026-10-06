<script lang="ts">
    import Dropdown from "../molecules/Dropdown.svelte";
    import Input from "./Input.svelte";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import { fieldDescribedBy, fieldMessageState } from "../util/field.js";
    import FieldMessages from "./FieldMessages.svelte";

    /**
     * Other attributes (`data-*`, `aria-*`, `onfocus`, ...) land on the
     * trigger, which is a `<button>`: it is the control that takes focus and
     * that the label names.
     */
    type Props = Omit<
        HTMLButtonAttributes,
        | "class"
        | "value"
        | "name"
        | "disabled"
        | "type"
        | "onchange"
        | "onclick"
        | "aria-describedby"
        | "children"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        /** Id of the trigger. Omit to auto-generate. */
        id?: string;
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
        /**
         * How the list is shown. `auto`: in a BottomSheet on a phone (a touch
         * screen narrower than 640px), under the trigger everywhere else.
         * `popover` and `sheet` are always the one or the other.
         */
        presentation?: "auto" | "popover" | "sheet";
        noResultsText?: string;
        isLoading?: boolean;
        loadingText?: string;
        emptyStateTitle?: string;
        emptyStateDescription?: string;
        emptyStateActionLabel?: string;
        placeholder?: string;
        label?: string;
        /** When set, a hidden input submits the selected value with native forms. */
        name?: string;
        required?: boolean;
        disabled?: boolean;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "success" | "warning" | "error";
        /** Status text under the field. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
        message?: string;
        /** Help text under the field, read out with it. */
        hint?: string;
        /** An error under the field. It marks the field invalid and is announced; it wins over `variant` and `message`. */
        error?: string;
        onchange?: (event: Event) => void;
        onEmptyStateAction?: () => void;
        /** Ids of other elements that describe the field. The hint and the message are added after them. */
        "aria-describedby"?: string | null;
    };

    let {
        class: className = "",
        id: idProp,
        value = $bindable(undefined),
        options = [],
        searchable = true,
        searchPlaceholder = "Search options",
        maxMenuHeight = "60dvh",
        menuWidth = "100%",
        presentation = "auto",
        noResultsText = "No results found",
        isLoading = false,
        loadingText = "Loading options...",
        emptyStateTitle = "No options available",
        emptyStateDescription = "Add an option to start making selections.",
        emptyStateActionLabel = "",
        placeholder = "Select an option",
        label = "",
        name = "",
        required = false,
        disabled = false,
        size = "md",
        variant = "default",
        message = "",
        hint = "",
        error = "",
        onchange,
        onEmptyStateAction,
        "aria-describedby": describedBy,
        ...restProps
    }: Props = $props();

    const status = $derived(fieldMessageState({ variant, message, hint, error }));

    let isOpen = $state(false);
    let selectContainer: HTMLDivElement;
    let searchQuery = $state("");

    // Same fixed height scale as Button, IconButton and Input (32 / 40 / 48),
    // and the same 16px text below `sm`, so a Select beside an Input matches it.
    const sizeClass = $derived(() => {
        if (size === "sm") return { box: "h-8 px-3 pointer-coarse:min-h-11", text: "text-sm max-sm:text-base" };
        if (size === "lg") return { box: "h-12 px-4", text: "text-base" };
        return { box: "h-10 px-3 pointer-coarse:min-h-11", text: "text-sm max-sm:text-base" };
    });

    const variantClass = $derived(() => {
        return status.variant === "success"
            ? "border-success focus-visible:border-success"
            : status.variant === "warning"
              ? "border-warning focus-visible:border-warning"
              : status.variant === "error"
                ? "border-error focus-visible:border-error"
                : "border-input-border enabled:hover:border-input-border-hover";
    });

    const triggerClasses = $derived(() => {
        const sizeStyles = sizeClass();
        const baseClasses =
            "focus-ring flex w-full cursor-pointer items-center justify-between gap-2 rounded-control border bg-input text-body transition-colors duration-150 hover:bg-input-hover active:bg-input-active focus-visible:bg-input-focus focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-input-disabled disabled:text-action-disabled-text";

        return cn(`${baseClasses} ${sizeStyles.box} ${sizeStyles.text} ${variantClass()}`);
    });

    const labelClasses = $derived(
        () => "block text-sm font-medium text-label mb-2",
    );

    const fallbackId = generateId("select");
    const selectId = $derived(idProp ?? fallbackId);

    const isEmpty = $derived(() => {
        return value === undefined || value === null || value === "";
    });

    /** String comparison so `"2"` and `2` match — same rule as Dropdown's `selectedValue`. */
    function isSameValue(
        a: string | number | null | undefined,
        b: string | number | null | undefined,
    ): boolean {
        if (a === undefined || a === null || b === undefined || b === null) {
            return false;
        }
        return String(a) === String(b);
    }

    const selectedOption = $derived.by(() =>
        options.find((opt) => isSameValue(opt.value, value)),
    );

    const hasSearchQuery = $derived(() => {
        return searchQuery.trim().length > 0;
    });

    const filteredOptions = $derived(() => {
        const query = searchQuery.trim().toLowerCase();
        const availableOptions = options;
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
        if (options.find((option) => option.value === optionValue)?.disabled) return;
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
        // The list in a sheet is in `<body>`, not in this container: a press
        // in that sheet (an option, the grip, the search field) is not outside.
        if (target.closest('[role="dialog"]')?.querySelector("[data-dropdown-sheet]")) return;
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

<div bind:this={selectContainer} class={cn("w-full select-container", className)}>
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
        {presentation}
        sheetTitle={label || placeholder}
        sheetSnap={searchable && options.length > 6 ? "full" : "half"}
    >
        {#snippet trigger(aria)}
            <button
                type="button"
                id={selectId}
                class={triggerClasses()}
                {disabled}
                onclick={handleTriggerClick}
                {...restProps}
                {...aria}
                aria-describedby={fieldDescribedBy(selectId, status, describedBy)}
            >
                <!-- An empty trigger shows its placeholder in the placeholder
                colour, as Input does. A value has no colour class of its own,
                and a disabled trigger none at all: the button's `text-body`
                and its disabled colour are inherited. A colour class here
                beat the button's `disabled:` one, and a disabled Select read
                as enabled. -->
                <span
                    class="text-left flex-1 truncate {disabled
                        ? ''
                        : isLoading
                          ? 'text-description'
                          : isEmpty()
                            ? 'text-input-placeholder'
                            : ''}"
                >
                    {#if isLoading}
                        {loadingText}
                    {:else}
                        {isEmpty()
                        ? placeholder
                        : selectedOption?.label || placeholder}
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
        {#snippet header()}
            {#if searchable && !isLoading}
                <!-- Outside role="listbox": a textbox is not a valid listbox child. -->
                <!-- 0.5rem and the panel's 1px border from the corner, as the
                options below and a Dropdown's items are: an 8px field 9px
                inside the panel's 16px corner is concentric with it. -->
                <div class="px-2 pb-2 pt-1" style:width={menuWidth} data-menu-width>
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
        {/snippet}
        {#snippet children()}
            <!-- `px-1` twice: the inner one is room for an option's focus
            ring inside the scrolling box, and together with the panel's
            border they put the options 9px from its corner. -->
            <div class="px-1 pb-2 pt-1" style:width={menuWidth} data-menu-width>
                <div
                    class="overflow-y-auto px-1"
                    data-menu-scroll
                    style:max-height={maxMenuHeight}
                >
                    {#if isLoading}
                        <div class="space-y-2 px-2 py-2" role="status" aria-live="polite">
                            <div class="h-8 w-full animate-pulse rounded-control bg-base-200"></div>
                            <div class="h-8 w-full animate-pulse rounded-control bg-base-200"></div>
                            <p class="text-xs text-description">{loadingText}</p>
                        </div>
                    {:else if filteredOptions().length > 0}
                        {#each filteredOptions() as option (option.value)}
                            {@const buttonRestProps = {
                                "data-value": String(option.value),
                            } as Record<string, string>}
                            <div class="w-full my-1">
                                <!-- `aria-disabled`, not `disabled`: a natively disabled button cannot take focus, so the arrow keys stopped at the option before it. The click is refused in `handleOptionClick`. -->
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={isSameValue(value, option.value)
                                        ? true
                                        : undefined}
                                    class="focus-ring flex w-full items-center justify-start rounded-control border-2 px-3 py-2 pointer-coarse:py-3 text-left text-sm font-medium transition-colors focus:outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 {isSameValue(
                                        value,
                                        option.value,
                                    )
                                        ? 'border-action-primary bg-transparent text-headline'
                                        : option.disabled
                                          ? 'border-transparent bg-transparent text-body'
                                          : 'border-transparent bg-transparent text-body hover:bg-surface-overlay-hover active:bg-surface-active'}"
                                    aria-disabled={option.disabled ? "true" : undefined}
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
                        <div class="rounded-control border border-border bg-surface-overlay-hover px-3 py-3 text-sm">
                            <p class="font-medium text-headline">{emptyStateTitle}</p>
                            <p class="mt-1 text-description">{emptyStateDescription}</p>
                            {#if emptyStateActionLabel && onEmptyStateAction}
                                <button
                                    type="button"
                                    class="mt-3 inline-flex min-h-11 cursor-pointer items-center rounded-control bg-action-primary px-3 py-2 text-sm text-action-primary"
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
    {#if name}
        <input type="hidden" {name} value={isEmpty() ? "" : String(value)} />
    {/if}
    <FieldMessages fieldId={selectId} {status} {hint} gap="mt-1" messageClass="w-full" />
</div>
