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
 * What a visitor chose in each server-rendered native select before the
 * component took it over.
 *
 * The server's HTML carries a real `<select>`, and it works at once: a
 * visitor can choose from it while the scripts are still on their way, and
 * the browser may put an earlier choice back into it after a reload or a
 * step back. When the component then hydrates it renders the value it was
 * given, which would silently undo that. So when this module loads, which is
 * before anything hydrates, each select's value is noted beside the value
 * the server rendered it with (its `selected` option, or else its first),
 * and every change after that is noted too. The component asks for its own
 * element's when it mounts.
 *
 * Only a value that differs from the rendered one is a choice. A select that
 * nobody touched is not, whatever it shows: it used to be compared with the
 * component's prop instead, and a value with no option of its own (its
 * options still loading, or simply not among them) was replaced by whatever
 * the select happened to fall back to.
 */
const seenBeforeMount = new WeakMap<Element, { rendered: string; value: string }>();

/** The value a select has when nobody has touched it: that of the option with the `selected` attribute, or of the first. */
function renderedValue(element: HTMLSelectElement): string {
    const options = [...element.options];
    return (options.find((option) => option.defaultSelected) ?? options[0])?.value ?? "";
}

if (typeof document !== "undefined") {
    const selector = `select[${NATIVE_SELECT_ATTRIBUTE}]`;
    for (const element of document.querySelectorAll<HTMLSelectElement>(selector)) {
        seenBeforeMount.set(element, { rendered: renderedValue(element), value: element.value });
    }
    document.addEventListener(
        "change",
        (event) => {
            const target = event.target;
            if (target instanceof HTMLSelectElement && target.matches(selector)) {
                const seen = seenBeforeMount.get(target);
                if (seen) seen.value = target.value;
            }
        },
        true,
    );
}

/**
 * What the visitor (or the browser, restoring a form) chose in `element`
 * before its component mounted; `undefined` when it still has the value the
 * server rendered, and for an element this module never saw.
 */
export function choiceBeforeMount(element: Element): string | undefined {
    const seen = seenBeforeMount.get(element);
    return seen && seen.value !== seen.rendered ? seen.value : undefined;
}
