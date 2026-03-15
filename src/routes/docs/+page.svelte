<script lang="ts">
    import { goto } from "$app/navigation";
    import Navigation from "../../components/organisms/Navigation.svelte";
    import ThemeToggle from "../../components/atoms/ThemeToggle.svelte";
    import CodeBlock from "../../components/atoms/CodeBlock.svelte";
    import Button from "../../components/atoms/Button.svelte";
    import IconButton from "../../components/atoms/IconButton.svelte";
    import { Heart } from "@lucide/svelte";
    import Card from "../../components/atoms/Card.svelte";

    interface NavItem {
        label: string;
        href: string;
    }

    const navItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com/sabnor/zabi-components" },
    ];

    const quickStartCode = `import { Button, Card, Input } from "zabi-components";

let name = $state("");

<Card title="Welcome">
  <Input 
    label="Your Name" 
    value={name} 
    oninput={(e) => name = e.target.value}
  />
  <Button onclick={() => console.log("Hello!")}>
    Say Hello
  </Button>
</Card>`;

    const installCode = `npm install zabi-components`;

    const auditFilesCode = `docs/AUDIT_RUNBOOK.md
docs/AUDIT_SCORECARD_TEMPLATE.md
docs/AUDIT_SCORECARD_2026-03-15.md
docs/DESIGN_SYSTEM_REMEDIATION_TRACKER.md`;

    const qualityChecksCode = `npm run check
npm run check:tokens
npm run build
npm run build-storybook`;
</script>

<svelte:head>
    <title>Documentation - Zabi Components</title>
    <meta
        name="description"
        content="Getting started guide and API reference for Zabi Components"
    />
</svelte:head>

