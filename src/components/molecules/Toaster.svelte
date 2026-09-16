<script lang="ts">
    import ToasterToast from './ToasterToast.svelte';
    import { toastStore } from './toast-store.js';
    import { cn } from "../util/cn.js";

    interface Props {
        class?: string;
    }

    let { class: className = '' }: Props = $props();
</script>

<div
    class={cn("pointer-events-none fixed bottom-4 right-4 z-toast flex min-w-0 w-[min(24rem,calc(100vw-2rem))] flex-col gap-2 p-4", className)}
    role="region"
    aria-label="Notifications"
>
    <!-- Each toast owns its role="status"/"alert"; a region-level aria-live would announce twice. -->
    {#each $toastStore as toast (toast.id)}
        <ToasterToast {toast} />
    {/each}
</div>
