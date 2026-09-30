<script lang="ts">
    import Dropdown from "../../src/components/molecules/Dropdown.svelte";
    import List from "../../src/components/atoms/List.svelte";
    import SidebarNavigation from "../../src/components/organisms/SidebarNavigation.svelte";
    import SidebarPanel from "../../src/components/organisms/SidebarPanel.svelte";
    import Tabs from "../../src/components/molecules/Tabs.svelte";

    const tabs = [
        { id: "a", label: "Alpha" },
        { id: "b", label: "Beta" },
    ];
    const items = [
        { id: "one", label: "First" },
        { id: "two", label: "Second" },
    ];
</script>

<div data-testid="dropdown">
    <Dropdown isOpen options={[{ value: "a", label: "Alpha" }]}>
        {#snippet trigger(aria)}<button type="button" {...aria}>Menu</button>{/snippet}
    </Dropdown>
</div>
<div data-testid="tabs"><Tabs {tabs} activeTab="a" /></div>
<div data-testid="pills"><Tabs {tabs} activeTab="a" variant="pills" /></div>
<div data-testid="list"><List {items} selectedId="two" ariaLabel="Items" /></div>
<div data-testid="panel">
    <SidebarPanel variant="elevated" title="Projects" showSearch items={[{ id: "p1", label: "Zabi" }]} selectedItemId="p1" />
</div>
<div data-testid="panel-empty"><SidebarPanel title="Empty" items={[]} /></div>
<div data-testid="nav">
    <SidebarNavigation
        items={[{ id: "home", label: "Home", href: "/home" }]}
        showSearch
        searchMode="input"
        showProfile
        profileName="Ada"
        profileInitials="AL"
    />
</div>
<div data-testid="nav-empty"><SidebarNavigation items={[]} /></div>
