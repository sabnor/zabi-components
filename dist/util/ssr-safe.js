/**
 * Browser-only guards and id generation for components that run under SSR.
 * `generateId()` is non-deterministic on the client (random) vs counter on the server —
 * use stable ids for ARIA pairs (e.g. `menuId` on NavigationMenu), not for persisted keys.
 */
export function isBrowser() {
    return typeof window !== 'undefined';
}
export function safeWindow() {
    return isBrowser() ? window : undefined;
}
export function safeDocument() {
    return isBrowser() ? document : undefined;
}
export function safeLocalStorage() {
    return isBrowser() ? localStorage : undefined;
}
export function safeSessionStorage() {
    return isBrowser() ? sessionStorage : undefined;
}
export function safeRequestAnimationFrame(callback) {
    return isBrowser() ? requestAnimationFrame(callback) : undefined;
}
export function safeSetTimeout(callback, delay) {
    return isBrowser() ? setTimeout(callback, delay) : undefined;
}
export function safeClearTimeout(id) {
    if (isBrowser() && id) {
        clearTimeout(id);
    }
}
export function safeSetInterval(callback, delay) {
    return isBrowser() ? setInterval(callback, delay) : undefined;
}
export function safeClearInterval(id) {
    if (isBrowser() && id) {
        clearInterval(id);
    }
}
let idCounter = 0;
export function generateId(prefix = 'id') {
    if (isBrowser()) {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    }
    else {
        return `${prefix}-ssr-${++idCounter}`;
    }
}
