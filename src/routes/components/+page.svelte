<script lang="ts">
    import Navigation from "../../components/organisms/Navigation.svelte";
    import ThemeToggle from "../../components/atoms/ThemeToggle.svelte";
    import ComponentDemo from "../../components/molecules/ComponentDemo.svelte";
    import Button from "../../components/atoms/Button.svelte";
    import Card from "../../components/atoms/Card.svelte";
    import Input from "../../components/atoms/Input.svelte";
    import Textarea from "../../components/atoms/Textarea.svelte";
    import Alert from "../../components/molecules/Alert.svelte";
    import Badge from "../../components/atoms/Badge.svelte";
    import Checkbox from "../../components/atoms/Checkbox.svelte";
    import Select from "../../components/atoms/Select.svelte";
    import Toggle from "../../components/atoms/Toggle.svelte";
    import Progress from "../../components/atoms/Progress.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Modal from "../../components/molecules/Modal.svelte";
    import Dropdown from "../../components/molecules/Dropdown.svelte";
    import Tabs from "../../components/molecules/Tabs.svelte";
    import type { NavItem, ComponentMetadata } from "../../types/page.types";

    // Navigation data
    const navItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com" },
    ];

    // Component categories
    const categories = [
        { id: "atoms", label: "Atoms", description: "Basic building blocks" },
        {
            id: "molecules",
            label: "Molecules",
            description: "Composite components",
        },
        {
            id: "organisms",
            label: "Organisms",
            description: "Complex components",
        },
    ];

    let selectedCategory = $state("atoms");
    let selectedComponent = $state("button");

    // Component metadata
    const components: Record<string, ComponentMetadata[]> = {
        atoms: [
            {
                name: "Button",
                category: "atoms",
                description:
                    "Clean, accessible buttons with multiple variants and sizes",
                props: [
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "primary",
                        description: "Button style variant",
                    },
                    {
                        name: "size",
                        type: "string",
                        required: false,
                        defaultValue: "md",
                        description: "Button size",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Disable the button",
                    },
                    {
                        name: "type",
                        type: "string",
                        required: false,
                        defaultValue: "button",
                        description: "HTML button type",
                    },
                ],
                variants: [
                    "primary",
                    "secondary",
                    "danger",
                    "success",
                    "ghost",
                    "brand",
                ],
                examples: [
                    {
                        title: "Basic Usage",
                        description: "Simple button with default styling",
                        code: "&lt;Button&gt;Click me&lt;/Button&gt;",
                    },
                    {
                        title: "Variants",
                        description: "Different button variants",
                        code: '&lt;Button variant="primary"&gt;Primary&lt;/Button&gt;\n&lt;Button variant="secondary"&gt;Secondary&lt;/Button&gt;\n&lt;Button variant="danger"&gt;Danger&lt;/Button&gt;',
                    },
                ],
            },
            {
                name: "Input",
                category: "atoms",
                description:
                    "Form inputs with labels, variants, and accessibility features",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Input value",
                    },
                    {
                        name: "type",
                        type: "string",
                        required: false,
                        defaultValue: "text",
                        description: "Input type",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Input label",
                    },
                    {
                        name: "placeholder",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Input placeholder",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Input variant",
                    },
                ],
                variants: ["default", "success", "warning", "error"],
                examples: [
                    {
                        title: "Basic Input",
                        description: "Simple input with label",
                        code: '&lt;Input label="Name" placeholder="Enter your name" /&gt;',
                    },
                    {
                        title: "Variants",
                        description: "Input with different variants",
                        code: `<Input variant="success" label="Email" />
<Input variant="warning" label="Password" />`,
                    },
                ],
            },
            {
                name: "Card",
                category: "atoms",
                description:
                    "Flexible card containers with semantic color variants",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Card title",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Card variant",
                    },
                    {
                        name: "interactive",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Make card clickable",
                    },
                ],
                variants: ["default", "success", "warning", "error", "info"],
                examples: [
                    {
                        title: "Basic Card",
                        description: "Simple card with title and content",
                        code: `<Card title="Card Title">
  <p>Card content goes here</p>
</Card>`,
                    },
                ],
            },
        ],
        molecules: [
            {
                name: "Alert",
                category: "molecules",
                description:
                    "Contextual alerts with different variants and optional close functionality",
                props: [
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "info",
                        description: "Alert variant",
                    },
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Alert title",
                    },
                    {
                        name: "message",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Alert message",
                    },
                    {
                        name: "closable",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Show close button",
                    },
                ],
                variants: ["info", "success", "warning", "error"],
                examples: [
                    {
                        title: "Basic Alert",
                        description: "Simple alert with message",
                        code: '&lt;Alert variant="info" message="This is an info alert" /&gt;',
                    },
                ],
            },
        ],
        organisms: [],
    };

    let currentComponents = $derived(components[selectedCategory] || []);
