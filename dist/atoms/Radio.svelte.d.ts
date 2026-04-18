interface Props {
    id?: string;
    name?: string;
    value?: string;
    label?: string;
    disabled?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (event: Event) => void;
    onchange?: (event: Event) => void;
}
declare const Radio: import("svelte").Component<Props, {}, "checked">;
type Radio = ReturnType<typeof Radio>;
export default Radio;
