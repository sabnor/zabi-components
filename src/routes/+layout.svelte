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

    // No "Home" item: the brand link already goes there, and with Storybook
    // added the bar was 44px wider than a 768px screen. The theming guide is
    // not here for the same reason: a fifth item is 50px too wide at 768px.
    // It is linked from Docs, the home page and the footer.
    const navItems: TopNavbarNavItem[] = [
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "Storybook", href: STORYBOOK_URL, external: true },
        { label: "GitHub", href: GITHUB_URL },
    ];

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
        className="bg-surface-raised supports-[backdrop-filter]:bg-surface-raised/90 backdrop-blur"
        items={navItems}
        navVariant="header"
        currentPath={$page.url.pathname}
    >
        {#snippet actions()}
            <BrandSwitcher />
        {/snippet}
    </TopNavbar>
{/if}

{@render children()}
