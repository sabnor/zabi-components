/** The words `TopNavbar` says by itself. Pass any of them as `strings`. */
export interface TopNavbarStrings {
    /** Accessible name of the phone menu's button while the menu is closed. */
    openMenu: string;
    /** The same button, while the menu is open. */
    closeMenu: string;
    /** Read after the label of a link that opens in a new tab. */
    opensInNewTab: string;
}

export const DEFAULT_TOP_NAVBAR_STRINGS: TopNavbarStrings = {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    opensInNewTab: "(opens in a new tab)",
};
