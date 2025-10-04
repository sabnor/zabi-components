<script lang="ts">
    // Clean Components - Less is More
    import Card from "../components/atoms/Card.svelte";
    import Form from "../components/molecules/Form.svelte";
    import Layout from "../components/molecules/Layout.svelte";
    import Navigation from "../components/organisms/Navigation.svelte";
    import Button from "../components/atoms/Button.svelte";
    import Input from "../components/atoms/Input.svelte";
    import ThemeToggle from "../components/atoms/ThemeToggle.svelte";

    // State
    let formData = {
        name: "",
        email: "",
    };
    let selectedCard = null;

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com" },
    ];

    const cards = [
        {
            title: "Clean Design",
            description: "Minimal, focused components that just work",
            image: "/vite.svg",
        },
        {
            title: "TypeScript First",
            description: "Full type safety and excellent developer experience",
            image: "/vite.svg",
        },
        {
            title: "Accessible",
            description: "Built with accessibility and usability in mind",
            image: "/vite.svg",
        },
    ];

    function handleFormSubmit(event: CustomEvent) {
        console.log("Form submitted:", event.detail.data);
        // Handle form submission
    }

    function handleCardClick(event: CustomEvent) {
        selectedCard = event.detail;
        console.log("Card clicked:", selectedCard);
    }
</script>

<svelte:head>
    <title>Zabi Components - Clean & Simple</title>
    <meta
        name="description"
        content="Clean, minimal Svelte components that just work"
    />
</svelte:head>

<Layout variant="main" className="min-h-screen bg-gray-50">
    <div
        slot="header"
        class="flex items-center justify-between p-4 bg-white border-b"
    >
        <h1 class="text-xl font-bold text-primary">Zabi Components</h1>
        <div class="flex items-center gap-4">
            <Navigation variant="header" items={navItems} />
            <ThemeToggle size="md" />
        </div>
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
            <h3 class="text-xl font-semibold text-gray-900">Components</h3>
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
                Contact Form
            </h3>
            <Form on:submit={handleFormSubmit}>
                <div class="form-field">
                    <label for="name" class="form-label">Name</label>
                    <Input
                        id="name"
                        name="name"
                        bind:value={formData.name}
                        placeholder="Enter your name"
                    />
                </div>

                <div class="form-field">
                    <label for="email" class="form-label">Email</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        bind:value={formData.email}
                        placeholder="Enter your email"
                    />
                </div>

                <div class="form-actions">
                    <Button type="submit" variant="primary" className="flex-1">
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
