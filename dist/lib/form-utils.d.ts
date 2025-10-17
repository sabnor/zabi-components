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
export declare function createInputState(config: InputConfig): InputState;
/**
 * Updates input state based on new value
 */
export declare function updateInputState(state: InputState, value: string): InputState;
/**
 * Updates input state based on focus
 */
export declare function updateFocusState(state: InputState, isFocused: boolean): InputState;
/**
 * Updates input state based on validation
 */
export declare function updateValidationState(state: InputState, error?: string, success?: string, variant?: 'default' | 'error' | 'success'): InputState;
/**
 * Generates unique ID for form elements
 */
export declare function generateInputId(providedId?: string): string;
/**
 * Creates input event detail
 */
export declare function createInputEventDetail(value: string, event: Event, field?: string): InputEventDetail;
/**
 * Creates change event detail
 */
export declare function createChangeEventDetail(value: any, event: Event, field?: string, checked?: boolean): ChangeEventDetail;
/**
 * Size classes for form elements
 */
export declare const formSizeClasses: {
    readonly sm: {
        readonly input: "px-3 py-1.5 text-sm";
        readonly label: "text-xs";
        readonly helper: "text-xs";
    };
    readonly md: {
        readonly input: "px-4 py-2.5 text-sm";
        readonly label: "text-sm";
        readonly helper: "text-xs";
    };
    readonly lg: {
        readonly input: "px-5 py-3 text-base";
        readonly label: "text-base";
        readonly helper: "text-sm";
    };
};
/**
 * Base input classes
 */
export declare const baseInputClasses: string;
/**
 * State-specific input classes
 */
export declare function getStateClasses(hasError: boolean, hasSuccess: boolean): string;
/**
 * Disabled state classes
 */
export declare function getDisabledClasses(disabled: boolean): string;
/**
 * Label classes
 */
export declare function getLabelClasses(hasError: boolean, hasSuccess: boolean, size: keyof typeof formSizeClasses): string;
/**
 * Helper text classes
 */
export declare function getHelperTextClasses(hasError: boolean, hasSuccess: boolean, size: keyof typeof formSizeClasses): string;
//# sourceMappingURL=form-utils.d.ts.map