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

<!-- A list of links and disclosure buttons inside the `<nav>`, which is what
the WAI-ARIA practices recommend for site navigation. It was `role="menubar"`,
which promises arrow keys between the items and `menuitem` children; it had
neither, so a screen reader announced a menu bar that did not behave like one.
`role="list"` restates what `list-none` makes Safari forget.

`flex-wrap`: a list that does not fit goes onto a further row. It used
to run out of its container (310px of items in a 215px box at 375px). -->
<ul
    class={cn("flex flex-row flex-wrap items-center gap-1 list-none m-0 p-0", className)}
    role="list"
    data-navigation-menu-list
    {...restProps}
>
    {@render children?.()}
</ul>
