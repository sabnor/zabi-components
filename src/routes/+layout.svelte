<script lang="ts">
    import "../app.css";
    import type { Snippet } from "svelte";
    import { page } from "$app/stores";
    import TopNavbar from "../components/organisms/TopNavbar.svelte";
    import type { NavItem } from "../types/page.types";

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();

    const navItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com/sabnor/zabi-components" },
    ];
</script>

<svelte:head>
    <meta charset="utf-8" />
    <link rel="icon" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffffff" />
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
    />
{/if}

{@render children()}
