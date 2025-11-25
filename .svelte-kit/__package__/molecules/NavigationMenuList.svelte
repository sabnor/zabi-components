<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";

    const NAVIGATION_MENU_CONTEXT = Symbol("navigation-menu");

    interface Props {
        className?: string;
        children?: Snippet;
    }

    let {
        className = "",
        children,
        ...restProps
    }: Props = $props();

    const context = getContext<{
        isMobile: boolean;
    }>(NAVIGATION_MENU_CONTEXT);
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
