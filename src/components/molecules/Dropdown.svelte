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
    } = $props<Props & { children?: any; trigger?: any }>();
</script>

<div
    class="dropdown-container group relative inline-block"
    data-placement={placement}
>
    {@render trigger?.()}

    {#if isOpen}
        <div
            class="dropdown-content group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"
        >
            {@render children?.()}
        </div>
    {/if}
</div>

<style>
    .dropdown-container {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        position: absolute;
        z-index: 50;
        background-color: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        min-width: 12rem;
        opacity: 0;
        visibility: hidden;
        transition:
            opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out,
            transform 0.2s ease-in-out;
    }

    /* Positioning based on data-placement */
    .dropdown-container[data-placement="bottom-start"] .dropdown-content {
        top: calc(100% + 8px);
        left: 0;
        transform: translateY(4px);
    }

    .dropdown-container[data-placement="bottom-end"] .dropdown-content {
        top: calc(100% + 8px);
        right: 0;
        transform: translateY(4px);
    }

    .dropdown-container[data-placement="top-start"] .dropdown-content {
        bottom: calc(100% + 8px);
        left: 0;
        transform: translateY(-4px);
    }

    .dropdown-container[data-placement="top-end"] .dropdown-content {
        bottom: calc(100% + 8px);
        right: 0;
        transform: translateY(-4px);
    }

    /* Show on hover/focus */
    .dropdown-container:hover .dropdown-content,
    .dropdown-container:focus-within .dropdown-content {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    /* Arrow styling */
    .dropdown-content::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px;
        border-color: transparent;
    }

    .dropdown-container[data-placement="bottom-start"]
        .dropdown-content::before,
    .dropdown-container[data-placement="bottom-end"] .dropdown-content::before {
        top: -6px;
        border-bottom-color: white;
    }

    .dropdown-container[data-placement="top-start"] .dropdown-content::before,
    .dropdown-container[data-placement="top-end"] .dropdown-content::before {
        bottom: -6px;
        border-top-color: white;
    }

    .dropdown-container[data-placement="bottom-start"]
        .dropdown-content::before {
        left: 1rem;
    }

    .dropdown-container[data-placement="bottom-end"] .dropdown-content::before {
        right: 1rem;
    }

    .dropdown-container[data-placement="top-start"] .dropdown-content::before {
        left: 1rem;
    }

    .dropdown-container[data-placement="top-end"] .dropdown-content::before {
        right: 1rem;
    }
</style>
