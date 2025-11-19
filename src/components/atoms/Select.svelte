<script lang="ts">
    import Dropdown from "../molecules/Dropdown.svelte";
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
            return "text-error text-sm mt-1 flex items-center gap-1.5";
        } else if (variant === "success") {
            return "text-success text-sm mt-1 flex items-center gap-1.5";
        } else if (variant === "warning") {
            return "text-warning text-sm mt-1 flex items-center gap-1.5";
        }
        return "text-description text-sm mt-1 flex items-center gap-1.5";
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
        if (
            isOpen &&
            !(event.target as HTMLElement).closest(".select-container")
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

<div class="w-full select-container">
    {#if label}
        <label for={selectId} class={labelClasses()}>{label}</label>
    {/if}

    <Dropdown {isOpen} placement="bottom-start">
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
                    class="text-left flex-1 {isEmpty()
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
            <div class="px-2 py-2">
                {#each options as option (option.value)}
                    <button
                        type="button"
                        class="w-full text-left px-4 py-2 text-body hover:bg-base-100 transition-colors rounded-md my-0.5 {option.disabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'} {value === option.value
                            ? 'bg-base-100'
                            : ''}"
                        onclick={() => handleOptionClick(option.value)}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </button>
                {/each}
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
