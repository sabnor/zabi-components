interface Props {
    value?: string;
    label?: string;
    disabled?: boolean;
    onclick?: (event: Event) => void;
}
declare const ColorPicker: import("svelte").Component<Props, {}, "">;
type ColorPicker = ReturnType<typeof ColorPicker>;
export default ColorPicker;
