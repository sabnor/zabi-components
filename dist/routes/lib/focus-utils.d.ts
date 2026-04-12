/**
 * Focus management utilities for accessibility
 */
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
