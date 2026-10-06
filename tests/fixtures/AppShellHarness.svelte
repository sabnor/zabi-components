<script lang="ts">
    import Bell from "@lucide/svelte/icons/bell";
    import House from "@lucide/svelte/icons/house";
    import Trophy from "@lucide/svelte/icons/trophy";
    import AppBar from "../../src/components/molecules/AppBar.svelte";
    import BottomTabBar from "../../src/components/molecules/BottomTabBar.svelte";
    import AppShell from "../../src/components/organisms/AppShell.svelte";

    interface Props {
        withHeader?: boolean;
        withFooter?: boolean;
        collapseOnScroll?: boolean;
        largeTitle?: boolean;
        active?: string;
        contentElement?: "main" | "div";
        class?: string;
        style?: string;
    }

    let {
        withHeader = true,
        withFooter = true,
        collapseOnScroll = false,
        largeTitle = false,
        active = "/quiz",
        contentElement,
        class: className,
        style,
    }: Props = $props();

    const items = [
        { href: "/", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
    ];
</script>

{#snippet header()}
    <AppBar title="Quiz" backHref="/" {collapseOnScroll} {largeTitle} data-testid="bar" />
{/snippet}

{#snippet footer()}
    <BottomTabBar {items} {active} data-testid="tabs" />
{/snippet}

<AppShell
    class={className}
    {style}
    {contentElement}
    data-testid="shell"
    header={withHeader ? header : undefined}
    footer={withFooter ? footer : undefined}
>
    <p data-testid="content">Ten questions, one point each.</p>
</AppShell>
