// Event type definitions for zabi-components
// These match the event patterns used in cms-admin project

export interface ButtonEvents {
    click: CustomEvent<MouseEvent | KeyboardEvent>;
}

export interface InputEvents {
    input: CustomEvent<{ value: string }>;
    change: CustomEvent<{ value: string }>;
    focus: CustomEvent<FocusEvent>;
    blur: CustomEvent<FocusEvent>;
    keydown: CustomEvent<KeyboardEvent>;
    keyup: CustomEvent<KeyboardEvent>;
    clear: CustomEvent<Event>;
}

export interface TextareaEvents {
    input: CustomEvent<{ value: string }>;
    change: CustomEvent<{ value: string }>;
    focus: CustomEvent<FocusEvent>;
    blur: CustomEvent<FocusEvent>;
    keydown: CustomEvent<KeyboardEvent>;
    keyup: CustomEvent<KeyboardEvent>;
    resize: CustomEvent<Event>;
}

export interface CardEvents {
    click: CustomEvent<MouseEvent>;
    hover: CustomEvent<MouseEvent>;
    leave: CustomEvent<MouseEvent>;
    focus: CustomEvent<FocusEvent>;
    blur: CustomEvent<FocusEvent>;
}

export interface AlertEvents {
    close: CustomEvent<void>;
}

export interface CheckboxEvents {
    change: CustomEvent<{ checked: boolean }>;
    focus: CustomEvent<FocusEvent>;
    blur: CustomEvent<FocusEvent>;
}

export interface ToggleEvents {
    change: CustomEvent<{ checked: boolean }>;
}

export interface FileUploadEvents {
    upload: CustomEvent<{ files: FileList }>;
    change: CustomEvent<{ value: string | null }>;
    error: CustomEvent<{ message: string }>;
}

export interface KeyValueFormEvents {
    input: CustomEvent<{ [key: string]: any }>;
    change: CustomEvent<{ values: Record<string, any> }>;
}

// Re-export all event types for convenience
export type {
    ButtonEvents,
    InputEvents,
    TextareaEvents,
    CardEvents,
    AlertEvents,
    CheckboxEvents,
    ToggleEvents,
    FileUploadEvents,
    KeyValueFormEvents,
};
