type Variant = "text" | "circle" | "block";
interface Props {
    /** Shape of the skeleton placeholder. */
    variant?: Variant;
    /**
     * Explicit width. Accepts any CSS length string or a pixel number.
     * When omitted, the element fills its parent (except `circle`, which
     * stays square at its default size). Pass a Tailwind `w-*` utility
     * via `class` to override using utilities instead.
     */
    width?: string | number;
    /**
     * Explicit height. Accepts any CSS length string or a pixel number.
     * When omitted, each variant uses a sensible default via utilities.
     */
    height?: string | number;
    /** Extra classes forwarded to the root element. */
    class?: string;
    /** Accessible label announced by assistive tech. */
    "aria-label"?: string;
}
declare const Skeleton: import("svelte").Component<Props, {}, "">;
type Skeleton = ReturnType<typeof Skeleton>;
export default Skeleton;
