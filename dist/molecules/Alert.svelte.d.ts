interface Props {
    variant?: "info" | "success" | "warning" | "error" | "neutral" | "energetic";
    title?: string;
    message?: string;
    closable?: boolean;
    className?: string;
    onclick?: (event: Event) => void;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const Alert: import("svelte").Component<$$ComponentProps, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
