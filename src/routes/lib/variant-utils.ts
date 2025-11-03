/**
 * Utility functions for handling component variants with semantic colors
 */

export type Variant = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * Get variant classes for input components (Input, Textarea)
 */
export function getInputVariantClasses(variant: Variant): string {
    const variantMap: Record<Variant, string> = {
        default: 'border-gray-300 focus:border-brand-500 focus:ring-brand-500',
        success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
        warning: 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500',
        error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
        info: 'border-iris-300 focus:border-iris-500 focus:ring-iris-500',
    };

    return variantMap[variant] || variantMap.default;
}

/**
 * Get variant classes for card components
 */
export function getCardVariantClasses(variant: Variant): string {
    const variantMap: Record<Variant, string> = {
        default: 'border-gray-200 bg-white',
        success: 'border-green-200 bg-green-50',
        warning: 'border-yellow-200 bg-yellow-50',
        error: 'border-red-200 bg-red-50',
        info: 'border-iris-200 bg-iris-50',
    };

    return variantMap[variant] || variantMap.default;
}

/**
 * Get generic variant classes for any component
 */
export function getVariantClasses(variant: Variant, type: 'border' | 'text' | 'bg'): string {
    const variantMap: Record<Variant, Record<'border' | 'text' | 'bg', string>> = {
        default: {
            border: 'border-gray-300',
            text: 'text-gray-900',
            bg: 'bg-white'
        },
        success: {
            border: 'border-green-300',
            text: 'text-green-900',
            bg: 'bg-green-50'
        },
        warning: {
            border: 'border-yellow-300',
            text: 'text-yellow-900',
            bg: 'bg-yellow-50'
        },
        error: {
            border: 'border-red-300',
            text: 'text-red-900',
            bg: 'bg-red-50'
        },
        info: {
            border: 'border-iris-300',
            text: 'text-iris-900',
            bg: 'bg-iris-50'
        },
    };

    return variantMap[variant]?.[type] || variantMap.default[type];
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
