/** Focus helpers for overlays (modals, sheets). Requires `app.css` focus ring classes. */

/** From `app.css` `@layer components` — import the library/app stylesheet. */
export const FOCUS_BRAND_CLASS = "focus-brand";
export const FOCUS_NAV_CLASS = "focus-nav";

/** Every dialog panel: `dialog` and `alertdialog` are both dialogs to a focus trap. */
export const DIALOG_SELECTOR = '[role="dialog"], [role="alertdialog"]';

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = [
        'button:not([disabled])',
        '[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden';
        }
    );
}

/** The region a `Toaster` renders its toasts in. */
export const TOAST_REGION_SELECTOR = "[data-zabi-toaster]";

/**
 * Whether an event's target is in a toast. A toast is drawn over whatever is
 * open, and a press on it is for the toast (to hold it, read it, dismiss it):
 * a menu or a panel that closes on a press outside itself asks this first,
 * and leaves a press on a toast alone.
 */
export function isInsideToastRegion(target: unknown): boolean {
    if (typeof Node === "undefined" || !(target instanceof Node)) return false;
    // A press on text can report the text node.
    const element = target instanceof Element ? target : target.parentElement;
    return !!element?.closest(TOAST_REGION_SELECTOR);
}

/**
 * The controls of the toasts on screen. A toast is drawn over a modal
 * overlay and can cover its buttons, so a focus trap that kept the keyboard
 * out of it would leave no way to dismiss it: the trap takes these in, after
 * the overlay's own controls.
 */
export function getToastFocusables(): HTMLElement[] {
    if (typeof document === "undefined") return [];
    return Array.from(document.querySelectorAll<HTMLElement>(TOAST_REGION_SELECTOR)).flatMap(
        (region) => getFocusableElements(region),
    );
}

/**
 * One step of the Tab cycle of a modal overlay: through the controls of
 * `container`, then through the toasts on screen, and round again. Focusables
 * are looked up on every Tab, so what is added while the overlay is open is
 * in the cycle. Focus that is nowhere in it goes to the first control.
 */
export function cycleTrappedFocus(container: HTMLElement, event: KeyboardEvent): void {
    const focusable = [...getFocusableElements(container), ...getToastFocusables()];
    if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (!active || !focusable.includes(active)) {
        event.preventDefault();
        first.focus();
        return;
    }
    if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
        return;
    }
    if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
        return;
    }
    // Between the overlay and the toasts the browser's own order would walk
    // the page that lies between them in the document: step across by hand.
    const next = focusable[focusable.indexOf(active) + (event.shiftKey ? -1 : 1)];
    if (active.closest(TOAST_REGION_SELECTOR) !== next.closest(TOAST_REGION_SELECTOR)) {
        event.preventDefault();
        next.focus();
    }
}

