// Types index file for zabi-components
// Re-export all types for easy importing

export * from './events.js';
export * from './variants.js';
export * from './page.types.js';

// Component type definitions
// Enhanced component type with proper event handling for Svelte 5
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import type { BottomTabBarItem } from '../components/util/bottom-tab-bar.js';
import type {
    ButtonVariant,
    CardVariant,
    ExtendedSemanticVariant,
    SemanticVariant,
    SizeVariant,
} from './variants.js';

export type ZabiComponent<T extends Record<string, any> = Record<string, any>, E extends Record<string, any> = Record<string, any>> = Component<T, E>;

/*
 * The `*Props` interfaces below describe what each component accepts today;
 * `tests/exported-types.test.ts` compares them with the component's own
 * `Props`, so they cannot drift again.
 *
 * Members marked `@deprecated` were exported by earlier versions but were
 * never props of the component. They stay so existing code keeps compiling,
 * and do nothing when passed.
 */

// Button component props and events
export interface ButtonProps extends Omit<HTMLButtonAttributes, 'class'> {
    /**
     * `success`, `warning`, `info` and `neutral` are deprecated: Button never
     * styled them, and they render as `primary`.
     */
    variant?: ButtonVariant | 'success' | 'warning' | 'info' | 'neutral';
    size?: SizeVariant;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    text?: string;
    /** Stretch to the width of the container. */
    fullWidth?: boolean;
    /** @deprecated use `fullWidth`. */
    isFullWidth?: boolean;
    class?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
    /** @deprecated never accepted by the component; render the icon in `children`. */
    iconLeft?: string | any;
    /** @deprecated never accepted by the component; render the icon in `children`. */
    iconRight?: string | any;
    /** @deprecated never accepted by the component; use `aria-label`. */
    ariaLabel?: string;
    /** @deprecated never accepted by the component; use `aria-describedby`. */
    ariaDescribedBy?: string;
    /** @deprecated never accepted by the component; use `aria-expanded`. */
    ariaExpanded?: boolean;
    /** @deprecated never accepted by the component; use `aria-controls`. */
    ariaControls?: string;
    /** @deprecated never accepted by the component; use `aria-pressed`. */
    ariaPressed?: boolean;
}

export interface ButtonEvents {
    click: { value: boolean; event: MouseEvent };
}

// Heading component props
export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Visual size, when it should differ from the semantic level. */
    size?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Heading text. Ignored when `children` is provided. */
    text?: string;
    class?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

// Card component props
export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    variant?: CardVariant;
    size?: SizeVariant;
    fullWidth?: boolean;
    class?: string;
    /** @deprecated use `class`. */
    className?: string;
    onclick?: (event: MouseEvent) => void | Promise<void>;
    /** Required when card is interactive (has onclick) for accessibility */
    ariaLabel?: string;
    children?: Snippet;
}

