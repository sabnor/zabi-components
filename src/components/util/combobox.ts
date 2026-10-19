/**
 * What a `Combobox` is given and what it says by itself. An app in another
 * language passes its own words through `strings`, or sets them once for the
 * whole app with `<ZabiStringsProvider strings={{ combobox: … }}>`.
 */

/** One suggestion in the list. Add your own fields; `item` can draw them. */
export interface ComboboxItem {
    /** What identifies the suggestion. */
    value: string;
    /** The text it puts in the field when chosen, and its name for a screen reader. */
    label: string;
    /** A second line under the label. */
    description?: string;
    /** Shown, but cannot be chosen. */
    disabled?: boolean;
}

/** Every word a `Combobox` says by itself, shown or only read out. */
export interface ComboboxStrings {
    /** In the list and read out while `search` is running. */
    loading: string;
    /** In the list and read out when the search found nothing (or failed). */
    empty: string;
    /** Read out when the list has results: "3 results". */
    results: (count: number) => string;
}

export const DEFAULT_COMBOBOX_STRINGS: ComboboxStrings = {
    loading: "Searching…",
    empty: "No matches",
    results: (count) => (count === 1 ? "1 result" : `${count} results`),
};
