<script lang="ts">
    import type { Snippet } from 'svelte';
    import {
        focusFirstElement,
        joinOverlayStack,
        recoverStrayFocus,
        returnFocus,
        saveFocus,
    } from '../util/focus-utils.js';
    import { lockBodyScroll, trapTabKey } from '../util/overlay.js';
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";

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
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
        children?: Snippet;
    }

    let {
        class: className = "",
        isOpen = $bindable(false),
        title = '',
        closeLabel = 'Close',
        initialFocus,
        onclick,
        onkeydown,
        children,
        ...restProps
    }: Props = $props();

    const slideTitleId = generateId('slideup-title');

    let slideUpContainer = $state<HTMLDivElement>();
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
                focusFirstElement(container, initialFocus);
            }, 0);
            // If the focused control is disabled or removed, focus lands on
            // `<body>`; take Tab and Escape back from there.
            const stopRecovery = recoverStrayFocus(container, {
                onEscape: (event) => closeSlideUp(event),
            });
            return () => {
                clearTimeout(t);
                stopRecovery();
                overlay.leave();
                unlockScroll();
                if (focusActive) {
                    focusActive = false;
                    returnFocus();
                }
            };
        }
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
        class="fixed inset-0 z-modal cursor-pointer bg-overlay"
        style:z-index={depth > 0 ? `calc(var(--z-modal) + ${depth})` : undefined}
        data-overlay-depth={depth}
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="presentation"
    >
        <div
            bind:this={slideUpContainer}
            class={cn("fixed bottom-0 left-0 right-0 z-modal flex max-h-[90vh] cursor-default flex-col overflow-y-auto rounded-t-overlay border-t border-border-overlay bg-surface-overlay shadow-lg animate-[slideUp_0.3s_ease-out] motion-reduce:animate-none", className)}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? slideTitleId : undefined}
            tabindex="-1"
            onkeydown={(event) => trapTabKey(slideUpContainer, event)}
            {...restProps}
        >
            {#if title}
                <div class="flex items-center justify-between px-6 pb-4 pt-6">
                    <h2
                        id={slideTitleId}
                        class="text-2xl font-normal leading-8 tracking-normal text-headline"
                    >
                        {title}
                    </h2>
                    <button
                        type="button"
                        onclick={closeSlideUp}
                        class="focus-ring flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-2xl text-description transition-colors hover:bg-surface-overlay-hover hover:text-headline"
                        aria-label={closeLabel}
                    >
                        ×
                    </button>
                </div>
            {/if}

            <div class="flex-1 px-6 pb-6">
                {@render children?.()}
            </div>
        </div>
    </div>
{/if}
