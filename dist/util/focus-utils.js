/** Focus helpers for overlays (modals, sheets). Requires `app.css` focus ring classes. */
/** From `app.css` `@layer components` — import the library/app stylesheet. */
export const FOCUS_BRAND_CLASS = "focus-brand";
export const FOCUS_NAV_CLASS = "focus-nav";
export function getFocusableElements(container) {
    const selector = [
        'button:not([disabled])',
        '[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(', ');
    return Array.from(container.querySelectorAll(selector)).filter((el) => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
    });
}
/** Tab wraps first↔last inside `container`. Caller should pair with `saveFocus` / `returnFocus`. */
export function trapFocus(container) {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) {
        return () => { };
    }
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    firstElement.focus();
    function handleKeydown(event) {
        if (event.key !== 'Tab') {
            return;
        }
        const currentFocus = document.activeElement;
        if (!focusableElements.includes(currentFocus)) {
            event.preventDefault();
            firstElement.focus();
            return;
        }
        if (event.shiftKey) {
            if (currentFocus === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        }
        else {
            if (currentFocus === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }
    container.addEventListener('keydown', handleKeydown);
    return () => {
        container.removeEventListener('keydown', handleKeydown);
    };
}
/** One entry per overlay open; `returnFocus` pops LIFO (nested modals). */
const focusReturnStack = [];
export function saveFocus() {
    if (typeof document === 'undefined') {
        return;
    }
    const active = document.activeElement;
    if (active instanceof HTMLElement && active !== document.body) {
        focusReturnStack.push(active);
    }
    else {
        focusReturnStack.push(null);
    }
}
/** Restores focus from the last `saveFocus`. Skips disconnected or unfocusable nodes. */
export function returnFocus() {
    if (typeof document === 'undefined') {
        return;
    }
    const el = focusReturnStack.pop();
    if (!el) {
        return;
    }
    if (typeof el.focus !== 'function' || !el.isConnected) {
        return;
    }
    try {
        el.focus({ preventScroll: true });
    }
    catch {
        /* embeds / shadow roots may reject programmatic focus */
    }
}
export function focusFirstElement(container) {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}
