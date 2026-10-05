<script lang="ts">
    import ToasterToast from './ToasterToast.svelte';
    import { toastStore } from './toast-store.js';
    import { cn } from "../util/cn.js";
    import { readKeyboardInset } from "../util/keyboard-inset.js";
    import { topOverlayFooter, topOverlayHeader, watchOverlayFooters } from "../util/overlay.js";
    import type { HTMLAttributes } from "svelte/elements";

    /**
     * The stack of toasts, fixed to the bottom of the screen: in the corner
     * from 640px up, across the width with 16px on each side below that.
     *
     * It keeps clear of what is at the bottom of a phone screen. The home
     * indicator and a notch at the side are read from the safe-area insets
     * (the page has to ask for them with `viewport-fit=cover`). Inside an
     * `AppShell` the stack sits above the shell's tab bar, which the shell
     * reports in `--app-shell-bottom-inset`. For anything else fixed to the
     * bottom (a `BottomTabBar` on its own, a `StickyActionBar`, a
     * `FloatingActionButton`), say how tall it is with
     * `--toaster-bottom-offset` on the Toaster or any ancestor:
     *
     * ```svelte
     * <Toaster style="--toaster-bottom-offset: calc(4rem + 1px)" />
     * ```
     *
     * A `FloatingActionButton` is 56px with 16px under it: `72px` puts the
     * stack above it.
     *
     * That offset is for what is on the page. Over a modal overlay (Modal,
     * BottomSheet, SlideUp, Drawer) the stack minds the overlay instead: it
     * never lies on the header, which holds the close button, nor on a
     * footer pinned to the bottom, and the offset is not added on top. It
     * sits above the panel when there is more room there, and otherwise
     * between the header and the footer. Where the on-screen keyboard covers
     * the page, the stack sits above the keyboard. It is never taller than
     * the room it has: with more toasts than fit, it scrolls. With an
     * overlay open, Tab goes from its last control into the toasts and back,
     * and Escape in a toast returns focus to where it came from.
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "role" | "aria-label"> & {
        class?: string;
    };

    let { class: className = '', ...restProps }: Props = $props();

    /**
     * One utility per property, so a class from the caller still replaces it
     * at every width; what differs below 640px is carried by the three
     * variables. From 640px up this is what it always was: 1rem from the
     * bottom and the right, 24rem wide, 1rem of padding.
     */
    const placement = [
        "[--toaster-edge:0px] sm:[--toaster-edge:1rem]",
        "[--toaster-width:100vw] sm:[--toaster-width:24rem]",
        // In px below 640px: a gutter that grew with the text would take the room the text needs.
        "[--toaster-padding:16px] sm:[--toaster-padding:1rem]",
        // `--toaster-overlay-inset` is set below, while a footer of an open overlay is under the stack.
        "bottom-[calc(max(max(var(--app-shell-bottom-inset,0px),env(safe-area-inset-bottom,0px))_+_var(--toaster-bottom-offset,0px),var(--toaster-overlay-inset,0px))_+_var(--toaster-edge))]",
        "right-[calc(env(safe-area-inset-right,0px)_+_var(--toaster-edge))]",
        "w-[min(var(--toaster-width),calc(100vw_-_env(safe-area-inset-left,0px)_-_env(safe-area-inset-right,0px)_-_2_*_var(--toaster-edge)))]",
        "p-(--toaster-padding)",
    ].join(" ");

    let region = $state<HTMLDivElement>();

    /** The highest the stack may reach: below the status bar or an AppShell's top bar. */
    const TOP = "calc(max(var(--app-shell-top-inset, 0px), env(safe-area-inset-top, 0px)) + var(--toaster-edge))";
    /**
     * Places the stack for what is on screen now. At rest it is where the
     * classes put it, raised above the on-screen keyboard where that covers
     * the page. The header (with its close button) and the pinned footer of
     * the overlay on top are never covered: when the stack would lie on
     * either, it takes the larger of the two free stretches, above the panel
     * or between its header and its footer. Where it would be taller than
     * the room it has, it gets that height and scrolls, with the newest toast
     * in view.
     * Written straight to the element: it is measured between the steps, in
     * one go, before anything is painted.
     */
    function layout(): void {
        const stack = region;
        if (!stack) return;
        // Taking the height off puts a stack that scrolls back at its start.
        const scrolledTo = stack.style.overflowY === "auto" ? stack.scrollTop : null;
        stack.style.removeProperty("--toaster-overlay-inset");
        stack.style.top = "";
        stack.style.bottom = "";
        stack.style.maxHeight = "";
        stack.style.overflowY = "";
        stack.style.paddingBlock = "";
        if (stack.childElementCount === 0) return;

        const viewportHeight = document.documentElement.clientHeight;
        // Nothing where the page shrinks by itself: the classes already end above the keyboard there.
        const keyboard = readKeyboardInset();
        const raise = (px: number) => stack.style.setProperty("--toaster-overlay-inset", `${px}px`);
        if (keyboard > 0) raise(keyboard);
        const rest = stack.getBoundingClientRect();
        // No layout (a test DOM): nothing to place.
        if (rest.width === 0 && rest.height === 0) return;

        stack.style.top = TOP;
        stack.style.bottom = "auto";
        const topLimit = stack.getBoundingClientRect().top;
        stack.style.top = "";
        stack.style.bottom = "";

        // Only what is in the same columns as the stack can be under it.
        const beside = (part: HTMLElement | null) => {
            const box = part?.getBoundingClientRect();
            return box && box.height > 0 && box.left < rest.right && box.right > rest.left ? box : null;
        };
        const header = beside(topOverlayHeader());
        const footer = beside(topOverlayFooter());
        const under = (box: DOMRect | null) => !!box && box.top < rest.bottom && box.bottom > rest.top;

        let ceiling = topLimit;
        let bottomEdge = rest.bottom;
        if (under(header) || under(footer)) {
            // Between the header and the footer (or the stack's own resting edge)...
            const insideTop = header ? Math.max(topLimit, header.bottom) : topLimit;
            const insideBottom = footer && footer.top > insideTop ? footer.top : rest.bottom;
            // ...or above the panel, over the backdrop.
            const aboveBottom = header ? header.top : topLimit;
            const above = aboveBottom - topLimit > insideBottom - insideTop;
            ceiling = above ? topLimit : insideTop;
            const floor = above ? aboveBottom : insideBottom;
            if (floor < rest.bottom) raise(Math.max(keyboard, Math.ceil(viewportHeight - floor)));
            bottomEdge = stack.getBoundingClientRect().bottom;
        } else if (header && header.bottom <= rest.top) {
            // Clear of it now; it does not grow over it either.
            ceiling = Math.max(topLimit, header.bottom);
        }

        const room = Math.max(0, Math.floor(bottomEdge - ceiling));
        if (stack.scrollHeight > room + 1) {
            stack.style.maxHeight = `${room}px`;
            stack.style.overflowY = "auto";
            // A box is never shorter than its own padding. In a slit between
            // a header and a footer (a small dialog over a keyboard, on a
            // phone held sideways) the padding goes, or the stack would reach
            // over the header after all.
            const padding = parseFloat(getComputedStyle(stack).paddingTop) || 0;
            if (room < 2 * padding + 44) stack.style.paddingBlock = "0px";
            // Where it was, or at its end when it has only now begun to scroll:
            // the newest toast is the last one.
            stack.scrollTop = scrolledTo ?? stack.scrollHeight;
        }
    }

    /** How many toasts were shown at the last layout: a new one is scrolled to. */
    let shownCount = 0;

    $effect(() => {
        const count = $toastStore.length;
        layout();
        const stack = region;
        // The newest is at the end: in a stack that scrolls, that is what to show.
        if (stack && count > shownCount && stack.style.overflowY === "auto") {
            stack.scrollTop = stack.scrollHeight;
        }
        shownCount = count;
    });

    $effect(() => {
        const stack = region;
        if (!stack) return;
        const again = () => layout();
        const stopFooters = watchOverlayFooters(again);
        const observer = typeof ResizeObserver === "function" ? new ResizeObserver(again) : undefined;
        observer?.observe(stack);
        // Its children too: a toast that opens its details makes the stack taller inside a fixed height.
        const children = new MutationObserver(() => {
            observer?.disconnect();
            observer?.observe(stack);
            for (const child of stack.children) observer?.observe(child);
        });
        children.observe(stack, { childList: true });
        window.addEventListener("resize", again);
        window.visualViewport?.addEventListener("resize", again);
        window.visualViewport?.addEventListener("scroll", again);
        return () => {
            window.visualViewport?.removeEventListener("scroll", again);
            stopFooters();
            observer?.disconnect();
            children.disconnect();
            window.removeEventListener("resize", again);
            window.visualViewport?.removeEventListener("resize", again);
        };
    });

    /**
     * Escape in a toast gives focus back to where it came from (a control in
     * the page, or in the modal that is open), and nothing else: the toast
     * stays, and the modal under it does not take the key as its own.
     */
    function handleKeydown(event: KeyboardEvent) {
        if (event.key !== "Escape" || event.defaultPrevented) return;
        const back = returnTarget();
        if (!back) return;
        event.preventDefault();
        back.focus();
    }

    /** What had focus before it entered the region; where it goes back to. */
    let cameFrom: HTMLElement | null = null;

    /**
     * Where focus goes back to, if that is still a place for it. A control of
     * the page that focus came from before a modal overlay opened is behind
     * that overlay now: focus is not sent there, out of the overlay's trap.
     */
    function returnTarget(): HTMLElement | null {
        if (!cameFrom?.isConnected) return null;
        const modal = '[aria-modal="true"]';
        if (document.querySelector(modal) && !cameFrom.closest(modal)) return null;
        return cameFrom;
    }

    function handleFocusIn(event: FocusEvent) {
        const from = event.relatedTarget;
        if (from instanceof HTMLElement && !region?.contains(from)) cameFrom = from;
    }

    /**
     * Dismissing the toast that holds focus (its action, or Dismiss) removes
     * the focused control, and the browser would drop focus on `<body>`. It
     * goes to the neighbouring toast instead, or back to where it came from.
     * Which toast held focus has to be read before the list is re-rendered.
     */
    let shownIds: string[] = [];
    let focusAfterDismiss: { neighbours: string[] } | null = null;

    $effect.pre(() => {
        const ids = $toastStore.map((toast) => toast.id);
        const holder = region
            ? (document.activeElement?.closest<HTMLElement>('[data-toast-id]') ?? null)
            : null;
        const held = holder && region?.contains(holder) ? holder.dataset.toastId : undefined;
        if (held !== undefined && !ids.includes(held)) {
            const at = shownIds.indexOf(held);
            // The next toast first, then the ones before it, nearest first.
            focusAfterDismiss = {
                neighbours: [...shownIds.slice(at + 1), ...shownIds.slice(0, at).reverse()],
            };
        }
        shownIds = ids;
    });

    $effect(() => {
        void $toastStore;
        const pending = focusAfterDismiss;
        focusAfterDismiss = null;
        if (!pending || !region) return;
        // Something else took focus in the meantime (the action opened a dialog): leave it.
        const active = document.activeElement;
        if (active && active !== document.body && !region.contains(active)) return;

        const toasts = [...region.querySelectorAll<HTMLElement>('[data-toast-id]')];
        for (const id of pending.neighbours) {
            const next = toasts
                .find((toast) => toast.dataset.toastId === id)
                ?.querySelector<HTMLElement>('button');
            if (next) {
                next.focus();
                return;
            }
        }
        returnTarget()?.focus();
    });
</script>

<div
    {...restProps}
    class={cn("pointer-events-none fixed z-toast flex min-w-0 flex-col gap-2 overscroll-contain", placement, className)}
    role="region"
    aria-label="Notifications"
    data-zabi-toaster
    bind:this={region}
    onfocusin={handleFocusIn}
    onkeydown={handleKeydown}
>
    <!-- Each toast owns its role="status"/"alert"; a region-level aria-live would announce twice. -->
    {#each $toastStore as toast (toast.id)}
        <ToasterToast {toast} />
    {/each}
</div>
