<script lang="ts">
    import { toastStore, type ToastItem } from './toast-store.js';

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();

    let items = $state<ToastItem[]>([]);

    $effect(() => {
        const unsub = toastStore.subscribe((v) => {
            items = v;
        });
        return unsub;
    });
</script>

<div
    class="pointer-events-none fixed bottom-4 right-4 z-toast flex min-w-0 w-[min(24rem,calc(100vw-2rem))] flex-col gap-2 p-4 {className}"
    role="region"
    aria-label="Notifications"
    aria-live="polite"
>
    {#each items as toast (toast.id)}
        <div
            class="pointer-events-auto w-full min-w-0 rounded-lg border p-4 shadow-lg {toast.type === 'success'
                ? 'border-success bg-card text-success'
                : toast.type === 'error'
                  ? 'border-error bg-card text-error'
                  : toast.type === 'warning'
                    ? 'border-warning bg-card text-warning'
                    : 'border-border bg-card text-body'}"
            role={toast.type === 'error' ? 'alert' : 'status'}
        >
            <div class="flex items-start gap-3">
                <p class="min-w-0 flex-1 text-sm">{toast.message}</p>
                <button
                    type="button"
                    class="shrink-0 cursor-pointer rounded-md text-description hover:text-headline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    onclick={() => toastStore.dismiss(toast.id)}
                    aria-label="Dismiss notification"
                >
                    ×
                </button>
            </div>
        </div>
    {/each}
</div>
