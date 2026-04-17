<script lang="ts">
    import { onMount } from "svelte";
    import { Sun, Moon } from "@lucide/svelte";
    import { FOCUS_BRAND_CLASS } from "../../routes/lib/focus-utils.js";
    
    function safeLocalStorage(): Storage | undefined {
        return typeof window !== "undefined" ? localStorage : undefined;
    }

    function safeDocument(): Document | undefined {
        return typeof window !== "undefined" ? document : undefined;
    }

    interface Props {
        size?: "sm" | "md" | "lg";
        variant?: "default" | "ghost" | "outline";
        disabled?: boolean;
        onclick?: (event: Event) => void;
    }

    let {
        size = "md",
        variant = "default",
        disabled = false,
        ...restProps
    }: Props = $props();

    let isDark = $state(false);
    let mounted = $state(false);

    onMount(() => {
        mounted = true;
        const doc = safeDocument();
        if (doc) {
            isDark = doc.documentElement.classList.contains("dark");
        }

        if (!window.matchMedia) return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemChange = (event: MediaQueryListEvent) => {
            const storage = safeLocalStorage();
            if (storage && storage.getItem("theme")) return;
            isDark = event.matches;
            updateTheme();
        };

        media.addEventListener("change", handleSystemChange);
        return () => media.removeEventListener("change", handleSystemChange);
    });

    function toggleTheme(event: Event) {
        if (disabled) return;
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
                doc.documentElement.style.colorScheme = "dark";
            } else {
                doc.documentElement.classList.remove("dark");
                doc.documentElement.style.colorScheme = "light";
            }
        }
    }

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
            return {
                button: "w-10 h-10",
                icon: 20
            };
        }
    });

    const variantClass = $derived(() => {
        if (variant === "ghost") {
            return "bg-transparent hover:bg-base-100 active:bg-base-200 border-0";
        } else if (variant === "outline") {
            return "bg-base-50 hover:bg-base-100 active:bg-base-200 border border-border";
        } else {
            return "bg-base-50 hover:bg-base-100 active:bg-base-200 border-0";
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
            active:scale-[0.96]
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:active:scale-100
            disabled:hover:bg-base-50
            ${FOCUS_BRAND_CLASS}
        `.trim().replace(/\s+/g, " ");
    });
</script>

{#if mounted}
    <button
        onclick={toggleTheme}
        class={buttonClasses()}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        type="button"
        {disabled}
        {...restProps}
    >
        {#if isDark}
            <Moon size={sizeClass().icon} class="text-label" />
        {:else}
            <Sun size={sizeClass().icon} class="text-label" />
        {/if}
    </button>
{:else}
    <button
        class="w-10 h-10 bg-base-50 rounded-lg flex items-center justify-center text-label cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Theme toggle"
        type="button"
        {disabled}
        {...restProps}
    >
        <Sun size={20} class="text-label" />
    </button>
{/if}
