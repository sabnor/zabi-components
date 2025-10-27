<script lang="ts">
    import Navbar from "../components/organisms/Navbar.svelte";
    import Navigation from "../components/organisms/Navigation.svelte";
    import Button from "../components/atoms/Button.svelte";

    interface Props {
        brand?: string;
        showThemeToggle?: boolean;
        customActions?: boolean;
    }

    let {
        brand = "MyApp",
        showThemeToggle = true,
        customActions = false,
    }: Props = $props();

    const navItems = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ];

    function handleNavClick(event: Event) {
        console.log("Navigation clicked", event);
    }

    function handleActionClick(action: string) {
        console.log("Action clicked", action);
    }
</script>

<Navbar {brand} {showThemeToggle} onclick={handleNavClick}>
    {#snippet nav()}
        <Navigation items={navItems} currentPath="/" onclick={handleNavClick} />
    {/snippet}

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
                text="Help"
                onclick={() => handleActionClick("help")}
            />
        {/if}
    {/snippet}
</Navbar>

<div class="bg-surface-level-0 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Page Content</h1>
        <p class="text-lg text-gray-600">
            This is demo content that appears below the navbar. Scroll to see
            the sticky navbar behavior.
        </p>
        <div class="mt-8 space-y-4">
            <p class="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p class="text-gray-600">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p class="text-gray-600">
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
