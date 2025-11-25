<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";
    import { onMount, onDestroy } from "svelte";

    const NAVIGATION_MENU_CONTEXT = Symbol("navigation-menu");

    interface Props {
        value?: string;
        className?: string;
        children?: Snippet;
    }

    let {
        value = "",
        className = "",
        children,
        ...restProps
    }: Props = $props();

    let contentElement = $state<HTMLElement | null>(null);
    let parentItem = $state<HTMLElement | null>(null);

    const context = getContext<{
        activeItem: string | null;
        setActiveItem: (item: string | null) => void;
        isMobile: boolean;
    }>(NAVIGATION_MENU_CONTEXT);

    const isActive = $derived(context?.activeItem === value);

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            event.preventDefault();
            context?.setActiveItem(null);
            const trigger = parentItem?.querySelector('[data-navigation-menu-trigger]') as HTMLElement;
            trigger?.focus();
        }
    }

    function handleClickOutside(event: MouseEvent) {
        if (
            contentElement &&
            !contentElement.contains(event.target as Node) &&
            parentItem &&
            !parentItem.contains(event.target as Node)
        ) {
            context?.setActiveItem(null);
        }
    }

    onMount(() => {
        if (contentElement) {
            parentItem = contentElement.closest('[data-navigation-menu-item]') as HTMLElement;
        }
        if (isActive) {
            document.addEventListener("mousedown", handleClickOutside);
        }
    });

    $effect(() => {
        if (isActive) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    });
</script>

{#if isActive}
    <div
        bind:this={contentElement}
        class="absolute left-0 top-full mt-2 bg-input rounded-lg shadow-lg border border-border p-4 z-dropdown min-w-[200px] transition-all duration-200 ease-in-out {className}"
        role="menu"
        onkeydown={handleKeydown}
        data-navigation-menu-content
        tabindex="-1"
        {...restProps}
    >
        {@render children?.()}
    </div>
{/if}
