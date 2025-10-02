/**
 * Event type definitions for zabi-components
 * These types ensure consistent event structures across all components
 * All events follow the standardized format: { detail: { value, event? } }
 */

// Base event detail types
export interface BaseEventDetail<T = any> {
    value: T;
    event?: Event;
}

// Standardized event types
export interface ClickEventDetail extends BaseEventDetail<boolean> {
    event?: MouseEvent | KeyboardEvent;
}

export interface InputEventDetail extends BaseEventDetail<string> {
    event?: InputEvent;
}

export interface ChangeEventDetail extends BaseEventDetail<string> {
    event?: Event;
}

export interface CheckedChangeEventDetail extends BaseEventDetail<boolean> {
    event?: Event;
}

export interface SelectChangeEventDetail extends BaseEventDetail<string | string[]> {
    event?: Event;
}

export interface FileUploadEventDetail extends BaseEventDetail<FileList> {
    event?: Event;
}

export interface CloseEventDetail extends BaseEventDetail<boolean> {
    event?: Event;
}

// Component-specific event types
export interface ButtonEvents {
    click: ClickEventDetail;
}

export interface InputEvents {
    input: InputEventDetail;
    change: ChangeEventDetail;
    focus: { event: FocusEvent };
    blur: { event: FocusEvent };
    keydown: { event: KeyboardEvent };
    keyup: { event: KeyboardEvent };
    clear: { event: Event };
}

export interface TextareaEvents {
    input: InputEventDetail;
    change: ChangeEventDetail;
    focus: { event: FocusEvent };
    blur: { event: FocusEvent };
    keydown: { event: KeyboardEvent };
    keyup: { event: KeyboardEvent };
}

export interface SelectEvents {
    input: InputEventDetail;
    change: SelectChangeEventDetail;
    focus: { event: FocusEvent };
    blur: { event: FocusEvent };
    keydown: { event: KeyboardEvent };
    keyup: { event: KeyboardEvent };
}

export interface CheckboxEvents {
    change: CheckedChangeEventDetail;
}

export interface ToggleEvents {
    change: CheckedChangeEventDetail;
}

export interface AlertEvents {
    close: CloseEventDetail;
}

export interface CardEvents {
    click: ClickEventDetail;
    hover: { event: MouseEvent };
    leave: { event: MouseEvent };
    focus: { event: FocusEvent };
    blur: { event: FocusEvent };
}

export interface KeyValueFormEvents {
    input: CustomEvent<Record<string, any>>;
    change: CustomEvent<Record<string, any>>;
}

export interface ImageUploadEvents {
    upload: CustomEvent<FileUploadEventDetail>;
}

export interface NotificationManagerEvents {
    close: CustomEvent<CloseEventDetail>;
}

// Re-export all event types for easy importing
export type {
    BaseEventDetail,
    ClickEventDetail,
    InputEventDetail,
    ChangeEventDetail,
    CheckedChangeEventDetail,
    SelectChangeEventDetail,
    FileUploadEventDetail,
    CloseEventDetail,
    ButtonEvents,
    InputEvents,
    TextareaEvents,
    SelectEvents,
    CheckboxEvents,
    ToggleEvents,
    AlertEvents,
    CardEvents,
    KeyValueFormEvents,
    ImageUploadEvents,
    NotificationManagerEvents,
};