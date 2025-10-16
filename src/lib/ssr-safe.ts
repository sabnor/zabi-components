// SSR-safe utilities for zabi-components
// This ensures components work properly during server-side rendering

// Check if we're in a browser environment
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

export function safeSetTimeout(callback: () => void, delay: number): NodeJS.Timeout | undefined {
    return isBrowser() ? setTimeout(callback, delay) : undefined;
}

export function safeClearTimeout(id: NodeJS.Timeout | undefined): void {
    if (isBrowser() && id) {
        clearTimeout(id);
    }
}

export function safeSetInterval(callback: () => void, delay: number): NodeJS.Timeout | undefined {
    return isBrowser() ? setInterval(callback, delay) : undefined;
}

export function safeClearInterval(id: NodeJS.Timeout | undefined): void {
    if (isBrowser() && id) {
        clearInterval(id);
    }
}

// Generate SSR-safe unique IDs
let idCounter = 0;
export function generateId(prefix: string = 'id'): string {
    if (isBrowser()) {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    } else {
        return `${prefix}-ssr-${++idCounter}`;
    }
}
