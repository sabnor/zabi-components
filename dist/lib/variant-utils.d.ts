/**
 * Utility functions for handling component variants with semantic colors
 */
export type Variant = 'default' | 'success' | 'warning' | 'error' | 'info';
/**
 * Get variant classes for input components (Input, Textarea)
 */
export declare function getInputVariantClasses(variant: Variant): string;
/**
 * Get variant classes for card components
 */
export declare function getCardVariantClasses(variant: Variant): string;
/**
 * Get generic variant classes for any component
 */
export declare function getVariantClasses(variant: Variant, type: 'border' | 'text' | 'bg'): string;
/**
 * Get all variant classes for a component (border, text, background)
 */
export declare function getAllVariantClasses(variant: Variant): {
    border: string;
    text: string;
    bg: string;
};
/**
 * Create a variant class map for use in reactive statements
 */
export declare function createVariantClassMap<T extends string>(variants: T[], prefix: string): Record<T, string>;
//# sourceMappingURL=variant-utils.d.ts.map