// Zabi Components - Clean & Simple Svelte Component Library
// Main library entry point - All components in one place

// Import base styles
import '../styles/base.css';

// ============================================================================
// ATOM COMPONENTS - Basic UI building blocks
// ============================================================================

// Form Controls
export { default as Button } from '../components/atoms/Button.svelte';
export { default as Input } from '../components/atoms/Input.svelte';
export { default as Textarea } from '../components/atoms/Textarea.svelte';
export { default as Select } from '../components/atoms/Select.svelte';
// export { default as Checkbox } from '../components/atoms/Checkbox.svelte'; // Temporarily disabled for SSR
export { default as Toggle } from '../components/atoms/Toggle.svelte';
export { default as ColorPicker } from '../components/atoms/ColorPicker.svelte';

// Display Components
export { default as Card } from '../components/atoms/Card.svelte';
export { default as Badge } from '../components/atoms/Badge.svelte';
export { default as Heading } from '../components/atoms/Heading.svelte';
export { default as Progress } from '../components/atoms/Progress.svelte';
export { default as Skeleton } from '../components/atoms/Skeleton.svelte';
export { default as Toast } from '../components/atoms/Toast.svelte';
export { default as Tooltip } from '../components/atoms/Tooltip.svelte';

// Utility Components
export { default as ThemeToggle } from '../components/atoms/ThemeToggle.svelte';
export { default as OptimizedImage } from '../components/atoms/OptimizedImage.svelte';

// ============================================================================
// MOLECULE COMPONENTS - Composite UI elements
// ============================================================================

// Layout & Structure
export { default as Form } from '../components/molecules/Form.svelte';
export { default as Layout } from '../components/molecules/Layout.svelte';
export { default as Modal } from '../components/molecules/Modal.svelte';
export { default as SlideUp } from '../components/molecules/SlideUp.svelte';
export { default as Dropdown } from '../components/molecules/Dropdown.svelte';

// Navigation & Interaction
export { default as Tabs } from '../components/molecules/Tabs.svelte';
export { default as Alert } from '../components/molecules/Alert.svelte';
export { default as ImageUpload } from '../components/molecules/ImageUpload.svelte';

// Content & Display

// ============================================================================
// ORGANISM COMPONENTS - Complex UI sections
// ============================================================================

export { default as Navbar } from '../components/organisms/Navbar.svelte';
export { default as Navigation } from '../components/organisms/Navigation.svelte';

// ============================================================================
// TYPES - TypeScript definitions
// ============================================================================

// Basic component types
export interface BaseComponentProps {
    className?: string;
    disabled?: boolean;
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

// Simple utility functions
export const createId = (prefix: string = 'id'): string => {
    if (typeof window !== 'undefined') {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    } else {
        return `${prefix}-ssr-${Date.now()}`;
    }
};

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
export * from '../components/molecules/index';
export * from '../components/organisms/index';