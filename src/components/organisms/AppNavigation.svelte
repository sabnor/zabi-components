<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import Badge from "../atoms/Badge.svelte";
    import BottomTabBar from "../molecules/BottomTabBar.svelte";
    import {
        activeTabHref,
        badgeText,
        defaultBadgeLabel,
        type BottomTabBarItem,
    } from "../util/bottom-tab-bar.js";
    import { getAppShell } from "../util/app-shell.js";
    import { cn } from "../util/cn.js";

    /**
     * The ready-made content for `AppShell`'s `navigation` slot: one list of
     * destinations that is a tab bar on a phone, a rail on a tablet and a
     * sidebar on a desktop.
     *
     * It takes the `BottomTabBar` items and draws them in whichever form the
     * shell is in, with CSS alone: it renders the tab bar and one side
     * `<nav>`, and the stylesheet shows exactly one of them (the other is
     * `display: none`, so only one landmark is exposed). The rail and the
     * sidebar are the same list of links restyled, so nothing is mounted again
     * when the window is resized past a breakpoint. Outside a shell, or in
     * tabs placement, it is the tab bar.
     *
     * - Rail (a tablet, or `navigationPlacement="rail"`): an 80px column, each
     *   destination an icon in the tab bar's pill above a one-line label.
     * - Sidebar (a desktop, or `"sidebar"`): a 256px column of 36px rows with
     *   the icon before the label and the count at the end of the row. The
     *   active row is the tinted fill alone.
     *
     * Both side forms are the page colour with one hairline on the content
     * side, as tall as the shell, and clear of the safe areas. The list
     * scrolls by itself when it is taller than the screen.
     *
     * ```svelte
     * <AppShell>
     *     {#snippet navigation()}
     *         <AppNavigation {items} active={page.url.pathname} />
     *     {/snippet}
     *     …
     * </AppShell>
     * ```
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
        /** The destinations, as for `BottomTabBar`: `{ href, label, icon, activeIcon?, badge? }`. */
        items: BottomTabBarItem[];
        /**
         * The href of the active destination, or the path of the current page:
         * the one for that page or the closest one above it is marked. Left
         * out, the navigation reads the address of the page once it runs in
         * the browser. In SvelteKit pass `page.url.pathname`, so the server
         * marks it too.
         */
        active?: string;
        /** Accessible name of the navigation landmark. */
        label?: string;
        /** What a count adds to the link's accessible name, after the label and a comma. */
        badgeLabel?: (count: number, item: BottomTabBarItem) => string;
        /** Counts above this show as `99+`. The accessible name keeps the real count. */
        badgeMax?: number;
        /** Draws the tab bar form as a floating capsule of glass (see `BottomTabBar`). */
        floating?: boolean;
        /**
         * Above the list in the rail and the sidebar: a logo, a workspace
         * switcher. Not shown as tabs. `placement` is the form the shell
         * says it is in; before the shell has measured the viewport (the
         * server, before mount) it is `sidebar`, the one a desktop shows.
         */
        header?: Snippet<[{ placement: "rail" | "sidebar" }]>;
        /** Below the list in the rail and the sidebar: an account row. Not shown as tabs. */
        footer?: Snippet<[{ placement: "rail" | "sidebar" }]>;
        class?: string;
    };

    let {
        items,
        active,
        label = "Main",
        badgeLabel = defaultBadgeLabel,
        badgeMax = 99,
        floating = false,
        header,
        footer,
        class: className = "",
        ...restProps
    }: Props = $props();

    const shell = getAppShell();
    const sidePlacement = $derived<"rail" | "sidebar">(
        shell?.navigationPlacement === "rail" ? "rail" : "sidebar",
    );

    /**
     * The page's own path, used while `active` is not given: empty on the
     * server and until mounted. The same rule as the tab bar's.
     */
    let locationPath = $state("");
    $effect(() => {
        if (active !== undefined) return;
        const read = () => {
            locationPath = window.location.pathname;
        };
        read();
        window.addEventListener("popstate", read);
        const navigation = (window as { navigation?: EventTarget }).navigation;
        navigation?.addEventListener("currententrychange", read);
        return () => {
            window.removeEventListener("popstate", read);
            navigation?.removeEventListener("currententrychange", read);
        };
    });
    const activeHref = $derived(activeTabHref(items, active ?? locationPath));

    /**
     * Colours are chosen here, not by an `aria-[current=page]:` variant: the
     * hand-written colour classes sit outside Tailwind's cascade layer and
     * would beat it (see TopNavbar). The geometry is in the style block.
     */
    function linkClasses(isActive: boolean): string {
        const base =
            "an-link focus-ring focus-ring--nav no-underline transition-colors duration-(--duration-base) motion-reduce:transition-none";
        return isActive
            ? cn(base, "font-semibold text-nav-menu-item-active")
            : cn(
                  base,
                  "font-medium text-nav-menu-item hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-surface-active",
              );
    }

    /** The active mark in forced colours: the fill is dropped there, so the shape is an outline. */
    const FORCED =
        "forced-colors:outline-2 forced-colors:-outline-offset-2 forced-colors:outline-[color:Highlight]";
