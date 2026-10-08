import { getContext, setContext } from "svelte";

/** The words `TopNavbar` says by itself. Pass any of them as `strings`. */
export interface TopNavbarStrings {
    /** Accessible name of the phone menu's button while the menu is closed. */
    openMenu: string;
    /** The same button, while the inline menu is open (the sheet's own button closes it). */
    closeMenu: string;
    /** The phone menu's sheet: its heading and its accessible name, and the name of the links' `nav` when the bar has no `ariaLabel`. */
    menuTitle: string;
    /** The heading over the theme choice in the phone menu's sheet. */
    themeHeading: string;
    /** Read after the label of a link that opens in a new tab. */
    opensInNewTab: string;
}

export const DEFAULT_TOP_NAVBAR_STRINGS: TopNavbarStrings = {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Menu",
    themeHeading: "Theme",
    opensInNewTab: "(opens in a new tab)",
};

const TOP_NAVBAR_PLACE = Symbol.for("zabi-components.top-navbar-place");

/**
 * Where a piece of the bar's `actions` is drawn: in the `bar`, or in the
 * `menu` sheet that opens below `collapseAt`, where it has the full width.
 */
export type TopNavbarPlace = "bar" | "menu";

/** Called by the sheet's content: everything rendered inside it reads `"menu"`. */
export function markTopNavbarPlace(place: TopNavbarPlace): void {
    setContext(TOP_NAVBAR_PLACE, place);
}

/**
 * Where the component calling this is drawn. Call it while the component
 * initialises. A control in a TopNavbar's `actions` snippet can then draw
 * itself large in the sheet and compact in the bar, with no argument to the
 * snippet: `{#snippet actions()}<MyPicker />{/snippet}` keeps working. Outside
 * a TopNavbar, in the bar and in `menu="inline"` it is `"bar"`.
 */
export function getTopNavbarPlace(): TopNavbarPlace {
    return getContext<TopNavbarPlace | undefined>(TOP_NAVBAR_PLACE) ?? "bar";
}
