<script lang="ts">
    import Layout from "../components/molecules/Layout.svelte";
    import Navigation from "../components/organisms/Navigation.svelte";
    import ThemeToggle from "../components/atoms/ThemeToggle.svelte";
    import ContactForm from "../components/molecules/ContactForm.svelte";
    import type { ContactFormData, NavItem } from "../types/page.types";

    // Navigation data
    const navItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com" },
    ];

    // Event handlers
    function handleFormSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log("Form submitted:", data);
        // Handle form submission
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
            <ThemeToggle />
        </div>
    </div>

    <div slot="main" class="container mx-auto p-6 space-y-8">
        <!-- Hero Section -->
        <section class="py-20 px-4 text-center">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-5xl md:text-6xl font-bold text-text mb-6">
                    Zabi Components
                </h1>
                <p class="text-xl md:text-2xl text-text-secondary mb-8">
                    Clean, minimal Svelte components that just work
                </p>
                <p class="text-lg text-text-secondary/80 max-w-2xl mx-auto">
                    Build beautiful, accessible user interfaces with our
                    carefully crafted component library.
                </p>
            </div>
        </section>

        <!-- Contact Form -->
        <ContactForm on:submit={handleFormSubmit} />
    </div>

    <div slot="footer" class="text-center p-4 text-text-secondary">
        <p>Clean components that just work. Less is more.</p>
    </div>
</Layout>
