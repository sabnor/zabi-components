<script lang="ts">
    import type { Snippet } from "svelte";
    import { getContext } from "svelte";
    import {
        NAVIGATION_MENU_CONTEXT_KEY,
        type NavigationMenuContextValue,
    } from "./navigation-menu-context.js";

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

    const context = getContext<NavigationMenuContextValue>(
        NAVIGATION_MENU_CONTEXT_KEY,
    );

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
