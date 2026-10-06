<script lang="ts">
    import CodeBlock from "../../components/atoms/CodeBlock.svelte";
    import Table from "../../components/atoms/Table.svelte";
    import Seo from "$lib/marketing/Seo.svelte";
    import OnThisPage from "$lib/marketing/OnThisPage.svelte";
    import SiteFooter from "$lib/marketing/SiteFooter.svelte";
    import ThemeDemo from "$lib/marketing/ThemeDemo.svelte";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import ExternalLink from "@lucide/svelte/icons/external-link";
    import { asset } from "$app/paths";
    import { GITHUB_URL } from "$lib/marketing/content";
    import { generatedTheme } from "$lib/marketing/brand-accents";
    import {
        COLOR_TOKENS,
        ROLE_TOKENS,
        SHAPE_TOKENS,
        TYPE_TOKENS,
        type TokenRow,
    } from "$lib/marketing/theme-tokens";

    const sections = [
        { id: "try", label: "Try it" },
        { id: "not-pinned", label: "Your color is not pinned" },
        { id: "quick-start", label: "Quick start" },
        { id: "import-order", label: "Import order" },
        { id: "tokens", label: "Tokens you may set" },
        { id: "roles", label: "Roles to read" },
        { id: "modes", label: "Light, dark and auto" },
        { id: "generator", label: "The generator" },
        { id: "limits", label: "What does not follow" },
        { id: "stability", label: "Stability" },
    ];

    // What createTheme returned for the site's second brand, at build time.
    const amber = generatedTheme("amber");
    const amberOptions = amber?.options;
    // The guide's two examples of where a color lands, from the same source.
    const landings = [generatedTheme("cobalt"), amber].filter((theme) => !!theme);

    const generateCode = `npx zabi-theme --brand "#C17B00" --neutral "#78716c" --out src/lib/brand.generated.css`;

    const themeCssCode = `/* src/lib/theme.css */
@import "zabi-components/theme-only";
@import "zabi-components/theme-dark-only";
@import "./brand.generated.css";

:root {
  --font-family-heading: "Your Display Font", var(--font-family-sans);
}`;

    const appCssCode = `/* src/app.css */
@import "tailwindcss";
@import "./lib/theme.css";`;

    const autoCode = `<html lang="en" data-theme="auto">`;

    const switchCode = `document.documentElement.dataset.theme = "dark"; // "light" | "auto"`;

    const strictCode = `npx zabi-theme --brand "#C17B00" --neutral "#78716c" --strict --out src/lib/brand.generated.css && git diff --exit-code src/lib/brand.generated.css`;

    const setCode = `npx zabi-theme --brand "#C17B00" --set "--color-link=var(--color-brand-800)" --out src/lib/brand.generated.css`;

    const createThemeCode = `import { writeFileSync } from "node:fs";
import { createTheme } from "zabi-components/create-theme";

const { css, warnings, closest } = createTheme({
  brand: "#C17B00",
  neutral: "#78716c",
});

for (const warning of warnings) console.warn(warning.message);
console.log(\`Brand is closest to step \${closest.brand.step} (\${closest.brand.hex}).\`);

writeFileSync("src/lib/brand.generated.css", css);`;

    const darkOnlyCode = `.dark,
[data-theme="dark"] {
  --color-link: var(--zabi-brand-200);
}

@media (prefers-color-scheme: dark) {
  [data-theme="auto"] {
    --color-link: var(--zabi-brand-200);
  }
}`;

    const importOrder = [
        { step: "tailwindcss", why: "The theme files are Tailwind v4 theme blocks." },
        {
            step: "zabi-components/theme-only",
            why: "Every token, with its light value, and the raw ramps.",
        },
        {
            step: "zabi-components/theme-dark-only",
            why: "Remaps roles for dark. It declares no ramp, so it needs the light theme.",
        },
        {
            step: "your generated file",
            why: "Overrides on :root. After both theme files, so they win in dark as well.",
        },
        { step: "your own :root block", why: "Fonts, radius and anything else from the tables." },
    ];

    const modes = [
        { on: "nothing", result: "Light, also on a dark system" },
        { on: `data-theme="light"`, result: "Light" },
        { on: `data-theme="dark"`, result: "Dark" },
        { on: `data-theme="auto"`, result: "Follows the system" },
        { on: `class="dark"`, result: `Dark, the same as data-theme="dark"` },
    ];

    const tokenTables: { caption: string; rows: TokenRow[]; valueLabel: string }[] = [
        { caption: "Color", rows: COLOR_TOKENS, valueLabel: "Steps or default" },
        { caption: "Type", rows: TYPE_TOKENS, valueLabel: "Default" },
        { caption: "Shape, depth and stacking", rows: SHAPE_TOKENS, valueLabel: "Default" },
    ];

    const rowLabel = (row: TokenRow) => row.label ?? row.tokens.join(", ");

    // A token name is one word, so it moves to the next line whole instead of
    // breaking at a hyphen.
    const inlineCode =
        "whitespace-nowrap rounded bg-card px-2 py-0.5 text-[0.9em] text-headline";
    // A cell holding several names has to wrap between them.
    const cellCode = "text-[0.9em] text-headline";
    // The cell classes the Table example in the catalog uses.
    const headCell = "px-4 py-3 font-medium text-headline";
    const cell = "px-4 py-3 align-top text-body";
    const textLink =
        "focus-ring rounded-sm font-semibold text-link underline underline-offset-4 hover:text-link-hover";
    const note =
        "mt-6 max-w-3xl rounded-2xl border border-border bg-card shadow-sm p-5 text-base leading-7 text-body";
