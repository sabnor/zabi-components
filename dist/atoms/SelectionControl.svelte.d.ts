import type { Snippet } from "svelte";
import { type SelectionControlShape } from "./selection-control.styles";
type SelectionControlType = "checkbox" | "radio";
export type SelectionControlMarkProps = {
    checked: boolean;
    loading: boolean;
    disabled: boolean;
};
interface Props {
    id?: string;
    type: SelectionControlType;
    shape: SelectionControlShape;
    name?: string;
    value?: string;
    label?: string;
    disabled?: boolean;
    loading?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (event: Event) => void;
    onchange?: (event: Event) => void;
    mark?: Snippet<[SelectionControlMarkProps]>;
}
declare const SelectionControl: import("svelte").Component<Props, {}, "checked">;
type SelectionControl = ReturnType<typeof SelectionControl>;
export default SelectionControl;
