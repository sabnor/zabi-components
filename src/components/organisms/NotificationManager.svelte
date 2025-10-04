<script lang="ts">
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    export let notifications: Array<{
        id: string;
        type: "success" | "error" | "warning" | "info" | "default";
        message: string;
        duration?: number;
    }> = [];
    export let position:
        | "top-right"
        | "top-left"
        | "bottom-right"
        | "bottom-left" = "top-right";
    export let maxNotifications = 5;

    const dispatch = createEventDispatcher<{
        close: void;
    }>();

    const baseClasses =
        "px-4 py-3 rounded-md border flex items-center justify-between mb-3 shadow-lg";

    const typeClasses = {
        success: "bg-success-surface border-success text-success-text",
        error: "bg-error-surface border-error text-error-text",
        warning: "bg-warning-surface border-warning text-warning-text",
        info: "bg-info-surface border-info text-info-text",
        default: "bg-surface border-border text-text",
    };

    const iconPaths = {
        success: "M5 13l4 4L19 7",
        error: "M6 18L18 6M6 6l12 12",
        warning:
            "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16c-.77.833.192 2.5 1.732 2.5z",
        info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        default: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    };

    const positionClasses = {
        "top-right": "fixed top-4 right-4",
        "top-left": "fixed top-4 left-4",
        "bottom-right": "fixed bottom-4 right-4",
        "bottom-left": "fixed bottom-4 left-4",
    };

    function getNotificationClasses(type: string): string {
        return `${baseClasses} ${typeClasses[type] || typeClasses.default}`;
    }

    function getIcon(type: string): string {
        return iconPaths[type] || iconPaths.default;
    }

    function removeNotification(id: string) {
        dispatch("close");
    }

    // Auto-remove notifications after duration
    $: if (notifications.length > 0) {
        notifications.forEach((notification) => {
            if (notification.duration && notification.duration > 0) {
                setTimeout(() => {
                    removeNotification(notification.id);
                }, notification.duration);
            }
        });
    }

    // Limit number of notifications
    $: if (notifications.length > maxNotifications) {
        notifications = notifications.slice(-maxNotifications);
    }
</script>

<!-- Notification Container -->
{#if notifications.length > 0}
    <div class="{positionClasses[position]} z-50 max-w-sm w-full space-y-2">
        {#each notifications as notification (notification.id)}
            <div
                transition:fly={{
                    x: position.includes("right") ? 300 : -300,
                    duration: 300,
                }}
                class={getNotificationClasses(notification.type)}
            >
                <div class="flex items-center">
                    <!-- Icon -->
                    <svg
                        class="w-5 h-5 mr-3 flex-shrink-0 text-current"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d={getIcon(notification.type)}
                        />
                    </svg>

                    <!-- Message -->
                    <span class="text-sm font-medium flex-1">
                        {notification.message}
                    </span>
                </div>

                <!-- Close Button -->
                <button
                    on:click={() => removeNotification(notification.id)}
                    class="ml-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Close notification"
                >
                    <svg
                        class="w-4 h-4 text-current"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        {/each}
    </div>
{/if}
