// SSR-safe utilities for zabi-components
// This ensures components work properly during server-side rendering

export function isBrowser(): boolean {
    return typeof window !== "undefined" && typeof document !== "undefined";
}

export function safeWindow(): Window | undefined {
    return isBrowser() ? window : undefined;
}

export function safeDocument(): Document | undefined {
    return isBrowser() ? document : undefined;
}

export function safeRequestAnimationFrame(callback: FrameRequestCallback): number | undefined {
    return isBrowser() ? requestAnimationFrame(callback) : undefined;
}

export function safeSetTimeout(callback: () => void, delay: number): NodeJS.Timeout | undefined {
    return isBrowser() ? setTimeout(callback, delay) : undefined;
}

export function safeClearTimeout(id: NodeJS.Timeout | undefined): void {
    if (isBrowser() && id) {
        clearTimeout(id);
    }
}
