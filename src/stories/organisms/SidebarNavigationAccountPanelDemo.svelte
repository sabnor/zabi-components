<script lang="ts">
    import SidebarNavigation from "../../components/organisms/SidebarNavigation.svelte";
    import SidebarAccountPanel from "../../components/organisms/SidebarAccountPanel.svelte";
    import type { SidebarNavigationItem } from "../../components/organisms/SidebarNavigation.svelte";
    import type { SidebarAccountPanelStrings, SidebarNavigationStrings } from "../../components/util/sidebar.js";

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
        searchPlaceholder?: string;
        searchValue?: string;
        emptyStateTitle?: string;
        emptyStateDescription?: string;
        emptyStateActionLabel?: string;
        /** `three`: the theme row of the panel steps through system, light and dark. */
        themeModes?: "two" | "three";
        /** The sidebar and the panel in Swedish. */
        swedish?: boolean;
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
        searchPlaceholder,
        searchValue,
        emptyStateTitle,
        emptyStateDescription,
        emptyStateActionLabel,
        themeModes,
        swedish = false,
    }: Props = $props();

    const swedishPanel: SidebarAccountPanelStrings = {
        panelLabel: "Kontopanel",
        title: "Konto",
        closeLabel: "Stäng kontopanelen",
        listLabel: "Välj",
        account: "Konto",
        theme: "Tema",
        lightMode: "Ljust läge",
        darkMode: "Mörkt läge",
        systemMode: "Följer systemet",
        light: "Ljust",
        dark: "Mörkt",
        system: "System",
        signOut: "Logga ut från det här kontot",
    };
    const swedishSidebar: SidebarNavigationStrings = {
        primaryNavigation: "Huvudmeny",
        secondaryNavigation: "Övrigt",
        sectionNavigation: (section) => `Meny: ${section}`,
        noMatchesTitle: "Inga träffar",
        noMatchesDescription: (term) => `Inget i menyn matchar "${term}". Prova ett annat ord.`,
        accountAndSettings: "Konto och inställningar",
        openAccountPanel: "Öppna kontopanelen",
        openAccountPanelFor: (name) => `Öppna kontopanelen för ${name}`,
        brandAlt: "Varumärke",
    };

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

{#snippet accountPanel()}
    <SidebarAccountPanel
        panelId={accountPanelId}
        profileName={profileName}
        profileEmail={profileEmail}
        bind:isLightMode={isLightMode}
        onThemeToggle={(nextIsLightMode) => (isLightMode = nextIsLightMode)}
        onLogout={() => closeAccountPanel()}
        onAccount={() => closeAccountPanel()}
        onClose={closeAccountPanel}
        {themeModes}
        themeStorageKey={themeModes === "three" ? null : undefined}
        strings={swedish ? swedishPanel : undefined}
        logoutLabel={swedish ? "Logga ut" : undefined}
        variant={layout === "card" ? "elevated" : "plain"}
    />
{/snippet}

<div class="w-full max-w-lg">
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
        {searchPlaceholder}
        {searchValue}
        {emptyStateTitle}
        {emptyStateDescription}
        {emptyStateActionLabel}
        strings={swedish ? swedishSidebar : undefined}
        ariaLabel={swedish ? "Sidomeny" : undefined}
        logoutLabel={swedish ? "Logga ut" : undefined}
        lightModeLabel={swedish ? "Ljust läge" : undefined}
        onProfileClick={toggleAccountPanel}
        profilePanelOpen={isAccountPanelOpen}
        profilePanelControlsId={accountPanelId}
        profilePanel={accountPanel}
    />
</div>

