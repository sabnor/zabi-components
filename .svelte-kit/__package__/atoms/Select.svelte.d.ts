interface Props {
    value?: string | number | undefined;
    options?: Array<{
        value: string | number;
        label: string;
        disabled?: boolean;
    }>;
    /** Enables the search input inside the dropdown. */
    searchable?: boolean;
    /** Placeholder for the search input. */
    searchPlaceholder?: string;
    /** Max height for the options list (supports any valid CSS length). */
    maxMenuHeight?: string;
    /** Width for the dropdown menu (supports any valid CSS length). */
    menuWidth?: string;
    /** Message shown when no options match the search. */
    noResultsText?: string;
    /** Shows a loading state while options are being fetched. */
    isLoading?: boolean;
    /** Loading text shown in trigger and dropdown body. */
    loadingText?: string;
    /** Empty state title shown when there are no available options. */
    emptyStateTitle?: string;
    /** Empty state description shown when there are no available options. */
    emptyStateDescription?: string;
    /** Optional empty state action label. */
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
