<script lang="ts">
    export let isVisible = false;
    export let title = "Performance Monitor";
</script>

{#if isVisible}
    <div
        class="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm"
    >
        <h3 class="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
        <div class="space-y-1 text-xs text-gray-600">
            <div>Performance monitoring is active</div>
            <div>Check browser dev tools for detailed metrics</div>
        </div>
    </div>
{/if}
