<script lang="ts">
    import { onMount } from "svelte";
    import Share2 from "@lucide/svelte/icons/share-2";
    import Star from "@lucide/svelte/icons/star";
    import IconButton from "../../../components/atoms/IconButton.svelte";
    import AppBar from "../../../components/molecules/AppBar.svelte";
    import AppShell from "../../../components/organisms/AppShell.svelte";

    /**
     * AppBar with what an app puts in it, for playwright/app-bar-title.spec.ts.
     * The query string sets the case:
     *
     * - `leading=<px>`: a chip of that width before the title (the app's group chip)
     * - `back=0`, `actions=0`: without the back control or the two actions
     * - `title=<text>`, `lines=2`
     * - `shell=1`: inside an AppShell, to see its inset follow the bar
     */
    let leadingWidth = $state(0);
    let back = $state(true);
    let actionCount = $state(2);
    let title = $state("Logga besök");
    let lines = $state<1 | 2>(1);
    let shell = $state(false);
    let ready = $state(false);

    onMount(() => {
        const query = new URLSearchParams(window.location.search);
        leadingWidth = Number(query.get("leading") ?? 0);
        back = query.get("back") !== "0";
        actionCount = Number(query.get("actions") ?? 2);
        title = query.get("title") ?? title;
        lines = query.get("lines") === "2" ? 2 : 1;
        shell = query.get("shell") === "1";
        ready = true;
    });
</script>

<svelte:head>
    <title>AppBar lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

{#snippet bar()}
    <div data-testid="lab-appbar">
        <AppBar {title} titleLines={lines} backHref={back ? "/chaos-lab" : undefined}>
            {#snippet leading()}
                {#if leadingWidth > 0}
                    <!-- Sized in px by the test: what the app's chip measured. -->
                    <span
                        data-testid="lab-chip"
                        class="inline-flex min-h-[32px] items-center rounded-pill border border-border px-[8px] text-xs text-body"
                        style="width: {leadingWidth}px; box-sizing: border-box"
                    >
                        Torsdagsgänget
                    </span>
                {/if}
            {/snippet}
            {#snippet actions()}
                {#if actionCount > 0}
                    <IconButton variant="ghost" size="lg" label="Favorit">
                        <Star size={20} />
                    </IconButton>
                {/if}
                {#if actionCount > 1}
                    <IconButton variant="ghost" size="lg" label="Dela">
                        <Share2 size={20} />
                    </IconButton>
                {/if}
            {/snippet}
        </AppBar>
    </div>
{/snippet}

{#if ready}
    {#if shell}
        <AppShell data-testid="lab-shell">
            {#snippet header()}
                {@render bar()}
            {/snippet}
            <p class="p-[16px] text-body [overflow-wrap:anywhere]">Sidans innehåll.</p>
        </AppShell>
    {:else}
        {@render bar()}
        <main class="p-[16px]">
            <p class="text-body [overflow-wrap:anywhere]">Sidans innehåll.</p>
        </main>
    {/if}
    <span data-testid="lab-hydrated" aria-hidden="true" hidden></span>
{/if}
