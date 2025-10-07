import type { Action } from 'svelte/action';
/**
 * Focus action - focuses an element when it becomes visible or when triggered
 */
export declare const focus: Action<HTMLElement, {
    shouldFocus?: boolean;
    delay?: number;
}>;
/**
 * Click outside action - triggers callback when clicking outside the element
 */
export declare const clickOutside: Action<HTMLElement, (event: MouseEvent) => void>;
/**
 * Escape key action - triggers callback when escape key is pressed
 */
export declare const escapeKey: Action<HTMLElement, (event: KeyboardEvent) => void>;
/**
 * Resize observer action - triggers callback when element size changes
 */
export declare const resizeObserver: Action<HTMLElement, (entries: ResizeObserverEntry[]) => void>;
/**
 * Intersection observer action - triggers callback when element enters/exits viewport
 */
export declare const intersectionObserver: Action<HTMLElement, {
    callback: (entries: IntersectionObserverEntry[]) => void;
    options?: IntersectionObserverInit;
}>;
/**
 * Auto-resize textarea action - automatically resizes textarea based on content
 */
export declare const autoResize: Action<HTMLTextAreaElement>;
/**
 * Lazy load action - loads content when element comes into view
 */
export declare const lazyLoad: Action<HTMLElement, {
    src: string;
    onLoad?: () => void;
    onError?: () => void;
}>;
//# sourceMappingURL=actions.d.ts.map