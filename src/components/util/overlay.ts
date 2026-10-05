/**
 * What Modal, SlideUp and Drawer share beyond `focus-utils.ts`: the scroll
 * lock on `<body>` and the Tab cycle inside the panel. One copy, so the
 * overlays cannot drift apart and keep working when nested in any order.
 */

import { DIALOG_SELECTOR, getFocusableElements } from "./focus-utils.js";

/**
 * Stops the page behind an overlay from scrolling. Ref-counted on `<body>`
 * (`data-zabi-scroll-lock`), so nested overlays share one lock and the page
 * scrolls again only when the last one has released it.
 *
 * Call it when the overlay opens, in the browser, and call the returned
 * function when it closes.
 */
export function lockBodyScroll(): () => void {
    const body = document.body;
    const count = Number(body.dataset.zabiScrollLock ?? "0");
    if (count === 0) {
        body.dataset.zabiScrollLockOverflow = body.style.overflow;
        body.style.overflow = "hidden";
    }
    body.dataset.zabiScrollLock = String(count + 1);
    return () => {
        const next = Number(body.dataset.zabiScrollLock ?? "1") - 1;
        if (next <= 0) {
            body.style.overflow = body.dataset.zabiScrollLockOverflow ?? "";
            delete body.dataset.zabiScrollLock;
            delete body.dataset.zabiScrollLockOverflow;
        } else {
            body.dataset.zabiScrollLock = String(next);
        }
    };
}

/**
 * Keeps Tab inside `container`: call it from the panel's `keydown` handler.
 * Focusables are re-queried on every Tab, so content added while the overlay
 * is open stays inside the cycle. A Tab that comes from a dialog nested in the
 * container is left to that dialog.
 */
export function trapTabKey(container: HTMLElement | undefined, event: KeyboardEvent): void {
    if (event.key !== "Tab" || !container) return;
    // A nested dialog handles its own Tab cycle.
    const owner = (event.target as Element | null)?.closest?.(DIALOG_SELECTOR);
    if (owner && owner !== container) return;

    const focusable = getFocusableElements(container);
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
    } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
    }
}

/**
 * Watches a scrolling box in an overlay and reports whether it has to be a
 * Tab stop itself: true when its content is taller than it and holds nothing
 * that can take focus, so the keyboard would otherwise have no way to scroll
 * it. The answer changes with the viewport and with the content, so it is
 * reported again whenever either does.
 *
 * Call it when the overlay opens, in the browser; the returned function stops it.
 */
export function watchScrollerNeedsFocus(
    box: HTMLElement,
    onChange: (needsFocus: boolean) => void,
): () => void {
    const measure = () => {
        onChange(box.scrollHeight > box.clientHeight && getFocusableElements(box).length === 0);
    };
    measure();
    const resize = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : undefined;
    resize?.observe(box);
    const mutation = new MutationObserver(measure);
    mutation.observe(box, { childList: true, subtree: true, characterData: true });
    return () => {
        resize?.disconnect();
        mutation.disconnect();
    };
}
