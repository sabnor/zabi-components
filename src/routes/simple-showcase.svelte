<script lang="ts">
    import Layout from "../components/molecules/Layout.svelte";
    import Card from "../components/atoms/Card.svelte";
    import Form from "../components/molecules/Form.svelte";
    import Navigation from "../components/organisms/Navigation.svelte";
    import Button from "../components/atoms/Button.svelte";
    import Input from "../components/atoms/Input.svelte";
    import { Home, User, Settings } from "@lucide/svelte";

    // Simple state
    let formData = { name: "", email: "" };
    let selectedCard = null;

    const navItems = [
        { label: "Home", href: "#", icon: Home },
        { label: "Profile", href: "#", icon: User },
        { label: "Settings", href: "#", icon: Settings },
    ];

    const cards = [
        {
            title: "Simple Design",
            description: "Clean, minimal components that just work.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
        },
        {
            title: "Less is More",
            description: "Focus on what matters most.",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
        },
        {
            title: "Easy to Use",
            description: "Simple APIs that developers love.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
        },
    ];

    function handleFormSubmit(event: CustomEvent) {
        console.log("Form submitted:", event.detail.data);
    }

    function handleCardClick(event: CustomEvent) {
        selectedCard = event.detail;
    }
</script>

<svelte:head>
    <title>Clean Components - Less is More</title>
    <meta
        name="description"
        content="Clean, minimal components that just work"
    />
</svelte:head>

<Layout variant="main" className="min-h-screen bg-gray-50">
    <div
        slot="header"
        class="flex items-center justify-between p-4 bg-white border-b"
    >
        <h1 class="text-xl font-bold text-primary">Clean Components</h1>
        <Navigation variant="header" {navItems} />
    </div>

    <main class="container mx-auto p-6 space-y-8">
        <!-- Hero -->
        <section class="text-center space-y-4">
            <h2 class="text-3xl font-bold text-gray-900">Less is More</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                Clean, minimal components that focus on what matters most. No
                unnecessary complexity, just simple solutions that work.
            </p>
        </section>

        <!-- Cards Grid -->
        <section class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900">Cards</h3>
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

        <!-- Form -->
        <section class="max-w-md mx-auto space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 text-center">
                Form
            </h3>
            <Form on:submit={handleFormSubmit}>
                <div class="form-field">
                    <label for="name" class="form-label">Name</label>
                    <Input
                        id="name"
                        name="name"
                        bind:value={formData.name}
                        placeholder="Your name"
                        required
                    />
                </div>

                <div class="form-field">
                    <label for="email" class="form-label">Email</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        bind:value={formData.email}
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <div class="form-actions">
                    <Button type="submit" variant="primary" class="flex-1">
                        Submit
                    </Button>
                </div>
            </Form>
        </section>

        <!-- Selected Card Info -->
        {#if selectedCard}
            <section class="text-center p-4 bg-blue-50 rounded-lg">
                <p class="text-blue-800">
                    You clicked: <strong>{selectedCard.title}</strong>
                </p>
            </section>
        {/if}
    </main>

    <div slot="footer" class="text-center p-4 text-gray-600">
        <p>Clean components that just work. Less is more.</p>
    </div>
</Layout>

<style>
    @import "../styles/simple.css";
</style>
