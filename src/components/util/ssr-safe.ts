/**
 * Browser-only guards and id generation for components that run under SSR.
 * `generateId()` is non-deterministic on the client (random) vs counter on the server —
 * use stable ids for ARIA pairs (e.g. `menuId` on NavigationMenu), not for persisted keys.
 */

export function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

export function safeWindow(): Window | undefined {
    return isBrowser() ? window : undefined;
}

export function safeDocument(): Document | undefined {
    return isBrowser() ? document : undefined;
}

export function safeLocalStorage(): Storage | undefined {
    return isBrowser() ? localStorage : undefined;
}

export function safeSessionStorage(): Storage | undefined {
    return isBrowser() ? sessionStorage : undefined;
}

export function safeRequestAnimationFrame(callback: FrameRequestCallback): number | undefined {
    return isBrowser() ? requestAnimationFrame(callback) : undefined;
}

export function safeSetTimeout(callback: () => void, delay: number): ReturnType<typeof setTimeout> | undefined {
    return isBrowser() ? setTimeout(callback, delay) : undefined;
}

export function safeClearTimeout(id: ReturnType<typeof setTimeout> | undefined): void {
    if (isBrowser() && id) {
        clearTimeout(id);
    }
}

export function safeSetInterval(callback: () => void, delay: number): ReturnType<typeof setInterval> | undefined {
    return isBrowser() ? setInterval(callback, delay) : undefined;
}

export function safeClearInterval(id: ReturnType<typeof setInterval> | undefined): void {
    if (isBrowser() && id) {
        clearInterval(id);
    }
}

let idCounter = 0;
export function generateId(prefix: string = 'id'): string {
    if (isBrowser()) {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    } else {
        return `${prefix}-ssr-${++idCounter}`;
    }
}