</script>

<svelte:head>
    <title>Components - Zabi Components</title>
    <meta
        name="description"
        content="Interactive component showcase and documentation"
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

    <main class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="w-64 bg-surface-secondary border-r border-border p-6">
            <h2 class="text-lg font-semibold text-text mb-4">Components</h2>

            <!-- Category Navigation -->
            <nav class="space-y-2 mb-8">
                {#each categories as category}
                    <button
                        onclick={() => (selectedCategory = category.id)}
                        class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200 {selectedCategory ===
                        category.id
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:text-text hover:bg-surface'}"
                    >
                        <div class="font-medium">{category.label}</div>
                        <div class="text-xs opacity-75">
                            {category.description}
                        </div>
                    </button>
                {/each}
            </nav>

            <!-- Component List -->
            <div class="space-y-1">
                {#each currentComponents as component}
                    <button
                        onclick={() =>
                            (selectedComponent = component.name.toLowerCase())}
                        class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200 {selectedComponent ===
                        component.name.toLowerCase()
                            ? 'bg-primary/10 text-primary border-l-2 border-primary'
                            : 'text-text-secondary hover:text-text hover:bg-surface'}"
                    >
                        {component.name}
                    </button>
                {/each}
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 p-8">
            {#each currentComponents as component}
                {#if selectedComponent === component.name.toLowerCase()}
                    <div class="max-w-4xl">
                        <!-- Component Header -->
                        <div class="mb-8">
                            <h1 class="text-3xl font-bold text-text mb-2">
                                {component.name}
                            </h1>
                            <p class="text-lg text-text-secondary mb-4">
                                {component.description}
                            </p>
                            <div class="flex gap-2">
                                <Badge
                                    variant="info"
                                    text={component.category}
                                />
                                {#if component.variants}
                                    <Badge
                                        variant="info"
                                        text="{component.variants
                                            .length} variants"
                                    />
                                {/if}
                            </div>
                        </div>

                        <!-- Examples -->
                        <div class="space-y-8">
                            {#each component.examples as example}
                                <ComponentDemo
                                    title={example.title}
                                    description={example.description}
                                    code={example.code}
                                    language={example.language || "svelte"}
                                >
                                    {#if component.name === "Button"}
                                        <div
                                            class="flex flex-wrap gap-4 items-center"
                                        >
                                            <Button variant="primary"
                                                >Primary</Button
                                            >
                                            <Button variant="secondary"
                                                >Secondary</Button
                                            >
                                            <Button variant="danger"
                                                >Danger</Button
                                            >
                                            <Button variant="success"
                                                >Success</Button
                                            >
                                            <Button variant="ghost"
                                                >Ghost</Button
                                            >
                                            <Button variant="brand"
                                                >Brand</Button
                                            >
                                        </div>
                                    {:else if component.name === "Input"}
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
                                    {:else if component.name === "Card"}
                                        <div
                                            class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                            <Card
                                                title="Default Card"
                                                variant="default"
                                            >
                                                <p class="text-text-secondary">
                                                    This is a default card with
                                                    clean styling.
                                                </p>
                                            </Card>
                                            <Card
                                                title="Success Card"
                                                variant="success"
                                            >
                                                <p class="text-text-secondary">
                                                    This card indicates a
                                                    successful action.
                                                </p>
                                            </Card>
                                            <Card
                                                title="Warning Card"
                                                variant="warning"
                                            >
                                                <p class="text-text-secondary">
                                                    This card shows a warning
                                                    state.
                                                </p>
                                            </Card>
                                            <Card
                                                title="Error Card"
                                                variant="error"
                                            >
                                                <p class="text-text-secondary">
                                                    This card indicates an error
                                                    state.
                                                </p>
                                            </Card>
                                        </div>
                                    {:else if component.name === "Alert"}
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
                                    {/if}
                                </ComponentDemo>
                            {/each}
                        </div>

                        <!-- Props Table -->
                        <div class="mt-12">
                            <h2 class="text-2xl font-bold text-text mb-6">
                                Props
                            </h2>
                            <div class="overflow-x-auto">
                                <table
                                    class="w-full border-collapse border border-border"
                                >
                                    <thead>
                                        <tr class="bg-surface-secondary">
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Name</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Type</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Required</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Default</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Description</th
                                            >
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each component.props as prop}
                                            <tr>
                                                <td
                                                    class="border border-border px-4 py-2 text-text font-mono"
                                                    >{prop.name}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-text-secondary"
                                                    >{prop.type}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-text-secondary"
                                                    >{prop.required
                                                        ? "Yes"
                                                        : "No"}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-text-secondary"
                                                    >{prop.defaultValue ||
                                                        "-"}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-text-secondary"
                                                    >{prop.description}</td
                                                >
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
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
