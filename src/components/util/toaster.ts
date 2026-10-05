/**
 * Every word a `Toaster` says by itself. An app in another language passes
 * its own through `strings`; what it leaves out stays as it is here.
 */
export interface ToasterStrings {
    /** Accessible name of the region the toasts are in. */
    regionLabel: string;
    /**
     * What a toast says when it was pushed with neither a `title` nor a
     * `message`, by type. A toast with a message shows the message.
     */
    successTitle: string;
    errorTitle: string;
    warningTitle: string;
    infoTitle: string;
    /** The time a toast has left, while its timer runs. */
    closesIn: (seconds: number) => string;
    /** The same, while the pointer or focus holds the timer. */
    pausedClosesIn: (seconds: number) => string;
    /** The button that stops the timer; shown with `showCountdown`. */
    stop: string;
    /** The button under a toast's opened details, which closes them again. */
    okay: string;
    /** Accessible name of the button that opens a toast's details. */
    expand: string;
    /** The same button, once they are open. */
    collapse: string;
    /** Accessible name of the button that dismisses a toast. */
    dismiss: string;
    /**
     * Read after a toast's text when it has an action, so a screen reader
     * user hears that there is one. `label` is the action's own.
     */
    actionAvailable: (label: string) => string;
}

export const DEFAULT_TOASTER_STRINGS: ToasterStrings = {
    regionLabel: "Notifications",
    successTitle: "Changes saved",
    errorTitle: "Something went wrong",
    warningTitle: "Please review",
    infoTitle: "Notice",
    closesIn: (seconds) => `This message will close in ${seconds} seconds.`,
    pausedClosesIn: (seconds) => `Paused — closes in ${seconds} seconds.`,
    stop: "Click to stop",
    okay: "Okay",
    expand: "Expand details",
    collapse: "Collapse details",
    dismiss: "Dismiss notification",
    actionAvailable: (label) => `${label} available.`,
};

/** What `onpausechange` of a `Toaster` is called with. */
export interface ToastPauseChange {
    /** The id of the toast, as `pushToast` returned it. */
    id: string;
    /** True while the pointer is over the toast or focus is inside it. */
    paused: boolean;
}
