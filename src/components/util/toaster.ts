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
    /** The same, while a pointer, a finger or focus holds the timer. */
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

/**
 * The three lengths a toast can be given by name, in milliseconds.
 *
 * `short` (3 s) is for a few words that need no reading time ("Saved").
 * Anything a person has to read is `medium` (7 s) or `long` (14 s). What
 * they have to act on, and an error, should stay: `"persistent"`.
 */
export const TOAST_DURATIONS = { short: 3000, medium: 7000, long: 14000 } as const;

/**
 * How long a toast stays: one of the named lengths, `"persistent"` (until it
 * is dismissed), or a number of milliseconds, where `0` is persistent too.
 */
export type ToastDuration = keyof typeof TOAST_DURATIONS | "persistent" | number;

/**
 * A toast with more visible text than this (title and message together) gets
 * `long` when the app gave it no duration.
 */
export const TOAST_LONG_TEXT_LENGTH = 120;

/**
 * And one with more than this stays until it is dismissed: `long` was
 * measured as too short to read it in, and nothing longer has a name.
 */
export const TOAST_PERSISTENT_TEXT_LENGTH = 240;

/** The milliseconds of a duration, `0` for one that stays; `undefined` for what is not a duration. */
function toastDurationMs(duration: unknown): number | undefined {
    if (duration === "persistent") return 0;
    if (typeof duration === "string") {
        return Object.prototype.hasOwnProperty.call(TOAST_DURATIONS, duration)
            ? TOAST_DURATIONS[duration as keyof typeof TOAST_DURATIONS]
            : undefined;
    }
    if (typeof duration !== "number" || Number.isNaN(duration)) return undefined;
    return duration <= 0 ? 0 : duration;
}

/**
 * How long a toast stays, in milliseconds; `0` is until it is dismissed.
 *
 * What the app said for the toast wins, whatever the toast is. When it said
 * nothing: an error stays, and so does a toast with an action, since the user
 * has to be able to reach the button. So does a text longer than
 * `TOAST_PERSISTENT_TEXT_LENGTH`, whatever the Toaster's default. Everything
 * else gets the Toaster's `defaultDuration`, or `medium` without one; a text
 * longer than `TOAST_LONG_TEXT_LENGTH` gets `long`, unless the default is
 * longer still.
 */
export function resolveToastDuration(
    toast: { duration?: ToastDuration; type: string; hasAction: boolean; textLength: number },
    defaultDuration?: ToastDuration,
): number {
    const said = toastDurationMs(toast.duration);
    if (said !== undefined) return said;
    if (toast.type === "error" || toast.hasAction) return 0;
    if (toast.textLength > TOAST_PERSISTENT_TEXT_LENGTH) return 0;
    const base = toastDurationMs(defaultDuration) ?? TOAST_DURATIONS.medium;
    if (base === 0 || toast.textLength <= TOAST_LONG_TEXT_LENGTH) return base;
    return Math.max(base, TOAST_DURATIONS.long);
}

/**
 * The least a toast has left when a finger that held it lifts, in seconds.
 * As long as `short`: holding a short toast starts it again, in effect.
 */
export const TOAST_SECONDS_AFTER_HOLD = 3;

/** What `onpausechange` of a `Toaster` is called with. */
export interface ToastPauseChange {
    /** The id of the toast, as `pushToast` returned it. */
    id: string;
    /** True while a pointer is over the toast, a finger is on it, or focus is inside it. */
    paused: boolean;
}
