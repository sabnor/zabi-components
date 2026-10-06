<script lang="ts">
    import type { Snippet } from "svelte";
    import {
        mergeZabiStrings,
        outerZabiStrings,
        provideZabiStrings,
        type ZabiStrings,
    } from "../util/zabi-strings.js";

    /**
     * Sets the library's own words for everything inside it: put it around
     * the app, once, with the texts in the app's language.
     *
     * ```svelte
     * <ZabiStringsProvider strings={{
     *     common: { close: "Stäng", back: "Tillbaka" },
     *     select: { placeholder: "Välj", searchPlaceholder: "Sök" },
     * }}>
     *     {@render children()}
     * </ZabiStringsProvider>
     * ```
     *
     * Each component still takes its own `strings` and single-text props,
     * and those win. A provider inside another replaces only the words it
     * gives. It renders nothing of its own: no element is added to the page.
     */
    interface Props {
        /** One entry per component, and `common` for the words many share. See `ZabiStrings`. */
        strings?: ZabiStrings;
        children?: Snippet;
    }

    let { strings, children }: Props = $props();

    const outer = outerZabiStrings();
    const merged = $derived(mergeZabiStrings(outer?.current, strings));

    provideZabiStrings({
        get current() {
            return merged;
        },
    });
</script>

{@render children?.()}
