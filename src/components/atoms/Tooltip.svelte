<script lang="ts">
    export let content: string = "";
    export let placement: "top" | "bottom" | "left" | "right" = "top";
</script>

<div
    class="tooltip-container group relative inline-block"
    data-placement={placement}
    {...$$restProps}
>
    <slot />

    {#if content}
        <div
            class="tooltip group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"
        >
            {content}
        </div>
    {/if}
</div>

<style>
    .tooltip-container {
        position: relative;
        display: inline-block;
    }

    .tooltip {
        position: absolute;
        z-index: 50;
        padding: 0.5rem 0.75rem;
        background-color: #1f2937;
        color: white;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition:
            opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out;
        pointer-events: none;
        max-width: 200px;
        word-wrap: break-word;
        white-space: normal;
    }

    /* Top placement */
    .tooltip-container[data-placement="top"] .tooltip {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 0.5rem;
    }

    /* Bottom placement */
    .tooltip-container[data-placement="bottom"] .tooltip {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 0.5rem;
    }

    /* Left placement */
    .tooltip-container[data-placement="left"] .tooltip {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 0.5rem;
    }

    /* Right placement */
    .tooltip-container[data-placement="right"] .tooltip {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 0.5rem;
    }

    /* Arrow styles using CSS pseudo-elements */
    .tooltip::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border: 4px solid transparent;
    }

    /* Top arrow */
    .tooltip-container[data-placement="top"] .tooltip::before {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: #1f2937;
    }

    /* Bottom arrow */
    .tooltip-container[data-placement="bottom"] .tooltip::before {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-color: #1f2937;
    }

    /* Left arrow */
    .tooltip-container[data-placement="left"] .tooltip::before {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-left-color: #1f2937;
    }

    /* Right arrow */
    .tooltip-container[data-placement="right"] .tooltip::before {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-right-color: #1f2937;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .tooltip {
            max-width: calc(100vw - 2rem);
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            margin: 0.5rem 0 !important;
        }

        .tooltip::before {
            display: none;
        }
    }
</style>
