import type { Snippet } from "svelte";
interface Props {
    children?: Snippet;
    className?: string;
}
declare const Page: import("svelte").Component<Props, {}, "">;
type Page = ReturnType<typeof Page>;
export default Page;
