<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import Monitor from "@lucide/svelte/icons/monitor";
    import Moon from "@lucide/svelte/icons/moon";
    import Sun from "@lucide/svelte/icons/sun";
    import SegmentedControl from "../molecules/SegmentedControl.svelte";
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { generateId } from "../util/ssr-safe.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import { markTopNavbarPlace } from "../util/top-navbar.js";
    import {
        getThemeMode,
        isThemeDark,
        setThemeMode,
        storeThemeMode,
        type ThemeMode,
        type ThemeToggleLabels,
    } from "../util/theme-mode.js";

    /**
     * What TopNavbar's phone sheet holds: the links, then a section of its own
     * with the caller's `actions` and the theme choice, at the full width of
     * the sheet. Internal to TopNavbar.
     */
    interface Props {
        /** The links: the `nav` snippet or the built-in list. Omitted when there are none. */
        links?: Snippet;
        /** Name of the `nav` around the links. */
        navLabel: string;
        actions?: Snippet;
        showThemeToggle: boolean;
        themeModes: "two" | "three";
        themeStorageKey?: string | null;
        themeLabels?: Partial<ThemeToggleLabels>;
        themeHeading: string;
        /** Every click inside, for the sheet to close on a link. */
        onclick: (event: MouseEvent) => void;
    }

    let {
        links,
        navLabel,
        actions,
        showThemeToggle,
        themeModes,
        themeStorageKey,
        themeLabels,
        themeHeading,
        onclick,
    }: Props = $props();

    // Everything drawn in here, the caller's `actions` too, reads "menu".
    markTopNavbarPlace("menu");

    /** The words of ThemeToggle's name, which are also the segments' labels here. */
    const DEFAULT_WORDS = { auto: "system", light: "light", dark: "dark" };
    const provided = zabiStringsFor("themeToggle");
    const words = $derived(mergeStrings(DEFAULT_WORDS, provided(), themeLabels));
    const sentence = (word: string) => word.charAt(0).toLocaleUpperCase() + word.slice(1);

    const options = $derived(
        themeModes === "three"
            ? [
                  { value: "auto", label: sentence(words.auto), icon: Monitor },
                  { value: "light", label: sentence(words.light), icon: Sun },
                  { value: "dark", label: sentence(words.dark), icon: Moon },
              ]
            : [
                  { value: "light", label: sentence(words.light), icon: Sun },
                  { value: "dark", label: sentence(words.dark), icon: Moon },
              ],
    );

    // The bar's own ThemeToggle stays mounted (hidden by CSS) and restores the
    // stored choice; this control reads and writes the same `<html>` attribute,
    // and follows whatever else changes it.
    let mode = $state<ThemeMode>("light");
    let dark = $state(false);
    const value = $derived(themeModes === "three" ? mode : dark ? "dark" : "light");

    function read() {
        mode = getThemeMode();
        dark = isThemeDark();
    }

    onMount(() => {
        read();
        const root = document.documentElement;
        const observer = new MutationObserver(read);
        observer.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });
        const media = window.matchMedia?.("(prefers-color-scheme: dark)");
        media?.addEventListener("change", read);
        return () => {
            observer.disconnect();
            media?.removeEventListener("change", read);
        };
    });

    /**
     * As ThemeToggle writes it: `data-theme` with three modes, for "auto" and
     * on a page that has the attribute; the `dark` class on a page that
     * switches by class.
     */
    function choose(next: string) {
        if (next !== "auto" && next !== "light" && next !== "dark") return;
        const root = document.documentElement;
        if (themeModes === "three" || next === "auto" || root.hasAttribute("data-theme")) {
            setThemeMode(next, { storageKey: themeStorageKey });
        } else {
            root.classList.toggle("dark", next === "dark");
            storeThemeMode(next, themeStorageKey);
        }
        read();
    }

    const headingId = generateId("topnavbar-theme");
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div {onclick}>
    {#if links}
        <nav aria-label={navLabel}>
            {@render links()}
        </nav>
    {/if}
    {#if actions || showThemeToggle}
        <div class="mt-4 flex flex-col gap-4 border-t border-border-weak pt-4" data-topnavbar-sheet-section>
            {#if actions}
                <div class="flex flex-col items-stretch gap-2 empty:hidden" data-topnavbar-actions>{@render actions()}</div>
            {/if}
            {#if showThemeToggle}
                <div class="flex flex-col gap-2">
                    <p id={headingId} class="text-sm font-medium text-headline">{themeHeading}</p>
                    <SegmentedControl
                        {options}
                        {value}
                        size="lg"
                        aria-labelledby={headingId}
                        onchange={choose}
                    />
                </div>
            {/if}
        </div>
    {/if}
</div>
