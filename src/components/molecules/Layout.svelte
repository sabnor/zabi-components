<script lang="ts">
    interface Props {
        variant?: "main" | "sidebar" | "grid";
        gap?: string;
        className?: string;
    }

    let {
        variant = "main",
        gap = "md",
        className = "",
        children,
        header,
        main,
        footer,
        sidebar,
        ...restProps
    } = $props<
        Props & {
            children?: any;
            header?: any;
            main?: any;
            footer?: any;
            sidebar?: any;
        }
    >();

    let gapClass = $derived(`gap-${gap}`);
</script>

<div class="layout layout-{variant} {gapClass} {className}" {...restProps}>
    {#if variant === "main"}
        <header class="layout-header">
            {@render header?.()}
        </header>
        <main class="layout-main">
            {@render main?.()}
        </main>
        <footer class="layout-footer">
            {@render footer?.()}
        </footer>
    {:else if variant === "sidebar"}
        <aside class="layout-sidebar">
            {@render sidebar?.()}
        </aside>
        <main class="layout-main">
            {@render main?.()}
        </main>
    {:else if variant === "grid"}
        <div class="layout-grid">
            {@render children?.()}
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
        @apply w-64 bg-surface-secondary border-r border-border;
    }

    .layout-grid {
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
    }

    .layout-header {
        @apply bg-surface border-b border-border p-4;
    }

    .layout-footer {
        @apply bg-surface-secondary border-t border-border p-4 mt-auto;
    }
</style>
