<script lang="ts">
    import CopyCommand from "$lib/marketing/CopyCommand.svelte";
    import InviteSpecimen from "$lib/marketing/InviteSpecimen.svelte";
    import RebrandDemo from "$lib/marketing/RebrandDemo.svelte";
    import {
        GITHUB_URL,
        INSTALL_COMMAND,
        NPM_URL,
        componentCount,
        guarantees,
        layers,
        quickStart,
    } from "$lib/marketing/content";

    const primaryLink =
        "focus-ring inline-flex h-12 items-center justify-center rounded-xl bg-action-primary px-6 text-base font-semibold text-action-primary transition-colors hover:bg-action-primary-hover";
    const secondaryLink =
        "focus-ring inline-flex h-12 items-center justify-center rounded-xl border border-border-medium px-6 text-base font-semibold text-headline transition-colors hover:bg-card";
</script>

<svelte:head>
    <title>Zabi Components: accessible Svelte 5 components</title>
    <meta
        name="description"
        content={`${componentCount} accessible Svelte 5 components with TypeScript, SSR support and Tailwind CSS v4 tokens for light and dark themes.`}
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&display=swap"
    />
</svelte:head>

<div class="landing bg-background text-body">
    <main>
        <!-- Hero -->
        <section class="hero overflow-hidden" aria-labelledby="hero-title">
            <div
                class="mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24"
            >
                <div class="lg:col-span-6 lg:pt-6 xl:col-span-6">
                    <h1
                        id="hero-title"
                        class="display max-w-4xl text-[2.75rem] font-bold leading-[0.98] text-headline sm:text-7xl lg:text-[4.25rem] xl:text-[4.75rem]"
                    >
                        Accessible Svelte&nbsp;5 components, themed by tokens.
                    </h1>
                    <p class="mt-8 max-w-lg text-lg leading-8 text-description sm:text-xl sm:leading-9">
                        {componentCount} components for SvelteKit, from buttons and inputs to
                        navigation and sidebars. Keyboard support, typed props and light and dark
                        themes come built in.
                    </p>

                    <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a href="/components" class={primaryLink}>Browse components</a>
                        <a href="/docs" class={secondaryLink}>Read the docs</a>
                    </div>

                    <div class="mt-10">
                        <CopyCommand command={INSTALL_COMMAND} />
                        <p class="mt-3 text-sm text-description">
                            MIT licensed. Works with Svelte 5.43 or newer and Tailwind CSS v4.
                        </p>
                    </div>
                </div>

                <div class="stage relative lg:col-span-6 xl:col-span-5 xl:col-start-8">
                    <div class="stage-grid" aria-hidden="true"></div>
                    <div class="relative px-3 py-8 sm:px-10 sm:py-12 xl:px-0">
                        <InviteSpecimen />
                    </div>
                </div>
            </div>
        </section>

        <!-- Library structure -->
        <section class="border-t border-border bg-card" aria-labelledby="layers-title">
            <div class="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
                <div class="lg:col-span-4">
                    <div class="lg:sticky lg:top-28">
                        <h2
                            id="layers-title"
                            class="display text-4xl font-bold leading-tight text-headline sm:text-5xl"
                        >
                            Small parts that add up to whole screens.
                        </h2>
                        <p class="mt-6 max-w-lg text-lg leading-8 text-description">
                            The library is organized in three layers. Start with a single button,
                            or drop in a complete sidebar that already uses the same buttons inside.
                        </p>
                        <a
                            href="/components"
                            class="focus-ring mt-8 inline-flex rounded-sm text-base font-semibold text-link underline underline-offset-4 hover:text-link-hover"
                        >
                            See every component with props and examples
                        </a>
                    </div>
                </div>

                <ol class="space-y-4 lg:col-span-8">
                    {#each layers as layer, index (layer.id)}
                        <li class="layer rounded-3xl border border-border bg-background p-6 sm:p-8" style="--depth: {index}">
                            <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                                <h3 class="display text-3xl font-bold text-headline">
                                    {layer.title}
                                </h3>
                                <p class="text-sm font-semibold text-description">
                                    {layer.names.length} components
                                </p>
                            </div>
                            <p class="mt-3 max-w-lg text-base leading-7 text-description">
                                {layer.summary}
                            </p>
                            <ul class="mt-6 flex flex-wrap gap-2">
                                {#each layer.names as name (name)}
                                    <li>
                                        <a
                                            href={`/components/${name}`}
                                            class="focus-ring inline-flex h-7 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium text-body transition-colors hover:border-border-strong hover:text-headline"
                                        >
                                            {name}
                                        </a>
                                    </li>
                                {/each}
                            </ul>
                        </li>
                    {/each}
                </ol>
            </div>
        </section>

        <!-- Theming -->
        <section class="border-t border-border" aria-labelledby="theming-title">
            <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
                <div class="lg:col-span-5">
                    <h2
                        id="theming-title"
                        class="display text-4xl font-bold leading-tight text-headline sm:text-5xl"
                    >
                        Change a few tokens. Every component follows.
                    </h2>
                    <p class="mt-6 max-w-lg text-lg leading-8 text-description">
                        Components never hardcode a color. They read semantic tokens like
                        <code class="rounded bg-card px-2 py-0.5 text-[0.9em] text-headline">action-primary</code>
                        and <code class="rounded bg-card px-2 py-0.5 text-[0.9em] text-headline">focus-ring</code>,
                        so your brand goes in one place: globally, or scoped to a single section.
                    </p>
                    <p class="mt-4 max-w-lg text-lg leading-8 text-description">
                        Each token has a dark value too, so the switch in the top bar re-themes this
                        whole page.
                    </p>
                </div>
                <div class="lg:col-span-7">
                    <RebrandDemo />
                </div>
            </div>
        </section>

        <!-- Guarantees -->
        <section class="border-t border-border bg-card" aria-labelledby="guarantees-title">
            <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <h2
                    id="guarantees-title"
                    class="display max-w-4xl text-4xl font-bold leading-tight text-headline sm:text-5xl"
                >
                    The details you would otherwise write yourself.
                </h2>
                <dl class="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {#each guarantees as item (item.title)}
                        <div class="border-t-2 border-headline pt-5">
                            <dt class="display text-xl font-bold text-headline">{item.title}</dt>
                            <dd class="mt-2 text-base leading-7 text-description">{item.body}</dd>
                        </div>
                    {/each}
                </dl>
            </div>
        </section>

        <!-- Quick start -->
        <section class="border-t border-border" aria-labelledby="start-title">
            <div class="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
                <div class="lg:col-span-4">
                    <h2
                        id="start-title"
                        class="display text-4xl font-bold leading-tight text-headline sm:text-5xl"
                    >
                        Running in three steps.
                    </h2>
                    <p class="mt-6 max-w-lg text-lg leading-8 text-description">
                        Without the theme CSS, token classes have no values, so import it once in
                        your global stylesheet.
                    </p>
                </div>
                <ol class="space-y-8 lg:col-span-8">
                    {#each quickStart as step, index (step.title)}
                        <li class="grid gap-4 sm:grid-cols-[3rem_1fr]">
                            <span
                                class="display flex size-12 items-center justify-center rounded-full bg-action-primary text-lg font-bold text-action-primary"
                                aria-hidden="true"
                            >
                                {index + 1}
                            </span>
                            <div class="min-w-0">
                                <h3 class="display pt-2 text-xl font-bold text-headline">{step.title}</h3>
                                <pre
                                    class="mt-3 overflow-x-auto rounded-2xl border border-border bg-card p-5 text-sm leading-6 text-headline"
                                    aria-label={`${step.language} code`}><code>{step.code}</code></pre>
                            </div>
                        </li>
                    {/each}
                </ol>
            </div>
        </section>

        <!-- Final call to action -->
        <section class="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28" aria-labelledby="cta-title">
            <div class="cta mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-action-primary px-6 py-16 sm:px-12 lg:py-20">
                <div class="grid items-end gap-10 lg:grid-cols-12">
                    <div class="lg:col-span-8">
                        <h2
                            id="cta-title"
                            class="display text-4xl font-bold leading-tight text-action-primary sm:text-6xl"
                        >
                            Start with one component.
                        </h2>
                        <p class="cta-copy mt-5 max-w-lg text-lg leading-8">
                            Every component page lists its props and variants, with examples
                            you can copy into your app.
                        </p>
                    </div>
                    <div class="flex flex-col gap-3 whitespace-nowrap sm:flex-row lg:col-span-4 lg:justify-end">
                        <a
                            href="/components"
                            class="focus-ring inline-flex h-12 items-center justify-center rounded-xl bg-background px-6 text-base font-semibold text-headline transition-opacity hover:opacity-90"
                        >
                            Browse components
                        </a>
                        <a
                            href={GITHUB_URL}
                            class="cta-outline focus-ring inline-flex h-12 items-center justify-center rounded-xl border px-6 text-base font-semibold text-action-primary"
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="border-t border-border">
        <div
            class="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-description sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"
        >
            <p>Zabi Components is open source under the MIT license.</p>
            <nav aria-label="Footer">
                <ul class="flex flex-wrap gap-x-8 gap-y-3">
                    <li><a class="focus-ring rounded-sm hover:text-headline" href="/docs">Docs</a></li>
                    <li><a class="focus-ring rounded-sm hover:text-headline" href="/components">Components</a></li>
                    <li><a class="focus-ring rounded-sm hover:text-headline" href={GITHUB_URL}>GitHub</a></li>
                    <li><a class="focus-ring rounded-sm hover:text-headline" href={NPM_URL}>npm</a></li>
                </ul>
            </nav>
        </div>
    </footer>
</div>

<style>
    .landing :global(.display) {
        font-family: "Familjen Grotesk", "Nunito Sans", ui-sans-serif, system-ui, sans-serif;
        letter-spacing: -0.02em;
        text-wrap: balance;
    }

    .landing h1.display {
        letter-spacing: -0.035em;
    }

    /* Grid children may shrink below their content (long code, flex rows) instead of widening the page. */
    .landing :global(.grid > *) {
        min-width: 0;
    }

    .landing pre {
        font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
    }

    /* Hero stage: a dotted drafting surface behind the live specimen. */
    .stage-grid {
        position: absolute;
        inset: 0;
        border-radius: 2rem;
        background-color: color-mix(in srgb, var(--color-brand-100) 70%, var(--color-background));
        background-image: radial-gradient(
            color-mix(in srgb, var(--color-brand-700) 35%, transparent) 1px,
            transparent 1px
        );
        background-size: 1.25rem 1.25rem;
    }

    @media (min-width: 1280px) {
        .stage-grid {
            inset: 0 -40vw 0 -2rem;
            border-radius: 2rem 0 0 2rem;
        }
    }

    .layer {
        margin-left: calc(var(--depth) * 1.5rem);
    }

    @media (max-width: 639px) {
        .layer {
            margin-left: 0;
        }
    }

    .cta-copy {
        color: color-mix(in srgb, var(--color-action-primary-text) 80%, transparent);
    }

    .cta-outline {
        border-color: color-mix(in srgb, var(--color-action-primary-text) 40%, transparent);
    }

    .cta-outline:hover {
        background: color-mix(in srgb, var(--color-action-primary-text) 10%, transparent);
    }

    .cta :global(.focus-ring:focus-visible) {
        outline-color: var(--color-action-primary-text);
    }

    @media (prefers-reduced-motion: reduce) {
        .landing :global(*) {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
        }
    }
</style>
