<script lang="ts">
    interface Props {
        message?: string;
        type?: "success" | "error" | "warning" | "info";
        closable?: boolean;
        onclick?: (event: Event) => void;
    }

    let {
        message = "",
        type = "info",
        closable = true,
        onclick,
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

    let isVisible = $state(true);

    // Simple type classes
    const typeClasses = {
        success: "bg-green-100 border-green-300 text-green-800",
        error: "bg-red-100 border-red-300 text-red-800",
        warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
        info: "bg-blue-100 border-blue-300 text-blue-800",
    };

    function closeToast(event: Event) {
        isVisible = false;
        if (onclick) {
            onclick(event);
        }
    }
</script>

{#if isVisible}
    <div
        class="fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 z-50"
        role="alert"
        {...restProps}
    >
        <div class="flex items-start">
            <div class="flex-1">
                <p class="text-sm {typeClasses[type]}">{message}</p>
            </div>

            {#if closable}
                <button
                    type="button"
                    class="ml-3 text-gray-400 hover:text-gray-600"
                    onclick={closeToast}
                    aria-label="Close notification"
                >
                    ×
                </button>
            {/if}
        </div>
    </div>
{/if}
