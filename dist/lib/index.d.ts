import '../styles/base.css';
export { default as Toggle } from '../components/atoms/Toggle.svelte';
export { default as Badge } from '../components/atoms/Badge.svelte';
export { default as Button } from '../components/atoms/Button.svelte';
export { default as Card } from '../components/atoms/Card.svelte';
export { default as Input } from '../components/atoms/Input.svelte';
export { default as Textarea } from '../components/atoms/Textarea.svelte';
export { default as Select } from '../components/atoms/Select.svelte';
export { default as ColorPicker } from '../components/atoms/ColorPicker.svelte';
export { default as Heading } from '../components/atoms/Heading.svelte';
export interface BaseComponentProps {
    class?: string;
    className?: string;
    style?: string;
    id?: string;
    [key: string]: any;
}
export interface ButtonProps extends BaseComponentProps {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
}
export interface InputProps extends BaseComponentProps {
    value?: string;
    type?: string;
    label?: string;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
}
export interface CardProps extends BaseComponentProps {
    title?: string;
    image?: string;
    interactive?: boolean;
}
export interface FormProps extends BaseComponentProps {
    method?: 'get' | 'post';
    action?: string;
}
export interface NavigationProps extends BaseComponentProps {
    variant?: 'header' | 'sidebar';
    items?: Array<{
        label: string;
        href: string;
    }>;
    currentPath?: string;
}
export interface NavbarProps extends BaseComponentProps {
    brand?: string;
    showThemeToggle?: boolean;
}
export interface ModalProps extends BaseComponentProps {
    isOpen?: boolean;
    title?: string;
}
export interface TabsProps extends BaseComponentProps {
    tabs?: Array<{
        id: string;
        label: string;
        disabled?: boolean;
    }>;
    activeTab?: string;
    variant?: 'default' | 'pills';
}
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
export interface ButtonEvents {
    click: ClickEventDetail;
}
export interface InputEvents {
    input: InputEventDetail;
    change: ChangeEventDetail;
}
export interface FormEvents {
    submit: {
        data: Record<string, any>;
        formData: FormData;
        event: SubmitEvent;
    };
}
export interface NavigationEvents {
    navigate: {
        item: any;
        href: string;
    };
}
export interface NavbarEvents {
    brandClick: {
        event: MouseEvent;
    };
}
export interface ModalEvents {
    close: {
        event: Event;
    };
}
export interface TabsEvents {
    change: {
        activeTab: string;
    };
}
export * from './variant-utils';
export * from './ssr-safe';
export declare const createId: (prefix?: string) => string;
export { generateId, isBrowser, safeLocalStorage, safeDocument, safeWindow } from './ssr-safe';
export declare const cn: (...classes: (string | undefined | null | false)[]) => string;
export declare const getFormData: (form: HTMLFormElement) => Record<string, any>;
export declare const validateEmail: (email: string) => boolean;
export declare const validateRequired: (value: any) => boolean;
export * from '../components/atoms/index';
//# sourceMappingURL=index.d.ts.map