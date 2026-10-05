<script lang="ts">
    import { onMount } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import { slide, fade, fly } from 'svelte/transition';
    import {
        AlertCircle,
        AlertTriangle,
        CheckCircle,
        ChevronDown,
        Info,
        X,
    } from '@lucide/svelte';
    import Button from '../atoms/Button.svelte';
    import { toastStore, type ToastItem } from './toast-store.js';
    import { cn } from "../util/cn.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        toast: ToastItem;
    }

    let { class: className = "", toast }: Props = $props();

    /**
     * Seconds until auto-dismiss; `0` means no countdown (manual dismiss only).
     * A toast with an action and no duration of its own stays: the user has to
     * be able to reach the button, and nothing pauses the timer on the way there.
     */
    function autoDismissSeconds(duration: number | undefined, hasAction: boolean): number {
        if (duration === undefined) return hasAction ? 0 : 14;
        if (duration <= 0) return 0;
        return Math.max(1, Math.ceil(duration / 1000));
    }

    const maxSeconds = $derived(autoDismissSeconds(toast.duration, !!toast.action));

    let count = $state(0);
    let timerActive = $state(false);
    let isExpanded = $state(false);
    /** Hover or keyboard focus inside the toast pauses auto-dismiss (WCAG 2.2.1). */
    let hovered = $state(false);
    let focusWithin = $state(false);
    const paused = $derived(hovered || focusWithin);

    let intervalRef: ReturnType<typeof setInterval> | undefined;

    const expandableText = $derived((toast.detail ?? toast.message).trim());

    const hasExpandable = $derived(expandableText.length > 0);

    const headerTitle = $derived.by(() => {
        const t = toast.title?.trim();
        if (t) return t;
        switch (toast.type) {
            case 'success':
                return 'Changes saved';
            case 'error':
                return 'Something went wrong';
            case 'warning':
                return 'Please review';
            default:
                return 'Notice';
        }
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
            if (hovered || focusWithin) return;
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

    function handleOkay() {
        isExpanded = false;
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
    onmouseenter={() => (hovered = true)}
    onmouseleave={() => (hovered = false)}
    onfocusin={() => (focusWithin = true)}
    onfocusout={handleFocusOut}
    role="group"
    aria-label={headerTitle}
    data-toast-id={toast.id}
    data-paused={paused}
>
    <div class="p-4">
        <!-- The title keeps 8rem at least, icon included. When the toast has
        less beside its buttons (320px with enlarged text), the buttons go to a
        line of their own under it, at the end. -->
        <div class="flex flex-wrap items-start gap-x-3 gap-y-1">
            <!-- Live region holds only title + message, so the countdown and buttons are never re-announced. -->
            <div
                class="flex min-w-0 flex-[1_1_8rem] items-start gap-3"
                role={toast.type === 'error' ? 'alert' : 'status'}
                aria-atomic="true"
            >
            <div class="shrink-0 mt-0.5">
                {#if toast.type === 'success'}
                    <CheckCircle class="size-5 {statusIconClass}" aria-hidden="true" />
                {:else if toast.type === 'error'}
                    <AlertCircle class="size-5 {statusIconClass}" aria-hidden="true" />
                {:else if toast.type === 'warning'}
                    <AlertTriangle class="size-5 {statusIconClass}" aria-hidden="true" />
                {:else}
                    <Info class="size-5 {statusIconClass}" aria-hidden="true" />
                {/if}
            </div>
            <h4 class="min-w-0 flex-1 text-base font-semibold text-headline [overflow-wrap:anywhere]">
                {headerTitle}
                {#if toast.message.trim() && toast.message.trim() !== headerTitle}
                    <span class="sr-only">{toast.message}</span>
                {/if}
                {#if toast.action}
                    <!-- The button sits outside the live region, so this is how a screen reader user hears that there is one. -->
                    <span class="sr-only">{toast.action.label} available.</span>
                {/if}
            </h4>
            </div>
            <div class="ms-auto flex shrink-0 items-center gap-1">
                {#if hasExpandable}
                    <button
                        type="button"
                        class="focus-ring cursor-pointer inline-flex items-center justify-center rounded-control p-1 pointer-coarse:min-h-11 pointer-coarse:min-w-11 text-description transition-colors hover:bg-surface-overlay-hover hover:text-headline active:bg-surface-active focus:outline-none"
                        aria-expanded={isExpanded}
                        aria-controls="toaster-expand-{toast.id}"
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
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
                    class="focus-ring cursor-pointer inline-flex items-center justify-center rounded-control p-1 pointer-coarse:min-h-11 pointer-coarse:min-w-11 text-description transition-colors hover:bg-surface-overlay-hover hover:text-headline active:bg-surface-active focus:outline-none"
                    onclick={handleDismiss}
                    aria-label="Dismiss notification"
                >
                    <X class="size-5" aria-hidden="true" />
                </button>
            </div>
        </div>

        {#if toast.action}
            <!-- Indented to the title: past the 20px status icon and its gap. -->
            <div class="mt-3 pl-8">
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
                    text="Okay"
                    type="button"
                    class="mt-3"
                    onclick={handleOkay}
                />
            </div>
        {/if}
    </div>

    {#if timerActive}
        <div class="px-4 pb-3" transition:fade={{ duration: motion(180) }}>
            <p class="text-xs text-description" data-toast-countdown>
                {paused ? 'Paused — closes' : 'This message will close'} in {count} seconds.
                <button
                    type="button"
                    class="focus-ring cursor-pointer rounded-control text-link underline-offset-2 hover:underline active:underline focus:outline-none pointer-coarse:inline-flex pointer-coarse:items-center pointer-coarse:min-h-11"
                    onclick={stopTimer}
                >
                    Click to stop
                </button>
            </p>
        </div>
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
