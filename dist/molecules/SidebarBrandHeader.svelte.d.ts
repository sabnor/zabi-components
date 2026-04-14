/**
 * Optional product mark + wordmark for sidebar shells (e.g. Daybridge-style rails).
 */
interface Props {
    /** When true, only the logo (or monogram) is shown. */
    collapsed?: boolean;
    /** Product or company name beside the logo. */
    brandName?: string;
    /** Optional logo image URL. */
    logoSrc?: string;
    /** Accessible name for the logo image. */
    logoAlt?: string;
    className?: string;
}
declare const SidebarBrandHeader: import("svelte").Component<Props, {}, "">;
type SidebarBrandHeader = ReturnType<typeof SidebarBrandHeader>;
export default SidebarBrandHeader;
