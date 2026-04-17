<script lang="ts">
    import SidebarNavigation from "../../../components/organisms/SidebarNavigation.svelte";
    import SidebarPanel from "../../../components/organisms/SidebarPanel.svelte";
    import type { DemoRendererProps } from "./types";
    import {
        sidebarNavItems,
        sidebarProjectItems,
    } from "$lib/showcase/components-showcase-constants";

    let {
        exampleIndex,
        sidebarPath = "/revenue",
        sidebarSearchValue = "Revenue",
        sidebarSearchPanelOpen = false,
        sidebarProjectSearch = "",
        selectedProjectId = "proj-zabi-web",
    }: DemoRendererProps = $props();

    function handleNavigate(item: { href: string }, event: Event): void {
        event.preventDefault();
        sidebarPath = item.href;
    }
</script>

{#if exampleIndex === 0}
    <div class="w-full max-w-md">
        <SidebarNavigation
            mode="expanded"
            items={sidebarNavItems}
            currentPath={sidebarPath}
            bind:searchValue={sidebarSearchValue}
            onNavigate={handleNavigate}
            onSearchClick={() => {
                sidebarSearchPanelOpen = !sidebarSearchPanelOpen;
            }}
        />
    </div>
{:else if exampleIndex === 1}
    <div class="flex w-full flex-col gap-4 md:flex-row">
        <div class="w-full max-w-md">
            <SidebarNavigation
                mode="expanded"
                searchMode="button"
                items={sidebarNavItems}
                currentPath={sidebarPath}
                searchValue={selectedProjectId
                    ? sidebarProjectItems.find((item) => item.id === selectedProjectId)
                            ?.label || "Search projects"
                    : "Search projects"}
                onNavigate={handleNavigate}
                onSearchClick={() => {
                    sidebarSearchPanelOpen = !sidebarSearchPanelOpen;
                }}
            />
        </div>
        {#if sidebarSearchPanelOpen}
            <div class="w-full max-w-md">
                <SidebarPanel
                    title="Project picker"
                    subtitle="Search and switch projects"
                    searchPlaceholder="Search projects..."
                    ariaLabel="Project picker panel"
                    items={sidebarProjectItems}
                    bind:searchValue={sidebarProjectSearch}
                    bind:selectedItemId={selectedProjectId}
                    onClose={() => {
                        sidebarSearchPanelOpen = false;
                    }}
                />
            </div>
        {/if}
    </div>
{:else}
    <div class="w-full max-w-md">
        <SidebarNavigation
            mode="expanded"
            items={sidebarNavItems}
            currentPath={sidebarPath}
            onNavigate={handleNavigate}
        />
    </div>
{/if}

