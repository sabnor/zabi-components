<script lang="ts">
    import type { Component } from "svelte";
    import Bell from "@lucide/svelte/icons/bell";
    import House from "@lucide/svelte/icons/house";
    import Trophy from "@lucide/svelte/icons/trophy";
    import AppNavigation from "../../src/components/organisms/AppNavigation.svelte";
    import type { BottomTabBarItem } from "../../src/components/util/bottom-tab-bar.js";

    interface Props {
        active?: string;
        label?: string;
        badgeMax?: number;
        badgeLabel?: (count: number, item: BottomTabBarItem) => string;
        floating?: boolean;
        withSlots?: boolean;
        class?: string;
    }

    let { active, withSlots = false, ...rest }: Props = $props();

    // An icon that says it is the filled one.
    const FilledBell = ((anchor: unknown, props: Record<string, unknown>) =>
        (Bell as unknown as (a: unknown, p: Record<string, unknown>) => void)(anchor, {
            ...props,
            "data-active-icon": "true",
        })) as unknown as Component<{ size?: number; class?: string; strokeWidth?: number }>;

    const items: BottomTabBarItem[] = [
        { href: "/", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/inbox", label: "Inbox", icon: Bell, activeIcon: FilledBell, badge: 3 },
    ];
</script>

<AppNavigation {items} {active} data-testid="an" {...rest}>
    {#snippet header()}
        {#if withSlots}<p data-testid="an-header">Logo</p>{/if}
    {/snippet}
    {#snippet footer()}
        {#if withSlots}<p data-testid="an-footer">Account</p>{/if}
    {/snippet}
</AppNavigation>
