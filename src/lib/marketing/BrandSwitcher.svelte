<script lang="ts">
    import Dropdown from "../../components/molecules/Dropdown.svelte";
    import { Check, Palette } from "@lucide/svelte";
    import {
        ACCENTS,
        applyAccent,
        watchDarkMode,
        type Accent,
    } from "./brand-accents";

    /**
     * Site-wide accent switcher for the marketing header.
     *
     * The RebrandDemo on the landing page scopes an accent to one card to show
     * that components read tokens rather than hardcoding colour. This does the
     * same thing to the whole document, so the claim is testable on every page
     * rather than inside a single specimen. Both read the same map from
     * `brand-accents.ts`.
     *
     * Not persisted: it survives client-side navigation because the layout
     * keeps this component mounted, and a reload returns to Iris, which is what
     * a first-time visitor sees.
     */

    let accent = $state<Accent>("iris");
    let isDark = $state(false);
    let isOpen = $state(false);

    const current = $derived(
        ACCENTS.find((item) => item.id === accent) ?? ACCENTS[0],
    );

    $effect(() => watchDarkMode((dark) => (isDark = dark)));

    $effect(() => {
        applyAccent(document.documentElement, accent, isDark);
    });

    function selectAccent(value: Accent) {
        accent = value;
        isOpen = false;
    }
</script>

<Dropdown
    bind:isOpen
    ariaLabel="Brand accent"
    menuRole="menu"
>
    {#snippet trigger(props)}
        <button
            type="button"
            class="focus-ring inline-flex h-10 cursor-pointer items-center gap-2 rounded-control border border-border px-3 text-sm font-medium text-body transition-colors hover:bg-surface-hover hover:text-headline"
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
            {current.label}
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
