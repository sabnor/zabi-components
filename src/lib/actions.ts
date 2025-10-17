// Svelte actions for reusable DOM manipulation
import type { Action } from 'svelte/action';

/**
 * Focus action - focuses an element when it becomes visible or when triggered
 */
export const focus: Action<HTMLElement, { shouldFocus?: boolean; delay?: number }> = (node, options) => {
    const { shouldFocus = false, delay = 0 } = options || {};

    function handleFocus() {
        if (shouldFocus) {
            if (delay > 0) {
                setTimeout(() => node.focus(), delay);
            } else {
                node.focus();
            }
        }
    }

    // Focus immediately if shouldFocus is true
    if (shouldFocus) {
        handleFocus();
    }

    return {
        update(newOptions) {
            const { shouldFocus: newShouldFocus = false, delay: newDelay = 0 } = newOptions || {};
            if (newShouldFocus) {
                if (newDelay > 0) {
                    setTimeout(() => node.focus(), newDelay);
                } else {
                    node.focus();
                }
            }
        }
    };
};

/**
 * Click outside action - triggers callback when clicking outside the element
 */
export const clickOutside: Action<HTMLElement, (event: MouseEvent) => void> = (node, callback) => {
    function handleClick(event: MouseEvent) {
        if (!node.contains(event.target as Node)) {
            callback(event);
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
};

/**
 * Escape key action - triggers callback when escape key is pressed
 */
export const escapeKey: Action<HTMLElement, (event: KeyboardEvent) => void> = (node, callback) => {
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            callback(event);
        }
    }

    node.addEventListener('keydown', handleKeydown);

    return {
        destroy() {
            node.removeEventListener('keydown', handleKeydown);
        }
    };
};

/**
 * Resize observer action - triggers callback when element size changes
 */
export const resizeObserver: Action<HTMLElement, (entries: ResizeObserverEntry[]) => void> = (node, callback) => {
    const observer = new ResizeObserver(callback);
    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
};

/**
 * Intersection observer action - triggers callback when element enters/exits viewport
 */
export const intersectionObserver: Action<HTMLElement, {
    callback: (entries: IntersectionObserverEntry[]) => void;
    options?: IntersectionObserverInit;
}> = (node, { callback, options = {} }) => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
};

/**
 * Auto-resize textarea action - automatically resizes textarea based on content
 */
export const autoResize: Action<HTMLTextAreaElement> = (node) => {
    function resize() {
        node.style.height = 'auto';
        node.style.height = `${node.scrollHeight}px`;
    }

    // Initial resize
    resize();

    // Resize on input
    node.addEventListener('input', resize);

    return {
        destroy() {
            node.removeEventListener('input', resize);
        }
    };
};

/**
 * Lazy load action - loads content when element comes into view
 */
export const lazyLoad: Action<HTMLElement, {
    src: string;
    onLoad?: () => void;
    onError?: () => void;
}> = (node, { src, onLoad, onError }) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (node instanceof HTMLImageElement) {
                    node.src = src;
                    node.onload = onLoad || null;
                    node.onerror = onError || null;
                }
                observer.unobserve(node);
            }
        });
    });

    observer.observe(node);

    return {
        update(newOptions) {
            if (newOptions?.src && node instanceof HTMLImageElement) {
                node.src = newOptions.src;
            }
        },
        destroy() {
            observer.disconnect();
        }
    };
};

