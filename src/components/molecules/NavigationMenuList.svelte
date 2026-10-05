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

<!-- `flex-wrap`: a list that does not fit goes onto a further row. It used
to run out of its container (310px of items in a 215px box at 375px). -->
<ul
    class={cn("flex flex-row flex-wrap items-center gap-1 list-none m-0 p-0", className)}
    role="menubar"
    aria-orientation="horizontal"
    data-navigation-menu-list
    {...restProps}
>
    {@render children?.()}
</ul>
