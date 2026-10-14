<script lang="ts">
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import ToasterToast from './ToasterToast.svelte';
    import { toastStore } from './toast-store.js';
    import { cn } from "../util/cn.js";
    import { readKeyboardInset } from "../util/keyboard-inset.js";
    import { topOverlayFooter, topOverlayHeader, watchOverlayFooters } from "../util/overlay.js";
    import {
        DEFAULT_TOASTER_STRINGS,
        toastsReplaced,
        toastStays,
        type ToastDuration,
        type ToasterMode,
        type ToasterStrings,
        type ToastPauseChange,
    } from "../util/toaster.js";
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
     * <Toaster style="--toaster-bottom-offset: 64px" />
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
     *
     * A toast shows what it was pushed with: its `title`, its `message`
     * under it, or the message alone.
     *
     * How long it stays is said in words, per toast (`pushToast({ duration:
     * "short" })`) or for all of them here (`defaultDuration`): `"short"` is
     * 3 seconds, for a few words that need no reading time ("Saved");
     * anything a person has to read is `"medium"` (7 seconds) or `"long"`
     * (14); what they have to act on, and an error, should stay:
     * `"persistent"`. A number is milliseconds. A toast given no duration
     * gets medium up to 120 characters of text, long up to 240, and stays
     * beyond that; an error and a toast with an action stay until they are
     * dismissed.
     *
     * Its timer stops while a mouse is over it, a finger is on it or focus
     * is inside it, which is what lets a timed toast be read in the reader's
     * own time (WCAG 2.2.1). A finger that lifts leaves it at least three
     * seconds, so holding a short toast starts it again.
     * `data-paused` on the toast says so, and `onpausechange` is called.
     * A mouse holds the timer once it has moved over the toast, not when the
     * toast comes up under a pointer that is at rest. A touch or a pen drags
     * a toast away sideways (`swipeToDismiss`, on by default), and the close
     * button stays as the way for a keyboard and a screen reader. A toast
     * pushed with the id of one that is showing replaces it in place, and
     * `max` limits how many show at once: the oldest toast that is timed
     * (not an error, not one with an action) is the one that leaves.
     *
     * For a phone, `mode="auto"` makes the toast a snackbar below 640px: one
     * row (two lines at most), one at a time, with its action beside its text
     * and no stack. It sits directly above what is docked at the bottom, which
     * it finds by itself: a `BottomTabBar`, a `StickyActionBar`, a
     * `FloatingActionButton` and an `UnsavedChangesBar` that lie under it, and
     * anything you name in `avoid` (the button a screen ends in). It comes out
     * from behind that edge and goes back into it, on `--ease-standard`, with
     * no movement under reduced motion, and lies over the page without moving
     * it. Push a short confirmation with `closable: false` and it has no
     * control and takes no taps.
     *
     * ```svelte
     * <Toaster mode="auto" avoid="[data-primary-action]" />
     * ```
     *
     * Every word the toaster says by itself is in `strings`:
     *
     * ```svelte
     * <Toaster
     *     strings={{
     *         regionLabel: "Aviseringar",
     *         dismiss: "Stäng aviseringen",
     *         closesIn: (seconds) => `Stängs om ${seconds} sekunder.`,
     *     }}
     * />
     * ```
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "role" | "aria-label"> & {
        /**
         * The words the toaster says by itself, for an app in another
         * language: the region's name, the buttons' names, the sentence about
         * the time left. What is left out keeps its English default.
         */
        strings?: Partial<ToasterStrings>;
        /** Accessible name of the region. Wins over `strings.regionLabel`. */
        "aria-label"?: string;
        /**
         * Shows the time a toast has left as a sentence under it, with a
         * button that stops the timer. Without it the bar along the bottom of
         * the toast shows the time, and the sentence is there for a screen
         * reader only.
         */
        showCountdown?: boolean;
        /**
         * How long a toast stays when it was pushed without a `duration`, in
         * place of `"medium"`: `"short"`, `"medium"`, `"long"`,
         * `"persistent"` or milliseconds. An error and a toast with an action
         * still stay until dismissed, a text of 121 to 240 characters still
         * gets at least `"long"`, and a longer one still stays. A `duration`
         * on the toast wins.
         */
        defaultDuration?: ToastDuration;
        /**
         * `"stack"` (default): the stack of toasts. `"snackbar"`: the compact
         * form for a phone, at every width. `"auto"`: the snackbar below
         * 640px, the stack from there up.
         */
        mode?: ToasterMode;
        /**
         * How many toasts show at once. The oldest one that is timed leaves
         * when a newer one arrives; a toast that has to stay (an error, one
         * with an action, `"persistent"`) is not dropped, so there can be more
         * than this while they are showing. Default: no limit, and 1 in the
         * snackbar.
         */
        max?: number;
        /**
         * A CSS selector for elements the stack must not lie on, in addition
         * to the docked bars it finds by itself: the button a screen ends in.
         * When one lies under the stack, the stack sits above it.
         */
        avoid?: string;
        /**
         * Draws the thin bar along the bottom of a toast that empties over its
         * time. Unset: drawn, except under a confirmation in the snackbar that
         * has nothing to press (pushed with `closable: false`), where it is
         * left out. `false` leaves it out everywhere, `true` draws it
         * everywhere; a toast's own `timeLine` wins. The sentence for a screen
         * reader about the time left stays.
         */
        timeLine?: boolean;
        /**
         * Touch and pen drag a toast away sideways (and down, in the
         * snackbar). Default `true`. A mouse does not drag; the close button
         * is the way for a keyboard and a screen reader.
         */
        swipeToDismiss?: boolean;
        /**
         * Called when a pointer, a finger or focus starts or stops holding a
         * toast's timer, with the toast's id. The same state is `data-paused`
         * on the toast.
         */
        onpausechange?: (detail: ToastPauseChange) => void;
        class?: string;
    };

    let {
        strings,
        "aria-label": ariaLabel,
        showCountdown = false,
        defaultDuration,
        mode = "stack",
        max,
        avoid,
        swipeToDismiss = true,
        timeLine,
        onpausechange,
        class: className = '',
        ...restProps
    }: Props = $props();

    /** The app-wide words for the toaster, from the `ZabiStringsProvider` it is mounted under, if there is one. */
    const provided = zabiStringsFor("toaster");
    const words = $derived<ToasterStrings>(mergeStrings(DEFAULT_TOASTER_STRINGS, provided(), strings));

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

    /** Below 640px (`sm`), for `mode="auto"`. */
    let narrow = $state(false);
    $effect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
        const query = window.matchMedia("(max-width: 39.999rem)");
        const update = () => (narrow = query.matches);
        update();
        query.addEventListener?.("change", update);
        return () => query.removeEventListener?.("change", update);
    });
    const snackbar = $derived(mode === "snackbar" || (mode === "auto" && narrow));

    /**
     * Cuts at the edge the toast is docked on, so it comes out from behind it (sides and top stay open).
     * Each class is written out whole: Tailwind only generates what it finds as text in the source, so a
     * class put together from a prefix and a value at run time is in no stylesheet.
     */
    const clipClass = $derived(
        mode === "snackbar"
            ? "[clip-path:inset(-100vh_-100vw_0_-100vw)]"
            : mode === "auto"
              ? "max-sm:[clip-path:inset(-100vh_-100vw_0_-100vw)]"
              : "",
    );

    /** The oldest toast that is timed leaves for a newer one; one that has to stay is never dropped. */
    const limit = $derived(max ?? (snackbar ? 1 : Infinity));
    $effect(() => {
        const list = $toastStore;
        const allowed = Math.floor(limit);
        let over = list.length - allowed;
        if (!(allowed >= 1) || over <= 0) return;
        for (const toast of list.slice(0, -1)) {
            if (over <= 0) break;
            if (toastStays(toast, defaultDuration)) continue;
            toastsReplaced.add(toast.id);
            toastStore.dismiss(toast.id);
            over -= 1;
        }
    });

    /** The highest the stack may reach: below the status bar or an AppShell's top bar. */
    const TOP = "calc(max(var(--app-shell-top-inset, 0px), env(safe-area-inset-top, 0px)) + var(--toaster-edge))";
    /** What is docked at the bottom, and so may lie under the stack. */
    const DOCKED = '[data-bar-edge="bottom"], [data-toast-clear]';

    /**
     * The top edge of the highest docked element (or one named in `avoid`)
     * that the stack at rest would lie on, or null when it lies on none.
     */
    function dockedTop(rest: DOMRect): number | null {
        let nodes: NodeListOf<HTMLElement>;
        try {
            nodes = document.querySelectorAll<HTMLElement>(avoid ? `${DOCKED}, ${avoid}` : DOCKED);
        } catch {
            // A selector that does not parse is not a reason to lose the toast.
            return null;
        }
        let top: number | null = null;
        for (const node of nodes) {
            if (node.closest("[data-zabi-toaster]")) continue;
            const box = node.getBoundingClientRect();
            if (box.width === 0 || box.height === 0) continue;
            // Only what is in the same columns, and under the stack at rest.
            if (box.left >= rest.right || box.right <= rest.left) continue;
            if (box.top >= rest.bottom || box.bottom <= rest.top) continue;
            top = top === null ? box.top : Math.min(top, box.top);
        }
        return top;
    }

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
        let rest = stack.getBoundingClientRect();
        // No layout (a test DOM): nothing to place.
        if (rest.width === 0 && rest.height === 0) return;

        // Docked bars and named elements that lie under the stack: it sits above the highest.
        const dockTop = dockedTop(rest);
        if (dockTop !== null) {
            raise(Math.max(keyboard, Math.ceil(viewportHeight - dockTop)));
            rest = stack.getBoundingClientRect();
        }

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
            // Where it was, or at its end when it has only now begun to scroll or was at its
            // end before: the newest toast is the last one.
            const atEnd = scrolledTo !== null && scrolledTo >= endAt - 1;
            stack.scrollTop = scrolledTo === null || atEnd ? stack.scrollHeight : scrolledTo;
            endAt = stack.scrollHeight - stack.clientHeight;
        }
    }

    /**
     * Where the end of a stack that scrolls was, at the last layout. A toast's words arrive a
     * moment after it does and make it taller: a stack that was at its end stays there, so the
     * newest toast stays in view. One the reader has scrolled back stays where they put it.
     */
    let endAt = 0;

    /** How many toasts were shown at the last layout: a new one is scrolled to. */
    let shownCount = 0;

    $effect(() => {
        const count = $toastStore.length;
        layout();
        const stack = region;
        // The newest is at the end: in a stack that scrolls, that is what to show.
        if (stack && count > shownCount && stack.style.overflowY === "auto") {
            stack.scrollTop = stack.scrollHeight;
            endAt = stack.scrollHeight - stack.clientHeight;
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
        // A named element moves with the page: follow it, once a frame.
        let frame = 0;
        const onScroll = () => {
            if (frame || stack.childElementCount === 0) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                layout();
            });
        };
        document.addEventListener("scroll", onScroll, { capture: true, passive: true });
        window.addEventListener("resize", again);
        window.visualViewport?.addEventListener("resize", again);
        window.visualViewport?.addEventListener("scroll", again);
        return () => {
            document.removeEventListener("scroll", onScroll, { capture: true });
            if (frame) cancelAnimationFrame(frame);
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
    class={cn("pointer-events-none fixed z-toast flex min-w-0 flex-col gap-2 overscroll-contain", placement, clipClass, className)}
    role="region"
    aria-label={ariaLabel ?? words.regionLabel}
    data-zabi-toaster
    bind:this={region}
    onfocusin={handleFocusIn}
    onkeydown={handleKeydown}
>
    <!-- Each toast owns its role="status"/"alert"; a region-level aria-live would announce twice. -->
    {#each $toastStore as toast (toast.id)}
        <ToasterToast {toast} strings={words} {showCountdown} {defaultDuration} {onpausechange} {snackbar} {swipeToDismiss} {timeLine} />
    {/each}
</div>
