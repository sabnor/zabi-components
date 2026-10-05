<script lang="ts">
    import { onMount } from "svelte";
    import Beer from "@lucide/svelte/icons/beer";
    import CalendarDays from "@lucide/svelte/icons/calendar-days";
    import ChartColumn from "@lucide/svelte/icons/chart-column";
    import House from "@lucide/svelte/icons/house";
    import Share2 from "@lucide/svelte/icons/share-2";
    import Star from "@lucide/svelte/icons/star";
    import User from "@lucide/svelte/icons/user";
    import IconButton from "../../../components/atoms/IconButton.svelte";
    import AppBar from "../../../components/molecules/AppBar.svelte";
    import BottomTabBar from "../../../components/molecules/BottomTabBar.svelte";

    /**
     * AppBar and BottomTabBar as a phone app in Swedish has them, for
     * playwright/bars-text-size.spec.ts: a title with a back control and two
     * actions, and five one-word tabs with a badge. `?title=long` gives the
     * bar a title that cannot fit; `?badge=120` a count past the maximum.
     */
    const five = (badge: number) => [
        { href: "/chaos-lab/bars", label: "Hem", icon: House },
        { href: "/chaos-lab/bars/kalender", label: "Kalender", icon: CalendarDays, badge },
        { href: "/chaos-lab/bars/pubar", label: "Pubar", icon: Beer },
        { href: "/chaos-lab/bars/statistik", label: "Statistik", icon: ChartColumn },
        { href: "/chaos-lab/bars/profil", label: "Profil", icon: User },
    ];

    let title = $state("Logga besök");
    let badge = $state(3);
    let hydrated = $state(false);
    onMount(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("title") === "long") title = "Logga ett besök på Glenfiddich Warehouse";
        if (query.has("badge")) badge = Number(query.get("badge"));
        hydrated = true;
    });
</script>

<svelte:head>
    <title>Bars lab</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<div data-testid="lab-appbar">
    <AppBar {title} backHref="/chaos-lab">
        {#snippet actions()}
            <IconButton variant="ghost" size="lg" label="Favorit">
                <Star size={20} />
            </IconButton>
            <IconButton variant="ghost" size="lg" label="Dela">
                <Share2 size={20} />
            </IconButton>
        {/snippet}
    </AppBar>
</div>

<!-- Padding in px: at 200% the lab itself must not be what widens a 180px screen. -->
<main class="p-[16px] pb-[96px]">
    {#if hydrated}
        <span data-testid="lab-hydrated" aria-hidden="true" hidden></span>
    {/if}
    <p class="text-body [overflow-wrap:anywhere]">Sidans innehåll växer med textstorleken. Fälten ovan och under gör det inte.</p>

    <!-- Three tabs in a column of their own: labels have room to grow here. -->
    <div class="mt-6" data-testid="lab-tabs-three">
        <BottomTabBar position="static" label="Tre" active="/chaos-lab/bars" items={five(0).slice(0, 3)} />
    </div>
</main>

<div data-testid="lab-tabs-five">
    <BottomTabBar label="Huvudmeny" active="/chaos-lab/bars" items={five(badge)} />
</div>
