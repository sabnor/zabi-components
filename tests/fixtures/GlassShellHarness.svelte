<script lang="ts">
    import House from "@lucide/svelte/icons/house";
    import Bell from "@lucide/svelte/icons/bell";
    import Trophy from "@lucide/svelte/icons/trophy";
    import AppBar from "../../src/components/molecules/AppBar.svelte";
    import BottomTabBar from "../../src/components/molecules/BottomTabBar.svelte";
    import StickyActionBar from "../../src/components/molecules/StickyActionBar.svelte";
    import UnsavedChangesBar from "../../src/components/molecules/UnsavedChangesBar.svelte";
    import AppShell from "../../src/components/organisms/AppShell.svelte";
    import TopNavbar from "../../src/components/organisms/TopNavbar.svelte";

    /** The shell with every bar of the glass redesign in it. */
    interface Props {
        withFooter?: boolean;
        canvas?: boolean;
        barScrollEdge?: "auto" | "always" | "never";
    }

    let { withFooter = true, canvas = false, barScrollEdge }: Props = $props();

    const items = [
        { href: "/", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/inbox", label: "Inbox", icon: Bell },
    ];
</script>

{#snippet header()}
    <AppBar title="Quiz" scrollEdge={barScrollEdge} data-testid="bar" />
{/snippet}

{#snippet footer()}
    <BottomTabBar {items} active="/" scrollEdge={barScrollEdge} data-testid="tabs" />
{/snippet}

<AppShell
    {canvas}
    data-testid="shell"
    header={header}
    footer={withFooter ? footer : undefined}
>
    <form class="flex min-h-full flex-col">
        <p>Fields</p>
        <TopNavbar brand="Zabi" scrollEdge={barScrollEdge} data-testid="topnav" showThemeToggle={false} />
        <UnsavedChangesBar dirty data-testid="unsaved" />
        <StickyActionBar scrollEdge={barScrollEdge} data-testid="sticky">Save</StickyActionBar>
    </form>
</AppShell>
