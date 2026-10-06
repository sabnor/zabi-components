<script lang="ts">
    /**
     * Type-level guard, checked by `npm run check` and never packaged (the
     * library build takes only `.ts` from this folder): every public prop that
     * takes an icon must accept a `@lucide/svelte` icon however the consumer
     * imported it. The library imports its own icons per file
     * (`@lucide/svelte/icons/star`); an app is free to use the barrel, and an
     * icon from either must fit the same prop.
     *
     * This file is the one place in the repo's library code that imports the
     * barrel, on purpose. It is outside src/components, so the guard in
     * scripts/check-component-imports.js does not apply to it, and it is not
     * part of what a consumer's bundler reads.
     */
    import { Star as BarrelStar } from "@lucide/svelte";
    import PerIconStar from "@lucide/svelte/icons/star";
    import FeatureCard from "../components/atoms/FeatureCard.svelte";
    import FloatingActionButton from "../components/atoms/FloatingActionButton.svelte";
    import ListItem from "../components/atoms/ListItem.svelte";
    import BottomTabBar from "../components/molecules/BottomTabBar.svelte";
    import Dropdown from "../components/molecules/Dropdown.svelte";
    import DropdownItem from "../components/molecules/DropdownItem.svelte";
    import SegmentedControl from "../components/molecules/SegmentedControl.svelte";
    import SidebarNavigation from "../components/organisms/SidebarNavigation.svelte";
    import TopNavbar from "../components/organisms/TopNavbar.svelte";
    import type { BottomTabBarIcon } from "../components/util/bottom-tab-bar.js";
    import type { DropdownItemIcon } from "../components/util/dropdown.js";
    import type { SegmentedControlIcon } from "../components/util/segmented-control.js";
    // The icons the root entry re-exports are the same components.
    import { Sun as RootSun } from "../components/index.js";

    // The three exported icon types, assigned from each kind of import.
    const fromBarrel: [DropdownItemIcon, BottomTabBarIcon, SegmentedControlIcon] = [
        BarrelStar,
        BarrelStar,
        BarrelStar,
    ];
    const perIcon: [DropdownItemIcon, BottomTabBarIcon, SegmentedControlIcon] = [
        PerIconStar,
        PerIconStar,
        PerIconStar,
    ];
    const fromRoot: DropdownItemIcon = RootSun;
    void [fromBarrel, perIcon, fromRoot];
</script>

<!-- And the props themselves, each with a barrel icon and a per-icon one. -->
<FeatureCard title="A" icon={BarrelStar} />
<FeatureCard title="A" icon={PerIconStar} />
<FloatingActionButton label="Add" icon={BarrelStar} />
<FloatingActionButton label="Add" icon={PerIconStar} />
<ListItem item={{ id: "a", label: "A", icon: BarrelStar }} />
<ListItem item={{ id: "a", label: "A", icon: PerIconStar }} />
<SegmentedControl
    label="View"
    options={[
        { value: "a", label: "A", icon: BarrelStar },
        { value: "b", label: "B", icon: PerIconStar },
    ]}
/>
<BottomTabBar
    items={[
        { href: "/a", label: "A", icon: BarrelStar },
        { href: "/b", label: "B", icon: PerIconStar },
    ]}
/>
<Dropdown
    options={[
        { value: "a", label: "A", icon: BarrelStar },
        { value: "b", label: "B", icon: PerIconStar },
    ]}
>
    {#snippet trigger(aria)}<button type="button" {...aria}>Open</button>{/snippet}
</Dropdown>
<DropdownItem label="A" icon={BarrelStar} />
<DropdownItem label="A" icon={PerIconStar} />
<TopNavbar
    items={[
        { label: "A", href: "/a", icon: BarrelStar, iconFilled: PerIconStar },
        { label: "B", href: "/b", icon: PerIconStar, iconFilled: BarrelStar },
    ]}
/>
<SidebarNavigation
    items={[
        { id: "a", label: "A", href: "/a", icon: BarrelStar },
        { id: "b", label: "B", href: "/b", icon: PerIconStar },
    ]}
/>
