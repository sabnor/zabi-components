<script lang="ts">
    import NavigationMenu, {
        type NavigationMenuItemData,
    } from "../../src/components/molecules/NavigationMenu.svelte";

    const items: NavigationMenuItemData[] = [
        {
            value: "one",
            label: "One",
            content: [{ href: "/a", label: "Link A" }],
        },
        {
            value: "two",
            label: "Two",
            content: [{ href: "/b", label: "Link B" }],
        },
    ];
</script>

<NavigationMenu {items} menuId="test-nav-stable" viewport={false} />
