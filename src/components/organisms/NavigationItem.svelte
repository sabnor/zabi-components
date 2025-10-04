<script lang="ts">
    import type { NavigationItem } from "../../lib/navigation-utils";

    export let item: NavigationItem;
    export let isActive: boolean = false;
    export let currentPath: string = "";
    export let onItemClick: (item: NavigationItem, event: MouseEvent) => void;

    function handleClick(event: MouseEvent) {
        onItemClick(item, event);
    }
</script>

<li class="nav-item" class:active={isActive}>
    {#if item.href}
        <a
            href={item.href}
            class="nav-link"
            class:disabled={item.disabled}
            class:external={item.external}
            on:click={handleClick}
            aria-current={currentPath === item.href ? "page" : undefined}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
        >
            {#if item.icon}
                <svelte:component this={item.icon} class="nav-icon" />
            {/if}
            <span class="nav-label">{item.label}</span>
            {#if item.external}
                <svg
                    class="external-icon text-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                >
                    <path
                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                    />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
            {/if}
        </a>
    {:else}
        <button
            class="nav-button"
            class:disabled={item.disabled}
            on:click={handleClick}
            disabled={item.disabled}
        >
            {#if item.icon}
                <svelte:component this={item.icon} class="nav-icon" />
            {/if}
            <span class="nav-label">{item.label}</span>
        </button>
    {/if}

    {#if item.children && item.children.length > 0}
        <ul class="nav-submenu" role="menu">
            {#each item.children as child (child.id)}
                <li class="nav-subitem">
                    <a
                        href={child.href}
                        class="nav-sublink"
                        on:click={(e) =>
                            onItemClick(child, e as unknown as MouseEvent)}
                        aria-current={currentPath === child.href
                            ? "page"
                            : undefined}
                    >
                        {#if child.icon}
                            <svelte:component
                                this={child.icon}
                                class="nav-icon"
                            />
                        {/if}
                        <span class="nav-label">{child.label}</span>
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</li>

