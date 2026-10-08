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
    closesIn: (seconds) => `This message will close in ${seconds} ${seconds === 1 ? "second" : "seconds"}.`,
    pausedClosesIn: (seconds) => `Paused — closes in ${seconds} ${seconds === 1 ? "second" : "seconds"}.`,
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

/**
 * How a `Toaster` presents its toasts. `"stack"` is the stack in the corner
 * (and across the width on a phone); `"snackbar"` is the compact form for a
 * phone, one at a time, docked above whatever is at the bottom; `"auto"` is
 * the snackbar below 640px and the stack from there up.
 */
export type ToasterMode = "stack" | "snackbar" | "auto";

/** The words of a toast on screen: its first line, and the line under it if there is one. */
export function toastTexts(
    toast: { title?: string; message: string; type: string },
    strings: Pick<ToasterStrings, "successTitle" | "errorTitle" | "warningTitle" | "infoTitle">,
): { title: string; message: string; headerTitle: string; secondLine: string } {
    const title = toast.title?.trim() ?? "";
    const message = toast.message.trim();
    const fallback =
        toast.type === "success"
            ? strings.successTitle
            : toast.type === "error"
              ? strings.errorTitle
              : toast.type === "warning"
                ? strings.warningTitle
                : strings.infoTitle;
    return {
        title,
        message,
        // The title, or the message when there is no title.
        headerTitle: title || message || fallback,
        // The message, under a title that says something else.
        secondLine: title && message && message !== title ? message : "",
    };
}

/**
 * True when the toast has to stay until a person has dealt with it, which
 * makes it the one a `max` never drops: an error, one with an action, one
 * with no end (`"persistent"`, or text too long to read in `long`).
 */
export function toastStays(
    toast: { title?: string; message: string; type: string; duration?: ToastDuration; action?: unknown },
    defaultDuration?: ToastDuration,
): boolean {
    const title = toast.title?.trim() ?? "";
    const message = toast.message.trim();
    const textLength = (title || message).length + (title && message && message !== title ? message.length : 0);
    return (
        resolveToastDuration(
            { duration: toast.duration, type: toast.type, hasAction: !!toast.action, textLength },
            defaultDuration,
        ) === 0
    );
}

/**
 * Ids of toasts that a `max` is dropping to make room for a newer one. Such a
 * toast leaves at once, without the exit motion: a newer toast is coming in
 * where it is, and the two would otherwise lie on each other for a moment.
 */
export const toastsReplaced = new Set<string>();

/** The Material standard curve (`--ease-standard`), as an easing function for a script-driven slide. */
export function easeStandard(t: number): number {
    const [x1, y1, x2, y2] = [0.2, 0, 0, 1];
    const at = (a: number, b: number, s: number) => 3 * a * (1 - s) ** 2 * s + 3 * b * (1 - s) * s ** 2 + s ** 3;
    let lo = 0;
    let hi = 1;
    let s = t;
    for (let i = 0; i < 20; i++) {
        s = (lo + hi) / 2;
        if (at(x1, x2, s) < t) lo = s;
        else hi = s;
    }
    return at(y1, y2, s);
}

/** A toast dragged further than this share of its width is dismissed, flick or not. */
export const TOAST_SWIPE_DISMISS_FRACTION = 0.4;
