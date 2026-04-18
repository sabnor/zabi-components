import type { ComponentProp } from "../types/page.types";
interface Props {
    props: ComponentProp[];
    caption?: string;
}
declare const PropsTable: import("svelte").Component<Props, {}, "">;
type PropsTable = ReturnType<typeof PropsTable>;
export default PropsTable;
