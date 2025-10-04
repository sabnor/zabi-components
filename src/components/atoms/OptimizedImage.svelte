<script lang="ts">
    import { onMount } from "svelte";

    export let src: string;
    export let alt: string = "";
    export let width: number | string = "100%";
    export let height: number | string = "auto";
    export let loading: "lazy" | "eager" = "lazy";
    export let className: string = "";
    export let placeholder: string =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+";

    let loaded = false;
    let error = false;
    let inView = false;
    let imageRef: HTMLDivElement;

    onMount(() => {
        // Intersection Observer for lazy loading
        if (loading === "lazy") {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            inView = true;
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { rootMargin: "50px" },
            );

            if (imageRef) {
                observer.observe(imageRef);
            }

            return () => observer.disconnect();
        } else {
            inView = true;
        }
    });

    function handleLoad() {
        loaded = true;
    }

    function handleError() {
        error = true;
        console.warn("Failed to load image:", src);
    }
</script>

<div
    bind:this={imageRef}
    class="relative overflow-hidden {className}"
    style="width: {typeof width === 'number'
        ? width + 'px'
        : width}; height: {typeof height === 'number'
        ? height + 'px'
        : height};"
>
    <!-- Placeholder -->
    {#if !loaded && !error}
        <img
            src={placeholder}
            alt=""
            class="absolute inset-0 w-full h-full object-cover animate-pulse"
        />
    {/if}

    <!-- Actual image -->
    {#if inView && !error}
        <img
            {src}
            {alt}
            {loading}
            class="w-full h-full object-cover transition-opacity duration-300"
            style="opacity: {loaded ? 1 : 0};"
            on:load={handleLoad}
            on:error={handleError}
        />
    {/if}

    <!-- Error state -->
    {#if error}
        <div
            class="absolute inset-0 flex items-center justify-center"
            style="background-color: rgb(var(--color-surface-secondary)); color: rgb(var(--color-text-secondary));"
        >
            <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l2.586-2.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        </div>
    {/if}
</div>
