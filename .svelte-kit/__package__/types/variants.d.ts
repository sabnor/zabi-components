/**
 * Centralized variant type definitions for zabi-components
 *
 * This file provides consistent variant naming conventions across all components.
 * Variants are categorized into semantic color variants and style variants.
 */
/**
 * Semantic color variants - used for state indication
 * These variants use semantic colors (success, warning, error, info) to indicate meaning
 */
export type SemanticVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
/**
 * Extended semantic variants - includes additional semantic colors
 * Used by components that support more semantic states
 */
export type ExtendedSemanticVariant = SemanticVariant | 'neutral' | 'energetic';
/**
 * Button style variants - used for different button styles
 * These are style-based variants, not semantic color variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'link';
/**
 * Card style variants - used for different card appearances
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';
/**
 * Component size variants - consistent across all components
 */
export type SizeVariant = 'sm' | 'md' | 'lg';
/**
 * Helper type to check if a variant is a semantic variant
 */
export declare function isSemanticVariant(variant: string): variant is SemanticVariant;
/**
 * Helper type to check if a variant is an extended semantic variant
 */
export declare function isExtendedSemanticVariant(variant: string): variant is ExtendedSemanticVariant;
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
