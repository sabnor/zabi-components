<script lang="ts">
    import Card from "../atoms/Card.svelte";
    import { createEventDispatcher } from "svelte";
    import type { CardData } from "../../types/page.types";

    interface CardsGridEvents {
        cardClick: CardData;
    }

    export let title: string;
    export let cards: CardData[];
    export let className = "";

    const dispatch = createEventDispatcher<CardsGridEvents>();

    function handleCardClick(event: CustomEvent) {
        dispatch("cardClick", event.detail);
    }
</script>

<section class="cards-grid space-y-6 {className}">
    <h3 class="text-xl font-semibold text-text">
        {title}
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each cards as card}
            <Card
                title={card.title}
                description={card.description}
                image={card.image}
                variant="elevated"
                interactive={true}
                on:click={handleCardClick}
            />
        {/each}
    </div>
</section>

<style>
    .cards-grid {
        @apply py-6;
    }
</style>
