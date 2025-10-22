interface Props {
    message?: string;
    type?: "success" | "error" | "warning" | "info";
    closable?: boolean;
    onclick?: (event: Event) => void;
}
declare const Toast: import("svelte").Component<Props, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
