interface Props {
    fallback?: any;
    component?: any;
    props?: Record<string, any>;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const SSRSafe: import("svelte").Component<$$ComponentProps, {}, "">;
type SSRSafe = ReturnType<typeof SSRSafe>;
export default SSRSafe;
