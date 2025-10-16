<script lang="ts">
    interface Props {
        isDark?: boolean;
        onclick?: (event: Event) => void;
    }

    let { isDark = false, ...restProps }: Props = $props();

    let mounted = $state(false);

    $effect(() => {
        mounted = true;
        // Check for saved theme preference or default to light mode
        if (
            mounted &&
            typeof window !== "undefined" &&
            typeof localStorage !== "undefined"
        ) {
            const savedTheme = localStorage.getItem("theme");
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches;

            isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
            updateTheme();
        }
    });

    function toggleTheme(event: Event) {
        isDark = !isDark;
        updateTheme();
        if (mounted && typeof localStorage !== "undefined") {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        }
    }

    function updateTheme() {
        if (mounted && typeof document !== "undefined") {
            if (isDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }
</script>

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
