export type RadioGroupOption = {
    value: string;
    label: string;
    disabled?: boolean;
    description?: string;
};
interface Props {
    options: RadioGroupOption[];
    /** Controlled selected value (also supports `bind:value`). Use `undefined` for no selection. */
    value?: string | undefined;
    /** Initial selected value for uncontrolled usage. Omit for no initial selection. */
    defaultValue?: string | undefined;
    name?: string;
    disabled?: boolean;
    legend?: string;
    label?: string;
}
declare const RadioGroup: import("svelte").Component<Props, {}, "value">;
type RadioGroup = ReturnType<typeof RadioGroup>;
export default RadioGroup;
