import type { Snippet } from "svelte";
import type { SizeVariant } from "../types/variants.js";
interface Props {
    title?: string;
    description?: string;
    /** Title heading level (1–6). */
    headingLevel?: number;
    size?: SizeVariant;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
    background?: "default" | "muted" | "accent" | "transparent";
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    centered?: boolean;
    className?: string;
    children?: Snippet;
}
declare const Section: import("svelte").Component<Props, {}, "">;
type Section = ReturnType<typeof Section>;
export default Section;
