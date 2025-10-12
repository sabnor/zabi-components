import '../styles/base.css';
export { default as Button } from '../components/atoms/Button.svelte';
export { default as Input } from '../components/atoms/Input.svelte';
export { default as Textarea } from '../components/atoms/Textarea.svelte';
export { default as Select } from '../components/atoms/Select.svelte';
export { default as Toggle } from '../components/atoms/Toggle.svelte';
export { default as ColorPicker } from '../components/atoms/ColorPicker.svelte';
export { default as Card } from '../components/atoms/Card.svelte';
export { default as Badge } from '../components/atoms/Badge.svelte';
export { default as Heading } from '../components/atoms/Heading.svelte';
export { default as Progress } from '../components/atoms/Progress.svelte';
export { default as Skeleton } from '../components/atoms/Skeleton.svelte';
export { default as Toast } from '../components/atoms/Toast.svelte';
export { default as Tooltip } from '../components/atoms/Tooltip.svelte';
export { default as ThemeToggle } from '../components/atoms/ThemeToggle.svelte';
export { default as OptimizedImage } from '../components/atoms/OptimizedImage.svelte';
export { default as Form } from '../components/molecules/Form.svelte';
export { default as Layout } from '../components/molecules/Layout.svelte';
export { default as Modal } from '../components/molecules/Modal.svelte';
export { default as SlideUp } from '../components/molecules/SlideUp.svelte';
export { default as Dropdown } from '../components/molecules/Dropdown.svelte';
export { default as Tabs } from '../components/molecules/Tabs.svelte';
export { default as Alert } from '../components/molecules/Alert.svelte';
export { default as ImageUpload } from '../components/molecules/ImageUpload.svelte';
export { default as Navbar } from '../components/organisms/Navbar.svelte';
export { default as Navigation } from '../components/organisms/Navigation.svelte';
export interface BaseComponentProps {
    className?: string;
    disabled?: boolean;
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
export declare const createId: (prefix?: string) => string;
export declare const cn: (...classes: (string | undefined | null | false)[]) => string;
export declare const getFormData: (form: HTMLFormElement) => Record<string, any>;
export declare const validateEmail: (email: string) => boolean;
export declare const validateRequired: (value: any) => boolean;
export * from '../components/atoms/index';
export * from '../components/molecules/index';
export * from '../components/organisms/index';
//# sourceMappingURL=index.d.ts.map