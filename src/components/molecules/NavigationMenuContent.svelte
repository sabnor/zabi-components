<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";
    import { cn } from "../util/cn.js";
    import {
        NAVIGATION_MENU_CONTEXT_KEY,
        navigationMenuPanelId,
        type NavigationMenuContextValue,
    } from "./navigation-menu-context.js";

    interface Props {
        value?: string;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        children?: Snippet;
    }

    let {
        value = "",
        class: classAttr = "",
        className: legacyClass = "",
        children,
        ...restProps
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));

    let contentElement = $state<HTMLElement | null>(null);

    const context = getContext<NavigationMenuContextValue>(
        NAVIGATION_MENU_CONTEXT_KEY,
    );

    const isActive = $derived(context?.activeItem === value);

    const panelId = $derived(
        context
            ? navigationMenuPanelId(context.menuInstanceId, value)
            : "",
    );

    /** Disclosure panel: one document listener while open, removed on close/unmount. */
    $effect(() => {
        if (!isActive || !contentElement) return;
        const panel: HTMLElement = contentElement;

        const parentItem = panel.closest<HTMLElement>(
            "[data-navigation-menu-item]",
        );

        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (!panel.contains(target) && !parentItem?.contains(target)) {
                context?.setActiveItem(null);
            }
        }

        function handleKeydown(event: KeyboardEvent) {
            if (event.key !== "Escape") return;
            event.preventDefault();
            context?.setActiveItem(null);
            parentItem
                ?.querySelector<HTMLElement>("[data-navigation-menu-trigger]")
                ?.focus();
        }

        document.addEventListener("mousedown", handleClickOutside);
        panel.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            panel.removeEventListener("keydown", handleKeydown);
        };
    });
</script>

{#if isActive}
    <div
        bind:this={contentElement}
        id={panelId || undefined}
        class={cn("absolute left-0 top-full mt-2 bg-surface-overlay rounded-control shadow-lg border border-border p-4 z-dropdown min-w-[200px] transition-all duration-200 ease-in-out", className)}
        data-navigation-menu-content
        {...restProps}
    >
        {@render children?.()}
    </div>
{/if}
