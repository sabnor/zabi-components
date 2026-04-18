import type { Snippet } from 'svelte';
export type DropdownTriggerProps = {
    'aria-expanded': boolean;
    'aria-haspopup': 'menu' | 'listbox';
    'aria-controls': string;
};
interface Props {
    isOpen?: boolean;
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
    ariaLabel?: string;
    /** `listbox` for Select-style; `menu` for actions. */
    menuRole?: 'menu' | 'listbox';
    selectedValue?: string | number | null;
    options?: Array<{
        value: string | number;
        label: string;
        disabled?: boolean;
    }>;
    onOptionClick?: (value: string | number) => void;
    trigger: Snippet<[DropdownTriggerProps]>;
    children?: Snippet;
}
declare const Dropdown: import("svelte").Component<Props, {}, "isOpen">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
