interface Props {
    id?: string;
    name?: string;
    value?: string;
    label?: string;
    disabled?: boolean;
    /** Initial checked state for uncontrolled usage. */
    defaultChecked?: boolean;
    /** Controlled checked state (also supports `bind:checked`). */
    checked?: boolean;
    onChange?: (event: Event) => void;
    /** Alias for consistency with existing components. */
    onchange?: (event: Event) => void;
}
declare const Radio: import("svelte").Component<Props, {}, "checked">;
type Radio = ReturnType<typeof Radio>;
export default Radio;
