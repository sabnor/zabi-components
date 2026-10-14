<script lang="ts">
    import Bell from "@lucide/svelte/icons/bell";
    import House from "@lucide/svelte/icons/house";
    import Trophy from "@lucide/svelte/icons/trophy";
    import AppBar from "../../src/components/molecules/AppBar.svelte";
    import AppNavigation from "../../src/components/organisms/AppNavigation.svelte";
    import AppShell from "../../src/components/organisms/AppShell.svelte";
    import type { AppShellNavigationMode } from "../../src/components/util/app-shell.js";

    interface Props {
        navigationPlacement?: AppShellNavigationMode;
        withFooter?: boolean;
        withHeader?: boolean;
        active?: string;
        class?: string;
    }

    let {
        navigationPlacement,
        withFooter = false,
        withHeader = true,
        active = "/quiz",
        class: className,
    }: Props = $props();

    const items = [
        { href: "/", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
    ];
</script>

{#snippet header()}
    <AppBar title="Quiz" data-testid="bar" />
{/snippet}

{#snippet footer()}
    <div data-testid="footer-content">Save</div>
{/snippet}

{#snippet navigation({ placement }: { placement: string })}
    <i hidden data-testid="placement-arg">{placement}</i>
    <AppNavigation {items} {active} data-testid="appnav">
        {#snippet header({ placement })}
            <p data-testid="nav-header">Header {placement}</p>
        {/snippet}
        {#snippet footer({ placement })}
            <p data-testid="nav-footer">Footer {placement}</p>
        {/snippet}
    </AppNavigation>
{/snippet}

<AppShell
    class={className}
    data-testid="shell"
    {navigation}
    {navigationPlacement}
    header={withHeader ? header : undefined}
    footer={withFooter ? footer : undefined}
>
    <p data-testid="content">Ten questions, one point each.</p>
</AppShell>
