import { writable } from 'svelte/store';
import type { ToastDuration } from '../util/toaster.js';

export type ToastLevel = 'success' | 'error' | 'warning' | 'info';

/**
 * One action offered inside a toast, such as Undo.
 *
 * A toast with an action stays until it is dismissed, unless you give it a
 * `duration` (a named length or milliseconds): a keyboard user has to reach the button first, and the toaster
 * may be far away in the tab order (WCAG 2.2.1). `focusToasts()` moves focus
 * there. The action must still not be the only way to do the thing: offer it
 * elsewhere in the page as well.
 */
export interface ToastAction {
    /** Button text, and its accessible name. */
    label: string;
    onclick: () => void;
    /** Close the toast after the handler runs. Defaults to `true`. */
    dismissOnClick?: boolean;
}

export interface ToastItem {
    id: string;
    /**
     * What the toast says. Always shown: as its one line, or under `title`
     * when it has one.
     */
    message: string;
    type: ToastLevel;
    /** A heading over the message. Without it the message stands alone. */
    title?: string;
    /**
     * The long version, kept behind a button that opens it. Only a toast
     * with `detail` has that button.
     */
    detail?: string;
    /**
     * How long the toast stays: `"short"` (3 s, a few words that need no
     * reading time), `"medium"` (7 s), `"long"` (14 s), `"persistent"`
     * (until it is dismissed: what the user has to act on, and errors), or
     * a number of milliseconds, where `0` is persistent too. What is given
     * here always wins.
     *
     * When omitted, the toaster decides: an error and a toast with an
     * `action` stay until dismissed. Everything else goes by its title and
     * message together: up to 120 characters gets `medium` (or the
     * Toaster's `defaultDuration`), 121 to 240 gets `long`, and more than
     * 240 stays until dismissed.
     */
    duration?: ToastDuration;
    /** An action button in the toast, such as Undo. */
    action?: ToastAction;
    /**
     * `false` leaves the close button out, for a short timed confirmation
     * that nobody has to act on: the toast then has no control, takes no
     * taps (they reach the page under it) and cannot be held. Ignored, and
     * the button shown, for a toast that stays (an error, one with an
     * action, `"persistent"`), one with `detail`, and under a Toaster with
     * `showCountdown`. Defaults to `true`.
     */
    closable?: boolean;
    /**
     * Whether the thin bar along the bottom, which empties over the toast's
     * time, is drawn. Unset, the Toaster decides: it is drawn, except under
     * a confirmation in the snackbar that has nothing to press (the case
     * `closable: false` makes), where it is left out. `true` or `false`
     * here wins over the Toaster's `timeLine`. The sentence a screen reader
     * finds for the time left stays either way.
     */
    timeLine?: boolean;
}

function createToastStore() {
    const { subscribe, update } = writable<ToastItem[]>([]);

    function dismiss(id: string) {
        update((list) => list.filter((t) => t.id !== id));
    }

    return {
        subscribe,
        push(options: {
            message: string;
            type?: ToastLevel;
            /** Same semantics as {@link ToastItem.duration}. */
            duration?: ToastDuration;
            id?: string;
            title?: string;
            detail?: string;
            action?: ToastAction;
            closable?: boolean;
            timeLine?: boolean;
        }): string {
            const id =
                options.id ?? `toast-${Math.random().toString(36).slice(2, 11)}`;
            const item: ToastItem = {
                id,
                message: options.message,
                type: options.type ?? 'info',
                duration: options.duration,
                title: options.title,
                detail: options.detail,
                action: options.action,
                closable: options.closable,
                timeLine: options.timeLine,
            };
            // A toast pushed with the id of one that is showing replaces it where it stands.
            update((list) =>
                list.some((t) => t.id === id) ? list.map((t) => (t.id === id ? item : t)) : [...list, item],
            );
            return id;
        },
        dismiss,
        clear() {
            update(() => []);
        },
    };
}

export const toastStore = createToastStore();

export function pushToast(options: {
    message: string;
    /**
     * Gives the toast a name of your own. Pushing with the id of a toast that
     * is showing replaces it in place, with its time started again, so
     * "Saved" pushed three times is one toast.
     */
    id?: string;
    type?: ToastLevel;
    /** Same semantics as {@link ToastItem.duration}. */
    duration?: ToastDuration;
    title?: string;
    detail?: string;
    /** An action button in the toast, such as Undo. See {@link ToastAction}. */
    action?: ToastAction;
    /** `false` leaves the close button out of a short timed toast. See {@link ToastItem.closable}. */
    closable?: boolean;
    /** `false` leaves the time bar out, `true` forces it. See {@link ToastItem.timeLine}. */
    timeLine?: boolean;
}): string {
    return toastStore.push(options);
}

export function dismissToast(id: string): void {
    toastStore.dismiss(id);
}

/**
 * Moves keyboard focus to the newest toast, so its action can be reached
 * without tabbing through the page. Bind it to a shortcut of your own; the
 * library registers none. Returns false when there is no toast to focus.
 *
 * Focus returns to where it was when that toast is dismissed.
 */
export function focusToasts(): boolean {
    if (typeof document === 'undefined') return false;
    const toasts = document.querySelectorAll<HTMLElement>('[data-zabi-toaster] [data-toast-id]');
    const newest = toasts[toasts.length - 1];
    // The action if the toast has one, else its first control.
    const target =
        newest?.querySelector<HTMLElement>('[data-toast-action]') ??
        newest?.querySelector<HTMLElement>('button');
    if (!target) return false;
    target.focus();
    return document.activeElement === target;
}
