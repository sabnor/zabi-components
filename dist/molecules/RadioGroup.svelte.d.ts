export type RadioGroupOption = {
    value: string;
    label: string;
    disabled?: boolean;
    description?: string;
};
interface Props {
    options: RadioGroupOption[];
    /** Selected value; `bind:value`. Use `undefined` for no selection. */
    value?: string | undefined;
    /** Uncontrolled initial value. */
    defaultValue?: string | undefined;
    name?: string;
    disabled?: boolean;
    legend?: string;
    label?: string;
}
declare const RadioGroup: import("svelte").Component<Props, {}, "value">;
type RadioGroup = ReturnType<typeof RadioGroup>;
export default RadioGroup;
