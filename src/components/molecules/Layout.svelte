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
        ...restProps
    }: Props = $props();

    let gapClass = $derived(`gap-${gap}`);
</script>

<div
    class="min-h-screen layout-{variant} {gapClass} {className}"
    {...restProps}
>
    {#if variant === "main"}
        <header class="bg-surface border-b border-border p-4">
            <slot name="header" />
        </header>
        <main class="flex flex-col">
            <slot name="main" />
        </main>
        <footer class="bg-surface-secondary border-t border-border p-4 mt-auto">
            <slot name="footer" />
        </footer>
    {:else if variant === "sidebar"}
        <aside class="w-64 bg-surface-secondary border-r border-border">
            <slot name="sidebar" />
        </aside>
        <main class="flex flex-col">
            <slot name="main" />
        </main>
    {:else if variant === "grid"}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <slot />
        </div>
    {/if}
</div>
