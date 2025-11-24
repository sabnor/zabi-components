<script lang="ts">
    import Card from '../../components/atoms/Card.svelte';
    import CardHeader from '../../components/atoms/CardHeader.svelte';
    import CardContent from '../../components/atoms/CardContent.svelte';
    import CardFooter from '../../components/atoms/CardFooter.svelte';
    import CardTitle from '../../components/atoms/CardTitle.svelte';
    import CardDescription from '../../components/atoms/CardDescription.svelte';
    import Button from '../../components/atoms/Button.svelte';

    interface Props {
        variant?: 'default' | 'elevated' | 'outlined' | 'flat';
    }

    let { variant = 'default' }: Props = $props();
</script>

<Card {variant}>
    <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
            Card description goes here. This is using the compound component API.
        </CardDescription>
    </CardHeader>
    <CardContent>
        <p class="text-body">
            This is the main content area of the card. You can put any content here.
        </p>
    </CardContent>
    <CardFooter>
        <Button variant="primary" text="Action" />
        <Button variant="ghost" text="Cancel" />
    </CardFooter>
</Card>

