<script lang="ts">
    import { onMount } from "svelte";
    import { Sun, Moon } from "@lucide/svelte";
    import { FOCUS_BRAND_CLASS } from "../util/focus-utils.js";
    import { cn } from "../util/cn.js";
    
    function safeLocalStorage(): Storage | undefined {
        return typeof window !== "undefined" ? localStorage : undefined;
    }

    function safeDocument(): Document | undefined {
        return typeof window !== "undefined" ? document : undefined;
    }

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "ghost" | "outline";
        disabled?: boolean;
        onclick?: (event: Event) => void;
    }

    let {
        class: className = "",
        size = "md",
        variant = "default",
        disabled = false,
        onclick,
        ...restProps
    }: Props = $props();

    let isDark = $state(false);
    let mounted = $state(false);

    const SYSTEM_DARK = "(prefers-color-scheme: dark)";

    function systemIsDark(): boolean {
        return typeof window !== "undefined" && !!window.matchMedia?.(SYSTEM_DARK).matches;
    }

    /**
     * Whether the page is dark right now, by either way the theme is switched
     * (see THEMING.md, "Light, dark and auto"). The class brings the dark
     * tokens whatever the attribute says, so it is read first.
     */
    function readMode(root: HTMLElement): boolean {
        if (root.classList.contains("dark")) return true;
        const theme = root.getAttribute("data-theme");
        if (theme === "dark") return true;
        if (theme === "auto") return systemIsDark();
        return false;
    }

    /** A page that carries `data-theme` on `<html>` is switched through it; any other page through the class. */
    function usesAttribute(root: HTMLElement): boolean {
        return root.hasAttribute("data-theme");
    }

    onMount(() => {
        mounted = true;
        const doc = safeDocument();
        if (!doc) return;
        const root = doc.documentElement;
        isDark = readMode(root);

        // The page can be switched by something else (another toggle, the
        // app's own script): the icon and the name follow what is there.
        const observer =
            typeof MutationObserver === "undefined"
                ? undefined
                : new MutationObserver(() => {
                      isDark = readMode(root);
                  });
        observer?.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });

        const media = window.matchMedia?.(SYSTEM_DARK);
        const handleSystemChange = (event: MediaQueryListEvent) => {
            if (usesAttribute(root)) {
                // `data-theme="auto"` follows the system in the stylesheet, and
                // "light" or "dark" is a choice: either way only the reading changes.
                isDark = readMode(root);
                return;
            }
            const storage = safeLocalStorage();
            if (storage && storage.getItem("theme")) return;
            isDark = event.matches;
            updateTheme();
        };
        media?.addEventListener("change", handleSystemChange);

        return () => {
            observer?.disconnect();
            media?.removeEventListener("change", handleSystemChange);
        };
    });

    function toggleTheme(event: Event) {
        if (disabled) return;
        isDark = !isDark;
        updateTheme();
        const storage = safeLocalStorage();
        if (mounted && storage) {
            storage.setItem("theme", isDark ? "dark" : "light");
        }

        onclick?.(event);
    }

    function updateTheme() {
        const doc = safeDocument();
        if (!mounted || !doc) return;
        const root = doc.documentElement;
        if (usesAttribute(root)) {
            // An explicit choice, also when the page was on "auto". The theme
            // sets `color-scheme` for each value, so no inline style is written.
            root.setAttribute("data-theme", isDark ? "dark" : "light");
            // A leftover class would keep the page dark under data-theme="light".
            if (!isDark) root.classList.remove("dark");
            return;
        }
        if (isDark) {
            root.classList.add("dark");
            root.style.colorScheme = "dark";
        } else {
            root.classList.remove("dark");
            root.style.colorScheme = "light";
        }
    }

    /**
     * Before mount both icons are rendered and CSS shows one. The three
     * variants are the three selectors the dark tokens are published under:
     * the class, `data-theme="dark"`, and `data-theme="auto"` on a dark
     * system. Written out in full, because Tailwind only generates a class it
     * can read in the source.
     */
    const SUN_BEFORE_MOUNT =
        "[.dark_&]:hidden [[data-theme=dark]_&]:hidden [@media(prefers-color-scheme:dark)]:[[data-theme=auto]_&]:hidden";
    const MOON_BEFORE_MOUNT =
        "hidden [.dark_&]:block [[data-theme=dark]_&]:block [@media(prefers-color-scheme:dark)]:[[data-theme=auto]_&]:block";

    const sizeClass = $derived(() => {
        if (size === "sm") {
            return {
                button: "w-8 h-8 pointer-coarse:min-h-11 pointer-coarse:min-w-11",
                icon: 16
            };
        } else if (size === "lg") {
            return {
                button: "w-12 h-12",
                icon: 24
            };
        } else {
            return {
                button: "w-10 h-10 pointer-coarse:min-h-11 pointer-coarse:min-w-11",
                icon: 20
            };
        }
    });

    const variantClass = $derived(() => {
        if (variant === "ghost") {
            return "bg-transparent hover:bg-surface-hover active:bg-surface-active border-0";
        } else if (variant === "outline") {
            return "bg-action-secondary hover:bg-action-secondary-hover active:bg-action-secondary-active border border-border";
        } else {
            return "bg-action-secondary hover:bg-action-secondary-hover active:bg-action-secondary-active border-0";
        }
    });

    const buttonClasses = $derived(() => {
        const sizeStyles = sizeClass();
        return cn(`
            ${sizeStyles.button}
            ${variantClass()}
            rounded-control
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
            disabled:hover:bg-action-disabled
            ${FOCUS_BRAND_CLASS}
        `).replace(/\s+/g, " ");
    });
</script>

{#if mounted}
    <button
        onclick={toggleTheme}
        class="{buttonClasses()} {className}"
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
        class="{sizeClass().button} {variantClass()} rounded-control flex items-center justify-center text-label cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Theme toggle"
        type="button"
        {disabled}
        {...restProps}
    >
        <!-- Before mount there is no state to read: the server cannot know the
        theme, and hydration has not run yet. Both icons are in the markup and
        the stylesheet picks one, so a dark page never shows the Sun first:
        by the `dark` class, by `data-theme="dark"`, or by `data-theme="auto"`
        on a dark system. The icon matches the mounted button: Moon when dark. -->
        <Sun size={sizeClass().icon} class="text-label {SUN_BEFORE_MOUNT}" />
        <Moon size={sizeClass().icon} class="text-label {MOON_BEFORE_MOUNT}" />
    </button>
{/if}
