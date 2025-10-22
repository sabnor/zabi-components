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
export interface ComponentMetadata {
    name: string;
    category: 'atoms' | 'molecules' | 'organisms';
    description: string;
    props: ComponentProp[];
    variants?: string[];
    examples: ComponentExample[];
}
export interface ComponentProp {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description: string;
}
export interface ComponentExample {
    title: string;
    description: string;
    code: string;
    language?: string;
}
