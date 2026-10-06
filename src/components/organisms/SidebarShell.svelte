<script lang="ts">
    import { zabiCommonStrings } from "../util/zabi-strings.js";
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Drawer from "../molecules/Drawer.svelte";
    import { cn } from "../util/cn.js";
    import type { DrawerCloseReason } from "../util/drawer.js";

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
     *
     * A sidebar is 266px wide, which a phone does not have beside its
     * content. With `mobile="drawer"` the rail is only there from the `lg`
     * breakpoint (1024px) up; below it the same regions open in a Drawer from
     * the start edge, with the Drawer's focus trap, Escape and backdrop:
     *
     * ```svelte
     * <SidebarShell mobile="drawer" bind:isOpen drawerTitle="Menu">
     *     {#snippet trigger({ props, toggle })}
     *         <IconButton label="Menu" onclick={toggle} {...props}><Menu /></IconButton>
     *     {/snippet}
     *     …
     * </SidebarShell>
     * ```
     *
     * `trigger` is rendered where the rail would be, below `lg` only; leave
     * it out and open the drawer from a button of your own by setting
     * `isOpen`. The drawer closes when a link in it is followed.
     */

    /** What the `trigger` snippet gets. */
    export interface SidebarTriggerContext {
        isOpen: boolean;
        toggle: () => void;
        /** Spread on the button: it says what the button opens, and whether it is open. */
        props: { "aria-haspopup": "dialog"; "aria-expanded": boolean };
    }

    /** What closed the drawer: the user, a link that was followed, or the screen reaching `lg`. */
    export type SidebarDrawerCloseReason = DrawerCloseReason | "navigate" | "resize";

    /** Passed to every region so it can match the shell's collapse and inset. */
    export interface SidebarRegionContext {
        collapsed: boolean;
        /** Horizontal padding utility the shell's own regions use. */
        insetX: string;
    }

    // `children` here is a snippet that takes the region context; the one in
    // `HTMLAttributes` takes nothing, and the two together accepted neither.
    type Props = Omit<HTMLAttributes<HTMLElement>, "class" | "onclose" | "children"> & {
        mode?: "expanded" | "collapsed";
        /** `rail` attaches to the viewport edge; `card` is a floating panel. */
        layout?: "rail" | "card";
        ariaLabel?: string;
        /** Accessible name of the scrolling region between header and footer. */
        label?: string;
        /**
         * What the sidebar is below the `lg` breakpoint. `none`: the rail, as
         * everywhere. `drawer`: the rail is hidden there and its regions open
         * in a Drawer from the start edge instead.
         */
        mobile?: "none" | "drawer";
        /** Whether the drawer is open. Bindable. Only used with `mobile="drawer"`. */
        isOpen?: boolean;
        /** Heading of the drawer, and its accessible name. Without it, `ariaLabel` is. */
        drawerTitle?: string;
        /** Accessible name of the drawer's close button. */
        closeLabel?: string;
        /** Fired when the drawer closes itself, with why. */
        onclose?: (detail: { reason: SidebarDrawerCloseReason }) => void;
        /**
         * The button that opens the drawer, rendered in the rail's place below
         * `lg`. Optional: a button anywhere that sets `isOpen` does the same.
         */
        trigger?: Snippet<[SidebarTriggerContext]>;
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
        label = "Navigation links",
        mobile = "none",
        isOpen = $bindable<Exclude<Props["isOpen"], undefined>>(),
        drawerTitle = undefined,
        closeLabel: closeLabelGiven,
        onclose,
        trigger,
        class: classAttr = "",
        className: legacyClass = "",
        header,
        children,
        footer,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (isOpen === undefined) isOpen = false;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    /** Words many components share: a `ZabiStringsProvider` above this one may give them; else English. */
    const common = zabiCommonStrings();
    const closeLabel = $derived(closeLabelGiven ?? common().close);

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
        // `flex` and `max-lg:hidden` must not both apply below `lg`: with
        // the drawer mode the rail is a flex box from `lg` up only.
        const display = asDrawer ? "hidden lg:flex" : "flex";
        const baseClasses = `${display} h-full min-h-0 max-h-full flex-col overflow-visible ${verticalPad}`;

        return cn(`${baseClasses} ${widthClass} ${surfaceClasses} ${className}`);
    });

    const region = $derived({ collapsed: isCollapsed, insetX });

    const asDrawer = $derived(mobile === "drawer");
    /** In the drawer the sidebar is always spelled out, and the drawer's own padding is the inset. */
    const drawerRegion: SidebarRegionContext = { collapsed: false, insetX: "px-0" };

    function closeDrawer(reason: SidebarDrawerCloseReason) {
        if (!isOpen) return;
        isOpen = false;
        onclose?.({ reason });
    }

    // From `lg` up the rail is there: a drawer left open would cover it.
    $effect(() => {
        if (!asDrawer || typeof window.matchMedia !== "function") return;
        const wide = window.matchMedia("(min-width: 1024px)");
        const onChange = () => {
            if (wide.matches) closeDrawer("resize");
        };
        onChange();
        wide.addEventListener("change", onChange);
        return () => wide.removeEventListener("change", onChange);
    });

    /** A link in the drawer was followed: the page it leads to is behind the drawer. */
    function handleDrawerClick(event: MouseEvent) {
        if (!(event.target instanceof Element)) return;
        if (event.target.closest("a[href]")) closeDrawer("navigate");
    }

    const triggerContext = $derived<SidebarTriggerContext>({
        isOpen,
        toggle: () => (isOpen ? closeDrawer("close-button") : (isOpen = true)),
        props: { "aria-haspopup": "dialog", "aria-expanded": isOpen },
    });
</script>

{#snippet regions(context: SidebarRegionContext, inDrawer: boolean)}
    <div class={cn("flex w-full min-w-0 flex-col", !inDrawer && "min-h-0 flex-1")}>
        {#if header}
            <div class={cn("flex w-full shrink-0 flex-col gap-5 pb-3", context.insetX)}>
                {@render header(context)}
            </div>
        {/if}

        <!-- In the drawer the drawer's body scrolls, so this region does not. -->
        <div
            class={cn(
                "flex min-w-0 flex-col gap-3 pt-4 pb-2",
                !inDrawer &&
                    "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain",
                context.insetX,
            )}
            role="region"
            aria-label={label}
        >
            {@render children?.(context)}
        </div>
    </div>

    {#if footer}
        {@render footer(context)}
    {/if}
{/snippet}

<nav class={containerClasses} aria-label={ariaLabel} {...restProps}>
    {@render regions(region, false)}
</nav>

{#if asDrawer}
    {#if trigger}
        <div class="lg:hidden" data-sidebar-trigger>
            {@render trigger(triggerContext)}
        </div>
    {/if}
    <!-- The same regions, in a Drawer. Rendered only while it is open, so
    nothing of the sidebar is in the page twice until then, and the server
    renders the rail alone. -->
    <Drawer
        bind:isOpen
        side="start"
        size="sm"
        title={drawerTitle || ariaLabel}
        {closeLabel}
        onclose={(detail) => onclose?.(detail)}
        class="lg:hidden"
    >
        <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
        <nav
            class="flex w-full min-w-0 flex-col text-headline"
            aria-label={ariaLabel}
            data-sidebar-drawer
            onclick={handleDrawerClick}
        >
            {@render regions(drawerRegion, true)}
        </nav>
    </Drawer>
{/if}
