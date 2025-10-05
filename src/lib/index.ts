// Main library entry point
// Re-export all components from their respective categories

// Import base styles for theming
import '../styles/base.css';

// Atomic Components
export * from '../components/atoms/index';

// Molecular Components  
export * from '../components/molecules/index';

// Organism Components
export * from '../components/organisms/index';

// Re-export types
export type { FieldConfig } from '../components/molecules/KeyValueForm.types';
export * from '../types/events';

// Component type definitions
import type { SvelteComponent } from 'svelte';
import type { ComponentEvents } from 'svelte';

// Enhanced component type with proper event handling
export type ZabiComponent<T = any, E = ComponentEvents<T>> = new (...args: any[]) => {
    $set(props: Partial<T>): void;
    $destroy(): void;
    $on<K extends keyof E>(event: K, handler: (event: CustomEvent<E[K]>) => void): () => void;
};

// Button component props and events
export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'ghost' | 'link' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    iconLeft?: string | any;
    iconRight?: string | any;
    ariaLabel?: string;
    ariaDescribedBy?: string;
    ariaExpanded?: boolean;
    ariaControls?: string;
    ariaPressed?: boolean;
}

export interface ButtonEvents {
    click: { value: boolean; event: MouseEvent };
}

// Heading component props
export interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

// Card component props
export interface CardProps {
    variant?: 'default' | 'elevated' | 'outlined';
    className?: string;
}

// Input component props and events
export interface InputProps {
    type?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export interface InputEvents {
    input: { value: string; event: Event };
    change: { value: string; event: Event };
    focus: { event: FocusEvent };
    blur: { event: FocusEvent };
}

// Checkbox component props and events
export interface CheckboxProps {
    checked?: boolean;
    disabled?: boolean;
    className?: string;
}

export interface CheckboxEvents {
    change: { checked: boolean; event: Event };
}

// Select component props and events
export interface SelectProps {
    options: Array<{ value: string; label: string }>;
    value?: string;
    disabled?: boolean;
    className?: string;
}

export interface SelectEvents {
    change: { value: string; event: Event };
}

// Textarea component props and events
export interface TextareaProps {
    value?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    className?: string;
}

export interface TextareaEvents {
    input: { value: string; event: Event };
    change: { value: string; event: Event };
}

// Modal component props and events
export interface ModalProps {
    open?: boolean;
    title?: string;
    className?: string;
}

export interface ModalEvents {
    close: { event: Event };
}

// Alert component props
export interface AlertProps {
    type?: 'success' | 'error' | 'warning' | 'info';
    message: string;
    className?: string;
}

// Badge component props
export interface BadgeProps {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

// Progress component props
export interface ProgressProps {
    value?: number;
    max?: number;
    className?: string;
}

// Skeleton component props
export interface SkeletonProps {
    width?: string;
    height?: string;
    className?: string;
}

// Toggle component props and events
export interface ToggleProps {
    checked?: boolean;
    disabled?: boolean;
    className?: string;
}

export interface ToggleEvents {
    change: { checked: boolean; event: Event };
}

// Tooltip component props
export interface TooltipProps {
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
}

// Component type definitions
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

// Re-export actions
export * from './actions';

// Re-export utilities
export * from './form-utils';
export * from './navigation-utils';
export * from './tabs-utils';

// Re-export SSR utilities
export * from './ssr-safe';
