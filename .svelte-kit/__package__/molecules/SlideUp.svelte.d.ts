interface Props {
    isOpen?: boolean;
    title?: string;
    onclick?: (event: Event) => void;
    onkeydown?: (event: Event) => void;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const SlideUp: import("svelte").Component<$$ComponentProps, {}, "isOpen">;
type SlideUp = ReturnType<typeof SlideUp>;
export default SlideUp;
