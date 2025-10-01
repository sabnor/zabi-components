/**
 * Event type definitions for zabi-components
 * These types ensure consistent event structures across all components
 */

// Base event types
export interface ClickEvent {
    click: MouseEvent | KeyboardEvent;
}

export interface InputEvent {
    input: { value: string };
}

export interface ChangeEvent {
    change: { value: string };
}

export interface CheckedChangeEvent {
    change: { checked: boolean };
}

export interface FileUploadEvent {
    upload: { files: FileList };
}

export interface CloseEvent {
    close: void;
}

// Component-specific event types
export interface ButtonEvents extends ClickEvent { }

export interface InputEvents extends InputEvent, ChangeEvent {
    focus: CustomEvent<{ event: FocusEvent }>;
    blur: CustomEvent<{ event: FocusEvent }>;
    keydown: CustomEvent<{ event: KeyboardEvent }>;
    keyup: CustomEvent<{ event: KeyboardEvent }>;
    clear: CustomEvent<{ event: Event }>;
}

export interface TextareaEvents extends InputEvent, ChangeEvent {
    focus: CustomEvent<{ event: FocusEvent }>;
    blur: CustomEvent<{ event: FocusEvent }>;
    keydown: CustomEvent<{ event: KeyboardEvent }>;
    keyup: CustomEvent<{ event: KeyboardEvent }>;
}

export interface SelectEvents extends InputEvent, ChangeEvent {
    focus: CustomEvent<{ event: FocusEvent }>;
    blur: CustomEvent<{ event: FocusEvent }>;
    keydown: CustomEvent<{ event: KeyboardEvent }>;
    keyup: CustomEvent<{ event: KeyboardEvent }>;
}

export interface CheckboxEvents extends CheckedChangeEvent { }

export interface ToggleEvents extends CheckedChangeEvent { }

export interface AlertEvents extends CloseEvent { }

export interface KeyValueFormEvents {
    input: CustomEvent<Record<string, any>>;
    change: CustomEvent<Record<string, any>>;
}

export interface ImageUploadEvents extends FileUploadEvent { }

export interface NotificationManagerEvents extends CloseEvent { }

// Re-export all event types for easy importing
export type {
    ClickEvent,
    InputEvent,
    ChangeEvent,
    CheckedChangeEvent,
    FileUploadEvent,
    CloseEvent,
    ButtonEvents,
    InputEvents,
    TextareaEvents,
    SelectEvents,
    CheckboxEvents,
    ToggleEvents,
    AlertEvents,
    KeyValueFormEvents,
    ImageUploadEvents,
    NotificationManagerEvents,
};