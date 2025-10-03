<script lang="ts">
    import { onMount } from "svelte";
    import ModernLayout from "../components/molecules/ModernLayout.svelte";
    import ModernCard from "../components/atoms/ModernCard.svelte";
    import ModernForm from "../components/molecules/ModernForm.svelte";
    import ModernNavigation from "../components/organisms/ModernNavigation.svelte";
    import Button from "../components/atoms/Button.svelte";
    import Input from "../components/atoms/Input.svelte";
    import {
        Eye,
        Settings,
        User,
        Mail,
        Lock,
        Search,
        Menu,
        Home,
        Users,
        Settings as SettingsIcon,
        HelpCircle,
    } from "@lucide/svelte";

    // Demo state
    let currentTheme = "light";
    let formData = {
        name: "",
        email: "",
        password: "",
        message: "",
    };
    let formErrors: Record<string, string> = {};
    let isLoading = false;
    let selectedCard: any = null;
    let collapsible = true;
    let responsive = true;
    let interactive = true;
    let containerQuery = true;

    // Navigation items
    const navItems = [
        { id: "home", label: "Home", href: "#", icon: Home },
        { id: "users", label: "Users", href: "#", icon: Users },
        { id: "settings", label: "Settings", href: "#", icon: SettingsIcon },
        { id: "help", label: "Help", href: "#", icon: HelpCircle },
    ];

    // Demo cards data
    const demoCards = [
        {
            id: "card1",
            title: "Modern CSS Features",
            subtitle: "Container Queries & Grid",
            description:
                "Showcasing container queries, CSS Grid subgrid, and logical properties for responsive design.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
            variant: "glass",
        },
        {
            id: "card2",
            title: "Semantic HTML",
            subtitle: "Accessibility First",
            description:
                "Built with proper ARIA landmarks, roles, and semantic elements for screen readers.",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
            variant: "elevated",
        },
        {
            id: "card3",
            title: "Performance Optimized",
            subtitle: "CSS Containment",
            description:
                "Using CSS containment, will-change, and efficient animations for smooth performance.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
            variant: "gradient",
        },
    ];

    // Theme toggle
    function toggleTheme() {
        currentTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.classList.toggle(
            "dark",
            currentTheme === "dark",
        );
    }

    // Form handlers
    function handleFormSubmit(event: CustomEvent) {
        console.log("Form submitted:", event.detail.data);
        isLoading = true;

        // Simulate API call
        setTimeout(() => {
            isLoading = false;
            alert("Form submitted successfully!");
        }, 2000);
    }

    function handleFormValidation(event: CustomEvent) {
        console.log("Validation errors:", event.detail.errors);
        formErrors = event.detail.errors;
    }

    function handleCardClick(event: CustomEvent) {
        selectedCard = event.detail.item;
        console.log("Card clicked:", selectedCard);
    }

    function handleNavClick(event: CustomEvent) {
        console.log("Navigation clicked:", event.detail.item);
    }

    // Initialize theme
    onMount(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        currentTheme = savedTheme;
        document.documentElement.classList.toggle(
            "dark",
            currentTheme === "dark",
        );
    });

    // Save theme preference
    function saveTheme(theme: string) {
        localStorage.setItem("theme", theme);
    }

    $: if (currentTheme) {
        saveTheme(currentTheme);
    }
</script>

<svelte:head>
    <title>Modern CSS & Semantic Components Showcase</title>
    <meta
        name="description"
        content="Showcasing modern CSS features and semantic components for accessible, performant UIs"
    />
</svelte:head>

<!-- Skip Link for Accessibility -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Modern Navigation -->
<ModernNavigation
    variant="header"
    orientation="horizontal"
    density="comfortable"
    {collapsible}
    {responsive}
    items={navItems}
    ariaLabel="Main navigation"
    on:item-click={handleNavClick}
/>

<!-- Main Layout using Modern CSS Grid -->
<ModernLayout
    variant="main"
    gap="lg"
    {responsive}
    containerQuery={true}
    className="min-h-screen bg-page"
