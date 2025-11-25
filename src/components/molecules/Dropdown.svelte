<script lang="ts">
    import Button from "../atoms/Button.svelte";

    interface Props {
        isOpen?: boolean;
        placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
        ariaLabel?: string;
        selectedValue?: string | number | null;
        options?: Array<{
            value: string | number;
            label: string;
            disabled?: boolean;
        }>;
        onOptionClick?: (value: string | number) => void;
    }

    let {
        isOpen = false,
        placement = "bottom-start",
        ariaLabel = "Menu",
        selectedValue = null,
        options = [],
        onOptionClick,
        children,
        trigger,
        ...restProps
    }: Props & { children?: any; trigger?: any } = $props();

    let dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;
    let triggerElement = $state<HTMLElement | null>(null);
    let menuElement = $state<HTMLElement | null>(null);
    let openedViaKeyboard = $state(false);

    function handleKeydown(event: KeyboardEvent) {
        if (!isOpen) {
            if (
                event.key === "Enter" ||
                event.key === " " ||
                event.key === "ArrowDown"
            ) {
                event.preventDefault();
                openedViaKeyboard = true;
                isOpen = true;
            }
            return;
        }

        switch (event.key) {
            case "Escape":
                event.preventDefault();
                isOpen = false;
                triggerElement?.focus();
                break;
            case "ArrowDown":
                event.preventDefault();
                focusNextItem();
                break;
            case "ArrowUp":
                event.preventDefault();
                focusPreviousItem();
                break;
            case "Home":
                event.preventDefault();
                focusFirstItem();
                break;
            case "End":
                event.preventDefault();
                focusLastItem();
                break;
            case "Tab":
                isOpen = false;
                break;
        }
    }

    function getMenuItems(): HTMLElement[] {
        if (!menuElement) return [];
        return Array.from(
            menuElement.querySelectorAll<HTMLElement>(
                '[role="menuitem"], button, a',
            ),
        );
    }

    function focusNextItem() {
        const items = getMenuItems();
        const currentIndex = items.findIndex(
            (item) => item === document.activeElement,
        );
        const nextIndex =
            currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
    }

    function focusPreviousItem() {
        const items = getMenuItems();
        const currentIndex = items.findIndex(
            (item) => item === document.activeElement,
        );
        const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex]?.focus();
    }

    function focusFirstItem() {
        const items = getMenuItems();
        items[0]?.focus();
    }

    function focusLastItem() {
        const items = getMenuItems();
        items[items.length - 1]?.focus();
    }

    // Focus first item when dropdown opens via keyboard
    $effect(() => {
        if (isOpen && menuElement && openedViaKeyboard) {
            setTimeout(() => {
                focusFirstItem();
                openedViaKeyboard = false;
            }, 0);
        } else if (!isOpen) {
            openedViaKeyboard = false;
        }
    });

    // Mark selected items
    $effect(() => {
        if (isOpen && menuElement) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                const items = getMenuItems();
                items.forEach((item) => {
                    if (selectedValue !== null && selectedValue !== undefined) {
                        const itemValue =
                            item.getAttribute("data-value") ||
                            item.textContent?.trim();
                        if (String(itemValue) === String(selectedValue)) {
                            item.setAttribute("data-selected", "true");
                            item.setAttribute("aria-selected", "true");
                        } else {
                            item.removeAttribute("data-selected");
                            item.removeAttribute("aria-selected");
                        }
                    } else {
                        item.removeAttribute("data-selected");
                        item.removeAttribute("aria-selected");
                    }
                });
            }, 0);
        }
    });

    const placementClasses = $derived(() => {
        const base = "absolute z-dropdown min-w-[12rem]";
        const positioning = {
            "bottom-start": "top-full left-0 mt-2",
            "bottom-end": "top-full right-0 mt-2",
            "top-start": "bottom-full left-0 mb-2",
            "top-end": "bottom-full right-0 mb-2",
        };
        return `${base} ${positioning[placement]}`;
    });

    const transformClasses = $derived(() => {
        if (!isOpen) {
            const hiddenTransform = {
                "bottom-start": "translate-y-1",
                "bottom-end": "translate-y-1",
                "top-start": "-translate-y-1",
                "top-end": "-translate-y-1",
            };
            return `opacity-0 invisible ${hiddenTransform[placement]}`;
        }
        return "opacity-100 visible translate-y-0";
    });

    const dropdownContentClasses = $derived(() => {
        return `
            ${placementClasses()}
            bg-input
            rounded-lg
            shadow-lg
            border-0
            py-2
            transition-all
            duration-200
            ease-in-out
            ${transformClasses()}
        `
            .trim()
            .replace(/\s+/g, " ");
    });
</script>

<div
    class="relative inline-block"
    data-placement={placement}
    onkeydown={handleKeydown}
    {...restProps}
>
    <div bind:this={triggerElement}>
        {@render trigger?.()}
    </div>

    {#if isOpen}
        <div
            bind:this={menuElement}
            id={dropdownId}
            class={dropdownContentClasses()}
            role="menu"
            aria-label={ariaLabel}
            tabindex="-1"
        >
            {#if options.length > 0}
                <div class="px-2 py-2">
                    {#each options as option (option.value)}
                        {@const buttonRestProps = {
                            "data-value": String(option.value),
                        } as any}
                        <div class="w-full my-0.5">
                            <Button
                                variant={selectedValue === option.value
                                    ? "outline"
                                    : "ghost"}
                                size="sm"
                                isFullWidth={true}
                                disabled={option.disabled}
                                onclick={() => onOptionClick?.(option.value)}
                                {...buttonRestProps}
                            >
                                {option.label}
                            </Button>
                        </div>
                    {/each}
                </div>
            {:else if children}
                {@render children?.()}
            {/if}
        </div>
    {/if}
</div>

<style>
    :global([role="menu"] button) {
        justify-content: flex-start;
        text-align: left;
    }
</style>
