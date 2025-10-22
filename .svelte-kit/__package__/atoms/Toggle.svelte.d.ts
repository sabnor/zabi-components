interface Props {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    onclick?: (event: MouseEvent) => void;
    onchange?: (event: {
        checked: boolean;
    }) => void;
}
declare const Toggle: import("svelte").Component<Props, {}, "">;
type Toggle = ReturnType<typeof Toggle>;
export default Toggle;
