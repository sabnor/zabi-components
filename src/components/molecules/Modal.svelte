<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        DIALOG_SELECTOR,
        getFocusableElements,
        saveFocus,
        returnFocus,
        focusFirstElement,
        joinOverlayStack,
        recoverStrayFocus,
    } from '../util/focus-utils.js';
    import { generateId } from "../util/ssr-safe.js";
    import { portal as portalTo } from "../util/portal.js";
    import Card from '../atoms/Card.svelte';
    import CardHeader from '../atoms/CardHeader.svelte';
    import CardContent from '../atoms/CardContent.svelte';
    import CardFooter from '../atoms/CardFooter.svelte';

    import { cn } from "../util/cn.js";
    type Size = 'sm' | 'md' | 'lg';
    type CloseReason = 'escape' | 'backdrop' | 'close-button';

    /**
     * Anything else is an attribute of the dialog panel (`aria-describedby`,
     * `aria-busy`, `data-*`, `id`), which is where it is spread.
     */
    type Props = Omit<
        HTMLAttributes<HTMLDivElement>,
        'class' | 'title' | 'role' | 'onclick' | 'onkeydown' | 'onclose' | 'children'
    > & {
        isOpen?: boolean;
        title?: string;
        description?: string;
        size?: Size;
        /**
         * `alertdialog` for a dialog that interrupts to ask for a response,
         * such as a confirmation. Focus handling is the same for both.
         */
        role?: 'dialog' | 'alertdialog';
        /** Render the close button even when there is no `title`. */
        showClose?: boolean;
        /** Accessible name of the close button. */
        closeLabel?: string;
        /**
         * Render the overlay in `document.body` instead of in place, so an
         * ancestor with a transform, filter or clipped overflow cannot trap it.
         * The theme class belongs on `<html>` or `<body>`; set lower, it does
         * not reach a portalled modal.
         */
        portal?: boolean;
        /**
         * When false, Escape, a backdrop click and the close button do not
         * close the modal (a pending confirm, say). Focus stays trapped, and
         * setting `isOpen` yourself still closes it.
         */
        dismissible?: boolean;
        /** Fired when the modal closes itself, with what the user did. */
        onclose?: (detail: { reason: CloseReason }) => void;
        /**
         * @deprecated for close reporting: use `onclose`. Still called with the
         * event on Escape, a backdrop click and the close button.
         */
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
        /** On the `role="dialog"` panel (testing, analytics). */
        "data-testid"?: string;
        /** Extra classes for the dialog panel. */
        class?: string;
        children?: Snippet;
        footer?: Snippet;
    };

    let {
        isOpen = $bindable(false),
        title = '',
        description = '',
        size = 'md',
        role = 'dialog',
        showClose = true,
        closeLabel = 'Close',
        portal = false,
        dismissible = true,
        class: className = "",
        onclose,
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
    /** Position among the open overlays; lifts a modal opened later above the earlier ones. */
    let depth = $state(0);

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

    function closeModal(reason: CloseReason, event?: Event) {
        if (!dismissible) return;
        isOpen = false;
        if (focusActive) {
            focusActive = false;
            returnFocus();
        }
        if (onclick && event) {
            onclick(event);
        }
        onclose?.({ reason });
    }

    $effect(() => {
        const container = modalContainer;
        if (isOpen && container) {
            saveFocus();
            focusActive = true;
            const unlockScroll = lockBodyScroll();
            const overlay = joinOverlayStack(container);
            depth = overlay.depth;
            const t = setTimeout(() => {
                focusFirstElement(container);
            }, 0);
            // Focus can leave the dialog without a Tab (a confirm that starts
            // loading disables the focused button); the topmost dialog takes
            // Tab and Escape back from `<body>`.
            const stopRecovery = recoverStrayFocus(container, {
                onEscape: (event) => closeModal('escape', event),
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

    /** Re-queries focusables on every Tab so content added while open stays inside the trap. */
    function handleTrapKeydown(event: KeyboardEvent) {
        const container = modalContainer;
        if (event.key !== 'Tab' || !container) return;
        // A nested dialog handles its own Tab cycle.
        const owner = (event.target as Element | null)?.closest?.(DIALOG_SELECTOR);
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
            closeModal('backdrop', event);
        }
    }

    function handleKeydown(event: Event) {
        const keyboardEvent = event as KeyboardEvent;
        // `defaultPrevented` means a nested dialog already handled the key:
        // it closed itself, or it is not dismissible and must keep its parent open.
        if (keyboardEvent.key === 'Escape' && !keyboardEvent.defaultPrevented) {
            keyboardEvent.preventDefault();
            closeModal('escape', event);
        }
        onkeydown?.(event);
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        class="fixed inset-0 z-modal flex {dismissible ? 'cursor-pointer' : 'cursor-default'} items-end justify-center bg-overlay p-0 md:items-center md:p-4"
        style:z-index={depth > 0 ? `calc(var(--z-modal) + ${depth})` : undefined}
        data-overlay-depth={depth}
        use:portalTo={portal}
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="presentation"
    >
        <div
            bind:this={modalContainer}
            class={cn(
                "flex max-h-[90vh] min-w-[320px] cursor-default flex-col overflow-y-auto rounded-t-overlay border border-border-overlay bg-surface-overlay p-0 shadow-lg animate-[slideUp_0.3s_ease-out] motion-reduce:animate-none md:animate-none md:rounded-overlay",
                sizeClasses,
                className,
            )}
            {role}
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
                                <!-- `aria-disabled`, not `disabled` or removed: the button may hold focus when `dismissible` turns false, and a disabled or missing element would drop focus out of the trap. -->
                                <button
                                    type="button"
                                    onclick={(event) => closeModal('close-button', event)}
                                    class="focus-ring flex size-8 items-center justify-center rounded-control text-2xl text-description transition-colors {dismissible
                                        ? 'cursor-pointer hover:bg-surface-overlay-hover hover:text-headline'
                                        : 'cursor-not-allowed opacity-50'}"
                                    aria-label={closeLabel}
                                    aria-disabled={dismissible ? undefined : "true"}
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
