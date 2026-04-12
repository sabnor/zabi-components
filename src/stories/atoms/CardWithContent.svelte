<script lang="ts">
    import Card from '../../components/atoms/Card.svelte';
    import CardHeader from '../../components/atoms/CardHeader.svelte';
    import CardContent from '../../components/atoms/CardContent.svelte';

    interface Props {
        title?: string;
        description?: string;
        image?: string;
        onclick?: (event: MouseEvent) => void | Promise<void>;
        size?: "sm" | "md" | "lg";
        fullWidth?: boolean;
        variant?: "default" | "elevated" | "outlined" | "flat";
    }

    let { title, description, image, onclick, size, fullWidth, variant }: Props = $props();
</script>

<Card {onclick} {size} {fullWidth} {variant} ariaLabel={onclick && title ? title : undefined}>
    {#if title || description}
        <CardHeader {title} {description} />
    {/if}
    <CardContent {image} imageAlt={title}>
        {#if onclick}
            <p class="text-body">
                This card has an onclick handler and shows hover effects. Try hovering over it!
            </p>
        {:else}
            <p class="text-body">
                This is an example of a card with custom content. You can add any content you like here.
            </p>
        {/if}
    </CardContent>
</Card>
