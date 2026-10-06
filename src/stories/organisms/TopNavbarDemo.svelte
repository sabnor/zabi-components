<script lang="ts">
    import TopNavbar from "../../components/organisms/TopNavbar.svelte";
    import Button from "../../components/atoms/Button.svelte";
    import type { ThemeToggleLabels } from "../../components/util/theme-mode.js";
    import type { TopNavbarStrings } from "../../components/util/top-navbar.js";

    interface Props {
        brand?: string;
        showThemeToggle?: boolean;
        customActions?: boolean;
        collapseAt?: "sm" | "md" | "lg" | "xl";
        /** Eight links instead of four, to show a row that needs a later switch. */
        manyItems?: boolean;
        /** `three`: the toggle steps through system, light and dark. */
        themeModes?: "two" | "three";
        /** The bar in Swedish: its links, and every word it says by itself. */
        swedish?: boolean;
    }

    let {
        brand = "MyApp",
        showThemeToggle = true,
        customActions = false,
        collapseAt,
        manyItems = false,
        themeModes,
        swedish = false,
    }: Props = $props();

    /** What the bar says by itself: the phone menu's button and the note on a link that leaves the site. */
    const swedishStrings: TopNavbarStrings = {
        openMenu: "Öppna menyn",
        closeMenu: "Stäng menyn",
        opensInNewTab: "(öppnas i ny flik)",
    };
    /** And what its theme toggle says. */
    const swedishThemeLabels: ThemeToggleLabels = {
        auto: "system",
        light: "ljust",
        dark: "mörkt",
        describe: (current, next) => `Tema: ${current}. Byt till ${next}`,
        darkMode: "Mörkt läge",
        beforeMount: "Byt tema",
    };
    const swedishItems = [
        { label: "Hem", href: "/" },
        { label: "Om oss", href: "/about" },
        { label: "Tjänster", href: "/services" },
        { label: "Handbok", href: "https://example.com/handbok" },
    ];

    const fourItems = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ];
    const navItems = $derived(
        swedish
            ? swedishItems
            : manyItems
            ? [
                  ...fourItems,
                  { label: "Pricing", href: "/pricing" },
                  { label: "Customers", href: "/customers" },
                  { label: "Changelog", href: "/changelog" },
                  { label: "Support", href: "/support" },
              ]
            : fourItems,
    );

    function handleNavClick(event: Event) {
        console.log("Navigation clicked", event);
    }

    function handleActionClick(action: string) {
        console.log("Action clicked", action);
    }
</script>

<TopNavbar
    {brand}
    {showThemeToggle}
    items={navItems}
    currentPath="/"
    {collapseAt}
    {themeModes}
    themeStorageKey={themeModes === "three" ? null : undefined}
    strings={swedish ? swedishStrings : undefined}
    themeLabels={swedish ? swedishThemeLabels : undefined}
    navVariant="header"
    onclick={handleNavClick}
>
    {#snippet actions()}
        {#if customActions}
            <Button
                variant="primary"
                size="sm"
                text="Sign Up"
                onclick={() => handleActionClick("signup")}
            />
            <Button
                variant="secondary"
                size="sm"
                text="Login"
                onclick={() => handleActionClick("login")}
            />
        {:else}
            <Button
                variant="ghost"
                size="sm"
                text={swedish ? "Hjälp" : "Help"}
                onclick={() => handleActionClick("help")}
            />
        {/if}
    {/snippet}
</TopNavbar>

<div class="bg-base-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Page Content</h1>
        <p class="text-lg text-base-600">
            This is demo content that appears below the navbar. Scroll to see
            the sticky navbar behavior.
        </p>
        <div class="mt-8 space-y-4">
            <p class="text-base-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p class="text-base-600">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p class="text-base-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
            </p>
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
    }
</style>
