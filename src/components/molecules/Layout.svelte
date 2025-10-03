<script lang="ts">
    export let variant: "main" | "sidebar" | "grid" = "main";
    export let gap = "md";
    export let className = "";

    $: gapClass = `gap-${gap}`;
</script>

<div class="layout layout-{variant} {gapClass} {className}">
    {#if variant === "main"}
        <header class="layout-header">
            <slot name="header" />
        </header>
        <main class="layout-main">
            <slot name="main" />
        </main>
        <footer class="layout-footer">
            <slot name="footer" />
        </footer>
    {:else if variant === "sidebar"}
        <aside class="layout-sidebar">
            <slot name="sidebar" />
        </aside>
        <main class="layout-main">
            <slot name="main" />
        </main>
    {:else if variant === "grid"}
        <div class="layout-grid">
            <slot />
        </div>
    {/if}
</div>

<style>
    .layout {
        @apply min-h-screen;
    }

    .layout-main {
        @apply flex flex-col;
    }

    .layout-sidebar {
        @apply w-64 bg-gray-50 border-r border-gray-200;
    }

    .layout-grid {
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
    }

    .layout-header {
        @apply bg-white border-b border-gray-200 p-4;
    }

    .layout-footer {
        @apply bg-gray-50 border-t border-gray-200 p-4 mt-auto;
    }
</style>