<div class="min-h-screen bg-background">
    <!-- Header -->
    <div
        class="flex items-center justify-between p-4 bg-base-50 border-b border-border"
    >
        <h1 class="text-xl font-bold text-text">Zabi Components</h1>
        <div class="flex items-center gap-4">
            <Navigation variant="header" items={navItems} />
            <ThemeToggle />
        </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto p-6 max-w-4xl">
        <!-- Header -->
        <div class="mb-12 text-center">
            <h1 class="text-4xl font-bold text-text mb-4">Documentation</h1>
            <p class="text-lg text-secondary">
                Build, audit, and ship accessible UI with confidence
            </p>
        </div>

        <!-- Quick Start -->
        <section class="mb-16">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-text mb-4">Quick Start</h2>
                <p class="text-secondary">
                    Install and start using components right away
                </p>
            </div>

            <div class="space-y-8">
                <!-- Installation -->
                <Card title="Installation">
                    <p class="text-secondary mb-4">
                        Install Zabi Components using npm:
                    </p>
                    <CodeBlock code={installCode} language="bash" />
                </Card>

                <!-- Usage -->
                <Card title="Basic Usage">
                    <p class="text-secondary mb-4">
                        Import and use components in your Svelte 5 app:
                    </p>
                    <CodeBlock code={quickStartCode} language="svelte" />
                </Card>
            </div>
        </section>

        <!-- Design System Quality -->
        <section class="mb-16">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-text mb-4">
                    Design System Quality
                </h2>
                <p class="text-secondary">
                    Run the audit framework and remediation workflow end-to-end
                </p>
            </div>

            <div class="space-y-8">
                <Card title="Audit Framework Files">
                    <p class="text-secondary mb-4">
                        Use these files to run repeatable audits, track issues,
                        and publish scorecards.
                    </p>
                    <CodeBlock code={auditFilesCode} language="bash" />
                </Card>

                <Card title="Quality Gates">
                    <p class="text-secondary mb-4">
                        Run these checks before publishing updates to the
                        component library.
                    </p>
                    <CodeBlock code={qualityChecksCode} language="bash" />
                </Card>

                <Card title="Current Status">
                    <p class="text-secondary mb-4">
                        Latest remediation cycle completed all planned phases,
                        including accessibility, token compliance, state
                        coverage, and Storybook/doc updates.
                    </p>
                    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div class="rounded-lg border border-border p-3">
                            <p class="text-sm font-medium text-text">
                                Health Score
                            </p>
                            <p class="text-secondary">84 / 100</p>
                        </div>
                        <div class="rounded-lg border border-border p-3">
                            <p class="text-sm font-medium text-text">
                                Validation
                            </p>
                            <p class="text-secondary">
                                `check`, `build`, and Storybook build passing
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>

        <!-- Features -->
        <section class="mb-16">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-text mb-4">
                    Why Zabi Components?
                </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="Svelte 5 Ready">
                    <p class="text-secondary">
                        Built with Svelte 5 runes and modern patterns
                    </p>
                </Card>

                <Card title="TypeScript First">
                    <p class="text-secondary">
                        Full TypeScript support with proper type definitions
                    </p>
                </Card>

                <Card title="Accessible">
                    <p class="text-secondary">
                        WCAG compliant with keyboard navigation and screen
                        reader support
                    </p>
                </Card>

                <Card title="Customizable">
                    <p class="text-secondary">
                        Easy theming with CSS custom properties
                    </p>
                </Card>

                <Card title="Lightweight">
                    <p class="text-secondary">
                        Tree-shakeable with minimal bundle impact
                    </p>
                </Card>

                <Card title="Modern">
                    <p class="text-secondary">
                        Clean, minimal design that just works
                    </p>
                </Card>
            </div>
        </section>

        <!-- Button Variants -->
        <section class="mb-16">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-text mb-4">
                    Button Variants
                </h2>
                <p class="text-secondary">
                    Explore different button styles and variants
                </p>
            </div>

            <Card title="Available Variants">
                <p class="text-secondary mb-6">
                    Zabi Components provides multiple button variants for
                    different use cases:
                </p>
                <div
                    class="flex flex-wrap gap-4 items-center justify-center mb-6"
                >
                    <Button variant="primary" text="Primary" />
                    <Button variant="secondary" text="Secondary" />
                    <Button variant="outline" text="Outline" />
                    <Button variant="ghost" text="Ghost" />
                    <Button variant="link" text="Link" />
                    <Button variant="danger" text="Danger" />
                </div>
                <CodeBlock
                    code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="danger">Danger</Button>`}
                    language="svelte"
                />
            </Card>
        </section>

        <!-- Icon Buttons -->
        <section class="mb-16">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-text mb-4">Icon Buttons</h2>
                <p class="text-secondary">
                    Use icon-only buttons for compact actions and toolbars
                </p>
            </div>

            <Card title="IconButton">
                <p class="text-secondary mb-6">
                    Provide an accessible label for icon-only buttons.
                </p>
                <div class="flex flex-wrap gap-4 items-center justify-center mb-6">
                    <IconButton variant="primary" label="Favorite">
                        <Heart />
                    </IconButton>
                    <IconButton variant="secondary" label="Favorite">
                        <Heart />
                    </IconButton>
                    <IconButton variant="ghost" label="Favorite">
                        <Heart />
                    </IconButton>
                    <IconButton variant="outline" label="Favorite">
                        <Heart />
                    </IconButton>
                </div>
                <CodeBlock
                    code={`<IconButton label="Favorite">
  <Heart />
</IconButton>`}
                    language="svelte"
                />
            </Card>
        </section>

        <!-- Next Steps -->
        <section class="mb-16">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-text mb-4">
                    Ready to Start?
                </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Explore Components">
                    <p class="text-secondary mb-4">
                        Browse our interactive component showcase
                    </p>
                    <Button
                        onclick={() => goto("/components")}
                        variant="primary"
                    >
                        View Components
                    </Button>
                </Card>

                <Card title="Get Support">
                    <p class="text-secondary mb-4">
                        Check out our GitHub repository for help
                    </p>
                    <Button
                        onclick={() =>
                            goto("https://github.com/sabnor/zabi-components")}
                        variant="outline"
                    >
                        Visit GitHub
                    </Button>
                </Card>
            </div>
        </section>
    </div>

    <!-- Footer -->
    <div class="bg-base-100 border-t border-border py-8">
        <div class="container mx-auto px-6 text-center">
            <p class="text-secondary mb-2">
                Clean components that just work. Less is more.
            </p>
            <p class="text-sm text-secondary/80">
                © 2024 Zabi Components. MIT License.
            </p>
        </div>
    </div>
</div>
