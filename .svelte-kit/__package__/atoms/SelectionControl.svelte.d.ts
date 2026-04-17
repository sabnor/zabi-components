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
    /** Shows a spinner in the mark slot and disables interaction while true. */
    loading?: boolean;
    /** Initial checked state for uncontrolled usage. */
    defaultChecked?: boolean;
    /** Controlled checked state (also supports `bind:checked`). */
    checked?: boolean;
    onChange?: (event: Event) => void;
    /** Alias for consistency with existing components. */
    onchange?: (event: Event) => void;
    /** Optional slot for the inner mark (check icon, dot, spinner). */
    mark?: Snippet<[SelectionControlMarkProps]>;
}
declare const SelectionControl: import("svelte").Component<Props, {}, "checked">;
type SelectionControl = ReturnType<typeof SelectionControl>;
export default SelectionControl;