>
    <!-- Header Slot -->
    <div
        slot="header"
        class="flex-between p-6 bg-surface-elevated border-b border-primary"
    >
        <div>
            <h1 class="text-2xl font-bold text-primary">
                Modern CSS & Semantic Components
            </h1>
            <p class="text-secondary mt-1">
                Showcasing the power of modern, functional CSS and accessible
                components
            </p>
        </div>
        <div class="flex gap-3">
            <Button
                variant="secondary"
                on:click={toggleTheme}
                iconLeft={currentTheme === "light" ? "🌙" : "☀️"}
            >
                {currentTheme === "light" ? "Dark" : "Light"} Mode
            </Button>
        </div>
    </div>

    <!-- Main Content -->
    <main id="main-content" class="p-6 space-y-8">
        <!-- Hero Section with Container Queries -->
        <section
            class="hero-section container-query p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl"
        >
            <div class="text-center space-y-4">
                <h2 class="text-4xl font-bold text-primary">
                    Unlock Modern CSS Potential
                </h2>
                <p class="text-lg text-secondary max-w-2xl mx-auto">
                    Experience the power of container queries, CSS Grid subgrid,
                    logical properties, and semantic components for building
                    accessible, performant UIs.
                </p>
                <div class="flex-center gap-4 mt-6">
                    <Button variant="primary" size="lg" iconLeft={Search}>
                        Explore Features
                    </Button>
                    <Button variant="secondary" size="lg" iconLeft={Settings}>
                        View Documentation
                    </Button>
                </div>
            </div>
        </section>

        <!-- Modern Cards Grid with Container Queries -->
        <section class="cards-section">
            <h3 class="text-2xl font-semibold text-primary mb-6">
                Modern Card Components
            </h3>
            <div class="grid-auto-fit gap-6">
                {#each demoCards as card (card.id)}
                    <ModernCard
                        title={card.title}
                        subtitle={card.subtitle}
                        description={card.description}
                        image={card.image}
                        variant={card.variant as
                            | "default"
                            | "elevated"
                            | "outlined"
                            | "glass"
                            | "gradient"}
                        density="comfortable"
                        {interactive}
                        {containerQuery}
                        on:click={(e) => handleCardClick(e)}
                    >
                        <div slot="actions">
                            <Button variant="primary" size="sm"
                                >Learn More</Button
                            >
                            <Button variant="secondary" size="sm">Share</Button>
                        </div>
                    </ModernCard>
                {/each}
            </div>
        </section>

        <!-- Modern Form with Advanced Features -->
        <section class="form-section">
            <h3 class="text-2xl font-semibold text-primary mb-6">
                Modern Form Component
            </h3>
            <div class="max-w-2xl">
                <ModernForm
                    layout="vertical"
                    gap="md"
                    density="comfortable"
                    loading={isLoading}
                    on:submit={handleFormSubmit}
                    on:validation-error={handleFormValidation}
                    ariaLabel="Contact form"
                >
                    <div class="form-field">
                        <label for="name" class="form-label">Full Name</label>
                        <Input
                            id="name"
                            name="name"
                            bind:value={formData.name}
                            placeholder="Enter your full name"
                            required
                            size="md"
                            variant={formErrors.name ? "error" : "default"}
                            error={formErrors.name || ""}
                        />
                    </div>

                    <div class="form-field">
                        <label for="email" class="form-label"
                            >Email Address</label
                        >
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            bind:value={formData.email}
                            placeholder="Enter your email"
                            required
                            size="md"
                            variant={formErrors.email ? "error" : "default"}
                            error={formErrors.email || ""}
                        />
                    </div>

                    <div class="form-field">
                        <label for="password" class="form-label">Password</label
                        >
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            bind:value={formData.password}
                            placeholder="Enter your password"
                            required
                            size="md"
                            showPasswordToggle={true}
                            variant={formErrors.password ? "error" : "default"}
                            error={formErrors.password || ""}
                        />
                    </div>

                    <div class="form-field">
                        <label for="message" class="form-label">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            bind:value={formData.message}
                            placeholder="Enter your message"
                            class="w-full p-3 border border-primary rounded-md focus:ring-2 focus:ring-focus focus:border-transparent resize-vertical min-h-[100px]"
                            rows="4"
                        ></textarea>
                    </div>

                    <div slot="actions">
                        <Button
                            type="submit"
                            variant="primary"
                            loading={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit Form"}
                        </Button>
                        <Button type="button" variant="secondary">Reset</Button>
                    </div>
                </ModernForm>
            </div>
        </section>

        <!-- CSS Features Showcase -->
        <section class="features-section">
            <h3 class="text-2xl font-semibold text-primary mb-6">
                Modern CSS Features
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Container Queries Demo -->
                <div
                    class="feature-card container-query p-6 bg-surface border border-primary rounded-lg"
                >
                    <h4 class="text-lg font-semibold text-primary mb-2">
                        Container Queries
                    </h4>
                    <p class="text-secondary text-sm mb-4">
                        This card responds to its container size, not just the
                        viewport.
                    </p>
                    <div class="feature-demo bg-primary/10 p-4 rounded-md">
                        <p class="text-xs text-primary">
                            Resize the container to see the card adapt!
                        </p>
                    </div>
                </div>

                <!-- CSS Grid Subgrid Demo -->
                <div
                    class="feature-card p-6 bg-surface border border-primary rounded-lg"
                >
                    <h4 class="text-lg font-semibold text-primary mb-2">
                        CSS Grid Subgrid
                    </h4>
                    <p class="text-secondary text-sm mb-4">
                        Nested grids that inherit their parent's track sizing.
                    </p>
                    <div class="grid grid-cols-3 gap-2 h-20">
                        <div class="bg-primary/20 rounded flex-center text-xs">
                            1
                        </div>
                        <div class="bg-primary/20 rounded flex-center text-xs">
                            2
                        </div>
                        <div class="bg-primary/20 rounded flex-center text-xs">
                            3
                        </div>
                        <div class="bg-primary/20 rounded flex-center text-xs">
                            4
                        </div>
                        <div class="bg-primary/20 rounded flex-center text-xs">
                            5
                        </div>
                        <div class="bg-primary/20 rounded flex-center text-xs">
                            6
                        </div>
                    </div>
                </div>

                <!-- Logical Properties Demo -->
                <div
                    class="feature-card p-6 bg-surface border border-primary rounded-lg"
                >
                    <h4 class="text-lg font-semibold text-primary mb-2">
                        Logical Properties
                    </h4>
                    <p class="text-secondary text-sm mb-4">
                        Direction-aware spacing and sizing properties.
                    </p>
                    <div class="logical-spacing bg-primary/10 p-4 rounded-md">
                        <p class="text-xs text-primary">
                            This uses logical properties for RTL support!
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Performance Features -->
        <section class="performance-section">
            <h3 class="text-2xl font-semibold text-primary mb-6">
                Performance Optimizations
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 bg-surface border border-primary rounded-lg">
                    <h4 class="text-lg font-semibold text-primary mb-2">
                        CSS Containment
                    </h4>
                    <p class="text-secondary text-sm mb-4">
                        Components use CSS containment for better performance
                        and isolation.
                    </p>
                    <div class="space-y-2">
                        <div
                            class="h-2 bg-primary/20 rounded animate-pulse"
                        ></div>
                        <div
                            class="h-2 bg-primary/20 rounded animate-pulse"
                            style="animation-delay: 0.2s"
                        ></div>
                        <div
                            class="h-2 bg-primary/20 rounded animate-pulse"
                            style="animation-delay: 0.4s"
                        ></div>
                    </div>
                </div>

                <div class="p-6 bg-surface border border-primary rounded-lg">
                    <h4 class="text-lg font-semibold text-primary mb-2">
                        Efficient Animations
                    </h4>
                    <p class="text-secondary text-sm mb-4">
                        Hardware-accelerated animations with will-change
                        optimization.
                    </p>
                    <div class="flex gap-2">
                        <div
                            class="w-4 h-4 bg-primary rounded-full animate-bounce"
                        ></div>
                        <div
                            class="w-4 h-4 bg-primary rounded-full animate-bounce"
                            style="animation-delay: 0.1s"
                        ></div>
                        <div
                            class="w-4 h-4 bg-primary rounded-full animate-bounce"
                            style="animation-delay: 0.2s"
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer Slot -->
    <footer
        slot="footer"
        class="bg-surface-secondary border-t border-primary p-6"
    >
        <div class="flex-between">
            <div>
                <p class="text-secondary text-sm">
                    Built with modern CSS features and semantic components
                </p>
            </div>
            <div class="flex gap-4">
                <Button variant="secondary" size="sm">GitHub</Button>
                <Button variant="secondary" size="sm">Documentation</Button>
                <Button variant="secondary" size="sm">Support</Button>
            </div>
        </div>
    </footer>
</ModernLayout>

<style>
    /* Global styles for the showcase */
    :global(.hero-section) {
        background: linear-gradient(
            135deg,
            rgb(var(--color-primary) / 0.05) 0%,
            rgb(var(--color-secondary) / 0.05) 100%
        );
    }

    /* Container Query Demo */
    @container (min-width: 300px) {
        .feature-card {
            background: rgb(var(--color-surface-elevated));
            box-shadow: var(--shadow-md);
        }
    }

    @container (min-width: 500px) {
        .feature-card {
            padding: var(--spacing-xl);
        }
    }

    /* Form field styling */
    .form-field {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .form-label {
        font-weight: 500;
        color: rgb(var(--color-text));
        font-size: 0.875rem;
    }

    /* Feature demo styling */
    .feature-demo {
        transition: all 0.3s ease;
    }

    .feature-demo:hover {
        transform: scale(1.02);
    }

    /* Skip link */
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: rgb(var(--color-primary));
        color: rgb(var(--color-text-inverse));
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    }

    .skip-link:focus {
        top: 6px;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .hero-section {
            padding: var(--spacing-lg);
        }

        .hero-section h2 {
            font-size: 2rem;
        }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .feature-demo,
        .animate-bounce,
        .animate-pulse {
            animation: none;
        }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
        .feature-card {
            border-width: 2px;
        }
    }
</style>
