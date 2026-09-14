<script lang="ts">
    import type { Snippet } from 'svelte';
    import {
        focusFirstElement,
        getFocusableElements,
        returnFocus,
        saveFocus,
    } from '../util/focus-utils.js';
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        isOpen?: boolean;
        title?: string;
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
        children?: Snippet;
    }

    let {
        isOpen = $bindable(false),
        title = '',
        onclick,
        onkeydown,
        children,
        ...restProps
    }: Props = $props();

    const slideTitleId = generateId('slideup-title');

    let slideUpContainer = $state<HTMLDivElement>();
    let focusActive = false;

    /** Ref-counted on `<body>`; shares the counter with Modal so nested overlays unlock once. */
    function lockBodyScroll(): () => void {
        const body = document.body;
        const count = Number(body.dataset.zabiScrollLock ?? '0');
        if (count === 0) {
            body.dataset.zabiScrollLockOverflow = body.style.overflow;
            body.style.overflow = 'hidden';
        }
        body.dataset.zabiScrollLock = String(count + 1);
        return () => {
            const next = Number(body.dataset.zabiScrollLock ?? '1') - 1;
            if (next <= 0) {
                body.style.overflow = body.dataset.zabiScrollLockOverflow ?? '';
                delete body.dataset.zabiScrollLock;
                delete body.dataset.zabiScrollLockOverflow;
            } else {
                body.dataset.zabiScrollLock = String(next);
            }
        };
    }

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
            const t = setTimeout(() => {
                focusFirstElement(container);
            }, 0);
            return () => {
                clearTimeout(t);
                unlockScroll();
                if (focusActive) {
                    focusActive = false;
                    returnFocus();
                }
            };
        }
    });

    /** Re-queries focusables on every Tab so late-rendered content stays inside the trap. */
    function handleTrapKeydown(event: KeyboardEvent) {
        const container = slideUpContainer;
        if (event.key !== 'Tab' || !container) return;
        const owner = (event.target as Element | null)?.closest?.('[role="dialog"]');
        if (owner && owner !== container) return;

        const focusable = getFocusableElements(container);
        if (focusable.length === 0) {
            event.preventDefault();
            container.focus();
            return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (!active || !focusable.includes(active)) {
            event.preventDefault();
            first.focus();
        } else if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
        }
    }

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
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="presentation"
    >
        <div
            bind:this={slideUpContainer}
            class="fixed bottom-0 left-0 right-0 z-modal flex max-h-[90vh] cursor-default flex-col overflow-y-auto rounded-t-3xl border-t border-border-overlay bg-surface-overlay shadow-xl animate-[slideUp_0.3s_ease-out]"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? slideTitleId : undefined}
            tabindex="-1"
            onkeydown={handleTrapKeydown}
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
                        aria-label="Close"
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
