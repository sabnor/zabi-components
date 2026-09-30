<script lang="ts">
    import ToasterToast from './ToasterToast.svelte';
    import { toastStore } from './toast-store.js';
    import { cn } from "../util/cn.js";

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();

    let region = $state<HTMLDivElement>();

    /** What had focus before it entered the region; where it goes back to. */
    let cameFrom: HTMLElement | null = null;

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
        if (cameFrom?.isConnected) cameFrom.focus();
    });
</script>

<div
    class={cn("pointer-events-none fixed bottom-4 right-4 z-toast flex min-w-0 w-[min(24rem,calc(100vw-2rem))] flex-col gap-2 p-4", className)}
    role="region"
    aria-label="Notifications"
    data-zabi-toaster
    bind:this={region}
    onfocusin={handleFocusIn}
>
    <!-- Each toast owns its role="status"/"alert"; a region-level aria-live would announce twice. -->
    {#each $toastStore as toast (toast.id)}
        <ToasterToast {toast} />
    {/each}
</div>
