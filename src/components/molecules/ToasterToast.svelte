<script lang="ts">
    import { onMount } from 'svelte';
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
    import {
        DEFAULT_TOASTER_STRINGS,
        resolveToastDuration,
        TOAST_SECONDS_AFTER_HOLD,
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
    }

    let {
        class: className = "",
        toast,
        strings = DEFAULT_TOASTER_STRINGS,
        showCountdown = false,
        defaultDuration,
        onpausechange,
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

    const title = $derived(toast.title?.trim() ?? "");
    const message = $derived(toast.message.trim());

    /**
     * What a toast pushed with neither a title nor a message says: a word
     * for its type. A toast with a message says the message.
     */
    const fallbackTitle = $derived(
        toast.type === 'success'
            ? strings.successTitle
            : toast.type === 'error'
              ? strings.errorTitle
              : toast.type === 'warning'
                ? strings.warningTitle
                : strings.infoTitle,
    );

    /** The first line: the title, or the message when there is no title. */
    const headerTitle = $derived(title || message || fallbackTitle);
    /** The second line: the message, under a title that says something else. */
    const secondLine = $derived(title && message && message !== title ? message : "");

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

    onMount(() => {
        const max = maxSeconds;
        if (max <= 0) {
            return () => {};
        }
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

        return () => {
            if (intervalRef !== undefined) {
                clearInterval(intervalRef);
                intervalRef = undefined;
            }
        };
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
     * The kind of pointer last seen on the toast. After a tap a browser makes
     * up mouse events for it, `mouseenter` among them and never a
     * `mouseleave`: taken for a mouse, a tap held the timer for good.
     */
    let lastPointer: string | undefined;

    function handlePointerEnter(event: PointerEvent) {
        lastPointer = event.pointerType;
        // A mouse, or a stylus in range. A finger is over the toast only while it is on it.
        if (event.pointerType !== "touch") hovered = true;
    }

    function handlePointerLeave(event: PointerEvent) {
        if (event.pointerType !== "touch") hovered = false;
    }

    function handleMouseEnter() {
        if (lastPointer !== "touch") hovered = true;
    }

    function handlePointerDown(event: PointerEvent) {
        lastPointer = event.pointerType;
        if (event.pointerType === "touch") held = true;
    }

    /**
     * The finger lifts, or the browser takes the touch for a scroll. The
     * timer runs again, with time left to do something about the toast: it
     * was held because someone was reading it.
     */
    function handlePointerRelease(event: PointerEvent) {
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
    const reducedMotion =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = (duration: number) => (reducedMotion ? 0 : duration);

    const toastEnter = { y: 18, duration: motion(260), opacity: 0, easing: cubicOut };
    const toastLeave = { y: 14, duration: motion(300), opacity: 0, easing: cubicOut };
</script>

<div
    class={cn("pointer-events-auto relative w-full min-w-[min(18rem,100%)] shrink-0 overflow-hidden rounded-overlay border border-border-overlay bg-surface-overlay shadow-lg", className)}
    in:fly={toastEnter}
    out:fly={toastLeave}
    onpointerenter={handlePointerEnter}
    onpointerleave={handlePointerLeave}
    onpointerdown={handlePointerDown}
    onpointerup={handlePointerRelease}
    onpointercancel={handlePointerRelease}
    onmouseenter={handleMouseEnter}
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
    <div class="p-[16px]">
        <!-- The title keeps 8rem at least, icon included. When the toast has
        less beside its buttons (320px with enlarged text), the buttons go to a
        line of their own under it, at the end. -->
        <div class="flex flex-wrap items-start gap-x-[12px] gap-y-[4px]">
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
            <div class="min-w-0 flex-1">
                <!-- A heading when the app gave the toast a title (or nothing
                at all); a message on its own is a sentence, not a heading. -->
                {#if title || !message}
                    <h4 class="text-base font-semibold text-headline [overflow-wrap:anywhere]">
                        {headerTitle}
                    </h4>
                {:else}
                    <p class="text-base font-medium text-headline [overflow-wrap:anywhere]" data-toast-message>
                        {headerTitle}
                    </p>
                {/if}
                {#if secondLine}
                    <p class="mt-1 text-sm text-description [overflow-wrap:anywhere]" data-toast-message>
                        {secondLine}
                    </p>
                {/if}
                {#if toast.action}
                    <!-- The button sits outside the live region, so this is how a screen reader user hears that there is one. -->
                    <span class="sr-only">{strings.actionAvailable(toast.action.label)}</span>
                {/if}
            </div>
            </div>
            <div class="ms-auto flex shrink-0 items-center gap-1">
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
        </div>

        {#if toast.action}
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

    {#if timerActive}
        <div
            class="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-border/70"
            transition:fade={{ duration: motion(180) }}
            aria-hidden="true"
        >
            <div
                class="h-full {progressFillClass} transition-all duration-1000 ease-linear"
                style="width: {(count / maxSeconds) * 100}%"
            ></div>
        </div>
    {/if}
</div>
