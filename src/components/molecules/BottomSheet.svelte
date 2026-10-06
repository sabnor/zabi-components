<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import X from "@lucide/svelte/icons/x";
    import {
        nextSnap,
        normaliseSnapPoints,
        settleSnap,
        type BottomSheetCloseReason,
        type BottomSheetSnap,
    } from "../util/bottom-sheet.js";
    import { cn } from "../util/cn.js";
    import {
        OVERLAY_CHROME,
        OVERLAY_TITLE_HYPHENS,
        OVERLAY_TITLE_WRAP,
        OVERLAY_TITLE_XL,
        textIsEnlarged,
    } from "../util/overlay-chrome.js";
    import {
        focusFirstElement,
        joinOverlayStack,
        recoverStrayFocus,
        returnFocus,
        saveFocus,
    } from "../util/focus-utils.js";
    import {
        followKeyboard,
        lockBodyScroll,
        registerOverlayFooter,
        registerOverlayHeader,
        trapTabKey,
        watchScrollerNeedsFocus,
    } from "../util/overlay.js";
    import { portal as portalTo } from "../util/portal.js";
    import { attachSheetDrag, FLICK_VELOCITY, prefersReducedMotion } from "../util/sheet-drag.js";
    import { generateId } from "../util/ssr-safe.js";

    /**
     * A panel that slides up from the bottom of the screen for a picker, a
     * set of filters or a short form, and rests at half or full height.
     *
     * It is a modal dialog, on the same footing as Modal, SlideUp and Drawer:
     * focus moves in and stays in, the page behind does not scroll, and
     * Escape, the backdrop, the close button or a swipe down close it and
     * return focus to what opened it.
     *
     * ```svelte
     * <BottomSheet bind:isOpen title="Filters" bind:snap>
     *     …
     *     {#snippet footer()}
     *         <Button onclick={apply}>Show results</Button>
     *     {/snippet}
     * </BottomSheet>
     * ```
     *
     * The grip at the top drags the sheet between its snap points and, past
     * the lowest, closed. It is also a button that moves the sheet a step, so
     * the same is there for a keyboard and a screen reader. A swipe on the
     * content scrolls the content; it moves the sheet only when the content
     * is at its top and the swipe goes down.
     *
     * From the `md` breakpoint up the sheet is still attached to the bottom
     * edge, centred and no wider than 40rem.
     *
     * Other attributes (`id`, `data-*`, ...) land on the `role="dialog"` panel.
     */
    type Props = Omit<
        HTMLAttributes<HTMLDivElement>,
        // `onclose` is also a DOM event handler; ours carries a reason instead.
        "class" | "title" | "onclose" | "onkeydown"
    > & {
        isOpen?: boolean;
        /** Heading of the sheet, and its accessible name. */
        title: string;
        description?: string;
        /**
         * The heights the sheet can rest at: `half` of the screen, `full`
         * down from the status bar. With one, the grip only drags.
         */
        snapPoints?: BottomSheetSnap[];
        /**
         * The snap point the sheet is at. Bindable. It opens at the one you
         * pass, or at the lowest of `snapPoints`. It is kept while the sheet
         * is closed: one left at `full` opens at `full` again, bound or not.
         * Set it when you open the sheet to start somewhere else.
         */
        snap?: BottomSheetSnap;
        /**
         * Render the overlay in `document.body`, so an ancestor with a
         * transform, filter or clipped overflow cannot trap it; pass `false`
         * to render in place. The theme class belongs on `<html>` or `<body>`;
         * set lower, it does not reach a portalled sheet.
         */
        portal?: boolean;
        /**
         * When false, Escape, a backdrop click, the close button and a swipe
         * down do not close the sheet. Focus stays trapped, the grip still
         * moves it between snap points, and setting `isOpen` yourself still
         * closes it.
         */
        dismissible?: boolean;
        /** Fired when the sheet closes itself, with what the user did. */
        onclose?: (detail: { reason: BottomSheetCloseReason }) => void;
        /**
         * Hears every keydown in the sheet, after the sheet has handled
         * Escape. The Tab cycle is kept either way.
         */
        onkeydown?: (event: KeyboardEvent) => void;
        /** Accessible name of the close button. */
        closeLabel?: string;
        /** Accessible name of the grip while its button takes the sheet up a step. */
        expandLabel?: string;
        /** Accessible name of the grip while its button takes the sheet down a step. */
        collapseLabel?: string;
        /**
         * CSS selector, looked up inside the panel, of the control that takes
         * focus when the sheet opens (a search field, say). Without it, or
         * with no match, the first control does: the grip, or the close button.
         */
        initialFocus?: string;
        /** Extra classes for the dialog panel. */
        class?: string;
        children?: Snippet;
        /** Pinned to the bottom of the panel, below the scrolling content. */
        footer?: Snippet;
    };

    let {
        isOpen = $bindable(false),
        title,
        description = "",
        snapPoints,
        snap = $bindable(),
        portal = true,
        dismissible = true,
        onclose,
        onkeydown,
        closeLabel = "Close",
        expandLabel = "Expand",
        collapseLabel = "Collapse",
        initialFocus,
        class: className = "",
        children,
        footer,
        ...restProps
    }: Props = $props();

    const SLIDE_MS = 200;

    const titleId = generateId("bottom-sheet-title");
    const descriptionId = generateId("bottom-sheet-description");

    let root = $state<HTMLDivElement>();
    let panel = $state<HTMLDivElement>();
    let header = $state<HTMLDivElement>();
    let scroller = $state<HTMLDivElement>();
    let footerElement = $state<HTMLDivElement>();

    /**
     * Read as the overlay opens: with the text enlarged, a long word in the
     * title is hyphenated before it is cut (util/overlay-chrome.ts).
     */
    let enlargedText = $state(false);
    $effect(() => {
        if (isOpen) enlargedText = textIsEnlarged();
    });
    let focusActive = false;
    let scrollerNeedsFocus = $state(false);
    /** Position among the open overlays; lifts a sheet opened later above the earlier ones. */
    let depth = $state(0);

    const points = $derived(normaliseSnapPoints(snapPoints));
    /** The snap point in effect: the one asked for if it is in use, else the lowest. */
    const currentSnap = $derived(snap && points.includes(snap) ? snap : points[0]);
    const stepTo = $derived(nextSnap(points, currentSnap));

    /**
     * `100%` is the overlay, which is the viewport. Full height stops at the
     * status bar, so the close button stays in reach; half is never so low
     * that a short screen leaves no room for content, and never above full.
     */
    const FULL = "calc(100% - env(safe-area-inset-top, 0px))";
    const snapHeight = $derived(
        currentSnap === "full" ? FULL : `min(max(50%, 18rem), ${FULL})`,
    );

    /** While a drag is on: the height and offset it has moved the panel to, in px. */
    let dragging = $state(false);
    let dragHeight = $state<number | null>(null);
    let dragOffset = $state(0);

    function close(reason: BottomSheetCloseReason) {
        if (!dismissible) return;
        isOpen = false;
        if (focusActive) {
            focusActive = false;
            returnFocus();
        }
        onclose?.({ reason });
    }

    /** Slides the panel up from the bottom edge. Skipped where motion is unwanted or unsupported. */
    function slideIn(container: HTMLElement) {
        if (typeof container.animate !== "function" || prefersReducedMotion()) return;
        container.animate(
            [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
            { duration: SLIDE_MS, easing: "ease-out" },
        );
    }

    /** The snap points in px, lowest first, for the screen as it is now. */
    function measureSnapHeights(): number[] {
        if (!root) return [];
        const available = root.clientHeight - parseFloat(getComputedStyle(root).paddingTop || "0");
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const half = Math.min(Math.max(root.clientHeight * 0.5, 18 * rem), available);
        return points.map((point) => (point === "full" ? available : half));
    }

    function stepSnap() {
        if (stepTo) snap = stepTo;
    }

    $effect(() => {
        const box = scroller;
        if (!isOpen || !box) {
            scrollerNeedsFocus = false;
            return;
        }
        return watchScrollerNeedsFocus(box, (needsFocus) => (scrollerNeedsFocus = needsFocus));
    });

    // Where the on-screen keyboard covers the page, the overlay keeps to what
    // is left above it. The snap heights are shares of the overlay, so half
    // is half of what can be seen, and the footer stays above the keyboard.
    $effect(() => {
        const overlay = root;
        if (!isOpen || !overlay) return;
        return followKeyboard(overlay);
    });

    // For the toast stack, which stays off a pinned footer.
    $effect(() => {
        const pinned = footerElement;
        if (!isOpen || !pinned) return;
        return registerOverlayFooter(pinned);
    });

    // And the header, with the close button, which the stack starts below.
    $effect(() => {
        const top = header;
        if (!isOpen || !top) return;
        return registerOverlayHeader(top);
    });

    $effect(() => {
        const container = panel;
        if (isOpen && container) {
            saveFocus();
            focusActive = true;
            const unlockScroll = lockBodyScroll();
            const overlay = joinOverlayStack(container);
            depth = overlay.depth;
            slideIn(container);
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
                onEscape: () => close("escape"),
            });
            return () => {
                clearTimeout(t);
                stopRecovery();
                overlay.leave();
                unlockScroll();
                dragging = false;
                dragHeight = null;
                dragOffset = 0;
                if (focusActive) {
                    focusActive = false;
                    returnFocus();
                }
            };
        }
    });

    $effect(() => {
        const zone = header;
        const container = panel;
        if (!isOpen || !zone || !container) return;

        let heights: number[] = [];
        let startHeight = 0;
        let startIndex = 0;

        /** How much of the sheet shows after the pointer has moved `distance` down. */
        const shown = (distance: number) =>
            Math.min(Math.max(startHeight - distance, 0), heights[heights.length - 1]);

        return attachSheetDrag(
            { handleZone: zone, scroller },
            {
                onStart() {
                    heights = measureSnapHeights();
                    startHeight = container.getBoundingClientRect().height;
                    startIndex = points.indexOf(currentSnap);
                    dragging = true;
                },
                onMove(distance) {
                    const height = shown(distance);
                    const lowest = heights[0];
                    if (height >= lowest) {
                        dragHeight = height;
                        dragOffset = 0;
                        return;
                    }
                    // Below the lowest snap point the sheet keeps its size and
                    // slides off; one that cannot be closed only gives a little.
                    dragHeight = lowest;
                    dragOffset = (lowest - height) * (dismissible ? 1 : 0.2);
                },
                onEnd(distance, velocity) {
                    const index = settleSnap({
                        heights,
                        startIndex,
                        height: shown(distance),
                        velocity,
                        flick: FLICK_VELOCITY,
                        canClose: dismissible,
                    });
                    dragging = false;
                    dragHeight = null;
                    dragOffset = 0;
                    if (index === -1) close("swipe");
                    else snap = points[index];
                },
                onCancel() {
                    dragging = false;
                    dragHeight = null;
                    dragOffset = 0;
                },
            },
        );
    });

    function handleBackdropClick(event: Event) {
        if (event.target === event.currentTarget) close("backdrop");
    }

    function handleKeydown(event: KeyboardEvent) {
        // `defaultPrevented` means a nested dialog already handled the key.
        // Prevented here even when not dismissible, so a dialog underneath
        // does not take the Escape as its own.
        if (event.key === "Escape" && !event.defaultPrevented) {
            event.preventDefault();
            close("escape");
        }
        onkeydown?.(event);
    }

    /**
     * 44px wide and tall in px: the target must not shrink, and need not grow
     * with the text. It is flush with the top edge of the panel, so it has
     * the panel's radius; that also clears the mark inside it, a 4px pill
     * 10px in (2px + 10px).
     */
    const gripClasses =
        "absolute top-0 left-1/2 flex h-[44px] w-[80px] -translate-x-1/2 cursor-grab items-start justify-center rounded-overlay pt-[10px] active:cursor-grabbing";
