<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { X } from "@lucide/svelte";
    import { cn } from "../util/cn.js";
    import {
        DIALOG_SELECTOR,
        getFocusableElements,
        recoverStrayFocus,
        returnFocus,
        saveFocus,
    } from "../util/focus-utils.js";
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
        "class" | "title" | "onclose"
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
         * transform, filter or clipped overflow cannot trap it. A theme class
         * set below `body` does not reach a portalled drawer; pass `false` to
         * render in place.
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
    let focusActive = false;

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

    // ── Shared overlay contract ─────────────────────────────────────────
    // The next two functions are copies of the private ones in Modal.svelte,
    // kept identical so the overlays interoperate: the lock counter on
    // `<body>` is the contract. Replace them with a shared util once Modal's
    // are factored out.

    /** Ref-counted on `<body>`; shares the counter with Modal and SlideUp so nested overlays unlock once. */
    function lockBodyScroll(): () => void {
        const body = document.body;
        const count = Number(body.dataset.zabiScrollLock ?? "0");
        if (count === 0) {
            body.dataset.zabiScrollLockOverflow = body.style.overflow;
            body.style.overflow = "hidden";
        }
        body.dataset.zabiScrollLock = String(count + 1);
        return () => {
            const next = Number(body.dataset.zabiScrollLock ?? "1") - 1;
            if (next <= 0) {
                body.style.overflow = body.dataset.zabiScrollLockOverflow ?? "";
                delete body.dataset.zabiScrollLock;
                delete body.dataset.zabiScrollLockOverflow;
            } else {
                body.dataset.zabiScrollLock = String(next);
            }
        };
    }

    /** Re-queries focusables on every Tab so content added while open stays inside the trap. */
    function handleTrapKeydown(event: KeyboardEvent) {
        const container = panel;
        if (event.key !== "Tab" || !container) return;
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

    // ── End of the shared overlay contract ──────────────────────────────

    function close(reason: DrawerCloseReason) {
        if (!dismissible) return;
        isOpen = false;
        if (focusActive) {
            focusActive = false;
            returnFocus();
        }
        onclose?.({ reason });
    }

    /** The `initialFocus` match if it can take focus, else the first control. */
    function focusInitial(container: HTMLElement) {
        const focusable = getFocusableElements(container);
        const wanted = initialFocus
            ? focusable.find((element) => element.matches(initialFocus))
            : undefined;
        (wanted ?? focusable[0])?.focus();
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
        const container = panel;
        if (isOpen && container) {
            saveFocus();
            focusActive = true;
            const unlockScroll = lockBodyScroll();
            slideIn(container);
            const t = setTimeout(() => {
                focusInitial(container);
            }, 0);
            // If the focused control is disabled or removed, focus lands on
            // `<body>`; take Tab and Escape back from there.
            const stopRecovery = recoverStrayFocus(container, {
                onEscape: () => close("escape"),
            });
            return () => {
                clearTimeout(t);
                stopRecovery();
                unlockScroll();
                if (focusActive) {
                    focusActive = false;
                    returnFocus();
                }
            };
        }
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
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
        class="fixed inset-0 z-modal overflow-hidden {dismissible ? 'cursor-pointer' : 'cursor-default'} bg-overlay"
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
            onkeydown={handleTrapKeydown}
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
                <button
                    type="button"
                    onclick={() => close("close-button")}
                    class="focus-ring flex size-8 shrink-0 items-center justify-center rounded-control text-description transition-colors motion-reduce:transition-none {dismissible
                        ? 'cursor-pointer hover:bg-surface-overlay-hover hover:text-headline'
                        : 'cursor-not-allowed opacity-50'}"
                    aria-label={closeLabel}
                    aria-disabled={dismissible ? undefined : "true"}
                >
                    <X size={20} aria-hidden="true" />
                </button>
            </div>

            <!-- `pt-1`: a scroll container clips, and the focus ring of a
            first control needs the room. -->
            <div class="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-1">
                {@render children?.()}
            </div>

            {#if footer}
                <div
                    class="flex shrink-0 justify-end gap-3 border-t border-border-overlay px-6 py-4"
                >
                    {@render footer()}
                </div>
            {/if}
        </div>
    </div>
{/if}
