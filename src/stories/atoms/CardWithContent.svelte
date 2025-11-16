<script lang="ts">
    import Card from '../../components/atoms/Card.svelte';

    interface Props {
        title?: string;
        description?: string;
        image?: string;
        onclick?: (event: MouseEvent) => void | Promise<void>;
        size?: "sm" | "md" | "lg";
        fullWidth?: boolean;
    }

    let { title, description, image, onclick, size, fullWidth }: Props = $props();
</script>

<Card {title} {description} {image} {onclick} {size} {fullWidth}>
    {#if onclick}
        <p class="text-body">
            This card has an onclick handler and shows hover effects. Try hovering over it!
        </p>
    {:else}
        <p class="text-body">
            This is an example of a card with custom content. You can add any content you like here.
        </p>
    {/if}
</Card>
