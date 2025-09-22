<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { slide, fade } from "svelte/transition";
    import { X } from "@lucide/svelte";

    export let isOpen: boolean = false;
    export let title: string = "";
    export let maxHeight: string = "80vh";
    export let zIndex: number = 50;

    const dispatch = createEventDispatcher();
    let slideUpElement: HTMLDivElement;
    let backdropElement: HTMLDivElement;

    // Handle clicks outside slideup
    function handleBackdropClick(event: MouseEvent) {
        if (isOpen && backdropElement && event.target === backdropElement) {
            dispatch("close");
        }
    }

    // Handle escape key
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isOpen) {
            dispatch("close");
        }
    }

    // Prevent body scroll when slideup is open
    function toggleBodyScroll(open: boolean) {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    onMount(() => {
        document.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            // Ensure body scroll is restored on unmount
            document.body.style.overflow = "";
        };
    });

    // Toggle body scroll when isOpen changes
    $: toggleBodyScroll(isOpen);
</script>

<!-- Backdrop -->
{#if isOpen}
    <div
        bind:this={backdropElement}
        class="fixed inset-0 z-{zIndex} bg-black/50"
        on:click={handleBackdropClick}
        on:keydown={(e) => e.key === "Escape" && handleBackdropClick(e as any)}
        transition:fade={{ duration: 200 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="slideup-title"
        tabindex="-1"
    ></div>
{/if}

<!-- SlideUp Content -->
{#if isOpen}
    <div
        bind:this={slideUpElement}
        class="fixed bottom-0 left-0 right-0 z-{zIndex +
            1} bg-stone-800 border-t border-stone-700 rounded-t-xl shadow-2xl"
        style="max-height: {maxHeight};"
        transition:slide={{ axis: "y", duration: 300 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="slideup-title"
    >
        <!-- Header -->
        {#if title}
            <div
                class="flex items-center justify-between p-4 border-b border-stone-700"
            >
                <h3 id="slideup-title" class="text-lg font-semibold text-white">
                    {title}
                </h3>
                <button
                    type="button"
                    class="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                    on:click={() => dispatch("close")}
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
            </div>
        {/if}

        <!-- Content -->
        <div class="max-h-full overflow-y-auto">
            <slot />
        </div>
    </div>
{/if}
