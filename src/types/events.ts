// Event types for components
export interface BaseEventDetail {
    event: Event;
}

export interface ClickEventDetail extends BaseEventDetail {
    value: boolean;
}

export interface InputEventDetail extends BaseEventDetail {
    value: string;
}

export interface ChangeEventDetail extends BaseEventDetail {
    value: string;
}

export interface FocusEventDetail extends BaseEventDetail {
    event: FocusEvent;
}

export interface BlurEventDetail extends BaseEventDetail {
    event: FocusEvent;
}

export interface KeydownEventDetail extends BaseEventDetail {
    event: KeyboardEvent;
}

export interface KeyupEventDetail extends BaseEventDetail {
    event: KeyboardEvent;
}

// Component-specific event types
export interface ButtonEvents {
    click: ClickEventDetail;
}

export interface InputEvents {
    input: InputEventDetail;
    change: ChangeEventDetail;
    focus: FocusEventDetail;
    blur: BlurEventDetail;
    keydown: KeydownEventDetail;
    keyup: KeyupEventDetail;
    clear: BaseEventDetail;
}

export interface CardEvents {
    click: ClickEventDetail;
    focus: FocusEventDetail;
    blur: BlurEventDetail;
    hover: BaseEventDetail;
    leave: BaseEventDetail;
}

export interface CheckboxEvents {
    change: ChangeEventDetail;
    focus: FocusEventDetail;
    blur: BlurEventDetail;
}

export interface TextareaEvents {
    input: InputEventDetail;
    change: ChangeEventDetail;
    focus: FocusEventDetail;
    blur: BlurEventDetail;
    keydown: KeydownEventDetail;
    keyup: KeyupEventDetail;
}

export interface ToggleEvents {
    change: ChangeEventDetail;
    focus: FocusEventDetail;
    blur: BlurEventDetail;
}

export interface TooltipEvents {
    show: BaseEventDetail;
    hide: BaseEventDetail;
    focus: FocusEventDetail;
    blur: BlurEventDetail;
    mouseenter: BaseEventDetail;
    mouseleave: BaseEventDetail;
}

export interface TabsEvents {
    change: { value: string; event: Event };
    keydown: KeydownEventDetail;
}

export interface ModalEvents {
    close: BaseEventDetail;
}

export interface NavbarEvents {
    click: ClickEventDetail;
    keydown: KeydownEventDetail;
}

export interface NavigationEvents {
    "item-click": { item: any; event: MouseEvent };
    toggle: { open: boolean };
    open: BaseEventDetail;
    close: BaseEventDetail;
    keydown: KeydownEventDetail;
}

export interface LayoutEvents {
    "breakpoint-change": { breakpoint: string; width: number };
    "sidebar-toggle": { open: boolean };
}

export interface FormEvents {
    submit: {
        data: Record<string, string>;
        formData: FormData;
        event: SubmitEvent;
    };
    reset: { event: Event };
    input: { name: string; value: string; event: Event };
    blur: { name: string; value: string; event: FocusEvent };
    "validation-error": { errors: Record<string, string> };
}

export interface AlertEvents {
    close: { event: MouseEvent };
}

export interface CloseEventDetail {
    event: MouseEvent;
}