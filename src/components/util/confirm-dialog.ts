/** Public types for `ConfirmDialog`. */

/** Sets the confirm button's style and the icon beside the message. */
export type ConfirmDialogVariant = "danger" | "warning" | "info";

/** How the user backed out: the cancel button, or one of Modal's own ways to close. */
export type ConfirmDialogCancelReason =
    | "cancel-button"
    | "escape"
    | "backdrop"
    | "close-button";

/**
 * What `onconfirm` may return. `false`, returned or resolved, keeps the dialog
 * open; anything else closes it. A promise puts the dialog in its loading
 * state until it settles.
 */
export type ConfirmDialogResult = void | boolean | Promise<void | boolean>;
