import { writable } from 'svelte/store';

export type ToastLevel = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
    id: string;
    /** Shown in the expandable section when `detail` is omitted */
    message: string;
    type: ToastLevel;
    /** Header title (defaults by toast type) */
    title?: string;
    /** Expandable warning / detail text (falls back to `message`) */
    detail?: string;
    /**
     * Reserved for future use. Auto-dismiss is handled inside `Toaster` via the
     * countdown timer.
     */
    duration?: number;
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
            duration?: number;
            id?: string;
            title?: string;
            detail?: string;
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

/** Queue a toast (returns id). */
export function pushToast(options: {
    message: string;
    type?: ToastLevel;
    duration?: number;
    title?: string;
    detail?: string;
}): string {
    return toastStore.push(options);
}

export function dismissToast(id: string): void {
    toastStore.dismiss(id);
}
