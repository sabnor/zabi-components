<script lang="ts">
    import { zabiCommonStrings } from "../util/zabi-strings.js";
    import { generateId } from "../util/ssr-safe.js";
    import { onMount, setContext, type Snippet } from 'svelte';
    import { cn } from "../util/cn.js";
    import {
        DROPDOWN_CONTEXT_KEY,
        opensAsSheet,
        type DropdownContext,
        type DropdownOption,
        type DropdownPresentation,
    } from "../util/dropdown.js";
    import type { BottomSheetSnap } from "../util/bottom-sheet.js";
    import {
        measurePlacement,
        unfitted,
        watchViewport,
        type PanelPlacement,
    } from "../util/fit-in-viewport.js";
    import { isInsideToastRegion } from "../util/focus-utils.js";
    import BottomSheet from './BottomSheet.svelte';
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
        /**
         * How the menu is shown. `popover`: under its trigger, as always.
         * `sheet`: in a BottomSheet, with the same items, roles and keys; this
         * is the action sheet ("Edit, Share, Delete" from the bottom of the
         * screen). `auto`: a sheet on a phone (a touch screen narrower than
         * 640px), the pop-over everywhere else. Decided each time the menu
         * opens, in the browser.
         */
        presentation?: DropdownPresentation;
        /**
         * The host fills its container instead of being as wide as its
         * trigger's content, and the menu is at least as wide as the host.
         * For a trigger that is a field (Select); a menu on an icon button
         * stays as it is.
         */
        fullWidth?: boolean;
        /** Heading of the sheet. Without it, `ariaLabel` is. */
        sheetTitle?: string;
        /**
         * The height the sheet opens at. Without it: half the screen for up
         * to six `options`, all of it for more. The grip moves it either way.
         */
        sheetSnap?: BottomSheetSnap;
        /** Accessible name of the sheet's close button. */
        sheetCloseLabel?: string;
        /** Accessible name of the sheet's grip while its button takes the sheet up a step. */
        sheetExpandLabel?: string;
        /** The same, while it takes the sheet down a step. */
        sheetCollapseLabel?: string;
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
        isOpen = $bindable<Exclude<Props["isOpen"], undefined>>(),
        placement = 'bottom-start',
        presentation = 'popover',
        fullWidth = false,
        sheetTitle = undefined,
        sheetSnap = undefined,
        sheetCloseLabel: sheetCloseLabelGiven,
        sheetExpandLabel: sheetExpandLabelGiven,
        sheetCollapseLabel: sheetCollapseLabelGiven,
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

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (isOpen === undefined) isOpen = false;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    /** Words many components share: a `ZabiStringsProvider` above this one may give them; else English. */
    const common = zabiCommonStrings();
    const sheetCloseLabel = $derived(sheetCloseLabelGiven ?? common().close);
    const sheetExpandLabel = $derived(sheetExpandLabelGiven ?? common().expand);
    const sheetCollapseLabel = $derived(sheetCollapseLabelGiven ?? common().collapse);

    // `DropdownItem` reads its role from here, in `options` and in `children` alike.
    setContext<DropdownContext>(DROPDOWN_CONTEXT_KEY, {
        get itemRole() {
            return menuRole === 'listbox' ? ('option' as const) : ('menuitem' as const);
        },
    });

    const menuId = generateId('dropdown-menu');
    let rootEl = $state<HTMLDivElement | null>(null);

    /**
     * Whether the open menu is in a sheet. Worked out when `isOpen` turns
     * true and kept while it is open, so turning the phone does not swap one
     * for the other under the finger. Never before the component has mounted:
     * a menu rendered open on the server is a pop-over, and stays one through
     * hydration.
     */
    let mounted = $state(false);
    onMount(() => {
        mounted = true;
    });
    const asSheet = $derived(isOpen && mounted && opensAsSheet(presentation));
    /** The sheet's content, when the menu is in one: it is outside `rootEl`, in `<body>`. */
    let sheetElement = $state<HTMLElement | null>(null);

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

        // In a sheet, Escape and Tab are the sheet's: it closes itself and
        // keeps Tab inside, on its grip and close button too.
        if (asSheet && (event.key === 'Escape' || event.key === 'Tab')) return;

        if (typedIntoList(event)) return;

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
            case 'Tab': {
                // The list is one stop and a field above it (Select's search)
                // another: Shift+Tab from an item goes to the field, Tab from
                // the field to the list. Any other Tab leaves, and closes.
                const field = headerField();
                const onItem = getMenuItems().includes(event.target as HTMLElement);
                if (field && onItem && event.shiftKey) {
                    event.preventDefault();
                    field.focus();
                } else if (field && event.target === field && !event.shiftKey && getMenuItems().length > 0) {
                    event.preventDefault();
                    tabStop()?.focus();
                } else {
                    isOpen = false;
                }
                break;
            }
        }
    }

    /** The text field in the popup's header, when there is one: Select's search. */
    function headerField(): HTMLElement | null {
        const popup = sheetElement ?? popoverElement();
        if (!popup) return null;
        return (
            [...popup.querySelectorAll<HTMLElement>('input, textarea')].find(
                (candidate) => isTextEntryTarget(candidate) && !(candidate as HTMLInputElement).disabled,
            ) ?? null
        );
    }

    /** The item that is the list's one Tab stop. */
    function tabStop(): HTMLElement | undefined {
        const items = getMenuItems();
        return items.find((item) => item.tabIndex === 0) ?? items[0];
    }

    /** How long a pause ends a word typed on the list, in ms. */
    const TYPEAHEAD_PAUSE = 600;
    let typed = '';
    let typedAt = 0;

    /**
     * A printable character typed while focus is on an item. With a text
     * field above the list it is meant for that field: focus moves there and
     * the character is typed into it. Without one it is typeahead: focus goes
     * to the next item that starts with what has been typed. Returns true
     * when the key was taken.
     */
    function typedIntoList(event: KeyboardEvent): boolean {
        if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return false;
        const items = getMenuItems();
        const at = items.indexOf(event.target as HTMLElement);
        if (at === -1) return false;
        const now = event.timeStamp || Date.now();
        const word = now - typedAt > TYPEAHEAD_PAUSE ? '' : typed;
        // A space activates the item, unless it is in the middle of a word.
        if (event.key === ' ' && word === '') return false;

        const field = headerField();
        if (field) {
            // Focus moves during keydown, so the character lands in the field.
            field.focus();
            return true;
        }

        event.preventDefault();
        typed = word + event.key.toLocaleLowerCase();
        typedAt = now;
        const starts = (item: HTMLElement) =>
            (item.textContent ?? '').trim().toLocaleLowerCase().startsWith(typed);
        // One letter again and again steps through the items that start with it.
        const from = typed.length === 1 ? at + 1 : at;
        const order = [...items.slice(from), ...items.slice(0, from)];
        order.find(starts)?.focus();
        return true;
    }

    /**
     * One Tab stop for the whole list, on the item that has focus, or the
     * chosen one, or the first: the roving tabindex of a listbox or a menu.
     * With every item a stop, a field above twelve options was twelve
     * Shift+Tabs away. Kept as the items change (a search filters them).
     */
    $effect(() => {
        const popup = sheetElement ?? menuElement;
        if (!isOpen || !popup) return;
        const rove = (current?: HTMLElement) => {
            const items = getMenuItems();
            const stop =
                (current && items.includes(current) ? current : undefined) ??
                items.find((item) => item === document.activeElement) ??
                items.find((item) => item.tabIndex === 0 && item.hasAttribute('data-roving')) ??
                items.find(
                    (item) =>
                        item.getAttribute('aria-selected') === 'true' ||
                        item.getAttribute('aria-checked') === 'true',
                ) ??
                items[0];
            for (const item of items) {
                item.tabIndex = item === stop ? 0 : -1;
                item.setAttribute('data-roving', '');
            }
        };
        rove();
        const onFocusIn = (event: FocusEvent) => {
            if (getMenuItems().includes(event.target as HTMLElement)) rove(event.target as HTMLElement);
        };
        popup.addEventListener('focusin', onFocusIn);
        const changes = new MutationObserver(() => rove());
        changes.observe(popup, { childList: true, subtree: true });
        return () => {
            popup.removeEventListener('focusin', onFocusIn);
            changes.disconnect();
        };
    });

    let menuElement = $state<HTMLElement | null>(null);
    const popoverElement = () => menuElement;

    function getMenuItems(): HTMLElement[] {
        const menuElement = sheetElement ?? popoverElement();
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

    /**
     * In a sheet. Focus goes to the chosen item, or the first one, as soon as
     * the sheet is in place: the sheet itself would start on its grip. (It
     * leaves focus alone when something inside already has it.) Focusing also
     * scrolls the chosen item into view.
     */
    let closedFromSheet = false;
    $effect(() => {
        if (!asSheet || !sheetElement) return;
        closedFromSheet = true;
        queueMicrotask(() => {
            const items = getMenuItems();
            const chosen = items.find(
                (item) =>
                    item.getAttribute('aria-selected') === 'true' ||
                    item.getAttribute('aria-checked') === 'true',
            );
            (chosen ?? items[0])?.focus();
        });
    });

    // Closed from a sheet, focus goes back to the trigger. The sheet returns
    // it to whatever had focus when it opened, but a tap on a button does not
    // focus it in every browser, and then that is `<body>`.
    $effect(() => {
        if (isOpen || !closedFromSheet) return;
        closedFromSheet = false;
        const timer = setTimeout(() => {
            const active = document.activeElement;
            if (!active || active === document.body) triggerElement()?.focus();
        }, 0);
        return () => clearTimeout(timer);
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
        // A sheet has a backdrop of its own, and is not inside `rootEl`.
        if (!isOpen || asSheet) return;
        function onDocMouseDown(e: MouseEvent) {
            const t = e.target as Node;
            if (isInsideToastRegion(t)) return;
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
            'flex flex-col rounded-overlay border border-border-overlay bg-surface-overlay py-2 shadow-lg transition-[opacity,translate] duration-200 ease-in-out motion-reduce:transition-none',
            transformClasses(),
        ]
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
    });
</script>

<div
    bind:this={rootEl}
    class={cn("relative", fullWidth ? "block w-full min-w-0" : "inline-block", className)}
    data-placement={placement}
    onkeydown={handleKeydown}
    {...restProps}
>
    {@render trigger(triggerAria)}

    {#if asSheet}
        <!-- The same menu in a BottomSheet: the element with the menu or
        listbox role, its items and the header are the ones the pop-over has,
        so roles, names and the arrow keys are too. The sheet brings the focus
        trap, Escape, the backdrop, the swipe and its place in the stack of
        overlays. It is rendered in `<body>`, outside this component's root, so
        the keys are listened to here as well. -->
        <BottomSheet
            bind:isOpen
            snap={sheetSnap ?? (options.length > 6 ? 'full' : 'half')}
            title={sheetTitle || ariaLabel}
            closeLabel={sheetCloseLabel}
            expandLabel={sheetExpandLabel}
            collapseLabel={sheetCollapseLabel}
        >
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
                bind:this={sheetElement}
                class="dropdown-sheet"
                data-dropdown-sheet
                onkeydown={handleKeydown}
            >
                {#if header}
                    <div class="dropdown-sheet-header">
                        {@render header()}
                    </div>
                {/if}
                <div
                    id={menuId}
                    role={menuRole === 'listbox' ? 'listbox' : 'menu'}
                    aria-label={ariaLabel}
                >
                    {@render items()}
                </div>
            </div>
        </BottomSheet>
    {:else if isOpen}
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
            style:min-width={fit.maxWidth !== null
                ? `${fit.maxWidth}px`
                : fullWidth
                  ? 'max(12rem, 100%)'
                  : undefined}
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
            {@render items()}
            </div>
        </div>
    {/if}
</div>

{#snippet items()}
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
{/snippet}

<style>
    /*
     * In a sheet the rows are 48px, for a thumb, and as wide as the sheet.
     * px, not rem: a row that grows with the text grows anyway, by its text.
     */
    .dropdown-sheet :global(:is([role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"], [role="option"])) {
        min-height: 48px;
        align-items: center;
    }

    /* The sheet scrolls, so a list with a height limit and a scrollbar of its
       own (Select's) has neither here, and a width set for the pop-over
       (`menuWidth`) is the sheet's. */
    .dropdown-sheet :global([data-menu-scroll]) {
        max-height: none !important;
        overflow: visible !important;
    }
    .dropdown-sheet :global([data-menu-width]) {
        width: 100% !important;
    }

    /* A header (Select's search field) stays under the sheet's own header
       while the list scrolls beneath it. Wider than the list by the room a
       focus ring takes, so no ring shows beside it. */
    .dropdown-sheet-header {
        position: sticky;
        top: 0;
        z-index: 1;
        margin-inline: -4px;
        padding-inline: 4px;
        background-color: var(--color-surface-overlay);
    }
</style>
