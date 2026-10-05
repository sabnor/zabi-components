<script lang="ts">
    import Dropdown from "../../components/molecules/Dropdown.svelte";
    import Check from "@lucide/svelte/icons/check";
    import Palette from "@lucide/svelte/icons/palette";
    import {
        ACCENTS,
        applyAccent,
        watchDarkMode,
        type Accent,
    } from "./brand-accents";
    import { brand, isAccent } from "./brand-state.svelte";

    /**
     * Site-wide accent switcher for the marketing header.
     *
     * The RebrandDemo on the landing page scopes an accent to one card to show
     * that components read tokens rather than hardcoding colour. This does the
     * same thing to the whole document, so the claim is testable on every page
     * rather than inside a single specimen. Both read the same map from
     * `brand-accents.ts`.
     *
     * Not persisted: the choice lives in `brand-state.svelte.ts`, so it
     * survives client-side navigation and is shared with the mobile-menu copy
     * of this component and the theming page. A reload returns to Iris, which
     * is what a first-time visitor sees, unless the address says otherwise:
     * `?brand=amber` opens any page in that brand.
     */

    let isDark = $state(false);
    let isOpen = $state(false);

    /**
     * Which edge of the trigger the menu lines up with.
     *
     * From `lg` up the top bar puts this control at its right edge, where a
     * menu opening to the right (the Dropdown default) ran past the viewport
     * and widened the document. Below `lg` TopNavbar renders it again at the
     * left edge of the phone menu, where a menu opening to the left would be
     * cut off instead. Same breakpoint as the site header's `collapseAt="lg"`
     * in src/routes/+layout.svelte; change them together.
     */
    let atEndOfBar = $state(true);

    $effect(() => {
        const wide = window.matchMedia?.("(min-width: 64rem)");
        if (!wide) return;
        const sync = () => (atEndOfBar = wide.matches);
        sync();
        wide.addEventListener("change", sync);
        return () => wide.removeEventListener("change", sync);
    });

    const accent = $derived(brand.accent);
    const current = $derived(
        ACCENTS.find((item) => item.id === accent) ?? ACCENTS[0],
    );

    $effect(() => {
        const requested = new URLSearchParams(window.location.search).get("brand");
        if (isAccent(requested)) brand.accent = requested;
    });

    $effect(() => watchDarkMode((dark) => (isDark = dark)));

    $effect(() => {
        applyAccent(document.documentElement, accent, isDark);
    });

    function selectAccent(value: Accent) {
        brand.accent = value;
        isOpen = false;
    }
</script>

<Dropdown
    bind:isOpen
    ariaLabel="Brand accent"
    menuRole="menu"
    placement={atEndOfBar ? "bottom-end" : "bottom-start"}
>
    {#snippet trigger(props)}
        <button
            type="button"
            class="focus-ring relative inline-flex h-10 cursor-pointer items-center gap-2 rounded-control border border-border px-3 text-sm font-medium text-body transition-colors before:absolute before:inset-x-0 before:-inset-y-1 hover:bg-surface-hover hover:text-headline"
            onclick={() => (isOpen = !isOpen)}
            {...props}
        >
            <Palette size={16} aria-hidden="true" />
            <span
                class="size-3 shrink-0 rounded-pill border border-border"
                style="background: {current.swatch}"
                aria-hidden="true"
            ></span>
            <span class="sr-only">Brand accent:</span>
            <!-- Below lg the top bar has no room to spare, so the name is kept
            for screen readers and the swatch carries it visually. -->
            <span class="sr-only lg:not-sr-only">{current.label}</span>
        </button>
    {/snippet}

    {#snippet children()}
        {#each ACCENTS as item (item.id)}
            <button
                type="button"
                role="menuitemradio"
                aria-checked={item.id === accent}
                class="focus-ring flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left text-sm text-body transition-colors hover:bg-surface-hover hover:text-headline"
                onclick={() => selectAccent(item.id)}
            >
                <span
                    class="size-4 shrink-0 rounded-pill border border-border"
                    style="background: {item.swatch}"
                    aria-hidden="true"
                ></span>
                <span class="flex-1">{item.label}</span>
                {#if item.id === accent}
                    <Check size={16} aria-hidden="true" class="text-action-primary" />
                {/if}
            </button>
        {/each}
    {/snippet}
</Dropdown>
