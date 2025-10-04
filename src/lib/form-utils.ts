// Form utilities for common input patterns
import type { InputEventDetail, ChangeEventDetail } from '../types/events';

export interface InputState {
    value: string;
    hasValue: boolean;
    isFocused: boolean;
    hasError: boolean;
    hasSuccess: boolean;
}

export interface InputConfig {
    value: string;
    error?: string;
    success?: string;
    variant?: 'default' | 'error' | 'success';
}

/**
 * Creates input state management
 */
export function createInputState(config: InputConfig): InputState {
    return {
        value: config.value,
        hasValue: Boolean(config.value && config.value.trim()),
        isFocused: false,
        hasError: Boolean(config.error) || config.variant === 'error',
        hasSuccess: Boolean(config.success) || config.variant === 'success',
    };
}

/**
 * Updates input state based on new value
 */
export function updateInputState(state: InputState, value: string): InputState {
    return {
        ...state,
        value,
        hasValue: Boolean(value && value.trim()),
    };
}

/**
 * Updates input state based on focus
 */
export function updateFocusState(state: InputState, isFocused: boolean): InputState {
    return {
        ...state,
        isFocused,
    };
}

/**
 * Updates input state based on validation
 */
export function updateValidationState(
    state: InputState,
    error?: string,
    success?: string,
    variant?: 'default' | 'error' | 'success'
): InputState {
    return {
        ...state,
        hasError: Boolean(error) || variant === 'error',
        hasSuccess: Boolean(success) || variant === 'success',
    };
}

/**
 * Generates unique ID for form elements
 */
export function generateInputId(providedId?: string): string {
    return providedId || `input-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Creates input event detail
 */
export function createInputEventDetail(
    value: string,
    event: Event,
    field?: string
): InputEventDetail {
    return { value, event, field };
}

/**
 * Creates change event detail
 */
export function createChangeEventDetail(
    value: any,
    event: Event,
    field?: string,
    checked?: boolean
): ChangeEventDetail {
    return { value, event, field, checked };
}

/**
 * Size classes for form elements
 */
export const formSizeClasses = {
    sm: {
        input: "px-3 py-1.5 text-sm",
        label: "text-xs",
        helper: "text-xs",
    },
    md: {
        input: "px-4 py-2.5 text-sm",
        label: "text-sm",
        helper: "text-xs",
    },
    lg: {
        input: "px-5 py-3 text-base",
        label: "text-base",
        helper: "text-sm",
    },
} as const;

/**
 * Base input classes
 */
export const baseInputClasses = [
    "w-full",
    "min-w-0",
    "rounded-md",
    "transition-all",
    "duration-200",
    "ease-in-out",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-focus-ring",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "read-only:cursor-default",
    "read-only:opacity-75",
].join(" ");

/**
 * State-specific input classes
 */
export function getStateClasses(hasError: boolean, hasSuccess: boolean): string {
    if (hasError) {
        return "border-error text-text placeholder-text-placeholder focus:ring-error focus:border-error";
    }
    if (hasSuccess) {
        return "border-success text-text placeholder-text-placeholder focus:ring-success focus:border-success";
    }
    return "border-border text-text placeholder-text-placeholder focus:ring-focus-ring focus:border-border-focus";
}

/**
 * Disabled state classes
 */
export function getDisabledClasses(disabled: boolean): string {
    return disabled
        ? "bg-surface-disabled text-text-disabled border-border-disabled cursor-not-allowed"
        : "";
}

/**
 * Label classes
 */
export function getLabelClasses(hasError: boolean, hasSuccess: boolean, size: keyof typeof formSizeClasses): string {
    return [
        "block",
        formSizeClasses[size].label,
        "font-medium",
        "mb-2",
        "transition-colors",
        "duration-200",
        hasError ? "text-error" : hasSuccess ? "text-success" : "text-text",
    ].join(" ");
}

/**
 * Helper text classes
 */
export function getHelperTextClasses(hasError: boolean, hasSuccess: boolean, size: keyof typeof formSizeClasses): string {
    return [
        "mt-2",
        formSizeClasses[size].helper,
        hasError ? "text-error" : hasSuccess ? "text-success" : "text-text-secondary",
    ].join(" ");
}

