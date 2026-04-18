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

    interface Props {
        toast: ToastItem;
    }

    let { toast }: Props = $props();

    /** Seconds until auto-dismiss; `0` means no countdown (manual dismiss only). */
    function autoDismissSeconds(duration: number | undefined): number {
        if (duration === undefined) return 14;
        if (duration <= 0) return 0;
        return Math.max(1, Math.ceil(duration / 1000));
    }

    const maxSeconds = $derived(autoDismissSeconds(toast.duration));

    let count = $state(0);
    let timerActive = $state(false);
    let isExpanded = $state(false);

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

    function handleOkay() {
        isExpanded = false;
    }

    const toastEnter = { y: 18, duration: 260, opacity: 0, easing: cubicOut };
    const toastLeave = { y: 14, duration: 300, opacity: 0, easing: cubicOut };
</script>

<div
    class="pointer-events-auto relative w-full min-w-[18rem] overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-xl"
    in:fly={toastEnter}
    out:fly={toastLeave}
    role={toast.type === 'error' ? 'alert' : 'status'}
>
    <div class="p-4">
        <div class="flex items-start gap-3">
            <div class="shrink-0 pt-0.5">
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
            <h4 class="min-w-0 flex-1 text-base font-semibold text-headline">
                {headerTitle}
            </h4>
            <div class="flex shrink-0 items-center gap-0.5">
                {#if hasExpandable}
                    <button
                        type="button"
                        class="focus-ring cursor-pointer rounded-md p-1 text-description transition-colors hover:bg-base-100 hover:text-headline focus:outline-none"
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
                    class="focus-ring cursor-pointer rounded-md p-1 text-description transition-colors hover:bg-base-100 hover:text-headline focus:outline-none"
                    onclick={handleDismiss}
                    aria-label="Dismiss notification"
                >
                    <X class="size-5" aria-hidden="true" />
                </button>
            </div>
        </div>

        {#if hasExpandable && isExpanded}
            <div
                id="toaster-expand-{toast.id}"
                class="mt-3"
                transition:slide={{ duration: 200 }}
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
        <div class="px-4 pb-3" transition:fade={{ duration: 180 }}>
            <p class="text-xs text-description">
                This message will close in {count} seconds.
                <button
                    type="button"
                    class="focus-ring cursor-pointer rounded-sm text-link underline-offset-2 hover:underline focus:outline-none"
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
            transition:fade={{ duration: 180 }}
            aria-hidden="true"
        >
            <div
                class="h-full {progressFillClass} transition-all duration-1000 ease-linear"
                style="width: {(count / maxSeconds) * 100}%"
            ></div>
        </div>
    {/if}
</div>