// Input component props and events
export interface InputProps {
    /** Omit to auto-generate. */
    id?: string;
    type?: string;
    value?: string;
    name?: string;
    label?: string;
    /** True when a FormField supplies the visible label. */
    hideLabel?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    loading?: boolean;
    size?: SizeVariant;
    variant?: SemanticVariant;
    message?: string;
    oninput?: (event: Event) => void;
    onblur?: (event: Event) => void;
    'aria-label'?: string;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
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
    id?: string;
    name?: string;
    value?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    onchange?: (event: Event) => void;
    /** Same as `onchange`; both are called. */
    onChange?: (event: Event) => void;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface CheckboxEvents {
    change: { checked: boolean; event: Event };
}

// Select component props and events
export interface SelectProps {
    options?: Array<{ value: string | number; label: string; disabled?: boolean }>;
    value?: string | number | undefined;
    searchable?: boolean;
    searchPlaceholder?: string;
    maxMenuHeight?: string;
    menuWidth?: string;
    noResultsText?: string;
    isLoading?: boolean;
    loadingText?: string;
    emptyStateTitle?: string;
    emptyStateDescription?: string;
    emptyStateActionLabel?: string;
    onEmptyStateAction?: () => void;
    placeholder?: string;
    label?: string;
    /** When set, a hidden input submits the selected value with native forms. */
    name?: string;
    required?: boolean;
    disabled?: boolean;
    size?: SizeVariant;
    variant?: 'default' | 'success' | 'warning' | 'error';
    message?: string;
    onchange?: (event: Event) => void;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface SelectEvents {
    change: { value: string; event: Event };
}

// Textarea component props and events
export interface TextareaProps {
    id?: string;
    value?: string;
    name?: string;
    label?: string;
    hideLabel?: boolean;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    disabled?: boolean;
    loading?: boolean;
    size?: SizeVariant;
    variant?: SemanticVariant;
    message?: string;
    oninput?: (event: Event) => void;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface TextareaEvents {
    input: { value: string; event: Event };
    change: { value: string; event: Event };
}

// Modal component props and events
export interface ModalProps
    extends Omit<
        HTMLAttributes<HTMLDivElement>,
        'class' | 'title' | 'role' | 'onclick' | 'onkeydown' | 'onclose' | 'children'
    > {
    /** Open state. Bindable. */
    isOpen?: boolean;
    title?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    role?: 'dialog' | 'alertdialog';
    showClose?: boolean;
    closeLabel?: string;
    /** CSS selector, inside the panel, of the control that takes focus on open. */
    initialFocus?: string;
    /** Render the overlay in `document.body`. */
    portal?: boolean;
    /** When false, Escape, a backdrop click and the close button do not close the modal. */
    dismissible?: boolean;
    onclose?: (detail: { reason: 'escape' | 'backdrop' | 'close-button' }) => void;
    /** @deprecated for close reporting: use `onclose`. Still called on close. */
    onclick?: (event: Event) => void;
    onkeydown?: (event: Event) => void;
    'data-testid'?: string;
    class?: string;
    children?: Snippet;
    footer?: Snippet;
    /** @deprecated never accepted by the component; use `isOpen`. */
    open?: boolean;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface ModalEvents {
    // Modal now uses onclick prop instead of dispatching close events
}

// Alert component props
export interface AlertProps {
    variant?: ExtendedSemanticVariant;
    title?: string;
    message?: string;
    closable?: boolean;
    /** Visible state. Bindable. */
    open?: boolean;
    /** Shrink to content instead of filling the container. */
    inline?: boolean;
    onclick?: (event: Event) => void;
    class?: string;
    /** @deprecated use `class`. */
    className?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `variant`. */
    type?: 'success' | 'error' | 'warning' | 'info';
}

// Badge component props
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'class'> {
    variant?: ExtendedSemanticVariant;
    size?: SizeVariant;
    emphasis?: 'subtle' | 'solid';
    /** Label text. Ignored when `children` is provided. */
    text?: string;
    showIcon?: boolean;
    class?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

// Progress component props
export interface ProgressProps {
    value?: number;
    max?: number;
    size?: SizeVariant;
    label?: string;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

// Skeleton component props
export interface SkeletonProps {
    variant?: 'text' | 'circle' | 'block';
    width?: string | number;
    height?: string | number;
    class?: string;
    'aria-label'?: string;
}

// Toggle component props and events
export interface ToggleProps {
    /** Omit to auto-generate. */
    id?: string;
    /** When set, a hidden input submits `value` with native forms while checked. */
    name?: string;
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    onclick?: (event: MouseEvent) => void;
    onchange?: (event: { checked: boolean }) => void;
    class?: string;
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

export interface ToggleEvents {
    change: { checked: boolean; event: Event };
}

// Tooltip component props
export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
    content?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    disabled?: boolean;
    /** Lay the trigger out as a full-width block. */
    block?: boolean;
    /** Position the bubble against the viewport, so a scrolling ancestor cannot clip it. */
    fixed?: boolean;
    class?: string;
    children?: Snippet;
    /** @deprecated never accepted by the component; use `placement`. */
    position?: 'top' | 'bottom' | 'left' | 'right';
    /** @deprecated never accepted by the component; use `class`. */
    className?: string;
}

// BottomTabBar component props
export interface BottomTabBarProps extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
    /** Three to five destinations. */
    items: BottomTabBarItem[];
    /** The href of the active tab, or the path of the current page. Defaults to the current page. */
    active?: string;
    /** Accessible name of the navigation landmark. */
    label?: string;
    /** What a badge adds to the tab's accessible name, after the label and a comma. */
    badgeLabel?: (count: number, item: BottomTabBarItem) => string;
    /** Counts above this show as `99+`. */
    badgeMax?: number;
    /** Defaults to `fixed`, or to `static` inside an `AppShell`. */
    position?: 'fixed' | 'static';
    class?: string;
}

// AppBar component props
export interface AppBarProps extends Omit<HTMLAttributes<HTMLElement>, 'class' | 'title'> {
    /** The name of the screen, as a heading. */
    title?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Shows the back control as a link to this address. */
    backHref?: string;
    /** Called when the back control is activated; on its own it makes the control a button. */
    onback?: (event: MouseEvent) => void;
    /** Accessible name of the back control. */
    backLabel?: string;
    /**
     * Hides the bar while the page scrolls down and brings it back when it scrolls up.
     * Keyboard focus inside the bar holds it and brings it back; focus left by a tap does not.
     */
    collapseOnScroll?: boolean;
    /** Before the title, after the back control. */
    leading?: Snippet;
    /** After the title. At most two icon buttons. */
    actions?: Snippet;
    class?: string;
}

// AppShell component props
export interface AppShellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'style'> {
    /** The top bar, an `AppBar`. */
    header?: Snippet;
    /** The scrolling content, rendered in the element `contentElement` names. */
    children?: Snippet;
    /** The element around the content. Use `div` for a shell inside another `<main>`. */
    contentElement?: 'main' | 'div';
    /** The bottom bar, a `BottomTabBar`. */
    footer?: Snippet;
    class?: string;
    /** Added after the two custom properties the shell sets. */
    style?: string;
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
export type BottomTabBar = ZabiComponent<BottomTabBarProps>;
export type AppBar = ZabiComponent<AppBarProps>;
export type AppShell = ZabiComponent<AppShellProps>;
