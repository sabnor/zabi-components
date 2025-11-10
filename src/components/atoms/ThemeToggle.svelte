<script lang="ts">
    import { onMount } from "svelte";
    import { Sun, Moon } from "@lucide/svelte";
    
    // SSR-safe utilities
    function safeLocalStorage(): Storage | undefined {
        return typeof window !== "undefined" ? localStorage : undefined;
    }

    function safeDocument(): Document | undefined {
        return typeof window !== "undefined" ? document : undefined;
    }

    interface Props {
        size?: "sm" | "md" | "lg";
        variant?: "default" | "ghost" | "outline";
        onclick?: (event: Event) => void;
    }

    let { 
        size = "md",
        variant = "default",
        ...restProps 
    }: Props = $props();

    let isDark = $state(false);
    let mounted = $state(false);

    onMount(() => {
        mounted = true;
        // Check for saved theme preference or default to light mode
        const storage = safeLocalStorage();
        if (storage) {
            const savedTheme = storage.getItem("theme");
            let prefersDark = false;

            if (window.matchMedia) {
                try {
                    prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                } catch (e) {
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
        
        if (onclick) {
            (onclick as (event: Event) => void)(event);
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

    // Size classes matching M3 design
    const sizeClass = $derived(() => {
        if (size === "sm") {
            return {
                button: "w-8 h-8",
                icon: 16
            };
        } else if (size === "lg") {
            return {
                button: "w-12 h-12",
                icon: 24
            };
        } else {
            // default md
            return {
                button: "w-10 h-10",
                icon: 20
            };
        }
    });

    // Variant classes using semantic colors
    const variantClass = $derived(() => {
        if (variant === "ghost") {
            return "bg-transparent hover:bg-surface-hover border-0";
        } else if (variant === "outline") {
            return "bg-surface-elevated hover:bg-surface-hover border border-border";
        } else {
            // default
            return "bg-surface-elevated hover:bg-surface-hover border-0";
        }
    });

    const buttonClasses = $derived(() => {
        const sizeStyles = sizeClass();
        return `
            ${sizeStyles.button}
            ${variantClass()}
            rounded-lg
            flex
            items-center
            justify-center
            text-label
            cursor-pointer
            transition-colors
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-brand-500
            focus:ring-offset-2
            focus:ring-offset-surface
        `.trim().replace(/\s+/g, " ");
    });
</script>

{#if mounted}
    <button
        onclick={toggleTheme}
        class={buttonClasses()}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        type="button"
        {...restProps}
    >
        {#if isDark}
            <Moon size={sizeClass().icon} class="text-label" />
        {:else}
            <Sun size={sizeClass().icon} class="text-label" />
        {/if}
    </button>
{:else}
    <!-- SSR fallback -->
    <button
        class="w-10 h-10 bg-surface-elevated rounded-lg flex items-center justify-center text-label cursor-pointer"
        aria-label="Theme toggle"
        type="button"
        {...restProps}
    >
        <Sun size={20} class="text-label" />
    </button>
{/if}
