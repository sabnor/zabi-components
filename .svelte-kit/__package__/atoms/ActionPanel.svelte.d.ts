import type { ExtendedSemanticVariant } from "../types/variants.js";
interface Props {
    title: string;
    description: string;
    href?: string;
    onclick?: (event: MouseEvent) => void | Promise<void>;
    disabled?: boolean;
    loading?: boolean;
    badgeText?: string;
    badgeVariant?: ExtendedSemanticVariant;
    /** Overrides the default accessible name for the clickable region. */
    ariaLabel?: string;
    className?: string;
    target?: HTMLAnchorElement["target"];
    rel?: string;
}
declare const ActionPanel: import("svelte").Component<Props, {}, "">;
type ActionPanel = ReturnType<typeof ActionPanel>;
export default ActionPanel;
