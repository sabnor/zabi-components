<script>
    import Button from "../components/atoms/Button.svelte";
</script>

<svelte:head>
    <title>Zabi Components</title>
    <meta
        name="description"
        content="A collection of reusable Svelte components"
    />
</svelte:head>

<section class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Zabi Components</h1>
    <p class="text-lg text-gray-600 mb-8">
        A collection of reusable Svelte components built with Tailwind CSS.
    </p>

    <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">Components</h2>
        <div class="flex gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
        </div>
    </div>
</section>
