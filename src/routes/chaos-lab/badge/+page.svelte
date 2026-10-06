<script lang="ts">
    import Badge from "../../../components/atoms/Badge.svelte";

    /**
     * Badges for playwright/badge.spec.ts: one-line badges at each size, whose
     * height must not move, and a long label beside a flexible name, which
     * has to wrap instead of making the page wider than a phone.
     */
    const sizes = ["sm", "md", "lg"] as const;
</script>

<svelte:head>
    <title>Badge lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="space-y-6 p-4">
    <h1 class="text-lg font-semibold text-headline">Badge lab</h1>

    <section class="flex flex-wrap items-center gap-2" data-lab="one-line">
        {#each sizes as size (size)}
            <Badge {size} text="Bekräftad" data-testid="badge-{size}" />
            <Badge {size} variant="success" showIcon text="Klar" data-testid="badge-{size}-icon" />
            <Badge {size} variant="accent" emphasis="solid" text="Ny" data-testid="badge-{size}-solid" />
        {/each}
    </section>

    <!-- As the app has it: a name that takes the room there is, and a status beside it. -->
    <section class="space-y-3" data-lab="row">
        {#each sizes as size (size)}
            <div class="flex items-center gap-2" data-testid="row-{size}">
                <span class="min-w-0 flex-1 truncate text-sm font-medium text-headline">Quizkväll på The Crown</span>
                <Badge {size} variant="warning" showIcon text="Väntar på bekräftelse från gruppen" data-testid="long-{size}" />
            </div>
        {/each}
        <div data-testid="alone">
            <Badge variant="info" text="Väntar på bekräftelse från gruppen och på att alla har svarat" data-testid="long-alone" />
        </div>
        <div style="width: 6rem" data-testid="narrow">
            <Badge text="Oöverträffadbekräftelsehantering" data-testid="long-word" />
        </div>
    </section>

    <!-- What a badge was before, written out by hand: a fixed height and no
    wrapping. It is clipped here so it cannot widen this page; the test reads
    how far it reaches past its row, to show what it is guarding against. -->
    <section class="overflow-hidden" data-lab="before">
        <div class="flex items-center gap-2" data-testid="row-before">
            <span class="min-w-0 flex-1 truncate text-sm font-medium text-headline">Quizkväll på The Crown</span>
            <span
                class="inline-flex h-6 items-center justify-center gap-1 rounded-pill border border-warning-border bg-warning-subtle px-2 text-xs font-medium whitespace-nowrap text-warning-text"
                data-testid="long-before"
            >
                Väntar på bekräftelse från gruppen
            </span>
        </div>
    </section>
</main>
