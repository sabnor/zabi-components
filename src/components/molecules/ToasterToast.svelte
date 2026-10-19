<script lang="ts">
    import { onMount, untrack } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import { slide, fade, fly } from 'svelte/transition';
    import AlertCircle from '@lucide/svelte/icons/circle-alert';
    import AlertTriangle from '@lucide/svelte/icons/triangle-alert';
    import CheckCircle from '@lucide/svelte/icons/circle-check-big';
    import ChevronDown from '@lucide/svelte/icons/chevron-down';
    import Info from '@lucide/svelte/icons/info';
    import X from '@lucide/svelte/icons/x';
    import Button from '../atoms/Button.svelte';
    import { toastStore, type ToastItem } from './toast-store.js';
    import { cn } from "../util/cn.js";
    import { createVelocityTracker, DRAG_SLOP, FLICK_VELOCITY, prefersReducedMotion, timeOf } from "../util/sheet-drag.js";
    import {
        DEFAULT_TOASTER_STRINGS,
        easeStandard,
        resolveToastDuration,
        toastsReplaced,
        toastTexts,
        TOAST_SECONDS_AFTER_HOLD,
        TOAST_SWIPE_DISMISS_FRACTION,
        type ToastDuration,
        type ToasterStrings,
        type ToastPauseChange,
    } from "../util/toaster.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        toast: ToastItem;
        /** Every word the toast says by itself; the Toaster passes its own. */
        strings?: ToasterStrings;
        /** Shows the time left as a sentence, with a button that stops the timer. */
        showCountdown?: boolean;
        /** What a toast pushed without a duration gets, in place of medium; the Toaster passes its own. */
        defaultDuration?: ToastDuration;
        /** Called when a pointer, a finger or focus starts or stops holding the timer. */
        onpausechange?: (detail: ToastPauseChange) => void;
        /** The compact form for a phone: one row, docked, sliding out from the edge it sits on. */
        snackbar?: boolean;
        /** A touch or a pen drags the toast away, sideways (and down, in the snackbar). */
        swipeToDismiss?: boolean;
        /** Draws the time bar (`true`/`false`); unset, it is left out of a snackbar toast with nothing to press. */
        timeLine?: boolean;
    }

    let {
        class: className = "",
        toast,
        strings = DEFAULT_TOASTER_STRINGS,
        showCountdown = false,
        defaultDuration,
        onpausechange,
        snackbar = false,
        swipeToDismiss = true,
        timeLine,
    }: Props = $props();

    let count = $state(0);
    let timerActive = $state(false);
    let isExpanded = $state(false);
    /**
     * What holds the timer (WCAG 2.2.1): a mouse or a stylus over the toast,
     * a finger on it, keyboard focus inside it.
     */
    let hovered = $state(false);
    let held = $state(false);
    let focusWithin = $state(false);
    const paused = $derived(hovered || held || focusWithin);

    let intervalRef: ReturnType<typeof setInterval> | undefined;

    const texts = $derived(toastTexts(toast, strings));
    const title = $derived(texts.title);
    const message = $derived(texts.message);
    const headerTitle = $derived(texts.headerTitle);
    const secondLine = $derived(texts.secondLine);

    /**
     * The part that opens and closes is `detail`, when the toast was given
     * one: the long version. The message is never folded away.
     */
    const expandableText = $derived((toast.detail ?? "").trim());
    const hasExpandable = $derived(expandableText.length > 0);

    /**
     * Seconds until the toast closes by itself; `0` is never. What the app
     * said for this toast wins. Otherwise it goes by what the toast is and by
     * how much there is to read in it: the two lines that are shown, not the
     * detail behind its button.
     */
    const maxSeconds = $derived.by(() => {
        const ms = resolveToastDuration(
            {
                duration: toast.duration,
                type: toast.type,
                hasAction: !!toast.action,
                textLength: headerTitle.length + secondLine.length,
            },
            defaultDuration,
        );
        return ms <= 0 ? 0 : Math.max(1, Math.ceil(ms / 1000));
    });

    /**
     * A short timed toast pushed with `closable: false` has no control at
     * all. A toast that stays, or has a button of any kind to press, keeps
     * its close button: there must always be a way to dismiss that is not a
     * gesture.
     */
    const bare = $derived(
        toast.closable === false &&
            maxSeconds > 0 &&
            !toast.action &&
            !hasExpandable &&
            !showCountdown &&
            toast.type !== 'error',
    );

    /**
     * The bar says "you have this long to press". A confirmation with nothing
     * to press, in the snackbar, has no use for it (and WCAG 2.2.1 is about
     * time to act, of which there is none), so it is left out there unless
     * asked for. The stack keeps it. The toast's own setting wins over the Toaster's.
     */
    const drawTimeLine = $derived(toast.timeLine ?? timeLine ?? !(snackbar && bare));

    /**
     * What a screen reader hears is a live region that is in the page
     * empty and gets its words afterwards: one that is inserted already
     * filled is the pattern screen readers are least dependable on. So the
     * words are put in a moment after the toast is mounted (the toast is
     * still coming in then). The server's markup has them at once.
     */
    let spoken = $state(typeof document === 'undefined');
    const SPEAK_AFTER_MS = 100;

    /** The time left as words: for the sentence, or for a screen reader to find. */
    const countdownText = $derived(
        paused ? strings.pausedClosesIn(count) : strings.closesIn(count),
    );

    // Said to the app as well: `data-paused` is the same thing in the markup.
    let reportedPause = false;
    $effect(() => {
        const now = paused;
        if (now === reportedPause) return;
        reportedPause = now;
        onpausechange?.({ id: toast.id, paused: now });
    });

    const statusIconClass = $derived(
        toast.type === 'success'
            ? 'text-success'
            : toast.type === 'error'
              ? 'text-error'
              : toast.type === 'warning'
                ? 'text-warning'
                : 'text-info',
    );

    const progressFillClass = $derived(
        toast.type === 'success'
            ? 'bg-success'
            : toast.type === 'error'
              ? 'bg-error'
              : toast.type === 'warning'
                ? 'bg-warning'
                : 'bg-info',
    );

    function stopTimer() {
        if (intervalRef !== undefined) {
            clearInterval(intervalRef);
            intervalRef = undefined;
        }
        timerActive = false;
    }

    /** (Re)starts the timer from the full time; a toast that stays has none. */
    function startTimer() {
        stopTimer();
        const max = maxSeconds;
        if (max <= 0) return;
        count = max;
        timerActive = true;

        intervalRef = setInterval(() => {
            // The state, not the `paused` derived: a tick can land while the
            // toast is animating out, and reading a derived then warns
            // (`derived_inert`).
            if (hovered || held || focusWithin) return;
            count -= 1;
            if (count <= 0) {
                stopTimer();
                toastStore.dismiss(toast.id);
            }
        }, 1000);
    }

    onMount(() => {
        startTimer();
        const speak = setTimeout(() => (spoken = true), SPEAK_AFTER_MS);

        return () => {
            clearTimeout(speak);
            clearTimeout(settleTimer);
            if (intervalRef !== undefined) {
                clearInterval(intervalRef);
                intervalRef = undefined;
            }
        };
    });

    // The same id pushed again replaces the toast in place: new words, the full time again.
    let shownToast: ToastItem | undefined;
    $effect(() => {
        const current = toast;
        if (shownToast === undefined) {
            shownToast = current;
            return;
        }
        if (current === shownToast) return;
        shownToast = current;
        untrack(() => {
            isExpanded = false;
            startTimer();
        });
    });

    function handleDismiss() {
        toastStore.dismiss(toast.id);
    }

    /** The toast closes even if the handler throws, unless the action opted out. */
    function handleAction() {
        const action = toast.action;
        if (!action) return;
        try {
            action.onclick();
        } finally {
            if (action.dismissOnClick !== false) {
                toastStore.dismiss(toast.id);
            }
        }
    }

    let expandButton = $state<HTMLButtonElement>();
    let dismissButton = $state<HTMLButtonElement>();

    /**
     * Okay closes the details and goes with them. Focus moves to the button
     * that opens them again, or it would fall to the page and a keyboard
     * user would be at the top of it.
     */
    function handleOkay() {
        isExpanded = false;
        expandButton?.focus();
    }

    /** The stop button goes with the sentence it is in: focus stays in the toast. */
    function handleStop(event: MouseEvent) {
        const held = event.currentTarget === document.activeElement;
        stopTimer();
        if (held) dismissButton?.focus();
    }

    /**
     * A mouse or a stylus holds the timer once it has moved over the toast,
     * not when the toast arrives under it: a browser sends `pointerenter` to
     * an element that appears under a pointer at rest, and a toast shown
     * where the last click was would otherwise be held until the mouse is
     * moved away. A finger holds it while it is on the toast.
     */
    function handlePointerLeave(event: PointerEvent) {
        if (event.pointerType !== "touch") hovered = false;
    }

    function handlePointerMove(event: PointerEvent) {
        if (dragging) {
            drag(event);
            return;
        }
        if (tracked) maybeStartDrag(event);
        if (event.pointerType === "touch" || hovered) return;
        // A move of no distance is not the pointer moving (a browser repeating
        // its position after the layout changed); one with no such field is.
        const moved =
            typeof event.movementX !== "number" ||
            Number.isNaN(event.movementX) ||
            event.movementX !== 0 ||
            event.movementY !== 0;
        if (moved) hovered = true;
    }

    // Swiping away: a touch or a pen drags the toast sideways, or down in the
    // snackbar (it is docked at the bottom); past 40% of its width or a flick it
    // goes, otherwise it settles back. Reuses the sheets' drag constants.
    let root = $state<HTMLDivElement>();
    let dragX = $state(0);
    let dragY = $state(0);
    let dragging = $state(false);
    let settling = $state(false);
    let tracked = false;
    let pointerId = -1;
    let startX = 0;
    let startY = 0;
    let axis: "x" | "y" | null = null;
    let swallowClick = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const trackX = createVelocityTracker();
    const trackY = createVelocityTracker();

    function handlePointerDown(event: PointerEvent) {
        if (event.pointerType === "touch") held = true;
        if (!swipeToDismiss || bare || event.pointerType === "mouse" || !event.isPrimary) return;
        // A button keeps its own press.
        if ((event.target as Element | null)?.closest?.("button, a[href], input, select, textarea")) return;
        clearTimeout(settleTimer);
        settling = false;
        tracked = true;
        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        axis = null;
        const time = timeOf(event);
        trackX.reset(event.clientX, time);
        trackY.reset(event.clientY, time);
    }

    function drag(event: PointerEvent) {
        if (event.pointerId !== pointerId) return;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        const time = timeOf(event);
        trackX.add(event.clientX, time);
        trackY.add(event.clientY, time);
        dragX = axis === "x" ? dx : 0;
        dragY = axis === "y" ? Math.max(0, dy) : 0;
    }

    /** Called for every move of a pointer that is down on the toast, before it is a drag. */
    function maybeStartDrag(event: PointerEvent) {
        if (!tracked || event.pointerId !== pointerId) return;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        const time = timeOf(event);
        trackX.add(event.clientX, time);
        trackY.add(event.clientY, time);
        if (Math.hypot(dx, dy) < DRAG_SLOP) return;
        const sideways = Math.abs(dx) > Math.abs(dy);
        // Up is the way a page scrolls, and in the stack there is no edge to go down to.
        if (!sideways && (dy < 0 || !snackbar)) {
            tracked = false;
            return;
        }
        axis = sideways ? "x" : "y";
        dragging = true;
        try {
            root?.setPointerCapture(event.pointerId);
        } catch {
            // A pointer that is gone cannot be captured; the drag simply ends.
        }
        drag(event);
    }

    function finishDrag(event: PointerEvent, cancelled: boolean) {
        if (!tracked || event.pointerId !== pointerId) return;
        tracked = false;
        if (!dragging) return;
        dragging = false;
        swallowClick = true;
        setTimeout(() => (swallowClick = false), 0);
        const width = root?.offsetWidth || 1;
        const height = root?.offsetHeight || 1;
        const sideways = axis === "x";
        const distance = sideways ? dragX : dragY;
        const velocity = sideways ? trackX.velocity() : trackY.velocity();
        const flicked = Math.abs(velocity) > FLICK_VELOCITY && Math.sign(velocity) === Math.sign(distance);
        const far = Math.abs(distance) > (sideways ? width : height) * TOAST_SWIPE_DISMISS_FRACTION;
        if (!cancelled && (far || flicked)) {
            if (prefersReducedMotion()) {
                toastStore.dismiss(toast.id);
                return;
            }
            // Out the way it was going, then gone.
            settling = true;
            if (sideways) dragX = Math.sign(distance || 1) * (width + 32);
            else dragY = height + 32;
            settleTimer = setTimeout(() => toastStore.dismiss(toast.id), 200);
            return;
        }
        // Back where it was.
        settling = !prefersReducedMotion();
        dragX = 0;
        dragY = 0;
        settleTimer = setTimeout(() => (settling = false), 220);
    }

    function handleClickCapture(event: MouseEvent) {
        if (!swallowClick) return;
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * The finger lifts, or the browser takes the touch for a scroll. The
     * timer runs again, with time left to do something about the toast: it
     * was held because someone was reading it.
     */
    function handlePointerRelease(event: PointerEvent) {
        finishDrag(event, event.type === "pointercancel");
        if (event.pointerType !== "touch" || !held) return;
        held = false;
        if (timerActive) count = Math.max(count, Math.min(TOAST_SECONDS_AFTER_HOLD, maxSeconds));
    }

    function handleFocusOut(event: FocusEvent) {
        const next = event.relatedTarget as Node | null;
        if (!next || !(event.currentTarget as HTMLElement).contains(next)) {
            focusWithin = false;
        }
    }

    /** No movement where motion is unwanted: the toast appears and goes at once. */
    const reducedMotion = prefersReducedMotion();
    const motion = (duration: number) => (reducedMotion ? 0 : duration);

    const toastEnter = { y: 18, duration: motion(260), opacity: 0, easing: cubicOut };
    // Out a little quicker than in, as the snackbar goes (D295).
    const toastLeave = { y: 14, duration: motion(200), opacity: 0, easing: cubicOut };

    /**
     * The snackbar comes out from behind the edge it is docked on and goes
     * back into it: it slides down by its own height and the gap, on the
     * standard curve, with no overshoot. The region clips it at that edge.
     */
    function dock(node: HTMLElement, leaving: boolean) {
        const distance = node.offsetHeight + 24;
        return {
            duration: motion(leaving ? 200 : 280),
            easing: easeStandard,
            css: (t: number, u: number) => `transform: translateY(${u * distance}px); opacity: ${Math.min(1, t * 3)}`,
        };
    }

    function enter(node: HTMLElement) {
        return snackbar ? dock(node, false) : fly(node, toastEnter);
    }

    function leave(node: HTMLElement) {
        // Dropped for a newer toast that is coming in where it is: gone at once.
        if (toastsReplaced.delete(toast.id)) return { duration: 0 };
        return snackbar ? dock(node, true) : fly(node, toastLeave);
    }

    /** One line of text is centred on the buttons beside it; text that wraps stays at the top. */
    let textBox = $state<HTMLDivElement>();
    let oneLine = $state(false);
    $effect(() => {
        const box = textBox;
        void headerTitle;
        void secondLine;
        if (!box || typeof getComputedStyle !== 'function') return;
        const measure = () => {
            const line = parseFloat(getComputedStyle(box).lineHeight) || 24;
            oneLine = box.scrollHeight <= line * 1.5;
        };
        measure();
        if (typeof ResizeObserver !== 'function') return;
        const observer = new ResizeObserver(measure);
        observer.observe(box);
        return () => observer.disconnect();
    });
</script>

<!-- Radius: the snackbar's 4px of padding round a control of 8px make 12px (outer = inner + padding). -->
<div
    bind:this={root}
    class={cn(
        "relative w-full min-w-[min(18rem,100%)] shrink-0 overflow-hidden material-thick",
        snackbar ? "rounded-container" : "rounded-overlay",
        // No control in it: a tap goes through to the page.
        bare ? "pointer-events-none" : "pointer-events-auto",
        className,
    )}
    in:enter
    out:leave
    style:transform={dragX !== 0 || dragY !== 0 ? `translate3d(${dragX}px, ${dragY}px, 0)` : undefined}
    style:opacity={dragging || settling ? Math.max(0.2, 1 - Math.hypot(dragX, dragY) / (root?.offsetWidth || 300)) : undefined}
    style:transition={settling ? "transform 200ms var(--ease-standard), opacity 200ms var(--ease-standard)" : undefined}
    style:touch-action={swipeToDismiss && !bare ? (snackbar ? "none" : "pan-y") : undefined}
    onpointerleave={handlePointerLeave}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerRelease}
    onpointercancel={handlePointerRelease}
    onclickcapture={handleClickCapture}
    onmouseleave={() => (hovered = false)}
    onfocusin={() => (focusWithin = true)}
    onfocusout={handleFocusOut}
    role="group"
    aria-label={headerTitle}
    data-toast-id={toast.id}
    data-paused={paused}
