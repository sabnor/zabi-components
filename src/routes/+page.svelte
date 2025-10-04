<script lang="ts">
    import Layout from "../components/molecules/Layout.svelte";
    import Navigation from "../components/organisms/Navigation.svelte";
    import ThemeToggle from "../components/atoms/ThemeToggle.svelte";
    import Hero from "../components/molecules/Hero.svelte";
    import CardsGrid from "../components/molecules/CardsGrid.svelte";
    import ContactForm from "../components/molecules/ContactForm.svelte";
    import SelectedCardInfo from "../components/molecules/SelectedCardInfo.svelte";
    import ColorDemo from "../components/molecules/ColorDemo.svelte";
    import type { CardData, FormData, NavItem } from "../types/page.types";

    // State
    let selectedCard: CardData | null = null;

    // Navigation data
    const navItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com" },
    ];

    // Cards data
    const cards: CardData[] = [
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

    // Event handlers
    function handleFormSubmit(event: CustomEvent<{ data: FormData }>) {
        console.log("Form submitted:", event.detail.data);
        // Handle form submission
    }

    function handleCardClick(event: CustomEvent<CardData>) {
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

<Layout variant="main" className="min-h-screen bg-background">
    <div
        slot="header"
        class="flex items-center justify-between p-4 bg-surface border-b border-border"
    >
        <h1 class="text-xl font-bold text-text">Zabi Components</h1>
        <div class="flex items-center gap-4">
            <Navigation variant="header" items={navItems} />
            <ThemeToggle size="md" />
        </div>
    </div>

    <div slot="main" class="container mx-auto p-6 space-y-8">
        <!-- Hero Section -->
        <Hero
            title="Less is More"
            subtitle="Clean, minimal components that focus on what matters most. No unnecessary complexity, just simple solutions that work."
        />

        <!-- Components Grid -->
        <CardsGrid title="Components" {cards} on:cardClick={handleCardClick} />

        <!-- Contact Form -->
        <ContactForm on:submit={handleFormSubmit} />

        <!-- Selected Card Info -->
        <SelectedCardInfo {selectedCard} />

        <!-- Color Demo -->
        <ColorDemo />
    </div>

    <div slot="footer" class="text-center p-4 text-text-secondary">
        <p>Clean components that just work. Less is more.</p>
    </div>
</Layout>
