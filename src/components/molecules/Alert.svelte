<script lang="ts">
    export let type: "error" | "warning" | "success" | "info" | "game-error" =
        "info";
    export let title: string = "";
    export let message: string = "";
    export let dismissible: boolean = true;
    export let onDismiss: (() => void) | null = null;

    function handleDismiss() {
        if (onDismiss) {
            onDismiss();
        }
    }

    $: alertClasses = {
        error: "bg-error-surface text-error-text border border-error/20",
        warning:
            "bg-warning-surface text-warning-text border border-warning/20",
        success:
            "bg-success-surface text-success-text border border-success/20",
        info: "bg-info-surface text-info-text border border-info/20",
        "game-error":
            "bg-gradient-to-br from-error-900 via-error-800 to-error-900 text-error-text transform shadow-2xl border border-error/30",
    };

    $: iconEmojis = {
        error: "🚫",
        warning: "⚠️",
        success: "✅",
        info: "ℹ️",
        "game-error": "🚫",
    };

    $: isGameStyle = type === "game-error";
</script>

<div
    class="relative rounded-xl p-4 shadow-lg {alertClasses[type]}"
    role="alert"
>
    <!-- Dismiss button (X in top right) -->
    {#if dismissible}
        <button
            on:click={handleDismiss}
            class="absolute top-3 right-3 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-all duration-200 group"
            aria-label="Dismiss alert"
            type="button"
        >
            <svg
                class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200"
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
    {/if}

    <!-- Content -->
    <div class="pr-8">
        {#if isGameStyle}
            <!-- Game-style alert with larger styling -->
            <div class="text-center">
                <div class="flex items-center justify-center gap-3 mb-4">
                    <div class="text-4xl">{iconEmojis[type]}</div>
                    {#if title}
                        <h3 class="text-xl font-bold">{title}</h3>
                    {/if}
                </div>

                {#if type === "game-error"}
                    <div class="bg-black bg-opacity-50 rounded-lg p-3 mb-4">
                        <p class="text-sm font-mono">> AUTHENTICATION FAILED</p>
                    </div>
                {/if}

                {#if message}
                    <p class="text-sm leading-relaxed">{message}</p>
                {/if}
            </div>
        {:else}
            <!-- Standard alert styling -->
            <div class="flex items-start gap-3">
                <div class="text-lg flex-shrink-0 mt-0.5">
                    {iconEmojis[type]}
                </div>
                <div class="flex-1 min-w-0">
                    {#if title}
                        <h4 class="font-semibold text-sm mb-1">{title}</h4>
                    {/if}
                    {#if message}
                        <p class="text-sm">{message}</p>
                    {/if}
                </div>
            </div>
        {/if}
    </div>

    <!-- Slot for custom content -->
    <slot />
</div>
