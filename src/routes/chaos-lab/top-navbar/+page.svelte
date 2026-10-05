<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Button from "../../../components/atoms/Button.svelte";
    import Dropdown from "../../../components/molecules/Dropdown.svelte";
    import TopNavbar, {
        type TopNavbarCollapseAt,
        type TopNavbarNavItem,
    } from "../../../components/organisms/TopNavbar.svelte";

    /**
     * A TopNavbar with more items than the site's own header has, for
     * playwright/top-navbar.spec.ts. The site header is hidden on this route
     * (see +layout.svelte), so this is the only bar on the page.
     *
     * `?collapse=lg` sets `collapseAt`; `?items=4` shortens the list;
     * `?brand=long` gives a brand name that cannot fit beside the menu button;
     * `?extra=1` adds a link that opens in a new tab and a Dropdown to the menu.
     */
    const all: TopNavbarNavItem[] = [
        { label: "Overview", href: "#overview" },
        { label: "Components", href: "#components" },
        { label: "Patterns", href: "#patterns" },
        { label: "Theming", href: "#theming" },
        { label: "Accessibility", href: "#accessibility" },
        { label: "Changelog", href: "#changelog" },
        { label: "Storybook", href: "#storybook" },
        { label: "Support", href: "#support" },
    ];

    const params = $derived($page.url.searchParams);
    const collapse = $derived.by((): TopNavbarCollapseAt | undefined => {
        const value = params.get("collapse");
        return value === "sm" || value === "md" || value === "lg" || value === "xl"
            ? value
            : undefined;
    });
    const extra = $derived(params.get("extra") === "1");
    const items = $derived([
        ...all.slice(0, Number(params.get("items") ?? all.length)),
        ...(extra ? [{ label: "Source", href: "/chaos-lab/tabs", external: true }] : []),
    ]);
    let accountOpen = $state(false);
    let outsidePresses = $state(0);
    const brand = $derived(
        params.get("brand") === "long" ? "Zabi Components for Quizrundan" : "Zabi Components",
    );

    /** The hash stands in for a route, so "the path changed" can be exercised without leaving the page. */
    let currentPath = $state("#overview");
    let hydrated = $state(false);
    onMount(() => {
        hydrated = true;
        const sync = () => {
            currentPath = window.location.hash || "#overview";
        };
        sync();
        window.addEventListener("hashchange", sync);
        return () => window.removeEventListener("hashchange", sync);
    });
</script>

<svelte:head>
    <title>TopNavbar lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<TopNavbar
    {brand}
    brandHref="#overview"
    ariaLabel="Lab navigation"
    {items}
    {currentPath}
    collapseAt={collapse}
>
    {#snippet actions()}
        <Button size="sm" variant="outline" data-testid="lab-action">Sign in</Button>
        {#if extra}
            <Dropdown
                bind:isOpen={accountOpen}
                ariaLabel="Account"
                options={[
                    { value: "profile", label: "Profile" },
                    { value: "sign-out", label: "Sign out" },
                ]}
                onOptionClick={() => (accountOpen = false)}
            >
                {#snippet trigger(aria)}
                    <Button
                        size="sm"
                        variant="outline"
                        data-testid="lab-account"
                        onclick={() => (accountOpen = !accountOpen)}
                        {...aria}
                    >
                        Account
                    </Button>
                {/snippet}
            </Dropdown>
        {/if}
    {/snippet}
</TopNavbar>

<main class="p-4">
    <h1 class="text-lg font-semibold text-headline">TopNavbar lab</h1>
    {#if hydrated}
        <span data-testid="lab-hydrated" aria-hidden="true" hidden></span>
    {/if}
    <p class="mt-2 text-sm text-description">
        Path: <span data-testid="lab-path">{currentPath}</span>
    </p>
    <Button
        class="mt-4"
        variant="secondary"
        data-testid="lab-outside"
        onclick={() => (outsidePresses += 1)}
    >
        Outside the bar
    </Button>
    <span data-testid="lab-outside-presses">{outsidePresses}</span>
    <!-- Tall enough to scroll at every viewport the spec uses. -->
    <div style="height: 1600px" aria-hidden="true"></div>
</main>