/** Tab wraps first↔last inside `container`. Caller should pair with `saveFocus` / `returnFocus`. */
export function trapFocus(container: HTMLElement): () => void {
    const focusableElements = getFocusableElements(container);
    
    if (focusableElements.length === 0) {
        return () => {};
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    function handleKeydown(event: KeyboardEvent) {
        if (event.key !== 'Tab') {
            return;
        }

        const currentFocus = document.activeElement as HTMLElement;

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
        } else {
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

/**
 * One entry per overlay open; `returnFocus` pops LIFO (nested modals). The id
 * is kept beside the element: the element may be gone by the time the overlay
 * closes, replaced by another that carries the same id.
 */
const focusReturnStack: Array<{ element: HTMLElement; id: string } | null> = [];

export function saveFocus(): void {
    if (typeof document === 'undefined') {
        return;
    }
    const active = document.activeElement;
    if (active instanceof HTMLElement && active !== document.body) {
        focusReturnStack.push({ element: active, id: active.id });
    } else {
        focusReturnStack.push(null);
    }
}

/**
 * Restores focus from the last `saveFocus`. If that element has left the
 * document, the element that now has its id takes the focus instead (a
 * dropzone swapped for its Change button, say); with neither, nothing happens.
 */
export function returnFocus(): void {
    if (typeof document === 'undefined') {
        return;
    }
    const saved = focusReturnStack.pop();
    if (!saved) {
        return;
    }
    const el = saved.element.isConnected
        ? saved.element
        : saved.id
          ? document.getElementById(saved.id)
          : null;
    if (!el || typeof el.focus !== 'function') {
        return;
    }
    try {
        el.focus({ preventScroll: true });
    } catch {
        /* embeds / shadow roots may reject programmatic focus */
    }
}

/**
 * Moves focus into an overlay: to its first focusable element, or to the
 * container itself when it has none (give the container `tabindex="-1"`), so
 * focus never stays on the opener behind the backdrop.
 *
 * `preferred` is a CSS selector, looked up inside the container: the matching
 * control takes focus instead of the first one, if it can take focus.
 */
export function focusFirstElement(container: HTMLElement, preferred?: string): void {
    const focusableElements = getFocusableElements(container);
    const wanted = preferred
        ? focusableElements.find((element) => element.matches(preferred))
        : undefined;
    (wanted ?? focusableElements[0] ?? container).focus();
}

/** Open modal overlays, oldest first. The last one is the one on top. */
const overlayStack: Array<{ panel: HTMLElement; depth: number }> = [];

/**
 * Joins the stack of open modal overlays (Modal, SlideUp, a drawer).
 *
 * Every overlay shares one z-index, so without this the paint order is the
 * DOM order, and an overlay opened later but placed earlier in the document
 * opens behind the first. `depth` is 0 for the first overlay and one more than
 * the highest open one after that: put it on the overlay root as
 * `z-index: calc(var(--z-modal) + depth)`.
 *
 * `panel` is the element with the dialog role. Call this when the overlay
 * opens, in the browser, and `leave()` when it closes.
 */
export function joinOverlayStack(panel: HTMLElement): {
    depth: number;
    leave: () => void;
} {
    const depth = overlayStack.reduce((max, entry) => Math.max(max, entry.depth + 1), 0);
    const entry = { panel, depth };
    overlayStack.push(entry);
    return {
        depth,
        leave() {
            const index = overlayStack.indexOf(entry);
            if (index !== -1) overlayStack.splice(index, 1);
        },
    };
}

/**
 * Keeps a modal overlay in charge of the keyboard when focus has left it
 * without a Tab: the focused control was disabled or removed and the browser
 * dropped focus on `<body>`, where the overlay's own key handlers never hear
 * the key, and Tab would walk the page behind it.
 *
 * While installed, a Tab pressed with focus outside every dialog moves focus
 * to the first focusable element of `container` (or to `container` itself),
 * and Escape calls `onEscape`. Only the overlay on top of the stack acts (the
 * one opened last), so every open overlay can install its own. An overlay that
 * has not called `joinOverlayStack` is added to the stack for as long as the
 * recovery is installed.
 *
 * `container` is the panel with `role="dialog"` or `"alertdialog"` and
 * `aria-modal="true"`. Call it when the overlay opens, in the browser, and call
 * the returned function when it closes.
 */
export function recoverStrayFocus(
    container: HTMLElement,
    options: { onEscape?: (event: KeyboardEvent) => void } = {},
): () => void {
    const joined = overlayStack.some((entry) => entry.panel === container)
        ? null
        : joinOverlayStack(container);

    function handleKeydown(event: KeyboardEvent) {
        if (event.defaultPrevented) return;
        if (event.key !== 'Tab' && event.key !== 'Escape') return;
        // Inside a dialog, that dialog's own handlers deal with the key.
        if (document.activeElement?.closest(DIALOG_SELECTOR)) return;
        if (overlayStack[overlayStack.length - 1]?.panel !== container) return;

        // In a toast: part of the trap. Tab goes on through the toasts and
        // back into the overlay; Escape is the toast region's own business.
        if (document.activeElement?.closest(TOAST_REGION_SELECTOR)) {
            if (event.key === 'Tab') cycleTrappedFocus(container, event);
            return;
        }

        event.preventDefault();
        if (event.key === 'Escape') {
            options.onEscape?.(event);
            return;
        }
        (getFocusableElements(container)[0] ?? container).focus();
    }

    document.addEventListener('keydown', handleKeydown);
    return () => {
        document.removeEventListener('keydown', handleKeydown);
        joined?.leave();
    };
}
