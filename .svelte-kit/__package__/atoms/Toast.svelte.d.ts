interface Props {
    message?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    closable?: boolean;
    onclick?: (event: Event) => void;
    class?: string;
    /** `viewport`: fixed corner; `inline`: block in flow (e.g. demos). */
    layout?: 'viewport' | 'inline';
}
declare const Toast: import("svelte").Component<Props, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
