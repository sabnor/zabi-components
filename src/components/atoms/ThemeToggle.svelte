<script lang="ts">
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import { onMount, untrack } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import Sun from "@lucide/svelte/icons/sun";
    import Moon from "@lucide/svelte/icons/moon";
    import Monitor from "@lucide/svelte/icons/monitor";
    import { FOCUS_BRAND_CLASS } from "../util/focus-utils.js";
    import { cn } from "../util/cn.js";
    import {
        DEFAULT_THEME_STORAGE_KEY,
        THEME_MODES,
        getStoredThemeMode,
        getThemeMode,
        isThemeDark,
        isThemeMode,
        setThemeMode,
        storeThemeMode,
        type ThemeMode,
        type ThemeToggleLabels,
    } from "../util/theme-mode.js";

    /** Other attributes (`data-*`, `aria-*`, `id`, ...) land on the `<button>`. */
    type Props = Omit<
        HTMLButtonAttributes,
        "class" | "disabled" | "type" | "onclick" | "children"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "ghost" | "outline";
        disabled?: boolean;
        /**
         * `"two"` (the default) flips light and dark. `"three"` steps through
         * system, light and dark, and always writes `data-theme` on `<html>`.
         */
        modes?: "two" | "three";
        /**
         * The page's mode: `"auto"` (follow the system), `"light"` or `"dark"`.
         * Bindable. It is read from `<html>` when the button mounts and follows
         * the page from then on; assigning it switches the page.
         */
        mode?: ThemeMode;
        /** Called with the new mode when a press changes it. */
        onmodechange?: (mode: ThemeMode) => void;
        /**
         * The `localStorage` key the choice is kept under and restored from when
         * the button mounts. `null` keeps nothing.
         */
        storageKey?: string | null;
        /** Replaces the texts of the accessible name, for another language. */
        labels?: Partial<ThemeToggleLabels>;
        onclick?: (event: Event) => void;
    };

    let {
        class: className = "",
        size = "md",
        variant = "default",
        disabled = false,
        modes = "two",
        mode = $bindable(),
        onmodechange,
        storageKey = DEFAULT_THEME_STORAGE_KEY,
        labels,
        onclick,
        ...restProps
    }: Props = $props();

    const DEFAULT_LABELS: ThemeToggleLabels = {
        auto: "system",
        light: "light",
        dark: "dark",
        describe: (current, next) => `Theme: ${current}. Switch to ${next}`,
        darkMode: "Dark mode",
        beforeMount: "Theme toggle",
    };
    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("themeToggle");
    const text = $derived({ ...DEFAULT_LABELS, ...provided(), ...labels });

    /** Whether the page is dark right now, whichever way it is switched. */
    let isDark = $state(false);
    /** The page's mode as last read from `<html>`. */
    let pageMode = $state<ThemeMode>("light");
    let mounted = $state(false);

    const SYSTEM_DARK = "(prefers-color-scheme: dark)";

    /** A page that carries `data-theme` on `<html>` is switched through it; any other page through the class. */
    function usesAttribute(root: HTMLElement): boolean {
        return root.hasAttribute("data-theme");
    }

    /** Reads the page into the button. The only place `mode` is set from the page. */
    function readPage() {
        isDark = isThemeDark();
        pageMode = getThemeMode();
        mode = pageMode;
    }

    /**
     * Puts the page in `next`. With three modes that is always `data-theme`.
     * With two, "auto" can only be said with the attribute, and light or dark
     * go to whichever mechanism the page uses, as they always have.
     */
    function applyMode(next: ThemeMode) {
        if (modes === "three" || next === "auto") {
            setThemeMode(next, { storageKey });
        } else {
            isDark = next === "dark";
            updateTheme();
            storeThemeMode(next, storageKey);
        }
        readPage();
    }

    onMount(() => {
        mounted = true;
        if (typeof document === "undefined") return;
        const root = document.documentElement;

        clearInlineScheme(root);

        // The choice made last time, unless a script in <head> has applied it
        // already (`themeInitScript`) or the app passed a mode of its own.
        const asked = isThemeMode(mode) ? mode : getStoredThemeMode(storageKey);
        if (asked && asked !== getThemeMode() && (modes === "three" || asked !== "auto" || usesAttribute(root))) {
            applyMode(asked);
        } else {
            readPage();
        }

        // The page can be switched by something else (another control bound to
        // the same helpers, the app's own script): the icon and the name follow.
        const observer = typeof MutationObserver === "undefined" ? undefined : new MutationObserver(readPage);
        observer?.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });

        const media = window.matchMedia?.(SYSTEM_DARK);
        const handleSystemChange = (event: MediaQueryListEvent) => {
            if (modes === "three" || usesAttribute(root)) {
                // `data-theme="auto"` follows the system in the stylesheet, and
                // "light" or "dark" is a choice: either way only the reading changes.
                readPage();
                return;
            }
            if (getStoredThemeMode(storageKey)) return;
            isDark = event.matches;
            updateTheme();
            readPage();
        };
        media?.addEventListener("change", handleSystemChange);

        return () => {
            observer?.disconnect();
            media?.removeEventListener("change", handleSystemChange);
        };
    });

    // `mode` assigned from outside (a bound value, the app's own control).
    $effect(() => {
        const wanted = mode;
        if (!mounted || !isThemeMode(wanted)) return;
        untrack(() => {
            if (wanted !== pageMode) applyMode(wanted);
        });
    });

    /** What a press leads to. */
    const nextMode = $derived<ThemeMode>(
        modes === "three"
            ? THEME_MODES[(THEME_MODES.indexOf(pageMode) + 1) % THEME_MODES.length]
            : isDark
              ? "light"
              : "dark",
    );

    /**
     * Two modes: a switch with one name, "Dark mode", and `aria-pressed` for its
     * state. The name used to flip as well ("Switch to dark mode", then "Switch
     * to light mode, pressed"), and "pressed" on "Switch to light mode" says
     * two things at once. Three modes are steps, not on and off, so there the
     * name carries the state and there is no `aria-pressed`.
     */
    const accessibleName = $derived(modes === "three" ? text.describe(text[pageMode], text[nextMode]) : text.darkMode);

    function toggleTheme(event: Event) {
        if (disabled) return;
        applyMode(nextMode);
        onmodechange?.(pageMode);
        onclick?.(event);
    }

    /** Two modes, light or dark: the attribute where the page has it, the class otherwise. */
    function updateTheme() {
        if (!mounted || typeof document === "undefined") return;
        const root = document.documentElement;
        if (usesAttribute(root)) {
            // An explicit choice, also when the page was on "auto". The theme
            // sets `color-scheme` for each value, so no inline style is written.
            root.setAttribute("data-theme", isDark ? "dark" : "light");
            // A leftover class would keep the page dark under data-theme="light".
            if (!isDark) root.classList.remove("dark");
            return;
        }
        // The class only. The theme sets `color-scheme` for it (dark under
        // `.dark`, light on the root otherwise), so no inline value is written:
        // one left behind would outrank the stylesheet, and the next time the
        // app added or removed the class itself the tokens would change and
        // the native controls would not.
        root.classList.toggle("dark", isDark);
        clearInlineScheme(root);
    }

    /**
     * Removes an inline `color-scheme` of "light" or "dark" from `<html>`: what
     * this button wrote before the theme set the scheme itself, and what a
     * start-up script copied from the old docs writes. Any other inline value
     * is the app's own and is left alone.
     */
    function clearInlineScheme(root: HTMLElement) {
        const inline = root.style.colorScheme;
        if (inline === "light" || inline === "dark") root.style.removeProperty("color-scheme");
    }

    /**
     * Before mount every icon is rendered and CSS shows one, by the selectors
     * the theme itself is switched with. Written out in full, because Tailwind
     * only generates a class it can read in the source.
     *
     * Two modes: sun on a light page, moon on a dark one (the class,
     * `data-theme="dark"`, or `data-theme="auto"` on a dark system).
     * Three modes show the mode, not the result: the monitor for
     * `data-theme="auto"` whatever the system is.
     */
    const SUN_BEFORE_MOUNT =
        "[.dark_&]:hidden [[data-theme=dark]_&]:hidden [@media(prefers-color-scheme:dark)]:[[data-theme=auto]_&]:hidden";
    const MOON_BEFORE_MOUNT =
        "hidden [.dark_&]:block [[data-theme=dark]_&]:block [@media(prefers-color-scheme:dark)]:[[data-theme=auto]_&]:block";
    const SUN_BEFORE_MOUNT_THREE = "[.dark_&]:hidden [[data-theme=dark]_&]:hidden [[data-theme=auto]_&]:hidden";
    const MOON_BEFORE_MOUNT_THREE = "hidden [.dark_&]:block [[data-theme=dark]_&]:block";
    const SYSTEM_BEFORE_MOUNT_THREE = "hidden [[data-theme=auto]_&]:block";

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
        aria-label={accessibleName}
        aria-pressed={modes === "three" ? undefined : isDark}
        data-theme-mode={modes === "three" ? pageMode : undefined}
        type="button"
        {disabled}
        {...restProps}
    >
        {#if modes === "three" && pageMode === "auto"}
            <Monitor size={sizeClass().icon} class="text-label" />
        {:else if modes === "three" ? pageMode === "dark" : isDark}
            <Moon size={sizeClass().icon} class="text-label" />
        {:else}
            <Sun size={sizeClass().icon} class="text-label" />
        {/if}
    </button>
{:else}
    <button
        class="{sizeClass().button} {variantClass()} rounded-control flex items-center justify-center text-label cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={text.beforeMount}
        type="button"
        {disabled}
        {...restProps}
    >
        <!-- Before mount there is no state to read: the server cannot know the
        theme, and hydration has not run yet. Every icon is in the markup and
        the stylesheet picks one, so a dark page never shows the Sun first:
        by the `dark` class, by `data-theme="dark"`, or by `data-theme="auto"`
        (the moon on a dark system with two modes, the monitor with three).
        The icon matches the mounted button. -->
        {#if modes === "three"}
            <Sun size={sizeClass().icon} class="text-label {SUN_BEFORE_MOUNT_THREE}" />
            <Moon size={sizeClass().icon} class="text-label {MOON_BEFORE_MOUNT_THREE}" />
            <Monitor size={sizeClass().icon} class="text-label {SYSTEM_BEFORE_MOUNT_THREE}" />
        {:else}
            <Sun size={sizeClass().icon} class="text-label {SUN_BEFORE_MOUNT}" />
            <Moon size={sizeClass().icon} class="text-label {MOON_BEFORE_MOUNT}" />
        {/if}
    </button>
{/if}
