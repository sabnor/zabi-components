// Zabi Components - Clean & Simple Svelte Component Library
// Main library entry point - All components in one place

// ============================================================================
// ATOM COMPONENTS - Basic UI building blocks
// ============================================================================

// Form Controls - All SSR-safe components
export { default as Toggle } from './atoms/Toggle.svelte';
export { default as Badge } from './atoms/Badge.svelte';
export { default as Button } from './atoms/Button.svelte';
export { default as Card } from './atoms/Card.svelte';
export { default as Input } from './atoms/Input.svelte';
export { default as Textarea } from './atoms/Textarea.svelte';
export { default as Select } from './atoms/Select.svelte';
export { default as ColorPicker } from './atoms/ColorPicker.svelte';
export { default as Heading } from './atoms/Heading.svelte';
export { default as ThemeToggle } from './atoms/ThemeToggle.svelte';

// ============================================================================
// MOLECULE COMPONENTS - Composite UI elements
// ============================================================================

export { default as Alert } from './molecules/Alert.svelte';
export { default as ComponentDemo } from './molecules/ComponentDemo.svelte';
export { default as ContactForm } from './molecules/ContactForm.svelte';
export { default as Dropdown } from './molecules/Dropdown.svelte';
export { default as Form } from './molecules/Form.svelte';
export { default as ImageUpload } from './molecules/ImageUpload.svelte';
export { default as Modal } from './molecules/Modal.svelte';
export { default as SlideUp } from './molecules/SlideUp.svelte';
export { default as Tabs } from './molecules/Tabs.svelte';

// ============================================================================
// ORGANISM COMPONENTS - Complex UI sections
// ============================================================================

export { default as Navbar } from './organisms/Navbar.svelte';
export { default as Navigation } from './organisms/Navigation.svelte';

// ============================================================================
// UTILITIES - Helper functions and utilities
// ============================================================================

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

// SSR-safe utilities
export const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
};

export const safeWindow = (): Window | undefined => {
    return isBrowser() ? window : undefined;
};

export const safeDocument = (): Document | undefined => {
    return isBrowser() ? document : undefined;
};

export const safeLocalStorage = (): Storage | undefined => {
    return isBrowser() ? localStorage : undefined;
};

export const generateId = (prefix: string = 'id'): string => {
    return createId(prefix);
};
