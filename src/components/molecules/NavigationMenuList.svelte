<script lang="ts">
    import type { Snippet } from "svelte";

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
    const className = $derived(`${classAttr} ${legacyClass}`.trim());
</script>

<ul
    class="flex flex-row items-center gap-1 list-none m-0 p-0 {className}"
    role="menubar"
    aria-orientation="horizontal"
    data-navigation-menu-list
    {...restProps}
>
    {@render children?.()}
</ul>