</script>

<Seo
    title="Theming Zabi Components: one generated file, light and dark"
    description="Give Zabi Components your brand from one generated file of token overrides. Which tokens an app may set, light, dark and auto, the zabi-theme generator, and a live brand switcher."
    breadcrumbs={[{ name: "Docs", path: "/docs" }, { name: "Theming" }]}
/>

<svelte:head>
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
                Theming
            </h1>
            <p class="mt-6 text-lg leading-8 text-description sm:text-xl sm:leading-9">
                One generated file gives every component your brand, in light and dark.
                No component CSS, and nothing to repeat for dark mode.
            </p>
        </header>

        <div class="mt-14 grid gap-12 lg:grid-cols-12">
            <OnThisPage class="lg:col-span-3" {sections} />

            <div class="space-y-16 lg:col-span-9 xl:col-span-8">
                <section id="try" aria-labelledby="try-title">
                    <h2 id="try-title" class="display text-3xl font-bold text-headline">Try it</h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        Switch the brand. The whole site follows, this page and the top bar
                        included, because the brand is set once on the document. Amber is not
                        written by hand: it is what the generator returns for one warm color and
                        one warm gray.
                    </p>
                    <div class="mt-6">
                        <ThemeDemo />
                    </div>
                    {#if amber && amberOptions}
                        <details class="group mt-6 rounded-2xl border border-border bg-card shadow-sm">
                            <summary
                                class="focus-ring flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 text-sm font-semibold text-headline [&::-webkit-details-marker]:hidden"
                            >
                                The generated Amber file, all {Object.keys(amber.tokens).length} declarations
                                <ChevronDown
                                    size={16}
                                    class="shrink-0 text-description transition-transform group-open:rotate-180"
                                    aria-hidden="true"
                                />
                            </summary>
                            <div class="border-t border-border p-4">
                                <CodeBlock code={amber.css} language="css" />
                            </div>
                        </details>
                    {/if}
                </section>

                <section id="not-pinned" aria-labelledby="not-pinned-title">
                    <h2 id="not-pinned-title" class="display text-3xl font-bold text-headline">
                        Your color is not pinned to a step
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        The generator takes the hue and the saturation of your color. The lightness
                        of each step comes from the library, so step 600 is as dark as every
                        built-in 600 and every button, link and focus ring keeps its contrast.
                    </p>
                    <p class="mt-4 max-w-3xl text-base leading-7 text-description">
                        So your exact hex may not be in the ramp, and it is usually not the color
                        of the primary button. The generator tells you which step is nearest.
                    </p>
                    <div class="mt-6">
                        <Table caption="Where two brand colors land" captionHidden stacked="sm">
                            <thead class="border-b border-border bg-surface-elevated">
                                <tr>
                                    <th scope="col" class={headCell}>You give</th>
                                    <th scope="col" class={headCell}>Nearest step</th>
                                    <th scope="col" class={headCell}>Primary button, light</th>
                                    <th scope="col" class={headCell}>Primary button, dark</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                {#each landings as theme (theme.options.brand)}
                                    <tr>
                                        <td class={cell} data-label="You give"><code class={cellCode}>{theme.options.brand}</code></td>
                                        <td class={cell} data-label="Nearest step">
                                            {theme.closest.brand.step},
                                            {#if theme.closest.brand.exact}exact{:else}<code class={cellCode}>{theme.closest.brand.hex}</code>{/if}
                                        </td>
                                        <td class={cell} data-label="Primary button, light">
                                            <code class={cellCode}>{theme.tokens["--zabi-brand-600"]}</code>
                                        </td>
                                        <td class={cell} data-label="Primary button, dark">
                                            <code class={cellCode}>{theme.tokens["--zabi-brand-400"]}</code>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </Table>
                    </div>
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        If the brand color itself has to appear somewhere, use the step the
                        generator names, such as
                        <code class={inlineCode}>var(--zabi-brand-500)</code>, not the hex.
                    </p>
                </section>

                <section id="quick-start" aria-labelledby="quick-start-title">
                    <h2 id="quick-start-title" class="display text-3xl font-bold text-headline">
                        Quick start
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        Generate the brand file and commit it. The same input always gives the
                        same file.
                    </p>
                    <CodeBlock class="mt-6" code={generateCode} language="bash" />
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        Import it after the theme files, then import that stylesheet where
                        Tailwind is loaded.
                    </p>
                    <CodeBlock class="mt-4" code={themeCssCode} language="css" />
                    <CodeBlock class="mt-4" code={appCssCode} language="css" />
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        Choose how dark mode is selected, on the
                        <code class={inlineCode}>html</code> element.
                    </p>
                    <CodeBlock class="mt-4" code={autoCode} language="html" />
                </section>

                <section id="import-order" aria-labelledby="import-order-title">
                    <h2 id="import-order-title" class="display text-3xl font-bold text-headline">
                        Import order
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        Keep your file last. Your overrides and the dark theme have the same
                        weight, so where both set a token the later one wins.
                    </p>
                    <ol class="mt-6 space-y-3">
                        {#each importOrder as item, index (item.step)}
                            <li class="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <span class="text-base font-semibold text-headline" aria-hidden="true"
                                    >{index + 1}</span
                                >
                                <div class="min-w-0">
                                    <p class="break-words text-base font-semibold text-headline">
                                        <code>{item.step}</code>
                                    </p>
                                    <p class="mt-1 text-base leading-7 text-description">{item.why}</p>
                                </div>
                            </li>
                        {/each}
                    </ol>
                    <p class={note}>
                        <strong class="font-semibold text-headline">Set the brand on the document.</strong>
                        Put the overrides on <code class={inlineCode}>:root</code>. The roles are
                        worked out on the root element, so a ramp set on an element further down
                        changes nothing inside it.
                    </p>
                </section>

                <section id="tokens" aria-labelledby="tokens-title">
                    <h2 id="tokens-title" class="display text-3xl font-bold text-headline">
                        Tokens you may set
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        Set these on <code class={inlineCode}>:root</code>, after the imports. One
                        declaration covers light and dark. The generator writes the color ones.
                    </p>
                    {#each tokenTables as table (table.caption)}
                        <h3 class="display mt-10 text-xl font-bold text-headline">{table.caption}</h3>
                        <div class="mt-4">
                            <Table caption={`${table.caption} tokens an app may set`} captionHidden stacked="sm">
                                <thead class="border-b border-border bg-surface-elevated">
                                    <tr>
                                        <th scope="col" class={headCell}>Token</th>
                                        <th scope="col" class={headCell}>{table.valueLabel}</th>
                                        <th scope="col" class={headCell}>What follows</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-border">
                                    {#each table.rows as row (rowLabel(row))}
                                        <tr>
                                            <td class={cell} data-label="Token"><code class={cellCode}>{rowLabel(row)}</code></td>
                                            <td class={cell} data-label={table.valueLabel}>{row.value}</td>
                                            <td class={cell} data-label="What follows">{row.follows}</td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </Table>
                        </div>
                    {/each}
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        The spacing and control-height tokens are not on the list. They exist,
                        but components do not read them, so setting them does not change a
                        component.
                    </p>
                </section>

                <section id="roles" aria-labelledby="roles-title">
                    <h2 id="roles-title" class="display text-3xl font-bold text-headline">
                        Roles to read, not set
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        A role says what a color is for. Components paint with roles, and your own
                        CSS should too. A role is already the right step in each mode.
                    </p>
                    <div class="mt-6">
                        <Table caption="Roles to read in your own CSS" captionHidden stacked="sm">
                            <thead class="border-b border-border bg-surface-elevated">
                                <tr>
                                    <th scope="col" class={headCell}>Roles</th>
                                    <th scope="col" class={headCell}>For</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                {#each ROLE_TOKENS as row (rowLabel(row))}
                                    <tr>
                                        <td class={cell} data-label="Roles"><code class={cellCode}>{rowLabel(row)}</code></td>
                                        <td class={cell} data-label="For">{row.follows}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </Table>
                    </div>
                    <p class={note}>
                        <strong class="font-semibold text-headline">Why not set them.</strong>
                        A role set on <code class={inlineCode}>:root</code> is one value for both
                        modes, and nothing checks its contrast. The same goes for the numbered
                        steps such as <code class={inlineCode}>--color-brand-600</code>: they
                        mirror in dark, and an override stops that. Set the
                        <code class={inlineCode}>--zabi-*</code> ramp instead.
                    </p>
                    <h3 class="display mt-10 text-xl font-bold text-headline">One role in dark only</h3>
                    <p class="mt-3 max-w-3xl text-base leading-7 text-description">
                        Declare it under all three dark selectors, after the imports.
                    </p>
                    <CodeBlock class="mt-4" code={darkOnlyCode} language="css" />
                </section>

                <section id="modes" aria-labelledby="modes-title">
                    <h2 id="modes-title" class="display text-3xl font-bold text-headline">
                        Light, dark and auto
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        The mode is chosen on the <code class={inlineCode}>html</code> element, by
                        an attribute or a class. Following the system is opt-in.
                    </p>
                    <div class="mt-6">
                        <Table caption="How the mode is selected" captionHidden stacked="sm">
                            <thead class="border-b border-border bg-surface-elevated">
                                <tr>
                                    <th scope="col" class={headCell}>On the html element</th>
                                    <th scope="col" class={headCell}>Result</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                {#each modes as mode (mode.on)}
                                    <tr>
                                        <td class={cell} data-label="On the html element"><code class={cellCode}>{mode.on}</code></td>
                                        <td class={cell} data-label="Result">{mode.result}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </Table>
                    </div>
                    <CodeBlock class="mt-6" code={switchCode} language="javascript" />
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        Put the attribute or class on <code class={inlineCode}>html</code> only. On
                        an element further down it re-themes some roles and not others.
                        <code class={inlineCode}>ThemeToggle</code> toggles the
                        <code class={inlineCode}>dark</code> class and does not read
                        <code class={inlineCode}>data-theme</code>.
                    </p>
                </section>

                <section id="generator" aria-labelledby="generator-title">
                    <h2 id="generator-title" class="display text-3xl font-bold text-headline">
                        The generator
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        <code class={inlineCode}>zabi-theme</code> builds the brand ramp, an
                        optional accent ramp and optional tinted neutrals, picks the text color
                        for the fills, and checks every color pair the library guards against WCAG AA in light and
                        dark.
                    </p>
                    <h3 class="display mt-10 text-xl font-bold text-headline">Fail the build on low contrast</h3>
                    <p class="mt-3 max-w-3xl text-base leading-7 text-description">
                        A pair below AA is a warning, and the file is still written. With
                        <code class={inlineCode}>--strict</code> the command exits 1. This line
                        also checks that the committed file is current.
                    </p>
                    <CodeBlock class="mt-4" code={strictCode} language="bash" />
                    <h3 class="display mt-10 text-xl font-bold text-headline">Move one role</h3>
                    <p class="mt-3 max-w-3xl text-base leading-7 text-description">
                        <code class={inlineCode}>--set</code> writes one more declaration, for
                        both modes, and includes it in the contrast check. Point a role at a
                        <code class={inlineCode}>--color-brand-*</code> step, which mirrors in
                        dark, not at a <code class={inlineCode}>--zabi-brand-*</code> step, which
                        does not.
                    </p>
                    <CodeBlock class="mt-4" code={setCode} language="bash" />
                    <h3 class="display mt-10 text-xl font-bold text-headline">From a build script</h3>
                    <CodeBlock class="mt-4" code={createThemeCode} language="javascript" />
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        It does not put your exact hex in the ramp, write fonts or radius unless
                        you pass them with <code class={inlineCode}>--set</code>, or check that a
                        token you set exists.
                    </p>
                </section>

                <section id="limits" aria-labelledby="limits-title">
                    <h2 id="limits-title" class="display text-3xl font-bold text-headline">
                        What does not follow
                    </h2>
                    <ul class="mt-6 max-w-3xl list-disc space-y-3 pl-5 text-base leading-7 text-description">
                        <li>
                            Hover, pressed and secondary-button fills, the overlay edge and the
                            modal backdrop are fixed near-black or near-white tints. They do not
                            take the hue of your neutrals.
                        </li>
                        <li>
                            The shadow color is the default neutral's ink. Set
                            <code class={inlineCode}>--shadow-color</code> yourself.
                        </li>
                        <li>
                            The energetic colors stay on the built-in yellow when the accent
                            changes. Success, warning, error and info keep their own ramps.
                        </li>
                        <li>
                            The dark surface levels take the hue of your neutrals, but the size of
                            the steps between them was tuned for the default grays.
                        </li>
                    </ul>
                </section>

                <section id="stability" aria-labelledby="stability-title">
                    <h2 id="stability-title" class="display text-3xl font-bold text-headline">
                        Stability
                    </h2>
                    <p class="mt-4 max-w-3xl text-lg leading-8 text-description">
                        The tokens on this page are public API. Renaming or removing one is a
                        breaking change.
                    </p>
                    <p class="mt-4 max-w-3xl text-base leading-7 text-description">
                        A test holds the library to that. It keeps a list of every published
                        token name and fails when one goes missing; the list only grows.
                    </p>
                    <p class="mt-6 max-w-3xl text-base leading-7 text-description">
                        The
                        <a
                            href={`${GITHUB_URL}/blob/main/THEMING.md`}
                            class={textLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            >full theming guide on GitHub<ExternalLink
                                size={14}
                                class="ml-1 inline-block shrink-0 align-[-0.1em] opacity-70"
                                aria-hidden="true"
                            /><span class="sr-only">(opens in a new tab)</span></a
                        >
                        has every option of the generator, every role, and how the theme is built.
                        It ships in the package as well.
                    </p>
                </section>
            </div>
        </div>
    </main>

    <SiteFooter />
</div>

<style>
    .guide :global(.display) {
        /* The site sets this token to its display face in +layout.svelte; a
           brand that sets it (Amber does) changes these headings too. */
        font-family: var(--font-family-heading);
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

    /* Anchored headings land below the sticky top bar, with room to spare.
       OnThisPage reads this value as the line that decides which section is
       current, so the entry that was followed is the one that is marked. */
    .guide section[id] {
        scroll-margin-top: calc(var(--site-header-height) + 2rem);
    }

    @media (prefers-reduced-motion: reduce) {
        .guide :global(*) {
            transition-duration: 0.01ms !important;
        }
    }
</style>
