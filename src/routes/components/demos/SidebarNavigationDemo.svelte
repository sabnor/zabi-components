<script lang="ts">
    import SidebarNavigation from "../../../components/organisms/SidebarNavigation.svelte";
    import SidebarAccountPanel from "../../../components/organisms/SidebarAccountPanel.svelte";
    import SidebarPanel from "../../../components/organisms/SidebarPanel.svelte";
    import { fixedSidebarFlyout } from "../../../components/util/fixed-sidebar-flyout.js";
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

    const demoAccountPanelId = "sidebar-navigation-demo-account-panel";

    let demoAccountPanelOpen = $state(false);
    let demoLightMode = $state(false);

    function handleNavigate(item: { href: string }, event: Event): void {
        event.preventDefault();
        sidebarPath = item.href;
    }

    function toggleDemoAccountPanel(): void {
        demoAccountPanelOpen = !demoAccountPanelOpen;
    }
</script>

{#snippet demoProfilePanel()}
    <SidebarAccountPanel
        panelId={demoAccountPanelId}
        profileName="Zabi"
        profileEmail="hello@zabi.dev"
        bind:isLightMode={demoLightMode}
        onThemeToggle={(next) => {
            demoLightMode = next;
        }}
        onLogout={() => {
            demoAccountPanelOpen = false;
        }}
        onAccount={() => {
            demoAccountPanelOpen = false;
        }}
        onClose={() => {
            demoAccountPanelOpen = false;
        }}
        variant="plain"
    />
{/snippet}

{#if exampleIndex === 0}
    <div class="w-full">
        <SidebarNavigation
            mode="expanded"
            items={sidebarNavItems}
            currentPath={sidebarPath}
            bind:searchValue={sidebarSearchValue}
            bind:isLightMode={demoLightMode}
            onNavigate={handleNavigate}
            onProfileClick={toggleDemoAccountPanel}
            profilePanelOpen={demoAccountPanelOpen}
            profilePanelControlsId={demoAccountPanelId}
            profilePanel={demoProfilePanel}
        />
    </div>
{:else if exampleIndex === 1}
    <div
        data-sidebar-flyout-root
        class="inline-flex max-w-full flex-col gap-4 align-top md:flex-row md:flex-nowrap"
    >
        <SidebarNavigation
            mode="expanded"
            searchMode="button"
            items={sidebarNavItems}
            currentPath={sidebarPath}
            searchValue={selectedProjectId
                ? sidebarProjectItems.find(
                      (item) => item.id === selectedProjectId,
                  )?.label || "Search projects"
                : "Search projects"}
            bind:isLightMode={demoLightMode}
            onNavigate={handleNavigate}
            onSearchClick={() => {
                sidebarSearchPanelOpen = !sidebarSearchPanelOpen;
            }}
            onProfileClick={toggleDemoAccountPanel}
            profilePanelOpen={demoAccountPanelOpen}
            profilePanelControlsId={demoAccountPanelId}
            profilePanel={demoProfilePanel}
        />
        {#if sidebarSearchPanelOpen}
            <div
                class="max-h-[min(32rem,calc(100dvh-6rem))] overflow-y-auto overscroll-contain outline-none"
                role="presentation"
                use:fixedSidebarFlyout={{
                    open: sidebarSearchPanelOpen,
                    align: "top",
                    gap: 12,
                    anchorRole: "search",
                }}
            >
                <SidebarPanel
                    title="Project picker"
                    subtitle="Search and switch projects"
                    searchPlaceholder="Search projects..."
                    ariaLabel="Project picker panel"
                    widthClass="w-full min-w-0 md:w-80"
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
    <div class="w-full">
        <SidebarNavigation
            mode="expanded"
            items={sidebarNavItems}
            currentPath={sidebarPath}
            bind:isLightMode={demoLightMode}
            onNavigate={handleNavigate}
            onProfileClick={toggleDemoAccountPanel}
            profilePanelOpen={demoAccountPanelOpen}
            profilePanelControlsId={demoAccountPanelId}
            profilePanel={demoProfilePanel}
        />
    </div>
{/if}
