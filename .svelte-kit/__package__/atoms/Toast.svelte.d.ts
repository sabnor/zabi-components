interface Props {
    message?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    closable?: boolean;
    onclick?: (event: Event) => void;
    class?: string;
    /**
     * `viewport` — fixed corner toast for transient feedback.
     * `inline` — block-level; `w-full` up to max width (use inside a sized parent for demos).
     */
    layout?: 'viewport' | 'inline';
}
declare const Toast: import("svelte").Component<Props, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
