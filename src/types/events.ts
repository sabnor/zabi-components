// Event types for components - Standardized structure
export interface BaseEventDetail {
    event: Event;
}

export interface ClickEventDetail extends BaseEventDetail {
    value: boolean;
}

export interface InputEventDetail extends BaseEventDetail {
    value: string;
    field?: string;
}

export interface ChangeEventDetail extends BaseEventDetail {
    value: any;
    field?: string;
    checked?: boolean;
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

export interface SubmitEventDetail extends BaseEventDetail {
    data: Record<string, any>;
    formData: FormData;
}

export interface ResizeEventDetail extends BaseEventDetail {
    event: Event;
}

export interface TabChangeEventDetail extends BaseEventDetail {
    activeTab: string;
    tab: any;
}

export interface FileUploadEventDetail extends BaseEventDetail {
    file: File;
}

export interface FileRemoveEventDetail extends BaseEventDetail {
    file: File;
}

export interface ErrorEventDetail extends BaseEventDetail {
    error: string;
}

// Component-specific event types - Using standardized structure
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
    mouseenter: BaseEventDetail;
    mouseleave: BaseEventDetail;
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
    resize: ResizeEventDetail;
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
    change: TabChangeEventDetail;
    tabClick: { tab: any; event: MouseEvent };
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
    submit: SubmitEventDetail;
    reset: BaseEventDetail;
    input: { name: string; value: string; event: Event };
    blur: { name: string; value: string; event: FocusEvent };
    "validation-error": { errors: Record<string, string> };
}

export interface AlertEvents {
    close: BaseEventDetail;
}

export interface TextAlignmentEvents {
    change: { value: string; event: Event };
}

export interface ImageUploadEvents {
    upload: FileUploadEventDetail;
    remove: FileRemoveEventDetail;
    error: ErrorEventDetail;
}

export interface KeyValueFormEvents {
    submit: { data: Record<string, any>; event: Event };
    change: { field: string; value: any; event: Event };
    add: { field: FieldConfig; event: Event };
    remove: { field: string; event: Event };
}

export interface FieldConfig {
    key: string;
    type: "text" | "email" | "password" | "number" | "textarea" | "select" | "checkbox" | "toggle" | "colorpicker" | "textalignment";
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: Array<{ value: string | number; label: string; disabled?: boolean }>;
    rows?: number;
    flex?: "1" | "full";
}