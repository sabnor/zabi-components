/**
 * What Modal, SlideUp and Drawer share beyond `focus-utils.ts`: the scroll
 * lock on `<body>` and the Tab cycle inside the panel. One copy, so the
 * overlays cannot drift apart and keep working when nested in any order.
 */

import { cycleTrappedFocus, DIALOG_SELECTOR, getFocusableElements } from "./focus-utils.js";
import { readKeyboardInset } from "./keyboard-inset.js";

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
 * container is left to that dialog. The toasts on screen are in the cycle too,
 * after the container's own controls: see `getToastFocusables`.
 */
export function trapTabKey(container: HTMLElement | undefined, event: KeyboardEvent): void {
    if (event.key !== "Tab" || !container) return;
    // A nested dialog handles its own Tab cycle.
    const owner = (event.target as Element | null)?.closest?.(DIALOG_SELECTOR);
    if (owner && owner !== container) return;
    cycleTrappedFocus(container, event);
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

/**
 * Keeps an overlay on the part of the screen the on-screen keyboard leaves.
 *
 * Where the keyboard covers the page instead of shrinking it (iOS Safari,
 * Chrome on Android), a panel at the bottom of a `fixed inset-0` root ends up
 * behind it, footer and all. This moves the root's bottom edge up to the top
 * of the keyboard (and its top edge down, if the browser has panned the
 * screen), so everything laid out against the root follows: a sheet's height,
 * a pinned footer, a drawer's end. `data-keyboard-open` is set on the root
 * meanwhile. The field that has focus is scrolled back into view once the
 * root has its new size. Where the page shrinks by itself, nothing is done.
 *
 * The root is usually the backdrop as well: while it is moved, its dimming is
 * carried on past its edges, so the page does not show undimmed where the
 * keyboard was while that slides away.
 *
 * `root` is the overlay's outermost, fixed element. Call it when the overlay
 * opens, in the browser; the returned function stops it and puts the root back.
 */
export function followKeyboard(root: HTMLElement): () => void {
    if (typeof window === "undefined") return () => {};
    const viewport = window.visualViewport;
    const restore = () => {
        root.style.bottom = "";
        root.style.top = "";
        root.style.boxShadow = "";
        delete root.dataset.keyboardOpen;
    };
    let last = "";
    const update = () => {
        const inset = readKeyboardInset();
        // How far the browser has panned the screen to show the field. It
        // counts when the pan is complete as well: nothing of the page is
        // under the keyboard then (the inset is 0), and the top of the root
        // is as far above the screen as the keyboard is tall.
        const shorter =
            !!viewport &&
            Math.abs(viewport.scale - 1) <= 0.01 &&
            document.documentElement.clientHeight - viewport.height > 1;
        const panned = shorter ? Math.max(0, Math.round(viewport.offsetTop)) : 0;
        const key = `${inset}:${panned}`;
        if (key === last) return;
        last = key;
        if (inset > 0 || panned > 0) {
            root.style.bottom = inset > 0 ? `${inset}px` : "";
            root.style.top = panned > 0 ? `${panned}px` : "";
            root.dataset.keyboardOpen = "true";
            // The root is the backdrop too. What it no longer covers is under
            // the keyboard, but shows for a moment while the keyboard slides
            // away: the dimming goes on past the root's edges.
            const dim = getComputedStyle(root).backgroundColor;
            root.style.boxShadow =
                dim && dim !== "transparent" && dim !== "rgba(0, 0, 0, 0)"
                    ? `0 0 0 100vmax ${dim}`
                    : "";
        } else {
            restore();
        }
        notifyOverlayFooters();
        const active = document.activeElement;
        if (inset > 0 && active instanceof HTMLElement && root.contains(active)) {
            active.scrollIntoView?.({ block: "nearest" });
        }
    };
    update();
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
        viewport?.removeEventListener("resize", update);
        viewport?.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
        restore();
    };
}

/**
 * The parts of the open overlays that must stay in reach while something is
 * drawn over them: the header, with its close button, and a footer pinned to
 * the bottom. One entry per overlay that has said so, oldest first.
 */
interface OverlayParts {
    panel: Element | null;
    header?: HTMLElement;
    footer?: HTMLElement;
}
const overlayParts: OverlayParts[] = [];
const footerListeners = new Set<() => void>();

function notifyOverlayFooters(): void {
    for (const listener of footerListeners) listener();
}

function registerOverlayPart(part: "header" | "footer", element: HTMLElement): () => void {
    const panel = element.closest<HTMLElement>(DIALOG_SELECTOR);
    let entry = panel ? overlayParts.find((candidate) => candidate.panel === panel) : undefined;
    if (!entry) {
        entry = { panel };
        overlayParts.push(entry);
    }
    const mine = entry;
    mine[part] = element;
    const observer =
        typeof ResizeObserver === "function" ? new ResizeObserver(notifyOverlayFooters) : undefined;
    observer?.observe(element);
    notifyOverlayFooters();
    // An overlay that slides in is still on its way when its parts are
    // rendered, and a move is not a change of size: say so again once the
    // panel has come to rest.
    let frame = 0;
    const settle = () => {
        frame = 0;
        if (typeof panel?.getAnimations === "function" && panel.getAnimations().length > 0) {
            frame = requestAnimationFrame(settle);
            return;
        }
        notifyOverlayFooters();
    };
    if (panel && typeof requestAnimationFrame === "function") frame = requestAnimationFrame(settle);
    return () => {
        if (frame) cancelAnimationFrame(frame);
        observer?.disconnect();
        if (mine[part] === element) delete mine[part];
        if (!mine.header && !mine.footer) {
            const index = overlayParts.indexOf(mine);
            if (index !== -1) overlayParts.splice(index, 1);
        }
        notifyOverlayFooters();
    };
}

/**
 * Says that `footer` is pinned to the bottom of an open overlay, so what is
 * drawn over the overlays (the toast stack) can stay off it. Call it when the
 * footer is rendered, in the browser; the returned function withdraws it.
 */
export function registerOverlayFooter(footer: HTMLElement): () => void {
    return registerOverlayPart("footer", footer);
}

/**
 * Says that `header` is the top of an open overlay and holds its close
 * button, so the toast stack starts below it and never lies over the one
 * control that always closes the overlay. Call it when the header is
 * rendered, in the browser; the returned function withdraws it.
 */
export function registerOverlayHeader(header: HTMLElement): () => void {
    return registerOverlayPart("header", header);
}

/** The parts of the overlay opened last that has registered any. */
function topOverlayParts(): OverlayParts | undefined {
    for (let index = overlayParts.length - 1; index >= 0; index -= 1) {
        const entry = overlayParts[index];
        if (entry.header?.isConnected || entry.footer?.isConnected) return entry;
    }
    return undefined;
}

/** The footer of the overlay on top, if it has one. */
export function topOverlayFooter(): HTMLElement | null {
    const footer = topOverlayParts()?.footer;
    return footer?.isConnected ? footer : null;
}

/** The header of the overlay on top, if it has one. */
export function topOverlayHeader(): HTMLElement | null {
    const header = topOverlayParts()?.header;
    return header?.isConnected ? header : null;
}

/** Calls `listener` whenever a registered header or footer appears, goes, moves or changes size. */
export function watchOverlayFooters(listener: () => void): () => void {
    footerListeners.add(listener);
    return () => {
        footerListeners.delete(listener);
    };
}
