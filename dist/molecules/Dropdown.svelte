<script lang="ts">
    import { generateId } from '../../routes/lib/ssr-safe.js';
    import type { Snippet } from 'svelte';

    export type DropdownTriggerProps = {
        'aria-expanded': boolean;
        'aria-haspopup': 'menu' | 'listbox';
        'aria-controls': string;
    };

    interface Props {
        isOpen?: boolean;
        placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
        ariaLabel?: string;
        /** Use `listbox` for Select; `menu` for action menus. */
        menuRole?: 'menu' | 'listbox';
        selectedValue?: string | number | null;
        options?: Array<{
            value: string | number;
            label: string;
            disabled?: boolean;
        }>;
        onOptionClick?: (value: string | number) => void;
        /** Receives ARIA props for the trigger control. */
        trigger: Snippet<[DropdownTriggerProps]>;
        children?: Snippet;
    }

    let {
        isOpen = $bindable(false),
        placement = 'bottom-start',
        ariaLabel = 'Menu',
        menuRole = 'menu',
        selectedValue = null,
        options = [],
        onOptionClick,
        trigger,
        children,
        ...restProps
    }: Props = $props();

    const menuId = generateId('dropdown-menu');
    let rootEl = $state<HTMLDivElement | null>(null);

    let openedViaKeyboard = $state(false);

    const triggerAria = $derived({
        'aria-expanded': isOpen,
        'aria-haspopup': menuRole === 'listbox' ? 'listbox' as const : 'menu' as const,
        'aria-controls': menuId,
    } satisfies DropdownTriggerProps);

    function handleKeydown(event: KeyboardEvent) {
        if (!isOpen) {
            if (
                event.key === 'Enter' ||
                event.key === ' ' ||
                event.key === 'ArrowDown'
            ) {
                event.preventDefault();
                openedViaKeyboard = true;
                isOpen = true;
            }
            return;
        }

        switch (event.key) {
            case 'Escape':
                event.preventDefault();
                isOpen = false;
                break;
            case 'ArrowDown':
                event.preventDefault();
                focusNextItem();
                break;
            case 'ArrowUp':
                event.preventDefault();
                focusPreviousItem();
                break;
            case 'Home':
                event.preventDefault();
                focusFirstItem();
                break;
            case 'End':
                event.preventDefault();
                focusLastItem();
                break;
            case 'Tab':
                isOpen = false;
                break;
        }
    }

    let menuElement = $state<HTMLElement | null>(null);

    function getMenuItems(): HTMLElement[] {
        if (!menuElement) return [];
        return Array.from(
            menuElement.querySelectorAll<HTMLElement>(
                '[role="menuitem"], [role="option"]',
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
        getMenuItems()[0]?.focus();
    }

    function focusLastItem() {
        const items = getMenuItems();
        items[items.length - 1]?.focus();
    }

    $effect(() => {
        if (isOpen && menuElement && openedViaKeyboard) {
            const t = setTimeout(() => {
                focusFirstItem();
                openedViaKeyboard = false;
            }, 0);
            return () => clearTimeout(t);
        }
        if (!isOpen) {
            openedViaKeyboard = false;
        }
    });

    $effect(() => {
        if (!isOpen) return;
        function onDocMouseDown(e: MouseEvent) {
            const t = e.target as Node;
            if (rootEl && !rootEl.contains(t)) {
                isOpen = false;
            }
        }
        document.addEventListener('mousedown', onDocMouseDown);
        return () => document.removeEventListener('mousedown', onDocMouseDown);
    });

    const placementClasses = $derived(() => {
        const base = 'absolute z-dropdown min-w-[12rem]';
        const positioning: Record<typeof placement, string> = {
            'bottom-start': 'top-full left-0 mt-2',
            'bottom-end': 'top-full right-0 mt-2',
            'top-start': 'bottom-full left-0 mb-2',
            'top-end': 'bottom-full right-0 mb-2',
        };
        return `${base} ${positioning[placement]}`;
    });

    const transformClasses = $derived(() => {
        if (!isOpen) {
            const hiddenTransform: Record<typeof placement, string> = {
                'bottom-start': 'translate-y-1',
                'bottom-end': 'translate-y-1',
                'top-start': '-translate-y-1',
                'top-end': '-translate-y-1',
            };
            return `invisible opacity-0 ${hiddenTransform[placement]}`;
        }
        return 'visible translate-y-0 opacity-100';
    });

    const dropdownContentClasses = $derived(() => {
        return [
            placementClasses(),
            'rounded-lg border border-border bg-card py-2 shadow-lg transition-all duration-200 ease-in-out',
            transformClasses(),
        ]
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
    });

    const itemRole = $derived(menuRole === 'listbox' ? 'option' : 'menuitem');

    const optionClasses =
        'focus-ring flex w-full items-center justify-start rounded-md px-3 py-2 text-left text-sm text-body transition-colors hover:bg-base-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50';
</script>

<div
    bind:this={rootEl}
    class="relative inline-block"
    data-placement={placement}
    onkeydown={handleKeydown}
    {...restProps}
>
    {@render trigger(triggerAria)}

    {#if isOpen}
        <div
            bind:this={menuElement}
            id={menuId}
            class={dropdownContentClasses()}
            role={menuRole === 'listbox' ? 'listbox' : 'menu'}
            aria-label={ariaLabel}
        >
            {#if options.length > 0}
                <div class="px-2 py-1">
                    {#each options as option (option.value)}
                        <button
                            type="button"
                            role={itemRole}
                            aria-selected={menuRole === 'listbox' &&
                            selectedValue !== null &&
                            String(selectedValue) === String(option.value)
                                ? true
                                : undefined}
                            data-value={String(option.value)}
                            disabled={option.disabled}
                            class={optionClasses}
                            onclick={() => onOptionClick?.(option.value)}
                        >
                            {option.label}
                        </button>
                    {/each}
                </div>
            {:else if children}
                {@render children?.()}
            {/if}
        </div>
    {/if}
</div>
