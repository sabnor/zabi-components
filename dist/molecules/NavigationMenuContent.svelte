<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";
    import { onMount } from "svelte";
    import {
        NAVIGATION_MENU_CONTEXT_KEY,
        navigationMenuPanelId,
        type NavigationMenuContextValue,
    } from "./navigation-menu-context.js";

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

    const context = getContext<NavigationMenuContextValue>(
        NAVIGATION_MENU_CONTEXT_KEY,
    );

    const isActive = $derived(context?.activeItem === value);

    const panelId = $derived(
        context
            ? navigationMenuPanelId(context.menuInstanceId, value)
            : "",
    );

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
        id={panelId || undefined}
        class="absolute left-0 top-full mt-2 bg-card rounded-lg shadow-lg border border-border p-4 z-dropdown min-w-[200px] transition-all duration-200 ease-in-out {className}"
        role="menu"
        onkeydown={handleKeydown}
        data-navigation-menu-content
        tabindex="-1"
        {...restProps}
    >
        {@render children?.()}
    </div>
{/if}