>
    <!-- Padding and gaps in px: at 200% text on a phone, room that grew with
    the text left the text itself a column too narrow for one long word. -->
    <div class={snackbar ? "p-[4px] ps-[12px]" : "p-[16px]"}>
        <!-- The title keeps 8rem at least, icon included. When the toast has
        less beside its buttons (320px with enlarged text), the buttons go to a
        line of their own under it, at the end. -->
        <div class="flex flex-wrap {oneLine ? 'items-center' : 'items-start'} gap-x-[12px] gap-y-[4px] {snackbar ? 'min-h-[44px]' : ''}">
            <!-- Live region holds only title + message, so the countdown and buttons are never re-announced. -->
            <div
                class="flex min-w-0 flex-[1_1_8rem] items-start gap-[12px]"
                role={toast.type === 'error' ? 'alert' : 'status'}
                aria-atomic="true"
            >
            <!-- 20px at every text size, as the padding and the gap beside it
            are px: an icon that grew with the text took the room the text
            needed. Lowered so it stays at the middle of the first line. -->
            <div class="shrink-0 mt-[calc((1.5rem_-_20px)_/_2)]">
                {#if toast.type === 'success'}
                    <CheckCircle class="size-[20px] {statusIconClass}" aria-hidden="true" />
                {:else if toast.type === 'error'}
                    <AlertCircle class="size-[20px] {statusIconClass}" aria-hidden="true" />
                {:else if toast.type === 'warning'}
                    <AlertTriangle class="size-[20px] {statusIconClass}" aria-hidden="true" />
                {:else}
                    <Info class="size-[20px] {statusIconClass}" aria-hidden="true" />
                {/if}
            </div>
            <div class="min-w-0 flex-1" bind:this={textBox}>
                <!-- A heading when the app gave the toast a title (or nothing
                at all); a message on its own is a sentence, not a heading. -->
                {#if title || !message}
                    <h4 class="text-base font-semibold text-headline [overflow-wrap:anywhere]">
                        {spoken ? headerTitle : "\u00a0"}
                    </h4>
                {:else}
                    <p class="text-base font-medium text-headline [overflow-wrap:anywhere]" data-toast-message>
                        {#if spoken && toast.messageContent}
                            {@render toast.messageContent()}
                        {:else}
                            {spoken ? headerTitle : "\u00a0"}
                        {/if}
                    </p>
                {/if}
                {#if secondLine}
                    <p class="mt-1 text-sm text-description [overflow-wrap:anywhere]" data-toast-message>
                        {#if spoken && toast.messageContent}
                            {@render toast.messageContent()}
                        {:else}
                            {spoken ? secondLine : "\u00a0"}
                        {/if}
                    </p>
                {/if}
                {#if toast.action && spoken}
                    <!-- The button sits outside the live region, so this is how a screen reader user hears that there is one. -->
                    <span class="sr-only">{strings.actionAvailable(toast.action.label)}</span>
                {/if}
            </div>
            </div>
            {#if !bare}
            <div class="ms-auto flex shrink-0 items-center gap-1">
                {#if snackbar && toast.action}
                    <Button
                        variant="text"
                        size="sm"
                        text={toast.action.label}
                        type="button"
                        data-toast-action
                        onclick={handleAction}
                    />
                {/if}
                {#if hasExpandable}
                    <button
                        type="button"
                        class="focus-ring cursor-pointer inline-flex items-center justify-center rounded-control p-1 pointer-coarse:min-h-[44px] pointer-coarse:min-w-[44px] text-description transition-colors hover:bg-surface-overlay-hover hover:text-headline active:bg-surface-active focus:outline-none"
                        aria-expanded={isExpanded}
                        aria-controls={isExpanded ? `toaster-expand-${toast.id}` : undefined}
                        aria-label={isExpanded ? strings.collapse : strings.expand}
                        bind:this={expandButton}
                        onclick={() => (isExpanded = !isExpanded)}
                    >
                        <ChevronDown
                            class="size-5 transition-transform duration-200 {isExpanded
                                ? 'rotate-180'
                                : ''}"
                            aria-hidden="true"
                        />
                    </button>
                {/if}
                <button
                    type="button"
                    class="focus-ring cursor-pointer inline-flex items-center justify-center rounded-control p-1 pointer-coarse:min-h-[44px] pointer-coarse:min-w-[44px] text-description transition-colors hover:bg-surface-overlay-hover hover:text-headline active:bg-surface-active focus:outline-none"
                    onclick={handleDismiss}
                    aria-label={strings.dismiss}
                    bind:this={dismissButton}
                >
                    <X class="size-5" aria-hidden="true" />
                </button>
            </div>
            {/if}
        </div>

        {#if toast.action && !snackbar}
            <!-- Indented to the title: past the 20px status icon and its 12px gap. -->
            <div class="mt-3 pl-[32px]">
                <Button
                    variant="secondary"
                    size="sm"
                    text={toast.action.label}
                    type="button"
                    data-toast-action
                    onclick={handleAction}
                />
            </div>
        {/if}

        {#if hasExpandable && isExpanded}
            <div
                id="toaster-expand-{toast.id}"
                class="mt-3"
                transition:slide={{ duration: motion(200) }}
            >
                <p class="text-sm text-description">{expandableText}</p>
                <Button
                    variant="primary"
                    size="sm"
                    text={strings.okay}
                    type="button"
                    class="mt-3"
                    onclick={handleOkay}
                />
            </div>
        {/if}
    </div>

    {#if timerActive && showCountdown}
        <div class="px-[16px] pb-3" transition:fade={{ duration: motion(180) }}>
            <p class="text-xs text-description" data-toast-countdown>
                {countdownText}
                <button
                    type="button"
                    class="focus-ring cursor-pointer rounded-control text-link underline-offset-2 hover:underline active:underline focus:outline-none pointer-coarse:inline-flex pointer-coarse:items-center pointer-coarse:min-h-[44px]"
                    onclick={handleStop}
                >
                    {strings.stop}
                </button>
            </p>
        </div>
    {:else if timerActive}
        <!-- The bar below shows the time left to the eye. For a screen reader
        it is here as words: outside the live region, so it is found when the
        toast is read and is not spoken again every second. -->
        <p class="sr-only" data-toast-countdown>{countdownText}</p>
    {/if}

    {#if timerActive && drawTimeLine}
        <div
            class="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-border/70 forced-colors:outline-1 forced-colors:-outline-offset-1 forced-colors:outline-[color:CanvasText]"
            data-toast-timeline
            transition:fade={{ duration: motion(180) }}
            aria-hidden="true"
        >
            <div
                class="h-full origin-left rtl:origin-right {progressFillClass} forced-colors:bg-[color:Highlight]! transition-transform duration-1000 ease-linear"
                style="transform: scaleX({count / maxSeconds})"
            ></div>
        </div>
    {/if}
</div>
