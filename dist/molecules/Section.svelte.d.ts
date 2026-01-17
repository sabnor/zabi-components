import type { Snippet } from "svelte";
import type { SizeVariant } from "../../types/variants.js";
interface Props {
    /** Section title */
    title?: string;
    /** Section description/subtitle */
    description?: string;
    /** Heading level for title (1-6) */
    headingLevel?: number;
    /** Section size variant */
    size?: SizeVariant;
    /** Maximum width of the section container */
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
    /** Background variant */
    background?: "default" | "muted" | "accent" | "transparent";
    /** Padding variant */
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    /** Whether to center the content */
    centered?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Section content */
    children?: Snippet;
}
declare const Section: import("svelte").Component<Props, {}, "">;
type Section = ReturnType<typeof Section>;
export default Section;
