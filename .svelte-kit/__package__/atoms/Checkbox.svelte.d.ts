interface Props {
    id?: string;
    name?: string;
    value?: string;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (event: Event) => void;
    onchange?: (event: Event) => void;
}
declare const Checkbox: import("svelte").Component<Props, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
