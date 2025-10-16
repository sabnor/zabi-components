// SSR-safe utilities for zabi-components
// This ensures components work properly during server-side rendering

import { browser } from '$app/environment';

export function isBrowser(): boolean {
    return browser;
}

export function safeWindow(): Window | undefined {
    return browser ? window : undefined;
}

export function safeDocument(): Document | undefined {
    return browser ? document : undefined;
}

export function safeLocalStorage(): Storage | undefined {
    return browser ? localStorage : undefined;
}

export function safeSessionStorage(): Storage | undefined {
    return browser ? sessionStorage : undefined;
}

export function safeRequestAnimationFrame(callback: FrameRequestCallback): number | undefined {
    return browser ? requestAnimationFrame(callback) : undefined;
}

export function safeSetTimeout(callback: () => void, delay: number): NodeJS.Timeout | undefined {
    return browser ? setTimeout(callback, delay) : undefined;
}

export function safeClearTimeout(id: NodeJS.Timeout | undefined): void {
    if (browser && id) {
        clearTimeout(id);
    }
}

export function safeSetInterval(callback: () => void, delay: number): NodeJS.Timeout | undefined {
    return browser ? setInterval(callback, delay) : undefined;
}

export function safeClearInterval(id: NodeJS.Timeout | undefined): void {
    if (browser && id) {
        clearInterval(id);
    }
}

// Generate SSR-safe unique IDs
let idCounter = 0;
export function generateId(prefix: string = 'id'): string {
    if (browser) {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    } else {
        return `${prefix}-ssr-${++idCounter}`;
    }
}
