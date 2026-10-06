/**
 * The library's words, set once for a whole app.
 *
 * Every component says its English defaults unless it is told otherwise, one
 * `strings` object or one prop at a time. An app in another language then has
 * to remember every one of them, and a forgotten prop paints English. With
 * `<ZabiStringsProvider strings={…}>` at the root, every component under it
 * falls back to the app's words instead:
 *
 *   1. the built-in English default,
 *   2. the provider's entry for the component (or `common`, for a
 *      single-text prop),
 *   3. the instance's own `strings`,
 *   4. the instance's single-text props.
 *
 * Later wins. Outside a provider nothing changes.
 *
 * It is Svelte context, not a module-level store: on a server it belongs to
 * the request being rendered, so two languages can be served at once, and a
 * provider inside another merges over it for its own part of the page. An
 * overlay rendered in `<body>` still reads the provider it was written under:
 * context follows the component tree, not the DOM.
 */
import { getContext, setContext } from "svelte";

import type { AvatarGroupStrings } from "./avatar.js";
import type { CalendarStrings } from "./calendar.js";
import type { DateFieldStrings, TimeFieldStrings } from "./temporal-field.js";
import type { MediaGridStrings } from "./media-grid.js";
import type { PhotoGridStrings, PhotoViewerStrings } from "./photo.js";
import type { ProgressStrings } from "./progress.js";
import type { PullToRefreshStrings } from "./pull-to-refresh.js";
import type { RatingStrings } from "./rating.js";
import type {
    ColorPickerStrings,
    ComponentDemoStrings,
    ContactFormStrings,
    PropsTableStrings,
} from "./ready-made-strings.js";
import type { SelectStrings } from "./select.js";
import type {
    SidebarAccountPanelStrings,
    SidebarBrandHeaderStrings,
    SidebarFooterStrings,
    SidebarNavigationStrings,
} from "./sidebar.js";
import type { SortableListStrings } from "./sortable-list.js";
import type { StepperStrings } from "./stepper.js";
import type { SwipeableListItemStrings } from "./swipeable-list-item.js";
import type { ThemeToggleLabels } from "./theme-mode.js";
import type { ToasterStrings } from "./toaster.js";
import type { TopNavbarStrings } from "./top-navbar.js";

/**
 * The few words that many components' single-text props default to. A
 * component whose prop is not given says the one here.
 */
export interface ZabiCommonStrings {
    /** The close button of a dialog, a drawer or a sheet (`closeLabel`). */
    close: string;
    /** AppBar's back control (`backLabel`). */
    back: string;
    /** A sheet's grip while it takes the sheet up a step (`expandLabel`). */
    expand: string;
    /** The same, while it takes it down (`collapseLabel`). */
    collapse: string;
    /** Read after the label of a required field (FormField's `requiredLabel`). */
    required: string;
    /** The button in a password field that shows what was typed (Input's `revealLabel`). */
    showPassword: string;
    /** Placeholder of a search field in a sidebar (`searchPlaceholder`). */
    search: string;
    /** ConfirmDialog's confirming button (`confirmLabel`). */
    confirm: string;
    /** ConfirmDialog's other button (`cancelLabel`). */
    cancel: string;
}

export const DEFAULT_ZABI_COMMON_STRINGS: ZabiCommonStrings = {
    close: "Close",
    back: "Back",
    expand: "Expand",
    collapse: "Collapse",
    required: "(required)",
    showPassword: "Show password",
    search: "Search...",
    confirm: "Confirm",
    cancel: "Cancel",
};

/*
 * Components whose own words are single-text props, each with a sentence of
 * its own for a default. The provider's entry for one has the props' names.
 */

/** Toast's own text: `closeLabel`. */
export interface ToastTexts {
    closeLabel: string;
}
export const DEFAULT_TOAST_TEXTS: ToastTexts = { closeLabel: "Close notification" };

/** Alert's own text: `closeLabel`. */
export interface AlertTexts {
    closeLabel: string;
}
export const DEFAULT_ALERT_TEXTS: AlertTexts = { closeLabel: "Dismiss alert" };

/** CodeBlock's own texts: the copy button's name, and what is announced once copied. */
export interface CodeBlockTexts {
    copyLabel: string;
    copiedLabel: string;
}
export const DEFAULT_CODE_BLOCK_TEXTS: CodeBlockTexts = {
    copyLabel: "Copy code to clipboard",
    copiedLabel: "Code copied to clipboard",
};

/** ImageUpload's own texts, by the name of the prop each one is. */
export interface ImageUploadTexts {
    placeholder: string;
    browseText: string;
    changeText: string;
    removeText: string;
    selectedText: string;
    removedText: string;
    errorTitle: string;
    errorRecovery: string;
}
export const DEFAULT_IMAGE_UPLOAD_TEXTS: ImageUploadTexts = {
    placeholder: "No image selected",
    browseText: "Click to choose a file",
    changeText: "Change",
    removeText: "Remove",
    selectedText: "Image selected",
    removedText: "Image removed",
    errorTitle: "Image upload failed",
    errorRecovery: "Recovery action: try another file or retry upload.",
};

