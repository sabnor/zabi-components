<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        className?: string;
        children?: Snippet;
    }

    let {
        className = "",
        children,
        ...restProps
    }: Props = $props();
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
