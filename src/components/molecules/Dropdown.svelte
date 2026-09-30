<script lang="ts">
    import { generateId } from "../util/ssr-safe.js";
    import { setContext, type Snippet } from 'svelte';
    import { cn } from "../util/cn.js";
    import {
        DROPDOWN_CONTEXT_KEY,
        type DropdownContext,
        type DropdownOption,
    } from "../util/dropdown.js";
    import DropdownItem from './DropdownItem.svelte';

    export type DropdownTriggerProps = {
        'aria-expanded': boolean;
        'aria-haspopup': 'menu' | 'listbox';
        'aria-controls': string;
    };

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        isOpen?: boolean;
        placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
        ariaLabel?: string;
        /** `listbox` for Select-style; `menu` for actions. */
        menuRole?: 'menu' | 'listbox';
        selectedValue?: string | number | null;
        /**
         * Menu items, when not supplying children. Each takes an optional
         * `icon`, `tone` (`danger`) and `description`; a disabled item stays
         * focusable so its description can be read.
         */
        options?: DropdownOption[];
        onOptionClick?: (value: string | number) => void;
        trigger: Snippet<[DropdownTriggerProps]>;
        /** Rendered in the popup above the menu/listbox, outside its role (e.g. a search field). */
        header?: Snippet;
        children?: Snippet;
    }

    let {
        class: className = "",
        isOpen = $bindable(false),
        placement = 'bottom-start',
        ariaLabel = 'Menu',
        menuRole = 'menu',
        selectedValue = null,
        options = [],
        onOptionClick,
        trigger,
        header,
        children,
        ...restProps
    }: Props = $props();

    // `DropdownItem` reads its role from here, in `options` and in `children` alike.
    setContext<DropdownContext>(DROPDOWN_CONTEXT_KEY, {
        get itemRole() {
            return menuRole === 'listbox' ? ('option' as const) : ('menuitem' as const);
        },
    });

    const menuId = generateId('dropdown-menu');
    let rootEl = $state<HTMLDivElement | null>(null);

    let openedViaKeyboard = $state(false);

    const triggerAria = $derived({
        'aria-expanded': isOpen,
        'aria-haspopup': menuRole === 'listbox' ? 'listbox' as const : 'menu' as const,
        'aria-controls': menuId,
    } satisfies DropdownTriggerProps);

    function isTextEntryTarget(target: EventTarget | null): boolean {
        if (!(target instanceof HTMLElement)) return false;
        if (target.isContentEditable || target instanceof HTMLTextAreaElement) {
            return true;
        }
        return (
            target instanceof HTMLInputElement &&
            !['checkbox', 'radio', 'button', 'submit', 'reset'].includes(target.type)
        );
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!isOpen) {
            if (event.key === ' ' && isTextEntryTarget(event.target)) {
                return;
            }
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
                // Let text fields (e.g. Select search) keep native caret movement.
                if (isTextEntryTarget(event.target)) break;
                event.preventDefault();
                focusFirstItem();
                break;
            case 'End':
                if (isTextEntryTarget(event.target)) break;
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
        // `menuitemradio` and `menuitemcheckbox` are menu items too. Matching
        // only `menuitem` left a menu built from them with nothing to focus:
        // arrows and Home/End did nothing, opening by keyboard focused nothing,
        // and Tab closed the menu, so its items could not be reached at all.
        return Array.from(
            menuElement.querySelectorAll<HTMLElement>(
                '[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"], [role="option"]',
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

    /**
     * Closing removes the popup, and with it the focused item: the browser
     * then drops focus on `<body>` and a keyboard user loses their place.
     * Whether focus was in the popup has to be read before the DOM changes.
     */
    let focusWasInPopup = false;
    $effect.pre(() => {
        if (!isOpen) {
            focusWasInPopup =
                !!menuElement && menuElement.contains(document.activeElement);
        }
    });

    /** The control that opened the menu: what `aria-controls` is spread on, else the first control. */
    function triggerElement(): HTMLElement | null {
        if (!rootEl) return null;
        return (
            rootEl.querySelector<HTMLElement>(`[aria-controls="${menuId}"]`) ??
            rootEl.querySelector<HTMLElement>(
                'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
            )
        );
    }

    $effect(() => {
        if (isOpen || !focusWasInPopup) return;
        focusWasInPopup = false;
        // Only when the close left focus nowhere. If the handler that closed
        // the menu moved focus itself (it opened a dialog, say), that wins.
        const active = document.activeElement;
        if (!active || active === document.body) {
            triggerElement()?.focus();
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
            // Logical: `start` is the left edge, and the right one in a right-to-left page.
            'bottom-start': 'top-full start-0 mt-2',
            'bottom-end': 'top-full end-0 mt-2',
            'top-start': 'bottom-full start-0 mb-2',
            'top-end': 'bottom-full end-0 mb-2',
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
            'rounded-control border border-border-overlay bg-surface-overlay py-2 shadow-lg transition-all duration-200 ease-in-out',
            transformClasses(),
        ]
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
    });
</script>

<div
    bind:this={rootEl}
    class={cn("relative inline-block", className)}
    data-placement={placement}
    onkeydown={handleKeydown}
    {...restProps}
>
    {@render trigger(triggerAria)}

    {#if isOpen}
        <div bind:this={menuElement} class={dropdownContentClasses()}>
            {@render header?.()}
            <div
                id={menuId}
                role={menuRole === 'listbox' ? 'listbox' : 'menu'}
                aria-label={ariaLabel}
            >
            {#if options.length > 0}
                <div class="px-2 py-1">
                    {#each options as option (option.value)}
                        <DropdownItem
                            label={option.label}
                            description={option.description}
                            icon={option.icon}
                            tone={option.tone}
                            disabled={option.disabled}
                            selected={selectedValue !== null &&
                                String(selectedValue) === String(option.value)}
                            data-value={String(option.value)}
                            onclick={() => onOptionClick?.(option.value)}
                        />
                    {/each}
                </div>
            {:else if children}
                {@render children?.()}
            {/if}
            </div>
        </div>
    {/if}
</div>