</script>

<!-- The bar of the grip. Drawn in the text colour where colours are forced:
a background is dropped there, and the grip would be gone. -->
{#snippet gripMark()}
    <span
        class="block h-1 w-9 rounded-pill bg-current text-description forced-colors:bg-[CanvasText]"
        aria-hidden="true"
    ></span>
{/snippet}

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        bind:this={root}
        class="group/overlay fixed inset-0 z-modal overflow-hidden pt-[env(safe-area-inset-top)] {dismissible
            ? 'cursor-pointer'
            : 'cursor-default'} bg-overlay"
        style:z-index={depth > 0 ? `calc(var(--z-modal) + ${depth})` : undefined}
        data-overlay-depth={depth}
        use:portalTo={portal}
        onclick={handleBackdropClick}
        onkeydown={handleKeydown}
        role="presentation"
    >
        <div
            bind:this={panel}
            class={cn(
                "absolute inset-x-0 bottom-0 mx-auto flex w-full cursor-default flex-col rounded-t-overlay border-t border-border-overlay bg-surface-overlay shadow-lg",
                "max-h-[calc(100dvh-env(safe-area-inset-top,0px))] pb-[env(safe-area-inset-bottom)]",
                // Over the keyboard: no taller than what is left, and the home
                // indicator it would clear is under the keyboard.
                "group-data-keyboard-open/overlay:max-h-[calc(100%_-_env(safe-area-inset-top,0px))] group-data-keyboard-open/overlay:pb-0",
                // Clear of the notch and the rounded corners in landscape.
                "pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
                "transition-[height,transform] duration-200 ease-out motion-reduce:transition-none",
                "md:w-[min(100%,40rem)] md:border-x",
                className,
            )}
            style:height={dragHeight !== null ? `${dragHeight}px` : snapHeight}
            style:transform={dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined}
            style:transition={dragging ? "none" : undefined}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabindex="-1"
            data-snap={currentSnap}
            data-dragging={dragging ? "true" : undefined}
            {...restProps}
            onkeydown={(event) => trapTabKey(panel, event)}
        >
            <!-- The whole header drags the sheet, in both directions.
            `touch-none`: otherwise the browser takes a touch here for itself.
            Chrome: laid out in px, with a title that stops at 1.3 times its
            size (util/overlay-chrome.ts). The gutters of the content and
            the footer are px with it, so the three stay in line. -->
            <div bind:this={header} class="relative shrink-0 touch-none px-4 pt-7 pb-3 {OVERLAY_CHROME}">
                {#if stepTo}
                    <button
                        type="button"
                        data-sheet-grip
                        class={cn("focus-ring", gripClasses)}
                        aria-label={stepTo === "full" ? expandLabel : collapseLabel}
                        onclick={stepSnap}
                    >
                        {@render gripMark()}
                    </button>
                {:else}
                    <div data-sheet-grip class={gripClasses}>
                        {@render gripMark()}
                    </div>
                {/if}
                <div class="flex items-start justify-between gap-[8px]">
                    <div class="min-w-0 flex-1">
                        <h2
                            id={titleId}
                            class="{OVERLAY_TITLE_XL} font-semibold text-headline {OVERLAY_TITLE_WRAP} {enlargedText ? OVERLAY_TITLE_HYPHENS : ''}"
                        >
                            {title}
                        </h2>
                    </div>
                    <!-- `aria-disabled`, not `disabled` or removed: the button may hold focus when `dismissible` turns false, and a disabled or missing element would drop focus out of the trap. -->
                    <!-- 8px in from the end edge of the panel: its radius
                    (control) plus that is the panel's (overlay). -->
                    <button
                        type="button"
                        onclick={() => close("close-button")}
                        class="focus-ring -mt-2 -me-2 flex size-11 shrink-0 items-center justify-center rounded-control text-description transition-colors motion-reduce:transition-none {dismissible
                            ? 'cursor-pointer hover:bg-surface-overlay-hover hover:text-headline'
                            : 'cursor-not-allowed opacity-50'}"
                        aria-label={closeLabel}
                        aria-disabled={dismissible ? undefined : "true"}
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>
            </div>

            <!-- `pt-1`: a scroll container clips, and the focus ring of a
            first control needs the room. `overscroll-contain`: the page
            behind must not take over when the content reaches an end. -->
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <div
                bind:this={scroller}
                data-bottom-sheet-content
                class={cn(
                    "min-h-0 flex-1 overflow-y-auto overscroll-contain px-[16px] pt-[4px] pb-[16px]",
                    scrollerNeedsFocus &&
                        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus-ring",
                )}
                tabindex={scrollerNeedsFocus ? 0 : undefined}
                role={scrollerNeedsFocus ? "group" : undefined}
                aria-labelledby={scrollerNeedsFocus ? titleId : undefined}
            >
                <!-- With the content, not in the header: at half height on a
                small screen every fixed line is taken from the content. -->
                {#if description}
                    <p id={descriptionId} class="mb-3 text-sm text-description">
                        {description}
                    </p>
                {/if}
                {@render children?.()}
            </div>

            {#if footer}
                <div
                    bind:this={footerElement}
                    class="flex shrink-0 flex-wrap justify-end gap-[8px] border-t border-border-overlay px-[16px] py-[12px]"
                >
                    {@render footer()}
                </div>
            {/if}
        </div>
    </div>
{/if}