/** UnsavedChangesBar's own texts, by the name of the prop each one is. */
export interface UnsavedChangesBarTexts {
    message: string;
    label: string;
    saveLabel: string;
    discardLabel: string;
}
export const DEFAULT_UNSAVED_CHANGES_BAR_TEXTS: UnsavedChangesBarTexts = {
    message: "You have unsaved changes",
    label: "Unsaved changes",
    saveLabel: "Save",
    discardLabel: "Discard",
};

/** One optional entry per component that has words of its own, and `common`. */
export interface ZabiStrings {
    common?: Partial<ZabiCommonStrings>;
    alert?: Partial<AlertTexts>;
    avatarGroup?: Partial<AvatarGroupStrings>;
    calendar?: Partial<CalendarStrings>;
    codeBlock?: Partial<CodeBlockTexts>;
    colorPicker?: Partial<ColorPickerStrings>;
    dateField?: Partial<DateFieldStrings>;
    componentDemo?: Partial<ComponentDemoStrings>;
    contactForm?: Partial<ContactFormStrings>;
    imageUpload?: Partial<ImageUploadTexts>;
    mediaGrid?: Partial<MediaGridStrings>;
    photoGrid?: Partial<PhotoGridStrings>;
    photoViewer?: Partial<PhotoViewerStrings>;
    propsTable?: Partial<PropsTableStrings>;
    progress?: Partial<ProgressStrings>;
    pullToRefresh?: Partial<PullToRefreshStrings>;
    rating?: Partial<RatingStrings>;
    select?: Partial<SelectStrings>;
    sidebarAccountPanel?: Partial<SidebarAccountPanelStrings>;
    sidebarBrandHeader?: Partial<SidebarBrandHeaderStrings>;
    sidebarFooter?: Partial<SidebarFooterStrings>;
    sidebarNavigation?: Partial<SidebarNavigationStrings>;
    sortableList?: Partial<SortableListStrings>;
    stepper?: Partial<StepperStrings>;
    swipeableListItem?: Partial<SwipeableListItemStrings>;
    themeToggle?: Partial<ThemeToggleLabels>;
    timeField?: Partial<TimeFieldStrings>;
    toast?: Partial<ToastTexts>;
    toaster?: Partial<ToasterStrings>;
    topNavbar?: Partial<TopNavbarStrings>;
    unsavedChangesBar?: Partial<UnsavedChangesBarTexts>;
}

/** What the context holds: an object whose `current` is read when it is needed, so a change reaches every reader. */
export interface ZabiStringsContext {
    readonly current: ZabiStrings;
}

const KEY = Symbol("zabi-strings");
const NONE: ZabiStrings = {};

/** `over` on top of `under`, entry by entry: an inner provider only replaces the words it gives. */
export function mergeZabiStrings(under: ZabiStrings | undefined, over: ZabiStrings | undefined): ZabiStrings {
    if (!under) return over ?? NONE;
    if (!over) return under;
    const merged: Record<string, object> = { ...under };
    for (const [key, words] of Object.entries(over)) {
        if (words) merged[key] = { ...(merged[key] ?? {}), ...words };
    }
    return merged as ZabiStrings;
}

/** For `ZabiStringsProvider`: the provider above this one, if any. Call while the component initialises. */
export function outerZabiStrings(): ZabiStringsContext | undefined {
    return getContext<ZabiStringsContext | undefined>(KEY);
}

/** For `ZabiStringsProvider`: makes `context` what everything below reads. */
export function provideZabiStrings(context: ZabiStringsContext): void {
    setContext(KEY, context);
}

/**
 * The words of the provider this component is under, for app code that wants
 * the same words elsewhere. Call it while the component initialises, and read
 * `current` where the words are used (in the markup, or a `$derived`), so a
 * change of language is followed. Outside a provider `current` is empty.
 */
export function getZabiStrings(): ZabiStringsContext {
    return outerZabiStrings() ?? { current: NONE };
}

/**
 * A component's own entry: `zabiStringsFor("select")` returns a function that
 * gives the provider's words for Select now, or undefined. Call it while the
 * component initialises; call what it returns inside a `$derived`.
 */
export function zabiStringsFor<K extends Exclude<keyof ZabiStrings, "common">>(
    key: K,
): () => ZabiStrings[K] {
    const context = outerZabiStrings();
    return () => context?.current[key];
}

/** The common words with their defaults filled in, the same way. */
export function zabiCommonStrings(): () => ZabiCommonStrings {
    const context = outerZabiStrings();
    return () =>
        context?.current.common
            ? { ...DEFAULT_ZABI_COMMON_STRINGS, ...context.current.common }
            : DEFAULT_ZABI_COMMON_STRINGS;
}
