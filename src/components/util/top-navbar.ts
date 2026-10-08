/** The words `TopNavbar` says by itself. Pass any of them as `strings`. */
export interface TopNavbarStrings {
    /** Accessible name of the phone menu's button while the menu is closed. */
    openMenu: string;
    /** The same button, while the inline menu is open (the sheet's own button closes it). */
    closeMenu: string;
    /** The phone menu's sheet: its heading and its accessible name, and the name of the links' `nav` when the bar has no `ariaLabel`. */
    menuTitle: string;
    /** Read after the label of a link that opens in a new tab. */
    opensInNewTab: string;
}

export const DEFAULT_TOP_NAVBAR_STRINGS: TopNavbarStrings = {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Menu",
    opensInNewTab: "(opens in a new tab)",
};
