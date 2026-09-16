<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";

    /**
     * The chrome of a sidebar and nothing else: width, surface, collapse
     * behaviour, the inset its regions share, and a scroll container for the
     * middle.
     *
     * `SidebarNavigation` is a fully-specified sidebar driven by ~44 props —
     * excellent when your sidebar looks like that one, useless when it does
     * not, because the parts are not reachable. This is the same shell with
     * the regions left open, so you can drop in `SidebarBrandHeader`,
     * `SidebarNavSection` and `SidebarFooter` (or your own markup) and skip
     * the props you would never set.
     *
     * `SidebarNavigation` is built on it, so the two cannot drift apart.
     *
     * ```svelte
     * <SidebarShell mode="collapsed">
     *     {#snippet header({ collapsed })}
     *         <SidebarBrandHeader {collapsed} brandName="Zabi" />
     *     {/snippet}
     *     <SidebarNavSection title="Main" sectionKey="main">…</SidebarNavSection>
     *     {#snippet footer({ collapsed, insetX })}
     *         <SidebarFooter {collapsed} className={insetX} />
     *     {/snippet}
     * </SidebarShell>
     * ```
     */

    /** Passed to every region so it can match the shell's collapse and inset. */
    export interface SidebarRegionContext {
        collapsed: boolean;
        /** Horizontal padding utility the shell's own regions use. */
        insetX: string;
    }

    type Props = Omit<HTMLAttributes<HTMLElement>, "class"> & {
        mode?: "expanded" | "collapsed";
        /** `rail` attaches to the viewport edge; `card` is a floating panel. */
        layout?: "rail" | "card";
        ariaLabel?: string;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        /** Brand row, search — anything above the scrolling nav area. */
        header?: Snippet<[SidebarRegionContext]>;
        /** The scrolling middle. */
        children?: Snippet<[SidebarRegionContext]>;
        /** Account row, logout, theme toggle. Outside the scroll container. */
        footer?: Snippet<[SidebarRegionContext]>;
    };

    let {
        mode = "expanded",
        layout = "rail",
        ariaLabel = "Sidebar navigation",
        class: classAttr = "",
        className: legacyClass = "",
        header,
        children,
        footer,
        ...restProps
    }: Props = $props();

    const className = $derived(cn(classAttr, legacyClass));
    const isCollapsed = $derived(mode === "collapsed");
    const isCard = $derived(layout === "card");

    const insetX = $derived(isCollapsed ? "px-2" : "px-4");

    const containerClasses = $derived.by(() => {
        const widthClass = isCollapsed ? "w-[72px]" : "w-[266px]";
        const railSurface = "border-r border-border bg-background text-headline";
        const cardSurface =
            "border-r border-border bg-background text-headline shadow-sm";
        const surfaceClasses = isCard ? cardSurface : railSurface;
        const verticalPad = isCard ? "py-4" : "py-5";
        const baseClasses = `flex h-full min-h-0 max-h-full flex-col overflow-visible ${verticalPad}`;

        return cn(`${baseClasses} ${widthClass} ${surfaceClasses} ${className}`);
    });

    const region = $derived({ collapsed: isCollapsed, insetX });
</script>

<nav class={containerClasses} aria-label={ariaLabel} {...restProps}>
    <div class="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        {#if header}
            <div class={cn("flex w-full shrink-0 flex-col gap-5 pb-3", insetX)}>
                {@render header(region)}
            </div>
        {/if}

        <div
            class={cn(
                "flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden overscroll-y-contain pt-4 pb-2",
                insetX,
            )}
            role="region"
            aria-label="Navigation links"
        >
            {@render children?.(region)}
        </div>
    </div>

    {#if footer}
        {@render footer(region)}
    {/if}
</nav>
