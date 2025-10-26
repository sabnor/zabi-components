interface Props {
    src: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const OptimizedImage: import("svelte").Component<$$ComponentProps, {}, "">;
type OptimizedImage = ReturnType<typeof OptimizedImage>;
export default OptimizedImage;
