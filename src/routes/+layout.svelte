<script lang="ts">
    import "../app.css";
    import type { Snippet } from "svelte";
    import { page } from "$app/stores";
    import TopNavbar from "../components/organisms/TopNavbar.svelte";
    import BrandSwitcher from "$lib/marketing/BrandSwitcher.svelte";
    import type { NavItem } from "../types/page.types";
    import { GITHUB_URL, STORYBOOK_URL } from "$lib/marketing/content";

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    // No "Home" item: the brand link already goes there, and with Storybook
    // added the bar was 44px wider than a 768px screen.
    const navItems: NavItem[] = [
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "Storybook", href: STORYBOOK_URL },
        { label: "GitHub", href: GITHUB_URL },
    ];
</script>

<svelte:head>
    <!-- Tracks the OS preference. A manual toggle cannot move this, so it is
    matched to the page background of each theme rather than left white. -->
    <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#f4f4f5"
    />
    <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#18181b"
    />
</svelte:head>

{#if $page.url.pathname !== "/chaos-lab"}
    <TopNavbar
        brand="Zabi Components"
        brandHref="/"
        ariaLabel="Main navigation"
        className="supports-[backdrop-filter]:bg-base-50/95 backdrop-blur"
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
