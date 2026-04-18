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
            const item = {
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
export function pushToast(options) {
    return toastStore.push(options);
}
export function dismissToast(id) {
    toastStore.dismiss(id);
}
