<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";

    const NAVIGATION_MENU_CONTEXT = Symbol("navigation-menu");

    interface Props {
        value?: string;
        className?: string;
        children?: Snippet;
    }

    let {
        value = "",
        className = "",
        children,
        ...restProps
    }: Props = $props();

    const context = getContext<{
        activeItem: string | null;
        setActiveItem: (item: string | null) => void;
    }>(NAVIGATION_MENU_CONTEXT);

    const isActive = $derived(context?.activeItem === value);
</script>

<li
    class="relative {className}"
    role="none"
    data-navigation-menu-item
    data-active={isActive}
    {...restProps}
>
    {@render children?.()}
</li>
