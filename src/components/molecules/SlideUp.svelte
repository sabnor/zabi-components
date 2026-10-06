<script lang="ts">
    import type { Snippet } from 'svelte';
    import {
        focusFirstElement,
        joinOverlayStack,
        recoverStrayFocus,
        returnFocus,
        saveFocus,
    } from '../util/focus-utils.js';
    import {
        followKeyboard,
        lockBodyScroll,
        registerOverlayFooter,
        registerOverlayHeader,
        trapTabKey,
    } from '../util/overlay.js';
    import { TOUCH_HIT_AREA } from '../util/touch-target.js';
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import {
        OVERLAY_CHROME,
        OVERLAY_CLOSE_GLYPH,
        OVERLAY_TITLE_2XL,
        OVERLAY_TITLE_HYPHENS,
        OVERLAY_TITLE_WRAP,
        textIsEnlarged,
    } from "../util/overlay-chrome.js";
    import { attachSheetDrag, FLICK_VELOCITY } from "../util/sheet-drag.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        isOpen?: boolean;
        title?: string;
        /** Accessible name of the close button. */
        closeLabel?: string;
        /**
         * CSS selector, looked up inside the sheet, of the control that takes
         * focus when it opens. Without it, or with no match, the first control does.
         */
        initialFocus?: string;
        /**
         * Adds a grip at the top and lets a swipe down close the sheet. The
         * grip drags from anywhere; a swipe on the content closes only when
         * the content is at its top, and scrolls it otherwise. The close
         * button, the backdrop and Escape stay, so nothing depends on the
         * gesture.
         */
        swipeToClose?: boolean;
        /**
         * Runs when the sheet closes itself, with the event that closed it:
         * the click, the Escape keydown, or the end of a swipe.
         */
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
        children?: Snippet;
        /**
         * Pinned to the bottom of the sheet, below the content, which then
         * scrolls on its own: for the buttons of a form. It stays above the
         * on-screen keyboard, and toasts keep off it. Without it the sheet is
         * as it always was: one box that scrolls as a whole.
         */
        footer?: Snippet;
    }

    let {
        class: className = "",
        isOpen = $bindable(false),
        title = '',
        closeLabel = 'Close',
        initialFocus,
        swipeToClose = false,
        onclick,
        onkeydown,
        children,
        footer,
        ...restProps
    }: Props = $props();

    const slideTitleId = generateId('slideup-title');

    let slideUpContainer = $state<HTMLDivElement>();
    let grip = $state<HTMLDivElement>();
    let headerElement = $state<HTMLDivElement>();
    let footerElement = $state<HTMLDivElement>();

    /**
     * Read as the overlay opens: with the text enlarged, a long word in the
     * title is hyphenated before it is cut (util/overlay-chrome.ts).
     */
    let enlargedText = $state(false);
    $effect(() => {
        if (isOpen) enlargedText = textIsEnlarged();
    });
    /** With a footer: the content, which is then what scrolls. */
    let scroller = $state<HTMLDivElement>();
    /** How far a swipe has pulled the sheet down, in px. */
    let dragOffset = $state(0);
    let dragging = $state(false);
    let focusActive = false;
    /** Position among the open overlays; lifts a sheet opened later above the earlier ones. */
    let depth = $state(0);

    function closeSlideUp(event?: Event) {
        isOpen = false;
        if (focusActive) {
            focusActive = false;
            returnFocus();
        }
        if (onclick && event) {
            onclick(event);
        }
    }

    $effect(() => {
        const container = slideUpContainer;
        if (isOpen && container) {
            saveFocus();
            focusActive = true;
            const unlockScroll = lockBodyScroll();
            const overlay = joinOverlayStack(container);
            depth = overlay.depth;
            const t = setTimeout(() => {
                // Something inside has taken focus already (a field that
                // focuses itself as it mounts): leave it there. `initialFocus`
                // is the consumer saying where focus goes, so it still decides.
                const active = document.activeElement;
                const inside = !!active && active !== container && container.contains(active);
                if (inside && !(initialFocus && container.querySelector(initialFocus))) return;
                focusFirstElement(container, initialFocus);
            }, 0);
            // If the focused control is disabled or removed, focus lands on
            // `<body>`; take Tab and Escape back from there.
            const stopRecovery = recoverStrayFocus(container, {
                onEscape: (event) => closeSlideUp(event),
            });
            // Where the on-screen keyboard covers the page, the overlay
            // keeps to what is left above it.
            const stopKeyboard = container.parentElement
                ? followKeyboard(container.parentElement)
                : undefined;
            return () => {
                clearTimeout(t);
                stopRecovery();
                stopKeyboard?.();
                overlay.leave();
                unlockScroll();
                if (focusActive) {
                    focusActive = false;
                    returnFocus();
                }
            };
        }
    });

    // For the toast stack: it starts below the header, which holds the close
    // button, and stays off a pinned footer.
    $effect(() => {
        const top = headerElement;
        if (!isOpen || !top) return;
        return registerOverlayHeader(top);
    });
    $effect(() => {
        const pinned = footerElement;
        if (!isOpen || !pinned) return;
        return registerOverlayFooter(pinned);
    });

    $effect(() => {
        const container = slideUpContainer;
        const zone = grip;
        // With a footer the content scrolls, not the panel.
        const scrolls = footer ? scroller : container;
        if (!isOpen || !swipeToClose || !container || !zone || !scrolls) return;
        const settle = () => {
            dragging = false;
            dragOffset = 0;
        };
        const stop = attachSheetDrag(
            // Without a footer the panel is its own scrolling box.
            { handleZone: zone, scroller: scrolls },
            {
                onStart: () => (dragging = true),
                // Down only: there is nowhere for it to go upwards.
                onMove: (distance) => (dragOffset = Math.max(0, distance)),
                onEnd(distance, velocity, event) {
                    const far = distance > container.getBoundingClientRect().height * 0.3;
                    settle();
                    if (distance > 0 && (far || velocity >= FLICK_VELOCITY)) closeSlideUp(event);
                },
                onCancel: settle,
            },
        );
        return () => {
            stop();
            settle();
        };
    });

    function handleBackdropClick(event: Event) {
        if (event.target === event.currentTarget) {
            closeSlideUp(event);
        }
    }

    function handleKeydown(event: Event) {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === 'Escape' && !keyboardEvent.defaultPrevented) {
            keyboardEvent.preventDefault();
            closeSlideUp(event);
        }
        onkeydown?.(event);
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        class="group/overlay fixed inset-0 z-modal cursor-pointer bg-overlay"
        style:z-index={depth > 0 ? `calc(var(--z-modal) + ${depth})` : undefined}
        data-overlay-depth={depth}
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="presentation"
    >
        <div
            bind:this={slideUpContainer}
            class={cn(
                "group-data-keyboard-open/overlay:max-h-full",
                "absolute bottom-0 left-0 right-0 z-modal flex max-h-[90dvh] cursor-default flex-col overflow-y-auto rounded-t-overlay border-t border-border-overlay bg-surface-overlay shadow-lg animate-[slideUp_0.3s_ease-out] motion-reduce:animate-none",
                // With a footer the content scrolls between the header and it.
                footer && "overflow-y-hidden",
                // Back to rest after a swipe that did not close it.
                swipeToClose &&
                    "overscroll-contain transition-transform duration-200 ease-out motion-reduce:transition-none",
                className,
            )}
            style:transform={dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined}
            style:transition={dragging ? "none" : undefined}
            data-dragging={dragging ? "true" : undefined}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? slideTitleId : undefined}
            tabindex="-1"
            onkeydown={(event) => trapTabKey(slideUpContainer, event)}
            {...restProps}
        >
            {#if swipeToClose}
                <!-- Decorative: it adds a gesture, and the close button is the
                control. It stays at the top while the content scrolls.
                `touch-none`: otherwise the browser takes a touch here for
                itself. The bar is drawn in the text colour where colours are
                forced, since a background is dropped there. -->
                <div
                    bind:this={grip}
                    data-sheet-grip
                    aria-hidden="true"
                    class="sticky top-0 z-10 flex h-[28px] shrink-0 cursor-grab touch-none items-start justify-center bg-surface-overlay pt-[10px] active:cursor-grabbing {OVERLAY_CHROME}"
                >
                    <span
                        class="block h-1 w-9 rounded-pill bg-current text-description forced-colors:bg-[CanvasText]"
                    ></span>
                </div>
            {/if}
            {#if title}
                <!-- Chrome: laid out in px, with a title that stops at 1.3
                times its size (util/overlay-chrome.ts). 12px between a long
                title and the button: the title wraps, the button keeps its size. -->
                <div
                    bind:this={headerElement}
                    class="flex shrink-0 items-center justify-between gap-[12px] px-6 pb-4 {OVERLAY_CHROME} {swipeToClose
                        ? 'pt-2'
                        : 'pt-6'}"
                >
                    <h2
                        id={slideTitleId}
                        class="min-w-0 {OVERLAY_TITLE_2XL} font-normal tracking-normal text-headline {OVERLAY_TITLE_WRAP} {enlargedText ? OVERLAY_TITLE_HYPHENS : ''}"
                    >
                        {title}
                    </h2>
                    <button
                        type="button"
                        onclick={closeSlideUp}
                        class="focus-ring pointer-coarse:relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full {OVERLAY_CLOSE_GLYPH} text-description transition-colors hover:bg-surface-overlay-hover hover:text-headline active:bg-surface-active {TOUCH_HIT_AREA}"
                        aria-label={closeLabel}
                    >
                        ×
                    </button>
                </div>
            {/if}

            {#if footer}
                <!-- `pt-1`: a scroll container clips, and the focus ring of a
                first control needs the room. -->
                <div
                    bind:this={scroller}
                    data-slide-up-content
                    class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[24px] pt-[4px] pb-[16px]"
                >
                    {@render children?.()}
                </div>
                <!-- Clear of the home indicator on a phone; over the keyboard
                that is under the keyboard, and 16px is enough. -->
                <div
                    bind:this={footerElement}
                    data-slide-up-footer
                    class="flex shrink-0 flex-wrap justify-end gap-[8px] border-t border-border-overlay px-[24px] pt-[16px] pb-[calc(16px+env(safe-area-inset-bottom,0px))] group-data-keyboard-open/overlay:pb-[16px]"
                >
                    {@render footer()}
                </div>
            {:else}
                <!-- Clear of the home indicator on a phone. -->
                <div class="flex-1 px-[24px] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
                    {@render children?.()}
                </div>
            {/if}
        </div>
    </div>
{/if}
