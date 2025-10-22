interface Props {
    tabs?: Array<{
        id: string;
        label: string;
        disabled?: boolean;
    }>;
    activeTab?: string;
    variant?: "default" | "pills";
    onclick?: (event: Event) => void;
    onkeydown?: (event: Event) => void;
}
type $$ComponentProps = Props & {
    children?: any;
};
declare const Tabs: import("svelte").Component<$$ComponentProps, {}, "">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
