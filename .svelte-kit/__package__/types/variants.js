/**
 * Centralized variant type definitions for zabi-components
 *
 * This file provides consistent variant naming conventions across all components.
 * Variants are categorized into semantic color variants and style variants.
 */
/**
 * Helper type to check if a variant is a semantic variant
 */
export function isSemanticVariant(variant) {
    return ['default', 'success', 'warning', 'error', 'info'].includes(variant);
}
/**
 * Helper type to check if a variant is an extended semantic variant
 */
export function isExtendedSemanticVariant(variant) {
    return ['default', 'success', 'warning', 'error', 'info', 'neutral', 'energetic'].includes(variant);
}
/**
 * Variant naming conventions:
 *
 * 1. Semantic Color Variants (for state indication):
 *    - default: Standard/default appearance
 *    - success: Positive/successful state (green)
 *    - warning: Cautionary state (yellow/amber)
 *    - error: Error/dangerous state (red)
 *    - info: Informational state (blue)
 *    - neutral: Neutral state (gray)
 *    - energetic: Energetic/vibrant state (yellow/orange)
 *
 * 2. Style Variants (for visual appearance):
 *    - Button: primary, secondary, danger, ghost, outline, link
 *    - Card: default, elevated, outlined, flat
 *
 * 3. Size Variants (consistent across components):
 *    - sm: Small size
 *    - md: Medium size (default)
 *    - lg: Large size
 *
 * Usage Guidelines:
 * - Use semantic variants when the variant indicates a state or meaning
 * - Use style variants when the variant changes visual appearance only
 * - Always use SizeVariant for size props
 */
