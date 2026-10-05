<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { X } from "@lucide/svelte";
    import { cn } from "../util/cn.js";
    import {
        focusFirstElement,
        getFocusableElements,
        joinOverlayStack,
        recoverStrayFocus,
        returnFocus,
        saveFocus,
    } from "../util/focus-utils.js";
    import {
        followKeyboard,
        lockBodyScroll,
        registerOverlayFooter,
        trapTabKey,
    } from "../util/overlay.js";
    import { TOUCH_HIT_AREA } from "../util/touch-target.js";
    import { portal as portalTo } from "../util/portal.js";
    import { generateId } from "../util/ssr-safe.js";
    import {
        resolveDrawerEdge,
        type DrawerCloseReason,
        type DrawerSide,
        type DrawerSize,
    } from "../util/drawer.js";

    /** Other attributes (`id`, `data-*`, ...) land on the `role="dialog"` panel. */
    type Props = Omit<
        HTMLAttributes<HTMLDivElement>,
        // `onclose` is also a DOM event handler; ours carries a reason instead.
        "class" | "title" | "onclose" | "onkeydown"
    > & {
        isOpen?: boolean;
        /** Heading of the drawer, and its accessible name. */
        title: string;
        description?: string;
        /**
         * The edge the drawer slides in from. `left` and `right` are physical;
         * `start` and `end` follow the writing direction.
         */
        side?: DrawerSide;
        /** Panel width. On a phone the panel is never wider than the screen. */
        size?: DrawerSize;
        /**
         * Render the overlay in `document.body`, so an ancestor with a
         * transform, filter or clipped overflow cannot trap it; pass `false`
         * to render in place. The theme class belongs on `<html>` or `<body>`;
         * set lower, it does not reach a portalled drawer.
         */
        portal?: boolean;
        /**
         * When false, Escape, a backdrop click and the close button do not
         * close the drawer. Focus stays trapped, and setting `isOpen` yourself
         * still closes it.
         */
        dismissible?: boolean;
        /** Fired when the drawer closes itself, with what the user did. */
        onclose?: (detail: { reason: DrawerCloseReason }) => void;
        /**
         * Hears every keydown in the drawer, after the drawer has handled
         * Escape. The Tab cycle is kept either way.
         */
        onkeydown?: (event: KeyboardEvent) => void;
        /** Accessible name of the close button. */
        closeLabel?: string;
        /**
         * CSS selector, looked up inside the panel, of the control that takes
         * focus when the drawer opens (a search field, say). Without it, or
         * with no match, the first control does: the close button.
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
        side = "right",
        size = "md",
        portal = true,
        dismissible = true,
        onclose,
        onkeydown,
        closeLabel = "Close",
        initialFocus,
        class: className = "",
        children,
        footer,
        ...restProps
    }: Props = $props();

    const SLIDE_MS = 200;

    const titleId = generateId("drawer-title");
    const descriptionId = generateId("drawer-description");

    let panel = $state<HTMLDivElement>();
    let scroller = $state<HTMLDivElement>();
    let footerElement = $state<HTMLDivElement>();
    let focusActive = false;
    /**
     * True when the content is taller than its box and holds nothing that can
     * take focus. Only then is the scrolling box itself a Tab stop, so the
     * keyboard can scroll it; content with a control in it is reached, and
     * scrolled, through that control.
     */
    let scrollerNeedsFocus = $state(false);
    /** Position among the open overlays; lifts a drawer opened later above the earlier ones. */
    let depth = $state(0);

    /** `100%` is the overlay, which is the viewport: the cap for phones. */
    const sizeClasses = $derived(
        {
            "sm": "w-[min(100%,20rem)]",
            "md": "w-[min(100%,28rem)]",
            "lg": "w-[min(100%,42rem)]",
        }[size] ?? "w-[min(100%,28rem)]",
    );

    /** The border is on the edge that faces the page. */
    const sideClasses = $derived(
        {
            "left": "left-0 border-r",
            "right": "right-0 border-l",
            "start": "start-0 border-e",
            "end": "end-0 border-s",
        }[side] ?? "right-0 border-l",
    );

    function close(reason: DrawerCloseReason) {
        if (!dismissible) return;
        isOpen = false;
        if (focusActive) {
            focusActive = false;
            returnFocus();
        }
        onclose?.({ reason });
    }

    /** Slides the panel in from its edge. Skipped where motion is unwanted or unsupported. */
    function slideIn(container: HTMLElement) {
        if (typeof container.animate !== "function") return;
        if (
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }
        const rtl = getComputedStyle(container).direction === "rtl";
        const from = resolveDrawerEdge(side, rtl) === "left" ? "-100%" : "100%";
        container.animate(
            [{ transform: `translateX(${from})` }, { transform: "translateX(0)" }],
            { duration: SLIDE_MS, easing: "ease-out" },
        );
    }

    $effect(() => {
        const box = scroller;
        if (!isOpen || !box) {
            scrollerNeedsFocus = false;
            return;
        }
        const measure = () => {
            scrollerNeedsFocus =
                box.scrollHeight > box.clientHeight &&
                getFocusableElements(box).length === 0;
        };
        measure();
        // The answer changes with the viewport and with the content.
        const resize =
            typeof ResizeObserver === "function" ? new ResizeObserver(measure) : undefined;
        resize?.observe(box);
        const mutation = new MutationObserver(measure);
        mutation.observe(box, { childList: true, subtree: true, characterData: true });
        return () => {
            resize?.disconnect();
            mutation.disconnect();
        };
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
                focusFirstElement(container, initialFocus);
            }, 0);
            // If the focused control is disabled or removed, focus lands on
            // `<body>`; take Tab and Escape back from there.
            const stopRecovery = recoverStrayFocus(container, {
                onEscape: () => close("escape"),
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

    // For the toast stack, which stays off a pinned footer.
    $effect(() => {
        const pinned = footerElement;
        if (!isOpen || !pinned) return;
        return registerOverlayFooter(pinned);
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
        // The caller's handler, as in Modal: it listens, the trap on the
        // panel is separate and cannot be replaced by it.
        onkeydown?.(event);
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        class="group/overlay fixed inset-0 z-modal overflow-hidden {dismissible ? 'cursor-pointer' : 'cursor-default'} bg-overlay"
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
                "absolute inset-y-0 flex cursor-default flex-col border-border-overlay bg-surface-overlay shadow-lg",
                sizeClasses,
                sideClasses,
                className,
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabindex="-1"
            data-side={side}
            {...restProps}
            onkeydown={(event) => trapTabKey(panel, event)}
        >
            <div class="flex items-start justify-between gap-4 px-6 pb-3 pt-6">
                <div class="min-w-0 flex-1">
                    <h2
                        id={titleId}
                        class="text-2xl font-normal leading-8 tracking-normal text-headline"
                    >
                        {title}
                    </h2>
                    {#if description}
                        <p id={descriptionId} class="mt-1 text-sm text-description">
                            {description}
                        </p>
                    {/if}
                </div>
                <!-- `aria-disabled`, not `disabled` or removed: the button may hold focus when `dismissible` turns false, and a disabled or missing element would drop focus out of the trap. -->
                <!-- On a touch screen the hit area grows to 44px around the
                same 32px box. The 6px it adds each way stays inside the
                header's padding and the 16px gap to the title. -->
                <button
                    type="button"
                    onclick={() => close("close-button")}
                    class="focus-ring relative flex size-8 shrink-0 items-center justify-center rounded-control text-description transition-colors motion-reduce:transition-none {TOUCH_HIT_AREA} {dismissible
                        ? 'cursor-pointer hover:bg-surface-overlay-hover hover:text-headline active:bg-surface-active'
                        : 'cursor-not-allowed opacity-50'}"
                    aria-label={closeLabel}
                    aria-disabled={dismissible ? undefined : "true"}
                >
                    <X size={20} aria-hidden="true" />
                </button>
            </div>

            <!-- `pt-1`: a scroll container clips, and the focus ring of a
            first control needs the room. -->
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <div
                bind:this={scroller}
                class={cn(
                    "min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-1",
                    // Inset: a ring outside the box would be cut off at
                    // the screen edge the drawer sits on.
                    scrollerNeedsFocus &&
                        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus-ring",
                )}
                tabindex={scrollerNeedsFocus ? 0 : undefined}
                role={scrollerNeedsFocus ? "group" : undefined}
                aria-labelledby={scrollerNeedsFocus ? titleId : undefined}
            >
                {@render children?.()}
            </div>

            {#if footer}
                <div
                    bind:this={footerElement}
                    class="flex shrink-0 justify-end gap-3 border-t border-border-overlay px-6 py-4"
                >
                    {@render footer()}
                </div>
            {/if}
        </div>
    </div>
{/if}
