<script lang="ts">
    import { goto } from "$app/navigation";
    import Badge from "../components/atoms/Badge.svelte";
    import Button from "../components/atoms/Button.svelte";
    import Card from "../components/atoms/Card.svelte";
    import CardContent from "../components/atoms/CardContent.svelte";
    import CardHeader from "../components/atoms/CardHeader.svelte";

    interface Feature {
        title: string;
        description: string;
    }

    const features: Feature[] = [
        {
            title: "TypeScript throughout",
            description:
                "Props and events are typed so your editor can help you use each component correctly.",
        },
        {
            title: "Built for accessibility",
            description:
                "Sensible defaults for labels, focus, and keyboard use so common patterns work for more people.",
        },
        {
            title: "Made for SvelteKit",
            description:
                "Components render on the server and in the browser, with light and dark styles you can rely on.",
        },
    ];

    const highlightedComponents: string[] = [
        "Button",
        "Input",
        "Card",
        "TopNavbar",
        "Modal",
        "Tabs",
    ];
</script>

<svelte:head>
    <title>Zabi Components | Svelte UI components</title>
    <meta
        name="description"
        content="Svelte 5 UI components with TypeScript and Tailwind: buttons, forms, navigation, and more."
    />
</svelte:head>

<div class="min-h-screen bg-background">
    <main class="container mx-auto px-4 pb-28 sm:px-6 sm:pb-32 lg:px-8 lg:pb-40">
        <section class="py-36 sm:py-44 lg:py-52">
            <div class="mx-auto text-center">
                <p
                    class="mb-12 inline-flex items-center rounded-full border border-border px-6 py-2.5 text-sm text-description"
                >
                    Svelte 5, TypeScript, and Tailwind
                </p>
                <h1
                    class="mb-12 text-4xl font-bold tracking-tight text-headline sm:text-6xl"
                >
                    UI components for Svelte apps
                </h1>
                <p class="mx-auto mb-20 text-xl text-description sm:text-2xl">
                    Buttons, inputs, cards, navigation, dialogs, and other pieces
                    you can drop into a SvelteKit project and adjust with Tailwind
                    classes.
                </p>

                <div
                    class="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8"
                >
                    <Button
                        variant="primary"
                        size="lg"
                        text="Documentation"
                        onclick={() => goto("/docs")}
                    />
                    <Button
                        variant="outline"
                        size="lg"
                        text="Browse all components"
                        onclick={() => goto("/components")}
                    />
                </div>
            </div>
        </section>

        <section class="border-t border-border py-32 sm:py-40">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
                {#each features as feature (feature.title)}
                    <Card variant="flat" fullWidth={true}>
                        <CardHeader title={feature.title} />
                        <CardContent>
                            <p class="text-description">{feature.description}</p>
                        </CardContent>
                    </Card>
                {/each}
            </div>
        </section>

        <section class="border-t border-border py-32 sm:py-40">
            <div
                class="mx-auto flex flex-col items-center gap-14 text-center sm:gap-16"
            >
                <div>
                    <h2 class="text-3xl font-semibold text-headline sm:text-4xl">
                        A few examples
                    </h2>
                    <p class="mt-6 text-lg text-description sm:text-xl">
                        Here are some of the components in the library. The
                        components page lists everything in one place.
                    </p>
                </div>

                <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                    {#each highlightedComponents as componentName (componentName)}
                        <Badge variant="neutral" text={componentName} />
                    {/each}
                </div>

                <Button
                    variant="outline"
                    size="lg"
                    text="Browse all components"
                    onclick={() => goto("/components")}
                />
            </div>
        </section>
    </main>

    <footer class="border-t border-border py-16 sm:py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
                class="flex flex-col items-center justify-between gap-6 text-sm text-description md:flex-row"
            >
                <p>© 2026 Zabi Components. Open source MIT.</p>
                <div class="flex items-center gap-8">
                    <a href="/docs" class="hover:text-headline transition-colors"
                        >Docs</a
                    >
                    <a
                        href="/components"
                        class="hover:text-headline transition-colors">Components</a
                    >
                    <a
                        href="https://github.com"
                        class="hover:text-headline transition-colors">GitHub</a
                    >
                </div>
            </div>
        </div>
    </footer>
</div>
