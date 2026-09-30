<script lang="ts">
    import CodeBlock from "../../components/atoms/CodeBlock.svelte";
    import Seo from "$lib/marketing/Seo.svelte";
    import SiteFooter from "$lib/marketing/SiteFooter.svelte";
    import { ChevronDown, ExternalLink } from "@lucide/svelte";
    import { asset } from "$app/paths";
    import {
        GITHUB_URL,
        INSTALL_COMMAND,
        ISSUES_URL,
        STORYBOOK_URL,
        componentCount,
        quickStart,
    } from "$lib/marketing/content";

    const [, themeStep, usageStep] = quickStart;

    const sections = [
        { id: "requirements", label: "Requirements" },
        { id: "install", label: "1. Install" },
        { id: "theme", label: "2. Import the theme" },
        { id: "use", label: "3. Use a component" },
        { id: "dark-mode", label: "Dark mode" },
        { id: "theming", label: "Theming" },
        { id: "imports", label: "Import paths" },
        { id: "next", label: "Next steps" },
    ];

    const noTailwindCode = `@import "zabi-components/css";`;

    const darkModeCode = `<html lang="en" class="dark">`;

    const darkToggleCode = `document.documentElement.classList.toggle("dark");`;

    const themingCode = `@import "tailwindcss";
@import "zabi-components/theme-only";
@import "zabi-components/theme-dark-only";

/* Your brand, after the theme imports. */
:root {
  --color-action-primary: #0f766e;
  --color-action-primary-hover: #115e59;
  --color-action-primary-text: #ffffff;
  --color-focus-ring: #0d9488;
  --color-link: #0f766e;
}

/* Dark values for the same tokens. */
.dark {
  --color-action-primary: #5eead4;
  --color-action-primary-hover: #99f6e4;
  --color-action-primary-text: #042f2e;
  --color-focus-ring: #2dd4bf;
  --color-link: #5eead4;
}`;

    const scopedCode = `.checkout {
  --color-action-primary: #b45309;
  --color-action-primary-hover: #92400e;
}`;

    const importsCode = `// Everything from the package root. Start here.
import { Button, Modal } from "zabi-components";

// One layer at a time.
import { Button } from "zabi-components/atoms";
import { Modal } from "zabi-components/molecules";
import { TopNavbar } from "zabi-components/organisms";

// Prop types for your own code.
import type { ButtonVariant } from "zabi-components/types";`;

    // A token name is one word, so it moves to the next line whole instead of
    // breaking at a hyphen.
    const inlineCode =
        "whitespace-nowrap rounded bg-card px-2 py-0.5 text-[0.9em] text-headline";
    const textLink =
        "focus-ring rounded-sm font-semibold text-link underline underline-offset-4 hover:text-link-hover";
</script>

<Seo
    title="Get started with Zabi Components: install, theme and use"
    description="Install Zabi Components, import the theme and render your first Svelte 5 component. Covers dark mode, brand theming and import paths for every component."
/>

<svelte:head>
    <!-- Headings use this face from the first screen, so it is fetched with
    the document instead of after the first layout. -->
    <link
        rel="preload"
        href={asset("/fonts/familjen-grotesk-latin.woff2")}
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
    />
</svelte:head>

