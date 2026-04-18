type Orientation = 'horizontal' | 'vertical';
interface Props {
    orientation?: Orientation;
    label?: string;
    inset?: boolean;
    class?: string;
    labelClass?: string;
    /** Decorative: omit `role="separator"` so SR does not announce a split. */
    decorative?: boolean;
}
declare const Divider: import("svelte").Component<Props, {}, "">;
type Divider = ReturnType<typeof Divider>;
export default Divider;
