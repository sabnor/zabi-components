interface Props {
    title: string;
    description?: string;
    code: string;
    language?: string;
    className?: string;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const ComponentDemo: import("svelte").Component<$$ComponentProps, {}, "">;
type ComponentDemo = ReturnType<typeof ComponentDemo>;
export default ComponentDemo;
