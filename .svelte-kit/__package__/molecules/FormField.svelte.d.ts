import type { Snippet } from 'svelte';
export type FormFieldControlProps = {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: 'true';
    disabled?: boolean;
    required?: boolean;
};
interface Props {
    id?: string;
    label: string;
    description?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    class?: string;
    labelClass?: string;
    control: Snippet<[FormFieldControlProps]>;
    meta?: Snippet;
}
declare const FormField: import("svelte").Component<Props, {}, "">;
type FormField = ReturnType<typeof FormField>;
export default FormField;
