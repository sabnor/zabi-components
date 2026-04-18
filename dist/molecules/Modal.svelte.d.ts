type Size = 'sm' | 'md' | 'lg';
interface Props {
    isOpen?: boolean;
    title?: string;
    description?: string;
    size?: Size;
    onclick?: (event: Event) => void;
    onkeydown?: (event: Event) => void;
    /** On the `role="dialog"` root (testing, analytics). */
    "data-testid"?: string;
}
type $$ComponentProps = Props & {
    children?: any;
    footer?: any;
};
declare const Modal: import("svelte").Component<$$ComponentProps, {}, "isOpen">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
