export type ToastLevel = 'success' | 'error' | 'warning' | 'info';
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
}
export declare const toastStore: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<ToastItem[]>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    push(options: {
        message: string;
        type?: ToastLevel;
        /** Same semantics as {@link ToastItem.duration}. */
        duration?: number;
        id?: string;
        title?: string;
        detail?: string;
    }): string;
    dismiss: (id: string) => void;
    clear(): void;
};
export declare function pushToast(options: {
    message: string;
    type?: ToastLevel;
    /** Same semantics as {@link ToastItem.duration}. */
    duration?: number;
    title?: string;
    detail?: string;
}): string;
export declare function dismissToast(id: string): void;
//# sourceMappingURL=toast-store.d.ts.map