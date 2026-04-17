interface Props {
    id?: string;
    name?: string;
    value?: string;
    disabled?: boolean;
    /** Shows a spinner in place of the check mark and disables interaction. */
    loading?: boolean;
    label?: string;
    /** Initial checked state for uncontrolled usage. */
    defaultChecked?: boolean;
    /** Controlled checked state (also supports `bind:checked`). */
    checked?: boolean;
    onChange?: (event: Event) => void;
    onchange?: (event: Event) => void;
}
declare const Checkbox: import("svelte").Component<Props, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
