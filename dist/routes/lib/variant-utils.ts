/**
 * Variant class helpers — semantic design tokens only (see src/app.css).
 */

import type { SemanticVariant } from '../../types/variants.js';

export type Variant = SemanticVariant;

/**
 * Border + focus ring classes for text inputs (Input, Textarea).
 */
export function getInputVariantClasses(variant: Variant): string {
    const variantMap: Record<Variant, string> = {
        default:
            'focus-ring border-input-border focus-visible:border-input-border',
        success:
            'focus-ring border-success focus-visible:border-success',
        warning:
            'focus-ring border-warning focus-visible:border-warning',
        error: 'focus-ring border-error focus-visible:border-error',
        info: 'focus-ring border-info focus-visible:border-info',
    };

    return variantMap[variant] || variantMap.default;
}

/**
 * Card surfaces — border + background using semantic tokens.
 */
export function getCardVariantClasses(variant: Variant): string {
    const variantMap: Record<Variant, string> = {
        default: 'border-border bg-card',
        success: 'border-success bg-card',
        warning: 'border-warning bg-card',
        error: 'border-error bg-card',
        info: 'border-info bg-card',
    };

    return variantMap[variant] || variantMap.default;
}

/**
 * Generic variant classes for borders, text, or backgrounds.
 */
export function getVariantClasses(
    variant: Variant,
    type: 'border' | 'text' | 'bg',
): string {
    const variantMap: Record<
        Variant,
        Record<'border' | 'text' | 'bg', string>
    > = {
        default: {
            border: 'border-border',
            text: 'text-body',
            bg: 'bg-card',
        },
        success: {
            border: 'border-success',
            text: 'text-success',
            bg: 'bg-card',
        },
        warning: {
            border: 'border-warning',
            text: 'text-warning',
            bg: 'bg-card',
        },
        error: {
            border: 'border-error',
            text: 'text-error',
            bg: 'bg-card',
        },
        info: {
            border: 'border-info',
            text: 'text-info',
            bg: 'bg-card',
        },
    };

    return variantMap[variant]?.[type] || variantMap.default[type];
}

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
    prefix: string,
): Record<T, string> {
    return variants.reduce(
        (acc, variant) => {
            acc[variant] = `${prefix}-${variant}`;
            return acc;
        },
        {} as Record<T, string>,
    );
}
