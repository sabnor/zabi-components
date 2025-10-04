<script lang="ts">
    import { onMount } from "svelte";

    export let size: "sm" | "md" | "lg" = "md";
    export let variant: "default" | "minimal" | "outline" = "default";

    let isDark = false;

    const sizeClasses = {
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
    };

    const variantClasses = {
        default:
            "bg-surface hover:bg-surface-hover border border-border shadow-adaptive-sm",
        minimal: "bg-transparent hover:bg-surface-hover",
        outline: "bg-transparent border border-border hover:bg-surface-hover",
    };

    onMount(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;

        isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
        updateTheme();
    });

    function toggleTheme() {
        isDark = !isDark;
        updateTheme();
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    function updateTheme() {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }
</script>

<button
    on:click={toggleTheme}
    class="
		{sizeClasses[size]} 
		{variantClasses[variant]}
		rounded-lg
		transition-all
		duration-200
		flex
		items-center
		justify-center
		text-text
		hover:text-text
		focus:outline-none
		focus:ring-2
		focus:ring-focus-ring
		focus:ring-offset-2
		focus:ring-offset-focus-ring-offset
	"
    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
>
    {#if isDark}
        <!-- Sun icon for light mode -->
        <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
        </svg>
    {:else}
        <!-- Moon icon for dark mode -->
        <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
        </svg>
    {/if}
</button>
