import { writable } from 'svelte/store';

export type ToastLevel = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
    id: string;
    message: string;
    type: ToastLevel;
    /** ms; 0 = no auto-dismiss */
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
        }): string {
            const id =
                options.id ?? `toast-${Math.random().toString(36).slice(2, 11)}`;
            const duration = options.duration ?? 5000;
            const item: ToastItem = {
                id,
                message: options.message,
                type: options.type ?? 'info',
                duration,
            };
            update((list) => [...list, item]);
            if (duration > 0) {
                setTimeout(() => dismiss(id), duration);
            }
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
}): string {
    return toastStore.push(options);
}

export function dismissToast(id: string): void {
    toastStore.dismiss(id);
}
