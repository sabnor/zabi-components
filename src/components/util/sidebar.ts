/**
 * The words the sidebar components say by themselves. Each takes its own as
 * `strings`; `SidebarNavigation` takes them all and hands the footer and the
 * brand header theirs.
 */

/** `SidebarBrandHeader`. */
export interface SidebarBrandHeaderStrings {
    /** The logo's alt text when neither `logoAlt` nor `brandName` is given. */
    brandAlt: string;
}

export const DEFAULT_SIDEBAR_BRAND_HEADER_STRINGS: SidebarBrandHeaderStrings = {
    brandAlt: "Brand",
};

/** `SidebarFooter`. */
export interface SidebarFooterStrings {
    /** Accessible name of the footer. */
    accountAndSettings: string;
    /** Accessible name of the profile button in a collapsed rail. */
    openAccountPanel: string;
    /** The same button in an expanded sidebar, with the profile's name. */
    openAccountPanelFor: (name: string) => string;
}

export const DEFAULT_SIDEBAR_FOOTER_STRINGS: SidebarFooterStrings = {
    accountAndSettings: "Account and settings",
    openAccountPanel: "Open account panel",
    openAccountPanelFor: (name) => `Open account panel for ${name}`,
};

/** `SidebarAccountPanel`. */
export interface SidebarAccountPanelStrings {
    /** Accessible name of the panel. */
    panelLabel: string;
    /** The panel's heading. */
    title: string;
    /** Accessible name of the close button. */
    closeLabel: string;
    /** Accessible name of the list of rows. */
    listLabel: string;
    /** The first row, above the profile's name. */
    account: string;
    /** The row that switches the theme. */
    theme: string;
    /** That row's second line, in each mode. */
    lightMode: string;
    darkMode: string;
    /** With `themeModes="three"`: the mode that follows the system. */
    systemMode: string;
    /** The badge on that row, in each mode. */
    light: string;
    dark: string;
    system: string;
    /** The second line of the log-out row. Its first line is `logoutLabel`. */
    signOut: string;
}

export const DEFAULT_SIDEBAR_ACCOUNT_PANEL_STRINGS: SidebarAccountPanelStrings = {
    panelLabel: "Account panel",
    title: "Account",
    closeLabel: "Close account panel",
    listLabel: "Select item",
    account: "Account",
    theme: "Theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    systemMode: "System",
    light: "Light",
    dark: "Dark",
    system: "System",
    signOut: "Sign out of this account",
};

/** `SidebarNavigation`: its own words, and those of the footer and the brand header in it. */
export interface SidebarNavigationStrings extends SidebarFooterStrings, SidebarBrandHeaderStrings {
    /** Accessible name of the main list of links, when it has no section heading. */
    primaryNavigation: string;
    /** Accessible name of the second list of links. */
    secondaryNavigation: string;
    /** Accessible name of a list under a section heading, from the heading. */
    sectionNavigation: (section: string) => string;
    /** Shown when a search matches no link: the heading. */
    noMatchesTitle: string;
    /** And the line under it, with what was searched for. */
    noMatchesDescription: (term: string) => string;
}

export const DEFAULT_SIDEBAR_NAVIGATION_STRINGS: SidebarNavigationStrings = {
    ...DEFAULT_SIDEBAR_FOOTER_STRINGS,
    ...DEFAULT_SIDEBAR_BRAND_HEADER_STRINGS,
    primaryNavigation: "Primary navigation",
    secondaryNavigation: "Secondary navigation",
    sectionNavigation: (section) => `${section} navigation`,
    noMatchesTitle: "No matching navigation items",
    noMatchesDescription: (term) => `No results found for "${term}". Try another keyword.`,
};
