<script lang="ts">
    import type { CardData } from "../../types/page.types";

    export let selectedCard: CardData | null;
    export let className = "";
</script>

{#if selectedCard}
    <section
        class="selected-card-info text-center p-4 bg-info-surface rounded-lg {className}"
    >
        <p class="text-info-text">
            You clicked: <strong>{selectedCard.title}</strong>
        </p>
    </section>
{/if}

<style>
    .selected-card-info {
        @apply py-4;
    }
</style>
