<script lang="ts">
    import { onMount } from "svelte";
    import { safeLocalStorage, safeDocument } from "../../routes/lib/ssr-safe";

    interface Props {
        isDark?: boolean;
        onclick?: (event: Event) => void;
    }

    let { isDark = false, ...restProps }: Props = $props();

    let mounted = $state(false);

    onMount(() => {
        mounted = true;
        // Check for saved theme preference or default to light mode
        const storage = safeLocalStorage();
        if (storage) {
            const savedTheme = storage.getItem("theme");
            let prefersDark = false;

            // Only check media query when mounted and in browser
            if (mounted && typeof window !== "undefined" && window.matchMedia) {
                try {
                    prefersDark = window.matchMedia(
                        "(prefers-color-scheme: dark)",
                    ).matches;
                } catch (e) {
                    // Fallback if matchMedia fails
                    prefersDark = false;
                }
            }

            isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
            updateTheme();
        }
    });

    function toggleTheme(event: Event) {
        isDark = !isDark;
        updateTheme();
        const storage = safeLocalStorage();
        if (mounted && storage) {
            storage.setItem("theme", isDark ? "dark" : "light");
        }
    }

    function updateTheme() {
        const doc = safeDocument();
        if (mounted && doc) {
            if (isDark) {
                doc.documentElement.classList.add("dark");
            } else {
                doc.documentElement.classList.remove("dark");
            }
        }
    }
</script>

{#if mounted}
    <button
        onclick={toggleTheme}
        class="w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        {...restProps}
    >
        {#if isDark}
            <span class="text-lg">☀️</span>
        {:else}
            <span class="text-lg">🌙</span>
        {/if}
    </button>
{:else}
    <!-- SSR fallback -->
    <button
        class="w-10 h-10 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700"
        aria-label="Theme toggle"
        {...restProps}
    >
        <span class="text-lg">🌙</span>
    </button>
{/if}
