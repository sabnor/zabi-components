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
    /** Optional demo id for rendering live previews via a registry. */
    demoId?: string;
}
export type ComponentCategory = 'atoms' | 'molecules' | 'organisms';
export type ComponentDocSectionId = 'live' | 'snippet' | 'variants' | 'props' | 'guidelines';
export interface ComponentDocExample {
    title: string;
    description?: string;
    /** Demo renderer id, resolved via a registry. */
    demoId: string;
    /** Copy/paste ready snippet that matches the live demo. */
    code: string;
    language?: string;
}
export interface ComponentDocGuidelines {
    whenToUse: string[];
    whenToAvoid?: string[];
}
export interface ComponentDoc {
    name: string;
    category: ComponentCategory;
    /** Short description: what it is + when to use. */
    description: string;
    /** Primary live example shown first. */
    defaultExample: ComponentDocExample;
    /** Optional additional examples (variants/states/realistic patterns). */
    examples?: ComponentDocExample[];
    /** Optional list of variants/states, for quick scanning. */
    variantsStates?: string[];
    /** Props/API for the exported component. */
    props: ComponentProp[];
    guidelines?: ComponentDocGuidelines;
    /** Optional section visibility/order overrides (defaults to canonical order). */
    sections?: Array<{
        id: ComponentDocSectionId;
        hidden?: boolean;
    }>;
}
