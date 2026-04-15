<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import ToasterToast from './ToasterToast.svelte';
    import { toastStore, type ToastItem } from './toast-store.js';

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();

    let items = $state<ToastItem[]>(get(toastStore));

    onMount(() => {
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
        <ToasterToast {toast} />
    {/each}
</div>
