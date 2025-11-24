/**
 * Focus management utilities for accessibility
 */

/**
 * Get all focusable elements within a container
 */
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
            // Filter out elements that are not visible
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden';
        }
    );
}

/**
 * Trap focus within a container element
 */
export function trapFocus(container: HTMLElement): () => void {
    const focusableElements = getFocusableElements(container);
    
    if (focusableElements.length === 0) {
        return () => {}; // No-op cleanup
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
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
            // Shift + Tab
            if (currentFocus === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (currentFocus === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    container.addEventListener('keydown', handleKeydown);

    // Return cleanup function
    return () => {
        container.removeEventListener('keydown', handleKeydown);
    };
}

/**
 * Store the element that had focus before opening a modal/dialog
 */
let previousFocus: HTMLElement | null = null;

/**
 * Save the currently focused element
 */
export function saveFocus(): void {
    if (typeof document !== 'undefined') {
        previousFocus = document.activeElement as HTMLElement;
    }
}

/**
 * Return focus to the previously focused element
 */
export function returnFocus(): void {
    if (previousFocus && typeof document !== 'undefined') {
        previousFocus.focus();
        previousFocus = null;
    }
}

/**
 * Focus the first focusable element in a container
 */
export function focusFirstElement(container: HTMLElement): void {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

