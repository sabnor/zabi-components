<script lang="ts">
    import { generateId } from "../util/ssr-safe.js";
    import { setContext, type Snippet } from 'svelte';
    import { cn } from "../util/cn.js";
    import {
        DROPDOWN_CONTEXT_KEY,
        type DropdownContext,
        type DropdownOption,
    } from "../util/dropdown.js";
    import {
        measurePlacement,
        unfitted,
        watchViewport,
        type PanelPlacement,
    } from "../util/fit-in-viewport.js";
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
        /**
         * The side the menu opens on. It is where the menu goes whenever it
         * fits there; near an edge of the screen it flips to the other side,
         * and is narrowed or given its own scroll when neither side has room.
         */
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

    /** Room kept between the menu and the edge of the screen. */
    const VIEWPORT_MARGIN = 8;

    /** The room between the menu and its trigger: `mt-2` or `mb-2`, so it grows with the text size. */
    function triggerGap(panel: HTMLElement): number {
        // A menu placed with `position: fixed` has its margin taken away inline:
        // read the one its classes give it, or the gap would be 0 from then on.
        const inline = panel.style.margin;
        panel.style.margin = '';
        const style = getComputedStyle(panel);
        const gap = Math.max(parseFloat(style.marginTop), parseFloat(style.marginBottom));
        panel.style.margin = inline;
        return Number.isFinite(gap) ? gap : 8;
    }

    const preferred = $derived({
        block: placement.startsWith('top') ? ('top' as const) : ('bottom' as const),
        inline: placement.endsWith('end') ? ('end' as const) : ('start' as const),
    });

    /**
     * Where the menu actually is. It starts, and stays, on the side asked for
     * whenever the menu fits there; `measurePlacement` only moves it when it
     * would leave the screen, or be cut off by a box that scrolls around it
     * (a Modal's body, say). In the second case it may be given
     * `position: fixed` (`fit.fixed`), which such a box does not clip. It
     * never leaves its place in the DOM, so the keys, focus and a dialog's
     * focus trap all still see it as part of this Dropdown.
     */
    let measured = $state<PanelPlacement | null>(null);
    const fit = $derived<PanelPlacement>(
        measured ?? { ...unfitted(preferred.block, preferred.inline), fixed: null },
    );
    const resolvedPlacement = $derived(`${fit.block}-${fit.inline}` as typeof placement);

    // Runs after the menu is in the DOM and before the browser paints it, so
    // it is never seen on the wrong side; then again when the screen changes.
    $effect(() => {
        const side = preferred;
        if (!isOpen || !menuElement || !rootEl) {
            measured = null;
            return;
        }
        const anchor = rootEl;
        const panel = menuElement;
        const update = () => {
            measured = measurePlacement(anchor, panel, side, {
                margin: VIEWPORT_MARGIN,
                gap: triggerGap(panel),
            });
        };
        update();
        return watchViewport(update, panel);
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
        return `${base} ${positioning[resolvedPlacement]}`;
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
            // A menu is an overlay (16px). Its items are 8px, 9px inside
            // the corner: within a pixel of concentric.
            // A column, so that the list below can be the part that scrolls
            // when the menu is limited in height.
            'flex flex-col rounded-overlay border border-border-overlay bg-surface-overlay py-2 shadow-lg transition-[opacity,translate] duration-200 ease-in-out',
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
        <!-- The inline styles are only set when the menu would leave the screen,
        or be cut off by a scrolling box around it (`fit.fixed`: placed against
        the viewport instead, with the classes' own offsets switched off).
        `min-width`: `min-w-[12rem]` is wider than a 320px screen once the text
        is at 200%, and a minimum beats `max-width`; a narrowed menu is exactly
        as wide as the room there is.
        A menu limited in height does not scroll itself: the list inside it
        does. A scrollbar on the panel was drawn in the panel's square box, on
        and outside its 16px corners; the list is 9px inside them (the panel's
        padding and border), and a header (Select's search field) stays put. -->
        <div
            bind:this={menuElement}
            class={dropdownContentClasses()}
            data-resolved-placement={resolvedPlacement}
            style:inset-inline-start={!fit.fixed && fit.inline === 'start' && fit.inlineOffset !== 0
                ? `${fit.inlineOffset}px`
                : undefined}
            style:inset-inline-end={!fit.fixed && fit.inline === 'end' && fit.inlineOffset !== 0
                ? `${fit.inlineOffset}px`
                : undefined}
            style:position={fit.fixed ? 'fixed' : undefined}
            style:top={fit.fixed ? `${fit.fixed.top}px` : undefined}
            style:left={fit.fixed ? `${fit.fixed.left}px` : undefined}
            style:right={fit.fixed ? 'auto' : undefined}
            style:bottom={fit.fixed ? 'auto' : undefined}
            style:margin={fit.fixed ? '0' : undefined}
            style:width={fit.fixed ? `${fit.fixed.width}px` : undefined}
            style:max-width={fit.maxWidth !== null ? `${fit.maxWidth}px` : undefined}
            style:min-width={fit.maxWidth !== null ? `${fit.maxWidth}px` : undefined}
            style:max-height={fit.maxHeight !== null ? `${fit.maxHeight}px` : undefined}
            style:overflow={fit.maxWidth !== null ? 'hidden' : undefined}
        >
            {@render header?.()}
            <!-- `mx-1` and `px-1` are the 0.5rem the items always had from the
            panel's edge, split so that the scrolling box is 4px in from it:
            room for an item's focus ring inside the box, and a scrollbar
            clear of the corners. -->
            <div
                id={menuId}
                role={menuRole === 'listbox' ? 'listbox' : 'menu'}
                aria-label={ariaLabel}
                class={options.length > 0 ? 'mx-1 min-h-0' : 'min-h-0'}
                data-dropdown-scroller
                style:overflow={fit.maxWidth !== null || fit.maxHeight !== null ? 'auto' : undefined}
                style:overscroll-behavior={fit.maxHeight !== null ? 'contain' : undefined}
            >
            {#if options.length > 0}
                <div class="px-1 py-1">
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
