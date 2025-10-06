import '../styles/base.css';
export * from '../components/atoms/index';
export * from '../components/molecules/index';
export * from '../components/organisms/index';
export type { FieldConfig } from '../components/molecules/KeyValueForm.types';
export * from '../types/events';
export type ZabiComponent<T = any, E = any> = new (...args: any[]) => {
    $set(props: Partial<T>): void;
    $destroy(): void;
    $on<K extends keyof E>(event: K, handler: (event: CustomEvent<E[K]>) => void): () => void;
};
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
    variant?: 'default' | 'elevated' | 'outlined';
    className?: string;
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
    close: {
        event: Event;
    };
}
export interface AlertProps {
    type?: 'success' | 'error' | 'warning' | 'info';
    message: string;
    className?: string;
}
export interface BadgeProps {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export interface ProgressProps {
    value?: number;
    max?: number;
    className?: string;
}
export interface SkeletonProps {
    width?: string;
    height?: string;
    className?: string;
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
export * from './actions';
export * from './form-utils';
export * from './navigation-utils';
export * from './tabs-utils';
export * from './ssr-safe';
//# sourceMappingURL=index.d.ts.map