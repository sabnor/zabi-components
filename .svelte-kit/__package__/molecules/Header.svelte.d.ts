import type { ComponentCategory } from "../../types/page.types";
interface Props {
    title: string;
    description: string;
    category: ComponentCategory;
    variantsStates?: string[];
}
declare const Header: import("svelte").Component<Props, {}, "">;
type Header = ReturnType<typeof Header>;
export default Header;
