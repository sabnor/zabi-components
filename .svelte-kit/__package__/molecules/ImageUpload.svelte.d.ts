interface Props {
    value?: string | null;
    disabled?: boolean;
    accept?: string;
    placeholder?: string;
    onchange?: (event: Event) => void;
    onclick?: (event: Event) => void;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const ImageUpload: import("svelte").Component<$$ComponentProps, {}, "">;
type ImageUpload = ReturnType<typeof ImageUpload>;
export default ImageUpload;
