<script lang="ts">
    import ColorPicker from "../../src/components/atoms/ColorPicker.svelte";
    import NavigationMenu, {
        type NavigationMenuItemData,
    } from "../../src/components/molecules/NavigationMenu.svelte";
    import Toaster from "../../src/components/molecules/Toaster.svelte";
    import TopNavbar from "../../src/components/organisms/TopNavbar.svelte";

    interface Props {
        /** What is open under the toast. */
        kind: "navbar" | "color" | "navmenu";
    }

    let { kind }: Props = $props();

    const links = [
        { label: "Docs", href: "/docs" },
        { label: "Theming", href: "/theming" },
    ];
    const menus: NavigationMenuItemData[] = [
        { value: "one", label: "One", content: [{ href: "/a", label: "Link A" }] },
    ];
    let colour = $state("#336699");
</script>

{#if kind === "navbar"}
    <TopNavbar brand="Zabi" brandHref="/" items={links} preventNavigation />
{:else if kind === "color"}
    <ColorPicker bind:value={colour} label="Accent" />
{:else}
    <NavigationMenu items={menus} menuId="toast-outside-nav" viewport={false} />
{/if}
<button type="button" data-testid="elsewhere">Elsewhere</button>
<Toaster />
