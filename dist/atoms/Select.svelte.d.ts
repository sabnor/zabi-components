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
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "success" | "warning" | "error";
    message?: string;
    onchange?: (event: Event) => void;
}
declare const Select: import("svelte").Component<Props, {}, "">;
type Select = ReturnType<typeof Select>;
export default Select;
