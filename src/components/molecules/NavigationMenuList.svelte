<script lang="ts">
    import type { Snippet } from "svelte";
    import { cn } from "../util/cn.js";

    interface Props {
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
        children?: Snippet;
    }

    let {
        class: classAttr = "",
        className: legacyClass = "",
        children,
        ...restProps
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));
</script>

<ul
    class={cn("flex flex-row items-center gap-1 list-none m-0 p-0", className)}
    role="menubar"
    aria-orientation="horizontal"
    data-navigation-menu-list
    {...restProps}
>
    {@render children?.()}
</ul>
