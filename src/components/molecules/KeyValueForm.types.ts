// Field configuration for DynamicForm component
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
