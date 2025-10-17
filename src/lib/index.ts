// Zabi Components - Clean & Simple Svelte Component Library
// Main library entry point - All components in one place

// Import base styles
import '../styles/base.css';

// ============================================================================
// ATOM COMPONENTS - Basic UI building blocks
// ============================================================================

// Form Controls - All SSR-safe components
export { default as Toggle } from '../components/atoms/Toggle.svelte';
export { default as Badge } from '../components/atoms/Badge.svelte';
export { default as Button } from '../components/atoms/Button.svelte';
export { default as Card } from '../components/atoms/Card.svelte';
export { default as Input } from '../components/atoms/Input.svelte';
export { default as Textarea } from '../components/atoms/Textarea.svelte';
export { default as Select } from '../components/atoms/Select.svelte';
export { default as ColorPicker } from '../components/atoms/ColorPicker.svelte';
export { default as Heading } from '../components/atoms/Heading.svelte';

// ============================================================================
// MOLECULE COMPONENTS - Composite UI elements
// ============================================================================

// Temporarily disabled to avoid SSR issues

// ============================================================================
// ORGANISM COMPONENTS - Complex UI sections
// ============================================================================

// Temporarily disabled to avoid SSR issues

// ============================================================================
// TYPES - TypeScript definitions
// ============================================================================

// Base component props interface
export interface BaseComponentProps {
    class?: string;
    className?: string;
    style?: string;
    id?: string;
    [key: string]: any;
}

// Button types
export interface ButtonProps extends BaseComponentProps {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
}

// Input types
export interface InputProps extends BaseComponentProps {
    value?: string;
    type?: string;
    label?: string;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
}

// Card types
export interface CardProps extends BaseComponentProps {
    title?: string;
    image?: string;
    interactive?: boolean;
}

// Form types
export interface FormProps extends BaseComponentProps {
    method?: 'get' | 'post';
    action?: string;
}

// Navigation types
export interface NavigationProps extends BaseComponentProps {
    variant?: 'header' | 'sidebar';
    items?: Array<{
        label: string;
        href: string;
    }>;
    currentPath?: string;
}

// Navbar types
export interface NavbarProps extends BaseComponentProps {
    brand?: string;
    showThemeToggle?: boolean;
}

// Modal types
export interface ModalProps extends BaseComponentProps {
    isOpen?: boolean;
    title?: string;
}

// Tabs types
export interface TabsProps extends BaseComponentProps {
    tabs?: Array<{
        id: string;
        label: string;
        disabled?: boolean;
    }>;
    activeTab?: string;
    variant?: 'default' | 'pills';
}

// Event types
export interface BaseEventDetail<T = any> {
    value: T;
    event?: Event;
}

export interface ClickEventDetail extends BaseEventDetail<boolean> {
    event?: MouseEvent;
}

export interface ChangeEventDetail extends BaseEventDetail<any> {
    event?: Event;
}

export interface InputEventDetail extends BaseEventDetail<string> {
    event?: InputEvent;
}

// Component event interfaces
export interface ButtonEvents {
    click: ClickEventDetail;
}

export interface InputEvents {
    input: InputEventDetail;
    change: ChangeEventDetail;
}

export interface FormEvents {
    submit: { data: Record<string, any>; formData: FormData; event: SubmitEvent };
}

export interface NavigationEvents {
    navigate: { item: any; href: string };
}

export interface NavbarEvents {
    brandClick: { event: MouseEvent };
}

export interface ModalEvents {
    close: { event: Event };
}

export interface TabsEvents {
    change: { activeTab: string };
}

// ============================================================================
// UTILITIES - Helper functions and utilities
// ============================================================================

// Variant utilities for semantic colors
export * from './variant-utils';

// SSR-safe utilities for SvelteKit compatibility
export * from './ssr-safe';

// Simple utility functions
export const createId = (prefix: string = 'id'): string => {
    if (typeof window !== 'undefined') {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    } else {
        return `${prefix}-ssr-${Date.now()}`;
    }
};

// Re-export SSR-safe utilities for convenience
export { generateId, isBrowser, safeLocalStorage, safeDocument, safeWindow } from './ssr-safe';

export const cn = (...classes: (string | undefined | null | false)[]): string =>
    classes.filter(Boolean).join(' ');

// Form utilities
export const getFormData = (form: HTMLFormElement): Record<string, any> => {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateRequired = (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
};

// ============================================================================
// EXPORTS - Re-export everything for easy importing
// ============================================================================

// Re-export all from sub-categories for backward compatibility
export * from '../components/atoms/index';
// export * from '../components/molecules/index'; // Temporarily disabled - empty module
// export * from '../components/organisms/index'; // Temporarily disabled - empty module