<div class="guide bg-background text-body">
    <main class="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28">
        <header class="max-w-3xl">
            <h1 class="display text-5xl font-bold leading-none text-headline sm:text-6xl">
                Get started
            </h1>
            <p class="mt-6 text-lg leading-8 text-description sm:text-xl sm:leading-9">
                Three steps from an empty project to a themed component: install the
                package, import the theme, render a button.
            </p>
        </header>

        <div class="mt-14 grid gap-12 lg:grid-cols-12">
            <nav class="lg:col-span-3" aria-label="On this page">
                <!-- Below lg there is no column for the sticky list, so the same
                links fold into a disclosure ahead of the first section. -->
                <details class="group rounded-2xl border border-border bg-card shadow-sm lg:hidden">
                    <summary
                        class="focus-ring flex h-12 cursor-pointer list-none items-center justify-between rounded-2xl px-5 text-sm font-semibold text-headline [&::-webkit-details-marker]:hidden"
                    >
                        On this page
                        <ChevronDown
                            size={16}
                            class="shrink-0 text-description transition-transform group-open:rotate-180"
                            aria-hidden="true"
                        />
                    </summary>
                    <ul class="border-t border-border p-2 sm:grid sm:grid-cols-2">
                        {#each sections as section (section.id)}
                            <li>
                                <a
                                    href={`#${section.id}`}
                                    class="focus-ring flex min-h-11 items-center rounded-xl px-3 text-sm text-description transition-colors hover:bg-surface-hover hover:text-headline"
                                >
                                    {section.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </details>
                <div class="sticky top-28 hidden lg:block">
                    <p class="text-sm font-semibold text-headline">On this page</p>
                    <ul class="mt-4 space-y-1 border-l border-border">
                        {#each sections as section (section.id)}
                            <li>
                                <a
                                    href={`#${section.id}`}
                                    class="focus-ring -ml-px block rounded-sm border-l border-transparent py-1 pl-4 text-sm text-description transition-colors hover:border-border-strong hover:text-headline"
                                >
                                    {section.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </nav>

            <div class="space-y-16 lg:col-span-9 xl:col-span-8">
                <section id="requirements" aria-labelledby="requirements-title">
                    <h2 id="requirements-title" class="display text-3xl font-bold text-headline">
                        Requirements
                    </h2>
                    <dl class="mt-6 grid gap-4 sm:grid-cols-3">
                        <div class="rounded-2xl border border-border bg-card shadow-sm p-5">
                            <dt class="text-sm font-semibold text-headline">Svelte</dt>
                            <dd class="mt-1 text-base leading-7 text-description">
                                5.43.8 or newer. Components use runes.
                            </dd>
                        </div>
                        <div class="rounded-2xl border border-border bg-card shadow-sm p-5">
                            <dt class="text-sm font-semibold text-headline">Tailwind CSS</dt>
                            <dd class="mt-1 text-base leading-7 text-description">
                                v4 is recommended. There is a
                                <a href="#theme" class={textLink}>stylesheet without it</a>.
                            </dd>
                        </div>
                        <div class="rounded-2xl border border-border bg-card shadow-sm p-5">
                            <dt class="text-sm font-semibold text-headline">SvelteKit</dt>
                            <dd class="mt-1 text-base leading-7 text-description">
                                Optional. Version 2 if you use it; components render on the server.
                            </dd>
                        </div>
                    </dl>
                </section>

                <section id="install" aria-labelledby="install-title">
                    <h2 id="install-title" class="display text-3xl font-bold text-headline">
                        1. Install the package
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        One package. Svelte is the only peer dependency you have to install.
                    </p>
                    <CodeBlock class="mt-6" code={INSTALL_COMMAND} language="bash" />
                </section>

                <section id="theme" aria-labelledby="theme-title">
                    <h2 id="theme-title" class="display text-3xl font-bold text-headline">
                        2. Import the theme
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        Add the theme to your global stylesheet, for example
                        <code class={inlineCode}>src/app.css</code> in SvelteKit. The theme
                        gives token classes like
                        <code class={inlineCode}>bg-action-primary</code> their values.
                    </p>
                    <CodeBlock class="mt-6" code={themeStep.code} language="css" />
                    <p
                        class="mt-6 max-w-3xl rounded-2xl border border-border bg-card shadow-sm p-5 text-base leading-7 text-body"
                    >
                        <strong class="font-semibold text-headline">Components look unstyled?</strong>
                        The theme import is missing, or the package is older than 8.0.1.
                        Without the theme, the token classes have no values.
                    </p>

                    <h3 class="display mt-10 text-xl font-bold text-headline">Without Tailwind</h3>
                    <p class="mt-3 max-w-3xl text-base leading-7 text-description">
                        Import the compiled stylesheet instead. It includes the utility classes
                        the components use, in light and dark.
                    </p>
                    <CodeBlock class="mt-4" code={noTailwindCode} language="css" />
                </section>

                <section id="use" aria-labelledby="use-title">
                    <h2 id="use-title" class="display text-3xl font-bold text-headline">
                        3. Use a component
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        Import from the package root. Event handlers are plain props such as
                        <code class={inlineCode}>onclick</code>, not
                        <code class={inlineCode}>on:click</code>.
                    </p>
                    <CodeBlock class="mt-6" code={usageStep.code} language="svelte" />
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        That is the whole setup.
                        <a href="/components" class={textLink}>Browse all {componentCount} components</a>
                        for props, variants and examples you can copy.
                    </p>
                </section>

                <section id="dark-mode" aria-labelledby="dark-mode-title">
                    <h2 id="dark-mode-title" class="display text-3xl font-bold text-headline">
                        Dark mode
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        Every color token has a dark value. Put the
                        <code class={inlineCode}>dark</code> class on the
                        <code class={inlineCode}>html</code> element and every component follows.
                    </p>
                    <CodeBlock class="mt-6" code={darkModeCode} language="html" />
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        To let people switch, toggle the class. The switch in the top bar of this
                        site does exactly this.
                    </p>
                    <CodeBlock class="mt-4" code={darkToggleCode} language="javascript" />
                </section>

                <section id="theming" aria-labelledby="theming-title">
                    <h2 id="theming-title" class="display text-3xl font-bold text-headline">
                        Theming
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        Components read semantic tokens and never hardcode a color. To rebrand,
                        override the tokens after the theme imports. Try it with the accent
                        menu in the top bar.
                    </p>
                    <CodeBlock class="mt-6" code={themingCode} language="css" />

                    <h3 class="display mt-10 text-xl font-bold text-headline">
                        Theme one section
                    </h3>
                    <p class="mt-3 max-w-3xl text-base leading-7 text-description">
                        Tokens are CSS custom properties, so they cascade. Set them on any element
                        to theme only what is inside it.
                    </p>
                    <CodeBlock class="mt-4" code={scopedCode} language="css" />
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        The
                        <a
                            href={`${GITHUB_URL}/blob/main/THEMING.md`}
                            class={textLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            >theming reference on GitHub<ExternalLink
                                size={14}
                                class="ml-1 inline-block shrink-0 align-[-0.1em] opacity-70"
                                aria-hidden="true"
                            /><span class="sr-only">(opens in a new tab)</span></a
                        >
                        lists every token: surfaces, radius, shadows, spacing and type.
                    </p>
                    <p
                        class="mt-6 max-w-3xl rounded-2xl border border-border bg-card shadow-sm p-5 text-base leading-7 text-body"
                    >
                        <strong class="font-semibold text-headline">Check the colors you change.</strong>
                        The colors that ship are contrast checked before every release. Colors
                        you override are not, so test the pairs you change, such as the button
                        label against its fill.
                    </p>
                </section>

                <section id="imports" aria-labelledby="imports-title">
                    <h2 id="imports-title" class="display text-3xl font-bold text-headline">
                        Import paths
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        The package root works for most apps. Layer paths are there if you
                        want imports to mirror the structure of the library.
                    </p>
                    <CodeBlock class="mt-6" code={importsCode} language="typescript" />
                </section>

                <section id="next" aria-labelledby="next-title">
                    <h2 id="next-title" class="display text-3xl font-bold text-headline">
                        Next steps
                    </h2>
                    <div class="mt-6 grid gap-4 sm:grid-cols-2">
                        <div class="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-8">
                            <h3 class="display text-xl font-bold text-headline">
                                Pick your first component
                            </h3>
                            <p class="mt-2 text-base leading-7 text-description">
                                Each page has a live example, the props table and code to copy.
                                Every variant and state is in
                                <a
                                    href={STORYBOOK_URL}
                                    class={textLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >Storybook<ExternalLink
                                        size={14}
                                        class="ml-1 inline-block shrink-0 align-[-0.1em] opacity-70"
                                        aria-hidden="true"
                                    /><span class="sr-only">(opens in a new tab)</span></a
                                >.
                            </p>
                            <a
                                href="/components"
                                class="focus-ring mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-action-primary px-6 text-base font-semibold text-action-primary transition-colors hover:bg-action-primary-hover"
                            >
                                Browse components
                            </a>
                        </div>
                        <div class="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-8">
                            <h3 class="display text-xl font-bold text-headline">Stuck on something?</h3>
                            <p class="mt-2 text-base leading-7 text-description">
                                Open an issue on GitHub with what you tried and what you expected.
                            </p>
                            <a
                                href={ISSUES_URL}
                                class="focus-ring mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border-medium px-6 text-base font-semibold text-headline transition-colors hover:bg-surface-hover"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open an issue
                                <ExternalLink size={16} class="shrink-0 opacity-70" aria-hidden="true" />
                                <span class="sr-only">(opens in a new tab)</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>

    <SiteFooter />
</div>

<style>
    .guide :global(.display) {
        font-family:
            "Familjen Grotesk", "Familjen Grotesk Fallback", "Nunito Sans", ui-sans-serif,
            system-ui, sans-serif;
        letter-spacing: -0.02em;
        text-wrap: balance;
    }

    .guide h1.display {
        letter-spacing: -0.035em;
    }

    /* Grid children may shrink below their content (long code) instead of widening the page. */
    .guide :global(.grid > *) {
        min-width: 0;
    }

    /* Anchored headings land below the sticky top bar. */
    .guide section[id] {
        scroll-margin-top: 6rem;
    }

    @media (prefers-reduced-motion: reduce) {
        .guide :global(*) {
            transition-duration: 0.01ms !important;
        }
    }
</style>
