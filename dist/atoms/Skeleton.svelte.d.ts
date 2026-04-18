type Variant = "text" | "circle" | "block";
interface Props {
    variant?: Variant;
    /** CSS length or px number; omit to use variant default (circle stays square). */
    width?: string | number;
    /** CSS length or px number; omit for variant default height. */
    height?: string | number;
    class?: string;
    "aria-label"?: string;
}
declare const Skeleton: import("svelte").Component<Props, {}, "">;
type Skeleton = ReturnType<typeof Skeleton>;
export default Skeleton;
