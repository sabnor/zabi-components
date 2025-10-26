interface Props {
    checked?: boolean;
    name?: string;
    disabled?: boolean;
    label?: string;
    onchange?: (event: Event) => void;
}
declare const Checkbox: import("svelte").Component<Props, {}, "">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
