interface Props {
    method?: "get" | "post";
    action?: string;
    className?: string;
    onsubmit?: (event: SubmitEvent) => void;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const Form: import("svelte").Component<$$ComponentProps, {}, "">;
type Form = ReturnType<typeof Form>;
export default Form;
