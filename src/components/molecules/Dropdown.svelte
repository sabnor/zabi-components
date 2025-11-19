<script lang="ts">
    interface Props {
        isOpen?: boolean;
        placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
    }

    let {
        isOpen = false,
        placement = "bottom-start",
        children,
        trigger,
        ...restProps
    }: Props & { children?: any; trigger?: any } = $props();

    const placementClasses = $derived(() => {
        const base = "absolute z-dropdown min-w-[12rem]";
        const positioning = {
            "bottom-start": "top-full left-0 mt-2",
            "bottom-end": "top-full right-0 mt-2",
            "top-start": "bottom-full left-0 mb-2",
            "top-end": "bottom-full right-0 mb-2",
        };
        return `${base} ${positioning[placement]}`;
    });

    const transformClasses = $derived(() => {
        if (!isOpen) {
            const hiddenTransform = {
                "bottom-start": "translate-y-1",
                "bottom-end": "translate-y-1",
                "top-start": "-translate-y-1",
                "top-end": "-translate-y-1",
            };
            return `opacity-0 invisible ${hiddenTransform[placement]}`;
        }
        return "opacity-100 visible translate-y-0";
    });

    const dropdownContentClasses = $derived(() => {
        return `
            ${placementClasses()}
            bg-input
            rounded-lg
            shadow-lg
            border-0
            py-2
            transition-all
            duration-200
            ease-in-out
            ${transformClasses()}
        `
            .trim()
            .replace(/\s+/g, " ");
    });
</script>

<div class="relative inline-block" data-placement={placement}>
    {@render trigger?.()}

    {#if isOpen}
        <div class={dropdownContentClasses()}>
            {@render children?.()}
        </div>
    {/if}
</div>
