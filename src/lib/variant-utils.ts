/**
 * Utility functions for handling component variants with semantic colors
 */

export type Variant = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * Get variant classes for input components (Input, Textarea)
 */
export function getInputVariantClasses(variant: Variant): string {
    const variantMap: Record<Variant, string> = {
        default: 'input-variant-default',
        success: 'input-variant-success',
        warning: 'input-variant-warning',
        error: 'input-variant-error',
        info: 'input-variant-info',
    };

    return variantMap[variant] || variantMap.default;
}

/**
 * Get variant classes for card components
 */
export function getCardVariantClasses(variant: Variant): string {
    const variantMap: Record<Variant, string> = {
        default: 'card-variant-default',
        success: 'card-variant-success',
        warning: 'card-variant-warning',
        error: 'card-variant-error',
        info: 'card-variant-info',
    };

    return variantMap[variant] || variantMap.default;
}

/**
 * Get generic variant classes for any component
 */
export function getVariantClasses(variant: Variant, type: 'border' | 'text' | 'bg'): string {
    const variantMap: Record<Variant, string> = {
        default: `variant-${type}-default`,
        success: `variant-${type}-success`,
        warning: `variant-${type}-warning`,
        error: `variant-${type}-error`,
        info: `variant-${type}-info`,
    };

    return variantMap[variant] || variantMap.default;
}

/**
 * Get all variant classes for a component (border, text, background)
 */
export function getAllVariantClasses(variant: Variant): {
    border: string;
    text: string;
    bg: string;
} {
    return {
        border: getVariantClasses(variant, 'border'),
        text: getVariantClasses(variant, 'text'),
        bg: getVariantClasses(variant, 'bg'),
    };
}

/**
 * Create a variant class map for use in reactive statements
 */
export function createVariantClassMap<T extends string>(
    variants: T[],
    prefix: string
): Record<T, string> {
    return variants.reduce((acc, variant) => {
        acc[variant] = `${prefix}-${variant}`;
        return acc;
    }, {} as Record<T, string>);
}
