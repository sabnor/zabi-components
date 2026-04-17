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
export declare const toastStore: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<ToastItem[]>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    push(options: {
        message: string;
        type?: ToastLevel;
        duration?: number;
        id?: string;
        title?: string;
        detail?: string;
    }): string;
    dismiss: (id: string) => void;
    clear(): void;
};
/** Queue a toast (returns id). */
export declare function pushToast(options: {
    message: string;
    type?: ToastLevel;
    duration?: number;
    title?: string;
    detail?: string;
}): string;
export declare function dismissToast(id: string): void;
