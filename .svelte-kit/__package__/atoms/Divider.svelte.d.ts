type Orientation = 'horizontal' | 'vertical';
interface Props {
    orientation?: Orientation;
    label?: string;
    inset?: boolean;
    class?: string;
    labelClass?: string;
    /** When true, separator is decorative only (no role=separator). */
    decorative?: boolean;
}
declare const Divider: import("svelte").Component<Props, {}, "">;
type Divider = ReturnType<typeof Divider>;
export default Divider;
