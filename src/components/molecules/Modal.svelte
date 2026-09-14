<script lang="ts">
    import type { Snippet } from 'svelte';
    import {
        getFocusableElements,
        saveFocus,
        returnFocus,
        focusFirstElement,
    } from '../util/focus-utils.js';
    import { generateId } from "../util/ssr-safe.js";
    import Card from '../atoms/Card.svelte';
    import CardHeader from '../atoms/CardHeader.svelte';
    import CardContent from '../atoms/CardContent.svelte';
    import CardFooter from '../atoms/CardFooter.svelte';

    type Size = 'sm' | 'md' | 'lg';

    interface Props {
        isOpen?: boolean;
        title?: string;
        description?: string;
        size?: Size;
        /** Render the close button even when there is no `title`. */
        showClose?: boolean;
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
        /** On the `role="dialog"` panel (testing, analytics). */
        "data-testid"?: string;
        children?: Snippet;
        footer?: Snippet;
    }

    let {
        isOpen = $bindable(false),
        title = '',
        description = '',
        size = 'md',
        showClose = true,
        onclick,
        onkeydown,
        "data-testid": dataTestId = undefined,
        children,
        footer,
        ...restProps
    }: Props = $props();

    const modalTitleId = generateId('modal-title');
    const modalDescriptionId = generateId('modal-description');

    let modalContainer = $state<HTMLDivElement>();
    let focusActive = false;

    const sizeClasses = $derived(
        {
            sm: 'w-full md:w-[24rem]',
            md: 'w-full md:w-[28rem]',
            lg: 'w-full md:w-[42rem]',
        }[size] || 'w-full md:w-[28rem]',
    );

    /** Ref-counted on `<body>` so nested Modal/SlideUp overlays share one lock. */
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

    function closeModal(event?: Event) {
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
        const container = modalContainer;
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

    /** Re-queries focusables on every Tab so content added while open stays inside the trap. */
    function handleTrapKeydown(event: KeyboardEvent) {
        const container = modalContainer;
        if (event.key !== 'Tab' || !container) return;
        // A nested dialog handles its own Tab cycle.
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
            closeModal(event);
        }
    }

    function handleKeydown(event: Event) {
        const keyboardEvent = event as KeyboardEvent;
        // `defaultPrevented` means a nested dialog already closed itself.
        if (keyboardEvent.key === 'Escape' && !keyboardEvent.defaultPrevented) {
            keyboardEvent.preventDefault();
            closeModal(event);
        }
        onkeydown?.(event);
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        class="fixed inset-0 z-modal flex cursor-pointer items-end justify-center bg-overlay p-0 md:items-center md:p-4"
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="presentation"
    >
        <div
            bind:this={modalContainer}
            class="flex max-h-[90vh] min-w-[320px] cursor-default flex-col overflow-y-auto rounded-t-3xl border border-border-overlay bg-surface-overlay p-0 shadow-xl animate-[slideUp_0.3s_ease-out] md:animate-none md:rounded-3xl {sizeClasses}"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? modalTitleId : undefined}
            aria-describedby={description ? modalDescriptionId : undefined}
            tabindex="-1"
            data-testid={dataTestId}
            onkeydown={handleTrapKeydown}
            {...restProps}
        >
            <!-- The panel owns padding: Card's own p-6 would stack with the header's px-6/pt-6 and indent the title 24px past the body. -->
            <Card variant="flat" fullWidth={false} className="bg-transparent! p-0!">
                {#if title || description || showClose}
                    <CardHeader
                        {description}
                        descriptionId={description ? modalDescriptionId : undefined}
                        className="px-6 pt-6 pb-4"
                    >
                        <div class="flex items-center {title ? 'justify-between' : 'justify-end'}">
                            {#if title}
                                <h2
                                    id={modalTitleId}
                                    class="text-2xl font-normal leading-8 tracking-normal text-headline"
                                >
                                    {title}
                                </h2>
                            {/if}
                            {#if showClose}
                                <button
                                    type="button"
                                    onclick={closeModal}
                                    class="focus-ring flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-2xl text-description transition-colors hover:bg-surface-overlay-hover hover:text-headline"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            {/if}
                        </div>
                    </CardHeader>
                {/if}

                {#if children}
                    <CardContent
                        className="flex-1 px-6 {title || description || showClose ? '' : 'pt-6'} {footer ? '' : 'pb-6'}"
                    >
                        {@render children?.()}
                    </CardContent>
                {/if}

                {#if footer}
                    <CardFooter className="flex justify-end gap-3 pt-4">
                        {@render footer?.()}
                    </CardFooter>
                {/if}
            </Card>
        </div>
    </div>
{/if}
