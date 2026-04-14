<script lang="ts">
    import SidebarNavigation from "../../components/organisms/SidebarNavigation.svelte";
    import SidebarAccountPanel from "../../components/organisms/SidebarAccountPanel.svelte";
    import type { SidebarNavigationItem } from "../../components/organisms/SidebarNavigation.svelte";

    interface Props {
        items?: SidebarNavigationItem[];
        currentPath?: string;
        mode?: "expanded" | "collapsed";
        layout?: "rail" | "card";
        className?: string;
        brandName?: string;
        logoSrc?: string;
        logoAlt?: string;
        profileName?: string;
        profileEmail?: string;
        showProfile?: boolean;
        showSearch?: boolean;
        showThemeToggle?: boolean;
        showLogout?: boolean;
        searchMode?: "input" | "button";
        searchValue?: string;
        emptyStateTitle?: string;
        emptyStateDescription?: string;
        emptyStateActionLabel?: string;
    }

    let {
        items = [],
        currentPath,
        mode,
        layout,
        className,
        brandName,
        logoSrc,
        logoAlt,
        profileName = "Jane Doe",
        profileEmail = "jane@example.com",
        showProfile,
        showSearch,
        showThemeToggle,
        showLogout,
        searchMode,
        searchValue,
        emptyStateTitle,
        emptyStateDescription,
        emptyStateActionLabel,
    }: Props = $props();

    const accountPanelId = "storybook-account-panel";
    let isAccountPanelOpen = $state(false);
    let isLightMode = $state(false);

    function toggleAccountPanel(): void {
        isAccountPanelOpen = !isAccountPanelOpen;
    }

    function closeAccountPanel(): void {
        isAccountPanelOpen = false;
    }
</script>

<div class="flex items-stretch gap-4">
    <SidebarNavigation
        {items}
        {currentPath}
        {mode}
        {layout}
        {className}
        {brandName}
        {logoSrc}
        {logoAlt}
        {profileName}
        {profileEmail}
        {showProfile}
        {showSearch}
        {showThemeToggle}
        {showLogout}
        {searchMode}
        {searchValue}
        {emptyStateTitle}
        {emptyStateDescription}
        {emptyStateActionLabel}
        onProfileClick={toggleAccountPanel}
        profilePanelOpen={isAccountPanelOpen}
        profilePanelControlsId={accountPanelId}
    />

    {#if isAccountPanelOpen}
        <SidebarAccountPanel
            panelId={accountPanelId}
            profileName={profileName}
            profileEmail={profileEmail}
            bind:isLightMode={isLightMode}
            onThemeToggle={(nextIsLightMode) => (isLightMode = nextIsLightMode)}
            onLogout={() => closeAccountPanel()}
            onAccount={() => closeAccountPanel()}
            onClose={closeAccountPanel}
            variant={layout === "card" ? "elevated" : "plain"}
        />
    {/if}
</div>

