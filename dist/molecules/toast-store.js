import { writable } from 'svelte/store';
function createToastStore() {
    const { subscribe, update } = writable([]);
    function dismiss(id) {
        update((list) => list.filter((t) => t.id !== id));
    }
    return {
        subscribe,
        push(options) {
            const id = options.id ?? `toast-${Math.random().toString(36).slice(2, 11)}`;
            const duration = options.duration ?? 5000;
            const item = {
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
export function pushToast(options) {
    return toastStore.push(options);
}
export function dismissToast(id) {
    toastStore.dismiss(id);
}
