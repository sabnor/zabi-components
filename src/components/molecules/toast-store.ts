import { writable } from 'svelte/store';

export type ToastLevel = 'success' | 'error' | 'warning' | 'info';

/**
 * One action offered inside a toast, such as Undo.
 *
 * A toast closes on its own, so the action must not be the only way to do the
 * thing: offer it elsewhere in the page as well, and give an action toast a
 * long `duration`, or `0` to keep it until dismissed (WCAG 2.2.1).
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
    /** Primary line (always shown). */
    message: string;
    type: ToastLevel;
    title?: string;
    /** Expandable body; UI can fall back to `message`. */
    detail?: string;
    /**
     * Auto-dismiss duration in milliseconds.
     * When omitted, the toaster uses 14s. Use `0` to keep the toast until dismissed manually.
     */
    duration?: number;
    /** An action button in the toast, such as Undo. */
    action?: ToastAction;
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
            duration?: number;
            id?: string;
            title?: string;
            detail?: string;
            action?: ToastAction;
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
            };
            update((list) => [...list, item]);
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
    type?: ToastLevel;
    /** Same semantics as {@link ToastItem.duration}. */
    duration?: number;
    title?: string;
    detail?: string;
    /** An action button in the toast, such as Undo. See {@link ToastAction}. */
    action?: ToastAction;
}): string {
    return toastStore.push(options);
}

export function dismissToast(id: string): void {
    toastStore.dismiss(id);
}