</script>

<!-- The wrapper is what the stylesheet shows or hides: one form per placement. -->
<div class={cn("an", className)} {...restProps}>
    <div class="an-tabs">
        <BottomTabBar {items} {active} {label} {badgeLabel} {badgeMax} {floating} />
    </div>

    <nav
        aria-label={label}
        data-an-side
        class="an-side bg-surface-chrome border-e border-border-weak"
    >
        {#if header}
            <div class="an-header">{@render header({ placement: sidePlacement })}</div>
        {/if}
        <ul class="an-list">
            {#each items as item (item.href)}
                {@const isActive = item.href === activeHref}
                {@const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon}
                {@const count = item.badge ?? 0}
                <li class="an-item">
                    <a
                        href={item.href}
                        class={linkClasses(isActive)}
                        aria-current={isActive ? "page" : undefined}
                        aria-label={count > 0 ? `${item.label}, ${badgeLabel(count, item)}` : undefined}
                    >
                        <!-- One mark, two shapes: the tab bar's pill around the icon in the
                        rail, the whole row in the sidebar. Never an outline or a bar. -->
                        {#if isActive}
                            <span
                                aria-hidden="true"
                                class={cn("an-fill an-fill-rail bg-tabbar-active", FORCED)}
                            ></span>
                            <span
                                aria-hidden="true"
                                class={cn("an-fill an-fill-side bg-nav-menu-active", FORCED)}
                            ></span>
                        {/if}
                        <span aria-hidden="true" class="an-icon">
                            <Icon
                                size={24}
                                class="an-icon-svg shrink-0"
                                strokeWidth={isActive && !item.activeIcon ? 2.5 : undefined}
                            />
                        </span>
                        <span class="an-label">{item.label}</span>
                        {#if count > 0}
                            <span aria-hidden="true" class="an-badge">
                                <Badge
                                    size="sm"
                                    emphasis="solid"
                                    variant="error"
                                    class="h-[18px] min-h-[18px] min-w-[18px] px-[5px] py-0 text-[11px] leading-[18px] whitespace-nowrap ring-2 ring-(color:--an-badge-ring)"
                                >
                                    {badgeText(count, badgeMax)}
                                </Badge>
                            </span>
                        {/if}
                    </a>
                </li>
            {/each}
        </ul>
        {#if footer}
            <div class="an-footer">{@render footer({ placement: sidePlacement })}</div>
        {/if}
    </nav>
</div>

<style>
    /*
     * The placement comes from the ancestor `[data-navigation-placement]`
     * that AppShell sets, and the same two breakpoints it uses (48rem rail,
     * 64rem sidebar; util/app-shell.ts). With none (outside a shell) it is the
     * tab bar. Every size is in px or a custom property, so the rail and the
     * sidebar are one set of rules with different values.
     */
    .an {
        height: 100%;
    }
    .an-tabs {
        display: block;
    }
    .an-side {
        display: none;

        /* The rail: the defaults. The sidebar's values follow below. */
        --an-width: 80px;
        --an-pad-x: 4px;
        --an-list-gap: 8px;
        --an-dir: column;
        --an-justify: center;
        --an-gap: 0px;
        --an-link-pad-x: 4px;
        --an-min-h: 56px;
        --an-min-h-coarse: 56px;
        --an-radius: 20px;
        --an-icon-w: 56px;
        --an-icon-h: 32px;
        --an-icon-size: 24px;
        --an-label-size: clamp(11px, 0.75rem, 15.6px);
        --an-label-lh: 16px;
        --an-label-align: center;
        --an-label-flex: none;
        --an-label-width: 100%;
        --an-fill-rail-display: block;
        --an-fill-side-display: none;
        --an-badge-position: absolute;
        --an-badge-ms: 0px;
        --an-badge-ring: var(--color-surface-chrome);

        box-sizing: border-box;
        flex-direction: column;
        height: 100%;
        /* The column grows by the safe area it clears, so the width the app sees is the content's. */
        width: calc(var(--an-width) + env(safe-area-inset-left, 0px));
        padding-block: calc(env(safe-area-inset-top, 0px) + 8px) calc(env(safe-area-inset-bottom, 0px) + 8px);
        padding-inline: calc(env(safe-area-inset-left, 0px) + var(--an-pad-x)) var(--an-pad-x);
        overflow: hidden;
    }
    :global([dir="rtl"]) .an-side {
        padding-inline: var(--an-pad-x) calc(env(safe-area-inset-right, 0px) + var(--an-pad-x));
    }

    /* One form at a time: the other is not rendered at all, so only one landmark is exposed. */
    :global([data-navigation-placement="rail"]) .an-tabs,
    :global([data-navigation-placement="sidebar"]) .an-tabs {
        display: none;
    }
    :global([data-navigation-placement="rail"]) .an-side,
    :global([data-navigation-placement="sidebar"]) .an-side {
        display: flex;
    }
    @media (min-width: 48rem) {
        :global([data-navigation-placement="auto"]) .an-tabs {
            display: none;
        }
        :global([data-navigation-placement="auto"]) .an-side {
            display: flex;
        }
    }

    /* The sidebar: the same links, a row each. Forced, or from 64rem in auto. */
    :global([data-navigation-placement="sidebar"]) .an-side {
        --an-width: 256px;
        --an-pad-x: 12px;
        --an-list-gap: 2px;
        --an-dir: row;
        --an-justify: flex-start;
        --an-gap: 12px;
        --an-link-pad-x: 8px;
        --an-min-h: 2.25rem;
        --an-min-h-coarse: 2.75rem;
        --an-radius: var(--radius-control);
        --an-icon-w: 20px;
        --an-icon-h: 20px;
        --an-icon-size: 20px;
        --an-label-size: 0.875rem;
        --an-label-lh: 1.25rem;
        --an-label-align: start;
        --an-label-flex: 1 1 0;
        --an-label-width: auto;
        --an-fill-rail-display: none;
        --an-fill-side-display: block;
        --an-badge-position: static;
        --an-badge-ms: auto;
        --an-badge-ring: transparent;
    }
    @media (min-width: 64rem) {
        :global([data-navigation-placement="auto"]) .an-side {
            --an-width: 256px;
            --an-pad-x: 12px;
            --an-list-gap: 2px;
            --an-dir: row;
            --an-justify: flex-start;
            --an-gap: 12px;
            --an-link-pad-x: 8px;
            --an-min-h: 2.25rem;
            --an-min-h-coarse: 2.75rem;
            --an-radius: var(--radius-control);
            --an-icon-w: 20px;
            --an-icon-h: 20px;
            --an-icon-size: 20px;
            --an-label-size: 0.875rem;
            --an-label-lh: 1.25rem;
            --an-label-align: start;
            --an-label-flex: 1 1 0;
            --an-label-width: auto;
            --an-fill-rail-display: none;
            --an-fill-side-display: block;
            --an-badge-position: static;
            --an-badge-ms: auto;
            --an-badge-ring: transparent;
        }
    }

    .an-header,
    .an-footer {
        flex: none;
        min-width: 0;
    }
    .an-header {
        margin-block-end: 8px;
    }
    .an-footer {
        margin-block-start: 8px;
    }

    /* The list scrolls by itself when it is taller than the screen. */
    .an-list {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        gap: var(--an-list-gap);
        min-height: 0;
        margin: 0;
        /* Room for the count that sticks out above the first rail icon. */
        padding: 4px 0 0;
        list-style: none;
        overflow-y: auto;
    }
    .an-item {
        display: flex;
        flex: none;
    }

    .an-link {
        position: relative;
        display: flex;
        flex-direction: var(--an-dir);
        align-items: center;
        justify-content: var(--an-justify);
        gap: var(--an-gap);
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        min-height: var(--an-min-h);
        padding-inline: var(--an-link-pad-x);
        border-radius: var(--an-radius);
    }
    @media (pointer: coarse) {
        .an-link {
            min-height: var(--an-min-h-coarse);
        }
    }

    /* Behind the icon and the label: the pill in the rail, the row in the sidebar. */
    .an-fill {
        position: absolute;
        pointer-events: none;
    }
    .an-fill-rail {
        display: var(--an-fill-rail-display);
        top: 4px;
        inset-inline-start: calc(50% - 28px);
        width: 56px;
        height: 32px;
        border-radius: var(--radius-pill, 9999px);
    }
    .an-fill-side {
        display: var(--an-fill-side-display);
        inset: 0;
        border-radius: var(--an-radius);
    }

    .an-icon {
        position: relative;
        display: flex;
        flex: none;
        align-items: center;
        justify-content: center;
        width: var(--an-icon-w);
        height: var(--an-icon-h);
    }
    .an-icon :global(.an-icon-svg) {
        width: var(--an-icon-size);
        height: var(--an-icon-size);
    }

    /* One line, cut with an ellipsis, never wrapped. */
    .an-label {
        position: relative;
        display: block;
        flex: var(--an-label-flex);
        width: var(--an-label-width);
        min-width: 0;
        overflow: hidden;
        font-size: var(--an-label-size);
        line-height: var(--an-label-lh);
        text-align: var(--an-label-align);
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* Over the icon's upper end corner in the rail, at the end of the row in the sidebar. */
    .an-badge {
        position: var(--an-badge-position);
        top: -2px;
        inset-inline-start: calc(50% + 4px);
        display: flex;
        flex: none;
        margin-inline-start: var(--an-badge-ms);
    }
</style>
