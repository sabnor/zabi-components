<script lang="ts">
    import ToasterToast from './ToasterToast.svelte';
    import { toastStore } from './toast-store.js';

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
</script>

<div
    class="pointer-events-none fixed bottom-4 right-4 z-toast flex min-w-0 w-[min(24rem,calc(100vw-2rem))] flex-col gap-2 p-4 {className}"
    role="region"
    aria-label="Notifications"
    aria-live="polite"
>
    {#each $toastStore as toast (toast.id)}
        <ToasterToast {toast} />
    {/each}
</div>
