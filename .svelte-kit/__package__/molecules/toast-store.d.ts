export type ToastLevel = 'success' | 'error' | 'warning' | 'info';
export interface ToastItem {
    id: string;
    message: string;
    type: ToastLevel;
    /** ms; 0 = no auto-dismiss */
    duration?: number;
}
export declare const toastStore: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<ToastItem[]>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    push(options: {
        message: string;
        type?: ToastLevel;
        duration?: number;
        id?: string;
    }): string;
    dismiss: (id: string) => void;
    clear(): void;
};
/** Queue a toast (returns id). */
export declare function pushToast(options: {
    message: string;
    type?: ToastLevel;
    duration?: number;
}): string;
export declare function dismissToast(id: string): void;
