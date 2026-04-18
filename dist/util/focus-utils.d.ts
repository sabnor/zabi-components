/** Focus helpers for overlays (modals, sheets). Requires `app.css` focus ring classes. */
/** From `app.css` `@layer components` — import the library/app stylesheet. */
export declare const FOCUS_BRAND_CLASS = "focus-brand";
export declare const FOCUS_NAV_CLASS = "focus-nav";
export declare function getFocusableElements(container: HTMLElement): HTMLElement[];
/** Tab wraps first↔last inside `container`. Caller should pair with `saveFocus` / `returnFocus`. */
export declare function trapFocus(container: HTMLElement): () => void;
export declare function saveFocus(): void;
/** Restores focus from the last `saveFocus`. Skips disconnected or unfocusable nodes. */
export declare function returnFocus(): void;
export declare function focusFirstElement(container: HTMLElement): void;
