interface Props {
    isOpen?: boolean;
    title?: string;
    onclick?: (event: Event) => void;
    onkeydown?: (event: Event) => void;
}
type $$ComponentProps = Props & {
    children?: any;
    footer?: any;
};
declare const Modal: import("svelte").Component<$$ComponentProps, {}, "">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
