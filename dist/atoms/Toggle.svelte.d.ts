interface Props {
    checked?: boolean;
    disabled?: boolean;
    /** Shows a spinner on the thumb and disables interaction while true. */
    loading?: boolean;
    label?: string;
    onclick?: (event: MouseEvent) => void;
    onchange?: (event: {
        checked: boolean;
    }) => void;
}
declare const Toggle: import("svelte").Component<Props, {}, "checked">;
type Toggle = ReturnType<typeof Toggle>;
export default Toggle;
