import type { ExtendedSemanticVariant } from "../../types/variants.js";
interface Props {
    /** Main title shown in the panel */
    title: string;
    /** Short supporting text shown under the title */
    description: string;
    /** When set, renders as an anchor */
    href?: string;
    /** Click handler (used when `href` is not set) */
    onclick?: (event: MouseEvent) => void | Promise<void>;
    /** Whether the panel is disabled and non-interactive */
    disabled?: boolean;
    /** Shows a trailing spinner and disables interaction while true */
    loading?: boolean;
    /** Optional badge shown on the right */
    badgeText?: string;
    /** Badge variant */
    badgeVariant?: ExtendedSemanticVariant;
    /** Accessible label override */
    ariaLabel?: string;
    /** Additional Tailwind classes */
    className?: string;
    /** Anchor target when `href` is set */
    target?: HTMLAnchorElement["target"];
    /** Anchor rel when `href` is set */
    rel?: string;
}
declare const ActionPanel: import("svelte").Component<Props, {}, "">;
type ActionPanel = ReturnType<typeof ActionPanel>;
export default ActionPanel;
