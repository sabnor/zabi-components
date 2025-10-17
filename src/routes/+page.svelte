<script lang="ts">
    import { goto } from "$app/navigation";
    import Navigation from "../components/organisms/Navigation.svelte";
    import ThemeToggle from "../components/atoms/ThemeToggle.svelte";
    import ContactForm from "../components/molecules/ContactForm.svelte";
    import FeatureCard from "../components/atoms/FeatureCard.svelte";
    import ComponentDemo from "../components/molecules/ComponentDemo.svelte";
    import Button from "../components/atoms/Button.svelte";
    import Card from "../components/atoms/Card.svelte";
    import Input from "../components/atoms/Input.svelte";
    import Alert from "../components/molecules/Alert.svelte";
    import Badge from "../components/atoms/Badge.svelte";

    // Define types inline to avoid module resolution issues
    interface NavItem {
        label: string;
        href: string;
    }

    interface ContactFormData {
        name: string;
        email: string;
        message?: string;
        subscribe?: boolean;
    }

    // Navigation data
    const navItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com" },
    ];

    // Features data
    const features = [
        {
            icon: "🎯",
            title: "TypeScript First",
            description:
                "Full TypeScript support with comprehensive type definitions and excellent IDE experience.",
        },
        {
            icon: "🎨",
            title: "Semantic Colors",
            description:
                "Built-in semantic color system with automatic dark mode support and consistent theming.",
        },
        {
            icon: "🌙",
            title: "Dark Mode Ready",
            description:
                "Automatic dark mode switching with CSS custom properties and seamless theme transitions.",
        },
        {
            icon: "♿",
            title: "Accessibility First",
            description:
                "ARIA compliant components with keyboard navigation support and screen reader compatibility.",
        },
        {
            icon: "📱",
            title: "Responsive Design",
            description:
                "Mobile-first approach with responsive utilities and adaptive layouts for all screen sizes.",
        },
        {
            icon: "🧩",
            title: "Clean API",
            description:
                "Simple, intuitive component APIs with minimal props and maximum flexibility.",
        },
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
        content="Clean, minimal Svelte 5 components that just work"
    />
</svelte:head>

<div class="min-h-screen bg-background">
    <header
        class="flex items-center justify-between p-4 bg-surface border-b border-border"
    >
        <h1 class="text-xl font-bold text-text">Zabi Components</h1>
        <div class="flex items-center gap-4">
            <Navigation variant="header" items={navItems} />
            <ThemeToggle />
        </div>
    </header>

    <main class="container mx-auto p-6 space-y-16">
        <!-- Hero Section -->
        <section class="py-20 px-4 text-center">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-5xl md:text-6xl font-bold text-text mb-6">
                    Zabi Components
                </h1>
                <p class="text-xl md:text-2xl text-text-secondary mb-8">
                    Clean, minimal Svelte 5 components that just work
                </p>
                <p
                    class="text-lg text-text-secondary/80 max-w-2xl mx-auto mb-12"
                >
                    Build beautiful, accessible user interfaces with our
                    carefully crafted component library. Less is more.
                </p>

                <!-- CTA Buttons -->
                <div
                    class="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button
                        variant="primary"
                        size="lg"
                        onclick={() => goto("/docs")}
                        className="px-8 py-3"
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        onclick={() => goto("/components")}
                        className="px-8 py-3"
                    >
                        View Components
                    </Button>
                </div>

                <!-- Version Badge -->
                <div class="mt-8 flex justify-center">
                    <Badge
                        variant="info"
                        className="text-sm"
                        text="v4.0.0 - Svelte 5 Ready"
                    />
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-text mb-4">
                    Why Choose Zabi Components?
                </h2>
                <p class="text-lg text-text-secondary max-w-2xl mx-auto">
                    Built with modern web standards and developer experience in
                    mind
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each features as feature}
                    <FeatureCard
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                {/each}
            </div>
        </section>

        <!-- Component Showcase Section -->
        <section class="py-16">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-text mb-4">
                    See It In Action
                </h2>
                <p class="text-lg text-text-secondary max-w-2xl mx-auto">
                    Interactive examples of our most popular components
                </p>
            </div>

            <div class="space-y-8">
                <!-- Button Examples -->
                <ComponentDemo
                    title="Button Component"
                    description="Clean, accessible buttons with multiple variants and sizes"
                    code={`<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="secondary" size="md">Secondary Button</Button>
<Button variant="danger" size="sm">Danger Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="brand">Brand Button</Button>`}
                >
                    <div class="flex flex-wrap gap-4 items-center">
                        <Button variant="primary" size="lg">Primary</Button>
                        <Button variant="secondary" size="md">Secondary</Button>
                        <Button variant="danger" size="sm">Danger</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="brand">Brand</Button>
                    </div>
                </ComponentDemo>

                <!-- Card Examples -->
                <ComponentDemo
                    title="Card Component"
                    description="Flexible card containers with semantic color variants"
                    code={`<Card title="Default Card" variant="default">
  This is a default card with clean styling.
</Card>

<Card title="Success Card" variant="success">
  This card indicates a successful action.
</Card>

<Card title="Warning Card" variant="warning">
  This card shows a warning state.
</Card>

<Card title="Error Card" variant="error">
  This card indicates an error state.
</Card>`}
                >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card title="Default Card" variant="default">
                            <p class="text-text-secondary">
                                This is a default card with clean styling.
                            </p>
                        </Card>
                        <Card title="Success Card" variant="success">
                            <p class="text-text-secondary">
                                This card indicates a successful action.
                            </p>
                        </Card>
                        <Card title="Warning Card" variant="warning">
                            <p class="text-text-secondary">
                                This card shows a warning state.
                            </p>
                        </Card>
                        <Card title="Error Card" variant="error">
                            <p class="text-text-secondary">
                                This card indicates an error state.
                            </p>
                        </Card>
                    </div>
                </ComponentDemo>

                <!-- Input Examples -->
                <ComponentDemo
                    title="Input Component"
                    description="Form inputs with labels, variants, and accessibility features"
                    code={`<Input 
  label="Name" 
  placeholder="Enter your name" 
  variant="default"
/>

<Input 
  label="Email" 
  type="email" 
  placeholder="Enter your email" 
  variant="success"
/>

<Input 
  label="Password" 
  type="password" 
  placeholder="Enter your password" 
  variant="warning"
/>`}
                >
                    <div class="space-y-4 max-w-md">
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            variant="default"
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            variant="success"
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            variant="warning"
                        />
                    </div>
                </ComponentDemo>

                <!-- Alert Examples -->
                <ComponentDemo
                    title="Alert Component"
                    description="Contextual alerts with different variants and optional close functionality"
                    code={`<Alert variant="info" title="Info Alert" message="This is an informational message." />

<Alert variant="success" title="Success!" message="Your action was completed successfully." />

<Alert variant="warning" title="Warning" message="Please review your input before proceeding." />

<Alert variant="error" title="Error" message="Something went wrong. Please try again." />`}
                >
                    <div class="space-y-4">
                        <Alert
                            variant="info"
                            title="Info Alert"
                            message="This is an informational message."
                        />
                        <Alert
                            variant="success"
                            title="Success!"
                            message="Your action was completed successfully."
                        />
                        <Alert
                            variant="warning"
                            title="Warning"
                            message="Please review your input before proceeding."
                        />
                        <Alert
                            variant="error"
                            title="Error"
                            message="Something went wrong. Please try again."
                        />
                    </div>
                </ComponentDemo>
            </div>

            <!-- View All Components CTA -->
            <div class="text-center mt-12">
                <Button
                    variant="primary"
                    size="lg"
                    onclick={() => goto("/components")}
                    className="px-8 py-3"
                >
                    View All Components
                </Button>
            </div>
        </section>

        <!-- Contact Form -->
        <section class="py-16">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-text mb-4">Get In Touch</h2>
                <p class="text-lg text-text-secondary max-w-2xl mx-auto">
                    Have questions or feedback? We'd love to hear from you.
                </p>
            </div>
            <ContactForm onsubmit={handleFormSubmit} />
        </section>
    </main>

    <footer class="bg-surface-secondary border-t border-border py-8">
        <div class="container mx-auto px-6">
            <div
                class="flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <div class="text-center md:text-left">
                    <p class="text-text-secondary mb-2">
                        Clean components that just work. Less is more.
                    </p>
                    <p class="text-sm text-text-secondary/80">
                        © 2024 Zabi Components. MIT License.
                    </p>
                </div>
                <div class="flex gap-6">
                    <a
                        href="/docs"
                        class="text-text-secondary hover:text-text transition-colors"
                        >Docs</a
                    >
                    <a
                        href="/components"
                        class="text-text-secondary hover:text-text transition-colors"
                        >Components</a
                    >
                    <a
                        href="https://github.com"
                        class="text-text-secondary hover:text-text transition-colors"
                        >GitHub</a
                    >
                </div>
            </div>
        </div>
    </footer>
</div>
