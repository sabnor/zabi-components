<script lang="ts">
    import { zabiCommonStrings } from "../util/zabi-strings.js";
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        saveFocus,
        returnFocus,
        focusFirstElement,
        joinOverlayStack,
        recoverStrayFocus,
    } from '../util/focus-utils.js';
    import {
        followKeyboard,
        lockBodyScroll,
        registerOverlayFooter,
        registerOverlayHeader,
        trapTabKey,
        watchScrollerNeedsFocus,
    } from '../util/overlay.js';
    import { TOUCH_HIT_AREA } from '../util/touch-target.js';
    import { generateId } from "../util/ssr-safe.js";
    import { portal as portalTo } from "../util/portal.js";
    import Card from '../atoms/Card.svelte';
    import CardHeader from '../atoms/CardHeader.svelte';
    import CardContent from '../atoms/CardContent.svelte';
    import CardFooter from '../atoms/CardFooter.svelte';

    import { cn } from "../util/cn.js";
    import {
        OVERLAY_CHROME,
        OVERLAY_CLOSE_GLYPH,
        OVERLAY_TITLE_2XL,
        OVERLAY_TITLE_HYPHENS,
        OVERLAY_TITLE_WRAP,
        textIsEnlarged,
    } from "../util/overlay-chrome.js";
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
         * CSS selector, looked up inside the panel, of the control that takes
         * focus when the modal opens (a search field, or the safe choice in a
         * confirmation). Without it, or with no match, the first control does.
         */
        initialFocus?: string;
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
        /**
         * Fills the screen instead of floating over it: for a long form on a
         * phone. `true` at every width; `"mobile"` below 768px only, with the
         * usual dialog from there up. The title and the close button stay at
         * the top, the footer at the bottom, both inside the safe areas, and
         * the content scrolls between them. Everything else is the same
         * dialog: focus, Escape, `dismissible`, `portal`.
         */
        fullScreen?: boolean | 'mobile';
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
        isOpen = $bindable<Exclude<Props["isOpen"], undefined>>(),
        title = '',
        description = '',
        size = 'md',
        role = 'dialog',
        showClose = true,
        closeLabel: closeLabelGiven,
        initialFocus,
        portal = false,
        dismissible = true,
        fullScreen = false,
        class: className = "",
        onclose,
        onclick,
        onkeydown,
        "data-testid": dataTestId = undefined,
        children,
        footer,
        ...restProps
    }: Props = $props();

    /** Words many components share: a `ZabiStringsProvider` above this one may give them; else English. */
    const common = zabiCommonStrings();
    const closeLabel = $derived(closeLabelGiven ?? common().close);

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

    /**
     * What `fullScreen` adds to each part: `all` at every width, `mobile`
     * below `md` only. Both are written out, because a class name put
     * together at run time is one Tailwind never sees.
     *
     * The panel is as tall as the visible screen (`dvh`: the browser's own
     * bars are not counted) and the content scrolls inside it, so the header
     * and the footer stay where they are. The content keeps 120px at least:
     * when the header and the footer leave less (a long title in very large
     * text on a small screen), the panel scrolls as a whole instead, and the
     * footer is reached by scrolling rather than not at all. The gutters are
     * in px: at 320px with enlarged text, a gutter that grew with the text
     * would leave a form no room. Each is at least the safe-area inset on its
     * side.
     */
    const FULL_SCREEN = {
        backdrop: { all: 'md:p-0', mobile: '' },
        panel: {
            all: 'h-dvh max-h-none rounded-none border-0 md:w-full md:rounded-none',
            mobile: 'max-md:h-dvh max-md:max-h-none max-md:rounded-none max-md:border-0',
        },
        card: {
            all: 'flex min-h-0 flex-1 flex-col rounded-none md:rounded-none',
            mobile: 'max-md:flex max-md:min-h-0 max-md:flex-1 max-md:flex-col max-md:rounded-none',
        },
        header: {
            all: 'shrink-0 border-b border-border pt-[max(24px,calc(env(safe-area-inset-top,0px)_+_8px))] pr-[max(24px,env(safe-area-inset-right,0px))] pl-[max(24px,env(safe-area-inset-left,0px))]',
            mobile: 'max-md:shrink-0 max-md:border-b max-md:border-border max-md:pt-[max(24px,calc(env(safe-area-inset-top,0px)_+_8px))] max-md:pr-[max(24px,env(safe-area-inset-right,0px))] max-md:pl-[max(24px,env(safe-area-inset-left,0px))]',
        },
        content: {
            all: 'flex min-h-[120px] flex-col',
            mobile: 'max-md:flex max-md:min-h-[120px] max-md:flex-col',
        },
        /** From `md` up, `mobile` restates the padding of the usual dialog. */
        scroller: {
            all: 'min-h-0 flex-1 overflow-y-auto overscroll-contain pr-[max(24px,env(safe-area-inset-right,0px))] pl-[max(24px,env(safe-area-inset-left,0px))]',
            mobile: 'max-md:min-h-0 max-md:flex-1 max-md:overflow-y-auto max-md:overscroll-contain max-md:pr-[max(24px,env(safe-area-inset-right,0px))] max-md:pl-[max(24px,env(safe-area-inset-left,0px))] md:px-[24px]',
        },
        scrollerBelowHeader: { all: 'pt-[16px]', mobile: 'max-md:pt-[16px]' },
        scrollerAtTop: {
            all: 'pt-[max(24px,calc(env(safe-area-inset-top,0px)_+_8px))]',
            mobile: 'max-md:pt-[max(24px,calc(env(safe-area-inset-top,0px)_+_8px))] md:pt-[24px]',
        },
        scrollerAboveFooter: { all: 'pb-[16px]', mobile: 'max-md:pb-[16px]' },
        scrollerAtBottom: {
            all: 'pb-[max(24px,calc(env(safe-area-inset-bottom,0px)_+_8px))]',
            mobile: 'max-md:pb-[max(24px,calc(env(safe-area-inset-bottom,0px)_+_8px))] md:pb-[24px]',
        },
        footer: {
            all: 'shrink-0 flex-wrap border-t border-border pr-[max(24px,env(safe-area-inset-right,0px))] pb-[max(24px,calc(env(safe-area-inset-bottom,0px)_+_8px))] pl-[max(24px,env(safe-area-inset-left,0px))] group-data-keyboard-open/overlay:pb-[24px]',
            mobile: 'max-md:shrink-0 max-md:flex-wrap max-md:border-t max-md:border-border max-md:pr-[max(24px,env(safe-area-inset-right,0px))] max-md:pb-[max(24px,calc(env(safe-area-inset-bottom,0px)_+_8px))] max-md:pl-[max(24px,env(safe-area-inset-left,0px))] max-md:group-data-keyboard-open/overlay:pb-[24px]',
        },
    } as const;

    const fullScreenMode = $derived(
        fullScreen === 'mobile' ? 'mobile' : fullScreen ? 'all' : null,
    );
    const full = (part: keyof typeof FULL_SCREEN) =>
        fullScreenMode ? FULL_SCREEN[part][fullScreenMode] : '';

    /**
     * The scrolling content of a full-screen modal. With nothing in it that
     * takes focus (a long text), the keyboard could not scroll it, so it is a
     * Tab stop itself for as long as that is true.
     */
    let scroller = $state<HTMLDivElement>();
    let scrollerNeedsFocus = $state(false);

    /**
     * Read as the overlay opens: with the text enlarged, a long word in the
     * title is hyphenated before it is cut (util/overlay-chrome.ts).
     */
    let enlargedText = $state(false);
    $effect(() => {
        if (isOpen) enlargedText = textIsEnlarged();
    });

    $effect(() => {
        const box = scroller;
        if (!isOpen || !box) {
            scrollerNeedsFocus = false;
            return;
        }
        return watchScrollerNeedsFocus(box, (needsFocus) => (scrollerNeedsFocus = needsFocus));
    });

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
                // Something inside has taken focus already (a field that
                // focuses itself as it mounts): leave it there. `initialFocus`
                // is the consumer saying where focus goes, so it still decides.
                const active = document.activeElement;
                const inside = !!active && active !== container && container.contains(active);
                if (inside && !(initialFocus && container.querySelector(initialFocus))) return;
                focusFirstElement(container, initialFocus);
            }, 0);
            // Focus can leave the dialog without a Tab (a confirm that starts
            // loading disables the focused button); the topmost dialog takes
            // Tab and Escape back from `<body>`.
            const stopRecovery = recoverStrayFocus(container, {
                onEscape: (event) => closeModal('escape', event),
            });
            // Where the on-screen keyboard covers the page, the overlay
            // keeps to what is left above it.
            const stopKeyboard = container.parentElement
                ? followKeyboard(container.parentElement)
                : undefined;
            // The footer, for the toast stack to stay off it. The panel holds
            // the Card, and the Card the footer: nothing in the content matches.
            const pinned = footer
                ? container.querySelector<HTMLElement>(':scope > div > footer')
                : null;
            const forgetFooter = pinned ? registerOverlayFooter(pinned) : undefined;
            // And the header, which holds the close button: toasts start below it.
            const top = container.querySelector<HTMLElement>(':scope > div > header');
            const forgetHeader = top ? registerOverlayHeader(top) : undefined;
            return () => {
                clearTimeout(t);
                stopRecovery();
                stopKeyboard?.();
                forgetFooter?.();
                forgetHeader?.();
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
        class={cn(
            "group/overlay fixed inset-0 z-modal flex items-end justify-center bg-overlay p-0 md:items-center md:p-4",
            dismissible ? 'cursor-pointer' : 'cursor-default',
            full('backdrop'),
        )}
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
                // With the keyboard up the root is what is left of the screen: never taller than that.
                "group-data-keyboard-open/overlay:max-h-full",
                "flex max-h-[90dvh] min-w-[320px] cursor-default flex-col overflow-y-auto rounded-t-overlay border border-border-overlay bg-surface-overlay p-0 shadow-lg animate-[slideUp_0.3s_ease-out] motion-reduce:animate-none md:animate-none md:rounded-overlay",
                sizeClasses,
                full('panel'),
                className,
            )}
            {role}
            aria-modal="true"
            aria-labelledby={title ? modalTitleId : undefined}
            aria-describedby={description ? modalDescriptionId : undefined}
            tabindex="-1"
            data-testid={dataTestId}
            data-full-screen={fullScreenMode === 'all' ? 'true' : (fullScreenMode ?? undefined)}
            onkeydown={(event) => trapTabKey(modalContainer, event)}
            {...restProps}
        >
            <!-- The panel owns padding: Card's own p-6 would stack with the header's px-6/pt-6 and indent the title 24px past the body. -->
            <!-- And the corners: the Card sits 1px inside the panel (its
            border), so its radius is the panel's less that pixel, not a
            Card's own 12px. Below `md` the panel is a sheet with square
            bottom corners, and so is the Card. -->
            <Card
                variant="flat"
                fullWidth={false}
                className={cn(
                    "bg-transparent! p-0! rounded-b-none rounded-t-[calc(var(--radius-overlay)-1px)] md:rounded-[calc(var(--radius-overlay)-1px)]",
                    full('card'),
                )}
            >
                {#if title || description || showClose}
                    <!-- Chrome: laid out in px, with a title that stops at 1.3
                    times its size (util/overlay-chrome.ts). The padding of the
                    content and the footer is px with it, so they stay in line. -->
                    <CardHeader
                        {description}
                        descriptionId={description ? modalDescriptionId : undefined}
                        className={cn("px-6 pt-6 pb-4", OVERLAY_CHROME, full('header'))}
                    >
                        <!-- 12px between a long title and the button: the title wraps, the button keeps its size. -->
                        <div class="flex items-center gap-[12px] {title ? 'justify-between' : 'justify-end'}">
                            {#if title}
                                <h2
                                    id={modalTitleId}
                                    class="min-w-0 {OVERLAY_TITLE_2XL} font-normal tracking-normal text-headline {OVERLAY_TITLE_WRAP} {enlargedText ? OVERLAY_TITLE_HYPHENS : ''}"
                                >
                                    {title}
                                </h2>
                            {/if}
                            {#if showClose}
                                <!-- `aria-disabled`, not `disabled` or removed: the button may hold focus when `dismissible` turns false, and a disabled or missing element would drop focus out of the trap. -->
                                <button
                                    type="button"
                                    onclick={(event) => closeModal('close-button', event)}
                                    class="focus-ring pointer-coarse:relative flex size-8 shrink-0 items-center justify-center rounded-control {OVERLAY_CLOSE_GLYPH} text-description transition-colors {TOUCH_HIT_AREA} {dismissible
                                        ? 'cursor-pointer hover:bg-surface-overlay-hover hover:text-headline active:bg-surface-active'
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

                {#if children && fullScreenMode}
                    <!-- The padding is on the box that scrolls, so its scrollbar is at the edge of the screen. -->
                    <CardContent className={cn("flex-1", full('content'))}>
                        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
                        <div
                            bind:this={scroller}
                            data-modal-content
                            class={cn(
                                full('scroller'),
                                full(title || description || showClose ? 'scrollerBelowHeader' : 'scrollerAtTop'),
                                full(footer ? 'scrollerAboveFooter' : 'scrollerAtBottom'),
                                scrollerNeedsFocus &&
                                    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus-ring",
                            )}
                            tabindex={scrollerNeedsFocus ? 0 : undefined}
                            role={scrollerNeedsFocus && title ? "group" : undefined}
                            aria-labelledby={scrollerNeedsFocus && title ? modalTitleId : undefined}
                        >
                            {@render children?.()}
                        </div>
                    </CardContent>
                {:else if children}
                    <CardContent
                        className="flex-1 px-[24px] {title || description || showClose ? '' : 'pt-[24px]'} {footer ? '' : 'pb-[24px]'}"
                    >
                        {@render children?.()}
                    </CardContent>
                {/if}

                {#if footer}
                    <CardFooter className={cn("flex justify-end gap-[12px] p-[24px] pt-[16px]", full('footer'))}>
                        {@render footer?.()}
                    </CardFooter>
                {/if}
            </Card>
        </div>
    </div>
{/if}
