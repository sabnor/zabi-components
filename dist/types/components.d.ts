import type { Component } from 'svelte';
export type ZabiComponent<T extends Record<string, any> = Record<string, any>, E extends Record<string, any> = Record<string, any>> = Component<T, E>;
export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'ghost' | 'link' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    text?: string;
    iconLeft?: string | any;
    iconRight?: string | any;
    ariaLabel?: string;
    ariaDescribedBy?: string;
    ariaExpanded?: boolean;
    ariaControls?: string;
    ariaPressed?: boolean;
}
export interface ButtonEvents {
    click: {
        value: boolean;
        event: MouseEvent;
    };
}
export interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}
export interface CardProps {
    variant?: 'default' | 'elevated' | 'outlined' | 'flat';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    className?: string;
    onclick?: (event: MouseEvent) => void | Promise<void>;
    /** Required when card is interactive (has onclick) for accessibility */
    ariaLabel?: string;
}
export interface InputProps {
    type?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}
export interface InputEvents {
    input: {
        value: string;
        event: Event;
    };
    change: {
        value: string;
        event: Event;
    };
    focus: {
        event: FocusEvent;
    };
    blur: {
        event: FocusEvent;
    };
}
export interface CheckboxProps {
    checked?: boolean;
    disabled?: boolean;
    className?: string;
}
export interface CheckboxEvents {
    change: {
        checked: boolean;
        event: Event;
    };
}
export interface SelectProps {
    options: Array<{
        value: string;
        label: string;
    }>;
    value?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    maxMenuHeight?: string;
    menuWidth?: string;
    noResultsText?: string;
    disabled?: boolean;
    className?: string;
}
export interface SelectEvents {
    change: {
        value: string;
        event: Event;
    };
}
export interface TextareaProps {
    value?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    className?: string;
}
export interface TextareaEvents {
    input: {
        value: string;
        event: Event;
    };
    change: {
        value: string;
        event: Event;
    };
}
export interface ModalProps {
    open?: boolean;
    title?: string;
    className?: string;
}
export interface ModalEvents {
}
export interface AlertProps {
    type?: 'success' | 'error' | 'warning' | 'info';
    message: string;
    className?: string;
}
export interface BadgeProps {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    text?: string;
    className?: string;
}
export interface ProgressProps {
    value?: number;
    max?: number;
    className?: string;
}
export interface SkeletonProps {
    variant?: 'text' | 'circle' | 'block';
    width?: string | number;
    height?: string | number;
    class?: string;
    'aria-label'?: string;
}
export interface ToggleProps {
    checked?: boolean;
    disabled?: boolean;
    className?: string;
}
export interface ToggleEvents {
    change: {
        checked: boolean;
        event: Event;
    };
}
export interface TooltipProps {
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}
export interface FieldConfig {
    key: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'toggle' | 'url' | 'colorpicker' | 'textalignment';
    required?: boolean;
    placeholder?: string;
    options?: Array<{
        value: string;
        label: string;
    }>;
    flex?: string;
    rows?: number;
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
}
export type Button = ZabiComponent<ButtonProps, ButtonEvents>;
export type Heading = ZabiComponent<HeadingProps>;
export type Card = ZabiComponent<CardProps>;
export type Input = ZabiComponent<InputProps, InputEvents>;
export type Checkbox = ZabiComponent<CheckboxProps, CheckboxEvents>;
export type Select = ZabiComponent<SelectProps, SelectEvents>;
export type Textarea = ZabiComponent<TextareaProps, TextareaEvents>;
export type Modal = ZabiComponent<ModalProps, ModalEvents>;
export type Alert = ZabiComponent<AlertProps>;
export type Badge = ZabiComponent<BadgeProps>;
export type Progress = ZabiComponent<ProgressProps>;
export type Skeleton = ZabiComponent<SkeletonProps>;
export type Toggle = ZabiComponent<ToggleProps, ToggleEvents>;
export type Tooltip = ZabiComponent<TooltipProps>;
//# sourceMappingURL=components.d.ts.map