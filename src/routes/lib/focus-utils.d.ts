/**
 * Focus management utilities for accessibility
 */
/**
 * Global CSS classes from `app.css` (`@layer components`) for keyboard focus rings.
 * Import the app / `zabi-components` stylesheet so these classes exist.
 */
export declare const FOCUS_BRAND_CLASS = "focus-brand";
export declare const FOCUS_NAV_CLASS = "focus-nav";
/**
 * Get all focusable elements within a container
 */
export declare function getFocusableElements(container: HTMLElement): HTMLElement[];
/**
 * Trap focus within a container element
 */
export declare function trapFocus(container: HTMLElement): () => void;
/**
 * Save the currently focused element
 */
export declare function saveFocus(): void;
/**
 * Return focus to the previously focused element
 */
export declare function returnFocus(): void;
/**
 * Focus the first focusable element in a container
 */
export declare function focusFirstElement(container: HTMLElement): void;
