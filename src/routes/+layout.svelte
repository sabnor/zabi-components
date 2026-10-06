<script lang="ts">
    import "../app.css";
    import type { Snippet } from "svelte";
    import { page } from "$app/stores";
    import TopNavbar, { type TopNavbarNavItem } from "../components/organisms/TopNavbar.svelte";
    import BrandSwitcher from "$lib/marketing/BrandSwitcher.svelte";
    import { GITHUB_URL, STORYBOOK_URL } from "$lib/marketing/content";
    import { watchDarkMode } from "$lib/marketing/brand-accents";

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    // No "Home" item: the brand link already goes there. Five items, the
    // brand menu and the theme toggle need about 820px, so the bar folds into
    // the phone menu below `lg` (see `collapseAt` on the TopNavbar below).
    const navItems: TopNavbarNavItem[] = [
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "Theming", href: "/theming" },
        { label: "Storybook", href: STORYBOOK_URL, external: true },
        { label: "GitHub", href: GITHUB_URL },
    ];

    /** QA pages that render whole app screens; see the note on safe areas below. */
    const isLab = $derived(
        $page.url.pathname.startsWith("/chaos-lab") || $page.url.pathname.startsWith("/phone-lab"),
    );

    /** The page background of each theme: `--color-surface-base`. */
    const THEME_COLOR = { light: "#ececee", dark: "#18181b" };

    // Null until the page is running. After that the theme is whatever the
    // `dark` class says, which the toggle controls and the OS only seeds.
    let themeColor = $state<string | null>(null);

    $effect(() =>
        watchDarkMode((dark) => {
            themeColor = dark ? THEME_COLOR.dark : THEME_COLOR.light;
        }),
    );

    // The page is served as markup and looks ready before its handlers are
    // attached: a click that lands in between does nothing. This runs once
    // the whole tree (this layout and the page inside it) has hydrated, since
    // a parent's effects run after its children's. The browser tests wait
    // for it before they press anything (playwright/helpers/hydration.ts).
    $effect(() => {
        document.documentElement.dataset.zabiHydrated = "true";
    });
</script>

<svelte:head>
    <!-- Server-rendered, these follow the OS preference, which is all that is
    known then. Once the page runs, both take the colour of the theme in use,
    so the browser chrome follows the toggle whichever query matches. -->
    <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content={themeColor ?? THEME_COLOR.light}
    />
    <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content={themeColor ?? THEME_COLOR.dark}
    />
</svelte:head>

<!-- The labs under /chaos-lab that test a TopNavbar of their own leave this one out. -->
{#if $page.url.pathname !== "/chaos-lab" && $page.url.pathname !== "/chaos-lab/top-navbar"}
    <TopNavbar
        brand="Zabi Components"
        brandHref="/"
        ariaLabel="Main navigation"
        className="bg-surface-raised supports-[backdrop-filter]:bg-surface-raised/90 backdrop-blur pt-[env(safe-area-inset-top,0px)] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)]"
        items={navItems}
        navVariant="header"
        collapseAt="lg"
        currentPath={$page.url.pathname}
    >
        {#snippet actions()}
            <BrandSwitcher />
        {/snippet}
    </TopNavbar>
{/if}

{#if isLab}
    {@render children()}
{:else}
    <div class="site-content">
        {@render children()}
    </div>
{/if}

<style>
    /*
     * Safe areas. src/app.html asks for the whole screen (viewport-fit=cover),
     * so on a phone with a notch or a home indicator the page reaches under
     * them and has to keep its own content clear.
     *
     * - The header's bar runs edge to edge; its content is padded by the top,
     *   left and right insets (classes on the TopNavbar above).
     * - Page content is padded left and right here. The strips beside it show
     *   the document background, which is the page surface.
     * - The footer and the component catalog's scroll area add the bottom
     *   inset themselves.
     *
     * The labs are left alone: they render app screens that keep clear on
     * their own (AppShell, Page), which is what they test.
     */
    :global(html) {
        background-color: var(--color-surface-base);
    }

    /*
     * The site's heading face, set the way an app sets it: through the token.
     * Marketing headings (`.display`) and every component heading read it, so
     * a brand that sets --font-family-heading restyles all of them. The inline
     * values a generated brand puts on <html> win over this rule.
     */
    :global(:root) {
        --font-family-heading:
            "Familjen Grotesk", "Familjen Grotesk Fallback", "Nunito Sans", ui-sans-serif,
            system-ui, sans-serif;
    }

    /* The header's height, for layouts that fill the rest of the screen. */
    :global(:root) {
        --site-header-height: calc(4rem + 1px + env(safe-area-inset-top, 0px));
    }

    .site-content {
        padding-left: env(safe-area-inset-left, 0px);
        padding-right: env(safe-area-inset-right, 0px);
    }
</style>
