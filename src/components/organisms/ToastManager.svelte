<script lang="ts">
    import { onMount } from "svelte";
    import Toast from "../atoms/Toast.svelte";

    export let position:
        | "top-right"
        | "top-left"
        | "bottom-right"
        | "bottom-left"
        | "top-center"
        | "bottom-center" = "top-right";
    export let maxToasts: number = 5;
    export let className: string = "";

    interface ToastData {
        id: string;
        title: string;
        message: string;
        type: "success" | "error" | "warning" | "info";
        duration: number;
        closable: boolean;
        showIcon: boolean;
    }

    let toasts: ToastData[] = [];
    let toastIdCounter = 0;

    // Public API methods
    export function show(toast: Partial<ToastData> & { message: string }) {
        const id = `toast-${++toastIdCounter}`;
        const newToast: ToastData = {
            id,
            title: "",
            message: "",
            type: "info",
            duration: 5000,
            closable: true,
            showIcon: true,
            ...toast,
        };

        // Remove oldest toast if we've reached the limit
        if (toasts.length >= maxToasts) {
            toasts = toasts.slice(1);
        }

        toasts = [...toasts, newToast];
        return id;
    }

    export function success(message: string, options: Partial<ToastData> = {}) {
        return show({
            message,
            type: "success",
            ...options,
        });
    }

    export function error(message: string, options: Partial<ToastData> = {}) {
        return show({
            message,
            type: "error",
            duration: 0, // Don't auto-dismiss errors
            ...options,
        });
    }

    export function warning(message: string, options: Partial<ToastData> = {}) {
        return show({
            message,
            type: "warning",
            ...options,
        });
    }

    export function info(message: string, options: Partial<ToastData> = {}) {
        return show({
            message,
            type: "info",
            ...options,
        });
    }

    export function close(id: string) {
        toasts = toasts.filter((toast) => toast.id !== id);
    }

    export function closeAll() {
        toasts = [];
    }

    export function update(id: string, updates: Partial<ToastData>) {
        toasts = toasts.map((toast) =>
            toast.id === id ? { ...toast, ...updates } : toast,
        );
    }

    function handleToastClose(event: CustomEvent<{ id: string }>) {
        close(event.detail.id);
    }

    function handleToastClick(
        event: CustomEvent<{ id: string; event: MouseEvent }>,
    ) {
        // Emit the click event for external handling
        // You can add custom logic here if needed
    }

    // Make methods available globally for easy access
    onMount(() => {
        // Add to window for global access (optional)
        if (typeof window !== "undefined") {
            (window as any).toast = {
                show,
                success,
                error,
                warning,
                info,
                close,
                closeAll,
                update,
            };
        }

        return () => {
            if (typeof window !== "undefined") {
                delete (window as any).toast;
            }
        };
    });
</script>

<!-- Toast Container -->
<div
    class="toast-manager fixed inset-0 pointer-events-none z-notification {className}"
>
    {#each toasts as toast (toast.id)}
        <Toast
            id={toast.id}
            title={toast.title}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            closable={toast.closable}
            showIcon={toast.showIcon}
            {position}
            on:close={handleToastClose}
            on:click={handleToastClick}
        />
    {/each}
</div>

<style>
    .toast-manager {
        /* Ensure toasts don't interfere with page interactions */
        pointer-events: none;
    }

    /* Re-enable pointer events for individual toasts */
    :global(.toast-manager > *) {
        pointer-events: auto;
    }

    /* Stack toasts with proper spacing */
    .toast-manager {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

</style>
