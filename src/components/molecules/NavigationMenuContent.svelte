<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";
    import { cn } from "../util/cn.js";
    import { isInsideToastRegion } from "../util/focus-utils.js";
    import { measurePlacement, watchViewport } from "../util/fit-in-viewport.js";
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

    /** Room kept between the panel and each side of the screen: its width is the viewport less 16px at most. */
    const VIEWPORT_MARGIN = 8;

    /**
     * How far the panel is moved from under the left edge of its item to stay on
     * screen, and its width limit when it is wider than the screen. The panel
     * of the second trigger used to span x 182 to 382 in a 375px viewport.
     */
    let leftOffset = $state(0);
    let maxWidth = $state<number | null>(null);
    /**
     * Set when a box that scrolls around the menu would cut the panel off: it
     * is then placed against the viewport with `position: fixed`, which such
     * a box does not clip, at these coordinates. It stays where it is in the
     * DOM, so Escape, the outside press and focus work as before.
     */
    let fixedAt = $state<{ left: number; top: number; width: number } | null>(null);

    // After the panel is in the DOM and before it is painted, then whenever the screen changes.
    $effect(() => {
        if (!isActive || !contentElement) {
            leftOffset = 0;
            maxWidth = null;
            fixedAt = null;
            return;
        }
        const panel: HTMLElement = contentElement;
        const anchor = panel.closest<HTMLElement>("[data-navigation-menu-item]") ?? panel;
        const update = () => {
            // The panel always opens below, from the left edge of its item
            // (`left-0`, in either writing direction, as it always has), and
            // is slid along that edge only as far as it takes to fit.
            const fit = measurePlacement(
                anchor,
                panel,
                { block: "bottom", inline: "start" },
                { margin: VIEWPORT_MARGIN, flipBlock: false, flipInline: false, rtl: false },
            );
            leftOffset = fit.inlineOffset;
            maxWidth = fit.maxWidth;
            fixedAt = fit.fixed;
        };
        update();
        return watchViewport(update, panel);
    });

    /** Disclosure panel: one document listener while open, removed on close/unmount. */
    $effect(() => {
        if (!isActive || !contentElement) return;
        const panel: HTMLElement = contentElement;

        const parentItem = panel.closest<HTMLElement>(
            "[data-navigation-menu-item]",
        );

        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            // A toast lies over the panel; a press on it is for the toast.
            if (isInsideToastRegion(target)) return;
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
        class={cn("absolute left-0 top-full mt-2 bg-surface-overlay rounded-overlay shadow-lg border border-border-overlay p-4 z-dropdown min-w-[200px] transition-[opacity,translate] duration-200 ease-in-out", className)}
        style:position={fixedAt ? "fixed" : undefined}
        style:top={fixedAt ? `${fixedAt.top}px` : undefined}
        style:left={fixedAt ? `${fixedAt.left}px` : leftOffset !== 0 ? `${leftOffset}px` : undefined}
        style:margin={fixedAt ? "0" : undefined}
        style:width={fixedAt ? `${fixedAt.width}px` : undefined}
        style:max-width={maxWidth !== null ? `${maxWidth}px` : undefined}
        style:min-width={maxWidth !== null ? "0" : undefined}
        data-navigation-menu-content
        {...restProps}
    >
        {@render children?.()}
    </div>
{/if}
