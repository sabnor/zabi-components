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

    let triggerElement = $state<HTMLElement | null>(null);

    const context = getContext<{
        activeItem: string | null;
        setActiveItem: (item: string | null) => void;
        isMobile: boolean;
    }>(NAVIGATION_MENU_CONTEXT);

    const isActive = $derived(context?.activeItem === value);

    function handleClick() {
        if (context) {
            if (isActive) {
                context.setActiveItem(null);
            } else {
                context.setActiveItem(value);
            }
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
        } else if (event.key === "Escape" && isActive) {
            event.preventDefault();
            context?.setActiveItem(null);
        } else if (event.key === "ArrowDown" && !isActive) {
            event.preventDefault();
            handleClick();
        }
    }
</script>

<button
    bind:this={triggerElement}
    type="button"
    class="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-headline bg-transparent hover:bg-base-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 {className}"
    aria-expanded={isActive ? 'true' : 'false'}
    aria-haspopup="true"
    onclick={handleClick}
    onkeydown={handleKeydown}
    data-navigation-menu-trigger
    data-active={isActive}
    {...restProps}
>
    {@render children?.()}
    <svg
        class="ml-1 h-4 w-4 transition-transform {isActive ? 'rotate-180' : ''}"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
        />
    </svg>
</button>
