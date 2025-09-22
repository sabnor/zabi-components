<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { fly, fade } from "svelte/transition";

    export let isOpen: boolean = false;
    // The trigger element - used internally
    let trigger: any = null;
    export let placement:
        | "bottom-start"
        | "bottom-end"
        | "top-start"
        | "top-end" = "bottom-start";
    export let offset: number = 8;
    export let maxHeight: string = "20rem";
    export let width: string = "auto";
    export let zIndex: number = 50;

    const dispatch = createEventDispatcher();
    let dropdownElement: HTMLDivElement;
    let triggerElement: HTMLElement;
    let triggerRect: DOMRect;

    // Calculate dropdown position based on trigger element
    function calculatePosition() {
        if (!triggerElement) return { top: 0, left: 0 };

        triggerRect = triggerElement.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        let top = triggerRect.bottom + scrollY + offset;
        let left = triggerRect.left + scrollX;

        // Adjust based on placement
        switch (placement) {
            case "bottom-end":
                left =
                    triggerRect.right +
                    scrollX -
                    (dropdownElement?.offsetWidth || 0);
                break;
            case "top-start":
                top =
                    triggerRect.top +
                    scrollY -
                    (dropdownElement?.offsetHeight || 0) -
                    offset;
                break;
            case "top-end":
                top =
                    triggerRect.top +
                    scrollY -
                    (dropdownElement?.offsetHeight || 0) -
                    offset;
                left =
                    triggerRect.right +
                    scrollX -
                    (dropdownElement?.offsetWidth || 0);
                break;
        }

        // Keep dropdown within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left < 0) left = 8;
        if (left + (dropdownElement?.offsetWidth || 0) > viewportWidth) {
            left = viewportWidth - (dropdownElement?.offsetWidth || 0) - 8;
        }

        if (top < 0) top = 8;
        if (
            top + (dropdownElement?.offsetHeight || 0) >
            viewportHeight + scrollY
        ) {
            top =
                viewportHeight +
                scrollY -
                (dropdownElement?.offsetHeight || 0) -
                8;
        }

        return { top, left };
    }

    // Handle clicks outside dropdown
    function handleClickOutside(event: MouseEvent) {
        if (
            isOpen &&
            dropdownElement &&
            !dropdownElement.contains(event.target as Node) &&
            triggerElement &&
            !triggerElement.contains(event.target as Node)
        ) {
            dispatch("close");
        }
    }

    // Handle escape key
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isOpen) {
            dispatch("close");
        }
    }

    onMount(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeydown);
        };
    });

    // Update position when dropdown opens
    $: if (isOpen && triggerElement) {
        // Use requestAnimationFrame to ensure DOM is updated
        requestAnimationFrame(() => {
            const position = calculatePosition();
            if (dropdownElement) {
                dropdownElement.style.top = `${position.top}px`;
                dropdownElement.style.left = `${position.left}px`;
            }
        });
    }
</script>

<!-- Bind trigger element -->
<div bind:this={triggerElement}>
    <slot name="trigger" />
</div>

<!-- Dropdown content -->
{#if isOpen}
    <div
        bind:this={dropdownElement}
        class="fixed z-{zIndex} bg-stone-800 border border-stone-700 rounded-lg shadow-xl"
        style="max-height: {maxHeight}; width: {width};"
        role="menu"
        aria-orientation="vertical"
        transition:fly={{ y: -10, duration: 200 }}
    >
        <div class="max-h-full overflow-y-auto">
            <slot />
        </div>
    </div>
{/if}
