/**
 * Every word a `Select` says by itself, shown or only read out. An app in
 * another language passes its own through `strings`; what it leaves out stays
 * as it is here. The older props for six of them (`placeholder`,
 * `searchPlaceholder`, `noResultsText`, `loadingText`, `emptyStateTitle`,
 * `emptyStateDescription`) still work, and win over `strings`.
 */
export interface SelectStrings {
    /** Shown in the field while nothing is chosen, and the first, empty option of the native select. */
    placeholder: string;
    /** Placeholder and accessible name of the search field above the options. */
    searchPlaceholder: string;
    /** Shown in the list when the search matches nothing. */
    noResults: string;
    /** Shown in the field and in the list while `isLoading`. */
    loading: string;
    /** Heading of the box shown in the list when there are no options at all. */
    emptyTitle: string;
    /** The line under that heading. */
    emptyDescription: string;
    /** Accessible name of the list of options. */
    listLabel: string;
    /** Accessible name of the close button of the sheet the list opens in on a phone. */
    closeLabel: string;
    /** Accessible name of that sheet's grip while its button takes the sheet up to full height. */
    expandLabel: string;
    /** The same, while it takes the sheet back down. */
    collapseLabel: string;
}

export const DEFAULT_SELECT_STRINGS: SelectStrings = {
    placeholder: "Select an option",
    searchPlaceholder: "Search options",
    noResults: "No results found",
    loading: "Loading options...",
    emptyTitle: "No options available",
    emptyDescription: "Add an option to start making selections.",
    listLabel: "Select options",
    closeLabel: "Close",
    expandLabel: "Expand",
    collapseLabel: "Collapse",
};

/** How a Select shows its options. See the `presentation` prop. */
export type SelectPresentation = "auto" | "popover" | "sheet" | "native";

/** Marks the native `<select>` a Select renders, so a choice made in it before the page hydrates can be found. */
export const NATIVE_SELECT_ATTRIBUTE = "data-zabi-select";

/**
 * What each server-rendered native select said before the component took it
 * over.
 *
 * The server's HTML carries a real `<select>`, and it works at once: a
 * visitor can choose from it while the scripts are still on their way. When
 * the component then hydrates it renders the value it was given, which would
 * silently undo that choice. So the values are noted when this module loads,
 * which is before anything hydrates, and every change after that is noted
 * too; the component asks for its own element's when it mounts.
 */
const chosenBeforeMount = new WeakMap<Element, string>();

if (typeof document !== "undefined") {
    const selector = `select[${NATIVE_SELECT_ATTRIBUTE}]`;
    for (const element of document.querySelectorAll<HTMLSelectElement>(selector)) {
        chosenBeforeMount.set(element, element.value);
    }
    document.addEventListener(
        "change",
        (event) => {
            const target = event.target;
            if (target instanceof HTMLSelectElement && target.matches(selector)) {
                chosenBeforeMount.set(target, target.value);
            }
        },
        true,
    );
}

/** The value `element` had in the server's HTML or was given by the visitor since; undefined for one this module never saw. */
export function valueBeforeMount(element: Element): string | undefined {
    return chosenBeforeMount.get(element);
}
