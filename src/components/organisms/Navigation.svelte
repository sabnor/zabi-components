<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let variant: "header" | "sidebar" = "header";
    export let items: Array<{ label: string; href: string; icon?: any }> = [];
    export let currentPath = "";
    export let className = "";

    const dispatch = createEventDispatcher();

    function handleClick(item: any, event: MouseEvent) {
        event.preventDefault();
        dispatch("navigate", { item, href: item.href });
    }
</script>

<nav class="nav nav-{variant} {className}" role="navigation">
    {#if variant === "header"}
        <ul class="nav-list">
            {#each items as item}
                <li class="nav-item">
                    <a
                        href={item.href}
                        class="nav-link"
                        class:active={currentPath === item.href}
                        on:click={(e) => handleClick(item, e as MouseEvent)}
                    >
                        {#if item.icon}
                            <svelte:component
                                this={item.icon}
                                class="nav-icon"
                            />
                        {/if}
                        {item.label}
                    </a>
                </li>
            {/each}
        </ul>
    {:else}
        <ul class="nav-list nav-vertical">
            {#each items as item}
                <li class="nav-item">
                    <a
                        href={item.href}
                        class="nav-link"
                        class:active={currentPath === item.href}
                        on:click={(e) => handleClick(item, e as MouseEvent)}
                    >
                        {#if item.icon}
                            <svelte:component
                                this={item.icon}
                                class="nav-icon"
                            />
                        {/if}
                        {item.label}
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</nav>

<style>
    .nav {
        @apply flex items-center;
    }

    .nav-header {
        @apply justify-between;
    }

    .nav-sidebar {
        @apply flex-col space-y-2;
    }

    .nav-list {
        @apply flex space-x-4;
    }

    .nav-vertical {
        @apply flex-col space-x-0 space-y-1;
    }

    .nav-link {
        @apply flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors;
        @apply text-gray-600 hover:text-gray-900 hover:bg-gray-100;
    }

    .nav-link.active {
        @apply text-blue-600 bg-blue-50;
    }

    .nav-icon {
        @apply w-4 h-4;
    }
</style>
