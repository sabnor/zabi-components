export interface NavItem {
    label: string;
    href: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    message?: string;
    subscribe?: boolean;
}
