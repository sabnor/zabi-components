interface Props {
    value?: string | number | undefined;
    options?: Array<{
        value: string | number;
        label: string;
        disabled?: boolean;
    }>;
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
    placeholder?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "success" | "warning" | "error";
    message?: string;
    onchange?: (event: Event) => void;
    onEmptyStateAction?: () => void;
}
declare const Select: import("svelte").Component<Props, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
