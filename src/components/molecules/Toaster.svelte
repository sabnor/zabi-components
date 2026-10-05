<script lang="ts">
    import ToasterToast from './ToasterToast.svelte';
    import { toastStore } from './toast-store.js';
    import { cn } from "../util/cn.js";
    import { topOverlayFooter, watchOverlayFooters } from "../util/overlay.js";
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
     * Over a modal overlay with a footer at the bottom of the screen (a
     * full-screen Modal, a Modal on a phone, a BottomSheet, a Drawer) the
     * stack moves above that footer by itself, and to the top of the screen
     * when there is no room above it. The stack is never taller than the
     * screen allows: with more toasts than fit, it scrolls. With such an
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
        "bottom-[calc(max(max(var(--app-shell-bottom-inset,0px),env(safe-area-inset-bottom,0px)),var(--toaster-overlay-inset,0px))_+_var(--toaster-bottom-offset,0px)_+_var(--toaster-edge))]",
        "right-[calc(env(safe-area-inset-right,0px)_+_var(--toaster-edge))]",
        "w-[min(var(--toaster-width),calc(100vw_-_env(safe-area-inset-left,0px)_-_env(safe-area-inset-right,0px)_-_2_*_var(--toaster-edge)))]",
        "p-(--toaster-padding)",
    ].join(" ");

    let region = $state<HTMLDivElement>();

    /** Where the stack starts when it is at the top of the screen: below the status bar or an AppShell's top bar. */
    const TOP = "calc(max(var(--app-shell-top-inset, 0px), env(safe-area-inset-top, 0px)) + var(--toaster-edge))";
    /** With less room than this above a footer, in px, the stack goes to the top of the screen. */
    const MIN_ROOM = 160;

    /**
     * Places the stack for what is on screen now. At rest it is where the
     * classes put it. When the footer of an open overlay lies under it, it
     * moves above that footer, or to the top when there is too little room
     * there. Where it would be taller than the room it has, it gets that
     * height and scrolls. Written straight to the element: it is measured
     * between the steps, in one go, before anything is painted.
     */
    function layout(): void {
        const stack = region;
        if (!stack) return;
        stack.style.removeProperty("--toaster-overlay-inset");
        stack.style.top = "";
        stack.style.bottom = "";
        stack.style.maxHeight = "";
        stack.style.overflowY = "";
        delete stack.dataset.at;
        if (stack.childElementCount === 0) return;

        const viewportHeight = document.documentElement.clientHeight;
        const rest = stack.getBoundingClientRect();
        // No layout (a test DOM): nothing to place.
        if (rest.width === 0 && rest.height === 0) return;

        stack.style.top = TOP;
        stack.style.bottom = "auto";
        const topLimit = stack.getBoundingClientRect().top;
        stack.style.top = "";
        stack.style.bottom = "";

        let bottomEdge = rest.bottom;
        const footer = topOverlayFooter()?.getBoundingClientRect();
        const covered =
            footer &&
            footer.height > 0 &&
            footer.left < rest.right &&
            footer.right > rest.left &&
            footer.top < rest.bottom &&
            footer.bottom > rest.top;
        if (footer && covered) {
            const inset = Math.max(0, Math.ceil(viewportHeight - footer.top));
            stack.style.setProperty("--toaster-overlay-inset", `${inset}px`);
            bottomEdge = stack.getBoundingClientRect().bottom;
            if (bottomEdge - topLimit < Math.min(stack.scrollHeight, MIN_ROOM)) {
                stack.style.removeProperty("--toaster-overlay-inset");
                stack.style.top = TOP;
                stack.style.bottom = "auto";
                stack.dataset.at = "top";
                // Down to the footer; if that leaves nothing, to where it rests.
                bottomEdge = footer.top - topLimit >= MIN_ROOM / 2 ? footer.top : rest.bottom;
            }
        }

        const room = Math.max(0, Math.floor(bottomEdge - topLimit));
        if (stack.scrollHeight > room + 1) {
            stack.style.maxHeight = `${room}px`;
            stack.style.overflowY = "auto";
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
        return () => {
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
